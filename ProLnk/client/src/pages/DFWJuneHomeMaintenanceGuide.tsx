import { useState } from 'react';

export default function DFWJuneHomeMaintenanceGuide() {
  const [homeType, setHomeType] = useState<string>('');

  const tasks: Record<string, { icon: string; title: string; urgency: string }[]> = {
    single: [
      { icon: '❄️', title: 'Replace HVAC air filter — running 24/7 means monthly swaps', urgency: 'Critical' },
      { icon: '💧', title: 'Check irrigation system for broken heads + over-spray', urgency: 'High' },
      { icon: '🏊', title: 'Balance pool chemistry weekly — heat accelerates algae', urgency: 'High' },
      { icon: '🎨', title: 'Inspect south/west exterior walls for paint blistering', urgency: 'Medium' },
      { icon: '🌡️', title: 'Set thermostat to 78°F away mode to cut electricity bills', urgency: 'Medium' },
      { icon: '🧹', title: 'Clear HVAC condenser coils of grass and debris', urgency: 'High' },
    ],
    condo: [
      { icon: '❄️', title: 'Confirm HOA handles HVAC maintenance — verify your unit', urgency: 'Critical' },
      { icon: '🪟', title: 'Check window seals for UV degradation and heat gaps', urgency: 'High' },
      { icon: '💨', title: 'Clean bathroom and kitchen exhaust fans', urgency: 'Medium' },
      { icon: '🌡️', title: 'Test smart thermostat schedule for peak-demand hours', urgency: 'High' },
    ],
    rental: [
      { icon: '📋', title: 'Send tenants June HVAC filter reminder — document it', urgency: 'Critical' },
      { icon: '💧', title: 'Inspect outdoor hose bibs and irrigation for leaks', urgency: 'High' },
      { icon: '🔌', title: 'Test all GFCI outlets — outdoor heat accelerates failure', urgency: 'High' },
      { icon: '🏊', title: 'Schedule pool service contract if not already in place', urgency: 'Medium' },
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
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW June Home Maintenance</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Avg 96°F · HVAC peaks · Pool season · Blistering UV risk</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', marginBottom: 12, fontWeight: 600 }}>Select your home type:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ key: 'single', label: '🏠 Single Family' }, { key: 'condo', label: '🏢 Condo/Townhome' }, { key: 'rental', label: '🔑 Rental Property' }].map(opt => (
              <button key={opt.key} onClick={() => setHomeType(opt.key)} style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', borderColor: homeType === opt.key ? '#F5E642' : '#1E3A5F', backgroundColor: homeType === opt.key ? '#1a2f4e' : '#0D1F3C', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {homeType && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your June Priority Tasks</h2>
            {tasks[homeType].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, backgroundColor: '#0D1F3C', borderRadius: 10, padding: '14px 16px', marginBottom: 10, borderLeft: `4px solid ${urgencyColor[task.urgency]}` }}>
                <span style={{ fontSize: 24 }}>{task.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#E2E8F0' }}>{task.title}</p>
                  <span style={{ fontSize: 12, color: urgencyColor[task.urgency], fontWeight: 700 }}>{task.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#0D1F3C', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', margin: '0 0 12px' }}>Need a DFW pro for summer maintenance?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}