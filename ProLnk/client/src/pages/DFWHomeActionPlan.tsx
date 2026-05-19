import { useState } from 'react';

type Situation = "new_buyer" | "current_owner" | "preparing_sell" | "investor";
type Budget = "under_5k" | "5k_20k" | "over_20k";

interface Plan {
  weeks: { period: string; tasks: string[] }[];
}

function generatePlan(situation: Situation, goals: string, budget: Budget): Plan {
  const budgetLabel = budget === "under_5k" ? "under $5K" : budget === "5k_20k" ? "$5K–$20K" : "over $20K";

  const plans: Record<Situation, Plan> = {
    new_buyer: {
      weeks: [
        { period: "Week 1–2: Financial Foundation", tasks: [
          "Get pre-approved with 3 different lenders — compare rates and fees, not just rate",
          "Pull all 3 credit bureau reports and dispute any errors immediately",
          "Calculate true budget including taxes (1.7–2.2%), insurance ($150–250/mo), HOA, and maintenance reserve",
          budget === "under_5k" ? "Explore TSAHC DPA program — Texas State Affordable Housing offers down payment assistance" :
          budget === "5k_20k" ? "Target homes priced so 3.5% FHA or 5% conventional down payment fits your cash reserve" :
          "Consider 20% down to eliminate PMI — saves $150–300/month on typical DFW purchase",
        ]},
        { period: "Week 3–4: Market Research", tasks: [
          "Pick 3 target submarkets and track new listings daily on Zillow and NTREIS",
          "Drive target neighborhoods on weekday and weekend — feel the commute and community",
          "Attend 2–3 open houses even before ready — learn how to evaluate homes quickly",
          "Identify your must-haves vs. nice-to-haves — write them down and rank by priority",
        ]},
        { period: "Week 5–6: Team Assembly", tasks: [
          "Interview 3 buyer agents — ask for their last 10 closed transactions and average days to close",
          "Select a real estate attorney for closing — Texas uses attorneys, not title companies, in most deals",
          "Set up automatic MLS alerts for your exact criteria — speed matters in DFW",
          "Build your vendor list now: inspector, plumber, electrician, HVAC tech for post-offer diligence",
        ]},
        { period: "Week 7–10: Active Search", tasks: [
          "Tour minimum 10 homes before making an offer — calibrates your price-quality expectations",
          "Understand escalation clauses and waiver strategies for competitive offers",
          "Budget $400–600 for home inspection — never waive it regardless of market pressure",
          "Negotiate seller concessions for closing costs — in slower markets, 2–3% is achievable",
        ]},
        { period: "Week 11–13: Closing Preparation", tasks: [
          "Lock your rate at least 30 days before expected close",
          "Do not change jobs or open new credit accounts during underwriting",
          "Schedule final walkthrough 24 hours before closing — verify all agreed repairs completed",
          "File homestead exemption within 30 days of closing at your county appraisal district",
        ]},
      ],
    },
    current_owner: {
      weeks: [
        { period: "Week 1–2: Equity and Financial Audit", tasks: [
          "Pull your current Zillow Zestimate and compare to recent sales within 0.5 miles",
          "Request a free CMA from a local agent — no obligation, gives you real market data",
          "Review your mortgage statement — calculate remaining principal and current LTV",
          "Check your property tax appraisal at DCAD.org or tad.org — protest if overvalued",
        ]},
        { period: "Week 3–4: Home Health Assessment", tasks: [
          "Conduct a room-by-room inspection starting with roof, HVAC, plumbing, and electrical",
          "Document all appliance ages, warranty status, and last service dates",
          budget === "under_5k" ? "Prioritize deferred maintenance: caulking, weather stripping, HVAC filter replacement ($500–1,500)" :
          budget === "5k_20k" ? "Invest in high-ROI projects: fresh paint interior ($3–6K), landscaping refresh ($2–4K), minor kitchen updates" :
          "Consider major upgrades with strong ROI: new HVAC ($8–15K), kitchen renovation, primary bath remodel",
          "Get 3 quotes for any work over $1,000 — DFW contractor pricing varies dramatically",
        ]},
        { period: "Week 5–7: Protection and Optimization", tasks: [
          "Shop homeowners insurance — DFW rates rising 8–12% annually, comparison shopping saves $400–800/year",
          "Review HOA financials if applicable — request reserve fund study and recent meeting minutes",
          "Install smart home devices: thermostat, water sensors, security camera — adds value and reduces risk",
          "Document all home improvements with photos and receipts — affects resale value and tax basis",
        ]},
        { period: "Week 8–10: Equity Building Strategy", tasks: [
          "Calculate payoff timeline and evaluate biweekly payment option — cuts 5–7 years off a 30-year loan",
          "Research HELOC options if equity exceeds 20% LTV — useful funding for future improvements",
          "Review homestead exemption status and any additional exemptions you qualify for",
          goals.toLowerCase().includes("sell") ? "Begin staging mental preparation — declutter and depersonalize one room per week" : "Create a 3-year maintenance calendar with estimated costs for each major system",
        ]},
        { period: "Week 11–13: Long-Term Planning", tasks: [
          "Review your estate plan — does your property have a clear transfer mechanism?",
          "Evaluate your neighborhood trajectory — monitor new development, school ratings, and infrastructure investment",
          "Build a home maintenance fund: 1–1.5% of home value annually as dedicated savings",
          "Create a relationship with a trustworthy local contractor before you need emergency repairs",
        ]},
      ],
    },
    preparing_sell: {
      weeks: [
        { period: "Week 1–2: Market Positioning", tasks: [
          "Get 3 CMAs from different agents — compare their price recommendations and listing strategies",
          "Research all active and pending listings in your price range within 1 mile — know your competition",
          "Pull 12 months of closed sales in your submarket — understand seasonal patterns",
          "Choose spring listing window (February–April) unless your timeline forces otherwise",
        ]},
        { period: "Week 3–4: Pre-Listing Repairs", tasks: [
          "Fix all visible deferred maintenance: cracked tiles, dripping faucets, door hardware",
          "Repaint interior in neutral gray-greige tones — most impactful single investment",
          budget === "under_5k" ? "Deep clean, touch-up paint, and professional carpet cleaning ($1,500–3,000 total)" :
          budget === "5k_20k" ? "Professional staging consultation, kitchen hardware and lighting update, landscaping refresh" :
          "Full professional staging ($3–5K), primary bath refresh, smart home upgrades, and curb appeal investment",
          "Address any known material defects before listing — disclosure requirements in Texas are strict",
        ]},
        { period: "Week 5–6: Photography and Marketing Prep", tasks: [
          "Hire professional real estate photographer — non-negotiable in DFW market",
          "Request drone photography for large lots or homes near golf courses, lakes, or parks",
          "Prepare your home for photography: remove personal photos, clear countertops, park cars elsewhere",
          "Gather all documents: HOA financials, warranty paperwork, utility history, permit records",
        ]},
        { period: "Week 7–9: Active Listing", tasks: [
          "Set your price at or slightly below top comparable — overpricing is the single biggest seller mistake",
          "Plan for showing availability at least 6 days/week — restrictions reduce offer count significantly",
          "Respond to all offers within 24 hours — DFW buyers move to backup options quickly",
          "Evaluate offers on net proceeds, not just price — cash, financing, contingencies, and timeline all matter",
        ]},
        { period: "Week 10–13: Closing and Transition", tasks: [
          "Negotiate leaseback if you need time to find your next home — common in DFW",
          "Begin moving logistics: storage unit, moving company booked 30+ days ahead",
          "Forward mail and update address for: banks, IRS, insurance, subscriptions",
          "Cancel or transfer HOA membership, utilities, and home services on closing day",
        ]},
      ],
    },
    investor: {
      weeks: [
        { period: "Week 1–2: Strategy and Criteria Definition", tasks: [
          "Define your investment strategy: buy-and-hold, BRRRR, fix-and-flip, or new construction",
          "Set specific acquisition criteria: price range, zip codes, minimum cap rate or cash-on-cash return",
          "Calculate your all-in numbers: ARV, rehab cost, financing cost, holding cost, and profit margin",
          budget === "under_5k" ? "Explore creative financing: subject-to, seller financing, and partnership structures to deploy limited capital" :
          budget === "5k_20k" ? "Target BRRRR deals in up-and-coming DFW submarkets: South Dallas, East Fort Worth, West Mesquite" :
          "Consider new construction partnerships in Celina, Prosper, Forney — builders offering wholesale deals to buyers taking full subdivisions",
        ]},
        { period: "Week 3–4: Team and Systems", tasks: [
          "Build your contractor bench: general contractor, plumber, electrician, HVAC, roofer",
          "Find a transaction-experienced buyer agent who understands investor math",
          "Establish relationships with 2–3 hard money lenders before you need them",
          "Set up deal analysis spreadsheet or use DealCheck — run numbers before touring any property",
        ]},
        { period: "Week 5–7: Deal Flow Activation", tasks: [
          "Attend DFW REIA monthly meeting — introduce yourself, bring business cards",
          "Register on wholesaler email lists: DFW Wholesale Deals, Texas Wholesale Homes",
          "Set up MLS alerts for distressed indicators: price reduced, days on market 60+, estate sales",
          "Drive target neighborhoods for vacant and deteriorating properties — direct mail to those owners",
        ]},
        { period: "Week 8–10: Offer and Acquisition", tasks: [
          "Make low but defensible offers with analysis attached — show your work to get taken seriously",
          "Plan for inspection period to validate rehab scope — adjust offer accordingly",
          "Build contingency into rehab budget: 15–20% over initial contractor estimate",
          "Secure tenant before final rehab if buy-and-hold — reduces carrying cost risk",
        ]},
        { period: "Week 11–13: Operations Setup", tasks: [
          "Set up LLC and separate bank account for each investment property",
          "Research property management companies if not self-managing: typical fee is 8–10% of gross rent",
          "Build a property management system: lease template, maintenance request process, rent collection",
          "Document your DFW deal analysis for future fundraising — track every deal you analyze and acquire",
        ]},
      ],
    },
  };

  return plans[situation];
}

