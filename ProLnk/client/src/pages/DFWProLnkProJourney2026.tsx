import { useState } from 'react';

const stages = [
  {
    id: 'day1',
    label: '📋 Day 1: Charter Application',
    timeline: 'Day 1',
    income: '$0 (building foundation)',
    detail: 'You lock in Charter status at $149/mo — the tier that closes at 500 pros. Your profile is built, trade and service area confirmed, and license verified. No matches yet, but your origination rights clock starts today.',
    milestones: ['✅ Charter status locked for life', '✅ License verification complete', '✅ Service area mapped in DFW', '✅ Origination rights clock begins'],
  },
  {
    id: 'week1',
    label: '🔧 Week 1: First Match',
    timeline: 'Days 3–7',
    income: 'First direct commission',
    detail: 'ProLnk sends your first homeowner match. You quote, win the job, complete the work — your commission at Charter tier is 25% of match value logged into your dashboard in real time.',
    milestones: ['✅ First match notification', '✅ Homeowner profile reviewed', '✅ Job quoted and scheduled', '✅ Commission tracked in dashboard'],
  },
  {
    id: 'month1',
    label: '⭐ Month 1: First Review + Network',
    timeline: 'Day 25–35',
    income: 'Commissions + first network override',
    detail: 'Your first homeowner review posts to your Vault-linked profile. You\'ve also referred your first pro — their $149/mo subscription earns you 12% recurring. Network income has begun.',
    milestones: ['✅ First homeowner review logged', '✅ Profile star rating initiated', '✅ First network referral commission', '✅ Subscription override: $17.88/mo passive'],
  },
  {
    id: 'year1',
    label: '📈 Year 1: Tier 2-3 + Growing Network',
    timeline: 'Month 12',
    income: '$3,000–$8,000/mo total',
    detail: 'At 10-50 matches you\'ve hit Tier 2-3 commission rates. Your network has 5-15 pros you\'ve referred. Subscription overrides, job overrides, and origination rights all compound monthly.',
    milestones: ['✅ Commission rate: 20–35%', '✅ 5–15 pros in your network', '✅ Passive income: $300–$900/mo', '✅ Origination rights: 8–20 DFW homes'],
  },
  {
    id: 'year3',
    label: '💰 Year 3: Substantial Passive Income',
    timeline: 'Year 3',
    income: '$8,000–$22,000/mo total',
    detail: 'Your network has grown 3 levels deep. Second-level pros are producing income you\'ve never had to service. Origination rights on 30-60 homes generate permanent recurring revenue independent of your own job volume.',
    milestones: ['✅ 3-level network: 20–80 pros', '✅ Passive override income: $1,500–$5,000/mo', '✅ Origination rights: 30–60 DFW homes', '✅ Total income exceeds W-2 replacement'],
  },
  {
    id: 'year5',
    label: '🏆 Year 5: Compounding Origination Rights',
    timeline: 'Year 5+',
    income: '$15,000–$45,000/mo total',
    detail: 'Origination rights are permanent and compound. Every home added to the ProLnk Vault in your origination territory generates a recurring share of platform fees — forever. Year 5 pros with 100+ homes originate serious passive income regardless of personal job volume.',
    milestones: ['✅ 100+ origination rights homes', '✅ Origination income: $3,000–$8,000/mo', '✅ Network fully self-sustaining', '✅ Option to reduce personal job volume'],
  },
];

export default function DFWProLnkProJourney2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = stages.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
          🔧 PROLNK DFW PRO JOURNEY 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>The Complete DFW Pro Journey with ProLnk</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          From Charter application to 5-figure passive income — here's exactly what happens and when for DFW service pros who join ProLnk at the Charter level.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '💼', label: 'Charter Tier Cost', val: '$149/mo locked' },
            { icon: '📊', label: 'Commission at Charter', val: '25% of match value' },
            { icon: '🔗', label: 'Network Levels', val: '4 levels deep' },
            { icon: '🏠', label: 'Origination Rights', val: 'Permanent per home' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🗺️ Select Your Pro Journey Stage</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Timeline: {result.timeline}</div>
              <div style={{ color: '#27ae60', fontWeight: 600, marginBottom: 10 }}>Income: {result.income}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 12, lineHeight: 1.6 }}>{result.detail}</div>
              {result.milestones.map(m => (
                <div key={m} style={{ color: '#94a3b8', marginBottom: 6, fontSize: 14 }}>{m}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>🔒 Charter Status Closes at 500 Applications</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Once 500 Charter pros are confirmed in DFW, this tier closes permanently. The locked $149/mo rate and 25% commission tier are exclusive to Charter members.</div>
        </div>
      </div>
    </div>
  );
}