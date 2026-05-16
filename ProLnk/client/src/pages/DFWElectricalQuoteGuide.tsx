import { useState } from 'react';

const projectTypes = [
  {
    type: 'Panel Upgrade (100A to 200A)',
    components: ['New panel brand + amperage + breaker count specified', 'Permit pulled by licensed electrician (not homeowner)', 'City inspection included and scheduled', 'Load calculation to confirm 200A is sufficient', 'Breaker brand: Square D, Siemens, or Eaton (not off-brand)', 'Ground rod replacement if needed', 'Disconnect switch for meter base if required by ONCOR', 'AFCI/GFCI breakers where code requires'],
    verify: ['Ask for TECL license number — verify at tdlr.texas.gov', 'Confirm ONCOR coordination is included (required for DFW)', 'Get copy of permit + inspection report after completion'],
    redFlags: ['Homeowner pulls permit', 'No mention of ONCOR coordination', 'Zinsco or Federal Pacific panel offered as option', 'No load calculation — just "you need 200A"'],
    range: '$2,800–$5,500',
  },
  {
    type: 'EV Charger Installation (Level 2)',
    components: ['Dedicated 240V/50A circuit specified', 'Wire gauge: 6 AWG minimum', 'NEMA 14-50 outlet or hardwired EVSE option', 'Conduit routing path documented', 'Panel capacity assessment included', 'Permit pulled by electrician (required in all DFW cities)', 'GFCI protection at outlet per NEC 2023'],
    verify: ['Confirm panel has capacity for 50A breaker', 'Ask if conduit is included or exposed wire', 'Verify charger brand compatibility with your EV'],
    redFlags: ['No permit', '10 AWG wire quoted (undersized for 50A)', 'No panel assessment included', 'Same-day install without assessment'],
    range: '$800–$2,200',
  },
  {
    type: 'Whole-House Rewire',
    components: ['Wire gauge per circuit type specified (12 AWG for 20A, 14 AWG for 15A)', 'AFCI breakers throughout per NEC 2023', 'GFCI in all wet areas specified', 'Smoke + CO detector placement included', 'Attic and wall access restoration plan', 'Permits for all circuits — DFW requires', 'Final inspection by AHJ (authority having jurisdiction)', 'Itemized circuit count in quote'],
    verify: ['Ask for circuit-by-circuit breakdown', 'Confirm wall patching is included or excluded', 'Verify final inspection timeline'],
    redFlags: ['Lump-sum with no circuit count', 'No AFCI mention', 'Patching excluded without clear itemization', 'No permit for "minor" work'],
    range: '$8,000–$25,000',
  },
  {
    type: 'Outlet / Switch / Fixture Install',
    components: ['Permit required if adding new circuit', 'Wire gauge confirmed for circuit amperage', 'Box fill calculation (overcrowded boxes = fire risk)', 'GFCI outlet if within 6 feet of water', 'Fixture wattage vs circuit amperage compatibility', 'Work area patching included?'],
    verify: ['If new circuit needed — permit required no matter how small', 'Ask if work will be inspected or just done', 'Confirm box size for multiple wires'],
    redFlags: ['No permit for new circuit', 'No mention of box fill', 'Aluminum wire in older home not addressed'],
    range: '$150–$800 per outlet/fixture',
  },
];

export default function DFWElectricalQuoteGuide() {
  const [projectType, setProjectType] = useState('');

  const selected = projectTypes.find(p => p.type === projectType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>
          ⚡ DFW ELECTRICAL GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
          Electrical Quote Comparison Guide for DFW
        </h1>
        <p style={{ color: '#9BA8B8', fontSize: 16, marginBottom: 36 }}>
          What every DFW electrical quote must include, common upsell tactics to watch for, and how to verify your contractor is actually licensed.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔑 Universal DFW Electrical Quote Rules</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li><strong style={{ color: '#E8ECF0' }}>TECL license required</strong> — Texas Electrical Contractor License. Verify at tdlr.texas.gov before any work begins.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Permit pulled by contractor</strong> — if the contractor suggests you pull it as homeowner, walk away. DFW cities do not allow homeowner electrical permits on non-owner-occupied work.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Wire gauge must be specified</strong> — "14-gauge wire" vs "12-gauge wire" is the difference between a 15A and 20A circuit. It must be in writing.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Breaker brand matters</strong> — Square D, Siemens, and Eaton are code-compliant. Off-brand breakers void insurance and cause fires.</li>
          <li><strong style={{ color: '#E8ECF0' }}>Inspection included</strong> — final inspection by the city is required for permitted work. Any contractor who skips it is leaving you with unpermitted work.</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚩 Common DFW Electrical Upsell Tactics</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>"Your whole panel needs replacement" — get a second opinion before any panel quote over $1,500</li>
          <li>"Aluminum wiring needs full replacement" — often true, but get scope in writing; remediation (COPALUM connectors) may be sufficient</li>
          <li>"Code upgrade requires whole-house rewire" — partial rewires are often code-compliant; get specifics</li>
          <li>"That outlet is dangerous, need to replace everything" — one GFCI replacement is $100, not $2,000</li>
          <li>Surge protector whole-home upsells — can be legitimate, but verify the brand and spec</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Interactive: Project Type</h2>
        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>PROJECT TYPE</label>
            <select value={projectType} onChange={e => setProjectType(e.target.value)}
              style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
              <option value=''>Select project type...</option>
              {projectTypes.map(p => <option key={p.type} value={p.type}>{p.type}</option>)}
            </select>
          </div>
          {selected && (
            <>
              <div style={{ marginBottom: 12, padding: 12, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: 13, color: '#4CAF50', fontWeight: 700 }}>DFW market range: {selected.range}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>PROPER QUOTE COMPONENTS</div>
                {selected.components.map(item => (
                  <div key={item} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>✓ {item}</div>
                ))}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>WHAT TO VERIFY INDEPENDENTLY</div>
                {selected.verify.map(item => (
                  <div key={item} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>🔎 {item}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#FF6B6B', fontWeight: 700, marginBottom: 8 }}>RED FLAGS</div>
                {selected.redFlags.map(flag => (
                  <div key={flag} style={{ fontSize: 13, color: '#FF8080', marginBottom: 4 }}>⚠ {flag}</div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>💡 ProLnk Tip</div>
          <div style={{ fontSize: 14 }}>Every electrician on ProLnk has verified TECL license, pulls permits as standard, and uses code-compliant breakers. License numbers displayed on every profile.</div>
        </div>
      </div>
    </div>
  );
}
