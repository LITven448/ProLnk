import { useState } from 'react';

const windowTypes = [
  { type: 'Single Pane', perWindow: '$150–$300', fullHome: '$2,000–$6,000', uFactor: '1.0+', notes: 'Minimal insulation, not recommended for DFW' },
  { type: 'Double Pane', perWindow: '$300–$700', fullHome: '$5,000–$14,000', uFactor: '0.25–0.40', notes: 'Standard for DFW, good heat rejection' },
  { type: 'Triple Pane', perWindow: '$550–$1,200', fullHome: '$9,000–$24,000', uFactor: '0.15–0.25', notes: 'Best insulation, worthwhile in north DFW' },
];

const frameTypes = [
  { material: 'Vinyl', costRange: '$300–$700', durability: 'Excellent', dfwNotes: 'Best value for DFW heat & humidity, low maintenance' },
  { material: 'Fiberglass', costRange: '$500–$1,500', durability: 'Superior', dfwNotes: 'Premium pick — minimal expansion in summer heat' },
  { material: 'Aluminum', costRange: '$400–$900', durability: 'Good', dfwNotes: 'Conducts heat — requires thermal break for DFW' },
  { material: 'Wood', costRange: '$600–$1,800', durability: 'Moderate', dfwNotes: 'Warps in humidity — needs regular maintenance' },
];

const savingsTable = [
  { from: 'Single Pane', sqft: 1500, savings: 320 },
  { from: 'Single Pane', sqft: 2500, savings: 530 },
  { from: 'Single Pane', sqft: 3500, savings: 740 },
  { from: 'Double Pane (no Low-E)', sqft: 1500, savings: 120 },
  { from: 'Double Pane (no Low-E)', sqft: 2500, savings: 200 },
  { from: 'Double Pane (no Low-E)', sqft: 3500, savings: 280 },
];

export default function DFWWindowReplacementCostGuide() {
  const [currentWindow, setCurrentWindow] = useState('Single Pane');
  const [homeSqft, setHomeSqft] = useState(2500);

  const match = savingsTable.find(
    (r) => r.from === currentWindow && r.sqft === homeSqft
  );
  const estimatedSavings = match ? match.savings : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOME IMPROVEMENT GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Window Replacement Cost Guide
        </h1>
        <p style={{ color: '#A0ADBF', fontSize: 16, marginBottom: 36 }}>
          Dallas–Fort Worth 2026 pricing — single, double &amp; triple pane, frame types, Low-E coatings, and DFW-specific energy savings.
        </p>

        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>☀️ DFW Climate Factor</div>
          <p style={{ color: '#C8D4E8', margin: 0, lineHeight: 1.6 }}>
            DFW averages 234+ sunny days per year with summer temps exceeding 100°F. Solar heat gain is the #1 factor in window selection — prioritize Low-E coatings and SHGC ratings below 0.25 for south and west-facing windows.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>📊 Cost by Window Type</h2>
        <div style={{ overflowX: 'auto', marginBottom: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#1A2E50' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>Type</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>Per Window</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>Full Home (15–20 windows)</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>U-Factor</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>DFW Notes</th>
              </tr>
            </thead>
            <tbody>
              {windowTypes.map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#0D1E38' : '#0A1628', borderBottom: '1px solid #1A2E50' }}>
                  <td style={{ padding: '11px 16px', fontWeight: 600, color: '#FFFFFF' }}>{row.type}</td>
                  <td style={{ padding: '11px 16px', color: '#C8D4E8' }}>{row.perWindow}</td>
                  <td style={{ padding: '11px 16px', color: '#C8D4E8' }}>{row.fullHome}</td>
                  <td style={{ padding: '11px 16px', color: '#F5E642' }}>{row.uFactor}</td>
                  <td style={{ padding: '11px 16px', color: '#A0ADBF', fontSize: 13 }}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🏗️ Frame Material Comparison</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 36 }}>
          {frameTypes.map((f, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 4 }}>{f.material}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>{f.costRange}</div>
              <div style={{ color: '#A0ADBF', fontSize: 12, lineHeight: 1.5 }}>{f.dfwNotes}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🔬 Low-E Glass for DFW</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 36 }}>
          <p style={{ color: '#C8D4E8', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: '#FFFFFF' }}>Low-E (low emissivity)</strong> coatings block up to 70% of solar infrared heat. In DFW's brutal summers this can reduce cooling costs by 15–25%. Look for ENERGY STAR certified windows with SHGC ≤ 0.25. Impact-resistant Low-E glass adds $100–$250 per window but qualifies for insurance discounts in hail-prone north DFW suburbs like Frisco and McKinney.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>⚡ Energy Savings Calculator</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 28, marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>CURRENT WINDOW TYPE</label>
              <select
                value={currentWindow}
                onChange={(e) => setCurrentWindow(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                <option>Single Pane</option>
                <option>Double Pane (no Low-E)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>HOME SIZE (SQ FT)</label>
              <select
                value={homeSqft}
                onChange={(e) => setHomeSqft(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                <option value={1500}>~1,500 sq ft</option>
                <option value={2500}>~2,500 sq ft</option>
                <option value={3500}>~3,500 sq ft</option>
              </select>
            </div>
          </div>
          {estimatedSavings !== null ? (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#A0ADBF', marginBottom: 4 }}>ESTIMATED ANNUAL ENERGY SAVINGS AFTER UPGRADE</div>
              <div style={{ fontSize: 44, fontWeight: 800, color: '#F5E642' }}>${estimatedSavings}</div>
              <div style={{ color: '#C8D4E8', fontSize: 13, marginTop: 6 }}>Upgrading to double pane Low-E in a {homeSqft.toLocaleString()} sq ft DFW home</div>
            </div>
          ) : (
            <div style={{ color: '#A0ADBF', textAlign: 'center' }}>Select options above to estimate savings.</div>
          )}
        </div>

        <div style={{ backgroundColor: '#1A2E50', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>🏠 Installation Cost Factors</div>
          <ul style={{ color: '#C8D4E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Window size — standard sizes cost 20–30% less than custom</li>
            <li>2nd floor or hard access adds $50–$100 per window</li>
            <li>Removal and disposal of old windows: $25–$50 each</li>
            <li>Labor in DFW: $100–$350 per window installed</li>
            <li>Permit: typically required in Plano, McKinney, Frisco — budget $100–$250</li>
            <li>Federal tax credit (2026): 30% of cost up to $600 for energy-efficient windows</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
