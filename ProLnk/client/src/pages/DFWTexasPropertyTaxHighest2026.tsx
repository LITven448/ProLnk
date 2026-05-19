import { useState } from 'react';

const states = [
  { name: 'California', rate: 1.1, incomeMax: 13.3, note: 'Lower rate but high income tax + SALT cap' },
  { name: 'New York', rate: 1.72, incomeMax: 10.9, note: 'High property + high income tax double hit' },
  { name: 'Illinois', rate: 2.27, incomeMax: 4.95, note: 'Highest rate, flat income tax' },
  { name: 'New Jersey', rate: 2.49, incomeMax: 10.75, note: 'Highest in nation with income tax too' },
  { name: 'Texas (DFW)', rate: 2.1, incomeMax: 0, note: 'No income tax — total burden competitive' },
];

const homeValues = [300000, 385000, 500000, 750000, 1000000];

export default function DFWTexasPropertyTaxHighest2026() {
  const [origin, setOrigin] = useState('California');
  const [homeValue, setHomeValue] = useState(385000);

  const selected = states.find(s => s.name === origin) || states[0];
  const dfwTax = Math.round(homeValue * 0.021);
  const otherTax = Math.round(homeValue * (selected.rate / 100));
  const dfwIncomeSavings = Math.round(120000 * (selected.incomeMax / 100));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PROPERTY TAX GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Why DFW Property Taxes Feel High — And Why You're Still Ahead</h1>
        <p style={{ color: '#9BA3AF', fontSize: 15, marginBottom: 32 }}>Texas averages 2.1% (6th highest nationally). DFW homeowners pay ~$8,085/yr on a $385K home. But no income tax changes everything.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📍 Compare Your Origin State</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {states.filter(s => s.name !== 'Texas (DFW)').map(s => (
              <button key={s.name} onClick={() => setOrigin(s.name)} style={{ background: origin === s.name ? '#F5E642′ : '#1A2F50', color: origin === s.name ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>{s.name}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {homeValues.map(v => (
              <button key={v} onClick={() => setHomeValue(v)} style={{ background: homeValue === v ? '#F5E642′ : '#1A2F50', color: homeValue === v ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600 }}>${(v/1000).toFixed(0)}K</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#1A2F50', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642′ }}>
            <div style={{ color: '#9BA3AF', fontSize: 13, marginBottom: 4 }}>DFW Property Tax</div>
            <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>${dfwTax.toLocaleString()}/yr</div>
            <div style={{ color: '#9BA3AF', fontSize: 12 }}>Rate: 2.1% | No income tax</div>
          </div>
          <div style={{ background: '#1A2F50', borderRadius: 10, padding: 20, borderLeft: '3px solid #EF4444′ }}>
            <div style={{ color: '#9BA3AF', fontSize: 13, marginBottom: 4 }}>{origin} Property Tax</div>
            <div style={{ color: '#EF4444', fontSize: 28, fontWeight: 800 }}>${otherTax.toLocaleString()}/yr</div>
            <div style={{ color: '#9BA3AF', fontSize: 12 }}>Rate: {selected.rate}% + up to {selected.incomeMax}% income tax</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 Income Tax Savings in Texas (vs {origin})</div>
          <div style={{ color: '#4ADE80', fontSize: 24, fontWeight: 800 }}>${dfwIncomeSavings.toLocaleString()}/yr saved</div>
          <div style={{ color: '#9BA3AF', fontSize: 13, marginTop: 4 }}>Estimated on $120K household income. {selected.note}</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔑 Key DFW Tax Facts</div>
          {['Homestead exemption reduces taxable value by $100K (2023 law)', 'Over-65 exemption freezes school taxes permanently', 'Protest your appraisal — 60% of DFW protests win reductions', 'New construction assessed at land value only for ~1 year', 'Charter ProLnk pros help identify home issues before appraisal deadlines'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}