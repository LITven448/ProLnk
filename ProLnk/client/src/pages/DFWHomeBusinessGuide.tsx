import { useState } from 'react';

type ZoneResult = { verdict: string; color: string; permits: string[]; hoa: string; parking: string };

const businessZoneMap: Record<string, Record<string, ZoneResult>> = {
  'Online / Digital': {
    Dallas: { verdict: 'Generally Permitted', color: '#22C55E', permits: ['No permit needed for online-only'], hoa: 'Usually no restriction — no client visits, no signage', parking: 'No additional parking required' },
    'Fort Worth': { verdict: 'Generally Permitted', color: '#22C55E', permits: ['Home occupation permit if employing others'], hoa: 'Check CC&Rs — most online businesses are fine', parking: 'No requirement' },
    Frisco: { verdict: 'Permitted with Conditions', color: '#F59E0B', permits: ['Home occupation declaration required'], hoa: 'HOAs common — many restrict any business activity', parking: 'No additional needed' },
    'Unincorporated County': { verdict: 'Most Flexible', color: '#22C55E', permits: ['County business license only'], hoa: 'No HOA in most rural areas', parking: 'No restriction' },
  },
  'Client-Facing Service': {
    Dallas: { verdict: 'Restricted — Permit Required', color: '#F59E0B', permits: ['Home occupation permit', 'Client visit restrictions (hours, frequency)'], hoa: 'Many HOAs prohibit client traffic entirely', parking: '2 additional off-street spaces often required' },
    'Fort Worth': { verdict: 'Conditional Approval', color: '#F59E0B', permits: ['Home occupation permit', 'Max 1-2 clients at a time'], hoa: 'Varies significantly by subdivision', parking: '1-2 extra spaces required' },
    Frisco: { verdict: 'Heavily Restricted', color: '#EF4444', permits: ['Permit unlikely to be approved for client traffic'], hoa: 'Most Frisco HOAs explicitly prohibit client visits', parking: 'Parking variance required — rarely granted' },
    'Unincorporated County': { verdict: 'Permitted with Signage Rules', color: '#22C55E', permits: ['County permit', 'State license if applicable to trade'], hoa: 'No HOA unless subdivision', parking: 'On-site parking required per county code' },
  },
  'Product / Inventory': {
    Dallas: { verdict: 'Restricted — Zoning Review', color: '#EF4444', permits: ['Home occupation permit', 'Storage limits apply', 'No commercial vehicle parking'], hoa: 'Delivery traffic often violates HOA rules', parking: 'Commercial vehicle restrictions' },
    'Fort Worth': { verdict: 'Limited Allowance', color: '#F59E0B', permits: ['Home occupation permit', 'No retail customers at home'], hoa: 'HOA storage and signage restrictions', parking: 'No commercial vehicle overnight' },
    Frisco: { verdict: 'Not Recommended', color: '#EF4444', permits: ['Extremely difficult to permit for inventory'], hoa: 'Most HOAs prohibit visible inventory/deliveries', parking: 'Prohibited' },
    'Unincorporated County': { verdict: 'Most Viable Option', color: '#22C55E', permits: ['County business license', 'Fire marshal inspection if storing flammables'], hoa: 'No HOA restriction in most cases', parking: 'Space on lot required' },
  },
};

const locations = ['Dallas', 'Fort Worth', 'Frisco', 'Unincorporated County'];
const bizTypes = ['Online / Digital', 'Client-Facing Service', 'Product / Inventory'];

export default function DFWHomeBusinessGuide() {
  const [bizType, setBizType] = useState(bizTypes[0]);
  const [location, setLocation] = useState(locations[0]);
  const result = businessZoneMap[bizType]?.[location];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2 }}>DFW HOME BUSINESS GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Run a Business from Your DFW Home</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>Zoning rules, HOA restrictions, permits, and where DFW gives you the most flexibility.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[['🌐', 'Online Businesses', 'Most flexible — no client traffic, no signage issues in most zones'],['🤝', 'Client-Facing', 'Need permit in most cities; HOAs often prohibit client visits'],['📦', 'Product/Inventory', 'Storage limits apply; county land often the only viable option'],['🚫', 'Prohibited Everywhere', 'Manufacturing, hazardous materials, heavy commercial equipment']].map(([ico, title, desc]) => (
            <div key={title as string} style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{ico as string}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title as string}</div>
              <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚠️ HOA Warning for DFW</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Over 70% of DFW homeowners live in an HOA. HOA CC&Rs are a separate legal layer from city zoning — and often stricter. Even if the city permits your home business, your HOA can prohibit signage, delivery vehicles, client parking, and visible inventory. Always review your CC&Rs before starting any business activity.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🔍 Zoning Check Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>BUSINESS TYPE</label>
              <select value={bizType} onChange={e => setBizType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {bizTypes.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>DFW LOCATION</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div>
              <div style={{ borderLeft: `4px solid ${result.color}`, background: '#0A1628', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: result.color, marginBottom: 4 }}>{result.verdict}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>📋 PERMIT REQUIREMENTS</div>
                  {result.permits.map(p => <div key={p} style={{ fontSize: 13, color: '#E8EDF5', marginBottom: 4 }}>• {p}</div>)}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>🏘️ HOA CONSIDERATION</div>
                  <div style={{ fontSize: 13, color: '#E8EDF5′ }}>{result.hoa}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>🚗 PARKING RULES</div>
                  <div style={{ fontSize: 13, color: '#E8EDF5′ }}>{result.parking}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
