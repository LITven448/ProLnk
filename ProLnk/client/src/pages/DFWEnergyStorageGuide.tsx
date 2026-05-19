import { useState } from 'react';

type BatteryBrand = { name: string; capacity: string; power: string; warranty: string; cost: string; bestFor: string };

const batteries: BatteryBrand[] = [
  { name: 'Tesla Powerwall 3',   capacity: '13.5 kWh', power: '11.5 kW', warranty: '10 yr',  cost: '$11,500',        bestFor: 'Whole-home backup, EV charging integration' },
  { name: 'Enphase IQ Battery 5P', capacity: '5 kWh',  power: '3.84 kW', warranty: '15 yr',  cost: '$5,000/unit',    bestFor: 'Modular — stack multiple units, microinverter homes' },
  { name: 'LG ESS Home 8',       capacity: '9.6 kWh',  power: '5 kW',    warranty: '10 yr',  cost: '$8,500',         bestFor: 'Mid-size DFW homes, proven reliability' },
  { name: 'sonnen eco 10',       capacity: '10 kWh',   power: '3 kW',    warranty: '10,000 cycles', cost: '$10,000', bestFor: 'Long-cycle longevity, VPP participation' },
  { name: 'Franklin WH 10',      capacity: '10 kWh',   power: '10 kW',   warranty: '10 yr',  cost: '$9,500',         bestFor: 'High surge loads, DFW HVAC backup' },
];

const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500+ sqft'];
const outageGoals = ['24-hour essentials only', '48-hour full home', 'ERCOT winter storm (5–7 days)', 'True grid independence'];

const sizingMap: Record<string, { kWh: string; units: string; cost: string; topPick: string }> = {
  'Under 1,500 sqft|24-hour essentials only':      { kWh: '10 kWh',    units: '2× Enphase IQ 5P',   cost: '$10,000',   topPick: 'Enphase IQ Battery 5P' },
  'Under 1,500 sqft|48-hour full home':            { kWh: '15 kWh',    units: '1× Powerwall 3 + buffer', cost: '$13,000', topPick: 'Tesla Powerwall 3' },
  'Under 1,500 sqft|ERCOT winter storm (5–7 days)': { kWh: '30 kWh',  units: '3× Enphase IQ 5P',   cost: '$25,000',   topPick: 'Enphase IQ Battery 5P' },
  'Under 1,500 sqft|True grid independence':       { kWh: '40+ kWh',   units: '3× Powerwall 3',      cost: '$35,000+',  topPick: 'Tesla Powerwall 3' },
  '1,500–2,500 sqft|24-hour essentials only':      { kWh: '13.5 kWh',  units: '1× Powerwall 3',      cost: '$11,500',   topPick: 'Tesla Powerwall 3' },
  '1,500–2,500 sqft|48-hour full home':            { kWh: '20 kWh',    units: '2× Powerwall 3',      cost: '$23,000',   topPick: 'Tesla Powerwall 3' },
  '1,500–2,500 sqft|ERCOT winter storm (5–7 days)': { kWh: '40 kWh',  units: '4× Enphase IQ 5P',   cost: '$35,000',   topPick: 'Enphase IQ Battery 5P' },
  '1,500–2,500 sqft|True grid independence':       { kWh: '54+ kWh',   units: '4× Powerwall 3',      cost: '$46,000+',  topPick: 'Tesla Powerwall 3' },
  '2,500–3,500 sqft|24-hour essentials only':      { kWh: '20 kWh',    units: '2× LG ESS Home 8',    cost: '$17,000',   topPick: 'LG ESS Home 8' },
  '2,500–3,500 sqft|48-hour full home':            { kWh: '30 kWh',    units: '3× LG ESS Home 8',    cost: '$25,500',   topPick: 'LG ESS Home 8' },
  '2,500–3,500 sqft|ERCOT winter storm (5–7 days)': { kWh: '60 kWh',  units: '3× Powerwall 3 + LG', cost: '$50,000',   topPick: 'Franklin WH 10' },
  '2,500–3,500 sqft|True grid independence':       { kWh: '80+ kWh',   units: '6× Powerwall 3',      cost: '$70,000+',  topPick: 'Tesla Powerwall 3' },
  '3,500+ sqft|24-hour essentials only':           { kWh: '27 kWh',    units: '2× Franklin WH 10',   cost: '$19,000',   topPick: 'Franklin WH 10' },
  '3,500+ sqft|48-hour full home':                 { kWh: '40 kWh',    units: '4× Franklin WH 10',   cost: '$38,000',   topPick: 'Franklin WH 10' },
  '3,500+ sqft|ERCOT winter storm (5–7 days)':     { kWh: '80 kWh',    units: '8× Franklin WH 10',   cost: '$76,000',   topPick: 'Franklin WH 10' },
  '3,500+ sqft|True grid independence':            { kWh: '100+ kWh',  units: 'Custom microgrid',     cost: '$90,000+',  topPick: 'sonnen eco 10' },
};

