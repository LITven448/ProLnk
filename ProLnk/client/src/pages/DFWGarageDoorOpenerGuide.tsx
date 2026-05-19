import { useState } from 'react';

const DRIVE_TYPES = [
  {
    type: 'Belt Drive',
    noise: '⭐⭐⭐⭐⭐ Quietest',
    durability: '⭐⭐⭐⭐',
    cost: '$200–$380 installed',
    dfwNote: 'Best for attached garages. Belt can stretch in extreme DFW heat — buy a brand rated for 100°F+ ambient.',
    recommended: true,
  },
  {
    type: 'Chain Drive',
    noise: '⭐⭐ Loud',
    durability: '⭐⭐⭐⭐⭐',
    cost: '$150–$280 installed',
    dfwNote: 'Most durable in DFW heat. Best for detached garages where noise isn\’t a concern. Budget pick.',
    recommended: false,
  },
  {
    type: 'Screw Drive',
    noise: '⭐⭐⭐ Moderate',
    durability: '⭐⭐⭐',
    cost: '$175–$320 installed',
    dfwNote: '⚠️ Avoid in DFW. Plastic carriage components warp in 110°F+ garage temps. Requires more lubrication in heat.',
    recommended: false,
  },
  {
    type: 'Direct Drive',
    noise: '⭐⭐⭐⭐⭐ Quietest',
    durability: '⭐⭐⭐⭐⭐',
    cost: '$300–$500 installed',
    dfwNote: 'Premium pick. One moving part = lowest DFW heat failure risk. Sommer brand dominates this category.',
    recommended: true,
  },
];

const DOOR_WEIGHTS = ['Single car (8–10 ft wide)', 'Double car (16 ft wide)', 'RV / oversized (18+ ft)'];
const ECOSYSTEMS = ['None / standalone', 'Amazon Alexa', 'Google Home', 'Apple HomeKit', 'SmartThings'];

const RECOMMENDATIONS: Record<string, { model: string; hp: string; cost: string; reason: string }> = {
  'Single car (8–10 ft wide)-None / standalone': { model: 'Chamberlain B2405', hp: '1/2 HP', cost: '$180–$250', reason: 'Reliable, quiet, sufficient power for single doors in DFW heat.' },
  'Single car (8–10 ft wide)-Amazon Alexa': { model: 'Chamberlain B4643T (MyQ)', hp: '3/4 HP', cost: '$240–$320', reason: 'MyQ integrates natively with Alexa. 3/4 HP handles heat-related motor strain.' },
  'Single car (8–10 ft wide)-Google Home': { model: 'Chamberlain B6713T (MyQ)', hp: '3/4 HP', cost: '$260–$340', reason: 'MyQ + Google Assistant. Battery backup built in for DFW storm outages.' },
  'Single car (8–10 ft wide)-Apple HomeKit': { model: 'Meross Smart Garage + Yale', hp: '3/4 HP', cost: '$280–$380', reason: 'HomeKit-native via Meross bridge. Pair with any 3/4 HP belt drive.' },
  'Single car (8–10 ft wide)-SmartThings': { model: 'LiftMaster 8500W', hp: '3/4 HP', cost: '$300–$420', reason: 'Wall-mount saves ceiling space, works with SmartThings hub.' },
  'Double car (16 ft wide)-None / standalone': { model: 'LiftMaster 8165W', hp: '3/4 HP', cost: '$280–$380', reason: '3/4 HP mandatory for double doors in DFW — motor runs hotter in summer.' },
  'Double car (16 ft wide)-Amazon Alexa': { model: 'Chamberlain B4643T (MyQ)', hp: '3/4 HP', cost: '$300–$400', reason: 'MyQ Alexa integration, 3/4 HP, battery backup. Top pick for DFW double doors.' },
  'Double car (16 ft wide)-Google Home': { model: 'Chamberlain B6713T (MyQ)', hp: '3/4 HP', cost: '$320–$420', reason: 'Same as Alexa model but Google-certified. Best battery backup in class.' },
  'Double car (16 ft wide)-Apple HomeKit': { model: 'Sommer Direct Drive + Meross', hp: '1 HP', cost: '$400–$550', reason: '1 HP direct drive for heavy doors, HomeKit via Meross bridge. Zero flex in DFW heat.' },
  'Double car (16 ft wide)-SmartThings': { model: 'LiftMaster 8500W + MyQ', hp: '3/4 HP', cost: '$350–$480', reason: 'Wall-mount frees ceiling space in tight DFW garages. SmartThings compatible.' },
  'RV / oversized (18+ ft)-None / standalone': { model: 'Genie PowerLift 850', hp: '1-1/4 HP', cost: '$400–$600', reason: 'Commercial-grade power for oversized doors. Essential for DFW heat.' },
  'RV / oversized (18+ ft)-Amazon Alexa': { model: 'LiftMaster 84501 (myQ)', hp: '1 HP', cost: '$420–$620', reason: 'myQ Alexa, 1 HP, designed for large doors. Battery backup standard.' },
  'RV / oversized (18+ ft)-Google Home': { model: 'LiftMaster 84501 (myQ)', hp: '1 HP', cost: '$420–$620', reason: 'Same unit — myQ supports both Google and Alexa.' },
  'RV / oversized (18+ ft)-Apple HomeKit': { model: 'Sommer 1042V000 + Meross', hp: '1-1/4 HP', cost: '$500–$700', reason: 'Maximum torque for large doors. HomeKit via Meross. Top-of-market pick.' },
  'RV / oversized (18+ ft)-SmartThings': { model: 'LiftMaster 84501 + SmartThings', hp: '1 HP', cost: '$450–$650', reason: 'myQ integrates via SmartThings hub. Handles DFW heat reliably.' },
};

