import { useState } from 'react';

export default function DFWSecuritySystemGuide2026() {
  const [homeType, setHomeType] = useState('single');
  const [result, setResult] = useState<string[]>([]);

  const assess = () => {
    const base = [
      '📹 Video doorbell (Ring / Nest) — 65%+ DFW adoption, deters porch theft',
      '🔒 Smart deadbolt — keyless entry, remote lock/unlock, access logs',
      '📱 Alarm system — professional monitoring avg $25-50/mo in DFW',
    ];
    if (homeType === 'single') {
      setResult([...base,
        '🚪 Motion sensors on all entry points + garage door sensor',
        '💡 Smart exterior lighting — dusk-to-dawn motion-activated',
        '📡 Professional monitoring recommended — DFW response times avg 8-12 min',
      ]);
    } else if (homeType === 'town') {
      setResult([...base,
        '🏠 Focus on unit entry and balcony/patio access points',
        '🤝 Coordinate with HOA on common area cameras',
        '🔔 Window and glass-break sensors — shared walls require care',
      ]);
    } else if (homeType === 'condo') {
      setResult([
        '📹 Video doorbell at unit door (if building allows)',
        '🔒 Smart lock on unit door — confirm building rules first',
        '📱 Self-monitoring app may be sufficient — building has shared security',
        '🚨 Verify building camera coverage at parking and lobby',
      ]);
    } else {
      setResult([...base,
        '🏘️ Rural DFW properties have longer police response — monitoring is critical',
        '📡 Cellular backup required — power + internet outages common in storms',
        '💡 Motion flood lights on all outbuildings and driveways',
        '🐕 Consider dual verification — camera + sensor before alarm triggers',
      ]);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 ProLnk Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Home Security Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>Property crime varies significantly across DFW cities. Smart layering beats expensive monitoring contracts every time.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📹', label: 'Video Doorbell Adoption', val: '65%+ DFW homes' },
            { icon: '📱', label: 'Pro Monitoring Cost', val: '$25–$50/mo' },
            { icon: '🔒', label: 'Smart Lock Adoption', val: 'Growing fast in DFW' },
            { icon: '⚡', label: 'Cellular Backup', val: 'Critical for ERCOT storms' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#1a2744', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{s.val}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Security Priority Assessment</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Home Type</label><br />
            <select value={homeType} onChange={(e) => setHomeType(e.target.value)}
              style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
              <option value="single">Single Family Home</option>
              <option value="town">Townhome</option>
              <option value="condo">Condo / Apartment</option>
              <option value="rural">Rural / Acreage Property</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
            Get My Security Plan
          </button>
          {result.length > 0 && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>
              {result.map((r, i) => (
                <div key={i} style={{ marginBottom: '0.4rem', color: '#a0aec0', fontSize: '0.9rem' }}>{r}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🔗 ProLnk Security Installers</h2>
          <p style={{ color: '#a0aec0', marginBottom: '1rem', fontSize: '0.9rem' }}>ProLnk connects DFW homeowners to licensed, background-checked security system installers. Get 3 quotes in 24 hours.</p>
          <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 700, display: 'inline-block', cursor: 'pointer' }}>
            Get Free Security Quotes →
          </div>
        </div>
      </div>
    </div>
  );
}