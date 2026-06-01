import { useState } from 'react';

const CMU_APPLICATIONS = [
  { app: 'Retaining Walls', risk: 'High', note: 'DFW expansive clay creates enormous lateral pressure — most common CMU failure point' },
  { app: 'Crawl Space Walls', risk: 'Medium', note: 'DFW moisture cycles cause efflorescence; weep screed critical' },
  { app: 'Commercial Foundations', risk: 'Low', note: 'Below-grade CMU standard in DFW commercial — waterproofing determines lifespan' },
  { app: 'Residential Fence / Screen', risk: 'Low', note: 'Decorative use — DFW hail and wind can topple unreinforced CMU fences' },
];

const RECOMMENDATIONS: Record<string, Record<string, { maintenance: string; waterproofing: string; cost: string }>> = {
  retaining: {
    dry: { maintenance: 'Inspect annually for lean or crack. Repoint mortar every 10-15 years.', waterproofing: 'Crystalline waterproof coating on soil side. French drain mandatory.', cost: 'Repair: $800-$2,400. Full replacement: $35-$55/linear ft.' },
    wet: { maintenance: 'Inspect every 6 months. DFW soil heave can shift wall 1-2 inches per wet season.', waterproofing: 'Dimple mat + crystalline coat. Sump consideration if below grade.', cost: 'Repair: $1,200-$4,000. Rebuild with drainage: $60-$90/linear ft.' },
    cracked: { maintenance: 'Stop using wall for retained load immediately. Engineer eval required.', waterproofing: 'Repair before waterproofing — waterproof over cracks fails within 2 years.', cost: 'Structural repair: $3,000-$8,000+ depending on extent.' },
  },
  crawl: {
    dry: { maintenance: 'Check for efflorescence annually. Clean with diluted muriatic acid if present.', waterproofing: 'Elastomeric paint interior sufficient. Ensure exterior grade slopes away.', cost: 'DIY waterproof coat: $200-$600. Pro application: $800-$1,800.' },
    wet: { maintenance: 'Investigate moisture source first — downspout, grade, or high water table.', waterproofing: 'Interior drain system + vapor barrier + dehumidifier. Exterior membrane preferred.', cost: 'Interior system: $4,000-$7,000. Exterior excavation + membrane: $9,000-$18,000.' },
    cracked: { maintenance: 'Stair-step cracks in crawl CMU = foundation movement. Engineer first.', waterproofing: 'Crack injection (epoxy or polyurethane) before any waterproofing.', cost: 'Crack injection: $400-$800/crack. Foundation underpinning if needed: $5,000+.' },
  },
  fence: {
    dry: { maintenance: 'Repoint mortar every 7-10 years. DFW UV degrades mortar faster than northern climates.', waterproofing: 'Penetrating silane sealer every 5 years. Prevents DFW winter ice damage.', cost: 'Sealer: $0.50-$1.50/sq ft DIY. Mortar repoint: $8-$12/linear ft.' },
    wet: { maintenance: 'Check cap blocks after heavy rain. Missing caps = rapid moisture damage.', waterproofing: 'Replace caps + apply silane sealer. Add drip edge to cap detail.', cost: 'Cap replacement: $15-$30/cap. Full repoint + seal: $1,200-$2,500.' },
    cracked: { maintenance: 'Vertical cracks in fence CMU — likely no rebar (common in older DFW installs).', waterproofing: 'Tuckpoint + seal. If leaning, demo and rebuild with rebar.', cost: 'Tuckpoint: $400-$900. Rebuild with rebar: $25-$40/linear ft.' },
  },
};

export default function DFWConcreteBlockGuide() {
  const [appType, setAppType] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<{ maintenance: string; waterproofing: string; cost: string } | null>(null);

  function analyze() {
    const data = RECOMMENDATIONS[appType]?.[condition];
    setResult(data ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🧱 DFW MASONRY GUIDE</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem' }}>DFW Concrete Block (CMU) Guide</h1>
          <p style={{ color: '#8899AA', lineHeight: 1.6, margin: 0 }}>
            Concrete masonry units perform differently across DFW applications. Expansive clay soils, storm moisture, and intense UV all stress CMU in DFW-specific ways.
            Get maintenance, waterproofing, and cost guidance for your specific situation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {CMU_APPLICATIONS.map(a => (
            <div key={a.app} style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{a.app}</div>
                <span style={{ background: a.risk === 'High' ? '#4A1520' : a.risk === 'Medium' ? '#2A2A10' : '#0F2A1F', color: a.risk === 'High' ? '#FF6B6B' : a.risk === 'Medium' ? '#F5E642' : '#4CAF50', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{a.risk} Risk</span>
              </div>
              <div style={{ color: '#8899AA', fontSize: '0.8rem', lineHeight: 1.5 }}>{a.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem' }}>🔧 CMU Maintenance & Waterproofing Advisor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>CMU Application</label>
              <select value={appType} onChange={e => setAppType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select application</option>
                <option value='retaining'>Retaining wall</option>
                <option value='crawl'>Crawl space / foundation wall</option>
                <option value='fence'>Fence / screen wall</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Current Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select condition</option>
                <option value='dry'>Good — dry, no cracks</option>
                <option value='wet'>Moisture / efflorescence present</option>
                <option value='cracked'>Cracking or movement observed</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Get CMU Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              {[['🔧 Maintenance', result.maintenance], ['💧 Waterproofing', result.waterproofing], ['💰 Cost Range', result.cost]].map(([label, val]) => (
                <div key={label as string} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.85rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</div>
                  <div style={{ color: '#C5D3E0', fontSize: '0.875rem', lineHeight: 1.6 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
