import { useState } from 'react';

const INTERESTS = [
  { key: 'contractor_dfw', label: '🔨 I\’m a DFW Contractor', desc: 'I work in the market' },
  { key: 'homeowner_dfw', label: '🏠 I\’m a DFW Homeowner', desc: 'I own property here' },
  { key: 'partner_dfw', label: '🤝 I\’m a Potential Partner', desc: 'I want to build income' },
  { key: 'national', label: '🌎 I\’m Outside DFW', desc: 'I\’m in another market' },
  { key: 'investor_view', label: '📈 I\’m Evaluating Investment', desc: 'I want the full strategy' },
];

const STRATEGY: Record<string, { headline: string; why_dfw: string[]; what_it_means: string[]; timeline: string }> = {
  contractor_dfw: {
    headline: 'You\’re in the right place at the right time',
    why_dfw: [
      '🏗️ 48,000 new homes built per year — highest new construction rate in the US',
      '👷 Contractor shortage: 12,000 unfilled skilled trade jobs in DFW today',
      '📈 8% annual market growth means demand consistently outpaces supply',
      '🤝 No dominant local marketplace — no Angi or Thumbtack owns DFW yet',
    ],
    what_it_means: [
      'Charter Pros get first access to every homeowner in their trade and zip code',
      'AI match quality is highest in DFW because we\’re launching here first',
      'Founding rate of $149/mo locks in before prices rise with platform growth',
      'Your referral network pays lifetime overrides — built during the best window',
    ],
    timeline: '🚀 Charter applications close at 500. Currently 400+ on waitlist. Apply now.',
  },
  homeowner_dfw: {
    headline: 'DFW homeowners will benefit most from ProLnk first',
    why_dfw: [
      '🏡 3.2M DFW homes — one of the densest contractor markets in the US',
      '⚡ Contractor shortage means wait times of 2-3 weeks for basic services',
      '💸 Average DFW homeowner overpays 33% vs. matched-rate contractors',
      '🌡️ Extreme DFW climate (heat, hail, tornado season) means high service demand',
    ],
    what_it_means: [
      'Priority matching for early waitlist members — skip the contractor queue',
      'Home Health Vault starts tracking your home from day one of launch',
      'Matched rates negotiated in bulk by ProLnk — better pricing than calling cold',
      'DFW launch density means 90%+ trade coverage from day one',
    ],
    timeline: '📋 Homeowner waitlist: 5,000 spots. Early members get priority matching at launch.',
  },
  partner_dfw: {
    headline: 'The founding partner window is open — and closing fast',
    why_dfw: [
      '💰 First-mover partners in DFW capture the highest-density referral territory',
      '🤝 42,000 daily service calls = massive referral volume once ProLnk scales',
      '🏗️ New construction market creates new homeowner origination events daily',
      '📡 Strong existing community networks (HOAs, church groups, sports leagues) for recruiting',
    ],
    what_it_means: [
      'Founding partners lock in the highest commission tier — permanent, not time-limited',
      'DFW is the national proof-of-concept — partners here become case studies for other markets',
      'Your recruits\’ recruits\’ recruits still pay you — 4-level cascade, forever',
      'First 500 Charter Pros recruited are in your downline if you join at founding',
    ],
    timeline: '⏰ Founding partner rates available until waitlist closes. Apply before then.',
  },
  national: {
    headline: 'DFW launches first — your market is next',
    why_dfw: [
      '🗺️ DFW is the proof-of-concept for every other major metro',
      '🏗️ Highest new construction rate makes contractor supply/demand friction most visible',
      '📊 Texas regulatory environment is favorable for marketplace launch',
      '🌐 DFW tech adoption rate is above national average — early user base quality is high',
    ],
    what_it_means: [
      'DFW success becomes the playbook for Atlanta, Phoenix, Houston, and your market',
      'National expansion timeline: DFW → 5 metros (Q4 2026) → 25 metros (2027)',
      'Partners who join during DFW launch carry their network into new markets automatically',
      'Getting on the waitlist now establishes your position before your market launches',
    ],
    timeline: '🌎 National expansion begins Q4 2026. Waitlist members in your market get priority.',
  },
  investor_view: {
    headline: 'DFW is the ideal first market — strategically, not accidentally',
    why_dfw: [
      '📊 #1 fastest-growing major metro in the US — 8% annual market growth',
      '🏗️ 48,000 new homes/yr creates a permanent homeowner onboarding pipeline',
      '🤝 12,000 unfilled contractor jobs = pro supply problem that ProLnk solves',
      '⚡ No dominant marketplace — no incumbent with defensible local density',
    ],
    what_it_means: [
      'DFW proves unit economics (LTV/CAC) at density before national rollout',
      'Contractor network built in DFW travels to adjacent markets — lower CAC for expansion',
      'Home Health Vault data compounds from DFW launch day — 3.2M homes from day one',
      'Break-even at 500 Charter Pros; DFW waitlist already at 400+',
    ],
    timeline: '💼 Seed round closes Q3 2026. DFW launch validates thesis for Series A in Q1 2027.',
  },
};

