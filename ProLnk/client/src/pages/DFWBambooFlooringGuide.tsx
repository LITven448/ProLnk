import { useState } from 'react';

const roomTypes = ['Living Room', 'Bedroom', 'Home Office', 'Dining Room', 'Kitchen', 'Basement', 'High-Traffic Hallway'];
const hvacOptions = ['Well-Maintained Central HVAC', 'Inconsistent HVAC', 'Zone Control (some rooms warmer)', 'Radiant Heat Floor', 'No Climate Control'];

type Result = { suitability: string; species: string; care: string; cost: string; note: string };

function getResult(room: string, hvac: string): Result | null {
  if (!room || !hvac) return null;
  const poorHvac = hvac.includes('Inconsistent') || hvac.includes('No Climate') || hvac.includes('Radiant');
  const zoneControl = hvac.includes('Zone');

  if (room === 'Basement') {
    return { suitability: '❌ Not Recommended for DFW', species: 'No bamboo product is safe for DFW below-grade spaces', care: 'DFW clay soil moisture + below-grade humidity = guaranteed bamboo failure', cost: 'LVP or epoxy coating: $2–$6/sq ft — correct choice for DFW basements', note: 'Bamboo and moisture are incompatible. DFW basements often have high MVER from clay soil — bamboo will swell, delaminate, and grow mold' };
  }
  if (room === 'Kitchen') {
    return { suitability: '⚠️ Use With Caution in DFW', species: 'Strand Woven Bamboo only — hardest and most moisture-resistant variety', care: 'Wipe spills immediately — DFW humidity makes any standing moisture worse', cost: '$5–$9/sq ft installed (strand woven) vs $2–$4/sq ft LVP', note: 'Strand woven bamboo can handle DFW kitchen conditions IF spills are wiped immediately. LVP is still the smarter choice for DFW kitchens' };
  }
  if (hvac === 'Radiant Heat Floor') {
    return { suitability: '⚠️ Special Requirements', species: 'Only strand woven bamboo rated for radiant heat — check manufacturer specs', care: 'Max radiant floor temp: 85°F. DFW summers already stress bamboo without added heat below', cost: '$6–$10/sq ft installed (radiant-rated strand woven)', note: 'Radiant heat dries bamboo from below while DFW humidity stresses it from above — only use radiant-rated strand woven and keep system below 80°F' };
  }
  if (poorHvac && !hvac.includes('Zone')) {
    return { suitability: '❌ Not Recommended Without HVAC Upgrade', species: 'No bamboo type is stable enough for DFW without consistent HVAC', care: 'DFW humidity swings (30–85% RH) will cause gapping and buckling within 1–2 seasons', cost: 'Fix HVAC first, then reconsider bamboo — or choose engineered hardwood or LVP instead', note: 'Carbonized bamboo especially is sensitive to humidity — without consistent HVAC in DFW, expect visible movement and potential delamination within the first year' };
  }
  if (zoneControl) {
    return { suitability: '⚠️ Feasible — Manage Zone Carefully', species: 'Strand Woven Bamboo — most dimensionally stable bamboo type', care: 'Ensure bamboo room stays 35–55% RH — zone temp swings accelerate DFW humidity cycling', cost: '$5–$9/sq ft installed', note: 'Zone control creates temperature differentials that drive humidity variation — keep bamboo rooms at consistent temp and monitor RH with a hygrometer' };
  }
  if (room === 'Living Room' || room === 'Dining Room') {
    return { suitability: '✅ Good DFW Choice with Proper HVAC', species: 'Strand Woven Bamboo (Horizontal grain OK for lower-traffic dining)', care: 'Maintain 35–55% RH, sweep daily, use felt pads under furniture', cost: '$5–$9/sq ft installed — comparable to mid-grade hardwood', note: 'Strand woven bamboo is harder than red oak (Janka 3000+) and handles DFW foot traffic well. Carbonized versions are softer — avoid for high-use DFW living areas' };
  }
  if (room === 'Bedroom') {
    return { suitability: '✅ Excellent DFW Application', species: 'Strand Woven or Flat Grain Natural Bamboo', care: 'Low maintenance — sweep weekly, occasional damp mop', cost: '$4–$8/sq ft installed', note: 'Bedrooms have the most stable humidity in DFW homes — ideal for bamboo. Natural (not carbonized) strand woven gives best DFW performance' };
  }
  if (room === 'Home Office') {
    return { suitability: '✅ Good DFW Choice', species: 'Strand Woven Bamboo — handles chair caster wear better than other bamboo types', care: 'Use chair mat to protect from casters — bamboo dents under rolling pressure', cost: '$4–$8/sq ft installed', note: 'Office equipment and occupancy help stabilize DFW humidity. Use a chair mat — bamboo is harder than regular hardwood but still dents under heavy caster pressure' };
  }
  if (room === 'High-Traffic Hallway') {
    return { suitability: '✅ Strong Performer if Strand Woven', species: 'Strand Woven Bamboo only — flat grain and carbonized will show wear too fast', care: 'Add area rug at entry — DFW dirt and grit is highly abrasive to bamboo finish', cost: '$5–$9/sq ft installed', note: 'Strand woven bamboo\’s extreme hardness (Janka 3000+) makes it ideal for DFW hallways. Protect finish with area rugs at exterior doors where DFW clay soil and grit track in' };
  }
  return { suitability: '✅ Feasible with Good HVAC', species: 'Strand Woven Bamboo recommended for DFW', care: 'Maintain 35–55% RH, sweep regularly', cost: '$4–$9/sq ft installed', note: 'Bamboo is viable in DFW with consistent HVAC — strand woven is always the safest choice for DFW conditions' };
}

