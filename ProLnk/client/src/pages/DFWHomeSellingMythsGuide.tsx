import { useState } from 'react';

const myths = [
  {
    belief: 'You must fix everything before listing',
    verdict: 'MYTH',
    reality: 'Over-improving before listing rarely yields full ROI in DFW. A $15K kitchen update may only add $8K in buyer perceived value. Focus on paint, clean, and curb appeal. Disclose issues and price accordingly — buyers often prefer a credit over your renovation choices.',
    icon: '🔨',
  },
  {
    belief: 'Summer is the best time to sell in DFW',
    verdict: 'MYTH',
    reality: 'DFW spring (March–May) consistently outperforms summer. By June and July, heat slows showings and buyers are traveling. The DFW spring rush sees higher prices, faster closings, and more competing offers than summer listings.',
    icon: '☀️',
  },
  {
    belief: 'Open houses are how homes get sold',
    verdict: 'MOSTLY MYTH',
    reality: 'In DFW, under 5% of homes sell directly from an open house visitor. They are primarily a marketing tool for agents and a neighborhood event. The serious buyers come from online listings and private showings — not weekend open houses.',
    icon: '🚪',
  },
  {
    belief: 'The first offer is never the best offer',
    verdict: 'MYTH',
    reality: 'In hot DFW submarkets like Frisco, McKinney, and Southlake, first offers frequently come from buyers who have lost multiple homes and are motivated to win. Dismissing the first offer in a hot market can lead to fewer follow-on offers after DOM ticks up.',
    icon: '📨',
  },
  {
    belief: 'Staging is only for high-end homes',
    verdict: 'MYTH',
    reality: 'NAR data shows staged DFW homes sell 73% faster than non-staged equivalents and for 1–5% more. Even virtual staging on photography closes the gap. Staging pays regardless of price point in the DFW market.',
    icon: '🛋️',
  },
];

const verdictColor: Record<string, string> = {
  MYTH: '#EF4444',
  'MOSTLY MYTH': '#F59E0B',
  FACT: '#10B981',
};

export default function DFWHomeSellingMythsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏷️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Home Selling Myths — Debunked</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Tap any selling belief to see the DFW market reality.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myths.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#0F2040' : '#111D33',
                border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{m.belief}</span>
                </div>
                <span style={{
                  background: verdictColor[m.verdict] || '#EF4444',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  flexShrink: 0,
                  marginLeft: 12,
                  whiteSpace: 'nowrap',
                }}>{m.verdict}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, padding: '14px', background: '#0A1628', borderRadius: 8, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
                  {m.reality}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, padding: 20, background: '#111D33', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Sell Smarter in DFW</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk connects DFW sellers with vetted professionals who know what actually moves homes in this market.</p>
        </div>
      </div>
    </div>
  );
}
