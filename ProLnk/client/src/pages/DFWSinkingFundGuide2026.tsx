import { useState } from 'react';

export default function DFWSinkingFundGuide2026() {
  const [hvacAge, setHvacAge] = useState(8);
  const [roofAge, setRoofAge] = useState(12);
  const [waterHeaterAge, setWaterHeaterAge] = useState(6);
  const [hasFoundationRisk, setHasFoundationRisk] = useState(false);

  const hvacMonthly = hvacAge >= 10 ? 50 : 20;
  const roofMonthly = roofAge >= 15 ? 75 : roofAge >= 10 ? 40 : 15;
  const waterMonthly = waterHeaterAge >= 8 ? 20 : 15;
  const foundMonthly = hasFoundationRisk ? 30 : 10;
  const total = hvacMonthly + roofMonthly + waterMonthly + foundMonthly;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK FINANCIAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏦 DFW Home Sinking Fund Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Build dedicated repair funds before the breakdown happens</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '❄️', label: 'HVAC Sinking Fund', tip: '$50/mo if unit is 10+ yrs', why: 'DFW units avg 12–15 yr lifespan' },
            { icon: '🏠', label: 'Roof Sinking Fund', tip: '$75/mo if roof is 15+ yrs', why: 'Hail + UV degradation in Texas' },
            { icon: '🚿', label: 'Water Heater Fund', tip: '$15/mo standard', why: 'Avg lifespan 8–12 years' },
            { icon: '🏗️', label: 'Foundation Fund', tip: '$30/mo for clay soil risk', why: 'DFW clay expands in summer' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'rgba(245,230,66,0.07)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: '20px 18px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{item.tip}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.why}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Monthly Sinking Fund Calculator</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { label: '❄️ HVAC Age (years)', val: hvacAge, set: setHvacAge, max: 20 },
              { label: '🏠 Roof Age (years)', val: roofAge, set: setRoofAge, max: 30 },
              { label: '🚿 Water Heater Age (years)', val: waterHeaterAge, set: setWaterHeaterAge, max: 15 },
            ].map((item) => (
              <label key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 14, color: '#94a3b8′ }}>{item.label}: <strong style={{ color: '#fff' }}>{item.val}</strong></span>
                <input type="range" min={0} max={item.max} value={item.val} onChange={e => item.set(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
              </label>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasFoundationRisk} onChange={e => setHasFoundationRisk(e.target.checked)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
              <span style={{ fontSize: 15 }}>🏗️ Known Foundation Risk / Clay Soil Area</span>
            </label>
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              { label: 'HVAC', val: hvacMonthly },
              { label: 'Roof', val: roofMonthly },
              { label: 'Water Heater', val: waterMonthly },
              { label: 'Foundation', val: foundMonthly },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#94a3b8′ }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: '#F5E642′ }}>${item.val}/mo</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, background: '#F5E642', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>TOTAL MONTHLY SINKING FUND</div>
            <div style={{ color: '#0A1628', fontSize: 42, fontWeight: 900 }}>${total}/mo</div>
            <div style={{ color: '#1a2d4e', fontSize: 13, marginTop: 4 }}>Open a dedicated HYSA for each system</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 Pro Tip: Use ProLnk Vault</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Track system ages and service dates in your ProLnk Home Health Vault — automatic alerts when sinking fund adjustments are recommended based on system lifecycle data.
          </p>
        </div>
      </div>
    </div>
  );
}