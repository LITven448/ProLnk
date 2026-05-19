import { useState } from 'react';

export default function DFWOutdoorElectricalGuide2026() {
  const [feature, setFeature] = useState('');

  const features = [
    { id: 'lighting', label: '💡 Outdoor Lighting', gfci: true, permit: false, cost: '$200–600', note: 'Landscape lighting circuits, security lights, motion sensors. All outdoor outlets require GFCI per NEC.' },
    { id: 'holiday', label: '🎄 Holiday Outlet Circuit', gfci: true, permit: false, cost: '$150–400', note: 'Dedicated 20A outdoor circuit with weatherproof outlet. Prevents tripped breakers during holiday displays.' },
    { id: 'pool', label: '🏊 Pool / Spa', gfci: true, permit: true, cost: '$800–2,500', note: 'NEC Article 680: bonding, GFCI on all pool circuits, underwater light wiring. Permit + inspection required.' },
    { id: 'kitchen', label: '🍖 Outdoor Kitchen', gfci: true, permit: true, cost: '$600–1,800', note: 'Dedicated circuits for grill igniter, fridge, outlets. GFCI on all outlets. Permit required for new circuits.' },
    { id: 'ev', label: '🔌 EV Charger', gfci: false, permit: true, cost: '$800–2,000', note: '50A or 60A 240V dedicated circuit. Weatherproof outlet or hardwired EVSE. Permit required in all DFW cities.' },
    { id: 'workshop', label: '🔧 Detached Garage / Shop', gfci: true, permit: true, cost: '$1,000–3,500', note: 'Subpanel required for detached structures. Underground conduit from main panel. GFCI on all outlets.' },
  ];

  const selected = features.find(f => f.id === feature);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌳</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', margin: '0 0 10px' }}>DFW Outdoor Electrical Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Lighting, pools, kitchens, EV chargers — what DFW code requires</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '💧', label: 'GFCI', value: 'All Outdoor Outlets', sub: 'Required by NEC' },
            { icon: '🌧️', label: 'Covers', value: 'Weatherproof Required', sub: 'In-use covers outdoors' },
            { icon: '🏊', label: 'Pool Bonding', value: 'Mandatory', sub: 'NEC 680 compliance' },
            { icon: '📋', label: 'Permits', value: 'New Circuits', sub: 'Most DFW municipalities' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#132036', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px' }}>{stat.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '14px', marginTop: '6px' }}>{stat.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 16px' }}>🏡 Select Your Outdoor Feature</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
            {features.map(f => (
              <button key={f.id} onClick={() => setFeature(f.id === feature ? '' : f.id)}
                style={{ padding: '14px', borderRadius: '8px', border: '2px solid', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
                  borderColor: feature === f.id ? '#F5E642' : '#1e3a5f', backgroundColor: feature === f.id ? '#1a2e4a' : '#0d1f35', color: feature === f.id ? '#F5E642' : '#cbd5e1' }}>
                {f.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: '20px', backgroundColor: '#0d1f35', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px', fontSize: '18px' }}>{selected.label}</h3>
              <p style={{ color: '#cbd5e1', margin: '0 0 14px', lineHeight: '1.6' }}>{selected.note}</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ padding: '5px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', backgroundColor: selected.gfci ? '#14532d' : '#2d1515', color: selected.gfci ? '#4ade80' : '#ef4444' }}>
                  {selected.gfci ? '✅ GFCI Required' : '❌ No GFCI Required'}
                </span>
                <span style={{ padding: '5px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', backgroundColor: selected.permit ? '#1e3a5f' : '#2d1515', color: selected.permit ? '#60a5fa' : '#94a3b8' }}>
                  {selected.permit ? '📋 Permit Required' : '📋 Permit May Not Be Required'}
                </span>
                <span style={{ padding: '5px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', backgroundColor: '#1a2e1a', color: '#4ade80' }}>
                  💰 {selected.cost}
                </span>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 14px' }}>⚠️ DFW Outdoor Electrical Mistakes</h2>
          {['Using indoor outlets outdoors — not rated for weather, creates shock hazard', 'Pool wiring without bonding — NEC 680 requires bonding all metal pool components', 'Running extension cords permanently outdoors — fire and code violation', 'No permit on new outdoor circuits — fails home inspection at sale time'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', color: '#cbd5e1', fontSize: '14px' }}>
              <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}