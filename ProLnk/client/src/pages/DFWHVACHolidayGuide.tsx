import { useState } from 'react';

const holidays = [
  { id: 'thanksgiving', label: '🦃 Thanksgiving', guests: 8, cookingHours: 6, extraLoad: 'HIGH' },
  { id: 'christmas', label: '🎄 Christmas', guests: 10, cookingHours: 4, extraLoad: 'HIGH' },
  { id: 'newYear', label: '🎆 New Year\’s', guests: 15, cookingHours: 2, extraLoad: 'MEDIUM' },
  { id: 'july4', label: '🎇 Fourth of July', guests: 20, cookingHours: 3, extraLoad: 'EXTREME' },
  { id: 'memorial', label: '🇺🇸 Memorial Day', guests: 12, cookingHours: 3, extraLoad: 'EXTREME' },
];

const homeTypes = [
  { id: 'small', label: 'Small DFW Home (<1500 sq ft)', factor: 1.4 },
  { id: 'medium', label: 'Medium DFW Home (1500-2500 sq ft)', factor: 1.2 },
  { id: 'large', label: 'Large DFW Home (2500-4000 sq ft)', factor: 1.0 },
  { id: 'estate', label: 'DFW Estate (4000+ sq ft)', factor: 0.85 },
];

function getStrategy(holiday: typeof holidays[0], home: typeof homeTypes[0]) {
  const tips = [];
  if (holiday.extraLoad === 'EXTREME') tips.push('⚠️ Pre-cool to 68°F two hours before guests arrive');
  if (holiday.guests >= 10) tips.push('🌡️ Lower thermostat 2-3°F per 5 guests above your norm');
  if (holiday.cookingHours >= 4) tips.push('🍳 Kitchen cooking adds 3-5°F — run exhaust fans continuously');
  if (home.factor > 1.2) tips.push('🏠 Smaller homes heat faster — check every 30 min');
  tips.push('🔄 Change filter if older than 30 days before the gathering');
  tips.push('💨 Keep interior doors open for airflow balance');
  tips.push('🌿 Add portable fans in high-traffic areas to assist circulation');
  if (holiday.id === 'july4' || holiday.id === 'memorial') tips.push('☀️ DFW summer heat + guests = consider calling a pro same week');
  return tips;
}

export default function DFWHVACHolidayGuide() {
  const [holiday, setHoliday] = useState('');
  const [home, setHome] = useState('');

  const selectedHoliday = holidays.find(h => h.id === holiday);
  const selectedHome = homeTypes.find(h => h.id === home);
  const strategy = selectedHoliday && selectedHome ? getStrategy(selectedHoliday, selectedHome) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🎉 Holidays & Your DFW HVAC</h1>
        <p style={{ color: '#8899AA', marginBottom: 32 }}>
          DFW holidays bring family, food, and serious strain on your HVAC. Every extra body adds heat load — and DFW's climate makes it worse.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>📅 Select Your Holiday</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {holidays.map(h => (
              <button key={h.id} onClick={() => setHoliday(h.id)}
                style={{ background: holiday === h.id ? '#F5E642' : '#1A2D4A', color: holiday === h.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {h.label} — {h.guests} avg guests · {h.cookingHours}h cooking · Load: {h.extraLoad}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🏠 Your DFW Home Size</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setHome(h.id)}
                style={{ background: home === h.id ? '#F5E642' : '#1A2D4A', color: home === h.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {strategy.length > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🎯 Your Holiday HVAC Strategy</h2>
            {strategy.map((tip, i) => (
              <div key={i} style={{ background: '#1A2D4A', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 15 }}>{tip}</div>
            ))}
            <div style={{ marginTop: 20, padding: 16, background: '#162035', borderRadius: 8, fontSize: 13, color: '#8899AA' }}>
              💡 DFW pros recommend a pre-holiday tune-up if your system is 7+ years old. Body heat + cooking heat + DFW outdoor temps = your HVAC's biggest test of the year.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
