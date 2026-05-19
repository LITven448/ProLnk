import { useState } from 'react';

const locations = [
  { id: 'uptown', label: 'Uptown Dallas', hoa: '$450–600/mo', notes: 'High-rise luxury, valet parking, rooftop pools, walkable to restaurants' },
  { id: 'legacy', label: 'Legacy West Plano', hoa: '$350–500/mo', notes: 'Mixed-use, tech-hub adjacent, modern mid-rise, pet-friendly' },
  { id: 'lascolinas', label: 'Las Colinas Irving', hoa: '$300–450/mo', notes: 'Waterfront views, canal access, corporate corridor, easy DFW airport access' },
  { id: 'downtown', label: 'Downtown Dallas', hoa: '$400–550/mo', notes: 'Arts District, converted lofts, walkable, historic buildings' },
];

const fhaVa = [
  { label: 'FHA Approved', note: 'Fewer than 15% units delinquent on HOA dues; project must meet HUD guidelines' },
  { label: 'VA Approved', note: 'Condo project on VA-approved list; check VA WEBLGY portal before contract' },
  { label: 'Resale Restrictions', note: 'Some HOAs cap resale price appreciation — review CC&Rs before offer' },
  { label: 'Owner-Occupancy Ratio', note: 'FHA requires 50%+ owner-occupants; heavy investor ownership can disqualify' },
];

export default function DFWCondoBuyingGuide2026() {
  const [selected, setSelected] = useState('uptown');
  const active = locations.find((l) => l.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>🏙️ ProLnk Guide · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Condo Buying Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>HOA fees, FHA/VA approval, and what you actually own in DFW condos.</p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🗺️ Choose a DFW Condo Market</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {locations.map((l) => (
              <button key={l.id} onClick={() => setSelected(l.id)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selected === l.id ? '#F5E642′ : '#1e2e4a', color: selected === l.id ? '#0A1628' : '#94a3b8' }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{active.label}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>💰 Typical HOA: <span style={{ color: '#fff' }}>{active.hoa}</span></div>
            <div style={{ fontSize: 13, color: '#94a3b8′ }}>{active.notes}</div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📋 What HOA Fees Typically Cover</div>
          {['Exterior building maintenance & roof', 'Landscaping and common areas', 'Shared amenities (pool, gym, concierge)', 'Master insurance policy (structure only)', 'Trash removal and water in many buildings'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: '#F5E642′ }}>✓</span><span style={{ color: '#cbd5e1' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏦 FHA/VA & Financing Flags</div>
          {fhaVa.map((item) => (
            <div key={item.label} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #1e2e4a' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Get Condo-Specialist Help</div>
          <div style={{ fontSize: 13, color: '#1e2e4a' }}>ProLnk connects you with DFW condo inspectors, HOA attorneys, and buyer agents.</div>
        </div>
      </div>
    </div>
  );
}
