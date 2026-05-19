import { useState } from 'react';

const allergyLevels = ['Low (rarely affected)', 'Moderate (seasonal issues)', 'High (allergies year-round)'];
const systemAges = ['Newer (post-2010, good airflow)', 'Mid-age (2000–2010)', 'Older (pre-2000, possibly undersized)'];

function getRecommendation(allergy: string, age: string) {
  const highAllergy = allergy.includes('High');
  const lowAllergy = allergy.includes('Low');
  const older = age.includes('pre-2000');
  const newer = age.includes('post-2010');

  if (highAllergy && newer) return { merv: 'MERV 13', freq: 'Every 60 days', cost: '$120–$180/yr', note: 'Your newer system can handle the airflow restriction. MERV 13 captures pollen, mold spores, and fine DFW dust.' };
  if (highAllergy && older) return { merv: 'MERV 11', freq: 'Every 45 days', cost: '$80–$130/yr', note: 'MERV 13 may starve your older system of airflow, raising energy bills and stressing the blower. MERV 11 is the sweet spot.' };
  if (!highAllergy && newer) return { merv: 'MERV 11', freq: 'Every 90 days', cost: '$60–$100/yr', note: 'Good balance for DFW dust and pollen without over-restricting airflow on your newer unit.' };
  if (lowAllergy && older) return { merv: 'MERV 8', freq: 'Every 60 days', cost: '$40–$70/yr', note: 'MERV 8 protects your system without restriction. DFW dust is heavy — don’t go lower.' };
  return { merv: 'MERV 11', freq: 'Every 75 days', cost: '$70–$110/yr', note: 'A reliable middle-ground for mid-age DFW systems. Monitor airflow monthly during peak summer.' };
}

export default function DFWAirFilterMERVGuide() {
  const [allergy, setAllergy] = useState('');
  const [age, setAge] = useState('');
  const result = allergy && age ? getRecommendation(allergy, age) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🌿 DFW HVAC GUIDE</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Air Filter MERV Rating Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW has a unique combo: Cedar Fever winters, spring pollen storms, constant construction dust, and an AC that runs 9 months a year. Choosing the right MERV rating isn't just about air quality — it's about not destroying your system.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { merv: 'MERV 8', icon: '🟡', desc: 'Captures dust, pollen, mold spores. Minimal restriction. Fine for mild DFW allergies with older systems.' },
            { merv: 'MERV 11', icon: '🟠', desc: 'Adds pet dander, fine dust, smog. The DFW sweet spot for most homes built 2000–2015.' },
            { merv: 'MERV 13', icon: '🔴', desc: 'Captures bacteria, smoke, virus carriers. Best DFW protection — but requires a newer, capable system.' },
          ].map(m => (
            <div key={m.merv} style={{ background: '#0f2240', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</p>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{m.merv}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>⚡ When Higher MERV Backfires</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            In older DFW homes (pre-2000), duct systems were designed for low-restriction filters. A MERV 13 can reduce airflow by 30–50%, causing the evaporator coil to freeze, the blower to overwork, and energy bills to spike. If you see ice on your indoor unit after switching to a high-MERV filter — that's why.
          </p>
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Find Your DFW MERV Match</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your DFW allergy situation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {allergyLevels.map(a => (
              <button key={a} onClick={() => setAllergy(a)} style={{ background: allergy === a ? '#F5E642' : '#1e3a5f', color: allergy === a ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{a}</button>
            ))}
          </div>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your system age / home ductwork:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {systemAges.map(s => (
              <button key={s} onClick={() => setAge(s)} style={{ background: age === s ? '#F5E642' : '#1e3a5f', color: age === s ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{s}</button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#1a2e4a', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Recommended: {result.merv}</p>
              <p style={{ color: '#e2e8f0', marginBottom: 4 }}>🔄 Change frequency: <strong>{result.freq}</strong></p>
              <p style={{ color: '#e2e8f0', marginBottom: 8 }}>💰 Annual DFW cost: <strong>{result.cost}</strong></p>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>
          ProLnk connects DFW homeowners with verified HVAC professionals. Get 3 quotes, fast.
        </p>
      </div>
    </div>
  );
}
