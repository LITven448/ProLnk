import { useState } from 'react';

const roofTypes = ['Flat Concrete Deck', 'Flat Wood Deck', 'Low-Slope Metal', 'Low-Slope Modified Bitumen'];
const dfwLocations = ['Urban Dallas (Downtown/Uptown)', 'Suburban DFW (Plano/Frisco/Allen)', 'Fort Worth Metro', 'Rural DFW Outskirts'];

const feasibilityMatrix: Record<string, Record<string, { feasibility: string; score: number; notes: string; cost: string; considerations: string }>> = {
  'Flat Concrete Deck': {
    'Urban Dallas (Downtown/Uptown)': { feasibility: 'Moderate', score: 65, notes: 'Concrete can handle green roof weight. Urban heat island effect makes green roof most valuable here. City of Dallas may offer incentives.', cost: 'Extensive: $15-30/sq ft. Intensive: $25-50/sq ft', considerations: 'Irrigation critical — DFW drought periods require automated watering. Choose drought-tolerant native plants.' },
    'Suburban DFW (Plano/Frisco/Allen)': { feasibility: 'Low-Moderate', score: 45, notes: 'Structurally possible but HOA restrictions likely. Suburban green roofs rarely approved in DFW master-planned communities.', cost: 'Extensive: $15-30/sq ft installed', considerations: 'Check HOA CC&Rs before any planning. Most DFW suburban HOAs prohibit visible rooftop features.' },
    'Fort Worth Metro': { feasibility: 'Moderate', score: 55, notes: 'Fort Worth has been more receptive to green building. Check City of Fort Worth green building incentives.', cost: 'Extensive: $12-25/sq ft installed', considerations: 'Wind exposure higher in Fort Worth — secure all growing media and use wind-resistant plant species.' },
    'Rural DFW Outskirts': { feasibility: 'Low', score: 35, notes: 'Minimal environmental benefit in low-density areas. Cost rarely justified without urban heat island mitigation goal.', cost: 'Not recommended for ROI', considerations: 'Alternative: standard cool roof coating achieves 80% of the benefit at 10% of the cost.' },
  },
  'Flat Wood Deck': {
    'Urban Dallas (Downtown/Uptown)': { feasibility: 'Low', score: 30, notes: 'Wood decks rarely rated for green roof weight. Structural engineer assessment mandatory — most will not approve.', cost: 'Structural upgrade + green roof: $40-80/sq ft', considerations: 'Moisture risk to wood substrate is extreme. Green roofs hold water — wood and water are incompatible long term.' },
    'Suburban DFW (Plano/Frisco/Allen)': { feasibility: 'Not Recommended', score: 10, notes: 'Wood deck + DFW heat + irrigation = moisture damage and structural risk.', cost: 'Not recommended', considerations: 'Replace wood deck with concrete if green roof is a priority. Otherwise choose alternative cool roof solutions.' },
    'Fort Worth Metro': { feasibility: 'Not Recommended', score: 15, notes: 'Same structural concerns as Dallas. Wood deck cannot support green roof weight safely.', cost: 'Not recommended', considerations: 'Structural assessment will likely redirect to deck replacement before any green roof consideration.' },
    'Rural DFW Outskirts': { feasibility: 'Not Recommended', score: 5, notes: 'No structural or environmental justification for wood deck green roof in rural DFW.', cost: 'Not recommended', considerations: 'Standard asphalt or metal roofing is the appropriate choice.' },
  },
  'Low-Slope Metal': {
    'Urban Dallas (Downtown/Uptown)': { feasibility: 'Moderate', score: 60, notes: 'Metal can support extensive green roofs if structural framing allows. Excellent waterproofing base. Urban location maximizes benefit.', cost: 'Extensive system: $18-35/sq ft including waterproofing upgrade', considerations: 'Metal thermal movement requires flexible waterproofing membrane beneath growing media. Expansion joints critical.' },
    'Suburban DFW (Plano/Frisco/Allen)': { feasibility: 'Low', score: 40, notes: 'HOA approval required. Metal roof with green system is an unusual combination that may not meet community standards.', cost: '$18-35/sq ft if approved', considerations: 'Pre-approval from HOA and city planning required. Expect 60-90 day review process in suburban DFW.' },
    'Fort Worth Metro': { feasibility: 'Moderate', score: 55, notes: 'Fort Worth commercial and mixed-use properties are good candidates. Residential has less community opposition than Dallas suburbs.', cost: '$15-30/sq ft', considerations: 'Fort Worth wind speeds higher — design for 90+ mph wind uplift on all green roof components.' },
    'Rural DFW Outskirts': { feasibility: 'Not Recommended', score: 20, notes: 'Low density eliminates most green roof environmental benefits.', cost: 'Not recommended for ROI', considerations: 'Metal cool roof coating achieves similar energy goals at a fraction of the cost.' },
  },
  'Low-Slope Modified Bitumen': {
    'Urban Dallas (Downtown/Uptown)': { feasibility: 'High', score: 75, notes: 'Modified bitumen is an excellent green roof base — inherently waterproof, can support extensive systems. Best urban DFW option.', cost: 'Extensive: $12-22/sq ft added to existing roof', considerations: 'Verify existing bitumen is in good condition before adding green system. Failed bitumen under growing media is a major remediation problem.' },
    'Suburban DFW (Plano/Frisco/Allen)': { feasibility: 'Low-Moderate', score: 45, notes: 'HOA barrier is the primary challenge, not structural. Modified bitumen base is ideal technically.', cost: '$12-22/sq ft if HOA approved', considerations: 'Focus on sedum mats or succulent systems that lie flat — least likely to trigger HOA objections.' },
    'Fort Worth Metro': { feasibility: 'Moderate-High', score: 68, notes: 'Fort Worth commercial modified bitumen roofs are the best candidates for green roof systems in the DFW metro.', cost: '$10-20/sq ft', considerations: 'Connect with Fort Worth Office of Sustainability — potential incentive programs available.' },
    'Rural DFW Outskirts': { feasibility: 'Low', score: 25, notes: 'Technically feasible but no environmental or financial justification in rural low-density context.', cost: 'Not recommended', considerations: 'Reflective modified bitumen cap sheet achieves 70% of the energy benefit with zero complexity.' },
  },
};

