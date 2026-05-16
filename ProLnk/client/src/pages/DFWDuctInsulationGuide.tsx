import { useState } from 'react';

const locations = ['Attic (unconditioned)', 'Interior walls/ceiling', 'Crawl space', 'Garage'];
const rValues = ['R-4 or less', 'R-6', 'R-8', 'Unknown / not sure'];

const recommendations: Record<string, Record<string, { action: string; savings: string; cost: string }>> = {
  'Attic (unconditioned)': {
    'R-4 or less': { action: '🔴 Immediate upgrade required. DFW attics hit 150°F vs 55°F supply air = 95°F delta. R-4 allows massive heat gain — your system is working 30–40% harder than necessary. Upgrade to R-8 immediately.', savings: 'Est. 25–35% reduction in duct heat gain. $300–$500/year savings.', cost: '$2–$4 per linear ft to re-wrap existing flex duct' },
    'R-6': { action: '⚠️ Upgrade recommended. R-6 meets older code but not current DFW standards. DFW is climate zone 3 — R-8 is the current minimum for attic ducts. Schedule upgrade within 1 year.', savings: 'Est. 10–15% additional efficiency gain over R-6.', cost: '$1.50–$2.50 per linear ft to upgrade wrap' },
    'R-8': { action: '✅ Code compliant for DFW. R-8 meets current IECC requirements for climate zone 3. Verify insulation is intact with no gaps, tears, or compression.', savings: 'Already optimized. Focus on air sealing duct joints instead.', cost: 'Inspection only: $150–$250' },
    'Unknown / not sure': { action: '🔍 Schedule duct inspection. In DFW, assume R-4 or less if home is pre-2005 and ducts have never been replaced. Many DFW attic ducts were installed with R-4 foil wrap.', savings: 'Potential 20–35% savings if upgrading from low R-value.', cost: 'Inspection: $150–$250 + upgrade if needed' },
  },
  'Interior walls/ceiling': {
    'R-4 or less': { action: '⚠️ Marginal. Interior ducts face lower temperature swings than attic. R-4 is borderline acceptable for conditioned interior spaces in DFW.', savings: 'Modest gains from upgrade — prioritize attic ducts first.', cost: '$1–$2 per linear ft if upgrading' },
    'R-6': { action: '✅ Acceptable for interior locations. R-6 is adequate for interior walls and conditioned ceiling spaces in DFW homes.', savings: 'Diminishing returns for interior upgrades vs attic.', cost: 'No action needed' },
    'R-8': { action: '✅ Excellent. R-8 in interior spaces is above and beyond for DFW. Well optimized.', savings: 'Already maximized for this location.', cost: 'No action needed' },
    'Unknown / not sure': { action: '🔍 Low urgency for interior ducts. Check attic ducts first as they are far more impactful in DFW.', savings: 'Focus budget on attic duct insulation first.', cost: 'Inspection: $150–$250' },
  },
  'Crawl space': {
    'R-4 or less': { action: '⚠️ Upgrade recommended. Crawl space temps in DFW range 90–110°F in summer. R-4 is insufficient — heat gain and humidity are both concerns.', savings: 'Est. 10–20% efficiency gain from upgrade.', cost: '$1.50–$3 per linear ft to re-wrap' },
    'R-6': { action: '✅ Adequate for crawl space. R-6 meets DFW crawl space requirements. Prioritize moisture control alongside insulation.', savings: 'Acceptable. Check for vapor barrier below ducts.', cost: 'No urgent action' },
    'R-8': { action: '✅ Excellent for crawl space. Well insulated. Monitor for moisture damage to insulation annually.', savings: 'Already optimized.', cost: 'No action needed' },
    'Unknown / not sure': { action: '🔍 Inspect crawl space ducts. Check for sagging, disconnections, and moisture damage in addition to insulation level.', savings: 'Variable depending on current state.', cost: 'Inspection: $150–$300 including crawl space access' },
  },
  'Garage': {
    'R-4 or less': { action: '🔴 Upgrade needed. DFW garages reach 120°F+ in summer. Any duct passing through garage needs R-8 minimum.', savings: 'Est. 15–25% savings on duct runs through garage.', cost: '$2–$4 per linear ft' },
    'R-6': { action: '⚠️ Marginal for DFW garages. Garages see extreme temps. R-8 preferred for garage duct runs in DFW climate.', savings: 'Upgrade to R-8 yields additional 5–10% efficiency.', cost: '$1–$2 per linear ft to upgrade' },
    'R-8': { action: '✅ Correct for DFW garage conditions. R-8 handles the 120°F+ garage environment adequately.', savings: 'Already optimized.', cost: 'No action needed' },
    'Unknown / not sure': { action: '🔍 Inspect garage duct runs. They are often overlooked and under-insulated in DFW homes.', savings: 'Potentially significant if upgrade is needed.', cost: 'Inspection: $150–$250' },
  },
};

export default function DFWDuctInsulationGuide() {
  const [location, setLocation] = useState('');
  const [rValue, setRValue] = useState('');
  const result = location && rValue ? recommendations[location]?.[rValue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 Duct Insulation Guide for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          In DFW, your attic hits 150°F while conditioned air in your ducts is 55°F. That 95-degree delta is the enemy. Proper duct insulation is the single highest-ROI HVAC upgrade in North Texas.
        </p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ Why DFW Is Different</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW attics: 130–150°F July–August (some reaching 160°F on west-facing slopes)</li>
            <li>Supply air temperature: 52–58°F leaving the air handler</li>
            <li>Without R-8: air can gain 10–15°F before reaching vents</li>
            <li>Current DFW code (IECC climate zone 3): R-8 minimum for attic ducts</li>
            <li>Homes built before 2012 often have R-4 or bare metal ducts</li>
          </ul>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Upgrade Recommendation</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Duct location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value=''>Select location...</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current R-value (check label on duct wrap)</label>
          <select value={rValue} onChange={e => setRValue(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value=''>Select R-value...</option>
            {rValues.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>{result.action}</p>
            <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 8 }}>📈 {result.savings}</div>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>💰 {result.cost}</div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px 20px', background: '#132035', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Connect with a ProLnk-verified DFW HVAC contractor for a duct insulation assessment and free quote comparison.</p>
        </div>
      </div>
    </div>
  );
}
