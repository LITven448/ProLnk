import { useState } from 'react';

const urgencyLevels = [
  { id: 'active', label: '🚨 Active Movement — Visible Settling or Large Cracks' },
  { id: 'worsening', label: '⚠️ Worsening Symptoms — Sticking Doors, Growing Cracks' },
  { id: 'monitoring', label: '🟡 Monitoring — Minor Symptoms, Want an Expert Look' },
  { id: 'preventive', label: '🔵 Preventive — No Symptoms, Want a Baseline' },
];

const processes: Record<string, { headline: string; steps: { icon: string; title: string; detail: string }[]; eta: string }> = {
  active: {
    headline: '🚨 Active Foundation Movement — Emergency Response',
    eta: 'Engineer-Supervised Match: Within 4 Hours',
    steps: [
      { icon: '1️⃣', title: 'Describe Your Symptoms', detail: 'Go to prolnk.io — describe cracks, settling, or structural changes in detail. Photos help.' },
      { icon: '2️⃣', title: 'ProLnk Routes to Engineer-Supervised Pro', detail: 'Active movement requires an engineer-supervised Charter foundation specialist — we route accordingly' },
      { icon: '3️⃣', title: 'Inspection Scheduled Same Day', detail: 'Your Charter pro confirms a same-day or next-morning inspection window with you directly' },
      { icon: '4️⃣', title: 'Written Structural Report Provided', detail: 'You receive a written report with severity classification, movement measurements, and repair options' },
      { icon: '5️⃣', title: 'All Findings Documented in Vault', detail: 'Report, photos, measurements, and contractor info saved permanently in your Home Health Vault' },
    ],
  },
  worsening: {
    headline: '⚠️ Worsening Symptoms — Respond Within 48 Hours',
    eta: 'Engineer-Supervised Match: Within 24 Hours',
    steps: [
      { icon: '1️⃣', title: 'Describe What You\’re Seeing', detail: 'Document sticking doors, new cracks, or floor changes at prolnk.io — describe when symptoms started' },
      { icon: '2️⃣', title: 'ProLnk Routes to Charter Foundation Pro', detail: 'Worsening symptoms trigger our engineer-supervised routing — not a general handyman match' },
      { icon: '3️⃣', title: 'Inspection Scheduled Within 48 Hours', detail: 'Your Charter pro books a 2-hour inspection window that works with your schedule' },
      { icon: '4️⃣', title: 'Written Report with Repair Scope', detail: 'Report includes severity rating, recommended repair method (pier type, drainage, etc.) and cost range' },
      { icon: '5️⃣', title: 'Vault Entry Starts Your Claim History', detail: 'Early documentation is critical — Vault entry timestamps your first reported symptom date' },
    ],
  },
  monitoring: {
    headline: '🟡 Monitoring Symptoms — Get Expert Eyes',
    eta: 'Charter Pro Match: Within 48 Hours',
    steps: [
      { icon: '1️⃣', title: 'Go to prolnk.io', detail: 'Select Foundation Assessment — describe the symptoms you\’ve noticed and how long they\’ve been present' },
      { icon: '2️⃣', title: 'ProLnk Routes to Charter Foundation Pro', detail: 'Even monitoring cases go to engineer-supervised pros — not general contractors' },
      { icon: '3️⃣', title: 'Inspection Scheduled at Your Convenience', detail: 'Choose from available windows — weekday or weekend inspections available in DFW metro' },
      { icon: '4️⃣', title: 'Written Report Provided', detail: 'Includes current measurement baseline — critical for future comparison if movement occurs' },
      { icon: '5️⃣', title: 'Baseline Logged in Vault', detail: 'Baseline measurements stored in Vault allow year-over-year comparison with future inspections' },
    ],
  },
  preventive: {
    headline: '🔵 Preventive Baseline — Smart DFW Homeownership',
    eta: 'Charter Pro Match: Within 72 Hours',
    steps: [
      { icon: '1️⃣', title: 'Go to prolnk.io', detail: 'Select Foundation Baseline Inspection — no symptoms required, this is proactive smart homeownership' },
      { icon: '2️⃣', title: 'Describe Your Home', detail: 'Share home age, soil type if known, and any past foundation work — more detail = better match' },
      { icon: '3️⃣', title: 'Charter Foundation Pro Assigned', detail: 'We match to an engineer-supervised pro in your DFW zip zone within 72 hours' },
      { icon: '4️⃣', title: 'Baseline Measurements Provided', detail: 'Written report with elevation measurements at all corners — the foundation of your home\’s health record' },
      { icon: '5️⃣', title: 'Vault Entry — Permanent Health Record Begins', detail: 'Your Home Health Vault foundation record is now started — every future inspection adds to this history' },
    ],
  },
};

export default function DFWFoundationBookNow2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const process = selected ? processes[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Book Foundation Assessment Now</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your urgency to see your exact ProLnk booking process</p>
        </div>

        <div style={{ background: '#132039', border: '1px solid #F5E64244', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#94a3b8′ }}>
          🏛️ <strong style={{ color: '#F5E642′ }}>All ProLnk foundation matches</strong> are engineer-supervised Charter pros — not general handymen. Written reports provided on every job.
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
              → Book My Foundation Assessment at prolnk.io
            </a>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, color: '#475569', fontSize: 12 }}>
          ProLnk Charter Foundation Pros • DFW Metro • Engineer-Supervised • Written Reports Guaranteed
        </div>
      </div>
    </div>
  );
}
