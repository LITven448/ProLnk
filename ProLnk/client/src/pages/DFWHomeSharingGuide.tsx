import { useState } from 'react';

const SUBURBS = ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Frisco', 'McKinney', 'Irving', 'Garland'];
const HOME_SIZES = ['2BR/1BA', '3BR/2BA', '4BR/2BA', '5BR+/3BA+'];

const EVENTS = [
  { name: 'State Fair of Texas', months: 'Oct', premium: '3.2x' },
  { name: 'Cotton Bowl Classic', months: 'Jan', premium: '2.8x' },
  { name: 'Concerts at AT&T Stadium', months: 'Year-round', premium: '2.1x' },
  { name: 'Dallas Cowboys Playoffs', months: 'Jan', premium: '3.5x' },
  { name: 'PGA DFW Events', months: 'May', premium: '2.4x' },
];

const BASE_INCOME: Record<string, number> = {
  '2BR/1BA': 140,
  '3BR/2BA': 195,
  '4BR/2BA': 260,
  '5BR+/3BA+': 340,
};

const SUBURB_MULT: Record<string, number> = {
  Dallas: 1.15, Frisco: 1.1, Plano: 1.08, McKinney: 1.05,
  'Fort Worth': 1.0, Arlington: 1.02, Irving: 1.06, Garland: 0.95,
};

const INSURANCE_NOTES = [
  'Standard homeowner\’s policy typically does NOT cover short-term rentals',
  'Airbnb Host Protection: up to $1M liability coverage while guests are present',
  'VRBO: requires separate short-term rental rider (~$200-400/yr)',
  'USAA, State Farm, and Allstate all offer short-term rental endorsements in Texas',
  'Notify your insurer before your first guest — non-disclosure voids claims',
];

export default function DFWHomeSharingGuide() {
  const [suburb, setSuburb] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [nights, setNights] = useState('');
  const [result, setResult] = useState<{ monthly: number; nightly: number; platform: string } | null>(null);

  function calculate() {
    if (!suburb || !homeSize || !nights) return;
    const base = BASE_INCOME[homeSize] ?? 195;
    const mult = SUBURB_MULT[suburb] ?? 1.0;
    const nightly = Math.round(base * mult);
    const monthly = Math.round(nightly * parseInt(nights) * 0.85);
    const platform = suburb === 'Arlington' ? 'VRBO (sports events)' : 'Airbnb (highest DFW volume)';
    setResult({ monthly, nightly, platform });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>✈️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642' }}>DFW Home Sharing While You Travel</h1>
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>DFW events create massive rental demand year-round. Rent your home while you're away — the State Fair alone can yield 3x your normal nightly rate.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📅 Premium DFW Events</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {EVENTS.map(e => (
              <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{e.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>{e.months}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 800 }}>{e.premium} rate</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>💵 Income Estimator</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'DFW Suburb', val: suburb, set: setSuburb, opts: SUBURBS },
              { label: 'Home Size', val: homeSize, set: setHomeSize, opts: HOME_SIZES },
            ].map(({ label, val, set, opts }) => (
              <div key={label}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={e => set(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                  <option value="">Select...</option>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Available Nights/Month</label>
              <input type="number" min={1} max={31} value={nights} onChange={e => setNights(e.target.value)} placeholder="e.g. 10" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Estimate My Income</button>
          {result && (
            <div style={{ marginTop: 20, background: 'rgba(245,230,66,0.1)', border: '1.5px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${result.monthly.toLocaleString()}/month</div>
              <div style={{ opacity: 0.85, marginBottom: 4 }}>${result.nightly}/night avg (after platform fees)</div>
              <div style={{ opacity: 0.85 }}>Best platform: {result.platform}</div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🛡️ Insurance During Home Sharing</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            {INSURANCE_NOTES.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
