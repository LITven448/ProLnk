import { useState } from 'react';

const decades = [
  { id: '70s', label: '🏠 1970s Homes', tasks: ['Sewer line camera inspection', 'Galvanized water pipe assessment', 'Electrical panel upgrade to 200A', 'Full HVAC system replacement', 'Foundation leveling consultation'] },
  { id: '80s', label: '🏡 1980s Homes', tasks: ['Polybutylene pipe risk assessment', 'Roof age evaluation (35-40yr)', 'Attic ventilation and insulation upgrade', 'Exterior wood rot inspection', 'Pool equipment overhaul if present'] },
  { id: '90s', label: '🏘️ 1990s Homes', tasks: ['Roof inspection (25-30yr mark)', 'HVAC efficiency upgrade', 'Window seal failure check', 'Foundation crack monitoring', 'Irrigation system audit'] },
];

export default function DFWRichardsonHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const decade = decades.find(d => d.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>💻</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Richardson TX Homeowner Guide 2026</h1>
          <p style={{ color: '#a0b0c8', fontSize: 15 }}>Telecom Corridor tech hub — UT Dallas proximity — RISD excellence — aging suburban stock</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[['📡','Telecom Corridor'],['🎓','UT Dallas Proximity'],['🏫','Top RISD Schools']].map(([icon, label]) => (
            <div key={label as string} style={{ background: '#111f35', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ fontSize: 12, color: '#a0b0c8', marginTop: 6 }}>{label as string}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 14 }}>Select Your Home's Decade</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {decades.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
              style={{ background: selected === d.id ? '#F5E642′ : '#111f35', color: selected === d.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {d.label}
            </button>
          ))}
        </div>

        {decade && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔧 Richardson Maintenance Priorities — {decade.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {decade.tasks.map(t => (
                <li key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#e0e8f0', fontSize: 14 }}>✅ {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f1e33', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>Find Richardson-Certified Pros</p>
          <p style={{ color: '#a0b0c8', fontSize: 13 }}>ProLnk matches you with contractors experienced in Richardson's Telecom Corridor homes and RISD area standards.</p>
        </div>
      </div>
    </div>
  );
}