import { useState } from 'react';

const perspectives = {
  homeowner: {
    label: 'Homeowner',
    icon: '🏠',
    headline: 'A market built against you — until now',
    points: [
      { icon: '😤', title: 'No reliable local platform', detail: 'Yelp and Google are pay-to-play for contractors. The best pros are not always the ones with the biggest ad budgets.' },
      { icon: '🚨', title: 'Contractor fraud is rampant', detail: 'Texas AG prosecutes hundreds of home contractor fraud cases per year. DFW homeowners lose an estimated $180M annually to unlicensed and fraudulent contractors.' },
      { icon: '📋', title: 'No service history record', detail: 'When you sell your home, you cannot prove what was repaired or when. The Home Health Vault changes that permanently.' },
      { icon: '✅', title: 'ProLnk fixes all three', detail: 'Verified pros only. AI matching finds the right fit. Every service permanently documented in your Home Health Vault.' },
    ],
  },
  pro: {
    label: 'Service Pro',
    icon: '🔧',
    headline: 'DFW pros are being commoditized by bad platforms',
    points: [
      { icon: '💸', title: 'Lead platforms charge too much', detail: 'The top lead platforms charge $35-$150 per lead and sell the same lead to 5 competitors simultaneously. You pay to lose.' },
      { icon: '🗺️', title: '6.5M people, no territory system', detail: 'No platform offers true territory-based matching. ProLnk assigns leads by zip code so you are not bidding against yourself.' },
      { icon: '📈', title: 'Income diversification', detail: 'ProLnk 5-stream network income lets pros earn from referrals, subscriptions, and homeowner origination — not just jobs.' },
      { icon: '🏆', title: 'Build a real business', detail: 'ProLnk is designed so top pros earn more over time as their tier advances from Charter to Founding to Level 3 and beyond.' },
    ],
  },
  investor: {
    label: 'Investor',
    icon: '💼',
    headline: 'DFW is the ideal launch market for a national platform',
    points: [
      { icon: '📊', title: '2.3M homes, $4.2B TAM', detail: 'DFW has 2.3M residential homes, over 200K licensed contractors, and $4.2B in annual home services spend. It is the 4th largest metro in the US.' },
      { icon: '🔥', title: 'High churn from existing platforms', detail: 'HomeAdvisor NPS averages below 20 in DFW. Angie\'s and Thumbtack have similar problems. There is a massive trust gap to fill.' },
      { icon: '🧠', title: 'Data moat from day one', detail: 'Every match and every repair adds to the Home Health Vault data asset. The data compounds with each transaction across 50M+ homes nationally.' },
      { icon: '🚀', title: 'Proven founder, local network', detail: 'Andrew Frakes spent years in DFW real estate witnessing the fraud and inefficiency firsthand. This is not a remote team building for a market they do not know.' },
    ],
  },
};

type PerspKey = keyof typeof perspectives;

export default function ProLnkDFWLaunchStory() {
  const [active, setActive] = useState<PerspKey>('homeowner');
  const p = perspectives[active];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤠</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', margin: '0 0 12px' }}>Why We Launched in DFW</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>6.5 million people. 2.3 million homes. Zero reliable local service platform. Andrew Frakes saw it firsthand — and built the fix.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {(Object.keys(perspectives) as PerspKey[]).map(k => (
            <button key={k} onClick={() => setActive(k)} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: active === k ? '#F5E642' : '#1e2d4a', color: active === k ? '#0A1628' : '#94a3b8' }}>
              {perspectives[k].icon} {perspectives[k].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 16, padding: 28, border: '1px solid #2d4a7a', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{p.icon} {p.headline}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {p.points.map(pt => (
              <div key={pt.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{pt.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 4 }}>{pt.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{pt.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>👤</div>
            <div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Andrew Frakes — Founder and CEO</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>I saw DFW homeowners get ripped off year after year. I saw good contractors lose to bad marketing. I built ProLnk because I could not find a platform that actually solved the problem. DFW is home — and it deserves better.</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 28 }}>
          {[['6.5M', 'DFW population'], ['2.3M', 'Residential homes'], ['$4.2B', 'Annual services spend']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
