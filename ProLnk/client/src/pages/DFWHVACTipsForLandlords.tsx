import { useState } from 'react';

const scenarios = [
  {
    label: "Tenant reports AC isn't cooling",
    obligation: "Texas Property Code §92.053 — landlords must repair conditions affecting health/safety. DFW heat makes non-functional AC a habitability issue immediately.",
    practice: "Dispatch a licensed HVAC tech within 24–48 hours. Don't rely on tenant troubleshooting in July.",
    documentation: "Log the date/time of tenant notice, your response, tech dispatch, and repair completion. Keep all invoices.",
  },
  {
    label: "Tenant hasn't changed filters in months",
    obligation: "If lease assigns filter changes to tenants, you can document their failure. You're still obligated to maintain the system itself.",
    practice: "Include filter change reminders in lease renewals. Consider quarterly filter mail program — costs $5/unit, prevents $3,000 coil cleanings.",
    documentation: "Record move-in filter condition. If system fails from a clogged filter, your invoice will show the cause — use it to recover costs.",
  },
  {
    label: "72-hour rule: tenant in extreme heat",
    obligation: "Texas recognizes a 72-hour emergency repair period for habitability issues. DFW summers routinely hit 105°F — courts view AC outages as urgent.",
    practice: "Have an HVAC vendor on standby retainer for your portfolio. One call should mobilize a tech same-day.",
    documentation: "Timestamp everything. If you miss the 72-hour window, document your good-faith efforts (vendor availability issues, parts delays, etc.).",
  },
  {
    label: "Tenant wants to install a window unit",
    obligation: "You can allow or prohibit it in the lease. Unpermitted modifications may be a lease violation, but you must follow proper notice rules before action.",
    practice: "Allow it in writing if their unit supports the electrical load. Prohibit it with a clear lease clause if not.",
    documentation: "Any approval or denial should be in writing with a timestamp.",
  },
  {
    label: "Tenant caused damage to HVAC unit",
    obligation: "You can deduct repair costs from the security deposit if you can prove tenant caused the damage — not normal wear-and-tear.",
    practice: "Get a written tech assessment specifying cause of failure. 'Tenant ran unit without filters for 6 months' is documentable.",
    documentation: "Move-in condition checklist + repair invoice + tech's written cause determination = defensible deduction.",
  },
  {
    label: "Unit is older than 15 years — should I replace it?",
    obligation: "No legal obligation to replace a functioning unit, but a failing old unit that can't maintain 85°F indoors in DFW heat may become a habitability violation.",
    practice: "At 15+ years in DFW, replacement is often cheaper than repeated repairs. New unit = tenant retention + warranty.",
    documentation: "Keep maintenance history for the unit. It shows due diligence and supports decisions to repair vs. replace.",
  },
];

export default function DFWHVACTipsForLandlords() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏢</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW HVAC Guide for Landlords
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Texas law, DFW climate realities, and what every DFW landlord must know about HVAC obligations.
          </p>
        </div>

        <div style={{ background: '#111f3a', border: '1.5px solid #F5E642', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.95rem' }}>⚠️ Texas 72-Hour Rule</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Texas recognizes AC failure as a health/safety emergency in summer. Courts expect landlord response within 72 hours. Document everything.
          </p>
        </div>

        <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>
          👇 Select your situation:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {scenarios.map((s, i) => (
            <div key={i}>
              <div
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1a3a5c' : '#111f3a',
                  border: selected === i ? '1.5px solid #F5E642′ : '1.5px solid #1e3a5f',
                  borderRadius: 10,
                  padding: '0.9rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.97rem' }}>🏠 {s.label}</span>
                <span style={{ color: '#F5E642′ }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ background: '#0d1f38', borderRadius: '0 0 10px 10px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>⚖️ Legal Obligation: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.obligation}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>✅ Best Practice: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.practice}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>📁 Documentation: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.93rem' }}>{s.documentation}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🔧</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.05rem' }}>
            Build your DFW HVAC vendor network with ProLnk
          </p>
          <p style={{ color: '#1e3a5f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Licensed, insured, and background-checked HVAC techs available same-day across all DFW zip codes.
          </p>
        </div>
      </div>
    </div>
  );
}
