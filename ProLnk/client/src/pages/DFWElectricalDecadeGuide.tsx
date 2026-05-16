import { useState } from 'react';

const decades = [
  {
    label: '1960s–1970s',
    range: '1960s–1970s',
    status: '🔴 Critical Risk',
    issues: 'Aluminum branch wiring and/or Zinsco/Federal Pacific panels — known fire hazards',
    inspect: [
      'Panel brand: Zinsco or GTE-Sylvania = replace immediately',
      'Federal Pacific Electric (FPE) Stab-Lok = replace immediately',
      'Aluminum branch circuit wiring at outlets, switches, fixtures',
      'Two-prong ungrounded outlets throughout',
      'No GFCI protection in wet areas',
      'Knob-and-tube wiring in attic or walls (pre-1960 overlap)',
    ],
    urgency: '🚨 URGENT — Do not delay. These panels have documented failure-to-trip rates and fire risks.',
    budget: '$4,500–$12,000 for panel replacement + aluminum wiring remediation (CO/ALR devices or rewire)',
    note: 'Aluminum wiring is not a code violation itself but requires proper terminations. Full copper rewire is the gold standard. CO/ALR devices are an accepted remediation. Get a licensed electrician — not a handyman.',
  },
  {
    label: '1980s',
    range: '1980s',
    status: '🟠 High Risk',
    issues: 'Federal Pacific Electric (FPE) Stab-Lok panels peaked in this era — still common in DFW stock',
    inspect: [
      'Panel brand — FPE Stab-Lok breakers are red-flagged by inspectors nationwide',
      'Double-tapped breakers (two wires in one slot)',
      'Outdated 60–100A service capacity for modern loads',
      'Missing GFCI protection in kitchen, bath, garage, exterior',
      'No AFCI protection on bedroom circuits',
    ],
    urgency: 'Inspect before purchase or refinance. Replace FPE panel before move-in.',
    budget: '$2,500–$6,500 for panel replacement; $800–$2,000 for GFCI/AFCI upgrades',
    note: 'If seller discloses FPE panel, use it as a negotiation lever. Replacement cost is well-documented and insurers often refuse to cover FPE homes.',
  },
  {
    label: '1990s',
    range: '1990s',
    status: '🟡 Moderate Risk',
    issues: 'Generally copper wiring with Square D or Eaton panels — more reliable, but aging',
    inspect: [
      'Service capacity: 100A may be undersized for EV charger or modern HVAC loads',
      'GFCI protection completeness in wet areas',
      'Panel breaker condition — any tripping issues or heat marks',
      'Smoke detector placement and type (CO+smoke combo)',
      'Bathroom exhaust fan function',
    ],
    urgency: 'Inspect within first year of ownership. Likely fine but capacity planning important.',
    budget: '$500–$2,500 for upgrades; $3,000–$5,000 if panel upgrade needed',
    note: 'Many 1990s homes have 100A service. Adding EV chargers, hot tubs, or upgraded HVAC may require 200A upgrade.',
  },
  {
    label: '2000s–2010s',
    range: '2000s–2010s',
    status: '🟢 Lower Risk',
    issues: 'Modern copper wiring, 200A service common, AFCI gaps possible on older 2000s builds',
    inspect: [
      'AFCI breakers on bedroom circuits (required by NEC 2002+, enforced variably in TX)',
      'GFCI completeness — exterior, garage, crawl spaces',
      'Panel capacity for future EV or solar additions',
      'Smoke/CO detector currency and placement',
    ],
    urgency: 'Routine check at purchase. Focus on AFCI and capacity for future loads.',
    budget: '$300–$1,500 for AFCI/GFCI completion; panel upgrade $2,500–$4,500 if needed',
    note: 'Texas adopted NEC 2002 AFCI requirements but enforcement varied by city and inspector. Verify bedroom circuits.',
  },
  {
    label: '2020s',
    range: '2020s',
    status: '✅ Modern Standard',
    issues: 'Should be solar-ready, EV-ready, and fully AFCI/GFCI compliant — verify as-built',
    inspect: [
      'Solar conduit stub-out and panel capacity for future PV',
      'EV-ready outlet in garage (240V/50A)',
      'Smart panel compatibility (Span, Schneider, etc.)',
      'As-built electrical drawings vs. actual install',
    ],
    urgency: 'Verify as-built at closing. Focus on future-readiness, not safety.',
    budget: '$0–$1,000 for minor additions; $1,500–$3,500 for EV charger or solar-ready upgrades',
    note: 'Modern homes often have 200A+ service. Confirm panel manufacturer and warranty.',
  },
];

export default function DFWElectricalDecadeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? decades[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>⚡ DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Electrical by Decade Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>Select your home's decade to see the most likely electrical risks, what to inspect, and urgency level.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {decades.map((d, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, background: selected === i ? '#F5E642' : '#0F2645', color: selected === i ? '#0A1628' : '#E8EAF0', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
              {d.label}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: '#0F2645', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{active.range} Homes</div>
            <div style={{ fontSize: 18, marginBottom: 16 }}>{active.status}</div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Primary Issues: </span>{active.issues}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔍 What to Inspect:</div>
              {active.inspect.map((item, i) => <div key={i} style={{ marginBottom: 4, paddingLeft: 12 }}>• {item}</div>)}
            </div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Budget Estimate: </span>{active.budget}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 14, color: '#94A3B8' }}>{active.note}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{active.urgency}</div>
          </div>
        )}
        {!active && <div style={{ color: '#4A6080', textAlign: 'center', padding: 40, fontSize: 16 }}>👆 Select a decade above to see your electrical profile</div>}
      </div>
    </div>
  );
}
