import { useState } from 'react';

export default function DFWContingencyGuide() {
  const [situation, setSituation] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');

  const contingencies = [
    {
      name: 'Financing Contingency',
      icon: '🏦',
      protects: 'Protects your earnest money if your loan is denied',
      keep: 'Almost always — unless you have full underwriting approval',
      waive: 'Only if fully underwritten and certain of approval',
      dfwNote: 'DFW sellers understand financing contingencies — rarely a dealbreaker',
    },
    {
      name: 'Inspection Contingency',
      icon: '🔍',
      protects: 'Gives you right to exit or negotiate based on inspection findings',
      keep: 'All buyers should keep this — protects you from hidden defects',
      waive: 'New construction only, or convert to "informational" to compete',
      dfwNote: 'Hot DFW markets: offer informational-only inspection instead of full contingency',
    },
    {
      name: 'Appraisal Contingency',
      icon: '📊',
      protects: 'Lets you exit if home appraises below purchase price',
      keep: 'If you cannot or won\’t cover an appraisal gap in cash',
      waive: 'Only if you have cash to cover gap AND want to compete strongly',
      dfwNote: 'DFW hot pockets: waiving appraisal contingency is increasingly common and expected',
    },
    {
      name: 'Home Sale Contingency',
      icon: '🏠',
      protects: 'Lets you exit if your current home doesn\’t sell in time',
      keep: 'If you cannot qualify for two mortgages simultaneously',
      waive: 'Never waive — it protects you from financial disaster',
      dfwNote: 'DFW sellers HATE home sale contingencies — they will choose another buyer. Use bridge loan instead.',
    },
    {
      name: 'Title Contingency',
      icon: '📜',
      protects: 'Ensures clean title with no liens or ownership disputes',
      keep: 'Always — this is non-negotiable protection',
      waive: 'Never',
      dfwNote: 'Always included automatically — this is rarely a point of negotiation',
    },
  ];

  const getRecommendation = () => {
    if (!situation || !riskTolerance) return null;
    const isFirstTime = situation === 'First-Time Buyer';
    const hasHome = situation === 'Selling Current Home';
    const isInvestor = situation === 'Investor / Cash Offer';
    const lowRisk = riskTolerance === 'Low — protect everything';
    const highRisk = riskTolerance === 'High — I want to win';

    if (isInvestor) return {
      headline: '💼 Investor Strategy: Waive Most — Compete Aggressively',
      items: [
        { contingency: 'Financing', action: 'WAIVE', note: 'Cash offer — no financing needed' },
        { contingency: 'Inspection', action: 'INFORMATIONAL ONLY', note: 'Know what you\’re buying, no repair demands' },
        { contingency: 'Appraisal', action: 'WAIVE', note: 'Cash buyers set their own price ceiling' },
        { contingency: 'Home Sale', action: 'N/A', note: 'Not applicable for investors' },
      ],
    };
    if (lowRisk || isFirstTime) return {
      headline: '🛡️ Conservative Strategy: Keep All Contingencies',
      items: [
        { contingency: 'Financing', action: 'KEEP', note: 'Critical — do not risk your earnest money' },
        { contingency: 'Inspection', action: 'KEEP FULL RIGHTS', note: 'First-time buyers especially need inspection protection' },
        { contingency: 'Appraisal', action: 'KEEP', note: 'Don\’t commit cash you don\’t have for a gap' },
        { contingency: 'Home Sale', action: hasHome ? 'KEEP — but get bridge loan quote' : 'N/A', note: hasHome ? 'Sellers hate it — explore bridge loan to avoid this contingency' : '' },
      ],
    };
    if (highRisk) return {
      headline: '⚡ Aggressive Strategy: Compete Hard in DFW',
      items: [
        { contingency: 'Financing', action: 'KEEP — but get underwritten', note: 'Underwritten approval is nearly as strong as cash' },
        { contingency: 'Inspection', action: 'INFORMATIONAL ONLY', note: 'Keeps your exit right, removes seller uncertainty' },
        { contingency: 'Appraisal', action: 'CONSIDER WAIVING with gap coverage', note: 'Offer $10K-$20K appraisal gap coverage to win' },
        { contingency: 'Home Sale', action: hasHome ? 'BRIDGE LOAN to avoid this' : 'N/A', note: hasHome ? 'Home sale contingency will cost you the deal in competitive DFW' : '' },
      ],
    };
    return {
      headline: '⚖️ Balanced Strategy: Keep What Matters Most',
      items: [
        { contingency: 'Financing', action: 'KEEP', note: 'Always protect your earnest money' },
        { contingency: 'Inspection', action: 'KEEP — shorten window to 5 days', note: 'Faster inspection timeline shows confidence' },
        { contingency: 'Appraisal', action: 'KEEP with small gap offer ($5K)', note: 'Shows flexibility without full risk exposure' },
        { contingency: 'Home Sale', action: hasHome ? 'AVOID if possible' : 'N/A', note: hasHome ? 'Explore bridge financing before making an offer' : '' },
      ],
    };
  };

  const rec = getRecommendation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a2744', marginBottom: '0.5rem' }}>DFW Contingency Guide</h1>
          <p style={{ color: '#555', fontSize: '1.05rem' }}>Every contingency protects you — know when to keep them and when DFW competition demands flexibility.</p>
        </div>

        {contingencies.map((c, i) => (
          <div key={i} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1a2744' }}>{c.name}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ padding: '0.5rem', backgroundColor: '#e8f5e9', borderRadius: '6px', fontSize: '0.85rem', color: '#2e7d32' }}>✅ Keep When: {c.keep}</div>
              <div style={{ padding: '0.5rem', backgroundColor: '#fff3e0', borderRadius: '6px', fontSize: '0.85rem', color: '#e65100' }}>⚠️ Waive When: {c.waive}</div>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#e3f2fd', borderRadius: '6px', fontSize: '0.85rem', color: '#1565c0' }}>🏠 DFW Reality: {c.dfwNote}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2744', marginBottom: '1rem' }}>🎯 My Contingency Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>My Buyer Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                <option>First-Time Buyer</option>
                <option>Selling Current Home</option>
                <option>Relocating, No Home to Sell</option>
                <option>Investor / Cash Offer</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>Risk Tolerance</label>
              <select value={riskTolerance} onChange={e => setRiskTolerance(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                <option>Low — protect everything</option>
                <option>Moderate — balanced approach</option>
                <option>High — I want to win</option>
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ backgroundColor: '#1a2744', borderRadius: '10px', padding: '1.25rem', color: '#fff' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#F5E642', marginBottom: '1rem' }}>{rec.headline}</div>
              {rec.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.6rem', padding: '0.6rem', backgroundColor: '#0A1628', borderRadius: '8px' }}>
                  <div style={{ minWidth: '130px', fontWeight: 600, color: '#aaa', fontSize: '0.85rem' }}>{item.contingency}</div>
                  <div style={{ minWidth: '160px', fontWeight: 700, color: item.action.includes('KEEP') ? '#4caf50' : item.action.includes('WAIVE') ? '#ff7043' : '#F5E642', fontSize: '0.9rem' }}>{item.action}</div>
                  <div style={{ fontSize: '0.85rem', color: '#ccc' }}>{item.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
