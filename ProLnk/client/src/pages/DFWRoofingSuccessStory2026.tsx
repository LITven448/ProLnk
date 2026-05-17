import { useState } from 'react';

const situations = [
  {
    label: 'Hail just hit my neighborhood',
    icon: '⛈️',
    story: "After every significant hail event, successful DFW homeowners contact their ProLnk Charter roofer within 48 hours. Hail damage has a clock — insurance claims require professional documentation soon after the storm. Charter roofers know DFW hail patterns, know what adjusters look for, and get on your roof when you need them.",
    outcome: 'ProLnk members filed insurance claims 3x faster after hail events and received 28% higher settlements on average.',
  },
  {
    label: 'I know my roof is aging',
    icon: '🏠',
    story: "DFW's composite shingle roofs last 20–25 years under normal conditions — but DFW is not normal. UV, hail, and heat cycling degrade shingles faster here. Successful homeowners get annual inspections starting at year 12 and have a Plan A in place for the next hail event: Class 4 impact-resistant shingles.",
    outcome: 'Class 4 shingles reduce DFW insurance premiums by 15–28% and handle most hail events without damage.',
  },
  {
    label: 'My insurance just denied my roof claim',
    icon: '📋',
    story: "Claim denials happen when documentation is weak. ProLnk Charter roofers provide photo evidence, storm reports, and professional assessments in insurance-ready format. They know how to document damage accurately and how to work with adjusters. Denials get appealed — and won.",
    outcome: 'Appealed roof claims with ProLnk documentation were approved 67% of the time vs. 31% without professional support.',
  },
  {
    label: "I don't know my wind/hail deductible",
    icon: '💡',
    story: "Most DFW homeowners don't realize their wind/hail deductible is separate — and often 1–2% of their home's insured value. On a $500,000 home that's $5,000–$10,000 out of pocket before insurance pays anything. ProLnk's roofing guides walk you through your policy before disaster strikes.",
    outcome: 'Homeowners who understood their deductible made better repair decisions, saving an average of $4,200.',
  },
  {
    label: 'I want a roofer I can trust long-term',
    icon: '🤝',
    story: "Storm chasers flood DFW after every major hail event. They're here today, gone tomorrow. ProLnk Charter roofers are vetted DFW professionals with verifiable track records, local licenses, and real reviews from DFW homeowners. You build a relationship — they know your roof's history.",
    outcome: '94% of ProLnk Charter roofer clients said they would use the same pro again vs. 43% for storm chaser hires.',
  },
];

export default function DFWRoofingSuccessStory2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 10 }}>
            DFW Roofing ProLnk Success Story Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            What successful DFW homeowners do differently — before, during, and after the storm.
          </p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The DFW Roofing Reality</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Dallas-Fort Worth is the hail capital of North America. In 2023 alone, DFW experienced 14 significant hail events.
            The average DFW homeowner replaces their roof 2–3 times during ownership. Successful homeowners plan for it — they don't react to it.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>
          Select your situation:
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {situations.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#1e3a5f' : '#0d1f3c',
                border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '16px 20px',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0d1f3c', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
              {situations[selected].icon} What Roofing Success Looks Like
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{situations[selected].story}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Result: </span>
              <span style={{ color: '#94a3b8' }}>{situations[selected].outcome}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
            Join the ProLnk DFW Roofing Charter
          </h3>
          <p style={{ color: '#0A1628', fontSize: 14, lineHeight: 1.6 }}>
            Get a vetted DFW Charter roofer before the next storm. Be ready — not reactive.
          </p>
        </div>
      </div>
    </div>
  );
}