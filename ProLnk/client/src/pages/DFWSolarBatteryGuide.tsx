import { useState } from 'react';

export default function DFWSolarBatteryGuide() {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [roofSize, setRoofSize] = useState('medium');
  const [outageConcern, setOutageConcern] = useState('medium');
  const [result, setResult] = useState<{ system: string; cost: string; payback: string; panels: string; battery: string } | null>(null);

  function calculate() {
    const bill = parseInt(monthlyBill) || 0;
    let kw = 7;
    let panels = '20-24 panels';
    if (bill > 300) { kw = 12; panels = '32-36 panels'; }
    else if (bill > 200) { kw = 10; panels = '27-30 panels'; }
    else if (bill > 150) { kw = 8; panels = '22-26 panels'; }
    const costLow = kw * 2800;
    const costHigh = kw * 3400;
    const cost = `$${costLow.toLocaleString()} - $${costHigh.toLocaleString()}`;
    const annualSavings = bill * 12 * 0.85;
    const midCost = (costLow + costHigh) / 2;
    const paybackYrs = Math.round(midCost / annualSavings);
    const payback = `${paybackYrs} years (${30 - paybackYrs} years of free power after)`;
    let battery = 'Powerwall 3 (13.5 kWh) - $12,000 installed';
    if (outageConcern === 'high') battery = 'Two Powerwall 3 units (27 kWh) - $22,000 installed';
    else if (outageConcern === 'low') battery = 'Enphase IQ Battery 5P (5 kWh) - $7,000 installed (essential loads only)';
    setResult({ system: `${kw}kW system`, cost, payback, panels, battery });
  }

  const batteryComparison = [
    { name: 'Powerwall 3', capacity: '13.5 kWh', power: '11.5 kW peak', price: '$12,000 installed', best: 'Whole-home backup, integrated solar inverter' },
    { name: 'Enphase IQ 5P', capacity: '5 kWh per unit', power: '3.84 kW per unit', price: '$7,000+ installed', best: 'Modular, pairs with Enphase microinverters' },
    { name: 'Franklin WH', capacity: '13.6 kWh', power: '10 kW peak', price: '$11,000 installed', best: 'Flexible grid-tie, works with most inverters' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW ENERGY GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Solar + Battery Storage Guide for DFW</h1>
        <p style={{ color: '#8A9BBE', marginBottom: 16, lineHeight: 1.6 }}>After Winter Storm Uri in 2021, DFW homeowners learned a hard lesson: grid dependency is a liability. Solar + battery storage is now the most requested home upgrade in North Texas.</p>
        <div style={{ background: '#1A2F4E', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 36 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Why DFW Is Ideal for Solar</div>
          <ul style={{ color: '#C8D5E8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Dallas averages 234 sunny days per year - top 15% nationally</li>
            <li>High summer electric bills ($200-$500/mo) mean fast payback periods</li>
            <li>ERCOT grid volatility creates strong case for battery backup</li>
            <li>Texas has no state income tax credit but federal 30% ITC applies</li>
            <li>Net metering varies by REP - lock in a buyback agreement before installing</li>
          </ul>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>DFW Average System: 7-12kW</h2>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[{ label: 'Small DFW Home', size: '7-8kW', panels: '20-24', cost: '$19,600-$27,200′ }, { label: ’Average DFW Home', size: '10kW', panels: '27-30', cost: '$28,000-$34,000′ }, { label: ’Large DFW Home', size: '12kW', panels: '32-36', cost: '$33,600-$40,800′ }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{s.size}</div>
                <div style={{ color: '#C8D5E8', fontSize: 13 }}>{s.panels} panels</div>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginTop: 4 }}>{s.cost} before ITC</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ color: '#8A9BBE', fontSize: 13, marginBottom: 36 }}>After 30% federal tax credit, subtract $6,000-$12,000 from above costs.</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Battery Storage Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {batteryComparison.map(b => (
            <div key={b.name} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: '#E8EDF5', fontSize: 16 }}>{b.name}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{b.price}</span>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 6 }}>
                <span style={{ color: '#C8D5E8', fontSize: 13 }}>Capacity: {b.capacity}</span>
                <span style={{ color: '#C8D5E8', fontSize: 13 }}>Power: {b.power}</span>
              </div>
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>Best for: {b.best}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Install Timeline</h2>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gap: 12 }}>
            {[{ week: 'Week 1-2', task: 'Site assessment, utility interconnection application to Oncor' }, { week: 'Week 3-6', task: 'Permit approval from your city (Dallas, Plano, Allen, etc.)' }, { week: 'Week 7-8', task: 'Installation - most DFW homes completed in 1-2 days' }, { week: 'Week 9-12', task: 'Oncor inspection and Permission to Operate (PTO) - the longest wait' }].map(t => (
              <div key={t.week} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 80, fontSize: 13 }}>{t.week}</span>
                <span style={{ color: '#C8D5E8', fontSize: 14 }}>{t.task}</span>
              </div>
            ))}
          </div>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>System Size + Payback Calculator</h2>
        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Monthly Electric Bill ($)</label>
              <input value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} placeholder="e.g. 220″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Roof Size</label>
              <select value={roofSize} onChange={e => setRoofSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="small">Small (under 1,800 sq ft)</option>
                <option value="medium">Medium (1,800-3,000 sq ft)</option>
                <option value="large">Large (3,000+ sq ft)</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Outage Concern Level</label>
            <select value={outageConcern} onChange={e => setOutageConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
              <option value="low">Low - just want bill savings</option>
              <option value="medium">Medium - want some backup capability</option>
              <option value="high">High - whole home backup is essential</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get My Solar Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>{result.system} | {result.panels}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ color: '#8A9BBE', fontSize: 12 }}>System Cost (before 30% ITC)</div><div style={{ color: '#E8EDF5', fontWeight: 700 }}>{result.cost}</div></div>
                <div><div style={{ color: '#8A9BBE', fontSize: 12 }}>Payback Period</div><div style={{ color: '#E8EDF5', fontWeight: 700 }}>{result.payback}</div></div>
              </div>
              <div style={{ marginTop: 12, padding: 12, background: '#111E35', borderRadius: 8 }}>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginBottom: 4 }}>Recommended Battery</div>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>{result.battery}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Solar + Battery Quotes in DFW</div>
          <p style={{ color: '#8A9BBE', marginBottom: 16 }}>ProLnk connects you with certified DFW solar installers - compare 3 quotes and find the best deal.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Free Solar Quotes</button>
        </div>
      </div>
    </div>
  );
}
