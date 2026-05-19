import { useState } from 'react';

export default function DFWBackupGeneratorSizing() {
  const [homeSize, setHomeSize] = useState('');
  const [scope, setScope] = useState('');
  const [fuel, setFuel] = useState('');
  const [result, setResult] = useState<null | { size: string; brand: string; cost: string; fuelRec: string; runtime: string; loads: string[]; notes: string }>(null);

  function calculate() {
    if (!homeSize || !scope || !fuel) return;
    const sq = parseInt(homeSize);
    let size = '', brand = '', cost = '', fuelRec = '', runtime = '', loads: string[] = [], notes = '';

    if (scope === 'critical') {
      size = sq < 2500 ? '7–10 kW' : '10–12 kW';
      brand = 'Generac Guardian 10kW or Kohler 10RESVL';
      cost = sq < 2500 ? '$4,500–$6,500 installed' : '$6,000–$8,500 installed';
      fuelRec = fuel === 'gas' ? 'Natural Gas — ideal for critical circuits. No storage needed, continuous supply.' : 'Propane — 500-gal tank gives ~100 hrs runtime at critical load. Fill before storm season.';
      runtime = fuel === 'gas' ? 'Unlimited (gas line fed)' : '80–120 hours on 500-gal tank';
      loads = ['AC unit (1 zone, 3–4 tons = 3.5–5 kW)', 'Refrigerator + freezer (0.5–1 kW)', 'Lighting (0.5 kW)', 'Internet/router (0.1 kW)', 'Medical equipment if needed (1–2 kW)'];
      notes = 'DFW summer: AC alone runs 3.5–5 kW. A 7 kW generator barely covers AC + essentials. In 105°F+ heat, a critical circuit generator is the minimum viable option. Plan for 3–7 day outages post-storm.';
    } else {
      size = sq < 2000 ? '20–22 kW' : sq < 3500 ? '22–26 kW' : '26–32 kW';
      brand = sq < 2500 ? 'Generac Guardian 22kW or Briggs & Stratton 20kW' : 'Kohler 26RCA or Cummins RS22A';
      cost = sq < 2000 ? '$8,000–$12,000 installed' : sq < 3500 ? '$11,000–$16,000 installed' : '$15,000–$22,000 installed';
      fuelRec = fuel === 'gas' ? 'Natural Gas — strongly preferred for whole-home. DFW natural gas infrastructure is reliable. No storage, no refueling.' : 'Propane — 500-gal minimum, 1,000-gal recommended. Whole-home loads burn through propane fast in DFW summer (AC running constantly).';
      runtime = fuel === 'gas' ? 'Unlimited — runs as long as grid is out' : '40–60 hours whole-home on 500-gal tank (summer load)';
      loads = ['Central AC (3.5–7 kW depending on tons)', 'Electric range/oven (avoid — 5–7 kW spike)', 'Water heater (3–4.5 kW)', 'Washer + dryer (5–7 kW)', 'Refrigerator + lights + plugs (2–3 kW)', 'Total typical DFW home: 12–18 kW running load'];
      notes = 'Whole-home sizing in DFW: your AC is the dominant load. A 4-ton AC unit = ~5 kW running + ~15 kW startup surge. Size generator for running load + 1 large motor startup. Natural gas is the right fuel for DFW whole-home — propane costs escalate fast when AC runs 24/7.';
    }
    setResult({ size, brand, cost, fuelRec, runtime, loads, notes });
  }

  const dfwLoads = [
    { appliance: '4-ton AC (most DFW homes)', running: '4.5–5 kW', startup: '15–18 kW surge' },
    { appliance: '5-ton AC (larger DFW homes)', running: '5.5–6.5 kW', startup: '18–22 kW surge' },
    { appliance: 'Refrigerator + Freezer', running: '0.5–1 kW', startup: '2–3 kW surge' },
    { appliance: 'Well pump (if applicable)', running: '1–2 kW', startup: '4–8 kW surge' },
    { appliance: 'Electric water heater', running: '3.5–4.5 kW', startup: 'No surge' },
    { appliance: 'Lighting (whole home LED)', running: '0.5–1 kW', startup: 'No surge' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>⚡</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Backup Generator Sizing</h1>
        </div>
        <p style={{ color: '#9BAEC8', marginBottom: 28 }}>Size a generator for your DFW home — AC dominates the load calculation in Texas summer heat.</p>
        <div style={{ background: '#1A0820', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '3px solid #F5A642′ }}>
          <span style={{ color: '#F5A642', fontWeight: 700 }}>🌡️ DFW Reality: </span>
          <span style={{ color: '#E8EDF5', fontSize: 14 }}>Your AC runs 3,500–5,000 watts continuously in a DFW summer outage. At 105°F, losing power without backup is a health emergency. Size for AC first, everything else second.</span>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 DFW Home Load Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1A3055′ }}>
                {['Appliance', 'Running Load', 'Startup Surge'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#F5E642′ }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dfwLoads.map(row => (
                <tr key={row.appliance} style={{ borderBottom: '1px solid #0A1628′ }}>
                  <td style={{ padding: '9px 10px', color: '#E8EDF5', fontWeight: 600 }}>{row.appliance}</td>
                  <td style={{ padding: '9px 10px', color: '#F5A642′ }}>{row.running}</td>
                  <td style={{ padding: '9px 10px', color: '#9BAEC8′ }}>{row.startup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Size Your DFW Generator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Home Size (sq ft)</label>
              <input type="number" placeholder="e.g. 2800″ value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Coverage Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select scope...</option>
                <option value="critical">Critical Circuits Only (AC + fridge + lights)</option>
                <option value="whole">Whole Home (full comfort, all appliances)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Fuel Type</label>
              <select value={fuel} onChange={e => setFuel(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select fuel...</option>
                <option value="gas">Natural Gas (connected to DFW gas line)</option>
                <option value="propane">Propane (tank on property)</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Size My Generator →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Recommended Size</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 22, marginTop: 2 }}>{result.size}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Recommended Models</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.brand}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Installed Cost (DFW)</span><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{result.cost}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Fuel Recommendation</span><div style={{ color: '#E8EDF5', marginTop: 4, lineHeight: 1.5, fontSize: 14 }}>{result.fuelRec}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Expected Runtime</span><div style={{ color: '#4ADE80', fontWeight: 600, marginTop: 2 }}>{result.runtime}</div></div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#9BAEC8', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Circuits This Covers:</div>
                  {result.loads.map(l => <div key={l} style={{ color: '#E8EDF5', fontSize: 13, marginBottom: 4 }}>• {l}</div>)}
                </div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#F5A642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>📍 DFW Sizing Notes</div>
                  <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{result.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p style={{ color: '#4A6080', fontSize: 13, textAlign: 'center' }}>Requires licensed electrician install and permit. Costs include transfer switch and installation.</p>
      </div>
    </div>
  );
}
