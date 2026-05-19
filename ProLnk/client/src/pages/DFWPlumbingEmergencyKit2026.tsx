import { useState } from 'react';

const EMERGENCIES = [
  { id: 'burst', label: '💥 Burst Pipe' },
  { id: 'no-water', label: '🚿 No Water' },
  { id: 'sewage', label: '🚽 Sewage Backup' },
  { id: 'outdoor', label: '🌿 Outdoor Leak' },
];

const KITS: Record<string, { title: string; items: string[] }> = {
  'burst': {
    title: 'Burst Pipe Kit Items',
    items: [
      '🔧 Adjustable wrench (10") — for main shutoff valve under sink or at meter',
      '💧 Water shutoff key — DFW water meters often need this pentagon wrench',
      '🪣 Pipe wrench (14") — for galvanized or older pipe shutoffs',
      '📱 ProLnk contact saved under "Emergency Plumber" in your phone',
      '🧱 Slip joint pliers — for quick hand-tightening compression fittings',
      '📋 Know your main shutoff location before emergency occurs',
    ],
  },
  'no-water': {
    title: 'No Water Kit Items',
    items: [
      '💧 Water shutoff key — verify meter is not shut off accidentally',
      '📱 Oncor/Atmos contact saved — utility issue vs. plumbing issue first step',
      '🔧 Channel-lock pliers — for pressure regulator check on main line',
      '🪣 Bucket + gallon jugs stored — DFW freeze events can last 2-3 days',
      '🌡️ Pipe freeze kit (heat tape) — DFW pipes exposed in attic or garage',
      '📋 Know where your pressure regulator is (near meter) — fails every 10 years',
    ],
  },
  'sewage': {
    title: 'Sewage Backup Kit Items',
    items: [
      '🐍 Drain snake (25 ft) — handle most clogs before they become sewage backup',
      '🧤 Heavy rubber gloves + eye protection — sewage is hazmat',
      '🚽 Plunger (flange type) — cup plunger is for sinks, flange is for toilets',
      '📱 ProLnk emergency plumber — camera inspection needed for sewer line',
      '🧴 Enzyme drain treatment — monthly maintenance prevents buildups',
      '🏠 Know your clean-out location — DFW homes have exterior clean-out access',
    ],
  },
  'outdoor': {
    title: 'Outdoor Leak Kit Items',
    items: [
      '💧 Water shutoff key — DFW pentagon wrench for meter box shutoff',
      '🔧 Adjustable wrench — for hose bib (outdoor spigot) repair',
      '🌿 Irrigation controller manual — most DFW leaks are from sprinkler heads',
      '🪣 Teflon tape — temporary seal on threaded outdoor connections',
      '📋 Locate irrigation zones before calling a plumber — saves diagnostic fee',
      '📱 ProLnk irrigation specialist — DFW sprinkler pros are separate from plumbers',
    ],
  },
};

export default function DFWPlumbingEmergencyKit2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PROLNK DFW RESOURCE GUIDE 2026
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🔧 DFW Plumbing Emergency Kit Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          What to have on hand before a DFW plumbing emergency hits — the tools, keys, and contacts that cut damage and cost when water goes wrong.
        </p>

        <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            What type of plumbing emergency?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {EMERGENCIES.map(e => (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                style={{
                  background: selected === e.id ? '#F5E642' : '#1e3a5f',
                  color: selected === e.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: '8px', padding: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '1rem' }}>{KITS[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {KITS[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #1e3a5f', lineHeight: 1.5, color: '#cbd5e1' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.25rem' }}>Emergency Plumber — DFW</div>
          <div style={{ color: '#1e3a5f', fontSize: '0.9rem' }}>ProLnk connects you with licensed DFW plumbers, including emergency response</div>
        </div>
      </div>
    </div>
  );
}
