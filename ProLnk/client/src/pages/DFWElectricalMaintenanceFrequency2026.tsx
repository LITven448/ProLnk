import { useState } from 'react';

const homeAges = ['New (0-10 years)', 'Mid-age (10-25 years)', 'Older (25+ years)'];
const panelTypes = ['Modern breaker panel (post-1990)', 'Older breaker panel (pre-1990)', 'Fuse box or unknown'];

type CalItem = { task: string; frequency: string; note: string };

const getCalendar = (age: string, panel: string): CalItem[] => {
  const universal: CalItem[] = [
    { task: 'GFCI outlet test (all bathrooms, kitchen, garage, exterior)', frequency: 'Monthly', note: 'Press test button — outlet should lose power. Reset and verify restoration.' },
    { task: 'Smoke detector test', frequency: 'Monthly', note: 'Press test button — all units should alarm within 3 seconds.' },
    { task: 'CO detector test', frequency: 'Monthly', note: 'Test button confirms sensor is active — replace unit every 7 years.' },
    { task: 'Smoke detector battery replacement', frequency: 'Annual (every Oct)', note: 'Replace at Daylight Saving Time — easy annual reminder.' },
  ];

  const panelItems: Record<string, CalItem[]> = {
    'Modern breaker panel (post-1990)': [
      { task: 'Panel visual inspection', frequency: 'Every 10 years', note: 'Look for corrosion, heat marks, or double-tapped breakers.' },
      { task: 'AFCI breaker test', frequency: 'Annual', note: 'Press test button on AFCI breakers — should trip immediately.' },
    ],
    'Older breaker panel (pre-1990)': [
      { task: 'Licensed electrical inspection', frequency: 'Every 5 years', note: 'Pre-1990 panels may have Federal Pacific or Zinsco — both fire hazards.' },
      { task: 'Panel replacement evaluation', frequency: 'Get a quote now', note: 'If you have a Federal Pacific Stab-Lok panel, replace it — do not wait.' },
    ],
    'Fuse box or unknown': [
      { task: 'Full electrical inspection', frequency: 'Immediately', note: 'Fuse boxes are not code-compliant for most modern loads.' },
      { task: 'Panel upgrade to modern breakers', frequency: 'Schedule within 1 year', note: 'Required for home sale in most DFW municipalities.' },
    ],
  };

  const ageItems: Record<string, CalItem[]> = {
    'New (0-10 years)': [
      { task: 'Outlet and switch cover check', frequency: 'Annual', note: 'Ensure all covers are secure — loose covers are a code issue.' },
    ],
    'Mid-age (10-25 years)': [
      { task: 'Exterior outlet weatherproofing check', frequency: 'Annual', note: 'DFW storms degrade cover gaskets — replace cracked covers immediately.' },
      { task: 'Whole-home surge protector check', frequency: 'Annual', note: 'DFW storms cause significant surge events — replace after major storm.' },
    ],
    'Older (25+ years)': [
      { task: 'Wiring inspection (knob-and-tube or aluminum check)', frequency: 'Immediately if unknown', note: 'Aluminum branch circuit wiring is a fire risk — requires COPALUM remediation.' },
      { task: 'Whole-home rewire evaluation', frequency: 'Get quote if pre-1985', note: 'Insulation degradation on older wiring is a leading cause of DFW house fires.' },
    ],
  };

  return [...universal, ...(panelItems[panel] || []), ...(ageItems[age] || [])];
};

export default function DFWElectricalMaintenanceFrequency2026() {
  const [age, setAge] = useState('');
  const [panel, setPanel] = useState('');
  const items = age && panel ? getCalendar(age, panel) : [];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⚡🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Electrical Maintenance Frequency Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Electrical failures are a leading cause of house fires in Texas. Build your personalized inspection calendar based on your home age and panel type.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 Home Age</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeAges.map((a) => (
              <button key={a} onClick={() => setAge(a)}
                style={{ padding: '11px 16px', borderRadius: 8, border: age === a ? '2px solid #F5E642′ : '2px solid #2d3f5a', backgroundColor: age === a ? '#F5E642' : '#0d1f36', color: age === a ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: ’pointer', textAlign: 'left' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>⚡ Panel Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {panelTypes.map((p) => (
              <button key={p} onClick={() => setPanel(p)}
                style={{ padding: '11px 16px', borderRadius: 8, border: panel === p ? '2px solid #F5E642′ : '2px solid #2d3f5a', backgroundColor: panel === p ? '#F5E642' : '#0d1f36', color: panel === p ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: ’pointer', textAlign: 'left' }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {items.length > 0 && (
          <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Your Electrical Inspection Calendar</h2>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '11px 0', borderBottom: '1px solid #2d3f5a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{item.task}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, marginLeft: 8, whiteSpace: 'nowrap' }}>{item.frequency}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 13 }}>💡 {item.note}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>⚡ DFW Storm Season Tip</h3>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            After any major DFW storm, check your whole-home surge protector indicator light and test all GFCIs.
            DFW averages <strong style={{ color: '#e2e8f0′ }}>over 50 thunderstorm days per year</strong> — surge events are cumulative and degrade electronics invisibly.
          </div>
        </div>
      </div>
    </div>
  );
}