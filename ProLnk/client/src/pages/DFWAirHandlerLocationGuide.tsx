import { useState } from 'react';

const locations = [
  {
    label: 'Attic (most common in DFW)',
    efficiencyLoss: '30-40%',
    summerAtticTemp: '140-160F',
    issue: 'Air handler casing and refrigerant lines absorb intense heat. Every degree of attic heat bleeds into the air handler cabinet, raising supply air temperature before it reaches your vents.',
    options: ['Spray foam insulation around unit', 'Radiant barrier above unit', 'Mini-split supplement for worst rooms', 'Full relocation to conditioned closet (major renovation)'],
    relocateCost: '$3,500-$6,000',
    improveCost: '$800-$2,000',
  },
  {
    label: 'Interior closet (conditioned space)',
    efficiencyLoss: '5-8%',
    summerAtticTemp: '75-80F',
    issue: 'Best location for DFW. Air handler operates in conditioned space so it does not absorb attic heat. Minimal efficiency loss. Common in homes built after 2015.',
    options: ['Ensure closet has adequate return air clearance', 'Verify no airflow restriction from shelving', 'Confirm drain line pitched correctly'],
    relocateCost: 'N/A - already optimal',
    improveCost: '$0-$400',
  },
  {
    label: 'Garage (unconditioned)',
    efficiencyLoss: '15-25%',
    summerAtticTemp: '110-130F',
    issue: 'Garage is hot in DFW summers but cooler than attic. Air handler absorbs garage heat. Also creates air quality risk if garage air infiltrates unit. Requires sealed cabinet and careful return air design.',
    options: ['Mini-split to condition garage space around unit', 'Seal cabinet penetrations with mastic', 'Add dedicated return air from conditioned space only'],
    relocateCost: '$2,500-$4,500',
    improveCost: '$500-$1,500',
  },
  {
    label: 'Basement or crawlspace',
    efficiencyLoss: '3-6%',
    summerAtticTemp: '55-70F',
    issue: 'Rare in DFW but ideal thermally. Crawlspace stays relatively cool. Main concern is humidity and condensation - requires proper vapor barrier and dehumidification.',
    options: ['Maintain crawlspace encapsulation', 'Monitor humidity levels seasonally', 'Verify no standing water near unit'],
    relocateCost: 'N/A - already good',
    improveCost: '$200-$800',
  },
];

const zones = [
  { label: 'North DFW (Frisco, McKinney, Plano)', peakTemp: 104 },
  { label: 'Central DFW (Dallas, Irving, Garland)', peakTemp: 107 },
  { label: 'South DFW (Mansfield, Midlothian, Waxahachie)', peakTemp: 106 },
  { label: 'West DFW (Fort Worth, Weatherford, Azle)', peakTemp: 108 },
];

export default function DFWAirHandlerLocationGuide() {
  const [locIdx, setLocIdx] = useState(0);
  const [zoneIdx, setZoneIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const loc = locations[locIdx];
  const zone = zones[zoneIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>Air Handler DFW HVAC Guide</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Air Handler Location Guide for DFW</h1>
        <p style={{ color: '#9BA4B4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Where your air handler sits matters more in DFW than almost anywhere in the country. When your attic hits 150 degrees and your air handler is inside it, you lose 30-40% of system efficiency before a single BTU reaches your living room.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Why Location is a DFW-Specific Problem</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['DFW attic peak temp', '140-160 degrees F in July-August'],
              ['National average attic', '120-130 degrees F peak'],
              ['Air handler casing effect', 'Sheet metal absorbs radiant heat and raises supply air temp 3-6 degrees F'],
              ['Annual AC hours DFW', '2,000-2,800 hours vs 1,200 nationally - losses compound severely'],
            ].map(([k, v]) => (
              <div key={k} style={{ background: '#162035', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>{k}</div>
                <div style={{ color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Assess My DFW System</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Current air handler location:</label>
            <select value={locIdx} onChange={e => { setLocIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {locations.map((l, i) => <option key={i} value={i}>{l.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>DFW climate zone:</label>
            <select value={zoneIdx} onChange={e => { setZoneIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {zones.map((z, i) => <option key={i} value={i}>{z.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Analyze My Location Impact
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 16 }}>Location Analysis: {loc.label}</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Efficiency loss estimate:</strong> {loc.efficiencyLoss}</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Operating environment:</strong> {loc.summerAtticTemp} in summer</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Your zone peak temp:</strong> {zone.peakTemp} degrees F</div>
              <div style={{ color: '#9BA4B4', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{loc.issue}</div>
              <div style={{ color: '#E8EAF0', fontWeight: 700, marginBottom: 8 }}>Improvement options:</div>
              {loc.options.map(opt => (
                <div key={opt} style={{ color: '#9BA4B4', fontSize: 14, marginBottom: 4 }}>- {opt}</div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                <div style={{ background: '#162035', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#9BA4B4', fontSize: 12, marginBottom: 4 }}>Improve in place</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{loc.improveCost}</div>
                </div>
                <div style={{ background: '#162035', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#9BA4B4', fontSize: 12, marginBottom: 4 }}>Full relocation</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{loc.relocateCost}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
