import { useState } from 'react';

const vsComparison = [
  { aspect: 'Who They Work For', insurance: 'The insurance company', public: 'You — the policyholder' },
  { aspect: 'Who Pays Them', insurance: 'Insurance carrier (salaried)', public: 'You (10–15% of settlement)' },
  { aspect: 'Goal', insurance: 'Accurate claim / limit payout', public: 'Maximum legitimate settlement for you' },
  { aspect: 'Policy Knowledge', insurance: 'Knows carrier policies deeply', public: 'Knows ALL carrier policies + loopholes' },
  { aspect: 'Damage Documentation', insurance: 'Standard scope', public: 'Comprehensive — finds overlooked damage' },
  { aspect: 'Supplemental Claims', insurance: 'Rarely proactive', public: 'Proactively files supplements' },
];

const whenToHire = [
  { trigger: 'Large Claims ($15K+)', detail: 'Public adjuster fees (10-15%) are covered by the increase in settlement — often net positive', rec: '✅ Strongly Recommend' },
  { trigger: 'Denied Claim', detail: 'PAs specialize in reversing denials — they know policy language and common denial tactics', rec: '✅ Strongly Recommend' },
  { trigger: 'Underpaid Settlement', detail: 'If contractor estimate exceeds insurer\’s by 20%+, a PA can recover the difference and more', rec: '✅ Recommend' },
  { trigger: 'Total Loss', detail: 'Complex rebuild calculations, code upgrades, and ALE claims benefit from professional advocacy', rec: '✅ Strongly Recommend' },
  { trigger: 'Small Claims Under $5K', detail: 'PA fees may exceed benefit. Negotiate directly or hire a contractor to help scope', rec: '⚠️ Often Not Worth It' },
  { trigger: 'Straightforward Approval', detail: 'If insurer approved full contractor estimate, a PA adds little value', rec: '❌ Not Needed' },
];

const vetChecklist = [
  'Verify Texas Department of Insurance license at tdi.texas.gov',
  'Confirm they specialize in residential (not just commercial) claims',
  'Ask for references from similar claim types in DFW',
  'Get fee agreement in writing before signing anything',
  'Confirm they file supplements — not just initial claims',
  'Check BBB rating and Google reviews in your specific metro area',
  'Avoid anyone who guarantees a specific dollar amount up front',
];

