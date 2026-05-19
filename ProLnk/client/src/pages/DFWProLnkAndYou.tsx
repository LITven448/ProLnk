import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: '🏡 Homeowner', desc: 'I own a home in DFW' },
  { id: 'renter', label: '🏢 Renter', desc: 'I rent and am planning to buy' },
  { id: 'contractor', label: '🔧 Contractor', desc: 'I provide home services' },
  { id: 'partner', label: '🤝 Partner', desc: 'I refer pros or homeowners' },
  { id: 'investor', label: '📈 Investor', desc: 'I invest in DFW real estate' },
];

const situations: Record<string, string[]> = {
  homeowner: ['First-time DFW owner', 'Experienced DFW owner', 'Planning major renovation', 'Preparing to sell', 'Long-term hold'],
  renter: ['Saving for down payment', 'Actively searching', 'Learning the market'],
  contractor: ['Solo operator', 'Small crew (2-5)', 'Established business', 'Looking to expand territory'],
  partner: ['Real estate agent', 'Mortgage broker', 'Insurance agent', 'General connector'],
  investor: ['Buy and hold', 'Fix and flip', 'Multi-family', 'New to DFW investing'],
};

const locations = ['Dallas', 'Collin County', 'Tarrant County', 'Denton County', 'Fort Worth', 'Other DFW Suburb'];

const valueProps: Record<string, Record<string, { headline: string; points: string[]; cta: string; ctaUrl: string }>> = {
  homeowner: {
    default: {
      headline: 'ProLnk is your proactive home management partner',
      points: [
        '🏗️ Build contractor relationships before emergencies — pay planned rates, not panic rates',
        '📋 Access DFW-specific guides for foundation, HVAC, property tax, and seasonal prep',
        '🔔 Get vetted quotes from pre-screened DFW pros — no cold calls, no spam',
        '📊 Track your home\’s health across all major systems in one place',
      ],
      cta: 'Join ProLnk as a DFW Homeowner',
      ctaUrl: '/homeowner-signup',
    },
  },
  contractor: {
    default: {
      headline: 'ProLnk delivers qualified DFW homeowners to your business',
      points: [
        '🎯 Leads matched to your trade, service area, and capacity — no shotgun spam',
        '💰 5-stream income: direct match commissions + network referrals + origination rights',
        '📍 Territory exclusivity at the Charter and Founding member tiers',
        '🤖 AI-powered matching improves quality over time — better leads, less waste',
      ],
      cta: 'Apply as a TrustyPro Partner',
      ctaUrl: '/trustypro-signup',
    },
  },
  partner: {
    default: {
      headline: 'ProLnk pays you for every connection you make',
      points: [
        '💵 Earn on every homeowner you refer — per-lead fees you negotiate directly',
        '📣 Earn on every pro you bring in — 10% of their $149/mo subscription, recurring',
        '🌐 4-level network override — earn from your network\’s network',
        '🏆 Leaderboard recognition and Charter member status for top connectors',
      ],
      cta: 'Join as a ProLnk Network Partner',
      ctaUrl: '/partner-signup',
    },
  },
  renter: {
    default: {
      headline: 'ProLnk helps you prepare for DFW homeownership the right way',
      points: [
        '📚 DFW-specific education on what to expect as a first-time buyer here',
        '🔍 Learn which trades to vet, which neighborhoods to research, what DFW climate does to homes',
        '🤝 Build contractor relationships before you close — be ready on day one',
        '⚡ Get on the waitlist now — Charter pricing locks in before public launch',
      ],
      cta: 'Get on the ProLnk Waitlist',
      ctaUrl: '/homeowner-signup',
    },
  },
  investor: {
    default: {
      headline: 'ProLnk gives DFW investors operational leverage at scale',
      points: [
        '🏘️ Manage contractor relationships across multiple properties from one dashboard',
        '📊 Track maintenance costs, contractor performance, and ROI by property',
        '🔗 Network income from tenant referrals and contractor introductions',
        '🗂️ Home Health Vault — document and protect the value across your entire portfolio',
      ],
      cta: 'Explore ProLnk for DFW Investors',
      ctaUrl: '/investor-inquiry',
    },
  },
};

export default function DFWProLnkAndYou() {
  const [role, setRole] = useState('');
  const [situation, setSituation] = useState('');
  const [location, setLocation] = useState('');
  const [showResult, setShowResult] = useState(false);

  const vp = role ? (valueProps[role]?.default) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>ProLnk DFW Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>⚡ ProLnk & You — Personalized</h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          ProLnk isn't one thing — it’s a platform built for every DFW participant in the home services ecosystem. Tell us who you are and where you are, and we’ll show you exactly how ProLnk fits into your life.
        </p>

        <div style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Step 1: Who are you?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => { setRole(r.id); setSituation(''); setShowResult(false); }}
                style={{
                  background: role === r.id ? '#F5E642′ : '#0A1628',
                  color: role === r.id ? '#0A1628′ : '#fff',
                  border: `1px solid ${role === r.id ? '#F5E642' : '#1E3A5F'}`,
                  borderRadius: 10,
                  padding: '14px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {role && (
          <div style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Step 2: Your situation</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(situations[role] || []).map(s => (
                <button
                  key={s}
                  onClick={() => { setSituation(s); setShowResult(false); }}
                  style={{
                    background: situation === s ? '#F5E642′ : '#0A1628',
                    color: situation === s ? '#0A1628′ : '#fff',
                    border: `1px solid ${situation === s ? '#F5E642' : '#1E3A5F'}`,
                    borderRadius: 20,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {situation && (
          <div style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Step 3: Where in DFW?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {locations.map(l => (
                <button
                  key={l}
                  onClick={() => { setLocation(l); setShowResult(true); }}
                  style={{
                    background: location === l ? '#F5E642′ : '#0A1628',
                    color: location === l ? '#0A1628′ : '#fff',
                    border: `1px solid ${location === l ? '#F5E642' : '#1E3A5F'}`,
                    borderRadius: 20,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {showResult && vp && (
          <div style={{ background: 'linear-gradient(135deg, #0D2240, #1A3A5F)', border: '1px solid #F5E64230', borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 16 }}>🎯 {vp.headline}</div>
            <div style={{ marginBottom: 20 }}>
              {vp.points.map((p, i) => (
                <div key={i} style={{ fontSize: 15, padding: '8px 0', borderBottom: '1px solid #1E3A5F', lineHeight: 1.6 }}>{p}</div>
              ))}
            </div>
            <div style={{ background: '#F5E642', display: 'inline-block', borderRadius: 8, padding: 0, overflow: 'hidden' }}>
              <a href={vp.ctaUrl} style={{ display: 'block', background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '14px 28px', textDecoration: 'none' }}>
                {vp.cta} →
              </a>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: '#8899AA' }}>
              Personalized for: {roles.find(r => r.id === role)?.label} · {situation} · {location}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#8899AA', fontSize: 13, marginTop: 16 }}>
          ProLnk is building the most connected home services network in DFW. Every role matters.
        </div>
      </div>
    </div>
  );
}
