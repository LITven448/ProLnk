import { useState } from 'react';

const tileTypes = [
  { name: 'Porcelain', costInstalled: '$8–$20/sqft', durability: 'Excellent', slipRating: 'High', dfwNote: 'Best for DFW — handles heat, moisture, heavy traffic; most popular choice', bestFor: 'Floors, showers, outdoor patios' },
  { name: 'Ceramic', costInstalled: '$5–$14/sqft', durability: 'Good', slipRating: 'Medium', dfwNote: 'Budget-friendly, wide variety, softer than porcelain — avoid high-traffic DFW entries', bestFor: 'Walls, backsplashes, low-traffic floors' },
  { name: 'Natural Stone (Travertine)', costInstalled: '$15–$35/sqft', durability: 'Good', slipRating: 'Medium', dfwNote: 'Beautiful but porous — must seal annually in DFW humidity; popular in Southlake luxury homes', bestFor: 'Master baths, accents, low-traffic areas' },
  { name: 'Natural Stone (Slate)', costInstalled: '$12–$28/sqft', durability: 'Excellent', slipRating: 'High', dfwNote: 'Handles DFW outdoor use well; irregular surface hides dust between cleanings', bestFor: 'Outdoor patios, entryways' },
  { name: 'Large Format (24″x24″+)', costInstalled: '$12–$25/sqft', durability: 'Excellent', slipRating: 'High', dfwNote: 'Trendy in DFW new builds — requires flat substrate; slab movement can crack tiles', bestFor: 'Open-plan living areas, master baths' },
  { name: 'Mosaic / Glass Tile', costInstalled: '$15–$40/sqft', durability: 'Moderate', slipRating: 'Low', dfwNote: 'Labor-intensive; popular DFW shower accent walls and backsplashes', bestFor: 'Accents, backsplashes, shower niches' },
];

const complexityLevels = ['Simple (straight lay, no cuts)', 'Moderate (diagonal, L-shape room)', 'Complex (herringbone, shower, curves)'];
const roomSizes = [50, 100, 200, 400];

const complexityMultiplier = [1, 1.35, 1.75];

const tileBaseRates: Record<string, number> = {
  'Porcelain': 13,
  'Ceramic': 9,
  'Natural Stone (Travertine)': 24,
  'Natural Stone (Slate)': 19,
  'Large Format (24″x24″+)': 18,
  'Mosaic / Glass Tile': 27,
};

