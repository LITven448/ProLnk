import { useState } from 'react';

const locations = [
  { id: 'azle', label: 'Azle / Lake Worth Area' },
  { id: 'irving', label: 'Irving / Grand Prairie' },
  { id: 'dallas', label: 'Dallas Proper' },
  { id: 'fortworth', label: 'Fort Worth Core' },
  { id: 'frisco', label: 'Frisco / McKinney / Collin Co.' },
  { id: 'mansfield', label: 'Mansfield / Midlothian / Ellis Co.' },
];

const vintages = [
  { id: 'pre1970', label: 'Pre-1970′ },
  { id: '1970_2000', label: '1970-2000′ },
  { id: 'post2000', label: 'Post-2000′ },
];

const assessments: Record<string, Record<string, { risk: string; color: string; explanation: string; actions: string[] }>> = {
  azle: {
    pre1970: { risk: 'High', color: '#CC0000', explanation: 'Azle area was epicenter of notable induced seismicity 2013-2015 linked to injection wells. Older homes were built to no seismic code and may have hairline cracks or weakened mortar joints from prior events.', actions: ['Schedule structural masonry inspection', 'Document all existing foundation cracks with photos and dates', 'Inquire about Texas RRC injection well activity near your address', 'Consider earthquake rider on homeowners insurance'] },
    '1970_2000': { risk: 'Moderate-High', color: '#FF6600', explanation: 'Homes built 1970-2000 in Azle area lack seismic design but are more structurally sound than pre-war construction. Induced seismicity history means cumulative vibration stress may have affected brick veneer or masonry.', actions: ['Inspect brick veneer for stair-step cracking', 'Check chimney for lean or separation', 'Review Texas RRC seismicity data for recent injection well activity', 'Maintain earthquake endorsement on homeowners policy'] },
    post2000: { risk: 'Moderate', color: '#FFA500', explanation: 'Post-2000 homes in Azle built during quieter seismic period but area remains active. Modern wood-frame construction handles vibration better than masonry. Monitor for new crack development.', actions: ['Baseline photo documentation of all drywall and masonry', 'Monitor crack width with crack monitors ($15 each at hardware stores)', 'Check Texas RRC map annually for new injection permits nearby'] },
  },
  irving: {
    pre1970: { risk: 'High', color: '#CC0000', explanation: 'Irving experienced multiple M3.0+ events 2014-2015, linked to waste disposal wells near DFW Airport. Older masonry and slab foundations may have absorbed cumulative stress.', actions: ['Full foundation inspection by licensed structural engineer', 'Masonry crack documentation and repair if needed', 'Check Texas RRC website for active wells within 5 miles', 'Earthquake endorsement review with insurance agent'] },
    '1970_2000': { risk: 'Moderate', color: '#FFA500', explanation: 'Irving seismicity was episodic — most homes showed no damage during events. Monitor for new cracks that correlate with felt earthquakes. USGS ShakeMap history for your address is a useful baseline.', actions: ['USGS Did You Feel It? registration for your address', 'Photo log of existing cracks with dates', 'Annual foundation inspection recommended'] },
    post2000: { risk: 'Low-Moderate', color: '#F5E642', explanation: 'Post-2000 construction in Irving is engineered for modern loads. Induced seismicity events in the area peaked 2014-2015 and have since decreased. Standard monitoring sufficient.', actions: ['Annual inspection of brick veneer and chimney', 'Subscribe to USGS earthquake notifications for DFW region'] },
  },
  dallas: {
    pre1970: { risk: 'Low-Moderate', color: '#F5E642', explanation: 'Dallas proper sits farther from major injection well clusters. Historical seismicity is minimal. Primary concern for older homes is decades of DFW clay expansion/contraction, not seismic stress.', actions: ['Foundation inspection for clay-driven movement', 'Standard crack monitoring — distinguish thermal vs. seismic', 'No specific earthquake action required at this time'] },
    '1970_2000': { risk: 'Low', color: '#22c55e', explanation: 'Low seismic risk area. DFW clay and drainage issues are more relevant than earthquake risk for Dallas homes of this era.', actions: ['Focus on foundation watering schedule and drainage grading', 'No specific seismic action required'] },
    post2000: { risk: 'Low', color: '#22c55e', explanation: 'Modern construction in low-seismic-risk area. Standard home maintenance priorities apply.', actions: ['Standard annual home inspection covers relevant structural checks'] },
  },
  fortworth: {
    pre1970: { risk: 'Moderate', color: '#FFA500', explanation: 'Fort Worth core has seen minor induced seismicity tied to Barnett Shale activity. Older homes with unreinforced masonry or stone foundations warrant monitoring.', actions: ['Inspect unreinforced masonry walls and chimney', 'Check Texas RRC for active SWD wells near your address', 'Consider earthquake endorsement — costs $50-200/yr in DFW'] },
    '1970_2000': { risk: 'Low-Moderate', color: '#F5E642', explanation: 'Moderate Barnett Shale activity in surrounding areas. Modern wood frame handles minor seismicity well. Brick veneer separation is primary concern.', actions: ['Annual brick veneer inspection', 'Document crack baseline with photos'] },
    post2000: { risk: 'Low', color: '#22c55e', explanation: 'Post-2000 Fort Worth homes in low-risk seismic zone. Clay-driven foundation movement is a far greater concern.', actions: ['Maintain foundation watering schedule', 'Standard annual inspection'] },
  },
  frisco: {
    pre1970: { risk: 'Low', color: '#22c55e', explanation: 'Northern Collin County has minimal induced seismicity history. Most structures from this era are rural farmhouses with different risk profiles than urban masonry.', actions: ['Standard structural inspection if purchasing older rural property'] },
    '1970_2000': { risk: 'Low', color: '#22c55e', explanation: 'Frisco/McKinney area grew significantly post-1990 with minimal seismic concern. Wood-frame suburban construction handles minor vibration well.', actions: ['No specific seismic action required', 'Focus on DFW clay foundation monitoring'] },
    post2000: { risk: 'Low', color: '#22c55e', explanation: 'Modern construction in seismically quiet area. Building codes meet standard TX requirements.', actions: ['Standard annual home inspection'] },
  },
  mansfield: {
    pre1970: { risk: 'Moderate', color: '#FFA500', explanation: 'Ellis County and southern Tarrant sit on active Barnett Shale formation with scattered injection wells. Older structures merit inspection, especially those with unreinforced masonry.', actions: ['Texas RRC injection well proximity check', 'Structural inspection for any pre-existing cracks', 'Earthquake insurance endorsement review'] },
    '1970_2000': { risk: 'Low-Moderate', color: '#F5E642', explanation: 'Mansfield area Barnett Shale activity is present but earthquakes have been minor. Monitor and document.', actions: ['Annual crack documentation', 'Texas RRC monitoring for new permits near your address'] },
    post2000: { risk: 'Low', color: '#22c55e', explanation: 'Modern construction, low active seismicity. Clay soil and drainage are primary maintenance concerns.', actions: ['Standard foundation maintenance program'] },
  },
};

export default function DFWEarthquakeRiskGuide() {
  const [location, setLocation] = useState<string | null>(null);
  const [vintage, setVintage] = useState<string | null>(null);
  const result = location && vintage ? assessments[location]?.[vintage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>⚠️ DFW HOME RISK</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Earthquake Risk Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW has experienced induced seismicity — earthquakes triggered by deep injection of wastewater from oil and gas operations. The Azle (2013-2015) and Irving (2014-2015) earthquake swarms reached M3.6, causing minor structural concerns in older homes. While not a major natural seismic zone, DFW homeowners should understand their specific risk.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>📋 Key Context for DFW Homeowners</div>
          <ul style={{ color: '#94a3b8', paddingLeft: 20, lineHeight: 2, margin: 0 }}>
            <li>Texas RRC regulates injection wells — public search available at rrc.texas.gov</li>
            <li>Standard Texas homeowners insurance does NOT cover earthquake damage — endorsement needed</li>
            <li>Building codes have no seismic requirements in most of DFW (low-risk classification)</li>
            <li>USGS tracks all DFW seismic events at earthquake.usgs.gov</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Get Your Risk Assessment</h2>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>Your DFW Location</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {locations.map(l => (
              <button key={l.id} onClick={() => setLocation(l.id)}
                style={{ background: location === l.id ? '#F5E642′ : '#0f2240', color: location === l.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>Home Build Year</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {vintages.map(v => (
              <button key={v.id} onClick={() => setVintage(v.id)}
                style={{ background: vintage === v.id ? '#F5E642′ : '#0f2240', color: vintage === v.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f2240', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: result.color, marginBottom: 12 }}>Risk Level: {result.risk}</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7, marginBottom: 16 }}>{result.explanation}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 8 }}>✅ RECOMMENDED ACTIONS</div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#cbd5e1', lineHeight: 2 }}>
                {result.actions.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
