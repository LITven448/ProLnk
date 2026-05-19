import { useState } from 'react';

const SOURCES = [
  {
    id: 'neighbor',
    label: '🏘️ Neighbor Referral',
    checklist: [
      'Confirm the neighbor used them within the last 24 months — roofing quality degrades over time with high-turnover crews',
      'Ask if they had any post-install issues (leaks, callbacks, missing flashing)',
      'Verify the contractor is still in business — DFW storm chasers often close after storm season',
      'Request the contractor name and check TDLR license at tdlr.texas.gov',
      'Confirm they carry general liability + workers comp in Texas',
    ],
  },
  {
    id: 'insurance',
    label: '📋 Insurance Agent Recommendation',
    checklist: [
      'Insurance agents often refer preferred contractors — ask if there is a financial relationship',
      'Preferred does not mean best — verify independently',
      'Check Google reviews and BBB rating',
      'Confirm they specialize in insurance claim work (supplement writing experience)',
      'Get at least one competing estimate before committing',
    ],
  },
  {
    id: 'manufacturer',
    label: '🏭 Manufacturer "Find a Contractor"',
    checklist: [
      'GAF, Owens Corning, and CertainTeed all have certified installer portals',
      'Certification means training and install standards — not a guarantee of service quality',
      'Verify their certification is current on the manufacturer website directly',
      'Confirm they stock your specific product line locally',
      'Ask how many roofs they have installed under that certification in DFW',
    ],
  },
  {
    id: 'prolnk',
    label: '⭐ ProLnk Verified Charter Roofer',
    checklist: [
      'All ProLnk Charter roofers are TDLR-verified before activation',
      'Insurance certificates (GL + WC) are confirmed and updated annually',
      'Reviews from other ProLnk homeowners are verified as real transactions',
      'Charter roofers are trained in DFW storm claim supplement writing',
      'ProLnk Vault stores your project documentation automatically',
    ],
  },
];

export default function DFWRoofingContractorReferral2026() {
  const [selected, setSelected] = useState('prolnk');

  const current = SOURCES.find(s => s.id === selected) || SOURCES[3];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>🔍 DFW Roofing Contractor Referral and Verification</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>How to find and verify a reliable DFW roofer — regardless of where the referral comes from.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚠️ DFW Roofing Market Reality</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>DFW attracts hundreds of out-of-state storm chasers after major hail events</li>
            <li>Many operate 1–2 seasons then dissolve — no warranty support</li>
            <li>Texas requires roofing contractors to register with TDLR (License required)</li>
            <li>Verify at <strong style={{ color: '#F5E642′ }}>tdlr.texas.gov</strong> — takes 60 seconds</li>
            <li>Never sign an Assignment of Benefits (AOB) without reading carefully</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📋 Verification Checklist by Referral Source</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {SOURCES.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', background: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#cbd5e1', fontWeight: selected === s.id ? 700 : 400, cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
            <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
              {current.checklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>✅ Universal Verification Steps</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>TDLR license lookup: tdlr.texas.gov (required for TX roofing contractors)</li>
            <li>Request Certificate of Insurance — verify directly with their insurance carrier</li>
            <li>Check Google Reviews — look for responses to negative reviews</li>
            <li>Confirm physical local address — not just a PO box</li>
            <li>Get written scope and price before any work begins</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1e3a5f' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>ProLnk © 2026 · DFW Home Services Platform</span>
        </div>
      </div>
    </div>
  );
}
