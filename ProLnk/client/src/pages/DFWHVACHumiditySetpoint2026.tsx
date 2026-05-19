import { useState } from 'react';

export default function DFWHVACHumiditySetpoint2026() {
  const [season, setSeason] = useState('');
  const [currentRH, setCurrentRH] = useState('');
  const [guide, setGuide] = useState('');

  const getGuide = () => {
    if (!season || !currentRH) { setGuide('Select a season and enter current humidity to get guidance.'); return; }
    const rh = parseInt(currentRH);
    if (isNaN(rh)) { setGuide('Enter a valid humidity percentage.'); return; }
    if (season === 'summer') {
      if (rh < 45) setGuide('🌬️ Below summer target (45-50% RH). Raise humidistat or check if AC is over-dehumidifying. Lower cooling setpoint may be removing too much moisture. Consider raising thermostat 1-2°F.');
      else if (rh <= 50) setGuide('✅ Perfect summer range (45-50% RH). Your DFW home is balanced. AC is dehumidifying correctly without over-cooling. Maintain current setpoint.');
      else if (rh <= 60) setGuide('⚠️ Slightly above summer target. Lower thermostat 1-2°F to increase AC runtime and dehumidification. Check for air leaks around doors and windows letting in humid DFW air.');
      else setGuide('🚨 High humidity risk zone (>60% RH). Mold can grow within 24-48 hours in DFW heat. Lower thermostat immediately, run AC fan continuously, check for water intrusion or leaks.');
    } else if (season === 'winter') {
      if (rh < 35) setGuide('🪵 Below winter minimum (35-45% RH). Wood floors and trim can crack in DFW winters below 35% RH. Consider a whole-home humidifier. Static electricity and dry skin are warning signs.');
      else if (rh <= 45) setGuide('✅ Perfect winter range (35-45% RH). Optimal for DFW winters — protects wood, comfortable for occupants, reduces static. Maintain current settings.');
      else if (rh <= 55) setGuide('⚠️ Slightly above winter target. Reduce humidifier output. DFW winters are mild so this may indicate insufficient ventilation. Check exhaust fans in bath and kitchen.');
      else setGuide('🚨 Too humid for winter. Risk of condensation on windows and walls. Reduce humidifier, increase ventilation. Persistent high winter humidity in DFW often indicates plumbing leak.');
    } else {
      if (rh < 40) setGuide('🌱 Spring/Fall: Below comfort range. Mild DFW temps mean AC runs less, so natural humidity should rise. Check for excess ventilation drawing in dry outside air.');
      else if (rh <= 55) setGuide('✅ Spring/Fall ideal range. DFW transitional seasons naturally stay in this range. Monitor as summer approaches — humidity will rise significantly by June.');
      else setGuide('⚠️ Spring/Fall elevated humidity. DFW spring rains can push indoor RH high. Run AC even when not hot to dehumidify. Check crawlspace or slab for moisture intrusion.');
    }
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>💧 DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>DFW Humidity Setpoint Guide</h1>
        <p style={{ color: '#8899AA', fontSize: '16px', marginBottom: '32px' }}>DFW's extreme heat and seasonal swings demand precise humidity control. Too low damages wood. Too high breeds mold. Here’s your seasonal setpoint guide.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {[{ season: 'summer', label: '☀️ Summer', target: '45–50% RH', note: 'AC dehumidifies — lower setpoint = more removal' },
            { season: 'winter', label: '❄️ Winter', target: '35–45% RH', note: 'Too dry cracks wood floors and trim' },
            { season: 'spring', label: '🌸 Spring/Fall', target: '40–55% RH', note: 'Monitor as DFW spring rains push humidity up' },
            { season: 'risk', label: '🚨 Danger Zones', target: '>60% or <30%', note: 'Mold above 60%; wood damage below 30%' }
          ].map(card => (
            <div key={card.season} style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>{card.target}</div>
              <div style={{ color: '#8899AA', fontSize: '13px' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#F5E642′ }}>🎛️ Get My Setpoint Guidance</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>Current DFW Season</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px' }}>
              <option value=''>Select season...</option>
              <option value='summer'>Summer (Jun–Sep)</option>
              <option value='winter'>Winter (Dec–Feb)</option>
              <option value='spring'>Spring / Fall (Mar–May, Oct–Nov)</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#8899AA', marginBottom: '8px' }}>Current Indoor Humidity (%RH)</label>
            <input type='number' value={currentRH} onChange={e => setCurrentRH(e.target.value)} placeholder='e.g. 58′ style={{ width: '100%', padding: '12px', backgroundColor: '#0A1628', border: '1px solid #1a3050', borderRadius: '8px', color: '#fff', fontSize: '15px', boxSizing: ’border-box' }} />
          </div>
          <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '14px 28px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Setpoint Guide</button>
          {guide && <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '15px', lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ backgroundColor: '#0D1F38', border: '1px solid #1a3050', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', color: '#F5E642′ }}>💡 How DFW AC Controls Humidity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Lower thermostat setpoint → AC runs longer → removes more moisture from air', 'DFW summer air at 95°F holds enormous moisture — your AC battles this daily', 'Oversized AC units short-cycle, cooling fast without adequate dehumidification', 'Two-stage or variable speed AC handles DFW humidity 40% better than single-stage', 'ERV (Energy Recovery Ventilator) can manage fresh air without humidity spikes'].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontSize: '16px', marginTop: '2px', flexShrink: 0 }}>→</span>
                <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}