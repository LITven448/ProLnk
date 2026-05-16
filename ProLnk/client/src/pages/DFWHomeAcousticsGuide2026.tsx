import { useState } from 'react';

const solutions = [
  { problem: 'echo', label: 'Echo / Reverb in Open Floor Plan', fixes: [
    '🪵 Area rug (8x10 min) — absorbs 40% of mid-frequency sound',
    '🛋️ Upholstered furniture — sectional sofas absorb 3x more than leather',
    '📚 Bookshelves on bare walls — irregular surfaces diffuse sound',
    '🪟 Curtains floor-to-ceiling — double-lined absorb high freq echo',
    '🎨 Acoustic art panels — 2" thick fiberglass wrapped in fabric',
  ]},
  { problem: 'neighbor', label: 'Neighbor / Street Noise', fixes: [
    '🧱 Mass-loaded vinyl (MLV) between drywall layers — STC 52+',
    '🚪 Solid-core doors — hollow core passes 30dB more sound',
    '🪟 Window inserts (indow windows) — add STC 12 without replacement',
    '💨 Door sweeps + acoustic weatherstripping seal air gaps',
    '🌿 Exterior landscaping — dense hedges cut 5–10dB',
  ]},
  { problem: 'studio', label: 'Home Studio / Media Room', fixes: [
    '🎵 Double-stud wall with 1" air gap — STC 60+ isolation',
    '🟫 Rockwool Safe n Sound insulation in all cavities',
    '🏗️ Decoupled ceiling with resilient channels — stop structure-borne noise',
    '🔲 Acoustic foam panels (bass traps in corners, broadband on walls)',
    '🪟 Double-pane window with laminated glass — STC 45',
  ]},
  { problem: 'hvac', label: 'HVAC / Mechanical Noise', fixes: [
    '🌀 Flex duct connections isolate equipment vibration',
    '📐 Duct lining with 1" acoustic duct liner',
    '🔇 Sound boot at register — reduces turbulence noise',
    '⚙️ Variable speed air handler — 50% quieter than single-stage',
    '🏠 Equipment closet with acoustic door and floor pad',
  ]},
];

export default function DFWHomeAcousticsGuide2026() {
  const [problem, setProblem] = useState('');
  const sol = solutions.find(s => s.problem === problem);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🔇 DFW Home Acoustics Guide 2026</h1>
        <p style={{ color: '#9BA3B2', fontSize: 15, marginBottom: 32 }}>
          DFW new construction favors open floor plans, hard tile floors, and 10-foot ceilings — a triple echo threat. The average reverberation time in an untreated DFW open-plan home is 1.2 seconds. Target: under 0.5 seconds for comfortable conversation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[{ k: '40%', l: 'Sound absorbed by area rug' },{ k: 'STC 52', l: 'MLV drywall sandwich rating' },{ k: '1.2s', l: 'Avg reverb in open DFW home' },{ k: '0.5s', l: 'Target reverb for comfort' },{ k: 'STC 60+', l: 'Double-stud studio wall rating' },{ k: '3x', l: 'Upholstered vs leather absorption' }].map(s => (
            <div key={s.k} style={{ background: '#111E33', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid #1C2D4A' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.k}</div>
              <div style={{ color: '#9BA3B2', fontSize: 11, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Select Your Noise Problem</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {solutions.map(s => (
              <button key={s.problem} onClick={() => setProblem(problem === s.problem ? '' : s.problem)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: problem === s.problem ? '#F5E642' : '#1C2D4A', color: problem === s.problem ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                {s.label.split(' / ')[0]}
              </button>
            ))}
          </div>
        </div>
        {sol && (
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>🔇 {sol.label} — Solutions</div>
            {sol.fixes.map(f => (
              <div key={f} style={{ color: '#CBD1DC', fontSize: 14, marginBottom: 10 }}>{f}</div>
            ))}
          </div>
        )}
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Find an Acoustic Contractor in DFW</div>
          <div style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with insulation, drywall, and acoustics specialists.</div>
        </div>
      </div>
    </div>
  );
}