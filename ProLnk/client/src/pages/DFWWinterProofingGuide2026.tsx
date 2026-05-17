import { useState } from 'react';

const homeTypes = ['Single-Family', 'Townhome', 'Condo', 'Pier & Beam'];
const prepLevels = ['None', 'Basic', 'Moderate', 'Well-Prepared'];

const checklist: Record<string, string[]> = {
  'Single-Family-None': ['🔧 Insulate all exterior pipes with foam sleeve ($1-3/ft)', '🗺️ Find and label your water main shutoff', '🔥 Schedule furnace tune-up before October', '🔋 Purchase battery backup or generator', '💧 Store 7+ gallons of water per person', '🌡️ Install smart freeze thermostat (runs heat ≤35°F)'],
  'Single-Family-Basic': ['🔧 Verify pipe insulation on all exterior runs', '🔥 Service furnace — replace filter, check igniter', '🔋 Test or upgrade backup power capacity', '💧 Top off stored water supply', '🏠 Caulk all window and door drafts'],
  'Single-Family-Moderate': ['🔥 Annual furnace tune-up — do not skip', '🔋 Test generator / battery backup now', '🗺️ Confirm everyone in household knows shutoff', '💧 Rotate stored water stock'],
  'Single-Family-Well-Prepared': ['✅ Run full system test in October', '💧 Confirm water storage is current', '📋 Share plan with household members'],
  'Pier & Beam-None': ['🚨 URGENT: Pier & beam pipes most vulnerable in DFW', '🔧 Insulate ALL under-floor pipes immediately', '🔒 Seal crawl space vents before freeze season', '🗺️ Locate and label water main shutoff', '🔥 Furnace tune-up by October', '🔋 Generator or battery backup essential', '💧 Store 7+ gallons per person'],
  'Pier & Beam-Basic': ['🔧 Inspect under-floor insulation for gaps', '🔒 Check crawl space vent seals', '🔥 Service furnace — igniter + heat exchanger', '🔋 Upgrade backup power if under 5kW'],
  'Pier & Beam-Moderate': ['🔒 Re-seal crawl space before November', '🔧 Add pipe heat tape to vulnerable runs', '🔥 Annual furnace service required'],
  'Pier & Beam-Well-Prepared': ['✅ Inspect crawl space seals in September', '📋 Test all systems before first cold front'],
};

const defaultItems = ['🔧 Insulate exterior pipes with foam sleeve', '🗺️ Know your water main shutoff location', '🔥 Service furnace before October', '🔋 Battery backup or generator', '💧 7-gallon water storage per person'];

export default function DFWWinterProofingGuide2026() {
  const [homeType, setHomeType] = useState('');
  const [prepLevel, setPrepLevel] = useState('');

  const key = `${homeType}-${prepLevel}`;
  const items = checklist[key] || (homeType && prepLevel ? defaultItems : []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>❄️ PROLNK DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Winter-Proofing Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Make your DFW home resilient before winter hits — lessons from Uri and beyond.</p>

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
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Winter-Proofing Checklist</div>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 10, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔑 DFW Winter Key Facts</div>
          {['Foam pipe insulation: $1–3/ft at any hardware store','Service your furnace in October — not December when techs are booked','Pier & beam homes freeze 3× faster than slab — act first','7 gallons of stored water per person covers 3 days','ProLnk connects you to vetted winterization pros across DFW'].map((f,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642' }}>▸</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{f}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
