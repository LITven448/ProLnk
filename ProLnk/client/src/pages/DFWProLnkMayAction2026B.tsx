import { useState } from 'react';

const trades = [
  {
    id: 'hvac',
    label: '❄️ HVAC',
    actions: [
      { emoji: '🟡', text: 'Apply for ProLnk Charter before 500-member limit closes — founding rate locked', urgent: true },
      { emoji: '📅', text: 'Book summer AC tune-up slots now — DFW pros are full by June 1 every year', urgent: true },
      { emoji: '👥', text: 'Recruit 2–3 HVAC contacts this week — network income starts day 1', urgent: true },
      { emoji: '✅', text: 'Complete your ProLnk profile to 100% — photos, certifications, service area map', urgent: false },
      { emoji: '🌿', text: 'Prep cottonwood condenser cleaning service — fast high-margin add-on in May', urgent: false },
      { emoji: '📋', text: 'Stock Refrigerant 410A and R-32 — supply chains tighten every June in DFW', urgent: false },
    ],
  },
  {
    id: 'foundation',
    label: '🧱 Foundation',
    actions: [
      { emoji: '🟡', text: 'Apply for ProLnk Charter before 500-member limit — most high-value trade in DFW', urgent: true },
      { emoji: '📅', text: 'Book summer evaluation slots — soil drying in DFW starts in earnest by mid-June', urgent: true },
      { emoji: '👥', text: 'Recruit 2–3 contacts in complementary trades (plumbing, drainage)', urgent: true },
      { emoji: '✅', text: 'Upload your structural warranty information and photos to ProLnk profile', urgent: false },
      { emoji: '💧', text: 'Offer free soaker hose consultations — highest-converting DFW foundation lead source', urgent: false },
      { emoji: '📋', text: 'Review your concrete pier supply chain — demand surges July–September', urgent: false },
    ],
  },
  {
    id: 'roofing',
    label: '🏠 Roofing',
    actions: [
      { emoji: '🟡', text: 'Apply for ProLnk Charter — DFW homeowners trust ProLnk-verified roofers vs. storm chasers', urgent: true },
      { emoji: '⛈️', text: 'Register for storm alert notifications — first-mover advantage after hail is critical', urgent: true },
      { emoji: '👥', text: 'Recruit 2–3 roofing contacts this week — highest commission trade in DFW', urgent: true },
      { emoji: '✅', text: 'Upload insurance certificates and DFW project photos to profile — builds trust instantly', urgent: false },
      { emoji: '📋', text: 'Pre-order Class 4 shingle inventory — demand spikes after every storm event', urgent: false },
      { emoji: '🤝', text: 'Partner with local public adjusters — referral relationships are gold in DFW roofing', urgent: false },
    ],
  },
  {
    id: 'plumbing',
    label: '🚿 Plumbing',
    actions: [
      { emoji: '🟡', text: 'Apply for ProLnk Charter before 500-member limit — founding rate is permanent', urgent: true },
      { emoji: '📅', text: 'Book irrigation backflow testing slots now — legally required and peaks in May/June', urgent: true },
      { emoji: '👥', text: 'Recruit 2–3 plumbing contacts — network income adds up fast in a high-volume trade', urgent: true },
      { emoji: '✅', text: 'Add service area and specialty certifications to ProLnk profile', urgent: false },
      { emoji: '💧', text: 'Stock PRV replacement inventory — DFW water pressure issues spike in summer', urgent: false },
      { emoji: '📋', text: 'List drain cleaning and water heater flush as seasonal packages on your profile', urgent: false },
    ],
  },
  {
    id: 'electrical',
    label: '⚡ Electrical',
    actions: [
      { emoji: '🟡', text: 'Apply for ProLnk Charter — electrical is high-margin and high-demand in DFW summer', urgent: true },
      { emoji: '⚡', text: 'Promote surge protector installs now — spring storm season is peak demand window', urgent: true },
      { emoji: '👥', text: 'Recruit 2–3 electrician contacts this week — network income starts immediately', urgent: true },
      { emoji: '✅', text: 'Add EV charger installation to your ProLnk service offerings — DFW demand surging', urgent: false },
      { emoji: '📋', text: 'Stock panel upgrade materials — pre-1990 DFW homes are a massive market', urgent: false },
      { emoji: '🤝', text: 'Partner with HVAC pros — panel upgrades often follow mini-split installations', urgent: false },
    ],
  },
];

export default function DFWProLnkMayAction2026B() {
  const [active, setActive] = useState('hvac');
  const current = trades.find(t => t.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🟡🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>
            ProLnk May 2026 Action Guide for DFW Pros
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            Charter membership closes at 500. May is your window. Select your trade for your personalized May 2026 action plan.
          </p>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.1)', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 20px', marginBottom: 28, textAlign: 'center' }}>
          <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 15 }}>⚡ Charter closing at 500 members · Founding rate locked for life · Apply today at prolnk.io</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {trades.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: '2px solid',
                borderColor: active === t.id ? '#F5E642' : '#1e3a5f',
                background: active === t.id ? '#F5E642' : '#0f2240',
                color: active === t.id ? '#0A1628' : '#cbd5e1',
                fontWeight: 700, cursor: 'pointer', fontSize: 13,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f2240', border: '2px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 18 }}>
            {current.label} — May 2026 Action Plan
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {current.actions.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, padding: '10px 14px', background: item.urgent ? 'rgba(245,230,66,0.06)' : 'transparent', borderRadius: 8, border: item.urgent ? '1px solid rgba(245,230,66,0.2)' : '1px solid transparent' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
                <span style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.5 }}>{item.text}</span>
                {item.urgent && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4, flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>NOW</span>}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 22, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>
            Charter Pro benefits: $149/mo locked rate · 5 income streams · Priority lead access · Founding community
          </p>
          <a
            href="https://prolnk.io"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 15 }}
          >
            Apply for Charter Today — prolnk.io
          </a>
        </div>

        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          ProLnk May 2026 Pro Action Guide · Dallas–Fort Worth · prolnk.io
        </p>
      </div>
    </div>
  );
}
