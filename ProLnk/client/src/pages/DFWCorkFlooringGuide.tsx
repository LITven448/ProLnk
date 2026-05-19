import { useState } from 'react';

const roomTypes = ['Living Room', 'Bedroom', 'Home Office', 'Kitchen', 'Basement', 'Sunroom / Enclosed Patio', 'Bathroom'];
const climateControls = ['Central HVAC (well-maintained)', 'Central HVAC (inconsistent)', 'Window Units Only', 'No Climate Control'];

type Result = { feasibility: string; humidity: string; cost: string; vs: string; note: string };

function getResult(room: string, climate: string): Result | null {
  if (!room || !climate) return null;
  const poorClimate = climate.includes('inconsistent') || climate.includes('Window') || climate.includes('No Climate');
  const goodClimate = climate.includes('well-maintained');

  if (room === 'Bathroom') {
    return { feasibility: '⚠️ Not Recommended', humidity: 'DFW bathrooms have high humidity spikes — cork swells and molds without perfect ventilation', cost: '$3–$7/sq ft (cork) vs $2–$5/sq ft (luxury vinyl)', vs: 'Luxury Vinyl Plank (LVP) is the correct DFW bathroom choice — 100% waterproof', note: 'No cork product can handle direct water exposure. DFW humidity swings make bathrooms especially risky for cork' };
  }
  if (room === 'Kitchen') {
    return { feasibility: '⚠️ Use With Caution', humidity: 'Kitchen moisture and spills require sealed cork — DFW humidity adds stress during unsealed gaps', cost: '$4–$8/sq ft installed (sealed cork) vs $2–$5/sq ft (LVP)', vs: 'LVP or sealed tile handles DFW kitchen conditions with less maintenance', note: 'If you love cork, floating cork tile with 3+ coats of polyurethane can work in a DFW kitchen — but LVP is easier' };
  }
  if (room === 'Basement') {
    return { feasibility: '⚠️ Risk — Verify Moisture First', humidity: 'DFW basements are uncommon but existing ones often have moisture issues from clay soil', cost: '$3–$7/sq ft (cork) — add $1–$3/sq ft for moisture barrier', vs: 'Epoxy coating or LVP is safer for DFW below-grade spaces', note: 'Cork on concrete requires moisture vapor emission test (MVER) — DFW clay soil drives moisture up through slabs' };
  }
  if (room === 'Sunroom / Enclosed Patio') {
    return { feasibility: '❌ Not Recommended for DFW', humidity: 'DFW sunrooms experience extreme temp swings (40–100°F in a day) and humidity changes', cost: '$3–$7/sq ft (cork) — but will likely fail in 2–3 years', vs: 'Porcelain tile or concrete coating is correct for DFW sunrooms', note: 'DFW sunroom conditions are too extreme for cork — UV, humidity, and temperature together destroy cork fast' };
  }
  if (poorClimate) {
    return { feasibility: '⚠️ Feasible With Conditions', humidity: 'DFW humidity swings from 30% in winter to 80%+ in summer — cork can expand and contract visibly', cost: '$3–$7/sq ft installed', vs: 'Engineered hardwood or LVP is more stable in DFW without consistent HVAC', note: `Without consistent HVAC, cork in DFW will gap in winter and buckle in summer. Maintain 35–55% RH year-round or choose a more stable material for ${room}` };
  }
  if (room === 'Living Room' && goodClimate) {
    return { feasibility: '✅ Great Choice for DFW', humidity: 'Maintain 35–55% RH — use a whole-home humidifier in DFW winters when air gets dry', cost: '$4–$9/sq ft installed (floating cork tile or plank)', vs: 'Cork vs. hardwood: cork is softer underfoot, comparable cost, but requires HVAC discipline', note: 'DFW living rooms with good HVAC are ideal for cork — comfortable, quiet, and sustainable. Pre-finish > site-finish for DFW installs' };
  }
  if (room === 'Bedroom' && goodClimate) {
    return { feasibility: '✅ Excellent DFW Application', humidity: 'Bedrooms have stable humidity — use bedroom humidifier for extra protection in DFW winters', cost: '$4–$8/sq ft installed', vs: 'Cork is quieter and warmer underfoot than hardwood — ideal for DFW bedrooms', note: 'Bedrooms are the lowest-risk cork application in DFW — consistent occupancy helps moderate humidity swings' };
  }
  if (room === 'Home Office' && goodClimate) {
    return { feasibility: '✅ Good DFW Choice', humidity: 'Office equipment and occupancy help stabilize humidity — supplement with a desk humidifier in DFW winters', cost: '$3–$7/sq ft installed', vs: 'Cork reduces fatigue from standing and dampens echo — practical benefits for DFW home offices', note: 'Cork\’s anti-fatigue properties make it popular for home offices. Computer equipment also helps regulate room climate' };
  }
  return { feasibility: '✅ Feasible With Proper HVAC', humidity: 'Maintain 35–55% RH year-round — DFW winters drop humidity fast, summers spike it', cost: '$3–$8/sq ft installed', vs: 'Cork is viable in DFW with disciplined HVAC and humidity control', note: 'Cork is a sustainable, comfortable flooring choice for DFW interiors — the only requirement is consistent climate control' };
}

