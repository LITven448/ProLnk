import { useState } from 'react';

const concerns = [
  { id: 'hardness', label: '🪨 Hard Water', city: 'Dallas ~300 ppm / Fort Worth ~180 ppm', solutions: ['Whole-home water softener (ion exchange)', 'Salt-free conditioner if on well', 'Descale water heater annually — saves 20% efficiency', 'Appliance life extends 30% with softened water'] },
  { id: 'drinking', label: '🥤 Drinking Water', city: 'Treated but chlorinated', solutions: ['Reverse osmosis under-sink system', 'Replace RO filters every 6–12 months', 'Refrigerator filter reduces chlorine and taste issues', 'Whole-home carbon filter for chlorine throughout'] },
  { id: 'heater', label: '🔥 Water Heater', city: 'Scale buildup is #1 DFW water heater killer', solutions: ['Flush tank annually to remove sediment', 'Anode rod replacement every 3–5 years', 'Tankless units: descale with citric acid every 2 years', 'Pressure relief valve test annually'] },
  { id: 'pipes', label: '🔧 Pipe Health', city: 'Older homes: galvanized pipes corrode faster in hard water', solutions: ['Video inspection if home is 30+ years old', 'PEX replumb cost ~K–8K but lasts 50 years', 'Install whole-home pressure regulator (keep under 80 psi)', 'Catch leaks early: check water meter when nothing is running'] },
];

export default function DFWWaterQuality2026() {
  const [selected, setSelected] = useState('hardness');
  const item = concerns.find(c => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE — 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Water Quality Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>Dallas water hardness averages 300+ ppm — one of the hardest in Texas. It shortens appliance life and affects taste.</p>
        <div style={{ background: '#0F2040', borderRadius: 10, padding: '0.75rem 1.2rem', marginBottom: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[['Dallas', '~300 ppm', '#ef4444'],['Fort Worth', '~180 ppm', '#f97316'],['Frisco/Plano', '~250 ppm', '#ef4444'],['Arlington', '~200 ppm', '#f97316']].map(([city, ppm, color]) => (
            <div key={city} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color, fontSize: 18 }}>{ppm}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{city}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)} style={{ background: selected === c.id ? '#F5E642' : '#0F2040', color: selected === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}>
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 14, padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 800, marginBottom: 6, color: '#F5E642' }}>{item.label}</h2>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 14 }}>📍 {item.city}</div>
          {item.solutions.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, lineHeight: 1 }}>→</span>
              <span style={{ fontSize: 15, color: '#e2e8f0' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}