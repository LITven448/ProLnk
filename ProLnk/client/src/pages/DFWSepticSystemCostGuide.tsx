import { useState } from 'react';

const propSizes = ['< 0.5 acre', '0.5–1 acre', '1–3 acres', '3–5 acres', '5+ acres'];
const soilTypes = ['Sandy/loamy (good drainage)', 'Clay-heavy (poor drainage)', 'Caliche/rocky (very poor drainage)'];
const householdSizes = ['1–2 people', '3–4 people', '5–6 people', '7+ people'];
const counties = ['Collin County', 'Denton County', 'Parker County', 'Kaufman County', 'Ellis County'];

function getRecommendation(prop: string, soil: string, household: string, county: string) {
  const isLargeHousehold = household === '7+ people' || household === '5–6 people';
  const isPoorSoil = soil !== 'Sandy/loamy (good drainage)';
  const isSmallLot = prop === '< 0.5 acre';

  let system = 'Conventional Septic System';
  let installLow = 8000, installHigh = 14000;
  let note = '';

  if (isPoorSoil || isSmallLot) {
    system = 'Aerobic Treatment Unit (ATU)';
    installLow = 12000; installHigh = 22000;
    note = 'Aerobic systems required by many TX OSSF rules when soil perc fails or lot size is limited. Requires annual maintenance contract.';
  } else if (isLargeHousehold) {
    system = 'Conventional with larger tank';
    installLow = 10000; installHigh = 18000;
    note = 'Larger household requires minimum 1,500 gallon tank. Drain field sizing increases proportionally.';
  } else {
    note = 'Conventional system works well with good soil drainage. Standard 1,000–1,250 gallon tank typical.';
  }

  const countyNote: Record<string, string> = {
    'Collin County': 'OSSF permit required. Collin County Environmental Health is responsive — expect 2–4 week permit timeline.',
    'Denton County': 'Aerobic systems common in newer subdivisions outside city limits. County requires annual ATU maintenance contract.',
    'Parker County': 'Many properties on septic. Caliche soil issues in western areas drive ATU requirement. OSSF office in Weatherford.',
    'Kaufman County': 'Rural properties east of Dallas frequently on septic. Good perc tests in sandy areas but clay pockets exist.',
    'Ellis County': 'Mix of conventional and aerobic. OSSF permit from Ellis County Environmental Health. Perc test required before permit.',
  };

  return {
    system,
    installLow,
    installHigh,
    pumpFreq: system.includes('Aerobic') ? '1–2 years' : '3–5 years',
    maintenanceLow: system.includes('Aerobic') ? 400 : 150,
    maintenanceHigh: system.includes('Aerobic') ? 800 : 350,
    note,
    countyNote: countyNote[county] || '',
  };
}

export default function DFWSepticSystemCostGuide() {
  const [prop, setProp] = useState(propSizes[0]);
  const [soil, setSoil] = useState(soilTypes[0]);
  const [household, setHousehold] = useState(householdSizes[0]);
  const [county, setCounty] = useState(counties[0]);
  const [result, setResult] = useState<null | ReturnType<typeof getRecommendation>>(null);

  function estimate() { setResult(getRecommendation(prop, soil, household, county)); }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 60%,#122040)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>DFW Septic System Cost Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Conventional vs aerobic systems, OSSF permitting, installation costs, and maintenance budgets for outer DFW counties.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16, marginBottom: 28 }}>
          {[['⚙️','Conventional','Gravity-fed to drain field. Works best with good soil drainage. $8,000–14,000 installed.'],['🔄','Aerobic (ATU)','Treats waste before distribution. Required in many TX counties with poor soil. $12,000–22,000.'],['📋','OSSF Permit','On-Site Sewage Facility permit required in Texas. County environmental health office issues permit.'],['💧','Pumping Cycle','Conventional: every 3–5 years ($300–500). Aerobic: every 1–2 years + annual contract ($400–800/yr).']].map(([ic,t,d])=>(
            <div key={t} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{ic}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>{t}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚠️ Signs of Septic Failure — Act Fast</h2>
          {[['Wet spots / green patches over drain field','Drain field saturation — stop all non-essential water use immediately. $3,000–12,000 repair.'],['Sewage odor inside or outside','Blocked vent pipe or failing system. Call licensed plumber or OSSF inspector same day.'],['Slow drains in entire house','Not a clog — may be full tank or failing field. Pump first, then inspect.'],['Sewage backup into tubs/toilets','Emergency. Pumping + inspection. Do not use water until resolved.']].map(([h,d])=>(
            <div key={h} style={{ borderLeft: '3px solid #ef4444', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{h}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#0f1f3d,#122040)', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 System Recommender & Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Property Size</label>
              <select value={prop} onChange={e=>setProp(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {propSizes.map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Soil Type</label>
              <select value={soil} onChange={e=>setSoil(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {soilTypes.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Household Size</label>
              <select value={household} onChange={e=>setHousehold(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {householdSizes.map(h=><option key={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>County</label>
              <select value={county} onChange={e=>setCounty(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {counties.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={estimate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Recommended System</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{result.system}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, textAlign: 'center', marginBottom: 14 }}>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Install Cost</div><div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>${result.installLow.toLocaleString()}–${result.installHigh.toLocaleString()}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Pump Frequency</div><div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{result.pumpFreq}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Annual Maintenance</div><div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>${result.maintenanceLow}–${result.maintenanceHigh}</div></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 12, borderTop: '1px solid #1e3a5f', paddingTop: 10, marginBottom: 8 }}>{result.note}</div>
              <div style={{ color: '#F5E642', fontSize: 12, borderTop: '1px solid #1e3a5f', paddingTop: 10 }}>📍 {result.countyNote}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
