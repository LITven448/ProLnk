import { useState } from 'react';

type RecommendationType = { label: string; cost: string; diy: boolean };

const recommendations: Record<string, Record<string, RecommendationType[]>> = {
  exterior: {
    deadbolt: [
      { label: 'Upgrade to Grade 1 ANSI deadbolt', cost: '$60–$120', diy: true },
      { label: 'Install door frame reinforcement kit (StrikeMaster II)', cost: '$80–$130', diy: true },
      { label: 'Replace short screws with 3-inch strike plate screws', cost: '$5–$15', diy: true },
      { label: 'Add hinge bolts (door opens outward)', cost: '$20–$40', diy: true },
    ],
    knob: [
      { label: 'Add deadbolt above existing knob lock', cost: '$60–$120', diy: true },
      { label: 'Full door frame reinforcement', cost: '$100–$200', diy: false },
      { label: 'Smart lock with deadbolt integration', cost: '$150–$300', diy: true },
      { label: '3-inch strike plate screws into stud', cost: '$5–$15', diy: true },
    ],
    smart: [
      { label: 'Reinforce door frame (smart locks fail if frame splinters)', cost: '$80–$130', diy: true },
      { label: 'Video doorbell for full entry visibility', cost: '$150–$250', diy: true },
      { label: 'Door barricade bar (interior reinforcement)', cost: '$30–$60', diy: true },
    ],
  },
  interior: {
    deadbolt: [
      { label: 'Door barricade bar for overnight security', cost: '$30–$60', diy: true },
      { label: 'Door alarm sensor', cost: '$15–$40', diy: true },
    ],
    default: [
      { label: 'Solid-core door replacement if hollow-core', cost: '$200–$600', diy: false },
      { label: 'Add deadbolt', cost: '$60–$120', diy: true },
    ],
  },
};

export default function DFWSafeDoorGuide() {
  const [doorType, setDoorType] = useState('');
  const [lockType, setLockType] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<RecommendationType[] | null>(null);

  function assess() {
    const doorGroup = recommendations[doorType] || recommendations.exterior;
    const recs = doorGroup[lockType] || doorGroup.default || recommendations.exterior.knob;
    const locationBonus: RecommendationType[] = location === 'dallas' || location === 'irving'
      ? [{ label: 'Peephole upgrade to wide-angle (urban areas)', cost: '$10–$30', diy: true }]
      : [{ label: 'Video doorbell (suburban visibility)', cost: '$150–$250', diy: true }];
    setResult([...recs, ...locationBonus]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40 }}>🚪</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, margin: '0.5rem 0′ }}>DFW Safe Door & Entry Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '1.5rem' }}>
          The lock isn't the weakest point — the door frame is. Most DFW break-ins happen by kicking in the door
          frame, not picking the lock. Proper reinforcement costs under $200 and takes an afternoon.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🦵', title: 'Kick-In Attack', desc: '60-second fix: 3-inch screws into stud framing costs $10′ },
            { icon: '🔑', title: 'Lock Picking', desc: 'Grade 1 deadbolt resists picking for 5+ minutes' },
            { icon: '🔧', title: 'Hinge Attack', desc: 'Hinge bolts prevent removal from outside on outswing doors' },
            { icon: '📷', title: 'Deterrence', desc: 'Video doorbell reduces entry attempts — visibility is a deterrent' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 24, marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#9BA8BB', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🔍 Get Your Recommendations</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Door Type', val: doorType, set: setDoorType, opts: [['exterior', 'Exterior Entry Door'], ['interior', 'Interior Door (garage to home)']] },
              { label: 'Current Lock', val: lockType, set: setLockType, opts: [['deadbolt', 'Deadbolt'], ['knob', 'Knob/Lever Only'], ['smart', 'Smart Lock']] },
              { label: 'DFW Location', val: location, set: setLocation, opts: [['dallas', 'Dallas (urban)'], ['irving', 'Irving'], ['plano', 'Plano/Frisco/Allen'], ['other', 'Other suburb']] },
            ].map((f, i) => (
              <div key={i}>
                <label style={{ color: '#9BA8BB', fontSize: 14 }}>{f.label}</label>
                <select value={f.val} onChange={e => f.set(e.target.value)}
                  style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                  <option value="">Select</option>
                  {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <button onClick={assess} disabled={!doorType || !lockType || !location}
              style={{ padding: '0.75rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Get Recommendations
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🛡️ Your Entry Reinforcement Plan</h2>
            {result.map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E8EDF5', marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: r.diy ? '#4CAF82′ : '#F5A623' }}>{r.diy ? '🔧 DIY' : '👷 Professional recommended'}</div>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{r.cost}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
