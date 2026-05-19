import { useState } from 'react';

type Month = 'jun' | 'jul' | 'aug' | 'sep' | 'other';
const monthMultiplier: Record<Month, number> = { jun: 1.3, jul: 1.5, aug: 1.5, sep: 1.3, other: 1.0 };

const culprits = [
  { id: 'ac', label: '❄️ AC Runtime', pct: 55, tip: 'Raise thermostat 2°F = ~5% bill savings. Install a smart thermostat.' },
  { id: 'hvac_eff', label: '🔧 Inefficient HVAC', pct: 20, tip: 'A unit over 10 years old or with a SEER below 14 may cost 30% more to run.' },
  { id: 'phantom', label: '👻 Phantom Loads', pct: 10, tip: 'TVs, gaming consoles, and chargers use power 24/7. Use smart power strips.' },
  { id: 'water', label: '🚿 Water Heater', pct: 8, tip: 'Set water heater to 120°F. Insulate the first 6 feet of hot water pipes.' },
  { id: 'pool', label: '🏊 Pool Pump', pct: 7, tip: 'Variable-speed pool pumps save up to 90% over single-speed models.' },
];

export default function DFWHighElectricBillGuide() {
  const [bill, setBill] = useState('');
  const [sqft, setSqft] = useState('');
  const [month, setMonth] = useState<Month | ''>('');
  const [result, setResult] = useState<null | { perSqft: number; top: string; savings: string }>(null);

  function assess() {
    if (!bill || !sqft || !month) return;
    const billNum = parseFloat(bill);
    const sqftNum = parseFloat(sqft);
    const mult = monthMultiplier[month as Month];
    const perSqft = billNum / sqftNum;
    const top = perSqft > 0.25 ? 'AC efficiency is your #1 culprit.' : perSqft > 0.15 ? 'Phantom loads + water heater likely contributors.' : 'Your usage is near average for DFW.';
    const savings = `~$${Math.round(billNum * 0.12 * mult)}/mo potential savings with smart thermostat + LED lighting.`;
    setResult({ perSqft: Math.round(perSqft * 100) / 100, top, savings });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>💡 DFW High Electric Bill Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW summer electric bills routinely hit $300–$600+. Here's how to find what's driving yours and fix it.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📊 What's Eating Your Bill</div>
          {culprits.map(c => (
            <div key={c.id} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: '#cbd5e1' }}>{c.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{c.pct}%</span>
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: 4, height: 8, marginBottom: '0.3rem' }}>
                <div style={{ background: '#F5E642', height: 8, borderRadius: 4, width: `${c.pct}%` }} />
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{c.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Bill Analyzer</div>
          {[
            { label: 'Monthly Bill ($)', value: bill, setter: setBill, type: 'number', placeholder: '350' },
            { label: 'Home Size (sq ft)', value: sqft, setter: setSqft, type: 'number', placeholder: '2000' },
          ].map(({ label, value, setter, type, placeholder }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>DFW Month</div>
            <select value={month} onChange={e => setMonth(e.target.value as Month)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155' }}>
              <option value="">Select...</option>
              {[['jun', 'June'], ['jul', 'July'], ['aug', 'August'], ['sep', 'September'], ['other', 'Other month']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>Analyze My Bill</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: '#001a2e', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>Your cost: ${result.perSqft}/sq ft</div>
              <div style={{ color: '#cbd5e1', margin: '0.5rem 0' }}>{result.top}</div>
              <div style={{ color: '#4ade80' }}>💰 {result.savings}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🌡️ DFW Oncor Tip</div>
          <div style={{ color: '#94a3b8' }}>Oncor customers can request a free Smart Meter data download showing hour-by-hour usage — pinpoint exactly when your bill spikes at <span style={{ color: '#F5E642' }}>smartmetertexas.com</span>.</div>
        </div>
      </div>
    </div>
  );
}
