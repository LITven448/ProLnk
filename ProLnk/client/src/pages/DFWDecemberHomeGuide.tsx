import { useState } from 'react';

const HOME_FEATURES = [
  'Holiday lighting and decor',
  'Outdoor pipes and hose bibs',
  'Central HVAC system',
  'Roof and gutters',
  'Home improvements completed this year',
  'Smoke and CO detectors',
  'Electrical system',
  'Garage and storage',
];

const RENOVATIONS = [
  'Added a home office',
  'New roof installed',
  'HVAC system replaced',
  'Solar panels installed',
  'Energy-efficient windows',
  'Major kitchen remodel',
  'Bathroom addition',
  'None this year',
];

const TAX_NOTES: Record<string, string> = {
  'Added a home office': 'Home office deduction possible if used exclusively for business — consult CPA',
  'New roof installed': 'No federal deduction for primary home; may qualify for energy credits if impact-resistant',
  'HVAC system replaced': 'Energy-efficient HVAC may qualify for 25C federal tax credit (up to $600)',
  'Solar panels installed': 'Federal solar tax credit (ITC) = 30% of system cost — claim on Form 5695',
  'Energy-efficient windows': 'Up to $600 federal credit for qualifying windows under 25C — save receipts',
  'Major kitchen remodel': 'Adds to cost basis — track all receipts for eventual home sale capital gains calc',
  'Bathroom addition': 'Adds to cost basis — document all costs; may affect property tax assessment',
  'None this year': 'Still collect all maintenance receipts — cost basis improvements compound over time',
};

const TASK_MAP: Record<string, { task: string; cost: string; category: string }[]> = {
  'Holiday lighting and decor': [
    { task: 'Use surge protector for all outdoor light strings', cost: '$15–$30', category: 'Safety' },
    { task: 'Check max wattage per circuit before adding more lights', cost: '$0', category: 'Safety' },
    { task: 'Set timer on holiday lights — fire risk after midnight', cost: '$20–$40', category: 'Safety' },
  ],
  'Outdoor pipes and hose bibs': [
    { task: 'Wrap exposed pipes with heat tape if forecast below 20°F', cost: '$20–$60', category: 'Freeze Prep' },
    { task: 'Confirm insulating covers still on all hose bibs', cost: '$0', category: 'Freeze Prep' },
  ],
  'Central HVAC system': [
    { task: 'Replace HVAC filter — winter heating final check', cost: '$15–$40', category: 'Maintenance' },
    { task: 'Test heat strips on electric system before coldest weeks', cost: '$0', category: 'Maintenance' },
  ],
  'Roof and gutters': [
    { task: 'Clear gutters of fall leaves before December rains freeze', cost: '$100–$200', category: 'Maintenance' },
    { task: 'Inspect for missing shingles before winter storm season', cost: '$0–$300 repairs', category: 'Maintenance' },
  ],
  'Home improvements completed this year': [
    { task: 'Gather all receipts and contractor invoices — organize by project', cost: '$0', category: 'Tax Prep' },
    { task: 'Note start and completion dates for each project', cost: '$0', category: 'Tax Prep' },
    { task: 'Schedule CPA meeting in January with improvement documentation', cost: '$200–$500 CPA', category: 'Tax Prep' },
  ],
  'Smoke and CO detectors': [
    { task: 'Test all smoke and CO detectors — holiday cooking and fireplace use surge', cost: '$0', category: 'Safety' },
    { task: 'Replace any detector over 10 years old', cost: '$20–$50 per unit', category: 'Safety' },
  ],
  'Electrical system': [
    { task: 'Check panel for tripped breakers from holiday load', cost: '$0', category: 'Safety' },
    { task: 'Verify GFCI outlets in kitchen and bathrooms are working', cost: '$0', category: 'Safety' },
  ],
  'Garage and storage': [
    { task: 'Year-end tool and supply inventory — what needs replacing?', cost: '$0', category: 'Planning' },
    { task: 'Store any outdoor furniture or cushions not yet inside', cost: '$0', category: 'Winter Prep' },
  ],
};

export default function DFWDecemberHomeGuide() {
  const [features, setFeatures] = useState<string[]>([]);
  const [renovations, setRenovations] = useState<string[]>([]);

  function toggleFeature(f: string) {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  function toggleReno(r: string) {
    setRenovations(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  }

  const tasks = features.flatMap(f => TASK_MAP[f] ?? []);
  const taxItems = renovations.filter(r => TAX_NOTES[r]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Seasonal Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>🎄 December DFW Homeowner Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 28 }}>
          Year-end home review. Holiday safety checks. Final freeze prep for DFW cold snaps. Capture renovation receipts before January for tax credits and cost basis updates.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628' }}>
          <strong>📋 December Year-End Priorities</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Holiday light safety: use surge protectors, set timers</li>
            <li>Smoke detectors: test before holiday cooking and fireplace season</li>
            <li>Renovation receipts: gather now for January CPA meeting</li>
            <li>Solar / HVAC upgrades: 25C and ITC tax credits expire if not claimed</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🏠 Select Your Home Features</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {HOME_FEATURES.map(f => (
            <button key={f} onClick={() => toggleFeature(f)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${features.includes(f) ? '#F5E642' : '#1E3050'}`, background: features.includes(f) ? '#F5E642' : '#111F35', color: features.includes(f) ? '#0A1628' : '#ccc', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{f}</button>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔨 Renovations Completed This Year</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {RENOVATIONS.map(r => (
            <button key={r} onClick={() => toggleReno(r)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${renovations.includes(r) ? '#F5E642' : '#1E3050'}`, background: renovations.includes(r) ? '#F5E642' : '#111F35', color: renovations.includes(r) ? '#0A1628' : '#ccc', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{r}</button>
          ))}
        </div>

        {tasks.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📌 Your December Priority List</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((t, i) => (
                <div key={i} style={{ background: '#111F35', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{t.task}</span>
                    <span style={{ background: t.category === 'Safety' ? '#FF4444' : '#1E3050', padding: '3px 10px', borderRadius: 6, fontSize: 12, color: t.category === 'Safety' ? '#fff' : '#F5E642', whiteSpace: 'nowrap' }}>{t.category}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8899AA', marginTop: 4 }}>Est. cost: {t.cost}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {taxItems.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>💰 Year-End Tax Consideration Checklist</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {taxItems.map((r, i) => (
                <div key={i} style={{ background: '#0F2240', border: '1px solid #F5E642', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 4 }}>{r}</div>
                  <div style={{ fontSize: 13, color: '#ccc' }}>{TAX_NOTES[r]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {features.length === 0 && renovations.length === 0 && (
          <p style={{ color: '#445566', textAlign: 'center', marginTop: 40 }}>Select home features and renovations above to build your December year-end checklist.</p>
        )}
      </div>
    </div>
  );
}
