import { useState } from 'react';

const features = [
  { id: 'alwiring', label: '⚡ Aluminum Wiring', desc: 'Possible in 1965–1973 builds' },
  { id: 'plumbing', label: '🔧 Original Copper Plumbing', desc: 'Aging but often still functional' },
  { id: 'asbestos', label: '⚠️ Asbestos Materials', desc: 'Ceiling tiles, floor tiles, texture' },
  { id: 'hvac', label: '❄️ Original HVAC', desc: '60-year-old system, way past life' },
  { id: 'foundation', label: '🏗️ Slab Foundation', desc: 'Common in DFW 1960s builds' },
];

const guide: Record<string, { priority: string; cost: string; note: string }> = {
  alwiring: { priority: '🔴 Urgent', cost: '$3,500–$10,000', note: 'Aluminum wiring expands/contracts, loosening connections — fire risk. Install CO/ALR devices or rewire. Insurance may require remediation.' },
  plumbing: { priority: '🟡 Monitor', cost: '$500–$18,000', note: '60-year copper is often fine but check supply lines under sinks. Slab leaks are common — thermal imaging can detect without opening floors.' },
  asbestos: { priority: '🟡 Test First', cost: '$1,500–$6,000', note: '1960s ceiling tiles and floor tiles frequently contain asbestos. Test before any demo work. Encapsulate if intact.' },
  hvac: { priority: '🔴 Replace', cost: '$7,000–$18,000', note: 'Any original 1960s HVAC has been replaced — but if on original ductwork, it may be leaking 30%+ of conditioned air. Inspect and seal.' },
  foundation: { priority: '🟡 Inspect', cost: '$4,000–$20,000', note: 'DFW expansive clay causes slab movement. Look for stair-step cracks in brick, doors that stick. Annual structural engineer inspection is worth it.' },
};

export default function DFWHomes1960sGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showGuide, setShowGuide] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏡</div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 700 }}>DFW 1960s Home Owner Guide 2026</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Built 1960–1969 · DFW Metro · Updated May 2026</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔍 Which Features Does Your Home Have?</h2>
          <p style={{ color: '#9EB0CC', fontSize: 14, marginBottom: 16 }}>Select all that apply — get your 1960s priority maintenance plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map(f => (
              <div key={f.id} onClick={() => toggle(f.id)}
                style={{ background: selected.includes(f.id) ? '#1A2E50' : '#0D1E38', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{f.label}</div>
                  <div style={{ color: '#9EB0CC', fontSize: 13 }}>{f.desc}</div>
                </div>
                <div style={{ fontSize: 22 }}>{selected.includes(f.id) ? '✅' : '⬜'}</div>
              </div>
            ))}
          </div>
          {selected.length > 0 && (
            <button onClick={() => setShowGuide(true)}
              style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
              📋 Get My 1960s Priority Maintenance Plan
            </button>
          )}
        </div>

        {showGuide && selected.length > 0 && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Your 1960s Home Priority Plan</h2>
            {selected.map(id => {
              const g = guide[id];
              return (
                <div key={id} style={{ background: '#0D1E38', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700 }}>{features.find(f => f.id === id)?.label}</span>
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
