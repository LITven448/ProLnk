import { useState } from 'react';

const urgencyLevels = [
  { id: 'active-leak', label: '🚨 Active Leak — Water Coming In Now' },
  { id: 'post-hail', label: '⛈️ Post-Hail — Storm Just Passed' },
  { id: 'insurance', label: '📋 Insurance Claim — Need Inspection Report' },
  { id: 'planning', label: '🔵 Planning — Preventive Inspection or Replacement' },
];

const processes: Record<string, { headline: string; steps: { icon: string; title: string; detail: string }[]; eta: string }> = {
  'active-leak': {
    headline: '🚨 Active Roof Leak — Emergency Response',
    eta: 'HAAG-Certified Pro Match: Within 2 Hours',
    steps: [
      { icon: '1️⃣', title: 'Describe Your Concern', detail: 'Go to prolnk.io — describe where water is entering, what it looks like, and when it started' },
      { icon: '2️⃣', title: 'ProLnk Routes to HAAG-Certified Charter Roofer', detail: 'Active leak = emergency routing. We match to a Charter roofer with emergency response availability' },
      { icon: '3️⃣', title: 'Inspection Scheduled Within 48 Hours', detail: 'Charter pro confirms a same-day or next-day emergency inspection — active leaks are our top priority' },
      { icon: '4️⃣', title: 'Written Damage Report Provided', detail: 'You receive a written report with photos, damage scope, and repair vs. replacement recommendation' },
      { icon: '5️⃣', title: 'All Findings Documented in Vault', detail: 'Leak event, inspection report, and all repair work recorded in your Home Health Vault permanently' },
    ],
  },
  'post-hail': {
    headline: '⛈️ Post-Hail — 72-Hour Documentation Window',
    eta: 'HAAG-Certified Pro Match: Within 4 Hours',
    steps: [
      { icon: '1️⃣', title: 'Describe the Storm', detail: 'Go to prolnk.io — describe hail size (golf ball, dime, quarter), storm date, and zip code' },
      { icon: '2️⃣', title: 'ProLnk Routes to HAAG-Certified Charter Roofer', detail: 'Post-hail inspections require HAAG certification — ProLnk only routes certified pros for storm claims' },
      { icon: '3️⃣', title: 'Inspection Scheduled Within 48 Hours', detail: 'Charter pro inspects all planes, flashings, gutters, and AC condenser for documentation-grade evidence' },
      { icon: '4️⃣', title: 'Written Insurance-Grade Report Provided', detail: 'You receive a written report with measurements, photos, and storm correlation data for your insurer' },
      { icon: '5️⃣', title: 'Inspection Report Logged in Vault', detail: 'HAAG inspection report stored in Vault — the permanent timestamped record your claim depends on' },
    ],
  },
  insurance: {
    headline: '📋 Insurance Claim Support — Get the Report First',
    eta: 'HAAG-Certified Pro Match: Within 24 Hours',
    steps: [
      { icon: '1️⃣', title: 'Describe Your Claim', detail: 'Go to prolnk.io — share what happened, your insurance company, and your claim number if you have one' },
      { icon: '2️⃣', title: 'ProLnk Routes to HAAG-Certified Charter Roofer', detail: 'Insurance claims require HAAG documentation — we route specifically to pros who build claim-ready reports' },
      { icon: '3️⃣', title: 'Inspection Scheduled Before Adjuster Visit', detail: 'Always get a private inspection BEFORE your insurance adjuster arrives — it\’s your right under TX law' },
      { icon: '4️⃣', title: 'Written Insurance-Grade Report in Hand', detail: 'Report includes all damage itemized by location, storm data correlation, and estimated replacement cost' },
      { icon: '5️⃣', title: 'Report Documented in Vault', detail: 'Your claim report permanently stored in Vault — protects you if the claim is disputed or reopened' },
    ],
  },
  planning: {
    headline: '🔵 Preventive Inspection or Replacement Planning',
    eta: 'HAAG-Certified Pro Match: Within 72 Hours',
    steps: [
      { icon: '1️⃣', title: 'Describe Your Concern', detail: 'Go to prolnk.io — share roof age, last inspection date, and any concerns you\’ve noticed' },
      { icon: '2️⃣', title: 'ProLnk Routes to HAAG-Certified Charter Roofer', detail: 'Even preventive inspections are done by HAAG-certified pros — your baseline deserves accuracy' },
      { icon: '3️⃣', title: 'Inspection Scheduled at Your Convenience', detail: 'Choose from available windows — weekday or weekend. Spring slots fill fast in DFW — book early' },
      { icon: '4️⃣', title: 'Written Condition Report and Recommendations Provided', detail: 'Report includes remaining life estimate, Class 4 shingle upgrade options, and Oncor rebate eligibility' },
      { icon: '5️⃣', title: 'Baseline Logged in Vault', detail: 'Your roof condition baseline stored in Vault — builds documented home value and resale credibility' },
    ],
  },
};

export default function DFWRoofingBookNow2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const process = selected ? processes[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Book Roofing Inspection Now</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your urgency to see your exact ProLnk booking process</p>
        </div>

        <div style={{ background: '#132039', border: '1px solid #F5E64244', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#94a3b8′ }}>
          🏆 <strong style={{ color: '#F5E642′ }}>All ProLnk roofing matches</strong> are HAAG-certified Charter roofers — the gold standard for DFW hail and storm documentation.
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {urgencyLevels.map(u => (
            <button key={u.id} onClick={() => setSelected(u.id)}
              style={{ background: selected === u.id ? '#F5E642′ : '#132039', color: selected === u.id ? '#0A1628' : '#fff',
                border: '2px solid ' + (selected === u.id ? '#F5E642′ : '#1e3a5f'), borderRadius: 10,
                padding: '14px 18px', textAlign: 'left', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {u.label}
            </button>
          ))}
        </div>

        {process && (
          <div style={{ background: '#132039', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 8px' }}>{process.headline}</h2>
              <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                ⚡ {process.eta}
              </span>
            </div>
            <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
              {process.steps.map((step, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{step.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://prolnk.io" style={{ display: 'block', background: '#F5E642', color: '#0A1628', textAlign: 'center',
              padding: '16px', borderRadius: 10, textDecoration: 'none', fontSize: 16, fontWeight: 800 }}>
              → Book My Roofing Inspection at prolnk.io
            </a>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, color: '#475569', fontSize: 12 }}>
          ProLnk Charter Roofers • DFW Metro • HAAG-Certified • Written Reports on Every Job
        </div>
      </div>
    </div>
  );
}
