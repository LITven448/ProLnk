import { useState } from 'react';

const lockData = {
  keypad: {
    label: 'Keypad Lock',
    icon: '🔢',
    pros: ['No WiFi needed', 'No hacking risk', 'Battery-operated', 'Simple to use', 'Works during power outages'],
    cons: ['No remote access', 'No activity logs', 'Fixed codes only'],
    dfwNote: 'Replace batteries every 6 months in DFW heat (vs 12 months in cooler climates).',
    cost: '$80–$200 installed',
    bestFor: ['Primary residence', 'Low-tech comfort', 'Rental properties with frequent code changes'],
  },
  smart: {
    label: 'Smart Lock',
    icon: '📱',
    pros: ['Remote locking/unlocking', 'Activity logs', 'Temporary access codes', 'App notifications', 'Alexa/Google integration'],
    cons: ['Requires WiFi', 'Higher cost', 'Software updates needed', 'Possible hacking surface'],
    dfwNote: 'Ideal for DFW vacation/short-term rentals. Replace batteries every 6 months due to DFW heat.',
    cost: '$200–$450 installed',
    bestFor: ['Vacation properties', 'Remote monitoring', 'Tech-comfortable homeowners'],
  },
};

const recommendations: Record<string, Record<string, string>> = {
  vacation: { low: 'keypad', mid: 'smart', high: 'smart' },
  primary: { low: 'keypad', mid: 'keypad', high: 'smart' },
  rental: { low: 'keypad', mid: 'smart', high: 'smart' },
};

export default function DFWKeypadLockGuide() {
  const [useCase, setUseCase] = useState('');
  const [techLevel, setTechLevel] = useState('');
  const [result, setResult] = useState('');

  function getRecommendation() {
    if (!useCase || !techLevel) return;
    const rec = recommendations[useCase]?.[techLevel] ?? 'keypad';
    setResult(rec);
  }

  const rec = result ? lockData[result as keyof typeof lockData] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1 }}>DFW HOME SECURITY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔐 Keypad vs Smart Lock Guide</h1>
        <p style={{ color: '#9EAFC2', marginBottom: 32, lineHeight: 1.6 }}>
          Choosing the right door lock for DFW homes means accounting for the Texas heat, remote monitoring needs, and your tech comfort level.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {Object.values(lockData).map((lock) => (
            <div key={lock.label} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{lock.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642' }}>{lock.label}</div>
              <div style={{ color: '#9EAFC2', fontSize: 13, marginBottom: 12 }}>Cost: {lock.cost}</div>
              <div style={{ marginBottom: 8 }}>
                {lock.pros.map((p) => <div key={p} style={{ fontSize: 12, color: '#4ADE80', marginBottom: 2 }}>✓ {p}</div>)}
              </div>
              <div style={{ marginBottom: 12 }}>
                {lock.cons.map((c) => <div key={c} style={{ fontSize: 12, color: '#F87171', marginBottom: 2 }}>✗ {c}</div>)}
              </div>
              <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 10, fontSize: 12, color: '#F5E642' }}>🌡️ {lock.dfwNote}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 Find Your Lock Type</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>Property Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['primary', 'Primary Residence'], ['vacation', 'Vacation/STR'], ['rental', 'Long-Term Rental']].map(([v, l]) => (
                <button key={v} onClick={() => setUseCase(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: useCase === v ? '#F5E642' : '#1E3A5F', color: useCase === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>Tech Comfort Level</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['low', 'Low — Keep it simple'], ['mid', 'Mid — Some apps'], ['high', 'High — Smart home']].map(([v, l]) => (
                <button key={v} onClick={() => setTechLevel(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: techLevel === v ? '#F5E642' : '#1E3A5F', color: techLevel === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>

        {rec && (
          <div style={{ background: '#0F2940', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{rec.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>Recommended: {rec.label}</div>
            <div style={{ color: '#9EAFC2', fontSize: 14, marginBottom: 12 }}>Estimated cost: {rec.cost}</div>
            <div style={{ fontSize: 13, color: '#E8EDF5', marginBottom: 4 }}>Best for: {rec.bestFor.join(' • ')}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#9EAFC2', fontSize: 12 }}>
          🏠 ProLnk connects you with licensed DFW locksmiths and smart home installers
        </div>
      </div>
    </div>
  );
}
