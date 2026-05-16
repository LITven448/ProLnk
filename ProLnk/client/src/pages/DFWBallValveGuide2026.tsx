import { useState } from 'react';

export default function DFWBallValveGuide2026() {
  const [valveLocation, setValveLocation] = useState('main-shutoff');
  const [valveType, setValveType] = useState('gate');
  const [guide, setGuide] = useState('');

  const locations = [
    { value: 'main-shutoff', label: 'Main House Shutoff' },
    { value: 'water-heater', label: 'Water Heater' },
    { value: 'toilet', label: 'Toilet Supply' },
    { value: 'sink', label: 'Sink Supply' },
    { value: 'washing-machine', label: 'Washing Machine' },
    { value: 'irrigation', label: 'Irrigation / Sprinkler' },
  ];

  const types = [
    { value: 'gate', label: 'Gate Valve (Round Wheel)' },
    { value: 'ball', label: 'Ball Valve (Lever Handle)' },
    { value: 'unknown', label: 'Not Sure' },
  ];

  const guides: Record<string, string> = {
    'main-shutoff-gate': '🚨 Upgrade Now: Your main house shutoff is a gate valve — this is the highest-priority upgrade in DFW plumbing. Gate valves seize when not used. In an emergency leak, a seized main shutoff is catastrophic. Replace with a full-port ball valve ($150–$300). DFW pros recommend 1-inch or 1.25-inch full-port brass ball valve.',
    'main-shutoff-ball': '✅ Good: Ball valve main shutoff is correct. Test annually — turn to OFF and back to ON to prevent seizing. Lever should move freely with quarter turn.',
    'main-shutoff-unknown': '🔍 Identify First: Locate where water line enters your DFW home (typically in garage, utility room, or outside near meter). Round wheel = gate valve (upgrade). Lever handle = ball valve (keep). Call a DFW plumber if uncertain.',
    'water-heater-gate': '⚠️ Upgrade Recommended: Gate valve on water heater cold supply is a common DFW install from pre-2000 homes. When heater needs replacement, plumber must shut this valve — seized gate valves delay emergency repairs. Replace: $75–$150.',
    'water-heater-ball': '✅ Correct: Ball valve on water heater supply is standard. Test once a year. Hot side output is typically soldered — no valve needed there.',
    'water-heater-unknown': '🔍 Check Cold Supply Line: Look at the pipe entering top of water heater. Round wheel = gate (upgrade). Lever = ball (good). Cold side always has shutoff; hot side may not.',
    'toilet-gate': '⚠️ Common in Older DFW Homes: Toilet angle stops (small oval valves under toilet tank) are often old compression valves that fail when used. Replace with 1/4-turn ball-style angle stop ($25–$60 installed). Do this proactively or when toilet is next serviced.',
    'toilet-ball': '✅ Modern Setup: Quarter-turn angle stop is correct for DFW toilets. Test annually — ensure valve moves freely.',
    'toilet-unknown': '🔍 Look Under Tank: Small oval knob = old compression valve (replace). Lever handle = ball-style angle stop (good). Both are located on the wall/floor behind toilet.',
    'sink-gate': '⚠️ Replace During Next Service: Under-sink angle stops (hot and cold) are commonly old compression valves in DFW homes. These seize and fail when turned in emergencies. Replace both hot and cold angle stops with 1/4-turn ball valves ($50–$100 installed per sink).',
    'sink-ball': '✅ Correct: 1/4-turn angle stops under sink are standard. Test annually — they should turn freely.',
    'sink-unknown': '🔍 Check Under Sink Cabinet: Look for two valves on wall/floor (hot left, cold right). Oval knobs = old valves (replace). Lever handles = good.',
    'washing-machine-gate': '🚨 High Risk: Washing machine supply valves fail frequently in DFW — full pressure supply lines, vibration from machine, and hard DFW water corrode old gate valves. Replace both hot and cold with quarter-turn ball valves. Consider a single-lever washing machine shutoff valve (turns off both lines at once). Cost: $80–$150.',
    'washing-machine-ball': '✅ Good Setup: Quarter-turn ball valves on washer supply lines are correct. Shut off after each use or install auto-shutoff valve for maximum protection.',
    'washing-machine-unknown': '🔍 Behind Washer: Look for two valves (hot and cold). Spigot/hose bibb style = often gate design (upgrade). Full lever = ball (good). Washing machine leaks are a top DFW homeowner insurance claim.',
    'irrigation-gate': '⚠️ Upgrade Before Next Season: Irrigation system main shutoff and zone valves are often gate-style in older DFW systems. Replace main shutoff with ball valve. Zone valves (Rainbird, Hunter) are typically solenoid-controlled and don't need replacement — only manual shutoffs.',
    'irrigation-ball': '✅ Correct: Ball valve irrigation shutoff is standard. Winterize DFW sprinkler systems in late November — blow out lines or shut off and drain.',
    'irrigation-unknown': '🔍 Backflow Preventer: Your main irrigation shutoff is typically near the backflow preventer (required by DFW municipalities). Usually in landscape near foundation. Look for handles vs. wheels.',
  };

  const getGuide = () => setGuide(guides[`${valveLocation}-${valveType}`] || 'Select valve location and type above.');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚰</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Ball Valve vs Gate Valve Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Water Shutoff Valves in DFW Homes — When to Upgrade, What to Know</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          {[
            { icon: '✅', title: 'Ball Valve (Recommended)', body: 'Quarter-turn lever. Reliable after years of disuse. Full-port allows unrestricted flow. DFW plumbers specify ball valves for all new installations. $15–$45 per valve.', tag: 'Modern Standard' },
            { icon: '⚠️', title: 'Gate Valve (Legacy)', body: 'Multi-turn round wheel. Commonly seizes when unused. Rubber wedge deteriorates over time. Standard in DFW homes built before ~1995. Replace proactively.', tag: 'Upgrade Needed' },
            { icon: '💰', title: 'Upgrade Cost', body: 'Replacing one gate valve with ball valve: $75–$150 per valve. Whole-house valve audit + replacement (all angle stops + main): $400–$800. Best done during any nearby plumbing work.', tag: 'Investment' },
            { icon: '🛡️', title: 'Emergency Value', body: 'In a DFW water emergency (slab leak, burst pipe, appliance failure), you need valves that work on first try. A seized gate valve during a flood costs thousands in water damage. Ball valves are insurance.', tag: 'Risk Reduction' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ background: '#1E3A5F', color: '#94A3B8', fontSize: 11, padding: '2px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 8 }}>{c.tag}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧭 Valve Upgrade Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Valve Location</label>
              <select value={valveLocation} onChange={e => setValveLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {locations.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Valve Type</label>
              <select value={valveType} onChange={e => setValveType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {types.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>Get Valve Guide</button>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7, border: '1px solid #F5E642' }}>{guide}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>ProLnk — DFW Ball Valve vs Gate Valve Guide 2026</p>
      </div>
    </div>
  );
}
