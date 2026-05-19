import { useState } from 'react';

const concerns = [
  {
    concern: 'Water leak / burst pipe',
    devices: [
      { name: 'Moen Flo Smart Water Monitor', cost: '$499-$599 + install', complexity: 'Medium — main line install, pros recommended', how: 'Monitors flow 24/7; auto-shuts off at main if leak detected. DFW freeze events make this critical.' },
      { name: 'Phyn Plus Smart Water Assistant', cost: '$699 + install', complexity: 'Medium — requires licensed plumber for install', how: 'AI-based flow fingerprinting detects micro-leaks before they become disasters.' },
      { name: 'Govee Water Leak Sensors (standalone)', cost: '$15-$25 each', complexity: 'Low — place under sinks, near water heater, by washer', how: 'Alerts only — no auto-shutoff, but excellent early warning at low cost.' },
    ],
    dfwNote: 'DFW freeze events (2021 Uri, 2023) caused billions in pipe damage. A smart shutoff pays for itself after one freeze event.',
  },
  {
    concern: 'Gas leak',
    devices: [
      { name: 'Kidde Combination CO + Natural Gas Detector', cost: '$40-$80', complexity: 'Low — plug-in or hardwired', how: 'Detects natural gas and CO. Alerts only — cannot auto-shut gas without an automatic gas shutoff valve.' },
      { name: 'Automatic Gas Shutoff Valve (seismic/manual)', cost: '$200-$600 installed', complexity: 'High — requires licensed plumber or HVAC tech', how: 'Shuts main gas line on seismic event or manual trigger. Not yet smart-app-integrated for most models.' },
      { name: 'Smart Gas Valve Controllers', cost: '$300-$900 installed', complexity: 'High — licensed install required', how: 'Newer products from Rheem and others integrate with smart home to shut gas remotely.' },
    ],
    dfwNote: 'Atmos Energy serves most of DFW — call 1-866-322-8667 if you smell gas. Do not use switches or phones near the leak.',
  },
  {
    concern: 'Electrical fire / arc fault',
    devices: [
      { name: 'Smart AFCI Breakers (Leviton, Square D)', cost: '$60-$120 per breaker + labor', complexity: 'High — licensed electrician required', how: 'Arc Fault Circuit Interrupters detect dangerous arcing and trip the breaker automatically. 2020 NEC requires in most rooms.' },
      { name: 'Leviton Smart Load Center', cost: '$400-$800 + panel upgrade', complexity: 'Very High — full panel replacement', how: 'Smart panel with app control, circuit-level monitoring, and remote shutoff.' },
      { name: 'Whole-Home Energy Monitor (Sense, Emporia)', cost: '$299-$499 + install', complexity: 'Medium — electrician for CT clamp install', how: 'Detects abnormal electrical patterns, identifies appliances, can alert to potential fire risks.' },
    ],
    dfwNote: 'DFW homes built before 1999 often lack AFCI protection. If your panel is over 20 years old, a smart upgrade is a safety and insurance priority.',
  },
  {
    concern: 'Sump pump / flooding',
    devices: [
      { name: 'Basement Watchdog Smart Sump Monitor', cost: '$60-$120', complexity: 'Low — clips to existing sump pump', how: 'Monitors pump operation and alerts via app if pump fails or water rises unexpectedly.' },
      { name: 'Zoeller Smart Pump System', cost: '$400-$800 installed', complexity: 'Medium — replaces existing pump', how: 'Integrated smart pump with app monitoring, alerts, and backup power integration.' },
      { name: 'Water Alarm + Auto Sump Controller', cost: '$100-$200', complexity: 'Low-Medium', how: 'Triggers backup pump or closes valve when primary pump fails.' },
    ],
    dfwNote: 'DFW flooding risk is highest in creek-adjacent and low-elevation areas of Garland, Mesquite, Irving, and south Fort Worth. Check your FEMA flood zone at msc.fema.gov.',
  },
];

export default function DFWSmartShutoffGuide() {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState<null | typeof concerns[0]>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW SMART HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Smart Auto Shut-Off Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '2rem' }}>Freeze events, severe storms, aging infrastructure — DFW homes face real risks. Smart auto shut-offs can prevent catastrophic damage from water, gas, and electrical failures.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>❄️ DFW Risk Context</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['❄️ Freeze Events', 'Uri 2021 caused $200B+ in damage nationally. DFW pipes are not insulated for Arctic blasts.'], ['⛈ Severe Storms', '70+ mph winds, hail, and tornadoes are seasonal realities across DFW.'], ['🏚 Aging Housing', 'Significant DFW housing stock is 30-50+ years old with original plumbing and electrical.'], ['💰 Insurance Impact', 'Smart devices can reduce homeowner insurance premiums 5-15% — ask your insurer.']].map(([icon, desc]) => (
              <div key={icon} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ fontSize: '0.85rem', color: '#9BA3B8' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Find Your Shut-Off Solution</h2>
          <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>What are you most concerned about?</label>
          <select value={idx} onChange={e => { setIdx(+e.target.value); setResult(null); }} style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, marginBottom: '1rem' }}>
            {concerns.map((c, i) => <option key={i} value={i}>{c.concern}</option>)}
          </select>
          <button onClick={() => setResult(concerns[idx])} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get Recommendations</button>
          {result && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#F5E642' }}>📍 DFW Note: {result.dfwNote}</div>
              {result.devices.map((d, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1.25rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>🔌 {d.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ background: '#0F2040', borderRadius: 6, padding: '0.5rem', fontSize: '0.8rem' }}><span style={{ color: '#9BA3B8' }}>Cost: </span>{d.cost}</div>
                    <div style={{ background: '#0F2040', borderRadius: 6, padding: '0.5rem', fontSize: '0.8rem' }}><span style={{ color: '#9BA3B8' }}>Install: </span>{d.complexity}</div>
                  </div>
                  <div style={{ color: '#9BA3B8', fontSize: '0.85rem' }}>{d.how}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📞 DFW Emergency Numbers</h2>
          {[['🚰 Water Emergency', 'Contact your city water utility — posted on your bill'], ['⛽ Gas Leak (Atmos)', '1-866-322-8667 — evacuate first, call from outside'], ['⚡ Electrical Emergency', 'Oncor: 888-313-4747 — call for downed lines or outages'], ['🔥 Fire / Emergency', '911 — always first']].map(([icon, desc]) => (
            <div key={icon} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1E3A5F' }}>
              <span>{icon}</span>
              <span style={{ color: '#9BA3B8', fontSize: '0.9rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
