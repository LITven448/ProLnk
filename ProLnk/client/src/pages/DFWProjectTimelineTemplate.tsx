import { useState } from 'react';

const PROJECTS = [
  { label: 'HVAC Replacement', weeksMin: 2, weeksMax: 4, lead: '1–2 weeks contractor lead time', milestones: ['Permit pulled', 'Old unit removed', 'New unit installed', 'City inspection', 'Final test & balance'] },
  { label: 'Plumbing Remodel', weeksMin: 3, weeksMax: 5, lead: '2–3 weeks contractor lead time', milestones: ['Rough-in inspection', 'Trenching complete', 'Fixtures roughed in', 'Wall close-up', 'Final inspection'] },
  { label: 'Roof Replacement', weeksMin: 2, weeksMax: 5, lead: '1–3 weeks contractor lead time', milestones: ['Material delivery', 'Tear-off day 1', 'Decking repairs', 'New shingles complete', 'Cleanup & inspection'] },
  { label: 'Kitchen Remodel', weeksMin: 8, weeksMax: 14, lead: '3–4 weeks contractor lead time', milestones: ['Demo complete', 'Rough MEP in', 'Inspections passed', 'Cabinets installed', 'Countertop template', 'Countertops installed', 'Appliances set', 'Punch list'] },
  { label: 'Bathroom Remodel', weeksMin: 4, weeksMax: 8, lead: '2–3 weeks contractor lead time', milestones: ['Demo & rough-in', 'Tile work', 'Fixtures rough', 'Drywall & paint', 'Final fixtures', 'Punch list'] },
  { label: 'Room Addition', weeksMin: 16, weeksMax: 28, lead: '4–6 weeks contractor lead time', milestones: ['Foundation', 'Framing', 'MEP rough-in', 'Insulation & drywall', 'Finish work', 'Final inspections'] },
];

const WEATHER_NOTES = [
  '🌡️ Concrete pours: avoid 100°F+ days — cures too fast, weakens slab',
  '⛈️ Spring storm season (Mar–May): exterior work may pause 1–2 weeks',
  '🌬️ Northers (Oct–Dec): sudden temp drops can affect paint adhesion',
  '☀️ Summer heat: roofing crews start at 6am, done by noon — slower progress',
  '💧 August drought: ground shifting can affect foundation pours',
];

function addWeeks(dateStr: string, weeks: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + weeks * 7);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DFWProjectTimelineTemplate() {
  const [project, setProject] = useState('');
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<null | { proj: typeof PROJECTS[0]; estStart: string; minEnd: string; maxEnd: string }>(null);

  function generate() {
    const proj = PROJECTS.find(p => p.label === project);
    if (!proj || !startDate) return;
    setResult({ proj, estStart: new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), minEnd: addWeeks(startDate, proj.weeksMin), maxEnd: addWeeks(startDate, proj.weeksMax) });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Tools</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>📅 Project Timeline Template</h1>
        <p style={{ color: '#9BA3B4', marginBottom: '2rem' }}>Realistic DFW timelines — accounting for contractor lead times, permit waits, and Texas weather.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🗓️ Generate Your Timeline</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <select value={project} onChange={e => setProject(e.target.value)}
              style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }}>
              <option value="">— Select Project Type —</option>
              {PROJECTS.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }} />
            <button onClick={generate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.85rem', fontSize: '1rem', cursor: 'pointer' }}>
              Build My Timeline →
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📌 Your DFW Timeline</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[['🚀 Work Starts', result.estStart], ['⚡ Best Case Done', result.minEnd], ['📦 Realistic Done', result.maxEnd]].map(([l, v]) => (
                <div key={l} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ color: '#9BA3B4', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{l}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#9BA3B4', fontSize: '0.85rem', marginBottom: '1rem' }}>📞 {result.proj.lead}</div>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🏁 Key Milestones</h3>
            {result.proj.milestones.map((m, i) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0', borderBottom: '1px solid #1E2E45' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: '#C8D0DC' }}>{m}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌤️ DFW Weather Considerations</h2>
          {WEATHER_NOTES.map(n => <div key={n} style={{ color: '#9BA3B4', padding: '0.4rem 0' }}>{n}</div>)}
        </div>
      </div>
    </div>
  );
}
