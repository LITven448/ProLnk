import { useState } from 'react';

const ratings = [
  { merv: '1–4', label: 'Fiberglass', icon: '🚫', desc: 'Captures large dust only. Useless for DFW allergens. Damages equipment long-term.', allergy: 'none', age: 'any' },
  { merv: '8', label: 'Standard Pleated', icon: '✅', desc: 'DFW minimum. Captures pollen, mold spores, dust mites. Good baseline protection.', allergy: 'mild', age: 'any' },
  { merv: '11', label: 'High-Efficiency Pleated', icon: '⭐', desc: 'Cedar fever season essential. Captures finer particles, pet dander, smoke.', allergy: 'moderate', age: 'any' },
  { merv: '13', label: 'Superior Filtration', icon: '🌟', desc: 'Best for DFW allergy sufferers. Captures bacteria, fine smoke, all pollens.', allergy: 'severe', age: 'any' },
  { merv: '16', label: 'Hospital Grade', icon: '🏥', desc: 'Too restrictive for most DFW residential systems. Requires system modification.', allergy: 'extreme', age: 'new' },
];

const allergyLevels = ['none', 'mild', 'moderate', 'severe'];

export default function DFWHVACAirFilterMERV2026() {
  const [allergy, setAllergy] = useState('mild');
  const [hvacAge, setHvacAge] = useState('any');

  const recommended = ratings.filter(r => {
    const allergyMatch = allergyLevels.indexOf(r.allergy) >= allergyLevels.indexOf(allergy);
    const ageMatch = r.age === 'any' || r.age === hvacAge;
    return allergyMatch && ageMatch;
  })[0] || ratings[1];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌬️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC MERV Rating Deep Dive 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Complete MERV guide for North Texas homes — cedar fever, allergies & system protection</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔧 Get Your MERV Recommendation</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: '0.9rem' }}>Allergy Severity</label>
              <select value={allergy} onChange={e => setAllergy(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6 }}>
                <option value="none">None / Dust only</option>
                <option value="mild">Mild (seasonal sniffles)</option>
                <option value="moderate">Moderate (cedar fever)</option>
                <option value="severe">Severe (daily symptoms)</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: '0.9rem' }}>HVAC System Age</label>
              <select value={hvacAge} onChange={e => setHvacAge(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6 }}>
                <option value="any">Older / Standard</option>
                <option value="new">2020+ High-Static</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#1a3a6e', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: '1.5rem' }}>{recommended.icon} <strong style={{ color: '#F5E642' }}>MERV {recommended.merv} — {recommended.label}</strong></div>
            <p style={{ margin: '0.5rem 0 0', color: '#cbd5e1' }}>{recommended.desc}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {ratings.map(r => (
            <div key={r.merv} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.8rem' }}>{r.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>MERV {r.merv} — {r.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: 4 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginTop: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>⚠️ DFW Filter Warning</h2>
          <p style={{ color: '#cbd5e1', margin: 0 }}>Cheap MERV 1–4 fiberglass filters allow debris to coat your evaporator coil — the #1 cause of DFW service calls. Change MERV 8 monthly June–August, every 6–8 weeks rest of year.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#0f2040', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW HVAC Assessment</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Connect with ProLnk-vetted HVAC pros who know North Texas systems</p>
        </div>
      </div>
    </div>
  );
}