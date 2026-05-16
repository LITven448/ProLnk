import { useState } from 'react';

const homeAges = ['Built after 2000', 'Built 1980–2000', 'Built 1960–1980', 'Built before 1960'];
const billLevels = ['Under $100/mo', '$100–$175/mo', '$175–$250/mo', '$250+/mo'];

function getAuditEstimate(age: string, bill: string) {
  const wasteMap: Record<string, number> = {
    'Built after 2000': 12, 'Built 1980–2000': 22, 'Built 1960–1980': 31, 'Built before 1960': 42,
  };
  const billMap: Record<string, number> = {
    'Under $100/mo': 1100, '$100–$175/mo': 1700, '$175–$250/mo': 2600, '$250+/mo': 3600,
  };
  const waste = wasteMap[age];
  const annual = billMap[bill];
  const savings = Math.round(annual * waste / 100);
  const fixes: string[] = [];
  if (age === 'Built before 1960' || age === 'Built 1960–1980') fixes.push('Attic insulation (R-38+ recommended for DFW)');
  if (age !== 'Built after 2000') fixes.push('Air sealing — duct leakage common in DFW homes');
  fixes.push('Window weatherstripping and caulking');
  if (age === 'Built before 1960') fixes.push('Vapor barrier in crawl space or slab issues');
  fixes.push('HVAC filter and refrigerant check');
  return { waste, savings, fixes };
}

export default function DFWEnergyAuditGuide() {
  const [selAge, setSelAge] = useState(1);
  const [selBill, setSelBill] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const res = getAuditEstimate(homeAges[selAge], billLevels[selBill]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '3px solid #F5E642' }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Home Energy Audit Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Discover where your DFW home is leaking money. Learn what audits cover, free utility programs, and what to fix first.</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '📋', title: 'What Audits Cover', items: ['Blower door test (air leakage)', 'Thermal imaging scan', 'Duct leakage test (duct blaster)', 'Insulation check (attic & walls)', 'Window & door gap inspection'] },
            { icon: '🆓', title: 'Free DFW Programs', items: ['Oncor: free home energy checkup', 'TXU Energy: efficiency assessments', 'Atmos Energy: home efficiency program', 'City of Dallas: low-income weatherization', 'TDHCA: weatherization assistance'] },
            { icon: '🏠', title: 'Top DFW Energy Losses', items: ['Attic: 40% of heat/cool loss (DFW heat)', 'Duct leakage: 20–30% typical', 'Air infiltration: 15–25%', 'Windows & doors: 10–15%', 'Foundation/slab gaps in clay soil'] },
            { icon: '💰', title: 'Audit Costs', items: ['DIY walkthrough: Free', 'Utility basic audit: Free–$50', 'Professional audit: $200–$400', 'Comprehensive (blower door + imaging): $300–$600', 'Tax deductible if rental property'] },
          ].map((card) => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
                {card.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>⚡ Energy Waste Estimator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Find out roughly how much energy your DFW home is likely wasting — and where to start fixing it.</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>When was your home built?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {homeAges.map((a, i) => (
                <button key={a} onClick={() => { setSelAge(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selAge === i ? '#F5E642' : '#1e3a5f'}`, background: selAge === i ? '#F5E642' : '#0A1628', color: selAge === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{a}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Average monthly utility bill?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {billLevels.map((b, i) => (
                <button key={b} onClick={() => { setSelBill(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selBill === i ? '#F5E642' : '#1e3a5f'}`, background: selBill === i ? '#F5E642' : '#0A1628', color: selBill === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{b}</button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Estimate My Energy Waste →</button>

          {showResult && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642', textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>Estimated Energy Waste</p>
                  <p style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '0 0 4px' }}>{res.waste}%</p>
                  <p style={{ color: '#64748b', fontSize: 12 }}>of what you're paying</p>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642', textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: 12, marginBottom: 6 }}>Potential Annual Savings</p>
                  <p style={{ color: '#F5E642', fontSize: 36, fontWeight: 800, margin: '0 0 4px' }}>${res.savings.toLocaleString()}</p>
                  <p style={{ color: '#64748b', fontSize: 12 }}>per year with fixes</p>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
                <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔧 Top Fixes to Prioritize (in order):</p>
                {res.fixes.map((fix, idx) => (
                  <div key={fix} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
                    <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{fix}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
