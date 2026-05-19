import { useState } from 'react';

const benefits = [
  { icon: '📡', title: 'Visual Scan Data', desc: 'AI-powered property scans give you a full picture before you ever step on site. No surprises.' },
  { icon: '✅', title: 'Pre-Qualified Leads', desc: 'Every lead includes a verified property health score. You only see jobs that match your trade and service area.' },
  { icon: '🚫', title: 'No Cold Calling', desc: 'Homeowners reach out to you through the platform. You respond on your schedule, not theirs.' },
  { icon: '📸', title: 'Job Photos Stored', desc: 'All job photos are stored in the Home Health Vault — protect yourself from disputes with permanent documentation.' },
  { icon: '⚡', title: 'Instant Estimates from Scan Data', desc: 'Use AI scan reports to generate accurate estimates in minutes instead of hours. Win more bids, faster.' },
];

const comparison = [
  { feature: 'Lead Quality', trustypro: '✅ Pre-qualified with scan data', angi: '❌ Unverified, high churn', thumbtack: '❌ Unverified, high churn' },
  { feature: 'Property Info Before Visit', trustypro: '✅ Full AI health report', angi: '❌ None', thumbtack: '❌ None' },
  { feature: 'Cold Competition', trustypro: '✅ Matched leads only', angi: '❌ 5–8 pros per lead', thumbtack: '❌ 5–8 pros per lead' },
  { feature: 'Cost per Lead', trustypro: '✅ Subscription model', angi: '❌ Pay-per-lead + fees', thumbtack: '❌ Pay-per-lead + fees' },
  { feature: 'Job Documentation', trustypro: '✅ Vault-stored photos', angi: '❌ None', thumbtack: '❌ None' },
  { feature: 'Estimate Assistance', trustypro: '✅ AI scan data included', angi: '❌ None', thumbtack: '❌ None' },
];

export default function TrustyProForPros() {
  const [leads, setLeads] = useState(10);
  const [closeRate, setCloseRate] = useState(25);
  const [avgJob, setAvgJob] = useState(850);

  const currentRevenue = leads * (closeRate / 100) * avgJob;
  const improvedLeads = Math.round(leads * 1.6);
  const improvedClose = Math.min(closeRate * 1.35, 100);
  const projectedRevenue = improvedLeads * (improvedClose / 100) * avgJob;
  const lift = projectedRevenue - currentRevenue;

  return (
    <div style={{ background: '#050d1a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ background: '#4F46E5', display: 'inline-block', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16, color: '#fff' }}>FOR SERVICE PROFESSIONALS</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>Why Pros Choose<br /><span style={{ color: '#4F46E5' }}>TrustyPro</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>Stop chasing bad leads. Start winning jobs with AI-powered property data before you ever pick up the phone.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 80 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{b.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 32 }}>TrustyPro vs. Traditional Lead Gen</h2>
        <div style={{ overflowX: 'auto', marginBottom: 80 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Feature', 'TrustyPro', 'Angi', 'Thumbtack'].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: i === 0 ? 'left' : 'center', background: '#0f1e35', color: i === 1 ? '#FACC15' : '#94a3b8', borderBottom: '1px solid #1e3a5f', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#050d1a' : '#080f1c' }}>
                  <td style={{ padding: '12px 16px', color: '#e2e8f0', fontWeight: 600 }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#4ade80' }}>{row.trustypro}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#94a3b8' }}>{row.angi}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#94a3b8' }}>{row.thumbtack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 20, padding: 40, border: '1px solid #1e3a5f', marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>ROI Calculator</h2>
          <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 36, fontSize: 15 }}>See what TrustyPro could mean for your business</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 40 }}>
            {[
              { label: 'Current leads/month', value: leads, setter: setLeads, min: 1, max: 100, unit: '' },
              { label: 'Current close rate (%)', value: closeRate, setter: setCloseRate, min: 5, max: 90, unit: '%' },
              { label: 'Avg job value ($)', value: avgJob, setter: setAvgJob, min: 100, max: 10000, unit: '$' },
            ].map((item, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{item.label}</label>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#FACC15', marginBottom: 8 }}>{item.unit === '$' ? `$${item.value.toLocaleString()}` : `${item.value}${item.unit}`}</div>
                <input type="range" min={item.min} max={item.max} value={item.value} onChange={e => item.setter(Number(e.target.value))} style={{ width: '100%', accentColor: '#4F46E5' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#050d1a', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Current Monthly Revenue</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#e2e8f0' }}>${Math.round(currentRevenue).toLocaleString()}</div>
            </div>
            <div style={{ background: '#1e1b4b', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #4F46E5' }}>
              <div style={{ fontSize: 13, color: '#a5b4fc', marginBottom: 8 }}>Projected with TrustyPro</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#FACC15' }}>${Math.round(projectedRevenue).toLocaleString()}</div>
              <div style={{ fontSize: 13, color: '#4ade80', marginTop: 6 }}>+${Math.round(lift).toLocaleString()}/mo lift</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready to work smarter?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 16 }}>Join the waitlist — charter membership closes at 500 pros.</p>
          <button style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>Join Pro Waitlist</button>
        </div>

      </div>
    </div>
  );
}
