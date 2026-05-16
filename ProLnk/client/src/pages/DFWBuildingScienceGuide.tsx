import { useState } from 'react';

const homeAges = [
  { label: 'New construction (2010+)', value: 'new' },
  { label: 'Modern (1990-2009)', value: 'modern' },
  { label: 'Older (1970-1989)', value: 'older' },
  { label: 'Vintage (pre-1970)', value: 'vintage' },
];

const recentImprovements = [
  { label: 'Added attic insulation', value: 'insulation' },
  { label: 'Replaced windows', value: 'windows' },
  { label: 'Sealed and caulked', value: 'sealing' },
  { label: 'No recent improvements', value: 'none' },
];

const auditData: Record<string, Record<string, { riskLevel: string; issues: string[]; checks: string[]; note: string }>> = {
  new: {
    insulation: { riskLevel: 'Low', issues: ['Verify vapor retarder is on correct side (facing interior in DFW -- diffusion inward)', 'Ensure HRV or ERV is balanced with new insulation level', 'Check that attic insulation does not block soffit vents'], checks: ['Blower door test to verify air sealing was not compromised during insulation work', 'Verify soffit-to-ridge airflow path is clear', 'Measure indoor humidity -- new insulation can trap moisture if ventilation not adjusted'] },
    windows: { riskLevel: 'Low-Medium', issues: ['New windows may change pressure balance and infiltration patterns', 'Condensation on new windows means indoor humidity is too high -- ventilation imbalance', 'Verify flashing and rough opening were air-sealed properly'], checks: ['Check around all window frames from inside for air leaks with incense or smoke pencil', 'Measure indoor humidity after replacement -- target 40-55% in DFW', 'Verify window U-factor -- DFW benefits most from low SHGC on west glass'] },
    sealing: { riskLevel: 'Medium', issues: ['In DFW, aggressive sealing without mechanical ventilation causes indoor air quality problems', 'Combustion appliances (gas furnace, water heater) can backdraft in tight homes', 'Radon is rare in DFW but should be tested if sealing basement slab'], checks: ['Carbon monoxide detector after sealing -- combustion appliances need makeup air', 'Measure CO2 levels -- above 1,000 ppm means you need more ventilation', 'Blower door test to quantify how tight the home is now'] },
    none: { riskLevel: 'Low', issues: ['New construction in DFW should meet current energy codes', 'Verify HERS rating was completed and score is 55 or below', 'Confirm HRV or ERV was installed -- required for tight new construction'], checks: ['Request HERS certificate from builder', 'Verify ERV or HRV is running on schedule', 'Check attic air sealing at top plates -- often missed in production builds'] },
  },
  modern: {
    insulation: { riskLevel: 'Medium', issues: ['Modern homes (1990-2009) often have low original air sealing -- insulation traps moisture against unsealed gaps', 'Vapor retarder may be missing or on wrong side for DFW climate', 'Blown-in insulation over old fiberglass batts can create void layers'], checks: ['Inspect attic for moisture staining before and after insulation', 'Verify original ceiling penetrations were sealed before insulation was added', 'Check that bath fans and kitchen hood exhaust outside, not into attic'] },
    windows: { riskLevel: 'Medium', issues: ['Modern homes often have aluminum-frame original windows -- replacement can dramatically change infiltration rate', 'If home is not mechanically ventilated, very tight new windows cause air quality issues', 'Check that window wells and flashing are not causing bulk water intrusion'], checks: ['Post-replacement blower door test recommended', 'Inspect around each new window from exterior for flashing gaps', 'Measure relative humidity weekly for first summer -- should stay 40-60%'] },
    sealing: { riskLevel: 'High', issues: ['Most critical issue for 1990-2009 homes: sealing without ventilation causes mold in DFW humidity', 'Natural gas appliances become dangerous if too tight -- pilot lights may starve', 'Spray foam in attic can seal out ventilation airflow if applied wrong'], checks: ['CO detector in every sleeping room immediately after sealing', 'Professional combustion safety test for all gas appliances', 'Measure indoor RH for 30 days -- DFW humidity requires mechanical dehumidification in tight homes'] },
    none: { riskLevel: 'Medium', issues: ['Modern homes likely have code insulation but poor air sealing', 'Window seals (IG units) may be failing -- foggy windows indicate dead zones', 'DFW clay foundation movement can open gaps at wall-floor junction'], checks: ['Visual inspection of all window panes for cloudiness or seal failure', 'Check perimeter of foundation where slab meets wall -- common air leak in DFW', 'Inspect ductwork in attic for disconnected joints -- common in homes this age'] },
  },
  older: {
    insulation: { riskLevel: 'High', issues: ['1970-1989 homes may have vermiculite attic insulation -- test for asbestos before disturbing', 'Blown-in over old batts can trap moisture against original air barriers', 'Many homes this age have NO vapor retarder -- DFW humidity enters from exterior'], checks: ['Test vermiculite-looking attic insulation for asbestos before any attic work', 'Inspect for attic moisture and staining before adding insulation', 'Air seal all ceiling penetrations before adding insulation layer -- critical step often skipped'] },
    windows: { riskLevel: 'Medium', issues: ['Original single-pane windows have likely been replaced already', 'Check flashing at all window openings -- 1970-1989 flashing is failing in many DFW homes', 'Stucco or brick homes this age may have bulk water issues around windows'], checks: ['Probe wood around window frames for moisture damage', 'Inspect exterior flashing continuity', 'Check for efflorescence (white powder) on brick near windows -- indicates water intrusion'] },
    sealing: { riskLevel: 'Very High', issues: ['Older homes were designed to breathe -- aggressive sealing traps pollutants and moisture', 'Attic duct systems in 1970-1989 homes are typically leaky -- seal ducts before sealing house', 'Many homes this age have atmospheric combustion furnaces that need makeup air'], checks: ['NEVER seal an older home without combustion safety testing first', 'Seal ducts first -- duct leakage is a bigger problem than envelope leakage in this era', 'Test for lead paint before any penetration work'] },
    none: { riskLevel: 'High', issues: ['High likelihood of duct leakage in attic -- common in DFW homes this age', 'Foundation settling has created air leaks at wall base in most DFW clay-soil homes', 'Bathroom fans likely vent to attic instead of outside -- moisture problem'], checks: ['Redirect any bath fans venting to attic to vent outside', 'Inspect duct connections in attic -- tape or mastic has often failed', 'Check crawlspace or garage for HVAC equipment degradation'] },
  },
  vintage: {
    insulation: { riskLevel: 'Very High', issues: ['Pre-1970 homes may contain asbestos pipe wrap, floor tiles, or attic insulation', 'Adding insulation without air sealing in pre-1970 homes traps moisture in walls', 'Many pre-1970 homes have no attic vapor management at all'], checks: ['Asbestos survey required before any insulation or demolition work', 'Blower door test before AND after to measure change in infiltration', 'Check for knob-and-tube wiring -- cannot cover with insulation per code'] },
    windows: { riskLevel: 'High', issues: ['Pre-1970 original windows are almost certainly gone -- check replacement quality', 'Old rough openings in balloon-frame or plaster homes are difficult to flash properly', 'Plaster walls around windows often have hidden voids where water and air travel'], checks: ['Probe all window sills for rot -- pre-1970 homes collect decades of moisture', 'Use thermal camera around windows to find hidden air paths through old walls', 'Check attic for old bird or squirrel nests that block wall cavities'] },
    sealing: { riskLevel: 'Extreme', issues: ['Pre-1970 homes with combustion appliances require extreme care when sealing', 'Balloon-frame construction has open wall cavities from foundation to attic -- sealing surface is complex', 'Asbestos and lead must be managed before any sealing penetrations'], checks: ['Hire building science professional for pre-1970 homes -- DIY sealing risks are high', 'All combustion appliances must be tested for backdraft after any sealing', 'Radon test after sealing if basement exists'] },
    none: { riskLevel: 'High', issues: ['Pre-1970 homes almost certainly have duct leakage, single-pane glass (or poor replacements), and minimal insulation', 'Foundation issues from DFW clay movement common in homes this age', 'Pest pathways through old wood framing are also major air leaks'], checks: ['Start with a professional energy audit -- this age home needs expert assessment', 'Priority 1: duct sealing and insulation', 'Priority 2: window replacement if original', 'Priority 3: controlled ventilation before air sealing'] },
  },
};

