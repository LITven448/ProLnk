import { useState } from 'react';

const components = [
  { id: 'air-handler', label: '🌀 Air Handler', desc: 'The indoor unit that circulates conditioned air through your home. Contains the evaporator coil, blower motor, and heat strips (if electric).' , dfwProblems: 'Frozen coils from low refrigerant, dirty evaporator coil reducing airflow, failed blower capacitor in peak summer heat.', maintenance: 'Change filter monthly in summer, clean evaporator coil annually, check drain pan for algae.' },
  { id: 'condenser', label: '🏗️ Condenser', desc: 'The outdoor unit housing the compressor and condenser coil. Rejects heat from your home to the outside air.', dfwProblems: 'Compressor failure from sustained 100°F+ ambient temps, dirty condenser coil causing high head pressure, refrigerant leaks at service valves.', maintenance: 'Keep 2 ft clearance around unit, rinse coil with garden hose spring/fall, trim vegetation back.' },
  { id: 'thermostat', label: '🌡️ Thermostat', desc: 'The control brain that reads indoor temp and sends signals to the air handler and condenser to run or stop.', dfwProblems: 'Incorrect placement near windows causes short-cycling, low batteries cause erratic behavior, miscalibration after power surges.', maintenance: 'Replace batteries annually, keep away from heat sources, calibrate with accurate thermometer.' },
  { id: 'filter', label: '🔲 Air Filter', desc: 'Captures dust, pollen, and debris before air enters the air handler. Protects equipment and improves air quality.', dfwProblems: 'DFW cedar pollen and summer dust clog filters fast — monthly changes required. Clogged filters cause frozen coils and motor burnout.', maintenance: 'Check monthly, replace every 30 days in summer, use MERV 8-11 for best balance.' },
  { id: 'ductwork', label: '🔧 Ductwork', desc: 'The network of supply and return ducts distributing conditioned air to every room and returning it to the air handler.', dfwProblems: 'Attic temps reach 140°F in DFW summers, degrading duct seals. Disconnected ducts dump conditioned air into attic space.', maintenance: 'Inspect attic ducts every 3-5 years, seal leaks with mastic, ensure insulation is R-8 or better.' },
  { id: 'registers', label: '📤 Supply Registers', desc: 'The vents that deliver conditioned air into each room. Adjustable louvers allow some airflow direction control.', dfwProblems: 'Closed registers increase system pressure, overworking blower. Blocked registers under furniture cause room hot spots.', maintenance: 'Keep all registers open, vacuum debris quarterly, adjust louvers for seasonal comfort.' },
  { id: 'returns', label: '📥 Return Air Grilles', desc: 'Large grilles that pull room air back to the air handler. Essential for balanced pressure and efficient operation.', dfwProblems: 'Single central return common in older DFW homes causes pressure imbalance, slamming doors, and comfort complaints.', maintenance: 'Never block returns with furniture, clean grilles annually, consider adding returns to problem rooms.' },
  { id: 'condensate', label: '💧 Condensate System', desc: 'Drain pan and PVC drain line that removes water extracted from humid DFW air during cooling.', dfwProblems: 'DFW humidity peaks cause condensate overflow — #1 cause of water damage and emergency calls. Algae blocks drain lines.', maintenance: 'Pour 1 cup bleach in drain line quarterly, install condensate overflow shutoff switch, check pan monthly.' },
];

export default function DFWHVACSystemsMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = components.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC Systems Map</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Every component of your DFW central HVAC system — what it does and how it connects</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
          {components.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{ background: selected === c.id ? '#1E3A5F' : '#0F2237', border: `2px solid ${selected === c.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 12px', cursor: 'pointer', color: selected === c.id ? '#F5E642' : '#CBD5E1', fontSize: 14, fontWeight: 600, textAlign: 'left', transition: 'all 0.2s' }}>
              {c.label}
            </button>
          ))}
        </div>

        {active ? (
          <div style={{ background: '#0F2237', border: '2px solid #1E3A5F', borderRadius: 14, padding: 28 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>{active.label}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>WHAT IT DOES</div>
                <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{active.desc}</p>
              </div>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>COMMON DFW PROBLEMS</div>
                <p style={{ color: '#FCA5A5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{active.dfwProblems}</p>
              </div>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>MAINTENANCE</div>
                <p style={{ color: '#86EFAC', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{active.maintenance}</p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2237', border: '2px dashed #1E3A5F', borderRadius: 14, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>👆</div>
            <p style={{ color: '#64748B', margin: 0 }}>Select any component above to see what it does, common DFW problems, and maintenance tips</p>
          </div>
        )}

        <div style={{ marginTop: 24, background: '#0F2237', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🔗 HOW IT ALL CONNECTS</div>
          <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            Return air grilles → Filter → Air Handler (cooling/heating) → Supply ductwork → Registers → your room → back to returns. Meanwhile, the Condenser outside rejects heat, the Thermostat orchestrates it all, and the Condensate system quietly drains the humidity pulled from your DFW air.
          </p>
        </div>
      </div>
    </div>
  );
}
