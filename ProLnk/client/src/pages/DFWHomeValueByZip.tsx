import { useState } from 'react';

const ZIPS = [
  { zip: '75205', city: 'Highland Park', median: 1100000, yoy: 4.2, dom: 18, ppsf: 420, school: 10 },
  { zip: '75225', city: 'Preston Hollow', median: 875000, yoy: 3.8, dom: 22, ppsf: 310, school: 9 },
  { zip: '75024', city: 'Plano Legacy', median: 480000, yoy: 5.1, dom: 28, ppsf: 215, school: 9 },
  { zip: '75070', city: 'McKinney', median: 420000, yoy: 6.3, dom: 31, ppsf: 192, school: 8 },
  { zip: '75034', city: 'Frisco', median: 510000, yoy: 5.8, dom: 26, ppsf: 220, school: 9 },
  { zip: '75056', city: 'The Colony', median: 365000, yoy: 5.4, dom: 35, ppsf: 178, school: 8 },
  { zip: '75028', city: 'Flower Mound', median: 485000, yoy: 4.9, dom: 29, ppsf: 208, school: 9 },
  { zip: '75019', city: 'Coppell', median: 445000, yoy: 4.2, dom: 27, ppsf: 210, school: 10 },
  { zip: '76051', city: 'Grapevine', median: 390000, yoy: 4.0, dom: 33, ppsf: 195, school: 8 },
  { zip: '76034', city: 'Colleyville', median: 620000, yoy: 3.5, dom: 30, ppsf: 245, school: 9 },
  { zip: '75230', city: 'N Dallas / Far North', median: 540000, yoy: 4.7, dom: 24, ppsf: 230, school: 8 },
  { zip: '75201', city: 'Dallas Uptown', median: 520000, yoy: 3.2, dom: 38, ppsf: 380, school: 7 },
  { zip: '75080', city: 'Richardson', median: 355000, yoy: 5.6, dom: 29, ppsf: 188, school: 8 },
  { zip: '75081', city: 'Richardson East', median: 310000, yoy: 6.0, dom: 32, ppsf: 170, school: 7 },
  { zip: '75150', city: 'Mesquite', median: 245000, yoy: 7.1, dom: 40, ppsf: 148, school: 6 },
  { zip: '75040', city: 'Garland', median: 265000, yoy: 6.8, dom: 38, ppsf: 155, school: 6 },
  { zip: '76102', city: 'Fort Worth Downtown', median: 312000, yoy: 5.5, dom: 42, ppsf: 162, school: 7 },
  { zip: '76244', city: 'Keller / N FW', median: 415000, yoy: 5.0, dom: 30, ppsf: 198, school: 8 },
  { zip: '76248', city: 'Keller Central', median: 440000, yoy: 4.6, dom: 28, ppsf: 205, school: 9 },
  { zip: '75126', city: 'Forney', median: 335000, yoy: 7.5, dom: 45, ppsf: 165, school: 7 },
];

export default function DFWHomeValueByZip() {
  const [budget, setBudget] = useState('');
  const [minSchool, setMinSchool] = useState('0');
  const [filtered, setFiltered] = useState<typeof ZIPS>([]);
  const [searched, setSearched] = useState(false);

  function runFilter() {
    const budgetNum = budget ? parseInt(budget.replace(/,/g, '')) : Infinity;
    const schoolNum = parseInt(minSchool);
    const results = ZIPS.filter(z => z.median <= budgetNum && z.school >= schoolNum).sort((a, b) => b.yoy - a.yoy);
    setFiltered(results);
    setSearched(true);
  }

  const fmt = (n: number) => '$' + n.toLocaleString();
  const rating = (s: number) => s >= 9 ? '🟢' : s >= 7 ? '🟡' : '🔴';

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0066cc', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW Market Data</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>DFW Home Values by ZIP Code</h1>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7 }}>Median home values, appreciation rates, days on market, price per square foot, and school ratings across 20 major DFW ZIP codes.</p>
        </div>

        <section style={{ background: '#fff', border: '2px solid #0066cc', borderRadius: 14, padding: 26, marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🔍 Find Your Best ZIP Code</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 14, alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Max Budget</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 450000" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Min School Rating</label>
              <select value={minSchool} onChange={e => setMinSchool(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15 }}>
                <option value="0">Any Rating</option>
                <option value="7">7+ (Good)</option>
                <option value="8">8+ (Great)</option>
                <option value="9">9+ (Excellent)</option>
                <option value="10">10 (Top Rated)</option>
              </select>
            </div>
            <button onClick={runFilter} style={{ background: '#0066cc', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Filter ZIPs</button>
          </div>
          {searched && (
            <div style={{ marginTop: 18 }}>
              {filtered.length === 0 ? <p style={{ color: '#c00', fontWeight: 600 }}>No ZIP codes match your criteria. Try adjusting your budget or school threshold.</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {filtered.map(z => (
                    <div key={z.zip} style={{ background: '#e8f0ff', borderRadius: 8, padding: '10px 16px', fontSize: 14 }}>
                      <strong>{z.zip}</strong> — {z.city}<br />
                      <span style={{ color: '#0066cc', fontWeight: 700 }}>{fmt(z.median)}</span> · {rating(z.school)} {z.school}/10 schools · {z.yoy}% YoY
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>📊 Full ZIP Code Comparison Table</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0066cc', color: '#fff' }}>
                  {['ZIP', 'Neighborhood', 'Median Value', 'YoY %', 'DOM', '$/SqFt', 'Schools'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ZIPS.map((z, i) => (
                  <tr key={z.zip} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '11px 14px', fontWeight: 700, color: '#0066cc' }}>{z.zip}</td>
                    <td style={{ padding: '11px 14px' }}>{z.city}</td>
                    <td style={{ padding: '11px 14px', fontWeight: 700 }}>{fmt(z.median)}</td>
                    <td style={{ padding: '11px 14px', color: '#2a7a2a', fontWeight: 600 }}>+{z.yoy}%</td>
                    <td style={{ padding: '11px 14px' }}>{z.dom} days</td>
                    <td style={{ padding: '11px 14px' }}>{fmt(z.ppsf)}</td>
                    <td style={{ padding: '11px 14px' }}>{rating(z.school)} {z.school}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#777', marginTop: 12 }}>Data as of Q2 2026. School ratings from GreatSchools. Median values based on trailing 90-day closed sales.</p>
        </section>

      </div>
    </div>
  );
}
