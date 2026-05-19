import { useState } from 'react';

const COMPETITORS = [
  { key: 'angi', label: '🔴 Angi / HomeAdvisor', type: 'Lead Marketplace' },
  { key: 'thumbtack', label: '🟠 Thumbtack', type: 'Bid Platform' },
  { key: 'nextdoor', label: '🟣 Nextdoor', type: 'Social Referral' },
  { key: 'yelp', label: '🔵 Yelp', type: 'Review Platform' },
  { key: 'local_guy', label: '🟢 The Local Guy', type: 'Word of Mouth' },
  { key: 'google', label: '⚪ Google Search', type: 'Search Engine' },
];

const ADVANTAGES: Record<string, { summary: string; moats: { title: string; detail: string }[]; verdict: string }> = {
  angi: {
    summary: 'Angi/HomeAdvisor sells the same lead to 3-5 contractors simultaneously. ProLnk matches exclusively — one contractor, one job.',
    moats: [
      { title: '🎯 Match-Only Model', detail: 'ProLnk sends each lead to ONE contractor. Angi sells your info to 5 contractors who then spam you. Homeowners prefer us — pros win more jobs.' },
      { title: '🏦 Data Moat', detail: 'Angi has review data. ProLnk has complete home service history. AI matching quality is incomparably better when we know the home, not just the zip.' },
      { title: '💰 Network Income', detail: 'Angi pros have no loyalty incentive. ProLnk partners earn 5 income streams — referral fees, overrides, origination rights. Switching cost is enormous.' },
      { title: '🤖 AI Improvement Loop', detail: 'Angi match quality is static. ProLnk match quality improves monthly as AI learns from every completed job outcome.' },
    ],
    verdict: 'Angi is a lead directory. ProLnk is an intelligent match engine. Different category.',
  },
  thumbtack: {
    summary: 'Thumbtack uses bids — contractors pay to send quotes. ProLnk eliminates bidding friction with AI-matched single recommendations.',
    moats: [
      { title: '⚡ Zero-Bid Friction', detail: 'Thumbtack requires contractors to bid credits on every lead. ProLnk assigns matches automatically — no credit gambling, no wasted spend on unqualified leads.' },
      { title: '🎯 Match Precision', detail: 'Thumbtack matches on category. ProLnk matches on home age, system type, contractor specialty, prior service history, and contractor win rate.' },
      { title: '💰 Network Income', detail: 'Thumbtack pros pay per bid with zero loyalty reward. ProLnk pros earn network overrides on every recruit they bring in — growing income locks them in.' },
      { title: '🏦 Home Data', detail: 'Thumbtack knows nothing about the home. ProLnk knows the home\’s complete history — making every subsequent match faster and more accurate.' },
    ],
    verdict: 'Thumbtack is a bidding game. ProLnk is a certainty engine.',
  },
  nextdoor: {
    summary: 'Nextdoor is social discovery — neighbors recommend neighbors. ProLnk is professional matching backed by data and performance history.',
    moats: [
      { title: '📋 Verified Quality', detail: 'Nextdoor recommendations are opinion. ProLnk matches are backed by license verification, insurance confirmation, and performance data.' },
      { title: '🤖 AI Scale', detail: 'Nextdoor can\’t scale recommendations beyond your neighborhood. ProLnk\’s AI covers all of DFW with consistent match quality.' },
      { title: '💼 Pro Investment', detail: 'Nextdoor is free discovery with no loyalty. ProLnk partners are invested via subscription and multi-stream income — they actively refer, not passively wait.' },
      { title: '🏦 Home Intelligence', detail: 'Nextdoor can\’t factor in your home\’s specific systems. ProLnk matches based on your home\’s actual data — the right contractor for your specific situation.' },
    ],
    verdict: 'Nextdoor is asking a neighbor. ProLnk is asking an AI that knows your home.',
  },
  yelp: {
    summary: 'Yelp surfaces businesses based on reviews. ProLnk matches based on your specific home, need, and contractor performance history.',
    moats: [
      { title: '🎯 Active Match vs. Passive Search', detail: 'Yelp makes you do the work. ProLnk sends you one verified match — no scrolling, no reading 200 reviews, no calling 6 contractors.' },
      { title: '📊 Performance Data', detail: 'Yelp reviews are subjective. ProLnk tracks actual job completion rates, response time, and pricing accuracy — objective contractor performance.' },
      { title: '🏡 Home Context', detail: 'Yelp doesn\’t know your home. ProLnk matches based on the specific system, age, and service history of your actual home.' },
      { title: '💰 Pro Loyalty', detail: 'Yelp pros have no platform loyalty — they pay for ads but get nothing exclusive. ProLnk\’s income streams make leaving financially painful.' },
    ],
    verdict: 'Yelp is a phonebook with opinions. ProLnk is a specialist concierge.',
  },
  local_guy: {
    summary: 'The "guy you know" is great — until he retires, gets busy, or isn\’t licensed for your job. ProLnk gives everyone access to a reliable "guy" on demand.',
    moats: [
      { title: '🔄 Always Available', detail: 'Your local guy is one person. ProLnk gives you a pre-vetted match within minutes, 24/7, for any trade.' },
      { title: '✅ Verified Credentials', detail: 'You trust your guy on reputation. ProLnk verifies license, insurance, and background — with data to back it up.' },
      { title: '📋 Documented History', detail: 'Word-of-mouth doesn\’t generate records. ProLnk creates a complete service history for your home with every job.' },
      { title: '🤖 Better Over Time', detail: 'Your local guy doesn\’t get smarter. ProLnk\’s AI improves matching quality every month as it learns from more outcomes.' },
    ],
    verdict: 'ProLnk gives everyone a "guy they know" — verified and on demand.',
  },
  google: {
    summary: 'Google shows you ads and paid listings. ProLnk shows you the right contractor for your specific home and need — no searching required.',
    moats: [
      { title: '🎯 No Search Required', detail: 'Google makes homeowners research, compare, and decide. ProLnk makes the decision for you based on your home\’s actual data.' },
      { title: '💸 No Pay-to-Win', detail: 'Google results favor highest bidder. ProLnk results favor highest performance — the best contractor for your job wins, not the biggest ad budget.' },
      { title: '🏡 Home Context', detail: 'Google has no idea what\’s wrong with your HVAC. ProLnk matches based on your home\’s service history, system age, and prior contractor relationships.' },
      { title: '🔒 Contractor Trust', detail: 'Google Local Services is a verification checkbox. ProLnk tracks real job completion, pricing accuracy, and response time — ongoing accountability.' },
    ],
    verdict: 'Google finds contractors. ProLnk finds the right one.',
  },
};

