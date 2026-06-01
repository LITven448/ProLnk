import { useState } from 'react';

const BRICK_TYPES = [
  { type: 'Common Brick', era: 'Pre-1960', desc: 'Soft clay brick, very porous, absorbs moisture easily in DFW rain events' },
  { type: 'Face Brick', era: '1960-1990', desc: 'Denser, more weather-resistant, common in DFW suburban builds' },
  { type: 'Engineer Brick', era: '1990+', desc: 'Oversized modular brick, popular in newer DFW subdivisions' },
  { type: 'Norman Brick', era: '2000+', desc: 'Long horizontal profile, modern DFW aesthetic, good thermal mass' },
];

const MORTAR_MAP: Record<string, string> = {
  'Pre-1960': 'Use Type N mortar (1:1:6 mix) — soft lime-based for old brick. Hard modern mortar will crack the brick face.',
  '1960-1990': 'Type S mortar acceptable. Avoid Type M — too rigid for DFW thermal expansion cycles.',
  '1990-2010': 'Type S or Type N. Match original color carefully — DFW clay tones vary by quarry source.',
  '2010+': 'Type S standard. Polymer-modified mortars work well for DFW moisture and heat cycling.',
};

const URGENCY_MAP: Record<string, Record<string, string>> = {
  efflorescence: {
    low: 'Cosmetic only — DFW mineral salts migrating out. Wire brush + masonry cleaner. Monitor 1 season.',
    medium: 'Recurring efflorescence suggests drainage issue. Check gutters, grade slope away from foundation.',
    high: 'Persistent efflorescence with spalling = active moisture intrusion. Call mason within 30 days.',
  },
  cracking: {
    low: 'Hairline cracks under 1/16" — normal DFW thermal cycling. Tuckpoint with matching mortar.',
    medium: 'Stair-step cracks along mortar joints — possible foundation movement. Foundation eval first.',
    high: 'Horizontal cracks or bulging = structural concern. Stop and call structural engineer immediately.',
  },
  spalling: {
    low: 'Surface flaking on 1-2 bricks — freeze-thaw from rare DFW ice events. Replace individual bricks.',
    medium: 'Multiple spalling bricks — moisture behind wall. Investigate weep holes and flashing.',
    high: 'Widespread spalling — systemic moisture failure. Full inspection before any repair attempt.',
  },
};

export default function DFWBrickMasonryGuide() {
  const [issue, setIssue] = useState('');
  const [vintage, setVintage] = useState('');
  const [severity, setSeverity] = useState('');
  const [result, setResult] = useState('');

  function analyze() {
    if (!issue || !vintage || !severity) { setResult('Select all three options to get your repair guidance.'); return; }
    const urgencyData = URGENCY_MAP[issue]?.[severity] ?? 'No data for this combination.';
    const mortarData = MORTAR_MAP[vintage] ?? 'Match original mortar type for your era.';
    setResult(urgencyData + ' | Mortar: ' + mortarData);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🧱 DFW MASONRY GUIDE</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem' }}>DFW Brick Masonry Guide</h1>
          <p style={{ color: '#8899AA', lineHeight: 1.6, margin: 0 }}>
            DFW homes span decades of brick construction — each era uses different brick types, mortar compositions, and failure modes.
            Get repair guidance matched to your home's vintage and current issue.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {BRICK_TYPES.map(b => (
            <div key={b.type} style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{b.type}</div>
              <div style={{ color: '#8899AA', fontSize: '0.75rem', margin: '0.25rem 0' }}>Era: {b.era}</div>
              <div style={{ color: '#C5D3E0', fontSize: '0.8rem', lineHeight: 1.5 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem' }}>🔍 Brick Issue Analyzer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Issue Type</label>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select issue</option>
                <option value='efflorescence'>White deposits (efflorescence)</option>
                <option value='cracking'>Cracks in brick or mortar</option>
                <option value='spalling'>Spalling / flaking face</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Home Vintage</label>
              <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select era</option>
                <option value='Pre-1960'>Pre-1960</option>
                <option value='1960-1990'>1960–1990</option>
                <option value='1990-2010'>1990–2010</option>
                <option value='2010+'>2010+</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select severity</option>
                <option value='low'>Low — cosmetic</option>
                <option value='medium'>Medium — spreading</option>
                <option value='high'>High — structural concern</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Get Repair Guidance
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', color: '#E8EDF5', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>⚠️ DFW Tuckpointing: When to Act</h2>
          <p style={{ color: '#8899AA', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            Tuckpoint when mortar joints are recessed more than 1/4"  or crumble under finger pressure. DFW's heat cycles accelerate mortar breakdown —
            joints that pass in spring may fail by September. Never use caulk as a mortar substitute on DFW brick — it traps moisture and causes faster spalling.
          </p>
        </div>
      </div>
    </div>
  );
}