export default function DFWHomeActionPlan() {
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState<Situation | "">("");
  const [goals, setGoals] = useState("");
  const [budget, setBudget] = useState<Budget | "">("");
  const [plan, setPlan] = useState<Plan | null>(null);

  const situations: { value: Situation; label: string }[] = [
    { value: "new_buyer", label: "🏠 New Buyer — Looking to Purchase" },
    { value: "current_owner", label: "🔑 Current Homeowner — Want to Optimize" },
    { value: "preparing_sell", label: "🏷️ Preparing to Sell in Next 6 Months" },
    { value: "investor", label: "📈 Real Estate Investor" },
  ];

  const budgets: { value: Budget; label: string }[] = [
    { value: "under_5k", label: "Under $5,000" },
    { value: "5k_20k", label: "$5,000 – $20,000" },
    { value: "over_20k", label: "Over $20,000" },
  ];

  const handleGenerate = () => {
    if (situation && budget) {
      setPlan(generatePlan(situation as Situation, goals, budget as Budget));
      setStep(4);
    }
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK ACTION PLANNER — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Your 90-Day DFW Home Action Plan 📋</h1>
        <p style={{ color: "#8899AA", fontSize: 16, marginBottom: 40 }}>Answer 3 questions and get a personalized week-by-week action plan for your DFW homeowner situation.</p>

        {step >= 1 && (
          <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step 1: What is your current situation?</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {situations.map((s) => (
                <button key={s.value} onClick={() => { setSituation(s.value); setStep(Math.max(step, 2)); }}
                  style={{ background: situation === s.value ? "#F5E642" : "#1E2D42", color: situation === s.value ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 2 && (
          <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step 2: What is your primary goal? (optional — personalizes your plan)</h2>
            <input value={goals} onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. build equity, maximize sale price, generate rental income, reduce monthly costs..."
              style={{ width: "100%", background: "#0A1628", border: "1px solid #2D3748", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
            <button onClick={() => setStep(Math.max(step, 3))} style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 700 }}>
              Continue →
            </button>
          </div>
        )}

        {step >= 3 && (
          <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Step 3: What is your available budget for this plan?</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              {budgets.map((b) => (
                <button key={b.value} onClick={() => setBudget(b.value)}
                  style={{ background: budget === b.value ? "#F5E642" : "#1E2D42", color: budget === b.value ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  {b.label}
                </button>
              ))}
            </div>
            {budget && (
              <button onClick={handleGenerate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "14px 28px", cursor: "pointer", fontWeight: 800, fontSize: 16 }}>
                🚀 Generate My 90-Day Action Plan
              </button>
            )}
          </div>
        )}

        {step === 4 && plan && (
          <div>
            <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, marginBottom: 28, textAlign: "center" }}>
              <div style={{ color: "#0A1628", fontWeight: 800, fontSize: 20 }}>Your Personalized 90-Day DFW Action Plan ✅</div>
              <div style={{ color: "#0A1628", fontSize: 14, marginTop: 4 }}>Based on your situation and budget — updated for DFW 2026 market conditions</div>
            </div>
            {plan.weeks.map((w, wi) => (
              <div key={wi} style={{ background: "#111D2E", borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>{w.period}</div>
                {w.tasks.map((task, ti) => (
                  <div key={ti} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 10, display: "flex", gap: 10 }}>
                    <span style={{ color: "#F5E642", minWidth: 20 }}>✓</span>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ background: "#111D2E", borderRadius: 12, padding: 24, marginTop: 8, textAlign: "center" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Need a DFW Home Services Pro?</div>
              <div style={{ color: "#8899AA", fontSize: 14 }}>ProLnk connects you with vetted local contractors for every item on your action plan. Join the waitlist to get matched first.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
