import { useState } from 'react';

export default function DFWRefrigeratorMaintenanceDFW2026() {
  const [age, setAge] = useState('');
  const [issue, setIssue] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    "0-5": {
      "coils": "Vacuum condenser coils every 6 months — DFW dust accumulates twice as fast as northern climates. Coils under fridge: use coil brush + vacuum. Rear coils: pull fridge out. Dirty coils raise electricity cost 25%.",
      "ice-maker": "Replace water filter every 6 months in DFW (vs 12 months standard). DFW hard water (300+ PPM) clogs filters faster and leaves scale in ice maker water line. Use OEM filters only.",
      "gasket": "Inspect door gasket monthly at 0-5 years. DFW summer heat (100F+) degrades gasket faster. Test: close door on dollar bill — if it slides out easily, gasket needs replacement ($40-80).",
      "drain": "Clean drain pan under fridge every 6 months. DFW humidity causes mold in drain pan faster. Access from front kick plate. Rinse with mild bleach solution."
    },
    "6-10": {
      "coils": "At 6-10 years, coil cleaning is critical. DFW dust buildup over years strains compressor. If fridge runs constantly or freezer is warm, dirty coils are likely cause. Clean and monitor.",
      "ice-maker": "Ice maker water valve may be partially clogged with DFW mineral deposits. If ice production is slow, replace water inlet valve ($30-60 part). Also replace filter — DFW clogs them in 4 months by year 8.",
      "gasket": "Gasket hardening is normal at 6-10 years, accelerated by DFW heat. If cracked or stiff, replace. Check refrigerator and freezer door gaskets separately. Cost: $40-80 each.",
      "drain": "Defrost drain may be partially clogged at this age. DFW hard water deposits narrow drain tube. If water pools inside fridge, flush defrost drain with warm water using turkey baster."
    },
    "11+": {
      "coils": "Compressor likely stressed from years of dirty coils in DFW heat. If fridge is 11+ years and struggling, repair cost may exceed value. Get quote: compressor replacement = $400-700.",
      "ice-maker": "Replace entire ice maker assembly ($80-200) rather than chasing parts at 11+ years. DFW hard water has likely scaled internal components. Factor into repair vs replace decision.",
      "gasket": "At 11+ years, multiple gaskets likely failing. DFW UV and heat degrade rubber over decade. If replacing 2+ gaskets, compare to new fridge — Energy Star models save $150/yr in DFW cooling costs.",
      "drain": "Frequent defrost drain clogs at 11+ years may indicate defrost heater or thermostat failure. Repair cost $150-300. Weigh against new unit at this age in DFW heat wear context."
    }
  };

  function generate() {
    if (!age || !issue) { setGuide('Please select both options.'); return; }
    setGuide(guides[age]?.[issue] || 'No guide found for that combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>❄️ DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Refrigerator Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW summers push refrigerators to their limits — ambient temps above 100F force compressors to work 40% harder. Combined with hard water ice makers and heavy dust accumulation, DFW fridges need proactive care.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
          {([
            ['🌪️', 'Coil Cleaning Every 6mo', 'DFW dust is extreme — vacuum condenser coils every 6 months, not annually. Dirty coils raise energy use 25% and shorten compressor life.'],
            ['💧', '6-Month Water Filter', 'DFW hard water clogs ice maker filters in 4-6 months. Set a phone reminder — do not wait for slow ice production.'],
            ['🌡️', 'Summer Temp Check', 'Set fridge to 37F, freezer to 0F. DFW 100F+ summers require fridge to work harder — verify temps with thermometer in July.'],
            ['🚪', 'Gasket Dollar Test', 'Monthly: close door on dollar bill. If it slides out easily, gasket is failing. DFW summer heat cracks gaskets faster.'],
          ] as [string, string, string][]).map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Get Your DFW Fridge Guide</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Refrigerator Age</option>
              <option value="0-5">0-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11+">11+ years</option>
            </select>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select Issue</option>
              <option value="coils">Condenser coil cleaning</option>
              <option value="ice-maker">Ice maker / water filter</option>
              <option value="gasket">Door gasket</option>
              <option value="drain">Drain pan / defrost drain</option>
            </select>
            <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 15 }}>Get Guide</button>
          </div>
          {guide && <div style={{ background: '#1a3a5c', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🏠 Need a DFW Appliance Pro?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>ProLnk connects you with vetted DFW technicians who understand extreme heat and hard water appliance wear.</div>
          <a href="/" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}
