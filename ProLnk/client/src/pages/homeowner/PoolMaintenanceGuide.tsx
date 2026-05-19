import { useState } from 'react';

const seasons = [
  {
    emoji: '🌸',
    season: 'Spring Opening',
    tasks: [
      'Remove, clean, and store the winter cover',
      'Reassemble pump, filter, and heater connections',
      'Fill pool to normal level (mid-skimmer)',
      'Prime the pump and check for leaks',
      'Shock the pool: 2 lbs of shock per 10,000 gallons',
      'Run the filter 24/7 for 48 hours until water clears',
      'Balance chemicals: pH 7.2–7.6, alkalinity 80–120 ppm, CYA 30–50 ppm',
    ],
  },
  {
    emoji: '☀️',
    season: 'Summer (Weekly)',
    tasks: [
      'Test and adjust pH and chlorine every 7 days',
      'Skim surface debris daily or every other day',
      'Vacuum pool floor weekly — brush walls first to loosen algae',
      'Backwash sand/DE filter when pressure rises 8–10 psi above clean reading',
      'Check water level — evaporation and splash-out can drop it below skimmer',
      'Inspect pump basket and skimmer basket; clean if blocked',
    ],
  },
  {
    emoji: '🍂',
    season: 'Fall Closing',
    tasks: [
      'Do a final balance: raise pH to 7.4–7.6, alkalinity 100–120 ppm',
      'Shock pool and add algaecide for winter',
      'Lower water level 4–6″ below return jets (skimmer level in cold climates)',
      'Blow out all plumbing lines with an air compressor',
      'Add antifreeze to lines in freeze-zone climates',
      'Plug return jets and skimmer with rubber plugs',
      'Install and secure the winter cover',
    ],
  },
  {
    emoji: '❄️',
    season: 'Winter Monitoring',
    tasks: [
      'Check cover monthly — remove standing water with a cover pump',
      'Add winter chemicals if needed to prevent algae blooms',
      'Inspect cover for damage after major storms',
      'In mild climates: run pump 2–4 hrs/day to prevent freeze damage',
    ],
  },
];

const chemCard = [
  { param: 'pH', target: '7.2–7.6', low: 'Eye irritation, corrosion', high: 'Cloudy water, scale buildup' },
  { param: 'Free Chlorine', target: '1–3 ppm', low: 'Algae growth, bacteria', high: 'Bleaches swimwear, irritation' },
  { param: 'Total Alkalinity', target: '80–120 ppm', low: 'pH swings wildly', high: 'Scale, cloudy water' },
  { param: 'Cyanuric Acid', target: '30–50 ppm', low: 'Chlorine burns off fast', high: 'Chlorine becomes ineffective' },
  { param: 'Calcium Hardness', target: '200–400 ppm', low: 'Etches plaster, corrodes metal', high: 'Scale, rough surfaces' },
  { param: 'Salt (salt pools)', target: '3000–3500 ppm', low: 'Generator alarms, low chlorine', high: 'Corrosion risk' },
];

const troubleshooting = [
  { problem: '🟢 Green Water', cause: 'Algae bloom — usually low chlorine or pH drift', fix: 'Shock with 3× normal dose, brush walls, run filter continuously, retest in 24 hrs' },
  { problem: '🌫️ Cloudy Water', cause: 'High pH, high alkalinity, or poor filtration', fix: 'Test all parameters, add clarifier, run filter 24/7, backwash when pressure rises' },
  { problem: '🟡 Yellow/Mustard Algae', cause: 'Algae resistant to normal chlorine', fix: 'Use mustard algaecide, brush aggressively, shock to 15–20 ppm, vacuum to waste' },
  { problem: '🔴 Red/Pink Biofilm', cause: 'Bacteria (not algae) in crevices', fix: 'Shock heavily, scrub all surfaces, clean filter cartridge, treat with quaternary algaecide' },
  { problem: '👁️ Eye/Skin Irritation', cause: 'Usually pH out of range or high combined chlorine', fix: 'Test pH first, then shock to break combined chlorine (chloramines)' },
  { problem: '🫧 Foamy Water', cause: 'Soaps, sunscreen, algaecide overuse', fix: 'Add anti-foam agent, dilute by backwashing and adding fresh water, warn swimmers to shower first' },
];