export default function DFWGreenRoofGuide() {
  const [roofType, setRoofType] = useState('');
  const [location, setLocation] = useState('');
  const result = roofType && location ? feasibilityMatrix[roofType]?.[location] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px' }}>🏠 ProLnk DFW Roofing Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Green Roof Guide — Dallas/Fort Worth</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '24px', lineHeight: '1.6' }}>
          Living roofs (green roofs) face unique DFW challenges: intense summer heat, drought stress, heavy rainfall events, and irrigation demands. Where they work in DFW — urban flat roofs in shaded or north-facing areas with irrigation access — they provide excellent stormwater management and urban heat island mitigation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[{ label: '🌱 Extensive System', val: '2-6" growing media, sedum only' }, { label: '🌳 Intensive System', val: '6-24" growing media, full plants' }, { label: '💧 Stormwater', val: 'Retains 50-80% of rainfall' }, { label: '🌡️ DFW Challenge', val: 'Irrigation required May-Sept' }].map(({ label, val }) => (
            <div key={label} style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontWeight: 600', fontSize: '13px' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '16px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🔍 DFW Green Roof Feasibility</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Roof Type</label>
              <select value={roofType} onChange={e => setRoofType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select roof type...</option>
                {roofTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select location...</option>
                {dfwLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '20px', border: '1px solid #F5E642' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '18px' }}>Feasibility: {result.feasibility}</div>
                <div style={{ background: result.score >= 60 ? '#166534' : result.score >= 40 ? '#854D0E' : '#7F1D1D', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>Score: {result.score}/100</div>
              </div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642' }}>Assessment: </span>{result.notes}</div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642' }}>Cost: </span>{result.cost}</div>
              <div><span style={{ color: '#F5E642' }}>DFW Considerations: </span>{result.considerations}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '8px' }}>🌱 DFW Plant Recommendations</div>
          <p style={{ color: '#9BA3B8', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>Best DFW green roof plants: Sedum (drought-tolerant, shallow roots), Prairie dropseed grass, Texas sage, Black-eyed Susan, Inland sea oats (shade). Avoid high-water plants that cannot survive DFW summer without daily irrigation. Native DFW prairie species are always the best choice for extensive systems.</p>
        </div>
      </div>
    </div>
  );
}
