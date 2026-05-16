import { useState } from 'react';

const milestones = [
  { id: 'first10', label: '🔟 First 10 Matches', recognition: 'Digital milestone badge + welcome to the Builder tier', next: 'Recruit your first 5 partners to unlock network income streams', income: 'Unlocks Builder-tier commission rates and leaderboard eligibility' },
  { id: 'first5partners', label: '👥 First 5 Partners Recruited', recognition: 'Network Builder badge + featured in DFW weekly newsletter', next: 'Focus on activating your partners — get them to their first match', income: 'Each active partner generates 1–4% override on their earnings' },
  { id: 'first25homes', label: '🏠 25 Homes Added to Vault', recognition: 'Vault Pioneer badge + mention at monthly DFW partner call', next: 'Keep adding homes — origination rights are permanent and compound', income: 'Origination rights = recurring share of platform fees on every home' },
  { id: 'charter', label: '⭐ Charter Partner Status', recognition: 'Named Charter Partner + exclusive Charter annual event invite', next: 'Mentor newer partners — their success drives your network income', income: 'Charter tier locked at $149/mo forever; highest commission rates activate' },
  { id: 'champion', label: '🏆 Champion Tier Reached', recognition: 'Champion award + DFW annual recognition ceremony', next: 'Sustain your network — coach Connectors to reach Champion with you', income: '$8,000–$25,000+/mo from all 5 income streams combined' },
  { id: 'annual', label: '🎖 Annual DFW Top Partner', recognition: 'Annual award + profile featured on ProLnk DFW homepage', next: 'Set the example — your results become the proof for your team', income: 'Bonus pool distribution + highest lead routing priority in DFW' },
];

export default function DFWProLnkRecognitionGuide() {
  const [selected, setSelected] = useState(milestones[0]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🎖</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '0.5rem 0 0' }}>Partner Recognition Program</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>How ProLnk celebrates DFW partner milestones — and what each one means for your income</p>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1rem' }}>Select a Milestone</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {milestones.map(m => (
              <button key={m.id} onClick={() => setSelected(m)} style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: 6, border: `2px solid ${selected.id === m.id ? '#F5E642' : '#1E3A5F'}`, backgroundColor: selected.id === m.id ? '#1E3A5F' : 'transparent', color: selected.id === m.id ? '#F5E642' : '#CBD5E1', cursor: 'pointer', fontSize: '0.9rem' }}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🎉 Recognition You Receive</div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{selected.recognition}</div>
          </div>
          <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💰 Income Impact</div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{selected.income}</div>
          </div>
          <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>➡️ What Comes Next</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{selected.next}</div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700 }}>📅 Recognition Events</div>
          <div style={{ color: '#94A3B8', marginTop: '0.5rem', lineHeight: 1.6 }}>Charter Partners are invited to exclusive quarterly DFW gatherings. Champion-tier partners attend the annual recognition ceremony. All partners receive milestone badges displayed on their ProLnk profile.</div>
        </div>
      </div>
    </div>
  );
}
