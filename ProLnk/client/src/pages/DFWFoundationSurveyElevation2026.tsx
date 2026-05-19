import { useState } from 'react';

const concepts = [
  { icon: '📐', title: 'What the Ziplevel Measures', detail: 'Uses liquid pressure to measure elevation differences across a floor plan. Accurate to ±1/16″. Takes readings at 8–16 points inside a DFW home and produces a contour map of floor movement.' },
  { icon: '📄', title: 'Reading Your Survey Report', detail: 'Reports show inches above or below the reference point (usually front door). Negative numbers = settlement. Positive = heave. DFW expansive clay causes both, often in same home.' },
  { icon: '🗺️', title: 'What the Numbers Mean', detail: 'Under 1″ differential: monitor only. 1–2″: minor distress, document and watch. 2–4″: moderate, engineer evaluation needed. Over 4″: active movement, immediate assessment required.' },
  { icon: '🏗️', title: 'When Survey Is Needed vs Visual', detail: 'Visual assessment (cracks, sticking doors) confirms something is wrong. Elevation survey tells you WHERE, HOW MUCH, and which direction movement is occurring — essential for repair scoping.' },
  { icon: '📅', title: 'DFW Survey Timing', detail: 'Best done in late summer (peak dry season) and late spring (peak wet season) to capture full movement range. Single survey misses seasonal cycle data critical for DFW clay behavior.' },
];

const concerns = [
  { concern: 'Doors sticking in summer only', guide: 'Likely seasonal clay shrinkage — heave cycle. Ziplevel survey in August vs. March will show differential. Usually under 1″ — monitor, not repair.' },
  { concern: 'Cracks diagonal from door corners', guide: 'Classic DFW foundation distress pattern. Elevation survey will identify which corner has settled. Readings over 2″ differential indicate pier evaluation needed.' },
  { concern: 'Sloping floor toward one room', guide: 'Ziplevel will quantify slope precisely. 1″ per 20 feet is borderline; over 1″ per 10 feet typically requires pier intervention under that zone.' },
  { concern: 'Separation at wall-ceiling junction', guide: 'Often indicates differential settlement between interior and perimeter. Survey the full grid — look for interior high point vs. perimeter low.' },
  { concern: 'Previous repair, checking if holding', guide: 'Post-repair elevation survey is the gold standard for DFW warranty verification. Compare to pre-repair survey to quantify improvement.' },
];

export default function DFWFoundationSurveyElevation2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW FOUNDATION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Foundation Elevation Survey Guide 2026</h1>
        <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 32 }}>Understanding the Ziplevel and elevation reports used by DFW foundation contractors.</p>

        <div style={{ marginBottom: 36 }}>
          {concepts.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#0f1f38', borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f38', borderRadius: 12, padding: '24px 20px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 Survey Concern → Elevation Tool Guide</div>
          <p style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Select your foundation concern to understand what the elevation survey will show:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: selected === i ? '#F5E642′ : '#162035', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  {c.concern}
                </button>
                {selected === i && (
                  <div style={{ background: '#1a2d4a', borderRadius: '0 0 8px 8px', padding: '12px 16px', color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>
                    {c.guide}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📏 Need a DFW Foundation Survey?</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 6 }}>ProLnk connects you with DFW foundation specialists who include elevation surveys with assessments — free quotes.</div>
        </div>
      </div>
    </div>
  );
}