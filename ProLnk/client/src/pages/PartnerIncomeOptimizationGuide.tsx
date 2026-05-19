import { useState } from 'react';

const checklist = [
  { id: 'photos', text: 'Uploaded photos for every job this week' },
  { id: 'leads', text: 'Accepted all leads where acceptance rate > 70%' },
  { id: 'recruits', text: 'Reached out to 2 potential recruits' },
  { id: 'homeowners', text: 'Sent homeowner link to 3 recent customers' },
  { id: 'vault', text: 'Added 5 homes to origination vault' },
];

const streams = [
  {
    number: 1,
    icon: '🔨',
    title: 'Job Commissions — Maximize Per-Job Value',
    tips: [
      'Upload photos within 2 hours of job completion — it’s the #1 quality signal the algorithm tracks.',
      'Maintain 85%+ lead acceptance rate to stay in the top-tier dispatch pool.',
      'Storm response within 15 minutes earns premium dispatch priority.',
      'Target jobs $3,000+ — best commission per hour of your time.',
    ],
    math: '15 jobs/mo × avg $312 = $4,680/mo',
  },
  {
    number: 2,
    icon: '🌐',
    title: 'Network Overrides — Who You Recruit Matters',
    tips: [
      'Prioritize recruiting trades with high job values: HVAC, roofing, foundation specialists.',
      'Teach every recruit the 2-hour photo rule immediately — your override applies to their earned commission.',
      'Your override is a percentage of their commission, not their job value. High earners = your best overrides.',
      'Stay in contact monthly — quiet recruits become inactive, which kills your passive income.',
    ],
    math: '10 active recruits × avg $287 override = $2,870/mo',
  },
  {
    number: 3,
    icon: '📅',
    title: 'Subscription Overrides — Passive Forever',
    tips: [
      'Each active recruit earns you $18–22/month in subscription overrides, forever.',
      'Focus on recruiting full-time pros, not side-giggers. Full-time pros stay active longer.',
      'Your override continues as long as they’re subscribed — prioritize recruit retention conversations.',
      '10 active recruits = $220+/month with zero ongoing work.',
    ],
    math: '10 recruits × $20/mo avg = $200/mo passive',
  },
  {
    number: 4,
    icon: '🏡',
    title: 'Homeowner Referrals — Natural Conversation',
    tips: [
      'Use the TrustyPro homeowner link after every job. "Want to see what AI found about your home?" is the opener.',
      'This is a natural conversation — you just completed work on their home. Your credibility is at its peak.',
      'Each qualified homeowner referral pays $25–100 depending on service type.',
      'The best time to share is during or immediately after the job — while you’re still on-site.',
    ],
    math: '5 referrals/mo × $75 avg = $375/mo',
  },
  {
    number: 5,
    icon: '🏛️',
    title: 'Origination Rights — Permanent Equity',
    tips: [
      'Every property you work on is a potential origination right — take photos specifically for the vault.',
      'Origination rights give you a share of all future platform fees for that home. Permanent.',
      '200 homes in your origination portfolio = significant passive income as ProLnk scales.',
      'Think of origination rights like digital real estate — each one compounds.',
    ],
    math: '200 homes × $1.85 avg/mo = $370/mo (growing)',
  },
];

export default function PartnerIncomeOptimizationGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: '#f9fafb', color: '#111827', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#6b7280′ }}>
          💼 ProLnk Partner Resource
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
          Income Optimization Guide
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 16 }}>
          Maximize Every Dollar From ProLnk — All 5 Streams, Simultaneously
        </p>
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 20, marginBottom: 48, border: '1px solid #bfdbfe' }}>
          <span style={{ fontSize: 15, color: '#1e40af', fontWeight: 600 }}>
            💡 The Optimization Mindset:
          </span>{' '}
          <span style={{ color: '#1e3a8a', fontSize: 15 }}>
            Most partners optimize for one income stream. The top 10% maximize all 5 simultaneously. This guide shows you exactly how.
          </span>
        </div>

        {/* Stream breakdowns */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
            💰 Stream-by-Stream Optimization
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {streams.map(stream => (
              <div key={stream.number} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ background: '#eff6ff', borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      {stream.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stream {stream.number}</div>
                      <div style={{ fontWeight: 700, color: '#111827', fontSize: 16 }}>{stream.title}</div>
                    </div>
                  </div>
                  <div style={{ background: '#f0fdf4', color: '#166534', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, border: '1px solid #bbf7d0′ }}>
                    {stream.math}
                  </div>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: '#374151', fontSize: 14 }}>
                  {stream.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
            ✅ Monthly Optimization Checklist
          </h2>
          <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 15 }}>
            Track your weekly habits across all 5 streams. {completedCount}/{checklist.length} completed.
          </p>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {checklist.map(item => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: checked[item.id] ? '2px solid #16a34a' : '2px solid #d1d5db',
                  background: checked[item.id] ? '#16a34a' : '#fff',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                }}>
                  {checked[item.id] ? '✓' : ''}
                </div>
                <span style={{ color: checked[item.id] ? '#9ca3af' : '#111827', fontSize: 15, textDecoration: checked[item.id] ? 'line-through' : 'none' }}>
                  {item.text}
                </span>
              </button>
            ))}
            {completedCount === checklist.length && (
              <div style={{ marginTop: 16, background: '#f0fdf4', borderRadius: 8, padding: 14, color: '#166534', fontWeight: 700, textAlign: 'center' }}>
                🎉 Full optimization week complete! You're in the top 10%.
              </div>
            )}
          </div>
        </section>

        {/* The math */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24 }}>
            📈 The Math at Full Optimization
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {[
              { label: '15 jobs/mo × $312 avg commission', value: '$4,680′ },
              { label: '10 active recruits network override', value: '$2,870′ },
              { label: '5 homeowner referrals × $75', value: '$375′ },
              { label: '200 home origination rights', value: '$370′ },
              { label: 'Subscription overrides (10 recruits)', value: '$200′ },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 4 ? '1px solid #f3f4f6′ : ’none', alignItems: 'center' }}>
                <span style={{ color: '#374151', fontSize: 14 }}>{row.label}</span>
                <span style={{ color: '#111827', fontWeight: 700, fontSize: 16 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontWeight: 700, color: '#111827', fontSize: 17 }}>Total Monthly Income</span>
              <span style={{ fontWeight: 800, color: '#16a34a', fontSize: 24 }}>$8,495+/mo</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e1b4b)', borderRadius: 16, padding: 40, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            Ready to Maximize Your Income?
          </h3>
          <p style={{ color: '#bfdbfe', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Join as a Charter Partner. Lock in $149/mo forever and start activating all 5 income streams.
          </p>
          <a
            href="/apply"
            style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Apply as a Partner
          </a>
        </div>
      </div>
    </div>
  );
}
