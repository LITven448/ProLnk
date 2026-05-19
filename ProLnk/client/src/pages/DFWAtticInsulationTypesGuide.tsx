import { useState } from 'react';

const atticTypes = ['Vented Attic (standard)', 'Unvented / Conditioned Attic', 'Cathedral Ceiling', 'Flat Roof Assembly'];
const concerns = ['Extreme Heat (Cooling Costs)', 'Humidity / Moisture Control', 'Air Sealing Priority', 'Cost-Effectiveness'];

type ResultMap = Record<string, Record<string, { type: string; rValue: string; cost: string; reason: string }>>;

const results: ResultMap = {
  'Vented Attic (standard)': {
    'Extreme Heat (Cooling Costs)': { type: 'Blown-In Fiberglass', rValue: 'R-49 to R-60', cost: '$1.00–$1.50/sq ft installed', reason: 'Blown-in fiberglass is ideal for vented DFW attics battling heat. It fills every gap, achieves high R-values, and handles DFW temperature swings without settling like cellulose.' },
    'Humidity / Moisture Control': { type: 'Blown-In Cellulose', rValue: 'R-49 to R-60', cost: '$1.10–$1.60/sq ft installed', reason: 'Cellulose manages moisture buffering well and is a strong choice for DFW\’s humid periods. Treated for mold resistance and made from recycled content.' },
    'Air Sealing Priority': { type: 'Blown-In Fiberglass + Air Sealing', rValue: 'R-49', cost: '$1.20–$1.80/sq ft installed', reason: 'Air seal all penetrations first, then blow fiberglass over. DFW\’s mixed climate makes air sealing as impactful as insulation R-value.' },
    'Cost-Effectiveness': { type: 'Blown-In Fiberglass', rValue: 'R-38 to R-49', cost: '$0.90–$1.30/sq ft installed', reason: 'Blown-in fiberglass gives the best value for DFW vented attics—installed quickly and performs well at moderate R-values for most homes.' },
  },
  'Unvented / Conditioned Attic': {
    'Extreme Heat (Cooling Costs)': { type: 'Open-Cell Spray Foam', rValue: 'R-20 to R-28 (roof deck underside)', cost: '$1.50–$2.50/sq ft installed', reason: 'For conditioned DFW attics, spray foam on the roof deck underside eliminates the attic as a heat source entirely—HVAC ducts in attic space benefit enormously.' },
    'Humidity / Moisture Control': { type: 'Closed-Cell Spray Foam', rValue: 'R-20 to R-38', cost: '$2.50–$4.00/sq ft installed', reason: 'Closed-cell spray foam acts as both insulation and vapor retarder—important in DFW where attic humidity can cause condensation in conditioned assemblies.' },
    'Air Sealing Priority': { type: 'Closed-Cell Spray Foam', rValue: 'R-20+', cost: '$2.50–$4.00/sq ft installed', reason: 'Spray foam seals and insulates simultaneously—the only product that fully air-seals an unvented attic assembly in DFW.' },
    'Cost-Effectiveness': { type: 'Open-Cell Spray Foam', rValue: 'R-20 to R-24', cost: '$1.50–$2.00/sq ft installed', reason: 'Open-cell is the more affordable spray foam option; for DFW conditioned attics it achieves code minimum with strong long-term performance.' },
  },
  'Cathedral Ceiling': {
    'Extreme Heat (Cooling Costs)': { type: 'Closed-Cell Spray Foam', rValue: 'R-28 to R-38', cost: '$3.00–$5.00/sq ft installed', reason: 'Cathedral ceilings in DFW have no room for error—closed-cell spray foam delivers maximum R-value per inch in tight rafter bays.' },
    'Humidity / Moisture Control': { type: 'Closed-Cell Spray Foam', rValue: 'R-28+', cost: '$3.00–$5.00/sq ft installed', reason: 'Closed-cell controls vapor drive in cathedral assemblies—DFW\’s humidity swings make this critical to avoid moisture damage inside the ceiling.' },
    'Air Sealing Priority': { type: 'Closed-Cell Spray Foam', rValue: 'R-20+', cost: '$2.50–$4.00/sq ft installed', reason: 'Cathedral ceilings must be fully air-sealed; spray foam is the only practical solution for the confined rafter cavity.' },
    'Cost-Effectiveness': { type: 'Rigid Foam Boards + Air Sealing', rValue: 'R-20 to R-28', cost: '$2.00–$3.50/sq ft installed', reason: 'Rigid foam is less expensive than spray foam and can achieve good performance in cathedral ceilings when carefully installed and sealed.' },
  },
  'Flat Roof Assembly': {
    'Extreme Heat (Cooling Costs)': { type: 'Polyiso Rigid Board', rValue: 'R-25 to R-35', cost: '$2.00–$3.50/sq ft installed', reason: 'Polyiso performs well in DFW flat roofs—high R-value per inch and UV-stable when covered with proper membrane.' },
    'Humidity / Moisture Control': { type: 'EPS Rigid Board', rValue: 'R-20 to R-30', cost: '$1.50–$2.50/sq ft installed', reason: 'EPS does not absorb moisture like polyiso can in wet conditions—better for DFW flat roofs that may experience ponding.' },
    'Air Sealing Priority': { type: 'Closed-Cell Spray Foam (roof deck)', rValue: 'R-20+', cost: '$2.50–$4.00/sq ft installed', reason: 'Spray foam under the roof membrane eliminates air gaps in flat roof assemblies—important for DFW\’s temperature-driven air movement.' },
    'Cost-Effectiveness': { type: 'EPS Rigid Board', rValue: 'R-20', cost: '$1.00–$1.80/sq ft installed', reason: 'EPS is the most cost-effective rigid board for DFW flat roofs, with good long-term moisture resistance.' },
  },
};

