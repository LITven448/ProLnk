import { useState } from 'react';

const investorTypes = [
  {
    id: 'flip',
    label: 'Fix & Flip',
    emoji: '🔨',
    workflow: [
      'Pre-offer scan: Upload listing photos or drive-by shots for AI condition estimate before touring',
      'Post-offer inspection backup: Use TrustyPro scan alongside traditional inspection to catch AI-detectable items fast',
      'Scope of work baseline: AI generates repair priority list ranked by urgency and cost bucket',
      'Completion scan: Document finished rehab for insurance, buyer disclosure, and resale value support',
    ],
    timeSaved: '6–12 hours per deal on pre-offer due diligence',
    costJustification: 'Avoid 1 bad $15K scope miss and TrustyPro pays for itself 30x over',
  },
  {
    id: 'rental',
    label: 'Buy & Hold Rental',
    emoji: '🏘️',
    workflow: [
      'Acquisition scan: Identify deferred maintenance before closing to negotiate credits',
      'Move-in documentation: Create visual baseline for tenant damage comparison at move-out',
      'Annual condition scan: Track property health over time, prioritize capital reserve spending',
      'Portfolio view: See all properties condition scores in one dashboard by address or market',
    ],
    timeSaved: '3–5 hours per property per year on inspection coordination',
    costJustification: 'Security deposit disputes cost $1,200+ avg. One prevented dispute = annual TrustyPro cost covered',
  },
  {
    id: 'wholesale',
    label: 'Wholesale',
    emoji: '📋',
    workflow: [
      'Drive-by AI scan: Get condition score from street-level and exterior photos in minutes',
      'ARV support: Condition score helps buyers validate ARV assumptions without full inspection',
      'Assignment packet: Include TrustyPro report in your deal package to increase buyer confidence',
      'Faster close: Buyers with TrustyPro data move quicker — fewer condition-based re-trades',
    ],
    timeSaved: '2–4 days faster deal-to-close on average when report included',
    costJustification: 'Faster close = more deals per month. 1 extra deal per quarter = significant ROI',
  },
];

export default function TrustyProForFlippers() {
  const [selected, setSelected] = useState(investorTypes[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💼</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>TrustyPro for Real Estate Investors</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 620, margin: '0 auto' }}>
            AI visual scanning that cuts due diligence time, protects your scope budget, and documents every deal from acquisition to resale — built for the DFW investment market.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '⚡', stat: '6–12 hrs', label: 'Saved per flip on pre-offer DD' },
            { emoji: '📉', stat: '$15K+', label: 'Average bad scope miss avoided' },
            { emoji: '📈', stat: '23%', label: 'Faster buyer decisions with AI report included' },
            { emoji: '🏠', stat: 'DFW', label: 'Market-tuned for North Texas construction types' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#FACC15', marginBottom: 4 }}>{s.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>DFW Market Context</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            North Texas has a disproportionate share of 1960s–1980s pier-and-beam and slab-on-grade homes with documented foundation movement patterns. TrustyPro's AI is trained specifically on these construction types — including common cedar pier deterioration, expansion joint cracking, and HVAC vintage issues common in Irving, Garland, Mesquite, and South Dallas flip corridors.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Select Your Investor Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {investorTypes.map(t => (
              <button key={t.id} onClick={() => setSelected(t)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: selected.id === t.id ? '#4F46E5′ : '#1e3a5f', color: '#fff' }}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#FACC15′ }}>TrustyPro Workflow — {selected.label}</h3>
          <ol style={{ paddingLeft: 20, marginBottom: 24 }}>
            {selected.workflow.map(step => (
              <li key={step} style={{ color: '#e2e8f0', fontSize: 15, marginBottom: 10, lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#050d1a', borderRadius: 10, padding: 18, borderLeft: '4px solid #4F46E5′ }}>
              <div style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 6 }}>⏱️ Time Saved</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{selected.timeSaved}</div>
            </div>
            <div style={{ background: '#050d1a', borderRadius: 10, padding: 18, borderLeft: '4px solid #FACC15′ }}>
              <div style={{ color: '#FACC15', fontWeight: 700, marginBottom: 6 }}>💰 Cost Justification</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{selected.costJustification}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