export default function DFWGarageDoorOpenerGuide() {
  const [doorWeight, setDoorWeight] = useState(DOOR_WEIGHTS[0]);
  const [ecosystem, setEcosystem] = useState(ECOSYSTEMS[0]);
  const [result, setResult] = useState<null | typeof RECOMMENDATIONS[string]>(null);

  function evaluate() {
    const key = `${doorWeight}-${ecosystem}`;
    setResult(RECOMMENDATIONS[key] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1E3A', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>🚗 Garage Door Opener Guide for DFW</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>DFW summers push garage temps past 120°F — the wrong opener degrades fast. This guide covers drive types, smart features, battery backup, and exact model picks by door size.</p>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '32px auto', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '18px 22px', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 8px' }}>🌡️ Why HP Matters More in DFW</h2>
          <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14, lineHeight: 1.7 }}>Garage door motors rated for "normal" temps work harder in 100°F+ garage temps — every 10°C above ambient rating cuts motor life by 50%. Always size up: use 3/4 HP for single doors in DFW (where 1/2 HP would suffice in cooler climates), and 1 HP for double doors.</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚙️ Drive Type Comparison</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 32 }}>
          {DRIVE_TYPES.map(d => (
            <div key={d.type} style={{ backgroundColor: '#0D1E3A', border: `1px solid ${d.recommended ? '#F5E64260' : '#1E3A5F'}`, borderRadius: 12, padding: 18, position: 'relative' }}>
              {d.recommended && <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#F5E642', color: '#0A1628', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10 }}>BEST FOR DFW</div>}
              <h3 style={{ color: '#F1F5F9', fontSize: 15, margin: '0 0 10px' }}>{d.type}</h3>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Noise: <span style={{ color: '#E2E8F0′ }}>{d.noise}</span></div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Durability: <span style={{ color: '#E2E8F0′ }}>{d.durability}</span></div>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>{d.cost}</div>
              <p style={{ color: '#64748B', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{d.dfwNote}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔍 Find the Right Opener for Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Door Size</label>
              <select value={doorWeight} onChange={e => setDoorWeight(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {DOOR_WEIGHTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Smart Home Ecosystem</label>
              <select value={ecosystem} onChange={e => setEcosystem(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {ECOSYSTEMS.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Recommended: {result.model}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>HP: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.hp}</span> · Installed cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span></div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 14 }}>{result.reason}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 22 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>⚡ Battery Backup — Essential in DFW</h2>
          <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14, lineHeight: 1.7 }}>DFW averages 8–12 significant storm events per year causing power outages. A battery backup opener lets you exit or enter your garage during outages — critical if your car is inside. Chamberlain's battery backup units run ~4 hours on battery, sufficient for most DFW outages. Budget an extra $50–$80 for battery backup capability when choosing a model.</p>
        </div>
      </div>
    </div>
  );
}
