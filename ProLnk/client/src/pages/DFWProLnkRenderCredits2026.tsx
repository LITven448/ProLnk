import { useState } from 'react';

const roles = [
  { id: 'founder', label: '🚀 Startup Founder', msg: 'Render credits can eliminate your infrastructure bill during early growth. Apply at render.com/for-startups with your pitch deck and growth metrics.' },
  { id: 'engineer', label: '⚙️ Lead Engineer', msg: 'Render handles CI/CD, auto-deploys, and zero-downtime deploys. Credits let us scale 47 autonomous agents without burning runway on infra.' },
  { id: 'investor', label: '💼 Investor / Advisor', msg: 'Render credits reduce burn rate and extend our runway. It is a non-dilutive resource that directly improves unit economics heading into Series A.' },
  { id: 'ops', label: '🛠 Operations Lead', msg: 'Our 5,200-page DFW content library and 47 AI agents require reliable, scalable hosting. Render is mission-critical for our launch and post-launch scaling.' },
];

export default function DFWProLnkRenderCredits2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = roles.find(r => r.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK × RENDER</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          ProLnk Render Credits<br />Application Guide 2026
        </h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          ProLnk is an AI-powered home services marketplace serving DFW with 47 autonomous agents,
          5,200+ pages of hyperlocal content, and a $2M seed round underway. Render is our
          critical CI/CD and hosting infrastructure for the May 2026 launch and beyond.
        </p>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>WHY RENDER CREDITS MATTER</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['🤖', '47 Autonomous Agents', 'Each agent needs always-on compute — credits eliminate variable infra cost during launch phase'],
              ['📄', '5,200+ DFW Pages', 'Content deployment pipeline runs on Render — continuous deploys with zero downtime required'],
              ['📈', 'Series A Prep', 'Reducing burn via credits improves unit economics and extends runway for investor diligence'],
              ['🏗', 'Startup Program', 'Apply at render.com/for-startups — ProLnk qualifies as an AI-first, high-growth platform'],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: '#8899AA', fontSize: 13 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>SELECT YOUR STAKEHOLDER ROLE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => setSelected(r.id)} style={{
                background: selected === r.id ? '#F5E642' : '#111D2E',
                color: selected === r.id ? '#0A1628' : '#fff',
                border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{r.label}</button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 32, fontWeight: 600, fontSize: 15 }}>
            {active.msg}
          </div>
        )}

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>APPLY NOW</div>
          <p style={{ color: '#8899AA', fontSize: 14, margin: 0 }}>
            Visit render.com/for-startups — mention ProLnk, your DFW launch, and your $2M seed round.
            Render credits support AI-first companies with real infrastructure needs.
          </p>
        </div>
      </div>
    </div>
  );
}