import { useState } from 'react';

export default function DFWFoundationConcretePorch2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const situations = [
    {
      id: 'gap',
      label: '↔️ Gap Between Porch and House',
      title: 'Porch Gap Assessment in DFW',
      steps: [
        '📏 Gap under 1/2": normal expansion joint — monitor but no action needed',
        '📏 Gap 1/2" to 1": likely DFW clay movement — monitor quarterly',
        '📏 Gap over 1": concerning — evaluate with foundation specialist',
        '🔍 Check if gap is uniform or wider at one end (differential settling)',
        '🔍 Insert a business card — if it drops below grade, water is pooling there',
      ],
      note: 'DFW clay moves 1-3 inches seasonally — porch gaps open in dry summers and close in wet winters.',
    },
    {
      id: 'separate',
      label: '🏗️ Porch as Separate Slab',
      title: 'Why DFW Porches Are Typically Separate',
      steps: [
        '🏗️ DFW code: porches often poured as separate slabs from main foundation',
        '🏗️ Expansion joint (foam or rubber) intentionally placed between porch and house slab',
        '🏗️ Separate porch slab moves independently — less risk to main foundation',
        '🏗️ If porch was poured monolithic with main slab: watch for shared cracking',
        '🏗️ Ask builder or pull permit records to confirm which type you have',
      ],
      note: 'Monolithic porch-to-foundation pours are riskier in DFW clay — porch movement transfers stress to main slab.',
    },
    {
      id: 'mudjacking',
      label: '🛠️ Mudjacking vs Replacement',
      title: 'Porch Lifting Options for DFW',
      steps: [
        '🛠️ Mudjacking: slurry pumped under slab raises it back to grade — -900 typical DFW cost',
        '🛠️ Polyurethane foam lifting: lighter, faster, longer lasting — -1500 DFW cost',
        '🛠️ Full replacement: best when slab is severely cracked or heaved — -5000 DFW',
        '🛠️ Mudjacking does NOT fix cracked concrete — only elevation issues',
        '🛠️ DFW clay: address drainage first or porch will settle again within 2-5 years',
      ],
      note: 'Without fixing drainage and clay moisture, any porch repair in DFW is temporary. Grade away from house.',
    },
    {
      id: 'settling',
      label: '⬇️ Porch Settling or Tilting',
      title: 'DFW Porch Settling Assessment',
      steps: [
        '⬇️ Step down from door to porch greater than original: porch has settled',
        '⬇️ Slope toward house: serious — water drains toward foundation',
        '⬇️ Slope away from house: acceptable — this is correct drainage direction',
        '⬇️ Check DFW soil moisture: watering foundation perimeter reduces clay shrinkage',
        '⬇️ Settling over 2" from original elevation: evaluate lifting or replacement',
      ],
      note: 'DFW drought years cause rapid clay shrinkage — porches can settle 1-2" in a single dry season.',
    },
  ];

  const selected_item = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW Concrete Porch and Foundation Guide 2026
          </h1>
          <p style={{ color: '#8899BB', fontSize: 14, margin: 0 }}>
            Porch as separate slab · Gap assessment · Clay movement · Mudjacking vs replacement
          </p>
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1A2E4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 12px' }}>🔩 How Porches Affect DFW Foundations</h2>
          <p style={{ color: '#B0BFDA', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            DFW porches are typically poured as <strong style={{ color: '#F5E642' }}>separate slabs</strong> from the main foundation, connected by an expansion joint. This allows independent movement as DFW clay shrinks and swells. Gaps between porch and house are normal — size and direction determine severity.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['↔️ Gap is Normal', 'Expansion joint allows clay movement'], ['⬇️ Watch Settling', 'Slope toward house = drainage risk'], ['🌧️ Water Rules', 'Grade slopes away from foundation']].map(([label, desc]) => (
              <div key={label} style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', flex: '1 1 180px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#8899BB', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Select your porch situation for guidance:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#0F1E35', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid', borderColor: selected === s.id ? '#F5E642' : '#1A2E4A', borderRadius: 10, padding: '12px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
              {s.label}
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
          <p style={{ color: '#8899BB', fontSize: 13, margin: 0 }}>Get quotes from licensed DFW foundation specialists for porch lifting, repairs, and assessments.</p>
        </div>
      </div>
    </div>
  );
}