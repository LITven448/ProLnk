import { useState } from 'react';

const projectTypes = ['Panel Upgrade (200A)', 'EV Charger Installation (Level 2)', 'Whole Home Rewire', 'Outlet / Switch Repair', 'Generator Hookup', 'Lighting Installation', 'Circuit Addition'];
const areas = ['Plano / Allen', 'Frisco / McKinney', 'North Dallas', 'Irving / Las Colinas', 'Arlington / Mansfield', 'Fort Worth', 'Garland / Mesquite', 'Denton / Lewisville'];

const projectData: Record<string, { conditions: string; waitTime: string; priceRange: string; permitNote: string; evNote?: string }> = {
  'Panel Upgrade (200A)': {
    conditions: '🔴 Very tight — Panel upgrades are in high demand due to older DFW housing stock and EV adoption. Master electricians fully booked.',
    waitTime: '3–8 weeks for licensed master electrician',
    priceRange: '$2,500–$5,500',
    permitNote: 'Permit required in all DFW municipalities. Requires TDLR-licensed master electrician. Inspection required before energizing.',
  },
  'EV Charger Installation (Level 2)': {
    conditions: '🟠 Tight and growing — EV adoption in DFW is accelerating. This work type is creating significant pressure on electrician availability.',
    waitTime: '2–5 weeks',
    priceRange: '$800–$2,200 (depends on panel capacity)',
    permitNote: 'Permit required. Some older DFW homes need panel upgrade first — budget accordingly.',
    evNote: '⚡ DFW EV registrations doubled from 2022–2025. Electricians specializing in EV installs are the fastest-growing specialty.',
  },
  'Whole Home Rewire': {
    conditions: '🔴 Critical — Complex work, fewer qualified contractors. Very long lead times.',
    waitTime: '6–16 weeks',
    priceRange: '$8,000–$25,000+',
    permitNote: 'Multiple inspections required. Asbestos abatement may be needed in pre-1980 DFW homes.',
  },
  'Outlet / Switch Repair': {
    conditions: '🟢 Accessible — General electricians and journeymen can handle. Better availability than complex work.',
    waitTime: '3–10 days',
    priceRange: '$150–$400',
    permitNote: 'Permit usually not required for simple device replacements. Check local municipality.',
  },
  'Generator Hookup': {
    conditions: '🟠 Spike after weather events — Post-ice storm demand surge can push wait times to 4–8 weeks.',
    waitTime: '2–6 weeks (baseline); 6–12 weeks post-storm',
    priceRange: '$500–$1,800 for transfer switch + hookup',
    permitNote: 'Permit required in most DFW cities. Gas line coordination needed for standby generators.',
  },
  'Lighting Installation': {
    conditions: '🟢 Good availability — Many qualified electricians handle this. Schedule 1–2 weeks out.',
    waitTime: '5–14 days',
    priceRange: '$200–$1,200 depending on scope',
    permitNote: 'Generally no permit for fixture swaps. New circuits require permit.',
  },
  'Circuit Addition': {
    conditions: '🟡 Moderate — Requires licensed electrician. Growing demand from kitchen remodels and home offices.',
    waitTime: '1–3 weeks',
    priceRange: '$350–$900 per circuit',
    permitNote: 'Permit required. Must pull from existing panel capacity — may require panel upgrade.',
  },
};

const areaInsights: Record<string, string> = {
  'Frisco / McKinney': '🏗️ New construction boom consumes large portion of licensed electrician time. Plan extra lead time.',
  'Garland / Mesquite': '🏚️ High concentration of pre-1970 homes with 60A or 100A panels. Upgrades very common here.',
  'Irving / Las Colinas': '🏢 Heavy commercial/industrial demand competes with residential for licensed electricians.',
};

export default function DFWElectricalMarketGuide() {
  const [projectType, setProjectType] = useState('');
  const [area, setArea] = useState('');

  const result = projectType ? projectData[projectType] : null;
  const areaNote = area ? areaInsights[area] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MARKET GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚡ DFW Electrical Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>DFW has a licensed electrician shortage that is getting worse, not better. TDLR data shows the licensed electrician pipeline has not kept pace with DFW's explosive growth. EV charger demand is adding new pressure on top of already-constrained capacity.</p>

        <div style={{ backgroundColor: '#1a2f4e', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📊 The DFW Electrician Shortage — By The Numbers</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Texas requires a 4-year apprenticeship + journeyman license + additional years for master electrician status. With DFW adding 100,000+ new residents per year, the licensed electrician base is structurally short. TDLR data shows commercial projects routinely outbid residential work, pulling talent away from homeowner projects.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[['🔋', 'EV Pressure', 'Level 2 charger installs are the fastest-growing DFW electrical request. Adding weeks to every queue.'], ['🏗️', 'Growth vs Supply', 'DFW adds ~300 new homes/day. Licensed electrician supply grows at a fraction of that rate.'], ['📋', 'Permits Matter', 'Most DFW electrical work requires permits. Unpermitted work creates liability at resale.']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Project + Area Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Project Type</label>
              <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select project...</option>
                {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select area...</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {areaNote && <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14, color: '#F5E642′ }}>{areaNote}</div>}
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ marginBottom: 10 }}>{result.conditions}</div>
              {result.evNote && <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 13, color: '#F5E642′ }}>{result.evNote}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
                <div><span style={{ color: '#94a3b8', fontSize: 13, display: 'block' }}>Typical Wait Time</span><span style={{ fontWeight: 700, color: '#F5E642′ }}>{result.waitTime}</span></div>
                <div><span style={{ color: '#94a3b8', fontSize: 13, display: 'block' }}>Price Range</span><span style={{ fontWeight: 700, color: '#F5E642′ }}>{result.priceRange}</span></div>
              </div>
              <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 10, fontSize: 13, color: '#94a3b8′ }}>📋 Permit Note: {result.permitNote}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Get Matched With a Licensed DFW Electrician</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 12 }}>ProLnk verifies TDLR licensing and insurance on every electrical contractor before you see them.</div>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '10px 24px', borderRadius: 8, display: 'inline-block' }}>Join ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
