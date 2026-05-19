import { useState } from 'react';

const team = [
  {
    name: 'Andrew Frakes',
    role: 'CEO & Co-Founder',
    emoji: '🏗️',
    background: 'Real estate investor and DFW homeowner who experienced firsthand the broken home services market. Built ProLnk to solve the problem he couldn\’t find a solution to.',
    serves: {
      homeowner: 'Andrew designed ProLnk from the homeowner\’s perspective — every feature exists because he wished it existed before his own bad contractor experiences.',
      contractor: 'Andrew understands what verified, quality-focused pros need: a lead pipeline that respects their work and pays fairly.',
      investor: 'Andrew brings operator-level clarity: unit economics, growth trajectory, and the mission behind every number.',
    },
  },
  {
    name: 'Technology Team',
    role: 'Platform & AI Architecture',
    emoji: '⚙️',
    background: 'Engineers with backgrounds in marketplace platforms, AI systems, and real estate tech. Built ProLnk\’s matching engine, Home Health Vault, and contractor verification infrastructure.',
    serves: {
      homeowner: 'The tech team built the transparency tools homeowners need — verified profiles, price benchmarks, and match quality scores.',
      contractor: 'AI-powered lead matching means contractors get qualified jobs, not tire-kickers. The system learns and improves with every match.',
      investor: 'The architecture is built to scale: one platform serving millions of homes and contractors without proportional cost growth.',
    },
  },
  {
    name: 'DFW Community Network',
    role: 'Local Market & Partnerships',
    emoji: '🤝',
    background: 'Boots on the ground across DFW — deep relationships with real estate professionals, trade associations, and community leaders who know the market from the inside.',
    serves: {
      homeowner: 'Local knowledge means better contractor recommendations — not just who\’s licensed, but who does great work in your specific neighborhood.',
      contractor: 'The network creates warm referral channels, not cold lead lists. Contractors who join through community trust convert better.',
      investor: 'DFW market penetration is faster when you have community roots. This team reduces customer acquisition cost significantly.',
    },
  },
];

const roles = ['homeowner', 'contractor', 'investor'] as const;
type Role = typeof roles[number];

const roleLabels: Record<Role, string> = { homeowner: '🏠 Homeowner', contractor: '🔧 Contractor', investor: '📈 Investor' };

export default function DFWProLnkTeamPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>👥</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            The ProLnk Team
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.6 }}>
            Built by people with real experience in real estate, technology, home services, and the DFW community — united by one mission.
          </p>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🎯 Who are you?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>Select your role to see how each team member's background serves you:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {roles.map(r => (
              <button key={r} onClick={() => setSelectedRole(selectedRole === r ? null : r)}
                style={{ background: selectedRole === r ? '#F5E642' : '#0A1628', color: selectedRole === r ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 10, padding: '12px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {roleLabels[r]}
              </button>
            ))}
          </div>
        </div>

        {team.map((member, i) => (
          <div key={i} style={{ background: '#132040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 36 }}>{member.emoji}</div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', margin: 0 }}>{member.name}</h3>
                <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: 14 }}>{member.role}</p>
              </div>
            </div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: selectedRole ? 16 : 0 }}>{member.background}</p>
            {selectedRole && (
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>How this serves you as a {selectedRole}:</p>
                <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{member.serves[selectedRole]}</p>
              </div>
            )}
          </div>
        ))}

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>The Shared Mission</h2>
          <p style={{ color: '#132040', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            Every team member joined ProLnk because they believe DFW homeowners deserve better. Join the waitlist and let the team go to work for you.
          </p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join the Waitlist →
          </button>
        </div>

      </div>
    </div>
  );
}
