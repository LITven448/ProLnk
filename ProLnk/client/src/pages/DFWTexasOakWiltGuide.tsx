import { useState } from 'react';

const oakSpecies = ['Live Oak', 'Red Oak', 'Post Oak', 'Bur Oak', 'Shumard Oak'];
const symptoms = ['Wilting leaves', 'Brown leaf veins', 'Defoliation', 'Fungal mats under bark', 'No visible symptoms'];
const locations = ['Dallas County', 'Tarrant County', 'Collin County', 'Denton County', 'Rockwall County', 'Ellis County'];

function getRisk(species: string, symptom: string) {
  if (symptom === 'No visible symptoms') return { level: 'Low', color: '#22c55e', treatment: 'Preventive pruning outside ban period. Avoid wounds April-July.', timing: 'Prune October-March only.' };
  if (species === 'Red Oak' || species === 'Shumard Oak') return { level: 'Critical', color: '#ef4444', treatment: 'Trench to break root grafts immediately. Remove infected wood. Contact certified arborist.', timing: 'Do NOT prune April 1-July 1. Emergency removal only with permit.' };
  if (symptom === 'Fungal mats under bark') return { level: 'High', color: '#f97316', treatment: 'Confirm diagnosis with lab test. Trench root zone. Remove and burn infected branches.', timing: 'Pruning ban in effect April 1-July 1 for all oaks in DFW.' };
  return { level: 'Moderate', color: '#eab308', treatment: 'Monitor closely. Schedule arborist inspection. Begin trench planning.', timing: 'Schedule pruning for October-March window.' };
}

export default function DFWTexasOakWiltGuide() {
  const [species, setSpecies] = useState('');
  const [symptom, setSymptom] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof getRisk>>(null);

  function assess() {
    if (!species || !symptom || !location) return;
    setResult(getRisk(species, symptom));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🌳</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Oak Wilt Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Oak wilt is one of the most destructive tree diseases in DFW. Caused by the fungus Bretziella fagacearum, it spreads through interconnected root systems and sap-feeding beetles. Red oaks can die within weeks; live oaks may take years. DFW enforces a pruning ban on all oaks April 1 - July 1 when beetles are most active.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>🦠 How It Spreads</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Root grafts between neighboring oaks</li>
              <li>Nitidulid sap beetles carry spores</li>
              <li>Fresh pruning wounds attract beetles</li>
              <li>Firewood movement spreads fungus</li>
            </ul>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>🚫 DFW Pruning Ban</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>April 1 - July 1 annually</li>
              <li>Applies to all oak species</li>
              <li>Paint wounds immediately if cut</li>
              <li>Safe window: October - March</li>
            </ul>
          </div>
        </div>
        <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Risk Assessment Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Oak Species</label>
              <select value={species} onChange={e => setSpecies(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select species</option>
                {oakSpecies.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Primary Symptom</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select symptom</option>
                {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your County</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select county</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Assess My Tree</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: `4px solid ${result.color}` }}>
              <p style={{ color: result.color, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Risk Level: {result.level}</p>
              <p style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}><strong>Treatment:</strong> {result.treatment}</p>
              <p style={{ color: '#F5E642' }}><strong>Timing:</strong> {result.timing}</p>
            </div>
          )}
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Note:</strong> Oak wilt treatment requires a certified arborist. Trenching to break root grafts must be done by a licensed tree care professional. ProLnk connects you with verified DFW arborists.
        </div>
      </div>
    </div>
  );
}
