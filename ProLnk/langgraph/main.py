"""
ProLnk AI Pipeline — LangGraph + FastAPI microservice.

Exposes REST endpoints that n8n workflows call:
  POST /analyze      — Analyze photos via GPT-4o Vision
  POST /match        — Match opportunity to best partner
  POST /draft        — Draft personalized outreach message
  POST /advise       — Homeowner advisor (stateful, pulls HomeHealthVault)
  GET  /health       — Health check
"""

import os
import json
from typing import Annotated, TypedDict
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx

from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

load_dotenv()

app = FastAPI(title="ProLnk AI Pipeline", version="1.0.0")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
ATTOM_API_KEY = os.getenv("ATTOM_API_KEY", "")
PROLNK_API_URL = os.getenv("PROLNK_API_URL", "http://localhost:3000")

llm = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)
llm_mini = ChatOpenAI(model="gpt-4o-mini", api_key=OPENAI_API_KEY)


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class PhotoAnalysisRequest(BaseModel):
    photo_urls: list[str]
    address: str | None = None
    zip_code: str | None = None
    property_type: str = "residential"

class PartnerMatchRequest(BaseModel):
    opportunity_id: int
    trade: str
    zip_code: str
    estimated_value: float
    urgency: str = "normal"

class OutreachDraftRequest(BaseModel):
    partner_name: str
    partner_business: str
    homeowner_name: str
    job_description: str
    estimated_value: float
    trade: str

class AdvisorRequest(BaseModel):
    homeowner_id: int
    question: str
    property_data: dict | None = None
    vault_entries: list[dict] | None = None


# ---------------------------------------------------------------------------
# Photo Analysis Agent (LangGraph)
# ---------------------------------------------------------------------------

class PhotoAnalysisState(TypedDict):
    photo_urls: list[str]
    address: str | None
    zip_code: str | None
    property_type: str
    detections: list[dict]
    market_rates: dict
    opportunity_score: float
    trade_needed: str
    estimated_cost: float
    summary: str


def analyze_photos(state: PhotoAnalysisState) -> PhotoAnalysisState:
    """Use GPT-4o Vision to detect issues in property photos."""
    messages = [
        SystemMessage(content="""You are a property inspection AI. Analyze the photos and detect:
1. Damage or wear (roof, siding, windows, paint, landscaping, etc.)
2. Maintenance needs (gutter cleaning, pressure washing, tree trimming)
3. Upgrade opportunities (energy efficiency, curb appeal, safety)

Return JSON with: detections (array of {issue, severity: low/medium/high, trade, description, confidence}),
primary_trade (most needed trade), estimated_cost_range (min/max)."""),
    ]

    content_parts = [{"type": "text", "text": f"Property at {state.get('address', 'unknown address')}. Analyze these photos:"}]
    for url in state["photo_urls"][:10]:
        content_parts.append({"type": "image_url", "image_url": {"url": url, "detail": "high"}})

    messages.append(HumanMessage(content=content_parts))

    response = llm.invoke(messages)

    try:
        text = response.content
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
        parsed = json.loads(text.strip())
    except (json.JSONDecodeError, IndexError):
        parsed = {"detections": [], "primary_trade": "General", "estimated_cost_range": {"min": 0, "max": 0}}

    detections = parsed.get("detections", [])
    trade = parsed.get("primary_trade", "General")
    cost_range = parsed.get("estimated_cost_range", {"min": 0, "max": 0})
    avg_cost = (cost_range.get("min", 0) + cost_range.get("max", 0)) / 2

    return {
        **state,
        "detections": detections,
        "trade_needed": trade,
        "estimated_cost": avg_cost,
    }


