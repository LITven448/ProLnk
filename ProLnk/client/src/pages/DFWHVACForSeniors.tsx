import { useState } from 'react';

const situations = [
  {
    label: "I'm 70+ and live alone in DFW",
    priority: "Heat safety plan is non-negotiable. DFW heat kills more elderly residents than any other weather event in North Texas.",
    plan: "Set AC to 78°F max. Keep a backup plan: neighbor check-ins, cooling center locations (Dallas, Fort Worth, Arlington all have them), battery-powered fan.",
    checklist: ["✅ Program thermostat to never exceed 78°F", "✅ Know your nearest cooling center", "✅ Have someone check on you daily in July/August", "✅ Keep water accessible near your chair/bed"],
  },
  {
    label: "My AC is making new noises",
    priority: "Don't ignore it. New sounds (grinding, squealing, banging) mean a component is failing. A failure in DFW July heat is an emergency.",
    plan: "Call a licensed tech immediately. Don't wait for the next billing cycle. A $150 service call beats a $8,000 emergency replacement.",
    checklist: ["✅ Note when you hear it (startup, running, shutdown)", "✅ Don't turn system off and on repeatedly", "✅ Call ProLnk for same-day service", "✅ Stay at a neighbor's or family's if temps spike"],
  },
  {
    label: "My energy bills keep going up",
    priority: "Rising bills on the same usage pattern mean your system is losing efficiency — common after 10+ years in DFW heat.",
    plan: "Get an HVAC efficiency assessment. Often a tune-up restores 15–20% efficiency. Sometimes duct sealing ($500–$900) cuts bills by $100+/month.",
    checklist: ["✅ Pull 12 months of Oncor/TXU bills to see the trend", "✅ Have a tech check refrigerant charge", "✅ Ask about duct leakage test", "✅ Consider programmable thermostat upgrade"],
  },
  {
    label: "I want simpler controls — the thermostat confuses me",
    priority: "You deserve a thermostat that works for you. Complex Wi-Fi stats are not required — simple mechanical or basic digital stats work fine.",
    plan: "Ask your HVAC tech to install a simple 2-button digital thermostat. Set it once to 76–78°F and don't touch it. ProLnk pros can walk you through it.",
    checklist: ["✅ Write your preferred temp on tape next to the stat", "✅ Ask tech to label COOL / FAN / HEAT simply", "✅ Give a trusted family member the HVAC company's number", "✅ Keep the model number of your thermostat on your fridge"],
  },
  {
    label: "My system is 20 years old",
    priority: "A 20-year-old DFW system is past end-of-life. It may run but it's using 40–50% more electricity than a modern unit.",
    plan: "Get a replacement quote. A new 16-SEER unit in DFW typically pays back in 5–7 years on electricity savings alone. Ask about financing.",
    checklist: ["✅ Get 2 quotes for replacement (compare apples-to-apples on SEER rating)", "✅ Ask about rebates from Oncor or your gas company", "✅ Ask your tech about the R-22 refrigerant phaseout (old systems use banned refrigerant)", "✅ Check if you qualify for LIHEAP energy assistance"],
  },
];

export default function DFWHVACForSeniors() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌡️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW HVAC Guide for Senior Homeowners
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            DFW heat is dangerous. Here's what matters most for seniors — simplified, prioritized, and actionable.
          </p>
        </div>

        <div style={{ background: '#7f1d1d', border: '1.5px solid #ef4444', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#fca5a5', fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.95rem' }}>🚨 DFW Heat Safety Fact</p>
          <p style={{ color: '#fecaca', fontSize: '0.9rem' }}>
            Adults 65+ account for the majority of heat-related deaths in North Texas. AC failure during a heat wave is a medical emergency. Never wait more than a few hours.
          </p>
        </div>

        <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>
          👇 Select your situation:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {situations.map((s, i) => (
            <div key={i}>
              <div
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1a3a5c' : '#111f3a',
                  border: selected === i ? '1.5px solid #F5E642' : '1.5px solid #1e3a5f',
                  borderRadius: 10,
                  padding: '0.9rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.97rem' }}>🏡 {s.label}</span>
                <span style={{ color: '#F5E642' }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ background: '#0d1f38', borderRadius: '0 0 10px 10px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>⚡ Priority: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.priority}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>📋 Plan: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.plan}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.75rem 1rem' }}>
                    <p style={{ color: '#34d399', fontWeight: 700, marginBottom: '0.4rem' }}>✅ Safety Checklist:</p>
                    {s.checklist.map((c, j) => (
                      <p key={j} style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.15rem 0' }}>{c}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🤝</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.05rem' }}>
            ProLnk connects seniors with trusted, vetted DFW HVAC pros
          </p>
          <p style={{ color: '#1e3a5f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            No price games. No pushy upsells. Licensed techs who respect your home and your time.
          </p>
        </div>
      </div>
    </div>
  );
}
