import { useState } from 'react';

const tradeTypes = [
  { id: 'hvac', label: '❄️ HVAC', tips: ['Complete SEER2 ratings on your ProLnk profile today', 'Respond to leads within 15 min — HVAC urgency is real', 'Collect reviews after every spring tune-up (peak review season)', 'Recruit 2 other HVAC pros to your network for override income', 'Add every home you service to the Home Health Vault' ] },
  { id: 'plumbing', label: '🔧 Plumbing', tips: ['Upload your master plumber license to ProLnk profile now', 'Water heater leads = highest urgency, respond in under 10 min', 'Ask every customer for a review at invoice time', 'Refer 1 electrician and 1 HVAC pro — earn on their jobs', 'Document pipe work done for the homeowner's Home Health Vault' ] },
  { id: 'foundation', label: '🏗️ Foundation', tips: ['List engineer-backed repairs prominently on your profile', 'Foundation leads are high-ticket — price correctly, respond fast', 'Photo-document every job for the homeowner's Vault record', 'Recruit roofers and HVAC pros — they refer foundation work', 'Follow up 90 days post-repair — Vault update = another review' ] },
  { id: 'roofing', label: '🏠 Roofing', tips: ['Hail season April–June: set your availability as priority high', 'Insurance supplement jobs: document everything in Vault', 'Ask for referrals at final walkthrough — homeowners talk', 'Recruit 2 gutter pros for override — they see every roof', 'Offer Vault documentation as a differentiator — few do it' ] },
];

const charterMustDo = [
  { icon: '✅', title: 'Complete Your Profile Today', body: 'Incomplete profiles get 73% fewer leads. Add license, photos, service areas, and trade specialties before your first lead arrives.' },
  { icon: '⚡', title: 'Respond in Under 15 Minutes', body: 'ProLnk tracks response time. Pros who respond in <15 min close 4x more jobs. Set up notifications now — not later.' },
  { icon: '⭐', title: 'Collect Reviews Systematically', body: 'Ask at invoice, follow up 48 hrs later, add a QR code to your truck. 20+ reviews = priority lead placement.' },
  { icon: '🌐', title: 'Start Your Pro Network', body: 'Recruit 2 pros in complementary trades. Their jobs earn you 7% override — permanently. The cascade starts with you.' },
  { icon: '🏦', title: 'Add Homes to the Vault', body: 'Every home you service can generate 1.5% origination rights — a recurring share of platform fees for that home, forever.' },
];

export default function DFWProSummaryGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = tradeTypes.find(t => t.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔨</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>ProLnk Pro Complete Summary Guide 2026</h1>
          <p style={{ color: '#8A9BB5', fontSize: 15 }}>The definitive summary for DFW service pros — everything you need to win as a Charter Pro</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>5 Things Charter Pros Must Do</h2>
          {charterMustDo.map((item, i) => (
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
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your Trade-Specific Top 5</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {tradeTypes.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id === selected ? null : t.id)}
                style={{ background: selected === t.id ? '#F5E642' : '#111D35', color: selected === t.id ? '#0A1628' : '#E8F0FF', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {t.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#111D35', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Top 5 — {active.label}</div>
              {active.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#E8F0FF', fontSize: 14 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#111D35', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Charter closes at 500 pros — spots are limited</div>
          <div style={{ color: '#8A9BB5', fontSize: 14 }}>Lock in $149/mo forever and earn 5 income streams starting day one</div>
        </div>
      </div>
    </div>
  );
}