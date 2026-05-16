import { useState } from 'react';

const independenceLevels = ['Fully independent', 'Some daily assistance needed', 'Significant assistance needed', 'Full-time care required'];
const monitoringNeeds = ['Just myself — no family monitoring', 'Family checks in occasionally', 'Family wants regular updates', 'Family needs real-time monitoring'];

type TechPackage = { name: string; devices: string[]; monthlyCost: string; upfront: string; highlights: string[] };
const packages: Record<string, Record<string, TechPackage>> = {
  'Fully independent': {
    'Just myself — no family monitoring': {
      name: '🟢 Independent Essentials',
      devices: ['Smart thermostat (Nest/Ecobee)', 'Voice assistant (Amazon Echo)', 'Smart doorbell (Ring)', 'Motion-sensor night lights'],
      monthlyCost: '$5–15/mo (monitoring optional)',
      upfront: '$400–800',
      highlights: ['Control climate by voice', 'See visitors without answering door', 'No-trip night lighting'],
    },
    'Family checks in occasionally': {
      name: '🟢 Independent + Check-In',
      devices: ['Smart thermostat', 'Amazon Echo + Alexa Together', 'Smart doorbell', 'Activity sensors (door/motion)'],
      monthlyCost: '$20–35/mo',
      upfront: '$500–900',
      highlights: ['Alexa Together lets family check in remotely', 'Activity sensors show daily patterns', 'Optional urgent alerts'],
    },
    'Family wants regular updates': {
      name: '🟡 Independent + Activity Monitoring',
      devices: ['Smart thermostat', 'Amazon Echo + Alexa Together', 'Activity sensors throughout home', 'Smart doorbell', 'Medication reminder device'],
      monthlyCost: '$35–65/mo',
      upfront: '$700–1,200',
      highlights: ['Daily activity reports for family', 'Medication reminders', 'Abnormal pattern alerts'],
    },
    'Family needs real-time monitoring': {
      name: '🟠 Independent + Full Monitoring',
      devices: ['Smart thermostat', 'Amazon Echo + Alexa Together', 'Full activity sensor suite', 'Medical alert wearable (Apple Watch/Life Alert)', 'Smart doorbell + locks'],
      monthlyCost: '$50–90/mo',
      upfront: '$1,000–1,800',
      highlights: ['Real-time family dashboard', 'Fall detection via wearable', 'Remote door lock access'],
    },
  },
  'Some daily assistance needed': {
    'Just myself — no family monitoring': {
      name: '🟡 Assisted Independence',
      devices: ['Voice-activated lights (Philips Hue or Kasa)', 'Smart thermostat', 'Medical alert button (Life Alert/Bay Alarm)', 'Automatic pill dispenser'],
      monthlyCost: '$30–55/mo',
      upfront: '$600–1,100',
      highlights: ['Lights on by voice — no switches to reach', 'One-button emergency call', 'Medication management'],
    },
    'Family checks in occasionally': {
      name: '🟡 Assisted + Family Link',
      devices: ['Voice-activated lights', 'Smart thermostat', 'Medical alert wearable', 'Automatic pill dispenser', 'Smart doorbell + video'],
      monthlyCost: '$45–75/mo',
      upfront: '$800–1,400',
      highlights: ['Family remote check-in', 'Fall detection + two-way call', 'Medication auto-dispensed on schedule'],
    },
    'Family wants regular updates': {
      name: '🟠 Comprehensive Assisted',
      devices: ['Full voice-controlled smart home', 'Medical alert wearable', 'Automatic pill dispenser', 'Activity sensors', 'Smart doorbell + locks'],
      monthlyCost: '$65–100/mo',
      upfront: '$1,200–2,000',
      highlights: ['Full smart home control by voice', 'Daily family activity report', 'GPS tracking if leaves home'],
    },
    'Family needs real-time monitoring': {
      name: '🔴 Full Assisted Monitoring',
      devices: ['Full voice-controlled smart home', 'Medical alert + fall detection wearable', 'Remote health monitoring (blood pressure, O2)', 'Automatic pill dispenser', 'Activity sensors + camera system'],
      monthlyCost: '$90–150/mo',
      upfront: '$1,800–3,000',
      highlights: ['Real-time health vitals to family', 'Automatic 911 call on fall detection', 'Professional monitoring included'],
    },
  },
  'Significant assistance needed': {
    'Just myself — no family monitoring': {
      name: '🟠 Supported Safety',
      devices: ['Medical alert with fall detection (Life Alert or Bay Alarm Medical)', 'Automatic pill dispenser', 'Voice-activated lights + thermostat', 'Motion sensors'],
      monthlyCost: '$60–90/mo',
      upfront: '$900–1,500',
      highlights: ['24/7 emergency monitoring', 'Auto medication dispensing', 'Voice control minimizes physical effort'],
    },
    'Family wants regular updates': {
      name: '🔴 Supported + Family Monitoring',
      devices: ['Medical alert + fall detection wearable', 'Remote health monitoring kit', 'Automatic pill dispenser', 'Full smart home + voice control', 'Indoor cameras (family view)'],
      monthlyCost: '$100–160/mo',
      upfront: '$1,500–2,800',
      highlights: ['Family can view home remotely', 'Health data shared automatically', 'Professional + family dual monitoring'],
    },
    'Family needs real-time monitoring': {
      name: '🔴 Full Care Technology',
      devices: ['Professional medical alert + fall detection', 'Remote health vitals monitor', 'Automatic pill dispenser with alerts', 'Smart home full voice control', 'Indoor cameras + smart locks for caregiver access'],
      monthlyCost: '$130–200/mo',
      upfront: '$2,000–4,000',
      highlights: ['Near-hospital-grade home monitoring', 'Caregiver remote access to home', 'Predictive health analytics'],
    },
    'Family checks in occasionally': {
      name: '🟠 Supported + Basic Monitoring',
      devices: ['Medical alert + fall detection wearable', 'Automatic pill dispenser', 'Smart home voice control', 'Smart doorbell for visitor check'],
      monthlyCost: '$75–110/mo',
      upfront: '$1,100–1,900',
      highlights: ['Fall detection included', 'Auto medication reminders', 'Family can see door visitors remotely'],
    },
  },
  'Full-time care required': {
    'Family needs real-time monitoring': {
      name: '🔴 Professional Care Technology Suite',
      devices: ['Hospital-grade fall detection system', 'Remote vitals monitor (blood pressure, O2, glucose)', 'Smart medication lock + auto dispenser', 'Indoor camera system (caregiver monitoring)', 'Smart locks + doorbell for care team access'],
      monthlyCost: '$180–280/mo',
      upfront: '$3,000–6,000',
      highlights: ['Supports in-home care team coordination', 'Family real-time monitoring dashboard', 'Emergency protocol automation'],
    },
    'Family wants regular updates': {
      name: '🔴 Full Care + Family Updates',
      devices: ['Fall detection system', 'Remote vitals monitor', 'Smart medication management', 'Smart home voice + auto controls', 'Family monitoring app integration'],
      monthlyCost: '$150–220/mo',
      upfront: '$2,500–4,500',
      highlights: ['Daily and event-based family alerts', 'Caregiver remote access', 'Voice controls for patient comfort'],
    },
    'Just myself — no family monitoring': {
      name: '🔴 Full Care — Caregiver Support',
      devices: ['Medical alert + fall detection', 'Smart medication dispenser', 'Voice-activated controls', 'Motion sensor suite'],
      monthlyCost: '$100–150/mo',
      upfront: '$1,500–2,500',
      highlights: ['Emergency professional monitoring 24/7', 'Automatic medication management', 'Minimal effort for patient'],
    },
    'Family checks in occasionally': {
      name: '🔴 Full Care + Family Check-In',
      devices: ['Fall detection + medical alert', 'Remote vitals monitor', 'Smart medication dispenser', 'Smart doorbell + cameras', 'Family check-in app'],
      monthlyCost: '$130–190/mo',
      upfront: '$2,000–3,500',
      highlights: ['Family remote check-in anytime', 'Professional monitoring backup', 'Full medication management'],
    },
  },
};

