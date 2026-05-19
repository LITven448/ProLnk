import { useState } from 'react';

export default function DFWRoofingQualityScore2026B() {
  const [mfgCertLevel, setMfgCertLevel] = useState<'none'|'basic'|'preferred'|'elite'>('none');
  const [haagTraining, setHaagTraining] = useState(false);
  const [currentCOI, setCurrentCOI] = useState(false);
  const [localOffice, setLocalOffice] = useState(false);
  const [pullsPermit, setPullsPermit] = useState(false);
  const [writtenContract, setWrittenContract] = useState(false);

  const mfgPts = mfgCertLevel === 'elite' ? 3 : mfgCertLevel === 'preferred' ? 2 : mfgCertLevel === 'basic' ? 1 : 0;
  const score = mfgPts + (haagTraining ? 2 : 0) + (currentCOI ? 2 : 0) +
    (localOffice ? 1 : 0) + (pullsPermit ? 1 : 0) + (writtenContract ? 1 : 0);

  const rating = score >= 8 ? { label: 'Elite', color: '#22c55e' }
    : score >= 6 ? { label: 'Qualified', color: '#F5E642′ }
    : score >= 4 ? { label: 'Acceptable', color: '#f97316′ }
    : { label: 'Avoid', color: '#ef4444′ };

  const certOptions: { val: 'none'|'basic'|'preferred'|'elite', label: string, pts: number }[] = [
    { val: 'none', label: 'No Certification', pts: 0 },
    { val: 'basic', label: 'Basic Certified Partner', pts: 1 },
    { val: 'preferred', label: 'Preferred Contractor', pts: 2 },
    { val: 'elite', label: 'Elite/Master Status', pts: 3 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🏠 DFW Roofing Quality Score Guide 2026 (Part 2)
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Comprehensive contractor scoring — max 10 points</p>
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏭 Manufacturer Certification Level (up to 3 pts)</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {certOptions.map(opt => (
                <button key={opt.val} onClick={() => setMfgCertLevel(opt.val)}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                    background: mfgCertLevel === opt.val ? '#F5E642′ : '#1e2d47',
                    color: mfgCertLevel === opt.val ? '#0A1628′ : '#94a3b8' }}>
                  {opt.label} (+{opt.pts})
                </button>
              ))}
            </div>
          </div>

          {[
            { label: '🎓 HAAG Certified Inspector on Staff', value: haagTraining, set: setHaagTraining, pts: 2 },
            { label: '📑 Current Certificate of Insurance (COI)', value: currentCOI, set: setCurrentCOI, pts: 2 },
            { label: '🏠 Local DFW Office (not storm chaser)', value: localOffice, set: setLocalOffice, pts: 1 },
            { label: '🔨 Pulls Permits as Standard Practice', value: pullsPermit, set: setPullsPermit, pts: 1 },
            { label: '📝 Provides Written Contract Before Work', value: writtenContract, set: setWrittenContract, pts: 1 },
          ].map((c, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderTop: '1px solid #1e2d47', cursor: 'pointer' }}>
              <input type="checkbox" checked={c.value} onChange={e => c.set(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#F5E642′ }} />
              <span style={{ flex: 1, fontSize: '0.9rem' }}>{c.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem' }}>+{c.pts} pts</span>
            </label>
          ))}
        </div>

        <div style={{ background: '#111e36', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 800, color: rating.color }}>{score}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>out of 10</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: rating.color }}>{rating.label}</div>
        </div>
      </div>
    </div>
  );
}