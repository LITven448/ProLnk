import { useState } from 'react';

const processes = {
  Pressed: [
    { day: 'Day 1 AM', icon: '🚛', title: 'Mobilization', desc: 'Crew arrives, marks pier locations every 6-8 ft along affected wall.' },
    { day: 'Day 1 PM', icon: '⛏️', title: 'Digging', desc: 'Hand-dig or hydraulic excavation at each pier point, 2-3 ft wide.' },
    { day: 'Day 2', icon: '🔩', title: 'Pier Installation', desc: 'Each steel pier driven to refusal (load-bearing strata). 15-30 min per pier.' },
    { day: 'Day 2 PM', icon: '💪', title: 'Hydraulic Lift', desc: 'Simultaneous hydraulic jacks raise foundation. Crew monitors for level.' },
    { day: 'Day 3', icon: '⏳', title: 'Settling Period', desc: '24-48 hour wait. Normal to hear pops and cracks inside as home adjusts.' },
    { day: 'Day 4', icon: '📷', title: 'Final Inspection', desc: 'Cosmetic damage assessment, documentation photos, backfill piers.' },
  ],
  Tunneled: [
    { day: 'Day 1', icon: '🚛', title: 'Mobilization', desc: 'Crew arrives. Tunneling approach avoids lifting flooring.' },
    { day: 'Day 2-3', icon: '🕳️', title: 'Tunnel Digging', desc: 'Workers dig horizontally under slab from outside. Slower but less interior damage.' },
    { day: 'Day 4', icon: '🔩', title: 'Pier Placement', desc: 'Bell-bottom piers poured under slab in tunnel. Concrete cure time required.' },
    { day: 'Day 6', icon: '💪', title: 'Hydraulic Lift', desc: 'Raise after concrete cure. More precise control than pressed pier method.' },
    { day: 'Day 7', icon: '⏳', title: 'Settling Period', desc: '48 hours minimum. DFW clay soil needs time to stabilize around new piers.' },
    { day: 'Day 8', icon: '📷', title: 'Final Documentation', desc: 'Photos, engineer sign-off, backfill tunnels. Add to ProLnk Vault.' },
  ],
};

export default function DFWFoundationRepairProcess2026() {
  const [type, setType] = useState<'Pressed' | 'Tunneled'>('Pressed');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            DFW Foundation Repair Process 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Day-by-day walkthrough of what to expect during your DFW foundation repair</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {(['Pressed', 'Tunneled'] as const).map(t => (
            <button key={t} onClick={() => setType(t)}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: type === t ? '#F5E642′ : '#1e2d45', color: type === t ? '#0A1628' : '#94a3b8' }}>
              {t} Piers
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {processes[type].map((step, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{step.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{step.day}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{step.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: '#1e2d45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 24 }}>⚠️</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>DFW Clay Soil Warning</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>
            DFW expansive clay causes 80% of TX foundation issues. Proper drainage and watering schedule prevents recurrence.
          </div>
          <div style={{ marginTop: 12, color: '#64748b', fontSize: 12 }}>Save repair documentation in your ProLnk Home Vault — required for resale disclosure.</div>
        </div>
      </div>
    </div>
  );
}
