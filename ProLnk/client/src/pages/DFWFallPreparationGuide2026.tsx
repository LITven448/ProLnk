import { useState } from 'react';

const baseChecklist = [
  { task: '🔥 Test furnace/heat pump before first cold front', priority: 'high', est: '$0 DIY / $120 tune-up' },
  { task: '🚪 Weatherstrip all exterior doors', priority: 'high', est: '$30-80 DIY' },
  { task: '🪟 Seal window gaps with caulk or foam', priority: 'high', est: '$20-40 DIY' },
  { task: '🍃 Clean gutters after oak leaf drop (late Oct)', priority: 'high', est: '$150-300 pro' },
  { task: '💨 Replace furnace filter', priority: 'medium', est: '$15-40 DIY' },
  { task: '🌿 Winterize irrigation system', priority: 'medium', est: '$75-150 pro' },
  { task: '🏠 Inspect roof for loose shingles before rain season', priority: 'medium', est: '$200-400 pro' },
];

const ageAddons: Record<string, { task: string; priority: string; est: string }[]> = {
  new: [
    { task: '📋 Review builder warranty before it expires', priority: 'medium', est: '$0' },
    { task: '🔍 Check grading/drainage around foundation', priority: 'medium', est: '$0 visual' },
  ],
  mid: [
    { task: '🏠 Inspect attic insulation — add if below R-38', priority: 'high', est: '$800-2,000 pro' },
    { task: '🔧 Check HVAC age — units 12-15 yrs old are at risk', priority: 'high', est: '$0 check' },
  ],
  old: [
    { task: '🏗️ Professional attic insulation inspection', priority: 'high', est: '$800-2,500 pro' },
    { task: '🔌 Check electrical panel — older homes may have issues', priority: 'high', est: '$200 inspection' },
    { task: '🪵 Inspect wood framing around windows for rot', priority: 'medium', est: '$100-500 pro' },
    { task: '🚰 Check plumbing for galvanized pipes', priority: 'medium', est: '$200 inspection' },
  ],
};

const priorityColor = { high: '#ef4444', medium: '#F5E642' };

export default function DFWFallPreparationGuide2026() {
  const [age, setAge] = useState<'new' | 'mid' | 'old' | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const fullList = age ? [...baseChecklist, ...ageAddons[age]] : baseChecklist;
  const done = fullList.filter((_, i) => checked[i]).length;
  const highCount = fullList.filter(t => t.priority === 'high' && !checked[fullList.indexOf(t)]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🍂 DFW Fall Home Preparation Guide 2026
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          October–November is your window to prep before DFW's cold fronts arrive — sometimes dropping 40°F overnight. Don't get caught unprepared.
        </p>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ The DFW Fall Surprise</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>DFW first cold fronts often arrive in October with little warning — temperatures can drop from 85°F to 45°F in 24 hours. Homeowners who haven't tested their heating systems discover breakdowns when every HVAC tech in town is booked 2 weeks out.</p>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🏠 How old is your home?</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {(['new', 'mid', 'old'] as const).map(a => (
              <button key={a} onClick={() => { setAge(a); setChecked({}); }} style={{ padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642' : '#1e3a5f', background: age === a ? '#F5E642' : 'transparent', color: age === a ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {a === 'new' ? '🆕 Under 10 years' : a === 'mid' ? '🏡 10–25 years' : '🏚️ 25+ years'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 600 }}>Fall Prep Priority List</div>
            <div style={{ color: '#F5E642', fontWeight: 700 }}>{done}/{fullList.length} done</div>
          </div>
          {highCount > 0 && <div style={{ background: '#1a0000', border: '1px solid #ef4444', borderRadius: 8, padding: '0.6rem 0.9rem', marginBottom: '1rem', color: '#ef4444', fontSize: '0.85rem' }}>🚨 {highCount} high-priority items remaining</div>}
          {fullList.map((item, i) => (
            <div key={i} onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.65rem 0', borderBottom: i < fullList.length - 1 ? '1px solid #1e3a5f' : 'none', cursor: 'pointer' }}>
              <span style={{ marginTop: 2 }}>{checked[i] ? '✅' : '⬜'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ textDecoration: checked[i] ? 'line-through' : 'none', color: checked[i] ? '#64748b' : '#fff' }}>{item.task}</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: priorityColor[item.priority as 'high' | 'medium'], fontWeight: 600 }}>● {item.priority.toUpperCase()}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Est: {item.est}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}