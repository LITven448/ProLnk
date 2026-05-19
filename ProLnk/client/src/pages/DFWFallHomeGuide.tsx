import { useState } from 'react';

const features = [
  { id: 'hvac', label: 'Central heat/HVAC', fall: 'Test heat mode before first cold front (typically late Oct)', cost: 120 },
  { id: 'gutters', label: 'Gutters & downspouts', fall: 'Clean gutters in November after oak drop — not before', cost: 160 },
  { id: 'trees', label: 'Large trees on property', fall: 'Trim dead branches before DFW winter storm season', cost: 350 },
  { id: 'exterior', label: 'Wood siding or trim', fall: 'Caulk and paint gaps before "winter" temperature swings', cost: 280 },
  { id: 'lawn', label: 'St. Augustine or Bermuda lawn', fall: 'Apply winterizer fertilizer in October before dormancy', cost: 90 },
  { id: 'irrigation', label: 'Irrigation system', fall: 'Blow out and winterize system before first freeze', cost: 100 },
];

const yardTypes = [
  { id: 'live_oak', label: '🌳 Live Oaks (hold leaves until spring)' },
  { id: 'deciduous', label: '🍂 Deciduous trees (drop in October-November)' },
  { id: 'no_trees', label: '🏡 Minimal or no trees' },
];

export default function DFWFallHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [yard, setYard] = useState('');
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const tasks = features.filter(f => selected.includes(f.id));
  const totalCost = tasks.reduce((sum, t) => sum + t.cost, 0);

  const liveOakNote = yard === 'live_oak' ? '🌳 Live Oak note: DFW live oaks hold their leaves until March. Don\’t wait for leaf drop — gutters may be fine until spring.' : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🍂</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Fall Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>September – November Preparation Checklist</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0′ }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 20px', marginBottom: 28, fontWeight: 700, fontSize: 15 }}>
          📍 DFW FACT: First cold front typically arrives late October. DFW "winter" lasts 6-10 weeks — but freezes can be severe. Prep HVAC and pipes before Halloween.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📅 Fall Timeline</h2>
        {[
          { month: 'September', tasks: ['Schedule HVAC inspection (before techs get booked)', 'Inspect roof and flashing after summer storm season', 'Trim trees before wind and ice weight return'] },
          { month: 'October', tasks: ['Test heat mode — switch HVAC by Oct 15', 'Apply lawn winterizer before Bermuda goes dormant', 'Seal exterior gaps: doors, windows, foundation cracks'] },
          { month: 'November', tasks: ['Clean gutters AFTER live oak or deciduous leaf drop', 'Blow out irrigation system before first freeze warning', 'Stock emergency supplies (generator, pipe insulation, blankets)'] },
        ].map(({ month, tasks: t }) => (
          <div key={month} style={{ background: '#111f35', borderRadius: 10, padding: '16px 20px', marginBottom: 16, borderLeft: '3px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{month}</div>
            {t.map((task, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>• {task}</div>)}
          </div>
        ))}

        <h2 style={{ color: '#F5E642', fontSize: 20, margin: '32px 0 16px' }}>🌳 DFW Live Oak Reality Check</h2>
        <div style={{ background: '#111f35', borderRadius: 10, padding: '18px 20px', marginBottom: 32 }}>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Unlike northern deciduous trees, <strong style={{ color: '#F5E642′ }}>DFW live oaks hold their leaves all winter and drop in February–March</strong> as new growth pushes them off. If you have live oaks, your gutter cleaning schedule is different — January or February may be the right timing, not November. However, dead branches and limbs from summer heat stress should still be trimmed before storm season.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Build Your Fall Task List</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>What type of trees do you have?</p>
        <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
          {yardTypes.map(y => (
            <button key={y.id} onClick={() => setYard(y.id)} style={{ background: yard === y.id ? '#1a3a5c' : '#111f35', border: `2px solid ${yard === y.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {y.label}
            </button>
          ))}
        </div>

        {liveOakNote && <div style={{ background: '#1a3a5c', border: '1px solid #F5E642', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#F5E642', fontSize: 14 }}>{liveOakNote}</div>}

        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select home features:</p>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {features.map(f => (
            <button key={f.id} onClick={() => toggle(f.id)} style={{ background: selected.includes(f.id) ? '#1a3a5c' : '#111f35', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>{f.label}</span>
              <span style={{ fontSize: 18 }}>{selected.includes(f.id) ? '✅' : '⬜'}</span>
            </button>
          ))}
        </div>

        <button onClick={() => setShowResults(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
          Generate My Fall Prep List →
        </button>

        {showResults && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: '24px', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>Your Fall Prep Checklist</h3>
            {tasks.length === 0 ? (
              <p style={{ color: '#94a3b8′ }}>Select home features above to generate your list.</p>
            ) : (
              <>
                {tasks.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < tasks.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                    <span style={{ color: '#cbd5e1', fontSize: 14, flex: 1, paddingRight: 12 }}>{i + 1}. {t.fall}</span>
                    <span style={{ color: '#F5E642', fontWeight: 600, whiteSpace: 'nowrap' }}>~${t.cost}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid #F5E642', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                  <span>Estimated Total</span>
                  <span style={{ color: '#F5E642′ }}>${totalCost.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
