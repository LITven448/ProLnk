import { useState } from 'react';

const relationshipTypes = [
  {
    type: 'No Relationship',
    emoji: '🚫',
    description: "I call whoever answers the phone when something breaks",
    gaps: [
      '❌ No service history means each tech starts from scratch',
      '❌ Unknown contractors have no accountability to you personally',
      '❌ Emergency pricing without a relationship = premium rates every time',
      '❌ No one is proactively watching out for your system',
    ],
    steps: [
      '→ Start with a ProLnk-matched contractor for a tune-up — no commitment required',
      '→ Evaluate them: did they explain everything? Were they on time? Honest?',
      '→ If yes, book annual maintenance. You just started a relationship.',
    ],
  },
  {
    type: 'Occasional Contractor',
    emoji: '🤝',
    description: "I have someone I've used before but no ongoing commitment",
    gaps: [
      '⚠️ Inconsistent service means no one knows your system’s full history',
      '⚠️ You’re probably paying retail pricing instead of preferred-customer rates',
      '⚠️ No priority scheduling when everyone else is in crisis mode in July',
      '⚠️ No proactive alerts when your system starts showing early warning signs',
    ],
    steps: [
      '→ Call your contractor and ask about a maintenance agreement — it changes the dynamic',
      '→ If they don\’t offer one, use ProLnk to find contractors who do',
      '→ A formal relationship earns you priority, better pricing, and accountability',
    ],
  },
  {
    type: 'Maintenance Agreement',
    emoji: '📋',
    description: 'I have an annual service agreement with a specific contractor',
    gaps: [
      '✅ You\’re ahead of 70% of DFW homeowners — great foundation',
      '⚠️ Make sure the agreement includes: 2 visits/year, filter check, refrigerant check, priority emergency service',
      '⚠️ Document every visit — save service reports in Home Health Vault',
      '⚠️ Review your contractor\’s response time commitment — 24hr max in DFW summers',
    ],
    steps: [
      '→ Request a copy of every service report — this is your right and your protection',
      '→ Add your service history to Home Health Vault to protect home resale value',
      '→ Use ProLnk annually to benchmark your contractor\’s pricing vs. market',
    ],
  },
  {
    type: 'True Partnership',
    emoji: '⭐',
    description: 'My contractor knows my system, calls me proactively, and I trust them completely',
    gaps: [
      '🏆 This is the gold standard — you\’ve built something valuable',
      '✅ Your contractor has full system history and flags issues before they become crises',
      '✅ You get priority emergency slots, better pricing, and honest recommendations',
      '✅ Home Health Vault + a true partner = maximum home value protection',
    ],
    steps: [
      '→ Protect this relationship: review their work annually, give referrals to keep them loyal',
      '→ Still use ProLnk for major replacements — always get 3 quotes for $5K+ jobs',
      '→ Share your contractor through ProLnk and earn referral commissions for both of you',
    ],
  },
];

export default function DFWHVACDFWPartner() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🤝</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            What a Great HVAC Contractor Relationship Looks Like in DFW
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
            The difference between a contractor and a partner is thousands of dollars and years of
            peace of mind. Here's how to build the right relationship for DFW's brutal climate.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { emoji: '📆', label: 'Annual Service', sub: '2 visits/year minimum in DFW' },
            { emoji: '🚨', label: 'Emergency Availability', sub: '24/7 with priority response' },
            { emoji: '💬', label: 'Transparent Pricing', sub: 'Itemized quotes, no surprises' },
            { emoji: '📁', label: 'Documented History', sub: 'Written reports every visit' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            🔍 What does your current relationship look like?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {relationshipTypes.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? '#F5E642' : '#0f172a',
                  color: selected === i ? '#0A1628' : '#fff',
                  border: '2px solid',
                  borderColor: selected === i ? '#F5E642' : '#334155',
                  borderRadius: 10,
                  padding: '14px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {item.emoji} {item.type} — <span style={{ fontWeight: 400 }}>{item.description}</span>
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 10, fontSize: 16, fontWeight: 700 }}>Where the gaps are:</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {relationshipTypes[selected].gaps.map((g, j) => (
                  <li key={j} style={{ padding: '6px 0', fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{g}</li>
                ))}
              </ul>
              <h3 style={{ color: '#F5E642', marginBottom: 10, fontSize: 16, fontWeight: 700 }}>How to build a better partnership:</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {relationshipTypes[selected].steps.map((s, j) => (
                  <li key={j} style={{ padding: '6px 0', fontSize: 14, color: '#93c5fd', lineHeight: 1.6 }}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, margin: '8px 0' }}>
            ProLnk helps you find the right HVAC partner in DFW
          </h3>
          <p style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.6 }}>
            Every contractor in ProLnk's network is vetted, rated by real homeowners, and available
            for maintenance agreements. Your partnership starts here.
          </p>
        </div>
      </div>
    </div>
  );
}
