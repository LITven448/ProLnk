import { useState } from 'react';

export default function DFWRainwaterHarvestingGuide2026() {
  const [roofSize, setRoofSize] = useState('');
  const [result, setResult] = useState('');

  function calculate() {
    const sqft = parseFloat(roofSize);
    if (!sqft) { setResult('Enter your roof area in square feet.'); return; }
    const annualRainfall = 37;
    const collectionFactor = 0.85;
    const gallonsPerInch = 0.623;
    const annual = Math.round(sqft * gallonsPerInch * annualRainfall * collectionFactor);
    const monthly = Math.round(annual / 12);
    const savings = Math.round(monthly * 0.004);
    setResult(`Potential collection: ~${monthly.toLocaleString()} gal/month (${annual.toLocaleString()} gal/year). Estimated water savings: ~$${savings}/mo. Under 5,000 gal capacity: no TX permit required.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌧️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Rainwater Harvesting Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Texas allows rainwater collection — here's how to capture free water for irrigation and outdoor use in DFW.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '📏', label: 'Permit-Free Limit (TX)', value: 'Under 5,000 gal' },
            { icon: '🌧️', label: 'DFW Avg Rainfall', value: '37 inches/yr' },
            { icon: '🛢️', label: 'Rain Barrel Cost', value: '$80–$200 each' },
            { icon: '🏗️', label: 'Cistern Cost', value: '$1,500–$5,000+' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: '16px', border: '1px solid #334155' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #334155' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🛢️ Rain Barrel vs Cistern</h2>
          {[
            { feature: 'Capacity', barrel: '50–100 gallons', cistern: '500–5,000 gallons' },
            { feature: 'Cost', barrel: '$80–$200', cistern: '$1,500–$5,000' },
            { feature: 'Install', barrel: 'DIY-friendly', cistern: 'Professional' },
            { feature: 'Best for', barrel: 'Small gardens', cistern: 'Full irrigation' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '10px 0', borderBottom: i < 3 ? '1px solid #334155' : 'none', fontSize: 14 }}>
              <div style={{ color: '#94a3b8' }}>{r.feature}</div>
              <div style={{ color: '#fff' }}>🛢️ {r.barrel}</div>
              <div style={{ color: '#F5E642' }}>🏗️ {r.cistern}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧮 Collection Potential Calculator</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <input value={roofSize} onChange={e => setRoofSize(e.target.value)} placeholder="Roof area (sq ft)" style={{ flex: 1, minWidth: 180, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <button onClick={calculate} style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Calculate</button>
          </div>
          {result && <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 14 }}>{result}</div>}
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 20, textAlign: 'center' }}>TX law permits rainwater harvesting for outdoor use. Check local HOA rules before installing.</p>
      </div>
    </div>
  );
}
