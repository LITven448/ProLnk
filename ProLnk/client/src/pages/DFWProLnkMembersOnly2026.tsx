import { useState } from 'react';

const charterBenefits = [
  { icon: '🔒', title: 'Rate Locked Forever', detail: 'Charter pros pay $149/mo. When ProLnk raises prices to $249/mo in 2027, Charter pros keep $149/mo for life of membership.' },
  { icon: '⚡', title: 'Priority Match Queue', detail: 'Charter pros receive leads within 1 hour of homeowner submission. Standard pros wait 4-8 hours. In DFW\'s fast market, speed wins.' },
  { icon: '📊', title: 'DFW Market Data Access', detail: 'Weekly data reports: average job value by zip, busiest service types, competitor density map. Standard pros have no market intel.' },
  { icon: '🏆', title: 'ProLnk Performance Certification', detail: 'Charter pros earn a verified badge visible on all quotes. Homeowners see "ProLnk Certified Charter Pro" — highest trust signal on platform.' },
  { icon: '🤝', title: 'Exclusive Network Events', detail: 'Quarterly DFW Charter pro meetups for referral partnerships, trade sharing, and vendor introductions. Invite-only, not open to standard pros.' },
  { icon: '💰', title: 'Charter Commission Tier', detail: 'Charter pros earn 25% commission on referred pro signups vs. 12% for standard. Network income accelerated at Charter tier.' },
  { icon: '🎯', title: 'AI Match Score Boost', detail: 'Charter pros receive a 20% score boost in the match algorithm. More matches, more revenue, compounding advantage.' },
  { icon: '📞', title: 'Direct Charter Support Line', detail: 'Dedicated phone support with 2-hour response. Standard pros use email queue with 24-hour SLA.' },
];

const proTypes: Record<string, { topBenefits: string[]; highlight: string }> = {
  hvac: {
    topBenefits: ['Priority match during DFW peak season (May-Sep)', 'Market data on zip-level service demand', 'Rate lock beats seasonal price inflation'],
    highlight: 'HVAC Charter pros see 3x more summer leads than standard pros.',
  },
  plumbing: {
    topBenefits: ['Emergency lead priority routing', 'Performance certification trust badge', 'Quarterly referral network events'],
    highlight: 'Plumbing emergencies get Charter pro first — homeowners pay premium for speed.',
  },
  electrical: {
    topBenefits: ['Permit-ready certification badge', 'AI match score boost for complex jobs', 'Charter commission tier on referrals'],
    highlight: 'Electrical Charter pros close 40% higher average job value.',
  },
  roofing: {
    topBenefits: ['Storm lead priority access', 'DFW hail season data reporting', 'Insurance claim job routing preference'],
    highlight: 'DFW roofing Charter pros dominate post-storm lead flow.',
  },
  general: {
    topBenefits: ['All 8 Charter exclusive benefits', 'Locked rate + priority queue from day one', 'First 500 Charter spots only'],
    highlight: 'Charter membership closes when 500 applications are received.',
  },
};

export default function DFWProLnkMembersOnly2026() {
  const [proType, setProType] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            ProLnk Charter Members Area Preview 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>What Charter pros get that standard pros will never have access to</p>
        </div>

        <div style={{ background: '#1a2f1a', border: '1px solid #22c55e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>⏳</span>
            <div>
              <div style={{ fontWeight: 700, color: '#22c55e', fontSize: 16 }}>Charter Waitlist — 500 Spots Total</div>
              <div style={{ color: '#86efac', fontSize: 14 }}>DFW market allocation filling rapidly. Charter is permanently closed when 500 applications are received.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔑 8 Charter-Exclusive Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {charterBenefits.map(({ icon, title, detail }) => (
              <div key={title} style={{ background: '#0d1f35', borderRadius: 10, padding: 16, borderTop: '3px solid #F5E642' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Your Trade → Charter Impact</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {[['hvac', '❄️ HVAC'], ['plumbing', '🔧 Plumbing'], ['electrical', '⚡ Electrical'], ['roofing', '🏠 Roofing'], ['general', '🛠️ All Trades']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setProType(k)}
                style={{ padding: '10px 18px', background: proType === k ? '#F5E642' : '#0d1f35', color: proType === k ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
              >
                {l}
              </button>
            ))}
          </div>
          {proType && proTypes[proType] && (
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 20 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '8px 16px', marginBottom: 16, fontWeight: 700, fontSize: 15 }}>
                {proTypes[proType].highlight}
              </div>
              {proTypes[proType].topBenefits.map((b, i) => (
                <div key={i} style={{ color: '#cbd5e1', padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>
                  ✅ {b}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📈 Charter vs Standard — Side by Side</h2>
          {[
            ['Lead Response Time', '1 hour', '4-8 hours'],
            ['Monthly Rate', '$149 locked', 'Market rate'],
            ['Commission Tier', '25%', '12%'],
            ['Match Algorithm Boost', '+20%', 'None'],
            ['Market Data Reports', 'Weekly', 'None'],
            ['Support Response', '2 hours', '24 hours'],
            ['Certification Badge', 'Charter badge', 'None'],
          ].map(([feature, charter, standard]) => (
            <div key={feature} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, padding: '10px 0', borderBottom: '1px solid #1e3a5f', alignItems: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{feature}</div>
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 14 }}>{charter}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{standard}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Claim Your Charter Spot</h3>
          <p style={{ color: '#1e3a5f', marginBottom: 4 }}>500 total spots. Once closed, Charter is gone forever.</p>
          <p style={{ color: '#0A1628', fontWeight: 700 }}>prolnk.io → Pro Signup → Charter</p>
        </div>
      </div>
    </div>
  );
}