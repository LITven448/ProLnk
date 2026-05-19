import { useState } from 'react';

const seasons = [
  {
    id: 'spring', label: '🌱 Spring (April)', tasks: [
      'AC startup: switch from heat to cool on thermostat — verify cool air within 15 minutes',
      'Replace filter: DFW pollen season April–June — use MERV 11 or higher',
      'Clear outdoor condenser: trim shrubs 2 ft clearance on all sides',
      'Inspect condenser coil: rinse with garden hose (top-down) to remove winter debris',
      'Check drain line: pour cup of water at condensate pan — watch for backup',
      'Schedule tune-up: DFW HVAC pros book fast April 1 — call early for a May slot',
      'Verify thermostat: confirm schedule is set for summer cooling mode',
    ]
  },
  {
    id: 'summer', label: '☀️ Summer (June–Sept)', tasks: [
      'Set thermostat: 76–78°F at home, 82°F when away — DFW summers run bills high',
      'Check filter monthly: summer run 24/7 clogs filters 3x faster than mild seasons',
      'Watch for freeze-up: ice on line set = restricted airflow or low refrigerant',
      'Condensate line: pour 1 cup bleach solution monthly to prevent algae backup',
      'System struggling over 100°F: normal — AC is designed for 95°F delta, not 105°F',
      'Ceiling fans: run counterclockwise in summer to create cooling downdraft',
      'Check attic: DFW attic temps hit 160°F — ensure duct insulation is intact',
    ]
  },
  {
    id: 'fall', label: '🍂 Fall (October)', tasks: [
      'Switch to heat: run heat mode briefly (a few warm days) before first cold snap',
      'Replace filter: fresh filter before heating season is critical for air quality',
      'Heat strip test (all-electric): run 10 minutes — should produce warm air within 5 min',
      'Gas furnace: verify igniter clicks and burner lights within 3 seconds of call for heat',
      'Inspect flue pipe (gas): check for separation, rust, or bird nests after summer',
      'Set thermostat: program for fall — DFW October mornings can be 45°F',
      'Schedule heating tune-up: book now — HVAC pros fill up October slots by September',
    ]
  },
  {
    id: 'winter', label: '❄️ Winter (November–Feb)', tasks: [
      'First heat run: let system run 30 minutes — burning dust smell is normal first time',
      'Carbon monoxide detector: test CO detectors when using gas furnace for first time',
      'Freeze prep: set thermostat to 68°F minimum when away — pipes freeze below 55°F interior',
      'Outdoor unit: do not cover — heat pump outdoor units run in winter, need airflow',
      'Uri freeze event (if predicted): set to 70°F, open cabinet doors, let faucets drip',
      'DFW note: natural gas heat is common — confirm gas valve is open at furnace',
      'Emergency heat (heat pump): only use in true emergency — very expensive to run',
    ]
  },
];

export default function DFWHVACSeasonalPreparation2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = seasons.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
            DFW HVAC Seasonal Preparation Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Prepare your DFW HVAC system for every season. Select your current season for a complete action checklist.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: '0', fontSize: '1.1rem' }}>🌡 DFW HVAC Climate Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['☀️ DFW design temp: 100°F+ for 3–4 months — size AC for peak, not average', '❄️ Freeze events: rare but severe — Uri 2021 exposed prep gaps across DFW', '🔧 Tune-up schedule: spring (AC) + fall (heat) = 2x per year recommended', '💨 Filter life: MERV 11 every 30–45 days in high-use months', '🏗 Attic duct sealing: DFW homes lose 20–30% cooling through unsealed ducts', '🔋 Thermostat battery: replace batteries in fall before heating season startup'].map((item, i) => (
              <div key={i} style={{ background: '#1a3a5c', borderRadius: '8px', padding: '0.75rem', fontSize: '0.9rem', lineHeight: '1.5′ }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Your Season → HVAC Action Checklist</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {seasons.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: '8px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: '0′ }}>Action Checklist: {match.label}</h3>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              {match.tasks.map((task, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.6′ }}>{task}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡</div>
          <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.25rem' }}>Need a DFW HVAC tune-up or repair?</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with licensed DFW HVAC pros. Free quotes, vetted technicians.</div>
        </div>
      </div>
    </div>
  );
}