import { useState } from 'react';

export default function DFWPoolFilterTypes2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const getRecommendation = () => {
    const recs: string[] = [];
    if (situation === 'low_maintenance') {
      recs.push('🏆 Best for Low Maintenance: Sand Filter');
      recs.push('✅ Most common filter type in DFW — familiar to all local pool service companies.');
      recs.push('🔧 Maintenance: Backwash when pressure rises 8-10 psi above baseline (typically every 2-4 weeks in summer).');
      recs.push('⚠️ Tradeoff: Filters particles down to 20-40 microns only (cartridge and DE filters are finer).');
      recs.push('💰 Cost: Lowest upfront ($300-600) and lowest ongoing maintenance cost.');
    } else if (situation === 'drought') {
      recs.push('🏆 Best for DFW Drought Restrictions: Cartridge Filter');
      recs.push('✅ No backwashing required — saves 200-300 gallons per cleaning vs sand filter.');
      recs.push('🔧 Maintenance: Remove and rinse cartridge every 4-6 weeks; replace cartridge every 3-5 years.');
      recs.push('🔬 Filters to 10-15 microns — noticeably clearer water than sand.');
      recs.push('💰 Cost: $400-800 upfront; $100-200 for replacement cartridges.');
    } else if (situation === 'crystal_clear') {
      recs.push('🏆 Best for Crystal Clear Water: DE Filter (Diatomaceous Earth)');
      recs.push('✅ Finest filtration available — filters to 3-5 microns (removes almost everything).');
      recs.push('🔧 Maintenance: Backwash and recharge with DE powder monthly; full teardown annually.');
      recs.push('⚠️ Highest maintenance — DFW homeowners should budget 2-3 hrs/month for filter care.');
      recs.push('💰 Cost: $600-1,200 upfront; ongoing DE powder cost ~$50/year.');
    } else if (situation === 'large_pool') {
      recs.push('🏆 Best for Large DFW Pools (20,000+ gal): Sand or DE Filter');
      recs.push('✅ Sand: Get a 300+ lb sand filter for pools over 20,000 gal. Sized by flow rate (GPM), not gallons.');
      recs.push('✅ DE: 60 sq ft DE filter handles up to 30,000 gal with excellent clarity.');
      recs.push('💡 Key metric: Your filter flow rate must match your pump GPM — oversizing filter is always better.');
    } else {
      recs.push('Select your DFW situation above to get a filter recommendation.');
    }
    setResult(recs);
  };

  const filterComparison = [
    { type: 'Sand', microns: '20-40', backwash: 'Yes (200-300 gal)', maintenance: 'Low', cost: '$300-600' },
    { type: 'Cartridge', microns: '10-15', backwash: 'No', maintenance: 'Medium', cost: '$400-800' },
    { type: 'DE', microns: '3-5', backwash: 'Yes + DE powder', maintenance: 'High', cost: '$600-1200' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>🔵 DFW Pool Filter Types Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 24 }}>Sand, cartridge, and DE filters all work differently. DFW drought restrictions make cartridge filters increasingly popular — but the right choice depends on your priorities.</p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ backgroundColor: '#1e3a5f' }}>{['Filter','Filtration','Backwash?','Maintenance','Cost'].map(h=><th key={h} style={{padding:'8px 12px',textAlign:'left',color:'#F5E642'}}>{h}</th>)}</tr></thead>
            <tbody>{filterComparison.map((r,i)=><tr key={r.type} style={{backgroundColor:i%2===0?'#0d1e36':'transparent'}}><td style={{padding:'8px 12px'}}>{r.type}</td><td style={{padding:'8px 12px'}}>{r.microns} µm</td><td style={{padding:'8px 12px'}}>{r.backwash}</td><td style={{padding:'8px 12px'}}>{r.maintenance}</td><td style={{padding:'8px 12px'}}>{r.cost}</td></tr>)}</tbody>
          </table>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 8 }}>My DFW Situation</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{v:'low_maintenance',l:'🔧 I want low maintenance'},{v:'drought',l:'🚱 Water conservation is key'},{v:'crystal_clear',l:'💎 I want crystal clear water'},{v:'large_pool',l:'🏊 Large pool (20,000+ gal)'}].map(({v,l}) => (
              <button key={v} onClick={() => setSituation(v)}
                style={{ padding: '12px', borderRadius: 8, border: `2px solid ${situation===v?'#F5E642':'#1e3a5f'}`, backgroundColor: situation===v?'#F5E642':'#0d1e36', color: situation===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={getRecommendation} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Get Filter Recommendation
        </button>

        {result.length > 0 && (
          <div style={{ backgroundColor: '#0d1e36', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>🎯 Your Filter Recommendation</h2>
            {result.map((r, i) => <p key={i} style={{ marginBottom: 10, color: '#ddd', lineHeight: 1.6 }}>{r}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}
