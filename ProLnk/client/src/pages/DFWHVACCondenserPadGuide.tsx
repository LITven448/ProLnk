import { useState } from 'react';

const padConditions = [
  {
    condition: 'Pad is level, concrete, under 15 years old',
    soilType: 'Any DFW soil',
    recommendation: 'Monitor',
    action: 'No action needed. Inspect annually. DFW clay will eventually shift it — this is a when, not if, situation.',
    timeline: 'Inspect again in 1–2 years',
    cost: '$0 now',
    risk: 'Low — current condition is acceptable',
    dfwNote: 'DFW clay shrinks 1–3 inches in drought years and expands back in wet years. Even good pads shift over time.',
  },
  {
    condition: 'Pad is slightly tilted (less than 1 inch low side)',
    soilType: 'Expansive clay (most of DFW)',
    recommendation: 'Level Now',
    action: 'Composite shims can level minor tilt without replacing the pad. If concrete, hydraulic leveling may be needed. Do not ignore — compressor oil migrates to low side and starves bearings.',
    timeline: 'Fix within 30 days',
    cost: '$150–$400 for shimming; $300–$700 for hydraulic leveling',
    risk: 'Medium — refrigerant oil accumulates in low-side compressor area, reducing lubrication over time',
    dfwNote: 'DFW had back-to-back drought years (2022–2023) that caused widespread pad tilt from clay shrinkage. Many units that were fine in 2021 are now tilted.',
  },
  {
    condition: 'Pad is severely tilted (1+ inch) or cracked',
    soilType: 'Expansive clay (most of DFW)',
    recommendation: 'Replace Pad',
    action: 'Replace with composite pad (Diversifoam or similar). Composite pads are lighter, self-leveling tolerant, and resist clay movement better than concrete. Ensure soil is re-compacted before setting new pad.',
    timeline: 'Fix within 2 weeks — unit should not run severely tilted',
    cost: '$400–$900 for composite pad replacement including soil prep',
    risk: 'High — compressor damage from oil migration; refrigerant line stress from unit twist',
    dfwNote: 'Concrete pads on DFW clay often do not survive two soil cycle cycles without cracking. Composite is now preferred by most DFW HVAC contractors.',
  },
  {
    condition: 'Unit floating or pad sinking into soil',
    soilType: 'Sandy loam (far north DFW, Denton area) or poor drainage area',
    recommendation: 'Engineered Fix Required',
    action: 'Unit is sinking — soil cannot support pad weight. Requires soil compaction, drain improvement, or concrete footing. Do not simply add a larger pad on uncompacted soil.',
    timeline: 'Immediately — unit may not be safely operable',
    cost: '$700–$2,000 depending on soil engineering needed',
    risk: 'Critical — unit tilt at this severity can kink refrigerant lines and cause immediate system damage',
    dfwNote: 'Sandy loam in north DFW and areas near creek floodplains are susceptible to pad sinking, especially after heavy rain saturates the soil.',
  },
];

export default function DFWHVACCondenserPadGuide() {
  const [selected, setSelected] = useState<typeof padConditions[0] | null>(null);

  const urgencyColor = (rec: string) => {
    if (rec === 'Monitor') return '#1D4ED8';
    if (rec === 'Level Now') return '#92400E';
    if (rec === 'Replace Pad') return '#7C2D12';
    return '#581C87';
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🧱 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          Condenser Pad Guide for DFW
        </h1>
        <p style={{ color: '#9CA3B0', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          DFW clay soil is one of the most expansive in the US. It shrinks in drought years and swells in wet years — shifting condenser pads and damaging compressors. Most homeowners do not know to check this.
        </p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>Why Pad Level Matters</div>
          <div style={{ color: '#9CA3B0', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Compressors are lubricated by refrigerant oil that circulates through the system. When the unit tilts, oil pools on the low side. Over months, the compressor bearing runs dry. A $400 pad repair prevents a $2,500+ compressor replacement.
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem', color: '#9CA3B0', fontSize: '0.85rem' }}>Select your pad condition:</div>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {padConditions.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(p)}
              style={{
                background: selected === p ? '#1E3A5F' : '#111E35',
                border: selected === p ? '1.5px solid #F5E642' : '1.5px solid #1A2540',
                borderRadius: 10, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#E8EAF0',
              }}
            >
              <div style={{ fontWeight: 600 }}>🧱 {p.condition}</div>
              <div style={{ color: '#9CA3B0', fontSize: '0.8rem', marginTop: '0.25rem' }}>Soil: {p.soilType}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', border: '1.5px solid #F5E642' }}>
            <div style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20, fontWeight: 800, marginBottom: '1rem',
              background: urgencyColor(selected.recommendation), color: '#FFFFFF', fontSize: '0.85rem',
            }}>
              ⚡ {selected.recommendation}
            </div>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>ACTION REQUIRED</div>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#C8D0DC' }}>{selected.action}</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  💵 Cost: <strong>{selected.cost}</strong>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  🗓️ Timeline: <strong>{selected.timeline}</strong>
                </div>
              </div>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>RISK IF IGNORED</div>
                <div style={{ color: '#C8D0DC', fontSize: '0.9rem' }}>{selected.risk}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642', fontSize: '0.85rem', color: '#9CA3B0' }}>
                🌆 {selected.dfwNote}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#9CA3B0' }}>
          💡 How to Check: Use a standard level app on your phone against the flat top of the outdoor unit. More than 1/4 inch off level warrants attention.
        </div>
      </div>
    </div>
  );
}