export default function DFWEnergyStorageGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [outageGoal, setOutageGoal] = useState('');
  const [showResult, setShowResult] = useState(false);

  const key = `${homeSize}|${outageGoal}`;
  const rec = sizingMap[key];
  const topBattery = rec ? batteries.find(b => b.name === rec.topPick) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔋⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Home Energy Storage Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Beyond Powerwall — Every Major Battery for DFW Homeowners, Sized for ERCOT Realities</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌨️ The DFW ERCOT Case for Storage</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>February 2021: 4.5 million Texas homes lost power for up to 10 days. A typical DFW home uses 3–6 kWh/hour in winter, meaning a <strong style={{ color: '#F5E642' }}>5-day outage requires 360–720 kWh</strong> — far beyond a single Powerwall.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>ERCOT Winter Event Sizing Rule</div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>Essentials only (heat, fridge, lights): 20–30 kWh minimum. Full home comfort for 5 days: 80–120 kWh. Most homeowners need <strong style={{ color: '#E8EDF5' }}>2–4 battery units</strong> for real ERCOT resilience.</div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 DFW Battery Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            {batteries.map(b => (
              <div key={b.name} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, padding: 14, background: '#0A1628', borderRadius: 8, marginBottom: 8 }}>
                <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{b.name}</div><div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{b.cost}</div></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div><div style={{ color: '#4A6FA5', fontSize: 11 }}>CAPACITY</div><div style={{ fontSize: 13 }}>{b.capacity}</div></div>
                  <div><div style={{ color: '#4A6FA5', fontSize: 11 }}>POWER</div><div style={{ fontSize: 13 }}>{b.power}</div></div>
                  <div><div style={{ color: '#4A6FA5', fontSize: 11 }}>WARRANTY</div><div style={{ fontSize: 13 }}>{b.warranty}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 DFW Battery Sizer</h2>
          {[{ label: 'Home Size', val: homeSize, opts: homeSizes, setter: setHomeSize },
            { label: 'Outage Protection Goal', val: outageGoal, opts: outageGoals, setter: setOutageGoal }].map(({ label, val, opts, setter }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 8 }}>{label}</label>
              <select value={val} onChange={e => { setter(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={() => setShowResult(true)} disabled={!homeSize || !outageGoal}
            style={{ width: '100%', background: homeSize && outageGoal ? '#F5E642' : '#1E3A5F', color: homeSize && outageGoal ? '#0A1628' : '#4A6FA5', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: homeSize && outageGoal ? 'pointer' : 'default' }}>
            Size My DFW Battery System →
          </button>
        </div>

        {showResult && rec && topBattery && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🎯 Your DFW Battery Recommendation</h3>
            {[
              ['🔋', 'Recommended System', rec.units],
              ['⚡', 'Total Capacity Needed', rec.kWh],
              ['💰', 'Estimated System Cost', rec.cost],
              ['🏆', 'Top Brand for You', rec.topPick],
              ['✅', 'Why This Battery', topBattery.bestFor],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div><div style={{ fontWeight: 600 }}>{val}</div></div>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642', marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💡 Pro Tip: 30% Federal Tax Credit</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Battery storage installed with solar qualifies for the 30% ITC — saving you ${rec.cost !== 'Custom microgrid' ? Math.round(parseInt(rec.cost.replace(/[^0-9]/g, '')) * 0.30).toLocaleString() : '27,000+'} on your system.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
