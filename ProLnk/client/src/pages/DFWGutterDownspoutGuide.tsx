import { useState } from 'react';

const yardTypes = ['Flat yard', 'Sloped toward house', 'Sloped away from house', 'Uneven/low spots'];
const drainageIssues = ['Standing water near foundation', 'Erosion under downspout', 'Basement or crawl space moisture', 'Water pooling in lawn', 'Gutters overflowing'];

type Solution = { extension: string; type: string; cost: string; urgency: string; note: string };

function getSolution(yard: string, issue: string): Solution {
  if (issue === 'Standing water near foundation') return { extension: '6–10 ft extension required', type: 'Underground drain pipe to street or dry well', cost: '$300–$800 installed', urgency: '🔴 Act now — DFW clay holds water against slab', note: 'Clay soil expands when wet, contracts dry — foundation movement follows moisture.' };
  if (issue === 'Erosion under downspout') return { extension: '4 ft minimum + splash block', type: 'Flex elbow + concrete splash block', cost: '$40–$120 DIY', urgency: '🟡 Fix within 30 days', note: 'DFW soils erode fast under concentrated downspout discharge.' };
  if (yard === 'Sloped toward house') return { extension: '8–12 ft extension mandatory', type: 'Rigid aluminum extension + buried drain', cost: '$200–$600', urgency: '🔴 Foundation risk — fix immediately', note: 'Negative grade + DFW clay = foundation settlement risk.' };
  if (issue === 'Basement or crawl space moisture') return { extension: '6 ft minimum away from structure', type: 'Extension directed to positive slope area', cost: '$80–$200', urgency: '🔴 Mold and structural risk', note: 'DFW humidity makes damp crawl spaces a mold factory fast.' };
  return { extension: '4 ft standard extension', type: 'Aluminum flex extension', cost: '$20–$60 DIY', urgency: '🟢 Routine maintenance', note: 'Ensure downspout discharges at least 4 ft from any foundation.' };
}

export default function DFWGutterDownspoutGuide() {
  const [yard, setYard] = useState('');
  const [issue, setIssue] = useState('');
  const sol = yard && issue ? getSolution(yard, issue) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '2rem' }}>🏠💧</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Gutter Downspout Guide</h1>
          <p style={{ color: '#94a3b8′ }}>DFW clay soil means water must flow away from your foundation — downspout placement is critical.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ Why Downspouts Matter More in DFW</h2>
          {[['Clay soil expands when wet', 'DFW expansive clay shifts slabs when moisture is uneven — downspouts control where water goes.'],
            ['Foundation damage starts at the downspout', 'Gutters that discharge within 2 ft of a slab accelerate differential settlement.'],
            ['Extensions are non-optional here', 'Standard 1–2 ft elbow is not enough in DFW. Minimum 4 ft, often 6–10 ft required.'],
            ['Underground drainage = best solution', 'In severe cases, bury a 4″ PVC pipe from downspout to street or dry well.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 'bold', color: '#e2e8f0′ }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📐 Extension Length Reference</h2>
          {[['Flat lot, positive grade away', '4 ft minimum'],
            ['Flat lot, neutral grade', '6 ft recommended'],
            ['Sloped toward house', '8–12 ft + underground'],
            ['Low spot in yard collects water', 'Underground pipe to drain point'],
          ].map(([condition, rec]) => (
            <div key={condition} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#94a3b8′ }}>{condition}</span>
              <span style={{ color: '#F5E642', fontWeight: 'bold' }}>{rec}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Get Your Recommendation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8′ }}>Your yard type:</label>
            <select value={yard} onChange={e => setYard(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select yard type...</option>
              {yardTypes.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8′ }}>Current drainage issue:</label>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select issue...</option>
              {drainageIssues.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          {sol && (
            <div style={{ backgroundColor: '#162d4a', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642′ }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#F5E642', marginBottom: '0.8rem' }}>{sol.urgency}</div>
              {[['Extension needed', sol.extension], ['Solution type', sol.type], ['Estimated cost', sol.cost]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#94a3b8', minWidth: 140 }}>{label}:</span>
                  <span style={{ color: '#e2e8f0′ }}>{val}</span>
                </div>
              ))}
              <div style={{ marginTop: '0.8rem', padding: '0.8rem', backgroundColor: '#0A1628', borderRadius: 6, color: '#94a3b8', fontSize: '0.9rem' }}>💡 {sol.note}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>💰 Cost Reference (DFW 2024)</h2>
          {[['Splash block only', '$15–$40 DIY'], ['Flex aluminum extension', '$20–$60 DIY'], ['Buried 4″ PVC to street', '$300–$800 installed'], ['Dry well installation', '$500–$1,500 installed']].map(([item, cost]) => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#94a3b8′ }}>{item}</span>
              <span style={{ color: '#F5E642′ }}>{cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
