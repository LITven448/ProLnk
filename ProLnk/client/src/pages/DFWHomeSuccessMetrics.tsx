import { useState } from 'react';

export default function DFWHomeSuccessMetrics() {
  const [homeValue, setHomeValue] = useState('');
  const [annualMaint, setAnnualMaint] = useState('');
  const [hvacAge, setHvacAge] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [hwAge, setHwAge] = useState('');
  const [claims, setClaims] = useState('');

  const value = parseFloat(homeValue) || 0;
  const maint = parseFloat(annualMaint) || 0;
  const hvac = parseInt(hvacAge) || 0;
  const roof = parseInt(roofAge) || 0;
  const hw = parseInt(hwAge) || 0;
  const claimsNum = parseInt(claims) || 0;

  const maintPct = value > 0 ? (maint / value) * 100 : 0;
  const idealMaintPct = 1.5;

  const scores: { label: string; score: number; detail: string }[] = [];
  if (value && maint) {
    const s = maintPct <= 2 && maintPct >= 0.5 ? 100 : maintPct < 0.5 ? 60 : 50;
    scores.push({ label: '💰 Maintenance Spend', score: s, detail: `You spent ${maintPct.toFixed(1)}% of home value on maintenance. Ideal: 1–2% ($${Math.round(value * 0.01).toLocaleString()}–$${Math.round(value * 0.02).toLocaleString()}/yr)` });
  }
  if (hvac) {
    const s = hvac <= 7 ? 100 : hvac <= 12 ? 80 : hvac <= 16 ? 55 : 30;
    scores.push({ label: '❄️ HVAC System Age', score: s, detail: hvac <= 7 ? 'HVAC in great shape — years of life remaining.' : hvac <= 12 ? 'HVAC mid-life. Schedule annual service and start budgeting for replacement.' : 'HVAC nearing or past end-of-life. Budget $5,000–$12,000 for replacement.' });
  }
  if (roof) {
    const s = roof <= 8 ? 100 : roof <= 15 ? 80 : roof <= 20 ? 55 : 25;
    scores.push({ label: '🏠 Roof Age', score: s, detail: roof <= 8 ? 'Roof is young and well within life expectancy.' : roof <= 15 ? 'Roof mid-life. Get inspection, document condition before hail season.' : 'Roof aging. Get professional inspection — may need replacement within 2–5 years.' });
  }
  if (hw) {
    const s = hw <= 6 ? 100 : hw <= 10 ? 75 : hw <= 14 ? 45 : 20;
    scores.push({ label: '🚿 Water Heater Age', score: s, detail: hw <= 6 ? 'Water heater in good condition.' : hw <= 10 ? 'Water heater approaching mid-life. Flush annually.' : 'Water heater past average lifespan. Proactive replacement avoids emergency costs.' });
  }
  if (claims !== '') {
    const s = claimsNum === 0 ? 100 : claimsNum === 1 ? 75 : claimsNum === 2 ? 45 : 20;
    scores.push({ label: '📋 Insurance Claims (5yr)', score: s, detail: claimsNum === 0 ? 'Clean claims history — excellent for insurance rates.' : claimsNum === 1 ? 'One claim is manageable. Two more may trigger non-renewal.' : 'Multiple claims may affect insurability in DFW market. Consider higher deductible.' });
  }

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((s, i) => s + i.score, 0) / scores.length) : 0;
  const grade = avgScore >= 85 ? 'A' : avgScore >= 70 ? 'B' : avgScore >= 55 ? 'C' : avgScore >= 40 ? 'D' : 'F';
  const gradeColor = avgScore >= 85 ? '#22c55e' : avgScore >= 70 ? '#F5E642' : avgScore >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Homeowner Success Metrics</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>Measure how you're doing as a DFW homeowner — maintenance spend, system ages, claims history, and overall home health score.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📥 Enter Your Home Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'HOME VALUE ($)', val: homeValue, set: setHomeValue, ph: '425000' },
              { label: 'ANNUAL MAINT SPEND ($)', val: annualMaint, set: setAnnualMaint, ph: '5200' },
              { label: 'HVAC AGE (years)', val: hvacAge, set: setHvacAge, ph: '8' },
              { label: 'ROOF AGE (years)', val: roofAge, set: setRoofAge, ph: '11' },
              { label: 'WATER HEATER AGE (years)', val: hwAge, set: setHwAge, ph: '7' },
              { label: 'INSURANCE CLAIMS (5yr)', val: claims, set: setClaims, ph: '0' },
            ].map(({ label, val, set, ph }) => (
              <div key={label}>
                <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</label>
                <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={ph} style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', width: '100%', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
        </div>

        {scores.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>HOMEOWNER SUCCESS SCORE</div>
              <div style={{ fontSize: 64, fontWeight: 900, color: gradeColor }}>{grade}</div>
              <div style={{ color: gradeColor, fontSize: 20, fontWeight: 700 }}>{avgScore}/100</div>
            </div>
            {scores.map(item => (
              <div key={item.label} style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{item.label}</div>
                  <div style={{ color: item.score >= 80 ? '#22c55e' : item.score >= 60 ? '#F5E642' : '#ef4444', fontWeight: 700 }}>{item.score}/100</div>
                </div>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 4, height: 6, marginBottom: 8 }}>
                  <div style={{ backgroundColor: item.score >= 80 ? '#22c55e' : item.score >= 60 ? '#F5E642' : '#ef4444', height: 6, borderRadius: 4, width: `${item.score}%` }} />
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        )}

        {scores.length === 0 && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center', color: '#64748b' }}>Enter your home stats above to calculate your homeowner success score.</div>
        )}

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Improve your score with vetted DFW pros</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk matches homeowners with pre-screened local contractors</div>
        </div>
      </div>
    </div>
  );
}
