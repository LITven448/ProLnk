import { useState } from 'react';

const faqs = [
  { cat: 'general', q: 'What is ProLnk?', a: 'ProLnk is a two-sided marketplace connecting DFW homeowners with vetted, licensed home service professionals. We use AI matching to route jobs to the right contractor — automatically.' },
  { cat: 'general', q: 'When does ProLnk launch?', a: 'The waitlist is open now. Full platform launch with live matching begins in Q3 2026. Charter and Founding partners lock in their rate today.' },
  { cat: 'general', q: 'What markets does ProLnk serve?', a: 'DFW is the launch market. Additional metros are planned for 2027 based on partner density and homeowner demand.' },
  { cat: 'general', q: 'Is ProLnk a franchise or MLM?', a: 'No. ProLnk is a technology platform. The Network Income System is a referral-based commission structure for licensed contractors — not a franchise or pyramid scheme.' },
  { cat: 'general', q: 'Who runs ProLnk?', a: 'ProLnk is built and operated by LIT Ventures, based in DFW. The team has deep roots in home services, technology, and B2B marketplace operations.' },
  { cat: 'homeowner', q: 'How do I request a service?', a: 'Submit your job in 60 seconds — trade type, description, urgency. Smart Match routes your request to up to 3 qualified contractors in your area.' },
  { cat: 'homeowner', q: 'Is there a fee to use ProLnk as a homeowner?', a: 'No. ProLnk is free for homeowners. You pay the contractor directly for their work. ProLnk earns a platform fee from contractors.' },
  { cat: 'homeowner', q: 'How do I know contractors are vetted?', a: 'All ProLnk partners are verified for trade license, insurance, and identity before their first match. You also see their platform rating and completion history.' },
  { cat: 'homeowner', q: 'What is the Home Health Vault?', a: 'A secure digital file for your home — appliance records, warranties, permits, inspections. It travels with your address and improves the quality of every future service call.' },
  { cat: 'homeowner', q: 'Can I earn money as a homeowner?', a: 'Yes. Enroll your home in the Vault and earn a permanent micro-share of platform fees tied to your address — called Origination Rights Income. Phase 2 feature.' },
  { cat: 'homeowner', q: 'What if I am unhappy with a contractor?', a: 'Report the issue in the app. ProLnk reviews disputes within 24 hours. Contractors with repeated complaints lose match priority and can be removed from the platform.' },
  { cat: 'homeowner', q: 'How fast do I get quotes?', a: 'Emergency requests: under 30 minutes. Urgent (same-day): under 2 hours. Planned work: 24–48 hours.' },
  { cat: 'partner', q: 'Who qualifies as a ProLnk partner?', a: 'Any licensed home service contractor operating in DFW — plumbing, HVAC, electrical, roofing, general contracting, and more. You must hold a valid state or local trade license.' },
  { cat: 'partner', q: 'What does the $149/mo subscription include?', a: 'Platform access, job feed, income dashboard, network tools, origination rights tracker, and team communication. No per-lead fee. Your rate is locked at your founding tier forever.' },
  { cat: 'partner', q: 'How does job matching work?', a: 'Smart Match analyzes urgency, your location and availability, past ratings, and DFW market conditions. You receive a push notification and have 15 minutes to accept.' },
  { cat: 'partner', q: 'What happens if I decline too many jobs?', a: 'Declining drops your match priority score. Three consecutive unexplained declines trigger an account review. Set your schedule accurately to avoid ghost declines.' },
  { cat: 'partner', q: 'Can I work in multiple trades?', a: 'Yes, if you hold licenses for each trade. Each trade has its own feed and match priority score.' },
  { cat: 'income', q: 'What are the 5 income streams?', a: 'Direct job commissions, 4-level referral override (on partner earnings), subscription override (on partner subs you refer), homeowner lead override, and origination rights income from homes you enroll.' },
  { cat: 'income', q: 'What is my commission rate at each tier?', a: 'New (0–9 matches): 12%. Active (10–49): 20%. Growth (50–99): 35%. Elite (100–499): 50%. Legend (500+): 70%. Tiers advance automatically.' },
  { cat: 'income', q: 'How does the referral network pay me?', a: 'Level 1 (direct recruits): 1% of their job earnings. Level 2: 0.5%. Level 3: 0.25%. Level 4: 0.1%. This is paid monthly in addition to your own commission.' },
  { cat: 'income', q: 'When are payouts processed?', a: 'Monthly, on the 15th of each month for the prior month earnings. Payouts go via direct deposit or ACH.' },
  { cat: 'income', q: 'Is there a minimum payout threshold?', a: 'Yes. Minimum payout is $25. Balances below $25 roll to the next month.' },
  { cat: 'safety', q: 'How does ProLnk verify contractor identity?', a: 'License lookup via state databases, ID verification, and insurance certificate review. All checks must pass before first match activation.' },
  { cat: 'safety', q: 'Is my personal information shared with contractors?', a: 'Your full address is hidden until a match is accepted. Contractors see your neighborhood and job description only during the bid phase.' },
  { cat: 'safety', q: 'What data does ProLnk store about my home?', a: 'Only what you upload to the Home Health Vault. ProLnk does not pull third-party property data without your consent. CCPA and GDPR compliant.' },
];

