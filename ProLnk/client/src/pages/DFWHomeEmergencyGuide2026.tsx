import { useState } from 'react';

export default function DFWHomeEmergencyGuide2026() {
  const [selected, setSelected] = useState('');

  const emergencies = [
    {
      id: 'ac', icon: '🥵', title: 'AC Failure in July',
      steps: ['1. Check thermostat — confirm it is set to COOL and below current temp', '2. Check circuit breaker — HVAC breakers trip in heat surges', '3. Check outdoor unit — clear debris blocking airflow', '4. If no fix in 10 min, call emergency HVAC — DFW heat kills in 2 hrs'],
      call: 'Emergency HVAC tech (same-day available on ProLnk)'
    },
    {
      id: 'pipe', icon: '💧', title: 'Pipe Burst / Freeze',
      steps: ['1. Shut off main water valve immediately (usually near meter or garage)', '2. Open all faucets to relieve remaining pressure', '3. Document damage with photos before cleanup', '4. Call plumber — do NOT use heat gun on frozen pipes yourself'],
      call: 'Licensed plumber + insurance adjuster'
    },
    {
      id: 'foundation', icon: '🏚️', title: 'Foundation Crack Overnight',
      steps: ['1. Do NOT panic — most cracks are cosmetic hairline fractures', '2. Measure crack width with a coin — under 1/4 inch usually not structural', '3. Check doors and windows for misalignment (real indicator of movement)', '4. Call foundation specialist within 48 hours for evaluation'],
      call: 'Certified foundation engineer or structural inspector'
    },
    {
      id: 'hail', icon: '⛈️', title: 'Roof Damage After Hail',
      steps: ['1. Do NOT go on the roof — hire a pro for inspection', '2. Check attic for daylight or wet insulation immediately', '3. Photograph dents on AC unit, gutters, and vehicles as proof of hail size', '4. Call insurance within 24 hours — DFW policies have strict timelines'],
      call: 'Licensed roofer (not storm chaser) + insurance adjuster'
    },
    {
      id: 'electrical', icon: '⚡', title: 'Electrical Sparks / Fire Smell',
      steps: ['1. Leave the area immediately — do not investigate source', '2. Turn off main breaker ONLY if safe to reach panel', '3. Call 911 if any smoke visible — do not delay', '4. After clearance, call licensed electrician before restoring power'],
      call: '911 first, then licensed master electrician'
    },
  ];

  const active = emergencies.find((e) => e.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🚨</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Home Emergency Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Top 5 DFW home emergencies — what to do right now</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {emergencies.map((e) => (
            <button key={e.id} onClick={() => setSelected(e.id)}
              style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${selected === e.id ? '#F5E642' : '#1e3a5f'}`,
                background: selected === e.id ? '#F5E642′ : '#111e35', color: selected === e.id ? '#0A1628' : '#fff',
                fontWeight: 700, cursor: 'pointer', fontSize: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 100 }}>
              <span style={{ fontSize: 24 }}>{e.icon}</span>
              <span>{e.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {active ? (
          <div style={{ background: '#111e35', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 36 }}>{active.icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: 20, margin: 0 }}>{active.title}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {active.steps.map((step, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', fontSize: 14 }}>{step}</div>
              ))}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 12, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>
              📞 Who to call: {active.call}
            </div>
          </div>
        ) : (
          <div style={{ background: '#111e35', borderRadius: 12, padding: 32, textAlign: 'center', color: '#64748b' }}>
            Select an emergency type above to see immediate action steps
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 32, color: '#64748b', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Emergency-ready vetted pros available same day in DFW
        </div>
      </div>
    </div>
  );
}
