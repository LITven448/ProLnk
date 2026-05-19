import { useState } from 'react';

export default function DFWLiveOakGuide2026() {
  const [propertySize, setPropertySize] = useState('medium');
  const [placement, setPlacement] = useState('front');

  const guide: Record<string, Record<string, string>> = {
    small: {
      front: 'One Live Oak centered in front yard, minimum 20ft from foundation. At maturity (80ft spread) it will define the property. Expect 30 years to full canopy — plant now.',
      side: 'Side yard with 20ft clearance from structure. Roots will eventually reach under driveway — install root barriers at 15ft radius during planting.',
      back: 'Back corner placement, 25ft from fence line. Live Oak canopy will eventually overhang neighbors — communicate early and plan for cooperative pruning.',
    },
    medium: {
      front: 'Two Live Oaks flanking entry at 30ft spacing. Keep 20ft from foundation. They’ll merge canopies in 40 years creating a signature shade arch.',
      side: 'Single Live Oak on north or east side — avoids afternoon root stress + foundation proximity. Root barrier strongly recommended within 25ft of slab.',
      back: 'Back yard specimen tree 30ft from structure. Pair with Cedar Elm for faster early shade while Live Oak establishes its century-long presence.',
    },
    large: {
      front: 'Oak allee possible on large lots — 40ft between trees, 30ft from structure. Coordinate with arborist for root zone mapping before planting.',
      side: 'Multiple trees possible. Create a grove-style planting at 35ft spacing. Live Oak groves develop root grafts — interconnected canopy and shared root system.',
      back: 'Acreage planting: 50ft spacing for individual canopy development. Root zone will extend 1.5x canopy width — map utility lines before any planting.',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🌿</div>
        <h1 style={{ fontSize: '2rem', color: '#F5E642', marginBottom: '.5rem' }}>DFW Live Oak Tree Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The Live Oak — DFW's most majestic tree, century lifespan, and one deadly disease window you must respect.</p>

        <div style={{ background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#fca5a5', margin: '0 0 .5rem 0' }}>🚫 NEVER Prune Live Oaks February–June</h2>
          <p style={{ color: '#fecaca', margin: 0 }}>Oak wilt beetles are active Feb–June. Fresh pruning cuts attract them instantly. If you MUST prune in this window due to storm damage, paint every cut immediately with wound sealant. Violating this rule can kill an entire grove through root grafts.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '📅', label: 'Leaf Drop', value: 'March (New Leaves Push)' }, { icon: '📏', label: 'Foundation Clearance', value: '20+ Feet Minimum' }, { icon: '⏳', label: 'Lifespan', value: '100–500+ Years' }, { icon: '🌿', label: 'Type', value: 'Evergreen (DFW)' }].map(s => (
            <div key={s.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📍 Placement Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '.5rem' }}>Property Size</label>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {['small', 'medium', 'large'].map(s => (
                <button key={s} onClick={() => setPropertySize(s)} style={{ padding: '.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: propertySize === s ? '#F5E642' : '#334155', color: propertySize === s ? '#0A1628' : '#fff', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '.5rem' }}>Placement Area</label>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {['front', 'side', 'back'].map(p => (
                <button key={p} onClick={() => setPlacement(p)} style={{ padding: '.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: placement === p ? '#F5E642' : '#334155', color: placement === p ? '#0A1628' : '#fff', fontWeight: 600, textTransform: 'capitalize' }}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0' }}>{guide[propertySize][placement]}</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔗</div>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: 0 }}>ProLnk connects DFW homeowners with ISA-certified arborists for Live Oak planting, oak wilt treatment, and safe pruning.</p>
        </div>
      </div>
    </div>
  );
}
