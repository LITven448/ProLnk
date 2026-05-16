import { useState } from 'react';

export default function DFWAtticVentCalc2026() {
  const [sqft, setSqft] = useState('');
  const [hasVaporBarrier, setHasVaporBarrier] = useState(false);
  const [existingIntake, setExistingIntake] = useState('');
  const [existingExhaust, setExistingExhaust] = useState('');
  const [result, setResult] = useState<null | { ratio: string; required: number; intake: number; exhaust: number; intakeGap: number; exhaustGap: number; status: string }>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    if (!area || area <= 0) return;
    const ratio = hasVaporBarrier ? 300 : 150;
    const required = Math.ceil(area / ratio);
    const half = Math.ceil(required / 2);
    const curIntake = parseFloat(existingIntake) || 0;
    const curExhaust = parseFloat(existingExhaust) || 0;
    const intakeGap = Math.max(0, half - curIntake);
    const exhaustGap = Math.max(0, half - curExhaust);
    const status = intakeGap === 0 && exhaustGap === 0 ? 'Compliant' : intakeGap + exhaustGap < required * 0.25 ? 'Minor Deficit' : 'Significant Deficit';
    setResult({ ratio: `1:${ratio}`, required, intake: half, exhaust: half, intakeGap, exhaustGap, status });
  };

  const statusColor = result?.status === 'Compliant' ? '#22c55e' : result?.status === 'Minor Deficit' ? '#F5E642' : '#ef4444';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🧮</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Attic Ventilation Calculator 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Calculate net free area needed for your DFW attic</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, border: '1px solid #2a3a5c' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📐</div>
            <h3 style={{ color: '#F5E642', margin: '0 0 6px' }}>Standard Ratio</h3>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>1 sq ft NFA per <strong>150 sq ft</strong> attic floor area. Required by IRC for most DFW attics.</p>
          </div>
          <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, border: '1px solid #2a3a5c' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
            <h3 style={{ color: '#F5E642', margin: '0 0 6px' }}>With Vapor Barrier</h3>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>1 sq ft NFA per <strong>300 sq ft</strong> with qualifying vapor barrier on attic floor.</p>
          </div>
          <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, border: '1px solid #2a3a5c' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>⚖️</div>
            <h3 style={{ color: '#F5E642', margin: '0 0 6px' }}>Balanced Airflow</h3>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>50% intake (soffit) / 50% exhaust (ridge). Imbalance reduces effectiveness by up to 40%.</p>
          </div>
          <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, border: '1px solid #2a3a5c' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📏</div>
            <h3 style={{ color: '#F5E642', margin: '0 0 6px' }}>Measuring NFA</h3>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>Net Free Area is stamped on vent product. Not the same as vent opening size — accounts for screens/louvers.</p>
          </div>
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📊 Calculate Your Needs</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Attic Square Footage</label>
            <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 1800" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14 }}>Existing Intake NFA (sq in)</label>
              <input type="number" value={existingIntake} onChange={e => setExistingIntake(e.target.value)} placeholder="0" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14 }}>Existing Exhaust NFA (sq in)</label>
              <input type="number" value={existingExhaust} onChange={e => setExistingExhaust(e.target.value)} placeholder="0" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
            <input type="checkbox" checked={hasVaporBarrier} onChange={e => setHasVaporBarrier(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
            <span style={{ color: '#cbd5e1' }}>Attic has qualifying vapor barrier (use 1:300 ratio)</span>
          </label>
          <button onClick={calculate} disabled={!sqft} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: sqft ? 'pointer' : 'not-allowed', opacity: sqft ? 1 : 0.5 }}>Calculate Ventilation Needs</button>
        </div>
        {result && (
          <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: `2px solid ${statusColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', margin: 0 }}>Results</h2>
              <span style={{ background: statusColor, color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>{result.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Applied Ratio', result.ratio], ['Total NFA Required', `${result.required} sq in`], ['Intake Required', `${result.intake} sq in`], ['Exhaust Required', `${result.exhaust} sq in`], ['Intake Gap', `${result.intakeGap} sq in`], ['Exhaust Gap', `${result.exhaustGap} sq in`]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', padding: 12, borderRadius: 8 }}>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: 12 }}>{label}</p>
                  <p style={{ margin: 0, color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}