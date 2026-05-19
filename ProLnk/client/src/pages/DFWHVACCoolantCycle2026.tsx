import { useState } from 'react';

export default function DFWHVACCoolantCycle2026() {
  const [behavior, setBehavior] = useState('');
  const [guide, setGuide] = useState('');

  const getGuide = () => {
    if (!behavior) { setGuide('Select a system behavior to get your refrigerant cycle guide.'); return; }
    const guides: Record<string, string> = {
      notcooling: '🌡️ Not Cooling Despite Running: The refrigerant cycle has 4 stages — if any fails, cooling stops. In DFW summer, the most common cause is refrigerant leak (low charge). Evaporator coil cannot absorb enough heat. Signs: ice forming on refrigerant line, warm air from vents despite compressor running. Second cause: dirty condenser coils outside — DFW dust and cottonwood clog them, preventing heat rejection at condenser stage. Call HVAC tech for refrigerant check and coil cleaning.',
      iceline: '🧊 Ice on Refrigerant Line: Ice on the suction line (large insulated copper pipe) indicates refrigerant is absorbing heat in the wrong place. Causes in DFW: 1) Low refrigerant charge — refrigerant pressure drops too low, freezes moisture on line. 2) Restricted airflow — dirty filter or blocked vents cause evaporator to over-cool. Turn system to FAN ONLY immediately to thaw. Replace filter. If ice returns after 24 hours, call tech for refrigerant check.',
      loudnoise: '🔊 Loud Compressor Noise: Compressor is the heart of the refrigerant cycle — it pressurizes refrigerant from low pressure gas to high pressure gas. DFW heat stresses compressors heavily — they run hotter and harder than in cooler climates. Banging = likely compressor starting to fail or liquid refrigerant entering compressor (liquid slugging). Clicking on startup = normal. Constant clicking = control board issue. Squealing = motor bearing. DFW compressors often fail after 10-12 years vs 15+ in moderate climates.',
      highbill: '💸 High Electric Bills: In DFW, the condenser (outdoor unit) rejects heat from refrigerant to outside air. When outside air is 100°F+, condenser must work harder to reject heat — efficiency drops 15-30% vs rated performance. Check: condenser coils clean? Shade available for unit? Refrigerant charge correct? Low charge forces longer run cycles. Also check expansion valve — if partially blocked, refrigerant flow is restricted, efficiency drops. Proper refrigerant charge is the single biggest efficiency factor in DFW summers.',
      shortcycle: '⚡ Short Cycling (On/Off Every Few Minutes): Normal DFW cooling cycle is 15-20 minutes. Short cycling means refrigerant cycle is being interrupted. Common causes: 1) Oversized AC unit — cools space quickly without dehumidifying (common DFW problem). 2) Low refrigerant — system hits safety pressure cutoff. 3) Dirty filter restricting airflow causing high pressure trip. 4) Thermostat in direct sun or near heat source. Short cycling wastes 20-40% more energy and stresses compressor. DFW oversizing is epidemic — contractors often spec too large to guarantee comfort.',
      warmstart: '🌅 Takes Too Long to Cool After Night: DFW homes absorb enormous heat through attic and walls during the day — this thermal mass must be cooled before the conditioned space reaches setpoint. The refrigerant cycle is working correctly but has more heat to remove. Solutions: pre-cool to 70°F at 5 PM before heat peaks, ensure attic insulation is R-38 minimum, check for duct leaks in hot attic (DFW attics reach 140°F+, losing 20-30% cooling to leaky ducts). This is a building envelope problem, not a refrigerant cycle problem.'
    };
    setGuide(guides[behavior] || '');
  };

  const stages = [
    { icon: '❄️', name: 'Evaporator', location: 'Indoor unit (air handler)', action: 'Refrigerant absorbs heat from your home air', dfwNote: 'DFW: Must remove both heat AND enormous humidity load' },
    { icon: '⬆️', name: 'Compressor', location: 'Outdoor unit', action: 'Pressurizes refrigerant, raising temperature', dfwNote: 'DFW: Runs hotter — 100°F+ ambient stresses compressor heavily' },
    { icon: '🔥', name: 'Condenser', location: 'Outdoor unit (coils)', action: 'Releases absorbed heat to outside air', dfwNote: 'DFW: Fighting 100-108°F air — efficiency drops 20-30% in peak summer' },
    { icon: '⬇️', name: 'Expansion Valve', location: 'Indoor unit', action: 'Drops refrigerant pressure, enabling heat absorption', dfwNote: 'DFW: Correct sizing critical — undersized valve starves evaporator coil' }
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>❄️ DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>AC Refrigerant Cycle Explained</h1>
        <p style={{ color: '#8899AA', fontSize: '16px', marginBottom: '32px' }}>Understanding how refrigerant moves through your DFW AC system helps you diagnose problems faster and communicate with HVAC techs more effectively.</p>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#F5E642′ }}>🔄 The 4-Stage Refrigerant Cycle</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stages.map((stage, i) => (
              <div key={i} style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '10px', padding: '18px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{stage.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{i + 1}. {stage.name}</div>
                  <div style={{ color: '#8899AA', fontSize: '13px', marginBottom: '6px' }}>📍 {stage.location}</div>
                  <div style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '6px' }}>{stage.action}</div>
                  <div style={{ color: '#F5E642', fontSize: '13px', fontStyle: 'italic' }}>{stage.dfwNote}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#F5E642′ }}>🔧 Diagnose My System Behavior</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>What Is My DFW System Doing?</label>
            <select value={behavior} onChange={e => setBehavior(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px' }}>
              <option value=''>Select behavior...</option>
              <option value='notcooling'>Running but not cooling</option>
              <option value='iceline'>Ice forming on copper line</option>
              <option value='loudnoise'>Loud compressor noises</option>
              <option value='highbill'>Unusually high electric bill</option>
              <option value='shortcycle'>Turning on and off rapidly</option>
              <option value='warmstart'>Takes hours to reach setpoint</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Refrigerant Cycle Guide</button>
          {guide && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '15px', lineHeight: 1.7 }}>{guide}</div>}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px', color: '#F5E642′ }}>🌡️ Why DFW Heat Is Uniquely Brutal on AC</h3>
          <p style={{ color: '#CBD5E0', fontSize: '14px', lineHeight: 1.7 }}>When outdoor air reaches 105°F, your condenser must reject heat to air that is already extremely hot. This forces the refrigerant to reach higher pressures and temperatures to release heat — compressors work 30-40% harder than rated. This is why DFW systems need annual service, clean condenser coils, and correct refrigerant charge maintained to spec — even small deficiencies become major performance problems above 95°F.</p>
        </div>
      </div>
    </div>
  );
}