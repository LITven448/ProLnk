import { useState } from 'react';

export default function DFWContractorRedFlagsGuide2026() {
  const [behavior, setBehavior] = useState('');
  const [score, setScore] = useState<string | null>(null);

  const redFlags = [
    { icon: '🚪', flag: 'Door-to-Door After Storm', detail: '90%+ of post-storm door knockers are unlicensed out-of-state storm chasers. They vanish after taking your deposit.', weight: 4 },
    { icon: '💵', flag: 'Cash Only Payment', detail: 'Legitimate contractors accept checks and cards. Cash-only means no paper trail and no recourse if work fails.', weight: 3 },
    { icon: '📄', flag: 'No Written Contract', detail: 'Any pro who resists a written scope of work is protecting themselves, not you. Never proceed without a signed contract.', weight: 3 },
    { icon: '💰', flag: 'Full Payment Upfront', detail: 'Standard is 30% down, 40% at milestone, 30% on completion. Demanding 100% upfront is the #1 scam signal in DFW.', weight: 4 },
    { icon: '📋', flag: 'No License (Especially Roofing)', detail: 'Texas requires licensing for electricians, plumbers, HVAC, and AC. Roofing is unregulated — making verification critical.', weight: 3 },
  ];

  const behaviorMap: Record<string, { risk: string; color: string; advice: string }> = {
    doorknock: { risk: '🔴 VERY HIGH — 90% scam probability', color: '#ef4444', advice: 'Do not engage. Get a referral from ProLnk or a neighbor instead.' },
    cashonly: { risk: '🟠 HIGH — Major scam signal', color: '#f97316', advice: 'Refuse. Any legitimate contractor accepts payment methods with paper trails.' },
    nocontract: { risk: '🟠 HIGH — Legal exposure for you', color: '#f97316', advice: 'Stop work immediately. Require a signed scope of work before any labor begins.' },
    fullupfront: { risk: '🔴 VERY HIGH — Financial risk', color: '#ef4444', advice: 'Never pay more than 30% upfront. Offer the standard milestone payment structure.' },
    nolicense: { risk: '🟡 MEDIUM-HIGH — Verify immediately', color: '#F5E642', advice: 'Check TDLR.texas.gov for license verification. Unlicensed work voids your homeowner insurance.' },
    prolnk: { risk: '✅ LOW — ProLnk vetted pro', color: '#22c55e', advice: 'ProLnk verifies license, insurance, and reviews before any pro appears in your feed. You are protected.' },
  };

  const handleCheck = () => {
    if (behavior && behaviorMap[behavior]) setScore(JSON.stringify(behaviorMap[behavior]));
  };

  const parsed = score ? JSON.parse(score) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🚩</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Contractor Red Flags Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How to spot a scam contractor before you get burned</p>
        </div>

        <div style={{ display: 'grid', gap: 14, marginBottom: 40 }}>
          {redFlags.map((f) => (
            <div key={f.flag} style={{ background: '#111e35', borderRadius: 12, padding: 18, borderLeft: '4px solid #ef4444', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.flag}</div>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0 }}>{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Scam Likelihood Checker</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>What behavior did this contractor show?</p>
          <select value={behavior} onChange={(e) => setBehavior(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 14 }}>
            <option value="">Select contractor behavior...</option>
            <option value="doorknock">Knocked on my door after a storm</option>
            <option value="cashonly">Wants cash only payment</option>
            <option value="nocontract">Refused to give written contract</option>
            <option value="fullupfront">Wants full payment before starting</option>
            <option value="nolicense">Could not show license when asked</option>
            <option value="prolnk">Found them through ProLnk</option>
          </select>
          <button onClick={handleCheck}
            style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            Check Risk
          </button>
          {parsed && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${parsed.color}` }}>
              <div style={{ fontWeight: 700, color: parsed.color, marginBottom: 8 }}>{parsed.risk}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{parsed.advice}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Every pro is license-verified, insured, and reviewed before activation
        </div>
      </div>
    </div>
  );
}
