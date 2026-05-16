import { useState } from 'react';

type Priority = 'cost' | 'comfort' | 'resale' | 'durability';

const priorities: { id: Priority; label: string; icon: string }[] = [
  { id: 'cost', label: 'Lowest Cost', icon: '💰' },
  { id: 'comfort', label: 'Comfort & Warmth', icon: '🛋️' },
  { id: 'resale', label: 'Resale Value', icon: '🏡' },
  { id: 'durability', label: 'Pets & Kids', icon: '🐾' },
];

const recommendations: Record<Priority, { floor: string; cost: string; note: string }> = {
  cost: { floor: 'Carpet (Bedrooms) + LVP (Main Areas)', cost: '$3–$6/sq ft installed', note: 'Luxury Vinyl Plank (LVP) gives a wood look at fraction of the cost with no humidity expansion risk.' },
  comfort: { floor: 'Carpet throughout (Bedrooms + Living)', cost: '$2–$5/sq ft installed', note: 'Plush carpet remains the most comfortable underfoot and provides thermal insulation in DFW winters.' },
  resale: { floor: 'Engineered Hardwood', cost: '$8–$15/sq ft installed', note: 'Engineered hardwood resists DFW humidity better than solid wood and returns 70–80% of cost at resale per NAR data.' },
  durability: { floor: 'Luxury Vinyl Plank (LVP)', cost: '$4–$8/sq ft installed', note: '100% waterproof, scratch-resistant, and stands up to heavy traffic. Ideal for DFW homes with pets or young children.' },
};

const comparison = [
  { metric: 'Installed Cost', carpet: '$2–$5 / sq ft', hardwood: '$8–$18 / sq ft' },
  { metric: 'DFW Humidity Risk', carpet: 'Low', hardwood: 'High — can warp/gap' },
  { metric: 'Resale Value', carpet: 'Neutral to negative', hardwood: '70–80% ROI' },
  { metric: 'Pet Stains', carpet: 'High risk', hardwood: 'Low (surface clean)' },
  { metric: 'Lifespan', carpet: '10–15 years', hardwood: '30–100 years' },
  { metric: 'Refinishing', carpet: 'Not possible', hardwood: '3–5 times in lifespan' },
  { metric: 'Sound Absorption', carpet: 'Excellent', hardwood: 'Poor (needs rugs)' },
  { metric: 'Allergies', carpet: 'Traps allergens', hardwood: 'Easy to clean' },
];

export default function CarpetVsHardwoodGuide() {
  const [selected, setSelected] = useState<Priority | null>(null);
  const [sqft, setSqft] = useState('');

  const rec = selected ? recommendations[selected] : null;
  const area = parseFloat(sqft) || 0;
  const costLow = rec ? area * parseFloat(rec.cost.split('–')[0].replace('$', '').replace('/sq ft installed', '').trim()) : 0;
  const costHigh = rec ? area * parseFloat(rec.cost.split('–')[1].replace('/sq ft installed', '').trim()) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>🏠 DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Carpet vs Hardwood</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, margin: 0, maxWidth: 600 }}>
            The full DFW comparison — humidity risks, resale impact, pet considerations, and a priority-based flooring picker.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ background: '#0f1e35', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>🌡️ The DFW Humidity Problem with Hardwood</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Dallas humidity swings from 30% in winter to 80%+ in summer. Solid hardwood expands and contracts with these swings, causing cupping, gapping, and warping. Engineered hardwood (cross-ply construction) handles DFW climate far better. Run humidifiers in winter to maintain 40–50% RH year-round.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#0f1e35' }}>
                {['Metric', 'Carpet', 'Hardwood'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642', fontWeight: 700, borderBottom: '1px solid #1E2D45' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.metric} style={{ background: i % 2 === 0 ? '#0A1628' : '#0d1a2e' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 600 }}>{row.metric}</td>
                  <td style={{ padding: '11px 16px', color: '#94a3b8' }}>{row.carpet}</td>
                  <td style={{ padding: '11px 16px', color: '#94a3b8' }}>{row.hardwood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f1e35', border: '2px solid #F5E642', borderRadius: 14, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>🎯 Flooring Priority Picker</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Select your top priority to get a personalized recommendation and cost estimate.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
            {priorities.map(p => (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  padding: '18px 20px', borderRadius: 10, cursor: 'pointer',
                  background: selected === p.id ? '#1a2a45' : '#0A1628',
                  border: `2px solid ${selected === p.id ? '#F5E642' : '#1E2D45'}`,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.label}</div>
              </div>
            ))}
          </div>

          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Recommended: {rec.floor}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{rec.note}</div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Enter total square footage for cost estimate</label>
                <input
                  type="number"
                  value={sqft}
                  onChange={e => setSqft(e.target.value)}
                  placeholder="e.g. 1800"
                  style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              {area > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
                  <div style={{ background: '#0f1e35', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                    <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${costLow.toLocaleString()}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Low Estimate</div>
                  </div>
                  <div style={{ background: '#0f1e35', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                    <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${costHigh.toLocaleString()}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>High Estimate</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px' }}>🔄 Refinishing vs Replacement</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Solid hardwood can typically be refinished 3–5 times over its lifespan</li>
            <li>Refinishing costs $3–$5/sq ft vs $8–$18/sq ft for full replacement</li>
            <li>Engineered hardwood can usually be refinished 1–2 times (depends on wear layer thickness)</li>
            <li>LVP and carpet cannot be refinished — replacement only</li>
            <li>Sand and stain is more cost-effective than replacement when wood is structurally sound</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
