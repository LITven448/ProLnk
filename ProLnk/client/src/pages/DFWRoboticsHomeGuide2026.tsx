import { useState } from 'react';

const robots = [
  { name: 'Husqvarna Automower 450X', icon: '🌿', task: 'Lawn Mowing', price: '$3,500', roi: 'Break even vs lawn service in 2.5 yrs', note: 'DFW Bermuda grass: mow daily at 1.5\" for dense, weed-resistant turf' },
  { name: 'iRobot Roomba j9+', icon: '🤖', task: 'Floor Cleaning', price: '$900', roi: '8 hrs/mo saved', note: 'Perfect for DFW tile, LVP, and hardwood. Auto-empties, avoids pet messes' },
  { name: 'Dolphin Nautilus CC Plus', icon: '🏊', task: 'Pool Cleaning', price: '$700', roi: '$1,200/yr vs pool service', note: 'DFW has 250K+ residential pools. Robotic cleaner pays off in 7 months' },
  { name: 'Ecovacs WinBot W1 Pro', icon: '🪟', task: 'Window Cleaning', price: '$450', roi: '4 hrs/quarter saved', note: 'DFW dust and pollen make window cleaning a monthly chore. Automate it' },
];

const features = [
  { label: 'Large Lawn (5,000+ sqft)', rec: 'Husqvarna Automower 450X or 550', roi: '$1,400/yr lawn service savings. Pays back in under 3 years. DFW Bermuda thrives with daily robotic mowing.' },
  { label: 'Swimming Pool', rec: 'Dolphin Nautilus CC Plus', roi: '$700 robot saves $1,200/yr in pool service. Clean pool every week automatically, no chemicals wasted.' },
  { label: 'Tile or LVP Floors', rec: 'iRobot Roomba j9+ or s9+', roi: 'DFW tile floors with pets = constant cleaning. Roomba auto-schedules, auto-empties. Saves 2 hrs/week.' },
  { label: 'Two-Story Windows', rec: 'Ecovacs WinBot W1 Pro', roi: 'DFW construction dust hits windows weekly. $450 robot cleans second-story safely. Saves $300/yr in window service.' },
];

export default function DFWRoboticsHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = features.find(f => f.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🤖</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Home Robotics Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Robots that actually make sense for DFW homes right now</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>🌱 DFW Bermuda Grass + Robotics</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>Bermuda grass in DFW grows fast from April–October. Robotic mowers like the Automower cut a little every day — producing denser, healthier turf than weekly blade cuts. 60% of DFW lawn pros now recommend robotic mowing for premium lawns.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Top Home Robots for DFW</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {robots.map(r => (
            <div key={r.name} style={{ background: '#112240', borderRadius: 10, padding: 16, display: 'flex', gap: 14, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 30, flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 3 }}>{r.name} — {r.price}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 3 }}>{r.task} • ROI: {r.roi}</div>
                <div style={{ color: '#cbd5e1', fontSize: 12 }}>{r.note}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏡 Find Your Robot + ROI</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>What does your DFW home have?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {features.map(f => (
            <button key={f.label} onClick={() => setSelected(f.label)}
              style={{ background: selected === f.label ? '#F5E642′ : '#1e3a5f', color: selected === f.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {f.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Recommended: {result.rec}</div>
            <div style={{ color: '#1a2f4a', fontSize: 14 }}>{result.roi}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk finds DFW pros for robot installation + setup • prolnk.io
        </div>
      </div>
    </div>
  );
}