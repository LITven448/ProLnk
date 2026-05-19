import { useState } from 'react';

const stages = [
  { id: 'preApproval', label: '💳 Getting Pre-Approved', tips: ['Get pre-approved before viewing a single home — DFW moves in 48 hours', 'Pre-approval vs pre-qualification: sellers only respect pre-approval', 'Check your credit 90 days before applying — dispute errors early', 'Avoid new credit cards or car loans 6 months before mortgage application', 'Get pre-approved with 2 lenders — use the better rate at closing' ] },
  { id: 'searching', label: '🔍 Home Searching', tips: ['Option period (usually 5–10 days) is your full inspection window', 'Foundation inspection is separate from general inspection — always order both', 'Check HVAC age before submitting offer — over 10 years = negotiate credit', 'Drive the neighborhood at 7am and 10pm — see real traffic and activity', 'Survey is not optional in DFW — lot line disputes are common' ] },
  { id: 'underContract', label: '📝 Under Contract', tips: ['Order foundation inspection day 1 of option period, not day 8', 'Read the seller’s disclosure carefully — foundation and water history', 'Request Home Health Vault records if the seller has a Vault', 'Do not waive inspection contingency in DFW — foundation risk is real', 'Confirm survey is ordered and scheduled — delays can extend closing' ] },
  { id: 'closing', label: '🏁 Approaching Closing', tips: ['Call ProLnk before you close — get Charter HVAC and plumbing pros lined up', 'Start your Home Health Vault profile the week you close', 'Do a final walkthrough 24 hours before closing, not day-of', 'Confirm all repairs from inspection are completed and documented', 'Change all locks and garage codes your first day in the home' ] },
];

const summaryFacts = [
  { icon: '💳', title: 'Pre-Approval First, Always', body: 'DFW listings get multiple offers in 48 hours. Without pre-approval, you cannot compete. Get it before you even start browsing.' },
  { icon: '⏰', title: 'Option Period Is Everything', body: 'Your option period (typically 5–10 days) is your unrestricted right to back out. Use every day of it for inspections.' },
  { icon: '🏗️', title: 'Foundation Inspection Is Separate', body: 'General inspectors are not structural engineers. Always hire a licensed structural engineer separately — costs $400, worth $25,000.' },
  { icon: '❄️', title: 'HVAC Age Check Is Non-Negotiable', body: 'A 13-year-old HVAC in DFW heat could fail next summer. Check age in disclosure, verify on unit label, negotiate a credit or replacement.' },
  { icon: '📋', title: 'Don’t Skip the Survey', body: 'DFW lot line disputes, encroachments, and easement issues are common. A survey protects you from inheriting the previous owner’s boundary problem.' },
];

export default function DFWBuyingInDFW2026Summary() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = stages.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Home Buying Complete Summary 2026</h1>
          <p style={{ color: '#8A9BB5', fontSize: 15 }}>The definitive DFW buying guide — from pre-approval to closing day</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>5 DFW Buying Rules That Protect You</h2>
          {summaryFacts.map((item, i) => (
            <div key={i} style={{ background: '#111D35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 12, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#E8F0FF', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Where Are You In The Process?</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#111D35', color: selected === s.id ? '#0A1628' : '#E8F0FF', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 18px', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#111D35', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{active.label} — What To Do Now</div>
              {active.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#E8F0FF', fontSize: 14 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#111D35', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Join ProLnk before you close — your first repairs are coming</div>
          <div style={{ color: '#8A9BB5', fontSize: 14 }}>Connect with vetted Charter pros for HVAC, plumbing, and foundation from day one</div>
        </div>
      </div>
    </div>
  );
}