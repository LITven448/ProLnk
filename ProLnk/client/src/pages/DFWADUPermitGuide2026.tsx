import { useState } from 'react';

const cities = [
  { name: 'Dallas', allowed: true, restrictions: 'ADUs allowed with conditions. Max 1,400 sq ft or 50% of primary home (lesser). Owner must occupy primary or ADU. Setback 5ft side/rear.', timeline: '8-12 weeks', notes: 'Dallas adopted ADU-friendly zoning in 2023. Detached and attached ADUs permitted in RS districts. Full building permit required.' },
  { name: 'Fort Worth', allowed: true, restrictions: 'ADUs allowed in single-family zones. Max 800 sq ft. Owner-occupancy required. Alley-access garage conversions popular.', timeline: '6-10 weeks', notes: 'Fort Worth permits accessory dwelling units as of 2021 update. Must meet parking requirements (1 space per ADU).' },
  { name: 'Plano', allowed: false, restrictions: 'Plano does not currently allow detached ADUs in most single-family zones. Attached in-law suites may be permitted with limitations.', timeline: 'N/A', notes: 'Check Plano Development Services for your specific zoning district. Variances are possible but difficult.' },
  { name: 'Frisco', allowed: false, restrictions: 'Frisco generally restricts ADUs. Guest houses allowed in some large-lot zones (>1 acre) with conditional use permit. Check current UDC.', timeline: 'Varies', notes: 'Frisco is reviewing ADU policy. Contact Frisco Planning Division for current status before investing in plans.' },
  { name: 'McKinney', allowed: false, restrictions: 'McKinney currently prohibits standalone ADUs in standard SF zones. Attached accessory spaces allowed with restrictions.', timeline: 'N/A', notes: 'McKinney is evaluating ADU allowances. Contact Community Development for zoning variance process.' },
  { name: 'Arlington', allowed: true, restrictions: 'Arlington permits ADUs in SF-6 and larger zones. Max 650 sq ft. Must match primary structure architecture. Utility connection fees apply.', timeline: '6-9 weeks', notes: 'Arlington passed ADU ordinance in 2022. Owner-occupancy required. Separate utility meter may be required.' },
  { name: 'Garland', allowed: true, restrictions: 'Garland allows ADUs as secondary dwelling units. Max 1,000 sq ft. Alley lots have additional options. Owner occupancy required.', timeline: '5-8 weeks', notes: 'Garland permits detached ADUs in SF zones. Parking: 1 additional off-street space required.' },
];

export default function DFWADUPermitGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const city = cities.find(c => c.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW ADU Permit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Accessory dwelling unit permit feasibility across DFW cities</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>🏘️ WHAT IS AN ADU?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Detached backyard cottage','Garage apartment conversion','Attached in-law suite','Basement apartment','Above-garage unit','Manufactured / modular ADU'].map(r => (
              <div key={r} style={{ background: '#1a2f50', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#cbd5e1′ }}>🏡 {r}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Check ADU feasibility by city:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
            {cities.map(c => (
              <button key={c.name} onClick={() => setSelected(c.name)}
                style={{ background: selected === c.name ? '#F5E642′ : '#1a2f50', color: selected === c.name ? '#0A1628' : '#fff', border: '1px solid #2a4070', borderRadius: 8, padding: '10px 8px', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {city && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: city.allowed ? '2px solid #4ade80′ : '2px solid #f87171' }}>
            <h2 style={{ color: city.allowed ? '#4ade80′ : '#f87171', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>
              {city.allowed ? '✅' : '❌'} {city.name} — ADU Feasibility
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ADU STATUS</p>
                <p style={{ color: city.allowed ? '#4ade80′ : '#f87171', fontWeight: 700 }}>{city.allowed ? '✅ Generally Permitted' : '❌ Restricted / Not Permitted'}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>KEY RESTRICTIONS</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.restrictions}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ADDITIONAL NOTES</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.notes}</p>
              </div>
              {city.allowed && (
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT TIMELINE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>📅 {city.timeline}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          <p>ProLnk connects DFW homeowners with ADU specialists who know local zoning rules and manage permits.</p>
        </div>
      </div>
    </div>
  );
}