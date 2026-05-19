import { useState } from 'react';

const events = [
  {
    id: 'chamber',
    label: '🏛️ Chamber of Commerce Mixer',
    pitch: '"I help licensed tradespeople in DFW build a second income stream through a new platform called ProLnk — it matches pros with homeowners who need quotes. I\’m looking for a few solid pros to be founding partners."',
    approach: 'Conversational networking — no table, no materials. Be curious about their business first.',
    materials: 'Business cards only. QR code to your sign-up page if asked.',
    starters: ['What kind of work does your company do?', 'Are you primarily residential or commercial?', 'Have you tried any lead services before?'],
    tip: 'Target: electricians, plumbers, HVAC, roofing. Skip: landscapers, cleaners (not in current ProLnk trade set).',
  },
  {
    id: 'homeexpo',
    label: '🏠 DFW Home & Garden Expo',
    pitch: '"ProLnk connects homeowners like you with vetted local pros. If you\’ve ever struggled to find a good plumber or contractor, this is built for you. Sign up free and get matched when you need someone."',
    approach: 'Set up a small display with a clear value prop for homeowners AND pros. Two separate pitches.',
    materials: 'Branded table cover, 1-page flyer, tablet for signups, small bowl of candy.',
    starters: ['Have you had trouble finding reliable contractors?', 'Are you a homeowner or a trade pro?', 'What projects are on your to-do list this year?'],
    tip: 'Best DFW venues: Kay Bailey Hutchison Convention Center, Plano Event Center, Frisco Hall of Fame. Check dfwhomeshow.com.',
  },
  {
    id: 'tradeshow',
    label: '🔧 Trade Association Fair',
    pitch: '"ProLnk is built for licensed pros who want more leads without the bidding war. Founding partners get locked rates and a revenue share on every partner they bring in. We have 500 spots total."',
    approach: 'Pro-focused pitch. Emphasize exclusivity, locked pricing, and network income. B2B framing.',
    materials: '1-page income overview sheet, QR code to partner landing page, pen for notes.',
    starters: ['What trade are you in?', 'How are you currently getting leads?', 'Have you heard of ProLnk?'],
    tip: 'Target events: PHCC (plumbing/HVAC), NECA (electricians), NRCA (roofing). Look for DFW chapter events quarterly.',
  },
  {
    id: 'hoa',
    label: '🏘️ HOA Annual Meeting',
    pitch: '"I wanted to mention a new service for homeowners in the area — ProLnk connects you with vetted local pros for home service quotes. It\’s free for homeowners and still in early access."',
    approach: 'Ask board permission first. Low-key, community-service framing. Not a sales pitch — an announcement.',
    materials: 'Flyer for the bulletin board, QR code, contact info for follow-up questions.',
    starters: ['Is there a neighborhood Facebook group I could share this in?', 'Would the board be open to including this in the newsletter?'],
    tip: 'Best time: after the formal agenda. Offer to be the neighborhood "go-to" for pro referrals.',
  },
];

export default function PartnerEventGuide() {
  const [selected, setSelected] = useState(events[0].id);
  const item = events.find(e => e.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📍</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: 0 }}>DFW Event Strategy Guide</h1>
          <p style={{ color: '#9CA3AF', margin: '8px 0 0', fontSize: 14 }}>In-person prospecting playbook for DFW ProLnk partners</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🗓️ Select Event Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {events.map(e => (
              <button key={e.id} onClick={() => setSelected(e.id)} style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === e.id ? '#F5E642' : '#E5E7EB', background: selected === e.id ? '#FEFCE8' : '#fff', color: '#0A1628', fontWeight: selected === e.id ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{e.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#fff', border: '2px solid #F5E642', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13, marginBottom: 8 }}>💬 Elevator Pitch</div>
            <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>"{item.pitch}"</div>
          </div>

          <div style={{ background: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: 13, marginBottom: 8 }}>🎯 Approach Strategy</div>
            <div style={{ color: '#15803D', fontSize: 14, lineHeight: 1.6 }}>{item.approach}</div>
          </div>

          <div style={{ background: '#EFF6FF', border: '2px solid #93C5FD', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#1D4ED8', fontSize: 13, marginBottom: 8 }}>🎒 Materials Needed</div>
            <div style={{ color: '#1E40AF', fontSize: 14, lineHeight: 1.6 }}>{item.materials}</div>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13, marginBottom: 10 }}>🗣️ Conversation Starters</div>
            {item.starters.map((s, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < item.starters.length - 1 ? '1px solid #F3F4F6' : 'none', color: '#374151', fontSize: 14 }}>"{s}"</div>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📌 DFW-Specific Tip</div>
            <div style={{ color: '#E5E7EB', fontSize: 14, lineHeight: 1.6 }}>{item.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
