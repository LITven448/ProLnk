import { useState } from 'react';

const homeProfiles = [
  { label: 'Built before 2000, original HVAC', age: 'old', size: 'any' },
  { label: 'Built 2000–2015, last replaced 10+ years ago', age: 'mid', size: 'any' },
  { label: 'Built 2015+, system under 10 years old', age: 'new', size: 'any' },
  { label: 'Over 3,000 sq ft home', age: 'any', size: 'large' },
];

const priorities: Record<string, string[]> = {
  old: [
    '🔴 R-22 refrigerant is gone — if your system leaks, replacement is the only option',
    '🔴 R-410A phase-out means repair costs rising fast for 2010–2014 systems',
    '🟡 Pre-cool scheduling critical: set 72°F by 6am before ERCOT peak demand kicks in',
    '🟡 Request a full system health check before June — DFW techs book solid by mid-May',
    '🟢 Attic insulation upgrade can cut cooling load 15–20% — worth doing this spring',
  ],
  mid: [
    '🔴 R-410A phase-out: stock parts may be scarce by late summer 2026 — get a check-up now',
    '🟡 ERCOT 4CP events expected July–August: avoid running extra loads 3–7pm weekdays',
    '🟡 Capacitor and contactor failure rates spike in year 10–12 — pre-replace proactively',
    '🟢 Oncor and CoServ rebates up to $600 for smart thermostats — apply before July 1',
    '🟢 Change to MERV-11 filters now; DFW pollen peaks April–May and clogs coils fast',
  ],
  new: [
    '🟡 Register your warranty if you haven\’t — some manufacturers require it within 90 days',
    '🟡 ERCOT demand response programs may earn you bill credits — enroll your smart thermostat',
    '🟢 Set cooling schedule: 78°F when away, 74°F by 4pm before you arrive home',
    '🟢 Clean condensate drain line now — DFW humidity causes algae clogs every summer',
    '🟢 Document model/serial numbers in your Home Health Vault for quick service calls',
  ],
  large: [
    '🔴 Multi-zone systems: verify each zone damper is functioning before heat arrives',
    '🟡 Two-stage or variable-speed compressors save 30–40% vs single-stage in DFW summers',
    '🟡 Large homes need more frequent filter changes — every 30 days minimum in summer',
    '🟢 Zoning imbalances common in 3,000+ sq ft — ask tech to check static pressure',
    '🟢 Consider adding a mini-split to the hottest room for targeted relief',
  ],
};

export default function DFWHVACDFWSummer2026Guide() {
  const [selected, setSelected] = useState<string | null>(null);

  const getPriorities = () => {
    if (!selected) return [];
    if (selected === 'large') return priorities.large;
    return priorities[selected] || [];
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK • DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>DFW Summer 2026<br />HVAC Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Record heat forecasts. ERCOT grid stress. R-410A phase-out. 2026 is a pivotal year for DFW homeowners. Here's what you need to know before the temperature hits 105°F.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>☀️ 2026 Heat Forecast</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            NOAA projects DFW to see 35+ days above 100°F in summer 2026 — up from 22 days in 2023. ERCOT has warned of tighter grid margins July 15–August 20. Pre-season prep is not optional.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>❄️ R-410A Phase-Out Reality</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            The EPA banned R-410A production in 2025. Existing stockpiles are being depleted. By late summer 2026, repair costs for systems using R-410A may be 2–3x normal. If your system is 8–14 years old, a refrigerant leak may force a full replacement at the worst possible time.
          </p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🏠 Your Summer 2026 Priorities</h2>
        <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>Select your home profile:</p>

        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {homeProfiles.map((p) => (
            <button
              key={p.age === 'any' ? 'large' : p.age}
              onClick={() => setSelected(p.age === 'any' ? 'large' : p.age)}
              style={{
                background: selected === (p.age === 'any' ? 'large' : p.age) ? '#F5E642' : '#1E3A5F',
                color: selected === (p.age === 'any' ? 'large' : p.age) ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px', textAlign: 'left',
                cursor: 'pointer', fontSize: 14, fontWeight: 600,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Your Summer 2026 Action List</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {getPriorities().map((item, i) => (
                <li key={i} style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get DFW HVAC Help Before the Heat</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with pre-vetted DFW HVAC pros — free quotes, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
