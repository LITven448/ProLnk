import { useState } from 'react';

type RedFlag = { id: string; label: string; level: 'reject'|'major'|'caution'; description: string };

const FLAGS: RedFlag[] = [
  { id: 'door_to_door', label: '🚪 Door-to-Door Solicitation After Storm', level: 'major', description: 'Storm chasers prey on distressed homeowners. Always get multiple bids first.' },
  { id: 'no_warranty', label: '🚫 No Written Warranty Offered', level: 'reject', description: 'Foundation work without written warranty is unacceptable. Reject immediately.' },
  { id: 'no_engineer', label: '👷 No Engineer for Major Repair (>10 piers)', level: 'caution', description: 'Major work requires engineering analysis in DFW expansive clay soils.' },
  { id: 'same_day', label: '⏱️ Pressure for Same-Day Contract Signing', level: 'reject', description: 'Legitimate foundation companies welcome second opinions. Pressure = scam.' },
  { id: 'too_cheap', label: '💸 Price Significantly Below All Others', level: 'caution', description: 'Foundation repair is expensive. Suspiciously low bids often mean cutting corners.' },
  { id: 'no_license', label: '📋 Cannot Verify Any License/Registration', level: 'reject', description: 'TX requires registration for foundation work. Verify before any contract.' },
  { id: 'aob_pressure', label: '📜 Pressuring You to Sign AOB', level: 'major', description: 'Assigning insurance benefits to contractor removes your claim control. Avoid.' },
];

export default function DFWFoundationRedFlag2026() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const rejectCount = FLAGS.filter(f => f.level === 'reject' && selected.has(f.id)).length;
  const majorCount = FLAGS.filter(f => f.level === 'major' && selected.has(f.id)).length;
  const cautionCount = FLAGS.filter(f => f.level === 'caution' && selected.has(f.id)).length;

  const verdict = rejectCount > 0 ? { label: 'REJECT This Contractor', color: '#ef4444', icon: '🚫' }
    : majorCount > 0 ? { label: 'Major Red Flag — Avoid', color: '#f97316', icon: '🚨' }
    : cautionCount >= 2 ? { label: 'High Risk — Get More Bids', color: '#f97316', icon: '⚠️' }
    : cautionCount === 1 ? { label: 'Proceed With Caution', color: '#F5E642', icon: '🟡' }
    : { label: 'No Red Flags Detected', color: '#22c55e', icon: '✅' };

  const levelColor = (l: string) => l === 'reject' ? { bg: '#7f1d1d', text: '#fca5a5′ }
    : l === 'major' ? { bg: '#78350f', text: '#fdba74′ }
    : { bg: '#1e3a5f', text: '#93c5fd' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🚩 DFW Foundation Red Flag Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Check any red flags you encountered — get instant risk assessment</p>
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          {FLAGS.map((f, i) => {
            const lc = levelColor(f.level);
            return (
              <div key={f.id} style={{ borderBottom: i < FLAGS.length - 1 ? '1px solid #1e2d47′ : ’none', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)}
                    style={{ width: '18px', height: '18px', accentColor: '#ef4444', marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{f.label}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: lc.bg, color: lc.text }}>
                        {f.level.toUpperCase()}
                      </span>
                    </div>
                    {selected.has(f.id) && <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.35rem' }}>{f.description}</p>}
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#111e36', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{verdict.icon}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: verdict.color }}>{verdict.label}</div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem' }}>
            {rejectCount} reject • {majorCount} major • {cautionCount} caution flags found
          </p>
        </div>
      </div>
    </div>
  );
}