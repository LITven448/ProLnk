import { useState } from 'react';

const steps = [
  {
    num: 1,
    title: "Get Pre-Approved",
    duration: "1–3 days",
    desc: "Know your exact budget before you tour anything. A pre-approval letter shows sellers you're serious and can close.",
    tips: ["Compare at least 3 lenders — rates vary by 0.5–1%", "Pre-approval ≠ pre-qualification (pre-approval is stronger)", "Credit pulls within 14 days count as one inquiry"],
  },
  {
    num: 2,
    title: "Find a Buyer's Agent",
    duration: "1 day",
    desc: "A buyer's agent is free to you — the seller pays commission. In DFW's fast market, an agent with hyper-local expertise is critical.",
    tips: ["Interview 2–3 agents before committing", "Ask about their average days-on-market for buyers", "Look for agents who specialize in your target zip codes"],
  },
  {
    num: 3,
    title: "Tour Homes",
    duration: "1–4 weeks",
    desc: "DFW's market moves extremely fast. Be mentally ready to submit an offer the same day you tour. Hesitation costs deals.",
    tips: ["Tour no more than 5–6 homes per day or decision fatigue sets in", "Bring a checklist — you'll mix up homes fast", "Drive neighborhoods at night and on weekends to get the full picture"],
  },
  {
    num: 4,
    title: "Make an Offer",
    duration: "Same day",
    desc: "DFW avg list-to-offer is 3 days. In hot micro-markets (Frisco, McKinney, Prosper), expect same-day competition. Include escalation clauses in heated markets.",
    tips: ["Escalation clause: auto-beat competing offers up to your max", "Larger earnest money signals seriousness", "Waiving the appraisal contingency is risky — only if financially prepared"],
  },
  {
    num: 5,
    title: "Under Contract",
    duration: "2–5 days",
    desc: "Once seller accepts, the option period begins — typically 7–10 days. Pay the option fee ($200–500) for the right to terminate for any reason.",
    tips: ["Option fee is negotiable but non-refundable", "Earnest money (~1%) is held in escrow and refundable if you exit during option period", "Start scheduling inspections immediately — good inspectors book fast"],
  },
  {
    num: 6,
    title: "Inspection & Negotiation",
    duration: "7–10 days",
    desc: "Your option period is your exit window. Use it aggressively — hire a licensed inspector and negotiate repairs or a price reduction based on findings.",
    tips: ["Always get a foundation inspection — Texas clay soil causes significant movement", "Hire a licensed inspector, not just whoever the agent recommends", "Request credits instead of repairs when possible — you control the quality"],
  },
  {
    num: 7,
    title: "Appraisal",
    duration: "3–5 days",
    desc: "Your lender orders the appraisal after the option period. The home must appraise at or above the purchase price. If it comes in low, you'll need to renegotiate or cover the gap.",
    tips: ["Low appraisals happen in bidding-war conditions", "Appraisal gap coverage clauses are common in competitive offers", "You can dispute an appraisal if comparable sales were missed"],
  },
  {
    num: 8,
    title: "Closing Day",
    duration: "30 days from contract",
    desc: "Bring a cashier's check (or wire funds in advance). Sign 100+ pages of documents. Hand over keys. You own a home.",
    tips: ["Do a final walkthrough 24 hours before closing", "Wire fraud is real — verify wire instructions via phone call, not email", "Utilities should be transferred to your name the day before closing"],
  },
];

const warnings = [
  {
    icon: "⚠️",
    title: "Foundation Addendum",
    body: "Always include a foundation inspection. DFW's expansive clay soil causes significant foundation movement. Budget $300–600 for an elevation survey — it could save you $20K+ in future repairs.",
  },
  {
    icon: "📋",
    title: "HOA Review Period",
    body: "Request HOA documents (CC&Rs, financials, meeting minutes) during the option period. Review for restrictions, pending assessments, and litigation. Some DFW HOAs have fees exceeding $500/month.",
  },
  {
    icon: "💧",
    title: "Flood Zone Check",
    body: "Check FEMA's flood map (msc.fema.gov) for every property you consider. DFW experienced major flooding in 2015 and 2019. Flood insurance adds $1,500–5,000/year in high-risk zones.",
  },
];

export default function DFWHomeBuyingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ paddingTop: 60, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>DFW Real Estate</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>DFW Home Buying Process</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, margin: 0, maxWidth: 600 }}>Step-by-step guide to buying a home in the Dallas-Fort Worth market — from pre-approval to closing day.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40, marginTop: 48 }}>
          <div>
            <div style={{ position: 'sticky', top: 24 }}>
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, width: '100%', background: activeStep === i ? 'rgba(245,200,66,0.12)' : 'transparent',
                    border: 'none', borderLeft: activeStep === i ? '3px solid #F5C842′ : '3px solid transparent',
                    padding: '14px 16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', marginBottom: 4, borderRadius: '0 8px 8px 0',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: activeStep === i ? '#F5C842′ : ’rgba(255,255,255,0.08)', color: activeStep === i ? '#0A1628′ : '#fff',
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>{s.num}</div>
                  <div>
                    <div style={{ color: activeStep === i ? '#F5C842′ : '#fff', fontSize: 13, fontWeight: 600 }}>{s.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>{s.duration}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 36, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#F5C842', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#0A1628′ }}>
                  {steps[activeStep].num}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{steps[activeStep].title}</h2>
                  <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 600, marginTop: 4 }}>Timeline: {steps[activeStep].duration}</div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.7, margin: '0 0 28px' }}>{steps[activeStep].desc}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>Pro Tips</div>
                {steps[activeStep].tips.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <span style={{ color: '#F5C842', flexShrink: 0 }}>→</span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}
                  style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: activeStep === 0 ? 'not-allowed' : 'pointer', opacity: activeStep === 0 ? 0.3 : 1, fontSize: 14 }}>
                  ← Previous
                </button>
                <button onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1}
                  style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#F5C842', color: '#0A1628', cursor: activeStep === steps.length - 1 ? 'not-allowed' : 'pointer', opacity: activeStep === steps.length - 1 ? 0.3 : 1, fontSize: 14, fontWeight: 700 }}>
                  Next Step →
                </button>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>DFW-Specific Warnings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {warnings.map((w, i) => (
                  <div key={i} style={{ background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 12, padding: 24 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 22 }}>{w.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{w.title}</div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7 }}>{w.body}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.12), rgba(245,200,66,0.04))', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 16, padding: 32, marginTop: 40 }}>
              <div style={{ fontSize: 22 }}>🏠</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: '12px 0 8px' }}>TrustyPro Tip: AI Inspection Before Option Period Ends</h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px' }}>
                Get a TrustyPro home scan BEFORE the option period ends. Our AI analysis often catches things standard inspectors miss — foundation micro-cracks, HVAC inefficiency patterns, roof degradation signals. Buyers who use TrustyPro during option period negotiate an avg $4,200 more in credits.
              </p>
              <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}>Get Your Pre-Purchase Scan →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
