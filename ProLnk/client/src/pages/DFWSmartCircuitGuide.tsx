import { useState } from 'react';

export default function DFWSmartCircuitGuide() {
  const [panelBrand, setPanelBrand] = useState('square-d');
  const [energyConcern, setEnergyConcern] = useState('bills');
  const [result, setResult] = useState<{ monitor: string; cost: string; install: string; insights: string; compatible: boolean } | null>(null);

  function calculate() {
    let monitor = 'Sense Energy Monitor';
    let cost = '$299 + $150 install';
    let install = '2-3 hours by electrician';
    let insights = 'Identifies top energy users in your DFW home, tracks HVAC cycling, detects always-on loads driving your Oncor bill';
    let compatible = true;
    if (panelBrand === 'square-d' && energyConcern === 'control') {
      monitor = 'Square D Wiser Smart Breaker System';
      cost = '$800-$2,500 installed (varies by circuits upgraded)';
      install = 'Half-day licensed electrician job';
      insights = 'Per-circuit shutoff via app, overload alerts, scheduling for DFW peak pricing hours, integrates with Square D panels natively';
    } else if (panelBrand === 'leviton' && energyConcern === 'control') {
      monitor = 'Leviton Smart Load Center';
      cost = '$2,500-$4,000 installed';
      install = 'Full panel replacement, 6-8 hours';
      insights = 'App-controlled breakers, arc-fault monitoring, energy dashboard per circuit - best for new construction or full panel upgrades';
    } else if (energyConcern === 'bills') {
      monitor = 'Sense Energy Monitor';
      cost = '$299 + $150-200 install';
      install = '2-3 hours - plugs into any 200A panel';
      insights = 'AI identifies appliances, tracks HVAC runtime (huge in DFW summers), finds phantom loads, sends alerts for unusual usage patterns';
    } else if (energyConcern === 'safety') {
      monitor = 'Sense + AFCI/GFCI Upgrade Combo';
      cost = '$299 Sense + $500-1,200 AFCI/GFCI breaker upgrades';
      install = 'Half-day licensed electrician';
      insights = 'Arc fault detection protects against electrical fires, ground fault protection for wet areas, Sense catches unusual appliance behavior early';
      compatible = panelBrand !== 'federal-pacific';
    }
    setResult({ monitor, cost, install, insights, compatible });
  }

  const monitors = [
    { name: 'Sense Energy Monitor', type: 'Retrofit (any panel)', price: '$299', method: 'CT clamps on main wires, no breaker changes', best: 'Immediate insight into what is driving your DFW summer bill' },
    { name: 'Square D Wiser', type: 'Square D panels only', price: '$800-$2,500', method: 'Smart breaker replacements', best: 'Remote circuit control, scheduling for ERCOT peak hours' },
    { name: 'Leviton Smart Load Center', type: 'New/full replacement', price: '$2,500-$4,000', method: 'Full smart panel installation', best: 'Most complete solution for new construction or major renovations' },
  ];

  const dfwInsights = [
    { insight: 'DFW summer HVAC accounts for 55-70% of your electric bill June-September', action: 'Track HVAC runtime with Sense to spot inefficiency' },
    { insight: 'Pool pumps running inefficiently are the #2 summer energy waster in DFW', action: 'Smart breaker scheduling cuts pool pump costs 40%' },
    { insight: 'Always-on loads (gaming PCs, old fridges, wine coolers) cost $30-80/month unnoticed', action: 'Sense identifies these within 2 weeks of installation' },
    { insight: 'ERCOT peak pricing (4-9pm weekdays) can cost 3-5x off-peak rates in summer', action: 'Smart breakers let you shed non-critical loads automatically' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW ENERGY INTELLIGENCE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Smart Circuit + Panel Monitor Guide for DFW</h1>
        <p style={{ color: '#8A9BBE', marginBottom: 36, lineHeight: 1.6 }}>DFW homeowners spend $2,400-$4,800/year on electricity. Smart circuit monitoring pays for itself by identifying where every dollar goes - and giving you control to stop wasting it.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Energy Monitor Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {monitors.map(m => (
            <div key={m.name} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 2 }}>{m.name}</div>
                  <div style={{ color: '#8A9BBE', fontSize: 12 }}>{m.type}</div>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{m.price}</span>
              </div>
              <div style={{ color: '#C8D5E8', fontSize: 13, marginBottom: 6 }}>How it works: {m.method}</div>
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>Best for: {m.best}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>What You Will Learn About Your DFW Home</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {dfwInsights.map(d => (
            <div key={d.insight} style={{ background: '#111E35', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F', display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#C8D5E8', fontSize: 14, marginBottom: 4 }}>{d.insight}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>Fix: {d.action}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Find Your Best Monitor Setup</h2>
        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Current Panel Brand</label>
              <select value={panelBrand} onChange={e => setPanelBrand(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="square-d">Square D</option>
                <option value="leviton">Leviton</option>
                <option value="ge">GE / Eaton</option>
                <option value="siemens">Siemens</option>
                <option value="federal-pacific">Federal Pacific (older homes)</option>
                <option value="unknown">Not sure</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Primary Energy Concern</label>
              <select value={energyConcern} onChange={e => setEnergyConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="bills">High electric bills</option>
                <option value="control">Want remote circuit control</option>
                <option value="safety">Electrical safety concerns</option>
                <option value="solar">Preparing for solar</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get My Monitor Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642' }}>
              {!result.compatible && (
                <div style={{ background: '#3A1A1A', borderRadius: 8, padding: 12, marginBottom: 12, color: '#FF8A8A', fontSize: 13 }}>
                  Warning: Federal Pacific panels should be replaced before adding smart monitoring - these panels have known safety issues common in pre-1990 DFW homes.
                </div>
              )}
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>{result.monitor}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: '#8A9BBE', fontSize: 12 }}>Cost</div><div style={{ color: '#E8EDF5', fontWeight: 700 }}>{result.cost}</div></div>
                <div><div style={{ color: '#8A9BBE', fontSize: 12 }}>Installation</div><div style={{ color: '#E8EDF5', fontWeight: 700 }}>{result.install}</div></div>
              </div>
              <div style={{ color: '#C8D5E8', fontSize: 14, lineHeight: 1.6 }}>{result.insights}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Smart Panel Quotes in DFW</div>
          <p style={{ color: '#8A9BBE', marginBottom: 16 }}>ProLnk connects you with licensed DFW electricians who specialize in smart energy systems.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}
