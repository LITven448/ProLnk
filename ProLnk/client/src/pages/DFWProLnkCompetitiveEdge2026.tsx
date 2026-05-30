import { useState } from 'react';

const concerns = [
  { id: 'vs-angi', label: 'vs Angi / HomeAdvisor', icon: '⚔️' },
  { id: 'vs-thumbtack', label: 'vs Thumbtack', icon: '📌' },
  { id: 'income', label: 'Income Model', icon: '💰' },
  { id: 'moat', label: 'Why ProLnk Wins', icon: '🏆' },
];

const guides: Record<string, { title: string; items: { icon: string; point: string; detail: string; edge: string }[] }> = {
  'vs-angi': {
    title: 'ProLnk vs Angi / HomeAdvisor',
    items: [
      { icon: '🗂️', point: 'Home Health Vault', detail: 'Angi has no property data layer. ProLnk builds a permanent data record on every DFW home served', edge: 'ProLnk edge: proprietary data moat — competitors cannot replicate in < 10 years' },
      { icon: '💵', point: '5-Stream Income vs Flat Fee', detail: 'Angi charges a flat lead fee. ProLnk offers 5 income streams including 4-level network override', edge: 'ProLnk edge: pros earn more and have lock-in economics vs Angi flat-fee model' },
      { icon: '🤖', point: 'AI Matching vs Spray-and-Pray', detail: 'Angi sends the same lead to multiple pros. ProLnk AI matches one pro per job by fit', edge: 'ProLnk edge: higher close rate, lower wasted quote time for DFW pros' },
    ],
  },
  'vs-thumbtack': {
    title: 'ProLnk vs Thumbtack',
    items: [
      { icon: '🏠', point: 'DFW-Specific Knowledge Base', detail: 'Thumbtack is national generic. ProLnk has 5,200+ pages of DFW-specific home service content', edge: 'ProLnk edge: local expertise in DFW clay soils, hail patterns, code requirements' },
      { icon: '⭐', point: 'Charter Tier Scarcity', detail: 'Thumbtack is open to everyone. ProLnk Charter tier is capped at 500 applicants — closes forever', edge: 'ProLnk edge: scarcity creates urgency and long-term competitive advantage for early pros' },
      { icon: '🔄', point: 'Network Override Income', detail: 'Thumbtack has no referral income. ProLnk pays 4 levels of network override on referred pros', edge: 'ProLnk edge: pros who recruit earn passive income Thumbtack will never offer' },
    ],
  },
  'income': {
    title: '5-Stream Income Model',
    items: [
      { icon: '1️⃣', point: 'Stream 1: Direct Job Commission', detail: '12–70% commission on each matched job, scaling by tier (New → Charter → Founding → L3 → L4)', edge: 'All tiers: $149/mo locked rate, 60% job keep, increasing network bonuses' },
      { icon: '2️⃣', point: 'Stream 2: Pro Network Override', detail: '7/4/2/1% on network job income — 4 levels deep on every pro you recruit', edge: 'One recruited pro doing 10 jobs/month = passive monthly income indefinitely' },
      { icon: '3️⃣', point: 'Streams 3–5: Subscription + Origination', detail: '12/6/3/1.5% on subscription overrides + 1.5% home origination rights on every home added', edge: 'Origination rights are permanent — home stays in your income stream forever' },
    ],
  },
  'moat': {
    title: 'Why ProLnk Wins Long-Term',
    items: [
      { icon: '🏰', point: 'Data Moat (Home Health Vault)', detail: 'Structural and service history on 2.3M DFW homes — no competitor has this or can build it fast', edge: 'Data advantage compounds every year as more jobs feed the Vault' },
      { icon: '🔒', point: 'Network Lock-In', detail: '5 income streams make switching cost prohibitive — pros who recruit never leave', edge: 'Network effects accelerate: each new pro recruits more pros, grows your passive income' },
      { icon: '🤖', point: 'AI Feedback Loop', detail: 'Match quality improves continuously as AI learns DFW pro performance and homeowner outcomes', edge: 'AI advantage grows: better matches = higher satisfaction = platform dominance' },
    ],
  },
};

export default function DFWProLnkCompetitiveEdge2026() {
  const [concern, setConcern] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk Competitive Edge Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Why ProLnk wins in DFW — a clear-eyed comparison against every alternative</p>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>❓ WHAT DO YOU WANT TO UNDERSTAND?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id)} style={{ padding: '12px', borderRadius: 8, border: '2px solid', borderColor: concern === c.id ? '#F5E642' : '#334155', backgroundColor: concern === c.id ? '#F5E64220' : '#0f2744', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {concern && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ {guides[concern].title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides[concern].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.point}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{item.detail}</div>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#4ade80' }}>🏆 {item.edge}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#F5E64215', border: '1px solid #F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Charter tier closes at 500 — apply now</p>
              <a href="https://prolnk.io" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>🔗 Apply at ProLnk.io →</a>
            </div>
          </div>
        )}

        {!concern && (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 40 }}>
            ☝️ Select a comparison above to see the ProLnk competitive edge
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #1e3a5f', paddingTop: 20 }}>
          <p style={{ color: '#475569', fontSize: 12 }}>ProLnk DFW · Competitive Intelligence · prolnk.io · Charter Tier Closing Soon · May 2026</p>
        </div>
      </div>
    </div>
  );
}