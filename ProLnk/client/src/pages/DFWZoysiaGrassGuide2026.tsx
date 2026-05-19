import { useState } from 'react';

export default function DFWZoysiaGrassGuide2026() {
  const [yardUse, setYardUse] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!yardUse || !budget) { setResult('Please select both options.'); return; }
    const guides: Record<string, Record<string, string>> = {
      aesthetic: {
        low: '🌿 Meyer Zoysia from plugs: Slowest but cheapest Zoysia path. Plugs at 6-inch spacing, full coverage in 2-3 seasons. Great for patient DFW homeowners who want premium look without premium sod cost.',
        mid: '🟢 Meyer Zoysia sod: The most popular Zoysia in DFW. Dense, carpet-like texture. Slower establishment than Bermuda but holds color 4-6 weeks longer in fall. Install April-June for best results.',
        high: '⭐ Palisades Zoysia: Fastest-establishing Zoysia in DFW. Broader blade, excellent curb appeal. Good for homeowners that want quick results. Costs 20% more than Meyer but fills in 40% faster.',
      },
      lowmaintenance: {
        low: '🛋️ Meyer Zoysia plugs for low-maintenance budget — once established, needs mowing every 10-14 days vs Bermuda every 5-7. Minimal inputs required.',
        mid: '🛋️ Meyer or Empire Zoysia: Ideal low-maintenance choice for DFW. Mow every 10-14 days in peak summer. Requires 40% less water than St. Augustine. Fertilize 3x/year instead of Bermuda 5-6x.',
        high: '🏆 Empire Zoysia: Best shade + low-maintenance combo in DFW. Tolerates 40% shade. Mowing every 10-14 days. Water 0.5-0.75 inches/week once established. Premium choice for busy DFW homeowners.',
      },
      shadytolerant: {
        low: '🌳 Zoysia plugs in shade: Empire variety from plugs if budget is tight. Cover shade zones only, keep Bermuda in full sun for faster fill.',
        mid: '🌳 Empire Zoysia: Best shade tolerance of all DFW Zoysia varieties. Handles 40-50% shade. Pairs well with Bermuda in sunny sections. Stays green into November in DFW.',
        high: '🌟 Empire Zoysia premium install: Full sodding for seamless shade-to-sun transition. Professional installation ensures no gaps. Zoysia is slow to fill bare spots so full install is worth the investment.',
      },
    };
    setResult(guides[yardUse]?.[budget] || 'Select valid options.');
  };

  const comparisons = [
    { trait: 'Mow Frequency', bermuda: 'Every 5-7 days', zoysia: 'Every 10-14 days' },
    { trait: 'Water Need', bermuda: 'Medium-High', zoysia: 'Low-Medium' },
    { trait: 'Fall Color', bermuda: 'Browns early Oct', zoysia: 'Green to Nov' },
    { trait: 'Shade Tolerance', bermuda: 'Poor', zoysia: 'Good (Empire)' },
    { trait: 'Establishment', bermuda: '4-6 weeks', zoysia: '8-16 weeks' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 PROLNK LAWN GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Zoysia Grass Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Zoysia is gaining fast in DFW — lower water, longer green season, and easier maintenance.</p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 13 }}>ZOYSIA vs BERMUDA — DFW COMPARISON</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ background: '#0d1f3c' }}>
              {['Trait', 'Bermuda', 'Zoysia'].map(h => <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>)}
            </tr></thead>
            <tbody>{comparisons.map((r, i) => (
              <tr key={r.trait} style={{ background: i % 2 === 0 ? '#0d1f3c' : '#0A1628′ }}>
                <td style={{ padding: '8px 12px', color: '#94a3b8′ }}>{r.trait}</td>
                <td style={{ padding: '8px 12px' }}>{r.bermuda}</td>
                <td style={{ padding: '8px 12px', color: '#F5E642′ }}>{r.zoysia}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>What matters most to you?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[['🏡 Curb Appeal', 'aesthetic'], ['🛋️ Low Maintenance', 'lowmaintenance'], ['🌳 Shade Tolerance', 'shadytolerant']].map(([label, val]) => (
            <button key={val} onClick={() => setYardUse(val)} style={{ padding: '12px', border: yardUse === val ? '2px solid #F5E642′ : '1px solid #1e3a5f', borderRadius: 8, background: yardUse === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: ’pointer', fontSize: 13 }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[['💚 Budget', 'low'], ['💛 Mid-Range', 'mid'], ['💎 Premium', 'high']].map(([label, val]) => (
            <button key={val} onClick={() => setBudget(val)} style={{ padding: '12px', border: budget === val ? '2px solid #F5E642′ : '1px solid #1e3a5f', borderRadius: 8, background: budget === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: ’pointer', fontSize: 13 }}>{label}</button>
          ))}
        </div>

        <button onClick={getGuide} style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>Get My Zoysia Guide</button>
        {result && <div style={{ padding: 20, background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 8, lineHeight: 1.7 }}>{result}</div>}

        <div style={{ marginTop: 20, padding: 16, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Patience Required</div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Zoysia establishes 2-3x slower than Bermuda. Stay off the lawn 4 weeks post-install and do not over-water as this causes shallow roots. It is growing roots, not blades.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 16 }}>
          {[['🟢 Meyer Zoysia', 'Most popular DFW. Dense and carpet-like. Slow but reliable.'],['⚡ Palisades', 'Fastest establish. Wider blade. Best for quick results.'],['🌳 Empire', 'Shade champion. Low water. Best maintenance profile.']].map(([name, desc]) => (
            <div key={name as string} style={{ padding: 14, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: 20, background: '#0d1f3c', borderRadius: 8, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get Zoysia Installed in DFW</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk connects you with DFW lawn pros who specialize in Zoysia installation.</p>
          <button style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}
