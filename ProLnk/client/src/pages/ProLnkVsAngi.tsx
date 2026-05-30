import { useState } from 'react';

interface CompareRow {
  feature: string;
  prolnk: string;
  angi: string;
  prolnkGood: boolean;
}

const rows: CompareRow[] = [
  { feature: 'Upfront lead cost', prolnk: '$0 — no pay per lead', angi: '$25–$300 per lead (win or lose)', prolnkGood: true },
  { feature: 'Lead quality guarantee', prolnk: 'Admin-reviewed, AI-screened homeowners', angi: 'Unverified homeowner submissions', prolnkGood: true },
  { feature: 'Passive income streams', prolnk: '4-level network cascade + subscription overrides', angi: 'None', prolnkGood: true },
  { feature: 'AI photo-to-lead', prolnk: 'Yes — AI detects home damage in photos', angi: 'No', prolnkGood: true },
  { feature: 'Commission you keep', prolnk: '60% of all match earnings', angi: 'You set price — Angi charges for access, not commission', prolnkGood: true },
  { feature: 'Background check', prolnk: 'Required for all active pros', angi: 'Optional — "screened" is a paid badge', prolnkGood: true },
  { feature: 'Monthly platform cost', prolnk: '$149/mo flat — locked forever', angi: '$0 + pay $25–$300 per lead', prolnkGood: true },
  { feature: 'Lead recycling', prolnk: 'Each lead assigned to 1 matched pro', angi: 'Same lead sold to 3–5 pros simultaneously', prolnkGood: true },
  { feature: 'Review system', prolnk: 'Verified post-job reviews only', angi: 'Open reviews — gameable and unverified', prolnkGood: true },
  { feature: 'Recourse for bad leads', prolnk: 'Admin dispute review + credit', angi: 'Limited — most complaints denied', prolnkGood: true },
];

export default function ProLnkVsAngi() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', background: '#FEF3C7', color: '#92400E', padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
            DFW Pro Comparison
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, margin: '0 0 16px', color: '#0F172A', lineHeight: 1.2 }}>
            ProLnk vs. Angi
          </h1>
          <p style={{ fontSize: 20, color: '#475569', margin: 0 }}>
            Why DFW Pros Are Making the Switch
          </p>
        </div>

        {/* Pain Points */}
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#991B1B', margin: '0 0 20px' }}>😤 The Real Pain of Using Angi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '💸', title: 'Pay Whether You Win or Lose', desc: '$300 lead fee — they close with someone else. You’re still charged. No recourse.' },
              { icon: '👥', title: 'Racing 4 Other Pros', desc: 'Angi sells the same lead to 3–5 contractors simultaneously. You’re in a race on price, not quality.' },
              { icon: '⭐', title: 'Reviews You Can’t Trust', desc: 'Competitors leave fake 1-stars. Happy clients don’t leave reviews. Your rating is held hostage.' },
              { icon: '📈', title: 'No Passive Income', desc: 'Every dollar you earn requires active work. No referral system, no network earnings, no residuals.' },
            ].map(p => (
              <div key={p.title}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#7F1D1D', marginBottom: 6 }}>{p.title}</div>
                <div style={{ color: '#B91C1C', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 24px', color: '#0F172A' }}>Side-by-Side Comparison</h2>
          <div style={{ overflowX: 'auto', borderRadius: 12, border: '2px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '16px 20px', textAlign: 'left', background: '#F8FAFC', color: '#64748B', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>Feature</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', background: '#1E3A5F', color: '#FCD34D', fontWeight: 800, fontSize: 15 }}>⚡ ProLnk</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', background: '#F8FAFC', color: '#94A3B8', fontWeight: 700, fontSize: 15 }}>Angi</th>
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
                      <span style={{ marginRight: 6 }}>✗</span>{row.angi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Math */}
        <div style={{ background: '#0F172A', color: '#F1F5F9', borderRadius: 16, padding: 36, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 24px', color: '#FCD34D' }}>💰 The Real Math: 10 Leads/Month</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#FCA5A5', marginBottom: 16 }}>Angi (10 leads)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#CBD5E1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Lead fees (avg $130 each)</span><span style={{ color: '#EF4444', fontWeight: 700 }}>−$1,300</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Close rate (50%)</span><span>5 jobs won</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Effective cost per closed job</span><span style={{ color: '#EF4444', fontWeight: 700 }}>$260/job</span></div>
                <div style={{ borderTop: '1px solid #2D3F5A', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>Monthly lead spend</span><span style={{ color: '#EF4444' }}>$1,300</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}><span>Passive income</span><span>$0</span></div>
              </div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #FCD34D' }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#FCD34D', marginBottom: 16 }}>ProLnk (10 leads)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: '#CBD5E1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Upfront lead cost</span><span style={{ color: '#22C55E', fontWeight: 700 }}>$0</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Monthly subscription</span><span style={{ color: '#94A3B8' }}>$149/mo</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Effective cost per lead</span><span style={{ color: '#22C55E', fontWeight: 700 }}>$14.90</span></div>
                <div style={{ borderTop: '1px solid #2D4A7A', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>Monthly lead spend</span><span style={{ color: '#22C55E' }}>$149</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Network income potential</span><span style={{ color: '#FCD34D', fontWeight: 700 }}>$200–$800+</span></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, padding: 16, background: 'rgba(252,211,77,0.1)', borderRadius: 8, border: '1px solid rgba(252,211,77,0.3)', textAlign: 'center' }}>
            <span style={{ color: '#FCD34D', fontWeight: 700, fontSize: 16 }}>ProLnk saves DFW pros an average of $1,151/month in lead costs alone</span>
          </div>
        </div>

        {/* Hidden Costs */}
        <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#9A3412', margin: '0 0 16px' }}>🕵️ The Hidden Cost of Angi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Lead recycling', desc: 'Your $150 lead was also sold to 3 other pros. You’re not getting a qualified homeowner — you’re getting a name.' },
              { title: 'Review manipulation', desc: 'Competitors leave fake 1-star reviews. Angi’s review team rarely removes them. Your reputation is permanently damaged.' },
              { title: 'No recourse for bad leads', desc: '"Homeowner went silent" or "they already hired someone" — Angi’s standard response is a credit toward your next lead purchase.' },
              { title: 'Lead inflation during peak season', desc: 'Angi charges more per lead during summer (HVAC season) and storm season — exactly when you’re already busy.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#EF4444', fontWeight: 900, marginTop: 1 }}>✗</span>
                <div>
                  <span style={{ fontWeight: 700, color: '#7C2D12' }}>{item.title}: </span>
                  <span style={{ color: '#92400E', fontSize: 14 }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px', background: '#1E3A5F', borderRadius: 16, border: '2px solid #FCD34D' }}>
          <h3 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 12px', color: '#FCD34D' }}>Ready to Make the Switch?</h3>
          <p style={{ color: '#94A3B8', margin: '0 0 28px', fontSize: 16 }}>Charter membership — only 500 spots available. $149/mo locked forever.</p>
          <a href="/apply" style={{ display: 'inline-block', padding: '16px 40px', background: '#FCD34D', color: '#0F172A', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 18 }}>
            Apply for Charter Membership →
          </a>
          <div style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No credit card required to apply</div>
        </div>
      </div>
    </div>
  );
}
