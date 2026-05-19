import { useState } from 'react';

const perspectives = [
  {
    id: 'contractor',
    label: 'Contractor View',
    homeadvisor: 'HomeAdvisor (Angi Leads) sells the same lead to 3-4 contractors. You spend money whether you win the job or not. Contractors widely report paying $300+ per month with minimal returns. BBB complaints are common.',
    prolnk: 'ProLnk sends you one match at a time. You pay a flat monthly fee and a success commission only when work is completed. No duplicate leads. No wasted spend chasing homeowners already talking to three other contractors.',
    winner: 'prolnk',
  },
  {
    id: 'homeowner',
    label: 'Homeowner View',
    homeadvisor: 'You fill out one form and your phone starts ringing. Multiple contractors calling within minutes. Aggressive follow-up is common. Consumer complaints about unwanted calls persist years after HomeAdvisor was rebranded to Angi.',
    prolnk: 'You describe your need. ProLnk identifies the best-matched licensed contractor in your area and connects you directly. One call, one contractor, no noise.',
    winner: 'prolnk',
  },
  {
    id: 'leadfresh',
    label: 'Lead Freshness',
    homeadvisor: 'HomeAdvisor has been known to resell old leads or recycle contact data. Contractors report reaching homeowners who submitted requests months prior and have already hired someone.',
    prolnk: 'Matches are triggered by live homeowner requests. Every match is fresh. No recycled data. Homeowner intent is real-time.',
    winner: 'prolnk',
  },
  {
    id: 'trust',
    label: 'Platform Trust',
    homeadvisor: 'Angi/HomeAdvisor faces ongoing lawsuits and regulatory scrutiny over fake reviews, background check claims, and contractor verification practices.',
    prolnk: 'Built with verification-first model. Contractors confirm license and insurance before activation. Reputation system rewards quality outcomes, not ad spend.',
    winner: 'prolnk',
  },
];

export default function ProLnkVsHomeAdvisor2026() {
  const [active, setActive] = useState(perspectives[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>2026 Platform Comparison</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>ProLnk vs HomeAdvisor</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            HomeAdvisor rebranded to Angi Leads — but the business model stayed the same. Here is how it compares to ProLnk in 2026.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
          {[
            { label: 'HomeAdvisor Lead Resale', value: 'Up to 4x', sub: 'same lead, multiple contractors', warn: true },
            { label: 'ProLnk Match Resale', value: '0x', sub: 'exclusive single match', warn: false },
            { label: 'BBB Rating (Angi 2025)', value: '1.1 / 5', sub: 'consumer complaint volume', warn: true },
          ].map((s) => (
            <div key={s.label} style={{ background: '#111c2e', borderRadius: 12, padding: '20px 24px', border: s.warn ? '1px solid #4a1010′ : '1px solid #1e3a1e' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.warn ? '#f87171′ : '#4ade80' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c2e', borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Choose a perspective to compare</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {perspectives.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: active.id === p.id ? '#F5E642′ : '#1e2d45', color: active.id === p.id ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#1a0a0a', borderRadius: 10, padding: 20, border: '1px solid #4a1010′ }}>
              <div style={{ fontSize: 12, color: '#f87171', marginBottom: 10, fontWeight: 700 }}>🔴 HOMEADVISOR / ANGI</div>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{active.homeadvisor}</p>
            </div>
            <div style={{ background: '#0a1a0a', borderRadius: 10, padding: 20, border: '1px solid #1e3a1e' }}>
              <div style={{ fontSize: 12, color: '#4ade80', marginBottom: 10, fontWeight: 700 }}>🟢 PROLNK</div>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{active.prolnk}</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: '28px 20px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Stop paying for leads that go nowhere.</div>
          <div style={{ fontSize: 14, color: '#1e293b' }}>Join ProLnk and get matched — not auctioned. DFW contractor spots are filling fast.</div>
        </div>
      </div>
    </div>
  );
}

