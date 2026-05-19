import { useState } from 'react';

const concerns = [
  { label: 'My home feels muggy in summer', key: 'summer_humid' },
  { label: 'My home feels too dry in winter', key: 'winter_dry' },
  { label: 'Getting mold or condensation on windows', key: 'mold' },
  { label: 'Allergies and indoor air quality', key: 'allergies' },
  { label: 'Want to monitor and control humidity year-round', key: 'monitor' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  summer_humid: {
    title: '💦 DFW Summer Humidity Solution Plan',
    steps: [
      '📊 Target: Keep indoor humidity 45–55% (DFW summer averages 65–80%)',
      '🔄 Replace AC filter monthly — dirty filter reduces dehumidification',
      '❄️ Ensure AC is sized correctly — oversized units don\’t dehumidify',
      '💧 Consider whole-home dehumidifier ($1,500–$3,000 installed)',
      '🪟 Run bathroom/kitchen exhaust fans during and 20min after use',
      '📞 If AC isn\’t dehumidifying: ProLnk tech can check coil and refrigerant',
    ],
  },
  winter_dry: {
    title: '🌵 DFW Winter Dryness Solution Plan',
    steps: [
      '📊 DFW winter humidity: 15–25% — below 30% causes health issues',
      '💨 Consider whole-home humidifier ($400–$900 + install)',
      '🪴 Add 10–15 houseplants — modest natural humidification',
      '🚿 Leave bathroom door open after showers to distribute moisture',
      '💧 Portable humidifiers: bedroom use — clean weekly to prevent mold',
      '🌡️ Keep heat at 68–72°F — higher temps dry the air faster',
    ],
  },
  mold: {
    title: '🍄 DFW Mold & Condensation Fix Plan',
    steps: [
      '🌡️ Condensation on windows = indoor humidity above 50% in winter',
      '💧 Check AC drain line — clogged drain causes interior moisture',
      '🔍 Inspect attic — DFW homes often develop attic moisture issues',
      '🪟 Add window insulation film to reduce cold surface condensation',
      '🚨 Visible mold: call a remediation pro before HVAC work',
      '📞 ProLnk connects you to vetted DFW HVAC + remediation pros',
    ],
  },
  allergies: {
    title: '🌿 DFW Indoor Air Quality Plan',
    steps: [
      '🌸 DFW pollen season: Feb–Nov (nearly year-round) — MERV 11+ filter',
      '💨 Consider HEPA air purifier for bedrooms ($200–$600)',
      '💧 Keep humidity 45–55% — dust mites thrive above 60%',
      '🔄 Change HVAC filter every 3–4 weeks May–Sep',
      '🌿 UV light in air handler kills mold and bacteria in ductwork',
      '📞 ProLnk pros can install whole-home air purification systems',
    ],
  },
  monitor: {
    title: '📊 DFW Year-Round Humidity Control Plan',
    steps: [
      '🌡️ Buy a $20–$40 hygrometer — monitor real-time indoor humidity',
      '☀️ Summer target: 45–55% — if above: dehumidifier or AC check',
      '❄️ Winter target: 35–45% — if below: humidifier or sealing leaks',
      '📱 Smart thermostat with humidity control (Ecobee, Nest) = easiest',
      '🔧 Annual HVAC tune-up addresses coil cleaning (key for DFW humidity)',
      '📞 ProLnk can assess your full system and recommend solutions',
    ],
  },
};

export default function DFWHVACHumidityControlSummary() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>💧 DFW Humidity Control Summary</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Managing DFW's extreme humidity swings — 60–80% summer humidity, 15–20% winter dryness, and everything in between.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '☀️', title: 'DFW Summer', body: 'Avg outdoor humidity 65–80%. Indoor target: 45–55%. AC is primary dehumidifier.' },
            { icon: '❄️', title: 'DFW Winter', body: 'Avg outdoor humidity 15–25%. Dry air cracks wood, skin, and causes static.' },
            { icon: '💧', title: 'Dehumidifiers', body: 'Whole-home: $1,500–$3,000. Portable: $200–$500. Essential for DFW summers.' },
            { icon: '💨', title: 'Humidifiers', body: 'Whole-home: $400–$900 installed. Auto-adjusts to outdoor temps in winter.' },
            { icon: '🍄', title: 'Mold Risk', body: 'Above 60% sustained humidity: mold grows within 24–48 hrs. Monitor closely.' },
            { icon: '🌿', title: 'Health Impact', body: 'Below 30%: dry airways, static. Above 60%: dust mites, mold, allergens spike.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your Humidity Concern</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your concern to get your DFW humidity control plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {concerns.map(s => (
              <button
                key={s.key}
                onClick={() => setSelected(s.key)}
                style={{
                  background: selected === s.key ? '#F5E642′ : '#1A2F4E',
                  color: selected === s.key ? '#0A1628′ : '#fff',
                  border: 'none', borderRadius: 10, padding: '13px 18px',
                  textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{plans[selected].title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plans[selected].steps.map((step, i) => (
                  <div key={i} style={{ background: '#0F2040', borderRadius: 8, padding: '12px 16px', fontSize: 14 }}>{step}</div>
                ))}
              </div>
              <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 10, padding: '14px 20px', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
                📞 Find a vetted DFW HVAC pro via ProLnk — free, no spam
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
