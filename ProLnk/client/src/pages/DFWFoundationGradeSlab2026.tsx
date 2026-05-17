import { useState } from 'react';

const foundationTypes = [
  { id: 'grade', label: '🏗️ Grade Slab', desc: 'Most common DFW — sits on prepared subgrade' },
  { id: 'elevated', label: '📐 Elevated Slab', desc: 'On grade beams — newer DFW construction' },
];

const guideMap: Record<string, { title: string; points: string[] }> = {
  grade: {
    title: 'Grade Slab Characteristics in DFW',
    points: [
      'Poured directly on compacted subgrade — no void beneath',
      'Most DFW homes built 1970s–2000s use grade slabs',
      'DFW expansive clay creates uniform upheaval and settlement pressure',
      'Center lift (interior upheaval) is the most common DFW grade slab problem',
      'Repair: pier underpinning (steel push piers or helical piers)',
      'Average DFW grade slab repair: $8,000–$25,000 depending on pier count',
      'Moisture management critical: maintain consistent soil moisture year-round',
    ],
  },
  elevated: {
    title: 'Elevated Slab Characteristics in DFW',
    points: [
      'Supported by grade beams that transfer load to deeper soil',
      'Less concrete volume — cost savings in construction',
      'Newer DFW subdivisions (2010s+) frequently use this system',
      'Void space between slab and soil allows for some clay movement',
      'Void can collapse if moisture balance is lost — causing slab drop',
      'Repair differs: void filling (foam injection) before piering often needed',
      'Easier to inspect: can sometimes see void space from crawl areas',
    ],
  },
};

export default function DFWFoundationGradeSlab2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏗️ Grade Slab vs Elevated Slab in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's expansive clay soil affects grade slabs and elevated slabs in very different ways — and repair methods differ too.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🧱 DFW Clay Reality</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            Dallas-Fort Worth sits on some of <strong style={{ color: '#F5E642' }}>North America's most expansive clay</strong>. A dry summer followed by heavy rain can move soil 2–4 inches — enough to crack any foundation type.
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>Select Your Foundation Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {foundationTypes.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id)}
              style={{ background: selected === f.id ? '#F5E642' : '#1e293b', color: selected === f.id ? '#0A1628' : '#fff', border: '2px solid' + (selected === f.id ? ' #F5E642' : ' #334155'), borderRadius: 8, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{f.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{f.desc}</div>
            </button>
          ))}
        </div>

        {selected && guideMap[selected] && (
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>{guideMap[selected].title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {guideMap[selected].points.map((p, i) => (
                <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155', color: '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#F5E642' }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
          ProLnk DFW Foundation Resource · Updated 2026
        </div>
      </div>
    </div>
  );
}