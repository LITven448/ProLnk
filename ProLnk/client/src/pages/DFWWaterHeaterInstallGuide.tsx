import { useState } from 'react';

type HeaterType = 'tank-gas' | 'tank-electric' | 'tankless-gas' | 'tankless-electric' | 'heat-pump';

const HEATER_DATA: Record<HeaterType, { name: string; lifespan: string; monthlyCost: string; install: string; rebate: string; pros: string[]; cons: string[]; icon: string }> = {
  'tank-gas': { name: 'Gas Tank Water Heater', lifespan: '8–10 yrs (DFW hard water)', monthlyCost: '$18–28', install: '$900–1,600', rebate: 'None typically', icon: '🔥', pros: ['Lowest upfront cost', 'Works during power outage', 'Fast recovery rate — ideal for large families', 'Widely serviceable in DFW'], cons: ['DFW hard water cuts lifespan by 20%', 'Standby heat loss wastes energy', 'Requires gas line and venting', 'Takes floor space'] },
  'tank-electric': { name: 'Electric Tank Water Heater', lifespan: '10–12 yrs', monthlyCost: '$35–55', install: '$700–1,200', rebate: 'None typically', icon: '⚡', pros: ['Cheapest to install', 'No gas line needed', 'Safe — no combustion risk'], cons: ['Highest monthly operating cost', 'Slow recovery in large families', 'DFW electricity rates make this expensive long-term'] },
  'tankless-gas': { name: 'Gas Tankless (On-Demand)', lifespan: '20+ yrs', monthlyCost: '$12–20', install: '$2,200–4,000', rebate: '$50–200 (Atmos/CenterPoint)', icon: '♾️', pros: ['Endless hot water', 'Lasts 20+ years — beats DFW hard water with maintenance', '30–40% more efficient than tank', 'Space-saving wall mount', 'Qualifies for 30% federal tax credit (energy efficient models)'], cons: ['High upfront cost', 'Requires larger gas line (3/4")', 'Annual descaling needed in DFW (hard water)'] },
  'tankless-electric': { name: 'Electric Tankless', lifespan: '15–20 yrs', monthlyCost: '$28–45', install: '$1,500–2,800', rebate: 'Oncor: up to $100', icon: '⚡♾️', pros: ['Space-saving', 'No gas line needed', 'Endless hot water'], cons: ['DFW electricity rates make monthly costs high', 'Requires 200A electrical panel', 'May need panel upgrade (+$1,500)'] },
  'heat-pump': { name: 'Heat Pump Water Heater', lifespan: '12–15 yrs', monthlyCost: '$8–15', install: '$1,800–3,200', rebate: 'Oncor: up to $300 | Federal: 30% tax credit', icon: '🌡️', pros: ['Lowest monthly operating cost', 'Oncor rebate available', '30% federal tax credit', 'DFW climate ideal — works best in warm air'], cons: ['Needs 750+ sq ft of unconditioned space (garage, attic)', 'Slower recovery than gas tank', 'Makes some noise', 'Takes heat from room — may increase A/C load slightly'] },
};

function getSizeRecommendation(people: number, showers: string) {
  const base = people <= 2 ? 40 : people <= 4 ? 50 : 80;
  const demandAdj = showers === 'long' ? 10 : 0;
  return { tankGal: base + demandAdj, tanklessGPM: people <= 2 ? '6' : people <= 4 ? '8' : '10+' };
}

function getRecommendedType(people: number, showers: string, budget: string): HeaterType {
  if (budget === 'budget') return 'tank-gas';
  if (budget === 'long-term' && people >= 3) return 'tankless-gas';
  if (budget === 'eco') return 'heat-pump';
  if (showers === 'long' && people >= 3) return 'tankless-gas';
  return 'tank-gas';
}

