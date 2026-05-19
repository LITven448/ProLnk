import { useState } from 'react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const systemSituations = [
  'Running great — just doing a check',
  'Unit is older (10+ years)',
  'Bills seem higher than usual',
  'Heard a strange noise recently',
  'Not cooling / heating as well as before',
];

type SeasonKey = 'winter' | 'spring' | 'summer' | 'fall';

const getSeason = (month: string): SeasonKey => {
  const idx = months.indexOf(month);
  if (idx <= 1 || idx === 11) return 'winter';
  if (idx <= 4) return 'spring';
  if (idx <= 8) return 'summer';
  return 'fall';
};

const seasonData: Record<SeasonKey, { emoji: string; label: string; color: string; morningCheck: string[]; comingUp: string[] }> = {
  winter: {
    emoji: '❄️', label: 'DFW Winter', color: '#60A5FA',
    morningCheck: [
      '🌡 Glance at thermostat — is it maintaining setpoint or struggling?',
      '👂 Listen for furnace cycling — should hear ignitor, then burner ignition',
      '💨 Feel supply vents — warm air should be 90–110°F in DFW winter',
      '🔋 Check thermostat display — dim screen means low batteries',
      '🌬 Note wind chill — heat pump efficiency drops below 35°F; aux heat may kick in',
    ],
    comingUp: [
      '📅 February: DFW ice event risk peaks — know your emergency heat settings',
      '📅 March: Start booking spring AC tune-up (fills fast)',
      '💡 Budget tip: Pre-cool strategies save money starting in April',
    ],
  },
  spring: {
    emoji: '🌸', label: 'DFW Spring', color: '#4ADE80',
    morningCheck: [
      '🌡 Check overnight low — DFW swings 40°F to 85°F in spring; your system runs both modes',
      '🌀 Listen for AC startup — compressor should click on smoothly as temp rises',
      '💧 Check condensate drain area — spring pollen clogs drains fast in DFW',
      '🌿 Step outside — inspect condenser for pollen/debris buildup on fins',
      '🔄 Filter check — replace now if you haven\’t since fall',
    ],
    comingUp: [
      '📅 May: DFW temps hit 90°F — your AC should already be tuned up',
      '📅 June: Full summer load begins — ensure refrigerant charge is correct',
      '💡 Schedule tune-up now if you haven\’t — don\’t wait until 100°F days',
    ],
  },
  summer: {
    emoji: '☀️', label: 'DFW Summer', color: '#F5E642',
    morningCheck: [
      '🌡 Check overnight low — if above 80°F, system ran all night; note runtime',
      '❄️ Feel supply vents at 8am — should feel cold; warm means refrigerant or airflow issue',
      '📊 Check your delta-T — supply vs return should be 15–22°F in DFW summer humidity',
      '🌀 Glance at outdoor unit — fan should spin freely; look for ice on lines',
      '💧 Check condensate drain outside — should be dripping on hot July days',
    ],
    comingUp: [
      '📅 August: Peak DFW heat — HVAC failures hit highest rate; have tech\’s number ready',
      '📅 September: Schedule fall furnace tune-up now before October rush',
      '💡 If system ran 24/7 and didn\’t keep up, it\’s undersized or low on refrigerant',
    ],
  },
  fall: {
    emoji: '🍂', label: 'DFW Fall', color: '#FB923C',
    morningCheck: [
      '🌡 Morning temp below 65°F? Switch thermostat to HEAT and test it now',
      '🔥 Listen for furnace first-light of season — some burning smell is normal; clear in 10 min',
      '💨 Feel supply vents in heat mode — should feel warm within 5 minutes',
      '🧯 Check CO detector near furnace — first heat startup is peak CO risk season',
      '🔄 Replace air filter — heating pulls more static and clogs filters faster',
    ],
    comingUp: [
      '📅 November: First DFW cold snap possible — don\’t be caught with unserviced furnace',
      '📅 December/January: DFW ice events — know your emergency heat settings',
      '💡 October tune-up window is closing fast — book now',
    ],
  },
};

const situationAdvice: Record<string, string> = {
  'Running great — just doing a check': '✅ Great habit. Today just do your morning check — 5 min is all it takes to catch early issues.',
  'Unit is older (10+ years)': '⚠️ Older DFW systems need monthly filter checks and should get a full tune-up each season. Start budgeting for replacement — average DFW lifespan is 12–15 years.',
  'Bills seem higher than usual': '💡 Check filter first (clogged filter = 15–25% efficiency loss). Then compare bill to same month last year. If delta is >20%, call a tech for a refrigerant and static pressure check.',
  'Heard a strange noise recently': '🔊 Describe the noise: Squealing = bearings. Banging = loose part. Clicking on startup = normal. Clicking continuously = relay or capacitor. Hissing = refrigerant leak. Don\’t ignore — get it checked.',
  'Not cooling / heating as well as before': '❄️ Check filter and vents first. Then feel supply air temp. If delta-T is below 12°F in summer or supply heat is weak, you likely have a refrigerant or heat exchanger issue. Call a DFW tech today.',
};

export default function DFWHVACFinalMorningPage() {
  const today = new Date();
  const [month, setMonth] = useState(months[today.getMonth()]);
  const [situation, setSituation] = useState(systemSituations[0]);
  const season = getSeason(month);
  const data = seasonData[season];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🌅</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW HVAC Morning Page</h1>
          <p style={{ color: '#9BB0CC', margin: 0 }}>As the DFW sun rises — here's your HVAC action for today</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ color: '#9BB0CC', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>DFW MONTH</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '0.5rem', fontSize: '0.95rem' }}>
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#9BB0CC', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>MY SYSTEM TODAY</label>
            <select value={situation} onChange={(e) => setSituation(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '0.5rem', fontSize: '0.95rem' }}>
              {systemSituations.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: data.color + '22', border: `2px solid ${data.color}`, borderRadius: 10, padding: '0.75rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>{data.emoji}</span>
          <div>
            <div style={{ color: data.color, fontWeight: 700, fontSize: '0.85rem' }}>SEASON</div>
            <div style={{ color: '#fff', fontWeight: 700 }}>{data.label} — {month}</div>
          </div>
        </div>

        <div style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem', borderLeft: `4px solid ${data.color}` }}>
          <div style={{ color: data.color, fontWeight: 700, marginBottom: 6 }}>💬 Situation Advisory</div>
          <p style={{ margin: 0, color: '#CBD5E1', lineHeight: 1.7 }}>{situationAdvice[situation]}</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>☀️ Today's DFW Morning HVAC Check</h3>
          {data.morningCheck.map((item, i) => (
            <div key={i} style={{ padding: '0.65rem 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', lineHeight: 1.6 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📅 What's Coming This DFW Season</h3>
          {data.comingUp.map((item, i) => (
            <div key={i} style={{ padding: '0.65rem 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', lineHeight: 1.6 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
