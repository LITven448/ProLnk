import { useState } from 'react';

const SYMPTOMS = [
  {
    id: 'condensation_between',
    label: '💧 Condensation Between Panes',
    severity: 'Replace Required',
    severityColor: '#EF4444',
    cause: 'Seal failure — argon/air has escaped, moisture entered the insulated glass unit (IGU)',
    diy: false,
    repairType: 'IGU Replacement or Full Window',
    costRange: '$150–350 per IGU (repair) or $400–800 full window',
    timeframe: 'Does not self-resolve — gets worse over time',
    notes: 'In DFW, thermal cycling from extreme heat/cold accelerates seal failure. Typical IGU lifespan is 15–25 years in DFW climate.',
  },
  {
    id: 'air_leak',
    label: '💨 Air Leak (Feel Draft)',
    severity: 'DIY Fixable',
    severityColor: '#22C55E',
    cause: 'Weatherstripping worn, compressed, or missing. Gap between sash and frame.',
    diy: true,
    repairType: 'Weatherstrip Replacement',
    costRange: '$15–60 DIY · $80–180 pro',
    timeframe: 'Fix before summer — every gap adds to cooling load',
    notes: 'DFW summer air leaks are expensive. One 1/8″ gap around a window is equivalent to a 2.4″ diameter hole in your wall.',
  },
  {
    id: 'water_infiltration',
    label: '🌧️ Water Coming In (Rain)',
    severity: 'Pro Inspection Needed',
    severityColor: '#F59E0B',
    cause: 'Failed exterior caulk, missing or damaged flashing, or window frame separation from rough opening',
    diy: false,
    repairType: 'Caulk + Flashing Repair or Reseat Window',
    costRange: '$120–280 caulk/flashing · $600–1,800 reseat or replace',
    timeframe: 'Fix immediately — DFW storm season (April–October) drives water in fast',
    notes: 'DFW wind-driven rain during severe storms creates 50+ mph lateral pressure. Any gap in the exterior envelope will allow water entry.',
  },
  {
    id: 'foggy_exterior',
    label: '🌫️ Fog / Frost on Exterior Glass',
    severity: 'Normal — No Action',
    severityColor: '#22C55E',
    cause: 'High-performance Low-E glass in DFW — exterior is so well-insulated it stays cold while humidity condenses on it',
    diy: false,
    repairType: 'None Required',
    costRange: '$0',
    timeframe: 'Clears when humidity drops or sun warms exterior',
    notes: 'This is a sign your window is working correctly. Only act if it appears BETWEEN the panes.',
  },
  {
    id: 'cracked_frame',
    label: '🔧 Cracked or Warped Frame',
    severity: 'Replacement Likely',
    severityColor: '#EF4444',
    cause: 'Thermal expansion stress (DFW has extreme temperature swings), UV degradation, or impact damage',
    diy: false,
    repairType: 'Frame Replacement or Full Window',
    costRange: '$200–450 frame repair · $400–900 full replacement',
    timeframe: 'Address before next DFW storm season',
    notes: 'Vinyl frames crack under repeated extreme heat cycles. Any frame damage compromises the air and water seal of the entire window.',
  },
  {
    id: 'sticking_sash',
    label: '🪟 Window Won’t Open / Close',
    severity: 'Usually DIY',
    severityColor: '#22C55E',
    cause: 'Swollen wood (rare in DFW), paint sealing, hardware failure, or racked frame from foundation settling',
    diy: true,
    repairType: 'Hardware Repair or Frame Adjustment',
    costRange: '$0–40 DIY · $80–250 pro',
    timeframe: 'Fire egress windows must operate — fix immediately',
    notes: 'DFW foundation movement is common due to expansive clay soils. If multiple windows stick simultaneously, get a foundation assessment.',
  },
];