export default function PoolMaintenanceGuide() {
  const [activeSeason, setActiveSeason] = useState<number | null>(0);
  const [activeIssue, setActiveIssue] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🏊</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Pool Maintenance Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', marginTop: 12, maxWidth: 620, margin: '12px auto 0′ }}>
            Year-round schedules, chemistry cheat sheets, and troubleshooting for a crystal-clear pool all season.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 28, flexWrap: 'wrap' }}>
            {['4 Season Schedules', 'Chemistry Guide', '6 Problem Fixes'].map(tag => (
              <span key={tag} style={{ background: '#0C2547', color: '#38BDF8', padding: '6px 18px', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Season Schedules */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>📅 Seasonal Maintenance</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24, fontSize: 15 }}>Tap a season to see the full checklist.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 20 }}>
            {seasons.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSeason(activeSeason === i ? null : i)}
                style={{
                  background: activeSeason === i ? '#0C4A6E' : '#0F2340',
                  border: `2px solid ${activeSeason === i ? '#38BDF8' : '#1E3A5F'}`,
                  borderRadius: 12,
                  padding: '16px 12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, color: activeSeason === i ? '#38BDF8′ : '#FFFFFF', fontSize: 14 }}>{s.season}</div>
              </button>
            ))}
          </div>
          {activeSeason !== null && (
            <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>{seasons[activeSeason].emoji}</span>
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: 22, fontWeight: 700 }}>{seasons[activeSeason].season} Checklist</h3>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                {seasons[activeSeason].tasks.map((t, j) => (
                  <li key={j} style={{ color: '#CBD5E1', marginBottom: 10, fontSize: 15, lineHeight: 1.6 }}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Chemistry Reference */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#FFFFFF' }}>🧪 Water Chemistry Reference</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0C4A6E' }}>
                  {['Parameter', 'Target Range', 'Too Low →', 'Too High →'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: '#38BDF8', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chemCard.map((c, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#0F2340′ : '#0A1628', borderBottom: '1px solid #1E3A5F' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#FFFFFF' }}>{c.param}</td>
                    <td style={{ padding: '12px 14px', color: '#34D399', fontWeight: 600 }}>{c.target}</td>
                    <td style={{ padding: '12px 14px', color: '#FCA5A5′ }}>{c.low}</td>
                    <td style={{ padding: '12px 14px', color: '#FCD34D' }}>{c.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Troubleshooting */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>🔧 Troubleshooting Common Problems</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24, fontSize: 15 }}>Tap a problem to see the diagnosis and fix.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {troubleshooting.map((t, i) => {
              const isOpen = activeIssue === i;
              return (
                <div
                  key={i}
                  style={{ background: isOpen ? '#0F2340′ : '#0A1628', border: `1px solid ${isOpen ? '#38BDF8' : '#1E3A5F'}`, borderRadius: 12, overflow: ’hidden', cursor: 'pointer' }}
                  onClick={() => setActiveIssue(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15 }}>{t.problem}</div>
                    <div style={{ color: '#38BDF8', fontSize: 18 }}>{isOpen ? '▲' : '▼'}</div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 20px 20px', borderTop: '1px solid #1E3A5F' }}>
                      <div style={{ paddingTop: 14 }}>
                        <div style={{ marginBottom: 10 }}>
                          <span style={{ fontWeight: 700, color: '#FCD34D' }}>Cause: </span>
                          <span style={{ color: '#CBD5E1', fontSize: 14 }}>{t.cause}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 700, color: '#34D399′ }}>Fix: </span>
                          <span style={{ color: '#CBD5E1', fontSize: 14 }}>{t.fix}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment Tips */}
        <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 20px', color: '#FFFFFF' }}>⚙️ Equipment Care Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { emoji: '🔄', tip: 'Run your pump 8–12 hrs/day in summer — use a timer to automate it' },
              { emoji: '🧽', tip: 'Clean cartridge filters monthly; replace every 3–5 years' },
              { emoji: '🌡️', tip: 'Set your pool heater to 78–82°F for comfort and efficiency' },
              { emoji: '🤖', tip: 'Robotic cleaners outperform pressure-side and suction-side for debris pickup' },
              { emoji: '💡', tip: 'LED pool lights last 10× longer than incandescent and use 75% less energy' },
              { emoji: '🏷️', tip: 'Label your chemical storage clearly — never mix chlorine and acid' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.emoji}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{item.tip}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0C4A6E, #0A1628)', borderRadius: 20, padding: 44, textAlign: 'center', border: '1px solid #0284C7′ }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>💧</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
            Rather Let a Pro Handle It?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Connect with vetted pool service pros near you. Weekly maintenance, openings, closings, and repairs.
          </p>
          <button
            style={{ background: '#0284C7', color: '#FFFFFF', border: 'none', borderRadius: 10, padding: '14px 40px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
            onClick={() => window.location.href = '/homeowner/signup'}
          >
            Get Free Quotes →
          </button>
        </div>

      </div>
    </div>
  );
}
