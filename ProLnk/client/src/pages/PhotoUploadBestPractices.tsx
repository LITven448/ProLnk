import { useState } from 'react';

const subjects = [
  {
    name: 'HVAC',
    emoji: '❄️',
    shots: [
      'Condenser unit from 45° angle showing full unit',
      'Age/model sticker closeup (serial number visible)',
      'Duct connections at air handler',
      'Thermostat face and wiring panel',
    ],
    tip: 'Shoot the condenser before opening the panel — capture context first, detail second.',
  },
  {
    name: 'Roof',
    emoji: '🏠',
    shots: [
      'All 4 roof elevations from ground level',
      'Gutter closeup — debris and slope visible',
      'Any soft spots or buckling areas (mark with tape if needed)',
      'Ridge line from end of house',
    ],
    tip: 'Shoot at a 30° angle from ground — this reveals slope and surface texture better than looking straight up.',
  },
  {
    name: 'Foundation',
    emoji: '🏗️',
    shots: [
      'Full perimeter walk — one photo every 20 feet',
      'Any visible cracks (place a coin for scale)',
      'Drainage slope away from house',
      'Interior slab at corners and doors',
    ],
    tip: 'For cracks, photograph at eye level to capture depth and width accurately.',
  },
  {
    name: 'Electrical Panel',
    emoji: '⚡',
    shots: [
      'Panel door open — all breakers visible',
      'Main breaker label and amperage',
      'Any double-tapped breakers or burn marks',
      'Service entrance wires from exterior',
    ],
    tip: 'Use a flashlight or phone torch inside the panel — AI detection rate increases 40% with properly lit breaker labels.',
  },
  {
    name: 'Plumbing',
    emoji: '🔧',
    shots: [
      'Water heater front — full unit in frame',
      'Water heater side — age sticker visible',
      'Under-sink connections — both hot and cold lines',
      'Any visible pipe insulation or corrosion',
    ],
    tip: 'Open the cabinet fully and back up — AI needs to see the full context, not just a detail crop.',
  },
  {
    name: 'Windows',
    emoji: '🪟',
    shots: [
      'Exterior from outside — full window in frame with surrounding trim',
      'Interior reveal — frame gap and sill condition',
      'Weatherstripping closeup on bottom sash',
      'Any visible fogging or seal failure between panes',
    ],
    tip: 'Shoot windows with exterior light behind you, not behind the window — avoids glare and blown highlights.',
  },
  {
    name: 'Attic',
    emoji: '🏘️',
    shots: [
      'Insulation depth at hatch — ruler in frame',
      'Any moisture staining on decking (brown/dark spots)',
      'Soffit vents — clear or blocked',
      'Ridge vent from inside looking up',
    ],
    tip: 'Use your phone’s night mode — attic photos need maximum light capture to show insulation texture and moisture patterns.',
  },
  {
    name: 'Exterior',
    emoji: '🏡',
    shots: [
      'All 4 elevations from corners — capture full wall height',
      'Roof line from each elevation',
      'Any discoloration, cracking, or efflorescence',
      'Downspout discharge points',
    ],
    tip: 'Shoot from 30 feet back when possible — full house shots help AI map structure before individual defects.',
  },
];

const mistakes = [
  { emoji: '📵', label: 'Blurry shots', fix: 'Tap to focus before shooting. Hold phone steady for 1 second after tap.' },
  { emoji: '🌑', label: 'Too dark', fix: 'Use flashlight mode. Avoid backlighting. Shoot toward the light source, not away.' },
  { emoji: '🔍', label: 'Too close / no context', fix: 'Back up 3–5 feet. Show the full system before the detail shot.' },
  { emoji: '🔄', label: 'Wrong orientation', fix: 'Always shoot landscape (horizontal). Portrait crops AI detection area by 30%.' },
];

const equipment = [
  { emoji: '📱', label: 'Best phone camera', value: 'iPhone 13+ or Pixel 6+ — use main lens, not ultrawide' },
  { emoji: '⚙️', label: 'Settings', value: 'HDR off, grid on, 12MP minimum, live photo off' },
  { emoji: '💡', label: 'Flash', value: 'Use for enclosed spaces (attics, crawlspaces, under sinks) — disable outdoors' },
  { emoji: '🌤️', label: 'Best conditions', value: 'Overcast day for exterior — no harsh shadows. Artificial light for interior.' },
];

