import { useState } from 'react';

export default function DFWRoofingInsurancePaymentGuide2026() {
  const [stage, setStage] = useState('');
  const [hasMortgage, setHasMortgage] = useState('');
  const [result, setResult] = useState('');

  const getActionGuide = () => {
    if (!stage || !hasMortgage) { setResult('Please answer both questions.'); return; }
    const actions = {
      'acv-received': {
        'yes': '📋 ACTION: 1) Do NOT spend the ACV check yet. 2) Contact your mortgage company — their name is likely on the check and requires endorsement. 3) Ask them about their draw process (many hold funds in escrow). 4) Get your contractor started — they often work with mortgage companies. 5) Keep all receipts for the supplement claim.',
        'no': '📋 ACTION: 1) Review the ACV check — confirm it matches the adjuster\’s estimate. 2) Do NOT spend this check — it is only the first payment. 3) Share the estimate with your chosen contractor. 4) Contractor completes the job, then you file for the RCV supplement (depreciation recovery). 5) Supplement check arrives after proof of completion.',
      },
      'supplement-pending': {
        'yes': '📋 ACTION: 1) Submit Certificate of Completion + final invoice to your insurer. 2) Follow up weekly — supplements take 2–6 weeks. 3) When check arrives, your mortgage company name may be on it again. 4) Coordinate with mortgage company for endorsement and release of funds. 5) Pay contractor remaining balance from supplement.',
        'no': '📋 ACTION: 1) Submit Certificate of Completion + final contractor invoice to insurer immediately. 2) Reference your claim number and request Recoverable Depreciation Release. 3) Allow 2–6 weeks for supplement check. 4) Do not let contractor pressure you to pay full balance before supplement arrives — most reputable DFW contractors will wait.',
      },
      'paid-full': {
        'yes': '📋 ACTION: You may have missed supplement funds. 1) Contact insurer — supplements can sometimes still be filed. 2) Provide paid invoice and check if claim is still open. 3) For future claims, always wait for supplement before final payment.',
        'no': '📋 ACTION: If you paid the full balance before receiving your supplement, contact your insurer immediately. Supplement claims can still be filed in most cases if the claim is still open. Provide the paid invoice and request recoverable depreciation release.',
      },
    };
    setResult(actions[stage]?.[hasMortgage] || 'Contact your insurance adjuster directly for guidance on your specific stage.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '14px', fontWeight: '600' }}>🏠 DFW ROOFING INSURANCE GUIDE 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2' }}>How Insurance Pays for DFW Roof Replacement</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>Most DFW homeowners leave thousands on the table by not understanding the two-check insurance payment process.</p>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>💰 The Two-Check Process Explained</h2>
          {[['Check 1: ACV (Actual Cash Value)','Issued after adjuster inspection. This is the depreciated value of your old roof — NOT the full replacement cost. Depreciation is withheld.','🔵'],['Check 2: RCV Supplement (Recoverable Depreciation)','Issued after roof is complete and you submit proof. This is the withheld depreciation — often $2,000–$8,000+ on DFW roofs. YOU MUST CLAIM THIS.','🟢'],].map(([title, desc, icon]) => (
            <div key={title} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', marginBottom: '12px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '16px' }}>{icon} {title}</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🏦 The Mortgage Company Complication</h2>
          {['If you have a mortgage, your lender is a co-insured — their name appears on the insurance check','You CANNOT cash the check without their endorsement (signature)','Most mortgage companies have a draw process — they hold funds in escrow and release in draws as work progresses','Call your mortgage servicer\’s insurance loss department as soon as you receive the ACV check','Ask about their inspection requirements before they release final draw funds'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', minWidth: '20px', fontWeight: '700' }}>{i + 1}.</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧭 What Should I Do Right Now?</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>Where are you in the insurance process?</label>
            <select value={stage} onChange={e => setStage(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
              <option value="">Select your stage</option>
              <option value="acv-received">I received the ACV (first) check</option>
              <option value="supplement-pending">Roof is done, waiting for supplement check</option>
              <option value="paid-full">I already paid the contractor in full</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>Do you have a mortgage on this home?</label>
            <select value={hasMortgage} onChange={e => setHasMortgage(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
              <option value="">Select</option>
              <option value="yes">Yes, I have a mortgage</option>
              <option value="no">No, I own free and clear</option>
            </select>
          </div>
          <button onClick={getActionGuide}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            Get My Action Plan →
          </button>
          {result && <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>⚠️ DFW Storm Contractor Warning</div>
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>After major DFW hailstorms, out-of-state storm chasers flood the market. Always verify: Texas contractor license, local physical address, liability insurance certificate, and manufacturer warranty registration ability. ProLnk vets all roofing pros on the platform.</div>
        </div>
      </div>
    </div>
  );
}