import { useState } from 'react';

interface ChemResult {
  chemical: string;
  amount: string;
  priority: 'critical' | 'high' | 'normal';
  note: string;
}

function calcGallons(shape: string, l: number, w: number, depth: number): number {
  if (shape === 'oval') return Math.round(l * w * depth * 5.9);
  if (shape === 'round') return Math.round(l * l * depth * 5.9);
  return Math.round(l * w * depth * 7.5);
}

function getDFWHeatFactor(waterTemp: number): number {
  if (waterTemp >= 95) return 3.5;
  if (waterTemp >= 90) return 3.0;
  if (waterTemp >= 86) return 2.5;
  if (waterTemp >= 80) return 1.5;
  return 1.0;
}

function calcChemicals(gallons: number, cl: number, ph: number, alk: number, waterTemp: number, cyaLevel: number): ChemResult[] {
  const results: ChemResult[] = [];
  const heatFactor = getDFWHeatFactor(waterTemp);
  const kGal = gallons / 1000;

  const targetCl = Math.min(3.0 + (heatFactor - 1) * 0.5, 5.0);
  if (cl < targetCl - 0.5) {
    const deficit = targetCl - cl;
    const ozNeeded = Math.round(deficit * kGal * 16 * heatFactor);
    results.push({
      chemical: '⚡ Liquid Chlorine (10%)',
      amount: `${ozNeeded} oz (${(ozNeeded / 128).toFixed(1)} gallons)`,
      priority: cl < 1.0 ? 'critical' : 'high',
      note: waterTemp >= 86 ? `DFW heat alert: Add ${Math.round(ozNeeded * 0.3)} oz extra — chlorine depletes ${heatFactor}x faster above ${waterTemp}°F` : 'Chlorine low — add and retest in 4 hours',
    });
  } else if (cl > 5.0) {
    results.push({
      chemical: '☀️ Chlorine Action',
      amount: 'No addition needed',
      priority: 'normal',
      note: 'Chlorine high — run filter, let sunlight naturally lower levels. Do not add more chlorine.',
    });
  }

  if (ph < 7.2) {
    const lbsNeeded = Math.round((7.4 - ph) * kGal * 1.5 * 10) / 10;
    results.push({
      chemical: '📈 Soda Ash (pH Up)',
      amount: `${lbsNeeded} lbs`,
      priority: ph < 7.0 ? 'critical' : 'high',
      note: 'Low pH corrodes equipment and irritates eyes. DFW tap water tends acidic — check pH weekly.',
    });
  } else if (ph > 7.8) {
    const ozNeeded = Math.round((ph - 7.6) * kGal * 26 * 10) / 10;
    results.push({
      chemical: '📉 Muriatic Acid (pH Down)',
      amount: `${ozNeeded} oz (${(ozNeeded / 128).toFixed(1)} gallons)`,
      priority: ph > 8.0 ? 'high' : 'normal',
      note: 'High pH reduces chlorine effectiveness — critical in DFW summers when you need max chlorine power.',
    });
  }

  if (alk < 80) {
    const lbsNeeded = Math.round((100 - alk) * kGal * 0.017 * 10) / 10;
    results.push({
      chemical: '🔼 Baking Soda (Alkalinity Up)',
      amount: `${lbsNeeded} lbs`,
      priority: alk < 60 ? 'high' : 'normal',
      note: 'Low alkalinity causes pH swings. DFW pools with lots of swimmers need stable alkalinity.',
    });
  } else if (alk > 140) {
    results.push({
      chemical: '🔽 Muriatic Acid (Alk Down)',
      amount: `${Math.round((alk - 120) * kGal * 0.012 * 10) / 10} lbs equivalent`,
      priority: 'normal',
      note: 'High alkalinity makes pH hard to adjust. Add acid slowly and aerate to bring down.',
    });
  }

  if (cyaLevel < 30) {
    const lbsNeeded = Math.round((50 - cyaLevel) * kGal * 0.013 * 10) / 10;
    results.push({
      chemical: '🛡️ Cyanuric Acid (CYA / Stabilizer)',
      amount: `${lbsNeeded} lbs`,
      priority: cyaLevel < 10 ? 'critical' : 'high',
      note: 'DFW sun destroys unstabilized chlorine in hours. CYA is essential in Texas. Target 40–80 ppm.',
    });
  } else if (cyaLevel > 100) {
    results.push({
      chemical: '💧 Partial Drain Required',
      amount: `Drain ${Math.round(((cyaLevel - 80) / cyaLevel) * 100)}% of pool`,
      priority: 'high',
      note: 'CYA too high (chlorine lock). Partial drain and refill is the only fix. DFW water loss — do in cooler months.',
    });
  }

  if (results.length === 0) {
    results.push({
      chemical: '✅ Chemistry Balanced',
      amount: 'No additions needed',
      priority: 'normal',
      note: waterTemp >= 86 ? `DFW heat mode: Recheck chlorine every 2–3 days at ${waterTemp}°F water temp.` : 'Your pool chemistry looks great! Recheck weekly.',
    });
  }

  return results;
}

