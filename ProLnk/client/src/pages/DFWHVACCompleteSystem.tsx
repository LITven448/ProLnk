import { useState } from 'react';

const components = [
  { id: 'condenser', icon: '🏭', name: 'Outdoor Condenser', location: 'Outside', desc: 'Releases heat from refrigerant to outdoor air. Contains compressor, condenser coil, and fan.', dfwEffect: 'DFW outdoor temps of 100-110°F reduce condenser efficiency by 15-25%. Units work significantly harder, increasing wear and energy use.', maintenance: 'Clean coils yearly, keep 2ft clearance, shade if possible without blocking airflow.' },
  { id: 'handler', icon: '💨', name: 'Air Handler / Furnace', location: 'Attic or Closet', desc: 'Indoor unit containing evaporator coil, blower motor, filter rack. Conditions and circulates air.', dfwEffect: 'Attic-mounted units in DFW absorb radiant heat through the cabinet — premium insulation on the unit itself is critical.', maintenance: 'Change filters monthly in DFW summers. Check drain pan quarterly for standing water.' },
  { id: 'coil', icon: '❄️', name: 'Evaporator Coil', location: 'Inside Air Handler', desc: 'Cold coil that absorbs heat from indoor air, turning refrigerant from liquid to vapor.', dfwEffect: 'DFW’s high humidity loads the coil heavily — dirty coils freeze or lose up to 40% efficiency in peak summer.', maintenance: 'Annual cleaning. Watch for ice formation on lines — first sign of coil or refrigerant problem.' },
  { id: 'refrigerant', icon: '🔵', name: 'Refrigerant Lines', location: 'Connecting Outdoor & Indoor', desc: 'Copper lines carrying refrigerant between condenser and evaporator. Suction line is insulated.', dfwEffect: 'DFW sun degrades line set insulation in 7-10 years. Exposed suction lines lose efficiency and can sweat condensation into walls.', maintenance: 'Inspect insulation annually. Replace if cracked or falling off.' },
  { id: 'thermostat', icon: '🌡️', name: 'Thermostat', location: 'Interior Wall', desc: 'Controls system operation based on temperature setpoint. Smart models optimize scheduling.', dfwEffect: 'Location matters in DFW — thermostats near west windows or sunny hallways misread actual comfort conditions.', maintenance: 'Calibrate annually. Set to 78°F when home, 85°F when away in DFW summers to balance comfort and cost.' },
  { id: 'ducts', icon: '🛤️', name: 'Duct System', location: 'Attic & Walls', desc: 'Complete network of supply and return ducts distributing conditioned air throughout the home.', dfwEffect: 'Ducts in DFW attics reaching 150°F can lose 25-40% of system capacity through leaks and poor insulation.', maintenance: 'Duct leakage test every 5-7 years. Verify R-8 insulation on all attic runs.' },
];

export default function DFWHVACCompleteSystem() {
  const [active, setActive] = useState<string | null>(null);

  const selected = components.find(c => c.id === active);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Education</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>Complete DFW HVAC System Guide</h1>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>Every component of your DFW HVAC system — from outdoor condenser to supply register — and how Dallas-Fort Worth's extreme climate uniquely affects each one. Select any component to learn more.</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: '2rem', border: '1px solid #2A4A7F' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🌡️ DFW Climate Reality: </span>
          <span style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>Dallas-Fort Worth averages 70+ days above 100°F annually, with overnight lows rarely below 80°F in July-August. This compressed heat schedule means your system runs near-continuously for 3+ months — no other major metro puts more stress on HVAC equipment.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {components.map(c => (
            <button key={c.id} onClick={() => setActive(active === c.id ? null : c.id)}
              style={{ background: active === c.id ? '#F5E642′ : '#0F2140', border: `2px solid ${active === c.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem 1rem', cursor: ’pointer', textAlign: 'left', color: active === c.id ? '#0A1628′ : '#E8EDF5', transition: ’all 0.2s' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{c.location}</div>
            </button>
          ))}
        </div>

        {selected ? (
          <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #F5E642′ }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{selected.icon}</span>
              <div>
                <h3 style={{ margin: 0, color: '#F5E642', fontSize: '1.15rem' }}>{selected.name}</h3>
                <div style={{ color: '#64748B', fontSize: '0.85rem' }}>📍 {selected.location}</div>
              </div>
            </div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 1rem' }}>{selected.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#FF8C00', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>🌡️ HOW DFW CLIMATE AFFECTS IT</div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{selected.dfwEffect}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>✅ DFW MAINTENANCE TIPS</div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{selected.maintenance}</p>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2140', borderRadius: 12, padding: '2rem', marginBottom: '2rem', textAlign: 'center', border: '1px dashed #1E3A5F', color: '#64748B' }}>
            👆 Select a component above to see how DFW climate affects it
          </div>
        )}

        <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Full System Health Assessment</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 1rem' }}>ProLnk matches DFW homeowners with HVAC professionals who inspect every system component — not just the parts that are obviously broken.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Full System Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
