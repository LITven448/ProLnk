import { useState } from 'react';

export default function DFWVAHomeLoanGuide2026() {
  const [serviceType, setServiceType] = useState('active');

  const entitlements: Record<string, { eligible: boolean; benefit: string; notes: string }> = {
    active: { eligible: true, benefit: 'Full VA entitlement — 0% down, no loan limit', notes: '90+ days continuous active duty' },
    reserves: { eligible: true, benefit: 'Full VA entitlement after 6 years service', notes: '6 yrs Selected Reserve or National Guard' },
    veteran: { eligible: true, benefit: 'Full entitlement — all VA benefits apply', notes: 'Honorably discharged after qualifying service' },
    surviving: { eligible: true, benefit: 'Surviving spouse benefits — no funding fee', notes: 'Unremarried surviving spouse of veteran' },
    none: { eligible: false, benefit: 'Not eligible for VA loan', notes: 'Consider FHA (3.5% down) or conventional (3% down)' },
  };

  const current = entitlements[serviceType];

  const serviceOptions = [
    { id: 'active', label: 'Active Duty', icon: '⚔️' },
    { id: 'reserves', label: 'Reserves/Guard', icon: '🛡' },
    { id: 'veteran', label: 'Veteran', icon: '🎖' },
    { id: 'surviving', label: 'Surviving Spouse', icon: '🌹' },
    { id: 'none', label: 'Civilian', icon: '👤' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎖</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW VA Home Loan Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>DFW has one of the largest veteran populations in the US — know your benefits</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 24 }}>
          {[{icon:'🏠',title:'0% Down Payment',desc:'No down payment required for eligible veterans'},{icon:'🚫',title:'No PMI Ever',desc:'No private mortgage insurance regardless of down payment'},{icon:'📉',title:'Competitive Rates',desc:'Avg 5.9-6.3% in 2026 — below conventional rates'},{icon:'♾',title:'No Loan Limit',desc:'Limits removed in 2020 — buy at any price with full entitlement'}].map((b,i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginTop: 8 }}>{b.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🎯 VA Entitlement Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
            {serviceOptions.map(s => (
              <button key={s.id} onClick={() => setServiceType(s.id)} style={{ background: serviceType===s.id?'#F5E642':'#0A1628', color: serviceType===s.id?'#0A1628':'#fff', border: 'none', borderRadius: 8, padding: '12px 8px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: current.eligible?'#052e16':'#450a0a', borderRadius: 10, padding: 20, borderLeft: `4px solid ${current.eligible?'#22c55e':'#ef4444'}` }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: current.eligible?'#4ade80':'#f87171' }}>{current.eligible ? '✅ VA Eligible' : '❌ Not Eligible'}</div>
            <div style={{ color: '#cbd5e1', marginTop: 8 }}>{current.benefit}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{current.notes}</div>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📋 VA Appraisal Process in DFW</h2>
          {['VA assigns a certified appraiser (not chosen by lender)','Property must meet VA Minimum Property Requirements (MPRs)','DFW typical VA appraisal: $600-900, completed in 7-14 days','Common MPR issues: roof condition, HVAC, foundation, electrical','Tidewater initiative if sale price may exceed appraisal value'].map((s,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i<4?'1px solid #0A1628':'none' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{i+1}.</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>💰 VA Funding Fee 2026</h2>
          {[{t:'First use, 0% down',v:'2.15%'},{t:'First use, 5%+ down',v:'1.50%'},{t:'First use, 10%+ down',v:'1.25%'},{t:'Subsequent use, 0% down',v:'3.30%'},{t:'Exempt (disability 10%+)',v:'0%'}].map((r,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:i<4?'1px solid #0A1628':'none' }}>
              <span style={{ color:'#cbd5e1', fontSize:14 }}>{r.t}</span>
              <span style={{ color:'#F5E642', fontWeight:700 }}>{r.v}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>ProLnk connects veterans with trusted DFW contractors — fellow service members in your network.</p>
      </div>
    </div>
  );
}
