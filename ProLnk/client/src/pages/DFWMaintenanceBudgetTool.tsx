import { useState } from 'react';

export default function DFWMaintenanceBudgetTool() {
  const [homeValue, setHomeValue] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [hvacAge, setHvacAge] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [results, setResults] = useState<null | {
    annualBudget: number;
    monthlyReserve: number;
    breakdown: { label: string; amount: number; note: string }[];
  }>(null);

  function calculate() {
    const hv = parseFloat(homeValue.replace(/,/g, '')) || 0;
    const age = parseInt(homeAge) || 0;
    const ha = parseInt(hvacAge) || 0;
    const ra = parseInt(roofAge) || 0;

    const basePct = 0.01;
    const ageMult = age > 20 ? 1.4 : age > 10 ? 1.2 : 1.0;
    const dfwMult = 1.15;

    let base = hv * basePct * ageMult * dfwMult;
    const hvacReserve = ha > 10 ? 800 : ha > 7 ? 400 : 150;
    const roofReserve = ra > 15 ? 1200 : ra > 10 ? 600 : 200;
    const poolCost = hasPool ? 2400 : 0;

    const breakdown = [
      { label: '🔧 General Maintenance', amount: Math.round(base * 0.35), note: 'Plumbing, electrical, misc repairs' },
      { label: '❄️ HVAC System', amount: Math.round(base * 0.15 + hvacReserve), note: `Unit age ${ha} yrs — ${ha > 10 ? 'replacement fund active' : 'routine service'}` },
      { label: '🏚️ Roof Reserve', amount: Math.round(base * 0.12 + roofReserve), note: `Roof age ${ra} yrs — ${ra > 15 ? 'nearing replacement' : 'monitoring'}` },
      { label: '🌳 Landscaping / Lawn', amount: Math.round(base * 0.12), note: 'DFW summer heat requires extra irrigation' },
      { label: '🎨 Interior / Exterior Paint', amount: Math.round(base * 0.1), note: 'DFW sun fades exteriors faster' },
      { label: '🪟 Foundation Monitoring', amount: Math.round(base * 0.08), note: 'DFW clay soil — annual inspection recommended' },
      ...(hasPool ? [{ label: '🏊 Pool Maintenance', amount: poolCost, note: 'Chemicals, equipment, cleaning' }] : []),
    ];

    const annualBudget = breakdown.reduce((s, i) => s + i.amount, 0);
    setResults({ annualBudget, monthlyReserve: Math.round(annualBudget / 12), breakdown });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🔧📅</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW Maintenance Budget Tool</h1>
          <p style={{ color: '#4B5563', fontSize: 15 }}>Build your annual home maintenance reserve for North Texas</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          {[
            { label: 'Home Value ($)', value: homeValue, set: setHomeValue, placeholder: '425,000′ },
            { label: 'Home Age (years)', value: homeAge, set: setHomeAge, placeholder: '15′ },
            { label: 'HVAC System Age (years)', value: hvacAge, set: setHvacAge, placeholder: '8′ },
            { label: 'Roof Age (years)', value: roofAge, set: setRoofAge, placeholder: '12′ },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
              <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
              🏊 Home has a pool
            </label>
          </div>
          <div style={{ background: '#FEF9C3', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#92400E', marginBottom: 16 }}>
            🌡️ DFW climate multiplier applied: extreme summer heat and clay soil increase maintenance costs ~15%
          </div>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Build My Budget 🔍
          </button>
        </div>

        {results && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Annual Budget', value: fmt(results.annualBudget) },
                { label: 'Monthly Reserve', value: fmt(results.monthlyReserve) },
              ].map(({ label, value }) => (
                <div key={label} style={{ flex: 1, background: '#F5E642', borderRadius: 8, padding: '14px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#0A1628', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628′ }}>{value}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📋 Budget Breakdown</h3>
            {results.breakdown.map(({ label, amount, note }) => (
              <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid #F3F4F6′ }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>{label}</span>
                  <span style={{ fontWeight: 700 }}>{fmt(amount)}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
