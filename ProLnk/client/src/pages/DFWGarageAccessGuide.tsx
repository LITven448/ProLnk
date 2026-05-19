import { useState } from 'react';

const upgrades: Record<string, { label: string; icon: string; description: string; cost: string; dfwNote: string; steps: string[] }> = {
  keypad: { label: 'Wireless Keypad Entry', icon: '🔢', description: 'Add a weatherproof keypad outside your garage for code-based entry without a remote.', cost: '$120-$250 installed', dfwNote: 'DFW heat can shorten battery life - use lithium batteries and replace annually.', steps: ['Mount weatherproof keypad', 'Program rolling codes', 'Set family codes', 'Test in rain and heat'] },
  smart: { label: 'Smart Garage Controller', icon: '📱', description: 'Connect your existing garage opener to WiFi. Control and monitor from anywhere via app.', cost: '$150-$350 installed', dfwNote: 'Great for DFW delivery management - open remotely when packages arrive.', steps: ['Install smart controller module', 'Connect to home WiFi', 'Set up app alerts', 'Create temporary access codes'] },
  camera: { label: 'Garage Camera + Motion Alert', icon: '📷', description: 'Camera inside and outside garage detects motion and sends real-time alerts.', cost: '$200-$500 installed', dfwNote: 'DFW car break-ins often target garage areas - visible cameras deter opportunistic theft.', steps: ['Install interior and exterior cameras', 'Configure motion zones', 'Set up cloud recording', 'Test night vision'] },
  tempcode: { label: 'Temporary Code System', icon: '🗝️', description: 'Give contractors and house cleaners time-limited codes that expire automatically.', cost: '$180-$380 installed', dfwNote: 'Perfect for DFW service workers - codes expire after job completion.', steps: ['Upgrade to smart lock/keypad combo', 'Configure time-limited codes', 'Set up expiration alerts', 'Monitor access logs'] },
};
const concernMap: Record<string, string[]> = { breakin: ['camera', 'smart'], delivery: ['smart', 'tempcode'], workers: ['tempcode', 'keypad'], remoteaccess: ['smart', 'camera'] };

export default function DFWGarageAccessGuide() {
  const [concern, setConcern] = useState('');
  const [results, setResults] = useState<string[]>([]);
  function getRecommendation() { if (!concern) return; setResults(concernMap[concern] ?? ['keypad']); }
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1 }}>DFW HOME SECURITY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚗 Garage Access Security Guide</h1>
        <p style={{ color: '#9EAFC2', marginBottom: 12, lineHeight: 1.6 }}>Your garage door remote visible on your car visor is a target. DFW car break-ins frequently target visible remotes left in vehicles.</p>
        <div style={{ background: '#1A0A0A', border: '1px solid #F87171', borderRadius: 10, padding: 14, marginBottom: 28, fontSize: 13, color: '#F87171′ }}>
          ⚠️ DFW Warning: Leaving a garage remote visible in your car gives thieves access to your home. Always store remotes out of sight or switch to keypad entry.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {Object.entries(upgrades).map(([k, u]) => (
            <div key={k} style={{ background: '#111E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{u.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#F5E642′ }}>{u.label}</div>
              <div style={{ color: '#9EAFC2', fontSize: 13, marginBottom: 8 }}>{u.description}</div>
              <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{u.cost}</div>
              <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 8, fontSize: 11, color: '#F5E642', marginBottom: 10 }}>🌡️ {u.dfwNote}</div>
              {u.steps.map((s, i) => <div key={i} style={{ fontSize: 12, color: '#9EAFC2', marginBottom: 2 }}>Step {i + 1}: {s}</div>)}
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 What is Your Main Concern?</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {[['breakin', '🚨 Break-in prevention'], ['delivery', '📦 Delivery access'], ['workers', '👷 Service worker codes'], ['remoteaccess', '📱 Remote monitoring']].map(([v, l]) => (
              <button key={v} onClick={() => setConcern(v)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: concern === v ? '#F5E642′ : '#1E3A5F', color: concern === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
            ))}
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Show Solutions →</button>
        </div>
        {results.length > 0 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>Recommended for You:</h3>
            {results.map((r) => { const u = upgrades[r]; return (
              <div key={r} style={{ background: '#0F2940', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 12 }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{u.icon} {u.label}</div>
                <div style={{ color: '#9EAFC2', fontSize: 13, marginBottom: 6 }}>{u.description}</div>
                <div style={{ color: '#4ADE80', fontWeight: 700 }}>{u.cost}</div>
              </div>
            ); })}
          </div>
        )}
        <div style={{ marginTop: 32, textAlign: 'center', color: '#9EAFC2', fontSize: 12 }}>🏠 ProLnk connects you with licensed DFW garage door and security specialists</div>
      </div>
    </div>
  );
}