export default function DFWBambooFlooringGuide() {
  const [room, setRoom] = useState('');
  const [hvac, setHvac] = useState('');
  const result = getResult(room, hvac);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🎋</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          DFW Bamboo Flooring Guide
        </h1>
        <p style={{ color: '#aac', marginBottom: '2rem', lineHeight: 1.6 }}>
          Bamboo is harder than most hardwoods — but DFW's humidity swings are its kryptonite. Carbonized bamboo is especially sensitive. The right type and HVAC setup determines whether bamboo thrives or fails in your DFW home.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🆚 Bamboo Types for DFW</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { name: '💪 Strand Woven', rating: 'Best for DFW', desc: 'Janka 3000+. Shredded bamboo fibers compressed under heat/pressure. Most dimensionally stable, hardest, most moisture-resistant.' },
              { name: '↔️ Flat Grain', rating: 'OK for DFW Low-Traffic', desc: 'Janka ~1200. Natural grain pattern, good looks. Less stable than strand woven in DFW humidity — avoid kitchens and hallways.' },
              { name: '🔥 Carbonized', rating: 'Avoid in DFW', desc: 'Heat treatment darkens color but dramatically reduces hardness (Janka ~900) and humidity resistance. Worst performer in DFW conditions.' },
            ].map(item => (
              <div key={item.name} style={{ background: '#122040', borderRadius: 8, padding: '1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{item.name} <span style={{ color: '#F5E642', fontSize: '0.85rem' }}>— {item.rating}</span></div>
                  <div style={{ color: '#aac', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🏠 Check Bamboo Suitability for Your DFW Space</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Room Type</label>
            <select value={room} onChange={e => setRoom(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334' }}>
              <option value=''>Select room...</option>
              {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>DFW HVAC Situation</label>
            <select value={hvac} onChange={e => setHvac(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334' }}>
              <option value=''>Select HVAC situation...</option>
              {hvacOptions.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ background: '#122040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎋 DFW Bamboo Assessment</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{result.suitability}</div>
              <div><span style={{ color: '#aac' }}>Recommended Type: </span><strong>{result.species}</strong></div>
              <div><span style={{ color: '#aac' }}>DFW Care Requirements: </span><span>{result.care}</span></div>
              <div><span style={{ color: '#aac' }}>Cost Comparison: </span><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#cce', fontSize: '0.9rem' }}>
                💡 {result.note}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📋 DFW Bamboo Installation Checklist</h2>
          <ol style={{ color: '#ccd', lineHeight: 2.2, paddingLeft: '1.25rem', margin: 0 }}>
            <li>Acclimate bamboo 72 hours in the install room — DFW humidity varies dramatically by season</li>
            <li>Install whole-home humidifier — target 35–55% RH year-round</li>
            <li>Leave 1/2" expansion gap at all walls — DFW expansion is greater than HVAC-stable climates</li>
            <li>Never install bamboo within 3 feet of exterior doors without a transition mat</li>
            <li>Use only manufacturer-approved cleaner — DFW hard water in mops can streak bamboo finish</li>
            <li>Monitor RH with a digital hygrometer — $15 at any home improvement store</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
