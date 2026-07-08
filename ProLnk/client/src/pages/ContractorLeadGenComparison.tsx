import { useState } from 'react';

const platforms = [
  {
    name: 'ProLnk',
    logo: '🔵',
    costModel: 'Platform fee on hire only',
    leadQuality: '⭐⭐⭐⭐⭐',
    coverage: 'DFW + expanding',
    exclusivity: '✅ Exclusive',
    responseTime: '< 2 hrs avg',
    monthlyCost: 'From $99/mo + platform fee',
    recommended: true,
    verdict: 'Best for contractors who want quality, exclusive leads at a flat monthly price.',
  },
  {
    name: 'Angi (formerly Angie\’s List)',
    logo: '🟠',
    costModel: 'Pay per lead',
    leadQuality: '⭐⭐',
    coverage: 'National',
    exclusivity: '❌ Shared (up to 5 pros)',
    responseTime: 'Instant, but unvetted',
    monthlyCost: '$300–$800/mo',
    recommended: false,
    verdict: 'High volume, low quality. You compete on price against 4 other pros for every lead.',
  },
  {
    name: 'HomeAdvisor',
    logo: '🟢',
    costModel: 'Pay per lead + subscription',
    leadQuality: '⭐⭐',
    coverage: 'National',
    exclusivity: '❌ Shared',
    responseTime: 'Variable',
    monthlyCost: '$350–$600/mo',
    recommended: false,
    verdict: 'Similar to Angi (same parent company). Class action lawsuits filed over lead quality.',
  },
  {
    name: 'Thumbtack',
    logo: '🟡',
    costModel: 'Pay to quote',
    leadQuality: '⭐⭐⭐',
    coverage: 'National',
    exclusivity: '❌ Shared',
    responseTime: 'Homeowner-initiated',
    monthlyCost: '$200–$500/mo',
    recommended: false,
    verdict: 'Better UX than Angi but still shared leads. Costs stack up fast in competitive markets.',
  },
  {
    name: 'Nextdoor Pro',
    logo: '🟣',
    costModel: 'Free organic + paid ads',
    leadQuality: '⭐⭐⭐',
    coverage: 'Neighborhood-level',
    exclusivity: '⚠️ Organic only',
    responseTime: 'Word-of-mouth speed',
    monthlyCost: '$0–$200/mo',
    recommended: false,
    verdict: 'Great for brand awareness. Not scalable for lead volume. Works best for established local pros.',
  },
  {
    name: 'Google Local Services',
    logo: '🔴',
    costModel: 'Pay per verified lead',
    leadQuality: '⭐⭐⭐⭐',
    coverage: 'National',
    exclusivity: '⚠️ Semi-exclusive',
    responseTime: 'Fast (Google screened)',
    monthlyCost: '$400–$1,200/mo',
    recommended: false,
    verdict: 'High quality but expensive in competitive markets. Requires Google\’s background check process.',
  },
];

const tradeRecommendations: Record<string, string[]> = {
  Plumbing: ['ProLnk', 'Google Local Services'],
  Electrical: ['ProLnk', 'Google Local Services'],
  HVAC: ['ProLnk', 'Thumbtack'],
  Roofing: ['ProLnk', 'Angi (formerly Angie\’s List)'],
  Landscaping: ['ProLnk', 'Nextdoor Pro'],
  General: ['ProLnk', 'Google Local Services'],
};

const comparisonFields = ['costModel', 'leadQuality', 'coverage', 'exclusivity', 'responseTime', 'monthlyCost'] as const;
const fieldLabels: Record<string, string> = {
  costModel: '💰 Cost Model',
  leadQuality: '⭐ Lead Quality',
  coverage: '📍 Coverage',
  exclusivity: '🔒 Exclusivity',
  responseTime: '⚡ Response Time',
  monthlyCost: '📊 Avg Monthly Cost',
};

