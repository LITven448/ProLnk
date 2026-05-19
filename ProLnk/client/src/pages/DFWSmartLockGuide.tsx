import { useState } from 'react';

const BRANDS = [
  {
    name: 'Schlage',
    types: ['Keypad', 'App + Keypad', 'Fingerprint + App'],
    dfwRating: '⭐⭐⭐⭐⭐',
    heatRating: 'Excellent',
    priceRange: '$150–$350',
    pros: ['ANSI Grade 1 — highest security rating', 'Metal bolt mechanism handles DFW heat expansion', 'Encode Pro has HomeKit/Alexa/Google built-in', 'Best warranty: Lifetime mechanical'],
    cons: ['Bulkier profile', 'App can lag on older firmware', 'Higher price point'],
  },
  {
    name: 'Kwikset',
    types: ['Keypad', 'App + Keypad', 'SmartKey rekey'],
    dfwRating: '⭐⭐⭐⭐',
    heatRating: 'Good',
    priceRange: '$80–$280',
    pros: ['SmartKey rekey in seconds (no locksmith needed)', 'Kevo Plus works with Alexa and Google', 'More affordable entry point', 'Z-Wave version for SmartThings'],
    cons: ['ANSI Grade 2 — good but not best', 'Plastic components expand more in heat', 'Fewer HomeKit-native options'],
  },
  {
    name: 'Yale',
    types: ['Keypad', 'App + Keypad', 'Fingerprint'],
    dfwRating: '⭐⭐⭐⭐',
    heatRating: 'Very Good',
    priceRange: '$120–$300',
    pros: ['Slim profile — fits tight DFW door frames', 'Assure Lock 2 is best HomeKit lock on market', 'Works with August bridge for multi-ecosystem', 'ANSI Grade 2+'],
    cons: ['Battery drain higher with Bluetooth', 'Fingerprint reader slows in heat', 'Assure Lock Pro pricey'],
  },
  {
    name: 'August',
    types: ['App + existing deadbolt', 'Keypad add-on'],
    dfwRating: '⭐⭐⭐',
    heatRating: 'Fair',
    priceRange: '$80–$250',
    pros: ['Installs over existing deadbolt (keep current key)', 'Auto-lock/unlock on proximity', 'Good multi-ecosystem support'],
    cons: ['Motor exposed to heat from inside', 'DFW summer heat causes occasional gear slip', 'App reliability complaints in 2024-25', 'No keypad without separate add-on'],
  },
];

const DOOR_TYPES = ['Standard wood door', 'Steel exterior door', 'Fiberglass door', 'Door with narrow stile (under 3″)'];
const ECOSYSTEMS = ['No smart home', 'Amazon Alexa', 'Google Home', 'Apple HomeKit', 'SmartThings / Z-Wave'];
const PRIORITIES = ['Maximum security', 'Convenience / auto-unlock', 'Budget-friendly', 'Easy DIY install'];

const RECS: Record<string, { lock: string; model: string; cost: string; install: string; note: string }> = {
  'Standard wood door-No smart home-Maximum security': { lock: 'Schlage', model: 'B60N + Camelot Keypad', cost: '$180–$220', install: 'DIY (45 min)', note: 'ANSI Grade 1, weatherized keypad, no app needed. Best mechanical security for DFW front doors.' },
  'Standard wood door-Amazon Alexa-Maximum security': { lock: 'Schlage', model: 'Encode Plus', cost: '$280–$320', install: 'DIY (60 min)', note: 'Built-in WiFi Alexa integration. Grade 1 bolt. No hub required — critical for DFW power outage scenarios.' },
  'Standard wood door-Apple HomeKit-Maximum security': { lock: 'Schlage', model: 'Encode Plus', cost: '$280–$320', install: 'DIY (60 min)', note: 'Same unit supports HomeKit natively. Best HomeKit deadbolt on market as of 2025.' },
  'Standard wood door-Apple HomeKit-Convenience / auto-unlock': { lock: 'Yale', model: 'Assure Lock 2 (YRL226)', cost: '$220–$280', install: 'DIY (45 min)', note: 'HomeKit-native auto-unlock. Slim profile. Best convenience lock for iPhone users in DFW.' },
  'Standard wood door-No smart home-Budget-friendly': { lock: 'Kwikset', model: '264 SmartCode Keypad', cost: '$80–$120', install: 'DIY (30 min)', note: 'Reliable keypad, rekeying capability, Grade 2 security. Best value no-smart-home lock.' },
  'Standard wood door-Amazon Alexa-Convenience / auto-unlock': { lock: 'Yale', model: 'Assure Lock 2 + Connect', cost: '$240–$300', install: 'DIY (60 min)', note: 'August auto-unlock engine inside Yale hardware — best of both worlds. Alexa and Google native.' },
  'Steel exterior door-Maximum security-No smart home': { lock: 'Schlage', model: 'B60N Deadbolt + B52 Handleset', cost: '$200–$260', install: 'Pro recommended', note: 'Steel doors require precise drilling — hire a locksmith for a pro install (~$80–$120). Grade 1 set.' },
  'Steel exterior door-Amazon Alexa-Maximum security': { lock: 'Schlage', model: 'Encode Plus', cost: '$280–$340 + install', install: 'Pro recommended ($80)', note: 'Grade 1 + WiFi + Alexa. Steel door alignment critical — pro install ensures bolt operates smoothly.' },
  'Door with narrow stile (under 3″)-Apple HomeKit-Maximum security': { lock: 'Yale', model: 'Assure Lock 2 Mini', cost: '$200–$250', install: 'DIY possible, tight', note: 'Only major brand with narrow stile option. Common in DFW townhomes in Uptown and Knox-Henderson.' },
};

