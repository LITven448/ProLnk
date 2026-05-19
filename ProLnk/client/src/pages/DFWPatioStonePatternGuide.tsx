import { useState } from 'react';

const MATERIALS = ['Concrete Paver', 'Brick', 'Flagstone', 'Travertine', 'Decomposed Granite'];
const CLAY_LEVELS = ['Low Exposure', 'Moderate', 'High', 'Extreme'];

const patternData: Record<string, Record<string, { pattern: string; joint: string; cost: string }>> = {
  'Concrete Paver': {
    'Low Exposure': { pattern: 'Running Bond', joint: '1/4" every 8 ft', cost: '$8-12/sq ft' },
    'Moderate': { pattern: 'Herringbone 45°', joint: '3/8" every 6 ft', cost: '$10-15/sq ft' },
    'High': { pattern: 'Basketweave', joint: '1/2" every 4 ft', cost: '$12-18/sq ft' },
    'Extreme': { pattern: 'Pinwheel w/ border', joint: '3/4" every 3 ft', cost: '$16-24/sq ft' },
  },
  'Brick': {
    'Low Exposure': { pattern: 'Running Bond', joint: '3/8" every 10 ft', cost: '$12-18/sq ft' },
    'Moderate': { pattern: 'Herringbone', joint: '1/2" every 6 ft', cost: '$15-22/sq ft' },
    'High': { pattern: 'Stacked Bond w/ tie', joint: '1/2" every 4 ft', cost: '$18-26/sq ft' },
    'Extreme': { pattern: 'Diagonal Herringbone', joint: '3/4" every 3 ft', cost: '$22-32/sq ft' },
  },
  'Flagstone': {
    'Low Exposure': { pattern: 'Random Irregular', joint: 'Mortared joints', cost: '$15-22/sq ft' },
    'Moderate': { pattern: 'Fitted Random', joint: '1/2" dry-set', cost: '$18-28/sq ft' },
    'High': { pattern: 'Cut Random', joint: '3/4" flexible grout', cost: '$22-35/sq ft' },
    'Extreme': { pattern: 'Rectangular Cut', joint: '1" flexible w/ sand', cost: '$30-45/sq ft' },
  },
  'Travertine': {
    'Low Exposure': { pattern: '4x4 Grid', joint: '1/4" sanded', cost: '$18-25/sq ft' },
    'Moderate': { pattern: 'Versailles Pattern', joint: '3/8" flexible', cost: '$22-32/sq ft' },
    'High': { pattern: 'Straight Stack', joint: '1/2" polymer', cost: '$28-40/sq ft' },
    'Extreme': { pattern: 'Roman Pattern', joint: '3/4" polymer every 3ft', cost: '$35-50/sq ft' },
  },
  'Decomposed Granite': {
    'Low Exposure': { pattern: 'Compacted flat', joint: 'N/A — permeable', cost: '$3-6/sq ft' },
    'Moderate': { pattern: 'DG w/ stabilizer', joint: 'N/A — permeable', cost: '$5-8/sq ft' },
    'High': { pattern: 'DG w/ border pavers', joint: 'Border: 1/2" every 6ft', cost: '$7-12/sq ft' },
    'Extreme': { pattern: 'DG + decomp border', joint: 'Border: 3/4" every 4ft', cost: '$9-15/sq ft' },
  },
};

export default function DFWPatioStonePatternGuide() {
  const [material, setMaterial] = useState('Concrete Paver');
  const [clay, setClay] = useState('Moderate');
  const rec = patternData[material]?.[clay];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🧱 DFW Patio Stone Pattern Guide
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
          DFW clay heave and 100°F thermal expansion crack patios within 2-3 seasons without proper patterns and expansion joints. This guide shows which patterns minimize cracking.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.8rem' }}>📐 How DFW Clay Breaks Patios</div>
          <ul style={{ color: '#94A3B8', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Clay expands vertically 2-4 inches — lifts rigid patio sections unevenly</li>
            <li>Thermal expansion in DFW summer heat adds another 1/4" per 10 ft of material</li>
            <li>Patterns with interlocking angles (herringbone) distribute force better than grid layouts</li>
            <li>Expansion joints must use flexible backer rod + polyurethane sealant — not caulk</li>
            <li>Proper sub-base: 4-6 inches compacted crush rock + 1 inch sand bed minimum in DFW</li>
          </ul>
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔧 Pattern Recommendation Tool</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Patio Material</div>
              <select value={material} onChange={e => setMaterial(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {MATERIALS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW Clay Exposure</div>
              <select value={clay} onChange={e => setClay(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {CLAY_LEVELS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem' }}>
              {[['🔲 Pattern', rec.pattern], ['📏 Joint Spacing', rec.joint], ['💰 Cost/Sq Ft', rec.cost]].map(([label, val]) => (
                <div key={String(label)} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.3rem' }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>🌡️ DFW Thermal Expansion by Material</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.6rem' }}>
            {[
              { mat: 'Concrete Paver', exp: '~3/16" per 10ft in summer', risk: 'Medium' },
              { mat: 'Brick', exp: '~1/8" per 10ft in summer', risk: 'Low' },
              { mat: 'Flagstone', exp: 'Varies by stone', risk: 'Low-Medium' },
              { mat: 'Travertine', exp: '~1/4" per 10ft in summer', risk: 'High' },
            ].map(item => (
              <div key={item.mat} style={{ background: '#0A1628', borderRadius: 8, padding: '0.7rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>{item.mat}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{item.exp}</div>
                <div style={{ color: item.risk === 'High' ? '#EF4444' : item.risk === 'Medium' ? '#F59E0B' : '#22C55E', fontSize: '0.8rem' }}>Risk: {item.risk}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem' }}>
          ProLnk connects DFW homeowners with vetted patio and masonry professionals.
        </div>
      </div>
    </div>
  );
}
