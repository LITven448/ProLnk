import { useState } from 'react';

export default function DFWThermalBridgingGuide2026() {
  const [wallType, setWallType] = useState('standard-stud');

  const assessments: Record<string, { title: string; rValue: string; bridgingLoss: string; science: string; upgrade: string; cost: string }> = {
    'standard-stud': {
      title: '2x4 Stud Wall (R-13 batts)',
      rValue: 'Effective R-10',
      bridgingLoss: '23% efficiency loss',
      science: 'Wood studs conduct heat 3x better than fiberglass insulation. In a 2x4 wall with 16-inch OC framing, studs occupy about 15% of wall area but account for 23% of heat transfer.',
      upgrade: 'Add 1-inch rigid foam (R-6) over exterior sheathing. Eliminates thermal bridging, raises effective R to R-16, qualifies for Texas energy code prescriptive path.',
      cost: '$3–$6/sq ft installed'
    },
    '2x6-stud': {
      title: '2x6 Stud Wall (R-19 batts)',
      rValue: 'Effective R-15',
      bridgingLoss: '21% efficiency loss',
      science: 'Deeper walls reduce bridging percentage but wood-to-insulation ratio only improves slightly. Spray foam in 2x6 cavities outperforms batts by eliminating all air infiltration pathways.',
      upgrade: 'Replace batt with 2-inch open-cell spray foam (R-14) plus 1-inch closed-cell. Eliminates bridging and air infiltration simultaneously for DFW mixed-humid climate.',
      cost: '$5–$9/sq ft installed'
    },
    'metal-stud': {
      title: 'Metal Stud Wall (commercial/newer builds)',
      rValue: 'Effective R-7 (with R-19 batts)',
      bridgingLoss: '55% efficiency loss',
      science: 'Steel conducts heat 400x better than wood. Metal studs at 16-inch OC with R-19 batts yield only an effective R-7. This is the worst thermal bridging scenario common in DFW commercial builds.',
      upgrade: 'Continuous exterior insulation is mandatory. Minimum 2-inch polyiso (R-13) over sheathing. Combined with interior batts achieves code-minimum R-20 effective.',
      cost: '$7–$14/sq ft installed'
    },
    'icf': {
      title: 'ICF Wall (Insulated Concrete Form)',
      rValue: 'Effective R-22 to R-28',
      bridgingLoss: '<3% efficiency loss',
      science: 'ICF walls have concrete core surrounded by continuous EPS foam. Minimal thermal bridging only at rebar locations. Thermal mass also reduces peak cooling loads by 6–8 hours in DFW climate.',
      upgrade: 'No upgrade needed — ICF is the premium solution. Verify rebar spacing and ensure foam thickness meets local code.',
      cost: '$8–$12/sq ft (new construction)'
    },
  };

  const current = assessments[wallType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Science Series</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
          🧱 DFW Thermal Bridging Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>How wall framing bypasses insulation — and adds 10–15% to your DFW cooling costs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', label: 'Heat Conductivity: Wood', value: '3x insulation', note: 'vs fiberglass batts' },
            { icon: '⚙️', label: 'Heat Conductivity: Steel', value: '400x wood', note: 'worst bridging' },
            { icon: '💰', label: 'Bridging Cost Impact', value: '10–15%', note: 'added cooling cost' },
          ].map(card => (
            <div key={card.label} style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{card.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{card.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚗️ Why Nominal R-Value Lies</h2>
          {[
            'Insulation labels show cavity R-value — not the effective R-value your wall actually delivers.',
            'Continuous insulation (rigid foam over sheathing) is the only way to interrupt thermal bridging at studs.',
            'Spray foam outperforms batts in DFW because it eliminates both bridging gaps AND air infiltration.',
            'Texas energy code (IECC 2021) now requires continuous insulation in climate zone 3 (DFW area).',
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642′ }}>▸</span>
              <span style={{ color: '#cbd5e1′ }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2744', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Wall Type → Thermal Efficiency Assessment</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.entries({ 'standard-stud': '🪵 2x4 Stud', '2x6-stud': '🪵 2x6 Stud', 'metal-stud': '🔩 Metal Stud', 'icf': '🏗️ ICF Wall' }).map(([k, v]) => (
              <button key={k} onClick={() => setWallType(k)}
                style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', background: wallType === k ? '#F5E642′ : '#1e3a5f', color: wallType === k ? '#0A1628' : '#94a3b8', fontWeight: 600 }}>
                {v}
              </button>
            ))}
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{current.title}</div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#0f2744', padding: '0.3rem 0.75rem', borderRadius: '20px', color: '#F5E642', fontSize: '0.85rem' }}>📐 {current.rValue}</span>
              <span style={{ background: '#0f2744', padding: '0.3rem 0.75rem', borderRadius: '20px', color: '#ef4444', fontSize: '0.85rem' }}>🔥 {current.bridgingLoss}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>🔬 {current.science}</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ {current.upgrade}</div>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>💰 {current.cost}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
