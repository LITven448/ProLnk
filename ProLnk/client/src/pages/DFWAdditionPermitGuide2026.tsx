import { useState } from 'react';

const cities = [
  { name: 'Dallas', timeline: '8-12 weeks', fee: '$300-$800', setback: '5ft side/rear', notes: 'Dallas requires full structural review, MEP drawings, and setback compliance. Inspections: foundation, framing, rough-in, insulation, final.', inspections: ['Foundation / slab','Framing rough-in','Plumbing rough-in','Electrical rough-in','Insulation','Drywall nail','Final inspection'] },
  { name: 'Fort Worth', timeline: '6-10 weeks', fee: '$250-$650', setback: '5ft side/rear', notes: 'Fort Worth requires structural drawings by licensed engineer. Each trade pulls separate permit. HOA review may add time.', inspections: ['Slab / foundation','Structural framing','Plumbing rough','Electrical rough','Mechanical rough','Insulation','Final'] },
  { name: 'Plano', timeline: '5-8 weeks', fee: '$200-$550', setback: '5ft side, 20ft rear', notes: 'Plano Building Inspections reviews energy code compliance. HVAC load calc required. Setbacks vary by zoning.', inspections: ['Foundation','Framing','Rough-in trades','Insulation + energy','Drywall','Final'] },
  { name: 'McKinney', timeline: '4-7 weeks', fee: '$175-$500', setback: '5ft side/rear', notes: 'McKinney Community Development. Energy compliance required. Licensed subs must pull own permits.', inspections: ['Foundation','Framing rough','Plumbing rough','Electrical rough','Insulation','Final'] },
  { name: 'Frisco', timeline: '5-8 weeks', fee: '$200-$600', setback: '5ft side, 20ft rear', notes: 'Frisco uses online permit portal. Structural plans by PE required. HOA review often adds 2-3 weeks.', inspections: ['Foundation','Structural frame','Rough-in MEP','Insulation','Sheetrock','Final'] },
  { name: 'Arlington', timeline: '5-9 weeks', fee: '$200-$550', setback: '5ft side/rear', notes: 'Arlington Development Services. Plan review required. Energy code (IECC 2021) must be met.', inspections: ['Foundation','Framing','Trades rough','Insulation','Drywall','Final'] },
];

export default function DFWAdditionPermitGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const city = cities.find(c => c.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Room Addition Permit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Permit requirements for room additions across DFW cities</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>📋 WHAT YOU ALWAYS NEED</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Structural / engineered drawings','Site plan showing setbacks','MEP (mechanical, electrical, plumbing) plans','Energy code compliance docs','Licensed contractor required','Separate sub-permits per trade'].map(r => (
              <div key={r} style={{ background: '#1a2f50', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#cbd5e1′ }}>📌 {r}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select your DFW city:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
            {cities.map(c => (
              <button key={c.name} onClick={() => setSelected(c.name)}
                style={{ background: selected === c.name ? '#F5E642′ : '#1a2f50', color: selected === c.name ? '#0A1628' : '#fff', border: '1px solid #2a4070', borderRadius: 8, padding: '10px 8px', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {city && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>🏗️ {city.name} — Room Addition Permits</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>CITY NOTES</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.notes}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>TIMELINE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>📅 {city.timeline}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT FEE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>💰 {city.fee}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>SETBACKS</p>
                  <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>📐 {city.setback}</p>
                </div>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>INSPECTION SEQUENCE</p>
                <div style={{ display: 'grid', gap: 6 }}>
                  {city.inspections.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                      <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i+1}</span>
                      <span style={{ color: '#cbd5e1′ }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          <p>ProLnk connects DFW homeowners with licensed general contractors who manage room addition permits end-to-end.</p>
        </div>
      </div>
    </div>
  );
}