export default function DFWSmartLockGuide() {
  const [doorType, setDoorType] = useState(DOOR_TYPES[0]);
  const [ecosystem, setEcosystem] = useState(ECOSYSTEMS[0]);
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [result, setResult] = useState<null | typeof RECS[string] | 'fallback'>(null);

  function evaluate() {
    const key = `${doorType}-${ecosystem}-${priority}`;
    const found = RECS[key];
    setResult(found || 'fallback');
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1E3A', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>🔐 Smart Lock Guide for DFW Homes</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>DFW summer heat — regularly 95°F+ — degrades electronics, warps door frames, and accelerates battery drain. This guide helps you choose a smart lock that actually lasts in North Texas conditions.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '32px auto', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '18px 22px', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 8px' }}>🌡️ DFW Heat Effects on Smart Locks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { icon: '🔋', title: 'Battery Drain', desc: 'Heat doubles battery self-discharge. AA lithium batteries outperform alkaline in DFW — they tolerate 100°F+ without leaking.' },
              { icon: '📐', title: 'Door Expansion', desc: 'Wood doors expand up to 3/8″ in DFW humidity swings. Choose a lock with a bolt tolerance range, not a friction fit.' },
              { icon: '💻', title: 'Electronics', desc: 'Fingerprint readers slow or fail above 95°F. If your door gets direct afternoon sun, avoid biometric-primary locks.' },
            ].map(c => (
              <div key={c.title} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#64748B', fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏷️ Brand Comparison for DFW</h2>
        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {BRANDS.map(b => (
            <div key={b.name} style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                <div>
                  <h3 style={{ color: '#F1F5F9', fontSize: 16, margin: '0 0 4px' }}>{b.name}</h3>
                  <div style={{ color: '#64748B', fontSize: 12 }}>Types: {b.types.join(', ')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{b.priceRange}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8′ }}>DFW: {b.dfwRating} · Heat: {b.heatRating}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>{b.pros.map(p => <div key={p} style={{ color: '#4ADE80', fontSize: 12, marginBottom: 2 }}>✓ {p}</div>)}</div>
                <div>{b.cons.map(c => <div key={c} style={{ color: '#F87171', fontSize: 12, marginBottom: 2 }}>✗ {c}</div>)}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔍 Find the Right Lock for Your DFW Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Door Type', value: doorType, options: DOOR_TYPES, set: setDoorType },
              { label: 'Smart Home Ecosystem', value: ecosystem, options: ECOSYSTEMS, set: setEcosystem },
              { label: 'Top Priority', value: priority, options: PRIORITIES, set: setPriority },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>{f.label}</label>
                <select value={f.value} onChange={e => f.set(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 13, boxSizing: 'border-box' }}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && result !== 'fallback' && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{result.lock} — {result.model}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span> · Install: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.install}</span></div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 14 }}>{result.note}</p>
            </div>
          )}
          {result === 'fallback' && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>Schlage Encode Plus — Best All-Around for DFW</div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 14 }}>For most DFW home configurations, the Schlage Encode Plus ($280–$320 installed) offers Grade 1 security, built-in WiFi for Alexa/Google/HomeKit, and a weatherized keypad designed for Texas summers. No hub required. Rekeying costs $50–$100 from a DFW locksmith if needed.</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 22 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🔑 Rekey vs. Replace — DFW Moving In</h2>
          <p style={{ color: '#CBD5E1', margin: '0 0 10px', fontSize: 14, lineHeight: 1.7 }}>When you move into a DFW home, rekeying existing locks costs <span style={{ color: '#F5E642', fontWeight: 700 }}>$25–$50 per lock</span> from a local locksmith (Frisco/Plano/McKinney have many). Replacing with a smart lock costs <span style={{ color: '#F5E642', fontWeight: 700 }}>$150–$400 installed</span>. If the existing hardware is Grade 1 Schlage, rekey first — then decide if smart features are worth the upgrade cost.</p>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#94A3B8′ }}>💡 Pro tip: Many DFW locksmiths offer free rekey with a smart lock purchase and installation — ask before booking separately.</div>
        </div>
      </div>
    </div>
  );
}