export default function DFWSmartHomeForSeniorsGuide() {
  const [independence, setIndependence] = useState('');
  const [monitoring, setMonitoring] = useState('');

  const pkg = independence && monitoring ? packages[independence]?.[monitoring] : null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#7c3aed', fontSize: 14, fontWeight: 700 }}>📱 ProLnk DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Smart Home Technology for DFW Seniors</h1>
        <p style={{ color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
          From voice-activated lights to fall detection — find the right tech package based on independence level and family monitoring needs.
        </p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e3a5f', fontSize: 18, marginBottom: 16 }}>🔑 Most Impactful Devices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🫀', t: 'Fall Detection', cost: '$30–80/mo', d: 'Wearable detects falls and auto-calls 911. Apple Watch, Life Alert, Bay Alarm Medical.' },
              { icon: '🗣️', t: 'Voice Assistants', cost: '$30–100 once', d: 'Control lights, thermostat, make calls — without leaving your chair. Alexa or Google.' },
              { icon: '💊', t: 'Auto Pill Dispenser', cost: '$40–100/mo', d: 'Dispenses correct dose at correct time, alerts family if missed. Hero or MedMinder.' },
              { icon: '🔔', t: 'Smart Doorbell', cost: '$100–250 once', d: 'See and talk to visitors on phone or tablet — no need to get up. Ring or Nest.' },
              { icon: '🌡️', t: 'Smart Thermostat', cost: '$150–250 once', d: 'Voice control + auto-scheduling. Critical in DFW heat — maintain safe temps.' },
              { icon: '👁️', t: 'Remote Monitoring', cost: '$20–60/mo', d: 'Family views activity, vitals, camera from phone. Products: Alexa Together, Carefull.' },
            ].map((d) => (
              <div key={d.t} style={{ background: '#f1f5f9', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{d.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{d.t}</div>
                <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>{d.cost}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{d.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e3a5f', fontSize: 18, marginBottom: 8 }}>☀️ DFW-Specific Considerations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { icon: '🌡️', t: 'Heat Management', d: 'Smart thermostats are critical in DFW summers — 100°F+ requires automated cooling' },
              { icon: '⚡', t: 'Power Outage Backup', d: 'Medical alert devices need battery backup given DFW storm outages' },
              { icon: '💧', t: 'Humidity Control', d: 'DFW humidity affects sensors and electronics — choose rated devices' },
              { icon: '🌪️', t: 'Storm Alerts', d: 'Smart home can automate storm prep — door locks, shade control' },
            ].map((f) => (
              <div key={f.t} style={{ background: '#ede9fe', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{f.t}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e3a5f', fontSize: 20, marginBottom: 20 }}>🎯 Find Your Tech Package</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Independence Level</label>
              <select value={independence} onChange={(e) => setIndependence(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select level...</option>
                {independenceLevels.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Family Monitoring Needs</label>
              <select value={monitoring} onChange={(e) => setMonitoring(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select monitoring need...</option>
                {monitoringNeeds.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {pkg && (
            <div>
              <div style={{ background: '#f8fafc', border: '2px solid #7c3aed', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 12, color: '#1e3a5f' }}>{pkg.name}</div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Included Devices:</div>
                  {pkg.devices.map((d, i) => (
                    <div key={i} style={{ color: '#475569', fontSize: 14, marginBottom: 4 }}>• {d}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                  <div style={{ background: '#ede9fe', borderRadius: 8, padding: '8px 16px' }}>
                    <div style={{ color: '#7c3aed', fontWeight: 800 }}>{pkg.upfront}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>One-time hardware</div>
                  </div>
                  <div style={{ background: '#ede9fe', borderRadius: 8, padding: '8px 16px' }}>
                    <div style={{ color: '#7c3aed', fontWeight: 800 }}>{pkg.monthlyCost}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>Monthly subscriptions</div>
                  </div>
                </div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Key Benefits:</div>
                {pkg.highlights.map((h, i) => (
                  <div key={i} style={{ color: '#475569', fontSize: 13, marginBottom: 4 }}>✅ {h}</div>
                ))}
              </div>
              <button style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Get Smart Home Setup Help from DFW Installer →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
