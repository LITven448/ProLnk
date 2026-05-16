import { useState } from 'react';

const URGENCY = {
  week: { label: 'Do This Week', color: '#FF6B6B' },
  month: { label: 'Do This Month', color: '#F5E642' },
  year: { label: 'Do This Year', color: '#4FC3F7' },
};

const ALL_ITEMS = [
  { id: 1, text: 'Test smoke and CO detectors', urgency: 'week', trades: [], always: true },
  { id: 2, text: 'Check HVAC air filter — replace if gray', urgency: 'week', trades: ['hvac'], always: true },
  { id: 3, text: 'Inspect water heater for leaks or rust', urgency: 'week', trades: ['plumbing'], always: true },
  { id: 4, text: 'Check all GFCIs near water sources', urgency: 'week', trades: ['electrical'], always: true },
  { id: 5, text: 'Walk attic for insulation gaps (older homes)', urgency: 'week', features: ['old'] },
  { id: 6, text: 'Schedule HVAC tune-up before summer', urgency: 'month', trades: ['hvac'], always: true },
  { id: 7, text: 'Clean gutters and downspouts', urgency: 'month', always: true },
  { id: 8, text: 'Test garage door auto-reverse safety', urgency: 'month', features: ['garage'] },
  { id: 9, text: 'Flush water softener brine tank', urgency: 'month', features: ['softener'] },
  { id: 10, text: 'Inspect roof for missing shingles', urgency: 'month', always: true },
  { id: 11, text: 'Check window and door weatherstripping', urgency: 'month', always: true },
  { id: 12, text: 'Test pool pump and filtration system', urgency: 'month', features: ['pool'] },
  { id: 13, text: 'Service sprinkler system heads', urgency: 'month', features: ['sprinklers'] },
  { id: 14, text: 'Drain and flush water heater annually', urgency: 'year', trades: ['plumbing'], always: true },
  { id: 15, text: 'Have chimney inspected and swept', urgency: 'year', features: ['fireplace'] },
  { id: 16, text: 'Repaint or re-stain wood fence panels', urgency: 'year', features: ['fence'] },
  { id: 17, text: 'Reseal driveway cracks before summer heat', urgency: 'year', always: true },
  { id: 18, text: 'Have foundation inspected for DFW clay shifts', urgency: 'year', always: true },
  { id: 19, text: 'Re-caulk tubs, showers, and sinks', urgency: 'year', always: true },
  { id: 20, text: 'Trim trees away from roofline and AC unit', urgency: 'year', always: true },
];

export default function DFWHomeownerChecklistApp() {
  const [homeAge, setHomeAge] = useState('new');
  const [features, setFeatures] = useState([]);
  const [done, setDone] = useState([]);

  const toggleFeature = (f) => setFeatures(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);
  const toggleDone = (id) => setDone(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const visible = ALL_ITEMS.filter(item => {
    if (item.always) return true;
    if (item.features && item.features.includes('old') && homeAge === 'old') return true;
    if (item.features && item.features.some(f => features.includes(f))) return true;
    return false;
  });

  const pct = visible.length ? Math.round((done.filter(id => visible.find(i => i.id === id)).length / visible.length) * 100) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '24px' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: 4 }}>🏠 DFW Homeowner Checklist</h1>
      <p style={{ color: '#8899AA', marginBottom: 20 }}>Personalized to your home — click tasks to mark complete</p>

      <div style={{ background: '#0D1F35', borderRadius: 10, padding: 16, marginBottom: 20 }}>
        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Your Home</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          {['new','old'].map(a => (
            <button key={a} onClick={() => setHomeAge(a)} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: homeAge === a ? '#F5E642' : '#1C2E45', color: homeAge === a ? '#0A1628' : '#fff', fontWeight: 600 }}>
              {a === 'new' ? 'Built after 2000' : 'Built before 2000'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['pool','garage','fireplace','fence','sprinklers','softener'].map(f => (
            <button key={f} onClick={() => toggleFeature(f)} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', background: features.includes(f) ? '#F5E642' : '#1C2E45', color: features.includes(f) ? '#0A1628' : '#aaa', fontSize: '0.85rem' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#0D1F35', borderRadius: 10, padding: 14, marginBottom: 20 }}>
        <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{pct}% complete</span>
        <span style={{ color: '#8899AA', marginLeft: 10 }}>{done.filter(id => visible.find(i => i.id === id)).length} of {visible.length} tasks done</span>
        <div style={{ background: '#1C2E45', borderRadius: 8, height: 8, marginTop: 8 }}>
          <div style={{ background: '#F5E642', width: pct + '%', height: '100%', borderRadius: 8, transition: 'width 0.3s' }} />
        </div>
      </div>

      {Object.entries(URGENCY).map(([key, { label, color }]) => {
        const items = visible.filter(i => i.urgency === key);
        if (!items.length) return null;
        return (
          <div key={key} style={{ marginBottom: 20 }}>
            <h2 style={{ color, fontSize: '1rem', marginBottom: 10 }}>{label}</h2>
            {items.map(item => (
              <div key={item.id} onClick={() => toggleDone(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#0D1F35', borderRadius: 8, padding: '10px 14px', marginBottom: 6, cursor: 'pointer', opacity: done.includes(item.id) ? 0.5 : 1 }}>
                <span style={{ fontSize: '1.2rem' }}>{done.includes(item.id) ? '✅' : '⬜'}</span>
                <span style={{ textDecoration: done.includes(item.id) ? 'line-through' : 'none', color: '#ddd' }}>{item.text}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
