import { useState } from 'react';

const communities = [
  { id: 'neighborhood', label: 'My Neighborhood', emoji: '🏘️', share: 'Start a simple group text or Nextdoor post: I just learned the average DFW HVAC filter should be changed every 3 to 4 weeks in summer. Worth checking yours if you have not. Your neighbors will thank you — and many will ask what else you know.' },
  { id: 'hoa', label: 'My HOA', emoji: '📋', share: 'Bring it to the next HOA meeting: propose a group tune-up discount negotiated with a ProLnk-vetted contractor. HOAs that do this save members an average of $140 per home annually.' },
  { id: 'family', label: 'Family & Friends', emoji: '👨‍👩‍👧', share: 'Send a voice note or text to family members who own homes in DFW. Tell them one thing: change your filter before June 1 or you will pay 20% more to cool your house all summer. That one tip is worth $200 to $400 per household.' },
  { id: 'social', label: 'Social Media', emoji: '📱', share: 'Post something simple: Being a DFW homeowner in a 100-degree climate means understanding your HVAC. I finally do. ProLnk helped. Tag them and mention your zip code — they are building coverage in your area.' },
];

export default function DFWHVACDFWPride() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = communities.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>⭐</div>
          <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#F5E642', marginBottom: '16px', lineHeight: 1.2 }}>
            DFW HVAC Pride
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Most homeowners in America ignore their HVAC until it fails. DFW homeowners cannot afford that luxury — 110-degree days make that clear fast. You chose to understand your system. That is something to be proud of.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '16px', padding: '28px', marginBottom: '36px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F5E642', marginBottom: '16px' }}>Why DFW Demands It</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { stat: '100+', desc: 'Days per year above 90°F in DFW' },
              { stat: '4,800+', desc: 'HVAC cooling hours annually' },
              { stat: '$280', desc: 'Avg monthly summer electric bill' },
              { stat: '40%', desc: 'Of that bill is HVAC alone' },
            ].map(item => (
              <div key={item.stat} style={{ backgroundColor: '#0A1628', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', marginBottom: '4px' }}>{item.stat}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '16px', padding: '28px', marginBottom: '36px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>What You Now Have</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['The vocabulary to talk to contractors as a peer, not a target', 'The benchmarks to know when a quote is fair and when it is not', 'The seasonal calendar to prevent problems before they happen', 'The ProLnk network to access vetted pros without the guesswork'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#F5E642', fontSize: '18px', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
            Share it with your community
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '20px', fontSize: '15px' }}>DFW knowledge helps everyone. Select your community to see how to share it.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {communities.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                style={{
                  backgroundColor: selected === c.id ? '#F5E642' : '#0f2040',
                  color: selected === c.id ? '#0A1628' : '#fff',
                  border: `2px solid ${selected === c.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '22px', display: 'block', marginBottom: '6px' }}>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {chosen && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '28px', border: '2px solid #F5E642', marginBottom: '36px' }}>
            <p style={{ fontSize: '14px', color: '#F5E642', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>How to share with {chosen.label}</p>
            <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>{chosen.share}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#F5E642', borderRadius: '14px', padding: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Bring your community with you</p>
          <p style={{ fontSize: '15px', color: '#0A1628', marginBottom: '16px' }}>ProLnk rewards homeowners who refer neighbors. Everyone saves. Everyone benefits.</p>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', borderRadius: '8px', padding: '14px 28px', display: 'inline-block', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
            Join ProLnk With Your Neighbors →
          </div>
        </div>
      </div>
    </div>
  );
}
