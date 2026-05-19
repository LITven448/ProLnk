import { useState } from 'react';

const trades = ['Plumber', 'Electrician', 'HVAC Tech', 'Roofer', 'General Contractor', 'Painter'];
const expLevels = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];
const incomeMap: Record<string, Record<string, string>> = {
  'Plumber': { '0-2 years': '$18,400', '3-5 years': '$31,200', '6-10 years': '$48,600', '10+ years': '$72,000′ },
  'Electrician': { '0-2 years': '$17,800', '3-5 years': '$30,400', '6-10 years': '$46,200', '10+ years': '$69,500′ },
  'HVAC Tech': { '0-2 years': '$19,200', '3-5 years': '$33,600', '6-10 years': '$51,000', '10+ years': '$76,400′ },
  'Roofer': { '0-2 years': '$16,400', '3-5 years': '$28,800', '6-10 years': '$43,500', '10+ years': '$64,200′ },
  'General Contractor': { '0-2 years': '$20,100', '3-5 years': '$35,200', '6-10 years': '$54,800', '10+ years': '$81,000′ },
  'Painter': { '0-2 years': '$14,200', '3-5 years': '$24,000', '6-10 years': '$36,600', '10+ years': '$52,400′ },
};

export default function ProLnkForPros() {
  const [trade, setTrade] = useState('');
  const [exp, setExp] = useState('');

  const income = trade && exp ? incomeMap[trade]?.[exp] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>ProLnk for Service Pros</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>No bidding wars. Pre-qualified leads. 5 income streams. Charter tier now open.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 48 }}>
          {[['🎯','Pre-Qualified Leads','Homeowners already vetted — no tire-kickers'],['💸','5 Income Streams','Direct jobs, referrals, subscriptions, overrides, origination'],['🚫','No Bidding Wars','Matched directly — not competing on price'],['🏆','Charter Tier Open','First 25 pros lock in lowest rate forever']].map(([icon,title,desc],i) => (
            <div key={i} style={{ background: '#132040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Project Your Year 1 ProLnk Income</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Your Trade</label>
              <select value={trade} onChange={e => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select trade...</option>
                {trades.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Years of Experience</label>
              <select value={exp} onChange={e => setExp(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select experience...</option>
                {expLevels.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          {income && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Projected Year 1 ProLnk Income</div>
              <div style={{ fontSize: 48, fontWeight: 700, color: '#F5E642′ }}>{income}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Across all 5 income streams at Charter tier rates</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Secure Your Charter Spot</h3>
          <p style={{ color: '#0A1628', marginBottom: 4 }}>Only 25 Charter spots available. First-come, first-served.</p>
          <p style={{ color: '#0A1628', fontWeight: 600 }}>📧 pros@prolnk.io</p>
        </div>
      </div>
    </div>
  );
}