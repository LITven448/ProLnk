import { useState } from 'react';

export default function DFWRoofingInspectionFrequency2026() {
  const [roofAge, setRoofAge] = useState('');
  const [stormHistory, setStormHistory] = useState('');
  const [result, setResult] = useState('');

  const getFrequency = () => {
    const age = parseInt(roofAge);
    if (!roofAge || !stormHistory || isNaN(age)) { setResult('Please fill in both fields.'); return; }
    if (age <= 5 && stormHistory === 'none') {
      setResult('LIGHT SCHEDULE: New roof with no major storms. Inspect at your 5-year mark and after any hail event going forward. Focus on flashing around penetrations — skylights, HVAC pipes, vents — these fail before shingles on new roofs.');
    } else if (age <= 5 && stormHistory === 'some') {
      setResult('POST-STORM CHECK: Even new roofs in DFW should be inspected after significant hail (golf ball+ size or 50mph+ winds). Schedule a professional inspection now — minor damage caught early prevents major leaks. Your 5-year benchmark inspection still applies.');
    } else if (age <= 15 && stormHistory === 'none') {
      setResult('ANNUAL SCHEDULE: Mid-age roofs need annual inspection in DFW — hail season (March-June) ends and you should inspect before fall rains begin. Also inspect after any significant storm event regardless of schedule. Check granule loss in gutters as an early warning sign.');
    } else if (age <= 15 && stormHistory === 'some') {
      setResult('BIANNUAL + STORM: Annual inspections minimum, plus after every significant storm. At 10-15 years in DFW heat, shingles are losing granules and flashing sealants are drying out. Do not skip your post-hail check — cumulative small impacts accelerate failure.');
    } else {
      setResult('AGGRESSIVE MONITORING: Roofs 15+ years in DFW summer heat are in their final phase. Biannual inspections (spring + fall) plus inspection after every storm event. Budget for replacement within 2-5 years. Get your next inspection now — delayed replacement leads to deck rot and interior damage that doubles replacement cost.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Roof Inspection Frequency Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW is in one of the most active hail corridors in North America. How often you inspect depends on roof age and storm history — here is the definitive schedule.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Why DFW Demands More Frequent Inspections</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Hail Corridor', 'DFW averages 3-5 significant hail events per year — more than most US metros'],
              ['UV Intensity', '190+ days/year above 90°F accelerates shingle granule loss and sealant breakdown'],
              ['Summer Storms', 'Derecho winds (60-80mph) can cause damage without visible hail impact'],
              ['Insurance Deadlines', 'Most TX policies require damage reported within 1 year — missed inspections mean denied claims']
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>DFW Roof Inspection Schedule by Age</h2>
          {[
            ['New (0-5 yrs)', 'Inspect at 5-year mark + after any significant storm (1.5″+ hail or 50mph+ wind)'],
            ['Mid-Life (5-15 yrs)', 'Annual inspection minimum — best timing is after DFW hail season ends (June/July)'],
            ['Aging (15+ yrs)', 'Biannual: spring before hail season + fall before winter rains. Plus every storm event.'],
            ['Any Age: Post-Storm', 'Never skip a post-hail inspection — TX insurance deadline is 1 year from damage date']
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 130, fontSize: 14 }}>{label}</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Get Your Personal Inspection Schedule</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Age (years)</label>
            <input
              value={roofAge}
              onChange={e => setRoofAge(e.target.value)}
              type="number"
              placeholder="e.g. 12″
              style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Significant Storms in the Last 2 Years?</label>
            <select
              value={stormHistory}
              onChange={e => setStormHistory(e.target.value)}
              style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}
            >
              <option value="">Select storm history...</option>
              <option value="none">No major hail or wind events</option>
              <option value="some">At least one significant storm (hail or 50mph+ wind)</option>
            </select>
          </div>
          <button
            onClick={getFrequency}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}
          >
            Get My Inspection Schedule
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#1a2f50', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.7 }}>{result}</div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Schedule a DFW Roof Inspection via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk roofing inspectors are background-checked, licensed, and experienced with DFW storm damage assessment. Most inspections completed within 48 hours of request.</p>
        </div>
      </div>
    </div>
  );
}
