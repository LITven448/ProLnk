import { useState } from 'react';

export default function DFWBermudasodGuide2026() {
  const [useCase, setUseCase] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!useCase || !budget) { setResult('Please select both options.'); return; }
    const guides: Record<string, Record<string, string>> = {
      residential: {
        low: '🌱 Common Bermuda from seed: $0.05–0.15/sq ft. Slower establishment (6–8 weeks), but cheapest option for DFW homeowners. Water daily until established.',
        mid: '🟡 Tifway 419: $0.45–0.65/sq ft installed. The DFW standard for quality yards. Dense, fine-textured, handles heat and traffic exceptionally well.',
        high: '⭐ TifTuf Bermuda: $0.70–0.90/sq ft. Most drought-tolerant Bermuda in DFW. Uses 38% less water than Tifway — worth it for large DFW lots.',
      },
      sports: {
        low: 'Common Bermuda not ideal for sports — poor uniformity. Minimum spend on Tifway 419 for sports use in DFW.',
        mid: '🏟️ Tifway 419: Industry standard for DFW sports fields. Rapid recovery from divots, handles heavy foot traffic. Install at 3/4 inch thickness.',
        high: '🏆 Celebration Bermuda: Best for high-use DFW sports turf. Exceptional drought tolerance, rapid recovery, dark color under stress.',
      },
      shady: {
        low: '⚠️ Bermuda + shade = poor results. Common Bermuda needs 8+ hours sun. Budget for St. Augustine if shade exceeds 4 hrs/day in DFW.',
        mid: '⚠️ Latitude 36 performs best in shade among Bermudas but still needs 6+ hours. Consider mix: Bermuda in sun, St. Augustine in shade zones.',
        high: '🌟 Latitude 36 Bermuda: Best cold AND shade tolerance for north DFW. Stays green 3–4 weeks longer in fall. Premium pick for shaded north-facing DFW yards.',
      },
    };
    setResult(guides[useCase]?.[budget] || 'Select valid options.');
  };

  const varieties = [
    { name: 'Tifway 419', emoji: '🟡', traits: ['DFW standard', 'Fine texture', 'High traffic'], cost: '$0.45–0.65/sqft' },
    { name: 'Celebration', emoji: '🌿', traits: ['Drought tolerant', 'Dark color', 'Sports grade'], cost: '$0.55–0.75/sqft' },
    { name: 'TifTuf', emoji: '💧', traits: ['38% less water', 'Best drought', 'Soft feel'], cost: '$0.70–0.90/sqft' },
    { name: 'Latitude 36', emoji: '❄️', traits: ['Cold tolerant', 'N. DFW best', 'Shade-ok'], cost: '$0.65–0.85/sqft' },
    { name: 'Common Bermuda', emoji: '🌱', traits: ['Seed-grown', 'Budget pick', 'Slower est.'], cost: '$0.05–0.15/sqft' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 PROLNK LAWN GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Bermuda Sod Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Compare all Bermuda varieties for DFW conditions — heat, drought, traffic, and budget.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {varieties.map(v => (
            <div key={v.name} style={{ padding: 14, background: '#0d1f3c', border: '1px solid #1e3a5f', borderRadius: 8 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{v.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{v.name}</div>
              {v.traits.map(t => <div key={t} style={{ color: '#94a3b8', fontSize: 11, marginBottom: 2 }}>• {t}</div>)}
              <div style={{ color: '#F5E642', fontSize: 11, marginTop: 8 }}>{v.cost}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Find your Bermuda variety:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[['🏠 Residential', 'residential'], ['🏟️ Sports/Active', 'sports'], ['🌲 Shady Areas', 'shady']].map(([label, val]) => (
            <button key={val} onClick={() => setUseCase(val)} style={{ padding: '12px', border: useCase === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: useCase === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer', fontSize: 13 }}>{label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[['💚 Budget', 'low'], ['💛 Mid-Range', 'mid'], ['💎 Premium', 'high']].map(([label, val]) => (
            <button key={val} onClick={() => setBudget(val)} style={{ padding: '12px', border: budget === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: budget === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer', fontSize: 13 }}>{label}</button>
          ))}
        </div>

        <button onClick={getGuide} style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>Get My Bermuda Variety Guide ➜</button>
        {result && <div style={{ padding: 20, background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 8, lineHeight: 1.7 }}>{result}</div>}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1f3c', borderRadius: 8, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need Sod Installed in DFW?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk matches you with DFW-certified sod installers. Compare quotes in minutes.</p>
          <button style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}