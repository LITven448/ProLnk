import { useState } from 'react';

const WOOD_TYPES = [
  { id: 'cedar', label: 'Cedar', costPer: 18, lifespan: 20, maintenance: 'Low' },
  { id: 'pine', label: 'Pine (Treated)', costPer: 12, lifespan: 15, maintenance: 'Medium' },
  { id: 'redwood', label: 'Redwood', costPer: 28, lifespan: 25, maintenance: 'Low' },
];

const STYLES = [
  { id: 'privacy', label: 'Privacy (6ft)', multiplier: 1.0 },
  { id: 'picket', label: 'Picket (4ft)', multiplier: 0.65 },
  { id: 'splitrail', label: 'Split Rail (3-rail)', multiplier: 0.45 },
];

export default function DFWWoodFenceGuide() {
  const [linearFeet, setLinearFeet] = useState(150);
  const [woodType, setWoodType] = useState('cedar');
  const [style, setStyle] = useState('privacy');

  const wood = WOOD_TYPES.find(w => w.id === woodType)!;
  const st = STYLES.find(s => s.id === style)!;
  const baseCost = Math.round(linearFeet * wood.costPer * st.multiplier);
  const laborCost = Math.round(linearFeet * 8);
  const totalCost = baseCost + laborCost;
  const annualMaint = wood.id === 'pine' ? Math.round(linearFeet * 0.75) : Math.round(linearFeet * 0.35);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🌲</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Wood Fence Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
          Wood is the #1 fencing choice in DFW — right balance of cost, curb appeal, and local character.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 36 }}>
          {[
            { icon: '🌡️', title: 'DFW Climate Reality', body: 'DFW summers hit 100°F+ regularly. Cedar naturally resists warping and cracking better than untreated pine in this heat. Redwood is premium but harder to source locally.' },
            { icon: '🧱', title: 'Clay Soil Warning', body: 'DFW clay soil expands and contracts with moisture. Wood posts must be set in concrete footings 24–30" deep — never just compacted dirt or posts will lean within 2 years.' },
            { icon: '🎨', title: 'Stain vs Paint', body: 'Always stain in DFW, never paint. DFW UV breaks down paint quickly, causing peeling. Penetrating stain flexes with wood movement and lasts 3–5 years per coat.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, marginTop: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Cost & Lifespan Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Linear Feet</label>
              <input type="range" min={50} max={500} value={linearFeet} onChange={e => setLinearFeet(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <span style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{linearFeet} ft</span>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Wood Type</label>
              <select value={woodType} onChange={e => setWoodType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {WOOD_TYPES.map(w => <option key={w.id} value={w.id}>{w.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {STYLES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { label: 'Materials', value: `$${baseCost.toLocaleString()}` },
              { label: 'Labor', value: `$${laborCost.toLocaleString()}` },
              { label: 'Total Installed', value: `$${totalCost.toLocaleString()}` },
              { label: 'Lifespan', value: `${wood.lifespan} yrs` },
              { label: 'Annual Maint.', value: `$${annualMaint}/yr` },
              { label: 'Maintenance', value: wood.maintenance },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginTop: 20, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>📅 DFW Maintenance Schedule</h3>
          {[
            { period: 'Every Spring', task: 'Inspect posts at ground level for rot or leaning. Tighten loose hardware.' },
            { period: 'Every 3–5 Years', task: 'Re-stain entire fence. Clean with fence wash first. DFW UV degrades stain faster than northern climates.' },
            { period: 'After Major Storms', task: 'Check for leaning sections — DFW clay soil shifts dramatically after heavy rain.' },
          ].map(item => (
            <div key={item.period} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, minWidth: 120 }}>{item.period}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
