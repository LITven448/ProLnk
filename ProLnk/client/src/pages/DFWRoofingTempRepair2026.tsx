import { useState } from 'react';

export default function DFWRoofingTempRepair2026() {
  const [damageType, setDamageType] = useState('');
  const [repairGuide, setRepairGuide] = useState('');

  const getGuide = () => {
    if (!damageType) { setRepairGuide('Select a damage type to get your temporary repair guide.'); return; }
    const guides: Record<string, string> = {
      tarp: '🟦 Proper DFW Tarping Technique: Use 6 mil poly or professional blue tarp — NOT the thin blue tarps from gas stations. 1) Clear debris from roof before tarping. 2) Extend tarp at least 4 feet past the ridge on both sides so water cannot run under tarp at peak. 3) Fold tarp edge under a 2x4 board and nail through board into roof decking — do not nail tarp directly to shingles. 4) Secure all edges — DFW thunderstorm winds regularly hit 60-80 mph and will tear loose tarps. 5) Weight leading edge with sandbags or additional boards. Professional poly tarps (silver/green) are far superior to blue tarps — lasts months vs days in DFW UV.',
      smallhole: '🔧 Small Opening Repair (roofing cement): For openings up to 6 inches: 1) Dry the area completely — DFW humidity means even a dry-looking surface may have moisture. Use rags and wait for full sun. 2) Apply roofing cement (Henry or Gardner brand) generously with a trowel, extending 3-4 inches beyond opening in all directions. 3) Press a piece of aluminum flashing into wet cement, then cover with additional roofing cement. 4) Smooth edges to shed water. This repair is good for 2-4 weeks in DFW summer rain. Not a permanent fix — schedule permanent repair immediately. Monitor after every rain.',
      missingshingle: '🏚️ Missing Shingle Temporary Fix: 1) Slip a piece of sheet metal (aluminum flashing, 12-18 inches) under the shingle above the gap, extending down over the gap. 2) Apply roofing cement along edges of flashing. 3) This is a 2-6 week fix only — DFW wind will eventually shift it. 4) If multiple shingles missing in storm pattern, tarp the entire zone rather than individual repairs. 5) Take photos for insurance claim — do not repair before documenting. 6) DFW insurance adjusters prefer you demonstrate active mitigation; temporary repairs show good faith.',
      storm: '⛈️ Post-Storm Emergency Tarp (Large Area): 1) Safety first — never go on wet DFW roof. Wait minimum 24 hours after storm. 2) Assess from ground with binoculars. 3) For large damage zones, cover entire roof slope, not just damaged section. 4) Secure with multiple 2x4 anchor boards screwed into decking every 4-6 feet. 5) Overlap multiple tarps with minimum 3-foot overlap, higher tarp on top. 6) Call insurance same day as storm — DFW insurers have strict storm claim timelines. 7) Photograph before and after tarping. Professional tarp companies charge -800 but provide documentation for claims.',
      leak: '💧 Active Leak Temporary Interior Fix: While arranging roof repair: 1) Locate water entry point from attic — use flashlight during rain. Mark with chalk. 2) Drive a nail upward through deck at drip location — this redirects water to a predictable spot for collection. 3) Set collection buckets and change frequently — DFW rain can dump 3-4 inches in 2 hours. 4) Protect flooring with plastic sheeting under bucket area. 5) In attic, use roofing cement from inside on visible crack (temporary). 6) Check HVAC ducts — DFW attic leaks often drip onto ductwork causing mold within 48-72 hours in summer heat.'
    };
    setRepairGuide(guides[damageType] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>🏠 DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>Temporary Roof Repair Guide</h1>
        <p style={{ color: '#8899AA', fontSize: '16px', marginBottom: '32px' }}>DFW hail and thunderstorms can cause immediate damage requiring same-day temporary fixes. These techniques protect your home while you schedule permanent repair — and document the damage for insurance.</p>

        <div style={{ backgroundColor: '#0D1F38', border: '2px solid #F5E642', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
          <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '12px', color: '#F5E642' }}>⚡ Before Any DFW Temporary Repair</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['NEVER go on a wet roof — DFW summer shingles are extremely slippery when wet', 'Photograph ALL damage before making any repairs — essential for insurance claim', 'Call insurance company same day as storm event — DFW insurers have claim deadlines', 'Temporary repairs do NOT void insurance claim — they demonstrate responsible mitigation', 'DFW roofing contractors often book 2-4 weeks out after major storm — start calling immediately'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>•</span>
                <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
          {[{ icon: '🟦', label: 'Blue Tarp', rating: 'Days–Weeks', note: 'Cheap, immediate. DFW UV and wind degrade fast.' },
            { icon: '🟢', label: 'Pro Poly Tarp', rating: 'Months', note: 'Silver or green — built for extended DFW exposure.' },
            { icon: '🔧', label: 'Roofing Cement', rating: 'Weeks', note: 'For small openings — reapply after heavy rain.' },
            { icon: '🔩', label: 'Flashing + Cement', rating: '1–2 Months', note: 'More durable for missing shingle zones.' }
          ].map(item => (
            <div key={item.icon} style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>Duration: {item.rating}</div>
              <div style={{ color: '#8899AA', fontSize: '12px' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#F5E642' }}>🔧 Get My Temporary Repair Guide</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>DFW Roof Damage Type</label>
            <select value={damageType} onChange={e => setDamageType(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px' }}>
              <option value=''>Select damage type...</option>
              <option value='tarp'>Need to tarp a large damaged area</option>
              <option value='smallhole'>Small opening or hole (under 6 inches)</option>
              <option value='missingshingle'>One or few missing shingles</option>
              <option value='storm'>Major storm damage — emergency tarp needed</option>
              <option value='leak'>Active leak inside home right now</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Temporary Repair Guide</button>
          {repairGuide && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '15px', lineHeight: 1.7 }}>{repairGuide}</div>}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: '#F5E642' }}>📋 When Temporary Is Not Enough — DFW Warning Signs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Decking (plywood) visible and spongy or rotted — structural urgency, not cosmetic', 'Leak continuing despite cement or tarp — opening larger than visible damage suggests', 'DFW summer heat: any moisture under tarp breeds mold within 48-72 hours — act fast', 'Large puncture from falling tree limb — tarp only masks; structural inspection required', 'Multiple areas damaged in storm — individual patches inadequate, full replacement needed'].map((warn, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#FC8181', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>⚠️</span>
                <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{warn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}