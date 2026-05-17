import { useState } from 'react';

export default function DFWRoofingGableEnd2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const concerns = [
    {
      id: 'wind',
      label: '💨 Wind Damage Concern',
      title: 'Gable End Wind Uplift in DFW',
      steps: [
        '💨 Gable roofs have 40% higher uplift pressure at rake edges than hip roofs',
        '💨 DFW averages 20+ severe thunderstorm events per year with 60+ mph gusts',
        '💨 Most vulnerable zone: upper 1/3 of gable end wall and overhangs',
        '💨 Look for lifted soffit panels, cracked fascia, or bowing gable wall',
        '💨 Post-storm: inspect gable vent and rake trim for displacement',
      ],
      note: 'DFW insurance claims for gable roof damage spike after spring hail/wind storms — inspect every April.',
    },
    {
      id: 'flashing',
      label: '🔧 Rake Flashing & Starter Strip',
      title: 'Rake Edge Protection for DFW',
      steps: [
        '🔧 Drip edge metal required at rake edges — sheds water off fascia',
        '🔧 Starter strip runs along rake edge before field shingles begin',
        '🔧 Nailing pattern matters: 4" OC at rakes vs 6" OC field (high-wind code)',
        '🔧 Metal drip edge should extend 2" under first shingle course',
        '🔧 DFW code: use 1-1/4" roofing nails minimum — longer in high-wind zones',
      ],
      note: 'Improper rake edge nailing is the #1 cause of shingle blow-off in DFW straight-line wind events.',
    },
    {
      id: 'vent',
      label: '🌀 Gable Vent Installation',
      title: 'Gable Vent Guide for DFW Attics',
      steps: [
        '🌀 Traditional gable vents: louvered — allow cross-ventilation',
        '🌀 DFW best practice: pair with ridge vent and soffit intake',
        '🌀 During severe storms: wind-driven rain can enter louvered gable vents',
        '🌀 Install wind-baffled vent covers if facing prevailing storm direction (south/southwest)',
        '🌀 Inspect screens annually — wasps and squirrels love DFW gable vents',
      ],
      note: 'DFW storms typically approach from the south and southwest — orient wind baffles accordingly.',
    },
    {
      id: 'overhang',
      label: '🏚️ Gable Overhang Structural Support',
      title: 'Lookout Rafter & Barge Rafter Guide',
      steps: [
        '🏚️ Gable overhangs are supported by lookout rafters and barge rafters',
        '🏚️ Lookouts: horizontal members extending from last common rafter to barge rafter',
        '🏚️ Barge rafter: outermost visible rafter that forms the gable overhang face',
        '🏚️ DFW hail damage often splits or cracks barge rafters under fascia',
        '🏚️ Overhangs wider than 12" require blocking at ridge — check during reroofing',
      ],
      note: 'Sagging gable overhangs are a structural warning — have a roofer or framer inspect before adding weight.',
    },
  ];

  const selected_item = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW Gable End Roofing Guide 2026
          </h1>
          <p style={{ color: '#8899BB', fontSize: 14, margin: 0 }}>
            Wind uplift zones · Rake flashing · Gable vents · Overhang structure · Gable vs hip stats
          </p>
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1A2E4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 12px' }}>📊 Gable vs Hip: DFW Wind Damage Stats</h2>
          <p style={{ color: '#B0BFDA', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            DFW insurance data consistently shows gable roofs sustain <strong style={{ color: '#F5E642' }}>significantly more wind damage</strong> than hip roofs in severe weather events. However, gable roofs are more common and less expensive to build.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['🏠 Gable Risk', '40% higher wind uplift at eaves'], ['🏘️ Hip Advantage', 'All edges deflect wind aerodynamically'], ['⚡ DFW Peak Risk', 'April–June severe storm season']].map(([label, desc]) => (
              <div key={label} style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', flex: '1 1 180px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#8899BB', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Select your gable end concern:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{ background: selected === c.id ? '#F5E642' : '#0F1E35', color: selected === c.id ? '#0A1628' : '#E8EDF5', border: '1px solid', borderColor: selected === c.id ? '#F5E642' : '#1A2E4A', borderRadius: 10, padding: '12px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
              {c.label}
            </button>
          ))}
        </div>

        {selected_item && (
          <div style={{ background: '#0F1E35', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>{selected_item.title}</h3>
            {selected_item.steps.map((step, i) => (
              <div key={i} style={{ color: '#B0BFDA', fontSize: 14, padding: '6px 0', borderBottom: i < selected_item.steps.length - 1 ? '1px solid #1A2E4A' : 'none' }}>{step}</div>
            ))}
            <div style={{ background: '#1A2E4A', borderRadius: 8, padding: 12, marginTop: 14, color: '#8899BB', fontSize: 12 }}>
              💡 {selected_item.note}
            </div>
          </div>
        )}

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, border: '1px solid #1A2E4A', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW Roofing Experts</div>
          <p style={{ color: '#8899BB', fontSize: 13, margin: 0 }}>Get quotes from licensed DFW roofers for inspections, repairs, and full replacements.</p>
        </div>
      </div>
    </div>
  );
}