import { useState } from 'react';

const DFW_ZONES = [
  { label: 'Downtown Dallas / Uptown', avgMiles: 5 },
  { label: 'Inner Loop (Oak Cliff, Lower Greenville)', avgMiles: 10 },
  { label: 'Mid-Suburbs (Plano, Irving, Garland)', avgMiles: 20 },
  { label: 'Outer Suburbs (Frisco, McKinney, Arlington)', avgMiles: 35 },
  { label: 'Exurbs (Rockwall, Forney, Mansfield)', avgMiles: 50 },
];

export default function DFWCommuteCostCalculator() {
  const [homeZone, setHomeZone] = useState(3);
  const [workZone, setWorkZone] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [mpg, setMpg] = useState(28);
  const [hourlyRate, setHourlyRate] = useState(60);
  const [gasPrice, setGasPrice] = useState(3.25);

  const homeMiles = DFW_ZONES[homeZone].avgMiles;
  const workMiles = DFW_ZONES[workZone].avgMiles;
  const roundTripMiles = Math.abs(homeMiles - workMiles) * 2;
  const monthlyMiles = roundTripMiles * daysPerWeek * 4.33;
  const monthlyFuelCost = (monthlyMiles / mpg) * gasPrice;
  const annualFuelCost = monthlyFuelCost * 12;

  const avgSpeedDFW = 35;
  const dailyCommuteHours = (roundTripMiles / avgSpeedDFW);
  const monthlyTimeCost = dailyCommuteHours * daysPerWeek * 4.33 * hourlyRate;
  const annualTimeCost = monthlyTimeCost * 12;

  const maintenanceCostPerMile = 0.08;
  const monthlyMaintenance = monthlyMiles * maintenanceCostPerMile;

  const totalMonthlyCost = monthlyFuelCost + monthlyTimeCost + monthlyMaintenance;
  const totalAnnualCost = totalMonthlyCost * 12;

  const nearHomeSavings = totalAnnualCost * 5;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>🚗 DFW Commute Cost Calculator</h1>
          <p style={{ color: '#555', marginTop: 8 }}>Discover the true cost of your DFW commute — time, fuel, and wear</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>🏠 Home Location</span>
            <select value={homeZone} onChange={e => setHomeZone(Number(e.target.value))}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }}>
              {DFW_ZONES.map((z, i) => <option key={i} value={i}>{z.label} (~{z.avgMiles} mi from core)</option>)}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: '#333′ }}>🏢 Work Location</span>
            <select value={workZone} onChange={e => setWorkZone(Number(e.target.value))}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }}>
              {DFW_ZONES.map((z, i) => <option key={i} value={i}>{z.label}</option>)}
            </select>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Days/Week in Office', daysPerWeek, setDaysPerWeek, 1, 7, 1, ''],
              ['Vehicle MPG', mpg, setMpg, 10, 60, 1, ''],
              ['Gas Price ($/gal)', gasPrice, setGasPrice, 2.5, 6, 0.05, ''],
              ['Your Hourly Rate ($)', hourlyRate, setHourlyRate, 15, 300, 5, '']].map(([label, val, set, min, max, step]: any) => (
              <label key={label as string} style={{ display: 'block' }}>
                <span style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>{label}: <strong>{val}</strong></span>
                <input type="range" min={min} max={max} step={step} value={val}
                  onChange={e => set(Number(e.target.value))}
                  style={{ width: '100%', marginTop: 6, accentColor: '#2563eb' }} />
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
          {[['Monthly Fuel', fmt(monthlyFuelCost), '#2563eb'],
            ['Monthly Time Cost', fmt(monthlyTimeCost), '#7c3aed'],
            ['Monthly Total', fmt(totalMonthlyCost), '#dc2626'],
            ['Annual Total', fmt(totalAnnualCost), '#059669']].map(([label, value, color]) => (
            <div key={label as string} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: color as string }}>{value}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginTop: 0 }}>💡 The Hidden Truth</h2>
          <p style={{ color: '#555', fontSize: 14 }}>Round-trip commute distance: <strong>{roundTripMiles.toFixed(0)} miles/day</strong></p>
          <p style={{ color: '#555', fontSize: 14 }}>Daily time in traffic: <strong>{(dailyCommuteHours * 60).toFixed(0)} minutes</strong> (avg DFW speed: 35 mph)</p>
          <p style={{ fontWeight: 700, color: '#dc2626', fontSize: 15 }}>
            🔑 Over 5 years you'll spend {fmt(nearHomeSavings)} on this commute — enough to buy a significantly closer home.
          </p>
          <p style={{ color: '#888', fontSize: 12, marginBottom: 0 }}>* Time cost calculated at your hourly rate. Maintenance at $0.08/mile.</p>
        </div>
      </div>
    </div>
  );
}
