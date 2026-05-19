import { useState } from 'react';

export default function DFWAtticInsulationGuide2026() {
  const [currentR, setCurrentR] = useState(19);
  const [sqft, setSqft] = useState(1800);
  const [result, setResult] = useState('');

  const calcROI = () => {
    const deficit = Math.max(0, 38 - currentR);
    const savingsPct = deficit * 1.8;
    const annualSavings = Math.round((sqft * 0.12) * (savingsPct / 100));
    const upgradeCost = Math.round(sqft * 0.9);
    const payback = annualSavings > 0 ? (upgradeCost / annualSavings).toFixed(1) : 'N/A';
    if (currentR >= 38) {
      setResult(`✅ Your R-${currentR} insulation meets DFW minimum (R-38). Consider radiant barrier upgrade for additional 10-15% cooling savings.`);
    } else {
      setResult(`📈 Upgrading from R-${currentR} to R-38: Est. annual savings $${annualSavings}. Upgrade cost ~$${upgradeCost.toLocaleString()}. Payback: ${payback} years. Qualifies for 30% federal tax credit (up to $1,200/year).`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Attic Insulation Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Most DFW homes are under-insulated — here's the upgrade ROI calculator</p>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 18 }}>☀️ The DFW Insulation Crisis</div>
          <div style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7 }}>
            Energy.gov recommends <strong style={{ color: '#F5E642′ }}>R-38 to R-60</strong> for DFW (Climate Zone 3). The average DFW home built before 2005 has R-11 to R-19. That gap costs homeowners <strong style={{ color: '#F5E642' }}>$500-900/year</strong> in excess cooling costs.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🧱', title: 'Blown-In Fiberglass', body: 'Most cost-effective for existing homes. $0.75-1.25/sq ft installed. Settles 15-20% over time — install to R-44 to achieve long-term R-38 performance.' },
            { icon: '💨', title: 'Spray Foam', body: 'Closed-cell spray foam: R-6.5/inch. Best for sealing air leaks simultaneously. Cost: $1.50-3.00/sq ft. Ideal for homes with severe air infiltration.' },
            { icon: '☀️', title: 'Radiant Barrier', body: 'Aluminum foil stapled under roof deck blocks 95% of radiant heat. Reduces attic temp 20-30°F. Costs $0.10-0.25/sq ft. ROI in 3-5 years in DFW.' },
            { icon: '💰', title: 'Tax Credits 2026', body: '30% federal tax credit up to $1,200/year for insulation upgrades. DFW Oncor utility rebates: $0.10/sq ft additional. Stack both for maximum savings.' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📊 Upgrade ROI Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Current insulation level: <strong style={{ color: '#F5E642' }}>R-{currentR}</strong></label>
            <input type="range" min={0} max={50} value={currentR} onChange={(e) => setCurrentR(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Attic sq ft: <strong style={{ color: '#F5E642' }}>{sqft.toLocaleString()}</strong></label>
            <input type="range" min={500} max={4000} step={100} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <button onClick={calcROI} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Calculate My ROI
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 ProLnk Tip</div>
          <div style={{ color: '#cbd5e1', fontSize: 14 }}>ProLnk-vetted insulation pros include energy auditors who can verify your current R-value with thermal imaging before quoting. No guesswork, no upselling.</div>
        </div>
      </div>
    </div>
  );
}
