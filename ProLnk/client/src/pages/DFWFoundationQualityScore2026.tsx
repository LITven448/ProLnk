import { useState } from 'react';

export default function DFWFoundationQualityScore2026() {
  const [engineerOversight, setEngineerOversight] = useState(false);
  const [licensedSub, setLicensedSub] = useState(false);
  const [transferableWarranty, setTransferableWarranty] = useState(false);
  const [writtenScope, setWrittenScope] = useState(false);
  const [dfwReferences, setDfwReferences] = useState(false);
  const [noAOB, setNoAOB] = useState(false);
  const [soilReport, setSoilReport] = useState(false);

  const score = (engineerOversight ? 3 : 0) + (licensedSub ? 1 : 0) +
    (transferableWarranty ? 2 : 0) + (writtenScope ? 1 : 0) +
    (dfwReferences ? 1 : 0) + (noAOB ? 1 : 0) + (soilReport ? 1 : 0);

  const rating = score >= 8 ? { label: 'Elite', color: '#22c55e' }
    : score >= 6 ? { label: 'Qualified', color: '#F5E642' }
    : score >= 4 ? { label: 'Marginal', color: '#f97316' }
    : { label: 'Avoid', color: '#ef4444' };

  const checks = [
    { label: '👷 Licensed Engineer Oversight on Major Work', value: engineerOversight, set: setEngineerOversight, pts: 3 },
    { label: '📋 Licensed Subcontractors Where Required', value: licensedSub, set: setLicensedSub, pts: 1 },
    { label: '🔄 Warranty Transferable to New Buyer', value: transferableWarranty, set: setTransferableWarranty, pts: 2 },
    { label: '📄 Written Scope of Work Provided', value: writtenScope, set: setWrittenScope, pts: 1 },
    { label: '🏘️ Verifiable DFW References (3+)', value: dfwReferences, set: setDfwReferences, pts: 1 },
    { label: '🚫 No AOB (Assignment of Benefits) Pressure', value: noAOB, set: setNoAOB, pts: 1 },
    { label: '🌍 Soil Report Referenced in Proposal', value: soilReport, set: setSoilReport, pts: 1 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🏗️ DFW Foundation Quality Score Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Rate any DFW foundation repair company out of 10</p>
        </div>

        <div style={{ background: '#111e36', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          {checks.map((c, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < checks.length - 1 ? '1px solid #1e2d47' : 'none', cursor: 'pointer' }}>
              <input type="checkbox" checked={c.value} onChange={e => c.set(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#F5E642' }} />
              <span style={{ flex: 1, fontSize: '0.9rem' }}>{c.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem' }}>+{c.pts} pts</span>
            </label>
          ))}
        </div>

        <div style={{ background: '#111e36', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 800, color: rating.color }}>{score}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>out of 10</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: rating.color }}>{rating.label}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '1rem' }}>
            DFW soil is expansive clay — engineer oversight is the #1 quality signal for foundation work.
          </p>
        </div>
      </div>
    </div>
  );
}