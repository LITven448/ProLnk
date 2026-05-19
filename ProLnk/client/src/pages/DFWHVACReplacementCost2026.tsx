import { useState } from 'react';

export default function DFWHVACReplacementCost2026() {
  const [homeSize, setHomeSize] = useState<string | null>(null);
  const [systemType, setSystemType] = useState<string | null>(null);

  const getEstimate = () => {
    if (!homeSize || !systemType) return null;
    const base: Record<string, [number, number]> = { small: [4500, 6000], medium: [5500, 7500], large: [7000, 10000] };
    const adder: Record<string, number> = { standard: 0, heatpump: 800, twostage: 600 };
    const [lo, hi] = base[homeSize];
    const add = adder[systemType];
    return { lo: lo + add, hi: hi + add };
  };

  const est = getEstimate();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💰 DFW HVAC Replacement Cost 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Complete cost breakdown for replacing your AC system in the Dallas-Fort Worth area.</p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📦 3-Ton Unit (Most Common in DFW)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Equipment Only', range: '$3,500–5,000', note: 'Condenser + air handler' },
              { label: 'Labor & Installation', range: '$1,500–2,500', note: 'Typical DFW rate' },
              { label: 'Total Installed', range: '$5,000–8,000', note: 'Most common outcome' },
              { label: 'Permit & Inspection', range: '$150–350', note: 'Required in DFW' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0d2240', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{item.range}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚠️ Factors That Increase Price</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { factor: '2-story home', impact: '+$300–600′ },
              { factor: 'Attic installation', impact: '+$400–800′ },
              { factor: 'Difficult access / crawlspace', impact: '+$300–500′ },
              { factor: 'Ductwork replacement needed', impact: '+$1,500–4,000′ },
              { factor: 'Electrical panel upgrade', impact: '+$1,000–2,500′ },
            ].map(f => (
              <div key={f.factor} style={{ display: 'flex', justifyContent: 'space-between', background: '#0d2240', padding: '10px 14px', borderRadius: 6 }}>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{f.factor}</span>
                <span style={{ color: '#f87171', fontWeight: 700, fontSize: 14 }}>{f.impact}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🧮 Estimate Your DFW Cost</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home size:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ v: 'small', l: 'Under 1,500 sqft' }, { v: 'medium', l: '1,500–2,500 sqft' }, { v: 'large', l: '2,500+ sqft' }].map(s => (
                <button key={s.v} onClick={() => setHomeSize(s.v)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: homeSize === s.v ? '#F5E642′ : '#1e3a5f', color: homeSize === s.v ? '#0A1628' : '#fff' }}>{s.l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>System type:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ v: 'standard', l: 'Standard AC' }, { v: 'heatpump', l: 'Heat Pump' }, { v: 'twostage', l: 'Two-Stage' }].map(s => (
                <button key={s.v} onClick={() => setSystemType(s.v)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: systemType === s.v ? '#F5E642′ : '#1e3a5f', color: systemType === s.v ? '#0A1628' : '#fff' }}>{s.l}</button>
              ))}
            </div>
          </div>
          {est && (
            <div style={{ marginTop: 16, background: '#0d2240', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Estimated DFW replacement cost</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>${est.lo.toLocaleString()}–${est.hi.toLocaleString()}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Installed, including labor. Get 3 quotes to confirm.</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Get 3 DFW quotes in under 24 hours</div>
          <div style={{ color: '#1a2f4e', fontSize: 13 }}>ProLnk connects you with licensed, background-checked HVAC contractors near you.</div>
        </div>
      </div>
    </div>
  );
}
