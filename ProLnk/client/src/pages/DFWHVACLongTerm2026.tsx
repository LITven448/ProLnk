import { useState } from 'react';

export default function DFWHVACLongTerm2026() {
  const [systemAge, setSystemAge] = useState('');
  const [plan, setPlan] = useState(false);

  const phases = [
    { label: 'Years 0–5', icon: '📋', title: 'Annual Tune-Ups & Documentation', tasks: ['Annual spring tune-up (April before DFW heat)', 'Document all service calls and refrigerant checks', 'Change filters monthly in DFW summer', 'Register manufacturer warranty if not done'] },
    { label: 'Years 5–10', icon: '🔧', title: 'Major Service Checks', tasks: ['Coil cleaning — DFW dust buildup reduces efficiency 20%+', 'Blower motor bearing inspection', 'Refrigerant charge verification (R-410A or R-454B)', 'Ductwork leakage test — DFW attics destroy duct seals'] },
    { label: 'Years 10–15', icon: '💰', title: 'Prepare Replacement Budget', tasks: ['Start HVAC replacement savings ($8,000–$18,000 DFW)', 'Get R-22 system replacement quote if applicable', 'Consider variable speed upgrade for humidity control', 'Document repair costs — exceeding 50% = replace signal'] },
    { label: 'Years 12–15', icon: '⭐', title: 'Optimal Replacement Window', tasks: ['Best time to replace before emergency failure', 'Get 3 bids from TACL-licensed DFW contractors', 'Compare 16 SEER2 vs 18+ SEER2 for DFW ROI', 'Rebates available: Oncor up to $800, manufacturer up to $1,500'] },
    { label: 'Years 15+', icon: '⚠️', title: 'Emergency Territory', tasks: ['Systems over 15 in DFW: failure risk spikes June–Aug', 'Summer emergency replacement = 20-30% premium on price', 'Keep $3,000 emergency HVAC fund if deferring', 'Any repair over $1,200 = get replacement bid first'] },
  ];

  const statusMap: Record<string, { color: string; msg: string }> = {
    '0to5': { color: '#22c55e', msg: '🟢 Honeymoon phase. Focus on annual tune-ups and filter changes. Document everything.' },
    '5to10': { color: '#eab308', msg: '🟡 Maintenance critical window. Coil cleaning and duct testing now prevent major failures in years 12-15.' },
    '10to12': { color: '#f97316', msg: '🟠 Start budgeting for replacement. You're approaching the optimal DFW replacement window.' },
    '12to15': { color: '#ef4444', msg: '🔴 Optimal replacement window now. Get bids before summer — avoid emergency pricing.' },
    'over15': { color: '#dc2626', msg: '🆘 High failure risk in DFW heat. Any repair should be evaluated against replacement cost first.' },
  };

  const s = systemAge ? statusMap[systemAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Long-Term Ownership Plan 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>20-year HVAC ownership strategy for North Texas extreme heat</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ Current System Age</h2>
          <select value={systemAge} onChange={e => { setSystemAge(e.target.value); setPlan(false); }} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Select system age --</option>
            <option value="0to5">0–5 years (newer system)</option>
            <option value="5to10">5–10 years</option>
            <option value="10to12">10–12 years</option>
            <option value="12to15">12–15 years (replace now)</option>
            <option value="over15">Over 15 years (urgent)</option>
          </select>
          <button onClick={() => setPlan(true)} disabled={!systemAge} style={{ background: systemAge ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: systemAge ? 'pointer' : 'default' }}>
            Show My Ownership Plan →
          </button>
        </div>

        {plan && s && (
          <div style={{ background: '#1e2d45', borderLeft: `3px solid ${s.color}`, borderRadius: 12, padding: 20, marginBottom: 20, fontSize: 14 }}>
            {s.msg}
          </div>
        )}

        {plan && phases.map((p, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>{p.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</div>
              </div>
            </div>
            {p.tasks.map((t, j) => <div key={j} style={{ padding: '7px 12px', background: '#0A1628', borderRadius: 6, marginBottom: 6, fontSize: 13 }}>✓ {t}</div>)}
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 10 }}>🌞 DFW HVAC Reality</h3>
          {['DFW averages 30+ days over 100°F annually', 'HVAC runs 2,800+ hours/year in DFW (vs 1,200 national avg)', 'R-22 systems are end-of-life — refrigerant unavailable', 'Variable speed systems handle DFW humidity far better'].map((f, i) => (
            <div key={i} style={{ fontSize: 13, color: '#cbd5e1', padding: '6px 0', borderBottom: i < 3 ? '1px solid #334155' : 'none' }}>📍 {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
