import { useState } from 'react';

const components = [
  {
    id: 'air-handler',
    label: '🌀 Air Handler',
    what: 'The indoor unit that blows conditioned air through your home. Contains the evaporator coil, blower motor, and air filter.',
    dfwIssue: 'DFW attics hit 140°F+ in summer — air handlers in attics work against extreme heat. Insulation and sealing matter enormously.',
    maintenance: 'Change filters monthly in summer. Have coil cleaned annually. Check blower motor capacitor every 3 years.',
  },
  {
    id: 'outdoor-unit',
    label: '🏠 Outdoor Unit',
    what: 'The condenser unit outside your home. Releases heat from refrigerant to the outside air. Contains compressor, condenser coil, fan motor.',
    dfwIssue: 'DFW hailstorms can flatten condenser fins. Direct west sun exposure raises ambient temps 10-15°F above already brutal 100°F+ days.',
    maintenance: 'Keep 2ft clearance. Clean coils annually. Check refrigerant charge. Inspect after hail.',
  },
  {
    id: 'duct-system',
    label: '🌐 Duct System',
    what: 'The network of supply and return ducts that distributes conditioned air. Flex duct is common in DFW new construction.',
    dfwIssue: 'Attic ducts in DFW can hit 140°F surface temp. Poorly insulated or leaky ducts waste 25-40% of your cooling capacity.',
    maintenance: 'Duct test every 5 years. Seal leaks with mastic not tape. Ensure R-8 or better insulation on attic ducts.',
  },
  {
    id: 'controls',
    label: '🎛️ Controls & Thermostat',
    what: 'The thermostat, wiring, and control board that tell your system when and how to run. Smart thermostats add scheduling and remote control.',
    dfwIssue: 'ERCOT demand response programs can override your thermostat during peak events. Opt-in for bill credits, opt-out if comfort is priority.',
    maintenance: 'Calibrate thermostat annually. Replace batteries. Check wiring connections at air handler control board.',
  },
  {
    id: 'condensate',
    label: '💧 Condensate System',
    what: 'The drain pan and drain line that removes water your system pulls from humid indoor air. Can produce 5-10 gallons per day in DFW summers.',
    dfwIssue: 'DFW humidity means massive condensate volume. Clogged drain lines are the #1 cause of water damage in DFW homes during summer.',
    maintenance: 'Flush drain line monthly with bleach-water mix. Install float switch to auto-shutoff if pan fills. Check pan annually for rust.',
  },
];

export default function DFWHVACSystemMapDFW() {
  const [active, setActive] = useState<string | null>(null);
  const selected = components.find(c => c.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>Complete DFW HVAC System Map</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Click any component to see what it does, the DFW-specific issue, and how to maintain it.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {components.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(active === c.id ? null : c.id)}
              style={{
                background: active === c.id ? '#1a2e4a' : '#0f1f35',
                border: `2px solid ${active === c.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 16,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0f1f35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>{selected.label}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>What It Is</div>
              <p style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{selected.what}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 12, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>⚠️ DFW-Specific Issue</div>
              <p style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{selected.dfwIssue}</p>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#34d399', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>✅ Maintenance</div>
              <p style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{selected.maintenance}</p>
            </div>
          </div>
        )}
        <div style={{ marginTop: '2.5rem', background: '#0f1f35', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔧 ProLnk finds vetted DFW HVAC techs</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Get matched to a specialist who knows your system — no cold calls, no guesswork.</div>
        </div>
      </div>
    </div>
  );
}
