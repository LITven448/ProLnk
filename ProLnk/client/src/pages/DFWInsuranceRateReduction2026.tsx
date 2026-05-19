import { useState } from 'react';

export default function DFWInsuranceRateReduction2026() {
  const [basePremium, setBasePremium] = useState(3200);
  const [irRoof, setIrRoof] = useState(false);
  const [security, setSecurity] = useState(false);
  const [bundle, setBundle] = useState(false);
  const [deductible, setDeductible] = useState('standard');
  const [loyalty, setLoyalty] = useState(false);

  const discounts = [
    irRoof ? 0.25 : 0,
    security ? 0.075 : 0,
    bundle ? 0.10 : 0,
    deductible === 'high' ? 0.20 : deductible === 'very_high' ? 0.30 : 0,
    loyalty ? 0.05 : 0,
  ];
  const totalDiscount = Math.min(discounts.reduce((a, b) => a + b, 0), 0.55);
  const newPremium = Math.round(basePremium * (1 - totalDiscount));
  const savings = basePremium - newPremium;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>💰 DFW RATE REDUCTION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Home Insurance Rate Reduction Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW homeowners overpay by an avg <strong style={{ color: '#F5E642' }}>$780/yr</strong> due to missed discounts. Here's how to fix that.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Savings Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Current Annual Premium: ${basePremium.toLocaleString()}</label>
            <input type="range" min={1500} max={8000} step={100} value={basePremium}
              onChange={e => setBasePremium(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642', marginTop: 6 }} />
          </div>
          {[
            { label: '🏠 Impact-resistant (Class 4) roof (saves 20-30%)', val: irRoof, set: setIrRoof, saving: Math.round(basePremium * 0.25) },
            { label: '🔒 Security/alarm system (saves 5-10%)', val: security, set: setSecurity, saving: Math.round(basePremium * 0.075) },
            { label: '🚗 Bundle auto + home (saves 5-15%)', val: bundle, set: setBundle, saving: Math.round(basePremium * 0.10) },
            { label: '📅 5+ year loyalty discount (saves ~5%)', val: loyalty, set: setLoyalty, saving: Math.round(basePremium * 0.05) },
          ].map(f => (
            <label key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" checked={f.val} onChange={e => f.set(e.target.checked)} style={{ accentColor: '#F5E642' }} />
                <span style={{ fontSize: 13 }}>{f.label}</span>
              </div>
              {f.val && <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>-${f.saving.toLocaleString()}</span>}
            </label>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Deductible Level</label>
            <select value={deductible} onChange={e => setDeductible(e.target.value)}
              style={{ background: '#1a2f55', color: '#fff', border: '1px solid #2a3f65', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              <option value="standard">Standard ($1,000-2,500) — base rate</option>
              <option value="high">Higher ($5,000) — saves ~20%</option>
              <option value="very_high">High ($10,000+) — saves ~30%</option>
            </select>
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#94a3b8' }}>Current premium</span>
              <span>${basePremium.toLocaleString()}/yr</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#94a3b8' }}>Total discount</span>
              <span style={{ color: '#22c55e' }}>{Math.round(totalDiscount * 100)}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, paddingTop: 10, borderTop: '1px solid #2a3f65' }}>
              <span>New premium</span>
              <span style={{ color: '#F5E642' }}>${newPremium.toLocaleString()}/yr</span>
            </div>
            {savings > 0 && <div style={{ color: '#22c55e', fontSize: 14, marginTop: 8, textAlign: 'center' }}>You save ${savings.toLocaleString()}/yr 🎉</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
