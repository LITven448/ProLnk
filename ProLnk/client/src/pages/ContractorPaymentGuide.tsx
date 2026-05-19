import { useState } from 'react';

export default function ContractorPaymentGuide() {
  const [projectCost, setProjectCost] = useState('');
  const [schedule, setSchedule] = useState<{ label: string; amount: number; pct: number; note: string }[]>([]);

  const generateSchedule = () => {
    const cost = parseFloat(projectCost.replace(/[^0-9.]/g, ''));
    if (!cost || cost < 100) return;

    if (cost < 5000) {
      setSchedule([
        { label: 'Deposit (at signing)', pct: 10, amount: cost * 0.1, note: 'Never more than 10% upfront. Covers mobilization only.' },
        { label: 'Materials delivered on-site', pct: 40, amount: cost * 0.4, note: 'Verify materials are actually present before paying.' },
        { label: 'Work 50% complete', pct: 40, amount: cost * 0.4, note: 'Walk through with contractor to confirm progress milestone.' },
        { label: 'Final — after inspection & punchlist', pct: 10, amount: cost * 0.1, note: '10% holdback is your leverage for a clean finish.' },
      ]);
    } else if (cost < 25000) {
      setSchedule([
        { label: 'Deposit (at signing)', pct: 10, amount: cost * 0.1, note: 'Never more than 10% upfront. Covers mobilization only.' },
        { label: 'Project kickoff / demo complete', pct: 25, amount: cost * 0.25, note: 'Confirm demo is complete and site is prepped.' },
        { label: 'Rough-in complete (framing / MEP)', pct: 25, amount: cost * 0.25, note: 'Verify rough-in inspection has passed.' },
        { label: 'Substantial completion (90% done)', pct: 30, amount: cost * 0.3, note: 'Walkthrough and punchlist created at this stage.' },
        { label: 'Final — after punchlist cleared', pct: 10, amount: cost * 0.1, note: '10% holdback released only after all items resolved.' },
      ]);
    } else {
      setSchedule([
        { label: 'Deposit (at signing)', pct: 10, amount: cost * 0.1, note: 'For large projects, even 10% is significant — hold firm.' },
        { label: 'Foundation / demo milestone', pct: 15, amount: cost * 0.15, note: 'Tied to a verifiable milestone, not a date.' },
        { label: 'Framing / structural complete', pct: 20, amount: cost * 0.2, note: 'Confirm inspection passed before releasing.' },
        { label: 'MEP rough-in complete', pct: 20, amount: cost * 0.2, note: 'Plumbing, electrical, HVAC rough-in all done.' },
        { label: 'Drywall / insulation complete', pct: 15, amount: cost * 0.15, note: 'Verify before covering walls.' },
        { label: 'Substantial completion (90%)', pct: 10, amount: cost * 0.1, note: 'Punchlist created here. Do not skip this step.' },
        { label: 'Final — punchlist cleared & CO received', pct: 10, amount: cost * 0.1, note: '10% holdback only released after certificate of occupancy.' },
      ]);
    }
  };

  const fmt = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '0 0 60px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            💰 ProLnk Homeowner Guide
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Contractor Payment Guide: How to Pay Without Getting Burned
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.7 }}>
            How you pay a contractor is just as important as who you hire. The wrong payment structure gives them no reason to finish the job.
          </p>
        </div>

        <section style={{ marginBottom: 40, backgroundColor: '#1a0a0a', borderRadius: 12, padding: '24px', border: '1px solid #5a1a1a' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f87171', marginBottom: 12 }}>🚨 The #1 Rule: Never Pay 100% Upfront</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8 }}>
            Full upfront payment removes every incentive to finish. A contractor with your money and no holdback will always find reasons to delay, cut corners, or ghost you. This applies even for small jobs — if a contractor demands full payment before starting, walk away.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📅 Standard Payment Structures</h2>
          {[
            {
              type: 'Small jobs under $5K',
              structure: '10% deposit → 40% at material delivery → 40% at 50% complete → 10% final',
            },
            {
              type: 'Mid-size $5K–$25K',
              structure: '10% deposit → 25% at kickoff → 25% at rough-in → 30% at substantial completion → 10% final holdback',
            },
            {
              type: 'Large projects $25K+',
              structure: '10% deposit → milestone-based draws at 5–7 stages → 10% final holdback after CO',
            },
          ].map((item) => (
            <div key={item.type} style={{ backgroundColor: '#132040', borderRadius: 10, padding: '20px 24px', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{item.type}</div>
              <div style={{ color: '#CBD5E1', fontSize: 15 }}>{item.structure}</div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚡ Payments Trigger Milestones, Not Dates</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 16 }}>
            Never tie payments to calendar dates. A contractor who falls behind schedule should not receive their next payment just because a date passed. Every payment should be unlocked by a verifiable milestone — something you can physically inspect.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ backgroundColor: '#0a1f0a', borderRadius: 10, padding: '16px', border: '1px solid #1a4a1a' }}>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 8 }}>✅ Milestone-based (correct)</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
                "Payment 3 released when framing is complete and passes city inspection."
              </div>
            </div>
            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 10, padding: '16px', border: '1px solid #4a1a1a' }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 8 }}>❌ Date-based (wrong)</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
                "Payment 3 released on June 15th regardless of progress."
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📜 Lien Waivers — Protect Your Property</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 16 }}>
            In Texas, a contractor's unpaid subs and suppliers can file a lien against your property — even if you paid the GC in full. Protect yourself with lien waivers.
          </p>
          {[
            ['Conditional lien waiver', 'Get this before each payment. It waives their lien rights contingent on your payment clearing.'],
            ['Unconditional lien waiver', 'Get this after each payment clears. This is the final, binding release of lien rights for that draw.'],
            ['Final lien release', 'Get from the GC AND all major subs at project completion before releasing your final holdback.'],
          ].map(([term, desc]) => (
            <div key={term as string} style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 180, fontSize: 14 }}>{term}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.7, fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>💳 When to Use a Credit Card</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, marginBottom: 16 }}>
            For deposits and smaller jobs, a credit card adds a layer of chargeback protection that a check or bank transfer doesn't. Many contractors add a 2–3% processing fee — often worth paying for the protection.
          </p>
          <div style={{ backgroundColor: '#132040', borderRadius: 10, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
            <strong style={{ color: '#F5E642' }}>Use credit cards when:</strong>
            <ul style={{ color: '#CBD5E1', marginTop: 8, paddingLeft: 20, lineHeight: 2 }}>
              <li>Paying deposits on new or unproven contractors</li>
              <li>Work is under $5K and you want chargeback rights</li>
              <li>The contractor's business address doesn't match their license</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🚩 Payment Red Flags</h2>
          {[
            ['Cash only — no invoice', 'They\’re avoiding taxes and there\’s no paper trail. No paper trail = no recourse.'],
            ['Large upfront deposit (>30%)', 'Standard is 10%. Anything above 20% is a red flag. 50%+ upfront is a scam pattern.'],
            ['Wire transfer required', 'Wires are irreversible. A contractor demanding wire transfer for a residential job is unusual and risky.'],
            ['No contract, just verbal agreement', 'Verbal contracts are nearly unenforceable. Get everything in writing, always.'],
          ].map(([flag, detail]) => (
            <div key={flag as string} style={{ backgroundColor: '#1a0a0a', borderRadius: 10, padding: '16px 20px', marginBottom: 10, border: '1px solid #3a1515' }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>⚠️ {flag}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </section>

        <section style={{ backgroundColor: '#0D2240', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🧮 Payment Schedule Calculator</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Enter your total project cost to get a recommended milestone-based payment schedule.</p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={projectCost}
              onChange={e => setProjectCost(e.target.value)}
              placeholder="e.g. 18000"
              style={{
                flex: 1, minWidth: 200, backgroundColor: '#081525', border: '2px solid #1E3A5F',
                borderRadius: 8, color: '#FFFFFF', padding: '14px 18px', fontSize: 16, outline: 'none',
              }}
            />
            <button
              onClick={generateSchedule}
              style={{
                backgroundColor: '#F5E642', color: '#0A1628', border: 'none',
                borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
              }}
            >
              Generate Schedule →
            </button>
          </div>

          {schedule.length > 0 && (
            <div>
              {schedule.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#081525', borderRadius: 10, padding: '16px 20px', marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 700 }}>Payment {i + 1}: {item.label}</div>
                    <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{fmt(item.amount)} <span style={{ fontSize: 13, color: '#94A3B8' }}>({item.pct}%)</span></div>
                  </div>
                  <div style={{ color: '#64748B', fontSize: 13 }}>💡 {item.note}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: '14px 18px', backgroundColor: '#132040', borderRadius: 8, color: '#94A3B8', fontSize: 13 }}>
                🔒 <strong style={{ color: '#F5E642' }}>Remember:</strong> Build the holdback into the contract. Never release the final 10% until the punchlist is fully cleared and you have all lien releases in hand.
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
