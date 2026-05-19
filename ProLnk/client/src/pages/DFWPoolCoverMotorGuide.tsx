import { useState } from 'react';

export default function DFWPoolCoverMotorGuide() {
  const [poolSize, setPoolSize] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<null | { cover: string; motor: string; brand: string; cost: string; notes: string }>(null);

  function calculate() {
    if (!poolSize || !priority) return;
    const size = parseInt(poolSize);
    let cover = '', motor = '', brand = '', cost = '', notes = '';
    if (priority === 'safety') {
      cover = 'Automatic Safety Cover';
      motor = 'Electric Motor (direct drive)';
      brand = 'Coverstar CS6000';
      cost = size < 400 ? '$8,500–$12,000′ : '$12,000–$18,000';
      notes = 'Meets ASTM F1346 safety standard. Electric motors preferred for DFW—hydraulic lines can fail in 100°F+ heat.';
    } else if (priority === 'evaporation') {
      cover = 'Solar Safety Cover or Automatic Solid Cover';
      motor = 'Electric Motor (reel system)';
      brand = 'Covertech Grando';
      cost = size < 400 ? '$6,000–$9,500′ : '$9,500–$15,000';
      notes = 'DFW pools lose 1–2 inches per week to evaporation in summer. A solid cover reduces loss by 95%. Saves 10,000–30,000 gallons/year.';
    } else {
      cover = 'Insulated Automatic Cover';
      motor = 'Hydraulic Motor (better torque in heat)';
      brand = 'Coverstar Atlantic';
      cost = size < 400 ? '$9,000–$14,000′ : '$14,000–$22,000';
      notes = 'DFW pools can reach 95°F+ without cover. Insulated covers reduce solar gain by 75%. Hydraulic motors handle large covers better in heat.';
    }
    setResult({ cover, motor, brand, cost, notes });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🏊</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Pool Cover & Motor Guide</h1>
        </div>
        <p style={{ color: '#9BAEC8', marginBottom: 28 }}>Automatic pool covers for North Texas conditions — hail, heat, and extreme evaporation.</p>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>☀️ Why DFW Needs Automatic Covers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '💧', label: 'Evaporation Rate', value: '1–2 inches/week in summer' },
              { icon: '🌡️', label: 'Pool Temp Without Cover', value: 'Up to 95°F+ in July' },
              { icon: '⛈️', label: 'Hail Events/Year', value: '4–8 significant events' },
              { icon: '💰', label: 'Annual Water Savings', value: '10,000–30,000 gallons' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 12, color: '#9BAEC8', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 15 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Motor Type Comparison</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1A3055′ }}>
                {['Feature', 'Electric (Direct Drive)', 'Hydraulic'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#9BAEC8′ }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['DFW Heat Performance', '✅ Excellent', '⚠️ Lines can expand/leak'],
                ['Torque for Large Pools', '⚠️ Moderate', '✅ Superior'],
                ['Maintenance', '✅ Low', '⚠️ Fluid checks needed'],
                ['Cost', '$800–$1,500', '$1,500–$3,000'],
                ['Lifespan', '10–15 years', '12–20 years'],
              ].map(row => (
                <tr key={row[0]} style={{ borderBottom: '1px solid #0A1628′ }}>
                  {row.map((cell, i) => (
                    <td key={i} style={{ padding: '10px 12px', color: i === 0 ? '#E8EDF5′ : '#9BAEC8' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your DFW Recommendation</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Pool Surface Area (sq ft)</label>
              <input type="number" placeholder="e.g. 400″ value={poolSize} onChange={e => setPoolSize(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Top DFW Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select priority...</option>
                <option value="safety">Child/Pet Safety</option>
                <option value="evaporation">Reduce Evaporation & Water Bills</option>
                <option value="heat">Control Water Temperature</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Get Recommendation →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Cover Type</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginTop: 2 }}>{result.cover}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Motor Type</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.motor}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Recommended Brand</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.brand}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Installed Cost Range</span><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{result.cost}</div></div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14, marginTop: 4 }}>
                  <div style={{ color: '#9BAEC8', fontSize: 12, marginBottom: 4 }}>📍 DFW Notes</div>
                  <div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p style={{ color: '#4A6080', fontSize: 13, textAlign: 'center' }}>Estimates based on DFW market pricing. Get 3 quotes from licensed pool contractors.</p>
      </div>
    </div>
  );
}
