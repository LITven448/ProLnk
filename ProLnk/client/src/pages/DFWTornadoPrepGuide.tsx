import { useState } from 'react';

const riskData: Record<string, Record<string, { level: string; color: string; actions: string[]; cost: string }>> = {
  'single-family': {
    'yes-safe-room': { level: 'LOW', color: '#22c55e', actions: ['Go to safe room immediately when warning issued', 'Keep emergency kit stocked inside safe room', 'Practice tornado drills twice yearly', 'Sign up for DFW Wireless Emergency Alerts'], cost: 'Safe room already installed — $0 additional cost' },
    'interior-only': { level: 'MODERATE', color: '#f59e0b', actions: ['Identify lowest interior room away from windows', 'Cover yourself with mattress or heavy blankets', 'Helmet recommended for head protection', 'Consider adding safe room: $3,000–$10,000'], cost: 'Safe room addition: $3,000–$10,000 installed' },
    'no-shelter': { level: 'HIGH', color: '#ef4444', actions: ['Shelter in lowest interior room immediately', 'Never shelter in garage — doors fail in high winds', 'Avoid windows and exterior walls at all costs', 'FEMA safe room grant may cover up to 75% of cost'], cost: 'Safe room FEMA grant eligible — net cost $750–$2,500′ },
  },
  'mobile-home': {
    'yes-safe-room': { level: 'MODERATE', color: '#f59e0b', actions: ['Leave mobile home BEFORE tornado warning — go to safe room', 'Never shelter inside mobile home during warning', 'Identify community shelter location', 'Register for CodeRED DFW emergency notifications'], cost: 'Community shelter access: free' },
    'interior-only': { level: 'CRITICAL', color: '#dc2626', actions: ['EVACUATE IMMEDIATELY when watch is issued — do not wait for warning', 'Mobile homes are the most dangerous structure in a tornado', 'Go to nearest sturdy building or designated shelter', 'No interior room is safe in a mobile home'], cost: 'Nearest community shelter: free to use' },
    'no-shelter': { level: 'CRITICAL', color: '#dc2626', actions: ['LEAVE NOW when tornado watch is issued', 'Drive perpendicular to storm path if time allows', 'Lie flat in lowest ground away from trees and cars', 'Register with community for shelter alerts immediately'], cost: 'Evacuation plan: free — your life depends on it' },
  },
  'apartment': {
    'yes-safe-room': { level: 'LOW-MODERATE', color: '#3b82f6', actions: ['Use building safe room — know its exact location', 'Go to lowest floor, interior hallway if no safe room', 'Avoid upper floors during tornado warning', 'Know your building evacuation plan'], cost: 'Building safe room: included in rent' },
    'interior-only': { level: 'MODERATE', color: '#f59e0b', actions: ['Move to lowest floor interior hallway immediately', 'Stay away from windows and sliding glass doors', 'Cover head with arms — bring helmet if possible', 'Know your building emergency procedures'], cost: 'Personal emergency kit: $50–$150′ },
    'no-shelter': { level: 'HIGH', color: '#ef4444', actions: ['Get to lowest floor interior hallway immediately', 'Bathtub with mattress over you is last resort', 'Contact building management about shelter plans', 'Download DFW Emergency app for real-time alerts'], cost: 'DFW Emergency app: free' },
  },
};

export default function DFWTornadoPrepGuide() {
  const [homeType, setHomeType] = useState('');
  const [shelterStatus, setShelterStatus] = useState('');
  const [result, setResult] = useState<null | { level: string; color: string; actions: string[]; cost: string }>(null);

  function assess() {
    if (homeType && shelterStatus) {
      setResult(riskData[homeType]?.[shelterStatus] ?? null);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌪️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Tornado Prep Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>North Texas sits in Tornado Alley — preparation saves lives</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚠️ DFW Tornado Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['📍 Location Risk', 'DFW sits at the convergence of Gulf moisture and cold fronts — prime tornado conditions April–June'], ['🏘️ Mobile Home Danger', 'Most tornado deaths in DFW occur in mobile homes — they offer zero protection from EF2+ winds'], ['📱 Alert Systems', 'Wireless Emergency Alerts (WEA) are automatic — also register for CodeRED and DFW Emergency app'], ['⏱️ Warning Time', 'Average warning lead time is 13 minutes — know your plan BEFORE the storm']].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 6, color: '#F5E642′ }}>{title}</div>
                <div style={{ fontSize: 14, color: '#94a3b8′ }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🎒 72-Hour Emergency Kit</h2>
          {[['💧 Water', '1 gallon per person per day × 3 days'], ['🥫 Food', 'Non-perishable 3-day supply + manual can opener'], ['🔋 Power', 'Flashlights, batteries, portable phone charger'], ['📋 Documents', 'Copies of insurance, IDs, medications in waterproof bag'], ['🐾 Pets', 'Food, leash, carrier, vet records, medications'], ['🩹 First Aid', 'Full kit + prescription medications (7-day supply)']].map(([icon, text]) => (
            <div key={icon as string} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: '#cbd5e1′ }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Your Risk Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select home type...</option>
              <option value="single-family">Single-Family Home</option>
              <option value="mobile-home">Mobile / Manufactured Home</option>
              <option value="apartment">Apartment / Condo</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Storm Shelter Status</label>
            <select value={shelterStatus} onChange={e => setShelterStatus(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select shelter status...</option>
              <option value="yes-safe-room">I have a dedicated safe room / storm shelter</option>
              <option value="interior-only">Interior room only (closet, hallway, bathroom)</option>
              <option value="no-shelter">No identified shelter plan</option>
            </select>
          </div>
          <button onClick={assess} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Assess My Risk →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: result.color, marginBottom: 12 }}>Risk Level: {result.level}</div>
              <div style={{ marginBottom: 16 }}>
                {result.actions.map((a, i) => <div key={i} style={{ padding: '6px 0', color: '#cbd5e1', borderBottom: '1px solid #1e3a5f' }}>✓ {a}</div>)}
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 12, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📞 DFW Emergency Contacts</h2>
          {[['🚨 Tornado Emergency', '911'], ['📱 CodeRED DFW', 'Register at dfwema.org'], ['🏠 FEMA Safe Room Grants', '1-800-621-3362'], ['🌡️ NWS Fort Worth', 'weather.gov/fwd']].map(([label, val]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #0A1628', color: '#cbd5e1', fontSize: 14 }}>
              <span>{label}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
