import { useState } from 'react';

type RedFlag = { id: string; label: string; level: 'reject'|'caution'; description: string };

const FLAGS: RedFlag[] = [
  { id: 'no_tdlr', label: '🚫 No TDLR License', level: 'reject', description: 'Illegal to operate HVAC in TX without TDLR. Immediate rejection.' },
  { id: 'no_coi', label: '📑 Won’t Provide COI', level: 'reject', description: 'You will be liable for any damage or injury. Never hire without COI.' },
  { id: 'cash_only', label: '💵 Cash Only / No Invoice', level: 'reject', description: 'No paper trail means no accountability. Reject immediately.' },
  { id: 'no_permit', label: '🔨 Won’t Pull Permits', level: 'reject', description: 'Unpermitted installs may require expensive removal + redo. Reject.' },
  { id: 'phone_quote', label: '📞 Quote Over Phone Without Inspection', level: 'caution', description: 'HVAC sizing requires manual J calc. Phone quotes are guesses.' },
  { id: 'pressure_replace', label: '⚠️ Pressures Replacement Before Diagnosis', level: 'caution', description: 'Reputable techs diagnose first. Pressure to replace is a sales tactic.' },
  { id: 'no_written_estimate', label: '📝 No Written Estimate Offered', level: 'caution', description: 'Verbal quotes disappear. Always require written estimates.' },
];

export default function DFWHVACRedFlag2026() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const rejectCount = FLAGS.filter(f => f.level === 'reject' && selected.has(f.id)).length;
  const cautionCount = FLAGS.filter(f => f.level === 'caution' && selected.has(f.id)).length;

  const verdict = rejectCount > 0 ? { label: 'REJECT This Contractor', color: '#ef4444', icon: '🚫' }
    : cautionCount >= 2 ? { label: 'High Risk — Look Elsewhere', color: '#f97316', icon: '⚠️' }
    : cautionCount === 1 ? { label: 'Proceed With Caution', color: '#F5E642', icon: '🟡' }
    : { label: 'No Red Flags Detected', color: '#22c55e', icon: '✅' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🚩 DFW HVAC Red Flag Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Check any red flags you encountered — get instant risk assessment</p>
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          {FLAGS.map((f, i) => (
            <div key={f.id} style={{ borderBottom: i < FLAGS.length - 1 ? '1px solid #1e2d47′ : ’none', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)}
                  style={{ width: '18px', height: '18px', accentColor: '#ef4444', marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{f.label}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                      background: f.level === 'reject' ? '#7f1d1d' : '#78350f',
                      color: f.level === 'reject' ? '#fca5a5′ : '#fcd34d' }}>
                      {f.level.toUpperCase()}
                    </span>
                  </div>
                  {selected.has(f.id) && (
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.35rem' }}>{f.description}</p>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e36', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{verdict.icon}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: verdict.color }}>{verdict.label}</div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem' }}>
            {rejectCount} rejection-level • {cautionCount} caution-level flags found
          </p>
        </div>
      </div>
    </div>
  );
}