const categories = [
  { key: 'all', label: '📋 All' },
  { key: 'general', label: '🌐 General' },
  { key: 'homeowner', label: '🏠 Homeowner' },
  { key: 'partner', label: '🤝 Partner' },
  { key: 'income', label: '💰 Income' },
  { key: 'safety', label: '🔒 Safety' },
];

export default function ProLnkFAQ2026() {
  const [catFilter, setCatFilter] = useState('all');
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const userMap: Record<string, string[]> = {
    homeowner: ['general', 'homeowner', 'safety'],
    partner: ['general', 'partner', 'income', 'safety'],
  };

  const activeCats = userType ? userMap[userType] : null;
  const filtered = faqs.filter(f => {
    if (activeCats && !activeCats.includes(f.cat)) return false;
    if (catFilter !== 'all' && f.cat !== catFilter) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❓</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>ProLnk FAQ 2026</h1>
          <p style={{ color: '#64748b', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            25 answers to the most common questions from homeowners and partners.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>Filter by user type:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['homeowner', 'partner'].map(t => (
              <button key={t} onClick={() => { setUserType(userType === t ? null : t); setCatFilter('all'); }} style={{
                padding: '8px 18px', borderRadius: 8, border: userType === t ? '2px solid #0A1628' : '1px solid #e2e8f0',
                background: userType === t ? '#0A1628' : '#fff', color: userType === t ? '#F5E642' : '#0f172a',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{t === 'homeowner' ? '🏠 Homeowner' : '🤝 Partner'}</button>
            ))}
            {userType && <button onClick={() => setUserType(null)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f1f5f9', color: '#64748b', cursor: 'pointer', fontSize: 13 }}>✕ Clear</button>}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {categories.map(c => (
            <button key={c.key} onClick={() => setCatFilter(c.key)} style={{
              padding: '7px 16px', borderRadius: 8, border: catFilter === c.key ? '2px solid #0A1628' : '1px solid #e2e8f0',
              background: catFilter === c.key ? '#0A1628' : '#fff', color: catFilter === c.key ? '#F5E642' : '#0f172a',
              cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>{c.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((item, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                width: '100%', padding: '16px 20px', textAlign: 'left', background: 'none', border: 'none',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: '#0A1628', lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ fontSize: 18, color: '#64748b', marginLeft: 12, flexShrink: 0 }}>{openIdx === i ? '−' : '+'}</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 20px 18px', color: '#475569', fontSize: 14, lineHeight: 1.8 }}>{item.a}</div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>No questions match this filter combination.</div>
          )}
        </div>
      </div>
    </div>
  );
}
