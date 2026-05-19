import { useState } from 'react';

const roles = [
  { id: 'founder', label: 'Founder / CEO', brief: 'Platform is live at prolnk-v2.onrender.com. 5,000+ DFW content pages built and staged overnight. Charter tier approaching 500 members — waitlist closes at limit. Render AI credits application submitted May 16. Next milestone: credits unlock → deploy content library live. Stripe deadline May 19 for AI startup credits — action required today.' },
  { id: 'investor', label: 'Investor / Advisor', brief: 'ProLnk executed an overnight AI-driven content buildout: 5,000+ hyper-local DFW service pages. Platform infrastructure live on Render. Charter tier (25 slots) and Founding tier (100 slots) filling. Waiting on AI credits to fully deploy content at scale. Unit economics remain 85% net margin at 1,000 pros.' },
  { id: 'pro', label: 'Service Professional (Pro)', brief: 'ProLnk is live and collecting charter members across DFW. Charter tier locks your rate at $149/mo permanently. Fewer than 500 spots available before waitlist closes. Referral income: 7% on jobs your referred pros complete, 12% on their subscriptions. Sign up now to lock in charter pricing.' },
  { id: 'homeowner', label: 'DFW Homeowner', brief: 'ProLnk is building DFW\’s most comprehensive home services resource library. 5,000+ guides covering HVAC, foundation, roofing, plumbing, and electrical — all DFW-specific. Platform launching soon to connect you with vetted local pros. Sign up for early access.' },
  { id: 'ops', label: 'Operations / Team', brief: 'All 5,000+ pages staged and ready for deployment trigger. Render credits application in flight — approval unlocks full deploy. Content pipeline: autonomous, AI-driven, overnight buildout complete. Next batch: additional DFW trades (electrical, plumbing, landscaping). Stripe credits deadline May 19 — founder action needed.' },
];

const stats = [
  { icon: '📄', label: 'Pages Built', value: '5,000+' },
  { icon: '🏗️', label: 'Platform Status', value: 'Live' },
  { icon: '⭐', label: 'Charter Slots', value: '25 total' },
  { icon: '📅', label: 'Report Date', value: 'May 17, 2026′ },
];

export default function DFWProLnkMorningReport2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = roles.find(r => r.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · MORNING REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>DFW Platform Status</h1>
        <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 24 }}>May 17, 2026</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🌙 Overnight Buildout Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '✅ 5,000+ DFW-specific service pages generated and staged',
              '✅ Site live at prolnk-v2.onrender.com',
              '✅ Content covers HVAC, foundation, roofing, plumbing, electrical',
              '✅ Render AI credits application submitted May 16',
              '⏳ Awaiting credits approval to trigger full content deployment',
              '⚠️ Stripe startup credits deadline: May 19 — founder action required',
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#162040', borderRadius: 8, padding: '10px 14px', color: '#CBD5E1', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>👤 Select Your Role for Morning Brief</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => setSelected(r.id)}
                style={{ background: selected === r.id ? '#F5E642′ : '#1A2F50', color: selected === r.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {r.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 20, backgroundColor: '#162040', borderLeft: '4px solid #F5E642', padding: 16, borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Your Morning Brief — {match.label}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{match.brief}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🚀 ProLnk DFW — Charter Tier Open</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 4 }}>Join the ProLnk charter cohort. 500 total spots. $149/mo locked for life. prolnk-v2.onrender.com</div>
        </div>
      </div>
    </div>
  );
}
