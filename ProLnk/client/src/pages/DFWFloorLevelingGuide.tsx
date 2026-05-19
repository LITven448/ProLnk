import { useState } from 'react';

const severities = ['Barely noticeable — feels slightly off', 'Noticeable slope — marbles roll slowly', 'Significant slope — marbles roll fast', 'Severe — furniture tips, doors swing open'];
const homeAges = ['Pre-1980 (older DFW construction)', '1980–2000 (suburban boom era)', '2000–2015 (newer build)', '2015–present (recent construction)'];

type FloorResult = { causeLikelihood: string; urgency: string; action: string; note: string };

function assess(severity: string, age: string): FloorResult {
  const isOld = age.includes('Pre-1980') || age.includes('1980–2000');
  const isSevere = severity.includes('Severe') || severity.includes('fast');
  const isMinor = severity.includes('Barely') || severity.includes('slowly');

  if (isSevere && isOld) return { causeLikelihood: '🔴 High likelihood of foundation movement (slab shift or pier failure)', urgency: '🚨 Get foundation assessment immediately — do not level floors until assessed', action: '1. Stop DIY floor leveling. 2. Call a DFW foundation specialist (Olshan, HD Foundations, TerraFirma). 3. Get 2–3 quotes. 4. Address foundation FIRST — then level floors.', note: 'DFW expansive clay causes 90%+ of unlevel floors in older homes. Self-leveling compound on a moving slab fails within 1 year.' };
  if (isSevere) return { causeLikelihood: '🟠 Possible foundation issue or severe subfloor damage', urgency: '🔴 Professional assessment before any floor work', action: '1. Check for cracks in walls and door frames — signs of movement. 2. Have foundation evaluated. 3. If foundation is stable, subfloor repair or sistering may be needed.', note: 'New DFW homes can still shift if irrigation and drainage are not managed. Check gutters and watering habits.' };
  if (isMinor && !isOld) return { causeLikelihood: '🟢 Likely normal construction tolerance or minor settling', urgency: '🟡 Monitor for 6 months — act if it worsens', action: '1. Measure with a 6-ft level — note the reading. 2. Re-check in 6 months. 3. If stable, self-leveling compound is appropriate. 4. DFW rule: under 3/8" in 10 ft = acceptable.', note: 'New DFW homes settle 1–2 years post-construction. Minor unlevel is often normal — document baseline and track.' };
  return { causeLikelihood: '🟡 Clay soil seasonal movement most likely', urgency: '🟡 Investigate before leveling', action: '1. Check if the unlevel changes seasonally (worse in dry summer, better after rain = clay movement). 2. If seasonal, foundation watering program may stabilize. 3. If constant, self-leveling compound after stability confirmed.', note: 'DFW clay shrinks in drought (fall 2022 was severe). Consistent foundation watering prevents most seasonal movement.' };
}

export default function DFWFloorLevelingGuide() {
  const [severity, setSeverity] = useState('');
  const [age, setAge] = useState('');
  const result = severity && age ? assess(severity, age) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '2rem' }}>📐🏗️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Floor Leveling Guide</h1>
          <p style={{ color: '#94a3b8' }}>In DFW, unlevel floors are usually a clay soil story — not just old flooring.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ DFW Floor Level Reality Check</h2>
          {[['Clay soil moves everything', 'DFW sits on some of the most expansive clay in North America. Slabs move as soil moisture fluctuates.'],
            ['The 1-in-10 DFW rule', 'Over 1 inch of drop per 10 linear feet in a DFW home = get a foundation evaluation before any leveling.'],
            ['Self-leveling compound has limits', 'It cannot fix an active foundation problem. If the slab is still moving, leveling compound cracks within months.'],
            ['Seasonal vs. permanent unlevel', 'If floors are worse in dry summers and improve after rain — that\’s clay movement, not structural failure (yet).'],
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📏 DFW Tolerance Reference</h2>
          {[['Under 3/8" in 10 ft', 'Within tolerance — cosmetic fix acceptable', '🟢'],
            ['3/8"–3/4" in 10 ft', 'Monitor and investigate cause', '🟡'],
            ['3/4"–1" in 10 ft', 'Investigate foundation before leveling', '🟠'],
            ['Over 1" in 10 ft', 'Foundation evaluation required first', '🔴'],
          ].map(([measure, action, dot]) => (
            <div key={measure} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>{dot}</span>
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 'bold' }}>{measure}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{action}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Assess Your Situation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>How unlevel does the floor feel?</label>
            <select value={severity} onChange={e => setSeverity(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select severity...</option>
              {severities.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Home age / build era:</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
              <option value="">Select age...</option>
              {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ backgroundColor: '#162d4a', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Cause likelihood: </span><span style={{ fontWeight: 'bold' }}>{result.causeLikelihood}</span></div>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Urgency: </span><span>{result.urgency}</span></div>
              <div style={{ marginBottom: '0.8rem' }}><span style={{ color: '#94a3b8' }}>Action steps: </span><span>{result.action}</span></div>
              <div style={{ padding: '0.8rem', backgroundColor: '#0A1628', borderRadius: 6, color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>💡 {result.note}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>💰 Cost Reference (DFW 2024)</h2>
          {[['Self-leveling compound (DIY)', '$80–$200 per 100 sq ft'], ['Professional floor leveling', '$500–$2,000 per room'], ['Foundation pier installation', '$1,500–$3,000 per pier'], ['Full foundation repair (DFW avg)', '$8,000–$20,000']].map(([item, cost]) => (
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
