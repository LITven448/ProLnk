import { useState } from 'react';

const hvacAges = [
  { id: 'new', label: '🆕 New system (0-3 years)', multiplier: 1.0, note: 'Full value preservation. Buyers see no HVAC risk.' },
  { id: 'mid', label: '⚙️ Mid-life (4-8 years)', multiplier: 0.85, note: 'Modest discount. Buyers may factor in eventual replacement.' },
  { id: 'aging', label: '⏳ Aging (9-13 years)', multiplier: 0.70, note: 'Noticeable buyer concern. Negotiations often target HVAC credit.' },
  { id: 'old', label: '🚨 Near end-of-life (14+ years)', multiplier: 0.50, note: 'Major red flag. Buyers demand replacement credit or price reduction.' },
];

const homeValues = [
  { id: '250k', label: '🏠 $250,000', base: 250000 },
  { id: '400k', label: '🏡 $400,000', base: 400000 },
  { id: '600k', label: '🏘️ $600,000', base: 600000 },
  { id: '900k', label: '🏛️ $900,000+', base: 900000 },
];

const insights = [
  { icon: '📊', title: 'Buyers Price HVAC Age', body: 'DFW buyers and their agents mentally deduct $8,000-$15,000 for a system near end-of-life. It shows up in offers, not just inspection demands.' },
  { icon: '🔧', title: 'Deferred Maintenance Compounds', body: 'A system with missed tune-ups, dirty coils, or refrigerant issues signals poor ownership — buyers assume the rest of the house was treated the same way.' },
  { icon: '🏆', title: 'New HVAC = Negotiating Power', body: 'Sellers with new systems can hold firm on price and reject inspection credits. It removes the single biggest objection in DFW home sales.' },
  { icon: '📝', title: 'Document Everything', body: 'Maintenance records add perceived value. A folder of annual tune-up receipts tells buyers the system was cared for — worth $1,000-$3,000 in buyer confidence.' },
];

export default function DFWHVACHomeEquityGuide() {
  const [hvac, setHvac] = useState<string | null>(null);
  const [homeVal, setHomeVal] = useState<string | null>(null);

  const hvacObj = hvacAges.find(h => h.id === hvac);
  const homeObj = homeValues.find(v => v.id === homeVal);
  const hvacImpact = hvacObj && homeObj ? Math.round(homeObj.base * (1 - hvacObj.multiplier)) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>HVAC & Home Equity in DFW</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            Your HVAC system is directly tied to your home equity. Here's exactly how — with DFW market data.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          {insights.map(i => (
            <div key={i.title} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{i.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{i.title}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{i.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📉 Calculate Your HVAC Equity Impact</h2>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 10, color: '#CBD5E1′ }}>Your HVAC system age:</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {hvacAges.map(h => (
                <button key={h.id} onClick={() => setHvac(h.id)}
                  style={{ background: hvac === h.id ? '#F5E642′ : '#0A1628', color: hvac === h.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', cursor: ’pointer', textAlign: 'left', fontWeight: 600 }}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 10, color: '#CBD5E1′ }}>Estimated home value:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {homeValues.map(v => (
                <button key={v.id} onClick={() => setHomeVal(v.id)}
                  style={{ background: homeVal === v.id ? '#F5E642′ : '#0A1628', color: homeVal === v.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', cursor: ’pointer', fontWeight: 600 }}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {hvacImpact !== null && hvacObj && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 8 }}>
                Estimated equity risk: <span style={{ color: hvacImpact > 20000 ? '#FF6B6B' : '#F5E642′ }}>${hvacImpact.toLocaleString()}</span>
              </div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{hvacObj.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#0A1628', marginBottom: 8 }}>Protect your equity. ProLnk connects you to vetted DFW HVAC pros.</div>
          <div style={{ color: '#1A2A40', fontSize: 14 }}>Maintenance, repairs, and replacements — matched pros, real accountability.</div>
        </div>
      </div>
    </div>
  );
}
