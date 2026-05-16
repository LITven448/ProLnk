import { useState } from 'react';

const systems = [
  { id: 'hvac', label: '❄️ HVAC System', desc: 'First major replacement cycle (~25-30 years)' },
  { id: 'windows', label: '🪟 Original Windows', desc: 'Early double pane seals failing' },
  { id: 'foundation', label: '🏗️ Foundation', desc: 'First signs of movement in newer areas' },
  { id: 'polybutylene', label: '🚰 Check for Polybutylene', desc: 'Some 1990s builds used PB pipe' },
  { id: 'waterheater', label: '🔥 Water Heater', desc: 'Original units definitely replaced by now' },
];

const guide: Record<string, { priority: string; cost: string; note: string }> = {
  hvac: { priority: '🔴 Check Age', cost: '$7,000–$18,000', note: '1990s HVAC is now 25–35 years old — well past its 15–20 year design life. If you have not replaced it, efficiency is likely below 10 SEER. Modern units run at 18–24 SEER, cutting summer bills by 40%.' },
  windows: { priority: '🟡 Inspect Seals', cost: '$5,000–$14,000', note: '1990s double pane windows have reached seal failure age — foggy glass between panes indicates failed IGU. Modern low-E glass cuts solar heat gain significantly in DFW summers.' },
  foundation: { priority: '🟡 Monitor', cost: '$3,000–$18,000', note: '1990s homes in newer DFW suburbs may be experiencing first significant movement as clay fully cycles through drought and wet seasons. Door sticking or new cracks warrant inspection.' },
  polybutylene: { priority: '🔴 Identify First', cost: '$4,000–$15,000', note: 'Some builders used polybutylene (Quest/PB) through the early 1990s. Check pipes: gray plastic with blue/gray/black fittings. If present, plan replacement before failure.' },
  waterheater: { priority: '🟢 Budget Replacement', cost: '$1,200–$4,000', note: 'If your water heater is original (unlikely but possible), it is 25–35 years old. Even second-generation units over 10 years should be evaluated. Tankless options are cost-effective now.' },
};

export default function DFWHomes1990sGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏠</div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 700 }}>DFW 1990s Home Owner Guide 2026</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Built 1990–1999 · DFW Metro · Updated May 2026</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔍 What Are You Evaluating in Your 1990s Home?</h2>
          <p style={{ color: '#9EB0CC', fontSize: 14, marginBottom: 16 }}>1990s homes are hitting first major system replacement cycles. Select what applies.</p>
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
              📋 Get My 1990s Maintenance Priorities
            </button>
          )}
        </div>

        {showGuide && selected.length > 0 && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Your 1990s Home Priority Plan</h2>
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