export default function DFWTileInstallationGuide() {
  const [selectedTile, setSelectedTile] = useState('Porcelain');
  const [roomSize, setRoomSize] = useState(100);
  const [complexity, setComplexity] = useState('Simple (straight lay, no cuts)');

  const complexIdx = complexityLevels.indexOf(complexity);
  const baseRate = tileBaseRates[selectedTile] ?? 13;
  const adjRate = baseRate * complexityMultiplier[complexIdx];
  const totalLow = Math.round(adjRate * 0.85 * roomSize);
  const totalHigh = Math.round(adjRate * 1.2 * roomSize);
  const wasteAddon = Math.round(roomSize * 0.12 * (baseRate * 0.4));

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOME IMPROVEMENT GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Tile Installation Cost Guide
        </h1>
        <p style={{ color: '#A0ADBF', fontSize: 16, marginBottom: 36 }}>
          Dallas–Fort Worth 2026 pricing for floor, wall, and shower tile — porcelain vs ceramic vs natural stone, DFW slab movement considerations, grout types, and interactive cost estimator.
        </p>

        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>⚠️ DFW Slab Movement &amp; Large Format Tile</div>
          <p style={{ color: '#C8D4E8', margin: 0, lineHeight: 1.6 }}>
            DFW's expansive clay soil causes concrete slab foundations to move seasonally. Large format tiles (18″x18″ and bigger) are especially vulnerable — minor flex cracks grout lines and can crack the tile itself. A professional installer in DFW should use an uncoupling membrane (like Schluter DITRA) for any large format installation to allow independent movement between slab and tile.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>📊 Tile Type Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: '#1A2E50′ }}>
                {['Tile Type', 'Installed Cost', 'Durability', 'Best For', 'DFW Note'].map((h) => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', color: '#F5E642′ }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tileTypes.map((t, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#0D1E38′ : '#0A1628', borderBottom: '1px solid #1A2E50' }}>
                  <td style={{ padding: '10px 14px', color: '#FFFFFF', fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: '10px 14px', color: '#F5E642′ }}>{t.costInstalled}</td>
                  <td style={{ padding: '10px 14px', color: '#C8D4E8′ }}>{t.durability}</td>
                  <td style={{ padding: '10px 14px', color: '#C8D4E8', fontSize: 12 }}>{t.bestFor}</td>
                  <td style={{ padding: '10px 14px', color: '#A0ADBF', fontSize: 12 }}>{t.dfwNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🧮 Interactive Cost Estimator</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 28, marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>TILE TYPE</label>
              <select
                value={selectedTile}
                onChange={(e) => setSelectedTile(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                {tileTypes.map((t) => <option key={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>ROOM SIZE (SQ FT)</label>
              <select
                value={roomSize}
                onChange={(e) => setRoomSize(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}
              >
                {roomSizes.map((s) => <option key={s} value={s}>{s} sq ft</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>INSTALLATION COMPLEXITY</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {complexityLevels.map((c) => (
                <button
                  key={c}
                  onClick={() => setComplexity(c)}
                  style={{
                    padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                    backgroundColor: complexity === c ? '#F5E642′ : '#0A1628',
                    color: complexity === c ? '#0A1628′ : '#C8D4E8',
                    border: `2px solid ${complexity === c ? '#F5E642' : '#2A3E5C'}`,
                    fontWeight: complexity === c ? 700 : 400,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#A0ADBF', marginBottom: 4 }}>INSTALLATION TOTAL</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#A0ADBF', marginBottom: 4 }}>ADD: WASTE ALLOWANCE (12%)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#C8D4E8′ }}>+${wasteAddon.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#A0ADBF', marginBottom: 4 }}>EFFECTIVE RATE/SQ FT</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#C8D4E8′ }}>${Math.round(adjRate * 0.85)} – ${Math.round(adjRate * 1.2)}</div>
            </div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🔲 Grout Selection for DFW</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 36 }}>
          {[
            { type: 'Sanded Grout', joint: 'Joints > 1/8″', note: 'Standard floor tile. Strong in DFW heat.', maintain: 'Seal annually' },
            { type: 'Unsanded Grout', joint: 'Joints < 1/8″', note: 'Wall tile, polished stone. Flexible.', maintain: 'Seal every 2 years' },
            { type: 'Epoxy Grout', joint: 'Any', note: 'Best for DFW showers — fully waterproof, stain-proof, no sealing needed.', maintain: 'No sealing required' },
            { type: 'Fusion Pro (single-component)', joint: 'Any', note: 'Popular with DFW pros — easy cleanup, commercial durability.', maintain: 'No sealing required' },
          ].map((g, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 13, marginBottom: 4 }}>{g.type}</div>
              <div style={{ color: '#F5E642', fontSize: 11, marginBottom: 6 }}>{g.joint}</div>
              <div style={{ color: '#C8D4E8', fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{g.note}</div>
              <div style={{ color: '#A0ADBF', fontSize: 11 }}>Maintenance: {g.maintain}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1A2E50', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>🛠️ DFW Installation Cost Factors</div>
          <ul style={{ color: '#C8D4E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Demo and haul-off of existing tile: $1–$3/sq ft additional</li>
            <li>Uncoupling membrane (DITRA): $1.50–$2.50/sq ft — strongly recommended on DFW slabs</li>
            <li>Shower pan liner and waterproofing: $300–$800 per shower</li>
            <li>Heated floor mat under tile: $8–$15/sq ft add-on (niche in DFW but rising)</li>
            <li>DFW tile installer labor: $6–$14/sq ft depending on complexity</li>
            <li>Permit required for new bathroom tile in most DFW municipalities — budget $100–$300</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
