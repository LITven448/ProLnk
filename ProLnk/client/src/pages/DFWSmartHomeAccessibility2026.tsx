import { useState } from 'react';

const needs = [
  {
    need: 'Limited Mobility',
    icon: '♿',
    solutions: [
      { device: 'Smart Lighting', detail: 'Motion-activated and voice-controlled lights eliminate the need to flip switches. Works with Alexa, Google Home, or Apple HomeKit.' },
      { device: 'Smart Thermostat', detail: 'Control temperature via voice or app. No more reaching for wall controls. Nest and Ecobee are top picks for DFW homes.' },
      { device: 'Smart Door Locks', detail: 'Unlock doors via app or voice. Keypad entry eliminates fumbling with keys. August and Schlage are popular options.' },
    ]
  },
  {
    need: 'Fall Detection',
    icon: '🚨',
    solutions: [
      { device: 'Medical Alert System', detail: 'Wearable button (pendant or watch) that calls for help when pressed or detects a fall. ADT, Life Alert, and Bay Alarm Medical serve DFW.' },
      { device: 'Smart Sensors', detail: 'Door and motion sensors can detect unusual inactivity and alert family members. Works as a passive monitoring layer.' },
      { device: 'Video Monitoring', detail: 'Indoor cameras (with consent) allow family to check in. Ring and Arlo offer privacy-focused options.' },
    ]
  },
  {
    need: 'Vision or Hearing',
    icon: '👁️',
    solutions: [
      { device: 'Video Doorbell', detail: 'See who is at the door from any device — no need to get up. Ring Video Doorbell is the most popular in DFW.' },
      { device: 'Smart Smoke / CO Detectors', detail: 'Strobe-light alerts for hearing-impaired residents. Nest Protect sends phone alerts and has voice announcements.' },
      { device: 'Voice Assistant Hub', detail: 'Amazon Echo or Google Nest can read messages, play media, set reminders, and make calls — all hands-free.' },
    ]
  },
  {
    need: 'Medication Management',
    icon: '💊',
    solutions: [
      { device: 'Smart Medication Dispenser', detail: 'Automated dispensers release correct doses at set times and alert caregivers if doses are missed. Hero and Livi are popular brands.' },
      { device: 'Voice Reminders', detail: 'Amazon Echo or Google Nest can be programmed to announce medication times. Simple, low-cost solution.' },
      { device: 'App-Based Tracking', detail: 'Caregivers can monitor adherence remotely via connected apps. Some systems call the resident directly.' },
    ]
  },
];

export default function DFWSmartHomeAccessibility2026() {
  const [needIdx, setNeedIdx] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: 4, fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          DFW GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏠 Smart Home for Accessibility — DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Voice-controlled lights, smart locks, fall detection, and medication reminders can dramatically improve independence for mobility-limited homeowners. ProLnk connects you with smart home installers across DFW.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ label: 'Typical Install Cost', value: '$500–$3K', icon: '💰' }, { label: 'Setup Time', value: '1 Day', icon: '⚡' }, { label: 'Voice Platforms', value: '3 Major', icon: '🎙️' }, { label: 'Falls Prevented', value: 'Up to 40%', icon: '🛡️' }].map(s => (
            <div key={s.label} style={{ background: '#132036', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>What is your primary accessibility need?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {needs.map((n, i) => (
            <button key={i} onClick={() => setNeedIdx(i === needIdx ? null : i)}
              style={{ background: needIdx === i ? '#F5E642′ : '#132036', color: needIdx === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '1rem', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{n.icon}</div>
              {n.need}
            </button>
          ))}
        </div>

        {needIdx !== null && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Recommended Solutions: {needs[needIdx].need}</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {needs[needIdx].solutions.map((s, i) => (
                <div key={i} style={{ background: '#132036', borderRadius: 10, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{s.device}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{s.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#132036', borderRadius: 10, padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Get a Smart Home Accessibility Quote</h3>
          <p style={{ color: '#94A3B8', marginBottom: '1rem', fontSize: 14 }}>ProLnk matches you with smart home installers who specialize in accessibility setups for DFW homeowners.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Smart Home Accessibility Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}