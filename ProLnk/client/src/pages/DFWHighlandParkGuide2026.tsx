import { useState } from 'react';

const eras = [
  { id: '1920s', label: '🏛️ 1920s-1940s Historic Estate', tasks: ['Historic preservation compliance review', 'Original plaster wall crack assessment', 'Knob-and-tube wiring full replacement', 'Lead paint encapsulation or removal', 'Vintage fixture restoration specialists', 'Foundation structural engineering report'] },
  { id: '1950s', label: '🏡 1950s-1960s Mid-Century', tasks: ['Galvanized pipe full replacement', 'Asbestos testing (floor tiles, insulation)', 'Electrical service upgrade to 200A', 'Chimney liner and firebox inspection', 'HP code compliance audit for any additions'] },
  { id: '1990s', label: '🏠 1990s-2000s Custom Build', tasks: ['HP architectural review for renovations', 'Luxury appliance maintenance contracts', 'Landscape drainage and irrigation audit', 'Security system modernization', 'Pool and spa compliance inspection'] },
];

export default function DFWHighlandParkGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const era = eras.find(e => e.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>👑</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Highland Park TX Homeowner Guide 2026</h1>
          <p style={{ color: '#a0b0c8', fontSize: 15 }}>DFW's most prestigious enclave — avg $2.5M+ — historic 1920s to modern custom builds</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[['💎','Avg $2.5M+ Homes'],['📜','Strict HP Code'],['🏛️','Historic Registry']].map(([icon, label]) => (
            <div key={label as string} style={{ background: '#111f35', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ fontSize: 12, color: '#a0b0c8', marginTop: 6 }}>{label as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2d4a', border: '1px solid #F5E642', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>⚠️ Highland Park Highest Standards in DFW</p>
          <p style={{ color: '#a0b0c8', fontSize: 13, margin: 0 }}>HP enforces the most rigorous contractor licensing and permit requirements in all of DFW. All exterior changes require Architectural Review Board approval. Non-approved work must be reversed at full owner cost.</p>
        </div>

        <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 14 }}>Select Your Home Era</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {eras.map(e => (
            <button key={e.id} onClick={() => setSelected(e.id === selected ? null : e.id)}
              style={{ background: selected === e.id ? '#F5E642' : '#111f35', color: selected === e.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {e.label}
            </button>
          ))}
        </div>

        {era && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📋 HP Maintenance Guide — {era.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {era.tasks.map(t => (
                <li key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#e0e8f0', fontSize: 14 }}>✅ {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f1e33', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>HP-Certified Contractors Only</p>
          <p style={{ color: '#a0b0c8', fontSize: 13 }}>ProLnk exclusively matches Highland Park homeowners with ARB-compliant, HP-code-certified specialty contractors.</p>
        </div>
      </div>
    </div>
  );
}