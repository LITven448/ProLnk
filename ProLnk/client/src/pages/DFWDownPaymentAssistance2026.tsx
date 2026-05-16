import { useState } from 'react';

export default function DFWDownPaymentAssistance2026() {
  const [incomeK, setIncomeK] = useState(70);
  const [city, setCity] = useState('dallas');

  const allPrograms = [
    { name: 'City of Dallas DPA', range: '$10K-50K', city: 'dallas', maxIncomeK: 80, icon: '🏙', desc: 'Income-based grant, must be primary residence in Dallas city limits' },
    { name: 'Tarrant County DPA', range: 'Up to $14,999', city: 'tarrant', maxIncomeK: 90, icon: '🌆', desc: 'Forgivable loan after 5 yrs occupancy, Fort Worth and surrounding areas' },
    { name: 'TSAHC 5% DPA', range: '5% of loan', city: 'all', maxIncomeK: 110, icon: '🌟', desc: 'Statewide grant, no repayment required, works with FHA/conventional' },
    { name: 'Freddie Mac BorrowSmart', range: 'Up to $2,500', city: 'all', maxIncomeK: 100, icon: '🏦', desc: 'Credit toward closing costs, income AMI limits apply' },
    { name: 'My First Texas Home', range: '5% of loan', city: 'all', maxIncomeK: 110, icon: '🔑', desc: '30yr fixed + 5% forgivable DPA for first-time buyers' },
    { name: 'Plano HOME Program', range: 'Up to $5,000', city: 'plano', maxIncomeK: 85, icon: '🏘', desc: 'Plano residents only, must attend homebuyer education course' },
  ];

  const eligible = allPrograms.filter(p =>
    incomeK <= p.maxIncomeK && (p.city === 'all' || p.city === city)
  );

  const cities = [{id:'dallas',label:'Dallas',icon:'🏙'},{id:'tarrant',label:'Tarrant Co.',icon:'🌆'},{id:'plano',label:'Plano',icon:'🏘'},{id:'frisco',label:'Frisco',icon:'🌇'},{id:'arlington',label:'Arlington',icon:'⚾'}];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>💰</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Down Payment Assistance 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Federal, state, and local DPA programs across the Metroplex</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🎯 Find Your Programs</h2>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Household Income: <strong style={{ color: '#F5E642' }}>${incomeK}K/yr</strong></label>
          <input type="range" min={30} max={130} step={5} value={incomeK} onChange={e => setIncomeK(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642', marginBottom: 20 }} />
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 10 }}>Your City</label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {cities.map(c => (
              <button key={c.id} onClick={() => setCity(c.id)} style={{ background: city===c.id?'#F5E642':'#0A1628', color: city===c.id?'#0A1628':'#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>✅ Available Programs ({eligible.length} found)</h2>
          {eligible.length === 0 && <p style={{ color: '#ef4444' }}>No local programs found. Try TSAHC or My First Texas Home which are statewide.</p>}
          {eligible.map((p, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 700 }}>{p.icon} {p.name}</span>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '3px 10px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 8 }}>{p.range}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0' }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📋 DPA Quick Tips</h2>
          {['Stack programs — combine TSAHC DPA with MCC tax credit','Most DPA requires homebuyer education course (HUD-approved, ~8hrs)','Seller concessions (2-6%) can further reduce out-of-pocket costs','DPA funds often reserved — apply early in the year','Primary residence only — investment properties do not qualify'].map((t,i) => (
            <div key={i} style={{ display:'flex', gap:10, padding:'9px 0', borderBottom:i<4?'1px solid #0A1628':'none' }}>
              <span style={{ color:'#F5E642' }}>✓</span>
              <span style={{ color:'#cbd5e1', fontSize:14 }}>{t}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>ProLnk helps DFW homeowners find trusted contractors after they get their keys.</p>
      </div>
    </div>
  );
}
