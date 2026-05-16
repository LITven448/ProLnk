import { useState } from 'react';

export default function DFWHVACDFWBenchmark() {
  const [sqft, setSqft] = useState('');
  const [monthly, setMonthly] = useState('');
  const [runtime, setRuntime] = useState('');
  const [maintCost, setMaintCost] = useState('');
  const [result, setResult] = useState('');

  function benchmark() {
    const sf = parseFloat(sqft);
    const bill = parseFloat(monthly);
    const rt = parseFloat(runtime);
    const mc = parseFloat(maintCost);

    if (!sf || !bill) { setResult('⚠️ Enter at least square footage and monthly electric bill to benchmark.'); return; }

    const kwhPerSqft = bill / (sf * 0.000293 * 1000);
    const dfwAvgBill = sf * 0.18;
    const vsAvg = bill - dfwAvgBill;
    const vsAvgPct = Math.round((vsAvg / dfwAvgBill) * 100);

    let energyNote = '';
    if (vsAvgPct < -15) energyNote = `⚡ Exceptional — ${Math.abs(vsAvgPct)}% below DFW average. Your system is performing in the top tier for DFW homes.`;
    else if (vsAvgPct < 0) energyNote = `✅ Good — ${Math.abs(vsAvgPct)}% below DFW average. Minor efficiency gains still available.`;
    else if (vsAvgPct < 20) energyNote = `🟡 Near average — ${vsAvgPct}% above DFW norm. Worth a tune-up to close the gap.`;
    else energyNote = `🔴 High — ${vsAvgPct}% above DFW average. Likely causes: aged system, duct leaks, or undersizing. ProLnk can connect you with a DFW HVAC specialist.`;

    let runtimeNote = '';
    if (rt) {
      if (rt < 12) runtimeNote = ' Runtime: ✅ Under 12 hrs/day is healthy for DFW summers.';
      else if (rt < 16) runtimeNote = ' Runtime: 🟡 12–16 hrs/day is borderline — check refrigerant and filter.';
      else runtimeNote = ' Runtime: 🔴 16+ hrs/day in DFW summer may indicate undersizing or refrigerant loss.';
    }

    let maintNote = '';
    if (mc) {
      const dfwMaintAvg = 450;
      if (mc < dfwMaintAvg * 0.7) maintNote = ` Maintenance cost: ✅ Below DFW average ($${dfwMaintAvg}/yr) — good value.`;
      else if (mc < dfwMaintAvg * 1.3) maintNote = ` Maintenance cost: 🟡 Near DFW average — normal range.`;
      else maintNote = ` Maintenance cost: 🔴 Above DFW average — consider a service contract which often reduces per-visit costs.`;
    }

    setResult(`${energyNote}${runtimeNote}${maintNote}`);
  }

  const inputStyle = { background: '#1e3a5f', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 14px', color: 'white', fontSize: 15, width: '100%', boxSizing: 'border-box' as const };
  const labelStyle = { color: '#94a3b8', fontSize: 14, marginBottom: 6, display: 'block' };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Benchmark 📊</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          How does your DFW HVAC system measure up? National efficiency averages don't apply in north Texas. Enter your numbers below to see where you stand against real DFW benchmarks — energy use per square foot, runtime hours, and annual maintenance cost.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>📐 DFW Benchmark Averages (for reference)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { label: 'Monthly electric bill', value: '$180–$320', note: 'per 2,000 sq ft summer' },
              { label: 'AC runtime', value: '12–14 hrs/day', note: 'peak DFW summer' },
              { label: 'Annual maintenance', value: '$350–$550', note: 'tune-ups + repairs' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1e3a5f', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{item.value}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{item.label}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🏠 Enter Your DFW Home Profile</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div><label style={labelStyle}>Home square footage *</label><input style={inputStyle} placeholder="e.g. 2400" value={sqft} onChange={e => setSqft(e.target.value)} /></div>
            <div><label style={labelStyle}>Average summer monthly electric bill ($) *</label><input style={inputStyle} placeholder="e.g. 280" value={monthly} onChange={e => setMonthly(e.target.value)} /></div>
            <div><label style={labelStyle}>AC runtime on hot days (hours/day, optional)</label><input style={inputStyle} placeholder="e.g. 14" value={runtime} onChange={e => setRuntime(e.target.value)} /></div>
            <div><label style={labelStyle}>Annual HVAC maintenance cost ($, optional)</label><input style={inputStyle} placeholder="e.g. 450" value={maintCost} onChange={e => setMaintCost(e.target.value)} /></div>
          </div>
          <button onClick={benchmark}
            style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Benchmark My DFW HVAC →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#1e3a5f', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.8, fontSize: 15 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>📈 Track Your Benchmark Over Time</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ProLnk's Home Health Vault logs your benchmarks each season so you can see performance trends over years — not just snapshots. Join the waitlist at prolnk.io.</div>
        </div>
      </div>
    </div>
  );
}
