import { useState } from 'react';

const conditions = [
  { id: 'new', label: '✅ New high-efficiency system', premium: 0.04, desc: 'Buyers pay 3-5% premium. Move-in ready appeal eliminates HVAC as a negotiation point.' },
  { id: 'maintained', label: '🔧 Well-maintained, 5-9 years', premium: 0.015, desc: 'Modest premium for documented care. Buyers see low short-term risk.' },
  { id: 'average', label: '⚙️ Average condition, 10-13 years', premium: 0, desc: 'No premium, no discount — but expect inspection pushback and credit requests.' },
  { id: 'deferred', label: '⚠️ Deferred maintenance / issues', premium: -0.03, desc: 'Buyers discount 2-4%. Inspection often reveals HVAC issues that stall or kill deals.' },
  { id: 'failing', label: '🚨 Failing or near end of life', premium: -0.06, desc: 'Significant buyer resistance. Expect $8K-$15K in demanded credits or price cuts.' },
];

const submarkets = [
  { id: 'frisco', label: '🌟 Frisco / Allen / McKinney', baseVal: 520000 },
  { id: 'plano', label: '📈 Plano / Richardson', baseVal: 450000 },
  { id: 'dallas', label: '🏙️ Dallas (Inside Loop)', baseVal: 580000 },
  { id: 'arlington', label: '🏠 Arlington / Grand Prairie', baseVal: 340000 },
  { id: 'fort-worth', label: '🌆 Fort Worth (Core)', baseVal: 310000 },
  { id: 'mansfield', label: '🏘️ Mansfield / Midlothian', baseVal: 395000 },
];

const marketFacts = [
  { icon: '🌡️', stat: '100+ days', label: 'above 95°F annually in DFW', detail: 'HVAC isn’t optional — it’s life-critical infrastructure.' },
  { icon: '💵', stat: '$8K-$15K', label: 'average HVAC replacement cost', detail: 'DFW 3-ton systems. Labor is 30-40% of total cost.' },
  { icon: '📊', stat: '3-5%', label: 'appreciation premium for new systems', detail: 'DFW buyer surveys consistently show HVAC as top inspection concern.' },
  { icon: '⏱️', stat: '7-10 years', label: 'average DFW HVAC lifespan', detail: 'Heat, humidity, and system runtime shorten life vs. national average.' },
];

export default function DFWHVACAppreciationGuide() {
  const [condition, setCondition] = useState<string | null>(null);
  const [submarket, setSubmarket] = useState<string | null>(null);

  const condObj = conditions.find(c => c.id === condition);
  const subObj = submarkets.find(s => s.id === submarket);
  const impact = condObj && subObj ? Math.round(subObj.baseVal * condObj.premium) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📈</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>HVAC & Home Appreciation in DFW</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            DFW buyers pay real premiums for well-maintained HVAC. Here's what the market data shows.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 40 }}>
          {marketFacts.map(f => (
            <div key={f.stat} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{f.stat}</div>
              <div style={{ fontWeight: 600, color: '#CBD5E1', marginBottom: 4, fontSize: 14 }}>{f.label}</div>
              <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{f.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏡 Estimate Your Appreciation Impact</h2>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 10, color: '#CBD5E1' }}>HVAC condition:</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {conditions.map(c => (
                <button key={c.id} onClick={() => setCondition(c.id)}
                  style={{ background: condition === c.id ? '#F5E642' : '#0A1628', color: condition === c.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 10, color: '#CBD5E1' }}>Your DFW submarket:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {submarkets.map(s => (
                <button key={s.id} onClick={() => setSubmarket(s.id)}
                  style={{ background: submarket === s.id ? '#F5E642' : '#0A1628', color: submarket === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {impact !== null && condObj && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: impact >= 0 ? '#F5E642' : '#FF6B6B', fontSize: 20, marginBottom: 8 }}>
                {impact >= 0 ? '+' : ''}${impact.toLocaleString()} appreciation impact
              </div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: 14 }}>{condObj.desc}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#0A1628', marginBottom: 8 }}>Maximize your appreciation with vetted DFW HVAC pros via ProLnk.</div>
          <div style={{ color: '#1A2A40', fontSize: 14 }}>Matched, accountable, and rated — the pros your home deserves.</div>
        </div>
      </div>
    </div>
  );
}
