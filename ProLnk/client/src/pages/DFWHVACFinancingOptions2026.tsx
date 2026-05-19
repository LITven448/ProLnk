import { useState } from 'react';

const financing = [
  { id: 'contractor', label: 'Contractor Financing', icon: '🏗️', desc: 'GreenSky & Synchrony — applied at point of sale, same-day approval, 0% promo periods up to 18 months. Watch deferred interest clauses — pay in full before promo ends or full interest applies retroactively.' },
  { id: 'heloc', label: 'HELOC', icon: '🏠', desc: 'Home Equity Line of Credit — best rates if you have 20%+ equity. Variable rate risk in 2026. Interest may be tax-deductible. Takes 2–4 weeks to close — plan ahead.' },
  { id: 'personal', label: 'Personal Loan', icon: '💳', desc: 'Fixed rate, no home equity required. Rates 7–18% depending on credit. Approval in 1–3 days. Best for smaller systems or renters financing landlord upgrades.' },
  { id: 'utility', label: 'Utility Program', icon: '⚡', desc: 'Oncor offers on-bill financing through participating contractors. Low rates, no credit check. Limited to Oncor service territory. Stack with rebates.' },
];

const credits = [
  { label: 'Federal 25C Tax Credit', value: 'Up to $2,000', note: 'Heat pumps & qualifying systems. Must be primary residence. Claim on Form 5695.' },
  { label: 'Oncor Rebate (Cool & Efficient)', value: '$100–$400', note: 'SEER2 16+ systems. Paid after installation. Contractor typically submits on your behalf.' },
  { label: 'Effective Stacking', value: 'Up to $2,400 off', note: 'Federal credit reduces tax owed; Oncor rebate reduces cost directly. Both can apply to same system.' },
];

const creditProfiles = ['Excellent (750+)', 'Good (700–749)', 'Fair (650–699)', 'Building (<650)'];
const situations = ['Replacing old system — urgent', 'Planning ahead — 6+ months', 'New construction', 'Rental property'];

export default function DFWHVACFinancingOptions2026() {
  const [situation, setSituation] = useState('');
  const [credit, setCredit] = useState('');
  const [rec, setRec] = useState('');
  const [activeTab, setActiveTab] = useState('contractor');

  function getRecommendation() {
    if (!situation || !credit) { setRec('Please select both a situation and credit profile.'); return; }
    let r = '';
    if (credit === 'Excellent (750+)') {
      r = situation.includes('urgent')
        ? '✅ Best path: Contractor financing (GreenSky 0% promo) for speed, then refinance via HELOC within 60 days for lower long-term rate. Stack federal 25C + Oncor rebate immediately.'
        : '✅ Best path: HELOC — lowest rate, potentially tax-deductible. Take your time. Stack federal 25C + Oncor rebate. Effective cost after credits: ~$5,000–$9,000 on a $10,000 system.';
    } else if (credit === 'Good (700–749)') {
      r = '✅ Best path: Contractor financing (Synchrony) or personal loan. Compare APR. Stack federal 25C + Oncor rebate. Avoid deferred interest traps — set autopay to clear by promo end.';
    } else if (credit === 'Fair (650–699)') {
      r = '⚠️ Best path: Oncor on-bill financing (no credit check) if available. Otherwise personal loan — compare 3 lenders. Contractor financing approval rates lower at this tier.';
    } else {
      r = '⚠️ Best path: Oncor on-bill financing first. Explore utility assistance programs (LIHEAP). Contractor financing may require co-signer. Focus on 25C credit to recoup costs at tax time.';
    }
    setRec(r);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💰 DFW HVAC Financing Options</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 32 }}>Complete guide to financing your DFW HVAC replacement — including how to stack federal credits with Oncor rebates to maximize savings.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {financing.map(f => (
            <button key={f.id} onClick={() => setActiveTab(f.id)}
              style={{ background: activeTab === f.id ? '#F5E642′ : '#132035', color: activeTab === f.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {f.icon} {f.label}
            </button>
          ))}
        </div>
        {financing.filter(f => f.id === activeTab).map(f => (
          <div key={f.id} style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 8 }}>{f.icon} {f.label}</h3>
            <p style={{ color: '#C8D8E8', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚡ Stacking Credits + Rebates</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {credits.map((c, i) => (
            <div key={i} style={{ background: '#132035', borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{c.label}</div>
                <div style={{ color: '#8FA3BF', fontSize: 13, marginTop: 4 }}>{c.note}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 800, whiteSpace: 'nowrap' }}>{c.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Your Financing Recommendation</h2>
        <div style={{ background: '#132035', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8FA3BF', display: 'block', marginBottom: 6 }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', fontSize: 14 }}>
                <option value="">Select...</option>
                {situations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8FA3BF', display: 'block', marginBottom: 6 }}>Credit Profile</label>
              <select value={credit} onChange={e => setCredit(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', fontSize: 14 }}>
                <option value="">Select...</option>
                {creditProfiles.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get My Recommendation →
          </button>
          {rec && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#C8D8E8', lineHeight: 1.7, fontSize: 15 }}>{rec}</div>}
        </div>
      </div>
    </div>
  );
}
