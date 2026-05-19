import { useState } from 'react';

export default function DFWNovemberHomeMaintenanceGuide() {
  const [situation, setSituation] = useState<string>('');

  const tasks: Record<string, { icon: string; title: string; urgency: string }[]> = {
    freeze: [
      { icon: '🧊', title: 'Insulate exposed pipes in garage, attic, and crawlspaces', urgency: 'Critical' },
      { icon: '💧', title: 'Shut off and blow out irrigation system before first freeze', urgency: 'Critical' },
      { icon: '🚿', title: 'Know your main water shut-off location — pipe burst = seconds matter', urgency: 'Critical' },
      { icon: '🌡️', title: 'Set thermostat no lower than 55°F even when traveling', urgency: 'High' },
      { icon: '🔧', title: 'Disconnect and drain outdoor hoses before freeze', urgency: 'High' },
    ],
    furnace: [
      { icon: '🔥', title: 'First furnace run of year — listen for unusual sounds or smells', urgency: 'Critical' },
      { icon: '🔄', title: 'Replace HVAC filter before heating season begins', urgency: 'High' },
      { icon: '🧹', title: 'Clean furnace vents and registers', urgency: 'High' },
      { icon: '🌬️', title: 'Test carbon monoxide detectors — furnace season starts CO risk', urgency: 'Critical' },
      { icon: '📋', title: 'Schedule professional furnace tune-up if not done in October', urgency: 'High' },
    ],
    holiday: [
      { icon: '🎄', title: 'Inspect holiday lights for frayed wires before installing', urgency: 'Critical' },
      { icon: '🔌', title: 'Use outdoor-rated extension cords only — GFCI protected circuits', urgency: 'High' },
      { icon: '🪟', title: 'Check weatherstripping on doors — heat loss spikes in November', urgency: 'High' },
      { icon: '🚪', title: 'Add door draft stoppers before holiday guests arrive', urgency: 'Medium' },
      { icon: '🔥', title: 'Have chimney inspected before first fireplace use of season', urgency: 'Critical' },
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
          <div style={{ fontSize: 48 }}>🧊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW November Home Maintenance</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Pre-Winter Prep · Freeze Protection · Furnace First Run · Holiday Safety</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', marginBottom: 12, fontWeight: 600 }}>What's your November priority?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ key: 'freeze', label: '🧊 Freeze Protection' }, { key: 'furnace', label: '🔥 Furnace Prep' }, { key: 'holiday', label: '🎄 Holiday Safety' }].map(opt => (
              <button key={opt.key} onClick={() => setSituation(opt.key)} style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', borderColor: situation === opt.key ? '#F5E642′ : '#1E3A5F', backgroundColor: situation === opt.key ? '#1a2f4e' : '#0D1F3C', color: '#fff', cursor: ’pointer', fontWeight: 600 }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {situation && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your November Winterization Checklist</h2>
            {tasks[situation].map((task, i) => (
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
          <p style={{ color: '#94A3B8', margin: '0 0 12px' }}>Don't wait for the first freeze — book a DFW pro now.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}