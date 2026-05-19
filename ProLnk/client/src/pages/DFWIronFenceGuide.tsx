import { useState } from 'react';

const DESIGNS = [
  { id: 'flat', label: 'Flat Top', multiplier: 1.0, touchupYrs: 7 },
  { id: 'spear', label: 'Spear Top', multiplier: 1.15, touchupYrs: 7 },
  { id: 'ornamental', label: 'Ornamental Detail', multiplier: 1.45, touchupYrs: 6 },
];

const COATINGS = [
  { id: 'standard', label: 'Standard Powder Coat', annualMaint: 0.4, durabilityYrs: 7 },
  { id: 'premium', label: 'Premium Powder Coat', annualMaint: 0.2, durabilityYrs: 12 },
  { id: 'galvanized', label: 'Hot-Dip Galvanized', annualMaint: 0.1, durabilityYrs: 20 },
];

export default function DFWIronFenceGuide() {
  const [linearFeet, setLinearFeet] = useState(80);
  const [design, setDesign] = useState('flat');
  const [coating, setCoating] = useState('standard');

  const d = DESIGNS.find(x => x.id === design)!;
  const c = COATINGS.find(x => x.id === coating)!;

  const baseMaterialPerFt = 38;
  const materialCost = Math.round(linearFeet * baseMaterialPerFt * d.multiplier);
  const laborCost = Math.round(linearFeet * 14);
  const totalCost = materialCost + laborCost;
  const annualMaint = Math.round(linearFeet * c.annualMaint);
  const touchupCost = Math.round(linearFeet * 4.5);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>⚙️</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Iron & Steel Fence Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
          Ornamental iron is a DFW status symbol — learn how to protect your investment against humidity and rust.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 36 }}>
          {[
            { icon: '🏡', title: 'DFW Front Yard Appeal', body: 'Ornamental iron is dominant in DFW\’s higher-end residential neighborhoods like Highland Park, Southlake, and Westlake. It signals permanence and security without blocking curb views.' },
            { icon: '💧', title: 'DFW Humidity & Rust', body: 'DFW\’s spring humidity combined with clay soil moisture accelerates rust at post bases. Powder coating is not optional — bare iron in DFW will show rust within one season without it.' },
            { icon: '🎨', title: 'Powder Coat Durability', body: 'Premium powder coat adds $3–5/ft but doubles the time before touch-up is needed. In DFW\’s UV-intense summers, the color bonding matters as much as rust protection.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, marginTop: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Iron Fence Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Linear Feet</label>
              <input type="range" min={20} max={300} value={linearFeet} onChange={e => setLinearFeet(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <span style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{linearFeet} ft</span>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Design Style</label>
              <select value={design} onChange={e => setDesign(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {DESIGNS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Coating Type</label>
              <select value={coating} onChange={e => setCoating(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {COATINGS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { label: 'Materials', value: `$${materialCost.toLocaleString()}` },
              { label: 'Labor', value: `$${laborCost.toLocaleString()}` },
              { label: 'Total Installed', value: `$${totalCost.toLocaleString()}` },
              { label: 'Annual Maint.', value: `$${annualMaint}/yr` },
              { label: 'Coating Lifespan', value: `${c.durabilityYrs} yrs` },
              { label: 'Touch-up Cost', value: `$${touchupCost.toLocaleString()}` },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, marginTop: 16, textAlign: 'center', border: '1px solid #1E3A5F' }}>
            <span style={{ color: '#94A3B8', fontSize: 14 }}>
              With <strong style={{ color: '#F5E642′ }}>{c.label}</strong>, plan for touch-up painting in <strong style={{ color: '#F5E642' }}>{c.durabilityYrs} years</strong> — cost est. <strong style={{ color: '#F5E642' }}>${touchupCost.toLocaleString()}</strong>
            </span>
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginTop: 20, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>🛡️ Rust Prevention Protocol</h3>
          {[
            { step: 'At Install', task: 'Verify powder coat covers weld seams and post bases — these are the first rust points in DFW.' },
            { step: 'Annually', task: 'Inspect all post bases at soil level. Apply rust-inhibiting paint to any chips or scratches immediately.' },
            { step: 'Every 5–7 Yrs', task: 'Professional touch-up of full fence. Wire brush any rust spots, prime, then color-match powder coat or spray paint.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, minWidth: 90 }}>{item.step}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
