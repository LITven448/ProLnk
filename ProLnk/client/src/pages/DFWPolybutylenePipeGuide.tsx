import { useState } from 'react';

const buildYearOptions = ['Before 1978', '1978-1985', '1986-1990', '1991-1995', 'After 1995'];
const pipeColorOptions = ['Gray', 'Blue', 'Black', 'White/Copper (not poly-B)'];

function getProbability(year: string, color: string) {
  if (color === 'White/Copper (not poly-B)') return { prob: 'Very Low', pct: 5, action: 'You likely do not have poly-B pipes. Schedule a visual inspection to confirm.', insurance: '✅ Standard coverage likely available.' };
  if (year === 'Before 1978') return { prob: 'Very Low', pct: 8, action: 'Poly-B was not yet in use. Inspect for galvanized or copper piping instead.', insurance: '✅ Standard coverage likely available.' };
  if (year === 'After 1995') return { prob: 'Low', pct: 15, action: 'Poly-B was being phased out. Have a plumber confirm pipe material.', insurance: '✅ Standard coverage likely available.' };
  if ((year === '1978-1985′ || year === '1986-1990') && (color === ’Gray' || color === 'Blue')) return { prob: 'Very High', pct: 90, action: '🚨 High probability of poly-B. Get a licensed DFW plumber inspection immediately. Budget $4,000–$15,000 for full repiping.', insurance: '⚠️ Many DFW insurers deny coverage or require repiping before issuing policy.' };
  if (year === '1991-1995′ && (color === ’Gray' || color === 'Blue')) return { prob: 'High', pct: 70, action: '⚠️ Likely poly-B. Schedule inspection within 30 days. DFW chlorinated water accelerates fitting failure.', insurance: '⚠️ Call your insurer — disclosure may be required.' };
  return { prob: 'Moderate', pct: 40, action: 'Mixed risk. Have a plumber inspect fittings and supply lines in crawlspace or under sinks.', insurance: '⚠️ Check with your DFW insurer for current poly-B policy.' };
}

export default function DFWPolybutylenePipeGuide() {
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const result = year && color ? getProbability(year, color) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🔧 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Polybutylene Pipe Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>DFW has tens of thousands of homes built 1978–1995 with polybutylene (poly-B) supply pipes. DFW municipal water is heavily chlorinated, which reacts with poly-B fittings and causes micro-fractures over time — often with no warning before a burst.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📅', title: 'Peak Install Years', body: '1978–1995. If your home was built in this window, risk is elevated.' },
            { icon: '⚗️', title: 'Why They Fail in DFW', body: 'Chlorine in Dallas/Fort Worth water reacts with polyacetal fittings, causing brittleness and leaks.' },
            { icon: '🔍', title: 'How to Identify', body: 'Gray pipes with gray, blue, or black plastic fittings — usually visible under sinks, in attic, or at water heater.' },
            { icon: '💰', title: 'Replacement Cost', body: 'DFW repiping: $4,000–$15,000 depending on home size. Many DFW plumbers specialize in poly-B removal.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏠 Poly-B Probability Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home Build Year</label>
              <select value={year} onChange={e => setYear(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select year range</option>
                {buildYearOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Pipe Color Under Sinks</label>
              <select value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select pipe color</option>
                {pipeColorOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '4px 14px', fontSize: 14 }}>{result.prob} Risk — ~{result.pct}%</div>
              </div>
              <p style={{ color: '#E8EDF5', fontSize: 14, marginBottom: 10 }}>{result.action}</p>
              <p style={{ color: '#94A3B8', fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>Insurance Note:</strong> {result.insurance}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>📞 DFW Resources</div>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
            • Texas State Board of Plumbing Examiners: verify contractor license before hiring<br/>
            • DFW-area insurers may require poly-B disclosure or proof of repiping for new policies<br/>
            • Repiping typically takes 2–3 days for a standard DFW home (2,000–3,500 sq ft)
          </div>
        </div>
      </div>
    </div>
  );
}
