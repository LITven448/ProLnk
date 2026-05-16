import { useState } from 'react';

export default function DFWSolarInverterGuide() {
  const [roofType, setRoofType] = useState('');
  const [shade, setShade] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { type: string; brand: string; cost: string; warranty: string; hailNote: string; pros: string[]; cons: string[] }>(null);

  function calculate() {
    if (!roofType || !shade || !budget) return;
    let type = '', brand = '', cost = '', warranty = '', hailNote = '', pros: string[] = [], cons: string[] = [];

    if (shade === 'high' || budget === 'premium') {
      type = 'Microinverters';
      brand = 'Enphase IQ8 Series';
      cost = budget === 'value' ? '$0.35–$0.45/W premium over string' : '$0.35–$0.45/W premium — recommended in DFW';
      warranty = '25 years (Enphase) — outlasts panels';
      hailNote = 'Distributed architecture = reduced hail risk. Each panel has its own inverter under the panel. If one fails from hail damage, others keep producing. String failure kills whole array.';
      pros = ['Shade tolerance: each panel optimized independently', 'Panel-level monitoring — spot failures immediately', 'No single point of failure — DFW hail resilient', 'Safer: DC electricity only at panel level'];
      cons = ['20–25% higher upfront cost', 'More components on roof (more failure points long-term)', 'Harder to replace if discontinued'];
    } else if (roofType === 'complex' && shade === 'partial') {
      type = 'Power Optimizers + String Inverter';
      brand = 'SolarEdge S440 + SE7600H';
      cost = '$0.15–$0.25/W premium over pure string';
      warranty = '25-year optimizer + 12-year inverter';
      hailNote = 'Better than string-only for DFW hail — optimizers are small distributed units. Inverter is ground/wall mounted, protected from hail. Good DFW compromise.';
      pros = ['Panel-level optimization without full microinverter cost', 'Inverter protected from weather (ground mounted)', 'Module-level monitoring', 'Better than string for partial shade'];
      cons = ['More complex than pure string', 'Two points of failure (optimizer + inverter)', 'SolarEdge inverter warranty shorter than Enphase'];
    } else {
      type = 'String Inverter';
      brand = budget === 'value' ? 'Fronius Primo or SMA Sunny Boy' : 'SMA Sunny Tripower X';
      cost = 'Base cost — $800–$2,000 for inverter only';
      warranty = '10–12 years standard (extend to 20 optional)';
      hailNote = 'String inverters mount inside garage or on shaded exterior wall — completely protected from DFW hail. If all panels face same direction with no shade, string is reliable and cost-effective.';
      pros = ['Lowest upfront cost', 'Inverter is ground/wall-mounted — protected from DFW hail', 'Simplest system — easiest to service', 'DFW has strong string inverter service network'];
      cons = ['One shade panel reduces whole string output', 'No panel-level monitoring', 'Single point of failure for whole system'];
    }
    setResult({ type, brand, cost, warranty, hailNote, pros, cons });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>☀️</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Solar Inverter Guide</h1>
        </div>
        <p style={{ color: '#9BAEC8', marginBottom: 28 }}>DFW hail makes inverter choice matter more than anywhere else. Here's how to choose right.</p>
        <div style={{ background: '#1A0820', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '3px solid #F5A642' }}>
          <span style={{ color: '#F5A642', fontWeight: 700 }}>⛈️ DFW Hail Factor: </span>
          <span style={{ color: '#E8EDF5', fontSize: 14 }}>DFW averages 4–8 significant hail events/year. A string inverter failure kills your entire array. Distributed microinverters mean one damaged panel = one panel offline, rest keep producing.</span>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Inverter Type Comparison for DFW</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1A3055' }}>
                {['', 'String Inverter', 'Power Optimizer', 'Microinverter'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#F5E642' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['DFW Hail Risk', '⚠️ High (single point)', '✅ Medium', '✅ Low (distributed)'],
                ['Shade Tolerance', '❌ Poor', '✅ Good', '✅ Best'],
                ['Upfront Cost', '✅ Lowest', '⚠️ Medium', '⚠️ Highest'],
                ['Monitoring', 'System only', 'Panel-level', 'Panel-level'],
                ['Warranty', '10–12 yr', '25 yr optimizer', '25 yr'],
              ].map(row => (
                <tr key={row[0]} style={{ borderBottom: '1px solid #0A1628' }}>
                  {row.map((cell, i) => (
                    <td key={i} style={{ padding: '9px 10px', color: i === 0 ? '#E8EDF5' : '#9BAEC8', fontWeight: i === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your DFW Inverter Recommendation</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>DFW Roof Type</label>
              <select value={roofType} onChange={e => setRoofType(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select roof type...</option>
                <option value="simple">Simple (single south-facing pitch)</option>
                <option value="complex">Complex (multiple pitches or orientations)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Shade on Roof</label>
              <select value={shade} onChange={e => setShade(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select shade level...</option>
                <option value="none">None — full DFW sun all day</option>
                <option value="partial">Partial — trees or chimney shadow</option>
                <option value="high">Significant shade on panels</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Budget Priority</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select budget...</option>
                <option value="value">Minimize upfront cost</option>
                <option value="premium">Best long-term value for DFW</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Get DFW Recommendation →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Inverter Type</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 2 }}>{result.type}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Recommended Brand</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.brand}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Cost Premium</span><div style={{ color: '#E8EDF5', marginTop: 2 }}>{result.cost}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Warranty</span><div style={{ color: '#E8EDF5', marginTop: 2 }}>{result.warranty}</div></div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#F5A642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>⛈️ DFW Hail Assessment</div>
                  <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{result.hailNote}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>✅ Pros</div>
                    {result.pros.map(p => <div key={p} style={{ color: '#9BAEC8', fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
                  </div>
                  <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F87171', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>⚠️ Cons</div>
                    {result.cons.map(c => <div key={c} style={{ color: '#9BAEC8', fontSize: 13, marginBottom: 4 }}>• {c}</div>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p style={{ color: '#4A6080', fontSize: 13, textAlign: 'center' }}>Work with a NABCEP-certified DFW solar installer. Verify hail warranty coverage before signing.</p>
      </div>
    </div>
  );
}
