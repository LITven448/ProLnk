import { useState } from 'react';

const homeTypes = ['Single-Family', 'Townhome', 'Condo', 'Older Home (pre-2000)'];
const prepLevels = ['None', 'Basic', 'Moderate', 'Well-Prepared'];

const checklist: Record<string, string[]> = {
  'Single-Family-None': ['❄️ Schedule AC tune-up March or April (before rush)', '🌿 Upgrade to MERV-11+ filter — cedar season peaks Feb-Mar', '📅 Program thermostat: avoid ERCOT peak (3-7pm)', '🪟 Install solar screens on west-facing windows', '💧 Start foundation watering schedule now', '🌡️ Set AC to 78°F during peak hours — auto switch'],
  'Single-Family-Basic': ['❄️ AC service before April — coil clean + refrigerant check', '🌿 Swap to MERV-11 filter if not already done', '🪟 Add solar screens to west and south windows', '💧 Set up drip irrigation or soaker hose for foundation', '📅 Fine-tune ERCOT peak avoidance schedule'],
  'Single-Family-Moderate': ['❄️ Annual AC tune-up — do not skip', '💧 Verify foundation watering is consistent', '🪟 Check solar screens for damage from last season', '📅 Update thermostat schedule for 2026 rate changes'],
  'Single-Family-Well-Prepared': ['✅ Book AC service in February before surge pricing', '💧 Inspect soaker hose for leaks', '📋 Share ERCOT peak schedule with household'],
  'Older Home (pre-2000)-None': ['🚨 Older AC systems fail most in heat — service ASAP', '❄️ Consider full AC replacement if 15+ years old', '🌿 Upgrade insulation in attic — major heat gain source', '🪟 Solar screens are especially valuable on older single-pane', '💧 Foundation watering critical for older slab homes', '📅 Set strict ERCOT peak avoidance (older homes cool slowly)'],
  'Older Home (pre-2000)-Basic': ['❄️ Full AC inspection — check age and efficiency rating', '🌿 Add attic insulation if under R-38', '🪟 Replace single-pane windows or add interior film', '💧 Establish consistent foundation watering'],
  'Older Home (pre-2000)-Moderate': ['❄️ Annual tune-up + efficiency check', '💧 Foundation watering must be consistent through summer', '🌿 Replace filter monthly (not quarterly) in older homes'],
  'Older Home (pre-2000)-Well-Prepared': ['✅ Early service booking in February saves 30%+ on cost', '💧 Adjust watering schedule for July/August extremes'],
};

const defaultItems = ['❄️ AC tune-up in March or April', '🌿 MERV-11+ filter for cedar season', '📅 ERCOT peak avoidance 3-7pm', '🪟 Solar screens on west-facing windows', '💧 Foundation watering schedule'];

export default function DFWSummerProofingGuide2026() {
  const [homeType, setHomeType] = useState('');
  const [prepLevel, setPrepLevel] = useState('');

  const key = `${homeType}-${prepLevel}`;
  const items = checklist[key] || (homeType && prepLevel ? defaultItems : []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>☀️ PROLNK DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Summer-Proofing Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Prep your DFW home before the heat and ERCOT crunch — action now saves thousands later.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{label:'🏠 Home Type', val: homeType, set: setHomeType, opts: homeTypes}, {label:'🛡️ Current Prep Level', val: prepLevel, set: setPrepLevel, opts: prepLevels}].map(({label, val, set, opts}) => (
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
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Summer-Proofing Checklist</div>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 10, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>☀️ DFW Summer Key Facts</div>
          {['AC tune-up in March costs ~40% less than May/June emergency calls','ERCOT peak hours (3-7pm) have highest grid stress — pre-cool to 74°F by 2pm','Cedar season Feb-Mar demands MERV-11+ to protect AC coil from debris','Solar screens on west windows cut cooling load by 25-30%','Foundation watering during summer prevents $15K+ slab repairs'].map((f,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642′ }}>▸</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{f}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
