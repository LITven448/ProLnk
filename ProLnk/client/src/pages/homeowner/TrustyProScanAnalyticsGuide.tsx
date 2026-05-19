import { useState } from 'react';

type Finding = {
  keywords: string[];
  explanation: string;
  action: string;
  cost: string;
};

const findings: Finding[] = [
  {
    keywords: ['foundation crack', 'foundation movement', 'foundation shift', 'foundation settlement'],
    explanation: "Foundation cracking or movement is classified under Structural — the highest-weighted category in your health score. In DFW, expansive clay soil causes foundations to move seasonally as it absorbs and releases moisture. Minor hairline cracks (<1/4 inch) are often cosmetic. Diagonal stair-step cracks in brick, doors that stick seasonally, or cracks wider than 1/4 inch warrant professional assessment.",
    action: "Schedule a foundation inspection with a licensed structural engineer (not a foundation company — they have an incentive to sell repairs). An engineer gives an unbiased opinion. If piers are recommended, get 3 bids from SPIO-certified pier contractors.",
    cost: "Engineer inspection: $300–$800. Foundation repair if needed: $3,000–$15,000+ depending on severity and number of piers.",
  },
  {
    keywords: ['roof', 'shingle', 'flashing', 'gutter', 'soffit', 'fascia'],
    explanation: "Roof findings fall under the Envelope category — the moisture barrier of your home. Roof condition is the second most impactful item for insurance rates and buyer confidence. TrustyPro's AI analyzes visible shingle condition, flashing integrity at penetrations, and gutter attachment. DFW hail events can damage shingles without immediate visible leaking.",
    action: "For any Warning or Critical roof finding: Get a professional roof inspection. Insurance adjusters often miss hail damage that roofing contractors find. If hail occurred in your area in the last 2 years, file an inspection request with your carrier regardless of scan findings.",
    cost: "Professional roof inspection: Free–$150. Roof repair (patching): $200–$800. Full roof replacement: $8,000–$18,000 depending on square footage and material.",
  },
  {
    keywords: ['hvac', 'ac', 'air handler', 'condenser', 'ductwork', 'furnace', 'heat'],
    explanation: "HVAC findings fall under Mechanical — the second-highest weighted category. In DFW, HVAC systems run 9–10 months per year, causing faster wear than most US markets. The AI evaluates visible condenser condition, age indicators from equipment labels, and any signs of refrigerant issues, rust, or damage at the air handler.",
    action: "For Critical HVAC findings: Have an HVAC tech inspect and service the system before peak season. Replace filters monthly in summer. Systems 12+ years old in DFW are candidates for proactive replacement planning regardless of current function — efficiency drops dramatically in the final years.",
    cost: "Annual HVAC tune-up: $80–$150. Refrigerant recharge: $150–$400. Full system replacement: $5,000–$12,000 depending on tonnage and efficiency rating.",
  },
  {
    keywords: ['drainage', 'grading', 'slope', 'standing water', 'erosion'],
    explanation: "Drainage findings fall under Site — which includes everything that affects how water approaches and flows away from your home. DFW clay soil drains poorly, making proper grading critical. The AI detects visible slope issues, erosion patterns, and areas where water appears to pool near the foundation. This is the most preventable category of damage.",
    action: "Improve grading so the yard slopes 6 inches downward over the first 10 feet from the foundation. Extend all downspouts to deposit water at least 6 feet from the home. Consider French drain installation if low spots persist after grading correction.",
    cost: "Grading correction: $500–$2,500. Downspout extensions: $30–$150 per downspout. French drain system: $1,500–$5,000.",
  },
  {
    keywords: ['window', 'door', 'seal', 'weatherstrip', 'gap', 'caulk'],
    explanation: "Window and door findings appear in both the Envelope category (air/moisture sealing) and Interior (if condensation between panes is detected). Failed window seals cause fogging between panes and significant energy loss. In DFW's climate, proper sealing is critical for both energy efficiency and moisture control.",
    action: "Fogged windows (seal failure): Replace the IGU (insulated glass unit) rather than the whole window — usually 40–60% cheaper. Failed caulk around frames: Re-caulk exterior joints with silicone-based caulk before DFW's fall rains. Weatherstripping on doors: DIY replacement takes 30 minutes and costs $15–$30 per door.",
    cost: "IGU replacement (per window): $150–$400. Full window replacement: $400–$900 per window. Caulking project: $50–$300 depending on scope.",
  },
  {
    keywords: ['electrical', 'panel', 'outlet', 'wiring', 'gfci', 'circuit'],
    explanation: "Electrical findings appear under Mechanical. The AI flags visible hazards like damaged service entrance cables, panel rust, overcrowded junction boxes, or missing GFCI protection in wet areas. Electrical issues carry high health-score weight because of fire and safety risk. Confidence ratings for electrical findings are typically lower than structural — electrical systems are largely hidden.",
    action: "Any Critical or >80% confidence electrical finding should be evaluated by a licensed electrician within 30 days. Do not DIY electrical panels or service entrance work in Texas — it requires permits and licensed contractors. GFCI outlets in kitchens and bathrooms are required by current code and inexpensive to add.",
    cost: "Electrician service call: $80–$150. GFCI outlet installation: $100–$200 each. Panel upgrade (100A to 200A): $1,500–$3,000. Full rewire: $8,000–$20,000+.",
  },
];