const priorityColor = { critical: '#EF4444', high: '#F59E0B', normal: '#22C55E' };
const priorityLabel = { critical: '🚨 CRITICAL', high: '⚠️ HIGH', normal: '✅ NORMAL' };

export default function DFWPoolChemistryCalc() {
  const [shape, setShape] = useState('rectangle');
  const [length, setLength] = useState('30');
  const [width, setWidth] = useState('15');
  const [depth, setDepth] = useState('5');
  const [customGallons, setCustomGallons] = useState('');
  const [cl, setCl] = useState('');
  const [ph, setPh] = useState('');
  const [alk, setAlk] = useState('');
  const [waterTemp, setWaterTemp] = useState('85');
  const [cya, setCya] = useState('');
  const [results, setResults] = useState<ChemResult[] | null>(null);
  const [gallons, setGallons] = useState(0);

  function calculate() {
    const g = customGallons ? parseInt(customGallons) : calcGallons(shape, parseFloat(length), parseFloat(width), parseFloat(depth));
    const hf = getDFWHeatFactor(parseFloat(waterTemp));
    const res = calcChemicals(g, parseFloat(cl) || 0, parseFloat(ph) || 7.4, parseFloat(alk) || 100, parseFloat(waterTemp) || 85, parseFloat(cya) || 50);
    setGallons(g);
    setResults(res);
  }

  const hf = getDFWHeatFactor(parseFloat(waterTemp) || 85);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW POOL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          🧪 DFW Pool Chemistry Calculator
        </h1>
        <p style={{ color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6 }}>
          The hardest part of DFW pool ownership is chemistry during extreme heat. Above 86°F water temp, chlorine depletes 3x faster. Enter your readings for DFW-adjusted recommendations.
        </p>

        {parseFloat(waterTemp) >= 86 && (
          <div style={{ background: '#EF4444', color: '#fff', borderRadius: 10, padding: '14px 18px', marginBottom: 20, fontWeight: 700, fontSize: 14 }}>
            🌡️ DFW HEAT MODE: At {waterTemp}°F water temp, chlorine depletes {hf.toFixed(1)}x faster than normal. Check chemistry every 2–3 days, not weekly.
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, margin: '0 0 16px' }}>📐 Pool Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>SHAPE</label>
              <select value={shape} onChange={e => setShape(e.target.value)} style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13 }}>
                <option value="rectangle">Rectangle</option>
                <option value="oval">Oval</option>
                <option value="round">Round</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>LENGTH (ft)</label>
              <input type="number" value={length} onChange={e => setLength(e.target.value)} style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>WIDTH (ft)</label>
              <input type="number" value={width} onChange={e => setWidth(e.target.value)} style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>AVG DEPTH (ft)</label>
              <input type="number" value={depth} onChange={e => setDepth(e.target.value)} style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>OR ENTER EXACT GALLONS</label>
            <input type="number" value={customGallons} onChange={e => setCustomGallons(e.target.value)} placeholder="Leave blank to calculate from dimensions" style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>🌡️ Current Readings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            {[
              { label: 'CHLORINE (ppm)', val: cl, set: setCl, placeholder: 'e.g. 2.0′ },
              { label: 'pH', val: ph, set: setPh, placeholder: 'e.g. 7.4′ },
              { label: 'ALKALINITY (ppm)', val: alk, set: setAlk, placeholder: 'e.g. 100′ },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>{f.label}</label>
                <input type="number" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>WATER TEMP (°F)</label>
              <input type="number" value={waterTemp} onChange={e => setWaterTemp(e.target.value)} style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#94A3B8', marginBottom: 5 }}>CYA / STABILIZER (ppm)</label>
              <input type="number" value={cya} onChange={e => setCya(e.target.value)} placeholder="e.g. 50″ style={{ width: '100%', padding: '9px', background: '#0A1628', border: '1px solid #2D4060', borderRadius: 7, color: '#E8EDF5', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>

        <button onClick={calculate} style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 28 }}>
          Calculate DFW Chemical Additions →
        </button>

        {results && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>🧪 Your DFW Chemical Plan</h2>
              <div style={{ background: '#1E2D45', borderRadius: 8, padding: '6px 14px', fontSize: 13 }}>Pool: <strong style={{ color: '#F5E642′ }}>{gallons.toLocaleString()} gallons</strong></div>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {results.map((r, i) => (
                <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, borderLeft: `4px solid ${priorityColor[r.priority]}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{r.chemical}</div>
                    <div style={{ background: priorityColor[r.priority], color: '#fff', borderRadius: 16, padding: '3px 12px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{priorityLabel[r.priority]}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{r.amount}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{r.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', marginTop: 16, fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>
              💡 <strong style={{ color: '#E8EDF5′ }}>DFW Tip:</strong> Always add chemicals with pump running. Add chemicals separately — wait 15 mins between additions. DFW summer rule: recheck chlorine every 2–3 days when water temp exceeds 86°F.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
