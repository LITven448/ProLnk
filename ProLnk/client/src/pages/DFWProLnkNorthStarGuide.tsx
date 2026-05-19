import { useState } from 'react';

type Stakeholder = 'homeowner' | 'contractor' | 'partner';

const NORTH_STAR_VISION = [
  { emoji: '🏠', headline: 'Every DFW home is predictively maintained', detail: 'The Home Health Vault holds the complete service history of every home. AI predicts what needs attention before it becomes an emergency.' },
  { emoji: '🔒', headline: 'Every contractor is trusted and verified', detail: 'No unlicensed work. No fraudulent reviews. A credential-based reputation that took years to build and cannot be bought.' },
  { emoji: '💎', headline: 'Origination rights create generational income', detail: 'Partners who built the network in 2025-2026 receive permanent income from every home and contractor they originated — for the life of the platform.' },
  { emoji: '🗄️', headline: 'Home Health Vault: the complete story of every DFW home', detail: '500,000 DFW homes. Full service records, structural data, system specs. The most comprehensive home data asset in Texas.' },
  { emoji: '🤖', headline: 'AI agents handle 80% of platform operations autonomously', detail: 'Matching, scoring, onboarding, payouts, compliance — automated. The platform scales without proportional cost growth.' },
];

const PERSONAL_MEANING: Record<Stakeholder, { title: string; points: string[] }> = {
  homeowner: {
    title: 'What the North Star means for you',
    points: [
      '🏡 Your home has a permanent, private health record — like a CarFax but for your house.',
      '📅 ProLnk alerts you before your HVAC, roof, or plumbing needs attention — not after.',
      '🤝 You never start from scratch with a new contractor. They arrive informed.',
      '🔐 Your data is yours. You control who sees it and revoke access at any time.',
    ],
  },
  contractor: {
    title: 'What the North Star means for you',
    points: [
      '📈 Your DFW reputation score compounds year over year — impossible to replicate.',
      '🗓️ Predictive maintenance creates a forward job calendar, not reactive scrambles.',
      '🧠 AI match context means you arrive at jobs knowing exactly what you’re walking into.',
      '💼 The platform handles invoicing, history, and reputation — you focus on craft.',
    ],
  },
  partner: {
    title: 'What the North Star means for you',
    points: [
      '💰 Origination rights you established in 2025 pay you as the platform reaches 500K homes.',
      '🌐 DFW network you built becomes the template for Texas expansion — your position scales.',
      '📊 Real-time dashboard shows every tier of your cascade network generating income.',
      '🏆 Charter partner status is permanent — no future tier can match your founding economics.',
    ],
  },
};

export default function DFWProLnkNorthStarGuide() {
  const [stakeholder, setStakeholder] = useState<Stakeholder>('homeowner');
  const labels: Record<Stakeholder, string> = { homeowner: 'Homeowner', contractor: 'Contractor', partner: 'Partner' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⭐</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk North Star</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Where DFW home services is headed — and what it means for you.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
          {NORTH_STAR_VISION.map(v => (
            <div key={v.headline} style={{ background: '#112240', borderRadius: 12, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{v.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 6 }}>{v.headline}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{v.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, borderTop: '4px solid #F5E642' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {(['homeowner', 'contractor', 'partner'] as Stakeholder[]).map(s => (
              <button key={s} onClick={() => setStakeholder(s)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: stakeholder === s ? '#F5E642' : '#0A1628', color: stakeholder === s ? '#0A1628' : '#94a3b8' }}>
                {labels[s]}
              </button>
            ))}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', margin: '0 0 16px' }}>{PERSONAL_MEANING[stakeholder].title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PERSONAL_MEANING[stakeholder].points.map((p, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', fontSize: 14 }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
