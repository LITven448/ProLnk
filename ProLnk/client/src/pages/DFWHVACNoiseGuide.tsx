import { useState } from 'react';

type NoiseKey = 'clicking' | 'banging' | 'rattling' | 'squealing' | 'humming' | 'hissing';
type TimingKey = 'startup' | 'running' | 'shutoff' | 'always';

const NOISES: { key: NoiseKey; label: string; icon: string }[] = [
  { key: 'clicking', label: 'Clicking', icon: '🖱️' },
  { key: 'banging', label: 'Banging / Clunking', icon: '💥' },
  { key: 'rattling', label: 'Rattling', icon: '🎲' },
  { key: 'squealing', label: 'Squealing / Screeching', icon: '😬' },
  { key: 'humming', label: 'Loud Humming / Buzzing', icon: '🔊' },
  { key: 'hissing', label: 'Hissing / Whistling', icon: '🌬️' },
];

const TIMINGS: { key: TimingKey; label: string }[] = [
  { key: 'startup', label: 'Only at startup' },
  { key: 'running', label: 'While running' },
  { key: 'shutoff', label: 'Only at shutoff' },
  { key: 'always', label: 'Constantly' },
];

type DiagEntry = {
  cause: string;
  urgency: string;
  urgencyColor: string;
  action: string;
  diy: boolean;
};

const DIAG: Record<NoiseKey, Record<TimingKey, DiagEntry>> = {
  clicking: {
    startup: { cause: 'Normal relay/contactor click — expected', urgency: '✅ Normal', urgencyColor: '#10B981', action: 'No action needed. This is the sound of the system energizing.', diy: true },
    running: { cause: 'Relay clicking repeatedly may indicate a failing contactor', urgency: '⚠️ Monitor', urgencyColor: '#F59E0B', action: 'Watch for frequency. If clicking rapidly, call a tech — contactor may be failing.', diy: false },
    shutoff: { cause: 'Normal relay disengagement', urgency: '✅ Normal', urgencyColor: '#10B981', action: 'Single click at shutoff is expected. Multiple clicks could be thermostat wiring.', diy: true },
    always: { cause: 'Persistent clicking = control board or contactor fault', urgency: '🚨 Call Tech', urgencyColor: '#EF4444', action: 'Turn system off. This is not normal and indicates an electrical component is cycling unexpectedly.', diy: false },
  },
  banging: {
    startup: { cause: 'Loose or broken blower wheel or connecting rod', urgency: '🚨 Shut Off Now', urgencyColor: '#EF4444', action: 'Turn system off immediately. Banging at startup is a serious mechanical issue. Call a tech today.', diy: false },
    running: { cause: 'Debris in blower, broken component', urgency: '🚨 Shut Off Now', urgencyColor: '#EF4444', action: 'Cut power at the breaker. Do not run system. A broken part in the blower can cause major damage.', diy: false },
    shutoff: { cause: 'Expansion/contraction of ducts (normal) or loose flap', urgency: '🟡 Low Priority', urgencyColor: '#F59E0B', action: 'A single bang or boom at shutoff is usually ductwork expanding. Loud repeated banging — call a tech.', diy: true },
    always: { cause: 'Major mechanical failure', urgency: '🚨 Emergency', urgencyColor: '#EF4444', action: 'Shut off the system now. This is an emergency — do not run the HVAC until inspected.', diy: false },
  },
  rattling: {
    startup: { cause: 'Loose panel, screw, or debris near the unit', urgency: '🟡 Check & Clear', urgencyColor: '#F59E0B', action: 'Check for debris near condenser. Tighten access panels. If it continues, call for inspection.', diy: true },
    running: { cause: 'Debris in condenser fan or loose ductwork', urgency: '⚠️ Inspect Soon', urgencyColor: '#F59E0B', action: 'Check outdoor condenser for leaves/debris. Inspect return air duct connections.', diy: true },
    shutoff: { cause: 'Loose panel vibrating as system winds down', urgency: '✅ Minor', urgencyColor: '#10B981', action: 'Tighten the access panel screws on your air handler. Common and easy fix.', diy: true },
    always: { cause: 'Ductwork loose, refrigerant line vibrating, debris', urgency: '⚠️ Schedule Service', urgencyColor: '#F59E0B', action: 'Schedule a service call. Persistent rattling can worsen and indicates a loose mechanical component.', diy: false },
  },
  squealing: {
    startup: { cause: 'Worn blower belt (older systems) or dry bearing', urgency: '⚠️ Schedule Soon', urgencyColor: '#F59E0B', action: 'Older belt-drive systems need belt replacement. Newer direct-drive — bearing may be failing.', diy: false },
    running: { cause: 'Bearing failure in blower or condenser motor', urgency: '🚨 Call Today', urgencyColor: '#EF4444', action: 'Squealing while running = motor bearing failing. If ignored, the motor seizes. Call a tech today.', diy: false },
    shutoff: { cause: 'Normal motor spin-down in some units', urgency: '✅ Usually Normal', urgencyColor: '#10B981', action: 'Brief squeal at shutoff can be normal. If it gets louder or longer, have it checked.', diy: true },
    always: { cause: 'Failed bearing or belt', urgency: '🚨 Call Today', urgencyColor: '#EF4444', action: 'Continuous squealing = imminent motor failure. Turn system off and call a technician.', diy: false },
  },
  humming: {
    startup: { cause: 'Compressor or capacitor struggling to start', urgency: '⚠️ Call Soon', urgencyColor: '#F59E0B', action: 'A loud hum at startup can mean a weak capacitor. Capacitors are inexpensive — get it tested.', diy: false },
    running: { cause: 'Normal transformer hum (low) or capacitor issue (loud)', urgency: '⚠️ Have Checked', urgencyColor: '#F59E0B', action: 'Soft electrical hum is normal. Loud buzzing = capacitor or contactor. Call a tech to test.', diy: false },
    shutoff: { cause: 'Capacitor discharging — usually normal', urgency: '✅ Monitor', urgencyColor: '#10B981', action: 'Brief hum at shutoff is normal. If it lasts more than a second or two, mention it at your next service.', diy: true },
    always: { cause: 'Failing capacitor or loose electrical connection', urgency: '🚨 Call Soon', urgencyColor: '#EF4444', action: 'Constant humming/buzzing = electrical issue. Don\’t ignore — capacitor failure can damage the compressor.', diy: false },
  },
  hissing: {
    startup: { cause: 'Refrigerant equalizing between high/low side — normal', urgency: '✅ Normal', urgencyColor: '#10B981', action: 'Brief hiss at startup is normal pressure equalization. No action needed.', diy: true },
    running: { cause: 'Refrigerant leak or ductwork air leak', urgency: '🚨 Call Today', urgencyColor: '#EF4444', action: 'Hissing while running = possible refrigerant leak. Refrigerant is harmful and expensive to lose. Call a tech.', diy: false },
    shutoff: { cause: 'Refrigerant equalizing — normal', urgency: '✅ Normal', urgencyColor: '#10B981', action: 'Hiss at shutoff is normal pressure equalization. This is expected behavior.', diy: true },
    always: { cause: 'Active refrigerant leak or ductwork leak', urgency: '🚨 Call Today', urgencyColor: '#EF4444', action: 'Constant hissing = active leak somewhere. Turn off system and call a technician immediately.', diy: false },
  },
};

