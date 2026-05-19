import { useState } from 'react';

const roiData: Record<string, { annualSavings: number; upfrontCost: number; damagePrevent: number; payback: string; detail: string }> = {
  'Smart Thermostat': {
    annualSavings: 620,
    upfrontCost: 300,
    damagePrevent: 0,
    payback: '6 months',
    detail: 'DFW AC runs 6+ months. Ecobee/Nest cut 30%+ from cooling bills and qualify for Oncor Smart Hours $75 rebate.',
  },
  'Leak Detection System': {
    annualSavings: 120,
    upfrontCost: 800,
    damagePrevent: 24000,
    payback: '7 years (vs. $24K avg water damage claim)',
    detail: 'DFW homes average 1 plumbing leak incident per 8 years. Whole-home shutoff valves prevent catastrophic losses.',
  },
  'Smart Irrigation': {
    annualSavings: 820,
    upfrontCost: 600,
    damagePrevent: 0,
    payback: '9 months',
    detail: 'DFW water rates + high evaporation = $1,200+/yr irrigation costs. Weather-based controllers cut that 60–70%.',
  },
  'Smart Lighting': {
    annualSavings: 180,
    upfrontCost: 400,
    damagePrevent: 0,
    payback: '2.2 years',
    detail: 'Motion sensing + schedules reduce phantom loads. DFW summer daylight > 14 hrs means big outdoor lighting savings.',
  },
  'Smart Garage Door': {
    annualSavings: 60,
    upfrontCost: 250,
    damagePrevent: 2000,
    payback: '4 years',
    detail: 'Prevents accidental open-door incidents. DFW garage temps hit 130°F in summer — auto-close protects stored items.',
  },
  'Smart Security System': {
    annualSavings: 220,
    upfrontCost: 700,
    damagePrevent: 5000,
    payback: '3.2 years',
    detail: 'Home insurance discounts of 5–15% in DFW area. Camera systems reduce break-in risk in rapidly growing suburban areas.',
  },
  'Smart Water Heater': {
    annualSavings: 310,
    upfrontCost: 1200,
    damagePrevent: 0,
    payback: '3.9 years',
    detail: 'Demand-response capable units earn Oncor rebates. Schedule off-peak heating during DFW grid stress periods.',
  },
};

export default function DFWSmartHomeROI2026() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | typeof roiData[string]>(null);

  function calculate() {
    if (selected && roiData[selected]) setResult(roiData[selected]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠 Smart Home ROI — DFW 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's extreme climate — 100°F+ summers, water scarcity, and storm risk — makes smart home upgrades among the highest-ROI investments in the country.
          This guide uses 2026 DFW-specific utility rates and damage statistics.
        </p>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>📊 DFW ROI Calculator</div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8′ }}>Select smart upgrade</label>
          <select
            value={selected}
            onChange={e => { setSelected(e.target.value); setResult(null); }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: '1rem', fontSize: '1rem' }}
          >
            <option value="">-- Choose upgrade --</option>
            {Object.keys(roiData).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Show DFW ROI
          </button>

          {result && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>${result.annualSavings}/yr</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Annual savings</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#60a5fa', fontSize: '1.5rem', fontWeight: 700 }}>${result.upfrontCost}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Upfront cost</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#4ade80', fontSize: '1.1rem', fontWeight: 700 }}>{result.payback}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Payback period</div>
                </div>
              </div>
              {result.damagePrevent > 0 && (
                <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 8, padding: '0.75rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>🛡️ Prevents avg. ${result.damagePrevent.toLocaleString()} in damage costs</span>
                </div>
              )}
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                {result.detail}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🌡️ Why DFW ROI Beats National Averages</div>
          {[
            ['☀️', 'AC runtime', '6+ months of heavy use means efficiency gains are massive vs. northern climates'],
            ['💧', 'Water rates', 'Dallas-Fort Worth water rates rose 18% in 2025; irrigation savings compound fast'],
            ['⛈️', 'Storm risk', 'DFW averages 50+ severe storm days/year — leak and surge protection pays off'],
            ['📈', 'Grid pricing', 'Oncor Smart Hours and ERCOT demand pricing reward smart load-shifting'],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div><div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{label}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
