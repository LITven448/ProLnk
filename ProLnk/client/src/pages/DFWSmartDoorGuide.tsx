import { useState } from 'react';

const packages = {
  basic: { label: 'Video Doorbell Only', icon: '🔔', cost: '$200-$400 installed', devices: ['Video doorbell with cloud recording', 'Motion zones configured', 'App notifications'], dfwNote: 'DFW package theft is common in suburban neighborhoods - start here.', integrations: ['Alexa or Google Home alerts', 'Mobile app remote view'] },
  standard: { label: 'Doorbell + Smart Lock', icon: '🔐', cost: '$450-$800 installed', devices: ['Video doorbell', 'Smart deadbolt lock', 'App-controlled entry'], dfwNote: 'Most popular combo for DFW homeowners who work from home.', integrations: ['Lock auto-arms when motion detected', 'Alexa routines', 'Remote lock/unlock'] },
  premium: { label: 'Full Smart Entry Suite', icon: '🏠', cost: '$900-$1800 installed', devices: ['Video doorbell', 'Smart deadbolt', 'Smart porch lighting', 'Indoor entry camera'], dfwNote: 'Best for DFW vacation rentals and homes with frequent deliveries.', integrations: ['All devices work together', 'Alexa/Google full routines', 'Package detection AI'] },
};

const priorityMap: Record<string, string> = { theft: 'premium', convenience: 'standard', budget: 'basic', rental: 'premium', alexa: 'standard' };

export default function DFWSmartDoorGuide() {
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState('');
  function getRecommendation() { if (!priority) return; setResult(priorityMap[priority] ?? 'basic'); }
  const rec = result ? packages[result as keyof typeof packages] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1 }}>DFW HOME SECURITY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚪 Smart Door and Entry Guide</h1>
        <p style={{ color: '#9EAFC2', marginBottom: 12, lineHeight: 1.6 }}>Video doorbell plus smart lock plus smart lighting is the winning combo for DFW homes. Here is how they work together.</p>
        <div style={{ background: '#111E35', borderRadius: 10, padding: 14, marginBottom: 28, fontSize: 13, color: '#F5E642', border: '1px solid #F5E642' }}>
          📦 DFW Package Theft Alert: Porch pirates are active across DFW suburbs. A visible video doorbell deters 60%+ of theft attempts.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {Object.entries(packages).map(([k, p]) => (
            <div key={k} style={{ background: '#111E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#F5E642' }}>{p.label}</div>
              <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{p.cost}</div>
              {p.devices.map((d: string, i: number) => <div key={i} style={{ fontSize: 11, color: '#9EAFC2', marginBottom: 2 }}>• {d}</div>)}
              <div style={{ marginTop: 10, marginBottom: 6, fontSize: 11, fontWeight: 600, color: '#60A5FA' }}>Integrations:</div>
              {p.integrations.map((itg: string, i: number) => <div key={i} style={{ fontSize: 11, color: '#9EAFC2', marginBottom: 2 }}>⚡ {itg}</div>)}
              <div style={{ marginTop: 10, background: '#1E3A5F', borderRadius: 8, padding: 8, fontSize: 11, color: '#F5E642' }}>🌡️ {p.dfwNote}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 What is Your Priority?</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {[['theft', '📦 Stop package theft'], ['convenience', '⚡ Convenience'], ['budget', '💰 Best value'], ['rental', '🏠 Rental property'], ['alexa', '🗣️ Alexa integration']].map(([v, l]) => (
              <button key={v} onClick={() => setPriority(v)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: priority === v ? '#F5E642' : '#1E3A5F', color: priority === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
            ))}
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Package Recommendation →</button>
        </div>
        {rec && (
          <div style={{ background: '#0F2940', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{rec.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>Recommended: {rec.label}</div>
            <div style={{ color: '#4ADE80', fontWeight: 700, marginBottom: 12 }}>{rec.cost}</div>
            <div style={{ color: '#9EAFC2', fontSize: 14 }}>{rec.dfwNote}</div>
          </div>
        )}
        <div style={{ marginTop: 32, textAlign: 'center', color: '#9EAFC2', fontSize: 12 }}>🏠 ProLnk connects you with licensed DFW smart home installers</div>
      </div>
    </div>
  );
}
