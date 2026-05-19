import { useState } from 'react';

const projectTypes = ['Deck framing (pressure-treated lumber)', 'Deck decking boards', 'Fence posts and rails', 'Pergola / arbor structure', 'Exterior door / window trim', 'Concrete anchor / ledger attachment', 'Outdoor furniture assembly'];
const dfwExposures = ['Full sun + rain (south or west facing)', 'Partial shade, typical yard', 'Near drainage / standing water area', 'Coastal or lake property (salt air)', 'Covered patio / protected from direct rain'];

function getFastenerRecommendation(project: string, exposure: string) {
  const salt = exposure === 'Coastal or lake property (salt air)';
  const wet = exposure === 'Near drainage / standing water area' || exposure === 'Full sun + rain (south or west facing)';

  if (project === 'Deck framing (pressure-treated lumber)') {
    return {
      fastener: salt ? 'Hot-dipped galvanized or 316 stainless steel' : 'Hot-dipped galvanized (HDG) or G185 coated',
      color: '#00CC66',
      risk: salt ? 'HIGH corrosion risk' : 'MODERATE corrosion risk',
      detail: 'PT lumber treated with MCA or CA-C is corrosive to standard zinc-plated fasteners. DFW\’s humidity accelerates the reaction. Standard bright nails will fail within 2–5 years in PT framing.',
      avoid: 'Avoid: standard zinc-plated nails, aluminum hardware (reacts with PT chemicals), electroplated galvanized.',
      lifespan: salt ? '15–25 years with 316 SS' : '20–30 years with proper HDG hardware',
    };
  }
  if (project === 'Deck decking boards') {
    return {
      fastener: salt ? '316 stainless steel screws or hidden fastener system' : 'Coated deck screws (ACQ-rated, ceramic or polymer coated)',
      color: '#00CC66',
      risk: wet ? 'HIGH corrosion risk' : 'MODERATE corrosion risk',
      detail: 'DFW deck surfaces see standing water from spring rains and heavy dew. Standard deck screws corrode and stain composite and hardwood decking. ACQ-rated coated screws are the DFW minimum.',
      avoid: 'Avoid: drywall screws, standard zinc, uncoated steel. These will rust and streak through decking within 1–3 DFW seasons.',
      lifespan: salt ? '20–30 years SS' : '10–20 years coated screws depending on finish quality',
    };
  }
  if (project === 'Fence posts and rails') {
    return {
      fastener: salt ? 'Hot-dipped galvanized or 316 SS carriage bolts and joist hangers' : 'Hot-dipped galvanized (HDG) screws and hardware',
      color: '#F5E642',
      risk: 'MODERATE corrosion risk',
      detail: 'DFW soil — particularly in areas near creek drains and heavy clay zones — retains moisture around fence posts. Soil contact accelerates fastener corrosion even in non-coastal zones.',
      avoid: 'Avoid: standard coated screws at soil-contact points. Use concrete post anchors rather than direct-burial where possible to reduce contact corrosion.',
      lifespan: '15–25 years with HDG; 5–10 years with standard zinc in wet DFW soil conditions',
    };
  }
  if (project === 'Concrete anchor / ledger attachment') {
    return {
      fastener: 'Code-approved structural anchors: Simpson Strong-Tie or Hilti with specified corrosion rating',
      color: '#F5E642',
      risk: wet || salt ? 'HIGH corrosion risk' : 'MODERATE corrosion risk',
      detail: 'Ledger-to-concrete connections are life-safety connections. DFW\’s humidity means standard zinc lag screws used in concrete anchor systems can corrode enough within 10–15 years to lose significant holding strength.',
      avoid: 'Never use generic lag screws or standard hardware store anchors for structural ledger connections. Always use rated anchors per IRC Table R507.9.1.',
      lifespan: 'Stainless or HDG structural anchors: 30–50 years. Inspectable every 10 years.',
    };
  }
  return {
    fastener: salt ? '316 stainless steel' : wet ? 'Hot-dipped galvanized or polymer-coated' : 'Coated exterior screws (ACQ-compatible)',
    color: '#00AAFF',
    risk: salt ? 'HIGH' : wet ? 'MODERATE-HIGH' : 'MODERATE',
    detail: `For ${project.toLowerCase()} in DFW's climate, fastener selection directly determines how long your project lasts before visible corrosion, staining, or structural failure. DFW's humidity (avg 65% RH) plus its soil chemistry create a corrosive baseline even without salt air.`,
    avoid: 'Avoid: uncoated bright steel, standard drywall or zinc screws for any exterior DFW application.',
    lifespan: salt ? '20–30 years with SS' : wet ? '10–20 years with HDG' : '10–15 years with quality coated fasteners',
  };
}

export default function DFWFasteningGuide() {
  const [project, setProject] = useState('');
  const [exposure, setExposure] = useState('');
  const result = project && exposure ? getFastenerRecommendation(project, exposure) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Outdoor Projects Series</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>Fastening & Hardware Guide for DFW</h1>
        <p style={{ color: '#8899BB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Wrong fasteners are the silent killer of DFW outdoor projects. Humidity, PT lumber chemistry, clay soil salts, and lake-area air accelerate corrosion faster than most homeowners expect.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚗️', title: 'PT Lumber + Zinc = Problem', body: 'Modern pressure-treated lumber uses copper-based preservatives (MCA, CA-C) that are highly corrosive to standard zinc-plated fasteners. This reaction is accelerated by DFW humidity. Always use HDG or stainless hardware with PT lumber.' },
            { icon: '🌊', title: 'DFW Soil Salts', body: 'DFW\’s alkaline clay soils — especially near creeks and drainage zones in areas like Rockwall, Rowlett, and Grapevine — contain elevated mineral content that accelerates fastener corrosion at soil-contact points. This is distinct from coastal salt air but real.' },
            { icon: '🔬', title: 'Fastener Metal Hierarchy', body: '316 Stainless > Hot-Dipped Galvanized > G185 Coated > Polymer/Ceramic Coated > Electroplated Galvanized > Standard Zinc. Move up the hierarchy as exposure and moisture increase.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899BB', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Fastener Recommendation Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Project type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select project...</option>
              {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>DFW exposure conditions</label>
            <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select exposure...</option>
              {dfwExposures.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, color: result.color, fontSize: 15, marginBottom: 4 }}>CORROSION RISK: {result.risk}</div>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>✅ USE: {result.fastener}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{result.detail}</div>
              <div style={{ color: '#FF8C00', fontSize: 13, marginBottom: 6 }}>🚫 {result.avoid}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>⏳ Expected lifespan: {result.lifespan}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#0F2040', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#8899BB', fontSize: 12, lineHeight: 1.6 }}>⚠️ Structural fastener specifications for decks and ledgers must comply with local DFW building codes. Always pull permits for attached deck structures. Consult your contractor for code-specific hardware requirements.</div>
        </div>
      </div>
    </div>
  );
}
