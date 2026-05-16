import { useState } from 'react';

export default function DFWPropertyManagementProLnkGuide() {
  const [units, setUnits] = useState('');
  const [requestsPerMonth, setRequestsPerMonth] = useState('');
  const [result, setResult] = useState<{ timeSaved: string; costReduction: string; satisfaction: string } | null>(null);

  function calculate() {
    const u = parseInt(units) || 0;
    const r = parseInt(requestsPerMonth) || 0;
    if (!u || !r) return;
    const hoursPerRequest = 1.8;
    const proLnkHours = 0.4;
    const totalHoursSaved = Math.round((hoursPerRequest - proLnkHours) * r);
    const avgCostPerReq = 285;
    const proLnkCost = 240;
    const savings = (avgCostPerReq - proLnkCost) * r;
    const satisfactionGain = r > 30 ? '+22%' : r > 15 ? '+17%' : '+12%';
    setResult({
      timeSaved: `${totalHoursSaved} hrs/month`,
      costReduction: `$${savings.toLocaleString()}/month`,
      satisfaction: satisfactionGain,
    });
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🏢</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>ProLnk for DFW Property Managers</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>Manage maintenance requests faster, keep tenants happy, and reduce vendor costs across your DFW portfolio.</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32 }}>
          {[['⚡', 'Faster Response', '4-hour average match vs 2-day industry avg'], ['💰', 'Bulk Discounts', 'Volume pricing for 10+ requests/month'], ['📊', 'Full Reporting', 'Work order history, cost tracking, vendor scorecards']].map(([icon, title, desc]) => (
            <div key={title as string} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#64748B' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginTop: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 16 }}>🔧 Maintenance Request Workflow</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['1', 'Tenant submits request', 'Via your portal or ProLnk SMS hotline'],['2', 'ProLnk auto-matches', 'Best available contractor in under 4 hours'],['3', 'Work completed', 'Contractor updates status in real time'],['4', 'You get the report', 'Invoice, photos, and completion certificate']].map(([step, title, desc]) => (
              <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{step}</div>
                <div><div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15 }}>{title}</div><div style={{ color: '#64748B', fontSize: 13 }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginTop: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 16 }}>📋 Preferred Contractor Network Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Background-checked contractors', 'License verification on file', 'Insurance certificates stored', 'Rated by property managers like you', 'No surprise invoicing', 'Consistent DFW service area coverage'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#22C55E', fontSize: 16 }}>✔</span>
                <span style={{ fontSize: 14, color: '#334155' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>📈 Calculate Your ROI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Units Managed</label>
              <input type="number" value={units} onChange={e => setUnits(e.target.value)} placeholder="e.g. 120" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0F2040', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Monthly Service Requests</label>
              <input type="number" value={requestsPerMonth} onChange={e => setRequestsPerMonth(e.target.value)} placeholder="e.g. 25" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0F2040', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Calculate Savings →</button>
          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
              {[['⏱️ Time Saved', result.timeSaved], ['💰 Cost Reduction', result.costReduction], ['😊 Tenant Satisfaction', result.satisfaction]].map(([label, value]) => (
                <div key={label as string} style={{ background: '#0F2040', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>{label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 18, marginBottom: 8 }}>🚀 Join DFW Property Managers on ProLnk</h3>
          <p style={{ color: '#0A1628', fontSize: 14, marginBottom: 16 }}>Get a dedicated account manager and volume pricing for your portfolio.</p>
          <a href="/pro-signup" style={{ background: '#0A1628', color: '#F5E642', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>Get Started Free →</a>
        </div>
      </div>
    </div>
  );
}
