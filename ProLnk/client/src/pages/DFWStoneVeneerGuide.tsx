import { useState } from 'react';

const STONE_COMPARISON = [
  { type: 'Natural Limestone', heat: '★★★★★', hail: '★★★★☆', moisture: '★★★☆☆', maintenance: 'Low', hoa: 'Always accepted', note: 'DFW native stone — quarried locally, weathers authentically, darkens with age' },
  { type: 'Natural Sandstone', heat: '★★★★☆', hail: '★★★☆☆', moisture: '★★☆☆☆', maintenance: 'Medium', hoa: 'Usually accepted', note: 'Porous in DFW humidity — requires sealing every 3-5 years or staining occurs' },
  { type: 'Manufactured Stone Veneer', heat: '★★★☆☆', hail: '★★☆☆☆', moisture: '★★★★☆', maintenance: 'Medium', hoa: 'Varies by HOA', note: 'Lightweight — most common DFW new construction choice. Fails if flashing not installed correctly' },
  { type: 'Thin Natural Stone', heat: '★★★★☆', hail: '★★★★☆', moisture: '★★★☆☆', maintenance: 'Low-Medium', hoa: 'Usually accepted', note: 'Real stone, thin-cut — premium look without full weight. DFW pros increasingly preferred' },
];

const DURABILITY: Record<string, Record<string, { assessment: string; maintenance: string; cost: string }>> = {
  natural: {
    accent: { assessment: 'Excellent long-term choice. DFW limestone can last 80+ years with minimal care.', maintenance: 'Seal every 5-7 years with penetrating silane. Re-point mortar every 20-25 years.', cost: 'Installation: -55/sq ft. Sealing: .50-3/sq ft every 5-7 years.' },
    full: { assessment: 'Highest durability option in DFW. Fire, hail, and heat resistant. Adds appraisal value.', maintenance: 'Inspect flashing annually. Repoint joints every 25-30 years.', cost: 'Installation: -80/sq ft. Very low lifetime maintenance cost.' },
    water: { assessment: 'Natural limestone weathers well but watch for DFW acid rain pitting on horizontal surfaces.', maintenance: 'Apply silane sealer to horizontal cap stones annually. Vertical surfaces every 5 years.', cost: 'Sealer: /bin/zsh.75-2/sq ft. Cap stone replacement if damaged: -60/stone.' },
  },
  manufactured: {
    accent: { assessment: 'Good for budget-conscious DFW projects. Watch flashing and weep screed — MSV failure is almost always water intrusion.', maintenance: 'Inspect caulk joints at windows, doors, and transitions every 3 years. Recaulk as needed.', cost: 'Installation: -25/sq ft. Caulk maintenance: -600 every 3-5 years.' },
    full: { assessment: 'Common in DFW new construction. Requires code-compliant weather-resistant barrier and drainage plane.', maintenance: 'Annual inspection of bottom edge (weep screed). Clean with low-pressure wash only — high pressure destroys MSV.', cost: 'Installation: -35/sq ft. Repair if moisture gets behind: ,000-8,000.' },
    water: { assessment: 'MSV in wet DFW applications is high-risk without proper drainage. Check HOA — some prohibit below-grade MSV.', maintenance: 'Inspect every 6 months. Any soft or hollow-sounding stones indicate moisture behind veneer.', cost: 'Remediation if moisture intrusion found: ,000-12,000. Prevention with drainage mat: -5/sq ft add.' },
  },
  thin: {
    accent: { assessment: 'Premium look at moderate cost. DFW contractors increasingly proficient with thin stone installation.', maintenance: 'Seal every 5 years. Thin format more susceptible to DFW hail chipping than full thickness.', cost: 'Installation: -40/sq ft. Hail damage repair: -35/sq ft partial replacement.' },
    full: { assessment: 'Strong performer in DFW. Lighter than full natural stone — structural loading less of a concern.', maintenance: 'Inspect mortar joints every 10 years. Point with matching lime mortar.', cost: 'Installation: -50/sq ft. Very durable — low 20-year maintenance cost.' },
    water: { assessment: 'Good for DFW water features with proper drainage plane behind. Natural stone handles wet-dry cycles better than MSV.', maintenance: 'Seal annually at water line. Inspect for calcium buildup from DFW hard water.', cost: 'Sealing: -2/sq ft annually. Calcium removal: -500 as needed.' },
  },
};

export default function DFWStoneVeneerGuide() {
  const [stoneType, setStoneType] = useState('');
  const [application, setApplication] = useState('');
  const [result, setResult] = useState<{ assessment: string; maintenance: string; cost: string } | null>(null);

  function analyze() {
    const data = DURABILITY[stoneType]?.[application];
    setResult(data ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🪨 DFW STONE GUIDE</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem' }}>DFW Stone Veneer Guide</h1>
          <p style={{ color: '#8899AA', lineHeight: 1.6, margin: 0 }}>
            Stone veneer is one of DFW's most popular exterior choices — but natural stone and manufactured stone veneer perform very differently in North Texas heat, hail, and humidity cycles.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1E3A5F' }}>
                {['Stone Type', 'Heat', 'Hail', 'Moisture', 'Maintenance', 'HOA'].map(h => (
                  <th key={h} style={{ color: '#F5E642', fontWeight: 700, padding: '0.6rem 0.75rem', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STONE_COMPARISON.map((s, i) => (
                <tr key={s.type} style={{ background: i % 2 === 0 ? '#111E35' : '#0D1929', borderBottom: '1px solid #1E3A5F' }}>
                  <td style={{ padding: '0.7rem 0.75rem', fontWeight: 600, color: '#E8EDF5' }}>{s.type}</td>
                  <td style={{ padding: '0.7rem 0.75rem', color: '#C5D3E0' }}>{s.heat}</td>
                  <td style={{ padding: '0.7rem 0.75rem', color: '#C5D3E0' }}>{s.hail}</td>
                  <td style={{ padding: '0.7rem 0.75rem', color: '#C5D3E0' }}>{s.moisture}</td>
                  <td style={{ padding: '0.7rem 0.75rem', color: '#C5D3E0' }}>{s.maintenance}</td>
                  <td style={{ padding: '0.7rem 0.75rem', color: '#C5D3E0' }}>{s.hoa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem' }}>🔍 Stone Durability Analyzer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Stone Type</label>
              <select value={stoneType} onChange={e => setStoneType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select stone type</option>
                <option value='natural'>Natural stone (limestone / sandstone)</option>
                <option value='manufactured'>Manufactured stone veneer (MSV)</option>
                <option value='thin'>Thin natural stone</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>DFW Application</label>
              <select value={application} onChange={e => setApplication(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select application</option>
                <option value='accent'>Accent / partial facade</option>
                <option value='full'>Full exterior coverage</option>
                <option value='water'>Water feature / retaining wall</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Get Stone Analysis
          </button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              {[['🏠 Durability Assessment', result.assessment], ['🔧 Maintenance Plan', result.maintenance], ['💰 Cost Estimate', result.cost]].map(([label, val]) => (
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
