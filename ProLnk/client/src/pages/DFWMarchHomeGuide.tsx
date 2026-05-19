import { useState } from 'react';

const HOME_FEATURES = [
  'Central HVAC system',
  'Irrigation / sprinklers',
  'Pool or spa',
  'Lawn and landscaping',
  'Foundation / slab',
  'Pest control',
  'Roof and gutters',
  'Outdoor AC unit',
];

const TASK_MAP: Record<string, { task: string; cost: string; timing: string }[]> = {
  'Central HVAC system': [
    { task: 'Pre-season HVAC tune-up before DFW summer heat', cost: '$80–$150', timing: 'Before April' },
    { task: 'Replace air filter — switch from heating to cooling mode', cost: '$15–$40', timing: 'Early March' },
  ],
  'Irrigation / sprinklers': [
    { task: 'Restart irrigation system — DFW lawn begins waking up', cost: '$75–$120 pro startup', timing: 'Mid-March' },
    { task: 'Inspect heads for winter damage', cost: '$0–$50 repairs', timing: 'Early March' },
  ],
  'Pool or spa': [
    { task: 'Open pool / remove cover if winterized', cost: '$150–$300', timing: 'Late March' },
    { task: 'Balance water chemistry for warming temps', cost: '$40–$80', timing: 'Late March' },
  ],
  'Lawn and landscaping': [
    { task: 'Oak pollen peak — DFW; clean pollen from surfaces', cost: '$0', timing: 'All of March' },
    { task: 'Apply pre-emergent herbicide before crabgrass germinates', cost: '$40–$80', timing: 'Early March' },
    { task: 'Fertilize lawn when soil temp hits 65°F', cost: '$30–$70', timing: 'Late March' },
  ],
  'Foundation / slab': [
    { task: 'Check foundation perimeter moisture after dry DFW winter', cost: '$0', timing: 'Early March' },
    { task: 'Run soaker hose if soil is cracked or pulling away', cost: '$0–$40', timing: 'As needed' },
  ],
  'Pest control': [
    { task: 'Schedule spring pest treatment — ant and roach surge begins', cost: '$80–$150', timing: 'Early March' },
    { task: 'Seal entry points: weep holes, door thresholds, pipe penetrations', cost: '$20–$60', timing: 'Early March' },
  ],
  'Roof and gutters': [
    { task: 'Clear gutters of winter debris before spring rains', cost: '$100–$200', timing: 'Early March' },
    { task: 'Inspect roof for winter storm damage', cost: '$0–$150 inspection', timing: 'Early March' },
  ],
  'Outdoor AC unit': [
    { task: 'Clear debris from around condenser — trim plants back 2 ft', cost: '$0', timing: 'Early March' },
    { task: 'Hose down condenser fins gently to remove pollen buildup', cost: '$0', timing: 'Mid-March' },
  ],
};

export default function DFWMarchHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(feature: string) {
    setSelected(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  }

  const tasks = selected.flatMap(f => TASK_MAP[f] ?? []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Seasonal Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>🌸 March DFW Homeowner Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 28 }}>
          Spring prep season. DFW oak pollen peaks. Get HVAC ready before triple-digit temps arrive. Foundation moisture check critical after dry winter.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628′ }}>
          <strong>🌿 March DFW Priorities</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Schedule HVAC tune-up NOW — summer books fast in DFW</li>
            <li>Oak pollen: wipe down outdoor furniture weekly in March</li>
            <li>Irrigation startup: mid-to-late March for Bermuda/St. Augustine lawns</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🏠 Select Your Home Features</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {HOME_FEATURES.map(f => (
            <button
              key={f}
              onClick={() => toggle(f)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `2px solid ${selected.includes(f) ? '#F5E642' : '#1E3050'}`,
                background: selected.includes(f) ? '#F5E642′ : '#111F35',
                color: selected.includes(f) ? '#0A1628′ : '#ccc',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {tasks.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📌 Your March Priority List + Timing</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ background: '#111F35', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{t.task}</span>
                    <span style={{ background: '#1E3050', padding: '3px 10px', borderRadius: 6, fontSize: 12, color: '#F5E642', whiteSpace: 'nowrap' }}>{t.timing}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8899AA', marginTop: 4 }}>Est. cost: {t.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <p style={{ color: '#445566', textAlign: 'center', marginTop: 40 }}>Select your home features above to see your March DFW task list with timing.</p>
        )}
      </div>
    </div>
  );
}
