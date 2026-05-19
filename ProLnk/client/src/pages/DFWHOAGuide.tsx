import { useState } from 'react';

const HOA_FEES = [
  { range: '$30–$100/mo', type: 'Basic Community', covers: 'Common area mowing, entry lighting, signage' },
  { range: '$100–$250/mo', type: 'Standard HOA', covers: 'Pool, playground, landscaping, management fees' },
  { range: '$250–$500/mo', type: 'Premium HOA', covers: 'Clubhouse, fitness center, gated access, events' },
  { range: '$500–$800/mo', type: 'Luxury/Master-Planned', covers: 'Golf, concierge, full exterior maintenance' },
];

const RIGHTS = [
  { can: 'Enforce deed restrictions on exterior appearance', cannot: 'Prohibit solar panels (Texas Property Code §202.010)' },
  { can: 'Levy assessments for common area maintenance', cannot: 'Prevent display of religious items at entry (§202.018)' },
  { can: 'Fine members for violations after notice', cannot: 'Foreclose without judicial process for fines alone' },
  { can: 'Regulate parking in common areas', cannot: 'Prohibit displaying a US flag (§202.012)' },
  { can: 'Require architectural approval for changes', cannot: 'Discriminate based on protected class status' },
  { can: 'Hold board elections and collect dues', cannot: 'Restrict emergency vehicle access' },
];

const DISPUTE_STEPS = [
  { step: 1, action: 'Request the violation notice in writing from the HOA management company' },
  { step: 2, action: 'Review your CC&Rs — confirm the rule actually exists and applies to your situation' },
  { step: 3, action: 'Submit a written response within the notice deadline (typically 30 days)' },
  { step: 4, action: 'Request a hearing before the board if the violation stands' },
  { step: 5, action: 'File with the Texas Office of Public Insurance Counsel if HOA violates §209.007′ },
  { step: 6, action: 'Consult a Texas HOA attorney — many offer free 30-min consultations' },
];

function getValueScore(fee: number, amenities: string[]): { score: number; label: string; tips: string[] } {
  const base = amenities.length * 15;
  const feeScore = fee < 150 ? 30 : fee < 300 ? 20 : fee < 500 ? 10 : 0;
  const score = Math.min(100, base + feeScore);
  const label = score >= 70 ? 'High Value' : score >= 40 ? 'Moderate Value' : 'Low Value';
  const tips = [
    fee > 400 && 'Negotiate a payment plan — HOAs must offer one under §209.0062',
    amenities.length < 3 && 'Ask the board what reserve fund projects are planned this year',
    'Attend annual meetings — boards often waive first violations for active members',
    'Verify the HOA is registered with Texas SOS (required since 2021)',
  ].filter(Boolean) as string[];
  return { score, label, tips };
}

export default function DFWHOAGuide() {
  const [monthlyFee, setMonthlyFee] = useState(200);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; label: string; tips: string[] } | null>(null);

  const amenityOptions = ['Pool', 'Clubhouse', 'Trails', 'Fitness Center', 'Gated Access', 'Tennis Courts', 'Playground', 'Lake Access'];

  const toggleAmenity = (a: string) => {
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const calculate = () => setResult(getValueScore(monthlyFee, selectedAmenities));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', letterSpacing: '2px', marginBottom: '12px' }}>🏘️ DFW HOMEOWNER SERIES</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px' }}>DFW HOA Guide</h1>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0', maxWidth: '600px' }}>
            What HOAs can and can't do in Texas — your rights under the Texas Property Code, how fees work, and how to fight back when needed.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>⚖️ HOA Powers in Texas (Ch. 202–209)</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {RIGHTS.map((r, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#22C55E', fontSize: '16px', marginTop: '2px' }}>✅</span>
                  <span style={{ fontSize: '14px', color: '#CBD5E1′ }}>{r.can}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#EF4444', fontSize: '16px', marginTop: '2px' }}>❌</span>
                  <span style={{ fontSize: '14px', color: '#CBD5E1′ }}>{r.cannot}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>💵 DFW HOA Fee Ranges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {HOA_FEES.map((f, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '10px', padding: '20px', borderTop: '3px solid #F5E642′ }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#F5E642', marginBottom: '4px' }}>{f.range}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>{f.type}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8′ }}>{f.covers}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>🛡️ How to Dispute a Violation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {DISPUTE_STEPS.map((s) => (
              <div key={s.step} style={{ background: '#112240', borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{s.step}</div>
                <span style={{ fontSize: '15px', color: '#CBD5E1', paddingTop: '4px' }}>{s.action}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '48px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>🧮 HOA Value Assessment</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>Enter your monthly fee and check what amenities are included to get your value score.</p>

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#CBD5E1′ }}>Monthly HOA Fee: <strong style={{ color: '#F5E642' }}>${monthlyFee}</strong></label>
          <input type="range" min={30} max={800} step={10} value={monthlyFee} onChange={e => setMonthlyFee(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '20px', accentColor: '#F5E642′ }} />

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#CBD5E1′ }}>Included Amenities:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {amenityOptions.map(a => (
                <button key={a} onClick={() => toggleAmenity(a)}
                  style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid', fontSize: '13px', cursor: 'pointer',
                    background: selectedAmenities.includes(a) ? '#F5E642′ : ’transparent',
                    color: selectedAmenities.includes(a) ? '#0A1628′ : '#94A3B8',
                    borderColor: selectedAmenities.includes(a) ? '#F5E642′ : '#334155' }}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            Calculate Value Score
          </button>

          {result && (
            <div style={{ marginTop: '24px', padding: '20px', background: '#0A1628', borderRadius: '10px' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642′ }}>{result.score}/100 — {result.label}</div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>💡 Money-Saving Tips:</div>
                {result.tips.map((t, i) => <div key={i} style={{ fontSize: '14px', color: '#CBD5E1', marginBottom: '6px' }}>• {t}</div>)}
              </div>
            </div>
          )}
        </section>

        <div style={{ background: '#112240', borderRadius: '10px', padding: '20px', fontSize: '13px', color: '#64748B' }}>
          📋 Texas Property Code citations: Chapter 202 (Restrictive Covenants), Chapter 209 (Property Owners' Associations). Always verify current statutes at statutes.capitol.texas.gov.
        </div>
      </div>
    </div>
  );
}
