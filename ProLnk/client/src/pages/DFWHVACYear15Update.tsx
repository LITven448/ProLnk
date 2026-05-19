import { useState } from 'react';

const situations = [
  { label: 'System still limping along', value: 'limping' },
  { label: 'Already had a major failure this year', value: 'failure' },
  { label: 'Replacement quotes in hand, deciding', value: 'deciding' },
  { label: 'Landlord or rental property situation', value: 'rental' },
];

const plans: Record<string, { urgency: string; title: string; steps: string[]; warning: string; insight: string }> = {
  limping: {
    urgency: 'HIGH',
    title: 'Managed Decline Plan — Replace Before Peak Season',
    steps: [
      'Do NOT spend more than $500 on repairs — replacement is the answer now',
      'Schedule replacement quotes immediately — lead times stretch 3–6 weeks in summer',
      'Target April or September installs — prices drop 10–20% off-peak',
      'Ask about 0% financing through manufacturers — Carrier, Trane, Lennox all offer it',
      'Store system records in ProLnk Home Health Vault — warranty transfer ready',
    ],
    warning: 'A 15-year DFW system failing in July is a $12,000–$18,000 emergency decision made in 95°F heat with no leverage. Replace on your schedule, not the system’s.',
    insight: 'DFW compressors fail at 15–17 years as electrolytic capacitors degrade. The failure is sudden, total, and happens during peak demand when installers are booked out.',
  },
  failure: {
    urgency: 'CRITICAL',
    title: 'Post-Failure Replacement Plan',
    steps: [
      'Get 3 quotes within 24 hours — ProLnk can match you fast',
      'Avoid accepting the first quote from whoever shows up — markup is 30–40% in emergencies',
      'Confirm the replacement is a full system — don’t mix a new condenser with a 15-year air handler',
      'Demand a Manual J calculation to verify proper sizing for your home',
      'Verify installer pulls a permit — required in DFW; protects your warranty and resale',
    ],
    warning: 'Mismatched system components cut efficiency by 20–30% and void most manufacturer warranties. Insist on a full system replacement.',
    insight: 'Post-failure is the most expensive time to buy. If you can get 1–2 nights of a hotel or family stay, you gain negotiating leverage. Every hour of urgency costs you money.',
  },
  deciding: {
    urgency: 'MEDIUM',
    title: 'Replacement Decision Checklist',
    steps: [
      'Compare SEER ratings: 18+ SEER saves $700–$1,400/year in DFW vs. minimum 14 SEER',
      'Verify brand: Carrier, Trane, Lennox have strongest DFW dealer networks for warranty service',
      'Confirm 10-year parts + labor warranty — avoid systems with only 5-year parts',
      'Ask if quote includes coil replacement — often excluded from condenser quotes',
      'Check Oncor rebate eligibility: up to $1,500 for qualifying high-efficiency systems',
    ],
    warning: 'The cheapest replacement quote often excludes the air handler coil. That’s a $1,500–$3,000 add-on after installation. Read the line items.',
    insight: 'At 15 years, DFW homeowners upgrading from 13–14 SEER to 18–20 SEER typically break even in 4–6 years on energy savings alone. It’s not just a replacement — it’s an investment.',
  },
  rental: {
    urgency: 'HIGH',
    title: 'Landlord Replacement Strategy',
    steps: [
      'Texas law: landlords must maintain functional HVAC — failure triggers rent withholding rights',
      'A 15-year system is a liability in a rental — document replacement for tax depreciation',
      'Replace with minimum 16 SEER for tenant retention and lower service call volume',
      'Add a connected thermostat for remote monitoring — prevents $8,000 pipe freezes',
      'Use ProLnk to get 3 competitive bids and store records in Home Health Vault for each property',
    ],
    warning: 'A tenant without AC in DFW summer has legal remedies. At 15 years, you are one failure away from a habitability complaint and emergency install costs.',
    insight: 'Proactive replacement at 15 years in a rental pays back in avoided emergency calls, tenant retention, and the tax depreciation writeoff over 27.5 years (MACRS).',
  },
};

export default function DFWHVACYear15Update() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = selected ? plans[selected] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#ef4444', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>⚠️ DFW HVAC — 15-Year Update</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          Replacement Is Overdue or Imminent: Year Fifteen
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
          Fifteen DFW summers means your system has lived a full life. The question isn't if you'll replace — it's whether you do it on your terms or on a 95°F July afternoon.
        </p>

        <div style={{ backgroundColor: '#1a1530', border: '2px solid #ef4444', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>⚠️ DFW REALITY CHECK</div>
          <p style={{ color: '#fca5a5', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
            The average DFW HVAC system lasts 12–15 years under heavy use. At year 15, you are beyond average. Every season is borrowed time.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>🏠 What's your 15-year situation?</div>
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
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ backgroundColor: plan.urgency === 'CRITICAL' ? '#ef4444' : plan.urgency === 'HIGH' ? '#f59e0b' : '#22c55e', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>{plan.urgency}</span>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#F5E642' }}>⚡ {plan.title}</div>
            </div>
            <div style={{ display: 'grid', gap: '10px', marginBottom: '16px' }}>
              {plan.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#2d1515', borderRadius: '8px', padding: '14px', marginBottom: '12px', borderLeft: '4px solid #ef4444' }}>
              <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>⚠️ WARNING</div>
              <div style={{ color: '#fca5a5', fontSize: '14px', lineHeight: 1.5 }}>{plan.warning}</div>
            </div>
            <div style={{ backgroundColor: '#1a2f50', borderRadius: '8px', padding: '14px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 600, marginBottom: '4px' }}>💡 DFW INSIGHT</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{plan.insight}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>🔗 Get Replacement Quotes Now — ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            ProLnk matches you with vetted DFW HVAC contractors for replacement quotes. Get 3 bids fast — before you're replacing in emergency mode this summer.
          </p>
        </div>
      </div>
    </div>
  );
}
