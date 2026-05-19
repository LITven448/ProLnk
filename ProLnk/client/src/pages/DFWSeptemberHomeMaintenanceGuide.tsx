import { useState } from 'react';

export default function DFWSeptemberHomeMaintenanceGuide() {
  const [homeType, setHomeType] = useState<string>('');

  const tasks: Record<string, { icon: string; title: string; urgency: string }[]> = {
    single: [
      { icon: '❄️', title: 'Schedule HVAC heat mode test — first cold front can arrive late Sept', urgency: 'Critical' },
      { icon: '💧', title: 'Reduce irrigation to 3x/week — temps dropping, grass needs less', urgency: 'High' },
      { icon: '🌧️', title: 'Clear gutters before hurricane-season rain events', urgency: 'High' },
      { icon: '🔍', title: 'Inspect roof after summer — check for lifted shingles', urgency: 'High' },
      { icon: '🌿', title: 'Aerate and overseed lawn — September is prime timing in DFW', urgency: 'Medium' },
      { icon: '🎨', title: 'Begin exterior painting projects — temps finally tolerable', urgency: 'Medium' },
    ],
    condo: [
      { icon: '❄️', title: 'Test heat mode on your HVAC unit before building switches over', urgency: 'Critical' },
      { icon: '🪟', title: 'Inspect window weatherstripping ahead of first cold snap', urgency: 'High' },
      { icon: '🌧️', title: 'Confirm balcony drains are clear before heavy September rain', urgency: 'High' },
      { icon: '🔌', title: 'Test smoke detectors — fall reminder with season change', urgency: 'Medium' },
    ],
    townhome: [
      { icon: '❄️', title: 'Schedule shared HVAC system check — coordinate with HOA', urgency: 'Critical' },
      { icon: '🌧️', title: 'Inspect shared drainage — rain events reveal clogs fast', urgency: 'High' },
      { icon: '🌿', title: 'Plan fall landscaping within HOA guidelines', urgency: 'Medium' },
      { icon: '🔍', title: 'Walk perimeter for any summer damage before fall repairs', urgency: 'High' },
    ],
  };

  const urgencyColor: Record<string, string> = {
    Critical: '#FF4444',
    High: '#F5E642',
    Medium: '#4CAF50',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌦️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW September Home Maintenance</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Transition Month · First Cold Fronts · Hurricane Rain Risk · HVAC Switchover</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', marginBottom: 12, fontWeight: 600 }}>Select your home type:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ key: 'single', label: '🏠 Single Family' }, { key: 'condo', label: '🏢 Condo' }, { key: 'townhome', label: '🏘️ Townhome' }].map(opt => (
              <button key={opt.key} onClick={() => setHomeType(opt.key)} style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', borderColor: homeType === opt.key ? '#F5E642′ : '#1E3A5F', backgroundColor: homeType === opt.key ? '#1a2f4e' : '#0D1F3C', color: '#fff', cursor: ’pointer', fontWeight: 600 }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {homeType && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your September Transition Checklist</h2>
            {tasks[homeType].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, backgroundColor: '#0D1F3C', borderRadius: 10, padding: '14px 16px', marginBottom: 10, borderLeft: `4px solid ${urgencyColor[task.urgency]}` }}>
                <span style={{ fontSize: 24 }}>{task.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#E2E8F0′ }}>{task.title}</p>
                  <span style={{ fontSize: 12, color: urgencyColor[task.urgency], fontWeight: 700 }}>{task.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#0D1F3C', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', margin: '0 0 12px' }}>Get ahead of the fall rush with a vetted DFW pro.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}