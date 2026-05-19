import { useState } from 'react';

const drivewaySizes = ['1-car / Small (under 400 sq ft)', '2-car standard (400–700 sq ft)', 'Large / long (700–1,200 sq ft)', 'Extra large / circular (1,200+ sq ft)'];
const slopeTypes = ['Slopes toward garage / house', 'Flat (no visible slope)', 'Slopes away from house', 'Multi-directional / complex'];
const floodingSeverities = ['Rarely (1–2x per year)', 'Occasional (3–6x per year)', 'Frequent (every significant rain)', 'Severe (standing water for hours)'];

type DrainageResult = { solution: string; cost: string; timeline: string; notes: string; urgency: string; urgencyColor: string };

const getRecommendation = (size: string, slope: string, severity: string): DrainageResult => {
  if (slope === 'Slopes toward garage / house' && severity === 'Severe (standing water for hours)') {
    return { urgency: 'Critical', urgencyColor: '#DC2626', solution: 'Channel drain across driveway apron + regrading + underground outlet pipe to street or dry creek', cost: '$2,500–$6,500', timeline: '2–4 days', notes: 'Water pooling against garage door causes foundation damage, door frame rot, and eventual slab heave in DFW clay. This is a foundation-protection project, not cosmetic.' };
  }
  if (slope === 'Slopes toward garage / house' && severity === 'Frequent (every significant rain)') {
    return { urgency: 'High Priority', urgencyColor: '#EF4444', solution: 'Channel drain at low point + pop-up emitter outlet + concrete slope correction at apron', cost: '$1,800–$4,500', timeline: '1–3 days', notes: 'DFW clay keeps your driveway wet long after rain — even a shallow slope toward the house creates problems when soil is saturated.' };
  }
  if (slope === 'Flat (no visible slope)' && (severity === 'Frequent (every significant rain)' || severity === 'Severe (standing water for hours)')) {
    return { urgency: 'High Priority', urgencyColor: '#EF4444', solution: 'Regrade driveway surface for 1/8 to 1/4 inch per foot slope + channel drain at lowest point + French drain along edges', cost: '$2,000–$5,500', timeline: '2–4 days', notes: 'DFW clay absorbs almost no rainwater. A flat driveway becomes a pond. Proper slope to a channel drain is the permanent fix.' };
  }
  if (slope === 'Slopes away from house' && severity === 'Rarely (1–2x per year)') {
    return { urgency: 'Low Priority', urgencyColor: '#22C55E', solution: 'Seal cracks to prevent clay infiltration + confirm street gutter is clear + monitor annually', cost: '$200–$800', timeline: 'Half day', notes: 'Your slope is correct. Occasional puddles are likely a grading low-spot or blocked outlet. Clear gutters and downspout extensions before spending on drainage.' };
  }
  if (slope === 'Multi-directional / complex' || size === 'Extra large / circular (1,200+ sq ft)') {
    return { urgency: 'Moderate', urgencyColor: '#EAB308', solution: 'Drainage engineering assessment + combination: channel drains + pop-up emitters + dry creek bed as decorative outlet feature', cost: '$3,500–$12,000', timeline: '3–7 days', notes: 'Complex driveways require mapping water flow paths during actual rain. A drainage contractor should walk the site during or after a storm for accurate diagnosis.' };
  }
  if (severity === 'Occasional (3–6x per year)') {
    return { urgency: 'Moderate', urgencyColor: '#EAB308', solution: 'Pop-up emitter to extend downspouts away from driveway + edge French drain on uphill side + crack sealing', cost: '$800–$2,500', timeline: '1–2 days', notes: 'Occasional pooling is often caused by downspouts or roof runoff landing on the driveway, not drainage failure. Extend all downspouts 4–6 feet from driveway before investing in drains.' };
  }
  return { urgency: 'Low to Moderate', urgencyColor: '#EAB308', solution: 'Inspect current drainage outlets for blockage + extend downspouts + monitor slope at problem areas', cost: '$300–$1,500', timeline: '1 day', notes: 'Start with the simple fixes: clear gutters, extend downspouts, check that street gutter drain is not blocked. Most DFW driveway drainage problems are downstream blockages.' };
};

export default function DFWDrivewayDrainageGuide() {
  const [size, setSize] = useState('');
  const [slope, setSlope] = useState('');
  const [severity, setSeverity] = useState('');
  const result = size && slope && severity ? getRecommendation(size, slope, severity) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1E35', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME SERVICES GUIDE · 2026</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.2 }}>🌊 Driveway Drainage Guide for DFW Homeowners</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, lineHeight: 1.6 }}>DFW clay soil is almost impermeable — when 3 inches of rain falls in an hour (which happens regularly), your driveway becomes a river. Water that pools against your garage or house foundation causes slab movement, door frame rot, and mold. Drainage is not a cosmetic issue in DFW.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{ label: '📐 Driveway Size', val: size, set: setSize, opts: drivewaySizes }, { label: '📉 Slope Direction', val: slope, set: setSlope, opts: slopeTypes }, { label: '🌧️ Flooding Frequency', val: severity, set: setSeverity, opts: floodingSeverities }].map(({ label, val, set, opts }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {opts.map(o => (
                  <button key={o} onClick={() => set(o)} style={{ background: val === o ? '#F5E642′ : '#1A2D4A', color: val === o ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontWeight: val === o ? 700 : 400, fontSize: 13, textAlign: 'left', transition: 'all 0.15s' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {result ? (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, borderLeft: `4px solid ${result.urgencyColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ background: result.urgencyColor, color: '#FFFFFF', fontWeight: 800, fontSize: 12, padding: '4px 14px', borderRadius: 20 }}>{result.urgency.toUpperCase()}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Est. timeline: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{result.timeline}</span></span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.4 }}>{result.solution}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost: </span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</span>
            </div>
            <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>💡 {result.notes}</div>
          </div>
        ) : (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8′ }}>Select your driveway size, slope direction, and flooding frequency to get a drainage recommendation.</div>
        )}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ icon: '🚿', title: 'Channel Drains', text: 'A linear channel drain across the driveway catches surface runoff and pipes it underground to a street outlet or pop-up emitter. Best solution when water flows across the full driveway width.' }, { icon: '🌱', title: 'Dry Creek Beds', text: 'A decorative gravel channel that carries water from driveway to street or rear yard. DFW homeowners love these — they handle drainage and look intentional. Works best with gentle slopes.' }, { icon: '🔄', title: 'Pop-Up Emitters', text: 'Install at the outlet of underground drainage pipes. They close when no water flows (keeping critters out) and open automatically under water pressure. Required at all underground drain terminations.' }, { icon: '🏗️', title: 'Concrete vs. Asphalt', text: 'Concrete can be saw-cut and resurfaced with proper drainage slopes. Asphalt is easier to regrade when hot. Neither material absorbs water in DFW — all runoff must go somewhere. The somewhere needs to be planned.' }].map(({ icon, title, text }) => (
            <div key={title} style={{ background: '#1A2D4A', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6, fontSize: 15 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
