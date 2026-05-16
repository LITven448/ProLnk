import { useState } from 'react';

const features = [
  { id: 'grill', label: 'Built-in Grill', icon: '🔥', basic: 1200, mid: 3500, luxury: 8000, desc: 'Gas or charcoal — centerpiece of any outdoor kitchen' },
  { id: 'counter', label: 'Countertop (10ft)', icon: '🪨', basic: 800, mid: 2500, luxury: 6000, desc: 'Concrete, tile, or quartzite for Texas heat resistance' },
  { id: 'sink', label: 'Outdoor Sink', icon: '🚰', basic: 600, mid: 1200, luxury: 2500, desc: 'Requires plumbing rough-in — plan during build phase' },
  { id: 'fridge', label: 'Outdoor Fridge', icon: '🧊', basic: 400, mid: 900, luxury: 2200, desc: 'Marine-grade stainless rated for outdoor humidity' },
  { id: 'pergola', label: 'Pergola/Cover', icon: '🏛️', basic: 2000, mid: 6000, luxury: 15000, desc: 'Essential for DFW — provides shade in 100°F+ summers' },
  { id: 'pizza', label: 'Pizza Oven', icon: '🍕', basic: 0, mid: 1800, luxury: 5000, desc: 'Wood-fired or gas — premium feature for entertainers' },
  { id: 'bar', label: 'Outdoor Bar', icon: '🍺', basic: 0, mid: 2000, luxury: 6000, desc: 'Bar height counter with seating — party centerpiece' },
  { id: 'lighting', label: 'Lighting & Fans', icon: '💡', basic: 300, mid: 800, luxury: 2500, desc: 'LED + ceiling fans critical for DFW summer evenings' },
  { id: 'storage', label: 'Storage Drawers', icon: '🗄️', basic: 400, mid: 900, luxury: 2500, desc: 'Stainless pull-out drawers rated for weather' },
];

const materials = [
  { material: 'Concrete block + stucco', cost: 'Low', durability: 'Excellent', heat: 'Great', look: 'Traditional', note: 'Most common in DFW' },
  { material: 'Steel stud + cement board', cost: 'Low-Medium', durability: 'Very Good', heat: 'Great', look: 'Modern', note: 'Lighter, faster build' },
  { material: 'Natural stone', cost: 'High', durability: 'Excellent', heat: 'Excellent', look: 'Luxury', note: 'Premium curb appeal' },
  { material: 'Brick', cost: 'Medium', durability: 'Excellent', heat: 'Excellent', look: 'Classic Texas', note: 'Matches most DFW homes' },
];

const permits = [
  { city: 'Dallas', permit: 'Required >$1,500 value', plumbing: 'Required if adding sink', electrical: 'Required' },
  { city: 'Fort Worth', permit: 'Required for structures', plumbing: 'Required', electrical: 'Required' },
  { city: 'Plano', permit: 'Required', plumbing: 'Required', electrical: 'Required' },
  { city: 'Frisco', permit: 'Required', plumbing: 'Required', electrical: 'Required' },
];

export default function OutdoorKitchenGuide() {
  const [tier, setTier] = useState<'basic' | 'mid' | 'luxury'>('mid');
  const [selected, setSelected] = useState<Set<string>>(new Set(['grill', 'counter', 'pergola', 'lighting']));

  const toggleFeature = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const total = features.reduce((sum, f) => selected.has(f.id) ? sum + f[tier] : sum, 0);
  const addOns = features.filter(f => !selected.has(f.id) && f[tier] > 0).slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔥</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
            DFW Outdoor Kitchen Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>
            North Texas outdoor living culture, materials built for Texas heat, permit requirements, and interactive budget builder
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>🌟 The DFW Outdoor Living Culture</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 10 }}>
            DFW homeowners spend more on outdoor living than almost any other metro in the US. With 230+ sunny days per year 
            and a culture built around backyard entertaining, outdoor kitchens are one of the highest-ROI home improvements in North Texas — 
            returning 60–80% of cost at resale.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            The key to DFW outdoor kitchens: build for the heat. Materials that look great in temperate climates can crack, fade, 
            and warp in Texas summers. Every choice should be rated for extreme heat and UV exposure.
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>🪨 Material Choices for Texas Heat</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Material', 'Cost', 'Durability', 'Heat Rating', 'Look', 'DFW Note'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#94A3B8', borderBottom: '2px solid #0A1628', fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0A1628' }}>
                    <td style={{ padding: '10px 12px', color: '#E8EDF5', fontWeight: 600 }}>{m.material}</td>
                    <td style={{ padding: '10px 12px', color: '#F5E642' }}>{m.cost}</td>
                    <td style={{ padding: '10px 12px', color: '#4ADE80' }}>{m.durability}</td>
                    <td style={{ padding: '10px 12px', color: '#60A5FA' }}>{m.heat}</td>
                    <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{m.look}</td>
                    <td style={{ padding: '10px 12px', color: '#64748B', fontSize: 13 }}>{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>📋 Permit Requirements by DFW City</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {permits.map((p, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr', gap: 8, alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#F5E642' }}>{p.city}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}><span style={{ color: '#64748B' }}>Build: </span>{p.permit}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}><span style={{ color: '#64748B' }}>Plumbing: </span>{p.plumbing}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}><span style={{ color: '#64748B' }}>Electric: </span>{p.electrical}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>
            * Always verify current requirements with your city's building department before starting work
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>🧮 Outdoor Kitchen Budget Builder</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ color: '#94A3B8', fontSize: 14, alignSelf: 'center', marginRight: 8 }}>Build tier:</span>
            {(['basic', 'mid', 'luxury'] as const).map(t => (
              <button key={t} onClick={() => setTier(t)}
                style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  background: tier === t ? '#F5E642' : '#0A1628', color: tier === t ? '#0A1628' : '#94A3B8' }}>
                {t === 'basic' ? '🔨 Basic' : t === 'mid' ? '⭐ Mid-Range' : '💎 Luxury'}
              </button>
            ))}
          </div>
          <p style={{ color: '#64748B', fontSize: 13, marginBottom: 16 }}>Click features to add/remove from your build:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12, marginBottom: 24 }}>
            {features.map(f => {
              const isSelected = selected.has(f.id);
              const price = f[tier];
              return (
                <div key={f.id} onClick={() => toggleFeature(f.id)}
                  style={{ background: isSelected ? '#1A3050' : '#0A1628', borderRadius: 10, padding: 16, cursor: 'pointer',
                    border: `2px solid ${isSelected ? '#F5E642' : '#1E2D45'}`, transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 20 }}>{f.icon}</span>
                      <span style={{ fontWeight: 600, color: isSelected ? '#F5E642' : '#E8EDF5', fontSize: 14 }}>{f.label}</span>
                    </div>
                    <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: 14 }}>{price > 0 ? `$${price.toLocaleString()}` : 'N/A'}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#E8EDF5' }}>Estimated Total</span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>${total.toLocaleString()}</span>
            </div>
            {addOns.length > 0 && (
              <div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Recommended add-ons:</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {addOns.map(a => (
                    <span key={a.id} style={{ background: '#1E2D45', padding: '4px 12px', borderRadius: 20, fontSize: 13, color: '#60A5FA', cursor: 'pointer' }}
                      onClick={() => toggleFeature(a.id)}>
                      + {a.icon} {a.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Outdoor Kitchen Quotes in DFW</h3>
          <p style={{ color: '#1E3A5F', marginBottom: 16 }}>Vetted local contractors specializing in Texas outdoor living</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
