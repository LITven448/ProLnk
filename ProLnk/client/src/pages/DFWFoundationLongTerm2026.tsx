import { useState } from 'react';

export default function DFWFoundationLongTerm2026() {
  const [homeAge, setHomeAge] = useState('');
  const [careLevel, setCareLevel] = useState('');
  const [plan, setPlan] = useState(false);

  const phases = [
    { label: 'Year 1', icon: '🏠', title: 'Establish Baseline', tasks: ['Document foundation crack locations with photos', 'Install soaker hose 18-24" from foundation', 'Set watering schedule (3x/week in dry months)', 'Get baseline elevation survey'] },
    { label: 'Years 2–5', icon: '📐', title: 'Annual Survey & Adjust', tasks: ['Annual elevation survey (compare to baseline)', 'Adjust watering as DFW drought cycles shift', 'Monitor interior doors/windows for sticking', 'Check soaker hose coverage and replace if needed'] },
    { label: 'Years 5–7', icon: '💧', title: 'Drainage Recheck', tasks: ['Inspect all downspout extensions (6ft+ from home)', 'Grade check — soil should slope away 1" per foot', 'Recheck plumbing for leaks under slab', 'Consider French drain if low spots remain'] },
    { label: 'Years 7–10', icon: '🔧', title: 'Pre-Remediation Prep', tasks: ['Structural engineer inspection recommended', 'Budget $8,000–$25,000 for possible pier work', 'Get 3 foundation contractor bids', 'Review homeowner insurance foundation clause'] },
    { label: 'Year 10+', icon: '⚠️', title: 'DFW Reality Check', tasks: ['Most DFW homes need remediation by year 15-20 without care', 'With consistent watering: 25-30 year deferral possible', 'Pier costs rise with delay — act early', 'Document all care for future resale value'] },
  ];

  const urgency: Record<string, string> = {
    'under5': '🟢 You're in the golden window. Establish watering now and you'll likely avoid major repair for 15+ years.',
    '5to15': '🟡 Critical maintenance phase. Consistent watering and annual surveys are essential in DFW clay.',
    '15to25': '🟠 High vigilance required. Get an elevation survey and prioritize drainage this year.',
    'over25': '🔴 Structural assessment recommended. DFW clay homes over 25 without documented care often need piers.',
  };

  const careNote: Record<string, string> = {
    'none': 'No care history significantly increases remediation risk. Start watering immediately.',
    'some': 'Partial care helps. Formalize your routine and get a baseline survey.',
    'consistent': 'Excellent. Document everything — care history increases resale value in DFW.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Foundation Long-Term Care Plan 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>10-year foundation care program for DFW expansive clay soils</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Your Foundation Profile</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#94a3b8' }}>Home Age</label>
          <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Select home age --</option>
            <option value="under5">Under 5 years</option>
            <option value="5to15">5–15 years</option>
            <option value="15to25">15–25 years</option>
            <option value="over25">Over 25 years</option>
          </select>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#94a3b8' }}>Foundation Care History</label>
          <select value={careLevel} onChange={e => setCareLevel(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Select care level --</option>
            <option value="none">No watering routine</option>
            <option value="some">Some occasional watering</option>
            <option value="consistent">Consistent soaker hose program</option>
          </select>
          <button onClick={() => setPlan(true)} disabled={!homeAge || !careLevel} style={{ background: homeAge && careLevel ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: homeAge && careLevel ? 'pointer' : 'default' }}>
            Generate My Long-Term Plan →
          </button>
        </div>

        {plan && homeAge && careLevel && (
          <>
            <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>{urgency[homeAge]}</p>
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 8 }}>📌 {careNote[careLevel]}</p>
            </div>
            {phases.map((p, i) => (
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
          </>
        )}
      </div>
    </div>
  );
}
