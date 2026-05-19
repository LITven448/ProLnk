import { useState } from 'react';

const PROSPECT_TYPES = ['Licensed Contractor', 'Side Hustle Earner', 'Referral from a Friend', 'Cold — Job Site', 'LinkedIn Connection'];
const CONTEXTS = ['In Person', 'Text/DM', 'Phone Call', 'LinkedIn Message', 'Nextdoor Post'];

const SCRIPTS: Record<string, Record<string, { hook: string; body: string; close: string; objections: string[] }>> = {
  'Licensed Contractor': {
    'In Person': {
      hook: '"Quick question — you ever get paid for the referrals you send friends?"',
      body: 'Most contractors refer homeowners to other trades all day for free. ProLnk pays you every time one of those referrals turns into a job — and then pays you again on any pro you bring into the network. Charter tier is still open, 500 spots total.',
      close: '"Takes 3 minutes to apply. Want me to text you the link right now?"',
      objections: ['Is this MLM? — No, it\’s a performance referral network. You earn on real jobs completed, not recruitment.', 'I\’m too busy — The app does the work. You get a notification, approve or pass, done.'],
    },
    'Text/DM': {
      hook: '"Hey [Name] — do you currently get paid for homeowner referrals you send out?"',
      body: 'I joined ProLnk and it pays on every job match I refer + a network override when people I recruit also get jobs. Charter tier = 1.5% origination rights permanently. Closes at 500 apps.',
      close: '"Happy to walk you through it — worth 10 min of your time?"',
      objections: ['What\’s the catch? — $149/month subscription. Earns back fast with one job match.', 'I don\’t know enough people — You only need your first 3. The network builds itself.'],
    },
    'Phone Call': {
      hook: '"I know you\’re busy so I\’ll be quick — are you getting paid on the referrals you already make every week?"',
      body: 'ProLnk is a two-sided marketplace for home services. As a Charter partner you get 5 income streams including a permanent 1.5% on every job that originates from homes you register. It compounds forever.',
      close: '"I can send you the income math — does that make sense to look at?"',
      objections: ['I already use Angi — Angi charges you for leads. ProLnk pays you. Completely different model.'],
    },
    'LinkedIn Message': {
      hook: '"[Name] — I came across your profile and had to reach out. Are you currently monetizing the referral network you\’ve built as a contractor?"',
      body: 'I\’m building my ProLnk partner network in DFW and actively recruiting licensed tradespeople. Charter partners earn across 5 streams — including recurring 1.5% origination rights. Closes at 500.',
      close: '"Worth a 10-minute call this week?"',
      objections: ['Looks like MLM — The income comes from jobs, not recruitment. Here\’s the math: [send commission breakdown link]'],
    },
    'Nextdoor Post': {
      hook: '"Attention DFW contractors — are you leaving referral income on the table every week?"',
      body: 'ProLnk pays licensed pros for job referrals and builds a passive income network around the work you already do. Charter spots are limited. DM me for details.',
      close: '"Happy to answer questions below or privately."',
      objections: ['What is this exactly? — It\’s a home services referral network with 5 paid income streams. Not a lead platform — a network income system.'],
    },
  },
};

const UNIVERSAL_OBJECTIONS = [
  { q: '"Is this MLM?"', a: 'No. Income is earned from real jobs completed, not from recruiting. The override on your network is 1–4 levels deep on job earnings, not recruitment fees. It\’s structured like a performance referral network.' },
  { q: '"I\’m too busy."', a: 'The app handles matching. You get a push notification, approve or skip, that\’s it. Most partners spend under 30 minutes a week on active management.' },
  { q: '"I don\’t know enough people."', a: 'You only need your first 3 pros to activate Stream 2. Each of them recruits 3 more. By level 3 you have 27 earners in your network without you doing additional recruiting.' },
  { q: '"What\’s the catch?"', a: '$149/month Charter membership. That\’s it. One job referral typically earns that back. After that it\’s pure margin.' },
  { q: '"I tried Angi/HomeAdvisor and hated it."', a: 'Those platforms charge YOU for leads. ProLnk pays you for referrals you make. You\’re on the income side, not the expense side.' },
  { q: '"How do I know this will pay out?"', a: 'Origination rights are contractually locked at signup. Commission rates are in the partner agreement. Nothing changes after you\’re in — especially for Charter.' },
  { q: '"I need to think about it."', a: 'Totally fair. What I\’ll say is — Charter closes at 500 applications and we\’re in the final stretch. The 1.5% origination rate drops to 1.0% for Founding after that. Happy to follow up in 24 hours?' },
  { q: '"What if it doesn\’t work in my area?"', a: 'DFW is our #1 priority market. 3.2M homes, 50K+ service calls per day, fastest-growing metro in the US. If it works anywhere, it works here.' },
];

export default function PartnerRecruitmentScript() {
  const [prospectType, setProspectType] = useState('Licensed Contractor');
  const [context, setContext] = useState('In Person');
  const [showObjections, setShowObjections] = useState(false);

  const script = SCRIPTS[prospectType]?.[context] || SCRIPTS['Licensed Contractor']['In Person'];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Recruitment Scripts</h1>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 600, margin: '0 auto' }}>
            10 proven scripts for every context. Select your prospect type and situation to get the right approach.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎛️ Script Generator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Prospect Type</label>
              <select value={prospectType} onChange={e => setProspectType(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {PROSPECT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Context / Channel</label>
              <select value={context} onChange={e => setContext(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {CONTEXTS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: '🪝 HOOK', content: script.hook, bg: '#FEF9C3', border: '#FDE68A' },
              { label: '💬 BODY', content: script.body, bg: '#EFF6FF', border: '#BFDBFE' },
              { label: '✅ CLOSE', content: script.close, bg: '#F0FDF4', border: '#BBF7D0′ },
            ].map(section => (
              <div key={section.label} style={{ background: section.bg, border: `1px solid ${section.border}`,
                borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 8 }}>{section.label}</div>
                <div style={{ fontSize: 15, lineHeight: 1.6 }}>{section.content}</div>
              </div>
            ))}
          </div>

          {script.objections && script.objections.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🛡️ Context-Specific Objections</div>
              {script.objections.map((obj, i) => (
                <div key={i} style={{ background: '#F9FAFB', borderRadius: 8, padding: 12, marginBottom: 8, fontSize: 13 }}>{obj}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #E5E7EB' }}>
          <button onClick={() => setShowObjections(!showObjections)}
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>🛡️ Universal Objection Handling Guide</h2>
            <span style={{ fontSize: 20 }}>{showObjections ? '▲' : '▼'}</span>
          </button>
          {showObjections && (
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {UNIVERSAL_OBJECTIONS.map((item, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                  <div style={{ background: '#0A1628', color: '#F5E642', padding: '12px 16px', fontWeight: 700, fontSize: 14 }}>
                    {item.q}
                  </div>
                  <div style={{ padding: '12px 16px', fontSize: 14, lineHeight: 1.6 }}>{item.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