export default function DFWWindowLeakGuide() {
  const [selectedSymptom, setSelectedSymptom] = useState('condensation_between');

  const symptom = SYMPTOMS.find(s => s.id === selectedSymptom)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            DFW WINDOW LEAK GUIDE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
          🔍 Window Leak & Seal Failure Guide — DFW
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36 }}>
          DFW's extreme heat, cold snaps, and violent storms stress windows more than most U.S. climates. Knowing whether you need a $25 tube of caulk or a $600 window replacement saves significant money.
        </p>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>🔎 Select Your Symptom</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
            {SYMPTOMS.map(s => (
              <div key={s.id}
                onClick={() => setSelectedSymptom(s.id)}
                style={{
                  background: selectedSymptom === s.id ? '#131F33′ : '#0A1628',
                  border: `2px solid ${selectedSymptom === s.id ? '#F5E642' : '#2D3F57'}`,
                  borderRadius: 10, padding: 14, cursor: 'pointer'
                }}>
                <div style={{ fontWeight: 700, color: '#E8EDF4', fontSize: 14, marginBottom: 6 }}>{s.label}</div>
                <div style={{ display: 'inline-block', background: s.severityColor + '22', color: s.severityColor, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
                  {s.severity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {symptom && (
          <div style={{ background: '#131F33', border: `1.5px solid ${symptom.severityColor}`, borderRadius: 14, padding: 28, marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <h2 style={{ color: '#E8EDF4', fontWeight: 800, fontSize: 20, margin: 0 }}>{symptom.label}</h2>
              <span style={{ background: symptom.severityColor + '22', color: symptom.severityColor, fontWeight: 800, fontSize: 13, padding: '6px 16px', borderRadius: 8 }}>
                {symptom.severity}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Root Cause', value: symptom.cause },
                { label: 'Repair Type', value: symptom.repairType },
                { label: 'Cost Range', value: symptom.costRange },
                { label: 'Urgency', value: symptom.timeframe },
              ].map(field => (
                <div key={field.label} style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{field.label}</div>
                  <div style={{ color: '#E8EDF4', fontSize: 14, lineHeight: 1.5 }}>{field.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: symptom.diy ? '#1A3A2A' : '#2D1B00', border: `1px solid ${symptom.diy ? '#22C55E' : '#F59E0B'}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ color: symptom.diy ? '#22C55E' : '#F59E0B', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                {symptom.diy ? '🔧 DIY-Friendly' : '👷 Professional Required'}
              </div>
              <div style={{ color: symptom.diy ? '#86EFAC' : '#FDE68A', fontSize: 14, lineHeight: 1.5 }}>{symptom.notes}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📋 Repair vs Replace Decision Guide</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ color: '#94A3B8', borderBottom: '1px solid #2D3F57′ }}>
                  {['Condition', 'Recommendation', 'Reasoning'].map(h => (
                    <th key={h} style={{ textAlign: 'left', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Window < 10 years old', '🔧 Repair', 'Frame and hardware still serviceable — IGU swap or seal repair cost-effective'],
                  ['Window 10–20 years old', '⚖️ Evaluate', 'Get replacement quote — if repair > 40% of replacement, replace'],
                  ['Window 20+ years old', '🆕 Replace', 'Single-pane or failed Low-E — energy savings pay back modern window quickly'],
                  ['Multiple windows failing', '🆕 Replace all', 'Bulk pricing saves 15–25% — coordinate with DFW HVAC sizing'],
                  ['Frame damage present', '🆕 Replace', 'Frame integrity is the primary water and air barrier — cannot patch structurally'],
                ].map(row => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #16213A' }}>
                    {row.map((cell, i) => (
                      <td key={i} style={{ padding: '10px 16px 10px 0', color: i === 0 ? '#E8EDF4′ : '#94A3B8', lineHeight: 1.4 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>🛡️ DFW Storm Season Prep (Before April)</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              '🔍 Inspect all exterior caulk for cracks — DFW winter temperature swings crack caulk faster than most climates',
              '🌧️ Check flashing above all windows — wind-driven rain finds any gap during severe DFW thunderstorms',
              '💨 Test weatherstripping on all operable windows — replace if compressed or torn before storm season',
              '🪟 Verify all egress windows open fully — building code requires operable path for fire escape from bedrooms',
            ].map((tip, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{tip}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
