import { useState } from 'react';

export default function DFWPoolChemistryDFWGuide() {
  const [poolType, setPoolType] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<null | { chlorine: string; ph: string; alkalinity: string; schedule: string; notes: string }>(null);

  function calculate() {
    if (!poolType || !season) return;
    let chlorine = '', ph = '', alkalinity = '', schedule = '', notes = '';
    if (poolType === 'chlorine' && season === 'summer') {
      chlorine = '3–5 ppm (shock to 10 ppm weekly)';
      ph = '7.2–7.4 (lower end for DFW heat)';
      alkalinity = '100–120 ppm';
      schedule = 'Test every 48 hours. Shock every Sunday. Algaecide every 2 weeks.';
      notes = 'DFW summer: chlorine depletes in 48–72 hours vs 5–7 days in spring. Use stabilized chlorine (CYA 50–80 ppm). Without stabilizer, UV burns off chlorine in hours.';
    } else if (poolType === 'chlorine' && season === 'spring') {
      chlorine = '2–3 ppm';
      ph = '7.4–7.6';
      alkalinity = '100–120 ppm';
      schedule = 'Test twice/week. Shock bi-weekly. Spring algae bloom prevention dose at season open.';
      notes = 'DFW spring brings heavy rain and pollen. Phosphates spike from runoff — use phosphate remover in April–May. pH climbs fast after rain.';
    } else if (poolType === 'salt' && season === 'summer') {
      chlorine = '3–5 ppm (generator at 70–80%)';
      ph = '7.2–7.4';
      alkalinity = '80–120 ppm';
      schedule = 'Test every 3 days. Check salt level monthly (3200–3500 ppm). Clean cell quarterly.';
      notes = 'DFW heat forces salt cells to work harder. Run generator longer hours in summer. Evaporation concentrates salt — test level monthly as you add water.';
    } else if (poolType === 'salt' && season === 'winter') {
      chlorine = '1–2 ppm';
      ph = '7.4–7.6';
      alkalinity = '100–120 ppm';
      schedule = 'Test weekly. Drop generator output to 20–30%. Keep salt level stable.';
      notes = 'DFW winters are mild — most pools run year-round. Salt cells stop producing below 50°F water temp. Have backup chlorine tablets for cold snaps.';
    } else if (poolType === 'mineral' && season === 'summer') {
      chlorine = '0.5–1 ppm (supplemental)';
      ph = '7.2–7.6';
      alkalinity = '100–120 ppm';
      schedule = 'Test twice/week. Replace mineral cartridge per manufacturer. Shock monthly.';
      notes = 'DFW summer still requires supplemental chlorine even with mineral systems. Minerals reduce chlorine demand by 50–70% but do not eliminate it entirely.';
    } else {
      chlorine = '1–2 ppm';
      ph = '7.4–7.6';
      alkalinity = '100–120 ppm';
      schedule = 'Test weekly. Standard maintenance schedule.';
      notes = 'DFW fall brings cooler temps and leaf debris — watch for tannin staining and organic load spikes.';
    }
    setResult({ chlorine, ph, alkalinity, schedule, notes });
  }

  const levels = [
    { name: 'Free Chlorine', summer: '3–5 ppm', spring: '2–3 ppm', fall: '1–3 ppm', winter: '1–2 ppm' },
    { name: 'pH', summer: '7.2–7.4', spring: '7.4–7.6', fall: '7.4–7.6', winter: '7.4–7.6' },
    { name: 'Total Alkalinity', summer: '100–120', spring: '100–120', fall: '100–130', winter: '100–130' },
    { name: 'Cyanuric Acid (CYA)', summer: '50–80 ppm', spring: '30–50 ppm', fall: '30–50 ppm', winter: '0–30 ppm' },
    { name: 'Calcium Hardness', summer: '200–400', spring: '200–400', fall: '200–400', winter: '200–400' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🧪</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Pool Chemistry Guide</h1>
        </div>
        <p style={{ color: '#9BAEC8', marginBottom: 28 }}>DFW's extreme heat creates unique pool chemistry challenges — here's how to manage them.</p>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ DFW Chemistry Targets by Season</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1A3055' }}>
                  {['Parameter', 'Summer', 'Spring', 'Fall', 'Winter'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#F5E642', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {levels.map(row => (
                  <tr key={row.name} style={{ borderBottom: '1px solid #0A1628' }}>
                    <td style={{ padding: '9px 10px', color: '#E8EDF5', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ padding: '9px 10px', color: '#F5A642' }}>{row.summer}</td>
                    <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{row.spring}</td>
                    <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{row.fall}</td>
                    <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{row.winter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your Personalized Schedule</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Pool Type</label>
              <select value={poolType} onChange={e => setPoolType(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select pool type...</option>
                <option value="chlorine">Traditional Chlorine</option>
                <option value="salt">Salt Water</option>
                <option value="mineral">Mineral System</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>DFW Season</label>
              <select value={season} onChange={e => setSeason(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select season...</option>
                <option value="summer">Summer (Jun–Sep, 95–110°F)</option>
                <option value="spring">Spring (Mar–May, pollen/rain)</option>
                <option value="fall">Fall (Oct–Nov)</option>
                <option value="winter">Winter (Dec–Feb)</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Get DFW Schedule →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Free Chlorine Target</span><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{result.chlorine}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>pH Range</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.ph}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Total Alkalinity</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.alkalinity}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Adjustment Schedule</span><div style={{ color: '#E8EDF5', marginTop: 4, lineHeight: 1.6 }}>{result.schedule}</div></div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#9BAEC8', fontSize: 12, marginBottom: 4 }}>📍 DFW-Specific Notes</div>
                  <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{result.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p style={{ color: '#4A6080', fontSize: 13, textAlign: 'center' }}>Always verify levels with a professional test kit. Ranges are starting points for DFW conditions.</p>
      </div>
    </div>
  );
}