export default function DFWPublicAdjusterGuide() {
  const [claimAmount, setClaimAmount] = useState(45000);
  const [complexity, setComplexity] = useState('moderate');
  const [result, setResult] = useState<{ paFee: string; expectedIncrease: string; netBenefit: string; verdict: string } | null>(null);

  function calculate() {
    const feeRate = 0.125;
    const increaseRate = complexity === 'simple' ? 0.18 : complexity === 'moderate' ? 0.32 : 0.52;
    const paFee = claimAmount * feeRate;
    const increase = claimAmount * increaseRate;
    const net = increase - paFee;
    const verdict = net > 5000 ? '✅ Public adjuster likely worth it — projected net gain justifies cost' : net > 0 ? '⚠️ Borderline — get a free PA consultation before deciding' : '❌ May not be cost-effective — negotiate directly first';
    setResult({
      paFee: `$${Math.round(paFee).toLocaleString()} (12.5% of settlement)`,
      expectedIncrease: `$${Math.round(increase).toLocaleString()} estimated increase in settlement`,
      netBenefit: `$${Math.round(net).toLocaleString()} projected net benefit to you`,
      verdict,
    });
  }

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2640', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#0A1628', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5 }}>DFW Homeowner Resource · 2026</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#0A1628', marginBottom: 12, lineHeight: 1.1 }}>DFW Public Adjuster Guide</h1>
        <p style={{ fontSize: 18, color: '#4A5568', marginBottom: 48, maxWidth: 680 }}>What public adjusters do, when to hire one, what they cost, and how to vet them in the Dallas-Fort Worth market.</p>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Public Adjuster vs. Insurance Adjuster</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', background: '#F1F3F5', color: '#4A5568', fontWeight: 600, fontSize: 13 }}>ASPECT</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', background: '#FFF3E0', color: '#E65100', fontWeight: 600, fontSize: 13 }}>🏢 INSURANCE ADJUSTER</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', background: '#E8F5E9', color: '#2E7D32', fontWeight: 600, fontSize: 13 }}>✅ PUBLIC ADJUSTER (YOURS)</th>
                </tr>
              </thead>
              <tbody>
                {vsComparison.map((row, i) => (
                  <tr key={row.aspect} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8F9FA' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#1A2640', fontSize: 14 }}>{row.aspect}</td>
                    <td style={{ padding: '12px 16px', color: '#4A5568', fontSize: 14 }}>{row.insurance}</td>
                    <td style={{ padding: '12px 16px', color: '#1A2640', fontWeight: 600, fontSize: 14 }}>{row.public}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>When to Hire a Public Adjuster</h2>
        <div style={{ marginBottom: 48 }}>
          {whenToHire.map(w => (
            <div key={w.trigger} style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 16, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ minWidth: 220 }}><div style={{ color: '#0A1628', fontWeight: 700 }}>{w.trigger}</div><div style={{ marginTop: 6, fontWeight: 700, fontSize: 14 }}>{w.rec}</div></div>
              <div style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.7 }}>{w.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>💰 What Public Adjusters Cost in Texas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
            {[
              { label: 'Standard Fee Range', value: '10–15% of settlement', note: 'Most charge 12–13% in DFW' },
              { label: 'Minimum Claim Size', value: '$10,000–$15,000', note: 'Below this, most PAs won\’t take the case' },
              { label: 'Texas License Required', value: 'Yes — TDI regulated', note: 'Verify at tdi.texas.gov before signing' },
              { label: 'Average Recovery Increase', value: '25–55% higher settlement', note: 'Varies widely by claim type and complexity' },
            ].map(c => (
              <div key={c.label} style={{ background: '#F8F9FA', borderRadius: 12, padding: 20, borderTop: '3px solid #0A1628′ }}>
                <div style={{ color: '#4A5568', fontSize: 13, marginBottom: 6 }}>{c.label}</div>
                <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{c.value}</div>
                <div style={{ color: '#718096', fontSize: 12 }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>✅ How to Vet a Public Adjuster in DFW</h2>
          {vetChecklist.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < vetChecklist.length - 1 ? '1px solid #E2E8F0′ : ’none' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 50, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#1A2640', fontSize: 15, lineHeight: 1.6 }}>{item}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 36, marginBottom: 40, boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🧮 Public Adjuster Cost vs. Benefit Calculator</h2>
          <p style={{ color: '#4A5568', marginBottom: 28 }}>Estimate whether hiring a PA makes financial sense for your claim.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#4A5568', fontSize: 13, display: 'block', marginBottom: 8 }}>Current Claim Amount: ${claimAmount.toLocaleString()}</label>
              <input type="range" min={5000} max={500000} step={5000} value={claimAmount} onChange={e => setClaimAmount(Number(e.target.value))} style={{ width: '100%', accentColor: '#0A1628′ }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#718096', fontSize: 12, marginTop: 4 }}><span>$5K</span><span>$500K</span></div>
            </div>
            <div>
              <label style={{ color: '#4A5568', fontSize: 13, display: 'block', marginBottom: 8 }}>Claim Complexity</label>
              <select value={complexity} onChange={e => setComplexity(e.target.value)} style={{ width: '100%', background: '#F8F9FA', color: '#1A2640', border: '1px solid #CBD5E0', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="simple">Simple (one damage type, clear cause)</option>
                <option value="moderate">Moderate (multiple damage types or disputed)</option>
                <option value="complex">Complex (denied, total loss, or major dispute)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 24 }}>Calculate Net Benefit →</button>
          {result && (
            <div style={{ background: '#F8F9FA', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>PA Fee Estimate</div><div style={{ color: '#E53E3E', fontWeight: 800, fontSize: 16 }}>{result.paFee}</div></div>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Expected Settlement Increase</div><div style={{ color: '#38A169', fontWeight: 800, fontSize: 16 }}>{result.expectedIncrease}</div></div>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Your Net Benefit</div><div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20 }}>{result.netBenefit}</div></div>
              <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', borderRadius: 10, padding: 16 }}><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Recommendation</div><div style={{ color: '#1A2640', fontWeight: 700, fontSize: 16 }}>{result.verdict}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Need Contractors for Insurance Repairs?</h3>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>Whether you hire a PA or go direct, ProLnk connects you with licensed DFW contractors who specialize in insurance-related repair work.</p>
          <a href="/" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 15 }}>Find Licensed Contractors →</a>
        </div>
      </div>
    </div>
  );
}