export default function DFWWaterHeaterInstallGuide() {
  const [people, setPeople] = useState(3);
  const [showers, setShowers] = useState('normal');
  const [budget, setBudget] = useState('balanced');
  const [showResult, setShowResult] = useState(false);

  const size = getSizeRecommendation(people, showers);
  const recType = getRecommendedType(people, showers, budget);
  const recData = HEATER_DATA[recType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🚿 DFW WATER HEATER GUIDE</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>Water Heater Installation Guide<br /><span style={{ color: '#F5E642' }}>for DFW Homeowners</span></h1>
          <p style={{ fontSize: 16, color: '#8BA3C7', maxWidth: 620, margin: 0 }}>DFW's hard water shortens water heater life by 20–30% vs the national average. Choosing the right type — and maintaining it — makes the difference between 8 years and 20 years of service.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>⏰ Why DFW Water Heaters Die Early</h2>
          <p style={{ color: '#C0D0E8', lineHeight: 1.7, marginBottom: 16 }}>The national average water heater lifespan is 12 years. In DFW, it's 8–10 years for tank models because of our 14–18 GPG water hardness. Calcium and magnesium carbonate deposit on the heating element and tank floor, reducing efficiency and eventually causing failure. A 2-inch sediment layer forces the heater to work 25% harder.</p>
          <div style={{ background: '#112240', borderRadius: 10, border: '1px solid #1E3A5F', padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>Annual Maintenance That Extends Life 3–5 Years</div>
            {['Flush tank annually to remove sediment (DIY — 30 min)', 'Replace anode rod every 3–4 years (DFW hard water accelerates depletion)', 'Install whole-home water softener for maximum protection', 'Set temperature to 120°F — prevents scale acceleration', 'Inspect pressure relief valve annually'].map((item, i) => (
              <div key={i} style={{ color: '#C0D0E8', fontSize: 14, marginBottom: 6 }}>✓ {item}</div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>📋 DFW Permit Requirements</h2>
          <div style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20, marginBottom: 14 }}>
            <p style={{ color: '#C0D0E8', lineHeight: 1.7, margin: '0 0 12px' }}>All DFW cities require a permit for water heater replacement. Unlicensed installation voids your homeowner's insurance for water damage claims. Inspections are mandatory in: Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Garland, Irving, and all surrounding municipalities.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Permit fee', '$40–120 depending on city'], ['Inspection required', 'Yes — within 30 days'], ['Licensed plumber required', 'Yes (TSBPE licensed)'], ['Permit pulls inspection', 'Plumber schedules it']].map(([k, v]) => (
                <div key={k} style={{ fontSize: 13 }}><span style={{ color: '#8BA3C7' }}>{k}: </span><span style={{ color: '#E8EDF5' }}>{v}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>💰 Cost by Type + Oncor Rebates</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#F5E642', color: '#0A1628' }}>
                  {['Type', 'Install Cost', 'Monthly Cost', 'DFW Lifespan', 'Rebates Available'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 800 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(Object.entries(HEATER_DATA) as [HeaterType, typeof HEATER_DATA[HeaterType]][]).map(([key, d], i) => (
                  <tr key={key} style={{ background: i % 2 === 0 ? '#0E1E35' : '#112240' }}>
                    <td style={{ padding: '10px 12px', color: '#F5E642', borderBottom: '1px solid #1E3A5F', fontWeight: 700 }}>{d.icon} {d.name}</td>
                    <td style={{ padding: '10px 12px', color: '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{d.install}</td>
                    <td style={{ padding: '10px 12px', color: '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{d.monthlyCost}</td>
                    <td style={{ padding: '10px 12px', color: '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{d.lifespan}</td>
                    <td style={{ padding: '10px 12px', color: '#4ECDC4', borderBottom: '1px solid #1E3A5F', fontSize: 12 }}>{d.rebate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 40, background: '#112240', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🧮 Water Heater Finder</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>HOUSEHOLD SIZE</label>
              <select value={people} onChange={e => { setPeople(parseInt(e.target.value)); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>SHOWER PREFERENCE</label>
              <select value={showers} onChange={e => { setShowers(e.target.value); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="normal">Normal (5–10 min)</option>
                <option value="long">Long showers (15+ min)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>BUDGET PRIORITY</label>
              <select value={budget} onChange={e => { setBudget(e.target.value); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="budget">Lowest upfront cost</option>
                <option value="balanced">Balanced (upfront + monthly)</option>
                <option value="long-term">Lowest lifetime cost</option>
                <option value="eco">Eco-friendly + rebates</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%', marginBottom: 20 }}>
            Get My Recommendation
          </button>
          {showResult && (
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642' }}>
                <div style={{ fontSize: 13, color: '#8BA3C7', marginBottom: 4 }}>RECOMMENDED FOR YOUR HOME</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#F5E642', marginBottom: 6 }}>{recData.icon} {recData.name}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
                  {[['Install Cost', recData.install], ['Monthly', recData.monthlyCost], ['Lifespan', recData.lifespan]].map(([label, val]) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#8BA3C7', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontWeight: 700, color: '#E8EDF5' }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 10 }}>
                  {recData.pros.map((p, i) => <div key={i} style={{ color: '#4ECDC4', fontSize: 13, marginBottom: 4 }}>✓ {p}</div>)}
                </div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>Tank size: {size.tankGal} gal | Tankless: {size.tanklessGPM} GPM</div>
                {recData.rebate !== 'None typically' && <div style={{ marginTop: 8, background: '#1E3A5F', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#4ECDC4' }}>💰 Rebates available: {recData.rebate}</div>}
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#0A1628', marginBottom: 8 }}>Get a Licensed DFW Water Heater Quote</div>
          <p style={{ color: '#112240', margin: '0 0 16px' }}>Permitted installation by TSBPE-licensed plumbers. All major brands. Same-day quotes available.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '14px 32px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Request Free Quote →</div>
        </div>
      </div>
    </div>
  );
}
