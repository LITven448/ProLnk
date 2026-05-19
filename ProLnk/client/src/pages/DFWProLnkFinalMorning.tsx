import { useState } from 'react';

const personas = [
  {
    id: 'homeowner',
    label: 'DFW Homeowner',
    icon: '🏠',
    message: 'Good morning. Your home is the most valuable thing you own — and this morning, a team of pros is ready to help you protect it. ProLnk was built for DFW homeowners who are tired of chasing contractors, getting ghosted on quotes, or paying mystery prices. We built 3,100+ pages of North Texas home knowledge overnight so that when you need an HVAC tech, a plumber, or an electrician, you get someone vetted, priced fairly, and accountable. Your waitlist spot is open. The next chapter of DFW home services starts today.',
  },
  {
    id: 'pro',
    label: 'DFW Home Service Pro',
    icon: '🔧',
    message: 'Good morning. You\’ve spent years building your skills and your reputation — and you\’ve done it without the platform that matches those skills to the homeowners who actually need you. ProLnk changes that. No more slow seasons hunting for leads. No more paying per-lead fees for tire-kickers. ProLnk sends you qualified DFW homeowners who need exactly what you do, in your service area, ready to hire. Charter Pro spots are available. The Network Income System means you earn not just from jobs — but from building the network around you.',
  },
  {
    id: 'investor',
    label: 'Investor / Partner',
    icon: '📈',
    message: 'Good morning. By the time you read this, ProLnk has built 3,100+ pages of DFW market knowledge, a 130-table database, 47 AI agents, and a two-sided marketplace serving 7.8 million North Texans. The unit economics: 85% net margin at 1,000 active pros, break-even at 500. The moat: Home Health Vault data on 50M+ homes, a 5-stream network income system with switching costs that compound, and an AI feedback loop that improves match quality every day. The seed round is open. DFW is the beachhead. The national rollout follows.',
  },
  {
    id: 'scout',
    label: 'ProLnk Scout / Networker',
    icon: '🌐',
    message: 'Good morning, Scout. You see the opportunity before most people do — and that\’s exactly why the Network Income System was built for you. Every pro you bring onto ProLnk earns you a lifetime override on their subscription and their job commissions. Every homeowner you introduce earns you a per-lead fee. Four levels deep, the cascade compounds. Charter Scouts who move this week lock in the highest rate tiers. The DFW home services market is $4.2B/yr. Your piece of it starts with a conversation.',
  },
];

export default function DFWProLnkFinalMorning() {
  const [persona, setPersona] = useState('');
  const match = personas.find(p => p.id === persona);

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', color: '#1A1A2E', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌅</div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#0A1628', marginBottom: 8 }}>May 16, 2026 — DFW, Texas</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', margin: '0 0 12px', lineHeight: 1.2 }}>
            Good Morning from ProLnk
          </h1>
          <p style={{ color: '#5A6A7A', fontSize: 17, margin: '0 auto', maxWidth: 560, lineHeight: 1.7 }}>
            As the sun rises over North Texas this morning, 3,100+ pages of home services knowledge — built overnight — are ready to serve DFW homeowners, pros, and partners. This is the invitation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { num: '3,100+', label: 'Pages of DFW knowledge built' },
            { num: '47', label: 'AI agents operational' },
            { num: '130+', label: 'Database tables ready' },
            { num: '7.8M', label: 'North Texans we serve' },
          ].map(stat => (
            <div key={stat.num} style={{ background: '#FFFFFF', border: '2px solid #E8EDF5', borderRadius: 12, padding: 20, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>{stat.num}</div>
              <div style={{ color: '#5A6A7A', fontSize: 14 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', border: '2px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 32, boxShadow: '0 4px 16px rgba(245,230,66,0.15)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#0A1628', marginBottom: 16 }}>Who are you this morning?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
            {personas.map(p => (
              <button key={p.id} onClick={() => setPersona(p.id)} style={{ background: persona === p.id ? '#0A1628′ : '#F8F9FA', color: persona === p.id ? '#F5E642' : '#0A1628', border: persona === p.id ? '2px solid #0A1628' : '2px solid #E8EDF5', borderRadius: 10, padding: '14px 12px', cursor: ’pointer', fontWeight: persona === p.id ? 700 : 500, fontSize: 14, textAlign: 'center', transition: 'all 0.15s' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{p.icon}</div>
                {p.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{match.icon}</div>
              <div style={{ color: '#C8D8E8', fontSize: 15, lineHeight: 1.8 }}>{match.message}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔗</div>
          <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 20, marginBottom: 8 }}>ProLnk is open for DFW.</div>
          <div style={{ color: '#8FA3BF', fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            Join the waitlist. Lock your spot. Be part of the network that changes how North Texas handles home services — starting today.
          </div>
        </div>
      </div>
    </div>
  );
}
