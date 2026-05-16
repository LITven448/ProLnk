import { useState } from 'react';

const absenceDurations = [
  { id: 'month1', label: '📅 1 Month (30-45 days)', days: 37, tier: 'LEVEL1' },
  { id: 'month3', label: '🗓️ 3 Months (Snowbird Short)', days: 90, tier: 'LEVEL2' },
  { id: 'month6', label: '🌍 6 Months (Classic Snowbird)', days: 180, tier: 'LEVEL3' },
  { id: 'yearPlus', label: '🏠 Year+ (Long-Term Absence)', days: 365, tier: 'LEVEL4' },
];

const dfwSeasonsDeparture = [
  { id: 'leaveSummer', label: '☀️ Leaving in DFW Summer', concern: 'HEAT+HUMIDITY', protocol: 'ACTIVE_AC' },
  { id: 'leaveFall', label: '🍂 Leaving in DFW Fall', concern: 'MILD_TRANSITION', protocol: 'MODERATE' },
  { id: 'leaveWinter', label: '❄️ Leaving in DFW Winter', concern: 'FREEZE_RISK', protocol: 'HEAT_MAINTAIN' },
  { id: 'leaveSpring', label: '🌸 Leaving in DFW Spring', concern: 'STORM+HUMIDITY', protocol: 'ACTIVE_AC' },
];

function buildExtendedPlan(duration: typeof absenceDurations[0], season: typeof dfwSeasonsDeparture[0]) {
  const tips: string[] = [];
  tips.push('📞 Hire a licensed DFW property manager or trusted caretaker for weekly walk-throughs');
  if (duration.tier === 'LEVEL3' || duration.tier === 'LEVEL4') tips.push('🔧 Schedule HVAC pro inspection before departure — do not leave on an unserviced system');
  if (season.concern === 'HEAT+HUMIDITY') {
    tips.push('🌡️ Set AC to 80°F — never off. DFW summer humidity + no AC = guaranteed mold in 30 days');
    tips.push('💧 Install a humidity sensor with WiFi alerts — set alarm at 65% humidity');
  }
  if (season.concern === 'FREEZE_RISK' || season.protocol === 'HEAT_MAINTAIN') {
    tips.push('❄️ DFW can get hard freezes — keep heat at 65°F minimum, insulate exposed pipes');
    tips.push('🚰 Consider winterizing if gone 6+ months through DFW winter');
  }
  tips.push('🔌 Install a smart thermostat with remote monitoring before you leave');
  tips.push('🚰 Shut water main off and drain pipes for 90+ day absences');
  tips.push('🏦 Smart leak detectors at water heater, under sinks, and at AC drain pan');
  if (duration.days >= 90) tips.push('⚡ Put lights on smart timers — security + electronics stay active');
  if (duration.days >= 180) tips.push('🛡️ Notify your DFW homeowner insurance — some policies void for 60+ day vacancies');
  tips.push('📊 Document HVAC model, age, and service history — give to your caretaker');
  if (duration.tier === 'LEVEL4') tips.push('🤝 Contract with a DFW HVAC company for quarterly service during your absence');
  return tips;
}

export default function DFWHVACExtendedAbsence() {
  const [duration, setDuration] = useState('');
  const [season, setSeason] = useState('');

  const selectedDuration = absenceDurations.find(d => d.id === duration);
  const selectedSeason = dfwSeasonsDeparture.find(s => s.id === season);
  const plan = selectedDuration && selectedSeason ? buildExtendedPlan(selectedDuration, selectedSeason) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🏠 Extended Absence HVAC Protocol</h1>
        <p style={{ color: '#8899AA', marginBottom: 12 }}>
          DFW snowbirds and long-term travelers face unique risks. 30+ days away without the right HVAC setup can mean mold, pipe damage, or a failed system waiting on return.
        </p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontWeight: 700, fontSize: 14 }}>
          ⚠️ DFW's climate is extreme in both directions — summer heat destroys unprotected homes; winter freezes burst pipes. Extended absence requires professional setup.
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📅 How Long Will You Be Gone?</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {absenceDurations.map(d => (
              <button key={d.id} onClick={() => setDuration(d.id)}
                style={{ background: duration === d.id ? '#F5E642' : '#1A2D4A', color: duration === d.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🌤️ When Are You Leaving DFW?</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {dfwSeasonsDeparture.map(s => (
              <button key={s.id} onClick={() => setSeason(s.id)}
                style={{ background: season === s.id ? '#F5E642' : '#1A2D4A', color: season === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
                <span style={{ display: 'block', fontWeight: 400, fontSize: 12, marginTop: 2, opacity: 0.8 }}>Primary concern: {s.concern}</span>
              </button>
            ))}
          </div>
        </div>

        {plan.length > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Your Extended Absence Protocol</h2>
            {plan.map((tip, i) => (
              <div key={i} style={{ background: '#1A2D4A', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 15 }}>{tip}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
