import { useState } from 'react';

export default function DFWAirDuctCleaningGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'new-construction', label: '🏗️ New construction or major renovation' },
    { id: 'rodent', label: '🐀 Evidence of rodent or pest infestation' },
    { id: 'mold', label: '🟫 Visible mold inside ducts or on components' },
    { id: 'spring-cleaning', label: '🌸 Post-spring cleaning routine' },
    { id: 'allergies', label: '🤧 Household allergies or poor air quality' },
    { id: 'contractor-pitch', label: '💬 Contractor pushed it during HVAC tune-up' },
  ];

  const recommendations: Record<string, string> = {
    'new-construction': '✅ WARRANTED — Construction dust, drywall debris, and insulation fragments accumulate in ducts during builds. Hire a NADCA-certified cleaner before first occupancy.',
    'rodent': '✅ WARRANTED — Rodent droppings and nesting material are a biohazard. Cleaning is essential. Pair with pest extermination and seal entry points first.',
    'mold': '✅ WARRANTED — Mold spores circulate throughout the home via ducts. Get an air quality test first, then professional remediation. Address moisture source or mold returns.',
    'spring-cleaning': '⚠️ PROBABLY NOT — EPA states duct cleaning is not proven to improve air quality in routine cases. Spring in DFW means cottonwood — clean your condenser coil instead.',
    'allergies': '⚠️ LIKELY NOT — EPA review found no evidence duct cleaning reduces dust or allergens in typical homes. Check HVAC filter (MERV 11+), humidity levels, and air sealing first.',
    'contractor-pitch': '🚫 SKIP IT — If no mold, pests, or construction debris, routine duct cleaning is rarely necessary. NADCA-certified cleaners charge –,000. Verify need before spending.',
  };

  const handleCheck = () => {
    if (situation) setResult(recommendations[situation] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Home Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>DFW Air Duct Cleaning Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem', fontSize: '1.05rem' }}>Is duct cleaning worth it in DFW? The EPA says routine duct cleaning is not proven to improve air quality — but DFW contractors push it hard every spring.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📋', label: 'EPA Position', value: 'Not proven for routine cases' },
            { icon: '✅', label: 'NADCA Certified', value: 'Legitimate cleaning standard' },
            { icon: '💰', label: 'Typical Cost', value: ' – ,000 DFW' },
            { icon: '⚠️', label: 'When Warranted', value: 'Mold, pests, new construction' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Duct Cleaning Decision Guide</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '1rem' }}>Select your situation to get a recommendation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)}
                style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: situation === s.id ? '2px solid #F5E642' : '1px solid #1e3a5f', backgroundColor: situation === s.id ? '#1a3060' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s' }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck} disabled={!situation}
            style={{ backgroundColor: situation ? '#F5E642' : '#2a3a50', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: situation ? 'pointer' : 'not-allowed', fontSize: '0.95rem', width: '100%' }}>
            Get Recommendation →
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>📌 DFW-Specific Insight</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: 1.7 }}>Spring in DFW brings cottonwood debris that clogs outdoor condenser coils — not ducts. If your HVAC is struggling in May or June, clean your condenser coil before paying for duct cleaning. If you do hire a duct cleaner, verify they are NADCA certified and ask for before/after photos.</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#0f2040', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>Need a trusted HVAC pro in DFW? <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> connects you with vetted local contractors.</p>
        </div>
      </div>
    </div>
  );
}