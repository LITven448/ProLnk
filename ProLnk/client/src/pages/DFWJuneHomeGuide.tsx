import { useState } from 'react';

const HOME_FEATURES = [
  'Central AC system',
  'Pool or spa',
  'Outdoor furniture / patio',
  'Lawn and irrigation',
  'Lightning rod / surge protection',
  'Roof and attic',
  'Ceiling fans',
  'Outdoor kitchen / grill',
];

const TASK_MAP: Record<string, { task: string; cost: string; checkEvery: string }[]> = {
  'Central AC system': [
    { task: 'Replace AC filter — start monthly summer rotation', cost: '$15–$40', checkEvery: 'Every 4 weeks' },
    { task: 'Check refrigerant — schedule if AC takes >10 min to cool', cost: '$100–$300', checkEvery: 'Once in June' },
    { task: 'Verify thermostat program: DFW can hit 105°F — pre-cool before 3pm', cost: '$0', checkEvery: 'Once set' },
  ],
  'Pool or spa': [
    { task: 'Adjust chlorine up — summer heat burns through chemicals fast', cost: '$40–$100/mo', checkEvery: 'Every 2 weeks' },
    { task: 'Check pump run time — increase to 10–12 hrs/day in summer', cost: '$0', checkEvery: 'Once in June' },
    { task: 'Inspect pool deck surface for heat cracking', cost: '$0–$200 repairs', checkEvery: 'Every 2 weeks' },
  ],
  'Outdoor furniture / patio': [
    { task: 'Apply UV protectant to outdoor cushions and furniture', cost: '$20–$50', checkEvery: 'Every 4–6 weeks' },
    { task: 'Inspect umbrella fabric for UV fading and frame rust', cost: '$0', checkEvery: 'Monthly' },
    { task: 'Hose down patio to clear pollen and June bug debris', cost: '$0', checkEvery: 'Every 2 weeks' },
  ],
  'Lawn and irrigation': [
    { task: 'Water Bermuda 1" per week — split into 2–3 deep sessions', cost: '$0 (water bill increase)', checkEvery: 'Weekly' },
    { task: 'Check irrigation heads for clogs from summer dust', cost: '$0–$80', checkEvery: 'Every 2 weeks' },
    { task: 'Mow at 2–3" — no shorter or DFW heat will scorch roots', cost: '$50–$120', checkEvery: 'Weekly' },
  ],
  'Lightning rod / surge protection': [
    { task: 'Verify whole-home surge protector is installed at panel', cost: '$200–$400 install', checkEvery: 'Once' },
    { task: 'Check lightning rod bonding if home has one', cost: '$0–$150 inspection', checkEvery: 'Annually in June' },
    { task: 'Unplug sensitive electronics during DFW storm season', cost: '$0', checkEvery: 'Per storm event' },
  ],
  'Roof and attic': [
    { task: 'Check attic ventilation — temps can exceed 160°F without it', cost: '$0', checkEvery: 'Once in June' },
    { task: 'Verify attic insulation R-value (R-38+ recommended for DFW)', cost: '$0', checkEvery: 'Annually' },
  ],
  'Ceiling fans': [
    { task: 'Switch all ceiling fans to counterclockwise for summer cooling', cost: '$0', checkEvery: 'Once in June' },
    { task: 'Dust fan blades — pollen buildup reduces airflow efficiency', cost: '$0', checkEvery: 'Monthly' },
  ],
  'Outdoor kitchen / grill': [
    { task: 'Deep clean grill grates before heavy summer use begins', cost: '$0–$50', checkEvery: 'Monthly' },
    { task: 'Check propane connections and hose condition', cost: '$0', checkEvery: 'Monthly' },
  ],
};

export default function DFWJuneHomeGuide() {
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
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>☀️ June DFW Homeowner Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 28 }}>
          Full summer mode. DFW power demand peaks. AC runs 10–14 hrs/day. Storm season brings lightning surges. Check critical systems every 2 weeks.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628' }}>
          <strong>⚡ June DFW Check-Ins Every 2 Weeks</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>AC filter — monthly rotation starts now</li>
            <li>Pool chemistry — heat kills chlorine fast</li>
            <li>Irrigation heads — heat and dust clog sprinkler nozzles</li>
            <li>Power surges — DFW storm season peaks Jun–Aug</li>
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
                background: selected.includes(f) ? '#F5E642' : '#111F35',
                color: selected.includes(f) ? '#0A1628' : '#ccc',
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
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📌 Your June Priority List + Check Frequency</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ background: '#111F35', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{t.task}</span>
                    <span style={{ background: '#1E3050', padding: '3px 10px', borderRadius: 6, fontSize: 12, color: '#F5E642', whiteSpace: 'nowrap' }}>{t.checkEvery}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8899AA', marginTop: 4 }}>Est. cost: {t.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <p style={{ color: '#445566', textAlign: 'center', marginTop: 40 }}>Select your home features to see what to check every 2 weeks this DFW summer.</p>
        )}
      </div>
    </div>
  );
}
