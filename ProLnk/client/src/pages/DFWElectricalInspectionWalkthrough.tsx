import { useState } from 'react';

const inspectionAreas = [
  { area: 'Main Panel', detail: 'Breaker labeling accuracy, double-tapped breakers, aluminum wiring presence, rust or burn marks' },
  { area: 'GFCI Testing', detail: 'All kitchen, bath, garage, outdoor, and unfinished basement circuits — must trip and reset properly' },
  { area: 'AFCI Breakers', detail: 'Required by 2008+ NEC code in bedrooms — homes built before 2008 rarely have them' },
  { area: 'Visible Wiring', detail: 'Knob-and-tube remnants, improper splices in attic/crawl, romex stapled correctly' },
  { area: 'Smoke & CO Detectors', detail: 'Location per code (within 10ft of each bedroom), battery vs hardwired, interconnected' },
  { area: 'Outlet Testing', detail: 'All outlets tested for hot/neutral/ground correctness, reversed polarity flagged' },
  { area: 'Subpanels', detail: 'Detached garage, outbuilding, or workshop subpanels — ground/neutral bonding checked' },
  { area: 'Service Entry', detail: 'Overhead weather head or underground lateral — insulation, clearances, meter socket condition' },
];

const immediateActions = [
  'Double-tapped breakers (two wires on one breaker) — fire hazard, fix before next use',
  'Aluminum branch wiring to outlets — requires CO/ALR outlets or pigtailing',
  'Missing GFCI protection in wet areas — code violation and shock risk',
  'Scorch marks or burning smell at any panel or junction box',
  'Exposed wiring in attic or wall cavities without protection',
];

export default function DFWElectricalInspectionWalkthrough() {
  const [homeAge, setHomeAge] = useState(20);
  const [concerns, setConcerns] = useState({ panel: false, outlets: false, safety: false, addition: false });
  const [showResult, setShowResult] = useState(false);

  const toggle = (key: keyof typeof concerns) => setConcerns(prev => ({ ...prev, [key]: !prev[key] }));

  const focusAreas: string[] = [
    homeAge >= 40 ? '⚡ Full wiring audit — homes from 1960s–1980s may have aluminum branch wiring' : '',
    homeAge >= 25 ? '🔌 Panel inspection for FPE Stab-Lok or Zinsco brands — recall history, fire risk' : '',
    concerns.panel ? '🔋 Load capacity analysis — confirm panel can handle modern appliances and EV charger if needed' : '',
    concerns.outlets ? '🔎 Full outlet map and GFCI/AFCI compliance review' : '',
    concerns.safety ? '🚨 Prioritize smoke/CO detector placement and interconnect verification' : '',
    concerns.addition ? '📐 Permit pull verification for any additions — ensure work was to code' : '',
  ].filter(Boolean);

  const urgency = concerns.safety || homeAge >= 50 ? '🔴 Urgent — schedule within 2 weeks' : homeAge >= 30 || Object.values(concerns).some(Boolean) ? '🟡 Soon — schedule within 60 days' : '🟢 Routine — add to next annual checklist';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Electrical Inspection Walkthrough</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Electrical issues are the leading cause of residential fires. A proper inspection goes well beyond flipping breakers — here's what it should cover and what findings demand immediate action.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>📋 When to Add Electrical to a Home Inspection</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Always request a dedicated electrical inspection (separate from general home inspection) for homes over 30 years old, any home with a Federal Pacific or Zinsco panel, homes with additions or remodels of unknown permit status, or any home you plan to add an EV charger or solar to.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🔍 What Gets Inspected</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {inspectionAreas.map((item, i) => (
              <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: '0.9rem 1.1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', minWidth: 140, fontSize: '0.85rem' }}>{item.area}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Your Inspection Focus Areas</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Home age (years)</label>
            <input type="number" min={1} max={100} value={homeAge} onChange={e => setHomeAge(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Specific concerns</div>
            {[['panel', '⚡ Panel issues or breakers frequently tripping'], ['outlets', '🔌 Outlets that don\’t work or sparks on plug-in'], ['safety', '🚨 No smoke detectors or CO detectors present'], ['addition', '🏗️ Addition or remodel of unknown permit status']].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={concerns[key as keyof typeof concerns]} onChange={() => toggle(key as keyof typeof concerns)} style={{ width: 18, height: 18 }} />
                {label}
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>Get My Inspection Plan →</button>
          {showResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Urgency:</strong> {urgency}</div>
              {focusAreas.length > 0 && <div style={{ marginBottom: '0.25rem' }}><strong>Ask inspector to focus on:</strong></div>}
              {focusAreas.map((f, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '0.3rem' }}>→ {f}</div>)}
              <div style={{ marginTop: '0.5rem' }}><strong>DFW market cost:</strong> $200–$500 for dedicated electrical inspection</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#ef4444′ }}>🚨 Findings That Require Immediate Action</h2>
          {immediateActions.map((item, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #ef4444′ }}>{item}</div>)}
        </div>
      </div>
    </div>
  );
}
