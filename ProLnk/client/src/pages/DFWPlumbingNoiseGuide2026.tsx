import { useState } from 'react';

type NoiseType = 'banging' | 'hissing' | 'gurgling' | 'knocking' | 'chattering';

const noises: { id: NoiseType; label: string; emoji: string; when: string }[] = [
  { id: 'banging', label: 'Banging or thudding sound', emoji: '💥', when: 'When a valve closes or fixture turns off' },
  { id: 'hissing', label: 'Hissing or whooshing sound', emoji: '🌬️', when: 'Constant or when flow is running' },
  { id: 'gurgling', label: 'Gurgling from drains', emoji: '🌀', when: 'After flushing or draining' },
  { id: 'knocking', label: 'Knocking inside walls', emoji: '🔔', when: 'During water use, rhythmic' },
  { id: 'chattering', label: 'Chattering or squealing', emoji: '📯', when: 'When a specific faucet runs' },
];

const diagnoses: Record<NoiseType, { cause: string; dfwNote: string; fix: string; diy: boolean }> = {
  banging: {
    cause: 'Water hammer — hydraulic shock when fast-closing valve stops water flow abruptly',
    dfwNote: 'DFW supply pressure runs 60-80 PSI — higher pressure = worse hammer. Check if PRV needs adjustment.',
    fix: 'Install water hammer arrestors at washing machine, dishwasher, and fast-closing valves. If pressure above 80 PSI, adjust or replace PRV.',
    diy: true
  },
  hissing: {
    cause: 'Supply leak, failing fill valve, or pressure too high',
    dfwNote: 'Toilet fill valves are the most common hiss source in DFW homes — inexpensive fix',
    fix: 'Identify source: toilet tank (fill valve), under sink (supply line), or inside wall (pipe leak). Toilet fill valve is DIY; wall leak requires plumber.',
    diy: true
  },
  gurgling: {
    cause: 'Drain venting problem — air being pulled through water in P-trap',
    dfwNote: 'DFW clay soil can shift vent stack connections — gurgling that starts suddenly often means a cracked vent joint',
    fix: 'Check roof vent stack for blockage (leaves, bird nests). If clear, suspect a cracked vent connection — requires plumber to camera-inspect drain lines.',
    diy: false
  },
  knocking: {
    cause: 'Loose pipe straps allowing pipe to move and hit framing when water flows',
    dfwNote: 'DFW clay movement shifts foundations and framing — pipe straps loosen over time more than in stable soil regions',
    fix: 'Locate accessible pipe runs in attic or crawl space. Add plastic pipe clamps every 4 feet on horizontal runs and every 6 feet on vertical. Foam pipe insulation also dampens movement.',
    diy: true
  },
  chattering: {
    cause: 'Worn washer or loose seat inside faucet valve',
    dfwNote: 'DFW hard water degrades rubber washers faster — chattering faucets often need washer replacement annually in high-mineral areas',
    fix: 'Replace faucet cartridge or stem washer. Cartridge faucets: swap cartridge. Compression faucets: replace stem washer and seat if pitted.',
    diy: true
  },
};

export default function DFWPlumbingNoiseGuide2026() {
  const [selected, setSelected] = useState<NoiseType | null>(null);

  const diag = selected ? diagnoses[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔊</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Plumbing Noise Identification Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>What plumbing sounds mean in DFW homes — and what to do about them</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎵 Noise Quick Reference</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {noises.map(n => (
              <div key={n.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem', borderRadius: 6, background: '#0f172a' }}>
                <span style={{ fontSize: '1.25rem', minWidth: 30 }}>{n.emoji}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{n.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{n.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Noise Type → Diagnosis</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {noises.map(n => (
              <button key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
                style={{ background: selected === n.id ? '#F5E642′ : '#0f172a', color: selected === n.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.75rem 1rem', textAlign: ’left', cursor: 'pointer', fontSize: '0.95rem' }}>
                {n.emoji} {n.label}
              </button>
            ))}
          </div>
          {diag && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Cause: {diag.cause}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem', fontStyle: 'italic' }}>🌍 {diag.dfwNote}</div>
              <div style={{ color: '#cbd5e1', marginBottom: '0.75rem', lineHeight: 1.7 }}>🔧 {diag.fix}</div>
              <div style={{ display: 'inline-block', background: diag.diy ? '#166534′ : '#7c2d12', color: '#fff', borderRadius: 6, padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 600 }}>
                {diag.diy ? '✅ DIY Possible' : '🔴 Call a Plumber'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}