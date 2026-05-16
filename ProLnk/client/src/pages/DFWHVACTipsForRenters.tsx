import { useState } from 'react';

const situations = [
  {
    label: "My AC stopped working in July",
    rights: "Texas law requires landlords to repair conditions that materially affect health/safety — AC in DFW heat qualifies.",
    responsibilities: "You must notify landlord in writing. They have a reasonable time (often 7 days) to fix it.",
    document: "Send written notice via text or email with timestamp. Take a photo of the thermostat showing it's not cooling.",
  },
  {
    label: "Landlord hasn't fixed AC after 7 days",
    rights: "Under Texas Property Code §92.056, you may repair-and-deduct or terminate lease after proper notice.",
    responsibilities: "You must have paid rent on time and given written notice. Don't skip steps or you lose legal protection.",
    document: "Keep every text, email, and receipt. Document indoor temps daily with your phone's weather or thermostat photo.",
  },
  {
    label: "My filter is clogged — whose job is it?",
    rights: "Most Texas leases assign filter replacement to tenants. Check your lease — it's usually spelled out.",
    responsibilities: "Change filters monthly in DFW (dust, pollen, construction debris clog them fast).",
    document: "Keep receipts for filters you buy. If landlord disputes damage, you can prove you maintained it.",
  },
  {
    label: "AC is blowing warm air but technically 'running'",
    rights: "A system that can't cool to a reasonable temperature in DFW heat likely violates habitability standards.",
    responsibilities: "Report it immediately in writing. Don't wait — DFW heat makes this a safety issue fast.",
    document: "Record indoor/outdoor temps at the same time daily. 90°F inside when it's 95°F outside is a clear failure.",
  },
  {
    label: "Landlord wants me to pay for repairs",
    rights: "Landlords cannot charge tenants for normal AC wear-and-tear or system failures unrelated to tenant damage.",
    responsibilities: "If you damaged the unit (e.g., hit it, ran it without filters for months), you may be liable.",
    document: "Get any repair requests in writing. Ask for the service invoice showing what broke and why.",
  },
  {
    label: "I want to add a window unit myself",
    rights: "You generally need landlord permission for window units — they can affect electrical load and window condition.",
    responsibilities: "Ask in writing first. Some DFW leases explicitly forbid modifications.",
    document: "Get approval in writing before installing anything. Unauthorized units can be grounds for eviction.",
  },
];

export default function DFWHVACTipsForRenters() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW HVAC Guide for Renters
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Know your rights and responsibilities under Texas tenant law — especially during DFW summers.
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
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.97rem' }}>🧾 {s.label}</span>
                <span style={{ color: '#F5E642' }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ background: '#0d1f38', borderRadius: '0 0 10px 10px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>⚖️ Your Rights: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.rights}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>📋 Your Responsibilities: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.responsibilities}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>📸 Document: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.93rem' }}>{s.document}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🔧</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.05rem' }}>
            Need a second opinion on your HVAC issue?
          </p>
          <p style={{ color: '#1e3a5f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            ProLnk connects DFW renters with licensed HVAC techs for diagnostic assessments.
          </p>
        </div>
      </div>
    </div>
  );
}
