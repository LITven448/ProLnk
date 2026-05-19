import { useState } from 'react';

const situations = [
  { label: 'System ran fine all year', value: 'fine' },
  { label: 'Had one repair needed', value: 'repair' },
  { label: 'Multiple service calls', value: 'multiple' },
  { label: 'High energy bills noticed', value: 'bills' },
];

const plans: Record<string, { title: string; steps: string[]; insight: string }> = {
  fine: {
    title: 'Year Two Maintenance Plan',
    steps: [
      'Schedule spring tune-up before April heat arrives',
      'Replace filter every 60 days — DFW dust is heavy year-round',
      'Clean outdoor condenser coils before summer peak',
      'Check refrigerant levels — slow leaks show up in year two',
      'Inspect ductwork joints for any separation from settling',
    ],
    insight: 'A clean year one means your system is well-matched to your home. Year two is about sustaining that performance through DFW summers.',
  },
  repair: {
    title: 'Repair Follow-Up + Year Two Plan',
    steps: [
      'Document what failed and why — patterns matter in DFW heat',
      'Ask your tech if the repair signals a larger component issue',
      'Increase filter changes to every 45 days after a repair',
      'Schedule a full diagnostic before next cooling season',
      'Budget $300–$600 for year two preventive work',
    ],
    insight: 'One repair in year one is normal. But in DFW, ignored patterns become mid-summer emergencies. Track everything.',
  },
  multiple: {
    title: 'System Health Assessment Needed',
    steps: [
      'Get a full diagnostic from an independent HVAC tech',
      'Request a written report on component condition and lifespan',
      'Compare repair costs to replacement cost — DFW rule: >50% = replace',
      'Check if your system is properly sized for your home square footage',
      'Consider ProLnk to get 3 competitive bids on replacement options',
    ],
    insight: 'Multiple calls in year one signals a sizing or installation issue. In DFW heat, an undersized system fails fast.',
  },
  bills: {
    title: 'Efficiency Investigation Plan',
    steps: [
      'Pull last 12 months of Oncor usage data for baseline',
      'Have a tech check refrigerant charge and coil cleanliness',
      'Inspect attic insulation — DFW attics hit 160°F in summer',
      'Check duct leakage — 25–30% of cooling is lost in leaky ducts',
      'Request SEER rating report on your current system',
    ],
    insight: 'High bills after year one in DFW usually mean duct issues or an undersized unit running overtime. Fix ducts first — cheapest gain.',
  },
};

export default function DFWHVACYearOneUpdate() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = selected ? plans[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>DFW HVAC — Year One Update</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          What You've Learned After Year One
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
          Your first DFW summer is behind you. Now it's time to assess what your HVAC system told you — and plan year two before the heat comes back.
        </p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>🏠 What was your year one situation?</div>
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
            <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
              {plan.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '16px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '6px' }}>💡 DFW INSIGHT</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{plan.insight}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>🔗 Get Year Two HVAC Help via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            ProLnk connects DFW homeowners with verified HVAC pros — tune-ups, diagnostics, and replacements. No guessing on pricing, no cold calls. Just matched quotes from pros who work your area.
          </p>
        </div>
      </div>
    </div>
  );
}
