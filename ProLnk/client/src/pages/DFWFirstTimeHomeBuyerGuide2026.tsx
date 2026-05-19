import { useState } from 'react';

export default function DFWFirstTimeHomeBuyerGuide2026() {
  const [income, setIncome] = useState(65000);
  const [profession, setProfession] = useState('general');

  const programs = [
    { id: 'mfth', name: 'My First Texas Home', icon: '🌟', dpa: '5% DPA', maxIncome: 110000, profs: 'all', desc: '5% down payment assistance, 30yr fixed, statewide' },
    { id: 'mcc', name: 'TX Mortgage Credit Certificate', icon: '📜', dpa: 'Tax credit', maxIncome: 110000, profs: 'all', desc: 'Up to $2,000/yr federal tax credit on mortgage interest' },
    { id: 'heroes', name: 'Homes for Texas Heroes', icon: '🦸', dpa: '5% DPA', maxIncome: 110000, profs: 'hero', desc: 'Teachers, firefighters, EMS, police, veterans' },
    { id: 'tsahc', name: 'TSAHC Home Sweet Texas', icon: '🏡', dpa: '3-5% DPA', maxIncome: 97000, profs: 'all', desc: 'No first-time buyer requirement, statewide' },
  ];

  const eligible = programs.filter(p =>
    income <= p.maxIncome && (p.profs === 'all' || (p.profs === 'hero' && profession !== 'general'))
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔑</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW First-Time Buyer Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Texas down payment assistance programs — find what you qualify for</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🎯 Eligibility Check</h2>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Household Income: <strong style={{ color: '#F5E642′ }}>${income.toLocaleString()}/yr</strong></label>
          <input type="range" min={30000} max={150000} step={5000} value={income} onChange={e => setIncome(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642', marginBottom: 20 }} />
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Profession</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[{id:'general',label:'General',icon:'👤'},{id:'teacher',label:'Teacher',icon:'🍎'},{id:'first_responder',label:'First Resp.',icon:'🚒'},{id:'veteran',label:'Veteran',icon:'🎖'},{id:'nurse',label:'Nurse',icon:'🏥'},{id:'police',label:'Police',icon:'🚔'}].map(p => (
              <button key={p.id} onClick={() => setProfession(p.id)} style={{ background: profession===p.id?'#F5E642':'#0A1628', color: profession===p.id?'#0A1628':'#fff', border: 'none', borderRadius: 8, padding: '10px 8px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>✅ Programs You Qualify For ({eligible.length})</h2>
          {eligible.length === 0 && <p style={{ color: '#ef4444′ }}>No programs match current income level. Adjust income or check federal programs.</p>}
          {eligible.map(p => (
            <div key={p.id} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{p.icon} <strong>{p.name}</strong></span>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 700 }}>{p.dpa}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0′ }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📊 Quick Comparison</h2>
          {[{n:'My First Texas Home',min:'620',dpa:'5%',max:'$110K'},{n:'Homes for Texas Heroes',min:'620',dpa:'5%',max:'$110K'},{n:'TSAHC Home Sweet Texas',min:'620',dpa:'3-5%',max:'$97K'},{n:'TX MCC',min:'620',dpa:'Tax credit',max:'$110K'}].map((r,i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:8, padding:'10px 0', borderBottom:i<3?'1px solid #0A1628':'none', fontSize:13 }}>
              <span style={{ color:'#cbd5e1′ }}>{r.n}</span>
              <span style={{ color:'#94a3b8′ }}>Min {r.min}</span>
              <span style={{ color:'#F5E642′ }}>{r.dpa}</span>
              <span style={{ color:'#94a3b8′ }}>&lt;{r.max}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>ProLnk connects new homeowners with trusted contractors for repairs and upgrades after closing.</p>
      </div>
    </div>
  );
}
