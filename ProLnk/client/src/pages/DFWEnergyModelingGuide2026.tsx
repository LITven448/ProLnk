import { useState } from 'react';

const vintages = [
  { id: 'pre1980', label: '🏚️ Pre-1980 Home', hers: '120–160', priority: ['Attic insulation (R-38+)', 'Air sealing (massive gains)', 'Window replacements', 'HVAC replacement'], note: 'These homes often have no insulation or R-11 walls. Even modest upgrades dramatically drop HERS score.' },
  { id: '1980s', label: '🏠 1980–2000 Home', hers: '90–120', priority: ['Air sealing (top priority)', 'Attic insulation R-38+', 'HVAC efficiency upgrade', 'Smart thermostat'], note: 'Good bones but leaky. Air sealing + insulation combo typically drops HERS 20–35 points.' },
  { id: '2000s', label: '🏡 2000–2015 Home', hers: '70–90', priority: ['Solar panels (biggest drop)', 'HVAC efficiency upgrade', 'Attic insulation top-up', 'Smart thermostat'], note: 'Decent baseline. Solar is most cost-effective next step — can drop HERS from 80 to 40–50.' },
  { id: 'new', label: '🆕 2016+ Home', hers: '55–70', priority: ['Solar panels', 'Battery storage', 'EV charger readiness', 'Smart home integration'], note: 'Already efficient. Solar + battery storage is path to HERS < 30 (near net-zero for DFW).' },
];

export default function DFWEnergyModelingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = vintages.find(v => v.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Home Energy Modeling Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>HERS Index: 100 = 2006 code, 0 = net zero. Lower is better. Know your score, know your opportunity.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📊 DFW HERS Score Benchmarks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'New DFW Homes Avg', value: 'HERS 60–70' },
              { label: 'Resale DFW Homes Avg', value: 'HERS 80–120' },
              { label: 'ENERGY STAR Threshold', value: 'HERS ≤ 57' },
              { label: 'Near Net-Zero', value: 'HERS < 30' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 17, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🏠 Select Your Home Vintage</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {vintages.map(v => (
              <button key={v.id} onClick={() => setSelected(v.id === selected ? null : v.id)}
                style={{ background: selected === v.id ? '#F5E642' : '#1a2f4a', color: selected === v.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {v.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 16, background: '#1a2f4a', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Estimated Current HERS: {match.hers}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 10 }}>{match.note}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Top Improvements (Priority Order):</div>
              {match.priority.map((p, i) => (
                <div key={i} style={{ color: '#e2e8f0', fontSize: 13, padding: '4px 0', borderBottom: '1px solid #1e3a5f' }}>
                  {i + 1}. {p}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📋 How to Get Your HERS Score</h2>
          {[
            { step: '1. Hire a RESNET Rater', icon: '👤', desc: 'Certified Home Energy Rater (HERS Rater) — find at resnet.us. DFW has 50+ certified raters.' },
            { step: '2. Home Inspection + Modeling', icon: '🔍', desc: 'Rater does blower door test, duct blaster, inspects insulation — enters into REM/Rate software.' },
            { step: '3. Get Your Score + Report', icon: '📄', desc: 'Receive HERS score + improvement report showing ROI for each upgrade in DFW climate.' },
            { step: '4. Finance + Upgrade', icon: '💰', desc: 'Use PACE financing or Oncor rebates for upgrades — no upfront cost option available in DFW.' },
          ].map(s => (
            <div key={s.step} style={{ background: '#1a2f4a', borderRadius: 8, padding: '12px 14px', marginBottom: 10, display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{s.step}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
