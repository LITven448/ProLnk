import { useState } from 'react';

const concerns = [
  { id: 'shutdown', label: 'System Shuts Off on Hot Days', component: 'capacitor' },
  { id: 'noair', label: 'No Airflow — Fan Not Spinning', component: 'motor' },
  { id: 'water', label: 'Water Dripping or Overflow Shutoff', component: 'drain' },
  { id: 'warm', label: 'Blowing Warm Air in Summer', component: 'capacitor' },
  { id: 'noise', label: 'Grinding or Screeching Noise Outside', component: 'motor' },
  { id: 'smell', label: 'Musty Smell from Vents', component: 'drain' },
];

const components: Record<string, { name: string; icon: string; priority: string; why: string; maintenance: string[] }> = {
  capacitor: {
    name: 'Capacitor',
    icon: '⚡',
    priority: '🔴 High Priority — Common DFW Failure',
    why: 'Capacitors store and release electrical charge to start compressors and fan motors. DFW\'s extreme heat (100°F+) causes capacitors to swell and fail — often mid-season when you need AC most. Most common HVAC service call in DFW summers.',
    maintenance: ['Test capacitor microfarad rating each spring', 'Replace proactively if 5+ years old', 'Keep voltage within rated range — surges degrade capacitors', 'Cost: $80-200 parts + labor'],
  },
  motor: {
    name: 'Condenser Fan Motor',
    icon: '🌀',
    priority: '🔴 Critical — Failure = System Lockout',
    why: 'The condenser fan motor expels heat from your system. In DFW\'s 105°F heat, this motor runs near its thermal limit constantly. When it fails, the compressor overheats and shuts off on a safety limit — potentially damaging the compressor (a $2,000+ repair).',
    maintenance: ['Lubricate motor bearings annually (if serviceable)', 'Listen for screeching — indicates bearing wear', 'Replace at first sign of struggling (slow start, noise)', 'Cost: $200-500 parts + labor'],
  },
  drain: {
    name: 'Condensate Drain Line',
    icon: '💧',
    priority: '🟡 Critical for DFW Humidity Seasons',
    why: 'DFW springs and early summers bring high humidity. Your AC removes 20-30 gallons of water per day from the air — all draining through a 3/4" PVC line. Algae clogs are common and cause overflow shutoffs or, worse, water damage to ceilings and walls.',
    maintenance: ['Flush drain line with diluted bleach quarterly', 'Ensure float switch is functional (shuts off if clogged)', 'Check condensate pan monthly during high-humidity months', 'Cost: $75-150 for professional clearing'],
  },
};

export default function DFWHVACCriticalSystems() {
  const [selected, setSelected] = useState<string | null>(null);
  const compKey = selected ? concerns.find(c => c.id === selected)?.component : null;
  const comp = compKey ? components[compKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🛠️⚠️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW HVAC Critical Systems Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.6 }}>
          Three components cause the majority of DFW HVAC failures during peak summer. Know them, maintain them, and you'll
          avoid the misery of a breakdown on a 107°F Dallas afternoon.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {Object.entries(components).map(([key, c]) => (
            <div key={key} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8, fontSize: 14 }}>{c.name}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 What Are You Experiencing?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)}
              style={{ background: selected === c.id ? '#F5E642' : '#112240', color: selected === c.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === c.id ? '#F5E642' : '#1e3a5f'), borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
              {c.label}
            </button>
          ))}
        </div>

        {comp && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>{comp.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>Focus: {comp.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{comp.priority}</div>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: 16 }}>{comp.why}</p>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Maintenance Actions:</div>
            {comp.maintenance.map(m => <div key={m} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>→ {m}</div>)}
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔧 DFW HVAC Tune-Up Before Summer?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk connects you with certified DFW HVAC technicians who check all critical components before the heat hits.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Book My Pre-Summer Tune-Up
          </button>
        </div>
      </div>
    </div>
  );
}
