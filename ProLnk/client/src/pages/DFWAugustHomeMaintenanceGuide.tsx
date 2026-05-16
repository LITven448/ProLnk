import { useState } from 'react';

export default function DFWAugustHomeMaintenanceGuide() {
  const [homeAge, setHomeAge] = useState<string>('');

  const tasks: Record<string, { icon: string; title: string; urgency: string }[]> = {
    new: [
      { icon: '🌱', title: 'Foundation watering is critical — new homes settle faster in drought', urgency: 'Critical' },
      { icon: '❄️', title: 'Book fall HVAC service now — demand drops in September, prices fall', urgency: 'High' },
      { icon: '🎒', title: 'Back-to-school: test all smoke/CO detectors before school year', urgency: 'High' },
      { icon: '💧', title: 'Check irrigation for dry spots — new landscaping needs consistency', urgency: 'Medium' },
      { icon: '🔍', title: 'Inspect caulking around windows and doors for UV shrinkage', urgency: 'Medium' },
    ],
    mid: [
      { icon: '🏠', title: 'Check for soil pulling away from foundation perimeter', urgency: 'Critical' },
      { icon: '🌿', title: 'Trim trees away from roof — August storms can be sudden', urgency: 'High' },
      { icon: '❄️', title: 'Pre-book HVAC heating check for October — August booking = discounts', urgency: 'High' },
      { icon: '🚿', title: 'Flush water heater to remove sediment — hard DFW water builds fast', urgency: 'Medium' },
      { icon: '🔩', title: 'Tighten deck screws — heat expansion cycles loosen fasteners', urgency: 'Medium' },
    ],
    old: [
      { icon: '🏗️', title: 'Hire structural engineer if foundation cracks are widening', urgency: 'Critical' },
      { icon: '⚡', title: 'Check electrical panel for heat-related breaker trips — older panels fail', urgency: 'Critical' },
      { icon: '🪟', title: 'Inspect single-pane windows for seal failure and UV damage', urgency: 'High' },
      { icon: '🛁', title: 'Re-caulk all bathroom and kitchen fixtures — heat cycles crack grout', urgency: 'High' },
      { icon: '❄️', title: 'HVAC systems 10+ years old: August stress test before fall', urgency: 'Critical' },
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
          <div style={{ fontSize: 48 }}>🌵</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW August Home Maintenance</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Drought Peak · Foundation Critical · Book Fall HVAC Now</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', marginBottom: 12, fontWeight: 600 }}>How old is your home?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ key: 'new', label: '🆕 Under 10 Years' }, { key: 'mid', label: '🏡 10-25 Years' }, { key: 'old', label: '🏛️ 25+ Years' }].map(opt => (
              <button key={opt.key} onClick={() => setHomeAge(opt.key)} style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', borderColor: homeAge === opt.key ? '#F5E642' : '#1E3A5F', backgroundColor: homeAge === opt.key ? '#1a2f4e' : '#0D1F3C', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {homeAge && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your August Action Items</h2>
            {tasks[homeAge].map((task, i) => (
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
          <p style={{ color: '#94A3B8', margin: '0 0 12px' }}>Connect with a vetted DFW contractor before fall rush.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}