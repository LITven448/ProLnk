import { useState } from 'react';

const jobLocations = ['Downtown Dallas', 'Uptown / Turtle Creek', 'Las Colinas / Irving', 'DFW Airport area', 'Plano / Legacy', 'Fort Worth Downtown', 'Arlington / Mid-Cities', 'Frisco / Allen corridor'];
const targetAreas = ['Frisco / Prosper', 'McKinney / Allen', 'Southlake / Keller', 'Flower Mound / Lewisville', 'Colleyville / Grapevine', 'Rockwall / Forney', 'North Fort Worth / Keller', 'Mansfield / Midlothian'];

type RouteKey = string;
const routeData: Record<RouteKey, { estimate: string; warnings: string[]; dartNote: string; hybridImpact: string }> = {
  'Downtown Dallas|Frisco / Prosper': {
    estimate: '45–75 min each way during peak (7:30–9am / 5–6:30pm)',
    warnings: ['DNT (Dallas North Tollway) backs up south of Lebanon Rd every morning', 'Construction near 121 junction adds 10–20 min unpredictably', 'Friday afternoons northbound are brutal — plan to leave by 4pm or after 7pm'],
    dartNote: 'No direct DART rail to Frisco. Silver Line (DCTA) connects Denton but not Frisco core neighborhoods.',
    hybridImpact: '3 days in office = manageable. 5 days = quality of life impact is real at this distance.',
  },
  'Downtown Dallas|McKinney / Allen': {
    estimate: '40–65 min each way on US-75 during peak',
    warnings: ['US-75 (Central Expressway) is one of the worst corridors in DFW at rush hour', 'Campbell Rd interchange is a perpetual bottleneck', 'Consider timing — 7am departure is dramatically better than 8am'],
    dartNote: 'DART Red Line runs from downtown Dallas to Parker Rd (Plano) — then bus connection to Allen. Usable but slow.',
    hybridImpact: 'High hybrid impact — 2–3 days in office vs 5 saves 8–10 hours/week of commute time.',
  },
  'DFW Airport area|Southlake / Keller': {
    estimate: '15–25 min — one of the best airport-to-suburb commutes in DFW',
    warnings: ['SH-114 westbound can back up during school pickup times', 'Avoid SH-114 east toward DFW during heavy weather — accidents back up fast'],
    dartNote: 'No meaningful DART access from Southlake. Car-dependent.',
    hybridImpact: 'Low impact — even 5 days a week is manageable at this distance.',
  },
  'DFW Airport area|Flower Mound / Lewisville': {
    estimate: '20–35 min — strong option for airport-based workers',
    warnings: ['SH-121 near Grapevine is heavy during afternoon peak', 'FM 2499 / Long Prairie Rd is the preferred local bypass'],
    dartNote: 'No DART rail. Lewisville has bus connections but not practical for daily use.',
    hybridImpact: 'Very manageable. One of the better airport corridor commutes in DFW.',
  },
  'Plano / Legacy|McKinney / Allen': {
    estimate: '20–35 min — short and relatively painless',
    warnings: ['US-75 north of Legacy can back up during heavy rain', 'School zone timing near Allen High can create 10-min delays'],
    dartNote: 'DART rail runs between downtown, but not directly Legacy-to-McKinney without transfer.',
    hybridImpact: 'Minimal impact. This is one of the most commuter-friendly pairings in North DFW.',
  },
  'Fort Worth Downtown|North Fort Worth / Keller': {
    estimate: '25–45 min on I-35W or US-287 during peak',
    warnings: ['I-35W northbound from downtown Fort Worth is heavily congested 4:30–6:30pm', 'US-287 is less congested but stops for freight rail crossings'],
    dartNote: 'No rail connection. TEXRail runs Fort Worth to DFW Airport — not useful for North Fort Worth commutes.',
    hybridImpact: 'Moderate — 3-day hybrid makes North Fort Worth/Keller very livable. 5-day is manageable.',
  },
  'Las Colinas / Irving|Flower Mound / Lewisville': {
    estimate: '25–40 min via SH-114 or SH-121',
    warnings: ['SH-114 at MacArthur Blvd intersection backs up heavily during AM peak', 'Belt Line Rd surface roads are useful bypass but with stoplights'],
    dartNote: 'DART Orange Line serves Las Colinas — no direct service to Flower Mound from DART.',
    hybridImpact: 'Good pairing. Flower Mound to Las Colinas is one of the better suburban-to-suburban commutes.',
  },
};

