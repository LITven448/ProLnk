import { useState } from 'react';

const features = [
  { id: 'foundation', label: 'Slab foundation', spring: 'Foundation moisture check — water flower beds to prevent dry-season cracking', cost: 200 },
  { id: 'trees', label: 'Oak trees on property', spring: 'DO NOT prune oaks April 1 – July 1 (DFW oak wilt season)', cost: 0 },
  { id: 'ac', label: 'Central AC system', spring: 'AC pre-season tune-up before heat arrives in May', cost: 140 },
  { id: 'lawn', label: 'St. Augustine or Bermuda lawn', spring: 'Apply pre-emergent in March, fertilize in April', cost: 110 },
  { id: 'pest', label: 'Crawlspace or pier & beam', spring: 'Termite swarm inspection — DFW peak is March–May', cost: 175 },
  { id: 'gutters', label: 'Live oak trees', spring: 'Clean gutters in March after live oak leaf drop', cost: 160 },
];

const yardTypes = [
  { id: 'bermuda', label: '🌿 Bermuda grass' },
  { id: 'st_aug', label: '🌱 St. Augustine grass' },
  { id: 'native', label: '🌾 Native/natural landscape' },
  { id: 'no_lawn', label: '🪨 No lawn / hardscape only' },
];

const timingCalendar = [
  { date: 'March 1', task: 'Apply pre-emergent herbicide for summer weeds (crabgrass, goosegrass)', urgent: true },
  { date: 'March 15', task: 'Clean gutters — live oaks shed old leaves as new growth pushes them off', urgent: false },
  { date: 'April 1', task: '⛔ OAK WILT BAN STARTS — No oak pruning until July 1', urgent: true },
  { date: 'April 1', task: 'Schedule AC tune-up — technicians book fast after cold snaps end', urgent: false },
  { date: 'April 15', task: 'Apply first lawn fertilizer as temperatures warm above 65°F overnight', urgent: false },
  { date: 'May 1', task: 'Run AC full test — ensure cooling before 90°F+ days begin', urgent: false },
  { date: 'May 15', task: 'Termite swarm season peak — inspect crawlspace and foundation perimeter', urgent: false },
  { date: 'July 1', task: '✅ OAK WILT BAN ENDS — Safe to trim oaks again', urgent: false },
];

export default function DFWSpringHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [yard, setYard] = useState('');
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const tasks = features.filter(f => selected.includes(f.id));
  const totalCost = tasks.reduce((sum, t) => sum + t.cost, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Spring Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>March – May Preparation Checklist</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0′ }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 20px', marginBottom: 28, fontWeight: 700, fontSize: 15 }}>
          🚨 DFW LAW: It is illegal to prune oak trees April 1 – July 1 due to oak wilt disease spread via sap beetles. Violations risk killing your tree and your neighbors'.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📅 DFW Spring Timing Calendar</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {timingCalendar.map((event, i) => (
            <div key={i} style={{ background: '#111f35', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${event.urgent ? '#ef4444' : '#F5E642'}`, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', minWidth: 70 }}>{event.date}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{event.task}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🐛 DFW Spring Pest Alert</h2>
        <div style={{ background: '#111f35', borderRadius: 10, padding: '18px 20px', marginBottom: 28 }}>
          {[
            { pest: '🐜 Termites', detail: 'DFW subterranean termites swarm March–May after first warm rains. Look for mud tubes on foundation walls, shed wings near windows, or hollow-sounding wood.' },
            { pest: '🦟 Mosquitos', detail: 'Spring rains create breeding sites. Treat standing water in gutters, pots, and low spots within 48 hours of rain.' },
            { pest: '🐜 Fire Ants', detail: 'Queens become active in March. Apply broadcast bait early — far more effective than mound treatment alone.' },
          ].map(p => (
            <div key={p.pest} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 6 }}>{p.pest}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>{p.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Build Your Spring Priority List</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>Lawn type:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
          {yardTypes.map(y => (
            <button key={y.id} onClick={() => setYard(y.id)} style={{ background: yard === y.id ? '#1a3a5c' : '#111f35', border: `2px solid ${yard === y.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '11px 14px', color: '#fff', cursor: 'pointer', fontSize: 14 }}>
              {y.label}
            </button>
          ))}
        </div>

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
          Generate My Spring Priority List →
        </button>

        {showResults && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: '24px', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>Your Spring Task List</h3>
            {tasks.length === 0 ? (
              <p style={{ color: '#94a3b8′ }}>Select home features above to generate your list.</p>
            ) : (
              <>
                {tasks.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < tasks.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                    <span style={{ color: '#cbd5e1', fontSize: 14, flex: 1, paddingRight: 12 }}>{i + 1}. {t.spring}</span>
                    <span style={{ color: t.cost === 0 ? '#94a3b8′ : '#F5E642', fontWeight: 600, whiteSpace: ’nowrap' }}>{t.cost === 0 ? 'FREE' : `~$${t.cost}`}</span>
                  </div>
                ))}
                {totalCost > 0 && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid #F5E642', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                    <span>Estimated Total</span>
                    <span style={{ color: '#F5E642′ }}>${totalCost.toLocaleString()}</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
