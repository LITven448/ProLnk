import { useState } from 'react';

const firstGenSituations = [
  {
    label: "I just bought my first DFW home — what do I do with the HVAC?",
    learn: "Find the air handler (usually in a closet or attic) and the outdoor condenser unit. These are the two parts of your AC system.",
    yearOne: "Schedule a tune-up within your first 60 days. Get the tech to show you everything and explain what they find. Ask questions — it's your home.",
    prolnk: "ProLnk connects you with licensed DFW HVAC techs who will explain what they're doing — not just hand you a bill.",
  },
  {
    label: "What questions should I ask a HVAC contractor?",
    learn: "Ask: What's the age of my system? What's the refrigerant type? Are there any duct leaks? What's the SEER rating?",
    yearOne: "Write the answers down. Keep a folder (physical or Google Drive) with all HVAC service records. This matters when you sell.",
    prolnk: "Request itemized quotes — not just a total number. Understand what each line item is before you sign.",
  },
  {
    label: "My parents never owned a home — I have no one to call",
    learn: "You're not alone. Most first-gen homeowners feel this way. HVAC is learnable — it's not magic.",
    yearOne: "Find a trusted HVAC tech and build a relationship. A good tech will tell you what's urgent vs. what can wait and never upsell you on things you don't need.",
    prolnk: "ProLnk vets every contractor. Reviews from real DFW homeowners tell you who's honest and who isn't.",
  },
  {
    label: "How do I know if I'm being overcharged?",
    learn: "Get 2–3 quotes for any job over $300. DFW HVAC pricing varies widely. Knowing the range protects you.",
    yearOne: "Common DFW HVAC prices: tune-up $89–$149, capacitor $150–$300, refrigerant recharge $200–$600, full system replacement $6,000–$12,000.",
    prolnk: "ProLnk shows you market-rate pricing for your zip code before you request quotes. No surprises.",
  },
  {
    label: "What do I absolutely need to do in Year 1?",
    learn: "Year 1 priorities: (1) change filter monthly, (2) schedule one tune-up, (3) learn where your breaker for HVAC is, (4) learn where your emergency shutoff drain pan switch is.",
    yearOne: "Set a phone reminder for filter changes. DFW pollen and dust clog filters in 3–4 weeks in spring and fall.",
    prolnk: "ProLnk sends maintenance reminders tied to your home's system age and DFW seasonal patterns.",
  },
  {
    label: "What does HVAC even stand for and what does it do?",
    learn: "HVAC = Heating, Ventilation, Air Conditioning. In DFW: mostly AC. It moves heat out of your home using refrigerant, a compressor, and air flow.",
    yearOne: "You don't need to understand the physics — just know: (1) your filter location, (2) your thermostat settings, (3) who to call when it stops working.",
    prolnk: "Ask your ProLnk tech to walk you through your specific system during the tune-up. Most will happily spend 10 minutes explaining.",
  },
];

export default function DFWHVACForFirstGen() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW HVAC Guide for First-Generation Homeowners
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            No homeownership tradition? No problem. Here's exactly what to learn, do, and ask — in plain language.
          </p>
        </div>

        <div style={{ background: '#111f3a', border: '1.5px solid #34d399', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#34d399', fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.95rem' }}>💬 You're Not Behind</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Most homeowners — first-gen or not — don't really understand their HVAC system. The difference is you're asking. That makes you ahead of the curve.
          </p>
        </div>

        <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>
          👇 Select your situation:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {firstGenSituations.map((s, i) => (
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
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.97rem' }}>🙋 {s.label}</span>
                <span style={{ color: '#F5E642' }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ background: '#0d1f38', borderRadius: '0 0 10px 10px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>📚 Learn This: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.learn}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>📅 Year 1 Priority: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.yearOne}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>🔧 How ProLnk Helps: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.93rem' }}>{s.prolnk}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🌟</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.05rem' }}>
            ProLnk is built for homeowners who want to understand, not just pay
          </p>
          <p style={{ color: '#1e3a5f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Every DFW HVAC pro on ProLnk is licensed, rated, and committed to explaining what they find — not just billing you.
          </p>
        </div>
      </div>
    </div>
  );
}
