import { useState } from 'react';

const scenarios = [
  {
    label: 'New Construction (2020+) with Central AC',
    icon: '🏗️',
    plan: {
      currentAge: '0–5 years',
      replacementWindow: '2035–2040',
      dominantTech: 'Variable-speed heat pump + solar-ready electrical panel + battery storage',
      steps: [
        '2026–2028: Add smart thermostat and air quality monitoring. Optimize existing system with annual tune-ups.',
        '2028–2032: Evaluate solar panel installation. Add EV charger circuit — same contractor can prep HVAC electrical.',
        '2032–2035: Install whole-home battery (Tesla Powerwall or similar). Your HVAC becomes the primary battery consumer.',
        '2035+: Replace AC with variable-speed heat pump. Pair with solar + battery for near-zero cooling cost.',
      ],
      futureProof: 'Your home is positioned for full electrification. Prioritize panel upgrade now to avoid expensive retrofit at replacement time.',
    },
  },
  {
    label: '1990s–2000s Home with Aging System',
    icon: '🏠',
    plan: {
      currentAge: '15–30 years',
      replacementWindow: 'Likely 1–5 years',
      dominantTech: 'Two-stage or variable-speed heat pump with gas backup (dual-fuel)',
      steps: [
        'Immediate: Have system inspected and get a "remaining useful life" assessment. Budget $8,000–$15,000 for replacement.',
        '2026: Add surge protection and consider a service contract to extend life 1–2 years while you plan.',
        '2026–2027: Get three quotes for dual-fuel heat pump (heat pump primary + gas backup for DFW freezes).',
        '2027+: Replace proactively before failure — emergency replacements in DFW summer cost 15–30% more.',
      ],
      futureProof: 'Dual-fuel is the optimal DFW transition technology — heat pump efficiency 90% of the year, gas backup for winter events.',
    },
  },
  {
    label: '1970s–1980s Home, Original Ductwork',
    icon: '🏚️',
    plan: {
      currentAge: '40–50+ years',
      replacementWindow: 'Immediate or within 2 years',
      dominantTech: 'New system + full duct replacement or mini-split hybrid',
      steps: [
        'Immediate: Get a duct leakage test. 1970s–1980s ductwork typically leaks 30–40% — this is your biggest efficiency problem.',
        '2026: Budget $18,000–$30,000 for full system + duct replacement. This is not optional — new equipment on bad ducts underperforms by 40%.',
        'Consider mini-split addition for master bedroom/main living to reduce load on central system.',
        '2027+: After ductwork is right, consider heat pump conversion with federal tax credits (up to $2,000 credit).',
      ],
      futureProof: 'Ductwork is your primary constraint. Fix it first. Everything else builds on that foundation.',
    },
  },
  {
    label: 'Large DFW Home (3,500+ sq ft)',
    icon: '🏰',
    plan: {
      currentAge: 'Varies',
      replacementWindow: 'Zoned system design is the priority',
      dominantTech: 'Multi-zone variable refrigerant flow (VRF) or dual-system setup',
      steps: [
        'Audit current zone arrangement — large homes should not run one system for all areas.',
        'Evaluate two-system setup: one for upstairs, one for downstairs. Independent control reduces wear.',
        'If budget allows: VRF system provides room-level control and 30–40% energy reduction vs. single system.',
        'Solar is highly cost-effective at this scale — a 3,500+ sq ft DFW home uses $350–600/mo in summer electricity.',
      ],
      futureProof: 'Zoning + solar + battery is the DFW large-home formula. VRF is the professional standard for this use case.',
    },
  },
];

export default function DFWHVACLongTermPlan() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = scenarios.find((s) => s.label === selected) ?? null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>ProLnk · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>DFW HVAC Long-Term Planning Guide</h1>
        <p style={{ color: '#9AA3B2', fontSize: 15, margin: '0 0 32px', lineHeight: 1.6 }}>
          Select your home type to get a personalized 10-year DFW HVAC plan — when to replace, what technology to adopt, and how to future-proof.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {scenarios.map((s) => (
            <button
              key={s.label}
              onClick={() => setSelected(selected === s.label ? null : s.label)}
              style={{
                background: selected === s.label ? '#132040' : '#0F1E35',
                border: `1.5px solid ${selected === s.label ? '#F5E642' : '#1E2D45'}`,
                borderRadius: 10,
                padding: '14px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 26 }}>{s.icon}</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#132040', border: '1.5px solid #F5E642', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>{active.label}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#0F1E35', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: '#9AA3B2', fontSize: 12, marginBottom: 4 }}>CURRENT SYSTEM AGE</div>
                <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{active.plan.currentAge}</div>
              </div>
              <div style={{ background: '#0F1E35', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: '#9AA3B2', fontSize: 12, marginBottom: 4 }}>REPLACEMENT WINDOW</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{active.plan.replacementWindow}</div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔮 Dominant Technology 2030–2035</div>
              <div style={{ color: '#C8CDD8', fontSize: 14 }}>{active.plan.dominantTech}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📅 10-Year Action Plan</div>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {active.plan.steps.map((step, i) => (
                  <li key={i} style={{ color: '#C8CDD8', lineHeight: 1.7, marginBottom: 8, fontSize: 14 }}>{step}</li>
                ))}
              </ol>
            </div>

            <div style={{ background: '#0F1E35', borderRadius: 8, padding: '14px 18px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🛡️ Future-Proof Strategy</div>
              <div style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.6 }}>{active.plan.futureProof}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}