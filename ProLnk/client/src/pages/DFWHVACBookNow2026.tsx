import { useState } from 'react';

const urgencyLevels = [
  { id: 'emergency', label: '🚨 Emergency — No AC / No Heat', color: '#ef4444' },
  { id: 'urgent', label: '⚠️ Urgent — System Running Poorly', color: '#f97316' },
  { id: 'soon', label: '🟡 Soon — Want a Tune-Up or Inspection', color: '#eab308' },
  { id: 'planning', label: '🔵 Planning — Thinking About Replacement', color: '#3b82f6' },
];

const processes: Record<string, { headline: string; steps: { icon: string; title: string; detail: string }[]; eta: string }> = {
  emergency: {
    headline: '🚨 Emergency HVAC — We Move Fast',
    eta: 'Charter Pro Match: Within 2 Hours',
    steps: [
      { icon: '1️⃣', title: 'Go to prolnk.io', detail: 'Tap "Get a Pro Now" — takes 90 seconds to describe your emergency' },
      { icon: '2️⃣', title: 'Describe Your Emergency', detail: 'No AC, no heat, strange smell, or system won\'t start — we route by urgency' },
      { icon: '3️⃣', title: 'Charter Pro Match in 2 Hours', detail: 'ProLnk routes to the nearest available Charter HVAC pro with emergency availability' },
      { icon: '4️⃣', title: 'Confirm Your Appointment', detail: 'You\'ll receive SMS and email confirmation with your pro\'s name and ETA' },
      { icon: '5️⃣', title: 'Job Recorded in Vault', detail: 'All work, parts, and findings auto-logged in your Home Health Vault permanently' },
    ],
  },
  urgent: {
    headline: '⚠️ Urgent HVAC — Same-Day Response',
    eta: 'Charter Pro Match: Within 4 Hours',
    steps: [
      { icon: '1️⃣', title: 'Go to prolnk.io', detail: 'Describe your HVAC concern — high bills, weak airflow, or odd noises' },
      { icon: '2️⃣', title: 'Describe What You\'re Experiencing', detail: 'Include when it started, which rooms are affected, and system age if known' },
      { icon: '3️⃣', title: 'Charter Pro Match in 4 Hours', detail: 'Your info is routed to a Charter HVAC pro matched to your zip code and system type' },
      { icon: '4️⃣', title: 'Confirm Your Appointment', detail: 'Review pro profile, ratings, and confirm preferred time via the ProLnk dashboard' },
      { icon: '5️⃣', title: 'All Work Logged in Vault', detail: 'Diagnosis, parts replaced, and repair cost all saved to your Home Health Vault' },
    ],
  },
  soon: {
    headline: '🟡 Schedule a Tune-Up — Beat the Rush',
    eta: 'Charter Pro Match: Within 24 Hours',
    steps: [
      { icon: '1️⃣', title: 'Go to prolnk.io', detail: 'Select HVAC Tune-Up or Inspection from the service menu' },
      { icon: '2️⃣', title: 'Describe Your System', detail: 'Share system age, last service date, and any concerns — more detail = better match' },
      { icon: '3️⃣', title: 'Charter Pro Match by Tomorrow', detail: 'ProLnk matches you to a Charter HVAC pro available in your preferred window' },
      { icon: '4️⃣', title: 'Schedule Your Time', detail: 'Choose from pro\'s available slots — morning, afternoon, or weekend options' },
      { icon: '5️⃣', title: 'Tune-Up Findings in Your Vault', detail: 'Full tune-up checklist, photos, and recommendations saved permanently' },
    ],
  },
  planning: {
    headline: '🔵 Planning a Replacement — Start Smart',
    eta: 'Charter Pro Match: Within 48 Hours',
    steps: [
      { icon: '1️⃣', title: 'Go to prolnk.io', detail: 'Select HVAC Replacement Consultation — no pressure, just information' },
      { icon: '2️⃣', title: 'Describe Your Home', detail: 'Square footage, current system age, and budget range helps us match the right pro' },
      { icon: '3️⃣', title: 'Match with a Charter HVAC Pro', detail: 'ProLnk routes to a Charter pro who specializes in right-sized replacement design' },
      { icon: '4️⃣', title: 'Receive Written Proposal', detail: 'Get a written scope including equipment options, Oncor rebate eligibility, and timeline' },
      { icon: '5️⃣', title: 'New System Logged in Vault', detail: 'Installation recorded in Vault — adds documented value to your home for resale' },
    ],
  },
};

export default function DFWHVACBookNow2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const process = selected ? processes[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📅❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Book HVAC Service Now</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your urgency to see your exact ProLnk booking process</p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {urgencyLevels.map(u => (
            <button key={u.id} onClick={() => setSelected(u.id)}
              style={{ background: selected === u.id ? '#F5E642' : '#132039', color: selected === u.id ? '#0A1628' : '#fff',
                border: '2px solid ' + (selected === u.id ? '#F5E642' : '#1e3a5f'), borderRadius: 10,
                padding: '14px 18px', textAlign: 'left', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {u.label}
            </button>
          ))}
        </div>

        {process && (
          <div style={{ background: '#132039', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 6px' }}>{process.headline}</h2>
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
              → Book My HVAC Pro at prolnk.io
            </a>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, color: '#475569', fontSize: 12 }}>
          ProLnk Charter HVAC Pros • DFW Metro • All Work Logged in Home Health Vault
        </div>
      </div>
    </div>
  );
}
