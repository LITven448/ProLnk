import { useState } from 'react';

const steps = [
  { icon: '🏠', title: 'Bring Homes to the Vault', desc: 'Each home you onboard to the Home Health Vault earns you origination rights permanently.' },
  { icon: '🔗', title: 'ProLnk Handles the Matching', desc: 'Every time that home needs a service, ProLnk matches them with a pro automatically.' },
  { icon: '💵', title: 'You Earn on Every Transaction', desc: 'Your origination rights pay out every time that home generates a transaction — forever.' },
  { icon: '📈', title: 'Compounding Effect', desc: 'More homes + more service categories = exponentially growing passive income over time.' },
];

const categories = ['Plumbing', 'HVAC', 'Electrical', 'Landscaping', 'Painting', 'Roofing', 'Cleaning', 'Security'];

export default function PartnerPassiveIncomeGuide() {
  const [homes, setHomes] = useState('');
  const [spend, setSpend] = useState('');
  const ORIG_RATE = 0.015;
  const monthlyPassive = homes && spend
    ? ((parseFloat(homes) * parseFloat(spend) * ORIG_RATE) / 12).toFixed(0)
    : null;
  const fiveYear = monthlyPassive
    ? (parseFloat(monthlyPassive) * 60).toFixed(0)
    : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>💤</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>Passive Income with ProLnk</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>How origination rights create income that earns while you sleep.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '18px', border: '1px solid #E2E8F0′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{s.title}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 6px' }}>🔁 The Compounding Effect</h3>
          <p style={{ color: '#64748B', margin: '0 0 16px', fontSize: 14 }}>
            Each home uses ProLnk across multiple service categories every year. As more categories launch, your passive income grows automatically — no extra work required.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map((c, i) => (
              <span key={i} style={{ background: '#F1F5F9', color: '#334155', padding: '4px 12px',
                borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{c}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>📊 Passive Income Projection</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                Homes on Platform
              </label>
              <input type='number' value={homes} onChange={e => setHomes(e.target.value)} placeholder='e.g. 50'
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1',
                  fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                Avg Annual Service Spend ($)
              </label>
              <input type='number' value={spend} onChange={e => setSpend(e.target.value)} placeholder='e.g. 4000'
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1',
                  fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          {monthlyPassive && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ color: '#94A3B8', fontSize: 14 }}>Monthly Passive Income</span>
                <span style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${Number(monthlyPassive).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94A3B8', fontSize: 14 }}>5-Year Total</span>
                <span style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${Number(fiveYear).toLocaleString()}</span>
              </div>
              <p style={{ color: '#64748B', margin: '12px 0 0', fontSize: 12 }}>
                Based on 1.5% origination rate. Grows as more service categories are added to the platform.
              </p>
            </div>
          )}
          {!monthlyPassive && (
            <p style={{ color: '#94A3B8', margin: 0 }}>Enter your numbers above to see your projection.</p>
          )}
        </div>
      </div>
    </div>
  );
}
