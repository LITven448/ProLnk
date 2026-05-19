import { useState } from 'react';

const trades = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Foundation', 'General'];

const terms: Record<string, { term: string; def: string; tip: string }[]> = {
  HVAC: [
    { term: 'Manual J', def: 'ACCA-standard load calculation determining correct HVAC system size for a home.', tip: 'Always demand a Manual J before any DFW HVAC replacement — oversizing is rampant.' },
    { term: 'Load Calculation', def: 'Engineering process to determine heating and cooling requirements based on home size, insulation, and climate.', tip: 'DFW\’s extreme summers (100°F+) and mild winters require precise calculations for efficiency.' },
    { term: 'Commissioning', def: 'The process of verifying a newly installed HVAC system operates per design specifications.', tip: 'Requires refrigerant charge verification and airflow testing — insist on this after any DFW install.' },
    { term: 'SEER2', def: 'Updated efficiency metric (2023+) for cooling equipment; replaced SEER.', tip: 'Texas minimum for new installs is SEER2 14.3; higher ratings save on Oncor summer bills.' },
    { term: 'Refrigerant Charge', def: 'The precise amount of refrigerant in an HVAC system required for efficient operation.', tip: 'Low charge is the #1 cause of AC failure in DFW summers — verify annually.' },
  ],
  Plumbing: [
    { term: 'Rough-In', def: 'The installation of pipes and drain lines before walls are closed up.', tip: 'DFW slab homes have plumbing run through concrete — rough-in changes are expensive re-routes.' },
    { term: 'P-Trap', def: 'A curved pipe section that holds water to prevent sewer gases from entering the home.', tip: 'Dry P-traps in guest baths are common in vacant DFW homes — run water monthly.' },
    { term: 'Hydrostatic Test', def: 'A test using water pressure to check for leaks in underground plumbing.', tip: 'Essential before buying any DFW slab home — cast iron pipes in 1970s–1990s homes often fail.' },
    { term: 'Expansion Tank', def: 'A small tank that absorbs excess pressure in a closed water heating system.', tip: 'Required by DFW code for water heaters in closed systems with PRVs — many homes are missing them.' },
    { term: 'PRV (Pressure Reducing Valve)', def: 'A valve that reduces incoming water pressure to a safe level for home plumbing.', tip: 'DFW water pressure often runs 80–100 PSI; PRVs protect fixtures and appliances.' },
  ],
  Electrical: [
    { term: 'AFCI (Arc Fault Circuit Interrupter)', def: 'A circuit breaker that detects dangerous arc faults and shuts off power.', tip: 'Required by NEC 2023 in DFW for all bedroom circuits; older panels often lack them.' },
    { term: 'GFCI (Ground Fault Circuit Interrupter)', def: 'An outlet or breaker that shuts off power when it detects current leaking to ground.', tip: 'Required in DFW kitchens, baths, garages, and outdoors; test monthly with test button.' },
    { term: 'Load Center', def: 'The main electrical panel that distributes power throughout the home via circuit breakers.', tip: 'Federal Pacific and Zinsco panels in older DFW homes are fire hazards — replace immediately.' },
    { term: 'Service Entrance', def: 'The point where utility power enters the home, including the meter and main disconnect.', tip: 'Oncor handles the meter; homeowner owns everything from the meter to the panel.' },
    { term: 'Bonding', def: 'Connecting metal components to ensure they share the same electrical potential, preventing shock.', tip: 'Required for all DFW pools and gas piping — frequently missed on older custom homes.' },
  ],
  Roofing: [
    { term: 'Drip Edge', def: 'Metal flashing installed at roof edges to direct water away from fascia.', tip: 'Missing drip edge causes fascia rot — extremely common on DFW homes after hail damage repairs.' },
    { term: 'Decking (Sheathing)', def: 'The wood panels (typically OSB or plywood) nailed to roof rafters as the base layer.', tip: 'Hail damage often requires decking replacement in DFW — inspect before reroofing.' },
    { term: 'Ice and Water Shield', def: 'A waterproof membrane applied to vulnerable roof areas before shingles.', tip: 'Required in DFW in valleys and eaves; prevents leaks from wind-driven rain and rare ice events.' },
    { term: 'Soffit', def: 'The underside of the roof overhang connecting the exterior wall to the roofline.', tip: 'Soffit vents provide attic airflow critical in DFW summers — ensure they\’re not blocked by insulation.' },
    { term: 'Fascia', def: 'The horizontal board running along the lower edge of the roof, supporting the gutters.', tip: 'Wood fascia rots quickly in DFW weather; fiber cement or aluminum-wrapped is the better choice.' },
  ],
  Foundation: [
    { term: 'Pier and Beam', def: 'A foundation using concrete or steel piers supporting wood beams and floor joists.', tip: 'Common in pre-1960s DFW homes; allows under-house access but needs regular beam inspections.' },
    { term: 'Post-Tension Slab', def: 'A concrete slab with tensioned steel cables for strength on expansive soils.', tip: 'Never cut or core a DFW post-tension slab without an engineer — cable locations must be verified.' },
    { term: 'Efflorescence', def: 'White mineral deposits on concrete or masonry caused by water moving through the material.', tip: 'Indicates water intrusion on DFW foundation walls; inspect drainage and grading first.' },
    { term: 'Helical Pier', def: 'A steel screw-type pier driven into stable soil to support and lift a settling foundation.', tip: 'Standard DFW foundation repair method; cost $1,200–2,000 per pier installed.' },
    { term: 'Differential Settlement', def: 'Uneven sinking of different parts of a foundation, causing cracks and structural issues.', tip: 'DFW expansive clay soil makes this the #1 foundation issue; monitor seasonal door/window sticking.' },
  ],
  General: [
    { term: 'Change Order', def: 'A written amendment to a construction contract modifying scope, cost, or schedule.', tip: 'Always get change orders in writing in DFW — verbal agreements are legally unenforceable.' },
    { term: 'Lien Waiver', def: 'A document from a contractor or supplier releasing their right to file a mechanics lien.', tip: 'Collect from every DFW sub-contractor and material supplier before final payment.' },
    { term: 'Punch List', def: 'A final list of incomplete or deficient items a contractor must address before final payment.', tip: 'Walk your DFW new build with a licensed inspector for the punch list — builders miss things.' },
    { term: 'Tuckpointing', def: 'Replacing deteriorated mortar in brick joints with fresh mortar.', tip: 'DFW clay soil movement cracks mortar joints; inspect brick homes every 5–7 years.' },
    { term: 'Rafter vs Truss', def: 'Rafters are individual cut lumber pieces; trusses are engineered pre-built triangular assemblies.', tip: 'Most DFW homes built after 1980 use trusses — never cut a truss without an engineer\’s approval.' },
  ],
};

export default function DFWTradeGlossaryGuide() {
  const [activeTrade, setActiveTrade] = useState('HVAC');

  const tradeEmojis: Record<string, string> = { HVAC: '❄️', Plumbing: '🔧', Electrical: '⚡', Roofing: '🏠', Foundation: '🏗️', General: '🔨' };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Trade Glossary</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>30 trade terms homeowners encounter — by trade category</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {trades.map(trade => (
            <button
              key={trade}
              onClick={() => setActiveTrade(trade)}
              style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: activeTrade === trade ? '#F5E642' : '#1E3A5F', color: activeTrade === trade ? '#0A1628' : '#fff' }}
            >
              {tradeEmojis[trade]} {trade}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(terms[activeTrade] || []).map((t, i) => (
            <div key={i} style={{ background: '#0D2137', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{t.term}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{t.def}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{t.tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
