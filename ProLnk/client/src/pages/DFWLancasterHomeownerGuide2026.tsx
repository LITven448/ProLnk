import { useState } from 'react';

const decades = [
  { id: '60s', label: '🏠 1960s Homes', tasks: ['Full foundation assessment (expansive clay soil)', 'Galvanized pipe complete replacement', 'Electrical service upgrade to 200A', 'Sewer line camera inspection', 'Roof full replacement (60yr mark)', 'HVAC system full overhaul'] },
  { id: '70s80s', label: '🏡 1970s-1980s Homes', tasks: ['Pier-and-beam or slab foundation inspection', 'Polybutylene pipe risk evaluation', 'Attic insulation and ventilation upgrade', 'Window replacement for energy efficiency', 'Exterior wood siding or brick repointing'] },
  { id: '90s', label: '🏘️ 1990s Homes', tasks: ['Foundation crack and settlement monitoring', 'HVAC replacement planning (25-30yr)', 'Roof inspection and repair', 'Plumbing fixture modernization', 'Garage door safety update'] },
];

export default function DFWLancasterHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const decade = decades.find(d => d.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🔨</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Lancaster TX Homeowner Guide 2026</h1>
          <p style={{ color: '#a0b0c8', fontSize: 15 }}>Affordable south Dallas suburb — strong renovation market — clay soil foundation watch zone</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[['💵','Affordable Value'],['🏗️','Active Reno Market'],['⚠️','Clay Soil Risk']].map(([icon, label]) => (
            <div key={label as string} style={{ background: '#111f35', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ fontSize: 12, color: '#a0b0c8', marginTop: 6 }}>{label as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2d4a', border: '1px solid #F5E642', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>🌱 Lancaster Foundation Alert</p>
          <p style={{ color: '#a0b0c8', fontSize: 13, margin: 0 }}>Lancaster sits on heavy clay-expansion soil. Seasonal moisture swings cause significant foundation movement. Annual foundation inspections are strongly recommended for all homes built before 2000.</p>
        </div>

        <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 14 }}>Select Your Home Decade</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {decades.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
              style={{ background: selected === d.id ? '#F5E642' : '#111f35', color: selected === d.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {d.label}
            </button>
          ))}
        </div>

        {decade && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔧 Lancaster Maintenance Guide — {decade.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {decade.tasks.map(t => (
                <li key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#e0e8f0', fontSize: 14 }}>✅ {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f1e33', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>Lancaster Value-Focused Pros</p>
          <p style={{ color: '#a0b0c8', fontSize: 13 }}>ProLnk connects Lancaster homeowners with experienced contractors who specialize in south Dallas renovation and foundation work.</p>
        </div>
      </div>
    </div>
  );
}