import { useState } from 'react';

export default function DFWAirLeakageGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [result, setResult] = useState<null | { leakage: string; priority: string[]; savings: number }>(null);

  function assess() {
    const age = parseFloat(homeAge) || 20;
    const bill = parseFloat(monthlyBill) || 200;
    let leakage = 'Moderate (15–25% air loss)';
    let priority = ['Attic top plates', 'Recessed lights', 'Plumbing penetrations'];
    let savings = Math.round(bill * 0.18);
    if (age > 40) {
      leakage = 'Severe (30–40% air loss)';
      priority = ['Attic top plates', 'Chimney chase gaps', 'Recessed lights', 'Electrical outlets', 'Plumbing stack penetrations', 'Knee walls'];
      savings = Math.round(bill * 0.28);
    } else if (age < 10) {
      leakage = 'Low (8–15% air loss)';
      priority = ['Recessed lights', 'Attic hatch', 'HVAC boots'];
      savings = Math.round(bill * 0.10);
    }
    setResult({ leakage, priority, savings });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Energy Series</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>DFW Air Leakage Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Leaky DFW homes lose 30–40% of their conditioned air — pumping expensive cool air directly into the attic or outside. Air sealing is the highest-ROI energy upgrade in DFW.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>💨 How Air Leaks Drain DFW Energy Bills</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>In DFW, your AC runs 4,000–5,000 hours per year. Every cubic foot of 78°F conditioned air that escapes gets replaced by 100°F+ outside air your AC must re-cool. The Department of Energy estimates the average home has enough gaps to equal a 2-foot-square hole in the wall.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { location: 'Attic top plates & bypasses', pct: '30–35% of total leakage' },
              { location: 'Recessed light fixtures', pct: '10–15% of total leakage' },
              { location: 'Plumbing & electrical penetrations', pct: '13–17% of total leakage' },
              { location: 'Fireplace & chimney chase', pct: '10–12% of total leakage' },
              { location: 'Doors & windows', pct: '10% of total leakage' },
              { location: 'HVAC boots & returns', pct: '8–12% of total leakage' },
            ].map(item => (
              <div key={item.location} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: '#e2e8f0', marginBottom: 4, fontWeight: 600 }}>{item.location}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{item.pct}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔬 Blower Door Testing in DFW</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>A blower door test depressurizes your home and measures air changes per hour (ACH). DFW code requires new homes to achieve ≤3 ACH50. Most pre-2010 DFW homes test at 8–15 ACH50.</p>
          {[
            { label: 'Cost of blower door test', value: '$200 – $400 in DFW' },
            { label: 'DFW new construction requirement', value: '≤3.0 ACH50' },
            { label: 'Typical pre-2000 DFW home', value: '10–18 ACH50' },
            { label: 'After professional air sealing', value: '3–6 ACH50 typical improvement' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a3a5c' }}>
              <span style={{ color: '#94a3b8' }}>{item.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔧 DIY DFW Air Sealing: Where to Start</h2>
          {[
            { step: '1', title: 'Seal attic top plates first', desc: 'Go into your attic. Apply low-expanding foam or caulk where interior walls meet the attic floor. This single step can cut leakage 20–30%.' },
            { step: '2', title: 'Cap recessed lights', desc: 'Install airtight covers over recessed lights in the attic. IC-rated lights still leak air. Foam covers cost $15–25 each.' },
            { step: '3', title: 'Seal plumbing penetrations', desc: 'Every pipe, wire, and duct that passes through your top plate is a gap. Fire-rated caulk or foam seals these permanently.' },
            { step: '4', title: 'Address the attic hatch', desc: 'A typical uninsulated attic hatch leaks as much as a small window. Add weatherstripping and rigid foam insulation (see our Attic Hatch guide).' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5E642', color: '#0A1628', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div><div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{item.title}</div><div style={{ fontSize: 14, color: '#94a3b8' }}>{item.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 DFW Air Leakage Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Age (years)</label>
              <input value={homeAge} onChange={e => setHomeAge(e.target.value)} placeholder="e.g. 35" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Monthly Utility Bill ($)</label>
              <input value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} placeholder="e.g. 250" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Estimate My DFW Air Leakage →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#1a2a3a', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Estimated Leakage: {result.leakage}</div>
              <div style={{ color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Potential monthly savings after sealing: <strong style={{ color: '#F5E642' }}>${result.savings}/mo</strong></div>
              <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 6 }}>Top DFW air sealing priorities:</div>
              {result.priority.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>• {p}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Get DFW Air Sealing Quotes</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects you with DFW energy auditors and air sealing pros. Most projects pay back in 2–4 years in DFW's climate.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get Free DFW Quotes →</button>
        </div>
      </div>
    </div>
  );
}
