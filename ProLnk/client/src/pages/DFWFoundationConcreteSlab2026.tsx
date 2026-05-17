import { useState } from 'react';

export default function DFWFoundationConcreteSlab2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const concerns = [
    {
      id: 'cracks',
      label: '🔍 Cracks in My Slab',
      title: 'Understanding DFW Slab Cracks',
      steps: [
        '📏 Hairline cracks (<1/16") — normal shrinkage, monitor annually',
        '📏 Structural cracks (>1/4") — may indicate clay movement, evaluate',
        '🔍 Horizontal cracks — rare in slabs, inspect post-tension cables',
        '🔍 Stair-step cracks at perimeter — classic DFW clay shrink/swell',
        '⚠️ Cracks with vertical displacement — foundation engineer required',
      ],
      note: 'DFW black expansive clay (Vertisols) creates 10x more foundation movement than most US soils.',
    },
    {
      id: 'posttension',
      label: '⚡ Post-Tension vs Rebar',
      title: 'DFW Slab Reinforcement Types',
      steps: [
        '🔩 Post-tension (most DFW homes post-1985): steel cables tensioned after pour',
        '🔩 Rebar (older DFW homes): steel bars placed before pour, tied in grid',
        '🔩 Some DFW slabs use BOTH systems for extra clay resistance',
        '⚠️ NEVER cut into a post-tension slab without engineered drawings',
        '⚠️ Post-tension cables are under thousands of pounds of pressure',
      ],
      note: 'Post-tension slabs require a sticker on your water heater or electrical panel — look for PT cable warning.',
    },
    {
      id: 'psi',
      label: '🏗️ Concrete Mix Quality',
      title: '4000 PSI Standard for DFW',
      steps: [
        '🏗️ DFW code minimum: 3000 PSI — but 4000 PSI is standard practice',
        '🏗️ Higher PSI = denser concrete = more moisture and chloride resistance',
        '🏗️ Water-to-cement ratio is critical — excess water weakens concrete',
        '🏗️ DFW summer pours require concrete blankets or curing compound',
        '🏗️ Ask builder for batch tickets — confirms actual PSI delivered',
      ],
      note: 'DFW heat above 90°F causes rapid moisture loss during curing, reducing final concrete strength by up to 15%.',
    },
    {
      id: 'vapor',
      label: '💧 Vapor Barrier & Moisture',
      title: 'Below-Slab Moisture Control in DFW',
      steps: [
        '💧 6-mil polyethylene vapor barrier required below DFW slabs',
        '💧 Barrier sits between compacted fill and concrete pour',
        '💧 Prevents soil moisture from wicking up through slab',
        '💧 Missing or damaged barrier causes efflorescence and floor failures',
        '💧 DFW clay holds water — barrier is critical, not optional',
      ],
      note: 'Slab moisture is the #1 cause of hardwood floor failures and tile delamination in DFW homes.',
    },
  ];

  const selected_item = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW Concrete Slab Composition Guide 2026
          </h1>
          <p style={{ color: '#8899BB', fontSize: 14, margin: 0 }}>
            4000 PSI concrete · Post-tension vs rebar · Vapor barrier · Clay soil performance
          </p>
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1A2E4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 12px' }}>🔩 What Goes Into a DFW Slab?</h2>
          <p style={{ color: '#B0BFDA', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            DFW sits on highly expansive clay — slabs must be engineered to handle movement. A properly built DFW slab includes compacted fill, vapor barrier, steel reinforcement, and high-strength concrete.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['📐 4-6" thick', 'Interior slab thickness'], ['⚡ Post-tension', 'Cables or rebar steel'], ['💧 Vapor barrier', '6-mil poly below slab'], ['🏗️ Turndown beams', 'Perimeter depth 12-18"']].map(([label, desc]) => (
              <div key={label} style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', flex: '1 1 150px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#8899BB', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Select your slab concern for guidance:</p>
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
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW Foundation Experts</div>
          <p style={{ color: '#8899BB', fontSize: 13, margin: 0 }}>Connect with licensed DFW foundation specialists for inspections and repairs.</p>
        </div>
      </div>
    </div>
  );
}