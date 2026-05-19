import { useState } from 'react';

const situations = [
  {
    id: 'ac_old',
    label: 'My AC is 12+ years old and runs constantly in summer',
    mindset: 'Safety & Function First',
    framework: [
      '🌡️ In DFW, a failing AC is not a comfort issue — it\’s a safety issue. Temps above 100°F kill people in homes without cooling.',
      '💡 Proactive replacement before failure = your choice of timing, contractor, and unit. Emergency replacement = premium pricing and whatever is available.',
      '📊 New high-efficiency unit (18+ SEER) cuts your electric bill 30-40% in DFW — often pays back in 5-7 years.',
      '⚡ DFW grid stress in summer means more power outages. Consider a unit with battery-compatible design.',
    ],
    approach: 'Hire a licensed HVAC pro',
    timeline: 'Before June or before next summer',
    diy: false,
    reason: 'HVAC work in Texas requires TACL license. DIY AC repair is illegal and voids manufacturer warranty.',
  },
  {
    id: 'foundation_cracks',
    label: 'I see cracks in my drywall / doors sticking',
    mindset: 'Investigate Before Panicking',
    framework: [
      '🏠 DFW clay soil is the most active in the country. Seasonal movement is normal — cracking is not always crisis.',
      '🔍 Rule of thumb: hairline cracks = seasonal movement. Stair-step cracks in brick or cracks wider than 1/4" = call an engineer.',
      '💧 Foundation watering is the #1 most important thing you can do. Consistent moisture prevents the shrink-swell cycle that breaks foundations.',
      '⚠️ Don\’t let foundation companies scare you into repairs. Get an independent structural engineer\’s opinion first ($500-800).',
    ],
    approach: 'Hire a structural engineer first, then a foundation company',
    timeline: 'Within 60-90 days of noticing',
    diy: false,
    reason: 'Foundation work requires professional assessment. DIY remedies (like watering) help, but structural repair requires pros.',
  },
  {
    id: 'kitchen_update',
    label: 'I want to update my kitchen for value or enjoyment',
    mindset: 'Value vs Joy — Clarify Your Goal First',
    framework: [
      '📈 DFW kitchen remodels return 60-80% on investment at resale. It\’s good ROI but not a profit center.',
      '🏠 If you\’re staying 5+ years: optimize for how you live. If selling in 2 years: neutral finishes, quality appliances, no niche choices.',
      '💰 The 3 high-ROI moves: cabinet paint or refacing ($3-8K), new countertops ($4-12K), updated lighting ($1-3K). Full gut is luxury, not investment.',
      '⚡ Always check electrical — DFW homes built before 2000 often need panel upgrades to support modern kitchen appliances.',
    ],
    approach: 'Mix of DIY and hired pros depending on scope',
    timeline: 'Plan 3-6 months before you want it done',
    diy: true,
    reason: 'Paint, hardware, simple lighting = DIY. Countertops, cabinets, electrical, plumbing = licensed pros.',
  },
  {
    id: 'roof_post_storm',
    label: 'We had a big hail storm and my roof may be damaged',
    mindset: 'Document Everything Before Anyone Touches Anything',
    framework: [
      '📸 Take photos of your roof, gutters, AC unit, and windows before any contractor visits. Date-stamped.',
      '🔍 Call YOUR insurance company first — not a roofing contractor. Let the adjuster do their inspection before agreeing to anything.',
      '⚠️ DFW storm chasers are aggressive. Never sign anything that says "assignment of benefits" — you lose control of your claim.',
      '✅ After the adjuster: then get 2-3 bids from LOCAL licensed DFW roofers with permanent business addresses.',
    ],
    approach: 'Hire a licensed local DFW roofer after insurance inspection',
    timeline: 'File insurance within 30 days of storm',
    diy: false,
    reason: 'Roof replacement requires professional installation to maintain warranty. Walking a damaged roof is dangerous.',
  },
  {
    id: 'energy_bills',
    label: 'My energy bills are too high in summer',
    mindset: 'Diagnose Before You Spend',
    framework: [
      '🔍 Get a home energy audit first ($200-400 from Oncor/TXU certified auditors). Find the actual leaks before spending thousands.',
      '🏠 In DFW, the top culprits: attic insulation (R-38 minimum), air sealing around can lights, and duct leaks (DFW homes lose 25-40% of conditioned air through ducts).',
      '💡 Quick wins: programmable thermostat (save 10-15%), ceiling fans (allow 4° higher thermostat setting), window film on west-facing windows.',
      '📊 After sealing and insulating: THEN evaluate HVAC upgrade. Fixing envelope first means you can buy a smaller, cheaper unit.',
    ],
    approach: 'Energy audit first, then systematic fixes',
    timeline: 'Audit in spring, fix before summer',
    diy: true,
    reason: 'Weatherstripping, caulking, and attic insulation = DIY-friendly. Duct sealing, HVAC work = licensed pros.',
  },
  {
    id: 'pool',
    label: 'Thinking about adding a pool',
    mindset: 'Lifestyle Asset, Not Investment Strategy',
    framework: [
      '🏊 DFW pool reality: pools add $30-50K to value but cost $60-120K to build. Pure lifestyle decision, not ROI.',
      '💧 Operating costs are real: $1,800-3,500/year in chemicals, electricity, and maintenance. Factor into your decision.',
      '⚠️ DFW clay soil requires specific pool engineering. Get a structural engineer\’s soil report before signing a pool contract.',
      '📋 HOA check first, permit requirements in your city, setback rules from property lines — all before you fall in love with a design.',
    ],
    approach: 'Hire a licensed DFW pool builder — this is not DIY territory',
    timeline: 'Plan 6-12 months ahead — DFW pool builders have 12-18 month backlogs',
    diy: false,
    reason: 'Pool construction in Texas requires licensed pool/spa contractor. Engineering, electrical, and structural work all involved.',
  },
];

export default function DFWHomeImprovementMindset() {
  const [selected, setSelected] = useState('');

  const data = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36 }}>🧠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Home Improvement Mindset</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>How to think through common DFW home improvement decisions — before you spend a dollar</p>
        </div>

        <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>What's your situation?</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              padding: '12px 16px', borderRadius: 10, border: selected === s.id ? '2px solid #F5E642' : '2px solid transparent',
              background: selected === s.id ? '#111f3a' : '#0d1c33', color: '#fff', textAlign: 'left', cursor: 'pointer', fontSize: 14,
            }}>
              {selected === s.id ? '▶ ' : '○ '}{s.label}
            </button>
          ))}
        </div>

        {data && (
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 20, marginBottom: 16 }}>
              {data.mindset}
            </div>
            <div style={{ marginBottom: 20 }}>
              {data.framework.map((f, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 13, lineHeight: 1.6 }}>{f}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 180, background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>APPROACH</div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{data.approach}</div>
              </div>
              <div style={{ flex: 1, minWidth: 180, background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>TIMING</div>
                <div style={{ fontSize: 13, color: '#fff' }}>{data.timeline}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
              <span style={{ color: data.diy ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{data.diy ? '🔨 DIY-friendly (partial)' : '👷 Pro required'}</span>
              <span style={{ color: '#94a3b8', marginLeft: 8 }}>{data.reason}</span>
            </div>
            <p style={{ color: '#F5E642', fontSize: 13, marginTop: 16, textAlign: 'center' }}>
              ProLnk connects you to vetted DFW pros when you're ready to move forward.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
