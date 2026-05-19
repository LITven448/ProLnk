import { useState } from 'react';

const PLATFORMS = [
  { label: 'Amazon Alexa', value: 'alexa' },
  { label: 'Google Home', value: 'google' },
  { label: 'Apple HomeKit', value: 'apple' },
  { label: 'SmartThings / Generic', value: 'smartthings' },
  { label: 'No smart home yet', value: 'none' },
];

const SYSTEM_COUNTS = [
  { label: '1–2 systems', value: 'few' },
  { label: '3–5 systems', value: 'several' },
  { label: '6–10 systems', value: 'many' },
  { label: '10+ systems', value: 'full' },
];

const PLATFORM_DEVICES: Record<string, { hvac: string; water: string; filter: string; hub: string }> = {
  alexa: { hvac: 'Ecobee SmartThermostat (native Alexa)', water: 'Moen Flo (Alexa skill)', filter: 'Filtrete Smart Filter + Alexa reminder', hub: 'Echo Show for dashboard' },
  google: { hvac: 'Nest Thermostat (native Google Home)', water: 'Phyn Plus (Google Home compatible)', filter: 'Google Calendar reminder + Nest air quality', hub: 'Google Home display' },
  apple: { hvac: 'Ecobee (HomeKit native)', water: 'Phyn Plus (HomeKit)', filter: 'Eve Energy + HomeKit automation', hub: 'HomePod mini' },
  smartthings: { hvac: 'Ecobee + SmartThings integration', water: 'Moen Flo + SmartThings', filter: 'SmartThings + custom automation', hub: 'SmartThings Hub v3' },
  none: { hvac: 'Start with Ecobee — works standalone', water: 'Moen Flo — works standalone with app', filter: 'Set phone reminders as baseline', hub: 'Choose platform after first device' },
};

const TIME_SAVINGS: Record<string, number> = { few: 4, several: 9, many: 18, full: 32 };

const REMINDERS = [
  { icon: '🌬️', task: 'HVAC filter change', freq: 'Every 60–90 days', note: 'DFW dust and pollen clogs filters faster than national average' },
  { icon: '🧂', task: 'Water softener salt', freq: 'Every 6–8 weeks', note: 'DFW water hardness (300+ ppm) exhausts resin faster' },
  { icon: '🚿', task: 'Water heater flush', freq: 'Annually', note: 'Prevents sediment buildup that shortens tank life by 3–5 years' },
  { icon: '🪟', task: 'Window/door seal check', freq: 'Every spring', note: 'DFW temperature extremes expand and contract frames annually' },
  { icon: '💧', task: 'Foundation soaker hose check', freq: 'Monthly April–October', note: 'Critical for DFW clay soil moisture management' },
  { icon: '🏠', task: 'Roof inspection reminder', freq: 'After each hail event + annually', note: 'DFW averages 8–12 hail events per year' },
  { icon: '🌿', task: 'Gutters and downspouts', freq: 'Every spring and fall', note: 'Pecan and oak trees drop heavy debris in DFW' },
  { icon: '⚡', task: 'GFCI outlet test', freq: 'Annually', note: 'Code required — often skipped until an incident' },
];

export default function DFWSmartHomeMaintenanceGuide() {
  const [platform, setPlatform] = useState('');
  const [systemCount, setSystemCount] = useState('');
  const pd = platform ? PLATFORM_DEVICES[platform] : null;
  const timeSaved = systemCount ? TIME_SAVINGS[systemCount] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Smart Home Maintenance Guide</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          The average DFW homeowner misses 6–8 critical maintenance tasks per year because nothing reminded them. Smart home automation eliminates that gap — and integrates with ProLnk to request service automatically.
        </p>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 DFW Maintenance Tasks to Automate</h2>
          {REMINDERS.map(r => (
            <div key={r.task} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start', borderBottom: '1px solid #1E2D45', paddingBottom: 14 }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{r.task}</div>
                <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 4 }}>Frequency: {r.freq}</div>
                <div style={{ fontSize: 12, color: '#8899AA' }}>{r.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔧 Build Your Automation Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>Smart Home Platform</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {PLATFORMS.map(p => (
                <button key={p.value} onClick={() => setPlatform(p.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: platform === p.value ? '#F5E642' : '#0A1628',
                    color: platform === p.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>Number of Home Systems to Monitor</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {SYSTEM_COUNTS.map(s => (
                <button key={s.value} onClick={() => setSystemCount(s.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: systemCount === s.value ? '#F5E642' : '#0A1628',
                    color: systemCount === s.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {pd && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Recommended Devices for Your Platform</div>
              {[['🌡️ HVAC', pd.hvac], ['💧 Water', pd.water], ['🌬️ Filter Tracking', pd.filter], ['🖥️ Control Hub', pd.hub]].map(([label, device]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <span style={{ color: '#F5E642', fontWeight: 600 }}>{label}: </span>
                  <span style={{ fontSize: 14 }}>{device}</span>
                </div>
              ))}
            </div>
          )}
          {timeSaved && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #4CAF50' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Estimated Time Saved Annually</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#4CAF50' }}>{timeSaved} hours/year</div>
              <div style={{ fontSize: 13, color: '#8899AA', marginTop: 4 }}>Through automated reminders, reduced missed maintenance, and streamlined service requests</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <a href="/get-quotes" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Request Service Through ProLnk →
          </a>
        </div>
      </div>
    </div>
  );
}