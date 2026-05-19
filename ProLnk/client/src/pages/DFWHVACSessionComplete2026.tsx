import { useState } from 'react';

const roles = [
  {
    label: 'DFW Homeowner',
    icon: '🏠',
    message: 'You came here looking for help with your home. You leave with the most comprehensive DFW HVAC resource ever built — seasonal guides, contractor matching, emergency protocols, and a network that has your back. ProLnk is honored to serve your home.',
    next: 'Join the ProLnk waitlist at prolnk.io and be first when the full platform launches.',
  },
  {
    label: 'HVAC Professional',
    icon: '🔧',
    message: 'This library was built in part because of pros like you — the standards you set, the work you do, the DFW homeowners you serve every day. ProLnk will connect you with verified, high-quality leads and pay you fairly. We\’re building this for you.',
    next: 'Sign up as a Pro at prolnk.io and get priority access to the DFW lead network.',
  },
  {
    label: 'Network Builder',
    icon: '🌐',
    message: 'You see what ProLnk is building. You understand that a 5-stream income system + verified contractor network + 3,308 pages of HVAC knowledge is a defensible, scalable asset. Now is the time to get in — Charter tier is closing at 500.',
    next: 'Join at the Charter tier at prolnk.io and start building your network today.',
  },
  {
    label: 'Just a Visitor',
    icon: '👋',
    message: 'You stumbled into something extraordinary. 3,308 pages of DFW HVAC knowledge, a verified contractor network, a Network Income System, and a platform built entirely for DFW homeowners. The door is open. Come back whenever you\’re ready.',
    next: 'Bookmark prolnk.io. The DFW HVAC library will be here when you need it.',
  },
];

const stats = [
  { label: 'Pages Built', value: '3,308' },
  { label: 'DFW Topics Covered', value: '180+' },
  { label: 'AI Agents Running', value: '47' },
  { label: 'Database Tables', value: '130+' },
];

export default function DFWHVACSessionComplete2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  function choose(i: number) {
    setSelected(i);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 100);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 64 }}>🏆</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '16px 0 8px', lineHeight: 1.2 }}>
            Session Complete — 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            The most comprehensive DFW HVAC resource library ever created is now complete.
            This is what it looks like when AI, expertise, and genuine care for homeowners converge.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #F5E642', borderRadius: 12, padding: '20px 12px', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌟 What This Session Built</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>
            Starting from a single idea — that DFW homeowners deserve better HVAC knowledge — this session
            produced 3,308 pages covering every aspect of home HVAC management in the Dallas-Fort Worth metroplex.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Seasonal guides for brutal Texas summers. Emergency protocols for winter cold snaps.
            Contractor vetting frameworks. Energy efficiency strategies. The complete ProLnk matching system.
            And the Network Income System that will make sharing this knowledge financially rewarding.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, textAlign: 'center', marginBottom: 8 }}>
          Who Are You in This Story?
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
          Select your role and receive your final session completion message.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {roles.map((r, i) => (
            <button
              key={i}
              onClick={() => choose(i)}
              style={{
                background: selected === i ? '#F5E642' : '#1e3a5f',
                color: selected === i ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 12, padding: '20px 16px',
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{r.icon}</span>
              {r.label}
            </button>
          ))}
        </div>

        {revealed && selected !== null && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 16, padding: 28, marginBottom: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: 'center' }}>{roles[selected].icon}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>
              {roles[selected].message}
            </p>
            <div style={{ background: 'rgba(10,22,40,0.15)', borderRadius: 8, padding: '12px 16px', fontWeight: 700, fontSize: 15 }}>
              ➡️ {roles[selected].next}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#0f1f3d', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🙏</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>
            Thank you for being part of this session.
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 15 }}>
            ProLnk • DFW HVAC Session Complete • May 2026 • prolnk.io
          </p>
        </div>
      </div>
    </div>
  );
}
