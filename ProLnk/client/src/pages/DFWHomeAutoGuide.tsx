import { useState } from 'react';

const devices = ['Smart Thermostat', 'Smart Lights', 'Smart Lock', 'Hub/Bridge', 'Security Camera', 'Smart Plug'];
const symptoms = ['Won\’t Respond', 'Offline in App', 'Slow/Laggy', 'Dead Battery', 'WiFi Disconnecting', 'Failed After Outage'];

function getSteps(device: string, symptom: string) {
  const climateNote = 'DFW summers push attic temps to 150°F+ — devices in unconditioned spaces degrade fast.';
  const steps: Record<string, string[]> = {
    'Smart Thermostat-Won\’t Respond': ['Check C-wire voltage (most DFW installs lack C-wire)', 'Restart at breaker — 30s off', 'Re-pair in app after restart', 'If Ecobee/Nest: check wifi band (2.4GHz only)', climateNote],
    'Hub/Bridge-Failed After Outage': ['DFW storms cause brownouts — always use UPS battery backup', 'Hard reset hub (hold button 10s)', 'Re-add devices one at a time', 'Set hub outlet to surge protector', 'Consider generator or whole-home battery backup'],
    'Smart Lock-Dead Battery': ['DFW heat kills AA batteries in 2-3 months vs 6-12 elsewhere', 'Switch to lithium batteries (last 2x longer in heat)', 'Add physical keypad backup code', 'Check door alignment — dragging increases battery drain', climateNote],
    'Security Camera-WiFi Disconnecting': ['Outdoor cameras suffer in 110°F+ DFW direct sun', 'Move to shaded mounting if possible', 'Use 2.4GHz for range over 5GHz for speed', 'Add outdoor-rated WiFi extender on eave', 'Replace if housing is warped/cracked from sun'],
  };
  const key = `${device}-${symptom}`;
  return steps[key] || [
    `Power cycle ${device} completely (unplug 60s)`,
    'Remove and re-add device in app',
    'Check for firmware update in manufacturer app',
    'Verify 2.4GHz WiFi (most smart devices don\’t support 5GHz)',
    climateNote,
    'If failure persists after 3 resets → replace unit',
  ];
}

export default function DFWHomeAutoGuide() {
  const [device, setDevice] = useState('');
  const [symptom, setSymptom] = useState('');
  const [steps, setSteps] = useState<string[]>([]);

  function handleDiagnose() {
    if (!device || !symptom) return;
    setSteps(getSteps(device, symptom));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏠⚡</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Smart Home Troubleshooting</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's extreme heat (110°F+ summers), severe storms, and frequent power fluctuations are the #1 killer of smart home devices.
          This guide is tuned for North Texas climate conditions.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 32, fontWeight: 600 }}>
          ⚠️ DFW Climate Alert: Attic temps hit 150°F+ in summer. Never install hub or battery devices in unconditioned spaces.
        </div>

        <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>Smart Device Type</label>
            <select value={device} onChange={e => setDevice(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select device...</option>
              {devices.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 8, fontWeight: 600 }}>Failure Symptom</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#1E2D45', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select symptom...</option>
              {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleDiagnose}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
          🔧 Get DFW-Specific Fix Steps
        </button>

        {steps.length > 0 && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Troubleshooting Steps</h3>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: '#CBD5E1', lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🌡️ DFW Smart Home Survival Rules</h3>
          {['Use UPS battery backups — DFW storms cause frequent brownouts that brick smart devices', 'Install surge protectors on every smart hub outlet', 'Use lithium batteries outdoors — alkaline dies in 60 days in summer heat', 'Choose IP65+ rated outdoor devices — DFW hail and rain are brutal', 'Keep hub/router in conditioned interior space only'].map((tip, i) => (
            <div key={i} style={{ color: '#CBD5E1', marginBottom: 10, paddingLeft: 16, borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
