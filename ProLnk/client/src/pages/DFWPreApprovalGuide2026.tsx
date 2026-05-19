import { useState } from 'react';

export default function DFWPreApprovalGuide2026() {
  const [creditScore, setCreditScore] = useState(720);

  const getStatus = (score: number) => {
    if (score >= 740) return { label: 'Excellent', color: '#22c55e', desc: 'Best rates available. All loan types open. Underwritten pre-approval strongly recommended in DFW competitive market.', likelihood: '98%' };
    if (score >= 700) return { label: 'Good', color: '#84cc16', desc: 'Conventional and FHA available. May not qualify for very best rates. Pre-approval will be fast.', likelihood: '90%' };
    if (score >= 660) return { label: 'Fair', color: '#f59e0b', desc: 'FHA is your best path (580+ required). Conventional requires 620+. Some lenders may add overlays.', likelihood: '75%' };
    if (score >= 620) return { label: 'Marginal', color: '#f97316', desc: 'FHA possible. Conventional difficult. Work with mortgage broker who shops multiple lenders.', likelihood: '50%' };
    return { label: 'Needs Work', color: '#ef4444', desc: 'Focus on credit repair before applying. Pay down balances, dispute errors, avoid new inquiries.', likelihood: '15%' };
  };

  const status = getStatus(creditScore);

  const preApprovalTypes = [
    { name: 'Pre-Qualification', icon: '📝', strength: 'Weak', desc: 'Self-reported income/assets, no credit pull. Not useful in DFW competitive offers.' },
    { name: 'Pre-Approval', icon: '✅', strength: 'Strong', desc: 'Credit pulled, income docs reviewed. Most sellers accept. Takes 1-3 days.' },
    { name: 'Underwritten Pre-Approval', icon: '🏆', strength: 'Strongest', desc: 'Full underwriting before home found. Near-guarantee of close. DFW sellers prefer this.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Pre-Approval Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Pre-approval is mandatory in DFW — most sellers won't show without it</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🎯 Credit Score Check</h2>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Your Credit Score: <strong style={{ color: status.color, fontSize: 22 }}>{creditScore} — {status.label}</strong></label>
          <input type="range" min={500} max={850} step={10} value={creditScore} onChange={e => setCreditScore(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642', marginBottom: 16 }} />
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${status.color}` }}>
            <div style={{ fontWeight: 700, color: status.color, marginBottom: 6 }}>Pre-Approval Likelihood: {status.likelihood}</div>
            <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{status.desc}</p>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📊 Pre-Approval Types Compared</h2>
          {preApprovalTypes.map((t, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 10, borderLeft: i===2?'4px solid #F5E642':'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{t.icon} {t.name}</span>
                <span style={{ background: i===2?'#F5E642':i===1?'#1e40af':'#374151', color: i===2?'#0A1628':'#fff', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{t.strength}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0′ }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📁 What Lenders Check</h2>
          {[{icon:'💳',label:'Credit Score',detail:'All 3 bureaus pulled — middle score used'},{icon:'📊',label:'DTI Ratio',detail:'Total debt payments vs gross income (<43-57%)'},{icon:'💼',label:'Employment',detail:'2 years W2 or self-employment history required'},{icon:'🏦',label:'Assets',detail:'2 months bank statements for down + reserves'},{icon:'📄',label:'Income',detail:'Last 2 pay stubs + W2s for past 2 years'}].map((item,i) => (
            <div key={i} style={{ display:'flex', gap:14, padding:'10px 0', borderBottom:i<4?'1px solid #0A1628':'none', alignItems:'center' }}>
              <span style={{ fontSize:24 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight:600, color:'#F5E642′ }}>{item.label}</div>
                <div style={{ color:'#94a3b8', fontSize:13 }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🔧 ProLnk Before You Close</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14 }}>Once pre-approved and under contract, ProLnk connects you with vetted home inspectors, HVAC techs, roofers, and general contractors for pre-purchase inspections and immediate post-closing repairs across DFW.</p>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>ProLnk — your home services network from pre-approval through ownership.</p>
      </div>
    </div>
  );
}
