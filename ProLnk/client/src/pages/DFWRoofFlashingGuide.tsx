import { useState } from 'react';

const roofTypes = ['Composition Shingle', 'Metal Roof', 'Tile (Clay or Concrete)', 'Flat / Low-Slope'];
const roofAges = ['Under 5 years', '5–10 years', '10–20 years', '20+ years'];
const penetrationCounts = ['0–1 (no chimney/skylight)', '2–3 (chimney or skylight)', '4–6 (multiple penetrations)', '7+ (complex roof)'];

const recommendations: Record<string, { priority: string; action: string; cost: string; color: string }> = {
  'Composition Shingle|Under 5 years|0–1 (no chimney/skylight)': { priority: 'Low', action: 'Annual visual inspection only. DFW UV degrades pipe boot rubber — check boots specifically.', cost: '$0 (DIY inspection)', color: '#22C55E' },
  'Composition Shingle|Under 5 years|2–3 (chimney or skylight)': { priority: 'Moderate', action: 'Professional flashing inspection recommended. Chimney counter-flashing often improperly installed even on new DFW roofs.', cost: '$150–$350 inspection', color: '#EAB308' },
  'Composition Shingle|5–10 years|2–3 (chimney or skylight)': { priority: 'Moderate', action: 'Inspect chimney step flashing and skylight perimeter. DFW heat cycles cause sealant to crack at 7–10 years.', cost: '$350–$900 repair', color: '#EAB308' },
  'Composition Shingle|10–20 years|4–6 (multiple penetrations)': { priority: 'High', action: 'Full flashing inspection and likely replacement of pipe boots and chimney counter-flashing. DFW temperature swings from 20°F to 110°F destroy sealant.', cost: '$800–$2,500', color: '#EF4444' },
  'Composition Shingle|20+ years|7+ (complex roof)': { priority: 'Critical', action: 'Proactive full flashing replacement recommended before re-roof. At 20+ years in DFW, all original flashing components are suspect.', cost: '$1,500–$4,000', color: '#DC2626' },
  'Metal Roof|Under 5 years|0–1 (no chimney/skylight)': { priority: 'Low', action: 'Metal flashing on metal roof performs well. Check fastener sealant washers — DFW UV degrades EPDM washers faster than metal.', cost: '$0–$200', color: '#22C55E' },
  'Metal Roof|10–20 years|2–3 (chimney or skylight)': { priority: 'Moderate', action: 'Inspect dissimilar metal contact points (chimney flashing to metal panels). Galvanic corrosion accelerated by DFW humidity.', cost: '$400–$1,200', color: '#EAB308' },
  'Tile (Clay or Concrete)|10–20 years|2–3 (chimney or skylight)': { priority: 'High', action: 'Tile roofs hide flashing failures — water travels far under tile before visible inside. Proactive inspection critical. DFW thermal cycling cracks mortar at chimney base.', cost: '$600–$2,000', color: '#EF4444' },
  'Tile (Clay or Concrete)|20+ years|4–6 (multiple penetrations)': { priority: 'Critical', action: 'Full flashing and mortar crown replacement. Water damage likely already present. Do not defer.', cost: '$1,500–$5,000', color: '#DC2626' },
  'Flat / Low-Slope|Under 5 years|0–1 (no chimney/skylight)': { priority: 'Moderate', action: 'Flat roofs rely entirely on membrane and perimeter flashing. DFW summer heat blisters membranes — inspect annually.', cost: '$200–$600/yr maintenance', color: '#EAB308' },
  'Flat / Low-Slope|5–10 years|2–3 (chimney or skylight)': { priority: 'High', action: 'Penetration flashing on flat roofs is highest failure point. HVAC curb flashing critical — DFW HVAC replacement often damages surrounding membrane.', cost: '$500–$2,500', color: '#EF4444' },
};

const getRecommendation = (rt: string, ra: string, pc: string) => {
  const key = `${rt}|${ra}|${pc}`;
  return recommendations[key] || { priority: 'Moderate', action: 'Schedule a professional flashing inspection. Your specific combination warrants hands-on evaluation, especially given DFW\’s extreme heat and severe storms.', cost: '$150–$500 inspection', color: '#EAB308' };
};

export default function DFWRoofFlashingGuide() {
  const [roofType, setRoofType] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [penetrations, setPenetrations] = useState('');
  const result = roofType && roofAge && penetrations ? getRecommendation(roofType, roofAge, penetrations) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1E35', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME SERVICES GUIDE · 2026</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.2 }}>🏠 Roof Flashing Guide for DFW Homeowners</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, lineHeight: 1.6 }}>Flashing seals every gap where your roof is interrupted — chimneys, skylights, vents, valleys. DFW's 90°F temperature swings between winter and summer destroy sealants and flex metal faster than almost any climate in the country.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{ label: '🏗️ Roof Type', val: roofType, set: setRoofType, opts: roofTypes }, { label: '📅 Roof Age', val: roofAge, set: setRoofAge, opts: roofAges }, { label: '🔩 Penetrations', val: penetrations, set: setPenetrations, opts: penetrationCounts }].map(({ label, val, set, opts }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {opts.map(o => (
                  <button key={o} onClick={() => set(o)} style={{ background: val === o ? '#F5E642' : '#1A2D4A', color: val === o ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontWeight: val === o ? 700 : 400, fontSize: 13, textAlign: 'left', transition: 'all 0.15s' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {result ? (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, borderLeft: `4px solid ${result.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ background: result.color, color: '#0A1628', fontWeight: 800, fontSize: 13, padding: '4px 12px', borderRadius: 20 }}>{result.priority.toUpperCase()} PRIORITY</span>
            </div>
            <div style={{ fontSize: 16, color: '#E8EDF5', lineHeight: 1.7, marginBottom: 16 }}>{result.action}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 18px' }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost: </span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</span>
            </div>
          </div>
        ) : (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8' }}>Select your roof type, age, and penetration count to get your flashing inspection priority.</div>
        )}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ icon: '🌡️', title: 'DFW Heat Expansion', text: 'Metal flashing expands in summer heat and contracts in winter. Over 20 years of 90°F swings, this work-hardening cracks metal and breaks sealant bonds at penetration edges.' }, { icon: '🌩️', title: 'Storm-Driven Rain', text: 'DFW thunderstorms drive rain horizontally at 40–60 mph. Standard flashing is designed for vertical rain — compromised flashing fails immediately under storm conditions.' }, { icon: '🔧', title: 'Repair vs. Replacement', text: 'If flashing is under 10 years old and properly installed, spot repair with polyurethane caulk is reasonable. Over 10 years with DFW exposure, full replacement is almost always better value.' }, { icon: '🏭', title: 'Pipe Boot Failure', text: 'Rubber pipe boots around plumbing vents typically last 8–12 years in DFW UV. Neoprene or metal replacement boots last 20+ years. Worth upgrading when re-roofing.' }].map(({ icon, title, text }) => (
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
