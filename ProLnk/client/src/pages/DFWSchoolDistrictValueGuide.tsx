import { useState } from 'react';

const ISDS: Record<string, { label: string; rating: number; medianHome: number; premiumPct: number }> = {
  carroll: { label: 'Carroll ISD (Southlake)', rating: 10, medianHome: 850000, premiumPct: 28 },
  highland_park: { label: 'Highland Park ISD', rating: 10, medianHome: 1200000, premiumPct: 35 },
  frisco: { label: 'Frisco ISD', rating: 9, medianHome: 520000, premiumPct: 18 },
  allen: { label: 'Allen ISD', rating: 9, medianHome: 490000, premiumPct: 16 },
  plano: { label: 'Plano ISD', rating: 8, medianHome: 450000, premiumPct: 14 },
  mckinney: { label: 'McKinney ISD', rating: 8, medianHome: 430000, premiumPct: 12 },
  prosper: { label: 'Prosper ISD', rating: 9, medianHome: 560000, premiumPct: 20 },
  keller: { label: 'Keller ISD', rating: 8, medianHome: 420000, premiumPct: 12 },
  mansfield: { label: 'Mansfield ISD', rating: 7, medianHome: 370000, premiumPct: 8 },
  desoto: { label: 'DeSoto ISD', rating: 6, medianHome: 290000, premiumPct: 0 },
};

export default function DFWSchoolDistrictValueGuide() {
  const [isd, setIsd] = useState('frisco');
  const [budget, setBudget] = useState('500000');
  const [result, setResult] = useState<{ info: typeof ISDS[string]; altSavings: number; budgetFit: boolean } | null>(null);

  function calculate() {
    const info = ISDS[isd];
    const b = parseInt(budget.replace(/,/g, '')) || 500000;
    const baselineIsd = ISDS['mansfield'];
    const premiumDollars = Math.round((info.premiumPct - baselineIsd.premiumPct) / 100 * info.medianHome);
    const budgetFit = b >= info.medianHome * 0.85;
    setResult({ info, altSavings: Math.max(0, premiumDollars), budgetFit });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '52px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>DFW SCHOOL DISTRICT VALUE GUIDE</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          How Much Are DFW School Districts Worth?
        </h1>
        <p style={{ fontSize: 17, color: '#b0bdd4', lineHeight: 1.7, marginBottom: 40 }}>
          Carroll ISD (Southlake) commands a premium of $100,000–$200,000+ over comparable homes
          in Keller just across the road. School district boundaries are invisible lines with very
          visible price tags in DFW.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏆', title: 'Carroll ISD Effect', desc: 'Southlake homes zoned Carroll ISD sell for 25–35% more than equivalent homes in adjacent ISDs. The premium is real and persistent.' },
            { icon: '📊', title: 'Frisco vs Allen Trade-off', desc: 'Both are rated 9/10. Frisco ISD homes run $30K–$50K higher than Allen ISD equivalents — much of it driven by newer construction and HOA quality rather than school quality alone.' },
            { icon: '📉', title: 'Rating Changes = Price Changes', desc: 'When a school district rating drops from 8 to 7, median home values in that district typically lag nearby ISDs by 3–8% within 2–3 years.' },
            { icon: '🗺️', title: 'Boundary Awareness', desc: 'Two homes on opposite sides of a street can be in different ISDs. Always verify the specific address on the district’s boundary map before buying.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#12213A', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#8a9fc0', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#12213A', borderRadius: 14, padding: 32, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🎓 ISD Budget Fit Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Target ISD</label>
              <select value={isd} onChange={e => setIsd(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(ISDS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Your Budget</label>
              <input type="text" value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Analyze School Premium
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#8a9fc0', marginBottom: 4 }}>TEA Rating</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{result.info.rating}/10</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#8a9fc0', marginBottom: 4 }}>Median Home Price</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{fmt(result.info.medianHome)}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 11, color: '#8a9fc0', marginBottom: 4 }}>ISD Premium vs Avg</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: result.altSavings > 30000 ? '#f87171′ : '#6af26a' }}>+{fmt(result.altSavings)}</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: result.budgetFit ? '#6af26a' : '#f87171', fontWeight: 600 }}>
                {result.budgetFit ? '✅ Your budget fits this ISD — you can likely find options in this market.' : '⚠️ Your budget is below the median for this ISD. You may find limited inventory or older homes.'}
              </p>
            </div>
          )}
        </div>

        <div style={{ background: '#12213A', borderRadius: 14, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 DFW ISD Quick Reference</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ color: '#F5E642′ }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px' }}>District</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px' }}>Rating</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px' }}>Median Home</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px' }}>Premium</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ISDS).map(([k, v]) => (
                  <tr key={k} style={{ borderTop: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '8px 12px', color: '#b0bdd4′ }}>{v.label}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center', color: v.rating >= 9 ? '#F5E642′ : '#b0bdd4' }}>{v.rating}/10</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: '#b0bdd4′ }}>{fmt(v.medianHome)}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', color: '#6af26a' }}>+{v.premiumPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
