import { useState } from 'react';

const homeAreas = [
  { id: 'lakewood', label: 'Lakewood Village', era: '1960s–1970s', tips: ['Inspect original electrical panels — Federal Pacific common', 'Test for asbestos in floor tiles and attic insulation', 'Check cast-iron drain lines for corrosion', 'Airport noise zone: ensure window seals are tight'] },
  { id: 'heritage', label: 'Heritage District', era: '1970s–1985s', tips: ['Polybutylene plumbing risk — budget $4,000–$8,000 replacement', 'Single-pane windows common — upgrade for noise and energy', 'Check pier-and-beam foundations for leveling needs', 'HVAC often original — inspect heat exchanger annually'] },
  { id: 'lascolinas', label: 'Las Colinas Adjacent', era: '1985–2000', tips: ['Expansive clay soil — check foundation annually', 'Mature oak trees: root intrusion in sewer lines', 'Dual-pane windows may need resealing', 'HOA exterior paint schedules enforced strictly'] },
  { id: 'newer', label: 'Newer Subdivisions', era: '2000–2015', tips: ['EIFS/stucco cladding: inspect for moisture intrusion annually', 'Tankless water heaters: flush mineral buildup every 18 months', 'Check attic ventilation — DFW summers exceed 105°F', 'Smart irrigation systems save avg $600/yr in Irving'] },
];

export default function IrvingHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const area = homeAreas.find(a => a.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✈️🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: 0 }}>Irving TX Homeowner Guide 2026</h1>
          <p style={{ color: '#A0AEC0', marginTop: 8 }}>DFW Airport city · Diverse community · 1960s–2015 homes</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏙️ Irving at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['✈️ Home of DFW International Airport', '🌍 130+ languages spoken', '🏢 Las Colinas urban district', '⚡ Older electrical panels common', '🌳 Mature tree canopy in west Irving', '🔇 Airport noise abatement zones'].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📍 Select Your Home Area</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {homeAreas.map(a => (
              <button key={a.id} onClick={() => setSelected(a.id === selected ? null : a.id)}
                style={{ backgroundColor: selected === a.id ? '#F5E642' : '#112240', color: selected === a.id ? '#0A1628' : '#E8E8E8', border: 'none', borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>{a.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{a.era}</div>
              </button>
            ))}
          </div>
        </div>

        {area && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 {area.label} Maintenance Priorities</h3>
            {area.tips.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642' }}>▸</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 Irving Annual Maintenance Calendar</h2>
          {[{m:'February',t:'Schedule HVAC tune-up before summer peak'},{m:'April',t:'Foundation inspection after spring rains'},{m:'June',t:'Check attic ventilation and insulation for heat season'},{m:'October',t:'Clean gutters, inspect roof before winter storms'}].map(item => (
            <div key={item.m} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 80, fontSize: 13 }}>{item.m}</span>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>{item.t}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#A0AEC0', fontSize: 13, margin: 0 }}>ProLnk connects Irving homeowners with verified local pros · prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