const DFW_FACTS = [
  { icon: '🏗️', value: '#1', label: 'Fastest Growing Major Metro' },
  { icon: '🏘️', value: '48K', label: 'New Homes Built Per Year' },
  { icon: '👷', value: '12K', label: 'Unfilled Contractor Jobs' },
  { icon: '📞', value: '42K', label: 'Daily Service Calls' },
];

const EXPANSION = ['DFW Launch', 'Houston + Austin', 'Phoenix + Atlanta', '25 Metros', 'National'];

export default function DFWProLnkLaunchStrategy() {
  const [selected, setSelected] = useState<string | null>(null);
  const strat = selected ? STRATEGY[selected] : null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#0A1628', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🚀 DFW Launch Strategy</h1>
        <p style={{ color: '#475569', marginBottom: 8 }}>Why Dallas-Fort Worth is the perfect first market — and what it means for national expansion</p>
        <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>Select your interest to see what the DFW launch means for you</p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          {DFW_FACTS.map((f) => (
            <div key={f.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', flex: '1 1 140px' }}>
              <div style={{ fontSize: 20 }}>{f.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{f.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>🗺️ National Expansion Roadmap</h2>
          <p style={{ color: '#64748b', fontSize: 12, marginBottom: 14 }}>DFW proves the model. Every market after gets faster and cheaper.</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {EXPANSION.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ background: i === 0 ? '#F5E642′ : '#1e2d45', color: i === 0 ? '#0A1628' : '#94a3b8', borderRadius: 20, padding: '7px 14px', fontWeight: i === 0 ? 800 : 500, fontSize: 13 }}>{step}</div>
                {i < EXPANSION.length - 1 && <span style={{ color: '#F5E642', fontSize: 16 }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '2px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔍 What brings you here?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {INTERESTS.map((s) => (
              <button key={s.key} onClick={() => setSelected(s.key === selected ? null : s.key)} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.key ? '#0A1628' : '#e2e8f0'}`, background: selected === s.key ? '#0A1628′ : '#f8fafc', cursor: ’pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: selected === s.key ? '#F5E642′ : '#0A1628', fontWeight: selected === s.key ? 700 : 400, fontSize: 14 }}>{s.label}</span>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {strat && (
          <div style={{ background: '#fff', border: '2px solid #0A1628', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{strat.headline}</h2>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#475569', fontWeight: 700, fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Why DFW?</div>
              {strat.why_dfw.map((p, i) => (
                <div key={i} style={{ color: '#334155', fontSize: 14, marginBottom: 8, paddingLeft: 4 }}>{p}</div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#475569', fontWeight: 700, fontSize: 13, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>What This Means For You</div>
              {strat.what_it_means.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                  <span style={{ color: '#334155', fontSize: 14 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#F5E642', fontWeight: 700, fontSize: 14 }}>
              {strat.timeline}
            </div>
          </div>
        )}

        {!strat && (
          <div style={{ background: '#fff', border: '2px solid #e2e8f0', borderRadius: 12, padding: 24, textAlign: 'center', color: '#94a3b8′ }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🚀</div>
            <div style={{ fontSize: 15 }}>Select your interest above to see what the DFW launch means for you</div>
          </div>
        )}
      </div>
    </div>
  );
}
