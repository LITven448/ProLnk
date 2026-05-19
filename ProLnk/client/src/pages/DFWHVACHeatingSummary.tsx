import { useState } from 'react';

const situations = [
  { label: 'My heat isn\’t working well', key: 'poor_heat' },
  { label: 'Worried about a rare DFW freeze', key: 'freeze' },
  { label: 'Choosing heat pump vs gas furnace', key: 'choosing' },
  { label: 'Emergency — heat is completely out in cold snap', key: 'emergency' },
  { label: 'Want a seasonal maintenance plan', key: 'maintenance' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  poor_heat: {
    title: '🔍 DFW Heat Troubleshooting Plan',
    steps: [
      '✅ Check thermostat — set to HEAT, temp above current reading',
      '✅ Replace air filter — restricted airflow cuts heat output 30%',
      '✅ Check circuit breaker and gas shutoff valve (if gas)',
      '✅ Verify pilot light / igniter (older gas furnaces)',
      '✅ Listen for clicks — ignition failures = common DFW winter issue',
      '📞 Call ProLnk for a vetted DFW heating tech if not resolved',
    ],
  },
  freeze: {
    title: '🧊 DFW Freeze Preparedness Plan',
    steps: [
      '📅 Prep in November — don\’t wait for the forecast',
      '🔧 Schedule furnace tune-up before first cold snap',
      '💧 Know pipe locations — wrap exposed pipes before hard freeze',
      '🌡️ Keep thermostat at 68°F minimum even when away during freeze',
      '🔥 Keep emergency heat (if heat pump) setting accessible',
      '📦 Stock: space heaters, blankets, flashlights for extended outage',
    ],
  },
  choosing: {
    title: '⚖️ Heat Pump vs Gas — DFW Decision Guide',
    steps: [
      '🌡️ DFW winters: avg lows 35–45°F — heat pump excels here',
      '❄️ Heat pump loses efficiency below 30°F — DFW sees this rarely',
      '💰 Heat pump: lower operating cost in DFW mild winters',
      '🔥 Gas furnace: better for sustained below-freezing DFW events',
      '🏆 Best for DFW: dual-fuel (heat pump + gas backup) system',
      '📞 Get 3 quotes from ProLnk DFW HVAC pros to compare total cost',
    ],
  },
  emergency: {
    title: '🚨 DFW Heating Emergency Protocol',
    steps: [
      '🔥 Use space heaters in critical rooms — never in bathrooms',
      '🪵 If you have a fireplace, use it — supplement heat pump',
      '🌡️ Heat pump: switch to Emergency Heat mode (electric strips)',
      '🚗 Warm up in vehicle if home drops below 50°F for elderly/pets',
      '📞 Call ProLnk emergency line — 24/7 DFW coverage during cold snaps',
      '⚠️ Never use propane/gas grills indoors — CO poisoning risk',
    ],
  },
  maintenance: {
    title: '📅 DFW Annual Heating Maintenance Plan',
    steps: [
      '🍂 October: Schedule fall furnace/heat pump tune-up',
      '🔄 October: Replace filter before heating season',
      '🌿 October: Clear debris from outdoor heat pump unit',
      '❄️ November: Test emergency heat setting on heat pump',
      '🔥 Monthly Dec–Feb: Check filter (DFW winter = less frequent)',
      '🌸 March: Spring check before switching to cooling season',
    ],
  },
};

export default function DFWHVACHeatingSummary() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🔥 DFW Heating Summary</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW's mild winters vs occasional extreme cold — heat pump vs gas, emergency heat, maintenance — everything in one place.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌡️', title: 'DFW Winter Climate', body: 'Avg lows 35–45°F. Rare hard freezes (below 20°F) happen — prep matters.' },
            { icon: '🔥', title: 'Heat Pump', body: 'Best for DFW — efficient at mild temps, low cost, doubles as AC.' },
            { icon: '💨', title: 'Gas Furnace', body: 'More powerful for rare hard freezes. Higher install cost, reliable output.' },
            { icon: '🏆', title: 'Dual-Fuel', body: 'Heat pump primary + gas backup. Best of both — ideal for DFW.' },
            { icon: '🚨', title: 'Emergency Heat', body: 'Heat pump EM Heat = electric strips. Use only in emergency — very costly.' },
            { icon: '💰', title: 'Cost Range', body: 'Tune-up: $89–$149. New heat pump: $5K–$12K. Gas furnace: $3K–$8K.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your DFW Heating Situation</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your situation to get your personalized DFW heating action plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button
                key={s.key}
                onClick={() => setSelected(s.key)}
                style={{
                  background: selected === s.key ? '#F5E642' : '#1A2F4E',
                  color: selected === s.key ? '#0A1628' : '#fff',
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
                📞 Get a vetted DFW heating pro via ProLnk — free, no spam
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
