import { useState } from 'react';

type Perspective = 'homeowner' | 'contractor' | 'partner';

const STORY: Record<Perspective, { title: string; paragraphs: string[] }> = {
  homeowner: {
    title: 'You hired the wrong contractor. Again.',
    paragraphs: [
      'You found someone on a directory. They had reviews — some you later realized were fake. They showed up late, gave you a price, then revised it twice. The job took three visits. You were never sure if the work was done right.',
      'That’s the DFW homeowner experience for 70% of service calls. Not because bad contractors dominate — but because bad contractors dominate advertising.',
      'ProLnk was built because the problem isn’t finding contractors. It’s knowing which ones you can trust. Every contractor in ProLnk is vetted before you ever see their name. The match is based on your job, your location, and their verified specialty — not who paid the most for an ad.',
      'The Home Health Vault stores the complete record of your home. Future contractors arrive knowing your system specs, past service history, and known issues. No more starting from scratch every time.',
    ],
  },
  contractor: {
    title: 'You do great work. Nobody knows you exist.',
    paragraphs: [
      'You’ve been doing this for 15 years. Your customers love you. Your repeat rate is high. But when a new homeowner searches DFW HVAC, they find the companies with the biggest ad budgets — not the best technicians.',
      'Lead generation platforms charge you -200 per lead regardless of outcome. You bid against five other contractors for the same homeowner. Half the leads ghost. The math doesn’t work.',
      'ProLnk inverts this. Instead of paying to be discovered, you are verified — and the platform brings you the homeowners your credentials match. You pay only when the match converts. No wasted spend. No bidding wars. Just work.',
      'Your reputation compounds. Every completed job updates your DFW score. In three years, that score is your moat — no new competitor can buy their way past it.',
    ],
  },
  partner: {
    title: 'You saw the opportunity before anyone else.',
    paragraphs: [
      'You know both sides of this market. You know the contractors who are great but invisible. You know the homeowners who are frustrated but don’t know where to look. You’ve been the informal bridge for years.',
      'ProLnk formalizes that bridge — and pays you permanently for building it. Every contractor you bring into the network generates income across four levels. Every home you originate generates income for the life of that home on the platform.',
      'The Charter rate locks your economics at the founding tier. As ProLnk scales from DFW to Texas to national, your income scales with it — at the rate you locked in on day one.',
      'You didn’t just join a platform. You built a position in the infrastructure of DFW home services.',
    ],
  },
};

export default function DFWProLnkOriginStory() {
  const [perspective, setPerspective] = useState<Perspective>('homeowner');

  const labels: Record<Perspective, string> = { homeowner: 'I’m a Homeowner', contractor: 'I’m a Contractor', partner: 'I’m a Partner' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📖</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>The ProLnk Origin Story</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>The DFW home services problem that made this necessary.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {(['homeowner', 'contractor', 'partner'] as Perspective[]).map(p => (
            <button key={p} onClick={() => setPerspective(p)}
              style={{ padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: perspective === p ? '#F5E642' : '#1e3a5f', color: perspective === p ? '#0A1628' : '#94a3b8' }}>
              {labels[p]}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 24px' }}>{STORY[perspective].title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {STORY[perspective].paragraphs.map((p, i) => (
              <p key={i} style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{p}</p>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>The Inversion</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            Old model: ad budget determines visibility.<br />
            ProLnk model: credentials and track record determine visibility.<br />
            The best contractors win. The homeowners benefit. The partners compound.
          </div>
        </div>
      </div>
    </div>
  );
}
