import { useState } from 'react';

const checks = [
  { id: 'hvac', label: '🌡️ HVAC Tune-Up', desc: 'Service AC before 95°F days hit', priority: 'Critical' },
  { id: 'irrigation', label: '💧 Irrigation System', desc: 'Set seasonal schedule, check for leaks', priority: 'High' },
  { id: 'roof', label: '🏠 Roof Inspection', desc: 'Check for lifted shingles after spring storms', priority: 'High' },
  { id: 'gutters', label: '🍂 Gutters Clear', desc: 'Remove debris before summer rains', priority: 'Medium' },
  { id: 'lighting', label: '💡 Outdoor Lighting', desc: 'Test all fixtures, swap to LED', priority: 'Low' },
  { id: 'attic', label: '🔥 Attic Ventilation', desc: 'Ensure 130°F+ attics dont spike bills', priority: 'High' },
];

export default function DFWSummerReadyMay2026() {
  const [done, setDone] = useState<string[]>([]);

  const toggle = (id: string) =>
    setDone(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const remaining = checks.filter(c => !done.includes(c.id));
  const critical = remaining.filter(c => c.priority === 'Critical' || c.priority === 'High');
  const pct = Math.round((done.length / checks.length) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE — MAY 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Summer Readiness Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW summers average 40+ days above 100°F. Get ahead of it now.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{pct}%</div>
          <div>
            <div style={{ fontWeight: 700 }}>Ready for Summer</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{done.length} of {checks.length} tasks complete</div>
          </div>
          <div style={{ flex: 1, background: '#1e3a5f', borderRadius: 99, height: 8, marginLeft: 8 }}>
            <div style={{ width: `${pct}%`, background: '#F5E642', height: 8, borderRadius: 99, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {checks.map(c => (
            <div key={c.id} onClick={() => toggle(c.id)} style={{ background: done.includes(c.id) ? '#0d2e1a' : '#0F2040', border: `1px solid ${done.includes(c.id) ? '#22c55e' : '#1e3a5f'}`, borderRadius: 10, padding: '0.9rem 1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s' }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done.includes(c.id) ? '#22c55e' : '#F5E642'}`, background: done.includes(c.id) ? '#22c55e' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {done.includes(c.id) && <span style={{ fontSize: 13 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{c.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: c.priority === 'Critical' ? '#7f1d1d' : c.priority === 'High' ? '#1e3a5f' : '#1a2e1a', color: c.priority === 'Critical' ? '#fca5a5′ : c.priority === ’High' ? '#93c5fd' : '#86efac' }}>{c.priority}</div>
            </div>
          ))}
        </div>

        {critical.length > 0 && (
          <div style={{ background: '#1a1a0a', border: '1px solid #F5E642', borderRadius: 12, padding: '1rem 1.5rem' }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚡ This Week's Priorities</div>
            {critical.map(c => <div key={c.id} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>→ {c.label}</div>)}
          </div>
        )}

        {done.length === checks.length && (
          <div style={{ background: '#0d2e1a', border: '1px solid #22c55e', borderRadius: 12, padding: '1rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>🎉</div>
            <div style={{ fontWeight: 800, color: '#22c55e' }}>Your home is summer-ready!</div>
          </div>
        )}
      </div>
    </div>
  );
}