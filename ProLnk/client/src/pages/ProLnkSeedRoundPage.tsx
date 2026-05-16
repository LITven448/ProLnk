import { useState } from 'react';

const profiles = [
  {
    id: 'angel',
    label: 'Angel Investor',
    metrics: [
      { label: 'Check Size Target', value: '$25K – $100K' },
      { label: 'Round Size', value: '$1.2M' },
      { label: 'Pre-Money Valuation', value: '$6M' },
      { label: 'Use of Funds', value: 'Tech, Sales, Compliance' },
    ],
    thesis: 'ProLnk is a network effects business with locked-in pricing and a 5-stream income model that creates switching costs for contractors. The DFW home services market is $2.1B/year. A 1% capture = $21M/year in GMV. Angels backing network-economy platforms at seed stage capture outsized returns when the flywheel spins up.',
  },
  {
    id: 'vc',
    label: 'Venture Capital',
    metrics: [
      { label: 'Addressable Market (DFW)', value: '$2.1B' },
      { label: 'Nat'l TAM (Home Services)', value: '$600B' },
      { label: 'Margin at Scale', value: '85%' },
      { label: 'Path to Breakeven', value: '500 Active Pros' },
    ],
    thesis: 'The business is SaaS-like in structure (recurring subscription) but marketplace in scale dynamics. The Home Health Vault creates a defensible data moat. AI agents reduce headcount requirements to near zero at operational scale. This is a platform play with a 10-year data advantage built in from day one.',
  },
  {
    id: 'strategic',
    label: 'Strategic / Corporate',
    metrics: [
      { label: 'Current Partners (Waitlist)', value: '400+' },
      { label: 'Homes in Vault Pipeline', value: '3,200+' },
      { label: 'Proprietary Data Asset', value: 'Yes — Home Health Vault' },
      { label: 'IP Status', value: 'Patent Pending' },
    ],
    thesis: 'For insurance carriers, real estate platforms, home warranty companies, and lenders — TrustyPro and the Home Health Vault represent a proprietary data layer that does not exist anywhere else. The B2B licensing opportunity alone justifies strategic attention. Acquisition or partnership can accelerate distribution into existing customer bases.',
  },
];

const useOfFunds = [
  { label: 'Engineering & Infrastructure', pct: 40 },
  { label: 'Sales & Partner Acquisition', pct: 30 },
  { label: 'Compliance & Legal', pct: 15 },
  { label: 'Operations & Marketing', pct: 15 },
];

export default function ProLnkSeedRoundPage() {
  const [active, setActive] = useState(profiles[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, letterSpacing: 2, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
            SEED ROUND — RAISING
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>Invest in ProLnk</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            We are raising a $1.2M seed round to launch ProLnk and TrustyPro commercially in the DFW market. Here is the thesis.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
          {[
            { label: 'Market Size (DFW)', value: '$2.1B' },
            { label: 'Waitlist Partners', value: '400+' },
            { label: 'Homes in Pipeline', value: '3,200+' },
            { label: 'Target Margin', value: '85%' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#111c2e', borderRadius: 12, padding: '18px', textAlign: 'center', border: '1px solid #1e2d45' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c2e', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>Select your investor profile</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                style={{ padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: active.id === p.id ? '#F5E642' : '#1e2d45', color: active.id === p.id ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {active.metrics.map((m) => (
              <div key={m.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642' }}>{m.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, fontSize: 14, color: '#cbd5e1', lineHeight: 1.7, borderLeft: '3px solid #F5E642' }}>
            {active.thesis}
          </div>
        </div>

        <div style={{ background: '#111c2e', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Use of Funds — $1.2M Seed</div>
          {useOfFunds.map((f) => (
            <div key={f.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>
                <span>{f.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{f.pct}%</span>
              </div>
              <div style={{ height: 8, background: '#1e2d45', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${f.pct}%`, height: '100%', background: '#F5E642', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: '32px 20px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Interested in participating?</div>
          <p style={{ color: '#1e293b', margin: '0 0 16px', fontSize: 14 }}>Express interest and we will send you the full data room within 48 hours.</p>
          <div style={{ fontSize: 13, color: '#0A1628', fontWeight: 700 }}>→ Contact: andrew@prolnk.io</div>
        </div>
      </div>
    </div>
  );
}

