import { useState } from 'react';

export default function DFWHVACSuperheatCalculate2026() {
  const [suctionTemp, setSuctionTemp] = useState('');
  const [suctionPressure, setSuctionPressure] = useState('');
  const [refrigerant, setRefrigerant] = useState('R410A');
  const [result, setResult] = useState<string | null>(null);

  const satTemps: Record<string, Record<string, number>> = {
    R410A: { '100': 14, '105': 16, '110': 18, '115': 20, '120': 22, '125': 24, '130': 27, '135': 29, '140': 32 },
    R22: { '60': 40, '65': 45, '70': 50, '75': 55, '80': 59, '85': 64, '90': 68, '95': 73 },
  };

  const calculate = () => {
    const temp = parseFloat(suctionTemp);
    const pressure = parseFloat(suctionPressure);
    if (!temp || !pressure) { setResult('Enter both suction line temperature and suction pressure.'); return; }
    const nearest = Object.keys(satTemps[refrigerant]).reduce((a, b) => Math.abs(parseFloat(b) - pressure) < Math.abs(parseFloat(a) - pressure) ? b : a);
    const satTemp = satTemps[refrigerant][nearest];
    const superheat = temp - satTemp;
    let diagnosis = '';
    if (superheat < 5) diagnosis = 'CRITICALLY LOW: System may be overcharged or metering device restricted. Risk of liquid refrigerant reaching compressor — shut down and call tech immediately.';
    else if (superheat < 10) diagnosis = 'LOW: Slightly overcharged or low airflow across evaporator. Check air filter and static pressure before adding charge.';
    else if (superheat >= 10 && superheat <= 20) diagnosis = 'NORMAL for DFW summer fixed-orifice systems (target 10-20°F). System is operating correctly.';
    else if (superheat <= 30) diagnosis = 'ELEVATED: Possible low charge, high load condition, or restricted metering device. Verify DFW outdoor conditions — if ambient >100°F, up to 25°F superheat can be normal.';
    else diagnosis = 'HIGH: Undercharged system or severe metering restriction. In DFW summer heat, this causes compressor overheating and premature failure. Add refrigerant or inspect TXV.';
    setResult(`Saturation temp at ${pressure} PSIG: ~${satTemp}°F · Superheat: ${superheat.toFixed(1)}°F · ${diagnosis}`);
  };

  const steps = [
    { icon: '🌡️', step: '1. Clamp suction line', detail: 'Temperature clamp on suction line (large, cold, uninsulated section at service valve)' },
    { icon: '🔧', step: '2. Connect manifold gauges', detail: 'Blue low-side gauge to suction service valve' },
    { icon: '📊', step: '3. Read suction pressure', detail: 'Record PSIG reading from blue gauge with system running' },
    { icon: '📖', step: '4. Find saturation temp', detail: 'Use PT chart for refrigerant type to convert PSIG → saturation temperature' },
    { icon: '🧮', step: '5. Calculate superheat', detail: 'Superheat = Suction Line Temp − Saturation Temp at that pressure' },
    { icon: '🎯', step: '6. Compare to DFW target', detail: '10-20°F for fixed orifice · 5-10°F for TXV system in DFW summer' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW HVAC Superheat Calculation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How DFW techs calculate and interpret superheat readings in summer heat</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 How to Measure Superheat — Step by Step</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: i < steps.length - 1 ? '1px solid #2d5a8e' : 'none', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 22, minWidth: 30 }}>{s.icon}</div>
                <div>
                  <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{s.step}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 DFW Superheat Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Suction Line Temp (°F)</label>
              <input value={suctionTemp} onChange={e => setSuctionTemp(e.target.value)} placeholder="e.g. 52″ style={{ width: '100%', background: '#0A1628', border: '1px solid #2d5a8e', borderRadius: 6, padding: '10px 12px', color: '#e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Suction Pressure (PSIG)</label>
              <input value={suctionPressure} onChange={e => setSuctionPressure(e.target.value)} placeholder="e.g. 125″ style={{ width: '100%', background: '#0A1628', border: '1px solid #2d5a8e', borderRadius: 6, padding: '10px 12px', color: '#e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Refrigerant Type</label>
              <select value={refrigerant} onChange={e => setRefrigerant(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d5a8e', borderRadius: 6, padding: '10px 12px', color: '#e2e8f0', fontSize: 14 }}>
                <option value="R410A">R-410A (most DFW systems)</option>
                <option value="R22″>R-22 (older systems)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Calculate Superheat</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: '14px 16px', border: '1px solid #F5E642', color: '#F5E642', fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>☀️ DFW Summer Context</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            At 100-110°F outdoor ambient (common DFW July-August), fixed-orifice systems naturally run higher superheat (18-25°F) due to high head pressure. TXV systems self-regulate better, targeting 8-12°F. DFW techs should always note outdoor ambient when diagnosing — a superheat reading in August context differs from the same reading in April. Subcooling measurement at the liquid line (10-18°F target) cross-checks the diagnosis.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 12 }}>
          ProLnk DFW HVAC Guide 2026 · prolnk.io
        </div>
      </div>
    </div>
  );
}
