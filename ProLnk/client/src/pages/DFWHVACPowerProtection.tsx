import { useState } from 'react';

const powerEvents = [
  { id: 'surge', label: '⚡ Thunderstorm power surge', threat: 'Compressor burnout, control board failure', fix: 'Whole-home surge protector + dedicated HVAC surge device', cost: '$300–$800 installed', urgency: 'High' },
  { id: 'outage', label: '🌨️ Ice storm extended outage', threat: 'Frozen pipes, system restart damage', fix: 'Generator hookup or manual restart protocol + frozen pipe prevention', cost: '$2,000–$8,000 generator / $0 protocol', urgency: 'Medium' },
  { id: 'brownout', label: '🔋 Brownout or voltage sag', threat: 'Motor overheating, compressor stress', fix: 'Hard-start capacitor + voltage monitoring smart plug', cost: '$150–$400', urgency: 'Medium' },
  { id: 'lightning', label: '🌩️ Direct lightning nearby', threat: 'Immediate control board destruction', fix: 'Whole-home lightning arrestor + equipment warranty rider', cost: '$500–$1,200', urgency: 'Critical' },
];

export default function DFWHVACPowerProtection() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | typeof powerEvents[0]>(null);

  const assess = () => {
    const evt = powerEvents.find(e => e.id === selected);
    if (evt) setResult(evt);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF4', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>⚡</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Power Protection</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>DFW gets over 70 thunderstorm days per year — and ice storms like Winter Storm Uri proved the grid can fail for days. Your HVAC draws more amperage than almost any appliance. One unprotected surge can end a $6,000 system.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ DFW Power Threat Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { label: 'Thunderstorm days/year', value: '70+', icon: '⛈️' },
              { label: 'Avg surge from lightning strike', value: '6,000V+', icon: '⚡' },
              { label: 'HVAC startup amperage', value: '40–60A', icon: '🔌' },
              { label: 'Cost if compressor burns out', value: '$1,800–$3,200', icon: '💸' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '1.25rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8′ }}>{stat.label}</div>
                <div style={{ fontWeight: 700, color: '#F5E642′ }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🏠 What Power Event Are You Worried About?</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>Select the scenario to get a tailored HVAC protection recommendation and cost estimate.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {powerEvents.map(e => (
              <button key={e.id} onClick={() => setSelected(e.id)}
                style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === e.id ? '#F5E642′ : '#1E3A5F', background: selected === e.id ? '#1a2f50' : ’transparent', color: '#E8EEF4', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {e.label}
              </button>
            ))}
          </div>
          <button onClick={assess} disabled={!selected}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: selected ? 'pointer' : 'not-allowed', opacity: selected ? 1 : 0.5 }}>
            Get HVAC Protection Recommendation
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ color: '#F5E642', margin: 0 }}>Protection Plan</h3>
              <span style={{ background: result.urgency === 'Critical' ? '#7F1D1D' : result.urgency === 'High' ? '#78350F' : '#1E3A5F', color: '#F5E642', padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600 }}>{result.urgency}</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>⚠️ Threat: {result.threat}</p>
            <p style={{ color: '#E8EEF4', marginBottom: '0.5rem' }}>✅ <strong>Recommended fix:</strong> {result.fix}</p>
            <p style={{ color: '#E8EEF4', marginBottom: '1.25rem' }}>💰 <strong>Estimated cost:</strong> {result.cost}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>🛡️ Universal DFW HVAC Power Best Practices</p>
              <ul style={{ color: '#94A3B8', fontSize: '0.85rem', paddingLeft: '1.25rem', lineHeight: 1.9, margin: 0 }}>
                <li>Install whole-home surge protector at the breaker panel — protects every circuit</li>
                <li>Add a dedicated HVAC surge protector at the disconnect box outside</li>
                <li>Use hard-start capacitor to reduce compressor startup amperage stress</li>
                <li>After any extended outage, wait 30 min before restarting HVAC — lets pressures equalize</li>
              </ul>
            </div>
            <p style={{ marginTop: '1rem', color: '#94A3B8', fontSize: '0.85rem', background: '#1a2f50', padding: '0.75rem', borderRadius: 8 }}>🔧 ProLnk connects you with DFW electricians and HVAC pros who install surge protection — free quotes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
