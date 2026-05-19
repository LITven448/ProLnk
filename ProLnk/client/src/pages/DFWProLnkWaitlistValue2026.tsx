import { useState } from 'react';

const stakeholders = [
  { id: 'homeowner', label: '🏠 I am a DFW Homeowner', guide: ['Early access to Charter pros: first 500 verified professionals in DFW’s top trades', 'Priority matching when ProLnk goes live — waitlist homeowners matched before general public', 'Health Vault beta access: secure digital record of your home’s mechanical and structural history', 'Charter homeowners get 3 free quote matches at launch — standard is pay-per-quote', 'No commitment required — join waitlist free, decide when matching goes live' ]},
  { id: 'pro', label: '🔧 I am a DFW Pro', guide: ['Charter rate locked forever at $149/mo — Founding tier (next tier) opens at $199/mo permanently', 'First match queue access at launch: Charter pros receive leads before Founding and later tiers', 'Network income starts Day 1: 12% direct commission, 4-level override on your recruited pros', 'Charter pros earn 7% subscription override on pros they recruit (Founding earns 4%)', 'Origination rights: help a homeowner add their home to Vault and earn permanent revenue share' ]},
  { id: 'both', label: '🤝 I am both a homeowner and a pro', guide: ['Dual registration is encouraged — use both the homeowner portal and pro portal', 'As homeowner: priority matching + Health Vault beta access', 'As pro: Charter rate locked, first lead queue, full 5-stream network income from Day 1', 'Your home’s Vault entry is automatically generated — adds credibility to your pro profile', 'Charter pros who are also homeowners are the most trusted on the platform' ]},
  { id: 'investor', label: '💼 I am considering investing', guide: ['Waitlist validates demand before seed round — current waitlist data shared in pitch deck', 'Charter tier scarcity creates urgency: 500 pro limit approaching, natural conversion pressure', 'Unit economics at 1,000 pros: $379K/mo revenue, 85% net margin', 'Health Vault creates a permanent data moat — 50M+ homes, structural + history data', 'Reach out directly: andrew@lit-ventures.com for deck and financials' ]},
];

export default function DFWProLnkWaitlistValue2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📋</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.5rem' }}>ProLnk Waitlist Value Guide 2026</h1>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.95rem' }}>What joining the ProLnk waitlist actually gets you — DFW launch edition.</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>👤 Who are you?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {stakeholders.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1A2A45', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #2A3A55'), borderRadius: 8, padding: '0.75rem', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>📋 Your Waitlist Value Guide</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.guide.map((tip, i) => (
                <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.5, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#0A1628', fontWeight: 700, fontSize: '0.95rem' }}>
            🚀 Join the ProLnk DFW Waitlist — Free, No Commitment
          </p>
          <p style={{ margin: '0.5rem 0 0', color: '#1A2A45', fontSize: '0.85rem' }}>prolnk.io · Charter spots filling fast</p>
        </div>
      </div>
    </div>
  );
}