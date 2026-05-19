import { useState } from 'react';

const COMPARISON = [
  { feature: 'Purpose', zillow: 'Find homes, estimate market value', trustypro: 'Monitor home health, plan maintenance' },
  { feature: 'Data source', zillow: 'Public records, MLS, market sales', trustypro: 'AI scans + maintenance history' },
  { feature: 'Update frequency', zillow: 'As market changes', trustypro: 'After every scan' },
  { feature: 'Value estimate accuracy', zillow: '~7% median error in DFW', trustypro: 'N/A — not a valuation tool' },
  { feature: 'Maintenance intelligence', zillow: 'None', trustypro: 'Core product' },
  { feature: 'AI home scan', zillow: 'No', trustypro: 'Yes' },
  { feature: 'Property record depth', zillow: 'Basic (public records)', trustypro: 'Comprehensive (your history)' },
  { feature: 'Cost to homeowner', zillow: 'Free', trustypro: 'Free' },
];

const USE_CASES = [
  {
    tool: 'Zillow',
    emoji: '🏘️',
    color: '#006AFF',
    bg: '#eff6ff',
    border: '#bfdbfe',
    cases: [
      'Shopping for a new home',
      'Checking your Zestimate',
      'Researching nearby sales for pricing',
      'Browsing open house listings',
    ],
  },
  {
    tool: 'TrustyPro',
    emoji: '🔍',
    color: '#6366f1',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    cases: [
      'Monitoring your home’s current condition',
      'Planning maintenance before it becomes urgent',
      'Building a documented health record to sell faster',
      'Connecting with vetted contractors for any job',
    ],
  },
];

export default function TrustyProVsZillow() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TrustyPro — Education
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', color: '#0f172a' }}>
          TrustyPro vs. Zillow
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', maxWidth: 620, lineHeight: 1.7, margin: '0 0 48px' }}>
          Complementary Tools, Not Competitors
        </p>

        {/* Key insight */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, marginBottom: 40, boxShadow: '0 1px 4px rgba(0,0,0,.06)', borderLeft: '4px solid #6366f1′ }}>
          <div style={{ fontWeight: 700, color: '#6366f1', marginBottom: 8 }}>💡 The Key Insight</div>
          <p style={{ margin: 0, color: '#1e293b', lineHeight: 1.7, fontSize: 16 }}>
            "Zillow is for market research and property search. TrustyPro is for home health intelligence. They solve completely different problems."
          </p>
        </div>

        {/* Comparison table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', marginBottom: 40, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#f8fafc', borderBottom: '1px solid #e2e8f0′ }}>
            <div style={{ padding: '16px 20px', fontWeight: 700, color: '#475569', fontSize: 13, textTransform: 'uppercase' }}>Feature</div>
            <div style={{ padding: '16px 20px', fontWeight: 700, color: '#006AFF', fontSize: 13, textAlign: 'center' }}>🏘️ Zillow</div>
            <div style={{ padding: '16px 20px', fontWeight: 700, color: '#6366f1', fontSize: 13, textAlign: 'center' }}>🔍 TrustyPro</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={i}
              onClick={() => setActiveRow(activeRow === i ? null : i)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < COMPARISON.length - 1 ? '1px solid #f1f5f9′ : ’none',
                background: activeRow === i ? '#faf5ff' : i % 2 === 0 ? '#fff' : '#fafafa',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ padding: '14px 20px', fontWeight: 600, color: '#334155', fontSize: 14 }}>{row.feature}</div>
              <div style={{ padding: '14px 20px', color: '#475569', fontSize: 14, textAlign: 'center' }}>{row.zillow}</div>
              <div style={{ padding: '14px 20px', color: '#6366f1', fontSize: 14, textAlign: 'center', fontWeight: row.trustypro === 'Core product' || row.trustypro === 'Yes' ? 700 : 400 }}>{row.trustypro}</div>
            </div>
          ))}
        </div>

        {/* When to use each */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#0f172a' }}>When to Use Each</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {USE_CASES.map(tool => (
            <div
              key={tool.tool}
              style={{ background: tool.bg, border: `1px solid ${tool.border}`, borderRadius: 16, padding: 28 }}
            >
              <div style={{ fontWeight: 700, color: tool.color, fontSize: 17, marginBottom: 16 }}>
                {tool.emoji} Use {tool.tool} when...
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {tool.cases.map(c => (
                  <div key={c} style={{ display: 'flex', gap: 10, color: '#334155', fontSize: 15, lineHeight: 1.5 }}>
                    <span style={{ color: tool.color, flexShrink: 0 }}>→</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Together */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: '#0f172a' }}>🤝 How They Work Together</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, margin: '0 0 16px' }}>
            "Zillow tells you what your home might be worth. TrustyPro tells you <em>why</em> it's worth that — and how to protect it."
          </p>
          <div style={{ background: '#f8fafc', borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#334155', marginBottom: 10 }}>📦 The Seller's Stack</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ color: '#475569', fontSize: 15 }}>→ Use <strong>Zillow</strong> for pricing context and comparable sales</div>
              <div style={{ color: '#475569', fontSize: 15 }}>→ Use <strong>TrustyPro vault record</strong> to prove condition and justify your ask</div>
              <div style={{ color: '#475569', fontSize: 15 }}>→ Homes with documented maintenance history sell faster and with fewer concessions</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
            Start Building Your Home Health Record
          </div>
          <p style={{ color: '#c7d2fe', margin: '0 0 28px', lineHeight: 1.6, maxWidth: 480, marginInline: 'auto' }}>
            TrustyPro is free for homeowners. Join the waitlist and be first to document your home's condition — before you need it.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{
              display: 'inline-block', background: '#fff', color: '#4338ca',
              borderRadius: 10, padding: '14px 36px', fontWeight: 800, fontSize: 16,
              textDecoration: 'none',
            }}
          >
            Join Homeowner Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
