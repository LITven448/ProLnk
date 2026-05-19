import { useState } from 'react';

const mediaTypes = [
  {
    label: '📰 Print / Online News',
    kit: 'Press Kit: Company fact sheet, founder bio, DFW launch stats, high-res logo pack',
    contact: 'press@prolnk.io',
  },
  {
    label: '📺 TV / Broadcast',
    kit: 'Press Kit: B-roll footage request, executive interview availability, platform demo video link',
    contact: 'press@prolnk.io',
  },
  {
    label: '🎙️ Podcast / Audio',
    kit: 'Press Kit: Founder talking points, mission soundbites, show notes template, headshot pack',
    contact: 'press@prolnk.io',
  },
  {
    label: '📱 Social / Digital',
    kit: 'Press Kit: Social media assets, launch graphics, stat cards, shareable milestone images',
    contact: 'press@prolnk.io',
  },
];

const milestones = [
  { icon: '🗓️', label: 'May 2026', event: 'DFW Waitlist Opens — 500 homeowner spots, 25 Charter pro spots' },
  { icon: '🏠', label: 'Target: Q2 2026', event: '5,000 homes registered in Home Health Vault' },
  { icon: '💰', label: 'Seed Round', event: 'Raising seed capital to fund DFW go-live and Texas statewide expansion' },
  { icon: '🚀', label: 'Q3 2026', event: 'Full platform launch — live matching, payments, AI agent activation' },
];

export default function ProLnkPressPage() {
  const [mediaIdx, setMediaIdx] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [outlet, setOutlet] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📢</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>ProLnk in the News</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>DFW\'s home services marketplace is launching. Here\'s the story.</p>
        </div>

        <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Key Milestones</h2>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: i < milestones.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.label}</div>
                <div style={{ color: '#cbd5e1', fontSize: 14 }}>{m.event}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>What type of media are you?</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          {mediaTypes.map((m, i) => (
            <button key={i} onClick={() => setMediaIdx(mediaIdx === i ? null : i)} style={{ background: mediaIdx === i ? '#F5E642′ : '#132040', color: mediaIdx === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
              {m.label}
            </button>
          ))}
        </div>

        {mediaIdx !== null && (
          <div style={{ background: '#132040', border: '1px solid #F5E642', borderRadius: 14, padding: 24, marginBottom: 32 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 16 }}>📦 {mediaTypes[mediaIdx].kit}</p>
            {!formSubmitted ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <input value={outlet} onChange={e => setOutlet(e.target.value)} placeholder='Your outlet name...' style={{ flex: 1, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 14 }} />
                <button onClick={() => setFormSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>Request Kit</button>
              </div>
            ) : (
              <div style={{ color: '#F5E642', fontWeight: 600 }}>✅ Press kit request received! We\'ll reply within 24 hours at {mediaTypes[mediaIdx].contact}</div>
            )}
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Press Contact</h3>
          <p style={{ color: '#0A1628', marginBottom: 4 }}>For all media inquiries, interviews, and press assets:</p>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>📧 press@prolnk.io</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 8 }}>Response within 24 hours guaranteed</p>
        </div>
      </div>
    </div>
  );
}