import { useState } from 'react';

const categories: Record<string, { icon: string; agents: { name: string; desc: string }[] }> = {
  Financial: {
    icon: '💰',
    agents: [
      { name: 'Commission Calculator', desc: 'Calculates your real-time earnings across all 5 income streams instantly.' },
      { name: 'Payout Processor', desc: 'Generates and delivers monthly payouts automatically — no manual requests.' },
      { name: 'Fraud Detector', desc: 'Monitors for suspicious activity to protect your earnings and reputation.' },
      { name: 'Tax Helper', desc: 'Generates 1099s and quarterly reports when earnings thresholds are met.' },
    ],
  },
  Marketing: {
    icon: '📣',
    agents: [
      { name: 'Lead Scorer', desc: 'Rates every incoming homeowner lead for quality before you see it.' },
      { name: 'Email Marketer', desc: 'Sends personalized campaigns to keep pros engaged and informed.' },
      { name: 'Referral Manager', desc: 'Tracks referral chains, rewards, and leaderboard rankings automatically.' },
      { name: 'SEO Optimizer', desc: 'Keeps ProLnk ranking for local home service searches in DFW.' },
    ],
  },
  'Customer Success': {
    icon: '🤝',
    agents: [
      { name: 'Onboarding Flow', desc: 'Guides every new pro through activation steps without human handholding.' },
      { name: 'Support Responder', desc: 'Answers common questions 24/7 and routes complex issues to humans.' },
      { name: 'Retention Optimizer', desc: 'Detects churn signals early and triggers win-back sequences.' },
      { name: 'Feedback Collector', desc: 'Gathers NPS scores and testimonials automatically after jobs close.' },
    ],
  },
  Engineering: {
    icon: '⚙️',
    agents: [
      { name: 'Error Handler', desc: 'Detects and responds to production incidents before users notice.' },
      { name: 'Performance Monitor', desc: 'Profiles platform speed and triggers optimization when thresholds are hit.' },
      { name: 'Dependency Manager', desc: 'Updates libraries and patches security vulnerabilities automatically.' },
      { name: 'Database Optimizer', desc: 'Profiles slow queries and recommends schema improvements continuously.' },
    ],
  },
};

export default function ProLnkAgentNetworkPage() {
  const [cat, setCat] = useState<string>('Financial');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk Agent Network</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 620, margin: '0 auto' }}>
            47 AI agents run ProLnk operations around the clock — so you can focus on jobs, not admin.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {[['47', 'Active AI Agents'], ['24/7', 'Autonomous Ops'], ['80%', 'Work Automated'], ['0', 'Human Delays']].map(([v, l], i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{v}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔎 Explore Agent Categories</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {Object.keys(categories).map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: cat === c ? '#F5E642' : '#1e3a5f', color: cat === c ? '#0A1628' : '#fff' }}>
                {categories[c].icon} {c}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {categories[cat].agents.map((a, i) => (
              <div key={i} style={{ background: '#162033', borderRadius: 12, padding: 18, borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>🤖 {a.name}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}