import { useState } from 'react';

interface CompareRow {
  feature: string;
  prolnk: string;
  ha: string;
}

const rows: CompareRow[] = [
  { feature: 'Lead model', prolnk: '$0 upfront — subscription only', ha: '$15–$300+ per lead regardless of outcome' },
  { feature: 'Leads sold to multiple pros', prolnk: 'Exclusive match — 1 lead → 1 pro', ha: 'Same lead sold to 4–6 contractors' },
  { feature: 'Lead verification', prolnk: 'AI + admin reviewed before delivery', ha: 'Self-reported homeowner data only' },
  { feature: 'Passive / network income', prolnk: '4-level cascade + subscription override', ha: 'None' },
  { feature: 'Platform fee transparency', prolnk: '$149/mo flat — no surprises', ha: 'Lead prices fluctuate, mandatory profile fees' },
  { feature: 'Background check', prolnk: 'Required — verified by admin', ha: 'Optional "screened" badge — paid tier only' },
  { feature: 'Review integrity', prolnk: 'Post-job verified reviews', ha: 'Open review system — frequently gamed' },
  { feature: 'Customer service for lead disputes', prolnk: 'Human admin review within 48h', ha: 'Largely automated — most disputes denied' },
  { feature: 'Contract with platform', prolnk: 'Month-to-month, cancel anytime', ha: 'Annual contracts common, auto-renewing' },
  { feature: 'AI-powered matching', prolnk: 'Yes — trade, geography, capacity, and photo scoring', ha: 'Basic keyword and zip matching' },
];

