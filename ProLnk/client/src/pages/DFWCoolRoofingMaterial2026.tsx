import { useState } from 'react';

export default function DFWCoolRoofingMaterial2026() {
  const [roofType, setRoofType] = useState('asphalt');
  const [roofAge, setRoofAge] = useState('new');
  const [result, setResult] = useState('');

  const roofTypes = ['Asphalt Shingles', 'Metal Roof', 'Flat/Low Slope', 'Tile Roof'];
  const ageOptions = ['Need Replacement Soon', '5–10 Years Old', 'Under 5 Years Old'];

  const getROI = () => {
    const atticReduction = '40–50°F';
    let rec = '';
    if (roofType === 'Asphalt Shingles' && roofAge === 'Need Replacement Soon') {
      rec = '🌟 Prime upgrade window! Switch to Energy Star cool shingles (SRI 29+). DFW attic drops from 130°F to ~85°F. Estimated annual HVAC savings: $400–$700. Payback period: 4–6 years with cool shingle premium.';
    } else if (roofType === 'Metal Roof') {
      rec = '✅ Metal roofing is naturally reflective. Ensure your metal roof has a cool coating (SRI 65+). DFW cool metal roofs achieve attic temps under 85°F vs 130°F standard. Add radiant barrier underneath for maximum benefit.';
    } else if (roofType === 'Flat/Low Slope') {
      rec = '⚡ Flat roofs see maximum benefit from cool coatings! White TPO or elastomeric coating achieves SRI 100+. Commercial-grade solution for DFW flat roofs — reduces cooling load 15–25%. ROI under 3 years.';
    } else {
      rec = `🏠 Cool roofing for your ${roofType}: Best approach is a cool coating or radiant barrier rather than full replacement. DFW summers justify the investment — attic temp reduction of ${atticReduction} translates to $300–$600/yr HVAC savings.`;
    }
    setResult(rec);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW Cool Roofing Material Science 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Radiant heat, reflectance science, and ROI for North Texas homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{icon:'🌡️',label:'Standard DFW Attic',val:'130°F',sub:'Peak summer day without cool roof'},{icon:'❄️',label:'Cool Roof Attic',val:'85–90°F',sub:'With SRI 65+ roofing material'},{icon:'📊',label:'Energy Savings',val:'15–25%',sub:'Cooling load reduction DFW summers'},{icon:'💡',label:'SRI Threshold',val:'SRI 29+',sub:'Energy Star cool roof minimum'}].map((s,i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.25rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔬 Radiant vs Conductive Heat in DFW</h2>
          {[{type:'Radiant Heat',pct:'~93%',note:'Sun energy hits roof surface — reflected by cool materials (SRI measures this)'},{type:'Conductive Heat',pct:'~7%',note:'Heat transfers through roofing material — insulation R-value addresses this'},{type:'Cool Roof Strategy',pct:'Both',note:'High SRI coating + radiant barrier in attic = maximum DFW performance'}].map((r,i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', background: '#0f1f3d', borderRadius: '8px', marginBottom: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: '140px' }}>{r.type}</span>
              <span style={{ color: '#60a5fa', minWidth: '50px' }}>{r.pct}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.note}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Your Cool Roofing ROI Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Current Roof Type</label>
              <select value={roofType} onChange={e => setRoofType(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {roofTypes.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Roof Situation</label>
              <select value={roofAge} onChange={e => setRoofAge(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {ageOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getROI} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get My Cool Roof ROI</button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0f1f3d', borderRadius: '8px', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}