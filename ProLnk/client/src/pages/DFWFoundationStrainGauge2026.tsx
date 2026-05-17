import { useState } from 'react';

export default function DFWFoundationStrainGauge2026() {
  const [need, setNeed] = useState('monitoring');

  const techMap: Record<string, { icon: string; name: string; cost: string; use: string }> = {
    monitoring: { icon: '📡', name: 'Electronic Strain Gauge', cost: '$800–$2,500 installed', use: 'Measures micro-deformation in beams and slabs. Ideal for active monitoring during post-repair settlement or high-clay-movement seasons.' },
    tilt: { icon: '📐', name: 'Tiltmeter / Inclinometer', cost: '$500–$1,800 per sensor', use: 'Tracks angular movement of walls, piers, and grade beams. Engineers use these when differential movement is suspected across a large DFW slab.' },
    settlement: { icon: '🔩', name: 'Settlement Plates', cost: '$200–$600 per location', use: 'Embedded reference points that allow surveyors to measure vertical displacement over time. Common in DFW post-pier-installation monitoring.' },
    simple: { icon: '📏', name: 'Manual Survey Benchmarks', cost: '$150–$400 per visit', use: 'Traditional elevation survey using optical levels. Less continuous than electronic sensors but sufficient for quarterly or annual monitoring programs.' },
  };

  const rec = techMap[need];

  const cards = [
    { icon: '🏗️', title: 'When High-Tech Monitoring Is Warranted', body: 'Active foundation repair, litigation support, pre-sale due diligence on a large DFW home, or when a structural engineer needs data to adjust a repair plan mid-project.' },
    { icon: '🌧️', title: 'DFW Shrink-Swell Clay Context', body: 'Expansive Blackland Prairie clay can move 1–3 inches seasonally. Electronic monitoring captures this movement in real time, helping engineers distinguish normal clay movement from structural failure.' },
    { icon: '💰', title: 'Cost Considerations', body: 'A complete electronic monitoring array for a DFW residential foundation runs $3,000–$8,000 installed plus $500–$1,500/year for data review. Justified when foundation repair costs exceed $15,000.' },
    { icon: '⚠️', title: 'Not For Every Home', body: 'Most DFW homeowners need a qualified foundation inspector, not high-tech sensors. Sensors are for engineers managing complex, ongoing, or legally disputed foundation situations.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Foundation Movement Monitoring Technology 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Advanced sensor systems for DFW foundation repair monitoring</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Monitoring Need → Technology Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>Select Your Monitoring Need</label>
          <select value={need} onChange={e => setNeed(e.target.value)}
            style={{ background: '#1a2d4a', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '8px 12px', width: '100%', marginBottom: 16 }}>
            <option value="monitoring">Active repair monitoring</option>
            <option value="tilt">Differential wall / slab movement</option>
            <option value="settlement">Post-pier settlement tracking</option>
            <option value="simple">Annual elevation survey</option>
          </select>
          <div style={{ background: '#122040', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{rec.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{rec.name}</div>
            <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 8 }}>Typical Cost: {rec.cost}</div>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{rec.use}</p>
          </div>
        </div>

        {cards.map((c, i) => (
          <div key={i} style={{ background: '#0D1F38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{c.icon} {c.title}</h3>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{c.body}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0D1F38', borderRadius: 12 }}>
          <p style={{ color: '#8899AA', fontSize: 12, margin: '0 0 12px' }}>Connect with a DFW foundation engineer through ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find a Foundation Engineer
          </button>
        </div>
      </div>
    </div>
  );
}