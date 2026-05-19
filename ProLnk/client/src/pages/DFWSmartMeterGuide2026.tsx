import { useState } from 'react';

const USE_CASES = [
  {
    use: '📊 Check my monthly usage history',
    steps: ['Open Oncor Energy app (iOS/Android) or SmartMeterTexas.com', 'Create account with your Oncor account number (on your bill)', 'Navigate to "My Energy" → "Usage History"', 'View 15-minute interval data for any day in the past 24 months'],
    insight: 'Compare your peak usage hours to TDU time-of-use rates. Running dishwasher/laundry after 9pm saves money.',
  },
  {
    use: '🚨 Detect an unusual usage spike',
    steps: ['Go to SmartMeterTexas.com → Compare Days', 'Find the day your bill jumped — view 15-min intervals', 'Look for usage spikes between midnight–5am (leak or equipment running)', 'HVAC spike in winter = stuck in emergency heat mode'],
    insight: 'A water heater failure often shows as 2–4 kWh spike in 15-min intervals. Slab leak can show similar pattern.',
  },
  {
    use: '❄️ Check if HVAC is inefficient',
    steps: ['Download 15-min data for a hot summer day (95°F+)', 'If HVAC is cycling fully on/off every 15 min = short cycling', 'Compare your kWh/sq ft to neighborhood average in Oncor app', 'SEER rating × hours = expected kWh; compare to actual usage'],
    insight: 'DFW homes: efficient single-story 2000sqft = 50–70 kWh/day on 100°F day. Over 90 kWh = investigate.',
  },
  {
    use: '💧 Detect a possible water leak (via usage)',
    steps: ['Turn off ALL water in home (no drips, no ice maker)', 'Check smart meter reading on Oncor app — no change should occur', 'If usage continues at constant small rate = slab or line leak', 'File leak credit with your REP (most honor 1x/yr)'],
    insight: 'Slab leaks in DFW are common due to clay soil movement. A 1/8″ slab leak = 17,000 gallons/month lost.',
  },
  {
    use: '⏰ Optimize time-of-use rates',
    steps: ['Ask your REP if they offer TOU plans (4cp season: June–Sept)', '4 Coincident Peak hours: typically 4–6pm weekdays in summer', 'Smart meter reports your usage during these peak periods', 'Pre-cool home to 72°F by 3:45pm, set to 78°F during 4–6pm'],
    insight: 'TOU plan savings in DFW: $40–120/month in summer for a 2,500 sqft home with proper load shifting.',
  },
];

export default function DFWSmartMeterGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? USE_CASES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK ENERGY GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>⚡ DFW Smart Meter<br />Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32 }}>Oncor smart meters are in 95% of DFW homes. They record usage every 15 minutes — enough data to detect HVAC inefficiency, water leaks, and optimize your electric bill.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[['95%', 'DFW smart meter penetration'], ['15 min', 'Data interval resolution'], ['24 mo', 'History available'], ['Free', 'SmartMeterTexas.com access'], ['4cp', 'Peak periods (Jun–Sep)'], ['2024', 'Latest meter gen deployed']].map(([stat, label]) => (
            <div key={stat as string} style={{ background: '#0f2040', borderRadius: 8, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{stat}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 What do you want to do with your smart meter data?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {USE_CASES.map((u, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, background: '#0A1628', color: selected === i ? '#F5E642′ : '#e2e8f0', cursor: ’pointer', textAlign: 'left', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {u.use}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>{result.use}</h3>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              {result.steps.map((s, i) => (
                <li key={i} style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 6 }}>{s}</li>
              ))}
            </ol>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginTop: 16 }}>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💡 PRO INSIGHT</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{result.insight}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔐 Add to ProLnk Home Health Vault</div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>Download your annual usage history from SmartMeterTexas.com as CSV and upload to your ProLnk Home Health Vault. This data helps ProLnk match you with the right HVAC professionals and provides baseline data when diagnosing system issues.</p>
        </div>
      </div>
    </div>
  );
}