import { useState } from 'react';

type Step = { urgency: string; color: string; steps: string[]; decision: string; cost: string };

const assess = (location: string, age: string): Step => {
  const old = age === '10+';
  if (location === 'top') return { urgency: old ? 'HIGH' : 'MEDIUM', color: old ? '#ef4444′ : '#f97316', steps: [’Turn off cold water supply valve on top of heater','If gas: turn gas valve to PILOT position','Call licensed plumber — top leaks indicate inlet/outlet fitting failure','DFW hard water corrodes brass fittings faster than national average'], decision: old ? 'Replace — DFW hard water reduces heater life to 8-10 years. At 10+ years, repair cost exceeds value.' : 'Repair — replace inlet/outlet fittings ($150-300 repair)', cost: old ? '$900-1,800 replacement' : '$150-350 repair' };
  if (location === 'bottom') return { urgency: 'HIGH', color: '#ef4444', steps: ['Turn off power/gas immediately','Shut cold water supply','Place towels and bucket — do NOT use electric appliances nearby','Call emergency plumber — DFW hard water sediment has corroded tank floor'], decision: 'Replace immediately. Bottom leaks = tank corrosion failure. DFW water causes internal rust in tanks over 8 years old.', cost: '$900-1,800 installed' };
  if (location === 'valve') return { urgency: 'MEDIUM', color: '#f97316', steps: ['Pressure relief valve dripping = normal safety function OR excessive pressure','Test: lift lever briefly — if water flows freely, valve works','If valve drips continuously — replace it ($15-25 part)','DFW water pressure often runs high (80+ PSI) — check pressure reducing valve too'], decision: old ? 'Replace valve and assess tank — at 10+ years, also budget for replacement' : 'Replace T&P relief valve — straightforward DIY or plumber', cost: '$25-150 (DIY to pro installed)' };
  return { urgency: 'LOW', color: '#22c55e', steps: ['Check if leak is from connecting pipes, not the tank itself','Inspect water supply lines for cracks or loose fittings','Check expansion tank if present — DFW water pressure fluctuations require expansion tanks','Tighten or replace supply line connections'], decision: 'Likely not the water heater — check supply lines and connections first', cost: '$15-100 supply line replacement' };
};

export default function DFWWaterHeaterLeakGuide() {
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const result = location && age ? assess(location, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>💦 Water Heater Leak Guide<br /><span style={{ color: '#F5E642′ }}>Dallas-Fort Worth Guide</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 15 }}>DFW hard water is one of the harshest in Texas — sediment buildup corrodes water heater tanks from the inside, reducing the average DFW water heater lifespan to <strong style={{ color: '#F5E642′ }}>8-10 years</strong> vs the 12-15 year national average. Location of the leak determines urgency.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>⚠️ DFW WATER HEATER LIFE EXPECTANCY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[['0-6 yrs', 'Healthy', '#22c55e'], ['6-10 yrs', 'Monitor', '#f97316'], ['10+ yrs', 'Replace Soon', '#ef4444']].map(([range, label, color]) => (
              <div key={range} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center', borderTop: `3px solid ${color}` }}>
                <div style={{ color, fontWeight: 700 }}>{range}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 1: Where is the leak?</div>
          {[{ id: 'top', label: '⬆️ Top of water heater' }, { id: 'bottom', label: '⬇️ Bottom of tank (pooling water)' }, { id: 'valve', label: '🔧 From pressure relief valve (side)' }, { id: 'pipes', label: '🔗 From connecting pipes/fittings' }].map(o => (
            <button key={o.id} onClick={() => setLocation(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: location === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${location === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 2: Water heater age</div>
          {[{ id: 'under6', label: '✅ Under 6 years old' }, { id: '6-10', label: '⚠️ 6-10 years old' }, { id: '10+', label: '🚨 10+ years old' }].map(o => (
            <button key={o.id} onClick={() => setAge(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: age === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${age === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>⚡ URGENCY: {result.urgency}</div>
            <div style={{ marginBottom: 16 }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{step}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 10 }}><div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>RECOMMENDATION</div><div style={{ color: '#e2e8f0', fontSize: 14 }}>{result.decision}</div></div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}><div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>ESTIMATED COST</div><div style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
