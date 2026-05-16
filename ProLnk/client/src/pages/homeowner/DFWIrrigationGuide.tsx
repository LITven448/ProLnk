import { useState } from 'react';

const schedule = [
  { season: 'Spring', freq: '2x / week', duration: '30 min / zone', note: 'Resume after last freeze (mid-March DFW avg)' },
  { season: 'Summer', freq: '3–4x / week', duration: '40–45 min / zone', note: '100°F+ heat — clay soil dries fast at the surface' },
  { season: 'Fall', freq: '1–2x / week', duration: '25 min / zone', note: 'Reduce as temps drop below 85°F' },
  { season: 'Winter', freq: '0–1x / week', duration: '15 min / zone', note: 'Avoid watering before freeze events (below 32°F)' },
];

const maintenance = [
  { id: 'heads', label: 'Inspect all sprinkler heads each spring' },
  { id: 'broken', label: 'Check for broken or clogged heads' },
  { id: 'sensor', label: 'Calibrate rain sensor annually' },
  { id: 'winterize', label: 'Winterize (blow out) before first freeze' },
  { id: 'smart', label: 'Smart controller installed (Rachio, RainBird, Hunter)' },
];

export default function DFWIrrigationGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>💧</span>
          <span style={{ color: '#FACC15', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          DFW Irrigation Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 40 }}>
          Water Smart, Protect Your Foundation
        </p>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>📍 Why Irrigation Matters in DFW</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            DFW sits on highly expansive clay soil — it swells when wet and shrinks when dry. <strong style={{ color: '#fff' }}>90%+ of DFW foundation problems</strong> relate to inconsistent soil moisture. A properly maintained irrigation system isn't a luxury — it's foundation protection. Dallas averages only 37 inches of rain annually, with extreme summer droughts that dry the soil to 12+ inches deep.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Seasonal Watering Schedule</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {schedule.map(({ season, freq, duration, note }) => (
            <div key={season} style={{ background: '#132038', borderRadius: 10, padding: '18px 22px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ minWidth: 80 }}>
                <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>Season</p>
                <p style={{ fontWeight: 700, fontSize: 16 }}>{season}</p>
              </div>
              <div style={{ minWidth: 100 }}>
                <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>Frequency</p>
                <p style={{ fontWeight: 700, color: '#FACC15' }}>{freq}</p>
              </div>
              <div style={{ minWidth: 120 }}>
                <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>Duration</p>
                <p style={{ fontWeight: 700, color: '#34D399' }}>{duration}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>Note</p>
                <p style={{ color: '#CBD5E1', fontSize: 14 }}>{note}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Annual Maintenance Checklist</h2>
        <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>
          {doneCount} of {maintenance.length} items complete
        </p>

        <div style={{ background: '#132038', borderRadius: 12, padding: '20px 24px', marginBottom: 32 }}>
          {maintenance.map(item => (
            <label
              key={item.id}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #1E3050', cursor: 'pointer' }}
            >
              <div
                onClick={() => toggle(item.id)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  border: checked[item.id] ? '2px solid #34D399' : '2px solid #2A3A52',
                  background: checked[item.id] ? '#34D399' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {checked[item.id] && <span style={{ color: '#0A1628', fontSize: 14, fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: 15 }}>{item.label}</span>
            </label>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>🏠 Foundation Watering Strategy</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            Run irrigation on the <strong style={{ color: '#fff' }}>foundation perimeter only</strong> — not in the middle of the yard — to maintain consistent soil moisture around your slab. The goal is to prevent the clay from drying and pulling away from your foundation.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            In extreme summer heat (100°F+), add a soaker hose around the foundation perimeter and run it 30 minutes every other day. This is the single most cost-effective foundation protection measure for DFW homes.
          </p>
        </div>

        <div style={{ background: '#1A2C44', border: '1px solid #2A3A52', borderRadius: 12, padding: '20px 24px', marginBottom: 40 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>🤖 Smart Controllers — Worth It?</h3>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 8 }}>
            <strong style={{ color: '#fff' }}>Yes.</strong> Rachio, RainBird, and Hunter smart controllers integrate with weather data and skip watering on rain days automatically. DFW homeowners save <strong style={{ color: '#34D399' }}>30–50% on water bills</strong> with smart controllers — typical payback is 1–2 summers.
          </p>
          <p style={{ color: '#64748B', fontSize: 13 }}>Installed cost: $200–$450 depending on zone count.</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/homeowner/signup"
            style={{
              display: 'inline-block',
              background: '#FACC15',
              color: '#0A1628',
              fontWeight: 800,
              fontSize: 16,
              padding: '16px 36px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Schedule Irrigation Service →
          </a>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>Free. No commitment. DFW-verified contractors only.</p>
        </div>

      </div>
    </div>
  );
}
