import { useState } from 'react';

const claimsSteps = [
  { day: 'Day 0 (Loss Event)', icon: '📸', title: 'Document Everything', detail: 'Before touching anything or starting any cleanup, photograph and video EVERY area of damage. Capture wide shots and close-ups. This evidence is your strongest negotiating tool — insurers cannot dispute what’s documented before any work begins.' },
  { day: 'Day 0–1', icon: '📞', title: 'Call Your Insurer', detail: 'Most policies require "timely" reporting — within 24–48 hours. Call your insurer’s claims line (not your agent), state the date and type of loss, and get a claim number in writing. Ask what documentation they need.' },
  { day: 'Day 1–3', icon: '🛠️', title: 'Temporary Emergency Repairs Only', detail: 'Your policy requires you to prevent further damage. Tarp a damaged roof. Board up broken windows. Keep ALL receipts for any temporary repair materials — these are reimbursable. Do NOT start permanent repairs until the adjuster visits.' },
  { day: 'Day 3–14', icon: '🏠', title: 'Adjuster Visit', detail: 'The insurer’s adjuster will visit (usually within 3–14 days of filing). Be present. Walk them through every piece of damage. Point out everything, including items they might miss. Take your own photos alongside theirs. Don’t sign anything at the visit.' },
  { day: 'Day 5–21', icon: '📋', title: 'Get 2–3 Contractor Estimates', detail: 'Before accepting ANY settlement offer, get 2–3 written estimates from licensed, insured DFW contractors. Insurance adjusters often undervalue labor costs. Having competitive estimates gives you negotiation leverage and documents true market cost.' },
  { day: 'Day 14–30', icon: '💵', title: 'Negotiate the Settlement', detail: 'If the settlement offer is lower than your contractor estimates, push back. Provide your contractor estimates in writing. If the gap is significant (over $2,000), consider hiring a public adjuster — they typically recover 10–50% more than the initial offer, and their fee is 10–15% of the settlement.' },
  { day: 'Day 30+', icon: '✅', title: 'Complete Repairs with Licensed Contractor', detail: 'Once you accept the settlement, complete repairs with a licensed, insured, permit-pulling contractor. Never pay the full amount upfront — standard is 30% deposit, balance on completion. Keep all final invoices and warranties for your home health record.' },
];

const txiRights = [
  { right: '15 calendar days', desc: 'Insurer must acknowledge receipt of your claim' },
  { right: '15 business days', desc: 'Must approve or deny after receiving all required information' },
  { right: '5 business days', desc: 'Must send payment after accepting your claim' },
  { right: 'Right to dispute', desc: 'You can hire a public adjuster or file a TDI complaint if your claim is handled improperly' },
];