export default function PhotoUploadBestPractices() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1B2A4A', color: '#fff', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#F5C842', color: '#1B2A4A', borderRadius: 6, padding: '4px 14px', fontWeight: 700, fontSize: 13, marginBottom: 18 }}>
          PRO PHOTO GUIDE
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, margin: '0 0 16px' }}>
          The Complete Photo Guide for ProLnk Partners
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 580, margin: '0 auto' }}>
          Maximize Every Upload — Better photos mean higher AI detection rates, faster matches, and more jobs closed.
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#1B2A4A', color: '#fff', borderRadius: 12, padding: '20px 28px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 28 }}>⏱️</span>
          <div>
            <strong>Pro tip:</strong> Photos uploaded within 2 hours of job completion have a <strong style={{ color: '#F5C842' }}>23% higher AI detection rate</strong> — upload while on site.
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 20 }}>📱 Equipment & Settings</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {equipment.map(e => (
            <div key={e.label} style={{ background: '#fff', borderRadius: 10, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{e.emoji}</div>
              <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: 14, marginBottom: 6 }}>{e.label}</div>
              <div style={{ color: '#555', fontSize: 14 }}>{e.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 8 }}>🏠 Subject-Specific Guides</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {subjects.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: activeTab === i ? '#1B2A4A' : '#E8EDF5',
                color: activeTab === i ? '#fff' : '#1B2A4A',
              }}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {subjects[activeTab] && (
          <div style={{ background: '#fff', borderRadius: 14, padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 48 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 20 }}>
              {subjects[activeTab].emoji} {subjects[activeTab].name} — What to Photograph
            </h3>
            <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              {subjects[activeTab].shots.map((shot, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ background: '#F5C842', color: '#1B2A4A', fontWeight: 800, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>{i + 1}</span>
                  <span style={{ color: '#333', fontSize: 16, paddingTop: 4 }}>{shot}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#F0F4FF', borderRadius: 8, padding: '14px 18px', color: '#1B2A4A', fontSize: 15 }}>
              💡 <strong>Field tip:</strong> {subjects[activeTab].tip}
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 8 }}>🔄 Before & After Guide</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 48 }}>
          <p style={{ color: '#333', fontSize: 16, margin: '0 0 16px' }}>
            Always capture both before and after photos for maximum AI detection. Before photos establish a baseline; after photos prove job quality and close the loop for homeowner confidence scoring.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#FFF4F4', borderRadius: 8, padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#C0392B', marginBottom: 8 }}>📸 BEFORE</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 14 }}>
                <li>Full system before any work begins</li>
                <li>Any existing damage or wear</li>
                <li>Current state of connections/components</li>
              </ul>
            </div>
            <div style={{ background: '#F4FFF4', borderRadius: 8, padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#2A7A3B', marginBottom: 8 }}>✅ AFTER</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#333', fontSize: 14 }}>
                <li>Same angles as before shots</li>
                <li>New components with labels visible</li>
                <li>Clean workspace — show professionalism</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1B2A4A', marginBottom: 16 }}>❌ Common Mistakes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
          {mistakes.map(m => (
            <div key={m.label} style={{ background: '#fff', borderRadius: 10, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
              <div style={{ fontWeight: 700, color: '#C0392B', fontSize: 15, marginBottom: 6 }}>{m.label}</div>
              <div style={{ color: '#555', fontSize: 14 }}>{m.fix}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '48px 24px', background: '#1B2A4A', borderRadius: 16 }}>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 16 }}>Ready to put your photos to work?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px' }}>
            Apply as a ProLnk partner and let AI match your verified work photos to homeowners who need exactly what you do.
          </p>
          <a
            href="/apply"
            style={{
              background: '#F5C842', color: '#1B2A4A', fontWeight: 800,
              padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 17,
            }}
          >
            Apply as a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
