import { useState } from 'react';

const features = [
  { id: 'radiant', label: 'Radiant Barrier Installed', icon: '🌡️' },
  { id: 'newHVAC', label: 'Planning HVAC Replacement', icon: '❄️' },
  { id: 'existing', label: 'Existing Oversized HVAC', icon: '⚠️' },
  { id: 'attic', label: 'Unconditioned Attic', icon: '🏠' },
];

const results: Record<string, { title: string; detail: string }> = {
  'radiant+newHVAC': { title: 'Right-Size Your New HVAC', detail: 'Radiant barrier drops attic temp from ~140°F to ~95°F, cutting cooling load 5–10%. Your contractor must run a new Manual J after install. Oversizing causes short-cycling and humidity problems.' },
  'radiant+existing': { title: 'Existing System May Be Oversized', detail: 'If radiant barrier was added after your HVAC was sized, your unit may now be oversized. Watch for short cycles under 8 minutes. Consider a load recalculation before next replacement.' },
  'newHVAC': { title: 'Size Before Installing Radiant Barrier', detail: 'Plan your sequence carefully. If radiant barrier comes first, wait 30 days and measure attic temps before HVAC sizing. DFW design temp is 100°F — radiant barrier can shift your tonnage down by half a ton on a 2,000 sq ft home.' },
  'attic': { title: 'Attic Temp Is Your Baseline', detail: 'In DFW, uninsulated attics hit 140–150°F in July. Radiant barrier alone brings this to 90–95°F. That 45–50°F delta directly reduces duct heat gain and lowers your equipment runtime.' },
  default: { title: 'Select Your Home Features', detail: 'Choose the options above that apply to your DFW home to see how radiant barrier and HVAC sizing interact.' },
};

export default function DFWHVACCoolCoatGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function getResult() {
    const key = selected.sort().join('+');
    return results[key] || results[selected[0]] || results['default'];
  }

  const result = selected.length ? getResult() : results['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌡️</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW HVAC & Radiant Barrier Interaction Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>
          Radiant barrier changes your DFW home's cooling load — your HVAC installer must account for it. Here's how they interact.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>📊 Key DFW Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
            {[['Attic Without Barrier', '140–150°F'], ['Attic With Barrier', '90–95°F'], ['Cooling Load Reduction', '5–10%'], ['DFW Design Temp', '100°F']].map(([label, val]) => (
              <div key={label} style={{ background: '#1a2f4e', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 Your Home Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {features.map(f => (
            <button key={f.id} onClick={() => toggle(f.id)} style={{ background: selected.includes(f.id) ? '#F5E642' : '#1a2f4e', color: selected.includes(f.id) ? '#0A1628' : '#fff', border: '2px solid ' + (selected.includes(f.id) ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ marginRight: 8 }}>{f.icon}</span>{f.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1a2f4e', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 18 }}>{result.title}</h3>
          <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{result.detail}</p>
        </div>

        <div style={{ marginTop: 28, background: '#0f2040', borderRadius: 10, padding: 18 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 15 }}>⚠️ Don't Oversize After Radiant Barrier</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>An oversized HVAC short-cycles, fails to dehumidify DFW's humid summers, and wears out faster. Insist your contractor run Manual J calculations using post-barrier attic temps, not old heat gain estimates.</p>
        </div>

        <p style={{ color: '#475569', fontSize: 12, marginTop: 24, textAlign: 'center' }}>ProLnk DFW Home Intelligence · 2026</p>
      </div>
    </div>
  );
}