export default function ProLnkVsHomeAdvisor() {
  const [activeTab, setActiveTab] = useState<'compare' | 'math' | 'history'>('compare');

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#FEF3C7', color: '#92400E', padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
            DFW Pro Comparison
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, margin: '0 0 16px', color: '#0F172A', lineHeight: 1.2 }}>
            ProLnk vs. HomeAdvisor
          </h1>
          <p style={{ fontSize: 20, color: '#475569', margin: '0 0 8px' }}>The Lead Generation Model Is Broken</p>
          <div style={{ display: 'inline-block', background: '#FEE2E2', color: '#991B1B', padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            ⚠️ Angi acquired HomeAdvisor in 2017 — same parent company, same problems
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: '#F1F5F9', padding: 4, borderRadius: 10, width: 'fit-content' }}>
          {([['compare', 'Comparison Table'], ['math', 'The Real Math'], ['history', 'HA History']] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: activeTab === tab ? '#1E3A5F' : 'transparent', color: activeTab === tab ? '#FCD34D' : '#64748B', transition: 'all 0.2s' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'compare' && (
          <div>
            <div style={{ overflowX: 'auto', borderRadius: 12, border: '2px solid #E2E8F0', overflow: 'hidden', marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '16px 20px', textAlign: 'left', background: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: 13, textTransform: 'uppercase' }}>Feature</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', background: '#1E3A5F', color: '#FCD34D', fontWeight: 800, fontSize: 15 }}>⚡ ProLnk</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', background: '#F8FAFC', color: '#94A3B8', fontWeight: 700, fontSize: 15 }}>HomeAdvisor</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.feature} style={{ borderTop: '1px solid #E2E8F0', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#374151', fontSize: 14 }}>{row.feature}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', background: 'rgba(30,58,95,0.04)', color: '#1E3A5F', fontWeight: 600, fontSize: 14 }}>
                        <span style={{ color: '#22C55E', marginRight: 6 }}>✓</span>{row.prolnk}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: '#EF4444', fontSize: 14 }}>
                        <span style={{ marginRight: 6 }}>✗</span>{row.ha}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* HA Pain Points */}
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 16, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#991B1B', margin: '0 0 20px' }}>HomeAdvisor-Specific Problems</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                {[
                  { icon: '📋', title: 'Mandatory Profile Fees', desc: 'HomeAdvisor charges profile listing fees before you ever receive a lead — you pay to exist on the platform.' },
                  { icon: '🎰', title: 'Wildly Variable Lead Quality', desc: '"Lead quality varies wildly" is the #1 complaint on every contractor forum. No minimum standard for homeowner intent.' },
                  { icon: '🏁', title: 'Racing 5+ Competitors', desc: 'Every lead you receive went to at least 4 others first. You’re always the underdog unless you answer in 5 minutes.' },
                  { icon: '🔄', title: 'Auto-Renewing Annual Contracts', desc: 'Many pros discover they’ve been auto-renewed at higher rates. Cancellation requires a phone call and negotiation.' },
                ].map(p => (
                  <div key={p.title} style={{ display: 'flex', gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#7F1D1D', marginBottom: 4, fontSize: 14 }}>{p.title}</div>
                      <div style={{ color: '#B91C1C', fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'math' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div style={{ background: '#0F172A', color: '#F1F5F9', borderRadius: 16, padding: 28, border: '1px solid #1E293B' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FCA5A5', margin: '0 0 20px' }}>HomeAdvisor — 1 Year</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Profile listing fee</span><span style={{ color: '#EF4444' }}>−$350/yr</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Avg leads/month (15)</span><span style={{ color: '#94A3B8' }}>180 leads</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Avg lead cost</span><span style={{ color: '#EF4444' }}>$95/lead</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Total lead spend</span><span style={{ color: '#EF4444' }}>−$17,100</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Close rate (45%)</span><span style={{ color: '#94A3B8' }}>81 jobs</span></div>
                <div style={{ borderTop: '1px solid #1E293B', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                  <span>Total platform cost</span>
                  <span style={{ color: '#EF4444', fontSize: 18 }}>−$17,450</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}><span>Passive income</span><span>$0</span></div>
              </div>
            </div>
            <div style={{ background: '#1E3A5F', color: '#F1F5F9', borderRadius: 16, padding: 28, border: '2px solid #FCD34D' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FCD34D', margin: '0 0 20px' }}>ProLnk — 1 Year</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Profile listing fee</span><span style={{ color: '#22C55E' }}>$0</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Monthly subscription (12)</span><span style={{ color: '#94A3B8' }}>$1,788/yr</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Upfront lead cost</span><span style={{ color: '#22C55E' }}>$0</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Network earnings (est.)</span><span style={{ color: '#FCD34D' }}>+$3,000–$8,000</span></div>
                <div style={{ borderTop: '1px solid #2D4A7A', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                  <span>Net platform cost</span>
                  <span style={{ color: '#22C55E', fontSize: 18 }}>−$1,788 to +$6,212</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FCD34D', fontWeight: 700 }}><span>vs. HomeAdvisor savings</span><span>$15,662+</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 16, padding: 28, marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#9A3412', margin: '0 0 20px' }}>📖 The HomeAdvisor Story</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { year: '1999', event: 'ServiceMagic founded — original pay-per-lead marketplace for home services.' },
                  { year: '2012', event: 'Rebranded to HomeAdvisor. Rapid expansion through aggressive lead volume, not quality.' },
                  { year: '2017', event: 'IAC acquires HomeAdvisor and Angi’s List — merges them into Angi. Same parent company, two brands.' },
                  { year: '2021', event: 'Angi Inc. IPO. Revenue model remains identical: sell leads to as many pros as possible.' },
                  { year: '2023–24', event: 'FTC investigation into deceptive advertising. Ongoing class action suits from contractors over lead quality.' },
                  { year: '2025', event: 'Contractor exodus continues — Facebook groups with 50K+ pros sharing HomeAdvisor workarounds.' },
                ].map(item => (
                  <div key={item.year} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ background: '#9A3412', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{item.year}</div>
                    <div style={{ color: '#92400E', fontSize: 14, lineHeight: 1.6 }}>{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#14532D', margin: '0 0 8px' }}>What ProLnk Was Built to Fix</h3>
              <p style={{ color: '#166534', margin: 0, fontSize: 14, lineHeight: 1.7 }}>
                ProLnk was built specifically because the pay-per-lead model fundamentally misaligns incentives — platforms make more money when they sell more leads, not when pros succeed. 
                Our subscription model means we win when you win. 60% of your earnings stay with you. 
                The network income system means your best move is to grow the platform, not game it.
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px', background: '#1E3A5F', borderRadius: 16, border: '2px solid #FCD34D', marginTop: 48 }}>
          <h3 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 12px', color: '#FCD34D' }}>Stop Paying Per Lead</h3>
          <p style={{ color: '#94A3B8', margin: '0 0 28px', fontSize: 16 }}>Charter membership — $149/mo locked forever. Only 500 spots available.</p>
          <a href="/apply" style={{ display: 'inline-block', padding: '16px 40px', background: '#FCD34D', color: '#0F172A', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 18 }}>
            Apply for Charter Membership →
          </a>
          <div style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No credit card required to apply</div>
        </div>
      </div>
    </div>
  );
}
