import { useState } from 'react';

export default function DFWGeothermalGuide2026() {
  const [sqft, setSqft] = useState('');
  const [bill, setBill] = useState('');
  const [result, setResult] = useState<{ savings: string; payback: string; feasible: string } | null>(null);

  function calculate() {
    if (!sqft || !bill) { return; }
    const s = parseInt(sqft);
    const b = parseInt(bill);
    const annualSavings = Math.round(b * 12 * 0.55);
    const installCost = s < 2000 ? 22000 : s < 3000 ? 26000 : 30000;
    const afterITC = Math.round(installCost * 0.7);
    const payback = Math.round(afterITC / annualSavings);
    const feasible = payback <= 12 ? 'Excellent candidate' : payback <= 16 ? 'Moderate candidate' : 'Long payback — consider other options';
    setResult({ savings: `$${annualSavings.toLocaleString()}/yr`, payback: `${payback} years`, feasible });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌍 DFW GEOTHERMAL GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Geothermal Heat Pumps in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Ground-source heat pumps leverage DFW's 65°F ground temp for 50–60% energy savings. Higher upfront, but the math works.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💰', label: 'Upfront Cost', value: '$20,000–$30,000', note: 'Before 30% federal ITC' },
            { icon: '⚡', label: 'Energy Savings', value: '50–60%', note: 'vs conventional HVAC' },
            { icon: '🌡️', label: 'DFW Ground Temp', value: '65°F', note: 'Ideal for geothermal loops' },
            { icon: '📋', label: 'Federal ITC', value: '30%', note: 'Tax credit on install cost' },
            { icon: '⏱️', label: 'Payback Period', value: '8–12 years', note: 'After federal ITC' },
            { icon: '🔧', label: 'System Life', value: '25+ years', note: 'Ground loop lasts 50+ years' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{c.value}</div>
              <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{c.label}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧮 Geothermal Feasibility Calculator</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <input type="number" placeholder="Home sq ft (e.g. 2500)" value={sqft} onChange={e => setSqft(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }} />
            <input type="number" placeholder="Monthly electric bill $" value={bill} onChange={e => setBill(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }} />
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Calculate Feasibility</button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              {[{ label: 'Annual Savings', val: result.savings }, { label: 'Payback Period', val: result.payback }, { label: 'Assessment', val: result.feasible }].map(r => (
                <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{r.val}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{r.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🏗️ DFW Installation Considerations</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>DFW clay soil requires vertical bore holes (100–400 ft deep) rather than horizontal loops — higher drilling cost but works on smaller lots. Tarrant and Dallas county permit requirements apply. Only 8–10 DFW contractors are certified for geothermal; verify IGSHPA certification.</p>
        </div>
      </div>
    </div>
  );
}