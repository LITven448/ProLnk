import { useState } from 'react';

const tripLengths = [
  { id: 'weekend', label: '🚗 Weekend (2-3 days)', days: 3 },
  { id: 'week', label: '✈️ Week Vacation (5-8 days)', days: 7 },
  { id: 'twoweeks', label: '🌴 Two Weeks (10-14 days)', days: 14 },
  { id: 'month', label: '🏖️ Extended Trip (15-30 days)', days: 25 },
];

const dfwSeasons = [
  { id: 'summer', label: '☀️ DFW Summer (Jun-Sep)', minTemp: 85, maxTemp: 107, risk: 'CRITICAL', vacationMax: 80, humidity: 'HIGH' },
  { id: 'spring', label: '🌸 DFW Spring (Mar-May)', minTemp: 65, maxTemp: 92, risk: 'HIGH', vacationMax: 80, humidity: 'MEDIUM' },
  { id: 'fall', label: '🍂 DFW Fall (Oct-Nov)', minTemp: 45, maxTemp: 78, risk: 'LOW', vacationMax: 82, humidity: 'LOW' },
  { id: 'winter', label: '❄️ DFW Winter (Dec-Feb)', minTemp: 28, maxTemp: 60, risk: 'MEDIUM', vacationMax: 82, humidity: 'LOW' },
];

function buildVacationPlan(trip: typeof tripLengths[0], season: typeof dfwSeasons[0]) {
  const tips: string[] = [];
  tips.push(`🌡️ Set thermostat to ${season.vacationMax}°F — never higher in DFW regardless of season`);
  if (season.risk === 'CRITICAL') tips.push('🚨 DFW summer: if AC fails and it\’s off, interior hits 120°F+ within 48 hrs — wood, paint, and electronics damaged');
  if (season.humidity === 'HIGH') tips.push('💧 Humidity: Set humidity control to 60% max — mold starts at 70%+ in DFW summers');
  tips.push('📱 Smart thermostat required for trips over 3 days — you need remote visibility from anywhere');
  if (trip.days >= 7) tips.push('🔌 Unplug electronics — they generate heat and consume standby power');
  if (trip.days >= 7) tips.push('🚰 Shut off water at main if gone 7+ days — leak + no AC = catastrophic mold');
  tips.push('👤 Have a trusted neighbor check the home every 3-4 days');
  if (season.id === 'winter') tips.push('❄️ DFW can freeze — keep heat at 65°F minimum to protect pipes');
  tips.push('🔋 Replace thermostat batteries before leaving');
  tips.push(`📋 Return checklist: check for leaks, smell for mold, verify temp held at ${season.vacationMax}°F`);
  if (trip.days >= 14) tips.push('🔧 Schedule a pro check within 48 hours of returning for trips 14+ days');
  return tips;
}

export default function DFWHVACVacationMode() {
  const [trip, setTrip] = useState('');
  const [season, setSeason] = useState('');

  const selectedTrip = tripLengths.find(t => t.id === trip);
  const selectedSeason = dfwSeasons.find(s => s.id === season);
  const plan = selectedTrip && selectedSeason ? buildVacationPlan(selectedTrip, selectedSeason) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🏖️ DFW Vacation Mode HVAC</h1>
        <p style={{ color: '#8899AA', marginBottom: 12 }}>
          Leaving your DFW home unoccupied requires a precise HVAC strategy. The 82°F myth can destroy your home — DFW's heat and humidity demand specific protocols.
        </p>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontWeight: 700, fontSize: 14 }}>
          ⚠️ NEVER turn your DFW AC completely off in summer. Moisture and heat damage begin within 24-48 hours.
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>✈️ Trip Length</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {tripLengths.map(t => (
              <button key={t.id} onClick={() => setTrip(t.id)}
                style={{ background: trip === t.id ? '#F5E642' : '#1A2D4A', color: trip === t.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📅 DFW Season</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {dfwSeasons.map(s => (
              <button key={s.id} onClick={() => setSeason(s.id)}
                style={{ background: season === s.id ? '#F5E642' : '#1A2D4A', color: season === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
                <span style={{ display: 'block', fontWeight: 400, fontSize: 12, marginTop: 2, opacity: 0.8 }}>Temps: {s.minTemp}°-{s.maxTemp}°F · Risk: {s.risk} · Vacation max: {s.vacationMax}°F</span>
              </button>
            ))}
          </div>
        </div>

        {plan.length > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Your DFW Vacation Mode Protocol</h2>
            {plan.map((tip, i) => (
              <div key={i} style={{ background: '#1A2D4A', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 15 }}>{tip}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
