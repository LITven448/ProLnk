import { useState } from 'react';

const profiles = [
  { size: 'Under 2,000 sq ft', concern: 'Package theft', icon: '📦', rec: 'Self-monitoring', system: 'Ring Video Doorbell Pro + Blink cameras', backup: 'Wi-Fi + cellular SIM backup ($5/mo)', note: 'DFW porch piracy highest in Collin & Tarrant counties — doorbell cam ROI is immediate' },
  { size: 'Under 2,000 sq ft', concern: 'Intruder/break-in', icon: '🚨', rec: 'Professional monitoring', system: 'Ring Alarm Pro + 24/7 monitoring ($20/mo)', backup: 'Built-in cellular via Eero router', note: 'Police response avg 8 min in DFW suburbs — pro monitoring adds 60-sec alert edge' },
  { size: '2,000–4,000 sq ft', concern: 'Package theft', icon: '📦', rec: 'Self-monitoring', system: 'Eufy 4-cam system + smart doorbell', backup: 'Dedicated cellular hub', note: 'Multi-angle coverage recommended for corner lots common in DFW Metroplex' },
  { size: '2,000–4,000 sq ft', concern: 'Fire/CO safety', icon: '🔥', rec: 'Professional monitoring', system: 'SimpliSafe + Smoke/CO sensors + pro monitoring', backup: 'Cellular-first (no Wi-Fi dependency)', note: 'ERCOT outages knocked out Wi-Fi in DFW — cellular backup is non-negotiable here' },
  { size: 'Over 4,000 sq ft', concern: 'Whole-property', icon: '🏰', rec: 'Professional monitoring', system: 'ADT Command + multi-zone cameras + cellular', backup: 'Dedicated LTE + battery backup', note: 'Larger DFW estates benefit from zone-based monitoring with professional response' },
];

export default function DFWHomeMonitoring2026() {
  const [size, setSize] = useState('');
  const [concern, setConcern] = useState('');
  const match = profiles.find(p => p.size === size && p.concern === concern);

  const sizes = [...new Set(profiles.map(p => p.size))];
  const concerns = [...new Set(profiles.map(p => p.concern))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🛡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Monitoring Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Self-monitor vs pro monitoring — what makes sense in DFW</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '📡', label: 'ERCOT outage risk', value: 'Cellular backup critical', sub: 'Feb 2021 & 2024 grid events' },
            { icon: '📦', label: 'Package theft rate', value: '#3 in US metros', sub: 'DFW suburban corridors' },
            { icon: '💰', label: 'Pro monitoring cost', value: '$10–$60/mo', sub: 'vs $0 self-monitor' },
            { icon: '🚒', label: 'Fire dept response', value: '4–7 min avg', sub: 'DFW metropolitan zones' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.value}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Find your monitoring match</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home size:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ background: size === s ? '#F5E642′ : '#1e3a5f', color: size === s ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '9px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Primary concern:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {concerns.map(c => (
                <button key={c} onClick={() => setConcern(c)} style={{ background: concern === c ? '#F5E642′ : '#1e3a5f', color: concern === c ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '9px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{match.icon} Recommendation: {match.rec}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>System: {match.system}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Backup: {match.backup}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>💡 {match.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>ProLnk connects DFW homeowners with vetted security installation pros</div>
          <div style={{ color: '#1a2f4a', fontSize: 13, marginTop: 4 }}>Licensed, insured — matched to your specific monitoring needs</div>
        </div>
      </div>
    </div>
  );
}
