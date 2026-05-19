import { useState } from 'react';

export default function DFWRoofingRafterVsTruss2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const roofTypes = [
    {
      id: 'identify',
      label: '🔍 Identify My Roof System',
      title: 'How to Identify Rafters vs Trusses in DFW',
      steps: [
        '🔍 Go to your attic — rafters look like simple diagonal boards from ridge to wall plate',
        '🔍 Trusses have a W-shape or triangulated web of smaller lumber pieces',
        '🔍 DFW homes built before ~1985: likely cut rafters (traditional stick framing)',
        '🔍 DFW homes built after 1985: almost certainly engineered trusses',
        '🔍 Check your original blueprints or call the builder — they will know',
      ],
      note: 'Roughly 85% of DFW homes built after 1990 use prefabricated engineered trusses per builder surveys.',
    },
    {
      id: 'modify',
      label: '⚠️ Can I Modify My Roof?',
      title: 'Modification Rules: Rafters vs Trusses',
      steps: [
        '🔧 Rafter roofs: can often be modified by a licensed framer with permit',
        '⚠️ Truss roofs: NEVER cut, notch, or remove any truss member without engineering stamp',
        '⚠️ Truss modification requires engineered drawings from the original truss manufacturer',
        '🔧 Rafter roof attic conversion: feasible with collar ties and ridge beam upgrade',
        '⚠️ Truss roof attic conversion: expensive — requires full re-engineering of truss system',
      ],
      note: 'Unauthorized truss modification is a major insurance and structural liability — document everything before any work.',
    },
    {
      id: 'solar',
      label: '☀️ Solar Panel Installation',
      title: 'Solar on DFW Rafter vs Truss Roofs',
      steps: [
        '☀️ Both rafter and truss roofs can support solar panels with proper assessment',
        '☀️ Truss roofs: installer must locate top chord intersections for lag bolt placement',
        '☀️ Rafter roofs: more flexible placement — rafters run continuously to ridge',
        '☀️ DFW: structural engineer letter sometimes required for solar permit — budget -500',
        '☀️ Post-tension truss bottom chord: NEVER penetrate — tell solar installer which system you have',
      ],
      note: 'DFW solar installers should provide a structural load letter confirming roof can support panel weight.',
    },
    {
      id: 'skylight',
      label: '🌤️ Skylight or Attic Access',
      title: 'Skylights and Attic Stairs: Rafter vs Truss',
      steps: [
        '🌤️ Rafter roofs: skylight installation requires double headers between rafters — common',
        '🌤️ Truss roofs: skylights must be placed between trusses — limits location options',
        '🌤️ Pull-down attic stairs: rafters allow flexible placement; trusses constrain to bay width',
        '🌤️ Any skylight in DFW: hail-rated glass required — Class 4 impact resistance',
        '🌤️ DFW permit required for all skylights — confirm with your city building department',
      ],
      note: 'DFW hail regularly exceeds 1" diameter — standard skylight glass fails and leaks after major hail events.',
    },
  ];

  const selected_item = roofTypes.find(r => r.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW Rafter vs Truss Roofing Guide 2026
          </h1>
          <p style={{ color: '#8899BB', fontSize: 14, margin: 0 }}>
            Identify your system · Modification rules · Solar · Skylights · Attic conversion
          </p>
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1A2E4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 12px' }}>🔩 Rafters vs Trusses: Key Differences</h2>
          <p style={{ color: '#B0BFDA', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            DFW homes built before ~1985 typically have <strong style={{ color: '#F5E642' }}>cut rafters</strong> — site-built, modifiable. Homes built after 1985 almost always have <strong style={{ color: '#F5E642' }}>engineered trusses</strong> — prefabricated, cannot be modified without engineering drawings.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[['🔧 Rafters', 'Older homes, flexible, modifiable'], ['⚠️ Trusses', 'Post-1985, engineered, no cuts'], ['📋 Check First', 'Always identify before any attic work']].map(([label, desc]) => (
              <div key={label} style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', flex: '1 1 180px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#8899BB', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Select your roof type question:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {roofTypes.map(r => (
            <button key={r.id} onClick={() => setSelected(selected === r.id ? null : r.id)}
              style={{ background: selected === r.id ? '#F5E642' : '#0F1E35', color: selected === r.id ? '#0A1628' : '#E8EDF5', border: '1px solid', borderColor: selected === r.id ? '#F5E642' : '#1A2E4A', borderRadius: 10, padding: '12px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
              {r.label}
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
          <p style={{ color: '#8899BB', fontSize: 13, margin: 0 }}>Get quotes from licensed DFW roofers and structural experts for any roof project.</p>
        </div>
      </div>
    </div>
  );
}