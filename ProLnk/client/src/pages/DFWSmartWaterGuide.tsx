import { useState } from 'react';

export default function DFWSmartWaterGuide() {
  const [homeAge, setHomeAge] = useState('recent');
  const [damageConcern, setDamageConcern] = useState('medium');
  const [budget, setBudget] = useState('medium');
  const [result, setResult] = useState<{ package: string; cost: string; devices: string[]; topPriority: string; reason: string } | null>(null);

  function calculate() {
    const devices: string[] = [];
    let packageName = '';
    let cost = '';
    let topPriority = '';
    let reason = '';
    if (homeAge === 'old') {
      devices.push('Moen Flo Smart Water Monitor + Auto Shutoff ($500 installed)');
      devices.push('Leak sensors under all sinks, water heater, and washing machine ($200 total)');
      devices.push('Water heater leak detector with auto shutoff ($150-300)');
      packageName = 'Legacy Home Protection Package';
      cost = '$850 - $1,200 installed';
      topPriority = 'Automatic whole-home shutoff';
      reason = 'Homes built before 1985 in DFW have galvanized or aging copper supply lines that fail without warning. Auto-shutoff prevents catastrophic losses.';
    } else if (damageConcern === 'high') {
      devices.push('Phyn Plus Smart Water Assistant ($699 installed) - detects micro-leaks before emergencies');
      devices.push('Leak sensors at every appliance connection (6-8 sensors, $30-50 each)');
      devices.push('Smart shutoff on main line with freeze detection');
      devices.push('Water heater expansion tank check + smart leak detector');
      packageName = 'Maximum Protection Package';
      cost = '$1,200 - $1,800 installed';
      topPriority = 'Phyn Plus AI leak detection';
      reason = 'Phyn monitors your home water fingerprint and detects slow leaks, toilet running, and drip patterns before visible damage occurs.';
    } else if (budget === 'low') {
      devices.push('Govee or Aqara leak sensors at high-risk spots ($25-40 each, 3-5 sensors)');
      devices.push('Smart water valve on washing machine line ($80-150)');
      packageName = 'Budget Smart Water Starter';
      cost = '$150 - $350 self-installed';
      topPriority = 'Washing machine leak sensor';
      reason = 'Washing machine supply hoses are the #1 source of catastrophic home water damage in DFW. A $35 sensor and $100 smart valve can prevent $20,000+ in repairs.';
    } else {
      devices.push('Moen Flo Smart Water Monitor ($400 installed) - monitors whole home usage');
      devices.push('Auto shutoff valve integrated with Moen app');
      devices.push('Leak sensors: under sinks, water heater, and appliances (4-6 sensors)');
      devices.push('Smart water heater controller if compatible');
      packageName = 'Standard DFW Smart Water Package';
      cost = '$700 - $1,100 installed';
      topPriority = 'Moen Flo whole-home monitor';
      reason = 'Moen Flo analyzes your DFW home water usage patterns and alerts you to anomalies - a running toilet at 3am, a slow pipe leak, or a burst pipe from a DFW ice storm.';
    }
    setResult({ package: packageName, cost, devices, topPriority, reason });
  }

  const hardWaterData = [
    { city: 'Dallas', hardness: '12-16 GPG', note: 'Very hard - scale buildup is significant' },
    { city: 'Plano / McKinney', hardness: '14-18 GPG', note: 'Among hardest water in DFW metro' },
    { city: 'Fort Worth', hardness: '8-12 GPG', note: 'Hard - softener recommended' },
    { city: 'Frisco / Allen', hardness: '15-20 GPG', note: 'Extremely hard - smart softener pays for itself fast' },
  ];

  const smartDevices = [
    { name: 'Moen Flo', type: 'Whole-home monitor + shutoff', price: '$350-500 installed', feature: 'Detects leaks, measures usage, integrates with Alexa/Google, auto-shutoff' },
    { name: 'Phyn Plus', type: 'AI-powered whole-home monitor', price: '$599-799 installed', feature: 'AI learns your home water fingerprint, detects micro-leaks, freeze protection, usage analytics' },
    { name: 'Govee Leak Sensor', type: 'Point sensor', price: '$25-40 each', feature: 'Wi-Fi alerts, loud alarm, works standalone - ideal for under-sink spots' },
    { name: 'Aqara T1 Leak Sensor', type: 'Point sensor (Zigbee)', price: '$20-30 each', feature: 'Requires Aqara hub, integrates with HomeKit/Alexa, excellent battery life' },
  ];

  const dfwRisks = [
    { risk: 'Frozen pipe burst', when: 'December-February', detail: 'DFW homes built before 2000 often have pipes in uninsulated attics and exterior walls - vulnerable during rare freezes' },
    { risk: 'Washing machine hose failure', when: 'Any time', detail: '#1 cause of home flooding nationally - rubber hoses degrade silently over 5-10 years' },
    { risk: 'Water heater pan overflow', when: 'Year-round', detail: 'DFW hard water accelerates tank sediment buildup, reducing lifespan and increasing leak risk' },
    { risk: 'Slab leak', when: 'Year-round', detail: 'DFW clay soil expansion/contraction causes copper pipes in concrete slabs to stress and leak - expensive if undetected' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW SMART HOME 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Smart Water Technology Guide for DFW</h1>
        <p style={{ color: '#8A9BBE', marginBottom: 16, lineHeight: 1.6 }}>Water damage is the #2 cause of homeowner insurance claims in Texas. DFW extreme weather, hard water, and aging infrastructure make smart water protection one of the highest-ROI upgrades a DFW homeowner can make.</p>
        <div style={{ background: '#1A2F4E', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 36 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>DFW Water Risk Profile</div>
          <ul style={{ color: '#C8D5E8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Average DFW water damage claim: $11,000-$24,000</li>
            <li>Most insurance policies require you to report leaks quickly or they deny claims</li>
            <li>Some DFW insurers now offer 5-15% discounts for whole-home leak detection systems</li>
            <li>1 in 8 DFW homes has a hidden leak wasting water and money right now</li>
          </ul>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>DFW Hard Water by City</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
          {hardWaterData.map(h => (
            <div key={h.city} style={{ background: '#111E35', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 2 }}>{h.city}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 2 }}>{h.hardness}</div>
              <div style={{ color: '#8A9BBE', fontSize: 12 }}>{h.note}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Top DFW Water Risks</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {dfwRisks.map(r => (
            <div key={r.risk} style={{ background: '#111E35', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#E8EDF5′ }}>{r.risk}</span>
                <span style={{ color: '#F5E642', fontSize: 12 }}>{r.when}</span>
              </div>
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>{r.detail}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Smart Water Device Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {smartDevices.map(d => (
            <div key={d.name} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 2 }}>{d.name}</div>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginBottom: 6 }}>{d.type}</div>
                <div style={{ color: '#C8D5E8', fontSize: 13 }}>{d.feature}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap' }}>{d.price}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Build Your DFW Water Protection Package</h2>
        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="new">Built after 2010</option>
                <option value="recent">2000-2010</option>
                <option value="mid">1985-2000</option>
                <option value="old">Before 1985</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Water Damage Concern</label>
              <select value={damageConcern} onChange={e => setDamageConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="low">Low - just want basics</option>
                <option value="medium">Medium - had a scare before</option>
                <option value="high">High - vacation property or risk-averse</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="low">Under $400</option>
                <option value="medium">$400 - $1,200</option>
                <option value="high">$1,200+</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Build My Water Protection Package</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{result.package}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Estimated Cost: {result.cost}</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginBottom: 6 }}>Included Devices</div>
                {result.devices.map((d, i) => <div key={i} style={{ color: '#C8D5E8', fontSize: 13, marginBottom: 4 }}>+ {d}</div>)}
              </div>
              <div style={{ padding: 12, background: '#111E35', borderRadius: 8 }}>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginBottom: 4 }}>Top Priority: {result.topPriority}</div>
                <div style={{ color: '#C8D5E8', fontSize: 13, lineHeight: 1.6 }}>{result.reason}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Smart Water Installation Quotes in DFW</div>
          <p style={{ color: '#8A9BBE', marginBottom: 16 }}>ProLnk connects you with licensed DFW plumbers who install Moen Flo, Phyn, and leak detection systems.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Free Plumbing Quotes</button>
        </div>
      </div>
    </div>
  );
}
