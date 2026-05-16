import { useState } from 'react';

const roofAges = ['0-5 years', '5-15 years', '15+ years'];
const hailOptions = ['No significant hail', 'Hail in last 12 months', 'Multiple hail events'];

const getRecommendation = (age: string, hail: string) => {
  const base: Record<string, { freq: string; details: string[]; urgency: string }> = {
    '0-5 years': {
      freq: 'Every 2 years',
      details: ['Visual inspection from ground or drone', 'Check flashing around vents and chimney', 'Inspect gutters for granule loss', 'Verify attic ventilation is clear'],
      urgency: 'Low — schedule proactively',
    },
    '5-15 years': {
      freq: 'Annual inspection',
      details: ['Full in-person inspection by licensed roofer', 'Check for curling, cracking, or missing shingles', 'Inspect all penetrations and valleys', 'Assess remaining lifespan', 'Check decking for soft spots'],
      urgency: 'Moderate — do not skip annual visit',
    },
    '15+ years': {
      freq: 'Bi-annual minimum',
      details: ['Spring and fall professional inspection', 'Thermal imaging to detect moisture intrusion', 'Full decking assessment', 'Replacement quote comparison', 'Check interior for water staining'],
      urgency: 'High — plan replacement budget',
    },
  };

  const hailAddon = hail !== 'No significant hail' ? ' + Post-hail inspection within 30 days' : '';
  const rec = base[age];
  return {
    ...rec,
    freq: rec.freq + hailAddon,
    urgency: hail === 'Multiple hail events' ? '🔴 Urgent — inspect immediately' : hail === 'Hail in last 12 months' ? '🟠 ' + rec.urgency : '🟢 ' + rec.urgency,
  };
};

export default function DFWRoofMaintenanceFrequency2026() {
  const [age, setAge] = useState('');
  const [hail, setHail] = useState('');

  const rec = age && hail ? getRecommendation(age, hail) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠⛈️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Roof Maintenance Frequency Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            DFW ranks among the top U.S. metro areas for hail damage claims. Your inspection schedule should match your roof age and storm history.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏗️ Roof Age</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {roofAges.map((a) => (
              <button key={a} onClick={() => setAge(a)}
                style={{ padding: '11px 16px', borderRadius: 8, border: age === a ? '2px solid #F5E642' : '2px solid #2d3f5a', backgroundColor: age === a ? '#F5E642' : '#0d1f36', color: age === a ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>⛈️ Hail History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hailOptions.map((h) => (
              <button key={h} onClick={() => setHail(h)}
                style={{ padding: '11px 16px', borderRadius: 8, border: hail === h ? '2px solid #F5E642' : '2px solid #2d3f5a', backgroundColor: hail === h ? '#F5E642' : '#0d1f36', color: hail === h ? '#0A1628' : '#cbd5e1', fontWeight: 700, fontSize: 15, cursor: 'pointer', textAlign: 'left' }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        {rec && (
          <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>📅 {rec.freq}</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>{rec.urgency}</div>
            {rec.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid #2d3f5a', color: '#e2e8f0', fontSize: 14 }}>
                <span style={{ color: '#F5E642' }}>✓</span> {d}
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>🌩️ DFW Hail Season Reminder</h3>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Peak hail season in DFW runs <strong style={{ color: '#e2e8f0' }}>March through June</strong>. Always schedule a professional inspection within
            <strong style={{ color: '#F5E642' }}> 30 days of any hail event</strong>, regardless of your roof age — insurance claims have strict timelines.
          </div>
        </div>
      </div>
    </div>
  );
}