import { useState } from 'react';

const scenarios = [
  {
    age: 'Under 10 years',
    condition: 'Good — insulation intact, no visible damage',
    decision: 'Reuse',
    reasoning: 'Copper linesets last 30–50 years if insulation is maintained. Under 10 years in good condition is a strong reuse candidate.',
    cost: '$0 — part of standard system swap labor',
    risk: 'Low — verify refrigerant type compatibility (R-410A vs R-32 for newer systems)',
    dfwNote: 'DFW UV degrades outer foam insulation in 7–10 years even if copper is fine. Inspect wrap carefully before committing to reuse.',
  },
  {
    age: '10–20 years',
    condition: 'Moderate — some insulation peeling or cracking',
    decision: 'Evaluate Carefully',
    reasoning: 'Copper itself is likely fine. The issue is insulation degradation allowing heat gain in the suction line, reducing efficiency. Re-wrapping insulation ($150–$300) may extend usable life another 10 years.',
    cost: '$150–$300 to re-insulate vs $800–$1,500 to replace',
    risk: 'Medium — degraded insulation increases energy use 5–10% and reduces cooling capacity in DFW heat',
    dfwNote: 'DFW outdoor runs of exposed lineset facing west or south degrade fastest. Check those sections first.',
  },
  {
    age: '10–20 years',
    condition: 'Poor — insulation missing, crushed sections, or oil at joints',
    decision: 'Replace',
    reasoning: 'Crushed copper restricts refrigerant flow. Oil at joints indicates refrigerant leak history. Missing insulation has been causing efficiency loss for years.',
    cost: '$800–$1,500 for 25-foot residential run typical in DFW',
    risk: 'High if reused — compressor works harder, new refrigerant charge escapes at compromised joints',
    dfwNote: 'DFW linesets often run through attics hitting 150°F+ in summer — thermal cycling accelerates joint stress and insulation breakdown faster than cooler climates.',
  },
  {
    age: '20+ years',
    condition: 'Any condition',
    decision: 'Replace',
    reasoning: 'Lineset insulation has lived two full DFW UV and heat cycles. Even if copper looks fine, micro-cracks at joints from decades of thermal expansion are invisible to visual inspection.',
    cost: '$800–$1,800 for typical DFW home — attic routing adds cost vs exterior wall routing',
    risk: 'Very high if reused — refrigerant loss within 1–2 years is common, costing $300–$800 per recharge plus the diagnostic visit',
    dfwNote: 'R-22 systems are 20+ years old by definition. Any R-22 system replacement means new lineset is required for R-410A or R-32 compatibility anyway.',
  },
];

const linesetFacts = [
  { label: 'Standard residential lineset size', value: '3/8" liquid, 3/4" or 7/8" suction' },
  { label: 'Typical DFW home lineset run', value: '25–40 feet' },
  { label: 'Lineset copper lifespan', value: '30–50 years' },
  { label: 'Insulation lifespan in DFW UV', value: '7–12 years outdoors' },
];

export default function DFWHVACLinesetGuide() {
  const [selected, setSelected] = useState<typeof scenarios[0] | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🔩 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          HVAC Lineset Guide for DFW
        </h1>
        <p style={{ color: '#9CA3B0', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          When replacing your HVAC system, the contractor will either reuse your existing refrigerant lineset or replace it. DFW UV exposure and attic heat make this decision more critical than in most climates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '2rem' }}>
          {linesetFacts.map((f, i) => (
            <div key={i} style={{ background: '#111E35', borderRadius: 8, padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#9CA3B0', marginBottom: '0.25rem' }}>{f.label}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem' }}>{f.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '0.75rem', color: '#9CA3B0', fontSize: '0.85rem' }}>Select your lineset age and condition:</div>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {scenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(s)}
              style={{
                background: selected === s ? '#1E3A5F' : '#111E35',
                border: selected === s ? '1.5px solid #F5E642' : '1.5px solid #1A2540',
                borderRadius: 10, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#E8EAF0',
              }}
            >
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                🗓️ Age: {s.age}
              </div>
              <div style={{ color: '#9CA3B0', fontSize: '0.85rem' }}>Condition: {s.condition}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', border: '1.5px solid #F5E642' }}>
            <div style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20, fontWeight: 800, marginBottom: '1rem', fontSize: '0.9rem',
              background: selected.decision === 'Replace' ? '#7C2D12' : selected.decision === 'Reuse' ? '#14532D' : '#92400E',
              color: '#FFFFFF',
            }}>
              {selected.decision === 'Replace' ? '⛔ Decision: Replace' : selected.decision === 'Reuse' ? '✅ Decision: Reuse' : '⚠️ Decision: Evaluate'}
            </div>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>REASONING</div>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#C8D0DC' }}>{selected.reasoning}</div>
              </div>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>COST</div>
                <div style={{ fontWeight: 600 }}>{selected.cost}</div>
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
          💡 Pro Tip: Always ask your contractor to show you the existing lineset condition before they make the reuse vs replace call. Get it in writing in the quote.
        </div>
      </div>
    </div>
  );
}
