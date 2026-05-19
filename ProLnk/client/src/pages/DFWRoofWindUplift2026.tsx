import { useState } from 'react';

const roofTypes = ['Gable', 'Hip', 'Flat', 'Mansard'];
const locations = ['North DFW (Frisco/McKinney)', 'South DFW (Mansfield/Cedar Hill)', 'East DFW (Rockwall/Mesquite)', 'West DFW (Fort Worth/Weatherford)'];

const riskMatrix: Record<string, Record<string, { level: string; color: string; tips: string[] }>> = {
  Gable: {
    'North DFW (Frisco/McKinney)': { level: 'HIGH', color: '#ef4444', tips: ['Gable ends face direct uplift in DFW straight-line winds', 'Brace gable ends internally with 2x4 cross-bracing', 'Consider hip conversion on garage end'] },
    'South DFW (Mansfield/Cedar Hill)': { level: 'HIGH', color: '#ef4444', tips: ['South DFW exposed to open-field wind acceleration', 'IBHS Fortified nailing pattern required', 'Ridge cap shingles are first failure point'] },
    'East DFW (Rockwall/Mesquite)': { level: 'MODERATE', color: '#f97316', tips: ['Lake Hubbard effect can increase localized gusts', 'Standard 6-nail pattern minimum', 'Inspect gable vents for wind-driven rain entry'] },
    'West DFW (Fort Worth/Weatherford)': { level: 'HIGH', color: '#ef4444', tips: ['Weatherford sits on open plain — highest DFW wind exposure', 'Hip roofs strongly recommended at re-roof', 'IBHS Fortified certification available from insurers'] },
  },
  Hip: {
    'North DFW (Frisco/McKinney)': { level: 'LOW', color: '#22c55e', tips: ['Hip roofs perform 30–40% better in uplift tests', 'Maintain proper ridge ventilation', 'Inspect hip ridges annually — common leak point'] },
    'South DFW (Mansfield/Cedar Hill)': { level: 'LOW-MOD', color: '#84cc16', tips: ['Best wind shape for DFW', 'Insurance discounts up to 15% in some DFW counties', 'Ensure soffit vents are intact — prevent suction failure'] },
    'East DFW (Rockwall/Mesquite)': { level: 'LOW', color: '#22c55e', tips: ['Hip geometry reduces peak wind loads significantly', 'All hip ridges should be sealed annually', 'Consider peel-and-stick underlayment at re-roof'] },
    'West DFW (Fort Worth/Weatherford)': { level: 'MODERATE', color: '#f97316', tips: ['Even hip roofs need extra attention in open-plain West DFW', 'Fortified roof designation pays off in insurance savings', 'Use 130 MPH-rated shingles minimum'] },
  },
  Flat: {
    'North DFW (Frisco/McKinney)': { level: 'MODERATE', color: '#f97316', tips: ['Flat roofs face suction uplift at corners', 'TPO/EPDM with proper fastening handles DFW winds well', 'Inspect perimeter edge metal after every hail event'] },
    'South DFW (Mansfield/Cedar Hill)': { level: 'MODERATE', color: '#f97316', tips: ['Membrane roof uplift follows perimeter first', 'Use 6" OC fastening within 4ft of edges', 'Standing water accelerates membrane failure — ensure drainage'] },
    'East DFW (Rockwall/Mesquite)': { level: 'LOW-MOD', color: '#84cc16', tips: ['Flat roofs susceptible to wind-driven rain intrusion', 'Inspect all penetrations (HVAC, vents) after storms', 'Consider coated foam overlay for wind resistance upgrade'] },
    'West DFW (Fort Worth/Weatherford)': { level: 'HIGH', color: '#ef4444', tips: ['Flat roofs in West DFW face severe open-plain wind exposure', 'Edge metal and parapet walls must be secured to structural deck', 'Annual inspection mandatory'] },
  },
  Mansard: {
    'North DFW (Frisco/McKinney)': { level: 'MODERATE', color: '#f97316', tips: ['Mansard upper deck acts like flat roof', 'Lower steep slope shingles face high uplift at eave edge', 'Flashing at transition between slopes is failure-prone'] },
    'South DFW (Mansfield/Cedar Hill)': { level: 'MODERATE', color: '#f97316', tips: ['Both slope angles create complex uplift zones', 'Use peel-and-stick at all transitions', 'Mansard upper section needs same care as flat roof'] },
    'East DFW (Rockwall/Mesquite)': { level: 'MODERATE', color: '#f97316', tips: ['Inspect eave edge and rake edge flashing annually', 'Multi-slope creates multiple wind load paths', 'Ensure all nailing meets current IRC minimum'] },
    'West DFW (Fort Worth/Weatherford)': { level: 'HIGH', color: '#ef4444', tips: ['Mansard roofs in open West DFW face compound uplift', 'Upgrade to Fortified standard strongly recommended', 'Have structural engineer review fastening at major wind events'] },
  },
};

export default function DFWRoofWindUplift2026() {
  const [roofType, setRoofType] = useState('Gable');
  const [location, setLocation] = useState('North DFW (Frisco/McKinney)');
  const result = riskMatrix[roofType]?.[location];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌪️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Roof Wind Uplift Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>How DFW winds affect your roof — and what to do about it</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔎 Check Your Wind Uplift Risk</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: '0.9rem' }}>Roof Type</label>
              <select value={roofType} onChange={e => setRoofType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6 }}>
                {roofTypes.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: '0.9rem' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6 }}>
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ marginTop: '1rem', background: '#1a3a6e', borderRadius: 10, padding: '1.2rem', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: result.color, marginBottom: 8 }}>🌪️ {result.level} Wind Uplift Risk</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1' }}>
                {result.tips.map(t => <li key={t} style={{ marginBottom: 4, fontSize: '0.9rem' }}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '📐', title: 'Eave & Ridge: Highest Stress', text: 'Wind uplift is greatest at eaves and ridges. These are the first failure points in DFW storms. Proper nailing pattern (6-nail vs 4-nail) at these zones cuts risk dramatically.' },
            { icon: '🏅', title: 'IBHS Fortified Standard', text: 'Fortified certification requires enhanced nailing, sealed roof deck, and rated ridge caps. Many DFW insurers offer 10–15% premium discount for Fortified roofs.' },
            { icon: '🔨', title: 'Nailing Pattern Matters Most', text: 'IRC minimum is 4 nails per shingle. IBHS Fortified requires 6. In DFW wind zones, the 2-nail difference is the primary variable between minor damage and total loss.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#0f2040', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW Roof Wind Assessment</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>ProLnk connects you with certified DFW roofing contractors who specialize in wind uplift upgrades</p>
        </div>
      </div>
    </div>
  );
}