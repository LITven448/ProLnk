import { useState } from 'react';

const prospects = [
  {
    id: 'homeowner',
    label: '🏠 DFW Homeowner',
    urgency: 'Every month without ProLnk is a month navigating contractors blind.',
    costs: [
      'Average DFW homeowner overpays 22% on home services vs. ProLnk-matched pricing.',
      'One bad contractor hire costs $3,000–$15,000 in rework — ProLnk prevents this.',
      'Charter origination rights close at 500 homes. Every month of delay shrinks availability.',
    ],
    cta: 'Join the Charter waitlist. Lock your origination rights before the window closes.',
  },
  {
    id: 'contractor',
    label: '🔨 DFW Contractor',
    urgency: 'Lead quality in DFW is declining. ProLnk Charter Pros lock in the best leads at the lowest cost.',
    costs: [
      'Charter membership is $149/mo locked for life — price increases as tiers fill.',
      'Every month outside ProLnk = leads going to Tier 1 Charter Pros who joined first.',
      'The 4-level override income you could be earning starts the day you join, not later.',
    ],
    cta: 'Apply for Charter Pro now. Only 500 spots exist. The window is closing.',
  },
  {
    id: 'investor',
    label: '💼 Investor / Operator',
    urgency: 'DFW is America\’s fastest-growing metro. The platform serving it will be worth billions.',
    costs: [
      'Delay means watching Charter income accrue to early adopters instead of you.',
      'Every home added to the Vault before you join builds data moat you will pay more for later.',
      'The 5-tier income system is live now. Waiting is choosing not to earn.',
    ],
    cta: 'Get positioned in the network today. Referral leverage compounds — time matters.',
  },
  {
    id: 'agent',
    label: '🏡 Real Estate Agent',
    urgency: 'ProLnk is the post-purchase relationship you\’ve never had with clients.',
    costs: [
      'Without ProLnk, your clients call random contractors — and blame you when it goes wrong.',
      'Origination rights mean every home you refer earns you recurring income after closing.',
      'Charter waitlist is filling. Early agents lock in the highest override percentages.',
    ],
    cta: 'Join now and position ProLnk as your client gift. Build passive income on every home you close.',
  },
];

export default function DFWProLnkWhyNow() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = prospects.find((p) => p.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Why ProLnk — Why Now</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            Waiting has a real cost. Select who you are to see exactly what delay is costing you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
          {prospects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                backgroundColor: selected === p.id ? '#F5E642′ : '#1e2d45',
                color: selected === p.id ? '#0A1628′ : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#1e2d45', borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>{active.label}</h2>
            <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>{active.urgency}</p>
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Cost of Waiting</div>
              {active.costs.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>⚠</span>
                  <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{c}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <p style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, margin: 0 }}>{active.cta}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>
            Select your role above to see your personalized cost-of-waiting analysis.
          </div>
        )}
      </div>
    </div>
  );
}