export default function DFWCorkFlooringGuide() {
  const [room, setRoom] = useState('');
  const [climate, setClimate] = useState('');
  const result = getResult(room, climate);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🌿</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          DFW Cork Flooring Guide
        </h1>
        <p style={{ color: '#aac', marginBottom: '2rem', lineHeight: 1.6 }}>
          Cork is comfortable, sustainable, and sound-dampening — but DFW's dramatic humidity swings (30% in winter to 80%+ in summer) are cork’s biggest enemy. HVAC discipline is non-negotiable.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🌡️ DFW's Humidity Challenge for Cork</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: '❄️ DFW Winter', issue: 'Humidity drops to 20–35%. Cork shrinks and gaps form between planks.' },
              { label: '🌧️ DFW Summer', issue: 'Humidity spikes to 70–85%. Cork expands, buckles if no room to breathe.' },
              { label: '🌪️ Weather Events', issue: 'DFW sees fast weather shifts. A 40°F temp drop triggers immediate humidity change.' },
              { label: '✅ Safe Range', issue: 'Keep 35–55% RH year-round. Whole-home humidifier + HVAC is the solution.' },
            ].map(item => (
              <div key={item.label} style={{ background: '#122040', borderRadius: 8, padding: '0.85rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.label}</div>
                <div style={{ color: '#aac', fontSize: '0.83rem', lineHeight: 1.5 }}>{item.issue}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🏠 Assess Your DFW Situation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Room Type</label>
            <select value={room} onChange={e => setRoom(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334′ }}>
              <option value=''>Select room...</option>
              {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>DFW Climate Control Situation</label>
            <select value={climate} onChange={e => setClimate(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334′ }}>
              <option value=''>Select HVAC situation...</option>
              {climateControls.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ background: '#122040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📊 DFW Cork Assessment</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{result.feasibility}</div>
              <div><span style={{ color: '#aac' }}>Humidity Requirement: </span><span>{result.humidity}</span></div>
              <div><span style={{ color: '#aac' }}>Cost Range: </span><strong style={{ color: '#F5E642′ }}>{result.cost}</strong></div>
              <div><span style={{ color: '#aac' }}>vs. Alternatives: </span><span>{result.vs}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#cce', fontSize: '0.9rem' }}>
                💡 {result.note}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🛒 DFW Cork Product Tips</h2>
          <ul style={{ color: '#ccd', lineHeight: 2.1, paddingLeft: '1.25rem', margin: 0 }}>
            <li>Pre-finished cork tiles or planks perform better than site-finished in DFW humidity</li>
            <li>Look for cork with 3+ factory finish coats — reduces DFW humidity penetration</li>
            <li>Acclimate cork 72 hours in the room before install — DFW humidity varies season to season</li>
            <li>Leave 1/4" expansion gap at walls — DFW summer expansion is significant</li>
            <li>Whole-home humidifier: $400–$800 installed — worth it if you're committed to cork</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
