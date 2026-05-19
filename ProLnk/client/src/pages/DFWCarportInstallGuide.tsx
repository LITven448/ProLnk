import { useState } from 'react';

const CARPORT_TYPES = [
  { id: 'attached-metal', label: 'Attached Metal', costBase: 3200, costPerVehicle: 1800, hailRating: 'Good', permitLikely: true },
  { id: 'detached-metal', label: 'Detached Metal', costBase: 4500, costPerVehicle: 2000, hailRating: 'Good', permitLikely: true },
  { id: 'attached-wood', label: 'Attached Wood (Pergola)', costBase: 5500, costPerVehicle: 2500, hailRating: 'Fair', permitLikely: true },
  { id: 'portable', label: 'Portable Canopy', costBase: 400, costPerVehicle: 250, hailRating: 'Poor', permitLikely: false },
];

const ROOF_TYPES = [
  { id: 'solid', label: 'Solid Metal Panel', hailBonus: 2, uvBonus: 3 },
  { id: 'poly', label: 'Polycarbonate Panel', hailBonus: 1, uvBonus: 2 },
  { id: 'open', label: 'Open / Shade Cloth', hailBonus: 0, uvBonus: 1 },
];

export default function DFWCarportInstallGuide() {
  const [vehicles, setVehicles] = useState(2);
  const [carportType, setCarportType] = useState('detached-metal');
  const [roofType, setRoofType] = useState('solid');
  const [hasHOA, setHasHOA] = useState(false);
  const [constraintFront, setConstraintFront] = useState(false);

  const ct = CARPORT_TYPES.find(c => c.id === carportType)!;
  const rt = ROOF_TYPES.find(r => r.id === roofType)!;

  const baseCost = ct.costBase + (vehicles - 1) * ct.costPerVehicle;
  const roofUpgrade = rt.id === 'solid' ? 0 : rt.id === 'poly' ? Math.round(baseCost * 0.08) : -Math.round(baseCost * 0.12);
  const totalCost = baseCost + roofUpgrade;

  const hailScore = rt.hailBonus + (ct.id.includes('metal') ? 2 : 1);
  const hailLabel = hailScore >= 4 ? 'Excellent' : hailScore >= 3 ? 'Good' : hailScore >= 2 ? 'Fair' : 'Poor';
  const hailColor = hailScore >= 4 ? '#22c55e' : hailScore >= 3 ? '#F5E642′ : hailScore >= 2 ? '#f97316' : '#ef4444';

  const needsPermit = ct.permitLikely;
  const hoaRisk = hasHOA && (constraintFront || ct.id === 'portable');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🚗</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Carport Installation Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
          DFW vehicles parked outside face UV damage, hail, and 100°F+ heat. A carport pays for itself fast.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 36 }}>
          {[
            { icon: '🌡️', title: 'UV Damage Is Severe', body: 'DFW receives 229+ sunny days/year. Uncovered vehicles lose paint oxidation within 5 years. Interior plastics crack, and tire sidewalls degrade significantly faster than garage-kept vehicles.' },
            { icon: '⛈️', title: 'Hail Is the #1 Risk', body: 'DFW sits in Hail Alley — golf-ball to baseball-size hail is a real annual threat. A solid metal roof carport can prevent $3,000–$15,000 in vehicle damage from a single storm.' },
            { icon: '🏘️', title: 'HOA Approval Required', body: 'Most DFW HOAs require prior written approval for any carport. Attached structures often need architectural review. Detached metal carports in front yards are almost universally prohibited.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, marginTop: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Carport Configurator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Vehicles to Cover</label>
              <input type="range" min={1} max={4} value={vehicles} onChange={e => setVehicles(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <span style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{vehicles} vehicle{vehicles > 1 ? 's' : ''}</span>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Carport Type</label>
              <select value={carportType} onChange={e => setCarportType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {CARPORT_TYPES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Material</label>
              <select value={roofType} onChange={e => setRoofType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {ROOF_TYPES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasHOA} onChange={e => setHasHOA(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              <span style={{ color: '#94A3B8', fontSize: 14 }}>I have an HOA</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={constraintFront} onChange={e => setConstraintFront(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              <span style={{ color: '#94A3B8', fontSize: 14 }}>Must place near front/street</span>
            </label>
          </div>

          {hoaRisk && (
            <div style={{ background: '#2d1a1a', border: '1px solid #ef4444', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>⚠️ High HOA Rejection Risk</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>Front-yard carports are almost always prohibited by DFW HOAs. Get written approval before purchasing any materials.</div>
            </div>
          )}
          {needsPermit && (
            <div style={{ background: '#2d2200', border: '1px solid #F5E642', borderRadius: 10, padding: 12, marginBottom: 16 }}>
              <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>📋 Building permit likely required. Budget $300–$800 for permit + footing inspection.</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { label: 'Est. Total Cost', value: `$${totalCost.toLocaleString()}` },
              { label: 'Vehicles', value: `${vehicles}` },
              { label: 'Hail Protection', value: hailLabel, color: hailColor },
              { label: 'Permit Needed', value: needsPermit ? 'Yes' : 'No' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: stat.color || '#F5E642', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginTop: 20, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>⛈️ DFW Hail Protection Ratings</h3>
          {[
            { type: 'Solid Metal Roof', rating: 'Excellent', note: 'Best hail protection. 26-gauge steel handles up to baseball-size hail.' },
            { type: 'Polycarbonate Panels', rating: 'Good', note: 'Lets light through. Impact-rated panels handle up to 1″ hail; larger stones may crack panels.' },
            { type: 'Shade Cloth / Open', rating: 'Poor', note: 'No hail protection. Reduces UV and heat only. Fine for mild weather, not DFW storm season.' },
          ].map(item => (
            <div key={item.type} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 160 }}>
                <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700 }}>{item.type}</div>
                <div style={{ color: item.rating === 'Excellent' ? '#22c55e' : item.rating === 'Good' ? '#F5E642′ : '#ef4444', fontSize: 12, fontWeight: 700 }}>{item.rating}</div>
              </div>
              <span style={{ color: '#64748B', fontSize: 13 }}>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
