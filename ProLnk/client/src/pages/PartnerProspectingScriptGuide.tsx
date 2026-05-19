import { useState } from 'react';

const SCENARIOS = [
  {
    id: 'job_site',
    label: '🏗️ At a job site',
    relationship: 'colleague',
    script: 'Hey, have you heard of ProLnk? I’ve been making extra money uploading photos from jobs I’m already doing. Worth 5 minutes to look at if you want.',
  },
  {
    id: 'supply_house',
    label: '🔩 At a supply house',
    relationship: 'peer',
    script: 'I started using this app that generates leads from job site photos. Making $300–800/month extra without any extra work. Happy to send you a link if you want to check it out.',
  },
  {
    id: 'social_media',
    label: '📱 On social media',
    relationship: 'online',
    script: 'Saw your work — great quality. Are you on ProLnk? With photos like that, you’d be generating a lot of AI-detected leads. DM me if you want to know more.',
  },
  {
    id: 'former_colleague',
    label: '📞 Former colleague',
    relationship: 'existing',
    script: 'Catching up — are you still doing [trade] work? I started using ProLnk and it’s been a solid extra income stream. Let me know if you want to hop on a call — I can show you what I earn.',
  },
  {
    id: 'customer_contractor',
    label: '🤝 Customer who’s also a contractor',
    relationship: 'trust',
    script: 'I know you do [trade] work — have you looked at ProLnk? Homeowners refer other contractors they trust. Your reputation would go a long way there.',
  },
];

const RELATIONSHIP_NOTES: Record<string, string> = {
  colleague: 'Keep it casual. You’re sharing something helpful, not selling.',
  peer: 'Lead with the income number — it’s relevant to their day.',
  online: 'Compliment the work first. Authenticity converts.',
  existing: 'Re-connection opens the door. Make it about them.',
  trust: 'Leverage their existing credibility. They’re already trusted.',
};

export default function PartnerProspectingScriptGuide() {
  const [selected, setSelected] = useState('job_site');

  const active = SCENARIOS.find(s => s.id === selected)!;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🗣️</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px' }}>
          ProLnk Prospecting Scripts
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
          What to Say to Recruit Your First 5 Partners
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* Mindset */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 14px' }}>🧠 The Right Mindset</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, margin: 0, fontSize: 16 }}>
            <strong>Recruiting isn't selling.</strong> You're inviting people to see something that helps them.
            Lead with curiosity, not pitch. The moment it feels like a sales call, they tune out.
            One mention, one follow-up — then let it go.
          </p>
        </div>

        {/* Interactive Script Builder */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>💬 Script Builder</h2>
          <p style={{ color: '#64748b', margin: '0 0 24px', fontSize: 14 }}>Select a scenario to get a field-tested opening line</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#0f172a' : '#f1f5f9',
                  color: selected === s.id ? '#f1f5f9' : '#334155',
                  border: 'none',
                  borderRadius: 10,
                  padding: '14px 20px',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#f8fafc', border: '2px solid #0f172a', borderRadius: 14, padding: 28 }}>
            <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>Your Opening Line</div>
            <p style={{ fontSize: 18, color: '#0f172a', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>
              "{active.script}"
            </p>
            <div style={{ background: '#e2e8f0', borderRadius: 8, padding: '12px 16px' }}>
              <span style={{ color: '#64748b', fontSize: 13, fontWeight: 600 }}>💡 Note: </span>
              <span style={{ color: '#475569', fontSize: 13 }}>{RELATIONSHIP_NOTES[active.relationship]}</span>
            </div>
          </div>
        </div>

        {/* What NOT to say */}
        <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#991b1b', margin: '0 0 16px' }}>🚫 What NOT to Say</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { bad: 'Don’t lead with "network income" or "referral cascade"', reason: 'Sounds like MLM. You’ll lose them in 3 words.' },
              { bad: 'Don’t quote specific dollar amounts without context', reason: '"I made $4,200 last month" without context sounds unrealistic.' },
              { bad: 'Don’t push after one "no"', reason: 'One mention, one follow-up. Then let it go. Pressure destroys trust.' },
            ].map(item => (
              <div key={item.bad} style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', borderLeft: '3px solid #ef4444' }}>
                <div style={{ color: '#991b1b', fontWeight: 700, marginBottom: 4 }}>✗ {item.bad}</div>
                <div style={{ color: '#64748b', fontSize: 14 }}>{item.reason}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Script */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 14px' }}>📅 Follow-Up Script (24–48 Hours Later)</h3>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
            <p style={{ color: '#334155', fontSize: 16, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "Sent you that ProLnk link — let me know if you want me to walk you through it. Takes 15 min to set up."
            </p>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12 }}>
            One follow-up. If they're interested, they'll respond. If not, move on. Your time is valuable.
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: '#0f172a', borderRadius: 16, padding: 32, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💰</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 12px' }}>Ready to Start Building Your Network?</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 24px' }}>Join ProLnk and start earning through our 5-stream income system.</p>
          <a href="/waitlist/pro" style={{ display: 'inline-block', background: '#f59e0b', color: '#0f172a', fontWeight: 800, padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18 }}>
            Join as a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