export default function DFWAtticInsulationTypesGuide() {
  const [attic, setAttic] = useState('');
  const [concern, setConcern] = useState('');

  const result = attic && concern ? results[attic]?.[concern] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🏠 DFW Insulation Guide</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.25′ }}>Attic Insulation Types for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', lineHeight: '1.6′ }}>
          DFW's hot summers, occasional freezes, and mixed-humid climate create unique insulation demands. The right insulation type depends on your attic configuration and your primary goal—cooling cost reduction, moisture management, or air sealing. Blown-in products dominate vented attics; spray foam wins for conditioned assemblies.
        </p>

        <div style={{ backgroundColor: '#111E35', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#F5E642′ }}>⚙️ Get Your DFW Insulation Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Attic Type</label>
              <select value={attic} onChange={e => setAttic(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select attic type...</option>
                {atticTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Primary DFW Climate Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select concern...</option>
                {concerns.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Recommendation</div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px' }}>{result.type}</div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#F5E642′ }}>🎯 {result.rValue}</span>
              <span style={{ fontSize: '13px', color: '#94A3B8′ }}>💰 {result.cost}</span>
            </div>
            <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '14px', margin: 0 }}>{result.reason}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '🌡️', title: 'Why DFW Demands R-49+', body: 'DOE recommends R-38 to R-60 for DFW (Climate Zone 3). Homes with R-30 or less are significantly over-paying on cooling. Upgrading to R-49 typically pays back in 4–7 years.' },
            { icon: '💨', title: 'Blown-In vs Batts for DFW Attics', body: 'Blown-in insulation (fiberglass or cellulose) fills around joists and obstructions, eliminating the gaps that batts leave. In DFW attics with irregular framing, blown-in consistently outperforms batts.' },
            { icon: '🔒', title: 'Air Sealing Before Insulating', body: 'In DFW, air leakage is often as costly as insufficient R-value. Seal all attic penetrations—light fixtures, plumbing, HVAC chases—before adding insulation for maximum impact.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111E35', borderRadius: '10px', padding: '20px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>{card.icon}</div>
              <div style={{ fontWeight: '600', marginBottom: '6px' }}>{card.title}</div>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
