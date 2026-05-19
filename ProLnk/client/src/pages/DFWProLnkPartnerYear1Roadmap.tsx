import { useState } from 'react';

const MONTHS = [
  { m: 1, label: 'Jan', homes: 2, matches: 2, partners: 0 },
  { m: 2, label: 'Feb', homes: 5, matches: 5, partners: 1 },
  { m: 3, label: 'Mar', homes: 10, matches: 10, partners: 3 },
  { m: 4, label: 'Apr', homes: 14, matches: 14, partners: 5 },
  { m: 5, label: 'May', homes: 18, matches: 18, partners: 7 },
  { m: 6, label: 'Jun', homes: 22, matches: 22, partners: 9 },
  { m: 7, label: 'Jul', homes: 26, matches: 26, partners: 11 },
  { m: 8, label: 'Aug', homes: 30, matches: 30, partners: 13 },
  { m: 9, label: 'Sep', homes: 34, matches: 34, partners: 15 },
  { m: 10, label: 'Oct', homes: 38, matches: 38, partners: 17 },
  { m: 11, label: 'Nov', homes: 42, matches: 42, partners: 19 },
  { m: 12, label: 'Dec', homes: 48, matches: 48, partners: 22 },
];

const TRADES = ['Plumber', 'Electrician', 'HVAC Tech', 'Roofer', 'General Contractor', 'Other'];
const SIZES = ['Solo (just me)', 'Small (5–10)', 'Medium (10–25)', 'Large (25+)'];

export default function DFWProLnkPartnerYear1Roadmap() {
  const [trade, setTrade] = useState('');
  const [size, setSize] = useState('');
  const [shown, setShown] = useState(false);

  const mult = size === 'Large (25+)' ? 1.6 : size === 'Medium (10–25)' ? 1.25 : size === 'Small (5–10)' ? 1.0 : 0.7;

  const rows = MONTHS.map(m => {
    const directMatch = Math.round(m.matches * mult * 85);
    const overrides = Math.round(m.partners * mult * 35);
    const origination = Math.round(m.homes * mult * 1.5 * 250 / 100);
    const total = directMatch + overrides + origination;
    return { ...m, directMatch, overrides, origination, total };
  });

  const year1Total = rows.reduce((s, r) => s + r.total, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🗺️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW ProLnk — Year 1 Roadmap</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>12-month income progression, network growth, and passive income transition</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚙️ Your Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Trade Background</label>
              <select value={trade} onChange={e => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Network Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShown(true)} disabled={!trade || !size} style={{ background: trade && size ? '#F5E642' : '#1E3A5F', color: trade && size ? '#0A1628' : '#445566', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: trade && size ? 'pointer' : 'not-allowed', width: '100%' }}>
            Generate Year 1 Projection →
          </button>
        </div>

        {shown && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
              {[{ label: 'Year 1 Total Income', val: `$${year1Total.toLocaleString()}`, icon: '💰' }, { label: 'Homes by Month 12', val: Math.round(48 * mult), icon: '🏠' }, { label: 'Sub-Partners by M12', val: Math.round(22 * mult), icon: '👥' }].map((s, i) => (
                <div key={i} style={{ background: '#0D1F38', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.val}</div>
                  <div style={{ color: '#8899AA', fontSize: 12 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F38', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#0A1628' }}>
                    {['Month', 'Direct Match', 'Overrides', 'Origination', 'Total'].map(h => (
                      <th key={h} style={{ padding: '12px 14px', textAlign: 'right', color: '#F5E642', fontWeight: 700, '&:first-child': { textAlign: 'left' } }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #1E3A5F', background: i % 2 === 0 ? 'transparent' : '#081422' }}>
                      <td style={{ padding: '10px 14px', color: '#C8D8E8' }}>{r.label}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#fff' }}>${r.directMatch.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#fff' }}>${r.overrides.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#fff' }}>${r.origination.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#F5E642', fontWeight: 700 }}>${r.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
