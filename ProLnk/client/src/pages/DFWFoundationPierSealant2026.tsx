import { useState } from 'react';

export default function DFWFoundationPierSealant2026() {
  const [exposure, setExposure] = useState('');
  const [guide, setGuide] = useState('');

  const exposures = [
    'Brackets fully below grade — not visible',
    'Brackets at grade line — partially exposed',
    'Brackets above grade — fully visible',
    'Previous sealing has cracked or peeled',
    'New pier installation just completed',
  ];

  const sealants = [
    { name: 'Hydraulic Cement', cost: '$15-25/bag', best: 'Active water intrusion — sets in 3-5 min even underwater' },
    { name: 'Elastomeric Coating', cost: '$35-60/gallon', best: 'DFW soil movement — flexes with seasonal expansion/contraction' },
    { name: 'Polyurethane Caulk', cost: '$8-15/tube', best: 'Gap sealing around bracket edges — bonds to metal and concrete' },
  ];

  const generate = () => {
    if (!exposure) return;
    let tips = [];
    if (exposure === 'Brackets fully below grade — not visible') {
      tips.push('✅ Below-grade brackets have lower moisture risk but DFW clay soil holds water against metal for months');
      tips.push('🔍 Request foundation inspector probe near bracket locations — moisture meter readings above 19% indicate infiltration');
      tips.push('🛡️ Preventive elastomeric coating during any excavation access is low cost vs reactive repair');
    }
    if (exposure === 'Brackets at grade line — partially exposed') {
      tips.push('⚠️ Grade-line exposure is highest risk position in DFW — rain splash, irrigation, and clay expansion all focus here');
      tips.push('🔧 Polyurethane caulk perimeter seal + elastomeric coating on exposed metal — two-product approach required');
      tips.push('💧 Extend downspouts 6 feet past bracket locations — DFW storm events dump 2-4" per hour at peak');
    }
    if (exposure === 'Brackets above grade — fully visible') {
      tips.push('📋 Above-grade exposure: sealing is optional but rust prevention is required — DFW humidity causes bracket corrosion');
      tips.push('🎨 Epoxy primer + elastomeric topcoat on all exposed metal surfaces — reapply every 5-7 years in DFW climate');
      tips.push('🌧️ Check bracket bolts for rust annually — DFW rain and humidity accelerates oxidation on uncoated hardware');
    }
    if (exposure === 'Previous sealing has cracked or peeled') {
      tips.push('🔨 Remove all failed sealant mechanically before reapplication — DFW clay movement debonds adhesives quickly');
      tips.push('💧 Probe for moisture intrusion before resealing — trapping water accelerates corrosion');
      tips.push('🔄 Switch to elastomeric coating — DFW soil movement requires flexible sealant, not rigid caulk');
    }
    if (exposure === 'New pier installation just completed') {
      tips.push('⏱️ Allow 28-day concrete cure before sealing — premature sealing traps outgas moisture');
      tips.push('🛡️ Apply elastomeric coating at 28 days — new brackets in DFW clay should be sealed before first wet season');
      tips.push('📋 Document all bracket locations with photos and measurements — DFW clay migration can shift stakes');
    }
    tips.push('💰 Pier bracket sealing costs $200-600 DIY vs $800-2,000 contractor — DFW pier and beam homes average 20-40 brackets');
    tips.push('🏠 Proper sealing reduces moisture infiltration under DFW homes — directly linked to wood rot and mold prevention');
    setGuide(tips.join('
'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 12 }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 12 }}>DFW FOUNDATION GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Pier Bracket Sealing Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Sealing foundation pier brackets in DFW — moisture intrusion prevention, sealant selection, and maintenance for pier and beam homes.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Sealing Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Bracket Exposure Situation</label>
          <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}>
            <option value="">Select situation...</option>
            {exposures.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate Sealing Guide</button>
        </div>

        {guide && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🔒 Your Pier Sealing Recommendations</h3>
            {guide.split('
').map((line, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🧪 DFW Sealant Options</h3>
          {sealants.map(s => (
            <div key={s.name} style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{s.name}</span>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{s.cost}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Best for: {s.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Connect with a DFW foundation specialist for pier bracket assessment</p>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '10px 20px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>🏗️ Find Foundation Pro in DFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}