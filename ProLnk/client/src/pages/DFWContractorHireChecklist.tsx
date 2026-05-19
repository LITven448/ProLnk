import { useState } from 'react';

const STEPS = [
  {
    step: 1,
    emoji: '📋',
    title: 'Verify State License',
    why: 'Texas requires licensing for HVAC, plumbing, and electrical. Unlicensed work voids your homeowners insurance and is illegal.',
    tasks: [
      'Look up contractor on Texas Department of Licensing & Regulation (tdlr.texas.gov)',
      'Verify license is active and not expired',
      'Confirm license type matches the work requested',
    ],
  },
  {
    step: 2,
    emoji: '💰',
    title: 'Get 3 Written Quotes',
    why: 'DFW pricing varies wildly. Storm-related work spikes 200–300% — three quotes protect you from price gouging.',
    tasks: [
      'Contact at least 3 contractors for the same scope',
      'Request itemized quotes — not just a lump sum',
      'Compare material specs (brand, grade) in addition to price',
    ],
  },
  {
    step: 3,
    emoji: '⭐',
    title: 'Check Reviews & References',
    why: 'DFW has a high influx of storm chasers after hail events. Look for long-standing local businesses.',
    tasks: [
      'Check Google Reviews — look for 50+ reviews minimum',
      'Check BBB rating and any complaints filed',
      'Ask for 2–3 local references from similar projects in DFW',
      'Search address on Google Maps — verify a real office exists',
    ],
  },
  {
    step: 4,
    emoji: '🛡️',
    title: 'Verify Insurance',
    why: 'If a worker is injured on your property without proper insurance, you may be liable as the homeowner.',
    tasks: [
      'Request Certificate of Insurance (COI) before work begins',
      'Verify general liability coverage — minimum $1M per occurrence',
      'Confirm workers comp coverage for all employees on job',
      'Call the insurance company to verify policy is active',
    ],
  },
  {
    step: 5,
    emoji: '📝',
    title: 'Get a Written Contract',
    why: 'Verbal agreements are not enforceable in Texas for work over $500. A written contract is your only protection.',
    tasks: [
      'Require a contract before any work begins',
      'Confirm start and completion dates are in writing',
      'Include specific materials: brand, model, color, grade',
      'Add a change order clause — any scope additions must be signed',
    ],
  },
  {
    step: 6,
    emoji: '🔍',
    title: 'Review Scope of Work',
    why: 'Scope creep and misunderstood scope are the #1 source of disputes in DFW home contractor projects.',
    tasks: [
      'Read the scope line by line — no vague language like "as needed"',
      'Confirm what is NOT included in the scope',
      'Clarify who is responsible for permits and inspections',
      'Document any pre-existing conditions with photos before work starts',
    ],
  },
  {
    step: 7,
    emoji: '💳',
    title: 'Negotiate Payment Schedule',
    why: 'Paying 100% upfront is one of the most common contractor scams in DFW, especially after storms.',
    tasks: [
      'Never pay more than 10–25% upfront',
      'Tie payments to project milestones (demo complete, rough-in, final)',
      'Withhold 10% until final walkthrough and punch list is complete',
      'Pay by credit card or check — never cash',
    ],
  },
  {
    step: 8,
    emoji: '📜',
    title: 'Plan for Lien Waiver',
    why: 'In Texas, subcontractors can place a lien on your home even if you paid the general contractor in full.',
    tasks: [
      'Request a conditional lien waiver at each payment milestone',
      'Get an unconditional lien waiver upon final payment',
      'Ask if subs are being used — get waivers from them too',
    ],
  },
  {
    step: 9,
    emoji: '🏆',
    title: 'Understand Warranty Terms',
    why: 'DFW heat and clay soil stress materials faster than most climates — warranty terms matter here.',
    tasks: [
      'Get workmanship warranty in writing (1 year minimum)',
      'Confirm product/manufacturer warranty is transferred to you',
      'Clarify warranty claim process — who do you call?',
      'Ask if warranty is void if someone else works on the system later',
    ],
  },
];

export default function DFWContractorHireChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const allTasks = STEPS.flatMap((s) => s.tasks.map((t) => `${s.step}::${t}`));
  const totalTasks = allTasks.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalTasks) * 100);
  const stepsComplete = STEPS.filter((s) => s.tasks.every((t) => checked[`${s.step}::${t}`])).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🔨</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Contractor Hiring Checklist
          </h1>
          <p style={{ color: '#8899aa', fontSize: 14, margin: 0 }}>
            Protect yourself when hiring in the DFW market
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>{stepsComplete} / {STEPS.length} Steps Complete</span>
            <span style={{ color: '#8899aa', fontSize: 13 }}>{pct}% overall</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 99, height: 10 }}>
            <div style={{ background: '#F5E642', borderRadius: 99, height: 10, width: `${pct}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {STEPS.map((step) => {
          const stepDone = step.tasks.every((t) => checked[`${step.step}::${t}`]);
          const stepCount = step.tasks.filter((t) => checked[`${step.step}::${t}`]).length;
          return (
            <div key={step.step} style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: `4px solid ${stepDone ? '#F5E642' : '#1a3050'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: stepDone ? '#F5E642′ : '#cdd9e5' }}>
                  {step.emoji} Step {step.step}: {step.title}
                </h2>
                <span style={{ fontSize: 11, color: stepDone ? '#F5E642′ : '#8899aa', flexShrink: 0, marginLeft: 8 }}>
                  {stepDone ? '✓ Done' : `${stepCount}/${step.tasks.length}`}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#8899aa', margin: '0 0 12px', lineHeight: 1.5 }}>
                💡 {step.why}
              </p>
              {step.tasks.map((task) => {
                const key = `${step.step}::${task}`;
                return (
                  <div
                    key={task}
                    onClick={() => toggle(key)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '9px 0', borderBottom: '1px solid #1a3050', cursor: 'pointer' }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked[key] ? '#F5E642' : '#334466'}`,
                      background: checked[key] ? '#F5E642′ : ’transparent', flexShrink: 0, marginTop: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#0A1628', fontWeight: 900,
                    }}>
                      {checked[key] ? '✓' : ''}
                    </div>
                    <span style={{ fontSize: 14, color: checked[key] ? '#556677′ : '#cdd9e5', textDecoration: checked[key] ? ’line-through' : 'none', lineHeight: 1.5 }}>
                      {task}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}

        {stepsComplete === STEPS.length && (
          <div style={{ background: '#0f3d2e', borderRadius: 12, padding: 20, textAlign: 'center', border: '2px solid #34d399′ }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <p style={{ color: '#34d399', fontWeight: 800, fontSize: 16, margin: 0 }}>
              You are fully protected. Safe to proceed with this contractor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
