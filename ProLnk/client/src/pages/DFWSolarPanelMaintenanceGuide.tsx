import { useState } from 'react';

const SYSTEM_SIZES = ['4 kW (10-12 panels)','6 kW (15-18 panels)','8 kW (20-24 panels)','10 kW (25-30 panels)','12 kW+ (30+ panels)'];
const LOCATIONS = ['North Dallas/Plano','Fort Worth/Tarrant County','Frisco/McKinney','East DFW/Rockwall','South DFW/Mansfield','Arlington/Midcities'];

const pollenCalendar = [
  { month: 'Jan', pollen: 'Low', cleaning: false },
  { month: 'Feb', pollen: 'Cedar HIGH', cleaning: true },
  { month: 'Mar', pollen: 'Cedar/Elm HIGH', cleaning: true },
  { month: 'Apr', pollen: 'Oak/Ash HIGH', cleaning: true },
  { month: 'May', pollen: 'Grass Med', cleaning: false },
  { month: 'Jun', pollen: 'Low', cleaning: false },
  { month: 'Jul', pollen: 'Low', cleaning: false },
  { month: 'Aug', pollen: 'Ragweed Low', cleaning: false },
  { month: 'Sep', pollen: 'Ragweed HIGH', cleaning: true },
  { month: 'Oct', pollen: 'Low', cleaning: false },
  { month: 'Nov', pollen: 'Low', cleaning: false },
  { month: 'Dec', pollen: 'Low', cleaning: false },
];

interface MaintenanceResult { cleanings: number; annualCost: string; productionLoss: string; inverterCheck: string; hailNote: string; }

function getResult(size: string, location: string): MaintenanceResult {
  const isNorth = location.includes('Frisco') || location.includes('North');
  return {
    cleanings: isNorth ? 4 : 3,
    annualCost: isNorth ? '$300-$600′ : '$200-$450',
    productionLoss: 'DFW cedar and oak pollen can reduce output 10-20% if panels go uncleaned Feb-April',
    inverterCheck: 'Test inverter string efficiency monthly via monitoring app. DFW heat causes string inverters to throttle above 95F — microinverters recommended for peak performance.',
    hailNote: 'DFW averages 7 significant hail events/year. After any hail above 1 inch, visually inspect for micro-cracks. Most tier-1 panels withstand 1-inch hail at 55mph.',
  };
}

export default function DFWSolarPanelMaintenanceGuide() {
  const [systemSize, setSystemSize] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<MaintenanceResult|null>(null);

  function calculate() {
    if (!systemSize || !location) return;
    setResult(getResult(systemSize, location));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Solar Panel Maintenance</h1>
        <p style={{ color: '#8899AA', marginBottom: 32, fontSize: 16 }}>DFW pollen season is brutal for solar — cedar and oak can cut your output by 20%. Here's how to stay ahead of it.</p>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 DFW Pollen & Cleaning Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
            {pollenCalendar.map(m => (
              <div key={m.month} style={{ background: m.cleaning ? '#1A3020′ : '#0A1628', border: m.cleaning ? '1px solid #4CAF50' : '1px solid #1E3050', borderRadius: 8, padding: 10, textAlign: ’center' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{m.month}</div>
                <div style={{ fontSize: 11, color: m.cleaning ? '#4CAF50′ : '#8899AA', marginTop: 2 }}>{m.pollen}</div>
                {m.cleaning && <div style={{ fontSize: 11, color: '#F5E642', marginTop: 4, fontWeight: 700 }}>CLEAN</div>}
              </div>
            ))}
          </div>
          <p style={{ color: '#8899AA', fontSize: 13, marginTop: 12 }}>Green = recommended cleaning month based on DFW pollen patterns</p>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Maintenance Plan</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>System Size</label>
              <select value={systemSize} onChange={e => setSystemSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select size...</option>
                {SYSTEM_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select area...</option>
                {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Generate Maintenance Plan</button>
        </div>

        {result && (
          <div style={{ background: '#0D2137', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>☀️ Your Solar Maintenance Plan</h3>
            {[
              { label: '🧹 Cleanings Per Year', value:  },
              { label: '💰 Annual Maintenance Cost', value: result.annualCost },
              { label: '📉 Pollen Impact', value: result.productionLoss },
              { label: '🔌 Inverter Monitoring', value: result.inverterCheck },
              { label: '🌨️ Hail Protocol', value: result.hailNote },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #1E3050′ }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