const PILLARS = [
  { icon: '🎯', title: 'Match-Only Model', desc: 'One homeowner → one contractor. No bidding wars, no spam calls.' },
  { icon: '🏦', title: 'Data Moat', desc: '50M homes of service history. Gets better every day, impossible to replicate.' },
  { icon: '💰', title: '5-Stream Income', desc: 'Partners are financially locked in. Switching cost is enormous.' },
  { icon: '🤖', title: 'AI Feedback Loop', desc: 'Every match improves the next. Quality compounds continuously.' },
];

export default function DFWProLnkCompetitiveAdvantage() {
  const [selected, setSelected] = useState<string | null>(null);
  const adv = selected ? ADVANTAGES[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>⚔️ ProLnk Competitive Advantage</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>Why ProLnk is structurally hard to compete with — and only gets harder over time</p>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Select a competitor to see ProLnk's specific advantages</p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 16px', flex: '1 1 160px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏁 Select a Competitor</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {COMPETITORS.map((c) => (
              <button key={c.key} onClick={() => setSelected(c.key === selected ? null : c.key)} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === c.key ? '#F5E642' : '#0A1628'}`, background: selected === c.key ? '#0A1628′ : '#0d1f38', cursor: ’pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: selected === c.key ? '#F5E642′ : '#e2e8f0', fontWeight: selected === c.key ? 700 : 400, fontSize: 14 }}>{c.label}</span>
                <span style={{ color: '#64748b', fontSize: 12, background: '#1e2d45', borderRadius: 6, padding: '3px 8px' }}>{c.type}</span>
              </button>
            ))}
          </div>
        </div>

        {adv && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20, fontStyle: 'italic' }}>{adv.summary}</p>
            {adv.moats.map((m, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 10 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{m.title}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>{m.detail}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, background: '#F5E642', borderRadius: 8, padding: '12px 16px', color: '#0A1628', fontWeight: 800, fontSize: 14 }}>
              ⚡ Bottom line: {adv.verdict}
            </div>
          </div>
        )}

        {!adv && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>⚔️</div>
            <div style={{ fontSize: 15 }}>Select a competitor above to see ProLnk's specific advantages</div>
          </div>
        )}
      </div>
    </div>
  );
}
