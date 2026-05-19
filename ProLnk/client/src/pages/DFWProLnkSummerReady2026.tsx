import { useState } from 'react';

const situations = [
  {
    id: 'hvac-fails',
    label: '🚨 HVAC Failing Now',
    plan: {
      headline: 'Emergency Match — Priority Queue Active',
      steps: [
        'Submit a service request through ProLnk marked EMERGENCY. Charter and Founding pros are alerted immediately via SMS — not email.',
        'Our summer 2026 HVAC emergency pool has 47 DFW-area contractors pre-committed to 4-hour response windows from June through September.',
        'While waiting for match confirmation, set thermostat to FAN ONLY to circulate air. Close blinds on south and west-facing windows. Move to lowest floor of your home.',
        'ProLnk contractors are pre-vetted for 2026 SEER2 compliance and R-454B/R-32 work. If your unit needs refrigerant or replacement, they can act same-day in most DFW zones.',
        'After the visit, your Home Health Vault HVAC record is automatically updated with the service event, parts used, and next recommended service date.',
      ],
    },
  },
  {
    id: 'proactive-prep',
    label: '📋 Want to Prepare Now',
    plan: {
      headline: 'Pre-Summer Readiness Plan',
      steps: [
        'Schedule your pre-season HVAC tune-up now through ProLnk. DFW contractors are already booking into late June — the June-August backlog is real.',
        'ProLnk summer 2026 feature: simultaneous quote requests to 3 vetted DFW HVAC pros. Compare pricing, availability, and ratings in one place.',
        'Add your home to the Home Health Vault before launch. Your HVAC age, service history, and equipment specs are pre-loaded — no re-explaining to every contractor.',
        'Charter homeowners get priority scheduling access during peak summer. If you are on the waitlist, your position is locked — you will receive launch access before general public.',
        'Request a Home Health Vault HVAC risk score: ProLnk cross-references your system age, local heat index data, and service history to flag replacement risk before it fails.',
      ],
    },
  },
  {
    id: 'budget-concerns',
    label: '💰 Worried About Cost',
    plan: {
      headline: 'Transparent Pricing — No Surprises',
      steps: [
        'ProLnk\’s matching model means contractors compete for your job. DFW homeowners who submit requests through ProLnk report 15-25% lower quotes vs. calling contractors directly.',
        '2026 federal tax credits are real: up to $2,000 for qualifying heat pump installations, $600 for high-efficiency central AC. Your ProLnk contractor can confirm eligibility on-site.',
        'Oncor and TXU are running summer 2026 rebate programs for HVAC replacements meeting SEER2 17+ efficiency. Ask your matched pro to verify your utility zone eligibility.',
        'ProLnk offers no-cost multi-quote requests. You only pay the contractor you choose. No platform fee to homeowners.',
        'Home Health Vault tracks your HVAC warranty coverage automatically. Expired warranties trigger a proactive alert so you know before a costly repair whether replacement makes financial sense.',
      ],
    },
  },
  {
    id: 'new-to-dfw',
    label: '🏡 New to DFW',
    plan: {
      headline: 'Welcome to DFW — HVAC Is Non-Negotiable',
      steps: [
        'DFW summers are extreme. 105°F+ days from June through September. Your HVAC system is not optional equipment — it is life safety infrastructure. Budget accordingly.',
        'First thing: get a full HVAC inspection through ProLnk. New-to-DFW homeowners often inherit aging systems. Knowing your system age and condition before summer is critical.',
        'Add your home to ProLnk\’s Home Health Vault at launch. Your property gets a permanent HVAC and home systems record that travels with the home if you sell.',
        'DFW contractors are in high demand from April through September. Joining ProLnk\’s waitlist now guarantees you access to vetted pros — not whoever answers the phone in an emergency.',
        'ProLnk\’s summer 2026 DFW network includes HVAC, plumbing, electrical, and roofing specialists. One platform for all your home service needs, all vetted before they arrive at your door.',
      ],
    },
  },
  {
    id: 'landlord',
    label: '🏢 Landlord / Multiple Properties',
    plan: {
      headline: 'Portfolio Management — Summer 2026',
      steps: [
        'ProLnk summer 2026 supports multi-property homeowners. Submit service requests across all properties from a single account — matched separately per property address.',
        'Home Health Vault supports unlimited properties. Each property gets its own HVAC health record, service history, and risk score — important for rental property management and resale.',
        'Landlord tip: HVAC failures at rental properties create tenant emergencies. ProLnk\’s 4-hour emergency match window for Charter homeowners reduces your liability window dramatically.',
        'Bulk scheduling available for summer tune-ups. Submit multiple properties in one request and ProLnk coordinates scheduling across your portfolio with minimal landlord involvement.',
        'Documented service history through ProLnk and Home Health Vault adds real value to DFW investment properties. Buyers and appraisers recognize maintained systems.',
      ],
    },
  },
];

export default function DFWProLnkSummerReady2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          PROLNK DFW — SUMMER 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Summer 2026 Readiness
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 12, lineHeight: 1.6 }}>
          ProLnk's DFW contractor network is expanded, HVAC emergency matching is prioritized, and Home Health Vault HVAC tracking launches with the platform. Select your situation for your summer 2026 support plan.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
          {[{ label: 'HVAC Contractors', val: '47+' }, { label: 'Emergency Response', val: '4hrs' }, { label: 'DFW Zones', val: '6' }].map(s => (
            <div key={s.label} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 10, padding: '14px 20px', flex: 1, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.val}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 20, marginTop: 24 }}>Tell us your situation:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 32 }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#0F2040',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid',
                borderColor: selected === s.id ? '#F5E642' : '#1E3A5F',
                borderRadius: 10,
                padding: '14px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 20 }}>{active.plan.headline}</div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {active.plan.steps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