export default function DFWHomeInsuranceClaimsGuide() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const toggleCheck = (i: number) => {
    setCheckedSteps(prev => prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i]);
  };

  return (
    <div style={{ background: '#0f0f13', color: '#f0ede8', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ background: '#1c1a28', borderRadius: 12, padding: '12px 20px', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span>🛡️</span>
          <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: 14 }}>DFW Homeowner Protection Series</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          DFW Home Insurance Claims Guide
          <span style={{ display: 'block', color: '#a78bfa' }}>Get Every Dollar You're Owed</span>
        </h1>

        <p style={{ color: '#9ca3af', fontSize: 18, lineHeight: 1.7, marginBottom: 50 }}>
          DFW has more insurance claims per capita than almost any US metro — hail, tornadoes, and flooding create a constant stream. Insurers know this market deeply and have optimized their processes for speed and cost control. You need to know how to navigate this to protect your payout.
        </p>

        {/* Why DFW is Different */}
        <div style={{ background: '#1c1a28', border: '1px solid #f8717133', borderRadius: 12, padding: 28, marginBottom: 50 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f87171', marginBottom: 16 }}>⚠️ Why DFW Claims Are Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { stat: '#1 in Hail', desc: 'DFW leads the US in annual hail damage claims' },
              { stat: 'Tornado Alley', desc: 'Active tornado season from March–June every year' },
              { stat: 'Flash Flooding', desc: 'Urban flooding from I-30 to the Trinity corridor' },
              { stat: 'Uri Legacy', desc: '246 deaths, $20B+ in insured losses from 2021 storm' },
            ].map(s => (
              <div key={s.stat} style={{ background: '#0f0f13', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#f87171', marginBottom: 4 }}>{s.stat}</div>
                <div style={{ color: '#9ca3af', fontSize: 13 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Step-by-Step */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>📋 Step-by-Step Claims Checklist</h2>
        <p style={{ color: '#9ca3af', marginBottom: 28 }}>Click each step to expand details. Check off steps as you complete them.</p>
        <div style={{ display: 'grid', gap: 12, marginBottom: 50 }}>
          {claimsSteps.map((step, i) => {
            const done = checkedSteps.includes(i);
            const open = activeStep === i;
            return (
              <div key={i} style={{ background: done ? '#14532d22' : '#1c1a28', border: '1px solid ' + (done ? '#34d39944' : '#2e2b3d'), borderRadius: 12, overflow: 'hidden', transition: 'all 0.15s' }}>
                <div style={{ padding: '18px 24px', display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveStep(open ? null : i)}>
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={(e) => { e.stopPropagation(); toggleCheck(i); }}
                    style={{ width: 18, height: 18, accentColor: '#34d399', flexShrink: 0 }}
                  />
                  <div style={{ flexShrink: 0, background: done ? '#34d39922' : '#a78bfa22', color: done ? '#34d399' : '#a78bfa', fontWeight: 700, fontSize: 11, padding: '4px 8px', borderRadius: 6 }}>{step.day}</div>
                  <span style={{ fontSize: 20 }}>{step.icon}</span>
                  <span style={{ fontWeight: 700, flex: 1, color: done ? '#34d399' : '#f0ede8' }}>{step.title}</span>
                  <span style={{ color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
                </div>
                {open && (
                  <div style={{ padding: '0 24px 20px', color: '#d1d5db', lineHeight: 1.7, borderTop: '1px solid #2e2b3d', paddingTop: 16 }}>
                    {step.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {checkedSteps.length > 0 && (
          <div style={{ background: '#1c1a28', borderRadius: 10, padding: 16, textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: '#34d399', fontWeight: 700 }}>✅ {checkedSteps.length} of {claimsSteps.length} steps complete</span>
            {checkedSteps.length === claimsSteps.length && <div style={{ color: '#a78bfa', marginTop: 4 }}>You've completed the full claims process!</div>}
          </div>
        )}

        {/* Texas Department of Insurance Rights */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>⚖️ Your Texas Legal Rights (TDI)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 50 }}>
          {txiRights.map(r => (
            <div key={r.right} style={{ background: '#1c1a28', border: '1px solid #a78bfa33', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#a78bfa', marginBottom: 6 }}>{r.right}</div>
              <div style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        {/* Public Adjuster Info */}
        <div style={{ background: '#1c1a28', border: '1px solid #fbbf2444', borderRadius: 12, padding: 28, marginBottom: 50 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fbbf24', marginBottom: 12 }}>💼 When to Hire a Public Adjuster</h3>
          <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: 16 }}>
            If your insurer's settlement offer seems lower than your contractor estimates — which is common for DFW hail claims — consider hiring a licensed public adjuster. They work for <em>you</em>, not the insurer.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0f0f13', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#34d399', fontWeight: 600, marginBottom: 8 }}>✅ Worth it when:</div>
              <div style={{ color: '#9ca3af', fontSize: 14 }}>• Claim exceeds $10,000<br />• Insurer offer is 30%+ below estimates<br />• Insurer denies legitimate damage<br />• Complex multi-system losses</div>
            </div>
            <div style={{ background: '#0f0f13', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: 8 }}>📊 What to expect:</div>
              <div style={{ color: '#9ca3af', fontSize: 14 }}>• Cost: 10–15% of settlement<br />• Average recovery increase: 10–50% more<br />• They handle all adjuster negotiations<br />• Licensed by Texas Department of Insurance</div>
            </div>
          </div>
        </div>

        {/* TrustyPro Advantage */}
        <div style={{ background: 'linear-gradient(135deg, #1c1a28, #2e2b3d)', border: '1px solid #a78bfa44', borderRadius: 16, padding: 32, marginBottom: 50 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🤖</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>The TrustyPro Advantage in Claims</h3>
          <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>
            TrustyPro's AI scans document the <strong>pre-storm condition of your home</strong> with timestamped visual evidence. When a hail storm or tornado hits, you can demonstrate exactly what existed before versus what was damaged — making your insurance claim significantly stronger and harder to dispute. This is one of the most practical reasons to have a TrustyPro home health record before disaster strikes.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: '#1c1a28', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Find a Trusted DFW Contractor for Your Repair</h3>
          <p style={{ color: '#9ca3af', marginBottom: 28 }}>Get matched with licensed, insured, permit-pulling contractors who specialize in insurance restoration work.</p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#a78bfa', color: '#fff', fontWeight: 700, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
            Get Contractor Matches →
          </a>
        </div>
      </div>
    </div>
  );
}
