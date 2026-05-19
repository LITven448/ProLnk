import { useState } from 'react';

const moldConcerns = [
  { id: 'musty', label: 'Musty smell in vents', risk: 'High', action: 'Schedule UV coil inspection immediately' },
  { id: 'visible', label: 'Visible mold near vents', risk: 'Critical', action: 'Turn off HVAC, call pro same day' },
  { id: 'humidity', label: 'Humidity over 55% indoors', risk: 'Medium', action: 'Check drain line + add UV purifier' },
  { id: 'none', label: 'No current symptoms', risk: 'Low', action: 'Monthly drain check + annual coil clean' },
];

const homeTypes = [
  { id: 'slab', label: 'Slab foundation' },
  { id: 'crawl', label: 'Crawl space' },
  { id: 'basement', label: 'Basement' },
  { id: 'twostory', label: 'Two-story home' },
];

export default function DFWHVACMoldPrevention() {
  const [selectedHome, setSelectedHome] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('');
  const [plan, setPlan] = useState<null | { risk: string; action: string; steps: string[] }>(null);

  const generatePlan = () => {
    const concern = moldConcerns.find(c => c.id === selectedConcern);
    if (!concern || !selectedHome) return;
    const baseSteps = [
      'Set thermostat to maintain 45–55% relative humidity indoors',
      'Install UV coil purification system on evaporator coil',
      'Clear condensate drain line monthly with diluted bleach tablet',
      'Replace filter every 30 days during DFW summer (June–Sep)',
      'Schedule annual coil cleaning before summer humidity season',
    ];
    const crawlExtra = selectedHome === 'crawl' ? ['Add crawl space vapor barrier — DFW humidity enters from ground up'] : [];
    const basementExtra = selectedHome === 'basement' ? ['Run dedicated basement dehumidifier alongside HVAC'] : [];
    setPlan({ risk: concern.risk, action: concern.action, steps: [...baseSteps, ...crawlExtra, ...basementExtra] });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF4', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🍃</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Mold Prevention</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Dallas-Fort Worth averages 60–75% outdoor humidity from May through September. Your HVAC is the primary defense keeping mold spores from taking hold inside your home.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ Why DFW Makes Mold Easy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '💧', label: 'Avg summer humidity', value: '68% RH' },
              { icon: '🌡️', label: 'Mold growth threshold', value: '>55% RH' },
              { icon: '❄️', label: 'HVAC removes moisture', value: 'via evaporator coil' },
              { icon: '⚠️', label: 'Risk window', value: 'May – September' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '1.25rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{stat.label}</div>
                <div style={{ fontWeight: 600, color: '#F5E642' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 Get Your Mold Prevention Plan</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>Home type</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setSelectedHome(h.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selectedHome === h.id ? '#F5E642' : '#1E3A5F', background: selectedHome === h.id ? '#F5E642' : 'transparent', color: selectedHome === h.id ? '#0A1628' : '#E8EEF4', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {h.label}
              </button>
            ))}
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>Current mold concern</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {moldConcerns.map(c => (
              <button key={c.id} onClick={() => setSelectedConcern(c.id)}
                style={{ padding: '0.65rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selectedConcern === c.id ? '#F5E642' : '#1E3A5F', background: selectedConcern === c.id ? '#1a2f50' : 'transparent', color: '#E8EEF4', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={generatePlan} disabled={!selectedHome || !selectedConcern}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: selectedHome && selectedConcern ? 'pointer' : 'not-allowed', opacity: selectedHome && selectedConcern ? 1 : 0.5 }}>
            Generate My Mold Prevention Plan
          </button>
        </div>

        {plan && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>📋</span>
              <h3 style={{ color: '#F5E642', margin: 0 }}>Your Plan — Risk: {plan.risk}</h3>
            </div>
            <p style={{ color: '#E8EEF4', fontWeight: 600, marginBottom: '1rem' }}>⚡ Immediate: {plan.action}</p>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Full prevention checklist:</p>
            <ul style={{ color: '#E8EEF4', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
              {plan.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8 }}>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>🔧 ProLnk connects you with DFW HVAC pros who specialize in mold prevention — free quotes, verified techs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
