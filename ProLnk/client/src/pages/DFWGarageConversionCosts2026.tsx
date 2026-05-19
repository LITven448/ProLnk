import { useState } from 'react';

export default function DFWGarageConversionCosts2026() {
  const [conversionType, setConversionType] = useState('bedroom');
  const [finishLevel, setFinishLevel] = useState('standard');

  const costs: Record<string, Record<string, { low: number; high: number }>> = {
    bedroom: { budget: { low: 5000, high: 8000 }, standard: { low: 8000, high: 14000 }, luxury: { low: 14000, high: 22000 } },
    office: { budget: { low: 4000, high: 7000 }, standard: { low: 7000, high: 12000 }, luxury: { low: 12000, high: 20000 } },
    studio: { budget: { low: 6000, high: 10000 }, standard: { low: 10000, high: 18000 }, luxury: { low: 18000, high: 30000 } },
    gym: { budget: { low: 3000, high: 6000 }, standard: { low: 6000, high: 10000 }, luxury: { low: 10000, high: 18000 } },
  };

  const estimate = costs[conversionType][finishLevel];

  const lineItems = [
    { label: '🏛️ Permits (DFW avg)', low: 150, high: 400 },
    { label: '🧱 Insulation', low: 500, high: 800 },
    { label: '🪵 Drywall & Finishing', low: 800, high: 1500 },
    { label: '🪟 Flooring', low: 1000, high: 2000 },
    { label: '❄️ HVAC Extension / Mini-Split', low: 2000, high: 4000 },
    { label: '⚡ Electrical', low: 500, high: 1000 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EAF0′ }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>DFW Home Cost Guide 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>🏗️ Garage Conversion Cost Guide</h1>
        <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 32 }}>What DFW homeowners actually pay to convert a garage into livable space in 2026.</p>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 16px' }}>📊 Cost Breakdown by Line Item</h2>
          {lineItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1E2D45′ }}>
              <span style={{ fontSize: 14 }}>{item.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>${item.low.toLocaleString()} – ${item.high.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 16px' }}>🎛️ Estimate Your Conversion</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 6 }}>Conversion Type</label>
            <select value={conversionType} onChange={(e) => setConversionType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#FFFFFF', fontSize: 14 }}>
              <option value="bedroom">Bedroom / In-Law Suite</option>
              <option value="office">Home Office</option>
              <option value="studio">Studio / ADU</option>
              <option value="gym">Home Gym</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8892A4', marginBottom: 6 }}>Finish Level</label>
            <select value={finishLevel} onChange={(e) => setFinishLevel(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#FFFFFF', fontSize: 14 }}>
              <option value="budget">Budget</option>
              <option value="standard">Standard</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 4 }}>Estimated Total Investment</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#8892A4', marginTop: 4 }}>Based on 2026 DFW contractor rates</div>
          </div>
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 20, border: '1px solid #1E2D45′ }}>
          <p style={{ fontSize: 13, color: '#8892A4', margin: 0 }}>💡 <strong style={{ color: '#FFFFFF' }}>ProLnk Tip:</strong> Get 3 competing bids from DFW contractors on ProLnk. Average homeowners save 18% vs. calling one contractor directly.</p>
        </div>
      </div>
    </div>
  );
}
