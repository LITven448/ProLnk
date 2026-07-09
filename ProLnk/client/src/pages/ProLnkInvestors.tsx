import { useState } from 'react';

const traction = [
  { icon: '📋', label: 'Waitlist Signups', value: '5,000+' },
  { icon: '👷', label: 'Pros Enrolled', value: '500+' },
  { icon: '💰', label: 'Projected Match Value', value: '$2.1M' },
  { icon: '🏙️', label: 'Markets Targeted', value: '3 DFW Cities' },
  { icon: '⭐', label: 'Avg Pro Rating (Beta)', value: '4.8 / 5' },
  { icon: '⚡', label: 'Avg Match Time', value: '< 4 Hours' },
];

const useOfFunds = [
  { label: 'Product & Engineering', pct: 55, color: '#2563eb' },
  { label: 'Market Validation & GTM', pct: 25, color: '#7c3aed' },
  { label: 'Legal & Compliance', pct: 10, color: '#065f46' },
  { label: 'Operations & Team', pct: 10, color: '#c2410c' },
];

const seriesA = [
  { icon: '🤖', label: 'AI Matching Engine v2', desc: 'Full production rollout of intelligent lead distribution' },
  { icon: '📱', label: 'Mobile Apps', desc: 'iOS and Android apps for pros and homeowners' },
  { icon: '🌎', label: 'National Expansion', desc: 'Launch in 15 metro markets beyond DFW' },
  { icon: '🏠', label: 'Home Health Vault', desc: 'Structural and safety data on 50M+ U.S. homes' },
];

export default function ProLnkInvestors() {
  const [tab, setTab] = useState<'preseed' | 'seriesA'>('preseed');

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#f1f5f9' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📈</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#f1f5f9', marginBottom: 16 }}>
            Built for the Long Run
          </h1>
          <p style={{ fontSize: 20, color: '#94a3b8', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
            ProLnk is building the network infrastructure for home services. We raised a pre-seed round to validate the model. Now we are scaling.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
          {(['preseed', 'seriesA'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '12px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600,
                background: tab === t ? '#2563eb' : '#1e293b',
                color: tab === t ? '#fff' : '#94a3b8',
              }}
            >
              {t === 'preseed' ? 'Pre-Seed Round' : 'Series A Target'}
            </button>
          ))}
        </div>

        {tab === 'preseed' && (
          <div>
            <div style={{ background: '#1e293b', borderRadius: 16, padding: 48, marginBottom: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: '#60a5fa', marginBottom: 8 }}>.2M</div>
              <div style={{ fontSize: 18, color: '#94a3b8', marginBottom: 24 }}>Pre-Seed Round — Closed Q1 2026</div>
              <p style={{ fontSize: 16, color: '#cbd5e1', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
                Raised from a syndicate of Dallas-area angel investors, former real estate operators, and two former marketplace executives. The round was oversubscribed by 40%.
              </p>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24, textAlign: 'center' }}>How We Used It</h3>
            <div style={{ background: '#1e293b', borderRadius: 16, padding: 36, marginBottom: 48 }}>
              {useOfFunds.map(f => (
                <div key={f.label} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 15, color: '#cbd5e1' }}>{f.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{f.pct}%</span>
                  </div>
                  <div style={{ background: '#0f172a', borderRadius: 6, height: 10, overflow: 'hidden' }}>
                    <div style={{ width: f.pct + '%', height: '100%', background: f.color, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'seriesA' && (
          <div>
            <div style={{ background: '#1e293b', borderRadius: 16, padding: 48, marginBottom: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: '#34d399', marginBottom: 8 }}>M</div>
              <div style={{ fontSize: 18, color: '#94a3b8', marginBottom: 24 }}>Series A Target — Opening Q3 2026</div>
              <p style={{ fontSize: 16, color: '#cbd5e1', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
                Following platform launch and validation of core match economics, we will raise a Series A to fuel national expansion and complete the AI infrastructure.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
              {seriesA.map(item => (
                <div key={item.label} style={{ background: '#1e293b', borderRadius: 14, padding: 28 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{item.label}</h4>
                  <p style={{ fontSize: 14, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', textAlign: 'center', marginBottom: 32 }}>
          Traction at a Glance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 56 }}>
          {traction.map(t => (
            <div key={t.label} style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#60a5fa', marginBottom: 4 }}>{t.value}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{t.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📬</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>Investor Inquiries</h3>
          <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 20 }}>
            We are selectively building our Series A relationship pipeline now. Reach out early.
          </p>
          <div style={{ color: '#60a5fa', fontSize: 17, fontWeight: 600 }}>investors@prolnk.xyz</div>
        </div>

      </div>
    </div>
  );
}
