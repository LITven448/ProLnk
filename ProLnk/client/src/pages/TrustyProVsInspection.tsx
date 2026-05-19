import { useState } from 'react';

const comparisons = [
  { feature: 'Cost', traditional: '$350–$600 one-time', trustypro: 'Included in TrustyPro membership', winner: 'trustypro' },
  { feature: 'Frequency', traditional: 'Usually only at purchase', trustypro: 'Any time, as often as you want', winner: 'trustypro' },
  { feature: 'Who does it', traditional: 'Licensed inspector (2–3 hours on-site)', trustypro: 'AI analysis (seconds)', winner: 'trustypro' },
  { feature: 'What it detects', traditional: 'Visible defects at point in time', trustypro: 'Developing trends across multiple scans', winner: 'trustypro' },
  { feature: 'Report delivery', traditional: 'PDF delivered in 1–2 days', trustypro: 'Instant results in app', winner: 'trustypro' },
  { feature: 'Historical context', traditional: 'None — snapshot only', trustypro: 'Full history of your specific home', winner: 'trustypro' },
  { feature: 'Legal / mortgage use', traditional: 'Accepted by lenders and insurers', trustypro: 'Not a substitute for licensed inspection', winner: 'traditional' },
  { feature: 'Repeat monitoring', traditional: 'Would cost $350–$600 each time', trustypro: 'Built-in, unlimited monitoring', winner: 'trustypro' },
];

const useCases = [
  {
    category: 'Use TrustyPro for:',
    color: '#0d1f2a',
    border: '#0ea5e9',
    accent: '#38bdf8',
    items: [
      'Ongoing home health monitoring throughout ownership',
      'Annual wellness check without scheduling or waiting',
      'Storm damage assessment after hail, wind, or flooding',
      'Maintenance planning — catch small issues before they grow',
      'Early detection of moisture, settling, or wear patterns',
      'Peace of mind between traditional inspections',
    ],
  },
  {
    category: 'Use Traditional Inspection for:',
    color: '#1a1a0d',
    border: '#eab308',
    accent: '#facc15',
    items: [
      'Pre-purchase due diligence — required by most lenders',
      'Insurance certification and documentation',
      'Legal documentation for sale or dispute',
      'Seller disclosure compliance',
      'Detailed written report with licensed professional signature',
      'Pre-listing inspection to surface issues before listing',
    ],
  },
];

export default function TrustyProVsInspection() {
  const [activeTab, setActiveTab] = useState<'compare' | 'usecases'>('compare');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            🔍 COMPARISON GUIDE
          </span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#0f172a' }}>
          TrustyPro Scan vs. Traditional Home Inspection
        </h1>
        <p style={{ fontSize: 20, color: '#0284c7', fontWeight: 700, marginBottom: 16 }}>
          What's the Difference?
        </p>
        <p style={{ fontSize: 16, color: '#64748b', marginBottom: 40, lineHeight: 1.7, maxWidth: 680 }}>
          Both tools protect your home. They just do it at different moments in your ownership journey. Here's how they work together — and when to use each.
        </p>

        <div style={{ display: 'flex', gap: 0, marginBottom: 32, background: '#f1f5f9', borderRadius: 10, padding: 4, width: 'fit-content' }}>
          {[{ id: 'compare', label: '📊 Side-by-Side' }, { id: 'usecases', label: '🎯 Use Cases' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'compare' | 'usecases')}
              style={{
                padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 15,
                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                color: activeTab === tab.id ? '#0284c7′ : '#64748b',
                boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'compare' && (
          <div>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0f172a' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, fontSize: 14, width: '25%' }}>Feature</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', color: '#fbbf24', fontWeight: 700, fontSize: 15 }}>🔧 Traditional Inspection</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', color: '#38bdf8', fontWeight: 700, fontSize: 15 }}>🤖 TrustyPro AI Scan</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr key={row.feature} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                      <td style={{ padding: '14px 20px', color: '#475569', fontWeight: 600, fontSize: 14 }}>{row.feature}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{
                          color: row.winner === 'traditional' ? '#166534′ : '#64748b',
                          fontWeight: row.winner === 'traditional' ? 700 : 400,
                          fontSize: 14,
                          background: row.winner === 'traditional' ? '#dcfce7′ : ’transparent',
                          padding: row.winner === 'traditional' ? '4px 10px' : '4px 0',
                          borderRadius: 20,
                        }}>{row.traditional}</span>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{
                          color: row.winner === 'trustypro' ? '#0369a1′ : '#64748b',
                          fontWeight: row.winner === 'trustypro' ? 700 : 400,
                          fontSize: 14,
                          background: row.winner === 'trustypro' ? '#e0f2fe' : 'transparent',
                          padding: row.winner === 'trustypro' ? '4px 10px' : '4px 0',
                          borderRadius: 20,
                        }}>{row.trustypro}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 14, padding: 24, marginBottom: 32 }}>
              <h3 style={{ color: '#9a3412', fontWeight: 700, marginBottom: 8, fontSize: 18 }}>⚠️ Important: When You Need Both</h3>
              <p style={{ color: '#7c2d12', lineHeight: 1.7, margin: 0 }}>
                TrustyPro doesn't replace a licensed inspector for legal purposes — including mortgage underwriting, homeowner’s insurance, and seller disclosure. It supplements ongoing monitoring after you buy.
                Think of TrustyPro as your home's continuous health tracker. Think of a traditional inspection as the doctor’s physical before a major procedure.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'usecases' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 32 }}>
            {useCases.map(uc => (
              <div key={uc.category} style={{ background: uc.color, border: `1px solid ${uc.border}`, borderRadius: 16, padding: 24 }}>
                <h3 style={{ color: uc.accent, fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{uc.category}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                  {uc.items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: uc.accent, flexShrink: 0 }}>✓</span>
                      <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f172a', borderRadius: 16, padding: 32, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>🔄 The Complementary Approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { step: '1', label: 'Buying', desc: 'Traditional inspection for legal due diligence and negotiation', color: '#fbbf24′ },
              { step: '2', label: 'Move-In', desc: 'TrustyPro baseline scan to establish your home’s starting condition', color: '#34d399′ },
              { step: '3', label: 'Annually', desc: 'TrustyPro yearly scan to track changes and plan maintenance', color: '#60a5fa' },
              { step: '4', label: 'After Storms', desc: 'TrustyPro immediate scan to detect storm damage early', color: '#a78bfa' },
            ].map(s => (
              <div key={s.step} style={{ background: '#1e293b', borderRadius: 12, padding: 18 }}>
                <div style={{ background: s.color, color: '#0f172a', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: 12 }}>{s.step}</div>
                <p style={{ color: s.color, fontWeight: 700, marginBottom: 6 }}>{s.label}</p>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0369a1, #0284c7)', borderRadius: 16, padding: 48, color: '#ffffff' }}>
          <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Start Your TrustyPro Journey</h3>
          <p style={{ color: '#bae6fd', marginBottom: 28, fontSize: 16, maxWidth: 480, margin: '0 auto 28px' }}>
            Join the waitlist for ongoing AI-powered home health monitoring. Know what's happening in your home — before it becomes expensive.
          </p>
          <a href="/waitlist/homeowner" style={{ background: '#ffffff', color: '#0284c7', padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontWeight: 800, fontSize: 17, display: 'inline-block' }}>
            Join the TrustyPro Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
