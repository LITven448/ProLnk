import { useState } from 'react';

const parts = [
  { id: 'capacitor', name: 'Capacitor', icon: '⚡', dfwRisk: 'HIGHEST', why: 'DFW summer temperatures cause capacitors to fail 3x faster than national average. Most common DFW failure.', symptoms: ['AC runs but blows warm air', 'Outdoor unit hums but fan does not spin', 'Hard start then shuts off'], ageRange: '5–10 years in DFW vs 15+ in mild climates', cost: '$150–$350 parts + labor', urgency: 'Same day — system will fail completely within days' },
  { id: 'contactor', name: 'Contactor', icon: '🔌', dfwRisk: 'HIGH', why: 'DFW systems run 3,000+ hours/year — contactors wear pitting into the relay surface.', symptoms: ['AC does not turn on at all', 'Clicking sound at outdoor unit', 'System short-cycles on and off'], ageRange: '8–12 years in DFW', cost: '$175–$300', urgency: 'Within 48 hours — failure imminent' },
  { id: 'fan-motor', name: 'Outdoor Fan Motor', icon: '🌀', dfwRisk: 'HIGH', why: 'DFW summer heat cycles overheat motor bearings. High humidity accelerates bearing corrosion.', symptoms: ['Outdoor fan not spinning', 'Unit runs but no cool air', 'Grinding or squealing at outdoor unit'], ageRange: '10–15 years', cost: '$300–$600', urgency: 'This week — compressor damage risk without cooling' },
  { id: 'blower', name: 'Blower Motor', icon: '💨', dfwRisk: 'MODERATE', why: 'DFW dust and allergens clog blower wheels, straining motors. Annual cleaning extends life.', symptoms: ['Weak airflow from all vents', 'Loud rattling or rumbling from air handler', 'System runs but rooms stay warm'], ageRange: '12–20 years', cost: '$400–$900', urgency: 'Within 2 weeks' },
  { id: 'compressor', name: 'Compressor', icon: '🏭', dfwRisk: 'CATASTROPHIC', why: 'DFW heat + long run times + deferred maintenance = compressor failure. Largest single repair cost.', symptoms: ['No cooling at all', 'Outdoor unit makes loud clanking', 'System trips breaker repeatedly'], ageRange: '10–15 years in DFW', cost: '$1,200–$3,000+ or full replacement', urgency: 'Immediately — often means full system replacement' },
];

const urgencyMap: Record<string, string> = {
  capacitor: 'Same day — system will fail completely',
  contactor: 'Within 48 hours — failure imminent',
  'fan-motor': 'This week — compressor damage risk',
  blower: 'Within 2 weeks',
  compressor: 'Immediately — may need full replacement',
};

export default function DFWHVACPartsTroubleGuide() {
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<null | typeof parts[0]>(null);

  function diagnose() {
    if (!age || !symptom) return;
    const ageNum = Number(age);
    if (symptom === 'warm' && ageNum >= 5) { setResult(parts[0]); return; }
    if (symptom === 'nostart') { setResult(parts[1]); return; }
    if (symptom === 'fanstop') { setResult(parts[2]); return; }
    if (symptom === 'weakflow') { setResult(parts[3]); return; }
    if (symptom === 'nocool' && ageNum >= 10) { setResult(parts[4]); return; }
    setResult(parts[0]);
  }

  const riskColor = (r: string) => r === 'HIGHEST' || r === 'CATASTROPHIC' ? '#FF6B6B' : r === 'HIGH' ? '#F5A623' : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', fontWeight: 600, letterSpacing: '0.08em' }}>DFW HVAC RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>HVAC Parts Troubleshooting Guide</h1>
        <p style={{ color: '#9AA5B8', marginBottom: '2rem', fontSize: '1rem' }}>Common DFW HVAC part failures by system age and symptom — know before you call.</p>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>⚙️ DFW Part Failure Risk by Component</h2>
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
          {parts.map(p => (
            <div key={p.id} style={{ background: '#0F2040', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>{p.name}</span>
                <span style={{ background: riskColor(p.dfwRisk) + '30', color: riskColor(p.dfwRisk), fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>{p.dfwRisk}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9AA5B8', marginBottom: '0.5rem' }}>{p.why}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.83rem' }}>
                <div><span style={{ color: '#F5E642' }}>Life: </span>{p.ageRange}</div>
                <div><span style={{ color: '#F5E642' }}>Cost: </span>{p.cost}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🔍 Diagnose Your DFW System</h2>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.4rem' }}>System Age (years)</label>
            <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="e.g. 8" style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.6rem 1rem', color: '#E8EDF5', fontSize: '0.95rem', width: '120px' }} />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.4rem' }}>Primary Symptom</label>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[['warm','Runs but blows warm'],['nostart','Will not turn on'],['fanstop','Fan not spinning'],['weakflow','Weak airflow'],['nocool','No cooling at all']].map(([v,l]) => (
                <button key={v} onClick={() => setSymptom(v)} style={{ padding: '0.5rem 0.9rem', borderRadius: '8px', border: symptom === v ? '2px solid #F5E642' : '1px solid #1E3A5F', background: symptom === v ? '#F5E64220' : '#0A1628', color: symptom === v ? '#F5E642' : '#E8EDF5', cursor: 'pointer', fontSize: '0.85rem' }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={diagnose} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Find Likely Part →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642' }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#F5E642', marginBottom: '0.75rem' }}>{result.icon} Most Likely: {result.name}</div>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>{result.why}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div><span style={{ color: '#9AA5B8' }}>Repair Cost: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span></div>
              <div><span style={{ color: '#9AA5B8' }}>DFW Life: </span>{result.ageRange}</div>
            </div>
            <div><span style={{ color: '#9AA5B8' }}>Urgency: </span><span style={{ color: '#FF6B6B', fontWeight: 600 }}>{urgencyMap[result.id]}</span></div>
          </div>
        )}

        <div style={{ marginTop: '3rem', background: '#0F2040', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Get a DFW HVAC tech who can diagnose and fix it today.</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem' }}>ProLnk matches you with vetted local pros — fast response for DFW summer emergencies.</div>
        </div>
      </div>
    </div>
  );
}
