import { useState } from 'react';

const decades = [
  {
    label: 'Pre-1960s',
    range: 'Pre-1960',
    status: '🔴 Critical Risk',
    material: 'Galvanized steel pipe — heavily corroded, reduced flow, failing',
    risk: 'Extreme',
    inspect: [
      'Water pressure at multiple fixtures simultaneously',
      'Water color (rust/brown indicates interior corrosion)',
      'Pipe visible in basement/crawl/utility area — check for rust scale',
      'Water heater inlet/outlet condition',
      'Any evidence of prior pinhole leaks or repairs',
    ],
    priority: 'Replace galvanized before purchase or within 1 year of ownership.',
    budget: '$8,000–$20,000 for full repipe (PEX)',
    note: 'Galvanized corrodes from inside out. Visible exterior may look OK while interior is fully scaled. Flow test is critical. Insurance may require replacement for coverage.',
  },
  {
    label: '1960s–1970s',
    range: '1960s–1970s',
    status: '🟠 High Risk',
    material: 'Mix of copper supply lines and galvanized drain lines — galvanized drains aging out',
    risk: 'High',
    inspect: [
      'Drain line material (galvanized vs cast iron vs early PVC)',
      'Copper supply line condition — any green corrosion or prior repairs',
      'Water heater age and anode rod condition',
      'Main shutoff valve operability',
      'Sewer line — camera inspection highly recommended',
    ],
    priority: 'Camera sewer inspection before purchase. Budget for drain line replacement within 5 years.',
    budget: '$4,000–$12,000 for partial or full drain repipe; $6,000–$18,000 for sewer line',
    note: 'Cast iron sewer lines from this era are often in good shape but approaching end of life. Clay tile sewer is also possible — tree root intrusion is common in DFW.',
  },
  {
    label: '1978–1995',
    range: '1978–1995',
    status: '🔴 Critical Risk',
    material: 'Polybutylene (PB) pipe — class-action settlement material, known to fail without warning',
    risk: 'Extreme',
    inspect: [
      'Gray flexible plastic pipe under sinks, at water heater, at main — that is PB',
      'PB marked with "PB2110″ stamp on pipe',
      'Any prior PB leak history or insurance claims',
      'Water meter shutoff for emergency access',
      'Insurance status — many carriers exclude or surcharge PB homes',
    ],
    priority: '🚨 Replace PB immediately. This is non-negotiable for insurability and safety.',
    budget: '$4,000–$10,000 for full PEX repipe (varies by home size)',
    note: 'Polybutylene was used in approximately 6–10 million US homes. DFW has heavy concentration in suburbs built 1978–1995. Many insurance companies will not cover homes with PB without replacement.',
  },
  {
    label: '1990s–2000s',
    range: '1990s–2000s',
    status: '🟡 Moderate Risk',
    material: 'CPVC (cream/beige plastic) supply lines — acceptable but brittle with age in DFW heat',
    risk: 'Moderate',
    inspect: [
      'CPVC brittleness — tap pipes gently, check for hairline cracks',
      'Any prior freeze damage (DFW freeze events 2011, 2021)',
      'Solvent joint condition at fittings',
      'Water heater age (replace at 10–12 years)',
      'Sewer line camera if no records available',
    ],
    priority: 'Inspection within first year. Focus on freeze damage and CPVC joint integrity.',
    budget: '$0–$3,000 for repairs; $4,500–$9,000 for repipe if CPVC broadly failing',
    note: 'CPVC is acceptable but becomes brittle in Texas attic heat and with age. The 2021 freeze caused widespread CPVC failures in DFW. Check for hidden repairs or patched pipes.',
  },
  {
    label: '2000s–Present',
    range: '2000s–Present',
    status: '✅ Good Shape',
    material: 'PEX (cross-linked polyethylene) — flexible, freeze-resistant, modern standard',
    risk: 'Low',
    inspect: [
      'PEX color coding: red=hot, blue=cold, white=either',
      'Manifold location and shutoff valve labeling',
      'Any slab leak history (PEX still possible but rare)',
      'Fitting type: crimped vs. clamp vs. expansion (ProPEX)',
      'Water heater age and efficiency',
    ],
    priority: 'Routine inspection. Focus on water heater age and manifold access.',
    budget: '$0–$2,000 for maintenance and water heater; minimal plumbing risk',
    note: 'PEX is the gold standard. Expansion (ProPEX) fittings are preferred over crimp. Confirm which type was used.',
  },
];

export default function DFWPlumbingDecadeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? decades[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🚿 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Plumbing by Decade Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>Select your home's decade to see the likely pipe material, risk level, and inspection priorities.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {decades.map((d, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, background: selected === i ? '#F5E642′ : '#0F2645', color: selected === i ? '#0A1628' : '#E8EAF0', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
              {d.label}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: '#0F2645', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{active.range} Homes</div>
            <div style={{ fontSize: 18, marginBottom: 12 }}>{active.status}</div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Likely Material: </span>{active.material}</div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Risk Level: </span>{active.risk}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔍 What to Inspect:</div>
              {active.inspect.map((item, i) => <div key={i} style={{ marginBottom: 4, paddingLeft: 12 }}>• {item}</div>)}
            </div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Budget Estimate: </span>{active.budget}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 14, color: '#94A3B8′ }}>{active.note}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{active.priority}</div>
          </div>
        )}
        {!active && <div style={{ color: '#4A6080', textAlign: 'center', padding: 40, fontSize: 16 }}>👆 Select a decade above to see your plumbing profile</div>}
      </div>
    </div>
  );
}
