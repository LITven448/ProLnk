import { useState } from 'react';

const SUBURBS = ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Frisco', 'McKinney', 'Irving', 'Garland', 'Allen', 'Southlake'];
const POOL_TYPES = ['Standard in-ground', 'Large in-ground (40ft+)', 'Heated pool', 'Pool + hot tub', 'Pool + outdoor kitchen'];

const BASE_HOURLY: Record<string, number> = {
  'Standard in-ground': 55,
  'Large in-ground (40ft+)': 75,
  'Heated pool': 85,
  'Pool + hot tub': 95,
  'Pool + outdoor kitchen': 115,
};

const SUBURB_MULT: Record<string, number> = {
  Dallas: 1.1, 'Fort Worth': 1.0, Arlington: 1.05, Plano: 1.15,
  Frisco: 1.2, McKinney: 1.12, Irving: 1.08, Garland: 0.95,
  Allen: 1.1, Southlake: 1.35,
};

const REQUIREMENTS = [
  'Swimply requires $1M personal liability policy (they offer one for ~$30/mo)',
  'Pool must have a functioning safety drain cover (Virginia Graeme Baker Act)',
  'Depth markers and "No Diving" signage required where depth < 5ft',
  'Life ring or reaching pole must be poolside and visible',
  'Self-closing/latching gate to pool area required in Texas',
  'Notify your homeowner\’s insurer before first booking',
];

const TAX_NOTES = [
  'Swimply income is taxable — report on Schedule C or E',
  'Deductible expenses: pool maintenance, chemicals, platform fees, insurance premium',
  'If under 14 days/year rented: some tax-free treatment may apply (consult CPA)',
  'Self-employment tax applies if treated as a business',
];

export default function DFWPoolRentalIncomeGuide() {
  const [poolType, setPoolType] = useState('');
  const [suburb, setSuburb] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [result, setResult] = useState<{ monthly: number; hourly: number; annualEstimate: number } | null>(null);

  function calculate() {
    if (!poolType || !suburb || !hoursPerWeek) return;
    const base = BASE_HOURLY[poolType] ?? 55;
    const mult = SUBURB_MULT[suburb] ?? 1.0;
    const hourly = Math.round(base * mult);
    const weeksPerMonth = 4.3;
    const platformFee = 0.15;
    const monthly = Math.round(hourly * parseFloat(hoursPerWeek) * weeksPerMonth * (1 - platformFee));
    setResult({ monthly, hourly, annualEstimate: monthly * 10 });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏊</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642' }}>DFW Pool Rental Income Guide</h1>
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>DFW pool owners earn $45–$120/hour on Swimply. With 300+ days of pool weather, a single weekend listing can generate $800–$1,400/month. Here's everything you need to start safely.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📍 DFW Pool Rental Market</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            <li>DFW has 300+ days of pool-usable weather — highest in the country outside Arizona</li>
            <li>Swimply DFW average: $65-85/hour for a standard pool</li>
            <li>Premium zip codes (Southlake, Frisco, Plano): $90-120/hour</li>
            <li>Peak demand: Memorial Day, July 4th, Labor Day, and summer weekends</li>
            <li>Swimply handles payments, screening, and $1M liability insurance option</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>💰 Income Calculator</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Pool Type</label>
              <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select pool type</option>
                {POOL_TYPES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>DFW Suburb</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select suburb</option>
                {SUBURBS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Available Hours Per Week</label>
              <input type="number" min={1} max={40} value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} placeholder="e.g. 8" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Estimate My Pool Income</button>
          {result && (
            <div style={{ marginTop: 20, background: 'rgba(245,230,66,0.1)', border: '1.5px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${result.monthly.toLocaleString()}/month</div>
              <div style={{ opacity: 0.85, marginBottom: 4 }}>${result.hourly}/hour rate · ~${result.annualEstimate.toLocaleString()}/10-month season</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>Estimate after Swimply 15% platform fee</div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🛡️ Safety & Insurance Requirements</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            {REQUIREMENTS.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧾 Tax Implications</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            {TAX_NOTES.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
