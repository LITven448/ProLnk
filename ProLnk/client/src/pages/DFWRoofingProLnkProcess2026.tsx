import { useState } from 'react';

const needs = [
  { label: 'Storm damage — hail or wind', icon: '⛈️', steps: ['Submit request: date of storm, visible damage description', 'ProLnk AI cross-references NOAA storm data for your address', 'Routes to HAAG-certified Charter Roofers with claim experience', 'Pro performs damage inspection and documents with photos', 'Written damage report provided — suitable for insurance claim', 'Charter Pro assists with adjuster meeting if needed', 'All documentation stored in Home Health Vault'], note: 'DFW averages 9 hail events per year. HAAG certification means your pro can document damage to insurance industry standards — critical for full claim approval.' },
  { label: 'Inspection only — buying or selling', icon: '🏠', steps: ['Submit request: "Roof inspection — real estate transaction"', 'ProLnk routes to Charter Roofers with manufacturer certification', 'Full inspection: decking, flashing, ridge, gutters, penetrations', 'Written report with remaining life estimate and photo documentation', 'Suitable for buyer due diligence or seller disclosure', 'Vault entry created — transferable to new owner at closing'], note: 'A ProLnk inspection report carries weight in DFW real estate negotiations. Manufacturer-certified pros can also write warranty transfer documentation.' },
  { label: 'Repair — leak or localized damage', icon: '🔧', steps: ['Submit request: describe leak location and any visible damage', 'ProLnk routes to Charter Roofers available for same-week service', 'Pro identifies root cause — not just the symptom', 'Written repair scope provided before work begins', 'Repair completed with matching materials and proper flashing', 'Documented in Home Health Vault with before/after photos'], note: 'DFW leak repairs done wrong become full replacements within 2 years. Charter Pros address flashing, decking, and drainage — not just shingle patches.' },
  { label: 'Full replacement — age or condition', icon: '♻️', steps: ['Submit request: "Full roof replacement evaluation"', 'ProLnk routes to Charter Roofers with manufacturer credentialing', 'Pro performs full inspection and measures roof for accurate quote', 'You receive material options: standard arch, Class 4, or metal', 'Permit pulled, work scheduled, old material properly disposed', 'Manufacturer warranty registered in your name, stored in Vault'], note: 'Charter Roofers on ProLnk are credentialed by GAF, Owens Corning, or CertainTeed — the only way to get full system manufacturer warranties in DFW.' },
];

export default function DFWRoofingProLnkProcess2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK ROOFING PROCESS 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>How ProLnk Matches You to DFW Roofers</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>After every DFW storm, storm-chaser crews flood neighborhoods. ProLnk only works with HAAG-certified, manufacturer-credentialed local roofers. No out-of-state crews. No high-pressure tactics. Select your roofing need below.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {needs.map((n, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#111e33', border: `2px solid ${selected === i ? '#F5E642' : '#1e2d45'}`, borderRadius: 12, padding: '18px 22px', textAlign: 'left', cursor: 'pointer', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{n.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{n.label}</div>
                </div>
                <span style={{ color: '#F5E642', fontSize: 20 }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f' }}>
                  <ol style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
                    {n.steps.map((step, j) => <li key={j}>{step}</li>)}
                  </ol>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 13 }}>💡 {n.note}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e33', border: '1px solid #1e2d45', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ CHARTER ROOFER REQUIREMENTS</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Every Roofing Charter Pro on ProLnk is HAAG-certified for hail and wind damage assessment, holds manufacturer credentialing (GAF, Owens Corning, or CertainTeed), carries $1M liability insurance, and is a licensed Texas contractor. No storm chasers. No unlicensed subs. Work documented in your Home Health Vault permanently.
          </p>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔗 Submit your roofing request at prolnk.io</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>ProLnk — Charter Pro Network — DFW</div>
        </div>
      </div>
    </div>
  );
}