import { useState } from 'react';

const eras = [
  { id: '1920s1940s', label: '🏡 1920s–1940s Bungalow', tips: ['Original wood framing may have insect or moisture damage — hire structural inspector', 'Knob-and-tube wiring likely still present in older sections — full rewire recommended', 'Galvanized supply pipes near end of life — repipe with PEX or copper before failures', 'Plaster walls require specialty repair — find a plasterer, not just a drywall contractor', 'Old growth wood floors: refinish rather than replace, check for bounce indicating subfloor rot'] },
  { id: '1950s1960s', label: '🏠 1950s–1960s Ranch', tips: ['Aluminum wiring in some 1960s homes — have an electrician install anti-oxidant connectors', 'Asbestos floor tiles common in this era — do not sand or disturb, encapsulate or pro remove', 'Single-story slab foundation: inspect expansion joints annually for East Dallas clay movement', 'HVAC ductwork often in attic — check for disconnected sections and air leaks annually', 'Roof may have multiple layers — remove all before reroofing for proper inspection'] },
  { id: '1970s1990s', label: '🏘️ 1970s–1990s Cottage/Reno', tips: ['Polybutylene pipe (PB) used in 1978–1995 — gray plastic, prone to failure, replace proactively', 'HVAC system likely approaching or past 15-year service life — budget for replacement', 'Deck and fence wood deterioration: inspect for rot at ground contact points annually', 'Windows likely original single-pane — replacement payback in 4–6 years via energy savings', 'Check attic insulation R-value: most 1980s homes have R-11, upgrade to R-38 for DFW climate'] },
];

export default function DFWDallasWhiteRockGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = eras.find(e => e.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1 }}>
          PROLNK · DFW LOCAL GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🌊 Dallas White Rock Lake Area
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          East Dallas charm meets lakeside living. Bungalows and cottages dating back to the 1920s
          line the streets near White Rock Lake. Active renovation culture — but older bones mean
          maintenance requires a different approach than newer suburbs.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📍 Area Snapshot</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ZIP codes 75218, 75214 · White Rock Lake park access · Lakewood adjacent ·
            Historic preservation areas in Lakewood Heights · DART M-Line nearby ·
            Strong buyer demand pushing renovation pace
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
          Select your home era for a tailored maintenance guide:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {eras.map(e => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id === selected ? null : e.id)}
              style={{
                background: selected === e.id ? '#F5E642' : '#0f2040',
                color: selected === e.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === e.id ? '#F5E642' : '#1e3a5f'),
                borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              {e.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
              {active.label} — 2026 Priorities
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🌳 Lakeside Tree Risks</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Mature trees near White Rock Lake add value but pose roof and foundation risks.
            Have a certified arborist inspect trees within 30 feet of your home every 2 years.
            Post-storm inspection is critical — hidden cracking can lead to delayed failure.
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.3rem' }}>Find White Rock Lake area specialists</div>
          <div style={{ color: '#0A1628', fontSize: '0.85rem' }}>Historic home experts and lake-adjacent property pros on ProLnk</div>
        </div>
      </div>
    </div>
  );
}