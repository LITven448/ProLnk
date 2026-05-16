import { useState } from 'react';

export default function DFWAlexaVsGoogleHomeDFW2026() {
  const [goal, setGoal] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const goals = [
    { id: 'hvac', label: '🌡️ HVAC & Climate Control' },
    { id: 'security', label: '🔒 Security & Cameras' },
    { id: 'entertainment', label: '🎵 Music & Entertainment' },
    { id: 'google', label: '📱 Google Ecosystem (Android/Pixel)' },
    { id: 'amazon', label: '📦 Amazon Ecosystem (Prime/Fire TV)' },
    { id: 'multi', label: '🏠 Multi-Room Automation' },
  ];

  const recommendations: Record<string, string> = {
    hvac: '✅ Alexa wins — broader Ecobee & Honeywell support, easy DFW HVAC routines for 100°F+ days.',
    security: '✅ Alexa wins — Ring integration is native. Pair with Ring Alarm for full DFW home security.',
    entertainment: '✅ Tie — Both excellent. Alexa for Fire TV homes; Google Home for YouTube/Chromecast setups.',
    google: '✅ Google Home wins — seamless with Android, Pixel Watch, and Google Workspace for DFW families.',
    amazon: '✅ Alexa wins — Prime Video, Echo Show displays, and Amazon shopping routines built in.',
    multi: '✅ Google Home wins — superior multi-room logic and Nest presence detection for DFW open floor plans.',
  };

  function recommend() {
    if (goal) setResult(recommendations[goal]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '.5rem 0' }}>Alexa vs Google Home for DFW Homes 2026</h1>
          <p style={{ color: '#94a3b8' }}>Which smart hub wins in North Texas — and for your specific setup?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', border: '2px solid #FF9900' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🟠 Amazon Alexa</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li>10,000+ compatible devices</li>
              <li>Native Ring & Ecobee support</li>
              <li>Echo Show for visual dashboards</li>
              <li>Alexa Guard for DFW home monitoring</li>
              <li>Routines for HVAC on 100°F+ days</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', border: '2px solid #4285F4' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🔵 Google Home</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
              <li>Best-in-class AI understanding</li>
              <li>Nest thermostat deep integration</li>
              <li>Presence detection via Android</li>
              <li>Matter hub built-in (2024+)</li>
              <li>Superior multi-room coordination</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧭 DFW Smart Home Goal Finder</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Select your primary smart home goal:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', marginBottom: '1rem' }}>
            {goals.map(g => (
              <button key={g.id} onClick={() => setGoal(g.id)}
                style={{ padding: '.75rem', borderRadius: '8px', border: goal === g.id ? '2px solid #F5E642' : '2px solid #1e3a5f', backgroundColor: goal === g.id ? '#1a2f4e' : '#0d1f35', color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: '.9rem' }}>
                {g.label}
              </button>
            ))}
          </div>
          <button onClick={recommend} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '.75rem 2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Get My Recommendation →
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0d1f35', borderRadius: '8px', color: '#F5E642', fontSize: '1rem' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>🌡️ DFW-Specific Tip</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>Both hubs work with Ecobee and Ring — the two most popular devices in DFW. During ERCOT demand response events in summer, Ecobee automatically adjusts. Alexa routines can trigger "Away Mode" cooling schedules to cut bills during peak Texas heat.</p>
        </div>
      </div>
    </div>
  );
}
