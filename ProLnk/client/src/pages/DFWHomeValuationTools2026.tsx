import { useState } from 'react';

const valuationPurposes = [
  { label: 'Selling in 6-12 months', icon: '🏷️', rec: 'CMA from agent (free)', detail: 'A Comparative Market Analysis from a local DFW agent is the most accurate pre-listing tool. Agents pull active and pending comps — not just closed sales like Zillow. Best for pricing strategy. Get 2-3 CMAs from different agents to triangulate.', cost: 'Free', accuracy: '±2-4%' },
  { label: 'Refinancing', icon: '💳', rec: 'Professional appraisal', detail: 'Lenders require a licensed appraisal ($450-600 in DFW). You can\'t select the appraiser — your lender orders it. However, knowing your likely value beforehand via a CMA helps you decide if refi math works before paying for the appraisal.', cost: '$450-600', accuracy: '±1-2%' },
  { label: 'Property tax protest', icon: '🏛️', rec: 'DCAD/TCAD appraisal + comps', detail: 'For Collin, Dallas, Tarrant, or Denton county, pull your appraisal district\'s assessed value and compare to recent closed sales within 1 mile. Zillow Zestimate is not accepted as evidence — you need MLS comps or your own licensed appraisal.', cost: '$0 (DCAD) or $450 (licensed)', accuracy: 'Official for protest purposes' },
  { label: 'Curiosity/tracking equity', icon: '📊', rec: 'Zillow + Redfin estimates', detail: 'Zillow Zestimate accuracy in DFW averages ±5-10% — acceptable for ballpark equity tracking. Redfin\'s estimate tends to be slightly more accurate in DFW\'s fast-moving sub-markets. Check both monthly for trend direction rather than exact value.', cost: 'Free', accuracy: '±5-10%' },
  { label: 'Estate/divorce settlement', icon: '⚖️', rec: 'Licensed professional appraisal', detail: 'Legal proceedings require a licensed, certified appraisal by a Texas Certified Residential Appraiser. This carries legal standing in court. Budget $500-700 in DFW, allow 2-3 weeks. Order from a neutral appraiser — not one referred by either party.', cost: '$500-700', accuracy: '±1-2% (legally defensible)' },
];

export default function DFWHomeValuationTools2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Home Valuation Tools Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Choosing the right home value estimate for your specific DFW situation</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>⚠️ Why Zillow is Often Wrong in DFW</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            DFW's market moves fast. Frisco, McKinney, and Prosper regularly see homes sell 5-12% above Zillow's Zestimate — while some Garland and Irving zip codes run 8% below. Zillow's model lags the market by 30-45 days and doesn't account for DFW's hyper-local sub-market dynamics. Always cross-check.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🗺️ DFW Valuation Tool Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: '#cbd5e1' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#F5E642' }}>Tool</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#F5E642' }}>Cost</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#F5E642' }}>DFW Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {[['Zillow Zestimate','Free','±5-10%'],['Redfin Estimate','Free','±4-8%'],['DCAD/TCAD Official','Free','Assessed (not market)'],['Agent CMA','Free','±2-4%'],['Professional Appraisal','$450-600','±1-2%']].map(([tool,cost,acc],i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '8px' }}>{tool}</td>
                    <td style={{ padding: '8px' }}>{cost}</td>
                    <td style={{ padding: '8px' }}>{acc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🎯 Purpose → Best Tool Recommendation</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {valuationPurposes.map((v, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 8 }}>{valuationPurposes[selected].icon} Best Tool: {valuationPurposes[selected].rec}</h3>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#94a3b8' }}>Cost: {valuationPurposes[selected].cost}</span>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#94a3b8' }}>Accuracy: {valuationPurposes[selected].accuracy}</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{valuationPurposes[selected].detail}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk Home Health Vault</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>Track your home's condition history — the data that supports every appraisal, refinance, and insurance review. Join the waitlist.</p>
        </div>
      </div>
    </div>
  );
}