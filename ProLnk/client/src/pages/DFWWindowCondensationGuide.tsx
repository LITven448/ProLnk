import { useState } from 'react';

const locations = ['Inside surface of glass', 'Outside surface of glass', 'Between the panes (inside glass)'];
const seasons = ['Summer (Jun–Sep)', 'Winter (Dec–Feb)', 'Spring/Fall transition', 'Year-round'];

type CondResult = { cause: string; urgency: string; solution: string; note: string };

function diagnose(loc: string, season: string): CondResult {
  if (loc === 'Between the panes (inside glass)') return { cause: 'Failed window seal (IGU failure)', urgency: '🔴 Replace window unit — no DIY fix', solution: 'Replace the insulated glass unit (IGU). Full window replacement often needed for older DFW homes.', note: 'DFW heat cycles (100°F summers → 20°F winters) stress seals faster than most climates. Expect 10–15 year IGU lifespan.' };
  if (loc === 'Inside surface of glass' && (season.includes('Summer') || season.includes('Spring'))) return { cause: 'Interior humidity too high — AC creating cold glass surface', urgency: '🟡 Address within weeks', solution: 'Run bathroom and kitchen exhaust fans. Target indoor humidity 40–50%. Consider whole-home dehumidifier.', note: 'DFW AC runs hard all summer, chilling glass while humid indoor air condenses on it. Normal-ish but controllable.' };
  if (loc === 'Inside surface of glass' && season.includes('Winter')) return { cause: 'Cold outside air chilling glass below indoor dew point', urgency: '🟡 Improve insulation or humidity control', solution: 'Add interior storm panel or window insulation film. Lower indoor humidity slightly in winter.', note: 'DFW winters are short but humidity swings are sharp. Single-pane windows in older DFW homes condense heavily.' };
  if (loc === 'Outside surface of glass') return { cause: 'Exterior condensation — normal dew point phenomenon', urgency: '🟢 Normal — no action needed', solution: 'Wait for sun to evaporate it. This is a sign your windows are energy efficient (cold interior face).', note: 'DFW mornings in spring and fall see exterior condensation frequently. It burns off by 9–10am.' };
  return { cause: 'Mixed seasonal condensation pattern', urgency: '🟡 Monitor and log when it occurs', solution: 'Track which surface, which season, time of day. Pattern will point to humidity vs. seal vs. insulation issue.', note: 'DFW climate swings make condensation diagnosis tricky — log observations for 2 weeks before calling a pro.' };
}

export default function DFWWindowCondensationGuide() {
  const [loc, setLoc] = useState('');
  const [season, setSeason] = useState('');
  const result = loc && season ? diagnose(loc, season) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '2rem' }}>🪟💧</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Window Condensation Guide</h1>
          <p style={{ color: '#94a3b8' }}>Three types of condensation, three different causes — location tells you everything.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌡️ The 3 Types of Window Condensation in DFW</h2>
          {[['Inside surface 🏠', 'Humidity problem — DFW AC chills glass while indoor air stays humid. Fix: dehumidify.', '#F5E642'],
            ['Outside surface 🌅', 'Normal in DFW mornings. Your window is energy efficient. Burns off with sun.', '#4ade80'],
            ['Between panes 💥', 'Seal failure — replace the window. No fix. DFW heat cycles destroy IGU seals faster than most places.', '#f87171'],
          ].map(([title, desc, color]) => (
            <div key={title} style={{ marginBottom: '1.2rem', padding: '1rem', backgroundColor: '#162d4a', borderRadius: 8, borderLeft: `4px solid ${color}` }}>
              <div style={{ fontWeight: 'bold', color, marginBottom: '0.4rem' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📅 DFW Season Context</h2>
          {[['Summer', 'AC runs constantly — interior glass chills, humid indoor air condenses on it. Most common season for interior condensation.'],
            ['Winter', 'Short but sharp cold snaps. Single-pane or older windows condensate heavily on inside when temps drop below 30°F.'],
            ['Spring/Fall', 'Exterior condensation peaks at dawn. Temperature swings are biggest. Most seal failures show up in these transitions.'],
          ].map(([s, desc]) => (
            <div key={s} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{s}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Diagnose Your Condensation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Where is the condensation?</label>
            <select value={loc} onChange={e => setLoc(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select location...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>DFW season when it appears:</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select season...</option>
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ backgroundColor: '#162d4a', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.8rem', fontSize: '1.05rem' }}>{result.urgency}</div>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Cause: </span><span>{result.cause}</span></div>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Solution: </span><span>{result.solution}</span></div>
              <div style={{ padding: '0.8rem', backgroundColor: '#0A1628', borderRadius: 6, color: '#94a3b8', fontSize: '0.9rem' }}>💡 {result.note}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>💰 Repair Cost Reference (DFW)</h2>
          {[['Window insulation film (DIY)', '$15–$40/window'], ['Whole-home dehumidifier', '$1,200–$2,500 installed'], ['IGU glass replacement', '$200–$400/window'], ['Full window replacement', '$400–$900/window installed']].map(([item, cost]) => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#94a3b8' }}>{item}</span>
              <span style={{ color: '#F5E642' }}>{cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
