import { useState } from 'react';

const HOME_FEATURES = [
  'Central HVAC system',
  'Lawn and landscaping',
  'Gutters and roof',
  'Wood deck or fence',
  'Irrigation system',
  'Windows and doors',
  'Pest control',
  'Pool or spa',
];

const TASK_MAP: Record<string, { task: string; cost: string; fallTimeline: string }[]> = {
  'Central HVAC system': [
    { task: 'Replace HVAC filter — end-of-summer change', cost: '$15–$40', fallTimeline: 'Early September' },
    { task: 'Schedule fall HVAC tune-up before heating season', cost: '$80–$150', fallTimeline: 'September–October' },
    { task: 'Check thermostat — switch from full cooling to mild mode', cost: '$0', fallTimeline: 'Late September' },
  ],
  'Lawn and landscaping': [
    { task: 'Aerate and overseed Bermuda before dormancy — DFW timing', cost: '$150–$400', fallTimeline: 'Mid-September' },
    { task: 'Apply fall fertilizer to strengthen roots through winter', cost: '$30–$70', fallTimeline: 'Late September' },
    { task: 'Property tax protest season passed — calendar Jan protest window now', cost: '$0', fallTimeline: 'Note for Jan' },
  ],
  'Gutters and roof': [
    { task: 'First gutter inspection before fall leaf season', cost: '$0–$150 clean', fallTimeline: 'Late September' },
    { task: 'Check for summer storm damage on roof shingles', cost: '$0–$300 repairs', fallTimeline: 'Early September' },
  ],
  'Wood deck or fence': [
    { task: 'DFW humidity drops in fall — ideal staining and sealing window', cost: '$200–$600', fallTimeline: 'September–October best' },
    { task: 'Sand rough spots and apply sealant before winter moisture', cost: '$80–$250', fallTimeline: 'September–October best' },
  ],
  'Irrigation system': [
    { task: 'Reduce irrigation frequency as DFW temps drop below 90°F', cost: '$0', fallTimeline: 'Late September' },
    { task: 'Inspect heads after summer for UV and heat damage', cost: '$0–$80', fallTimeline: 'Early September' },
  ],
  'Windows and doors': [
    { task: 'Check weatherstripping before fall cooling costs rise', cost: '$20–$80', fallTimeline: 'September' },
    { task: 'Inspect window caulk for summer heat cracks', cost: '$10–$40', fallTimeline: 'September' },
  ],
  'Pest control': [
    { task: 'Fall pest treatment — rodents begin seeking indoor warmth', cost: '$80–$150', fallTimeline: 'Late September' },
    { task: 'Seal gaps around pipes and utility penetrations', cost: '$20–$60', fallTimeline: 'September' },
  ],
  'Pool or spa': [
    { task: 'Reduce pool pump run time as temps drop below 85°F', cost: '$0 (utility savings)', fallTimeline: 'Late September' },
    { task: 'Balance water chemistry for fall — algae risk drops', cost: '$20–$50', fallTimeline: 'September' },
  ],
};

export default function DFWSeptemberHomeGuide() {
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
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>🍂 September DFW Homeowner Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 28 }}>
          Fall transition begins. DFW humidity drops — best window to stain decks and seal wood. Property tax protests are over; mark your calendar for January. Gutters, HVAC, and lawn prep now before the real fall arrives.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628' }}>
          <strong>🍁 September DFW Fall Prep Timeline</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Early Sept: HVAC filter swap, roof inspection after summer storms</li>
            <li>Mid Sept: Lawn aeration and overseed window opens for DFW</li>
            <li>Late Sept: First gutter inspection, deck staining window begins</li>
            <li>Note: Property tax protest window (May) — calendar it now for 2027</li>
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
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📌 Your September Priority List + Fall Timing</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ background: '#111F35', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{t.task}</span>
                    <span style={{ background: '#1E3050', padding: '3px 10px', borderRadius: 6, fontSize: 12, color: '#F5E642', whiteSpace: 'nowrap' }}>{t.fallTimeline}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8899AA', marginTop: 4 }}>Est. cost: {t.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <p style={{ color: '#445566', textAlign: 'center', marginTop: 40 }}>Select your home features to build your September fall prep timeline.</p>
        )}
      </div>
    </div>
  );
}
