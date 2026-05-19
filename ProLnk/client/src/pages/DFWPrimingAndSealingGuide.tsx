import { useState } from 'react';

const SURFACES = [
  { id: 'new-drywall', label: 'New Drywall', primer: 'PVA Drywall Primer', sealer: 'Not needed', reason: 'Seals porous surface, prevents paint absorption', dfwNote: 'DFW humidity: use mold-resistant drywall primer in bathrooms', steps: ['Sand smooth', 'Wipe dust', 'Apply PVA primer', 'Sand lightly', 'Paint'] },
  { id: 'bathroom-wall', label: 'Bathroom Wall (DFW)', primer: 'Oil-Based Primer', sealer: 'Vapor barrier sealer', reason: 'DFW humidity causes latex primers to fail in bathrooms', dfwNote: 'Oil-based outperforms latex in DFW high-humidity bathrooms year-round', steps: ['Clean surface', 'Apply oil-based primer', 'Let cure 24hr', 'Apply topcoat', 'Caulk seams'] },
  { id: 'stain-block', label: 'Stained Surface', primer: 'Shellac or Oil-Based Stain Blocker', sealer: 'Not needed', reason: 'Blocks smoke, water, and tannin stains from bleeding through', dfwNote: 'Zinsser BIN or Kilz Original recommended for DFW older homes', steps: ['Clean and dry', 'Apply stain blocker', 'Let dry 1hr', 'Sand lightly', 'Finish coat'] },
  { id: 'concrete', label: 'Concrete / Masonry', primer: 'Masonry Primer', sealer: 'Penetrating Concrete Sealer', reason: 'Concrete is alkaline and porous, sealer prevents moisture damage', dfwNote: 'DFW clay soil shifts foundations; seal after any crack repair', steps: ['Clean with TSP', 'Fill cracks', 'Apply masonry primer', 'Apply sealer', 'Topcoat or leave sealed'] },
  { id: 'exterior', label: 'Exterior Wood/Siding', primer: 'Exterior Oil-Based or 100% Acrylic', sealer: 'UV-resistant topcoat sealer', reason: 'DFW sun is intense, primer + UV sealer prevents fade and peeling', dfwNote: 'Recoat exterior every 5-7 years in DFW due to UV exposure', steps: ['Power wash', 'Let dry 48hr', 'Caulk gaps', 'Apply primer', 'Apply UV-rated paint'] },
  { id: 'kitchen-cabinet', label: 'Kitchen Cabinets', primer: 'Bonding Primer', sealer: 'Topcoat polyurethane', reason: 'Cabinets get daily wear, bonding primer ensures adhesion', dfwNote: 'DFW grease buildup requires degreaser before priming', steps: ['Degrease with TSP', 'Sand 220 grit', 'Apply bonding primer', 'Lightly sand', 'Apply topcoat'] },
];

export default function DFWPrimingAndSealingGuide() {
  const [surfaceId, setSurfaceId] = useState('new-drywall');
  const sel = SURFACES.find(s => s.id === surfaceId) || SURFACES[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PAINT GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Priming & Sealing Guide</h1>
        <p style={{ color: '#8899B0', fontSize: 15, margin: '0 0 32px' }}>DFW-specific primer and sealer recommendations by surface type and situation.</p>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>Select Surface Type</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {SURFACES.map(s => (
              <button key={s.id} onClick={() => setSurfaceId(s.id)}
                style={{ background: s.id === surfaceId ? '#F5E642′ : '#1C2E4A', color: s.id === surfaceId ? '#0A1628' : '#E8EDF5',
                  border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: '#1C2E4A', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: '#F5E642′ }}>Paint {sel.label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            {[['Primer', sel.primer], ['Sealer', sel.sealer]].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#8899B0', marginBottom: 4 }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#E8EDF5′ }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 14 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>Why This Choice</div>
            <div style={{ color: '#8899B0', fontSize: 14 }}>{sel.reason}</div>
          </div>
          <div style={{ background: '#112240', borderRadius: 8, padding: 14, border: '1px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>DFW-Specific Note</div>
            <div style={{ color: '#E8EDF5', fontSize: 14 }}>{sel.dfwNote}</div>
          </div>
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>Application Steps</div>
          {sel.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, paddingTop: 4 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
