import { useState } from 'react';

const HOME_FEATURES = ['Central HVAC', 'Slab Foundation', 'Sprinkler System', 'Pest Control', 'Wood Deck', 'Pool', 'Gutters', 'Generator'];

interface Reminder {
  task: string;
  months: string[];
  why: string;
  how: string;
}

const REMINDERS: Record<string, Reminder[]> = {
  'Central HVAC': [
    { task: 'Change HVAC filter', months: ['May','Jun','Jul','Aug','Sep'], why: 'DFW summers run AC non-stop — dirty filters cut efficiency 15%', how: 'Phone calendar: repeat monthly May–Sep' },
    { task: 'Annual HVAC tune-up', months: ['Mar'], why: 'Before cooling season hits 100°F+ days', how: 'Schedule with HVAC company by February' },
  ],
  'Slab Foundation': [
    { task: 'Water perimeter 30 min', months: ['Jun','Jul','Aug'], why: 'DFW clay soil shrinks in drought, causes foundation movement', how: 'Smart irrigation zone or weekly hose reminder' },
    { task: 'Foundation inspection', months: ['Oct'], why: 'After summer stress — catch shifts early', how: 'Annual calendar reminder + engineer inspection' },
  ],
  'Sprinkler System': [
    { task: 'Turn on + inspect heads', months: ['Apr'], why: 'Before summer drought season begins', how: 'Calendar reminder with irrigation company contact' },
    { task: 'Winterize sprinklers', months: ['Nov'], why: 'DFW gets periodic hard freezes — burst pipes are expensive', how: 'Calendar: first week of November' },
  ],
  'Pest Control': [
    { task: 'Quarterly pest treatment', months: ['Feb','May','Aug','Nov'], why: 'DFW has heavy roach, ant, scorpion pressure year-round', how: 'Set up recurring contract with pest company' },
    { task: 'Termite inspection', months: ['Apr'], why: 'Termite season peaks April–May in North TX', how: 'Annual calendar reminder — often free with pest contract' },
  ],
  'Wood Deck': [
    { task: 'Clean and reseal deck', months: ['Apr'], why: 'Before summer UV exposure begins. DFW sun bleaches and cracks wood fast', how: 'Calendar: April — buy sealer in March' },
    { task: 'Inspect for rot and loose boards', months: ['Oct'], why: 'After summer heat stress', how: 'Walk-through checklist reminder' },
  ],
  Pool: [
    { task: 'Open pool for season', months: ['Mar'], why: 'DFW swimming starts early — be ready by April', how: 'Pool service contract or DIY calendar' },
    { task: 'Check chemical balance', months: ['May','Jun','Jul','Aug'], why: 'High temps destabilize chlorine faster', how: 'Weekly test strips + monthly service reminder' },
    { task: 'Close pool / winterize', months: ['Nov'], why: 'Protect equipment from hard freezes', how: 'Schedule pool company by October' },
  ],
  Gutters: [
    { task: 'Clean gutters', months: ['Apr','Oct'], why: 'Spring storms + fall leaves clog DFW gutters quickly', how: 'Calendar: mid-April and mid-October' },
    { task: 'Check downspout drainage', months: ['Apr'], why: 'Poor drainage worsens foundation issues on clay soil', how: 'Inspect after first spring rain' },
  ],
  Generator: [
    { task: 'Run generator 30 min + load test', months: ['Feb','May','Aug','Nov'], why: 'DFW ice storms and summer grid stress — be ready quarterly', how: 'Calendar: first Saturday of each quarter' },
    { task: 'Change generator oil', months: ['Apr'], why: 'Annual maintenance before storm season', how: 'Calendar: April — check manual for oil type' },
  ],
};

const METHOD_INFO = {
  phone: '📱 Phone Calendar: Set recurring events in iOS/Android Calendar. Use "Custom" repeat for exact months.',
  smarthome: '🏠 Smart Home: Use Google Home Routines or Alexa Routines for seasonal reminders by date.',
  prolnk: '⚡ ProLnk Reminders: ProLnk will auto-notify you based on your DFW location and home profile.',
};

export default function DFWMaintenanceReminderSetup() {
  const [selected, setSelected] = useState<string[]>(['Central HVAC', 'Slab Foundation']);
  const [method, setMethod] = useState<'phone' | 'smarthome' | 'prolnk'>('phone');

  function toggle(f: string) {
    setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  const allReminders = selected.flatMap(f => (REMINDERS[f] || []).map(r => ({ ...r, feature: f })));

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#1D4ED8', letterSpacing: 1, fontWeight: 700 }}>DFW HOMEOWNER TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, color: '#0A1628′ }}>⏰ Maintenance Reminder Setup</h1>
        <p style={{ color: '#5A7A9A', marginBottom: 28 }}>Build your DFW-specific annual maintenance calendar in minutes.</p>

        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(10,22,40,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 14 }}>Step 1: Select Your Home Features</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {HOME_FEATURES.map(f => (
              <button key={f} onClick={() => toggle(f)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  borderColor: selected.includes(f) ? '#0A1628′ : '#D1D9E6',
                  background: selected.includes(f) ? '#0A1628′ : '#fff',
                  color: selected.includes(f) ? '#F5E642′ : '#5A7A9A' }}>
                {selected.includes(f) ? '✓ ' : ''}{f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(10,22,40,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 14 }}>Step 2: Choose Your Reminder Method</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['phone', 'smarthome', 'prolnk'] as const).map(m => (
              <button key={m} onClick={() => setMethod(m)}
                style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 13, textAlign: 'center',
                  borderColor: method === m ? '#0A1628′ : '#D1D9E6',
                  background: method === m ? '#0A1628′ : '#F8F9FB',
                  color: method === m ? '#F5E642′ : '#5A7A9A' }}>
                {m === 'phone' ? '📱 Phone Calendar' : m === 'smarthome' ? '🏠 Smart Home' : '⚡ ProLnk'}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 14, background: '#F0F4FF', borderRadius: 10, padding: 14, fontSize: 14, color: '#0A1628', lineHeight: 1.6 }}>
            {METHOD_INFO[method]}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(10,22,40,0.07)' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 16 }}>📅 Your Annual Reminder Calendar ({allReminders.length} reminders)</h2>
          {allReminders.length === 0 && <p style={{ color: '#5A7A9A' }}>Select home features above to generate your calendar.</p>}
          {allReminders.map((r, i) => (
            <div key={i} style={{ background: '#F8F9FB', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{r.task}</span>
                  <span style={{ marginLeft: 10, fontSize: 12, background: '#E0E7FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{r.feature}</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {r.months.map(m => <span key={m} style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '2px 7px', borderRadius: 8, fontWeight: 800 }}>{m}</span>)}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#5A7A9A', marginBottom: 4 }}>💡 {r.why}</div>
              <div style={{ fontSize: 13, color: '#1D4ED8', fontWeight: 600 }}>→ {r.how}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