def research_market_rates(state: PhotoAnalysisState) -> PhotoAnalysisState:
    """Look up local market rates for the detected trade via ATTOM."""
    zip_code = state.get("zip_code", "")
    trade = state.get("trade_needed", "General")

    market_rates = {
        "zip_code": zip_code,
        "trade": trade,
        "avg_job_value": state["estimated_cost"],
        "demand_level": "high" if len(state.get("detections", [])) > 2 else "medium",
    }

    if ATTOM_API_KEY and zip_code:
        try:
            resp = httpx.get(
                f"https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail",
                params={"postalcode": zip_code},
                headers={"apikey": ATTOM_API_KEY, "Accept": "application/json"},
                timeout=10,
            )
            if resp.status_code == 200:
                data = resp.json()
                market_rates["attom_data"] = {
                    "median_home_value": data.get("property", [{}])[0].get("assessment", {}).get("assessed", {}).get("assdttlvalue"),
                    "property_count": len(data.get("property", [])),
                }
        except Exception:
            pass

    return {**state, "market_rates": market_rates}


def score_opportunity(state: PhotoAnalysisState) -> PhotoAnalysisState:
    """Score the opportunity quality (0-100) based on detections and market data."""
    detections = state.get("detections", [])
    if not detections:
        return {**state, "opportunity_score": 0, "summary": "No issues detected."}

    severity_weights = {"high": 30, "medium": 15, "low": 5}
    score = min(100, sum(severity_weights.get(d.get("severity", "low"), 5) for d in detections))

    high_count = sum(1 for d in detections if d.get("severity") == "high")
    if high_count > 0:
        score = min(100, score + 20)

    summary_parts = []
    for d in detections[:5]:
        summary_parts.append(f"- {d.get('issue', 'Unknown')}: {d.get('description', '')} ({d.get('severity', 'low')} severity)")

    summary = f"Found {len(detections)} issue(s). Primary trade: {state['trade_needed']}. Est. cost: ${state['estimated_cost']:,.0f}\n" + "\n".join(summary_parts)

    return {**state, "opportunity_score": score, "summary": summary}


photo_analysis_graph = StateGraph(PhotoAnalysisState)
photo_analysis_graph.add_node("analyze", analyze_photos)
photo_analysis_graph.add_node("research", research_market_rates)
photo_analysis_graph.add_node("score", score_opportunity)
photo_analysis_graph.set_entry_point("analyze")
photo_analysis_graph.add_edge("analyze", "research")
photo_analysis_graph.add_edge("research", "score")
photo_analysis_graph.add_edge("score", END)
photo_pipeline = photo_analysis_graph.compile()


# ---------------------------------------------------------------------------
# Partner Matching Agent
# ---------------------------------------------------------------------------

class PartnerMatchState(TypedDict):
    opportunity_id: int
    trade: str
    zip_code: str
    estimated_value: float
    urgency: str
    candidates: list[dict]
    ranked: list[dict]
    best_match: dict | None


