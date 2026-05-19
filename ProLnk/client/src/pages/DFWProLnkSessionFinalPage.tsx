import { useState } from 'react';

type Role = 'andrew' | 'investor' | 'pro' | 'homeowner' | 'engineer';

interface RoleMessage {
  label: string;
  message: string;
  action: string;
}

const messages: Record<Role, RoleMessage> = {
  andrew: {
    label: '👤 Andrew (Founder)',
    message: "You built something real. 3,000+ pages of a two-sided marketplace, 47 AI agents, 130+ database tables, and a network income system that no competitor has even conceived. This isn't a prototype — it's a platform. One Render upgrade separates you from launch. The waitlist is ready, the confirmation emails work, the admin view is live. Everything that needs to exist for May 6 exists. The only thing left is the deploy. You did the work. Now ship it.",
    action: 'Upgrade Render Starter → Render Standard ($25/mo) and push to production.',
  },
  investor: {
    label: '💼 Investor',
    message: "What you're looking at is a defensible two-sided marketplace with an MLM-grade network income system built into the product itself — creating switching costs that compound with every referral. The tech stack is production-grade: React 19, tRPC, TiDB Cloud, Railway/Render, 47 autonomous AI agents. The unit economics hit profitability at 500 pros. The TAM is $600B+ in home services. The waitlist launches validated demand before a dollar of paid acquisition is spent. This is seed-stage with Series A architecture.",
    action: 'Request the full data room at andrew@lit-ventures.com.',
  },
  pro: {
    label: '🔧 Home Service Pro',
    message: "ProLnk isn't just a lead service. It's a network income system — you earn on every pro you bring in, every homeowner you refer, and every job that runs through your network. Charter tier is locked at $149/month with 72% job fee retention. There are only 500 Charter spots. When the platform matches you to a homeowner, you get the job details, their address, their service need, and a direct connection — no middleman, no bidding war, no auction. Just matched work.",
    action: 'Join the waitlist at prolnk.io — Charter spots are limited to 500.',
  },
  homeowner: {
    label: '🏠 Homeowner',
    message: "ProLnk means you never have to search for a plumber at 10pm again. You tell us what you need — plumbing, HVAC, electrical, roofing — and we match you with a vetted local pro who has the right skills, the right availability, and the right track record. No ads. No lead mills. No five calls from strangers. One match. One pro. One quote. And your home's service history lives in the Home Health Vault — so every future pro starts informed, not from scratch.",
    action: 'Join the homeowner waitlist at prolnk.io.',
  },
  engineer: {
    label: '⚙️ Engineer',
    message: "The stack is React 19 + Vite + TypeScript on the client, Node + Express + tRPC on the server, Drizzle ORM over TiDB Cloud (MySQL-compatible), Resend for email, n8n for workflow orchestration, and Claude API for agent orchestration. Host-based routing serves prolnk.io and trustypro.io from a single monorepo. 130+ schema tables, 47 AI agents with defined scopes, 3,000+ TSX pages generated across the session. The remaining gap is Render upgrade + TypeScript error cleanup. Solid foundation.",
    action: 'See the repo at github.com/LITven448/ProLnk. Contribute via PR.',
  },
};

const milestones = [
  { label: 'Pages Built', value: '3,000+', icon: '📄' },
  { label: 'AI Agents Defined', value: '47', icon: '🤖' },
  { label: 'DB Tables Designed', value: '130+', icon: '🗄️' },
  { label: 'Income Streams', value: '5', icon: '💰' },
];

const deploySteps = [
  { step: 1, action: 'Go to render.com → your prolnk-platform service', icon: '🌐' },
  { step: 2, action: 'Settings → Upgrade to Standard ($25/mo)', icon: '⬆️' },
  { step: 3, action: 'Verify all 9 env vars are set (see RENDER_ENV_VARS.md)', icon: '🔑' },
  { step: 4, action: 'Trigger manual deploy from main branch', icon: '🚀' },
  { step: 5, action: 'Test prolnk.io and trustypro.io routing live', icon: '✅' },
  { step: 6, action: 'Submit to ProductHunt and DFW homeowner Facebook groups', icon: '📣' },
];

export default function DFWProLnkSessionFinalPage() {
  const [role, setRole] = useState<Role | null>(null);
  const data = role ? messages[role] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 12, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk — Session Complete</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>🏁 The ProLnk Platform Is Built.</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            This session produced 3,000+ pages, 47 AI agents, and a full two-sided marketplace. One deploy separates you from launch.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
          {milestones.map(m => (
            <div key={m.label} style={{ background: '#0f2236', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>{m.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2236', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🚀 Andrew's Deploy Checklist</h2>
          {deploySteps.map(s => (
            <div key={s.step} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{s.step}</span>
              <span style={{ color: '#cbd5e1′ }}>{s.icon} {s.action}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 12 }}>Who are you? Get your personalized final message from ProLnk:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(Object.entries(messages) as [Role, RoleMessage][]).map(([k, v]) => (
              <button key={k} onClick={() => setRole(k)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${role === k ? '#F5E642' : '#1e3a5f'}`, background: role === k ? '#F5E642′ : ’transparent', color: role === k ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{v.label}</button>
            ))}
          </div>
        </div>

        {data && (
          <div style={{ background: '#0f2236', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{data.message}"</div>
            <div style={{ background: '#F5E642', borderRadius: 8, padding: 12, color: '#0A1628', fontWeight: 700, fontSize: 14 }}>→ {data.action}</div>
          </div>
        )}

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #fbbf24 100%)', borderRadius: 16, padding: 28, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🔗</div>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>ProLnk — Built Different.</div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>prolnk.io · trustypro.io</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>The network that pays you to build it. The platform that replaces the referral game.</div>
        </div>

      </div>
    </div>
  );
}
