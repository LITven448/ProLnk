import { useState } from 'react';

const chargerLevels = [
  { level: 'Level 1 (120V)', speed: '3–5 miles/hr', equipment: 'Standard outlet — already installed', install: '$0', bestFor: 'PHEVs or driving under 30 miles/day', note: 'Slow but free if you already have outlet near garage' },
  { level: 'Level 2 (240V / 48A)', speed: '25–35 miles/hr', equipment: 'EVSE charger + 240V circuit', install: '$800–$2,000', bestFor: 'Most EV owners — full overnight charge', note: 'Most popular for DFW EV owners; covers 95% of use cases' },
  { level: 'DC Fast Charge (Level 3)', speed: '150–350+ miles/hr', equipment: 'Commercial unit', install: '$20,000–$100,000', bestFor: 'Commercial/fleet only', note: 'Not practical for residential; use public stations for road trips' },
];

const oncorRates = [
  { plan: 'Time-of-Use (TOU)', offPeak: '7¢/kWh', onPeak: '28¢/kWh', offPeakHours: '9pm–6am', savings: 'Up to 70% vs flat rate if charging overnight' },
  { plan: 'Flat Rate (no TOU)', offPeak: '12–15¢/kWh', onPeak: '12–15¢/kWh', offPeakHours: 'N/A', savings: 'Predictable but higher overnight cost' },
];

const futureProofSteps = [
  { icon: '📐', title: 'Install Conduit Now ($300–$500)', desc: 'Run empty conduit from your panel to the garage. If you add a charger later, electrician just pulls wire — saves $1,500+ in future trenching costs.' },
  { icon: '⚡', title: 'Upgrade Panel to 200A ($2,000–$4,000)', desc: 'Older DFW homes with 100A panels will need an upgrade before adding a 48A EV circuit. Do it once, future-proof everything.' },
  { icon: '🔌', title: 'Add a NEMA 14-50 Outlet ($400–$800)', desc: 'Even without an EV, installing a 50A/240V outlet in your garage lets any EV owner plug in immediately — adds value to your home.' },
  { icon: '☀️', title: 'Solar + EV = Fuel Cost Near Zero', desc: 'A 10 kW solar system in DFW produces ~14,000 kWh/year. An average EV needs ~4,000 kWh/year. Solar covers your car AND part of your home.' },
];

export default function DFWElectricVehicleHomeGuide() {
  const [hasEV, setHasEV] = useState('yes');
  const [hasSolar, setHasSolar] = useState('no');
  const [dailyMiles, setDailyMiles] = useState('');
  const [result, setResult] = useState<{ setup: string; monthlyCost: number; recommendation: string } | null>(null);

  function calculate() {
    const miles = parseFloat(dailyMiles) || 30;
    const kwhPerMile = 0.3;
    const dailyKwh = miles * kwhPerMile;
    const monthlyKwh = dailyKwh * 30;
    const rate = hasSolar === 'yes' ? 0.03 : 0.07;
    const monthlyCost = Math.round(monthlyKwh * rate);
    let setup = 'Level 2 EVSE (48A) — overnight charging covers all daily driving';
    if (miles < 30 && hasEV === 'yes') setup = 'Level 1 (120V outlet) may work for your mileage, but Level 2 recommended for flexibility';
    let recommendation = `With ${hasSolar === 'yes' ? 'solar covering most charging costs' : 'off-peak TOU rates (9pm–6am at ~7¢/kWh)'}, your estimated monthly EV charging cost is just $${monthlyCost}.`;
    if (hasSolar === 'yes') recommendation += ' Your solar panels are effectively fueling your car for near-zero cost.';
    setResult({ setup, monthlyCost, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#0d1f3a 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW EV-Ready Home Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>DFW is a top-5 EV market. Future-proof your home for electric vehicles — whether you drive one today or not.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg,#1a2d1a,#0f1f0f)', border: '1px solid #2d5a2d', borderRadius: 16, padding: 24, margin: '40px 0 0′ }}>
          <h2 style={{ color: '#4ADE80', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>⚡ Install Conduit Now: $500 Today vs $2,000+ Later</h2>
          <p style={{ color: '#86EFAC', margin: 0 }}>The single most cost-effective EV home upgrade for non-EV owners: have an electrician run empty conduit from your electrical panel to the garage. When you add an EV charger, the wire pull is 30 minutes instead of a full excavation job.</p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Home Charging Levels</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {chargerLevels.map(c => (
            <div key={c.level} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: `1px solid ${c.level.includes('Level 2') ? '#F5E642' : '#2A3F5C'}` }}>
              {c.level.includes('Level 2') && <div style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 8 }}>RECOMMENDED FOR DFW</div>}
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 4 }}>{c.level}</div>
              <div style={{ color: '#60A5FA', fontSize: 14, marginBottom: 8 }}>🚗 {c.speed} added range</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Equipment: {c.equipment}</div>
              <div style={{ color: '#4ADE80', fontSize: 13, marginBottom: 8 }}>Install: {c.install}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Best for: {c.bestFor}</div>
              <div style={{ color: '#64748B', fontSize: 12, fontStyle: 'italic' }}>{c.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Oncor Time-of-Use Rates for EV Charging</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {oncorRates.map(r => (
            <div key={r.plan} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 8 }}>{r.plan}</div>
              <div style={{ color: '#4ADE80', fontSize: 14, marginBottom: 4 }}>Off-peak: {r.offPeak} {r.offPeakHours !== 'N/A' ? `(${r.offPeakHours})` : ''}</div>
              <div style={{ color: '#F87171', fontSize: 14, marginBottom: 8 }}>On-peak: {r.onPeak}</div>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>💰 {r.savings}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Future-Proof Your Home Now</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {futureProofSteps.map(s => (
            <div key={s.title} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <div style={{ fontWeight: 700, color: '#E8EDF5', margin: '8px 0 6px' }}>{s.title}</div>
              <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>EV Charging Cost Calculator</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20 }}>Estimate your monthly EV electricity cost based on your DFW driving habits.</p>
        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 28, border: '1px solid #2A3F5C', maxWidth: 520 }}>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Do you have an EV?</label>
          <select value={hasEV} onChange={e => setHasEV(e.target.value)}
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16 }}>
            <option value="yes">Yes, I have an EV</option>
            <option value="no">No — planning ahead</option>
          </select>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Do you have home solar?</label>
          <select value={hasSolar} onChange={e => setHasSolar(e.target.value)}
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16 }}>
            <option value="no">No solar</option>
            <option value="yes">Yes, I have solar</option>
          </select>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Average daily miles driven</label>
          <input type="number" value={dailyMiles} onChange={e => setDailyMiles(e.target.value)} placeholder="e.g. 35″
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Calculate My EV Charging Cost
          </button>
        </div>
        {result && (
          <div style={{ marginTop: 24 }}>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C', marginBottom: 16 }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Recommended Setup</div>
              <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 600 }}>{result.setup}</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Monthly Charging Cost</div>
              <div style={{ color: '#4ADE80', fontSize: 36, fontWeight: 800 }}>${result.monthlyCost}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 8 }}>{result.recommendation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
