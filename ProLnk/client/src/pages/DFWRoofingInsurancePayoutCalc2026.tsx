import { useState } from 'react';

export default function DFWRoofingInsurancePayoutCalc2026() {
  const [homeValue, setHomeValue] = useState('');
  const [deductible, setDeductible] = useState('2');
  const [damage, setDamage] = useState('');
  const [rcv, setRcv] = useState(true);
  const [result, setResult] = useState<null | { gross: number; deductibleAmt: number; net: number; withOP: number }>(null);

  const calculate = () => {
    const val = parseFloat(homeValue) || 0;
    const dmg = parseFloat(damage) || 0;
    const ded = (parseFloat(deductible) / 100) * val;
    const gross = Math.min(dmg, val * 0.8);
    const net = Math.max(0, gross - ded);
    const withOP = rcv ? net * 1.15 : net * 0.8;
    setResult({ gross, deductibleAmt: ded, net, withOP });
  };

  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Roofing Insurance Payout Calculator</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Estimate your DFW wind/hail roofing claim value before your adjuster visit. Know what to expect.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🌪️', label: 'Wind/Hail Ded.', value: '1–5%' },
            { icon: '🔄', label: 'RCV Advantage', value: '+20–30%' },
            { icon: '🧰', label: 'O&P Added', value: '15%' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Estimate Your Payout</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 4 }}>Dwelling Coverage Limit ($)</label>
              <input value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder="e.g. 350000″
                style={{ width: '100%', backgroundColor: '#1A2F50', border: '1px solid #2A3F60', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 4 }}>Wind/Hail Deductible (%)</label>
              <select value={deductible} onChange={e => setDeductible(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1A2F50', border: '1px solid #2A3F60', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}>
                {['1','2','3','4','5'].map(v => <option key={v} value={v}>{v}%</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 4 }}>Estimated Damage Value ($)</label>
              <input value={damage} onChange={e => setDamage(e.target.value)} placeholder="e.g. 18000″
                style={{ width: '100%', backgroundColor: '#1A2F50', border: '1px solid #2A3F60', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" checked={rcv} onChange={e => setRcv(e.target.checked)} id="rcv" />
              <label htmlFor="rcv" style={{ color: '#CBD5E1', fontSize: 14 }}>I have RCV (Replacement Cost Value) coverage</label>
            </div>
            <button onClick={calculate}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Calculate Estimate
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#162040', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Estimated Claim Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#CBD5E1', fontSize: 14 }}>
                <div>Gross damage covered: <strong style={{ color: '#fff' }}>{fmt(result.gross)}</strong></div>
                <div>Wind/hail deductible: <strong style={{ color: '#FF6B6B' }}>-{fmt(result.deductibleAmt)}</strong></div>
                <div>Net before O&P: <strong style={{ color: '#fff' }}>{fmt(result.net)}</strong></div>
                <div style={{ borderTop: '1px solid #2A3F60', paddingTop: 8, marginTop: 4 }}>
                  Estimated payout (with O&P/RCV): <strong style={{ color: '#F5E642', fontSize: 16 }}>{fmt(result.withOP)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📍 Get a DFW Roofing Estimate</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 4 }}>ProLnk connects DFW homeowners with vetted insurance-experienced roofers.</div>
        </div>
      </div>
    </div>
  );
}
