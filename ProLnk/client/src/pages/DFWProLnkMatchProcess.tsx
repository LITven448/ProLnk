import { useState } from 'react';

const steps = [
  { id: 'submit', label: '1 — Homeowner Submits', homeowner: 'You describe the job: trade, urgency, location in DFW. Takes 90 seconds.', partner: 'You set your service area and availability once. System does the rest.', emoji: '📋' },
  { id: 'score', label: '2 — AI Scores the Lead', homeowner: 'ProLnk AI evaluates your request for completeness and urgency.', partner: 'AI scores the lead for fit against your trade, zip, and capacity.', emoji: '🤖' },
  { id: 'notify', label: '3 — 3 Partners Notified', homeowner: 'Three qualified, background-checked partners are alerted instantly.', partner: 'You get a push alert. First qualified response wins the match.', emoji: '🔔' },
  { id: 'respond', label: '4 — First Qualified Responds', homeowner: 'The partner who responds fastest and meets your criteria is matched.', partner: 'Respond within the window to claim the lead. Speed + fit = match.', emoji: '⚡' },
  { id: 'confirm', label: '5 — Match Confirmed', homeowner: 'You receive the partner profile, license info, and direct contact.', partner: 'You get homeowner contact info and job details. Set appointment.', emoji: '✅' },
  { id: 'complete', label: '6 — Work Completed', homeowner: 'Partner arrives, completes the job, you pay them directly.', partner: 'Complete the job professionally. Your reputation is on the line.', emoji: '🔧' },
  { id: 'rate', label: '7 — Both Sides Rate', homeowner: 'Rate the partner 1–5 stars. Your feedback shapes who gets future leads.', partner: 'Rate the homeowner. Good data = better matches for everyone.', emoji: '⭐' },
];

export default function DFWProLnkMatchProcess() {
  const [role, setRole] = useState<'homeowner' | 'partner' | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🔄</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>How a ProLnk Match Works</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>7 steps from request to completed job — DFW, every trade</p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
          {(['homeowner', 'partner'] as const).map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              padding: '10px 28px', borderRadius: 8, border: '2px solid',
              borderColor: role === r ? '#F5E642′ : '#1e3a5f',
              background: role === r ? '#F5E642′ : ’transparent',
              color: role === r ? '#0A1628′ : '#fff', fontWeight: 700,
              fontSize: 15, cursor: 'pointer', textTransform: 'capitalize'
            }}>{r === 'homeowner' ? '🏠 Homeowner' : '🔧 Partner'}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => (
            <div key={step.id} onClick={() => setActiveStep(i)} style={{
              background: activeStep === i ? '#0f2a4a' : '#0d1f36',
              border: '1px solid', borderColor: activeStep === i ? '#F5E642′ : '#1e3a5f',
              borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{step.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: activeStep === i ? '#F5E642′ : '#e2e8f0' }}>{step.label}</span>
              </div>
              {activeStep === i && role && (
                <p style={{ margin: '12px 0 0', color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                  {role === 'homeowner' ? step.homeowner : step.partner}
                </p>
              )}
              {activeStep === i && !role && (
                <p style={{ margin: '12px 0 0', color: '#F5E642', fontSize: 13 }}>👆 Select your role above to see your perspective</p>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: '#0d1f36', borderRadius: 10, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🎯</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, margin: '8px 0 4px' }}>Average match time: under 4 minutes</p>
          <p style={{ color: '#64748b', fontSize: 13 }}>Across all trades in the DFW metro area</p>
        </div>
      </div>
    </div>
  );
}
