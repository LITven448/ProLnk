import { useState } from 'react';

const HOME_AGES = [
  { label: 'Built before 1980', value: 'pre80' },
  { label: '1980–2000', value: '80s90s' },
  { label: '2000–2015', value: '00s' },
  { label: '2015 or newer', value: 'new' },
];

const CONCERN_LEVELS = [
  { label: 'No visible cracks', value: 'none' },
  { label: 'Hairline cracks only', value: 'hairline' },
  { label: 'Stair-step cracks', value: 'stairstep' },
  { label: 'Doors sticking / visible gaps', value: 'active' },
];

const RECS: Record<string, Record<string, { approach: string; cost: string; escalate: string }>> = {
  pre80: {
    none: { approach: 'Annual engineer inspection + crack gauge installation on existing cracks', cost: '$300–$500/yr', escalate: 'Any crack wider than 1/4 inch or new stair-step pattern' },
    hairline: { approach: 'Plumbase or ZipLevel monitoring + crack gauges + bi-annual inspection', cost: '$500–$900/yr', escalate: 'Crack width increase >1/16 inch between seasons' },
    stairstep: { approach: 'Plumbase continuous monitoring + engineer evaluation now', cost: '$800–$1,500/yr', escalate: 'Immediate — schedule structural engineer this week' },
    active: { approach: 'Emergency structural engineer assessment — do not delay', cost: '$500–$1,000 assessment', escalate: 'Immediately — active movement requires engineering review' },
  },
  "80s90s": {
    none: { approach: 'Crack gauge on any visible cracks + bi-annual monitoring', cost: '$200–$400/yr', escalate: 'New cracks appearing or existing ones widening' },
    hairline: { approach: 'Crack gauges + annual engineer review', cost: '$300–$600/yr', escalate: 'Seasonal movement exceeding 1/8 inch' },
    stairstep: { approach: 'Plumbase monitoring + engineer inspection', cost: '$600–$1,200/yr', escalate: 'Movement observed between quarterly checks' },
    active: { approach: 'Structural engineer + continuous Plumbase monitoring', cost: '$900–$2,000/yr', escalate: 'Active movement — escalate immediately' },
  },
  "00s": {
    none: { approach: 'Visual inspection annually + note any door/window issues', cost: '$0–$200/yr', escalate: 'First appearance of stair-step cracks or door sticking' },
    hairline: { approach: 'Crack gauges + annual monitoring', cost: '$150–$350/yr', escalate: 'Crack growth beyond typical seasonal range' },
    stairstep: { approach: 'Engineer inspection + Plumbase or crack monitoring', cost: '$400–$800/yr', escalate: 'Doors or windows showing frame distortion' },
    active: { approach: 'Structural engineer assessment + continuous monitoring', cost: '$700–$1,500/yr', escalate: 'Immediate — active movement at this age is a red flag' },
  },
  new: {
    none: { approach: 'Self-monitoring: photograph and date any crack appearances', cost: '$0/yr', escalate: 'Any stair-step crack or door alignment change' },
    hairline: { approach: 'Crack gauge + photo documentation + annual review', cost: '$100–$200/yr', escalate: 'Crack grows beyond hairline over one season' },
    stairstep: { approach: 'Engineer consultation — unexpected at this age', cost: '$300–$600 assessment', escalate: 'Immediately — this is atypical and warrants professional review' },
    active: { approach: 'Structural engineer now — may be a construction defect issue', cost: '$500–$1,000 assessment', escalate: 'Immediately — document and contact builder if under warranty' },
  },
};

export default function DFWFoundationMonitoringGuide() {
  const [age, setAge] = useState('' );
  const [concern, setConcern] = useState('');
  const rec = age && concern ? RECS[age][concern] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Foundation Monitoring Guide</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW sits on expansive clay soil that swells with rain and shrinks in drought — sometimes shifting 2–3 inches seasonally. Monitoring separates normal movement from structural risk.
        </p>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌍 DFW Clay Soil: What You Are Dealing With</h2>
          {[
            ['🌧️ Wet season', 'Clay absorbs water and expands — foundation lifts'],
            ['☀️ Drought', 'Clay dries and shrinks — foundation sinks unevenly'],
            ['📐 Differential movement', 'Edges move more than center — this is where damage occurs'],
            ['💧 Watering the foundation', '$30/mo soaker hose prevents $12,000 pier installation'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 20, flexShrink: 0 }}>{title as string}</div>
              <div style={{ fontSize: 14, color: '#8899AA', paddingTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📏 Monitoring Tools Available</h2>
          {[
            ['📍 Monitoring Pins', 'Steel pins set in slab at strategic points — measured quarterly to detect differential movement to 1/16 inch accuracy'],
            ['📊 Plumbase', 'Continuous electronic foundation monitoring service with alerts. Used by structural engineers in DFW'],
            ['📐 Crack Gauges', 'Plastic or plaster gauges installed over cracks to measure movement over time. Low cost, high value'],
            ['🔬 Annual Engineering Inspection', 'Structural engineer uses ZipLevel or water manometer to measure elevation across the entire slab'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ borderBottom: '1px solid #1E2D45', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#8899AA' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Monitoring Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>Home Age</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {HOME_AGES.map(a => (
                <button key={a.value} onClick={() => setAge(a.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: age === a.value ? '#F5E642' : '#0A1628',
                    color: age === a.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>Current Foundation Concern Level</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {CONCERN_LEVELS.map(c => (
                <button key={c.value} onClick={() => setConcern(c.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: concern === c.value ? '#F5E642' : '#0A1628',
                    color: concern === c.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{rec.approach}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ background: '#1E2D45', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 12, color: '#8899AA', marginBottom: 4 }}>ESCALATE TO ENGINEER IF:</div>
                <div style={{ fontSize: 14, color: '#FF6B6B' }}>⚠️ {rec.escalate}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <a href="/get-quotes" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Get a DFW Foundation Quote →
          </a>
        </div>
      </div>
    </div>
  );
}