import { useState } from 'react';

const contingencies = [
  {
    key: 'inspection',
    label: 'Inspection Contingency',
    emoji: '🔍',
    whatItMeans: 'Right to inspect the property and terminate or renegotiate if issues found during the option period (typically 7-10 days in DFW).',
    riskIfWaived: 'HIGH — especially in DFW',
    dfwWarning: 'NEVER waive inspection in DFW. Expansive clay soil causes foundation movement that can cost $8,000–$50,000+ to repair. Without inspection contingency, you own the problem.',
    whenWaivingMakesSense: 'Almost never in DFW. Exception: new construction with builder warranty and independent inspector already completed.',
    financialExposure: '$8,000 – $75,000 potential hidden repair costs',
    alternatives: ['Keep option period, shorten to 5 days', 'Pre-inspect before offer (with seller permission)', 'Waive re-negotiation right but keep termination right'],
    riskColor: '#DC2626',
  },
  {
    key: 'financing',
    label: 'Financing Contingency',
    emoji: '🏦',
    whatItMeans: 'Right to terminate if you cannot obtain a mortgage at stated terms. Protects your earnest money if financing falls through.',
    riskIfWaived: 'MODERATE — situational',
    dfwWarning: 'Waiving financing is more acceptable if you have a solid pre-approval from a DFW local lender (not an online lender). Sellers distrust online lenders. A local bank letter carries more weight.',
    whenWaivingMakesSense: 'When you have significant cash reserves, strong pre-approval, excellent credit (750+), and buying below appraised value.',
    financialExposure: 'Loss of earnest money (1-2% of purchase price) if financing fails',
    alternatives: ['Use local DFW lender for stronger pre-approval', 'Get pre-underwriting approval (not just pre-qualification)', 'Have bridge loan or cash backup ready'],
    riskColor: '#D97706',
  },
  {
    key: 'appraisal',
    label: 'Appraisal Contingency',
    emoji: '📊',
    whatItMeans: 'Right to renegotiate or terminate if the property appraises below the agreed purchase price.',
    riskIfWaived: 'MODERATE — market dependent',
    dfwWarning: 'In DFW\’s competitive submarkets (Frisco, Prosper, Allen), appraisals can come in low on bidding war situations. Waiving appraisal means you pay the difference in cash at closing.',
    whenWaivingMakesSense: 'When paying at or below market value, you have cash to cover a gap, or in new construction where builder controls comps.',
    financialExposure: 'Cash gap between offer price and appraised value — can be $10,000–$40,000 in competitive areas',
    alternatives: ['Include appraisal gap coverage clause (cover first $X above appraisal)', 'Limit waiver to specific dollar amount', 'Order pre-offer BPO to estimate value'],
    riskColor: '#D97706',
  },
  {
    key: 'sale',
    label: 'Sale of Current Home',
    emoji: '🏘',
    whatItMeans: 'Right to terminate if your existing home doesn\’t sell by a specified date. Common in move-up purchases.',
    riskIfWaived: 'HIGH — financial risk',
    dfwWarning: 'DFW sellers almost universally reject contingent offers in normal market conditions. If you must use a sale contingency, price your current home aggressively and set a tight close window.',
    whenWaivingMakesSense: 'When you have bridge financing, sufficient cash reserves, or can carry two mortgages temporarily.',
    financialExposure: 'Carrying two mortgages: $3,000–$7,000/month additional payment',
    alternatives: ['Sell current home first (most common DFW approach)', 'Get bridge loan to remove contingency', 'Request 48-72 hr kick-out clause (seller keeps shopping)'],
    riskColor: '#DC2626',
  },
];

export default function DFWWaiverOfContingencyGuide() {
  const [contingencyType, setContingencyType] = useState('');
  const [financialSituation, setFinancialSituation] = useState('');

  const selected = contingencies.find(c => c.key === contingencyType);

  const getRecommendation = () => {
    if (!contingencyType || !financialSituation) return null;
    if (contingencyType === 'inspection') return { action: 'DO NOT WAIVE', reason: 'Foundation risk in DFW makes inspection non-negotiable regardless of financial strength.', safe: false };
    if (contingencyType === 'sale') return { action: financialSituation === 'strong' ? 'CONSIDER WAIVING with bridge loan' : 'DO NOT WAIVE', reason: financialSituation === 'strong' ? 'With strong finances and bridge loan, waiving sale contingency makes your offer competitive.' : 'Carrying two mortgages without reserves is too risky.', safe: financialSituation === 'strong' };
    if (contingencyType === 'financing' && financialSituation === 'strong') return { action: 'LOW RISK to WAIVE', reason: 'With strong pre-approval and reserves, financing contingency waiver is manageable.', safe: true };
    if (contingencyType === 'appraisal' && financialSituation === 'strong') return { action: 'MODERATE RISK — use gap clause instead', reason: 'Offer appraisal gap coverage up to $20K rather than full waiver.', safe: true };
    return { action: 'DO NOT WAIVE', reason: 'Your financial situation suggests keeping this protection.', safe: false };
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>📜</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Waiver of Contingency Guide</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15 }}>What you\'re giving up — and the DFW-specific risks of each waiver</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {contingencies.map(c => (
            <div key={c.key} onClick={() => setContingencyType(c.key)} style={{ background: '#fff', borderRadius: 12, padding: 20, border: `2px solid ${contingencyType === c.key ? '#0A1628' : '#E2E8F0'}`, cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{c.emoji}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{c.label}</h3>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.riskColor }}>Risk if Waived: {c.riskIfWaived}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#64748B' }}>{c.whatItMeans}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: `2px solid ${selected.riskColor}`, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{selected.emoji}</span>
              <h3 style={{ margin: 0, fontSize: 18 }}>{selected.label}</h3>
            </div>
            <div style={{ background: '#FEE2E2', border: `1px solid ${selected.riskColor}`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <p style={{ margin: 0, fontWeight: 700, color: selected.riskColor, fontSize: 14 }}>⚠️ DFW Warning: {selected.dfwWarning}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>💸 Financial Exposure</p>
                <p style={{ fontSize: 14, color: '#DC2626', fontWeight: 600 }}>{selected.financialExposure}</p>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, marginTop: 16 }}>✅ When Waiving May Make Sense</p>
                <p style={{ fontSize: 13, color: '#64748B' }}>{selected.whenWaivingMakesSense}</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🔄 Alternatives to Full Waiver</p>
                {selected.alternatives.map((a, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9′ }}>• {a}</div>)}
              </div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Should YOU Waive?</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Contingency to Evaluate</label>
              <select value={contingencyType} onChange={e => setContingencyType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#F9FAFB' }}>
                <option value="">Select contingency...</option>
                {contingencies.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Financial Position</label>
              <select value={financialSituation} onChange={e => setFinancialSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#F9FAFB' }}>
                <option value="">Select position...</option>
                <option value="strong">Strong (6+ months reserves, 750+ credit)</option>
                <option value="moderate">Moderate (3-6 months reserves)</option>
                <option value="tight">Tight (using most of savings for down payment)</option>
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ background: rec.safe ? '#DCFCE7′ : '#FEE2E2', border: `2px solid ${rec.safe ? '#16A34A' : '#DC2626'}`, borderRadius: 10, padding: 16 }}>
              <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 16 }}>{rec.safe ? '🟡' : '🔴'} {rec.action}</p>
              <p style={{ margin: 0, fontSize: 14 }}>{rec.reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
