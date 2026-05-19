import { useState } from 'react';

const maintenanceGuide = [
  {
    entity: 'HOA',
    owns: 'Detention/retention pond in common area',
    responsible: ['Mowing pond banks', 'Debris removal', 'Mosquito treatment (larvicide)', 'Erosion control', 'Outlet structure maintenance'],
    dfwNote: '📋 Most DFW master-planned communities (Allen, Frisco, McKinney) have HOAs responsible for detention basins. Verify in your HOA CC&Rs.',
    mosquitoRole: 'Primary — must treat standing water per DFW Mosquito Control District requirements',
  },
  {
    entity: 'City / MUD',
    owns: 'Regional detention basins, drainage easements',
    responsible: ['Major infrastructure maintenance', 'Drainage easement clearing', 'Flood capacity management', 'Outlet and culvert maintenance'],
    dfwNote: '🏙️ Dallas, Fort Worth, and most MUDs own and maintain regional storm ponds. Call 311 for maintenance requests.',
    mosquitoRole: 'Tarrant and Dallas County Mosquito Control district treats public water bodies — file service request at dfwmosquito.org',
  },
  {
    entity: 'Homeowner (Adjacent)',
    owns: 'Drainage easement on private property',
    responsible: ['Keep easement clear of fences, structures, and trees', 'Cannot block natural drainage flow', 'Responsible for any structures in easement'],
    dfwNote: '⚠️ DFW drainage easements are typically 10–20 ft wide. Building a fence or shed in the easement creates legal liability if it obstructs flood flow.',
    mosquitoRole: 'Responsible for standing water on your own property (bird baths, pots, tarps)',
  },
];

const improvements = [
  { id: 'french', name: 'French Drain', issue: 'standing', cost: '$1,500–$5,000', desc: 'Perforated pipe in gravel trench redirects subsurface water away from foundation.' },
  { id: 'swale', name: 'Swale Regrading', issue: 'slope', cost: '$800–$3,000', desc: 'Reshape yard grade to direct surface flow to street or basin.' },
  { id: 'catch', name: 'Catch Basin / Yard Drain', issue: 'pooling', cost: '$600–$1,800', desc: 'Concrete or plastic basin collects pooling water and pipes it out.' },
  { id: 'rain', name: 'Rain Garden', issue: 'runoff', cost: '$500–$2,000 DIY', desc: 'Planted depression absorbs runoff — DFW clay needs sand amendment to work.' },
];

const recommend = (propType: string, concern: string): string => {
  if (concern === 'mosquito') return 'hoa';
  if (concern === 'easement') return 'adjacent';
  if (concern === 'flood') return 'city';
  return propType === 'hoa' ? 'hoa' : 'adjacent';
};

export default function DFWDrainageBasinGuide() {
  const [propType, setPropType] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<typeof maintenanceGuide[0] | null>(null);

  const getGuide = () => {
    if (!propType || !concern) return;
    const entity = recommend(propType, concern);
    setResult(maintenanceGuide.find(m => m.entity.toLowerCase().includes(entity)) ?? maintenanceGuide[0]);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌊 DFW Drainage Basin Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Nearly every DFW subdivision has a detention pond. Knowing who's responsible for maintenance, mosquito control, and what you can (and can't) do in a drainage easement can save you thousands.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Responsibility Finder</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Property Type</label>
            <select value={propType} onChange={e => setPropType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select type...</option>
              <option value="hoa">HOA community (I pay dues)</option>
              <option value="city">City neighborhood (no HOA)</option>
              <option value="rural">Unincorporated / rural lot</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Primary Drainage Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select concern...</option>
              <option value="mosquito">🦟 Mosquito breeding in nearby pond</option>
              <option value="flood">🌊 Flooding during heavy rain events</option>
              <option value="easement">📐 Building near drainage easement</option>
              <option value="standing">💧 Standing water in yard</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Find Responsibility Guide →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32, border: '2px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Responsible Party</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.entity}</h3>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 }}>{result.dfwNote}</div>
            <div style={{ marginBottom: 12 }}><strong>Responsible for:</strong>
              <ul style={{ color: '#94A3B8', marginTop: 8, paddingLeft: 20 }}>
                {result.responsible.map(r => <li key={r} style={{ marginBottom: 4 }}>{r}</li>)}
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, fontSize: 14 }}>🦟 <strong>Mosquito Control:</strong> {result.mosquitoRole}</div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>DFW Drainage Improvements</h2>
        {improvements.map(i => (
          <div key={i.id} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{i.name}</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{i.desc}</p>
            <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {i.cost}</div>
          </div>
        ))}

        <div style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Easement Warning</div>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>Drainage easements in DFW are recorded on your plat. Check your plat at your county appraisal district website before building any structure. Fences in easements can be required to be removed at your expense if the city needs access.</p>
        </div>
      </div>
    </div>
  );
}
