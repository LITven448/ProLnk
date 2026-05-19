import { useState } from 'react';

const submarkets = [
  { name: 'Frisco', fiveYear: 38, tenYear: 112, twentyYear: 287 },
  { name: 'Plano', fiveYear: 31, tenYear: 98, twentyYear: 241 },
  { name: 'McKinney', fiveYear: 41, tenYear: 118, twentyYear: 263 },
  { name: 'Allen', fiveYear: 33, tenYear: 101, twentyYear: 252 },
  { name: 'Prosper', fiveYear: 47, tenYear: 129, twentyYear: 308 },
  { name: 'Celina', fiveYear: 52, tenYear: 141, twentyYear: 312 },
  { name: 'Uptown Dallas', fiveYear: 22, tenYear: 79, twentyYear: 198 },
  { name: 'Oak Cliff', fiveYear: 29, tenYear: 94, twentyYear: 221 },
  { name: 'Fort Worth', fiveYear: 27, tenYear: 88, twentyYear: 204 },
  { name: 'Arlington', fiveYear: 24, tenYear: 82, twentyYear: 189 },
];

const dfwAvg = { fiveYear: 33, tenYear: 99, twentyYear: 238 };

const outlooks = [
  'Strong demand from corporate relocations and population inflow supports continued appreciation.',
  'Infrastructure investment in this corridor signals sustained long-term growth.',
  'Limited new supply relative to demand positions this submarket for above-average gains.',
  'Mature submarket — appreciation will moderate but remain positive through 2031.',
];

export default function DFWHomeValueTrendGuide() {
  const [selectedSubmarket, setSelectedSubmarket] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('');
  const [result, setResult] = useState<null | {
    sub: (typeof submarkets)[0];
    gain: number;
    vsAvg: string;
    outlook: string;
  }>(null);

  function calculate() {
    const sub = submarkets.find((s) => s.name === selectedSubmarket);
    if (!sub || !purchaseYear) return;
    const year = parseInt(purchaseYear);
    const current = new Date().getFullYear();
    const age = current - year;
    let gain = 0;
    if (age <= 5) gain = Math.round(sub.fiveYear * (age / 5));
    else if (age <= 10) gain = sub.fiveYear + Math.round((sub.tenYear - sub.fiveYear) * ((age - 5) / 5));
    else gain = sub.tenYear + Math.round((sub.twentyYear - sub.tenYear) * Math.min((age - 10) / 10, 1));
    const avgGain = age <= 5 ? Math.round(dfwAvg.fiveYear * (age / 5)) : age <= 10 ? dfwAvg.fiveYear + Math.round((dfwAvg.tenYear - dfwAvg.fiveYear) * ((age - 5) / 5)) : dfwAvg.tenYear + Math.round((dfwAvg.twentyYear - dfwAvg.tenYear) * Math.min((age - 10) / 10, 1));
    const vsAvg = gain > avgGain ? `+${gain - avgGain}% above DFW average` : `${gain - avgGain}% below DFW average`;
    const outlook = outlooks[submarkets.indexOf(sub) % outlooks.length];
    setResult({ sub, gain, vsAvg, outlook });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW MARKET INTELLIGENCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Home Value Trend Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How DFW home values have moved over 5, 10, and 20 years — and where they're headed.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['5-Year DFW Avg', `+${dfwAvg.fiveYear}%`], ['10-Year DFW Avg', `+${dfwAvg.tenYear}%`], ['20-Year DFW Avg', `+${dfwAvg.twentyYear}%`]].map(([label, val]) => (
            <div key={label} style={{ background: '#0F2137', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📈 WHAT DRIVES DFW APPRECIATION</div>
          {['🏢 Corporate relocations (Toyota, JPMorgan, Oracle HQs) add 50K+ high-income jobs/yr', '👥 100,000+ net new residents annually — one of the fastest-growing metros in the US', '🛣️ $6B+ in DFW infrastructure: highways, DART expansion, and airports fueling corridor growth', '☀️ No state income tax attracts remote workers and out-of-state buyers year-round'].map((item) => (
            <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏠 SUBMARKET APPRECIATION CALCULATOR</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW SUBMARKET</label>
              <select value={selectedSubmarket} onChange={(e) => setSelectedSubmarket(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select area...</option>
                {submarkets.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>YEAR PURCHASED</label>
              <input type='number' value={purchaseYear} onChange={(e) => setPurchaseYear(e.target.value)} placeholder='e.g. 2018′ min='2005' max='2025' style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14, boxSizing: ’border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Calculate Appreciation</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>+{result.gain}% estimated gain</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>{result.vsAvg}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>5-Yr Outlook: </span>{result.outlook}
              </div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>Estimates based on historical MLS data and market indices. Not financial advice.</div>
      </div>
    </div>
  );
}
