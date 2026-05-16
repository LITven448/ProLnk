import { useState } from 'react';

const tileTypes = ['Clay Tile', 'Concrete Tile'];
const hailHistory = ['No Major Hail (5+ years)', 'Minor Hail Event (<1")', 'Moderate Hail (1-2")', 'Severe Hail (2"+)'];
const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

const tileData: Record<string, { clayLife: string; concreteLife: string; hailNote: string; avgCost: string }> = {
  'No Major Hail (5+ years)': {
    clayLife: '50-100 years with maintenance',
    concreteLife: '30-50 years with sealing',
    hailNote: 'Standard maintenance schedule applies — annual inspection recommended',
    avgCost: 'Inspection: -400/year',
  },
  'Minor Hail Event (<1")': {
    clayLife: 'Clay typically unaffected by small hail',
    concreteLife: 'Concrete may show surface pitting — inspect closely',
    hailNote: 'File inspection with insurance — many policies cover hail regardless of visible damage',
    avgCost: 'Insurance inspection: free; Repairs if needed: -2,000',
  },
  'Moderate Hail (1-2")': {
    clayLife: 'Cracking possible on older clay — get professional assessment',
    concreteLife: 'Concrete likely cracked — multiple tile replacements expected',
    hailNote: 'File insurance claim immediately — DFW adjusters familiar with tile hail claims',
    avgCost: 'Repairs: ,000-8,000; Insurance deductible typically ,000-2,500',
  },
  'Severe Hail (2"+)': {
    clayLife: 'Significant clay breakage expected — partial or full replacement likely',
    concreteLife: 'Concrete tile likely requires full replacement after 2"+ hail',
    hailNote: 'Full insurance claim — document all damage with photos before any repair work',
    avgCost: 'Full replacement: ,000-45,000; Insurance should cover most costs',
  },
};

const repairGuide: Record<string, Record<string, string>> = {
  'Clay Tile': {
    Excellent: 'Annual inspection only. Clean debris from valleys and gutters. Re-seal exposed mortar.',
    Good: 'Replace individual cracked tiles — clay tiles are often available from specialty suppliers. Budget -200 per tile installed.',
    Fair: 'Full assessment needed. Check underlayment condition — often the real problem under seemingly OK tile. Underlayment replacement: ,000-20,000.',
    Poor: 'Full replacement recommended. Consider continuing with clay for maximum lifespan and historic authenticity. Budget ,000-50,000.',
  },
  'Concrete Tile': {
    Excellent: 'Seal every 5-7 years to prevent water absorption. Annual inspection for cracking.',
    Good: 'Replace cracked or shifted tiles. Concrete tiles are more readily available than clay — most roofing suppliers stock them. Budget -120 per tile.',
    Fair: 'Structural underlayment inspection critical — concrete tiles are heavy and underlayment failure common after 20+ years.',
    Poor: 'Full replacement. Consider upgrading to clay for longer lifespan or switching to metal standing seam for DFW hail resistance.',
  },
};

export default function DFWRoofTileGuide() {
  const [tileType, setTileType] = useState('');
  const [condition, setCondition] = useState('');
  const [hail, setHail] = useState('');

  const hailInfo = hail ? tileData[hail] : null;
  const repairInfo = tileType && condition ? repairGuide[tileType]?.[condition] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px' }}>🏠 ProLnk DFW Roofing Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Tile Roofing Guide — Dallas/Fort Worth</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '24px', lineHeight: '1.6' }}>
          Tile roofing is popular in DFW high-end new construction — especially in Plano, Frisco, McKinney, and Southlake. Clay and concrete tile both require structural framing support and specialized repair contractors. DFW hail is the primary enemy of tile roofs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[{ label: '🏗️ Clay Tile Life', val: '50-100 years' }, { label: '🧱 Concrete Tile Life', val: '30-50 years' }, { label: '⚖️ Weight', val: '850-1,500 lbs/square' }, { label: '🌨️ Hail Vulnerability', val: 'High — cracks on impact' }].map(({ label, val }) => (
            <div key={label} style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '16px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🌨️ DFW Hail Impact Assessment</h2>
          <select value={hail} onChange={e => setHail(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px', marginBottom: '16px' }}>
            <option value=''>Select your hail history...</option>
            {hailHistory.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          {hailInfo && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ marginBottom: '8px' }}><span style={{ color: '#F5E642' }}>Clay: </span>{hailInfo.clayLife}</div>
              <div style={{ marginBottom: '8px' }}><span style={{ color: '#F5E642' }}>Concrete: </span>{hailInfo.concreteLife}</div>
              <div style={{ marginBottom: '8px' }}><span style={{ color: '#F5E642' }}>Insurance: </span>{hailInfo.hailNote}</div>
              <div><span style={{ color: '#F5E642' }}>Cost: </span>{hailInfo.avgCost}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '16px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🔧 Repair Approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Tile Type</label>
              <select value={tileType} onChange={e => setTileType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select tile type...</option>
                {tileTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Current Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select condition...</option>
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {repairInfo && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '16px', border: '1px solid #F5E642', color: '#E8EAF0' }}>
              {repairInfo}
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '8px' }}>💡 DFW Pro Tip</div>
          <p style={{ color: '#9BA3B8', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>DFW has some of the highest hail frequency in the US. When buying a DFW home with tile roofing, always request the claim history and get an independent roof inspection. Insurance companies in DFW are increasingly requiring Class 4 impact-rated roofing products for new claims.</p>
        </div>
      </div>
    </div>
  );
}
