import { useState } from 'react';

export default function DFWHVACLineSetInsulation2026() {
  const [condition, setCondition] = useState<string | null>(null);

  const facts = [
    { icon: '🌡️', title: 'Suction Line Only', body: 'Only the suction line (large copper pipe) is insulated. Liquid line (small pipe) is not insulated. DFW homeowners often confused — both pipes do not need foam.' },
    { icon: '☀️', title: 'DFW UV Degradation', body: 'DFW intense UV destroys foam rubber insulation within 5-10 years. Insulation becomes brittle, cracks, falls off. Most DFW homes 10+ years old have degraded insulation.' },
    { icon: '💧', title: 'Condensation Problem', body: 'Bare suction line in DFW humidity creates condensation everywhere. Water drips onto equipment, ceilings, attic framing. Promotes mold. Insulation prevents all of this.' },
    { icon: '⚡', title: 'Energy Loss', body: 'Bare suction line absorbs heat before refrigerant reaches compressor. Reduces system efficiency 5-15% in DFW summer. A $100 insulation fix saves on monthly electric bills.' },
  ];

  const conditions = [
    { id: 'bare', label: 'Suction line has no insulation', guide: 'Replace immediately. Measure line diameter (usually 7/8″ or 1-1/8″ OD). Buy 3/4″ wall foam rubber pipe insulation from supply house. DIY: $30-60 in materials. Pro installation: $75-150.' },
    { id: 'cracked', label: 'Insulation cracked or brittle', guide: 'Remove all old insulation — do not layer over it. UV-degraded foam holds moisture against copper. Measure and install new 3/4″ wall EPDM foam. Tape all seams with foil HVAC tape for UV protection.' },
    { id: 'wet', label: 'Insulation is wet or waterlogged', guide: 'Saturated insulation is worse than none. Remove it, dry the copper, inspect for corrosion. Install new insulation with UV-resistant outer jacket for outdoor sections. Budget $100-200 with pro.' },
    { id: 'attic', label: 'Line runs through attic — insulation damaged', guide: 'Attic sections need thicker insulation (1″ wall minimum) due to 130F+ attic temps in DFW. Check entire run length — pros often only fix the visible outdoor section and miss attic degradation.' },
    { id: 'good', label: 'Insulation looks intact', guide: 'Squeeze it — good foam springs back. Check seams for gaps. Inspect where line enters building (often fails there first). UV-blackened surface is cosmetic; cracking or hardness = replace.' },
  ];

  const sel = conditions.find(c => c.id === condition);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧱</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW HVAC Line Set Insulation Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>Suction line insulation — DFW most overlooked maintenance item</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #3b82f6', marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#93c5fd', fontSize: '0.9rem' }}>📏 DFW Standard: 3/4" wall foam rubber minimum. Attic runs: 1″ wall minimum. Replace every 8-12 years.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {facts.map((f, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155′ }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5′ }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Line Condition → Insulation Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {conditions.map(c => (
              <button key={c.id} onClick={() => setCondition(condition === c.id ? null : c.id)}
                style={{ background: condition === c.id ? '#F5E642′ : '#0f172a', color: condition === c.id ? '#0A1628' : '#e2e8f0',
                  border: '1px solid' + (condition === c.id ? ' #F5E642′ : ' #334155'), borderRadius: '0.5rem',
                  padding: '0.75rem 1rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          {sel && (
            <div style={{ background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '0.5rem' }}>🛠️ Action Guide</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6′ }}>{sel.guide}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Services Marketplace
        </div>
      </div>
    </div>
  );
}
