import { useState } from 'react';

const badRenovations = [
  { label: 'Full Kitchen Gut Remodel', risk: 'HIGH', reason: 'Over-improving for neighborhood kills ROI in mid-range DFW markets', threshold: 30000 },
  { label: 'Swimming Pool Installation', risk: 'HIGH', reason: 'DFW buyers desire pools but rarely pay full cost — maintenance concerns offset appeal', threshold: 50000 },
  { label: 'Garage Conversion to Living Space', risk: 'CRITICAL', reason: 'Major turn-off for DFW buyers who expect 2-car minimum — hard to reverse', threshold: 15000 },
  { label: 'Adding Bedroom Without Adding Bathroom', risk: 'HIGH', reason: 'Bedroom counts without matching baths reduces per-bedroom value in DFW', threshold: 20000 },
  { label: 'Wallpaper Installation', risk: 'MODERATE', reason: 'Taste-specific — removal cost gets passed back to sellers in DFW negotiations', threshold: 3000 },
  { label: 'Highly Customized Finishes', risk: 'HIGH', reason: 'Pool table rooms, themed bedrooms, bold colors narrow buyer pool significantly', threshold: 25000 },
];

const riskColors: Record<string, string> = { CRITICAL: '#ef4444', HIGH: '#f59e0b', MODERATE: '#eab308′ };
const riskBg: Record<string, string> = { CRITICAL: '#1c0a0a', HIGH: '#1c1205', MODERATE: '#1c1a05′ };

export default function DFWWhatNotToRenovate() {
  const [selectedRenovation, setSelectedRenovation] = useState('');
  const [cost, setCost] = useState('');
  const [neighborhoodPrice, setNeighborhoodPrice] = useState('');
  const [result, setResult] = useState<{ riskScore: number; riskLevel: string; recommendation: string; reason: string } | null>(null);

  function calculate() {
    const ren = badRenovations.find(r => r.label === selectedRenovation);
    const investCost = parseFloat(cost);
    const np = parseFloat(neighborhoodPrice);
    if (!ren || isNaN(investCost) || investCost <= 0) return;

    const baseScore = ren.risk === 'CRITICAL' ? 90 : ren.risk === 'HIGH' ? 70 : 45;
    const costFactor = Math.min(30, (investCost / ren.threshold) * 15);
    const priceFactor = !isNaN(np) && np > 0 && investCost / np > 0.08 ? 15 : 0;
    const riskScore = Math.min(100, Math.round(baseScore + costFactor + priceFactor));

    const riskLevel = riskScore >= 85 ? 'CRITICAL — Do Not Proceed' : riskScore >= 65 ? 'HIGH RISK — Reconsider' : 'MODERATE RISK — Proceed with Caution';
    const recommendation = ren.risk === 'CRITICAL'
      ? 'Stop immediately. This renovation will likely cost you more in lost sale price than it adds.'
      : ren.risk === 'HIGH'
      ? 'Consider a lighter-touch alternative. Consult a DFW listing agent before spending.'
      : 'Proceed cautiously. Keep spend minimal and use reversible, neutral choices.';

    setResult({ riskScore, riskLevel, recommendation, reason: ren.reason });
  }

  const riskScoreColor = (score: number) => score >= 85 ? '#ef4444′ : score >= 65 ? '#f59e0b' : '#eab308';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🚫 DFW Market Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          What NOT to Renovate Before Selling
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
          In DFW, the wrong renovation can cost you more than doing nothing. Know what to skip before you spend a dollar.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {badRenovations.map(r => (
            <div key={r.label} style={{ background: riskBg[r.risk] ?? '#111d33', border: `1px solid ${riskColors[r.risk] ?? '#1e3a5f'}`, borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{r.label}</div>
                <div style={{ color: riskColors[r.risk], fontWeight: 800, fontSize: 13, flexShrink: 0, marginLeft: 12 }}>
                  ⚠️ {r.risk}
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{r.reason}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>
            📊 Check Your Over-Improvement Risk
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>Planned Renovation</label>
            <select
              value={selectedRenovation}
              onChange={e => setSelectedRenovation(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
            >
              <option value="">Select a renovation...</option>
              {badRenovations.map(r => <option key={r.label}>{r.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>Planned Spend ($)</label>
              <input
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
                placeholder="e.g. 45000″
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>Neighborhood Avg Home Price ($)</label>
              <input
                type="number"
                value={neighborhoodPrice}
                onChange={e => setNeighborhoodPrice(e.target.value)}
                placeholder="e.g. 420000″
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          >
            Assess My Risk →
          </button>

          {result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: `1px solid ${riskScoreColor(result.riskScore)}` }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ color: riskScoreColor(result.riskScore), fontWeight: 900, fontSize: 48 }}>{result.riskScore}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Over-Improvement Risk Score (0–100)</div>
                <div style={{ color: riskScoreColor(result.riskScore), fontWeight: 700, fontSize: 16, marginTop: 8 }}>{result.riskLevel}</div>
              </div>
              <div style={{ background: '#111d33', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Recommendation</div>
                <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{result.recommendation}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>💡 {result.reason}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📍 DFW Neighborhood Ceiling</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            The biggest mistake DFW sellers make is renovating beyond the neighborhood ceiling. In a street of $350K homes, a $600K renovation can't be recouped — buyers comparison-shop the block, not just the house.
          </div>
        </div>
      </div>
    </div>
  );
}
