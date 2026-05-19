import { useState } from 'react';

export default function DFWRoofingDrainageCalc2026() {
  const [roofArea, setRoofArea] = useState('');
  const [zone, setZone] = useState('inner');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const area = parseFloat(roofArea);
    if (!area || area <= 0) { setResult('Enter a valid roof area in square feet.'); return; }
    const inchPerHour = zone === 'inner' ? 6 : 5.5;
    const gpmPerSqFt = inchPerHour / 96.23;
    const totalGpm = area * gpmPerSqFt;
    const dsCapacity4x4 = 20.8;
    const dsCapacity3x4 = 14.7;
    const dsNeeded4x4 = Math.ceil(totalGpm / dsCapacity4x4);
    const dsNeeded3x4 = Math.ceil(totalGpm / dsCapacity3x4);
    const gutterSize = area > 5000 ? '6-inch K-style' : '5-inch K-style';
    setResult(`Peak runoff: ${totalGpm.toFixed(1)} GPM · ${gutterSize} gutters recommended · Minimum ${dsNeeded4x4} × 4×4 downspouts OR ${dsNeeded3x4} × 3×4 downspouts · Extend each downspout 6 ft minimum from foundation per DFW drainage code.`);
  };

  const facts = [
    { icon: '🌧️', label: 'DFW 10-Year Storm Peak', value: '6 in/hr (inner), 5.5 in/hr (outer)' },
    { icon: '📏', label: '4×4 Downspout Capacity', value: '~20.8 GPM' },
    { icon: '📏', label: '3×4 Downspout Capacity', value: '~14.7 GPM' },
    { icon: '🏠', label: '5″ Gutter Max Roof Area', value: '~5,000 sq ft per run' },
    { icon: '📐', label: 'Min Extension from Foundation', value: '6 feet (DFW code)' },
    { icon: '🔢', label: 'Design Standard', value: 'IPC Table 1106.2 + DFW overlay' },
  ];

  const concerns = [
    { q: 'My downspouts splash and erode the yard', a: 'Undersized downspouts for DFW peak rainfall. DFW receives concentrated burst events — 2-3 inches in 30 minutes is common. Add a splash block extending 4 ft and a corrugated extension another 2 ft. Better fix: add underground drain line from downspout to street or retention area.' },
    { q: 'My gutters overflow in heavy rain even though they look fine', a: 'Either undersized gutters, too few downspouts, or too low a slope. 5-inch K-style gutters need 1/16 inch drop per foot minimum. Check for debris blockage first, then measure: if gutters are full and overflowing while downspout handles flow easily, the gutter is undersized for DFW storms.' },
    { q: 'Water pools near my foundation after rain', a: 'Downspouts terminating too close to foundation (under 6 feet) or grading directing water toward house. DFW expansive clay makes this critical — saturated soil near foundation causes heave. Extend all downspouts 6 ft minimum, regrade soil to slope away at 6 inches per 10 feet for first 10 feet.' },
    { q: 'How many downspouts does a 2,500 sqft DFW home need', a: 'Minimum 4 downspouts for a standard 2,500 sqft home in DFW inner zone. At 6 in/hr peak, that roof generates ~155 GPM. Four 4×4 downspouts handle 83 GPM — so space them every 30-40 feet along the gutter run. Many DFW production builders undersize to 2-3 downspouts.' },
  ];

  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌧️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Roof Drainage Calculation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Sizing gutters and downspouts for DFW peak rainfall events</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ DFW Drainage Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {facts.map((f, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', border: '1px solid #2d5a8e' }}>
                <div style={{ fontSize: 22 }}>{f.icon}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>{f.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔢 DFW Drainage Sizing Calculator</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Area (sq ft)</label>
              <input value={roofArea} onChange={e => setRoofArea(e.target.value)} placeholder="e.g. 2500″ style={{ width: '100%', background: '#0A1628', border: '1px solid #2d5a8e', borderRadius: 6, padding: '10px 12px', color: '#e2e8f0', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Zone</label>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d5a8e', borderRadius: 6, padding: '10px 12px', color: '#e2e8f0', fontSize: 14 }}>
                <option value="inner">Inner DFW (Dallas/Tarrant)</option>
                <option value="outer">Outer DFW (Kaufman/Parker/Hood)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Calculate Drainage</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: '14px 16px', border: '1px solid #F5E642', color: '#F5E642', fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 DFW Drainage Problems</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c, i) => (
              <div key={i}>
                <button onClick={() => toggle(i)} style={{ width: '100%', textAlign: 'left', background: open[i] ? '#0d2137′ : '#0A1628', border: '1px solid', borderColor: open[i] ? '#F5E642' : '#2d5a8e', borderRadius: 8, padding: '12px 16px', color: open[i] ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 14, fontWeight: open[i] ? 700 : 400, display: 'flex', justifyContent: 'space-between' }}>
                  {c.q} <span>{open[i] ? '▲' : '▼'}</span>
                </button>
                {open[i] && <div style={{ background: '#0d2137', border: '1px solid #F5E642', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 16px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{c.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 12 }}>
          ProLnk DFW Roofing Guide 2026 · prolnk.io
        </div>
      </div>
    </div>
  );
}
