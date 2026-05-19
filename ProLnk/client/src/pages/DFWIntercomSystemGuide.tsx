import { useState } from 'react';

const systems = {
  alexa: { label: 'Amazon Echo Drop-In Intercom', icon: '🗣️', cost: '$150-$400 for whole-home', description: 'Use existing Alexa devices as an intercom system. Drop-in feature lets you announce to any room.', dfwNote: 'Quick and affordable retrofit for DFW homes that already have Alexa devices.', bestFor: ['Tech-comfortable families', 'Homes with existing Alexa', 'Budget-friendly upgrade'], steps: ['Place Echo devices in key rooms', 'Enable Drop-In in Alexa app', 'Set up household contacts', 'Configure announcement routines'] },
  doorbell: { label: 'Smart Doorbell as Entry Intercom', icon: '🔔', cost: '$200-$500 installed', description: 'Two-way audio from front door to your phone. See and speak with visitors from anywhere.', dfwNote: 'Ideal for DFW gated community front gates and large properties with long driveways.', bestFor: ['Large DFW properties', 'Remote visitor management', 'Package delivery coordination'], steps: ['Install video doorbell', 'Configure two-way audio', 'Set up mobile notifications', 'Test audio in DFW heat'] },
  wired: { label: 'Wired Intercom Replacement', icon: '📟', cost: '$800-$2500 installed', description: 'Replace broken older wired intercom with modern smart system. Full-home coverage with HD audio/video.', dfwNote: 'Many DFW homes built 1980-2005 have broken wired intercoms. Replace with smart system for full upgrade.', bestFor: ['Homes with existing wired infrastructure', 'Multi-story DFW homes', 'Gated entry systems'], steps: ['Remove old wired system', 'Run new smart wiring', 'Install master panel', 'Configure room stations'] },
  gate: { label: 'Gated Community Intercom', icon: '🚪', cost: '$1500-$5000 installed', description: 'Full gate intercom system with camera, code entry, and remote access for visitors.', dfwNote: 'Common in DFW gated communities (Southlake, Highland Park, Frisco estates). HOA approval often required.', bestFor: ['Gated DFW properties', 'Large estates', 'HOA-managed communities'], steps: ['Check HOA requirements', 'Install gate controller', 'Configure visitor codes', 'Set up camera and audio'] },
};

const needMap: Record<string, Record<string, string>> = {
  single: { family: 'alexa', delivery: 'doorbell', visitors: 'doorbell' },
  multistory: { family: 'alexa', delivery: 'doorbell', visitors: 'wired' },
  gated: { family: 'wired', delivery: 'gate', visitors: 'gate' },
};

export default function DFWIntercomSystemGuide() {
  const [homeType, setHomeType] = useState('');
  const [need, setNeed] = useState('');
  const [result, setResult] = useState('');
  function getRecommendation() { if (!homeType || !need) return; setResult(needMap[homeType]?.[need] ?? 'alexa'); }
  const rec = result ? systems[result as keyof typeof systems] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1 }}>DFW HOME SECURITY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📟 Home Intercom System Guide</h1>
        <p style={{ color: '#9EAFC2', marginBottom: 12, lineHeight: 1.6 }}>Many DFW homes built between 1980-2005 have broken wired intercom systems. Here are your modern replacement options.</p>
        <div style={{ background: '#111E35', borderRadius: 10, padding: 14, marginBottom: 28, fontSize: 13, color: '#60A5FA', border: '1px solid #60A5FA' }}>
          💡 DFW Tip: If you have an old wired intercom that no longer works, you have three options: repair it, replace it with modern wiring, or go wireless with smart devices.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {Object.entries(systems).map(([k, s]) => (
            <div key={k} style={{ background: '#111E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#F5E642′ }}>{s.label}</div>
              <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{s.cost}</div>
              <div style={{ color: '#9EAFC2', fontSize: 12, marginBottom: 8 }}>{s.description}</div>
              <div style={{ background: '#1E3A5F', borderRadius: 6, padding: 8, fontSize: 11, color: '#F5E642', marginBottom: 8 }}>🌡️ {s.dfwNote}</div>
              {s.bestFor.map((b: string, i: number) => <div key={i} style={{ fontSize: 11, color: '#9EAFC2', marginBottom: 2 }}>✓ {b}</div>)}
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 Find Your System</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>Home Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['single', 'Single story'], ['multistory', 'Multi-story'], ['gated', 'Gated property']].map(([v, l]) => (
                <button key={v} onClick={() => setHomeType(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: homeType === v ? '#F5E642′ : '#1E3A5F', color: homeType === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>Primary Need</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['family', 'Family communication'], ['delivery', 'Delivery management'], ['visitors', 'Visitor entry control']].map(([v, l]) => (
                <button key={v} onClick={() => setNeed(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: need === v ? '#F5E642′ : '#1E3A5F', color: need === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>
        {rec && (
          <div style={{ background: '#0F2940', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{rec.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>Recommended: {rec.label}</div>
            <div style={{ color: '#4ADE80', fontWeight: 700, marginBottom: 8 }}>{rec.cost}</div>
            <div style={{ color: '#9EAFC2', fontSize: 14 }}>{rec.dfwNote}</div>
          </div>
        )}
        <div style={{ marginTop: 32, textAlign: 'center', color: '#9EAFC2', fontSize: 12 }}>🏠 ProLnk connects you with licensed DFW intercom and smart home specialists</div>
      </div>
    </div>
  );
}
