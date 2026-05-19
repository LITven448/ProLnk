import { useState } from 'react';

export default function DFWOutdoorFaucetGuide2026() {
  const [faucetType, setFaucetType] = useState('');
  const [problem, setProblem] = useState('');
  const [guide, setGuide] = useState('');

  const diagnose = () => {
    if (faucetType === 'standard' && problem === 'freeze') {
      setGuide('🥶 Freeze Damage on Standard Hose Bib. Standard (non-frost-free) faucets are NOT code-compliant for DFW and WILL crack in freezes. Replace with a frost-free sillcock ($150-250 installed by a licensed plumber). Temporary fix: shut off the interior valve to this line and drain the pipe.');
    } else if (faucetType === 'frost-free' && problem === 'freeze') {
      setGuide('❄️ Frost-Free Faucet Freeze Damage. Frost-free faucets freeze when a hose is left connected during a freeze (hose traps water in the stem). Check if the stem inside is cracked — turn on the interior shutoff and watch for water dripping from the wall. Replace stem: $30-50 DIY, $100-180 plumber.');
    } else if (problem === 'backflow') {
      setGuide('🔄 Missing Anti-Siphon Backflow Preventer. Texas law requires backflow preventers on all outdoor hose bibs. Without one, irrigation chemicals, pesticides, and fertilizers can siphon back into your drinking water during pressure drops. Install an anti-siphon vacuum breaker: $8-15 DIY (screws on hose thread) or $80-150 if plumber installs at the bib.');
    } else if (problem === 'dripping') {
      setGuide('💧 Dripping Outdoor Faucet. Most common causes: worn washer (standard bib) or worn stem O-ring (frost-free). For frost-free: turn off interior shutoff, remove handle screw, pull stem, replace O-ring or packing. DIY parts: $5-15. If the bib body is cracked from freeze damage, replace the whole unit: $150-250 installed.');
    } else if (problem === 'no-flow') {
      setGuide('🚱 No Water Flow. Check: (1) Interior shutoff valve — fully open? (2) Frost-free stem stuck? Try turning handle firmly both ways. (3) Vacuum breaker clogged? Unscrew and clean. (4) Pipe frozen or cracked from last winter? Turn on heat inside wall and listen for dripping — if water drips from wall, pipe is cracked. Call a plumber immediately.');
    } else {
      setGuide('Select your faucet type and problem above for a repair guide.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block', fontWeight: 700 }}>
          🚰 DFW Plumbing Guide 2026
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Outdoor Faucet Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Outdoor hose bibs are the most commonly damaged plumbing component after DFW freeze events. Frost-free faucets and anti-siphon backflow preventers are required for all DFW homes.
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 DFW Outdoor Faucet Requirements</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>❄️ Frost-Free Sillcock Required</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>DFW experiences hard freezes every 2-4 years on average. Texas plumbing code requires frost-free outdoor faucets. Standard hose bibs will crack when water in the spout freezes and expands. Frost-free models keep water 12-18 inches back inside the heated wall.</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔄 Anti-Siphon Backflow Preventer Required</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>Texas law (Texas Commission on Environmental Quality) requires backflow prevention on all outdoor water connections. Pressure drops in municipal lines can siphon chemicals from irrigation systems into drinking water without this device.</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🌨️ DFW Winterization Checklist</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Disconnect all garden hoses when temps drop below 35°F</li>
            <li>Know where your outdoor faucet interior shutoffs are located</li>
            <li>Install foam faucet covers on all outdoor bibs for extra protection</li>
            <li>Never leave drip hoses or irrigation connected during freeze warnings</li>
            <li>If you hear gurgling from outdoor walls during a thaw: call a plumber</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Diagnose Your Outdoor Faucet Problem</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Faucet Type</label>
            <select value={faucetType} onChange={e => setFaucetType(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155' }}>
              <option value="">Select faucet type...</option>
              <option value="frost-free">❄️ Frost-free sillcock (long stem)</option>
              <option value="standard">🔧 Standard hose bib (short, older)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Problem</label>
            <select value={problem} onChange={e => setProblem(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155' }}>
              <option value="">Select problem...</option>
              <option value="freeze">🥶 Damaged after a freeze</option>
              <option value="backflow">🔄 Missing backflow preventer</option>
              <option value="dripping">💧 Dripping / leaking</option>
              <option value="no-flow">🚱 No water coming out</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get Repair Guide
          </button>
          {guide && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', color: '#e2e8f0' }}>
              {guide}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>💰 DFW Outdoor Faucet Costs 2026</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { item: 'Anti-siphon vacuum breaker (DIY)', cost: '$8-15' },
              { item: 'Frost-free stem replacement (DIY)', cost: '$20-40' },
              { item: 'Full frost-free faucet replacement', cost: '$150-250' },
              { item: 'Freeze damage repair + drywall', cost: '$300-800' },
            ].map(r => (
              <div key={r.item} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 8 }}>
                <span style={{ color: '#cbd5e1' }}>{r.item}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}