import { useState } from 'react';

export default function DFWHVACQualityScore2026() {
  const [tdlr, setTdlr] = useState(false);
  const [epa608, setEpa608] = useState(false);
  const [nate, setNate] = useState(false);
  const [mfgTraining, setMfgTraining] = useState(false);
  const [starReviews, setStarReviews] = useState(false);
  const [writtenEstimate, setWrittenEstimate] = useState(false);
  const [pullsPermit, setPullsPermit] = useState(false);
  const [localOffice, setLocalOffice] = useState(false);
  const [prolnkCharter, setProlnkCharter] = useState(false);

  const score = (tdlr ? 2 : 0) + (epa608 ? 1 : 0) + (nate ? 1 : 0) +
    (mfgTraining ? 1 : 0) + (starReviews ? 2 : 0) + (writtenEstimate ? 1 : 0) +
    (pullsPermit ? 1 : 0) + (localOffice ? 1 : 0);

  const finalScore = prolnkCharter ? Math.max(score, 8) : score;

  const rating = finalScore >= 9 ? { label: 'Elite', color: '#22c55e' }
    : finalScore >= 7 ? { label: 'Qualified', color: '#F5E642′ }
    : finalScore >= 5 ? { label: 'Acceptable', color: '#f97316′ }
    : { label: 'Avoid', color: '#ef4444′ };

  const checks = [
    { label: '🏛️ TDLR License (required by TX law)', value: tdlr, set: setTdlr, pts: 2 },
    { label: '🧪 EPA 608 Certification', value: epa608, set: setEpa608, pts: 1 },
    { label: '⭐ NATE Certification', value: nate, set: setNate, pts: 1 },
    { label: '🏭 Manufacturer Training Program', value: mfgTraining, set: setMfgTraining, pts: 1 },
    { label: '🌟 4.5+ Star Reviews (50+ verified)', value: starReviews, set: setStarReviews, pts: 2 },
    { label: '📄 Written Estimate Provided', value: writtenEstimate, set: setWrittenEstimate, pts: 1 },
    { label: '🔨 Pulls Permits for New Installs', value: pullsPermit, set: setPullsPermit, pts: 1 },
    { label: '🏠 Local DFW Office', value: localOffice, set: setLocalOffice, pts: 1 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            ❄️ DFW HVAC Quality Score Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Rate any DFW HVAC contractor on a 10-point scale</p>
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          {checks.map((c, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid #1e2d47', cursor: 'pointer' }}>
              <input type="checkbox" checked={c.value} onChange={e => c.set(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#F5E642′ }} />
              <span style={{ flex: 1, fontSize: '0.9rem' }}>{c.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem' }}>+{c.pts} pts</span>
            </label>
          ))}
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={prolnkCharter} onChange={e => setProlnkCharter(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#F5E642′ }} />
            <span style={{ fontSize: '0.9rem' }}>🏆 ProLnk Charter Member (auto 8+ floor)</span>
          </label>
        </div>

        <div style={{ background: '#111e36', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 800, color: rating.color }}>{finalScore}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>out of 10</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: rating.color }}>{rating.label}</div>
          {prolnkCharter && score < 8 && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#F5E642′ }}>
              ⬆️ Score elevated to 8 by ProLnk Charter membership
            </div>
          )}
        </div>
      </div>
    </div>
  );
}