function getRouteKey(job: string, area: string): RouteKey {
  return `${job}|${area}`;
}

export default function DFWCommuteResearchGuide() {
  const [jobLoc, setJobLoc] = useState('');
  const [targetArea, setTargetArea] = useState('');

  const key = jobLoc && targetArea ? getRouteKey(jobLoc, targetArea) : null;
  const route = key ? routeData[key] : null;
  const hasData = !!route;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🚗</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Commute Research Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 16, margin: 0 }}>DFW traffic is not like other cities. Test your commute before you buy — here\'s how.</p>
        </div>

        <div style={{ backgroundColor: '#FEF3C7', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F59E0B' }}>
          <p style={{ color: '#92400E', fontWeight: 600, margin: 0 }}>⚡ Do this before you buy: Drive your exact commute route on a Tuesday or Wednesday at 7:30am. Not a Saturday. Not on your phone\'s suggested route — drive it yourself. DFW traffic varies wildly by time and direction.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Estimate your commute</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>Where do you work?</label>
            <select value={jobLoc} onChange={e => setJobLoc(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #E2E8F0', fontSize: 15, color: '#0A1628', backgroundColor: '#F9FAFB' }}>
              <option value="">Select job location...</option>
              {jobLocations.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>Target home area?</label>
            <select value={targetArea} onChange={e => setTargetArea(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #E2E8F0', fontSize: 15, color: '#0A1628', backgroundColor: '#F9FAFB' }}>
              <option value="">Select target area...</option>
              {targetAreas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {jobLoc && targetArea && !hasData && (
            <div style={{ backgroundColor: '#F1F5F9', borderRadius: 10, padding: 20 }}>
              <p style={{ color: '#475569', margin: 0 }}>📍 Specific data not available for this combination. General advice: Use Google Maps in "Depart at" mode set to 7:30am on a Tuesday to get an accurate estimate. Then add 15 minutes for DFW unpredictability.</p>
            </div>
          )}
          {hasData && route && (
            <div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⏱️ Realistic commute estimate:</div>
                <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>{route.estimate}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>⚠️ Traffic warnings:</div>
                {route.warnings.map((w, i) => <div key={i} style={{ color: '#334155', marginBottom: 8, paddingLeft: 16, borderLeft: '3px solid #F5E642' }}>{w}</div>)}
              </div>
              <div style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <p style={{ color: '#166534', margin: 0 }}>🚆 <strong>DART / rail options:</strong> {route.dartNote}</p>
              </div>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#1E40AF', margin: 0 }}>🏠 <strong>Hybrid work impact:</strong> {route.hybridImpact}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>DFW commute research checklist</h2>
          {[
            { emoji: '📅', tip: 'Test the commute on a Tuesday/Wednesday at exact peak time — not weekends, not school holidays.' },
            { emoji: '📻', tip: 'Download Waze and check "traffic" overlay for your route before buying. Look at historical reports.' },
            { emoji: '🛤️', tip: 'Check TxDOT\’s upcoming construction projects — 5-year plans are public and show where lanes will close.' },
            { emoji: '🎒', tip: 'Research school start times near your home — school zones and carpool backup can add 10–20 min.' },
            { emoji: '💻', tip: 'Confirm your employer\’s actual hybrid policy in writing — DFW traffic changes the math dramatically at 5 vs 3 days.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <p style={{ color: '#334155', margin: 0 }}>{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
