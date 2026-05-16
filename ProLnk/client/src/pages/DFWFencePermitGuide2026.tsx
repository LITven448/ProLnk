import { useState } from 'react';

const cities = [
  { name: 'Dallas', heightFront: '4ft', heightSide: '8ft', heightRear: '8ft', setback: '0ft from property line (verify survey)', hoa: 'Separate HOA process', corner: 'Sight-triangle restriction at corners', timeline: '2-3 weeks', fee: '$50-$150', notes: 'Dallas requires permit for fences over 6ft. Front yard limit 4ft. Corner visibility triangle required for safety.' },
  { name: 'Fort Worth', heightFront: '4ft', heightSide: '6ft', heightRear: '6ft', setback: '0-2ft from property line', hoa: 'HOA approval separate', corner: 'Corner lots: 20ft sight triangle', timeline: '2-3 weeks', fee: '$50-$125', notes: 'Fort Worth permits required for all fences. Submit site plan showing fence location relative to property lines.' },
  { name: 'Plano', heightFront: '4ft', heightSide: '6ft', heightRear: '6ft', setback: '1ft min from easements', hoa: 'HOA review common in Plano', corner: 'Corner lot restrictions apply', timeline: '1-2 weeks', fee: '$50-$100', notes: 'Plano Building Inspections. Fence permit required citywide. Material restrictions may apply in some neighborhoods.' },
  { name: 'Frisco', heightFront: '4ft', heightSide: '6ft', heightRear: '8ft', setback: '0ft (check HOA)', hoa: 'HOA approval almost always required', corner: 'Corner visibility triangle enforced', timeline: '2-4 weeks', fee: '$75-$150', notes: 'Frisco permits required. Many HOAs also require separate approval and material/color standards. Start with HOA first.' },
  { name: 'McKinney', heightFront: '4ft', heightSide: '6ft', heightRear: '6ft', setback: '0-1ft from property line', hoa: 'HOA review required if applicable', corner: 'Corner lot triangle restriction', timeline: '1-2 weeks', fee: '$50-$125', notes: 'McKinney Community Development. Permit required for all fences. Submit site plan + fence material type.' },
  { name: 'Allen', heightFront: '4ft', heightSide: '6ft', heightRear: '6ft', setback: '0ft from property line', hoa: 'HOA approval often required', corner: 'Corner lot sight-line rules apply', timeline: '1-2 weeks', fee: '$50-$100', notes: 'Allen Building Department. Permit required. Materials: wood, vinyl, aluminum, masonry allowed. Chain link restricted in some zones.' },
  { name: 'Garland', heightFront: '4ft', heightSide: '6ft', heightRear: '6ft', setback: '0ft (respect property line)', hoa: 'HOA varies by neighborhood', corner: 'Corner visibility triangle required', timeline: '1-2 weeks', fee: '$50-$125', notes: 'Garland requires permit for fences over 6ft. Front yard limited to 4ft max. Submit site plan with property boundaries.' },
];

export default function DFWFencePermitGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const city = cities.find(c => c.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🚧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Fence Permit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Fence permit requirements, height limits, and setbacks across DFW cities</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>📏 GENERAL DFW FENCE RULES</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Permit required in all DFW cities','Front yard max typically 4ft','Side/rear max typically 6-8ft','Corner visibility triangle required','HOA approval is separate from city','Property survey recommended first'].map(r => (
              <div key={r} style={{ background: '#1a2f50', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#cbd5e1' }}>📋 {r}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select your DFW city:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
            {cities.map(c => (
              <button key={c.name} onClick={() => setSelected(c.name)}
                style={{ background: selected === c.name ? '#F5E642' : '#1a2f50', color: selected === c.name ? '#0A1628' : '#fff', border: '1px solid #2a4070', borderRadius: 8, padding: '10px 8px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {city && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>🚧 {city.name} — Fence Permit Guide</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>FRONT YARD MAX</p>
                  <p style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{city.heightFront}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>SIDE YARD MAX</p>
                  <p style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{city.heightSide}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>REAR YARD MAX</p>
                  <p style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{city.heightRear}</p>
                </div>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>SETBACK FROM PROPERTY LINE</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.setback}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>CORNER LOT RESTRICTION</p>
                <p style={{ color: '#fbbf24', fontSize: 14 }}>⚠️ {city.corner}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>HOA APPROVAL</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>🏘️ {city.hoa}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>CITY NOTES</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.notes}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>TIMELINE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>📅 {city.timeline}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT FEE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>💰 {city.fee}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          <p>ProLnk connects DFW homeowners with licensed fence contractors who handle permits and HOA approvals.</p>
        </div>
      </div>
    </div>
  );
}