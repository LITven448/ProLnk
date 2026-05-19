import { useState } from 'react';

const cities = [
  { name: 'Dallas', timeline: '5-8 weeks', fee: '$200-$600', notes: 'Permit from Dallas Development Services. Fence required by TX law before water added. Electrical bonding inspection mandatory.', steps: ['Submit site plan + pool specs','Building permit issued','Excavation inspection','Rough-in plumbing inspection','Electrical bonding inspection','Final inspection before filling'] },
  { name: 'Fort Worth', timeline: '4-7 weeks', fee: '$175-$500', notes: 'FW Building Services issues permit. Licensed electrician must perform bonding. HOA approval often also required.', steps: ['HOA approval (if applicable)','Submit permit application + plans','Structural/excavation inspection','Plumbing rough-in inspection','Electrical bonding','Final & fence inspection'] },
  { name: 'Plano', timeline: '4-6 weeks', fee: '$150-$450', notes: 'Plano Building Inspections issues permit. Pool must be enclosed by 4ft fence before water. Separate electrical permit needed.', steps: ['Pool permit application','Electrical permit application','Pre-gunite inspection','Plumbing inspection','Bond inspection','Final inspection'] },
  { name: 'McKinney', timeline: '4-6 weeks', fee: '$150-$400', notes: 'McKinney Community Development. Fence must be completed and inspected before pool is filled — TX law.', steps: ['Submit plans to Community Development','Permit issuance','Excavation / pre-gunite','Plumbing rough-in','Electrical bonding','Final before filling'] },
  { name: 'Frisco', timeline: '5-7 weeks', fee: '$200-$500', notes: 'Frisco Building Inspections + HOA approval often required. Barrier requirement strictly enforced.', steps: ['HOA approval','Permit application','Pre-gunite inspection','Plumbing inspection','Electrical bonding','Final + fence verification'] },
  { name: 'Allen', timeline: '4-6 weeks', fee: '$150-$400', notes: 'Allen Building Department. Pool barrier (fence) must be in place at final inspection. Spa requires separate permit.', steps: ['Submit permit application','Pre-gunite','Plumbing rough-in','Electrical bonding','Barrier / fence inspection','Final inspection'] },
];

export default function DFWPoolPermitGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const city = cities.find(c => c.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏊</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Pool Permit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Swimming pool permit requirements across DFW — by city</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>🔒 TEXAS STATE LAW — ALL POOLS</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['4ft fence required by TX law','Fence inspected before filling','Electrical bonding mandatory','Licensed electrician required','Self-closing gate required','Final inspection before water'].map(r => (
              <div key={r} style={{ background: '#1a2f50', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#cbd5e1′ }}>⚖️ {r}</div>
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
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>🏊 {city.name} — Pool Permit Process</h2>
            <div style={{ display: 'grid', gap: 12 }}>
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
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>INSPECTION SEQUENCE</p>
                <div style={{ display: 'grid', gap: 6 }}>
                  {city.steps.map((s, i) => (
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
          <p>ProLnk connects DFW homeowners with licensed pool contractors who manage the full permit process.</p>
        </div>
      </div>
    </div>
  );
}