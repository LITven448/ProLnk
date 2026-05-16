import { useState } from 'react';

export default function DFWGarageConversionGuide2026() {
  const [garageType, setGarageType] = useState('attached');
  const [useCase, setUseCase] = useState('bedroom');

  const feasibility: Record<string, Record<string, { score: string; cost: string; permit: string; notes: string[] }>> = {
    attached: {
      bedroom: { score: 'High', cost: '$30K–$50K', permit: 'Required', notes: ['HVAC extension required', 'Insulation critical (120°F summer)', 'Fire separation wall needed', 'HOA approval often required'] },
      office: { score: 'High', cost: '$25K–$40K', permit: 'Required', notes: ['Dedicated electrical circuit needed', 'Insulation required for comfort', 'HVAC mini-split option', 'Egress window may be required'] },
      gym: { score: 'Very High', cost: '$15K–$30K', permit: 'Often Required', notes: ['Flooring upgrade for impact', 'Mini-split AC essential in DFW summer', 'No egress requirement for gym', 'HOA may restrict exterior changes'] },
      adu: { score: 'Low', cost: '$50K–$80K', permit: 'Always Required', notes: ['ADU harder for attached garages', 'Separate entry required', 'Full kitchen/bath adds significant cost', 'Check city zoning (varies by DFW city)'] },
    },
    detached: {
      bedroom: { score: 'Medium', cost: '$35K–$55K', permit: 'Required', notes: ['Separate HVAC system required', 'Utility connection (electric, plumbing) costly', 'ADU potential if zoning allows', 'HOA approval critical'] },
      office: { score: 'Very High', cost: '$25K–$45K', permit: 'Required', notes: ['Private office space — ideal separation', 'Run ethernet/fiber from main house', 'Mini-split HVAC recommended', 'Excellent resale value add'] },
      gym: { score: 'Very High', cost: '$12K–$28K', permit: 'Often Required', notes: ['Rubber flooring standard', 'AC required for DFW summer workouts', 'Noise isolation easier (detached)', 'Minimal permit scope if no plumbing'] },
      adu: { score: 'High', cost: '$55K–$90K', permit: 'Always Required', notes: ['Best ADU scenario in DFW', 'Rental income potential $1,200–$1,800/mo', 'Full utility connection required', 'Some DFW cities allow by-right'] },
    },
    carport: {
      bedroom: { score: 'Low', cost: '$40K–$70K', permit: 'Required', notes: ['Must enclose structure first', 'Foundation work often needed', 'Highly location-dependent', 'May be better to demolish + rebuild'] },
      office: { score: 'Medium', cost: '$30K–$55K', permit: 'Required', notes: ['Enclosure cost adds $15K–$25K', 'HVAC from scratch', 'Check if slab is level/adequate', 'HOA may prohibit enclosure'] },
      gym: { score: 'Medium', cost: '$20K–$40K', permit: 'Required', notes: ['Enclosure simplest for gym use', 'Slab-on-grade already done', 'Ceiling height may be limiting', 'Budget for AC — non-negotiable in DFW'] },
      adu: { score: 'Very Low', cost: '$65K–$110K', permit: 'Always Required', notes: ['Major structural work required', 'Full enclosure + utilities + interior', 'May not pencil economically', 'Consult architect first'] },
    },
  };

  const result = feasibility[garageType]?.[useCase];
  const scoreColor: Record<string, string> = { 'Very High': '#22c55e', 'High': '#84cc16', 'Medium': '#F5E642', 'Low': '#f97316', 'Very Low': '#ef4444' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Garage Conversion Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Dallas-Fort Worth garage conversion feasibility + permit guide</p>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🏗️ Garage Type</label>
              <select value={garageType} onChange={e => setGarageType(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="attached">Attached Garage</option>
                <option value="detached">Detached Garage</option>
                <option value="carport">Carport</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🎯 Conversion Use</label>
              <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="bedroom">Bedroom / Living Space</option>
                <option value="office">Home Office</option>
                <option value="gym">Home Gym</option>
                <option value="adu">ADU / Rental Unit</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${scoreColor[result.score]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ color: scoreColor[result.score], fontWeight: 700, fontSize: 18 }}>Feasibility: {result.score}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>🏛️ Permit: <span style={{ color: '#fff' }}>{result.permit}</span></div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.notes.map((n, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>{n}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[{ icon: '🌡️', label: 'DFW Summer Heat', value: '120°F in uninsulated garage' }, { icon: '📋', label: 'Permit Required?', value: 'Yes — virtually always' }, { icon: '🏘️', label: 'HOA Approval', value: 'Required in 70% of DFW' }, { icon: '💰', label: 'Avg Conversion Cost', value: '$25K – $60K' }].map((s, i) => (
            <div key={i} style={{ background: '#111827', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📞 Get a Free Conversion Estimate</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with DFW contractors who specialize in garage conversions — pre-screened, insured, and familiar with local permit requirements.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
