import { useState } from 'react';

const problems = [
  { id: 'basement', label: '🏚️ Basement / Crawl Space', solution: 'Santa Fe Advance2 (70 pint) — designed for unconditioned spaces, operates at low temps, auto-drain pump', cost: '$1,400–$1,800 installed' },
  { id: 'whole', label: '🏠 Whole-Home (Central Air)', solution: 'Aprilaire 1850W (95 pint) in HVAC return — handles up to 5,200 sq ft, humidity sensing, auto-mode', cost: '$1,200–$2,000 installed' },
  { id: 'crawl', label: '🕳️ Pier & Beam Crawl Space', solution: 'Santa Fe Compact70 with vapor barrier — sealed crawl space combo lowers whole-home humidity 8-12%', cost: '$1,600–$2,400 installed' },
  { id: 'musty', label: '👃 Musty Smell / Mold Risk', solution: 'Aprilaire 1850 + UV coil light combo — dehumidify + kill active mold spores on HVAC coil', cost: '$1,500–$2,200 installed' },
];

export default function DFWHVACDehumidifierGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = problems.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Whole-Home Dehumidifier Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW spring humidity hits 60–80% RH — above the 50% comfort threshold. Here's how to fix it.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📊 DFW Humidity Reality Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Spring Avg RH', value: '65–80%' },
              { label: 'Comfort Target', value: '40–50% RH' },
              { label: 'Mold Risk Above', value: '60% RH' },
              { label: 'Energy Impact', value: '+8–12% cooling load' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🔍 Where Is Your Humidity Problem?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {problems.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ background: selected === p.id ? '#F5E642′ : '#1a2f4a', color: selected === p.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {p.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 16, background: '#1a2f4a', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommended Solution</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{match.solution}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 Installed Cost: {match.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>⚡ Top Models for DFW</h2>
          {[
            { name: 'Aprilaire 1850W', pints: '95 pt/day', install: 'HVAC return duct', note: 'Best for whole-home central systems' },
            { name: 'Santa Fe Advance2', pints: '70 pt/day', install: 'Standalone / crawl', note: 'Best for basements and pier & beam' },
            { name: 'Honeywell TrueDRY', pints: '90 pt/day', install: 'HVAC return duct', note: 'Budget-friendly whole-home option' },
          ].map(m => (
            <div key={m.name} style={{ background: '#1a2f4a', borderRadius: 8, padding: '12px 14px', marginBottom: 10 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{m.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{m.pints} · {m.install}</div>
              <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
