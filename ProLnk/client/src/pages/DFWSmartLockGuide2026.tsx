import { useState } from 'react';

const locks = [
  { name: 'Schlage Encode', grade: 1, conn: 'Wi-Fi', price: 229, diy: true, score: 95, best: 'Overall security' },
  { name: 'Yale Assure SL', grade: 1, conn: 'Z-Wave', price: 199, diy: true, score: 91, best: 'Smart home hubs' },
  { name: 'August Wi-Fi Pro', grade: 2, conn: 'Wi-Fi', price: 249, diy: true, score: 83, best: 'Retrofit (keep key)' },
  { name: 'Kwikset Halo', grade: 2, conn: 'Wi-Fi', price: 179, diy: true, score: 79, best: 'Budget pick' },
];

const recs: Record<string, Record<string, string>> = {
  steel: { security: '🥇 Schlage Encode — Grade 1, Wi-Fi, keypad for contractors. Best DFW pick.', convenience: '🏆 August Wi-Fi Pro — keep your existing keys, add smart layer.', smart_home: '⚡ Yale Assure SL — Z-Wave pairs perfectly with SmartThings/Hubitat.' },
  wood: { security: '🔒 Schlage Encode + strike plate upgrade. Reinforce the frame first.', convenience: '🏠 Kwikset Halo — easier install on wood doors, solid Wi-Fi.', smart_home: '🔗 Yale Assure SL with Z-Wave hub for full automation.' },
  fiberglass: { security: '🛡️ Yale Assure SL — Grade 1 security, compatible with fiberglass pre-drills.', convenience: '📱 August Wi-Fi Pro — retrofit without rekeying the entire door.', smart_home: '🏡 Schlage Encode — built-in Wi-Fi, no hub needed.' },
};

export default function DFWSmartLockGuide2026() {
  const [doorType, setDoorType] = useState('');
  const [priority, setPriority] = useState('');

  const rec = doorType && priority ? recs[doorType]?.[priority] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔑🔐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Smart Lock Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Grade ratings, connectivity options, and DFW-specific install advice</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {locks.map(l => (
            <div key={l.name} style={{ backgroundColor: '#112240', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{l.name}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${l.price}</span>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>ANSI Grade {l.grade} · {l.conn} · {l.diy ? 'DIY friendly' : 'Pro install'}</div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 6, padding: '4px 8px', fontSize: 12, color: '#22c55e' }}>Best for: {l.best}</div>
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>Security Score</div>
                <div style={{ backgroundColor: '#1e3a5f', borderRadius: 4, height: 6 }}>
                  <div style={{ width: `${l.score}%`, backgroundColor: '#F5E642', height: 6, borderRadius: 4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📡 Connectivity Comparison</h2>
          {[
            { type: 'Wi-Fi', pro: 'No hub needed, works anywhere', con: 'Battery drain, router dependent' },
            { type: 'Z-Wave', pro: 'Most reliable, low power', con: 'Requires smart hub ($100+)' },
            { type: 'Bluetooth', pro: 'Fastest response, cheapest', con: 'Phone must be nearby' },
          ].map(c => (
            <div key={c.type} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.type}</div>
              <div style={{ fontSize: 12, color: '#22c55e' }}>✅ {c.pro}</div>
              <div style={{ fontSize: 12, color: '#ef4444' }}>❌ {c.con}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Find Your Smart Lock</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Door Type</label>
              <select value={doorType} onChange={e => setDoorType(e.target.value)} style={{ width: '100%', padding: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, fontSize: 13 }}>
                <option value="">Select…</option>
                <option value="steel">Steel Door</option>
                <option value="wood">Wood Door</option>
                <option value="fiberglass">Fiberglass Door</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, fontSize: 13 }}>
                <option value="">Select…</option>
                <option value="security">Maximum Security</option>
                <option value="convenience">Daily Convenience</option>
                <option value="smart_home">Smart Home Integration</option>
              </select>
            </div>
          </div>
          {rec && <div style={{ backgroundColor: '#0A1628', padding: 16, borderRadius: 8, fontSize: 14, borderLeft: '3px solid #F5E642' }}>{rec}</div>}
        </div>

        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>🔗 ProLnk licensed locksmiths handle Grade 1 smart lock installs across all DFW zip codes.</p>
        </div>
      </div>
    </div>
  );
}