import { useState } from 'react';

const DFW_GROUND_TEMP = 65;
const FEDERAL_TAX_CREDIT = 0.30;
const CONVENTIONAL_COP = 2.8;
const GEOTHERMAL_COP = 4.5;
const DFW_KWH_COST = 0.12;
const COOLING_HOURS = 1800;
const HEATING_HOURS = 600;
const DFW_CLAY_DRILLING_PREMIUM = 1.2;

const homeSizes = [
  { label: 'Small (1,000–1,500 sq ft)', sqft: 1250, tons: 2.5, btu: 30000 },
  { label: 'Medium (1,500–2,500 sq ft)', sqft: 2000, tons: 3.5, btu: 42000 },
  { label: 'Large (2,500–3,500 sq ft)', sqft: 3000, tons: 5, btu: 60000 },
  { label: 'Very Large (3,500–5,000 sq ft)', sqft: 4250, tons: 6.5, btu: 78000 },
];

const currentHVAC = [
  { label: 'Old central AC (10–15 yr, 10 SEER)', seer: 10 },
  { label: 'Standard central AC (13–14 SEER)', seer: 13 },
  { label: 'High efficiency (16–18 SEER)', seer: 17 },
  { label: 'Premium variable speed (20+ SEER)', seer: 21 },
];

function calcSavings(tons: number, currentSeer: number) {
  const btu = tons * 12000;
  const coolingKwh_conventional = (btu / currentSeer) * COOLING_HOURS / 1000;
  const coolingKwh_geo = (btu / (GEOTHERMAL_COP * 3.41)) * COOLING_HOURS / 1000;
  const heatingKwh_conventional = (btu / (CONVENTIONAL_COP * 3.41)) * HEATING_HOURS / 1000;
  const heatingKwh_geo = (btu / (GEOTHERMAL_COP * 3.41)) * HEATING_HOURS / 1000;
  const annualSavings = ((coolingKwh_conventional - coolingKwh_geo) + (heatingKwh_conventional - heatingKwh_geo)) * DFW_KWH_COST;
  const geoCost = (tons * 5000 * DFW_CLAY_DRILLING_PREMIUM) + (tons * 2000);
  const afterCredit = geoCost * (1 - FEDERAL_TAX_CREDIT);
  const payback = annualSavings > 0 ? afterCredit / annualSavings : 999;
  return { annualSavings, geoCost, afterCredit, payback, monthlySavings: annualSavings / 12 };
}

export default function DFWHVACGeothermalCalc() {
  const [homeIdx, setHomeIdx] = useState<number | null>(null);
  const [hvacIdx, setHvacIdx] = useState<number | null>(null);

  const home = homeIdx !== null ? homeSizes[homeIdx] : null;
  const hvac = hvacIdx !== null ? currentHVAC[hvacIdx] : null;
  const result = home && hvac ? calcSavings(home.tons, hvac.seer) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HVAC CALCULATOR</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Geothermal HVAC ROI Calculator for DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: '2rem' }}>DFW's 65°F ground temperature is geothermal's ideal operating range. Calculate your savings vs conventional HVAC.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { label: 'DFW Ground Temp', value: `${DFW_GROUND_TEMP}°F`, note: 'Ideal geothermal range', color: '#7ED321' },
            { label: 'Federal Tax Credit', value: '30%', note: 'IRA through 2032', color: '#F5E642' },
            { label: 'DFW Clay Soil', value: '+20%', note: 'Drilling cost premium', color: '#E87D4A' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111D33', border: '1.5px solid #1E2D45', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: s.color, fontSize: '1.5rem', fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.25rem' }}>{s.label}</div>
              <div style={{ color: '#8A9BB5', fontSize: '0.75rem', marginTop: '0.25rem' }}>{s.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Step 1: Select Your Home Size</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {homeSizes.map((h, i) => (
            <button key={i} onClick={() => setHomeIdx(i)}
              style={{ background: homeIdx === i ? '#162035' : '#111D33', border: `1.5px solid ${homeIdx === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.75rem', cursor: 'pointer', color: '#E8EAF0', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{h.label}</div>
              <div style={{ color: '#8A9BB5', fontSize: '0.8rem', marginTop: '0.2rem' }}>{h.tons} tons · {h.btu.toLocaleString()} BTU/hr</div>
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Step 2: Your Current HVAC</h2>
        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {currentHVAC.map((h, i) => (
            <button key={i} onClick={() => setHvacIdx(i)}
              style={{ background: hvacIdx === i ? '#162035' : '#111D33', border: `1.5px solid ${hvacIdx === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.75rem 1rem', cursor: 'pointer', color: '#E8EAF0', textAlign: 'left', fontWeight: 600 }}>
              {h.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#111D33', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Your DFW Geothermal ROI</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {[
                { label: 'System Cost (DFW)', value: `$${result.geoCost.toLocaleString()}`, note: 'Before tax credit (incl. clay drilling)' },
                { label: 'After 30% Tax Credit', value: `$${Math.round(result.afterCredit).toLocaleString()}`, note: 'Your actual net cost', color: '#7ED321' },
                { label: 'Annual Savings', value: `$${Math.round(result.annualSavings).toLocaleString()}`, note: 'vs your current HVAC', color: '#F5E642' },
                { label: 'Monthly Savings', value: `$${Math.round(result.monthlySavings)}`, note: 'Avg over full year', color: '#4A9EFF' },
              ].map((r, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem' }}>
                  <div style={{ color: r.color || '#E8EAF0', fontWeight: 800, fontSize: '1.4rem' }}>{r.value}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.2rem' }}>{r.label}</div>
                  <div style={{ color: '#8A9BB5', fontSize: '0.75rem' }}>{r.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: result.payback < 12 ? '#0D1F0D' : result.payback < 20 ? '#1A1A0D' : '#1F0D0D', borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'center' }}>
              <div style={{ color: result.payback < 12 ? '#7ED321' : result.payback < 20 ? '#F5E642' : '#E87D4A', fontWeight: 800, fontSize: '1.8rem' }}>{result.payback < 50 ? `${Math.round(result.payback)} years` : 'N/A'}</div>
              <div style={{ fontWeight: 700 }}>Payback Period</div>
              <div style={{ color: '#8A9BB5', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {result.payback < 10 ? 'Excellent ROI for DFW' : result.payback < 15 ? 'Good ROI — DFW climate helps' : result.payback < 20 ? 'Moderate — consider high-efficiency central instead' : 'Poor ROI — your current system is too efficient to beat'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
