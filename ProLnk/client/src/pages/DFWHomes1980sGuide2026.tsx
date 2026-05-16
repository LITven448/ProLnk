import { useState } from 'react';

const systems = [
  { id: 'plumbing', label: '🔧 Copper Plumbing', desc: 'Older but usually still functional' },
  { id: 'panel', label: '⚡ 100A Electrical Panel', desc: 'Becoming inadequate for modern loads' },
  { id: 'hvac', label: '❄️ HVAC System', desc: 'On second replacement cycle, 40+ years' },
  { id: 'windows', label: '🪟 Original Windows', desc: 'Aging frames, early double pane failing' },
  { id: 'foundation', label: '🏗️ Slab Foundation', desc: 'DFW clay movement well-documented' },
];

const guide: Record<string, { priority: string; cost: string; note: string }> = {
  plumbing: { priority: '🟢 Monitor', cost: '$300–$15,000', note: '1980s copper is generally solid, but check supply lines under sinks — braided steel replacements are cheap insurance. Watch for pinhole leaks in hot water lines.' },
  panel: { priority: '🟡 Plan Upgrade', cost: '$2,500–$5,000', note: '100A panels struggle with EVs, modern HVAC, and smart home systems. If adding any of these, upgrade to 200A — also boosts resale value significantly.' },
  hvac: { priority: '🟡 Assess Age', cost: '$7,000–$18,000', note: 'If your 1980s HVAC is still original (check install date on unit), it has exceeded useful life. New 18+ SEER systems cut DFW cooling bills 30–40%.' },
  windows: { priority: '🟡 Inspect Seals', cost: '$5,000–$14,000', note: 'Early double pane often has failed seals — foggy glass is the tell. Aluminum frames have zero thermal break. Vinyl replacements improve energy efficiency markedly.' },
  foundation: { priority: '🟡 Annual Check', cost: '$3,000–$20,000', note: 'By now DFW clay has gone through multiple drought/wet cycles under your slab. Look for new door sticking, new cracks. Get a structural engineer inspection every 3–5 years.' },
};

export default function DFWHomes1980sGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏘️</div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 700 }}>DFW 1980s Home Owner Guide 2026</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Built 1980–1989 · DFW Metro · Updated May 2026</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔍 Which Systems Are You Evaluating?</h2>
          <p style={{ color: '#9EB0CC', fontSize: 14, marginBottom: 16 }}>1980s homes are hitting major decision points. Select what applies.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {systems.map(s => (
              <div key={s.id} onClick={() => toggle(s.id)}
                style={{ background: selected.includes(s.id) ? '#1A2E50' : '#0D1E38', border: `2px solid ${selected.includes(s.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{s.label}</div>
                  <div style={{ color: '#9EB0CC', fontSize: 13 }}>{s.desc}</div>
                </div>
                <div style={{ fontSize: 22 }}>{selected.includes(s.id) ? '✅' : '⬜'}</div>
              </div>
            ))}
          </div>
          {selected.length > 0 && (
            <button onClick={() => setShowGuide(true)}
              style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
              📋 Get My 1980s Maintenance Priorities
            </button>
          )}
        </div>

        {showGuide && selected.length > 0 && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Your 1980s Home Priority Plan</h2>
            {selected.map(id => {
              const g = guide[id];
              return (
                <div key={id} style={{ background: '#0D1E38', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700 }}>{systems.find(s => s.id === id)?.label}</span>
                    <span style={{ fontSize: 13 }}>{g.priority}</span>
                  </div>
                  <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>Est. Cost: {g.cost}</div>
                  <div style={{ color: '#9EB0CC', fontSize: 13 }}>{g.note}</div>
                </div>
              );
            })}
            <div style={{ marginTop: 16, background: '#F5E6421A', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 13 }}>
              💡 ProLnk connects you with licensed DFW contractors — free quotes, verified pros, no obligation.
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#4A6080', fontSize: 12, marginTop: 32 }}>
          ProLnk Home Intelligence · DFW Metro · 2026
        </div>
      </div>
    </div>
  );
}
