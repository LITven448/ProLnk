import { useState } from 'react';

const myths = [
  {
    belief: 'You need 20% down to buy a home',
    verdict: 'MYTH',
    reality: 'Conventional loans allow 3% down, FHA allows 3.5%. PMI is temporary and can be removed once you hit 20% equity. In DFW, waiting to save 20% on a $400K home means saving $80K while prices may rise faster than you save.',
    icon: '🏦',
  },
  {
    belief: 'Wait for interest rates to drop before buying',
    verdict: 'RISKY',
    reality: 'In DFW, home prices have historically outpaced rate drops. A $350K home at 7% may become a $390K home at 5.5% — your payment barely changes but your equity starting point is lower. You can always refinance; you cannot retroactively buy at a lower price.',
    icon: '📉',
  },
  {
    belief: 'Foundation issues mean you should walk away',
    verdict: 'MYTH',
    reality: 'Foundation issues are extremely common in DFW due to expansive clay soil. Documented, repaired foundations with engineer letters are routine and acceptable. The question is severity and cost — not automatic rejection.',
    icon: '🏗️',
  },
  {
    belief: 'New construction is always better than resale',
    verdict: 'MYTH',
    reality: 'New construction in DFW often uses builder-grade materials, has limited lot size, and is in developing areas without mature infrastructure. Resale homes in established DFW neighborhoods can offer superior quality, mature trees, and location.',
    icon: '🏘️',
  },
  {
    belief: 'Spring is the only good time to buy in DFW',
    verdict: 'MYTH',
    reality: 'DFW fall (Sept–Nov) often has motivated sellers, less competition, and similar inventory. Buyers in fall frequently get better negotiating position. Spring has more listings but also more competing buyers, often driving up prices.',
    icon: '🍂',
  },
];

const verdictColor: Record<string, string> = {
  MYTH: '#EF4444',
  RISKY: '#F59E0B',
  FACT: '#10B981',
};

export default function DFWHomeBuyingMythsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Home Buying Myths — Debunked</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Click any belief to see the real DFW truth behind it.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myths.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#0F2040′ : '#111D33',
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
                  background: verdictColor[m.verdict],
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  flexShrink: 0,
                  marginLeft: 12,
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
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Navigate DFW Real Estate with Confidence</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk connects you with verified local professionals who know DFW's unique market dynamics.</p>
        </div>
      </div>
    </div>
  );
}
