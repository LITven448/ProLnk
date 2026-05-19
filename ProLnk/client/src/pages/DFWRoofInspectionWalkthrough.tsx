import { useState } from 'react';

const inspectionItems = [
  { area: 'Granule Loss', detail: 'Bare spots on shingles expose asphalt to UV — accelerates failure in DFW heat' },
  { area: 'Ridge Cap', detail: 'Top edge takes most wind stress; check for lifting, cracking, or missing pieces' },
  { area: 'Flashing', detail: 'Around chimney, skylights, and walls — most common DFW leak source after hail' },
  { area: 'Valleys', detail: 'Where two roof planes meet — heavy DFW rain concentrates flow here' },
  { area: 'Drip Edge', detail: 'Metal strip at roof edge — keeps water off fascia, often skipped in old installs' },
  { area: 'Attic Ventilation', detail: 'Inadequate ventilation causes premature shingle aging in DFW attic temps (160°F+)' },
  { area: 'Soffits & Fascia', detail: 'Water damage from ice dams (rare) or wind-driven rain in severe DFW storms' },
  { area: 'Pipe Boots', detail: 'Rubber boots around plumbing vents crack in DFW UV and heat — frequent leak source' },
];

const reportItems = [
  'Estimated remaining life (years) — ask for specific number, not "good condition"',
  'Photo documentation of every area found in need of repair',
  'Distinction between maintenance items vs replacement triggers',
  'Hail damage notation with approximate impact size',
  'Ventilation calculation (net free area) vs what\’s installed',
];

export default function DFWRoofInspectionWalkthrough() {
  const [roofAge, setRoofAge] = useState(10);
  const [lastInspection, setLastInspection] = useState(3);
  const [hadHail, setHadHail] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const urgencyScore = (roofAge >= 20 ? 3 : roofAge >= 12 ? 2 : 1) + (lastInspection >= 3 ? 2 : lastInspection >= 1 ? 1 : 0) + (hadHail ? 3 : 0);
  const urgency = urgencyScore >= 6 ? '🔴 Urgent — schedule within 2 weeks' : urgencyScore >= 4 ? '🟡 Soon — schedule within 60 days' : '🟢 Routine — schedule before next hail season';
  const inspectionType = hadHail ? 'Storm damage inspection (request report with hail impact documentation)' : roofAge >= 15 ? 'Full structural inspection with attic access' : 'Standard roof inspection';
  const method = roofAge >= 20 || hadHail ? 'Insist on inspector walking the roof, not drone-only' : 'Drone inspection acceptable for preliminary assessment';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Roof Inspection Walkthrough</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW gets 4–6 significant hail events per year. Here's what a proper roof inspection should cover and what you need in the report.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>🚁 Drone vs Walking the Roof</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Drone inspections miss granule loss texture, soft spots in decking, and flashing gaps. For insurance claims or roofs over 15 years old, require the inspector to physically walk the roof. Drone-only is acceptable for a quick pre-listing check or newer roofs with no storm history.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🔍 What a Proper DFW Inspection Covers</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {inspectionItems.map((item, i) => (
              <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: '0.9rem 1.1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', minWidth: 120, fontSize: '0.9rem' }}>{item.area}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Your Inspection Urgency</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Roof age (years)</label>
              <input type="number" min={1} max={40} value={roofAge} onChange={e => setRoofAge(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Years since last inspection</label>
              <input type="number" min={0} max={20} value={lastInspection} onChange={e => setLastInspection(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={hadHail} onChange={e => setHadHail(e.target.checked)} style={{ width: 18, height: 18 }} />
            Hail event in my area within the last 12 months
          </label>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>Get My Inspection Plan →</button>
          {showResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Urgency:</strong> {urgency}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Inspection type:</strong> {inspectionType}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Access method:</strong> {method}</div>
              <div><strong>DFW market cost:</strong> $150–$400 (free from roofer, but get independent opinion too)</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📋 What to Require in the Report</h2>
          {reportItems.map((item, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #F5E642′ }}>{item}</div>)}
        </div>
      </div>
    </div>
  );
}
