import { useState } from 'react';

export default function DFWHomeownersInsuranceGuide2026() {
  const [homeValue, setHomeValue] = useState(385000);
  const [hasPool, setHasPool] = useState(false);
  const [hasOldRoof, setHasOldRoof] = useState(false);
  const [hasSecurity, setHasSecurity] = useState(false);

  const dwelling = homeValue;
  const personalProperty = Math.round(homeValue * 0.5);
  const liability = 100000;
  const ale = Math.round(homeValue * 0.2);
  const estPremium = Math.round(
    (homeValue / 1000) * 8.3 +
    (hasPool ? 200 : 0) +
    (hasOldRoof ? 400 : 0) -
    (hasSecurity ? 150 : 0)
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW HOME INSURANCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Homeowners Insurance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW avg premium: <strong style={{ color: '#F5E642′ }}>$3,200/yr</strong> — up 28% since 2023. Here’s what you need to know.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📋 HO-3 Policy Coverage Types</h2>
          {[
            { icon: '🏗️', label: 'Dwelling', desc: 'Structure of your home + attached structures' },
            { icon: '📦', label: 'Personal Property', desc: 'Furniture, clothes, electronics (50% of dwelling)' },
            { icon: '⚖️', label: 'Liability', desc: 'Injuries on your property — recommend $300K+' },
            { icon: '🏨', label: 'Additional Living Expense', desc: 'Hotel + meals if home uninhabitable' },
          ].map(c => (
            <div key={c.label} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Coverage Needs Assessment</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: '#94a3b8′ }}>Home Value: ${homeValue.toLocaleString()}</label>
            <input type="range" min={150000} max={800000} step={5000} value={homeValue}
              onChange={e => setHomeValue(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642', marginTop: 6 }} />
          </div>
          {[
            { label: 'Swimming pool / trampoline', val: hasPool, set: setHasPool },
            { label: 'Roof older than 15 years', val: hasOldRoof, set: setHasOldRoof },
            { label: 'Security / alarm system', val: hasSecurity, set: setHasSecurity },
          ].map(f => (
            <label key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={f.val} onChange={e => f.set(e.target.checked)} style={{ accentColor: '#F5E642′ }} />
              <span style={{ fontSize: 13 }}>{f.label}</span>
            </label>
          ))}
          <div style={{ background: '#1a2f55', borderRadius: 8, padding: 16, marginTop: 12 }}>
            {[
              { label: 'Dwelling Coverage', val: `$${dwelling.toLocaleString()}` },
              { label: 'Personal Property', val: `$${personalProperty.toLocaleString()}` },
              { label: 'Liability', val: `$${liability.toLocaleString()} (recommend $300K)` },
              { label: 'ALE', val: `$${ale.toLocaleString()}` },
              { label: 'Est. Annual Premium', val: `$${estPremium.toLocaleString()}/yr`, highlight: true },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#94a3b8′ }}>{r.label}</span>
                <span style={{ color: r.highlight ? '#F5E642′ : '#fff', fontWeight: r.highlight ? 700 : 400 }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 DFW Shopping Tips</h2>
          {['Get 3+ quotes — premiums vary 40%+ for same coverage','Ask specifically about wind/hail deductible (separate from main deductible)','Check AM Best rating — stick to A or better','Replacement cost vs. actual cash value: always choose replacement cost'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13 }}>
              <span>✅</span><span style={{ color: '#94a3b8′ }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
