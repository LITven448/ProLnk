import { useState } from 'react';

type Upgrade = { label: string; cost: string; diy: boolean; priority: number };

const baseUpgrades: Upgrade[] = [
  { label: 'Charlie bar (floor blocking rod)', cost: '$25–$60', diy: true, priority: 1 },
  { label: 'Pin lock through upper frame (prevents lifting)', cost: '$5–$20', diy: true, priority: 2 },
  { label: 'Anti-lift plate (prevents door removal from track)', cost: '$15–$35', diy: true, priority: 3 },
  { label: 'Glass break sensor', cost: '$20–$50', diy: true, priority: 4 },
  { label: '3M safety/security window film (slows smash-and-grab)', cost: '$40–$150', diy: true, priority: 5 },
  { label: 'Smart contact sensor (alerts on open)', cost: '$15–$40', diy: true, priority: 6 },
];

const locationUpgrades: Record<string, Upgrade> = {
  dallas: { label: 'Motion floodlight aimed at patio (high foot-traffic area)', cost: '$80–$200', diy: true, priority: 7 },
  allen: { label: 'Camera covering backyard (theft from patios common)', cost: '$60–$150', diy: true, priority: 7 },
  arlington: { label: 'Privacy film (busy neighborhood, easy to scope)', cost: '$30–$80', diy: true, priority: 7 },
  default: { label: 'Exterior camera covering sliding door from outside', cost: '$60–$150', diy: true, priority: 7 },
};

export default function DFWSlidingDoorSecurityGuide() {
  const [doorCount, setDoorCount] = useState('');
  const [currentSecurity, setCurrentSecurity] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<Upgrade[] | null>(null);

  function assess() {
    const loc = locationUpgrades[location] || locationUpgrades.default;
    let upgrades = [...baseUpgrades, loc];
    if (currentSecurity === 'charlie') upgrades = upgrades.filter(u => u.priority !== 1);
    if (currentSecurity === 'pin') upgrades = upgrades.filter(u => u.priority !== 2);
    if (currentSecurity === 'none') upgrades = upgrades.slice(0, 5);
    if (doorCount === '3+') upgrades = [
      { label: 'Prioritize back/pool-facing doors first (higher risk)', cost: '$0', diy: true, priority: 0 },
      ...upgrades,
    ];
    setResult(upgrades.sort((a, b) => a.priority - b.priority));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40 }}>🚪</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, margin: '0.5rem 0′ }}>DFW Sliding Door Security Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '1.5rem' }}>
          DFW's indoor-outdoor lifestyle means most homes have 2–4 sliding glass doors. They’re also the most
          frequently targeted entry point after garages — standard sliding locks can be defeated in seconds.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🔓', title: 'Factory Lock Weakness', desc: 'Standard sliding door latches can be defeated with a credit card or pry bar in under 10 seconds' },
            { icon: '⬆️', title: 'Lifting Attack', desc: 'Many sliding doors can be lifted off their track and removed entirely — anti-lift plates stop this' },
            { icon: '🪟', title: 'Glass Smash Risk', desc: 'Standard glass shatters silently with a center punch; security film slows entry by 30–60 seconds' },
            { icon: '🌴', title: 'DFW Patio Culture', desc: 'Backyard patios and pools create privacy that hides attackers from neighbors and street cameras' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 22, marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#9BA8BB', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🔍 Build Your Security Plan</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { label: 'Number of Sliding Doors', val: doorCount, set: setDoorCount, opts: [['1', '1 door'], ['2', '2 doors'], ['3+', '3 or more']] },
              { label: 'Current Security', val: currentSecurity, set: setCurrentSecurity, opts: [['none', 'Just the factory latch'], ['charlie', 'Charlie bar / floor rod'], ['pin', 'Pin lock installed'], ['full', 'Bar + pin + sensor']] },
              { label: 'DFW Location', val: location, set: setLocation, opts: [['dallas', 'Dallas'], ['allen', 'Allen / Plano / Frisco'], ['arlington', 'Arlington / Grand Prairie'], ['other', 'Other DFW suburb']] },
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
            <button onClick={assess} disabled={!doorCount || !currentSecurity || !location}
              style={{ padding: '0.75rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Generate Security Plan
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🛡️ Your Sliding Door Plan</h2>
            {result.map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E8EDF5', marginBottom: 2 }}>{r.priority > 0 ? `#${r.priority} ` : ''}{r.label}</div>
                  <div style={{ fontSize: 12, color: r.diy ? '#4CAF82′ : '#F5A623' }}>{r.diy ? '🔧 DIY-friendly' : '👷 Pro install'}</div>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{r.cost}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0D1F38', borderRadius: 8 }}>
              <span style={{ color: '#9BA8BB', fontSize: 13 }}>
                💡 Total estimated cost: <strong style={{ color: '#F5E642′ }}>
                  ${result.filter(r => r.cost !== '$0').length * 35}–${result.filter(r => r.cost !== '$0').length * 100} per door
                </strong> for complete coverage
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
