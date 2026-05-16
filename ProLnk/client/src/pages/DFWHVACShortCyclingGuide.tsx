import { useState } from 'react';

const causes = [
  {
    description: 'Runs 2–5 minutes then shuts off',
    label: 'Very Short Cycle (2–5 min)',
    cause: 'Likely oversized system for your DFW home',
    detail: 'Oversized ACs cool air fast but do not run long enough to remove DFW humidity. The home feels cool but clammy.',
    fix: 'Manual J load calculation to confirm sizing. If oversized, replacement or zoning system needed.',
    urgency: 'High — humidity damage and comfort issues compound over time',
    dfwNote: 'New construction in DFW is frequently over-cooled — builders spec large units to impress buyers',
  },
  {
    description: 'Runs 8–12 minutes then shuts off repeatedly',
    label: 'Moderate Short Cycle (8–12 min)',
    cause: 'Refrigerant issue, dirty evaporator coil, or thermostat placement',
    detail: 'Low refrigerant causes evaporator freeze-up. Dirty coil blocks airflow and triggers high-pressure cutoff. Bad thermostat location (near vents, sunny walls) causes false readings.',
    fix: 'Check thermostat location first (free). Then inspect evaporator coil. Refrigerant check requires pro.',
    urgency: 'Medium — compressor stress accumulates',
    dfwNote: 'Thermostat on south-facing walls or near west windows is a DFW-specific issue — afternoon sun skews readings',
  },
  {
    description: 'Short cycles only on hottest days (100°F+)',
    label: 'Heat-Triggered Short Cycle',
    cause: 'High-pressure cutoff from elevated outdoor temperatures',
    detail: 'When DFW hits 105°F+, outdoor condenser cannot reject heat fast enough. The high-pressure switch trips to protect the compressor.',
    fix: 'Shade the condenser, clear vegetation 18+ inches around unit, verify condenser coil is clean',
    urgency: 'Medium — normal units handle DFW heat if clean and well-placed',
    dfwNote: 'DFW sees 30–40 days of 100°F+ annually. Condenser placement (west-facing) dramatically affects performance',
  },
  {
    description: 'Short cycles in high humidity weather',
    label: 'Humidity-Triggered Issues',
    cause: 'Frozen evaporator coil from low airflow',
    detail: 'Restricted airflow from dirty filters or blocked returns causes evaporator to freeze. Ice blocks airflow, unit shuts off, thaws, repeats.',
    fix: 'Replace air filter immediately. Check all return vents are open. Allow thaw time (4 hours off) before restart.',
    urgency: 'High — running with frozen coil damages compressor',
    dfwNote: 'DFW humidity means evaporator coils accumulate moisture faster — filter changes every 30–45 days in summer are essential',
  },
];

export default function DFWHVACShortCyclingGuide() {
  const [selected, setSelected] = useState<typeof causes[0] | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🔄 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          HVAC Short Cycling in DFW
        </h1>
        <p style={{ color: '#9CA3B0', marginBottom: '1rem', lineHeight: 1.6 }}>
          Short cycling is when your AC turns on and off too frequently. In DFW, this is especially damaging — long run times are required to control humidity in 60–80% summer air.
        </p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>Why DFW Is Different</div>
          <div style={{ color: '#9CA3B0', fontSize: '0.9rem' }}>
            DFW summer humidity averages 65–80%. Humidity removal requires 15–20 minute run cycles minimum. Short cycling means humidity builds even when the temperature feels fine — leading to mold risk, wood damage, and that muggy feeling.
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem', color: '#9CA3B0', fontSize: '0.85rem' }}>Select the pattern that matches your system:</div>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {causes.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(c)}
              style={{
                background: selected === c ? '#1E3A5F' : '#111E35',
                border: selected === c ? '1.5px solid #F5E642' : '1.5px solid #1A2540',
                borderRadius: 10, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#E8EAF0',
              }}
            >
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                {c.label}
              </div>
              <div style={{ color: '#9CA3B0', fontSize: '0.9rem' }}>{c.description}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', border: '1.5px solid #F5E642' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#F5E642' }}>
              Assessment: {selected.label}
            </div>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>LIKELY CAUSE</div>
                <div style={{ fontWeight: 600 }}>{selected.cause}</div>
              </div>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>WHAT IS HAPPENING</div>
                <div style={{ color: '#C8D0DC', fontSize: '0.9rem' }}>{selected.detail}</div>
              </div>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>FIX</div>
                <div>{selected.fix}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: '0.8rem', color: '#F5E642', marginBottom: '0.25rem' }}>🌆 DFW Specific</div>
                <div style={{ fontSize: '0.85rem', color: '#9CA3B0' }}>{selected.dfwNote}</div>
              </div>
              <div style={{ background: '#1A2540', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontSize: '0.85rem' }}>
                ⚡ Urgency: <strong>{selected.urgency}</strong>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#9CA3B0' }}>
          💡 Rule of Thumb: In DFW, your AC should run in 15–20 minute cycles during peak summer heat. Shorter = problem. Longer = acceptable if temperatures are extreme.
        </div>
      </div>
    </div>
  );
}
