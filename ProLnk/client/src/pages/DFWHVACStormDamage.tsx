import { useState } from 'react';

const stormTypes = [
  {
    name: 'Hail Storm',
    icon: '🧊',
    frequency: 'DFW averages 5-10 hail events per year',
    damages: [
      { part: 'Outdoor Unit Fins', description: 'Aluminum fins on condenser coil get crushed by hail, blocking airflow and reducing efficiency by 15-30%.' },
      { part: 'Fan Blade / Guard', description: 'Large hail can crack plastic fan blades or dent the wire guard protecting the fan.' },
      { part: 'Refrigerant Lines', description: 'Exposed copper lines can develop micro-fractures from repeated hail impacts over multiple storms.' },
    ],
    assessment: 'After any hail above 1 inch: visually inspect fins. If more than 30% are bent, call a pro. Insurance often covers hail damage — document with photos immediately.',
    insuranceTip: 'Hail damage to HVAC outdoor units IS typically covered under homeowners insurance as wind/hail peril. File within 12 months of storm.',
    repairVsInsurance: 'Insurance Claim',
  },
  {
    name: 'Lightning Strike',
    icon: '⚡',
    frequency: 'DFW is in high lightning corridor — 50+ strikes per sq mile per year',
    damages: [
      { part: 'Control Board', description: 'Lightning surge through electrical panel can destroy the circuit board that controls the entire system — most common failure.' },
      { part: 'Capacitor', description: 'Surge kills start/run capacitors, preventing compressor or fan motor from starting.' },
      { part: 'Compressor', description: 'Direct or near-miss strikes can cause compressor winding failure — most expensive single component.' },
    ],
    assessment: 'System runs but short-cycles or makes grinding noise: capacitor. System completely dead after storm: control board. System trips breaker repeatedly: compressor winding check.',
    insuranceTip: 'Lightning damage is covered under homeowners insurance. Requires electrician report confirming surge event. Install whole-home surge protector to prevent future damage.',
    repairVsInsurance: 'Insurance Claim',
  },
  {
    name: 'Ice Storm',
    icon: '🌨️',
    frequency: '1-3 significant ice events per decade in DFW — but devastating when they occur',
    damages: [
      { part: 'Evaporator Coil', description: 'When power cuts out and returns, system restarts in wrong conditions. Coil can freeze solid, cracking the coil housing.' },
      { part: 'Refrigerant Lines', description: 'Outdoor copper lines can freeze and crack at fittings if system runs during ice event.' },
      { part: 'Condensate Drain', description: 'Frozen condensate drain causes backup water damage inside air handler, damaging blower and electronics.' },
    ],
    assessment: 'After ice storm: do NOT immediately run heat pump in emergency heat mode for more than 1 hour. Allow outdoor unit to thaw naturally. Check for visible refrigerant line damage before restart.',
    insuranceTip: 'Freeze damage coverage varies by policy. Some require separate freeze endorsement. Check policy before storm season. February 2021 Uri storm created 50,000+ DFW HVAC claims.',
    repairVsInsurance: 'Policy-Dependent',
  },
  {
    name: 'Straight-Line Wind',
    icon: '💨',
    frequency: 'Severe thunderstorms bring 60-80 mph straight-line winds multiple times per year',
    damages: [
      { part: 'Unit Displacement', description: 'Wind can shift outdoor unit off pad, stressing refrigerant lines and electrical connections.' },
      { part: 'Debris Impact', description: 'Flying debris (tree branches, fencing) can puncture condenser coil or damage fan assembly.' },
      { part: 'Ductwork', description: 'High attic pressure from wind can tear flexible duct connections, losing conditioned air into attic.' },
    ],
    assessment: 'After high winds: verify outdoor unit is level on pad. Check refrigerant lines for kinks. Run system 15 minutes and check that both supply and return vents are flowing.',
    insuranceTip: 'Wind damage is covered under standard homeowners wind/hail peril. Document before clearing any debris.',
    repairVsInsurance: 'Insurance Claim',
  },
];

export default function DFWHVACStormDamage() {
  const [selected, setSelected] = useState(0);
  const storm = stormTypes[selected];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF2', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⛈️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW HVAC Storm Damage Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>How DFW storms damage your HVAC — and what to do after each type</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>🌪️ Select Storm Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {stormTypes.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ backgroundColor: selected === i ? '#F5E642' : '#1A2E4A', color: selected === i ? '#0A1628' : '#E8EDF2', border: 'none', borderRadius: '8px', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textAlign: 'center', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                <div style={{ marginTop: '0.25rem' }}>{s.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E4A', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid #F5E642' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '2rem' }}>{storm.icon}</span>
            <h2 style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{storm.name}</h2>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{storm.frequency}</p>

          <h3 style={{ color: '#E8EDF2', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Typical HVAC Damage</h3>
          {storm.damages.map((d, i) => (
            <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{d.part}</div>
              <div style={{ color: '#E8EDF2', fontSize: '0.9rem' }}>{d.description}</div>
            </div>
          ))}

          <div style={{ backgroundColor: '#0D1B2E', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Post-Storm Assessment</div>
            <div style={{ color: '#E8EDF2', fontSize: '0.9rem', lineHeight: 1.6 }}>{storm.assessment}</div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: '#1A2E4A', border: '1px solid #F5E642', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#94A3B8' }}>Recommended action: </span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{storm.repairVsInsurance}</span>
            </div>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '0.75rem', fontStyle: 'italic' }}>📋 {storm.insuranceTip}</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔧</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>After a DFW storm, ProLnk connects you with local HVAC pros who can assess damage and document it for insurance within hours.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Emergency Storm Assessment</button>
        </div>
      </div>
    </div>
  );
}
