import { useState } from 'react';

const roomTypes = ['Bathroom', 'Kitchen', 'Laundry Room', 'Living / Bedroom', 'Garage Entry'];
const moistureLevels = ['Low (dry climate zone)', 'Moderate (standard DFW)', 'High (near plumbing or shower)', 'Very High (direct water exposure)'];

function getBaseboardAssessment(room: string, moisture: string) {
  const highMoisture = moisture.includes('High') || moisture.includes('Very High') || room === 'Bathroom' || room === 'Laundry Room';
  const moderateMoisture = moisture.includes('Moderate') || room === 'Kitchen';

  if (moisture.includes('Very High') || room === 'Bathroom') return {
    material: 'PVC or Vinyl Baseboard',
    install: 'Adhesive-only — no nails into moisture-laden walls',
    dfwNote: 'DFW bathrooms see 80%+ RH in summer — MDF will swell and delaminate within 1–2 years',
    cost: '$1.50–$3.00/linear ft',
    color: '#FF4444'
  };
  if (highMoisture) return {
    material: 'Solid Wood or Moisture-Resistant MDF',
    install: 'Nail to studs, prime all 6 sides, silicone caulk at floor joint',
    dfwNote: 'DFW humidity cycles cause unprimed MDF to buckle — prime before cut, prime after cut',
    cost: '$2.00–$4.50/linear ft',
    color: '#F5A623'
  };
  if (moderateMoisture) return {
    material: 'Finger-Jointed Pine or Primed MDF',
    install: 'Nail gun + construction adhesive, paintable latex caulk at top and floor',
    dfwNote: 'Prime all 6 sides — DFW summers at 75–85% RH will cause unprimed MDF to telegraph seams',
    cost: '$1.00–$2.50/linear ft',
    color: '#22C55E'
  };
  return {
    material: 'Standard MDF or Finger-Jointed Pine',
    install: 'Nail to studs, latex caulk top and bottom, sand and paint',
    dfwNote: 'Dry DFW zones still need primer — winter humidity drops to 10–15%, causing MDF to crack without sealer',
    cost: '$0.75–$2.00/linear ft',
    color: '#22C55E'
  };
}

export default function DFWBaseboardGuide() {
  const [room, setRoom] = useState('');
  const [moisture, setMoisture] = useState('');
  const result = room && moisture ? getBaseboardAssessment(room, moisture) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>
          🏠 DFW INTERIOR GUIDE
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          Baseboard Guide for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Baseboards in DFW face extreme humidity swings — 10% in winter to 85% in summer.
          MDF baseboards installed without proper priming buckle, swell, and delaminate within a few years.
          Choosing the right material for your DFW room makes the difference.
        </p>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>💧 DFW Humidity Zones & Baseboard Failure</h2>
          <ul style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>DFW summer: 70–85% RH — MDF absorbs moisture, swells, paint bubbles and peels</li>
            <li>DFW winter: 10–25% RH — MDF shrinks, corners crack, caulk separates at floor</li>
            <li>Bathrooms and laundry rooms in DFW should NEVER use standard MDF baseboards</li>
            <li>Most DFW builders use cheap unprimed MDF — it starts failing within 3–5 years</li>
            <li>PVC and vinyl baseboards cost slightly more but last 20+ years in DFW moisture zones</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🪵 Baseboard Materials for DFW Climates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: '🟧', name: 'MDF (Unprimed)', desc: 'Cheap — but in DFW humidity will swell. MUST prime all 6 sides or replace in 3–5 years.' },
              { icon: '🌲', name: 'Finger-Jointed Pine', desc: 'Most stable for DFW — handles humidity cycles well, takes paint beautifully, knot-free.' },
              { icon: '🪵', name: 'Solid Wood', desc: 'Best longevity — ideal for high-end DFW remodels. Expands slightly but predictably.' },
              { icon: '🔳', name: 'PVC / Vinyl', desc: 'Immune to DFW humidity — perfect for bathrooms, laundry. Doesn\’t absorb moisture ever.' },
            ].map(({ icon, name, desc }) => (
              <div key={name} style={{ background: '#162035', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{name}</div>
                <div style={{ color: '#94A3B8', fontSize: '13px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>🛠️ DFW Baseboard Recommendation Tool</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Room Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {roomTypes.map(r => (
                <button key={r} onClick={() => setRoom(r)} style={{
                  background: room === r ? '#F5E642' : '#162035', color: room === r ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: room === r ? 700 : 400
                }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>DFW Moisture Level</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {moistureLevels.map(m => (
                <button key={m} onClick={() => setMoisture(m)} style={{
                  background: moisture === m ? '#F5E642' : '#162035', color: moisture === m ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: moisture === m ? 700 : 400
                }}>{m}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '18px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>Recommended: {result.material}</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '6px' }}>Installation: <span style={{ color: '#FFFFFF' }}>{result.install}</span></div>
              <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '6px' }}>💡 DFW note: {result.dfwNote}</div>
              <div style={{ color: '#CBD5E1', fontSize: '14px' }}>Typical cost: <span style={{ color: '#F5E642', fontWeight: 600 }}>{result.cost}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#162035', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#64748B', textAlign: 'center' }}>
          ProLnk • DFW Home Intelligence • Connecting homeowners with vetted local pros
        </div>
      </div>
    </div>
  );
}
