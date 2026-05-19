import { useState } from 'react';

export default function DFWFoundationPierSpacing2026() {
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState('');

  const estimate = () => {
    const s = parseInt(sqft);
    if (!s || s < 500) { setResult('Please enter a valid square footage (500+).'); return; }
    const perimeter = Math.round(4 * Math.sqrt(s));
    const minPiers = Math.round(perimeter / 10);
    const maxPiers = Math.round(perimeter / 7);
    const corners = 4;
    setResult(`Estimated ${minPiers}–${maxPiers} piers for ~${s} sq ft home. At least ${corners} corner piers (highest priority). Add piers at every load-bearing wall intersection. Budget: $${(minPiers * 1400).toLocaleString()}–$${(maxPiers * 1600).toLocaleString()} at DFW market rates ($1,400–$1,600/pier installed).`);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          🏗️ Foundation Pier Spacing Guide
        </h1>
        <p style={{ color: '#9BAEC8', marginBottom: '28px', lineHeight: 1.6 }}>
          The most common DFW foundation repair complaint: <strong style={{ color: '#F5E642′ }}>too few piers placed too far apart</strong>. Standard spacing is 7–10 ft, but load paths and soil conditions dictate actual placement.
        </p>

        {[
          { icon: '📐', title: '7–10 Ft Standard Spacing', desc: 'Industry standard for DFW expansive clay. Closer spacing (7 ft) for heavy load-bearing walls; wider (10 ft) only for light interior partitions with good soil.' },
          { icon: '📍', title: 'Corners Are Non-Negotiable', desc: 'All four exterior corners must receive piers first — they bear the most load and show earliest failure signs in DFW clay soil movement.' },
          { icon: '🧱', title: 'Load-Bearing Wall Locations', desc: 'Center beam, kitchen/bath walls, and staircase support walls require piers beneath them regardless of spacing formula.' },
          { icon: '👷', title: 'Engineer-Supervised vs. Company-Only', desc: 'Engineer-supervised layouts cost $400–$800 extra but produce a stamped plan. Company-only layouts vary widely — get 3 quotes and compare pier counts.' },
        ].map((item) => (
          <div key={item.title} style={{ backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.title}</div>
            <div style={{ color: '#9BAEC8', fontSize: '14px' }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#111D35', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
          <div style={{ fontWeight: 700, marginBottom: '16px', color: '#F5E642′ }}>📏 Foundation Size → Pier Count Estimator</div>
          <input
            type="number"
            placeholder="Enter home square footage..."
            value={sqft}
            onChange={(e) => { setSqft(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '12px', fontSize: '15px', boxSizing: 'border-box' }}
          />
          <button
            onClick={estimate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            Estimate Pier Count
          </button>
          {result && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#E8EDF5', lineHeight: 1.6, fontSize: '14px' }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ marginTop: '28px', backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', borderTop: '2px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: '6px' }}>⚠️ DFW Red Flag Alert</div>
          <div style={{ color: '#9BAEC8', fontSize: '14px' }}>If a DFW contractor proposes fewer than 1 pier per 100 sq ft of home footprint, demand a written justification. Underpiering is the leading cause of warranty callbacks in North Texas.</div>
        </div>
      </div>
    </div>
  );
}

