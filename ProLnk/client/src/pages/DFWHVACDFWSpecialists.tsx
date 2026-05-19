import { useState } from 'react';

const specialistNeeds = [
  {
    id: 'geothermal',
    label: '🌍 Geothermal in Clay',
    lookFor: 'Horizontal loop systems are impossible in DFW — clay expansion destroys them. Seek pros certified in vertical closed-loop drilling with DFW clay-specific grouting compounds. Ask for at least 10 DFW geothermal completions.',
    prolnk: 'ProLnk pre-screens geothermal specialists for DFW vertical loop experience and clay grouting certification before they ever appear in your matches.',
  },
  {
    id: 'heat-pump',
    label: '🔥 Heat Pumps in High Ambient',
    lookFor: 'Standard heat pumps lose efficiency above 95°F ambient. DFW hits 105°F regularly. Look for pros who specify cold-climate-rated heat pumps (rated to 115°F ambient) and who size equipment using DFW ACCA Manual J data — not rule-of-thumb tonnage.',
    prolnk: 'ProLnk vets heat pump specialists on DFW ambient temperature experience and high-EER equipment sourcing partnerships.',
  },
  {
    id: 'ercot-dr',
    label: '⚡ ERCOT Demand Response',
    lookFor: 'ERCOT demand response programs pay DFW homeowners to curtail load during grid emergencies. Specialists must know smart thermostat integration, battery backup coordination, and ERCOT enrollment procedures — not just equipment installation.',
    prolnk: 'ProLnk matches you with pros who are ERCOT demand-response certified and can enroll your home in grid programs that pay you back.',
  },
  {
    id: 'duct-design',
    label: '🏠 DFW Duct Design',
    lookFor: 'Attic ductwork in DFW reaches 160°F. Specialists must use Manual D duct design (not rules of thumb), R-8 or higher duct insulation, and aerosol duct sealing — not mastic alone. Ask for blower door and duct blaster test reports.',
    prolnk: 'ProLnk requires duct specialists to provide pre/post duct leakage test results. Only pros who test their work appear in ProLnk matches.',
  },
  {
    id: 'iaq',
    label: '🌬️ Indoor Air Quality Specialist',
    lookFor: 'DFW allergy season runs 9 months. IAQ specialists must understand MERV-13+ filtration, UV-C germicidal systems, and ERV/HRV ventilation — and be able to size them without reducing airflow to dangerous levels on existing equipment.',
    prolnk: 'ProLnk IAQ specialists are vetted on DFW-specific allergen data and hold NATE Indoor Air Quality certifications.',
  },
];

export default function DFWHVACDFWSpecialists() {
  const [selected, setSelected] = useState(null);
  const item = specialistNeeds.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔬</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Specialists</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Specialist knowledge only DFW-experienced pros carry — and how ProLnk vets for it.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {specialistNeeds.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642′ : '#1E2D45',
                color: selected === s.id ? '#0A1628′ : '#E8EDF5',
                border: 'none',
                borderRadius: 10,
                padding: '16px 20px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔍 WHAT TO LOOK FOR IN A DFW SPECIALIST</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{item.lookFor}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔗 PROLNK'S VETTING ROLE</div>
              <p style={{ color: '#E2E8F0', lineHeight: 1.7 }}>{item.prolnk}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>⭐</div>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>ProLnk Only Matches DFW Specialists</h3>
          <p style={{ color: '#1E2D45', fontSize: 14, lineHeight: 1.6 }}>
            Specialists are pre-vetted for DFW-specific knowledge before your match request ever goes out.
          </p>
        </div>
      </div>
    </div>
  );
}
