import { useState } from 'react';

function getDetectorPlan(rooms: number, appliances: number) {
  const detectors = Math.max(2, rooms + Math.ceil(appliances / 2));
  const cost = detectors * 35;
  const placements: string[] = [];
  if (rooms >= 1) placements.push('Outside primary bedroom (12–15 in from ceiling)');
  if (rooms >= 2) placements.push('Outside each additional bedroom');
  placements.push('Main living area near gas fireplace or furnace');
  if (appliances > 1) placements.push('Near water heater closet or utility room');
  if (appliances > 2) placements.push('Garage entry (if attached garage with gas)');
  return { detectors, cost, placements };
}

export default function DFWCarbonMonoxideGuide() {
  const [rooms, setRooms] = useState(0);
  const [appliances, setAppliances] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof getDetectorPlan> | null>(null);

  function calculate() {
    if (rooms === 0 || appliances === 0) return;
    setResult(getDetectorPlan(rooms, appliances));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW HOME SAFETY</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>DFW Carbon Monoxide Safety Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            Carbon monoxide is the leading cause of accidental poisoning deaths in the US — and DFW homeowners face year-round risk from gas furnaces, water heaters, and generators fired up after storms.
            CO is colorless, odorless, and lethal within hours at high concentrations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '⚡', title: 'Why DFW Is High-Risk Year-Round', body: 'Gas furnaces run hard in DFW winters. Hot water heaters run constantly. After summer storms, gas generators are fired up in garages — the #1 source of CO deaths. DFW\’s mild-to-hot climate doesn\’t eliminate risk; it shifts it seasonally.' },
            { icon: '📍', title: 'Where to Place Detectors', body: '12–15 inches from the ceiling on walls, or on the ceiling. CO is slightly lighter than air and disperses evenly — ceiling placement works. Place one outside EACH sleeping area and on every level of the home.' },
            { icon: '🔗', title: 'Interconnected Detectors', body: 'When one interconnected alarm sounds, ALL alarms sound. This is critical in two-story DFW homes where a basement or utility room CO event needs to wake occupants on upper floors. Look for Z-Wave or RF-linked models.' },
            { icon: '🚨', title: 'Evacuate vs. Investigate', body: 'If alarm sounds: leave immediately, call 911 from outside. Do NOT return until fire department clears the home. Low-level chirping (under 70 ppm) may indicate a developing problem — still leave and call. Never investigate CO yourself.' },
            { icon: '📞', title: 'DFW Emergency Resources', body: 'Dallas Fire-Rescue: 911. Fort Worth Fire: 911. Atmos Energy gas leak line: 1-866-322-8667. Oncor electric emergency: 888-313-4747. After any CO event, have a licensed HVAC tech inspect all combustion appliances.' },
            { icon: '🔄', title: 'Combo Smoke + CO Detectors', body: 'Combination units (e.g., Kidde 10-Year Sealed) save installation cost and are code-compliant in Texas. Replace units every 7 years (CO sensor degrades). Battery-only units must be tested monthly — hardwired with battery backup is best.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0f2340', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', border: '2px solid #F5E642', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1.5rem' }}>🧮 CO Detector Planner</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>NUMBER OF BEDROOMS</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <button key={n} onClick={() => { setRooms(n); setResult(null); }} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1.5px solid', borderColor: rooms === n ? '#F5E642' : '#1e3a5f', backgroundColor: rooms === n ? '#F5E642' : 'transparent', color: rooms === n ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>{n}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>GAS APPLIANCES (furnace, WH, range, fireplace, dryer)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => { setAppliances(n); setResult(null); }} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1.5px solid', borderColor: appliances === n ? '#F5E642' : '#1e3a5f', backgroundColor: appliances === n ? '#F5E642' : 'transparent', color: appliances === n ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>{n}</button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Generate My CO Plan →</button>

          {result && (
            <div style={{ marginTop: '1.5rem', backgroundColor: '#0A1628', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>✅ Your CO Detector Plan</div>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div><div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.2rem' }}>DETECTORS NEEDED</div><div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>{result.detectors}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.2rem' }}>EST. COST</div><div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 800 }}>${result.cost}–${result.cost + result.detectors * 20}</div></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>PLACEMENT PLAN:</div>
              {result.placements.map((p, i) => (
                <div key={i} style={{ color: '#e2e8f0', fontSize: '0.88rem', marginBottom: '0.35rem' }}>• {p}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Get a DFW CO Detector Installation Quote</div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>ProLnk connects DFW homeowners with licensed electricians and HVAC technicians who install hardwired, interconnected CO detectors. Get quotes in 24 hours, licensed and insured.</p>
        </div>

      </div>
    </div>
  );
}
