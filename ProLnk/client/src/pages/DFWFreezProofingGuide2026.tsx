import { useState } from 'react';

const homeTypes = ['Slab Foundation', 'Pier & Beam', 'Townhome', 'Condo'];
const prepLevels = ['None', 'Basic', 'Moderate', 'Uri-Ready'];

const checklist: Record<string, string[]> = {
  'Slab Foundation-None': ['🔧 Insulate exterior pipes — especially hose bibs and garage', '🌡️ Install freeze-protection thermostat (auto-runs heat ≤35°F)', '🔒 Install smart shutoff sensor at main water line', '🔋 Generator or battery backup for extended outages', '⛽ Know gas shutoff location and have wrench accessible', '💧 Fill bathtubs when freeze warning issued'],
  'Slab Foundation-Basic': ['🔧 Verify all exterior pipe insulation is intact', '🌡️ Test freeze-protection thermostat function', '🔒 Verify smart shutoff sensor battery and connectivity', '🔋 Test generator or battery backup now'],
  'Slab Foundation-Moderate': ['🌡️ Calibrate freeze thermostat — trigger at 35°F not 32°F', '🔒 Update smart shutoff app and test remote shutoff', '🔋 Load test backup power with full home draw'],
  'Slab Foundation-Uri-Ready': ['✅ Annual system test in October before first freeze', '📋 Confirm household knows gas shutoff procedure'],
  'Pier & Beam-None': ['🚨 HIGHEST RISK: All under-floor pipes exposed to cold air', '🔧 Insulate ALL under-floor pipes with foam + heat tape', '🔒 Seal crawl space vents with foam board before November', '🌡️ Install freeze-protection thermostat — runs HVAC ≤35°F', '🔒 Smart main shutoff sensor — critical for pier & beam', '🔋 Generator essential — loss of heat = pipe freeze in hours', '⛽ Know gas shutoff location and have wrench nearby'],
  'Pier & Beam-Basic': ['🔧 Inspect under-floor insulation — gaps allow freezing', '🔒 Re-seal crawl space vents before October', '🌡️ Add heat tape to any bare pipe runs', '🔋 Upgrade backup power to 5kW+ minimum'],
  'Pier & Beam-Moderate': ['🔒 Crawl space inspection and re-seal September/October', '🔧 Heat tape inspection — replace if 5+ years old', '🌡️ Test freeze thermostat trigger temperature'],
  'Pier & Beam-Uri-Ready': ['✅ September crawl space inspection every year', '📋 Walk household through emergency shutoff plan'],
};

const defaultItems = ['🔧 Insulate all exterior and under-floor pipes', '🌡️ Freeze-protection thermostat (triggers ≤35°F)', '🔒 Smart shutoff sensor at main water line', '🔋 Generator or battery backup', '⛽ Know gas shutoff location'];

export default function DFWFreezProofingGuide2026() {
  const [homeType, setHomeType] = useState('');
  const [prepLevel, setPrepLevel] = useState('');

  const key = `${homeType}-${prepLevel}`;
  const items = checklist[key] || (homeType && prepLevel ? defaultItems : []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🧊 PROLNK DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Freeze-Proofing Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Make your DFW home Uri-ready — the next freeze will happen, be prepared before it does.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{label:'🏠 Home Type', val: homeType, set: setHomeType, opts: homeTypes},{label:'🛡️ Current Prep Level', val: prepLevel, set: setPrepLevel, opts: prepLevels}].map(({label, val, set, opts}) => (
            <div key={label}>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>{label}</div>
              <select value={val} onChange={e => set(e.target.value)} style={{ width: '100%', background: '#1e3a5f', border: '1px solid #2d4a6e', color: '#fff', padding: '10px', borderRadius: 6, fontSize: 14 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ background: '#132035', borderRadius: 10, padding: 24, marginBottom: 32 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Freeze-Proofing Checklist</div>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 10, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🧊 DFW Freeze Key Facts</div>
          {['Uri caused $195B in damage — 65% of DFW homes were unprepared','Pier & beam pipes freeze in under 4 hours at 20°F — insulate first','Freeze-protection thermostats cost $150-300 and prevent $20K+ pipe repairs','Smart shutoff sensors let you cut water remotely if pipes burst','Gas shutoff wrench costs $12 — keep one accessible at the meter'].map((f,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642′ }}>▸</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{f}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
