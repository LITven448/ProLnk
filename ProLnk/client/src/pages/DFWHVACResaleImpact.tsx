import { useState } from 'react';

const scenarios = [
  {
    id: 'new',
    label: 'New System (<3 yrs)',
    resaleImpact: '+$5,000–$8,000',
    color: '#22c55e',
    buyerPsych: 'Buyers see it as a non-issue — it may even be a selling point',
    negotiation: 'No deductions; mention it in listing to attract buyers',
    timing: 'List any time — HVAC is not a factor',
    action: 'Highlight the new system in your listing and Home Health Vault',
  },
  {
    id: 'mid',
    label: 'Mid-Life (6–10 yrs)',
    resaleImpact: 'Neutral to +$1,000',
    color: '#84cc16',
    buyerPsych: "Buyers won't complain but won't pay extra — it's expected",
    negotiation: 'Inspection may flag age; budget $500 in concession room',
    timing: 'Good time to sell — buyers accept mid-life systems',
    action: 'Get a tune-up and document it before listing',
  },
  {
    id: 'old',
    label: 'Aging System (11–14 yrs)',
    resaleImpact: '–$2,000 to –$5,000 in DFW',
    color: '#f59e0b',
    buyerPsych: 'DFW buyers know a system failure in July = disaster — they negotiate hard',
    negotiation: 'Expect $3,000–$5,000 concession ask at inspection',
    timing: 'Replace before listing if selling in spring/summer DFW market',
    action: 'Replace now or offer a $2,000 HVAC credit at close',
  },
  {
    id: 'endoflife',
    label: 'End-of-Life (15+ yrs)',
    resaleImpact: '–$5,000 to –$10,000 or deal killer',
    color: '#ef4444',
    buyerPsych: "Buyers in DFW will walk away or lowball — it's a red flag",
    negotiation: 'Full replacement credit likely demanded; FHA/VA loans may require replacement',
    timing: 'Do not list in summer — replace first or wait for buyer leverage to drop',
    action: 'Replace before listing — you will net more than the replacement cost',
  },
];

export default function DFWHVACResaleImpact() {
  const [selected, setSelected] = useState(scenarios[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>
            HVAC Impact on DFW Home Resale
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How your HVAC system affects what DFW buyers will pay</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
          <div>
            <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>$3K–$8K</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>New system value add</div>
          </div>
          <div>
            <div style={{ color: '#ef4444', fontSize: 20, fontWeight: 800 }}>–$5K</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>Avg old-system concession</div>
          </div>
          <div>
            <div style={{ color: '#22c55e', fontSize: 20, fontWeight: 800 }}>85%</div>
            <div style={{ color: '#94a3b8', fontSize: 12 }}>DFW buyers check HVAC age</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '2px solid',
                borderColor: selected.id === s.id ? '#F5E642' : '#1e3a5f',
                background: selected.id === s.id ? '#F5E642' : '#112240',
                color: selected.id === s.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: 0 }}>{selected.label}</h2>
            <span style={{ color: selected.color, fontWeight: 800, fontSize: 18 }}>{selected.resaleImpact}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>🧠 BUYER PSYCHOLOGY</div>
              <div style={{ fontSize: 14 }}>{selected.buyerPsych}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>⚖️ AT NEGOTIATION / INSPECTION</div>
              <div style={{ fontSize: 14 }}>{selected.negotiation}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>📅 LISTING TIMING IN DFW</div>
              <div style={{ fontSize: 14 }}>{selected.timing}</div>
            </div>
            <div style={{ background: '#1a3a1a', border: '1px solid #22c55e', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#22c55e', fontSize: 11, marginBottom: 4 }}>✅ RECOMMENDED ACTION</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{selected.action}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            🏠 Get a pre-listing DFW HVAC inspection from a TrustyPro-verified contractor
          </p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
            Book Pre-Listing HVAC Inspection
          </div>
        </div>
      </div>
    </div>
  );
}
