import { useState } from 'react';

const situations = [
  { id: 'new-home', label: '🏠 New Home Purchase', age: 'any' },
  { id: 'system-5-10', label: '⚙️ System 5–10 Years Old', age: '5-10' },
  { id: 'system-10-15', label: '🔧 System 10–15 Years Old', age: '10-15' },
  { id: 'system-15plus', label: '⚠️ System 15+ Years Old', age: '15+' },
];

const guides: Record<string, { title: string; steps: string[]; callProLnk: string; urgency: string }> = {
  'new-home': {
    title: '🏠 New Home — Know What You Have',
    urgency: '🟡 Within 30 Days',
    steps: [
      '📋 Locate the HVAC equipment tag — note brand, model, and install date',
      '🔍 Inspect air filter — replace if dirty (1-inch filters every 30–60 days)',
      '📐 Check that all vents are open and unobstructed throughout the home',
      '🌡️ Set thermostat to AUTO mode — test both heat and cool cycles',
      '📞 Schedule a ProLnk HVAC inspection to baseline your system health',
      '🗃️ Log all findings in your Home Health Vault for future reference',
    ],
    callProLnk: 'Schedule a baseline HVAC inspection within your first 30 days.',
  },
  'system-5-10': {
    title: '⚙️ 5–10 Year System — Optimize & Maintain',
    urgency: '🟢 Annual Priority',
    steps: [
      '🔄 Replace air filter every 60–90 days (2-inch media filters preferred)',
      '🧹 Schedule annual coil cleaning — DFW dust loads are severe',
      '🌬️ Check refrigerant charge — capacity drops silently over time',
      '🔊 Listen for unusual sounds: banging, squealing, or rattling',
      '💧 Inspect condensate drain — DFW humidity causes frequent clogs',
      '📊 Get a ProLnk efficiency tune-up to maximize summer performance',
    ],
    callProLnk: 'Book an annual tune-up now before DFW peak cooling season.',
  },
  'system-10-15': {
    title: '🔧 10–15 Year System — Plan Ahead',
    urgency: '🟠 Act This Season',
    steps: [
      '🏷️ Get a written condition report from a Charter-certified HVAC pro',
      '💰 Compare repair cost vs. replacement — use the 50% rule as a guide',
      '⚡ Audit your system\’s SEER rating — new 2026 units are 20–22 SEER',
      '🌡️ Note any rooms that don\’t cool/heat evenly — sign of declining capacity',
      '📋 Document all repairs made — this affects your Home Health Vault score',
      '🔮 Start budgeting for replacement: DFW installs avg $8,000–$14,000 in 2026',
    ],
    callProLnk: 'Get a written assessment now — before a breakdown forces a rushed decision.',
  },
  'system-15plus': {
    title: '⚠️ 15+ Year System — Replace Now',
    urgency: '🔴 Urgent Priority',
    steps: [
      '📞 Call ProLnk TODAY — a 15+ year DFW system is past statistical end-of-life',
      '🚫 Do not invest in major repairs — prioritize replacement budget',
      '📐 Request a Manual J load calculation for right-sized replacement',
      '💡 Ask about Oncor rebates ($400–$800) for qualifying high-efficiency units',
      '📅 Schedule install before June — July backlog in DFW can mean 2+ week waits',
      '🗃️ New system install logged in Home Health Vault adds value to your home',
    ],
    callProLnk: 'Match with a Charter HVAC pro now — 4-hour response guaranteed.',
  },
};

export default function DFWHVACNextStepGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Next Step Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your situation for a personalized action plan</p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#132039', color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === s.id ? '#F5E642' : '#1e3a5f'), borderRadius: 10,
                padding: '14px 18px', textAlign: 'left', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {s.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#132039', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>{guide.title}</h2>
              <span style={{ fontSize: 13, background: '#0A1628', padding: '4px 10px', borderRadius: 20 }}>{guide.urgency}</span>
            </div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: 1.5 }}>
                  {step}
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 18px', color: '#0A1628' }}>
              <strong>📞 When to Call ProLnk:</strong> {guide.callProLnk}
              <div style={{ marginTop: 10 }}>
                <a href="https://prolnk.io" style={{ background: '#0A1628', color: '#F5E642', padding: '8px 18px',
                  borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
                  → Get My Charter HVAC Match
                </a>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, color: '#475569', fontSize: 12 }}>
          ProLnk Charter Pros • DFW Metro • 4-Hour Match Guarantee • prolnk.io
        </div>
      </div>
    </div>
  );
}
