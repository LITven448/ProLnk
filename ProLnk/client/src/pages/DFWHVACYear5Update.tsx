import { useState } from 'react';

const situations = [
  { label: 'System running fine, no major issues', value: 'fine' },
  { label: 'Repairs becoming more frequent', value: 'repairs' },
  { label: 'Energy bills rising year over year', value: 'bills' },
  { label: 'Uneven cooling or comfort complaints', value: 'comfort' },
];

const plans: Record<string, { title: string; steps: string[]; budget: string; insight: string }> = {
  fine: {
    title: '5-Year Midlife Maintenance Plan',
    steps: [
      'Schedule a full system diagnostic — not just a tune-up',
      'Inspect blower motor bearings and capacitors — 5-year wear items',
      'Have refrigerant charge verified — slow leaks compound over time',
      'Clean evaporator coil if not done in last 2 years — DFW dust packs it',
      'Inspect and seal ductwork — DFW settling shifts joints over 5 years',
    ],
    budget: '$400–$800 for 5-year inspection and preventive parts',
    insight: 'Five years in DFW heat puts real wear on capacitors and contactors. Replacing them proactively costs $150 vs. $300+ emergency call.',
  },
  repairs: {
    title: 'Repair Escalation — Assessment Required',
    steps: [
      'Get an independent assessment from a non-selling tech',
      'Ask for remaining lifespan estimate on compressor and coils',
      'Calculate cumulative repair costs — if >30% of replacement, plan now',
      'Start a replacement savings fund: $6,000–$12,000 range in DFW',
      'Use ProLnk to get 3 quotes now before you're in emergency mode',
    ],
    budget: 'Budget $8,000–$14,000 for likely replacement in years 6–8',
    insight: 'Frequent repairs at year 5 mean the system is entering decline. DFW heat accelerates that. Plan the replacement, don't react to it.',
  },
  bills: {
    title: 'Efficiency Decline Audit',
    steps: [
      'Pull 5 years of Oncor bills and map the trend',
      'Have a tech measure actual SEER performance — most decline 15–20% by year 5',
      'Inspect attic insulation — R-38 minimum for DFW; most homes are under',
      'Check duct leakage with a blower door test',
      'Model the ROI on a new 18–20 SEER system vs. current utility costs',
    ],
    budget: 'A new system may pay back in 4–6 years via utility savings',
    insight: 'In DFW, a 5-year-old 14 SEER system vs. a new 18 SEER can mean $700–$1,200/year difference in cooling costs alone.',
  },
  comfort: {
    title: 'Comfort & Sizing Investigation',
    steps: [
      'Have a Manual J load calculation done — confirm system is properly sized',
      'Check zoning: multi-story DFW homes often need zone dampers by year 5',
      'Inspect duct sizing — undersized ducts cause hot spots and short cycling',
      'Evaluate adding a supplemental mini-split for problem rooms',
      'Check thermostat calibration and placement — sun exposure matters',
    ],
    budget: '$500–$2,500 for zoning or duct corrections; $3,000–$5,000 for mini-split',
    insight: 'Uneven cooling at year 5 usually means the original design is wrong. DFW west-facing rooms need more BTUs — most systems are undersized there.',
  },
};

export default function DFWHVACYear5Update() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = selected ? plans[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>DFW HVAC — 5-Year Update</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          Midlife Assessment: Your HVAC at Year Five
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
          Five DFW summers have tested your system. This is the midpoint — where you decide to extend, invest, or prepare to replace. Get ahead of it now.
        </p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>🏠 What's your 5-year situation?</div>
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
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px', marginBottom: '12px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '4px' }}>💰 BUDGET GUIDE</div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>{plan.budget}</div>
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px', borderLeft: '4px solid #22c55e' }}>
              <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600, marginBottom: '4px' }}>💡 DFW INSIGHT</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{plan.insight}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>🔗 Get Competitive HVAC Bids via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            ProLnk matches DFW homeowners with verified HVAC pros for diagnostics, repairs, and replacements. Compare real quotes from multiple pros before you commit.
          </p>
        </div>
      </div>
    </div>
  );
}
