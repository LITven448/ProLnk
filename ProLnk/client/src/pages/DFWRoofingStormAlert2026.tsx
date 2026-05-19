import { useState } from 'react';

type StormType = 'hail' | 'wind' | 'tornado' | null;
type RoofAge = 'new' | 'mid' | 'old' | null;

export default function DFWRoofingStormAlert2026() {
  const [stormType, setStormType] = useState<StormType>(null);
  const [roofAge, setRoofAge] = useState<RoofAge>(null);

  const getGuide = () => {
    if (!stormType || !roofAge) return null;

    const guides: Record<StormType, Record<RoofAge, string>> = {
      hail: {
        new: 'Roof under 5 years: walk the perimeter post-storm — check gutters for granule accumulation (looks like coarse sand). New shingles can still be bruised by large hail. File an insurance claim within 1 year of hail event; adjusters look for bruise marks on shingles.',
        mid: 'Roof 5–15 years: high probability of impact damage with any hail over 1″. Schedule professional inspection within 48 hours — do not wait for leaks. Bruised shingles allow moisture intrusion that shows up 6–18 months later as interior water damage.',
        old: 'Roof 15+ years in DFW: assume significant damage from any hail event. Age + hail = compromised granule protection across most of the roof surface. Get competing estimates for full replacement and file insurance claim immediately.',
      },
      wind: {
        new: 'New roof + wind: check for lifted tabs or exposed adhesive strips along rakes and ridges. Wind damage on new roofs is uncommon but nail pattern failures can cause early lifting. Binocular inspection from ground covers 80% of visible damage.',
        mid: 'Mid-age roof + high wind: check for missing shingles along ridgeline and roof edges (highest wind exposure). Missing shingles leave underlayment exposed — temporary tarping within 24 hours prevents interior damage if rain follows.',
        old: 'Older roof + wind: multiple missing shingles likely. DFW winds above 60 mph commonly strip aged shingles with brittle adhesive. Document all missing areas with photos before any repairs — critical for insurance documentation.',
      },
      tornado: {
        new: 'Do not inspect the roof yourself after a tornado. Structural integrity of the entire home must be verified by a professional before anyone goes on the roof. Contact your insurer for emergency tarping service — most DFW policies include emergency response.',
        mid: 'Do not access the roof post-tornado. Interior water intrusion is secondary to structural safety. Professional adjuster visit within 24–72 hours is standard after declared DFW tornado events. Document interior damage photographically from inside.',
        old: 'Older roof post-tornado: assume total loss and document everything safely from ground level. DFW adjusters are familiar with total-loss scenarios — do not delay filing. Emergency hotel expenses may be covered if home is uninhabitable.',
      },
    };

    return guides[stormType][roofAge];
  };

  const guide = getGuide();

  const phases = [
    { icon: '⚡', phase: 'Before Storm', steps: ['Know your roof age and last inspection date', 'Secure loose items (patio furniture, trampolines)', 'Photograph roof condition for baseline'] },
    { icon: '🌧️', phase: 'During Storm', steps: ['Stay inside — do not investigate during storm', 'Monitor for active leaks with buckets', 'Note time storm hit (insurance documentation)'] },
    { icon: '🔍', phase: 'After Storm', steps: ['Walk exterior perimeter — do not climb roof', 'Check gutters for granule loss', 'Photograph any visible damage'] },
    { icon: '📋', phase: '24–48 Hours', steps: ['Schedule professional roof inspection', 'Call insurance agent to open claim', 'Get 2–3 contractor estimates'] },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⛈️</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', marginBottom: '0.5rem' }}>DFW Storm Alert Roof Response 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Know exactly what to do before, during, and after every DFW storm</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {phases.map(p => (
            <div key={p.phase} style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{p.icon}</div>
              <div style={{ fontWeight: '700', color: '#F5E642', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{p.phase}</div>
              <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.steps.map(s => <li key={s} style={{ fontSize: '0.8rem', color: '#cbd5e1′ }}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Get Your Personalized Response Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Storm type:</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(['hail', 'wind', 'tornado'] as StormType[]).map(t => (
                <button key={t!} onClick={() => setStormType(t)} style={{ backgroundColor: stormType === t ? '#F5E642′ : '#0A1628', color: stormType === t ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: '600', textTransform: 'capitalize' }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Roof age:</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {([{ id: 'new' as RoofAge, label: 'Under 5 yrs' }, { id: 'mid' as RoofAge, label: '5–15 yrs' }, { id: 'old' as RoofAge, label: '15+ yrs' }]).map(r => (
                <button key={r.id!} onClick={() => setRoofAge(r.id)} style={{ backgroundColor: roofAge === r.id ? '#F5E642′ : '#0A1628', color: roofAge === r.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: '600′ }}>{r.label}</button>
              ))}
            </div>
          </div>
          {guide && (
            <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>{guide}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          <p>ProLnk DFW Roofing Resource · Free homeowner guidance · 2026</p>
        </div>
      </div>
    </div>
  );
}