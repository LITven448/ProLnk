import { useState } from 'react';

const INSURANCE_TYPES = ['Homeowners Insurance', 'Auto Insurance', 'Life Insurance', 'Commercial / Multi-line'];

const pitchData: Record<string, { connection: string; approach: string; points: string[]; leaveBehinds: string[] }> = {
  'Homeowners Insurance': {
    connection: 'Direct correlation: well-maintained homes file fewer claims. ProLnk helps your clients maintain their homes, which reduces your claims loss ratio.',
    approach: 'Claim prevention partnership pitch — frame ProLnk as a risk reduction tool that benefits everyone.',
    points: [
      'Clients with reliable contractor access fix issues before they become claims',
      'Roof leaks, HVAC failures, plumbing bursts — all preventable with routine maintenance',
      'You can offer ProLnk as a value-add at policy renewal, not just at binding',
      'Documented maintenance history can support claims and reduce disputes',
    ],
    leaveBehinds: ['ProLnk one-pager: "Maintain Your Home, Protect Your Policy"', 'Co-branded renewal card with ProLnk access link', 'QR code for your clients to sign up as homeowners'],
  },
  'Auto Insurance': {
    connection: 'Less direct but real: homeowners who use ProLnk are engaged, organized homeowners — your best auto policy customers too.',
    approach: 'Bundle relationship pitch — ProLnk is a conversation opener about home coverage, creating cross-sell moments.',
    points: [
      'Homeowners using ProLnk are actively managing assets — ideal for home + auto bundles',
      'Sharing ProLnk positions you as a community resource, not just an insurance seller',
      'Home maintenance touch point gives you a natural reason to check in on coverage',
      'Clients who trust you for home resources are more likely to bundle auto with you',
    ],
    leaveBehinds: ['ProLnk card with your contact info on the back', 'Email template: "A resource for your home, from your insurance agent"', 'Monthly newsletter block: "Home Maintenance Tip + ProLnk"'],
  },
  'Life Insurance': {
    connection: 'Home equity is a key driver of life insurance conversations. ProLnk protects that equity by keeping the home in top condition.',
    approach: 'Asset protection angle — link ProLnk to the financial planning conversation already underway.',
    points: [
      'The home is often the largest asset life insurance is protecting',
      'A well-maintained home holds its value — critical for beneficiaries',
      'ProLnk is a practical gift you can offer while discussing long-term planning',
      'Positions you as a holistic advisor, not just a policy seller',
    ],
    leaveBehinds: ['ProLnk as "home asset protection" talking point in your financial review script', 'One-liner: "ProLnk helps keep your home worth protecting"', 'Co-branded leave-behind at estate planning or will-signing appointments'],
  },
  'Commercial / Multi-line': {
    connection: 'Multi-line agents often serve small business owners who are also homeowners. ProLnk applies to both their commercial properties and personal homes.',
    approach: 'Portfolio value pitch — ProLnk extends your value beyond the office to your clients\’ personal lives.',
    points: [
      'Small business owners often neglect personal home maintenance — ProLnk solves it',
      'Commercial property maintenance connections can refer to ProLnk for residential work',
      'Multi-line clients are high-value relationships; ProLnk deepens the personal connection',
      'Agency differentiation: you offer business clients a personal home resource no one else does',
    ],
    leaveBehinds: ['ProLnk welcome kit included in your new commercial client onboarding packet', 'Annual business review agenda item: "How is the home holding up?"', 'Referral agreement with ProLnk for commercial property referrals'],
  },
};

export default function PartnerInsurancePitchGuide() {
  const [insuranceType, setInsuranceType] = useState(INSURANCE_TYPES[0]);
  const data = pitchData[insuranceType];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Insurance Agent Pitch Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>How to pitch ProLnk to DFW insurance agents using the maintenance-claims connection that resonates immediately.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎯 Select Insurance Type</h2>
          <select value={insuranceType} onChange={e => setInsuranceType(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, color: '#0A1628′ }}>
            {INSURANCE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        {data && (
          <>
            <div style={{ background: '#FFFBEB', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #FDE68A' }}>
              <h2 style={{ color: '#92400E', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>🔗 The Maintenance–Insurance Connection</h2>
              <p style={{ color: '#78350F', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{data.connection}</p>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 Pitch Approach</h2>
              <p style={{ color: '#334155', lineHeight: 1.6, margin: 0 }}>{data.approach}</p>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💬 Talking Points</h2>
              {data.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ background: '#F5E642', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0A1628', flexShrink: 0 }}>{i + 1}</span>
                  <p style={{ color: '#334155', margin: 0, lineHeight: 1.5 }}>{p}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#F0FDF4', borderRadius: 12, padding: 24, border: '1px solid #BBF7D0′ }}>
              <h2 style={{ color: '#14532D', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📦 What to Leave Behind</h2>
              {data.leaveBehinds.map((lb, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16A34A', fontWeight: 700 }}>✓</span>
                  <p style={{ color: '#15803D', margin: 0, fontSize: 14 }}>{lb}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
