import { useState } from 'react';

const atticTypes = ['Open attic (trusses)', 'Attic with knee walls', 'Cathedral ceiling', 'Flat roof / low-pitch'];
const insulationLevels = ['None or R-11', 'R-19 to R-25', 'R-30 to R-38', 'R-38+'];

const barrierData: Record<string, Record<string, { benefit: string; tempDrop: string; type: string; cost: string; savings: string; note: string }>> = {
  'Open attic (trusses)': {
    'None or R-11': { benefit: 'Very High', tempDrop: '30–40°F', type: 'Foil on rafters', cost: '$800–$2,000', savings: '$200–$350/yr', note: 'Highest ROI scenario. Add insulation to R-38 same project.' },
    'R-19 to R-25': { benefit: 'High', tempDrop: '25–35°F', type: 'Foil on rafters', cost: '$700–$1,800', savings: '$150–$250/yr', note: 'Radiant barrier + insulation top-off is the optimal combo for DFW.' },
    'R-30 to R-38': { benefit: 'Moderate', tempDrop: '20–30°F', type: 'Foil or radiant barrier decking', cost: '$600–$1,500', savings: '$100–$180/yr', note: 'Still worthwhile in DFW heat. Payback ~6–8 years.' },
    'R-38+': { benefit: 'Lower', tempDrop: '15–20°F', type: 'Radiant barrier decking', cost: '$500–$1,200', savings: '$60–$100/yr', note: 'At R-38+ the marginal benefit decreases but still positive ROI for DFW.' },
  },
  'Attic with knee walls': {
    'None or R-11': { benefit: 'High', tempDrop: '25–35°F', type: 'Foil on rafters + knee walls', cost: '$1,000–$2,500', savings: '$180–$280/yr', note: 'Knee wall cavities are major heat gain points. Seal and cover both surfaces.' },
    'R-19 to R-25': { benefit: 'High', tempDrop: '22–32°F', type: 'Foil on rafters + knee walls', cost: '$900–$2,200', savings: '$150–$230/yr', note: 'Complex geometry requires professional installation.' },
    'R-30 to R-38': { benefit: 'Moderate', tempDrop: '18–26°F', type: 'Foil on rafters', cost: '$700–$1,700', savings: '$100–$160/yr', note: 'Focus on south and west-facing roof sections first.' },
    'R-38+': { benefit: 'Moderate-Low', tempDrop: '12–18°F', type: 'Radiant barrier decking', cost: '$600–$1,400', savings: '$70–$110/yr', note: 'Consider air sealing the knee walls instead for better ROI.' },
  },
  'Cathedral ceiling': {
    'None or R-11': { benefit: 'High', tempDrop: '20–30°F', type: 'Spray foam + foil hybrid', cost: '$2,000–$5,000', savings: '$160–$240/yr', note: 'Cathedral ceilings require careful design — consult a BPI-certified contractor.' },
    'R-19 to R-25': { benefit: 'Moderate', tempDrop: '15–22°F', type: 'Foil layer in rafter bays', cost: '$1,500–$3,500', savings: '$120–$180/yr', note: 'Ventilation gap above barrier is critical to performance.' },
    'R-30 to R-38': { benefit: 'Lower', tempDrop: '10–16°F', type: 'Exterior radiant barrier board', cost: '$1,200–$2,800', savings: '$80–$130/yr', note: 'Exterior continuous rigid foam with radiant facing is most effective here.' },
    'R-38+': { benefit: 'Minimal', tempDrop: '8–12°F', type: 'Not recommended', cost: 'N/A', savings: '<$60/yr', note: 'At R-38+ in a cathedral ceiling, dollars are better spent elsewhere.' },
  },
  'Flat roof / low-pitch': {
    'None or R-11': { benefit: 'Moderate', tempDrop: '15–22°F', type: 'Radiant barrier paint or board', cost: '$1,200–$3,000', savings: '$120–$200/yr', note: 'Cool roof coating may outperform radiant barrier on flat roofs — get both quotes.' },
    'R-19 to R-25': { benefit: 'Moderate', tempDrop: '12–18°F', type: 'Radiant barrier board', cost: '$1,000–$2,500', savings: '$100–$160/yr', note: 'Moisture management critical on flat roofs. Vapor retarder required.' },
    'R-30 to R-38': { benefit: 'Lower', tempDrop: '8–14°F', type: 'Cool roof coating', cost: '$800–$2,000', savings: '$70–$110/yr', note: 'Cool roof coating often more practical than radiant barrier on flat roofs.' },
    'R-38+': { benefit: 'Minimal', tempDrop: '<10°F', type: 'Not recommended', cost: 'N/A', savings: '<$50/yr', note: 'Focus on air sealing and HVAC tune-up for better returns.' },
  },
};

export default function DFWRadiantBarrierGuide() {
  const [atticType, setAtticType] = useState('');
  const [insulation, setInsulation] = useState('');
  const result = atticType && insulation ? barrierData[atticType]?.[insulation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME EFFICIENCY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Radiant Barrier Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 12 }}>DFW attics regularly hit 155–165°F in summer. A radiant barrier can drop that to 120°F — reducing the load on your AC and ductwork significantly.</p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '10px 16px', fontWeight: 700, fontSize: 14, marginBottom: 32, display: 'inline-block' }}>
          ☀️ DFW Fact: Radiant heat accounts for up to 93% of attic heat gain — reflective barriers block it at the source.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🪙', title: 'Foil Barriers', desc: 'Installed on rafters facing down into attic. Best performance, highest labor cost.' },
            { icon: '🎨', title: 'Radiant Paint', desc: 'Sprayed on roof deck or walls. Lower cost, 40–60% of foil performance.' },
            { icon: '🏗️', title: 'Radiant Decking', desc: 'OSB/plywood with foil backing. Installed at re-roof. No attic entry needed.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0F2040', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Radiant Barrier Benefit Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Attic Type</label>
              <select value={atticType} onChange={e => setAtticType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {atticTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Insulation</label>
              <select value={insulation} onChange={e => setInsulation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {insulationLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Benefit Level</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.benefit}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Attic Temp Drop</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.tempDrop}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Recommended Type</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{result.type}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Installation Cost</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F2040', borderRadius: 8, padding: '10px 16px', marginBottom: 12 }}>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Annual Energy Savings</div>
                <div style={{ color: '#A7F3D0', fontWeight: 800 }}>{result.savings}</div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, fontStyle: 'italic' }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
