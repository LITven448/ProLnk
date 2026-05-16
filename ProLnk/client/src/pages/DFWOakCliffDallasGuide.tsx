import { useState } from 'react';

const homeDecades = [
  { label: '1920s-1930s (Craftsman / Tudor Era)', value: '1920s' },
  { label: '1940s-1950s (Post-War Bungalow)', value: '1940s' },
  { label: '1960s-1970s (Mid-Century Transitional)', value: '1960s' },
];
const renovationStatuses = [
  { label: 'Original / Minimally Updated', value: 'original' },
  { label: 'Partially Renovated', value: 'partial' },
  { label: 'Fully Renovated / Gut Rehab', value: 'full' },
];

const data: Record<string, Record<string, { issues: string[]; opportunities: string[] }>> = {
  '1920s': {
    original: { issues: ['Knob-and-tube wiring (fire hazard, insurance issue)', 'Lead paint throughout (EPA disclosure required)', 'Cast iron drain lines (root intrusion, deterioration)', 'Foundation pier shifting on clay soil', 'No insulation in walls — energy inefficient'], opportunities: ['Craftsman detail restoration commands premium resale', 'Historic tax credits may apply', 'Bishop Arts proximity = highest renovation ROI in Dallas', 'Gut rehab potential: $180-300K investment → $600K+ value'] },
    partial: { issues: ['Mixed systems (new HVAC on old electrical = risk)', 'Partial updates may not meet current code', 'Plumbing transitions (copper to cast iron joints)', 'Hidden moisture damage under partial renovations'], opportunities: ['Finish the job: full renovation ROI excellent here', 'Preserve period details — buyers pay premium', 'Outdoor space development (Oak Cliff lots are larger)'] },
    full: { issues: ['Verify permit history on all work done', 'Structural changes need engineer sign-off', 'Check for proper vapor barriers and waterproofing'], opportunities: ['Fully renovated 1920s home: top-of-market in Oak Cliff', 'Short-term rental income potential near Bishop Arts', 'ADU / garage apartment addition (zoning permitting)'] },
  },
  '1940s': {
    original: { issues: ['Asbestos in floor tiles, insulation, roof shingles', 'Single-pane steel windows (inefficient + failure prone)', 'Galvanized steel supply lines (corrosion, low pressure)', 'Undersized electrical service (60A typical)', '2x4 framing — limited insulation capacity'], opportunities: ['$150-200K renovation budget typical for full update', 'Bungalow floor plans: open up kitchen = huge value add', 'Mature trees and larger lots: landscaping premium'] },
    partial: { issues: ['Asbestos may remain in untouched areas', 'Mixing old and new plumbing systems', 'Electrical patchwork: panel may not match load'], opportunities: ['Target kitchen and primary bath: highest ROI rooms', 'HVAC upgrade with mini-splits common in these footprints'] },
    full: { issues: ['Ensure asbestos abatement was documented', 'Structural engineer review of any wall removals'], opportunities: ['Market-ready with premium positioning', 'Oak Cliff demand is outpacing supply — hold time low'] },
  },
  '1960s': {
    original: { issues: ['Aluminum wiring in some homes (fire risk with modern loads)', 'Original HVAC oversized for current efficiency standards', 'Flat or low-slope roofs common — drainage issues', 'Concrete slab foundations — watch for moisture intrusion'], opportunities: ['Mid-century modern market is HOT in Dallas right now', 'Preserve original details: terrazzo, built-ins, clerestory windows', 'Renovation budget $80-150K for targeted updates'] },
    partial: { issues: ['Check aluminum wiring remediation was done correctly', 'Flat roof patches fail — may need full replacement'], opportunities: ['MCM buyers pay 15-25% premium for well-preserved originals', 'Pool or outdoor space addition common ROI play'] },
    full: { issues: ['Flat roof replacement is expensive ($15-25K range)', 'Ensure modern insulation was installed in walls'], opportunities: ['Fully renovated MCM in Oak Cliff: strong short and long-term value', 'Design-forward buyers = faster sales at premium price'] },
  },
};

export default function DFWOakCliffDallasGuide() {
  const [decade, setDecade] = useState('');
  const [status, setStatus] = useState('');
  const result = decade && status ? data[decade]?.[status] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏘️ Oak Cliff Dallas Homeowner Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>Oak Cliff is one of Dallas's most dynamic neighborhoods — historic homes near Bishop Arts, Kessler Park, and Stevens Park Golf Course. Renovation demand is high, contractor expertise in historic preservation matters.</p>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🏠 Home Decade</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeDecades.map(d => (
              <button key={d.value} onClick={() => setDecade(d.value)} style={{ background: decade === d.value ? '#F5E642' : '#1E2D45', color: decade === d.value ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{d.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔨 Renovation Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {renovationStatuses.map(r => (
              <button key={r.value} onClick={() => setStatus(r.value)} style={{ background: status === r.value ? '#F5E642' : '#1E2D45', color: status === r.value ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{r.label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⚠️ Common Issues for This Era</div>
              {result.issues.map((item, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #F97316' }}>{item}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>💡 Renovation Opportunities</div>
              {result.opportunities.map((item, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #22D3EE' }}>{item}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#111D30', borderRadius: 12, padding: 18, color: '#94A3B8', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk Tip: </span>Oak Cliff historic work requires contractors familiar with City of Dallas historic overlay rules. Always verify permits before hiring — unpermitted work kills resale value here.
        </div>
      </div>
    </div>
  );
}
