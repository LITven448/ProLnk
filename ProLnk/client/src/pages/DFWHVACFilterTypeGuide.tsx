import { useState } from 'react';

const filterTypes = [
  { type: 'Fiberglass', merv: '1-4', cost: '$1-3', life: '30 days', dfw: '⚠️ Poor', desc: 'Catches large particles only. Not enough for DFW cedar/oak pollen season.' },
  { type: 'Pleated', merv: '8-13', cost: '$10-25', life: '90 days', dfw: '✅ Best', desc: 'MERV 11-13 optimal for DFW. Traps pollen, dust, pet dander without restricting airflow.' },
  { type: 'HEPA', merv: '17-20', cost: '$30-100', life: '12 months', dfw: '⚠️ Risky', desc: 'Too restrictive for most DFW residential systems. Can cause pressure drop and coil damage.' },
  { type: 'Electrostatic', merv: '8-10', cost: '$20-40', life: 'Washable', dfw: '👍 Good', desc: 'Reusable. Good for DFW dust but must be cleaned monthly — many owners neglect this.' },
  { type: 'UV Light', merv: 'N/A', cost: '$150-400', life: '1-2 years', dfw: '✅ Add-On', desc: 'Kills mold/bacteria. Ideal add-on for DFW humidity but not a standalone filter solution.' },
];

const concerns = ['Cedar/Oak Pollen', 'Pet Dander', 'Dust & Dirt', 'Mold/Mildew', 'General Allergy'];
const ages = ['New (0-5 years)', 'Mid-Age (6-12 years)', 'Older (13+ years)'];

function getRecommendation(concern: string, age: string) {
  if (concern === 'Mold/Mildew') return { filter: 'Pleated MERV 11 + UV Light', change: 'Every 60 days', note: 'DFW humidity makes mold a real risk — UV add-on strongly advised.' };
  if (concern === 'Cedar/Oak Pollen') return { filter: 'Pleated MERV 13', change: 'Every 60 days (monthly during cedar season)', note: 'Jan–Mar is peak cedar season in DFW. Stock up on filters.' };
  if (concern === 'Pet Dander') return { filter: 'Pleated MERV 11-13', change: 'Every 45-60 days', note: 'Multiple pets = every 30 days during heavy shed seasons.' };
  if (age === 'Older (13+ years)') return { filter: 'Pleated MERV 8-10', change: 'Every 60 days', note: 'Older DFW systems may struggle with MERV 13. Start at MERV 8 and monitor.' };
  return { filter: 'Pleated MERV 11', change: 'Every 90 days', note: 'Standard DFW recommendation for most homes and systems.' };
}

export default function DFWHVACFilterTypeGuide() {
  const [concern, setConcern] = useState('');
  const [age, setAge] = useState('');
  const rec = concern && age ? getRecommendation(concern, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Filter Types for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW cedar and oak pollen make filter selection critical. MERV 11-13 pleated is the DFW standard — HEPA is too restrictive for most local systems.</p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {filterTypes.map(f => (
            <div key={f.type} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr', gap: 12, alignItems: 'center' }}>
              <div><div style={{ fontWeight: 700, fontSize: 16 }}>{f.type}</div><div style={{ color: '#94a3b8', fontSize: 12 }}>MERV {f.merv}</div></div>
              <div style={{ color: '#F5E642', fontSize: 14 }}>{f.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{f.life}</div>
              <div style={{ fontSize: 14 }}>{f.dfw}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Get Your DFW Filter Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Primary Health Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select concern...</option>
                {concerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>System Age</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select age...</option>
                {ages.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✅ Recommended: {rec.filter}</div>
              <div style={{ color: '#94a3b8', marginBottom: 6 }}>Change frequency: <span style={{ color: '#fff' }}>{rec.change}</span></div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Need a DFW HVAC Pro to Advise on Your System?</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Get matched with a local DFW technician who knows your system type.</div>
        </div>
      </div>
    </div>
  );
}
