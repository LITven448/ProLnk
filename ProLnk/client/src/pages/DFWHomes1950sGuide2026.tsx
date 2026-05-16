import { useState } from 'react';

const systems = [
  { id: 'plumbing', label: '🔧 Plumbing', desc: 'Galvanized steel or cast iron' },
  { id: 'electrical', label: '⚡ Electrical', desc: '60A panel, possible knob & tube' },
  { id: 'asbestos', label: '⚠️ Asbestos', desc: 'Floor tiles, pipe wrap, popcorn ceiling' },
  { id: 'windows', label: '🪟 Windows', desc: 'Single pane, original frames' },
  { id: 'foundation', label: '🏗️ Foundation', desc: 'Pier and beam common in DFW' },
];

const upgrades: Record<string, { priority: string; cost: string; note: string }> = {
  plumbing: { priority: '🔴 Urgent', cost: '$8,000–$20,000', note: 'Galvanized corrodes from inside — low water pressure is the first sign. Full repipe to PEX recommended.' },
  electrical: { priority: '🔴 Urgent', cost: '$4,000–$12,000', note: '60A panels cannot support modern loads. Knob & tube is uninsurable. Upgrade to 200A minimum.' },
  asbestos: { priority: '🟡 Manage', cost: '$2,000–$8,000', note: 'If intact, encapsulate. If disturbed, licensed abatement required. Test before any renovation.' },
  windows: { priority: '🟢 Plan', cost: '$6,000–$15,000', note: 'Single pane adds 30%+ to cooling bills. Double-pane vinyl pays back in 5–7 years in DFW heat.' },
  foundation: { priority: '🟡 Monitor', cost: '$3,000–$15,000', note: 'Pier & beam allows access but piers settle. Annual inspection recommended on DFW expansive clay.' },
};

export default function DFWHomes1950sGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏠</div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 700 }}>DFW 1950s Home Owner Guide 2026</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Built 1945–1959 · DFW Metro · Updated May 2026</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>⚙️ What Systems Does Your Home Have?</h2>
          <p style={{ color: '#9EB0CC', fontSize: 14, marginBottom: 16 }}>Select all that apply — get your priority upgrade guide instantly.</p>
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
              📋 Generate My Priority Upgrade Guide
            </button>
          )}
        </div>

        {showGuide && selected.length > 0 && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Your 1950s Home Priority Guide</h2>
            {selected.map(id => {
              const u = upgrades[id];
              return (
                <div key={id} style={{ background: '#0D1E38', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700 }}>{systems.find(s => s.id === id)?.label}</span>
                    <span style={{ fontSize: 13 }}>{u.priority}</span>
                  </div>
                  <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>Estimated Cost: {u.cost}</div>
                  <div style={{ color: '#9EB0CC', fontSize: 13 }}>{u.note}</div>
                </div>
              );
            })}
            <div style={{ marginTop: 16, background: '#F5E6421A', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 13 }}>
              💡 ProLnk connects you with licensed DFW contractors for all these upgrades — free quotes, verified pros.
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
