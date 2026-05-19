import { useState } from 'react';

export default function DFWClosingCostsGuide2026() {
  const [homePrice, setHomePrice] = useState(385000);
  const [loanType, setLoanType] = useState('conventional');

  const calcCosts = (price: number, loan: string) => {
    const loanAmt = price * 0.9;
    const title = 1500;
    const lenderFees = loan === 'va' ? 800 : 1200;
    const escrow = Math.round(price * 0.009);
    const prepaids = 2000;
    const vaFundingFee = loan === 'va' ? Math.round(loanAmt * 0.0215) : 0;
    const fhaMIP = loan === 'fha' ? Math.round(loanAmt * 0.0175) : 0;
    const total = title + lenderFees + escrow + prepaids + vaFundingFee + fhaMIP;
    return { title, lenderFees, escrow, prepaids, vaFundingFee, fhaMIP, total };
  };

  const costs = calcCosts(homePrice, loanType);

  const lineItems = [
    { label: 'Title Insurance & Search', amount: costs.title, always: true },
    { label: 'Lender Origination Fees', amount: costs.lenderFees, always: true },
    { label: 'Escrow / Settlement Fees', amount: costs.escrow, always: true },
    { label: 'Prepaids (insurance, taxes, interest)', amount: costs.prepaids, always: true },
    { label: 'VA Funding Fee (2.15%)', amount: costs.vaFundingFee, always: false },
    { label: 'FHA Upfront MIP (1.75%)', amount: costs.fhaMIP, always: false },
  ].filter(item => item.always || item.amount > 0);

  const loanTypes = [{id:'conventional',label:'Conventional',icon:'🏦'},{id:'fha',label:'FHA',icon:'🏛'},{id:'va',label:'VA',icon:'🎖'},{id:'usda',label:'USDA',icon:'🌾'}];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🧾</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Closing Costs Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Avg $8K-12K on a $385K DFW home — know every line item before you close</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>💡 Closing Cost Estimator</h2>
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Home Price: <strong style={{ color: '#F5E642' }}>${homePrice.toLocaleString()}</strong></label>
          <input type="range" min={200000} max={800000} step={5000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642', marginBottom: 20 }} />
          <label style={{ display: 'block', color: '#94a3b8', marginBottom: 10 }}>Loan Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
            {loanTypes.map(lt => (
              <button key={lt.id} onClick={() => setLoanType(lt.id)} style={{ background: loanType===lt.id?'#F5E642':'#0A1628', color: loanType===lt.id?'#0A1628':'#fff', border: 'none', borderRadius: 8, padding: '12px 6px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {lt.icon} {lt.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 10, overflow: 'hidden' }}>
            {lineItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < lineItems.length-1 ? '1px solid #1e2d45' : 'none' }}>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>${item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: '#132034', borderTop: '2px solid #F5E642' }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total Estimated Closing Costs</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>${costs.total.toLocaleString()}</span>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: 12, margin: '8px 0 0' }}>Estimate only. Actual costs vary by lender, title company, and property. Does not include down payment.</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>💡 How to Reduce Closing Costs</h2>
          {['Request seller concessions (2-6% in buyers market — DFW softened in 2026)','Shop title companies — in TX, buyer often chooses, prices vary 20-30%','Negotiate lender credits (accept slightly higher rate for credits)','Roll closing costs into loan (available on some programs)','Close at end of month to reduce prepaid interest charges','Ask lender for No-Cost refi option if planning to refinance in 2 years'].map((t,i) => (
            <div key={i} style={{ display:'flex', gap:10, padding:'9px 0', borderBottom:i<5?'1px solid #0A1628':'none' }}>
              <span style={{ color:'#F5E642' }}>→</span>
              <span style={{ color:'#cbd5e1', fontSize:14 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📊 Seller Concession Limits</h2>
          {[{t:'Conventional (LTV >90%)',v:'3% max'},{t:'Conventional (LTV 75-90%)',v:'6% max'},{t:'FHA',v:'6% max'},{t:'VA',v:'4% max'},{t:'USDA',v:'6% max'}].map((r,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:i<4?'1px solid #0A1628':'none' }}>
              <span style={{ color:'#cbd5e1', fontSize:14 }}>{r.t}</span>
              <span style={{ color:'#F5E642', fontWeight:700 }}>{r.v}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>ProLnk connects DFW buyers with vetted contractors for immediate post-closing repairs and upgrades.</p>
      </div>
    </div>
  );
}
