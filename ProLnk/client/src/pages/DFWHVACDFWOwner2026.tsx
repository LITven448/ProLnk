import { useState } from 'react';

const ownerSituations = [
  {
    situation: 'New DFW Homeowner',
    emoji: '🏡',
    description: 'Just moved in or recently bought — learning what you have',
    guide: [
      '1️⃣ Find your system: locate the outdoor unit, air handler, and thermostat',
      '2️⃣ Document the specs: brand, model number, SEER rating, install date',
      '3️⃣ Find the air filter: size, type, and replacement schedule (every 60 days in DFW)',
      '4️⃣ Get an inspection: hire a ProLnk-vetted tech for a full system diagnostic',
      '5️⃣ Register on Home Health Vault: your permanent DFW home health record starts now',
    ],
    resource: 'Start with a diagnostic — you need to know what you\’re working with before summer.',
  },
  {
    situation: 'System Is 5–10 Years Old',
    emoji: '⏳',
    description: 'Mid-life system — still running but approaching decision time',
    guide: [
      '📊 At 7 years, major components start failing — budget $400–800/year for repairs',
      '📊 If a repair exceeds 30% of replacement cost, consider replacing instead',
      '📊 2026 R-454B transition: older R-410A units will cost more to service',
      '📊 Get an efficiency audit — a degraded system adds $50–150/month to bills',
      '📊 Start a replacement fund now: $8,000–15,000 for DFW system replacement',
    ],
    resource: 'Plan for replacement in 3–5 years. ProLnk can show you replacement quotes now vs. then.',
  },
  {
    situation: 'System Is 10+ Years Old',
    emoji: '⚠️',
    description: 'Aging system — every summer is a gamble without a plan',
    guide: [
      '🔴 Your system is in the highest-risk window — budget for emergency replacement',
      '🔴 Do NOT spend more than $1,500 on repairs on a 12+ year old system',
      '🔴 Get 3 replacement quotes now through ProLnk — before it fails in a heat wave',
      '🔴 Consider a home warranty add-on for the remaining life of the system',
      '🔴 R-22 systems (pre-2010) are obsolete — refrigerant costs $100+/lb if it leaks',
    ],
    resource: 'Get replacement quotes in hand now. A planned replacement is 40% cheaper than an emergency one.',
  },
  {
    situation: 'Just Had a Major Repair',
    emoji: '🔧',
    description: 'Recent big expense — now what?',
    guide: [
      '✅ Document the repair: get a copy of the service report for Home Health Vault',
      '✅ Ask about warranty on parts and labor — standard is 1 year on both',
      '✅ Request a full system health assessment now that a tech is familiar with your unit',
      '✅ Evaluate: if this was a compressor or heat exchanger, replacement may be smarter',
      '✅ Set up annual maintenance now — prevention is always cheaper than repair',
    ],
    resource: 'One big repair often reveals more. Use ProLnk to get a second opinion on overall system health.',
  },
];

export default function DFWHVACDFWOwner2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📅</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            What It Means to Be a DFW HVAC Owner in 2026
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
            2026 is a transition year for DFW homeowners: new refrigerant standards, rising energy costs,
            and aging housing stock. Here's what responsible ownership looks like right now.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { emoji: '🌡️', label: 'DFW Summer Reality', sub: '100°F+ for 60+ days/year' },
            { emoji: '🔄', label: 'Refrigerant Shift', sub: 'R-410A → R-454B in 2026′ },
            { emoji: '💡', label: 'Energy Costs Up', sub: '+12% avg in North Texas' },
            { emoji: '🏗️', label: 'Aging Stock', sub: '40% of DFW homes have 10+ yr systems' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: 11, marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            🏠 What's your DFW owner situation?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ownerSituations.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? '#F5E642′ : '#0f172a',
                  color: selected === i ? '#0A1628′ : '#fff',
                  border: '2px solid',
                  borderColor: selected === i ? '#F5E642′ : '#334155',
                  borderRadius: 10,
                  padding: '14px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {item.emoji} {item.situation} — <span style={{ fontWeight: 400 }}>{item.description}</span>
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 16, fontWeight: 700 }}>
                Your 2026 DFW HVAC owner guide:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {ownerSituations[selected].guide.map((g, j) => (
                  <li key={j} style={{ padding: '6px 0', fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{g}</li>
                ))}
              </ul>
              <div style={{ backgroundColor: '#1e293b', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642′ }}>
                <p style={{ color: '#F5E642', fontSize: 13, margin: 0, fontStyle: 'italic' }}>
                  💡 {ownerSituations[selected].resource}
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔑</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, margin: '8px 0′ }}>
            2026 DFW HVAC ownership starts with ProLnk
          </h3>
          <p style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.6 }}>
            Vetted contractors for every situation, Home Health Vault for your permanent record,
            and emergency matching when you need it. That's responsible DFW homeownership in 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