const riskColors: Record<string, { bg: string; text: string }> = {
  'Low': { bg: '#065F46', text: '#6EE7B7' },
  'Low-Medium': { bg: '#1E3A5F', text: '#F5E642' },
  'Medium': { bg: '#374151', text: '#D1D5DB' },
  'High': { bg: '#7C2D12', text: '#FED7AA' },
  'Very High': { bg: '#5F1E1E', text: '#FCA5A5' },
  'Extreme': { bg: '#3D0000', text: '#FF6B6B' },
};

export default function DFWBuildingScienceGuide() {
  const [homeAge, setHomeAge] = useState('modern');
  const [improvement, setImprovement] = useState('none');
  const data = auditData[homeAge][improvement];
  const colors = riskColors[data.riskLevel] || riskColors['Medium'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94A3B8' }}>🏠 DFW Building Science</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          Building Science Guide for DFW Homeowners
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Your home is a system -- air sealing, insulation, and ventilation must be balanced. In DFW, getting one wrong while fixing another can create mold, comfort problems, and even dangerous combustion conditions.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🏠 Home Age</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {homeAges.map(opt => (
              <button key={opt.value} onClick={() => setHomeAge(opt.value)} style={{
                background: homeAge === opt.value ? '#F5E642' : '#1E3A5F',
                color: homeAge === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🔧 Most Recent Improvement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {recentImprovements.map(opt => (
              <button key={opt.value} onClick={() => setImprovement(opt.value)} style={{
                background: improvement === opt.value ? '#F5E642' : '#1E3A5F',
                color: improvement === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', margin: 0 }}>⚠️ Building Science Risk Assessment</h2>
            <span style={{ background: colors.bg, color: colors.text, borderRadius: 6, padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>{data.riskLevel} Risk</span>
          </div>

          <h3 style={{ color: '#FCA5A5', fontSize: '0.95rem', marginBottom: '0.75rem' }}>🚨 Potential Issues to Watch</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {data.issues.map((issue, i) => (
              <div key={i} style={{ background: '#1A0A0A', borderRadius: 8, padding: '0.75rem', fontSize: '0.875rem', color: '#FED7AA', borderLeft: '3px solid #7C2D12' }}>{issue}</div>
            ))}
          </div>

          <h3 style={{ color: '#6EE7B7', fontSize: '0.95rem', marginBottom: '0.75rem' }}>✅ What to Check Now</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.checks.map((check, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', fontSize: '0.875rem', color: '#E2E8F0' }}>🔍 {check}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>🌡️ DFW Building Science Rule</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Seal-Ventilate-Insulate -- in that order. Air seal first, then add mechanical ventilation to compensate for tightness, then insulate. Reversing this order is the most common DFW mistake and causes moisture damage that costs far more to fix than the original upgrade. When in doubt, hire a RESNET or BPI certified energy auditor.</div>
        </div>
      </div>
    </div>
  );
}
