import { useState } from 'react';

const decades = [
  {
    label: '1960s–1970s',
    range: '1960s–1970s',
    status: '🔴 Replace Now',
    situation: 'Many homes had no central AC, or early window units only. If original HVAC exists, it is decades past end of life.',
    timeline: 'Replace immediately — likely already failed or failing',
    inspect: [
      'Confirm if central AC even exists (some were added later)',
      'Ductwork material: asbestos wrap on older duct insulation is possible',
      'Attic ductwork condition — likely disconnected or deteriorated',
      'Any original equipment with R-22 refrigerant (illegal to recharge after 2020)',
      'Thermostat and zoning capability',
    ],
    budget: '$6,500–$15,000 for full system replacement + ductwork',
    dfw: 'DFW heat makes central AC non-optional. Lack of AC is a major habitability and resale issue.',
    note: 'Asbestos-wrapped ductwork must be tested before disturbance. Budget $2,000–$6,000 for abatement if ACM confirmed.',
  },
  {
    label: '1980s',
    range: '1980s',
    status: '🟠 Replace Soon',
    situation: 'R-22 refrigerant systems — R-22 phase-out is complete. Systems cannot be recharged legally. At or past end of life.',
    timeline: 'Replace within 1–2 years. Any refrigerant leak = total system replacement.',
    inspect: [
      'Refrigerant type on equipment nameplate: R-22 = end of life',
      'System age on nameplate (format: week/year in serial number)',
      'Ductwork integrity — 40-year ducts likely leaking 20–30% conditioned air',
      'Condensate drain line condition',
      'Attic insulation levels (affects load on aging system)',
    ],
    budget: '$5,500–$12,000 for system replacement; $2,000–$5,000 for ductwork',
    dfw: 'In DFW, an undersized or R-22 system running in 100°F+ summers will fail at the worst time.',
    note: 'Budget for ductwork replacement alongside system — running new efficient equipment through degraded ducts wastes efficiency gains.',
  },
  {
    label: '1990s',
    range: '1990s',
    status: '🟡 Planning Window',
    situation: 'First-generation R-410A systems or late R-22. 25–35 year old systems at or past expected life.',
    timeline: 'Plan replacement within 2–5 years. Budget now.',
    inspect: [
      'System age and refrigerant type',
      'SEER rating (older systems: 8–10 SEER vs. modern 16–20 SEER)',
      'Capacitor, contactor, and coil condition',
      'Ductwork leakage and insulation R-value',
      'Attic insulation adequacy — R-38 recommended for DFW',
    ],
    budget: '$4,500–$10,000 for system; $0–$4,000 for ductwork depending on condition',
    dfw: 'A 1990s system in DFW has likely been running 2,500–3,000 hours/year. Age tells the story.',
    note: 'If the system is still running well, invest in maintenance: new capacitor, coil cleaning, duct sealing. Delay replacement while budgeting.',
  },
  {
    label: '2000s',
    range: '2000s',
    status: '🟡 Mid-Cycle Watch',
    situation: 'R-410A systems, 15–25 years old — approaching end of typical 15–20 year life in DFW conditions',
    timeline: 'Inspect annually. Replace at first major failure (compressor, coil) rather than repair.',
    inspect: [
      'Compressor amp draw and refrigerant charge',
      'Evaporator coil for mold or corrosion',
      'SEER rating vs. modern equivalents (upgrade economics)',
      'Thermostat — upgrade to smart thermostat if basic',
      'Return air configuration and filter sizing',
    ],
    budget: '$3,500–$9,000 for system replacement when needed',
    dfw: 'The "repair vs. replace" threshold: if repair > $1,500 and system is >15 years old, replace.',
    note: 'DFW\’s extreme heat shortens HVAC life vs. national averages. Expect 15–18 year lifespan for most residential equipment.',
  },
  {
    label: '2010s',
    range: '2010s',
    status: '🟢 Monitor Mode',
    situation: 'R-410A systems, 10–15 years old — approaching midpoint or second half of expected life',
    timeline: 'Annual maintenance. Watch for signs of wear. Budget for replacement in 5–10 years.',
    inspect: [
      'Annual refrigerant check and coil cleaning',
      'Capacitor and contactor condition (common failure points)',
      'SEER efficiency vs. rebate-eligible upgrades',
      'Smart thermostat and zoning opportunities',
      'Air quality: UV lights, media filters, HEPA options',
    ],
    budget: '$300–$600/year maintenance; $3,500–$8,000 for eventual replacement',
    dfw: 'A well-maintained 2010s system should carry DFW homeowners to the mid-2020s reliably.',
    note: 'Note: R-410A is also being phased out (R-454B replacing it). Systems installed after 2025 will use new refrigerant.',
  },
  {
    label: '2020s',
    range: '2020s',
    status: '✅ New System',
    situation: 'Modern high-efficiency systems — R-454B or R-410A depending on install date',
    timeline: 'Minimal action needed for 10–15 years with proper maintenance.',
    inspect: [
      'Manufacturer warranty registration (5-year parts, 10-year compressor typical)',
      'Extended labor warranty purchase window',
      'Smart thermostat integration',
      'Air quality accessories: UV, filtration',
      'Refrigerant type and future serviceability',
    ],
    budget: '$200–$400/year for maintenance plan',
    dfw: 'New system buyers: ask about variable speed compressors and multi-stage units for DFW humidity control.',
    note: 'Verify SEER2 rating (new testing standard). 15 SEER2 is minimum for new installs in Texas.',
  },
];

export default function DFWHVACDecadeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? decades[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>❄️ DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW HVAC by Decade Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>Select your home's decade to see the likely HVAC situation, replacement timeline, and DFW-specific context.</p>
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
            <div style={{ fontSize: 18, marginBottom: 12 }}>{active.status}</div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Situation: </span>{active.situation}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔍 What to Inspect:</div>
              {active.inspect.map((item, i) => <div key={i} style={{ marginBottom: 4, paddingLeft: 12 }}>• {item}</div>)}
            </div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Budget Estimate: </span>{active.budget}</div>
            <div style={{ background: '#162035', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14, color: '#94A3B8', borderLeft: '3px solid #F5E642' }}>🌡️ DFW Context: {active.dfw}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 14, color: '#94A3B8' }}>{active.note}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>📅 Timeline: {active.timeline}</div>
          </div>
        )}
        {!active && <div style={{ color: '#4A6080', textAlign: 'center', padding: 40, fontSize: 16 }}>👆 Select a decade above to see your HVAC profile</div>}
      </div>
    </div>
  );
}
