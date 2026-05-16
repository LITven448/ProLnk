import { useState } from 'react';

const situations = [
  { label: 'System still cooling but showing age', value: 'aging' },
  { label: 'Major component already replaced', value: 'replaced' },
  { label: 'Repairs becoming expensive', value: 'expensive' },
  { label: 'Planning to sell in next 3–5 years', value: 'selling' },
];

const plans: Record<string, { title: string; steps: string[]; timeline: string; insight: string }> = {
  aging: {
    title: '10-Year Watch Plan — Prepare for Replacement',
    steps: [
      'Schedule a compressor health test — the #1 failure at year 10–14 in DFW',
      'Inspect heat exchanger for cracks — safety issue, required before winter',
      'Verify refrigerant type: R-22 systems face supply shortage, plan to replace',
      'Get a written cost-to-replace estimate now — prices climb in summer',
      'Open a dedicated replacement fund: $500/mo for 12–18 months',
    ],
    timeline: 'Expect to replace within 3–5 years; budget and plan now',
    insight: 'A 10-year-old DFW system has run 3,000+ compressor hours in extreme heat. The compressor is the most expensive component — know its health.',
  },
  replaced: {
    title: 'Extended Life Plan — Maximize What You Have',
    steps: [
      'Treat the replaced component as the clock reset — track from replacement date',
      'Ensure remaining components match the replaced part's lifespan',
      'Mismatched system ages can cause efficiency loss — ask a tech to assess',
      'Keep full records: replaced part, brand, date, tech — for resale value',
      'Plan next 5 years of maintenance on the original components still in place',
    ],
    timeline: 'Potentially 5–8 more years depending on what was replaced',
    insight: 'Replacing just the compressor on a 10-year-old system is common in DFW. It extends life but doesn't reset all components — track the full picture.',
  },
  expensive: {
    title: 'Repair vs. Replace Decision Framework',
    steps: [
      'Apply the 50% rule: if repair > 50% of replacement cost, replace',
      'Get 3 replacement bids via ProLnk before authorizing any large repair',
      'Ask for a financing comparison: repair bill vs. monthly payment on new system',
      'Factor in utility savings: new 18–20 SEER vs. your aging 13–14 SEER',
      'Review Oncor rebates: up to $1,500 available for high-efficiency replacements',
    ],
    timeline: 'If repairs exceed $2,000 at year 10, replacement ROI is usually better',
    insight: 'In DFW, a new 18 SEER system saves $700–$1,400/year vs. a degraded 13 SEER. Factor that into every repair vs. replace calculation.',
  },
  selling: {
    title: 'Pre-Sale HVAC Strategy',
    steps: [
      'Get a pre-listing HVAC inspection — buyers will flag anything over 10 years',
      'If system is 10–12 years old, proactive replacement can increase offer price',
      'A new HVAC is a strong listing differentiator in DFW — markets it directly',
      'Budget $8,000–$15,000 for replacement; typical return is $12,000–$20,000 in offers',
      'Get a transferable warranty — major selling point in competitive DFW market',
    ],
    timeline: 'Replace 6–12 months before listing for maximum warranty transfer value',
    insight: 'DFW buyers inspect HVAC age first. A 10-year system often triggers renegotiation. A new system closes cleaner and faster.',
  },
};

export default function DFWHVACYear10Update() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = selected ? plans[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>DFW HVAC — 10-Year Update</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          Approaching Replacement Zone: Year Ten
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
          Ten years in DFW heat puts your HVAC in the watch zone. This is when proactive planning saves you from a $15,000 emergency decision in August.
        </p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>🏠 What's your 10-year situation?</div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => setSelected(s.value)}
                style={{ padding: '14px 18px', borderRadius: '8px', border: `2px solid ${selected === s.value ? '#F5E642' : '#1e3a5f'}`, backgroundColor: selected === s.value ? '#1a2f50' : 'transparent', color: selected === s.value ? '#F5E642' : '#cbd5e1', cursor: 'pointer', textAlign: 'left', fontSize: '15px', fontWeight: selected === s.value ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {plan && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>⚡ {plan.title}</div>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '16px' }}>
              {plan.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px', marginBottom: '12px', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 600, marginBottom: '4px' }}>⏱️ TIMELINE</div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>{plan.timeline}</div>
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '4px' }}>💡 DFW INSIGHT</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{plan.insight}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>🔗 Plan Your Replacement with ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            ProLnk matches DFW homeowners with verified HVAC pros for replacement quotes and diagnostics. Get 3 bids now before you're replacing in a summer emergency.
          </p>
        </div>
      </div>
    </div>
  );
}
