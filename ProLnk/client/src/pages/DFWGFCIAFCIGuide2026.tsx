import { useState } from 'react';

export default function DFWGFCIAFCIGuide2026() {
  const [room, setRoom] = useState('');

  const rooms = [
    { id: 'kitchen', label: '🍳 Kitchen', gfci: true, afci: true, note: 'GFCI on all countertop outlets within 6ft of sink. AFCI for all kitchen circuits (2014+ NEC).' },
    { id: 'bathroom', label: '🚿 Bathroom', gfci: true, afci: false, note: 'All bathroom outlets require GFCI. AFCI not required in bathrooms.' },
    { id: 'garage', label: '🚗 Garage', gfci: true, afci: false, note: 'All garage outlets require GFCI. Single dedicated circuit typical.' },
    { id: 'outdoor', label: '🌳 Outdoor', gfci: true, afci: false, note: 'Every exterior outlet requires GFCI, weatherproof cover (in-use or not).' },
    { id: 'bedroom', label: '🛏 Bedroom', gfci: false, afci: true, note: 'AFCI required in all bedrooms (NEC 2002+). Protects against arc-fault fires in walls.' },
    { id: 'living', label: '🛋 Living Room', gfci: false, afci: true, note: 'AFCI required in living/family rooms (NEC 2014+). Older DFW homes rarely have this.' },
    { id: 'laundry', label: '🧺 Laundry', gfci: true, afci: false, note: 'GFCI required on laundry room outlets. Dedicated 20A circuit for washer.' },
    { id: 'basement', label: '🏚 Crawlspace / Attic', gfci: true, afci: false, note: 'All unfinished area outlets require GFCI protection.' },
  ];

  const selected = rooms.find(r => r.id === room);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', margin: '0 0 10px' }}>DFW GFCI & AFCI Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>What is required — and what is missing in older DFW homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '💧', label: 'GFCI', value: 'Wet Areas', sub: 'Kitchen, Bath, Garage, Outdoor' },
            { icon: '🔥', label: 'AFCI', value: 'Living Areas', sub: 'Bedrooms, Living, Kitchen' },
            { icon: '💵', label: 'Cost Per Outlet', value: '$35-150', sub: 'Installed by electrician' },
            { icon: '⚠️', label: 'DFW Risk', value: 'High', sub: 'Pre-2000 homes often missing' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#132036', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px' }}>{stat.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginTop: '6px' }}>{stat.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 16px' }}>🏠 Check Your Room</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {rooms.map(r => (
              <button key={r.id} onClick={() => setRoom(r.id === room ? '' : r.id)}
                style={{ padding: '12px', borderRadius: '8px', border: '2px solid', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
                  borderColor: room === r.id ? '#F5E642′ : '#1e3a5f', backgroundColor: room === r.id ? '#1a2e4a' : '#0d1f35', color: room === r.id ? '#F5E642' : '#cbd5e1' }}>
                {r.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: '20px', backgroundColor: '#0d1f35', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px', fontSize: '18px' }}>{selected.label} Requirements</h3>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', backgroundColor: selected.gfci ? '#14532d' : '#1e1e2e', color: selected.gfci ? '#4ade80′ : '#64748b' }}>
                  {selected.gfci ? '✅ GFCI Required' : '❌ GFCI Not Required'}
                </span>
                <span style={{ padding: '6px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '13px', backgroundColor: selected.afci ? '#1e3a5f' : '#1e1e2e', color: selected.afci ? '#60a5fa' : '#64748b' }}>
                  {selected.afci ? '✅ AFCI Required' : '❌ AFCI Not Required'}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6′ }}>{selected.note}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 14px' }}>⚠️ DFW Homes Most At Risk</h2>
          {['Built before 1975: No GFCI anywhere — bathrooms, kitchens, garages all unprotected', 'Built 1975-2000: GFCI in bathrooms only, kitchens and garages often missed', 'Built 2000-2008: GFCI compliant but missing AFCI in bedrooms', 'Homes with DIY wiring: Outlets may be swapped without proper GFCI breaker wiring'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', color: '#cbd5e1', fontSize: '14px' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>▸</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}