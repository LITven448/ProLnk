import { useState } from 'react';

export default function DFWHVACMonthlyBillDFW2026() {
  const [homeSqft, setHomeSqft] = useState(2000);
  const [currentBill, setCurrentBill] = useState(400);
  const [hasMerv13, setHasMerv13] = useState(false);
  const [hasVariableSpeed, setHasVariableSpeed] = useState(false);
  const [setpointIncrease, setSetpointIncrease] = useState(0);

  const setpointSavings = currentBill * (setpointIncrease * 0.04);
  const filterSavings = hasMerv13 ? currentBill * 0.125 : 0;
  const variableSavings = hasVariableSpeed ? currentBill * 0.25 : 0;
  const totalSavings = setpointSavings + filterSavings + variableSavings;
  const newBill = Math.max(0, currentBill - totalSavings);
  const annualSavings = totalSavings * 12;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Monthly Electric Bill Reduction
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            2026 Calculator — DFW summer avg $300–500 for 2,000 sqft homes
          </p>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Your Home</h2>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Home Size (sqft)</label>
          <input type='range' min={800} max={5000} step={100} value={homeSqft}
            onChange={e => setHomeSqft(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 4 }} />
          <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{homeSqft.toLocaleString()} sqft</p>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Current Monthly Electric Bill ($)</label>
          <input type='range' min={100} max={900} step={10} value={currentBill}
            onChange={e => setCurrentBill(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 4 }} />
          <p style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>${currentBill}</p>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚙️ Efficiency Upgrades</h2>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>
            🌡️ Setpoint Increase (+{setpointIncrease}°F) — saves 3–5% per degree
          </label>
          <input type='range' min={0} max={5} step={1} value={setpointIncrease}
            onChange={e => setSetpointIncrease(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 16 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 14, backgroundColor: hasMerv13 ? '#1a2d50' : '#0d1c33', borderRadius: 8, border: hasMerv13 ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
              <input type='checkbox' checked={hasMerv13} onChange={e => setHasMerv13(e.target.checked)} />
              <span>
                <strong>MERV-13 Filter</strong>
                <span style={{ color: '#94a3b8', fontSize: 13, display: 'block' }}>Saves 10–15% vs dirty filter — ${Math.round(filterSavings)}/mo</span>
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: 14, backgroundColor: hasVariableSpeed ? '#1a2d50' : '#0d1c33', borderRadius: 8, border: hasVariableSpeed ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
              <input type='checkbox' checked={hasVariableSpeed} onChange={e => setHasVariableSpeed(e.target.checked)} />
              <span>
                <strong>Variable Speed System</strong>
                <span style={{ color: '#94a3b8', fontSize: 13, display: 'block' }}>Saves 20–30% vs single stage — ${Math.round(variableSavings)}/mo</span>
              </span>
            </label>
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2d50', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 36 }}>💡</div>
          <p style={{ color: '#94a3b8', marginBottom: 4 }}>Estimated New Monthly Bill</p>
          <p style={{ fontSize: 42, fontWeight: 700, color: '#F5E642', margin: '4px 0' }}>${Math.round(newBill)}</p>
          <p style={{ color: '#4ade80', fontSize: 18 }}>Save ${Math.round(totalSavings)}/mo · ${Math.round(annualSavings)}/yr</p>
          <div style={{ marginTop: 20 }}>
            <a href='https://prolnk.io' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
              Find a Charter HVAC Pro on ProLnk →
            </a>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }}>
          Estimates based on DFW 2026 averages · Actual savings vary by system age and usage patterns
        </p>
      </div>
    </div>
  );
}