export default function TrustyProScanAnalyticsGuide() {
  const [findingText, setFindingText] = useState('');
  const [result, setResult] = useState<Finding | null>(null);
  const [searched, setSearched] = useState(false);

  const interpret = () => {
    const lower = findingText.toLowerCase();
    const found = findings.find(f => f.keywords.some(k => lower.includes(k)));
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div style={{ background: '#070c14', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 1 }}>TrustyPro Scan Intelligence</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#f1f5f9', marginBottom: 16, lineHeight: 1.2 }}>
          Understanding Your TrustyPro Scan Results — What the AI Is Telling You
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
          Your scan results are packed with information — but only if you know how to read them. This guide decodes every element so you can take the right action with confidence.
        </p>

        {/* How to Read Results */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>📋 How to Read Your Scan Results</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                label: 'Health Score 0–100',
                desc: 'Weighted average across all detected systems and conditions. It’s not a simple average — Structural and Mechanical items carry more weight than cosmetic findings. A score of 75 with no Critical items is very different from a 75 with two Critical findings.',
                icon: '💯',
              },
              {
                label: 'Confidence %',
                desc: 'How certain the AI is about each finding based on image clarity, lighting, and angle. >80% = high confidence, act on it. 50–80% = verify with a professional before spending money. <50% = preliminary flag, schedule a closer look.',
                icon: '🎯',
              },
              {
                label: 'Change Indicators (↑ ↓ New)',
                desc: '"↑" means condition improved since your last scan. "↓" means it degraded — pay attention here. "New" means this is the first time the AI detected this finding. New findings always warrant review regardless of severity.',
                icon: '🔄',
              },
              {
                label: 'Issue Severity',
                desc: 'Critical = act within 30 days (safety or imminent damage risk). Warning = act within 90 days. Monitor = watch over next 6 months with another scan. Good = no action needed, condition is acceptable.',
                icon: '🚦',
              },
            ].map(item => (
              <div key={item.label} style={{ background: '#0f1a24', border: '1px solid #1a2a3a', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>{item.label}</div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Categories */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🏠 What Each System Category Means</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { label: 'Structural', weight: 'Highest Weight', desc: 'Foundation, framing, roofline. Problems here affect the safety and insurability of the entire home. Every other finding is secondary.', color: '#ef4444′ },
              { label: 'Mechanical', weight: 'Second Highest', desc: 'HVAC, plumbing, and visible electrical components. In DFW, HVAC runs nearly year-round — mechanical wear is faster here than most markets.', color: '#f97316′ },
              { label: 'Envelope', weight: 'Third Highest', desc: 'Roof, windows, doors, and siding. Moisture barrier integrity. A compromised envelope leads to structural damage over time.', color: '#eab308′ },
              { label: 'Site', weight: 'Supporting', desc: 'Drainage, grading, and landscaping impact on the home. The most preventable damage category — most drainage issues are fixable for under $2,000.', color: '#22c55e' },
              { label: 'Interior', weight: 'Observable Only', desc: 'Floors, walls, ceilings, and visible systems. The AI can only assess what’s visible — interior findings often point to underlying issues in other categories.', color: '#38bdf8′ },
            ].map(item => (
              <div key={item.label} style={{ background: '#0f1a24', border: `1px solid ${item.color}33`, borderRadius: 10, padding: 18, display: 'flex', gap: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, color: '#f8fafc' }}>{item.label}</span>
                    <span style={{ color: item.color, fontSize: 12, fontWeight: 600 }}>{item.weight}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Data */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🔧 How to Use Your Scan Data</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                scenario: 'Before a Storm',
                icon: '⛈️',
                desc: 'Document current condition before high-wind or hail events. Your scan timestamp creates an objective pre-storm baseline that’s invaluable for insurance claims. If damage occurs, your scan proves what was already there vs. what the storm caused.',
              },
              {
                scenario: 'Before Selling',
                icon: '🏷️',
                desc: '"TrustyPro verified: Foundation stable, roof in good condition, HVAC serviced." Use positive scan findings in your listing. Buyers pay premiums for documented home health — it removes the uncertainty that drives negotiation.',
              },
              {
                scenario: 'For Budget Planning',
                icon: '📊',
                desc: 'Prioritize Critical and Warning items for this year’s maintenance budget. Use your scan as the input to your annual home maintenance spend. A $500 drainage fix today prevents a $15,000 foundation repair in 5 years.',
              },
            ].map(item => (
              <div key={item.scenario} style={{ background: '#0f1a24', border: '1px solid #1a2a3a', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>{item.scenario}</div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compare Over Time */}
        <section style={{ background: '#0f1a24', border: '1px solid #38bdf833', borderRadius: 16, padding: 28, marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📈</div>
          <h3 style={{ color: '#f8fafc', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Compare Scans Over Time</h3>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            A single scan shows you where you are. Multiple scans show you where you're going — and help you catch issues before they become expensive. Homes that scan annually spend 40% less on reactive repairs than homes without documentation.
          </p>
        </section>

        {/* Scan Interpreter */}
        <section style={{ background: '#0f1a24', border: '1px solid #1a2a3a', borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>🔍 Scan Finding Interpreter</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Paste or type a finding from your TrustyPro scan — we'll explain what it means, what to do next, and what it typically costs to address.</p>
          <textarea
            value={findingText}
            onChange={e => setFindingText(e.target.value)}
            placeholder="e.g., 'Foundation crack detected — 78% confidence — Warning severity' or 'HVAC condenser corrosion — Critical' or 'Roof shingle granule loss — 85% confidence'"
            rows={4}
            style={{ width: '100%', background: '#070c14', border: '1px solid #2a3a4a', borderRadius: 10, color: '#f1f5f9', padding: '14px 16px', fontSize: 14, lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
          />
          <button
            onClick={interpret}
            style={{ marginTop: 16, background: '#0284c7', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Interpret This Finding
          </button>

          {searched && (
            <div style={{ marginTop: 24, background: '#070c14', borderRadius: 12, padding: 24, border: '1px solid #1a2a3a' }}>
              {result ? (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>WHAT THIS MEANS</div>
                    <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{result.explanation}</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>RECOMMENDED NEXT ACTION</div>
                    <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{result.action}</p>
                  </div>
                  <div>
                    <div style={{ color: '#f97316', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>TYPICAL COST TO ADDRESS</div>
                    <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{result.cost}</p>
                  </div>
                </>
              ) : (
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                  We don't have a specific interpretation for that finding yet. Try including keywords like: foundation, roof, shingle, hvac, drainage, window, electrical, or grading. Or contact TrustyPro support for a personalized scan walkthrough.
                </div>
              )}
            </div>
          )}
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0c2a4a, #0a1a2a)', border: '1px solid #38bdf833', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>📱</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 20, marginBottom: 12 }}>Start Building Your Home's Health Record</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
            The best time to document your home's condition was before the problem appeared. The second best time is right now.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#0284c7', color: '#fff', padding: '14px 36px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Join the Waitlist — Start Scanning</a>
        </div>
      </div>
    </div>
  );
}
