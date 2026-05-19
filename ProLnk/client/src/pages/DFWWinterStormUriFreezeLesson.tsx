import { useState } from 'react';

const lessons = [
  { emoji: '🔵', title: 'Insulate Exterior Pipes', detail: 'Pipes on exterior walls and in attics with no heat are first to freeze. Foam pipe insulation costs $2/ft — the repair costs $2,000+.' },
  { emoji: '🚰', title: 'Know Your Main Shutoff', detail: 'In Uri, many homeowners didn\’t know where their shutoff was. When pipes burst, every second counts. Find it now. Test it.' },
  { emoji: '🔥', title: 'Backup Heat Source', detail: 'When the grid failed, homes lost heat for 4-5 days. A propane heater, wood stove, or generator keeps core rooms livable.' },
  { emoji: '⚡', title: 'Generator or Battery Backup', detail: 'A 3,500W generator runs a space heater, lights, and phone chargers. Whole-home battery backup (e.g. Powerwall) is the premium option.' },
  { emoji: '🏠', title: 'Pipes on Exterior Walls', detail: 'Kitchen and bathroom pipes on exterior walls burst most in Uri. Insulate under sinks and inside cabinets — open cabinet doors during freeze events.' },
  { emoji: '🌡️', title: 'Attic Pipe Runs', detail: 'Attics in DFW are unheated. Water supply lines run through many DFW attics. These burst first. Foam wrap or reroute during renovation.' },
];

const scores: Record<string, { score: number; gaps: string[]; color: string }> = {
  'Slab, built before 2000': {
    score: 55,
    gaps: ['High probability of attic pipe runs — inspect and insulate', 'Likely no backup heat source installed', 'Shutoff valve may be in crawl space or yard — test now', 'Consider whole-home water shutoff smart sensor'],
    color: '#ef4444',
  },
  'Slab, built 2000-2015': {
    score: 70,
    gaps: ['Check if attic pipes are insulated — not guaranteed', 'Add pipe insulation in attic and garage', 'Install a standby generator or battery backup', 'Pre-program emergency plumber contact'],
    color: '#f59e0b',
  },
  'Slab, built after 2015': {
    score: 80,
    gaps: ['Verify builder used interior pipe routing (code changed post-Uri)', 'Confirm irrigation backflow preventer has insulation cover', 'Consider smart water sensor for early leak detection', 'Test main shutoff annually'],
    color: '#22c55e',
  },
  'Pier & Beam, any age': {
    score: 45,
    gaps: ['Crawl space pipes are extremely vulnerable — insulate all runs', 'Close crawl space vents before any freeze event', 'Install heat tape on exposed crawl space pipes', 'This home type had highest pipe burst rate in Uri'],
    color: '#ef4444',
  },
};

export default function DFWWinterStormUriFreezeLesson() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧊</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Winter Storm Uri: What We Learned</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>February 2021 exposed every vulnerability in DFW homes. Here's how to not repeat it.</p>
          <div style={{ display: 'inline-block', background: '#1e3a5f', borderRadius: 8, padding: '6px 16px', marginTop: 10, fontSize: 13, color: '#94a3b8′ }}>
            📅 Feb 10–20, 2021 · 246 deaths · $195B in damage statewide
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {lessons.map((l) => (
            <div key={l.title} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{l.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>{l.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{l.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: 12 }}>📊 Your Freeze Prep Score</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your home type:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(scores).map((k) => (
              <button key={k} onClick={() => setSelected(k)}
                style={{ background: selected === k ? '#F5E642′ : '#1e3a5f', color: selected === k ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {k}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: scores[selected].color }}>{scores[selected].score}</div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>Freeze Prep Score</div>
                  <div style={{ color: scores[selected].color, fontWeight: 600 }}>{scores[selected].score < 60 ? 'High Risk' : scores[selected].score < 75 ? 'Moderate Risk' : 'Lower Risk'}</div>
                </div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Gaps to address:</div>
              <ul style={{ color: '#e2e8f0', lineHeight: 2, paddingLeft: 20 }}>
                {scores[selected].gaps.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628′ }}>Uri was a warning. The next freeze won’t be.</div>
          <div style={{ color: '#0A1628', marginTop: 6 }}>ProLnk connects DFW homeowners with licensed plumbers and contractors.</div>
        </div>
      </div>
    </div>
  );
}
