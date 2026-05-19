import { useState } from 'react';

export default function DFWWaterBillReductionGuide2026() {
  const [monthlyBill, setMonthlyBill] = useState(120);

  const getOpportunities = (bill: number) => {
    const opportunities = [];
    if (bill > 80) opportunities.push({ icon: '🌿', action: 'Smart Irrigation Controller', savings: '$25-45/mo', desc: '60-70% of DFW summer water goes to irrigation — smart controllers cut 30% automatically' });
    if (bill > 60) opportunities.push({ icon: '🔍', action: 'Leak Detection Audit', savings: '$15-40/mo', desc: '1 dripping faucet = 3,000 gal/mo. Running toilet = 26,000 gal/mo. Worth $5 dye test.' });
    if (bill > 50) opportunities.push({ icon: '🚿', action: 'Low-Flow Showerheads', savings: '$8-15/mo', desc: 'WaterSense 1.5gpm vs 2.5gpm standard — saves 40% in shower water use' });
    if (bill > 40) opportunities.push({ icon: '🚽', action: 'High-Efficiency Toilets', savings: '$10-20/mo', desc: '1.28 GPF vs 3.5 GPF old toilets — saves 27,000+ gal/yr per household' });
    opportunities.push({ icon: '⏰', action: 'Irrigation Scheduling', savings: '$10-25/mo', desc: 'Water before 6am or after 8pm — reduces evaporation loss 40% in DFW heat' });
    opportunities.push({ icon: '🌧️', action: 'Rain/Freeze Sensor', savings: '$5-15/mo', desc: 'Required by TX law but often disconnected — reconnect or replace to avoid watering during rain' });
    return opportunities;
  };

  const opportunities = getOpportunities(monthlyBill);
  const totalSavingsMin = opportunities.reduce((acc, o) => acc + parseInt(o.savings.split('-')[0].replace('$', '')), 0);
  const totalSavingsMax = opportunities.reduce((acc, o) => {
    const parts = o.savings.split('-');
    const maxStr = parts[1] ? parts[1].replace('/mo', '') : parts[0].replace('$', '');
    return acc + parseInt(maxStr);
  }, 0);

  const leakSteps = [
    ['Check toilet', 'Put 10 drops of food coloring in tank. Wait 10 min. Color in bowl = leak. Fix: $5-20 flapper.'],
    ['Read meter at night', 'Note meter reading. Do not use water for 2 hours. Re-read. Any change = leak somewhere.'],
    ['Check irrigation valves', 'Run each zone manually. Look for sprinkler heads that drip when zone is off.'],
    ['Inspect supply lines', 'Check under sinks and behind toilets for slow drips at connectors — rubber washers fail every 5-7 years.'],
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Water Bill Reduction Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>How to cut your DFW water bill — irrigation is #1, leaks are #2</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['60-70%', 'Irrigation Share in Summer'], ['3,000 gal', 'Dripping Faucet/Month'], ['30%', 'Smart Irrigation Savings']].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #2A3F5F' }}>
              <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2A3F5F' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Your Savings Opportunities</h2>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#94A3B8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Your Monthly Water Bill ($)</label>
            <input type="number" value={monthlyBill} onChange={e => setMonthlyBill(Number(e.target.value))}
              style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 8, padding: '0.75rem', color: '#E8EDF5', fontSize: '1rem', boxSizing: 'border-box' }} />
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Potential Monthly Savings</div>
            <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700 }}>${totalSavingsMin}-{totalSavingsMax}/mo</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Implementing all opportunities below</div>
          </div>
          {opportunities.map(({ icon, action, savings, desc }) => (
            <div key={action} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{icon} {action}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{desc}</div>
              </div>
              <div style={{ color: '#00CC66', fontWeight: 700, whiteSpace: 'nowrap' }}>{savings}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2A3F5F' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Quick Leak Check (Do This Today)</h2>
          {leakSteps.map(([step, detail]) => (
            <div key={step} style={{ padding: '0.75rem 0', borderBottom: '1px solid #2A3F5F' }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>🔧 {step}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#1E2D45', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: '1.5rem' }}>💧</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Get Plumbing and Irrigation Quotes</div>
          <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>ProLnk connects you with licensed DFW plumbers and irrigation pros — free estimates</div>
        </div>
      </div>
    </div>
  );
}
