import { useState } from 'react';

export default function DFWHVACBlowerDoorDFW2026() {
  const [homeAge, setHomeAge] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const age = parseInt(homeAge);
    const bill = parseInt(monthlyBill);
    if (!age || !bill) { setResult('Please enter both home age and monthly bill.'); return; }
    let ach = '';
    let advice = '';
    if (age < 1990) { ach = '8–15 ACH50'; advice = 'Older DFW homes are very leaky. Blower door testing + sealing can cut HVAC load 25–30%.'; }
    else if (age < 2005) { ach = '5–9 ACH50'; advice = 'Mid-era DFW homes often have attic bypasses. Testing reveals hidden infiltration paths.'; }
    else { ach = '2–5 ACH50'; advice = 'Newer DFW homes are tighter but penetrations still leak. Confirm code compliance with a test.'; }
    const savings = bill > 300 ? '$60–$90/mo' : bill > 150 ? '$30–$55/mo' : '$15–$30/mo';
    setResult(`Estimated leakage: ${ach}. ${advice} Projected savings after sealing: ${savings}.`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#F5E642', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          💨 DFW Blower Door Test Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          How blower door testing improves HVAC efficiency in DFW homes — quantify leakage, seal smarter, save more.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📏', title: 'ACH50 Measurement', desc: 'Air Changes per Hour at 50 Pascals — the universal DFW leakage standard. Lower is tighter.' },
            { icon: '🔍', title: 'Infiltration Mapping', desc: 'Blower door + thermal camera identifies exact air leak locations in DFW attics and walls.' },
            { icon: '❄️', title: 'HVAC Load Reduction', desc: 'Sealing identified leaks reduces DFW HVAC load 15–30%, cutting runtime and energy bills.' },
            { icon: '🏗️', title: 'DFW Code Requirement', desc: 'New DFW construction must test ≤3 ACH50 per IECC 2021. Older homes are often 5–15x leakier.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🧮 Blower Door Value Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>Home Age (year built)</label>
              <input value={homeAge} onChange={e => setHomeAge(e.target.value)} placeholder="e.g. 1985" style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>Summer Electric Bill ($)</label>
              <input value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} placeholder="e.g. 280" style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Estimate My Blower Door Result
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px', color: '#F5E642', fontSize: '0.95rem' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}