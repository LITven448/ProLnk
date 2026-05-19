import { useState } from 'react';

const SOURCES = [
  { method: 'Neighborhood canvassing', emoji: '🏘️', typical: 8 },
  { method: 'Open house networking', emoji: '🏡', typical: 12 },
  { method: 'Social media outreach', emoji: '📱', typical: 20 },
  { method: 'Referral from existing HOs', emoji: '🤝', typical: 6 },
  { method: 'Community groups / HOAs', emoji: '👥', typical: 15 },
  { method: 'Real estate agent partners', emoji: '🏢', typical: 25 },
];

export default function ProLnkStream4HomeownerOverride() {
  const [monthlyHO, setMonthlyHO] = useState(20);
  const [feePerHO, setFeePerHO] = useState(50);

  const monthly = monthlyHO * feePerHO;
  const annual = monthly * 12;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>STREAM 4 OF 5</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 Homeowner Override</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Source homeowners and connect them to the ProLnk platform. Earn $25–$100 per qualified lead.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          <div style={{ background: '#111B2E', border: '2px solid #1E3A5F', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642' }}>$25</div>
            <div style={{ color: '#94A3B8', fontSize: 13 }}>Minimum per qualified HO</div>
          </div>
          <div style={{ background: '#111B2E', border: '2px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642' }}>$100</div>
            <div style={{ color: '#94A3B8', fontSize: 13 }}>Maximum per premium HO</div>
          </div>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📣 How to Source Homeowners</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SOURCES.map(s => (
              <div key={s.method} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 2 }}>{s.method}</div>
                <div style={{ color: '#64748B', fontSize: 11 }}>~{s.typical} HOs/mo potential</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111B2E', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📊 Stream 4 Income Calculator</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Homeowners Sourced Per Month: {monthlyHO}</label>
            <input type="range" min={0} max={200} value={monthlyHO} onChange={e => setMonthlyHO(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Your Negotiated Fee Per HO: ${feePerHO}</label>
            <input type="range" min={25} max={100} step={5} value={feePerHO} onChange={e => setFeePerHO(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Monthly Income</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>${monthly.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>Annual Income</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#10B981' }}>${annual.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: '12px 14px', color: '#94A3B8', fontSize: 13 }}>
            💡 Tip: Negotiate higher fees for homeowners in high-value zip codes or with urgent project needs.
          </div>
        </div>
      </div>
    </div>
  );
}