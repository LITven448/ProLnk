import { useState } from 'react';

const systems = [
  { name: 'ADT', monitoring: 36.99, equipment: 0, contract: '36 months', cellular: true, discount: '15-20%', best: 'Professional install + 24/7 support' },
  { name: 'SimpliSafe', monitoring: 19.99, equipment: 299, contract: 'Month-to-month', cellular: true, discount: '10-15%', best: 'No contract, easy DIY' },
  { name: 'Ring Alarm Pro', monitoring: 20.00, equipment: 249, contract: 'Month-to-month', cellular: true, discount: '5-10%', best: 'Amazon ecosystem integration' },
  { name: 'Vivint', monitoring: 39.99, equipment: 0, contract: '60 months', cellular: true, discount: '15-20%', best: 'Smart home + security combo' },
];

const recs: Record<string, Record<string, string>> = {
  small: { burglary: '🏆 SimpliSafe — easy DIY, month-to-month, cellular backup for ERCOT outages. Perfect for apartments/condos.', fire: '🔥 Ring Alarm Pro — includes smoke/CO integration, affordable monitoring, cellular backup.', both: '✅ SimpliSafe Standard — burglary + smoke + CO, no contract, ERCOT-resilient cellular.' },
  medium: { burglary: '🥇 ADT or SimpliSafe — professional monitoring with cellular backup critical for DFW ERCOT grid instability.', fire: '🔥 ADT — best smoke/CO integration, professional 24/7 response, insurance discounts up to 20%.', both: '🏠 ADT Essential — comprehensive coverage, 15-20% insurance discount, handles DFW storm monitoring too.' },
  large: { burglary: '🛡️ Vivint — smart home integration, professional install, enterprise-grade sensors for large footprint.', fire: '🔥 ADT Command — whole-home smoke/CO/flood integration, professional monitoring, max insurance discount.', both: '🏆 Vivint or ADT — both offer whole-home integration with fire + flood + burglary for large DFW properties.' },
};

export default function DFWAlarmSystemGuide2026() {
  const [homeSize, setHomeSize] = useState('');
  const [concern, setConcern] = useState('');

  const rec = homeSize && concern ? recs[homeSize]?.[concern] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚨🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Alarm System Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Cellular backup · ERCOT outage resilience · DFW insurance discounts</p>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>⚡ ERCOT Outage Requirement</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>DFW experienced multiple multi-day ERCOT grid failures. Internet-only alarms go offline during outages. <strong style={{ color: '#fff' }}>Cellular backup is mandatory</strong> — all systems below include cellular. Non-cellular systems are not recommended for DFW.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {systems.map(s => (
            <div key={s.name} style={{ backgroundColor: '#112240', borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>${s.monitoring}/mo monitoring</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Equipment: {s.equipment > 0 ? `$${s.equipment}` : 'Included'}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Contract: {s.contract}</div>
              <div style={{ fontSize: 12, color: '#22c55e', marginBottom: 2 }}>Insurance discount: {s.discount}</div>
              <div style={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, backgroundColor: '#0A1628', marginTop: 4, color: '#94a3b8′ }}>Best: {s.best}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💰 DFW Insurance Discount Math</h2>
          {[
            { label: 'Average DFW homeowner insurance', value: '$3,200/year' },
            { label: 'ADT/Vivint monitored discount (15-20%)', value: '$480-$640/year saved' },
            { label: 'SimpliSafe/Ring discount (10-15%)', value: '$320-$480/year saved' },
            { label: 'Payback period on $299 equipment', value: '6-9 months' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 13 }}>
              <span style={{ color: '#94a3b8′ }}>{item.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Find Your Alarm System</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, fontSize: 13 }}>
                <option value="">Select…</option>
                <option value="small">Under 2,000 sqft</option>
                <option value="medium">2,000–4,000 sqft</option>
                <option value="large">4,000+ sqft</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Primary Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, fontSize: 13 }}>
                <option value="">Select…</option>
                <option value="burglary">Burglary / Intrusion</option>
                <option value="fire">Fire / Smoke / CO</option>
                <option value="both">Full Protection (Both)</option>
              </select>
            </div>
          </div>
          {rec && <div style={{ backgroundColor: '#0A1628', padding: 16, borderRadius: 8, fontSize: 14, borderLeft: '3px solid #F5E642′ }}>{rec}</div>}
        </div>

        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>🔗 ProLnk connects you with ADT-authorized and independent alarm installers across all DFW zip codes.</p>
        </div>
      </div>
    </div>
  );
}