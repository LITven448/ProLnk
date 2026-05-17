import { useState } from 'react';

const situations = [
  {
    label: 'My AC stopped working in July',
    icon: '🔥',
    story: 'Most DFW homeowners discover their AC is broken on the hottest day of the year — because they skipped spring tune-up. ProLnk Charter HVAC techs run a full pre-summer inspection in March/April, catching failing capacitors, dirty coils, and low refrigerant before they become emergencies.',
    outcome: 'Charter members avoided $3,200 average July AC repair bills by catching issues in spring for under $150.',
  },
  {
    label: "I don't know when I last changed my filter",
    icon: '🌿',
    story: 'Cedar fever season (Dec–Feb) and oak season (Mar–May) are brutal on DFW HVAC filters. Clogged filters spike energy bills and choke the system. ProLnk members log monthly filter changes in their Home Health Vault, triggering reminders automatically.',
    outcome: 'Monthly filter changes reduce system strain by 15% and extend equipment life by 2–3 years.',
  },
  {
    label: 'I have no idea what HVAC system I have',
    icon: '📋',
    story: 'Successful DFW homeowners document their HVAC equipment details in the Home Health Vault: model number, installation date, warranty expiration, and every service record. When something goes wrong — or when selling — that data is gold.',
    outcome: 'Documented HVAC history adds $4,000–$8,000 to home resale value and cuts diagnosis time in half.',
  },
  {
    label: "I want a tech I trust, not a random contractor",
    icon: '🤝',
    story: 'ProLnk Charter HVAC professionals are vetted, background-checked, and rated by real DFW homeowners. You pick your pro, build a relationship, and they learn your system over time — no dispatching strangers every call.',
    outcome: 'Charter members report 94% satisfaction vs. 61% satisfaction with one-off contractor hires.',
  },
  {
    label: 'My energy bills are sky-high every summer',
    icon: '💡',
    story: "DFW summers average 100°F+ for weeks. Successful homeowners seal duct leaks, add attic insulation, and program smart thermostats — all documented and tracked. ProLnk's HVAC pros identify energy waste on every visit.",
    outcome: 'ProLnk HVAC audits find an average of $640/year in recoverable energy waste per DFW home.',
  },
];

export default function DFWHVACSuccessStory2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 10 }}>
            DFW HVAC Success Story Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            What successful DFW homeowners do differently with their HVAC systems — and what ProLnk makes possible.
          </p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The DFW HVAC Reality</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Dallas-Fort Worth summers are unforgiving. With 60+ days above 100°F, your HVAC system is the most critical
            system in your home. Successful DFW homeowners treat it like an investment — not an afterthought.
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
              {situations[selected].icon} What ProLnk Success Looks Like
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
            Join the ProLnk DFW Charter Waitlist
          </h3>
          <p style={{ color: '#0A1628', fontSize: 14, lineHeight: 1.6 }}>
            Only 500 Charter HVAC spots available across DFW. Lock in your rate and your trusted tech before summer.
          </p>
        </div>
      </div>
    </div>
  );
}