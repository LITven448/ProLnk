import { useState } from 'react';

export default function DFWPreApprovalGuide() {
  const [income, setIncome] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [debt, setDebt] = useState('');
  const [downPayment, setDownPayment] = useState('');

  const getEstimate = () => {
    const inc = parseFloat(income) || 0;
    const score = parseInt(creditScore) || 0;
    const dbt = parseFloat(debt) || 0;
    const dp = parseFloat(downPayment) || 0;
    if (!inc || !score || !dbt) return null;

    const monthlyIncome = inc / 12;
    const maxDTI = score >= 740 ? 0.45 : score >= 700 ? 0.43 : score >= 660 ? 0.41 : 0.38;
    const availablePayment = (monthlyIncome * maxDTI) - dbt;
    const rate = score >= 760 ? 6.5 : score >= 720 ? 6.9 : score >= 680 ? 7.3 : 7.8;
    const monthlyRate = rate / 100 / 12;
    const n = 360;
    const loanAmt = availablePayment * ((1 - Math.pow(1 + monthlyRate, -n)) / monthlyRate);
    const purchasePower = loanAmt + dp;

    let approvalType = '';
    let approvalColor = '';
    let approvalNote = '';
    if (score >= 740 && inc >= 80000) {
      approvalType = 'Underwritten Pre-Approval (Gold Standard)';
      approvalColor = '#27ae60';
      approvalNote = 'Your profile qualifies for full underwriting — the strongest approval in DFW. Sellers treat this like cash.';
    } else if (score >= 700) {
      approvalType = 'Full Pre-Approval';
      approvalColor = '#2980b9';
      approvalNote = 'Strong pre-approval. Request underwriting review from your lender to upgrade before submitting offers in competitive DFW markets.';
    } else if (score >= 660) {
      approvalType = 'Pre-Approval with Conditions';
      approvalColor = '#e67e22';
      approvalNote = 'You will qualify but may have lender conditions. Work with a DFW-local lender who can close quickly despite conditions.';
    } else {
      approvalType = 'Pre-Qualification Only';
      approvalColor = '#e74c3c';
      approvalNote = 'Credit score limits approval strength. Focus on boosting score 20-40 points before competing in DFW. FHA is your best path.';
    }

    return { approvalType, approvalColor, approvalNote, purchasePower: Math.round(purchasePower), loanAmt: Math.round(loanAmt), rate, availablePayment: Math.round(availablePayment) };
  };

  const result = getEstimate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📋</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a2744', marginBottom: '0.5rem' }}>DFW Pre-Approval Guide</h1>
          <p style={{ color: '#555', fontSize: '1.05rem' }}>Pre-qual vs pre-approval vs underwritten approval — and how to get the gold standard.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Pre-Qualification', icon: '📄', desc: 'Basic income/asset check, no doc verification. DFW sellers don\’t trust these.', strength: 'Weak', color: '#e74c3c' },
            { label: 'Pre-Approval', icon: '✅', desc: 'Docs verified, credit pulled. Standard in DFW — required minimum to write offers.', strength: 'Good', color: '#e67e22' },
            { label: 'Underwritten', icon: '🏆', desc: 'Full underwriting done — file is approved pending appraisal only. Sellers love this.', strength: 'Gold Standard', color: '#27ae60' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `4px solid ${item.color}` }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 800, color: '#1a2744', marginBottom: '0.3rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>{item.desc}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>{item.strength}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2744', marginBottom: '1rem' }}>📁 Documents You Need</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {['Last 2 years W-2s or 1099s', 'Last 2 years tax returns', 'Last 30 days pay stubs', 'Last 60 days bank statements (all accounts)', '2 months investment/retirement statements', 'Photo ID + Social Security number', 'Rental history if applicable', 'Gift letter if using gifted funds'].map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '6px', fontSize: '0.9rem', color: '#444' }}>
                <span>📎</span><span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2744', marginBottom: '1rem' }}>🧮 Estimate Your Purchase Power</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Annual Gross Income ($)', value: income, set: setIncome, placeholder: 'e.g. 120000' },
              { label: 'Credit Score', value: creditScore, set: setCreditScore, placeholder: 'e.g. 740' },
              { label: 'Monthly Debt Payments ($)', value: debt, set: setDebt, placeholder: 'e.g. 400 (car, student loans)' },
              { label: 'Available Down Payment ($)', value: downPayment, set: setDownPayment, placeholder: 'e.g. 60000' },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.4rem' }}>{field.label}</label>
                <input type='number' value={field.value} onChange={e => field.set(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          {result && (
            <div style={{ backgroundColor: '#1a2744', borderRadius: '10px', padding: '1.25rem', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Estimated Purchase Power</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>${result.purchasePower.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Max Loan Amount</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>${result.loanAmt.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Est. Rate Range</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{result.rate}%</div>
                </div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: result.approvalColor + '22', border: `1.5px solid ${result.approvalColor}`, borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, color: result.approvalColor, marginBottom: '0.3rem' }}>🏆 {result.approvalType}</div>
                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{result.approvalNote}</div>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#666' }}>⚠️ Estimates only — get official pre-approval from a licensed DFW lender. Pre-approvals valid 90 days.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
