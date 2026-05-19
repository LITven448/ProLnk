import { useState } from 'react';

type RedFlag = { id: string; label: string; level: 'reject'|'illegal'|'caution'; description: string };

const FLAGS: RedFlag[] = [
  { id: 'storm_chaser', label: '🌪️ Storm Chaser (Out-of-Town After Hail)', level: 'reject', description: 'No local office, no accountability after they collect. Immediate rejection.' },
  { id: 'aob_pressure', label: '📜 Pressures AOB Signing', level: 'illegal', description: 'AOB assignment is banned in TX for roofing. This is illegal — reject and report.' },
  { id: 'cash_only', label: '💵 Cash Only / No Written Contract', level: 'reject', description: 'No contract means no recourse for leaks or poor work. Never proceed.' },
  { id: 'no_mfg_cert', label: '🏭 No Manufacturer Cert for Warranty Work', level: 'reject', description: 'Manufacturer warranties require certified installers. Reject for warranty jobs.' },
  { id: 'full_upfront', label: '💳 Requires 100% Payment Before Work Starts', level: 'reject', description: 'Standard is 0-10% deposit. Full upfront means high flight risk. Reject.' },
  { id: 'waive_deductible', label: '💰 Offers to Waive Your Insurance Deductible', level: 'illegal', description: 'Waiving deductibles is insurance fraud in TX — illegal for both parties. Reject.' },
  { id: 'no_coi', label: '📑 Cannot Provide Current COI', level: 'reject', description: 'Uninsured roofers = your liability for worker injuries on your property.' },
  { id: 'no_haag', label: '🎓 No HAAG or Damage Certification for Hail Claims', level: 'caution', description: 'For insurance claims, HAAG-certified inspectors carry more weight with adjusters.' },
];

export default function DFWRoofingRedFlag2026() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const rejectCount = FLAGS.filter(f => f.level === 'reject' && selected.has(f.id)).length;
  const illegalCount = FLAGS.filter(f => f.level === 'illegal' && selected.has(f.id)).length;
  const cautionCount = FLAGS.filter(f => f.level === 'caution' && selected.has(f.id)).length;

  const verdict = illegalCount > 0 ? { label: 'ILLEGAL Activity — Reject & Report', color: '#dc2626', icon: '🚨' }
    : rejectCount > 0 ? { label: 'REJECT This Contractor', color: '#ef4444', icon: '🚫' }
    : cautionCount >= 1 ? { label: 'Proceed With Caution', color: '#F5E642', icon: '⚠️' }
    : { label: 'No Red Flags Detected', color: '#22c55e', icon: '✅' };

  const levelStyle = (l: string) => l === 'illegal' ? { bg: '#450a0a', text: '#f87171', badge: 'ILLEGAL (TX)' }
    : l === 'reject' ? { bg: '#7f1d1d', text: '#fca5a5', badge: 'REJECT' }
    : { bg: '#1e3a5f', text: '#93c5fd', badge: 'CAUTION' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🚩 DFW Roofing Red Flag Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Check any red flags encountered — includes TX-specific illegal practices</p>
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          {FLAGS.map((f, i) => {
            const ls = levelStyle(f.level);
            return (
              <div key={f.id} style={{ borderBottom: i < FLAGS.length - 1 ? '1px solid #1e2d47′ : ’none', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)}
                    style={{ width: '18px', height: '18px', accentColor: '#ef4444', marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{f.label}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap', background: ls.bg, color: ls.text }}>
                        {ls.badge}
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
            {illegalCount} illegal • {rejectCount} reject • {cautionCount} caution flags found
          </p>
        </div>
      </div>
    </div>
  );
}