export default function DFWHVACNoiseGuide() {
  const [noise, setNoise] = useState<NoiseKey | ''>('');
  const [timing, setTiming] = useState<TimingKey | ''>('');
  const [showResult, setShowResult] = useState(false);

  const diag = noise && timing ? DIAG[noise][timing] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF7', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Noise Diagnostic Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          Your HVAC speaks in sounds. Some noises are completely normal — others are your system telling you something is about to fail. Use this guide to identify what you're hearing and whether you need to act now or schedule a checkup.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>🎧 What Are You Hearing?</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Noise Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {NOISES.map(({ key, label, icon }) => (
                <button key={key} onClick={() => { setNoise(key); setShowResult(false); }} style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid', borderColor: noise === key ? '#F5E642′ : '#1E3A5F', background: noise === key ? '#F5E64220' : ’transparent', color: noise === key ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>When Does It Occur?</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TIMINGS.map(({ key, label }) => (
                <button key={key} onClick={() => { setTiming(key); setShowResult(false); }} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: timing === key ? '#F5E642′ : '#1E3A5F', background: timing === key ? '#F5E64220' : ’transparent', color: timing === key ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!noise || !timing} style={{ background: noise && timing ? '#F5E642′ : '#1E3A5F', color: noise && timing ? '#0A1628' : '#4A6080', border: ’none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: noise && timing ? 'pointer' : 'not-allowed', width: '100%' }}>
            Diagnose My HVAC Noise
          </button>
        </div>

        {showResult && diag && (
          <div style={{ background: '#0D2240', border: `1.5px solid ${diag.urgencyColor}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: diag.urgencyColor, marginBottom: 8 }}>{diag.urgency}</div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#94A3B8', fontSize: 13 }}>Likely Cause: </span><span style={{ fontWeight: 600, fontSize: 14 }}>{diag.cause}</span></div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#94A3B8', fontSize: 13 }}>DIY Fixable: </span><span style={{ fontWeight: 600 }}>{diag.diy ? '✅ Possibly' : '❌ Call a Tech'}</span></div>
            <div style={{ background: '#111E35', borderRadius: 8, padding: 12, marginTop: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>🔧 Recommended Action</div>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>{diag.action}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📊 DFW HVAC Noise Quick Reference</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {NOISES.map(({ icon, label, key }) => {
              const worst = DIAG[key]['always'];
              return (
                <div key={key} style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{icon} {label}</div>
                  <div style={{ fontSize: 11, color: worst.urgencyColor }}>{worst.urgency.split(' ').slice(0, 2).join(' ')} if constant</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
