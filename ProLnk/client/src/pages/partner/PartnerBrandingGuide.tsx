import { useState } from 'react';

const pillars = [
  { icon: '🤝', title: 'Trusted Local Expert', desc: 'You are not a salesperson — you are a community connector who happens to know about ProLnk.' },
  { icon: '📖', title: 'Personal Story Framework', desc: 'Why you joined, what problem it solves, one specific win, and your vision for your local market.' },
  { icon: '📱', title: 'Social Media Presence', desc: 'One post per week: a local project, a homeowner tip, or a behind-the-scenes look at your trade.' },
  { icon: '🌐', title: 'Community Integration', desc: 'Nextdoor, local Facebook groups, and neighborhood associations are higher-ROI than cold social ads.' },
];

const contentIdeas = [
  '"5 things every DFW homeowner should check this summer" — positions you as a helpful expert.',
  '"I joined ProLnk because..." — authentic personal story builds curiosity and trust.',
  '"Behind the scenes of a [your trade] job in [your neighborhood]" — shows real work and expertise.',
  '"Why I recommend getting 3 quotes before hiring any contractor" — demonstrates integrity.',
  '"What I wish I knew before my first home repair" — resonates with new homeowners.',
];

const backgroundMap: Record<string, string> = {
  contractor: 'Position yourself as "the contractor who figured out a better way to find great homeowners." Your credibility is built-in — lean into 20+ years of hands-on experience.',
  homeowner: 'Position yourself as "a homeowner who was tired of bad service and found a solution." Your story is relatable to every DFW homeowner dealing with contractor frustrations.',
  agent: 'Position yourself as "a real estate agent who helps clients even after closing." ProLnk becomes an extension of your client care, not a side hustle.',
  other: 'Position yourself as "a community advocate who found a way to improve the local home services experience." Your outsider perspective is an asset.',
};

export default function PartnerBrandingGuide() {
  const [background, setBackground] = useState('');
  const [presence, setPresence] = useState('');

  const positioning = backgroundMap[background] || null;
  const contentScore = presence === 'high' ? 'Focus on LinkedIn and Nextdoor. Post 3x/week. Build a local "home tips" newsletter.'
    : presence === 'medium' ? 'Start with Nextdoor and Facebook Groups. Post 1x/week. Grow from there.'
    : presence === 'low' ? 'Start with personal text messages and referrals. Build your digital presence slowly alongside relationships.'
    : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>🎙️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>Your Personal Brand as a ProLnk Partner</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Be the trusted local expert first. ProLnk is the tool that backs your reputation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{p.title}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>✍️ DFW Content Ideas That Build Trust</h3>
          {contentIdeas.map((idea, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontWeight: 700 }}>
                {i + 1}
              </span>
              <span style={{ color: '#374151', fontSize: 14 }}>{idea}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>🧭 Your Brand Positioning Statement</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Your Background</label>
              <select value={background} onChange={e => setBackground(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628' }}>
                <option value=''>Select background...</option>
                <option value='contractor'>Contractor / Trade Pro</option>
                <option value='homeowner'>Homeowner</option>
                <option value='agent'>Real Estate Agent</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Local Online Presence</label>
              <select value={presence} onChange={e => setPresence(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, color: '#0A1628' }}>
                <option value=''>Select level...</option>
                <option value='high'>High — active on social already</option>
                <option value='medium'>Medium — some followers, occasional posts</option>
                <option value='low'>Low — prefer in-person relationships</option>
              </select>
            </div>
          </div>
          {(positioning || contentScore) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {positioning && (
                <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F5E642', padding: '14px 18px', borderRadius: 8 }}>
                  <p style={{ color: '#92400E', margin: 0, fontWeight: 600, fontSize: 14 }}>🎯 {positioning}</p>
                </div>
              )}
              {contentScore && (
                <div style={{ background: '#F0FDF4', borderLeft: '4px solid #22C55E', padding: '14px 18px', borderRadius: 8 }}>
                  <p style={{ color: '#166534', margin: 0, fontWeight: 500, fontSize: 14 }}>📱 {contentScore}</p>
                </div>
              )}
            </div>
          )}
          {(!background && !presence) && (
            <p style={{ color: '#94A3B8', margin: 0 }}>Select your background and online presence to get your personalized brand strategy.</p>
          )}
        </div>
      </div>
    </div>
  );
}
