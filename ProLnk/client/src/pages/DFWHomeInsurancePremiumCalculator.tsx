import { useState } from 'react';

const ROOF_MATERIALS = [
  { label: 'Asphalt (standard)', multiplier: 1.0 },
  { label: 'Impact-Resistant Asphalt', multiplier: 0.80 },
  { label: 'Metal Roof', multiplier: 0.72 },
  { label: 'Tile (clay/concrete)', multiplier: 0.88 },
  { label: 'Wood Shake', multiplier: 1.25 },
];

const DEDUCTIBLES = [1000, 2500, 5000, 10000];

export default function DFWHomeInsurancePremiumCalculator() {
  const [homeValue, setHomeValue] = useState(400000);
  const [yearBuilt, setYearBuilt] = useState(2005);
  const [roofAge, setRoofAge] = useState(8);
  const [roofMaterial, setRoofMaterial] = useState(0);
  const [deductible, setDeductible] = useState(2500);
  const [hasAlarm, setHasAlarm] = useState(false);
  const [hasPool, setHasPool] = useState(false);

  const baseRate = 0.0065;
  const ageFactor = yearBuilt < 1980 ? 1.3 : yearBuilt < 2000 ? 1.1 : 1.0;
  const roofFactor = roofAge < 5 ? 0.85 : roofAge < 10 ? 1.0 : roofAge < 15 ? 1.25 : 1.55;
  const materialFactor = ROOF_MATERIALS[roofMaterial].multiplier;
  const deductibleFactor = deductible === 1000 ? 1.15 : deductible === 2500 ? 1.0 : deductible === 5000 ? 0.88 : 0.78;
  const alarmDiscount = hasAlarm ? 0.92 : 1.0;
  const poolSurcharge = hasPool ? 1.08 : 1.0;

  const basePremium = homeValue * baseRate;
  const adjustedPremium = basePremium * ageFactor * roofFactor * materialFactor * deductibleFactor * alarmDiscount * poolSurcharge;
  const lowEstimate = adjustedPremium * 0.85;
  const highEstimate = adjustedPremium * 1.20;
  const monthlyEstimate = adjustedPremium / 12;

  const roofImpact = basePremium * 1.0 * materialFactor - basePremium * 1.0 * ROOF_MATERIALS[0].multiplier;
  const roofAgeImpact = (roofFactor - 1.0) * basePremium * materialFactor;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>🛡️ DFW Home Insurance Estimator</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>DFW-specific: roof age is the #1 premium driver in hail country</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>Home Replacement Value: {fmt(homeValue)}</span>
            <input type="range" min={150000} max={2000000} step={10000} value={homeValue}
              onChange={e => setHomeValue(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#F5E642′ }} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <label style={{ display: 'block' }}>
              <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 14 }}>Year Built: {yearBuilt}</span>
              <input type="range" min={1950} max={2024} step={1} value={yearBuilt}
                onChange={e => setYearBuilt(Number(e.target.value))}
                style={{ width: '100%', marginTop: 6, accentColor: '#F5E642′ }} />
            </label>
            <label style={{ display: 'block' }}>
              <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 14 }}>🏠 Roof Age: {roofAge} yrs {roofAge >= 15 ? '⚠️' : '✅'}</span>
              <input type="range" min={0} max={25} step={1} value={roofAge}
                onChange={e => setRoofAge(Number(e.target.value))}
                style={{ width: '100%', marginTop: 6, accentColor: roofAge >= 15 ? '#f87171′ : '#F5E642' }} />
            </label>
          </div>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>Roof Material</span>
            <select value={roofMaterial} onChange={e => setRoofMaterial(Number(e.target.value))}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#1e293b', color: '#e2e8f0′ }}>
              {ROOF_MATERIALS.map((m, i) => <option key={i} value={i}>{m.label}</option>)}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>Wind/Hail Deductible</span>
            <select value={deductible} onChange={e => setDeductible(Number(e.target.value))}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#1e293b', color: '#e2e8f0′ }}>
              {DEDUCTIBLES.map(d => <option key={d} value={d}>{fmt(d)} deductible</option>)}
            </select>
          </label>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[['🔒 Security Alarm System (-8%)', hasAlarm, setHasAlarm],
              ['🏊 Swimming Pool (+8% liability)', hasPool, setHasPool]].map(([label, val, set]: any) => (
              <label key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#e2e8f0', fontSize: 14 }}>
                <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 12, padding: 24, border: '1px solid rgba(245,230,66,0.3)', marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated Annual Premium Range</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>{fmt(lowEstimate)} – {fmt(highEstimate)}</div>
          <div style={{ fontSize: 16, color: '#94a3b8', marginTop: 8 }}>≈ {fmt(monthlyEstimate)}/month in escrow</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginTop: 0 }}>🏠 DFW Roof Intelligence</h2>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Roof age impact on your premium: <strong style={{ color: roofAgeImpact > 0 ? '#f87171′ : '#34d399' }}>{roofAgeImpact > 0 ? '+' : ''}{fmt(roofAgeImpact)}/yr</strong></p>
          {roofMaterial > 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>Impact-resistant material saves: <strong style={{ color: '#34d399′ }}>{fmt(Math.abs(roofImpact))}/yr</strong></p>}
          <p style={{ color: '#94a3b8', fontSize: 14 }}>⚡ DFW sees more hail events than any other major metro. Roofs 15+ years old often get non-renewed.</p>
          <p style={{ color: '#64748b', fontSize: 12, marginBottom: 0 }}>* Estimates only. Actual quotes vary by carrier, credit score, claims history. Get 3+ quotes.</p>
        </div>
      </div>
    </div>
  );
}
