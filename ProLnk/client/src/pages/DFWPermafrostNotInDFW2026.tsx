import { useState } from 'react';

const guidance = [
  { app: 'Pipe Burial Depth', icon: '🔧', headline: 'DFW Frost Depth: 6–12 inches', detail: 'DFW frost depth is only 6-12 inches. Northern states can have 4+ feet of frozen ground. DFW plumbing code requires pipes buried at least 12 inches — not for freeze protection, but for damage/load protection.' },
  { app: 'Pipe Burst Risk', icon: '💧', headline: 'Risk is above-ground exposure, not frozen ground', detail: 'DFW pipes burst during hard freezes because of above-ground exposure — pipes in exterior walls, attics, under sinks against exterior walls, and garden hose bibs. The ground itself rarely freezes deep enough to freeze buried pipes.' },
  { app: 'Foundation Design', icon: '🏗️', headline: 'DFW foundations engineered for clay, not frost', detail: 'Northern foundations use deep footings below frost line (4+ ft). DFW foundations are slab-on-grade or pier-and-beam designed for clay soil movement, not frost heave. Post-tension slabs dominate DFW new construction.' },
  { app: 'Irrigation Systems', icon: '🌿', headline: 'Winterize for above-ground exposure, not soil freeze', detail: 'DFW irrigation winterization focuses on backflow preventers and above-ground lines, not underground pipes. Blow-out is still recommended before hard freezes but buried lines are safe below 12 inches.' },
  { app: 'Outdoor Plumbing', icon: '🚰', headline: 'Garden hose bibs are the #1 DFW freeze risk', detail: 'Unlike northern homes, DFW rarely uses frost-free sillcocks. Regular hose bibs left connected during hard freezes burst the pipe in the wall. Disconnect hoses and shut off valves before DFW freeze events.' },
  { app: 'Pool Plumbing', icon: '🏊', headline: 'Drain exposed equipment, not buried lines', detail: 'DFW pool pipes buried below 12 inches are safe. Focus winterization on pump, heater, filter equipment and any above-ground plumbing. Most DFW pools can run year-round with minimal freeze prep.' },
];

export default function DFWPermafrostNotInDFW2026() {
  const [selected, setSelected] = useState('Pipe Burst Risk');
  const result = guidance.find(g => g.app === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Soil Freeze Depth Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW soil barely freezes — here's what that means for your home and plumbing</p>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>❄️ DFW vs Northern States: Frost Depth</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'DFW Frost Depth', value: '6–12 inches', color: '#22c55e', icon: '✅' },
              { label: 'Minnesota Frost Depth', value: '60+ inches', color: '#ef4444', icon: '❄️' },
              { label: 'DFW Pipe Burial Min', value: '12 inches', color: '#F5E642', icon: '🔧' },
              { label: 'DFW Hard Freeze Days/yr', value: '5–15 days', color: '#F5E642', icon: '📅' },
            ].map(({ label, value, color, icon }) => (
              <div key={label} style={{ background: '#162842', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ color, fontSize: 20, fontWeight: 700 }}>{value}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🔍 DFW Freeze Guidance by Application</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {guidance.map(g => (
              <button key={g.app} onClick={() => setSelected(g.app)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === g.app ? '#F5E642′ : '#162842', color: selected === g.app ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>{g.icon} {g.app}</button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162842', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{result.headline}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result.detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>💡 February 2021 Lesson</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>Winter Storm Uri proved DFW pipes weren't designed for sustained sub-freezing temps. The ground never froze — but millions of pipes in attics and exterior walls burst. ProLnk connects you with DFW plumbers who specialize in freeze-proof pipe protection.</p>
          <div style={{ background: '#162842', borderRadius: 8, padding: 12, display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Store your plumbing map in Home Health Vault</span>
            <span style={{ color: '#94a3b8', fontSize: 13 }}> — know exactly where your shutoffs are before the next freeze.</span>
          </div>
        </div>
      </div>
    </div>
  );
}