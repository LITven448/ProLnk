import { useState } from 'react';

const vintages = [
  {
    era: 'Pre-1960',
    label: 'Before 1960',
    icon: '🏚️',
    description: 'Homes designed before central AC existed — window units were the norm, then central systems were retrofitted into spaces never intended for ductwork.',
    ductwork: 'Often gravity furnace converted to forced air; extremely undersized trunk lines; many rooms lack return air; supply registers in floor chases',
    electrical: 'Knob-and-tube wiring common — HVAC upgrades require panel inspection; some insurers refuse coverage until updated',
    materials: 'Lead paint in wall cavities where duct penetrations are cut; asbestos duct wrap on older metal ducts and furnace plenums',
    priorities: [
      'Get asbestos and lead paint assessment before any duct work',
      'Electrical panel evaluation — 60-amp service cannot support modern AC',
      'Air sealing of attic bypasses (major energy loss in pre-1960 homes)',
      'Consider mini-split systems to avoid disturbing original hazardous materials',
    ],
    cost: '$12,000–22,000 typical full remediation + system replacement',
    accent: '#ef4444',
  },
  {
    era: '1960s',
    label: '1960–1969',
    icon: '🏠',
    description: 'Early central AC era — original systems designed for the smaller equipment of the time. Ducts sized for 1.5–2 ton systems now running 3–4 ton units.',
    ductwork: 'Metal trunk-and-branch, undersized for modern loads; high static pressure causing noise and premature equipment failure; flex duct extensions added over decades',
    electrical: '100-amp panels becoming more common but still marginal; aluminum wiring in some homes (requires anti-oxidant treatment at connections)',
    materials: 'Asbestos less common than pre-1960 but still present in some duct wrap; fiberglass duct lining degraded to dust',
    priorities: [
      'Static pressure test — values above 0.5″ WC indicate duct restriction',
      'Duct leakage test — 1960s homes average 30–40% duct leakage to unconditioned attic',
      'Verify panel capacity before adding variable-speed equipment',
      'Consider trunk line replacement vs. patch-and-go economics',
    ],
    cost: '$6,000–14,000 duct replacement; $8,000–12,000 system replacement',
    accent: '#f59e0b',
  },
  {
    era: '1970s',
    label: '1970–1979',
    icon: '🏡',
    description: 'Energy crisis era — homes built with minimal insulation (R-11 walls, R-19 attics) that were not upgraded as building codes improved. Foundation issues common.',
    ductwork: 'Metal trunk-and-branch common; flex duct emerging; duct connections at registers often loose or disconnected in attic; foundation movement cracks duct connections',
    electrical: '100–150 amp panels standard; generally adequate but aging; GFCI protection typically missing',
    materials: 'Fiberglass batts degraded; blown insulation may be degraded cellulose; vermiculite insulation in some attics (asbestos risk)',
    priorities: [
      'Attic insulation upgrade to R-38+ before system replacement',
      'Duct connection inspection — foundation movement disconnects flex duct from plenums',
      'Check for vermiculite in attic before disturbing insulation',
      'Air sealing before insulation adds — sealing multiplies insulation value',
    ],
    cost: '$3,000–6,000 insulation upgrade; $7,000–11,000 system replacement',
    accent: '#a855f7',
  },
  {
    era: '1980s',
    label: '1980–1989',
    icon: '🏘️',
    description: 'Better insulated than 1970s but still below modern standards. Original HVAC systems reaching end of life — many still on R-22 refrigerant.',
    ductwork: 'Flex duct widely used; improper installation common (kinks, sags, long runs); return air often undersized for upgraded equipment',
    electrical: '150–200 amp panels standard; generally adequate for modern HVAC; some double-tapped breakers found',
    materials: 'Intact fiberglass insulation but below modern R-values; no significant hazmat concerns in most cases',
    priorities: [
      'R-22 refrigerant phase-out — any system over 12 years old likely needs replacement',
      'Flex duct audit — straighten, re-insulate, and reseal before new system install',
      'Return air sizing — verify returns can handle higher-efficiency variable-speed equipment airflow',
      'Programmable/smart thermostat installation if not already present',
    ],
    cost: '$5,500–9,000 system replacement with minor duct upgrades',
    accent: '#22c55e',
  },
];

export default function DFWHVACOlderHomeGuide() {
  const [selected, setSelected] = useState(vintages[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏚️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>HVAC in Older DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Homes built before 1990 have unique HVAC challenges. Select your home's era to understand specific considerations and priorities.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {vintages.map(v => (
            <button
              key={v.era}
              onClick={() => setSelected(v)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: `2px solid ${selected.era === v.era ? '#F5E642' : '#1e3a5f'}`,
                background: selected.era === v.era ? '#F5E642′ : '#0d2137',
                color: selected.era === v.era ? '#0A1628′ : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
              }}
            >
              {v.icon} {v.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 28, border: `2px solid ${selected.accent}`, marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{selected.icon} {selected.label} Homes</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{selected.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>🌬️ Ductwork Reality</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{selected.ductwork}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>⚡ Electrical Concerns</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{selected.electrical}</p>
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 16 }}>
            <p style={{ color: '#ef4444', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>⚠️ Hazardous Materials</p>
            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{selected.materials}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>✅ Priority Actions</p>
            {selected.priorities.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: selected.accent, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{p}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: `4px solid #F5E642` }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>💰 Typical Cost Range</p>
            <p style={{ color: '#cbd5e1', fontSize: 14 }}>{selected.cost}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0d2137', borderRadius: 12, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get an older-home HVAC assessment from a DFW specialist</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Book Older Home Assessment
          </button>
        </div>
      </div>
    </div>
  );
}