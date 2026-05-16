import { useState } from 'react';

const statuses = [
  { id: 'dirty-filter', label: 'My filter looks dirty / I haven\'t changed it', action: 'Change it today. May is peak North Texas pollen season. A clogged filter forces your system to work harder in rising heat — efficiency drops 15–25% and failure risk spikes. 1-inch filters: change monthly. 4-inch: every 3–6 months.' },
  { id: 'drain-unclear', label: 'Not sure if my drain line is clear', action: 'Find the white PVC pipe near your air handler — that\'s your condensate drain. Pour 1 cup of white vinegar down the access port. Do this now before humidity season. A clogged drain will shut your system off automatically.' },
  { id: 'warm-rooms', label: 'Some rooms are warmer than others', action: 'Check your vents — are they all open? Check your filter (if dirty, it\'s throttling airflow). If vents and filter are fine, you likely have a duct leak or refrigerant issue. Call for a diagnostic before June.' },
  { id: 'strange-noise', label: 'My system is making strange noises', action: 'Don\'t ignore this. Squealing = belt or bearing. Banging = blower issue. Hissing = refrigerant leak. Clicking repeatedly = electrical. Any of these caught in May are $200–600 repairs. Ignored until July = $2,000–5,000 breakdowns.' },
  { id: 'high-bills', label: 'My electric bill spiked recently', action: 'Likely culprits: dirty coils, low refrigerant, failing capacitor, or a system that\'s too small for the load. A $100 tune-up catches all of these. Schedule now — techs book out 2–3 weeks by late May.' },
  { id: 'running-fine', label: 'Everything seems fine', action: 'Good. Now do three things: (1) Check and replace the filter. (2) Flush the drain line with vinegar. (3) Set your thermostat to 78°F when home, 85°F when away. These three steps prevent 80% of summer HVAC service calls.' },
];

export default function DFWHVACDFWNow() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = statuses.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          🔍 DFW HVAC · Right Now
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          What to Check on Your DFW HVAC Right Now
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          May in DFW means high pollen, rising humidity, and summer heat starting to build. Three things to check right now — before your system has to work hard.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '🌿', title: 'May = Peak Pollen = Dirty Filters', body: 'North Texas pollen peaks in May. If you haven\'t changed your filter in 30+ days, do it today. A clogged filter in rising heat is the #1 cause of preventable summer breakdowns.' },
            { icon: '💧', title: 'Humidity Season Starting — Check Drain Line', body: 'Your AC creates condensation. That water drains through a small PVC line. If it clogs, your system shuts down as a safety measure. Flush with vinegar now — takes 2 minutes.' },
            { icon: '🔊', title: 'Strange Noises = Don\'t Wait', body: 'Any new sounds — squealing, banging, hissing, clicking — are your system telling you something. May repair = $200–600. July emergency = $2,000+.' },
            { icon: '📊', title: 'Check Your Electric Bill', body: 'A spike in your bill before heavy AC use started usually means efficiency is dropping. Dirty coils, low refrigerant, or a failing capacitor are all detectable with a $100 tune-up.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: '32px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>
            Your Current HVAC Status → Immediate Action
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {statuses.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1a3050',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '14px 18px',
                  textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>IMMEDIATE ACTION</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{result.action}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk connects DFW homeowners with verified HVAC pros · prolnk.io
        </div>
      </div>
    </div>
  );
}
