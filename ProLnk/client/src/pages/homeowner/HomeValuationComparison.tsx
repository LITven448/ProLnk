import { useState } from 'react';

const tools = [
  { name: 'Zillow Zestimate', accuracy: 'Low–Medium', cost: 'Free', error: '7% median error in DFW', use: 'Casual tracking and general trends', best: ['casual', 'tracking'], tag: '🟡' },
  { name: 'Realtor.com Estimate', accuracy: 'Low–Medium', cost: 'Free', error: 'Similar to Zillow, different algorithm', use: 'Cross-checking Zillow', best: ['casual', 'crosscheck'], tag: '🟡' },
  { name: 'ATTOM Data', accuracy: 'High', cost: 'Pro subscription', error: 'County records + market data', use: 'Serious financial planning', best: ['planning', 'refinance'], tag: '🟢' },
  { name: 'Licensed Appraiser', accuracy: 'Highest (legally defensible)', cost: '$350–$600', error: 'Only legally binding valuation', use: 'Refinancing, estate, legal disputes', best: ['legal', 'refinance', 'estate'], tag: '🟢' },
  { name: 'CMA by Realtor', accuracy: 'High', cost: 'Free (from your agent)', error: 'Based on recent comparable sales', use: 'Before listing or buying', best: ['selling', 'buying'], tag: '🟢' },
  { name: 'TrustyPro Home Value', accuracy: 'High', cost: 'Included with TrustyPro', error: 'ATTOM-powered, updated monthly', use: 'Ongoing tracking + condition adjustment', best: ['tracking', 'planning', 'casual'], tag: '🟢' },
];

const purposes = [
  { id: 'casual', label: '📊 Casual Tracking' },
  { id: 'planning', label: '📋 Financial Planning' },
  { id: 'refinance', label: '🏦 Refinancing' },
  { id: 'selling', label: '🏷️ Selling My Home' },
  { id: 'buying', label: '🔑 Buying a Home' },
  { id: 'estate', label: '⚖️ Estate / Legal' },
  { id: 'crosscheck', label: '🔀 Cross-Checking' },
];

const recommendations = {
  casual: { tool: 'TrustyPro Home Value', reason: 'Free with your account, updated monthly, no effort required. Better than Zillow for DFW accuracy.' },
  planning: { tool: 'TrustyPro Home Value + ATTOM Data', reason: 'TrustyPro for ongoing tracking, ATTOM for deep-dive analysis when making major financial decisions.' },
  refinance: { tool: 'Licensed Appraiser', reason: 'Lenders require a licensed appraisal for refinancing. No AVM tool is accepted as a substitute.' },
  selling: { tool: 'CMA by Realtor + TrustyPro', reason: 'Get a free CMA from your listing agent and use TrustyPro to track value while you prepare to sell.' },
  buying: { tool: 'CMA by Realtor', reason: 'Your buyer\’s agent will run a CMA on any property you\’re serious about — it\’s free and highly accurate.' },
  estate: { tool: 'Licensed Appraiser', reason: 'Estate and legal matters require a certified appraisal. Only option with legal standing in court or IRS filings.' },
  crosscheck: { tool: 'Zillow + Realtor.com + TrustyPro', reason: 'Run all three and triangulate. If they agree within 5%, confidence is high. If they diverge, consider a CMA.' },
};

export default function HomeValuationComparison() {
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  const rec = selectedPurpose ? recommendations[selectedPurpose] : null;

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#7c8db5', marginBottom: 8 }}>🏠 DFW Homeowner Resources</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', margin: '0 0 12px' }}>
            Home Valuation Tools Compared
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            Which one is right for DFW?
          </p>
        </div>

        {/* Why It Matters */}
        <div style={{ background: '#1a2040', border: '1px solid #2d3a6b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⚠️</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#93c5fd', marginTop: 0, marginBottom: 8 }}>Why This Matters in DFW</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 12px' }}>
            Your Zillow estimate and your appraisal could differ by <strong style={{ color: '#f1f5f9′ }}>$30,000–$80,000</strong> in DFW.
            The right tool depends entirely on your purpose.
          </p>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: 14 }}>
            DFW's rapid growth makes automated tools lag reality by <strong style={{ color: '#e2e8f0' }}>3–6 months</strong>.
            Fast-moving markets need human judgment for high-stakes decisions.
          </p>
        </div>

        {/* Tool Comparison Table */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 20 }}>📊 Valuation Tool Comparison</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {tools.map(tool => (
              <div key={tool.name} style={{ background: '#0f1117', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 16 }}>{tool.tag} </span>
                    <strong style={{ color: '#f1f5f9', fontSize: 16 }}>{tool.name}</strong>
                  </div>
                  <span style={{ fontSize: 13, color: '#60a5fa', background: '#1e3a5f', padding: '3px 10px', borderRadius: 20, flexShrink: 0, marginLeft: 8 }}>{tool.cost}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                  <div><span style={{ color: '#64748b' }}>Accuracy: </span><span style={{ color: '#94a3b8′ }}>{tool.accuracy}</span></div>
                  <div><span style={{ color: '#64748b' }}>Notes: </span><span style={{ color: '#94a3b8′ }}>{tool.error}</span></div>
                  <div style={{ gridColumn: 'span 2′ }}><span style={{ color: '#64748b' }}>Best for: </span><span style={{ color: '#e2e8f0' }}>{tool.use}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Selector */}
        <div style={{ background: '#1e2436', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginTop: 0, marginBottom: 8 }}>🎯 Which Tool Is Right for You?</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Select your purpose to get a specific recommendation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginBottom: 24 }}>
            {purposes.map(p => (
              <button key={p.id} onClick={() => setSelectedPurpose(p.id === selectedPurpose ? null : p.id)}
                style={{ padding: '12px 14px', borderRadius: 8, border: '2px solid', borderColor: selectedPurpose === p.id ? '#3b82f6′ : '#2d3748', background: selectedPurpose === p.id ? '#1e3a5f' : '#0f1117', color: selectedPurpose === p.id ? '#93c5fd' : '#94a3b8', cursor: ’pointer', fontSize: 14, fontWeight: 600, textAlign: 'left' }}>
                {p.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ background: '#0f2d1a', border: '1px solid #166534', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, color: '#4ade80', marginBottom: 6 }}>Recommended Tool</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#86efac', marginBottom: 8 }}>{rec.tool}</div>
              <div style={{ fontSize: 14, color: '#a7f3d0', lineHeight: 1.6 }}>{rec.reason}</div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '16px 40px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            🏠 Get Your TrustyPro Home Value Estimate
          </a>
          <p style={{ color: '#4b5563', fontSize: 14, marginTop: 12 }}>ATTOM-powered. Updated monthly. Free with TrustyPro.</p>
        </div>

      </div>
    </div>
  );
}
