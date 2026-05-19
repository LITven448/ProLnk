import { useState } from 'react';

export default function DFWRoofingLongTerm2026() {
  const [roofAge, setRoofAge] = useState('');
  const [plan, setPlan] = useState(false);

  const phases = [
    { label: 'Years 0–5', icon: '📋', title: 'Document & Inspect', tasks: ['Get baseline inspection from licensed DFW roofer', 'Photograph all flashings, pipe boots, ridge caps', 'Register manufacturer warranty if applicable', 'Report hail events to insurance within 12 months'] },
    { label: 'Years 5–10', icon: '🔧', title: 'First Major Maintenance', tasks: ['Replace all pipe boots (rubber degrades in DFW heat)', 'First hail damage assessment after major storm', 'Reapply caulk around all penetrations', 'Inspect attic ventilation — DFW attics hit 160°F+'] },
    { label: 'Years 10–15', icon: '⬆️', title: 'Upgrade Consideration Window', tasks: ['Class 4 impact-resistant shingle upgrade at next storm', 'Get insurance premium discount quote for Class 4', 'Replace ridge vent if original (20yr life)', 'Budget $15,000–$22,000 for full replacement'] },
    { label: 'Years 15–20', icon: '💰', title: 'Replacement Budget Phase', tasks: ['Start dedicated roofing replacement savings', 'Annual inspection now critical — catching leaks early saves decking', 'Get 3 replacement bids to compare', 'DFW 3-tab shingles: near end of life by year 17'] },
    { label: 'Years 20–25', icon: '🔄', title: 'Replacement Time', tasks: ['Most DFW roofs replaced 20–25 years (hail accelerates)', 'Class 4 shingles rated 30yr in DFW climate', 'Request permit for replacement — verify contractor license', 'Document new roof for insurance premium reduction'] },
  ];

  const urgencyMap: Record<string, { color: string; msg: string }> = {
    '0to5': { color: '#22c55e', msg: '🟢 New roof. Focus on documentation and warranty registration. Your next hail storm is the first test.' },
    '5to10': { color: '#eab308', msg: '🟡 Prime maintenance window. Replace pipe boots now before leaks develop. Assess for hail damage.' },
    '10to15': { color: '#f97316', msg: '🟠 Upgrade window. A Class 4 shingle now pays off in insurance savings and longevity in DFW hail country.' },
    '15to20': { color: '#ef4444', msg: '🔴 Budget for replacement. Annual inspections are critical — one missed leak destroys decking fast.' },
    'over20': { color: '#dc2626', msg: '🆘 Replacement overdue. DFW shingles past 20 years are at high leak risk. Get bids now.' },
  };

  const u = roofAge ? urgencyMap[roofAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Roofing Long-Term Care Plan 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>25-year roofing ownership strategy for North Texas hail country</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Current Roof Age</h2>
          <select value={roofAge} onChange={e => { setRoofAge(e.target.value); setPlan(false); }} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Select current roof age --</option>
            <option value="0to5″>0–5 years (new roof)</option>
            <option value="5to10″>5–10 years</option>
            <option value="10to15″>10–15 years</option>
            <option value="15to20″>15–20 years</option>
            <option value="over20″>Over 20 years</option>
          </select>
          <button onClick={() => setPlan(true)} disabled={!roofAge} style={{ background: roofAge ? '#F5E642′ : '#334155', color: '#0A1628', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: roofAge ? 'pointer' : 'default' }}>
            Show My 25-Year Plan →
          </button>
        </div>

        {plan && u && (
          <div style={{ background: '#1e2d45', borderLeft: `3px solid ${u.color}`, borderRadius: 12, padding: 20, marginBottom: 20, fontSize: 14 }}>
            {u.msg}
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
          <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 10 }}>🌩️ DFW Hail Facts</h3>
          {['DFW averages 2–4 hail events per year', '1″ hail = functional damage to standard shingles', 'Insurance claims window: typically 12 months post-storm', 'Class 4 shingles = up to 30% insurance premium reduction'].map((f, i) => (
            <div key={i} style={{ fontSize: 13, color: '#cbd5e1', padding: '6px 0', borderBottom: i < 3 ? '1px solid #334155′ : ’none' }}>📍 {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
