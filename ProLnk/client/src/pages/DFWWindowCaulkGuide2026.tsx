import { useState } from 'react';

const windowTypes = [
  { id: 'single', label: '🪟 Single Pane', exterior: 'Silicone — DFW UV will crack latex fast', interior: 'Paintable latex for interior trim gaps', frequency: 'Every 3–4 years exterior (DFW UV is harsh)', notes: 'Consider upgrading to double-pane — single pane loses 30% more energy in DFW summers' },
  { id: 'double', label: '🏠 Double Pane / Vinyl Frame', exterior: 'Silicone or elastomeric sealant', interior: 'Paintable latex for trim and sill gaps', frequency: 'Every 4–5 years — check for frame separation', notes: 'If you see fogging between panes, caulk wont fix it — the seal is broken, replace the IGU' },
  { id: 'wood', label: '🌲 Wood Frame Window', exterior: '100% silicone (wood expands/contracts more)', interior: 'Paintable siliconized latex', frequency: 'Every 2–3 years — wood moves more in DFW heat', notes: 'Inspect for rot before caulking — caulking over rot traps moisture and worsens damage' },
  { id: 'skylight', label: '☀️ Skylight', exterior: 'Roofing-grade silicone or butyl tape', interior: 'Silicone only — extreme heat exposure', frequency: 'Every 2–3 years — DFW heat cycles destroy sealant faster', notes: 'Skylight leaks often appear far from the source — have a roofer inspect if water intrusion' },
];

export default function DFWWindowCaulkGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const win = windowTypes.find(w => w.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🪟</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Window Caulking Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Window caulking for DFW homes — UV, heat cycles, and humidity all affect how long it lasts.</p>
        </div>

        <div style={{ background: '#1e2d1a', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #16a34a' }}>
          <h3 style={{ color: '#4ade80', margin: '0 0 8px', fontSize: 14 }}>🔑 Caulk vs. Weatherstripping — Know the Difference</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 13 }}>
            <strong style={{ color: '#e2e8f0′ }}>Caulk</strong> fills gaps between stationary surfaces (frame and wall). 
            <strong style={{ color: '#e2e8f0′ }}> Weatherstripping</strong> seals moving parts (where sash meets frame). DFW homes need both — check both annually.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {windowTypes.map(w => (
            <button key={w.id} onClick={() => setSelected(w.id)}
              style={{ background: selected === w.id ? '#F5E642′ : '#1e293b', color: selected === w.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === w.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: ’pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {w.label}
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, color: selected === w.id ? '#0A1628′ : '#94a3b8' }}>Reapply: {w.frequency.split('—')[0].trim()}</div>
            </button>
          ))}
        </div>

        {win && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: '1px solid #334155′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>{win.label}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🌞 Exterior Caulk</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{win.exterior}</div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🏠 Interior Caulk</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{win.interior}</div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🔄 DFW Replacement Frequency</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{win.frequency}</div>
              </div>
              <div style={{ background: '#1a1a2e', borderRadius: 8, padding: 14, border: '1px solid #3b82f6′ }}>
                <div style={{ color: '#93c5fd', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>💡 Pro Tip</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{win.notes}</div>
              </div>
            </div>
          </div>
        )}

        {!win && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center', color: '#94a3b8′ }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
            <p>Select your window type above for product and timing recommendations.</p>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>© 2026 ProLnk — DFW Home Services</p>
      </div>
    </div>
  );
}