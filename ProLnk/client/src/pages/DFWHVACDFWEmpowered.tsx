import { useState } from 'react';

const empowermentAreas = [
  {
    area: 'Know Your Rights',
    emoji: '⚖️',
    description: 'Understand what you’re legally and contractually entitled to',
    howTo: [
      '📋 Texas law requires contractors to provide itemized estimates on request',
      '📋 You have the right to a second opinion before any repair over $200',
      '📋 Manufacturers' warranties require documented service records — get them in writing',
      '📋 Home warranty companies must honor claims for covered systems — document the failure',
      '📋 You can dispute any invoice that doesn’t match the agreed quote',
    ],
  },
  {
    area: 'Know What to Ask',
    emoji: '❓',
    description: 'The questions that separate savvy owners from the ones who get taken',
    howTo: [
      '❓ "What is the root cause, not just the symptom?"',
      '❓ "Is this repair covered under any existing warranty?"',
      '❓ "What is the expected remaining life of this system after this repair?"',
      '❓ "Can I see the part number so I can verify the price?"',
      '❓ "Will you put that recommendation in writing with your reasoning?"',
    ],
  },
  {
    area: 'Know When to Push Back',
    emoji: '🛑',
    description: 'Red flags that mean you should stop, get a second opinion, or walk away',
    howTo: [
      '🚩 Verbal-only quotes with no itemization — demand written estimates',
      '🚩 Pressure to decide "today only" — legitimate contractors never do this',
      '🚩 Recommending full system replacement without a diagnostic — always get a second opinion',
      '🚩 Refusing to show you the failed part — you paid for it',
      '🚩 Upfront payment for parts before work begins — a 50% deposit max is standard',
    ],
  },
  {
    area: 'ProLnk Empowerment Tools',
    emoji: '🔧',
    description: 'How ProLnk specifically gives you leverage as a DFW homeowner',
    howTo: [
      '✅ Instant access to 3+ competing quotes from vetted DFW contractors',
      '✅ Contractor ratings from verified homeowners — not anonymous reviews',
      '✅ Home Health Vault documents every service visit for your protection',
      '✅ Price benchmarks so you know if a quote is fair before you accept',
      '✅ Emergency matching in under 2 hours when you need it most',
    ],
  },
];

export default function DFWHVACDFWEmpowered() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🦁</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            The Empowered DFW HVAC Owner
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
            Empowerment isn't aggression — it's preparation. Knowing your rights, knowing what to ask,
            and knowing when to push back turns every contractor interaction in your favor.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            🎯 Choose your empowerment area:
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
            {empowermentAreas.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? '#F5E642' : '#0f172a',
                  color: selected === i ? '#0A1628' : '#fff',
                  border: '2px solid',
                  borderColor: selected === i ? '#F5E642' : '#334155',
                  borderRadius: 10,
                  padding: '16px 12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.emoji}</div>
                {item.area}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 14, fontStyle: 'italic' }}>
                {empowermentAreas[selected].description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {empowermentAreas[selected].howTo.map((h, j) => (
                  <li key={j} style={{ padding: '7px 0', fontSize: 14, color: '#e2e8f0', lineHeight: 1.6, borderBottom: j < empowermentAreas[selected].howTo.length - 1 ? '1px solid #1e293b' : 'none' }}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            📜 The Empowered Owner's Creed
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            I will get quotes in writing. I will ask for itemization. I will take 24 hours before
            approving any repair over $500. I will document every service visit. I will use ProLnk
            to compare before I commit. I will never let urgency override judgment.
          </p>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🏆</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, margin: '8px 0' }}>
            ProLnk is built for empowered DFW homeowners
          </h3>
          <p style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.6 }}>
            Vetted contractors, transparent pricing, and your permanent service record in Home Health Vault.
            You'll never negotiate blind again.
          </p>
        </div>
      </div>
    </div>
  );
}