export default function ContractorLeadGenComparison() {
  const [selectedTrade, setSelectedTrade] = useState('General');
  const [highlightedPlatform, setHighlightedPlatform] = useState<string | null>(null);

  const recommended = tradeRecommendations[selectedTrade] || tradeRecommendations.General;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ padding: '80px 24px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 13, background: '#F5E642', color: '#0A1628', fontWeight: 800, letterSpacing: 2, display: 'inline-block', padding: '4px 12px', borderRadius: 6, marginBottom: 16, textTransform: 'uppercase' }}>2026 Contractor Guide</div>
          <h1 style={{ fontSize: 46, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>Best Lead Generation<br />for Contractors in 2026</h1>
          <p style={{ fontSize: 18, color: '#a0aec0', lineHeight: 1.7 }}>We compared every major platform on cost, quality, and exclusivity so you don't have to burn money finding out.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
        <section style={{ marginBottom: 48 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 28, border: '1px solid rgba(245,230,66,0.2)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>🔍 Filter by Your Trade</h2>
            <p style={{ color: '#a0aec0', fontSize: 14, marginBottom: 20 }}>Select your trade to see the best platforms for your specific category.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {Object.keys(tradeRecommendations).map(trade => (
                <button
                  key={trade}
                  onClick={() => setSelectedTrade(trade)}
                  style={{ padding: '9px 18px', borderRadius: 8, border: '2px solid', borderColor: selectedTrade === trade ? '#F5E642' : 'rgba(255,255,255,0.2)', background: selectedTrade === trade ? '#F5E642' : 'transparent', color: selectedTrade === trade ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                >
                  {trade}
                </button>
              ))}
            </div>
            {selectedTrade && (
              <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(245,230,66,0.1)', borderRadius: 10, border: '1px solid rgba(245,230,66,0.3)' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>✅ Best for {selectedTrade}: </span>
                <span style={{ color: '#e0e6f0', fontSize: 15 }}>{recommended.join(' and ')}</span>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Platform Comparison</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {platforms.map((platform, i) => (
              <div
                key={i}
                onClick={() => setHighlightedPlatform(highlightedPlatform === platform.name ? null : platform.name)}
                style={{ background: platform.recommended ? 'rgba(245,230,66,0.08)' : 'rgba(255,255,255,0.04)', borderRadius: 14, border: `2px solid ${platform.recommended ? '#F5E642' : highlightedPlatform === platform.name ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', overflow: 'hidden' }}
              >
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 28 }}>{platform.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: 18 }}>{platform.name}</span>
                      {platform.recommended && <span style={{ fontSize: 11, fontWeight: 800, background: '#F5E642', color: '#0A1628', padding: '2px 8px', borderRadius: 20 }}>RECOMMENDED</span>}
                      {recommended.includes(platform.name) && !platform.recommended && <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(245,230,66,0.2)', color: '#F5E642', padding: '2px 8px', borderRadius: 20 }}>GOOD FOR {selectedTrade.toUpperCase()}</span>}
                    </div>
                    <div style={{ fontSize: 14, color: '#a0aec0' }}>{platform.costModel} · {platform.monthlyCost}</div>
                  </div>
                  <span style={{ color: '#555', fontSize: 20 }}>{highlightedPlatform === platform.name ? '▲' : '▼'}</span>
                </div>
                {highlightedPlatform === platform.name && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                      {comparisonFields.map(field => (
                        <div key={field} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px' }}>
                          <div style={{ fontSize: 12, color: '#888', fontWeight: 700, marginBottom: 4 }}>{fieldLabels[field]}</div>
                          <div style={{ fontSize: 14, color: '#e0e6f0' }}>{platform[field]}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#c0c8d8', lineHeight: 1.6 }}>
                      <strong style={{ color: '#F5E642' }}>Our Take: </strong>{platform.verdict}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 36, marginBottom: 48, border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>📊 True Cost Comparison (Annual)</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(245,230,66,0.3)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 16px', color: '#F5E642', fontWeight: 700 }}>Platform</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', color: '#F5E642', fontWeight: 700 }}>Monthly Cost</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', color: '#F5E642', fontWeight: 700 }}>Annual Cost</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', color: '#F5E642', fontWeight: 700 }}>Close Rate</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', color: '#F5E642', fontWeight: 700 }}>Cost Per Won Job</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'ProLnk', monthly: 'From $99', annual: '$1,200+', close: '~60%', costPerJob: '$50–120', highlight: true },
                  { name: 'Angi', monthly: '$500', annual: '$6,000', close: '~18%', costPerJob: '$280–400', highlight: false },
                  { name: 'HomeAdvisor', monthly: '$475', annual: '$5,700', close: '~18%', costPerJob: '$265–380', highlight: false },
                  { name: 'Thumbtack', monthly: '$350', annual: '$4,200', close: '~25%', costPerJob: '$140–210', highlight: false },
                  { name: 'Google LSA', monthly: '$800', annual: '$9,600', close: '~45%', costPerJob: '$80–160', highlight: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: row.highlight ? 'rgba(245,230,66,0.06)' : 'transparent' }}>
                    <td style={{ padding: '12px 16px', fontWeight: row.highlight ? 700 : 400, color: row.highlight ? '#F5E642' : '#e0e6f0' }}>{row.name}{row.highlight ? ' ⭐' : ''}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#a0aec0' }}>{row.monthly}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#a0aec0' }}>{row.annual}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: row.highlight ? '#4ade80' : '#a0aec0' }}>{row.close}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: row.highlight ? '#F5E642' : '#a0aec0' }}>{row.costPerJob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#555', marginTop: 16 }}>Estimates based on industry averages and self-reported contractor data. The ProLnk platform fee is 6–15% of job value, varying by job size and plan.</p>
        </section>

        <section style={{ background: '#F5E642', borderRadius: 16, padding: 44, textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: '#0A1628', marginBottom: 12 }}>Stop Paying for Leads You Don't Win</h2>
          <p style={{ color: '#1a1a2e', fontSize: 16, lineHeight: 1.7, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>ProLnk is the only platform where you pay nothing until you're actually hired. Early access is open — join the waitlist.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 17, fontWeight: 800, cursor: 'pointer' }}>Join the Waitlist →</button>
        </section>
      </div>
    </div>
  );
}
