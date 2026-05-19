import { useState } from 'react';

const IMPROVEMENTS = [
  {
    type: 'Fence or Gate',
    icon: '🚧',
    check: 'Utility easements (typically 7.5–15 ft from property line) prohibit permanent structures. Check your plat and title commitment before any fence along back or side yard.',
    verify: ['Title commitment Schedule B — lists all recorded easements', 'Subdivision plat (shows easement locations)', 'Call 811 before digging for utility locate', 'HOA approval if in restricted community'],
    risk: 'Medium — utility companies can remove fence in easement at your expense with no compensation.'
  },
  {
    type: 'Shed or Structure',
    icon: '🏗️',
    check: 'Permanent structures (including sheds on piers or slabs) cannot be in utility or drainage easements. Even "portable" metal buildings may be prohibited. Drainage easements are especially strict.',
    verify: ['Survey showing easement boundaries', 'City permit application — city will flag easement conflicts', 'Drainage easement map (from city engineering dept)', 'Title commitment for access easements'],
    risk: 'High — city or utility can require full removal at owner expense. No permit will be issued in an easement.'
  },
  {
    type: 'Driveway Extension',
    icon: '🚗',
    check: 'Paved driveways typically allowed in utility easements if not obstructing access. Access easements for neighbors require full clearance. Check for shared driveway easements in older DFW neighborhoods.',
    verify: ['Plat for recorded access easements', 'Title commitment for shared access language', 'City ROW permit if extending to street', 'HOA approval for front-of-lot changes'],
    risk: 'Low-Medium — utility company may saw-cut and patch at your expense for maintenance access.'
  },
  {
    type: 'Pool or Landscaping',
    icon: '🏊',
    check: 'In-ground pools cannot be in utility or drainage easements. Trees and large landscaping in drainage easements may require removal if they impede water flow. Raised beds and ground cover are typically allowed.',
    verify: ['Survey for drainage and utility easement locations', 'City permit — engineering review will flag drainage easements', 'HOA landscape committee approval', 'Flood zone determination (FEMA FIRM maps)'],
    risk: 'High for pools — permit will be denied. Medium for trees — city may require removal if drainage is impacted.'
  }
];

export default function DFWEasementGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected !== null ? IMPROVEMENTS[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D1F3C 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Easement Guide for DFW</h1>
          <p style={{ fontSize: 15, color: '#9AA5B8', margin: 0, lineHeight: 1.6 }}>Utility, drainage, and access easements affect what you can build. Check before you break ground.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 0′ }}>
        <div style={{ background: '#1A2F4E', border: '1px solid #2A4A6E', borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <p style={{ fontSize: 14, color: '#CBD5E0', margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: '#F5E642′ }}>📌 DFW Typical Easements:</strong> Utility easements run 7.5–15 ft along side/rear property lines. Drainage easements follow natural water flow paths. Both prohibit permanent structures. Find yours in your title commitment (Schedule B) and subdivision plat.
          </p>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>What are you planning to build?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {IMPROVEMENTS.map((imp, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#F5E642′ : '#112040', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{imp.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: selected === i ? '#0A1628′ : '#E8EAF0' }}>{imp.type}</div>
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#112040', border: '1px solid #1E3A5F', borderRadius: 14, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>{item.icon} {item.type} — Easement Check</h2>
            <p style={{ fontSize: 14, color: '#CBD5E0', lineHeight: 1.7, marginBottom: 20, background: '#0A1628', padding: 16, borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>{item.check}</p>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', letterSpacing: 1, marginBottom: 12 }}>WHAT TO VERIFY BEFORE BUILDING</h3>
            <ul style={{ paddingLeft: 20, margin: '0 0 20px' }}>
              {item.verify.map((v, i) => <li key={i} style={{ fontSize: 14, color: '#CBD5E0', marginBottom: 8, lineHeight: 1.5 }}>{v}</li>)}
            </ul>
            <div style={{ background: '#1A2F4E', border: '1px solid #2A4A6E', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>⚠️ RISK LEVEL</div>
              <p style={{ fontSize: 13, color: '#CBD5E0', margin: 0 }}>{item.risk}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
