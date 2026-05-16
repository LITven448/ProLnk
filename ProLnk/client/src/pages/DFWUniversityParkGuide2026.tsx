import { useState } from 'react';

const propTypes = [
  { id: 'historic', label: '🏛️ Pre-1960s Historic Homes', tasks: ['HPISD historical compliance documentation', 'Lead paint and asbestos testing', 'Knob-and-tube wiring replacement', 'Foundation underpinning assessment', 'Original wood window restoration or upgrade'] },
  { id: 'midmod', label: '🏠 Mid-Century (1960s-1980s)', tasks: ['Copper plumbing joint inspection', 'Flat roof waterproofing (if applicable)', 'HVAC system replacement planning', 'Garage door safety and code update', 'Pool/spa equipment modernization'] },
  { id: 'new', label: '✨ New Custom Builds (2000s+)', tasks: ['Builder warranty final-year inspection', 'Smart home integration audit', 'Luxury appliance service contracts', 'Irrigation system efficiency check', 'Roof warranty documentation review'] },
];

export default function DFWUniversityParkGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const prop = propTypes.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🎓</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>University Park TX Homeowner Guide 2026</h1>
          <p style={{ color: '#a0b0c8', fontSize: 15 }}>Prestigious Dallas enclave — HPISD schools — avg $1.5M homes — strict city ordinances</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[['🏫','Top HPISD Schools'],['💰','Avg $1.5M Homes'],['📋','Strict Ordinances']].map(([icon, label]) => (
            <div key={label as string} style={{ background: '#111f35', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ fontSize: 12, color: '#a0b0c8', marginTop: 6 }}>{label as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2d4a', border: '1px solid #F5E642', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>⚠️ UP Contractor Requirements</p>
          <p style={{ color: '#a0b0c8', fontSize: 13, margin: 0 }}>University Park requires licensed specialty contractors for most exterior work. HOA and city permits are strictly enforced. Non-compliance can result in mandatory removal at owner expense.</p>
        </div>

        <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 14 }}>Select Your Property Type</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {propTypes.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{ background: selected === p.id ? '#F5E642' : '#111f35', color: selected === p.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {p.label}
            </button>
          ))}
        </div>

        {prop && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📋 UP Maintenance Scope — {prop.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {prop.tasks.map(t => (
                <li key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#e0e8f0', fontSize: 14 }}>✅ {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f1e33', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>UP-Approved Contractors Only</p>
          <p style={{ color: '#a0b0c8', fontSize: 13 }}>ProLnk vets all contractors for University Park ordinance compliance and HPISD area specialty licensing.</p>
        </div>
      </div>
    </div>
  );
}