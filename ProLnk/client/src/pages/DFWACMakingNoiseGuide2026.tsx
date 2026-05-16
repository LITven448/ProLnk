import { useState } from 'react';

const noises = [
  { id: 'banging', label: '💥 Banging / Thumping', cause: 'Loose or broken part inside blower or compressor', urgency: '🚨 Emergency — turn off unit immediately. Loose parts can destroy compressor ($1,500+ repair).' },
  { id: 'squealing', label: '😬 Squealing / Screeching', cause: 'Worn fan belt (older units) or failing blower motor bearing', urgency: '⚠️ Urgent — schedule same week. Unit will stop cooling when motor fails.' },
  { id: 'clicking', label: '🖱️ Clicking (constant)', cause: 'Relay switch or control board issue — startup/shutdown clicks are normal; constant is not', urgency: '⚠️ Schedule within a week — electrical relay failure can prevent startup.' },
  { id: 'hissing', label: '🐍 Hissing / Bubbling', cause: 'Refrigerant leak or high internal pressure (dangerous)', urgency: '🚨 Emergency — turn off and call a pro. Refrigerant leaks are health and fire hazards.' },
  { id: 'rattling', label: '🪨 Rattling / Clanking', cause: 'Debris in outdoor unit (sticks, leaves) or loose panel screws', urgency: '✅ DIY first — clear debris from outdoor unit, tighten panels. If continues, call a tech.' },
];

export default function DFWACMakingNoiseGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = noises.find(n => n.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>🔊 DFW AC Strange Noise Guide — 2026</h1>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>Different sounds mean different problems. Some need immediate shutdown — know which is which.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🎵 What noise are you hearing?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {noises.map(n => (
              <button key={n.id} onClick={() => setSelected(n.id === selected ? null : n.id)}
                style={{ background: selected === n.id ? '#F5E642' : '#1e3a5f', color: selected === n.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '14px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                {n.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ marginTop: 20, background: '#0d1f3c', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔧 Likely Cause</div>
                <div style={{ color: '#cdd9e5' }}>{active.cause}</div>
              </div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⏱️ Urgency</div>
                <div style={{ color: '#fff', fontSize: 15, lineHeight: 1.6 }}>{active.urgency}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📋 DFW HVAC Noise Cheat Sheet</h2>
          <div style={{ overflowX: 'auto' }}>
            {noises.map(n => (
              <div key={n.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700 }}>{n.label}</div>
                <div style={{ color: '#cdd9e5', fontSize: 13 }}>{n.cause}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🚨 Always Turn Off If You Hear</h2>
          {['Loud banging or thumping', 'Hissing with chemical smell', 'Metal scraping on metal', 'Electrical burning smell'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#ff6b6b', fontWeight: 600 }}>🛑 {item}</div>
          ))}
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>ProLnk — DFW HVAC pros matched to you in minutes.</div>
          </div>
        </div>
      </div>
    </div>
  );
}