def fetch_candidates(state: PartnerMatchState) -> PartnerMatchState:
    """Fetch eligible partners from ProLnk API."""
    try:
        resp = httpx.get(
            f"{PROLNK_API_URL}/api/trpc/directory.searchProsByZip",
            params={"input": json.dumps({"zip": state["zip_code"], "trade": state["trade"]})},
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            candidates = data.get("result", {}).get("data", [])
            return {**state, "candidates": candidates}
    except Exception:
        pass
    return {**state, "candidates": []}


def rank_partners(state: PartnerMatchState) -> PartnerMatchState:
    """Score and rank candidates using multi-factor model."""
    candidates = state.get("candidates", [])
    if not candidates:
        return {**state, "ranked": [], "best_match": None}

    scored = []
    for c in candidates:
        score = 0
        tier = c.get("tier", "scout")
        tier_scores = {"enterprise": 50, "company": 40, "crew": 30, "pro": 20, "scout": 10}
        score += tier_scores.get(tier, 10)

        win_rate = c.get("winRate", 0)
        score += min(30, win_rate * 30)

        response_speed = c.get("avgResponseMinutes", 999)
        if response_speed < 15:
            score += 20
        elif response_speed < 60:
            score += 10

        scored.append({**c, "match_score": score})

    ranked = sorted(scored, key=lambda x: x["match_score"], reverse=True)
    return {**state, "ranked": ranked, "best_match": ranked[0] if ranked else None}


match_graph = StateGraph(PartnerMatchState)
match_graph.add_node("fetch", fetch_candidates)
match_graph.add_node("rank", rank_partners)
match_graph.set_entry_point("fetch")
match_graph.add_edge("fetch", "rank")
match_graph.add_edge("rank", END)
match_pipeline = match_graph.compile()


# ---------------------------------------------------------------------------
# Outreach Drafting Agent
# ---------------------------------------------------------------------------

async def draft_outreach(req: OutreachDraftRequest) -> dict:
    """Draft a personalized outreach message from ProLnk to the partner."""
    messages = [
        SystemMessage(content="""You are ProLnk's outreach specialist. Draft a short, professional message
to a home service partner about a new job opportunity. Be warm but concise. Include:
1. Greeting using their name
2. Brief job description
3. Estimated value
4. Why they're a great fit
5. Clear CTA to accept the lead

Keep it under 150 words. Sound human, not corporate."""),
        HumanMessage(content=f"""Draft outreach for:
Partner: {req.partner_name} ({req.partner_business})
Homeowner: {req.homeowner_name}
Job: {req.job_description}
Trade: {req.trade}
Est. Value: ${req.estimated_value:,.0f}"""),
    ]

    response = await llm_mini.ainvoke(messages)

    subject = f"New {req.trade} opportunity — ${req.estimated_value:,.0f}"

    return {
        "subject": subject,
        "body": response.content,
        "partner_name": req.partner_name,
        "estimated_value": req.estimated_value,
    }


# ---------------------------------------------------------------------------
# Homeowner Advisor Agent (Stateful)
# ---------------------------------------------------------------------------

async def advise_homeowner(req: AdvisorRequest) -> dict:
    """Answer homeowner questions using their property data and vault entries."""
    context_parts = []

    if req.property_data:
        context_parts.append(f"Property details: {json.dumps(req.property_data, indent=2)}")

    if req.vault_entries:
        entries_summary = "\n".join(
            f"- {e.get('type', 'unknown')}: {e.get('description', '')} (recorded {e.get('date', 'unknown')})"
            for e in req.vault_entries[:20]
        )
        context_parts.append(f"Home Health Vault entries:\n{entries_summary}")

    context = "\n\n".join(context_parts) if context_parts else "No property data available."

    messages = [
        SystemMessage(content=f"""You are ProLnk's home advisor AI. You help homeowners understand their
property maintenance needs, upcoming costs, and home improvement priorities.

Use the property data and vault entries below to give personalized advice.
Be practical, specific, and money-conscious. If you don't have enough data, say so.

{context}"""),
        HumanMessage(content=req.question),
    ]

    response = await llm_mini.ainvoke(messages)

    return {
        "answer": response.content,
        "homeowner_id": req.homeowner_id,
    }


# ---------------------------------------------------------------------------
# FastAPI Endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
async def health():
    return {"status": "ok", "service": "prolnk-ai-pipeline", "version": "1.0.0"}


@app.post("/analyze")
async def analyze(req: PhotoAnalysisRequest):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY not configured")

    result = photo_pipeline.invoke({
        "photo_urls": req.photo_urls,
        "address": req.address,
        "zip_code": req.zip_code,
        "property_type": req.property_type,
        "detections": [],
        "market_rates": {},
        "opportunity_score": 0.0,
        "trade_needed": "",
        "estimated_cost": 0.0,
        "summary": "",
    })

    return {
        "detections": result["detections"],
        "trade_needed": result["trade_needed"],
        "estimated_cost": result["estimated_cost"],
        "opportunity_score": result["opportunity_score"],
        "market_rates": result["market_rates"],
        "summary": result["summary"],
    }


@app.post("/match")
async def match(req: PartnerMatchRequest):
    result = match_pipeline.invoke({
        "opportunity_id": req.opportunity_id,
        "trade": req.trade,
        "zip_code": req.zip_code,
        "estimated_value": req.estimated_value,
        "urgency": req.urgency,
        "candidates": [],
        "ranked": [],
        "best_match": None,
    })

    return {
        "best_match": result["best_match"],
        "ranked_candidates": result["ranked"][:10],
        "total_candidates": len(result["candidates"]),
    }


@app.post("/draft")
async def draft(req: OutreachDraftRequest):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY not configured")
    return await draft_outreach(req)


@app.post("/advise")
async def advise(req: AdvisorRequest):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OPENAI_API_KEY not configured")
    return await advise_homeowner(req)
