import { useState } from 'react';

const stats = [
  { icon: '📈', label: 'Fastest-Growing Major Metro', value: '#1 in the US', sub: 'More people move to DFW every month than any other US metro area.' },
  { icon: '🏠', label: 'New Homes Built Annually', value: '90,000+', sub: 'Each new home needs 8–12 service providers in year one alone.' },
  { icon: '📞', label: 'Daily Home Service Calls', value: '42,000+', sub: 'Across plumbing, HVAC, electrical, landscaping, and general repair.' },
  { icon: '🔧', label: 'Contractor Shortage', value: 'Critical Level', sub: '67% of homeowners report waiting 5+ days to get a qualified pro.' },
];

const tradeMarkets: Record<string, { size: string; potential: string }> = {
  plumber: { size: '$2.1B annual DFW market', potential: 'Est. 340 active partners in 12 months at full penetration.' },
  electrician: { size: '$1.8B annual DFW market', potential: 'Est. 280 active partners in 12 months — new construction drives demand.' },
  hvac: { size: '$2.6B annual DFW market', potential: 'Est. 410 active partners in 12 months — summers alone justify the model.' },
  roofing: { size: '$1.4B annual DFW market', potential: 'Est. 220 active partners in 12 months — hail season creates surges.' },
  general: { size: '$3.2B annual DFW market', potential: 'Est. 520 active partners in 12 months across all service types.' },
};

const zones = ['North Dallas / Frisco', 'Plano / Allen', 'Fort Worth / Keller', 'Arlington / Mansfield', 'Irving / Las Colinas', 'McKinney / Celina', 'Southlake / Colleyville'];

export default function PartnerDFWGrowthOpportunityGuide() {
  const [trade, setTrade] = useState('');
  const [zone, setZone] = useState('');
  const result = trade ? tradeMarkets[trade] : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>🌟</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>Why DFW Is the Best Market</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>The data behind why ProLnk started in Dallas-Fort Worth and why your timing is perfect.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, margin: '4px 0' }}>{s.value}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>🎯 Your Addressable Market</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Trade Specialty</label>
              <select value={trade} onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628' }}>
                <option value=''>Select trade...</option>
                <option value='plumber'>Plumbing</option>
                <option value='electrician'>Electrical</option>
                <option value='hvac'>HVAC</option>
                <option value='roofing'>Roofing</option>
                <option value='general'>General / Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Starting Zone</label>
              <select value={zone} onChange={e => setZone(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628' }}>
                <option value=''>Select zone...</option>
                {zones.map((z, i) => <option key={i} value={z}>{z}</option>)}
              </select>
            </div>
          </div>
          {result && zone && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{zone} — {trade.charAt(0).toUpperCase() + trade.slice(1)}</div>
              <div style={{ color: '#E2E8F0', fontSize: 15, marginBottom: 6 }}>📊 {result.size}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>🚀 {result.potential}</div>
            </div>
          )}
          {(!trade || !zone) && (
            <p style={{ color: '#94A3B8', margin: 0 }}>Select your trade and starting zone to see your addressable market.</p>
          )}
        </div>
      </div>
    </div>
  );
}
