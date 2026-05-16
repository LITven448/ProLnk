import { useState } from 'react';

const DOORBELL_RECS: Record<string, Record<string, Record<string, { product: string; wiring: string; complexity: string; note: string; cost: string }>>> = {
  new: {
    wired: {
      front: { product: 'Ring Video Doorbell Pro 2 (hardwired)', wiring: 'Compatible with 16–24V AC existing transformer', complexity: 'Easy — 30 min DIY install', note: 'Wired is strongly preferred in DFW — summer heat drains Ring battery in 2–4 weeks.', cost: '$249 + $100 pro install (optional)' },
      large: { product: 'Ring Floodlight Cam Wired Pro + Ring Doorbell Pro 2', wiring: 'Requires 120V outlet for floodlight + 16V AC for doorbell', complexity: 'Moderate — electrician recommended for floodlight', note: 'Large DFW driveways benefit from floodlight cam covering full approach.', cost: '$399–$550 + electrician $150–$300' },
    },
    battery: {
      front: { product: 'Ring Battery Doorbell Plus (reluctantly)', wiring: 'No wiring needed — USB-C rechargeable', complexity: 'Easiest install — 10 min', note: 'Battery in DFW summer heat: expect monthly recharges. Upgrade to wired when possible.', cost: '$179 + optional solar charger $49' },
      large: { product: 'Ring Spotlight Cam Battery x2 + Battery Doorbell Plus', wiring: 'All battery — no wiring required', complexity: 'Easy — no electrician', note: 'Cameras on large driveways will drain faster due to motion volume — solar strongly recommended.', cost: '$350–$500 + solar mounts' },
    },
  },
  mid: {
    wired: {
      front: { product: 'Ring Video Doorbell Wired + check transformer voltage first', wiring: 'Check existing: if under 16V, replace transformer ($25)', complexity: 'Moderate — check wiring compatibility', note: 'Many DFW homes 10–20 years old have original 8–10V transformers — upgrade required.', cost: '$59 doorbell + $25–$80 transformer + $100 install' },
      large: { product: 'Ring Floodlight Cam Wired + Doorbell Wired (transformer upgraded)', wiring: '120V junction box for floodlight needed — common in mid-age DFW garages', complexity: 'Moderate — check garage outlet availability', note: 'Mid-age DFW homes usually have a usable outlet near garage for floodlight cam.', cost: '$299 + electrician $100–$200' },
    },
    battery: {
      front: { product: 'Ring Battery Doorbell Pro (solar charger bundle)', wiring: 'No wiring — solar trickle charge recommended', complexity: 'Easy install', note: 'Solar charger in DFW gets strong sunlight — significantly extends battery life in summer.', cost: '$228 bundle with solar charger' },
      large: { product: 'Ring Stick Up Cam Battery x2 + Ring Battery Doorbell Pro', wiring: 'All battery with solar mounts', complexity: 'Easy — no electrician', note: 'Stick Up Cams are versatile for DFW homes with irregular coverage needs.', cost: '$400–$550 with solar mounts' },
    },
  },
  old: {
    wired: {
      front: { product: 'Ring Video Doorbell Pro 2 — must upgrade to 16V transformer', wiring: 'High likelihood of needing new transformer or full wiring run', complexity: 'Complex — electrician strongly recommended', note: 'Older DFW homes may have low-voltage wiring issues. Electrician assessment worth it.', cost: '$249 + electrician assessment $150–$400' },
      large: { product: 'Ring Floodlight Cam Wired Pro — new electrical run likely needed', wiring: 'New 120V circuit required if no outdoor outlet exists', complexity: 'Complex — full electrician job', note: 'Older DFW homes often lack outdoor outlets in the right locations. Budget for conduit run.', cost: '$249 + electrician $300–$600' },
    },
    battery: {
      front: { product: 'Ring Battery Doorbell Plus + solar charger — bypass wiring issues', wiring: 'No wiring — fully wireless solution', complexity: 'Easy — bypasses old wiring problems', note: 'For older DFW homes, battery + solar is often the best path until you do a full remodel.', cost: '$179 + $49 solar charger' },
      large: { product: 'Ring Spotlight Cam Battery x2 + Battery Doorbell Plus', wiring: 'All battery with solar — no wiring required', complexity: 'Easy install', note: 'Avoids costly electrical work in older DFW homes. Solar panels offset heat drain.', cost: '$400–$550 complete' },
    },
  },
};

export default function DFWRingDoorbellInstallGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [wiring, setWiring] = useState('');
  const [coverage, setCoverage] = useState('');
  const [result, setResult] = useState<null | { product: string; wiring: string; complexity: string; note: string; cost: string }>(null);

  function handleCheck() {
    if (homeAge && wiring && coverage && DOORBELL_RECS[homeAge]?.[wiring]?.[coverage]) {
      setResult(DOORBELL_RECS[homeAge][wiring][coverage]);
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🔔 DFW Smart Doorbell Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Ring Doorbell Installation Guide for DFW Homeowners
        </h1>
        <p style={{ color: '#9BA3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          DFW homeowners face a unique problem: summer heat drains Ring battery doorbells in weeks. Wired installation is strongly preferred in Texas. Here is how to assess your DFW home and choose the right device and installation approach.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '☀️', title: 'Battery Drain in DFW Heat', desc: 'Ring battery doorbells in DFW summer heat lose charge in 2–4 weeks. Wired installations are strongly preferred for DFW homes.' },
            { icon: '🔌', title: 'Existing Doorbell Wiring', desc: 'Most DFW homes built after 1990 have doorbell wiring. Check voltage — Ring Pro 2 requires 16–24V AC. Low-voltage needs a transformer upgrade.' },
            { icon: '📶', title: 'WiFi Signal at Front Door', desc: 'Doorbell cameras need strong WiFi. DFW brick exteriors can block signal. Consider a WiFi extender or mesh node near the front of your home.' },
            { icon: '💡', title: 'Floodlight Cams for DFW Driveways', desc: 'Larger DFW homes with long driveways benefit from Ring Floodlight Cam Wired Pro — covers the full approach zone, not just the door.' },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔧 Doorbell Recommendation Tool</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Home Age</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'new', l: 'New (0–10 years)' }, { v: 'mid', l: 'Mid-Age (10–25 years)' }, { v: 'old', l: 'Older (25+ years)' }].map((o) => (
                <button key={o.v} onClick={() => setHomeAge(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${homeAge === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: homeAge === o.v ? '#F5E642' : 'transparent', color: homeAge === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Existing Doorbell Wiring</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'wired', l: 'Has Existing Wired Doorbell' }, { v: 'battery', l: 'No Wiring / Going Battery' }].map((o) => (
                <button key={o.v} onClick={() => setWiring(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${wiring === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: wiring === o.v ? '#F5E642' : 'transparent', color: wiring === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Coverage Area</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'front', l: 'Front Door Only' }, { v: 'large', l: 'Front Door + Large Driveway / Side Yard' }].map((o) => (
                <button key={o.v} onClick={() => setCoverage(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${coverage === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: coverage === o.v ? '#F5E642' : 'transparent', color: coverage === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Doorbell Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📦 Your Ring Doorbell Plan</div>
              {[['📦 Product', result.product], ['🔌 Wiring Assessment', result.wiring], ['🔧 Install Complexity', result.complexity]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <span style={{ color: '#9BA3B8', fontSize: 13 }}>{label}</span>
                  <div style={{ color: '#E8EAF0', fontSize: 14, marginTop: 4 }}>{val}</div>
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#9BA3B8', fontSize: 13 }}>Estimated Cost</span>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 4 }}>{result.cost}</div>
              </div>
              <div style={{ backgroundColor: '#111D35', borderRadius: 8, padding: 16, marginTop: 8 }}>
                <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>⚠️ DFW Note: </span>
                <span style={{ color: '#9BA3B8', fontSize: 14 }}>{result.note}</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: 24, backgroundColor: '#0D1E3A', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#9BA3B8', fontSize: 14 }}>Need a DFW electrician or smart home installer to handle your doorbell install?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Find a certified DFW installer on ProLnk →</div>
        </div>
      </div>
    </div>
  );
}
