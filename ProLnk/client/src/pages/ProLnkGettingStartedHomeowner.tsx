import { useState } from 'react';

const steps = [
  { icon: '🏠', title: 'Create Your Account', desc: 'Sign up with your name, email, and home address. Takes under 2 minutes.' },
  { icon: '🔐', title: 'Add Your Home to Vault', desc: 'Enter your home details — age, size, HVAC, roof, plumbing. This powers smarter matches.' },
  { icon: '🔧', title: 'Describe Your Service Need', desc: 'Select the trade, describe the issue, upload a photo if helpful.' },
  { icon: '⚡', title: 'Receive Match Within 4 Hours', desc: 'ProLnk AI matches you with 2-3 vetted pros in your area who specialize in your need.' },
  { icon: '✅', title: 'Approve Quote and Schedule', desc: 'Review pro profiles, compare quotes, pick your preferred time slot.' },
  { icon: '📋', title: 'Job Done + Recorded in Vault', desc: 'After job completion, the work is logged in your Home Health Vault permanently.' },
];

const urgencyMap: Record<string, string> = {
  Emergency: 'Match in under 1 hour — 24/7 emergency pro pool',
  'Within 24 Hours': 'Match guaranteed within 4 hours',
  'This Week': 'Match within 24 hours, flexible scheduling',
  'No Rush': 'Match within 48 hours — best value pricing',
};

export default function ProLnkGettingStartedHomeowner() {
  const [urgency, setUrgency] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Getting Started as a Homeowner</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>From signup to first job — here is exactly what happens.</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: '#0F2035', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, minWidth: 44, textAlign: 'center' }}>{s.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>STEP {i + 1}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: '#8899AA', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⏱ How Urgent Is Your Service Need?</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.keys(urgencyMap).map(u => (
              <button key={u} onClick={() => setUrgency(u)} style={{
                background: urgency === u ? '#F5E642' : '#1A2F4A',
                color: urgency === u ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14
              }}>{u}</button>
            ))}
          </div>
          {urgency && (
            <div style={{ background: '#1A2F4A', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600 }}>
              📍 {urgencyMap[urgency]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}