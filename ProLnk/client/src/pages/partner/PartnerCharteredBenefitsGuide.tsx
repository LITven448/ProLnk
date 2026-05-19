import { useState } from 'react';

const COMPARE_OPTIONS = ['Founding Member (post-Charter)', 'L3 Member (post-Charter)', 'L4 / General (post-Charter)', 'Never Joined'];

interface BenefitRow {
  label: string;
  charter: string;
  compare: Record<string, string>;
  highlight: boolean;
}

const benefitRows: BenefitRow[] = [
  { label: 'Monthly Fee', charter: '$149/mo locked forever', compare: { 'Founding Member (post-Charter)': '$149/mo (not locked)', 'L3 Member (post-Charter)': '$179/mo', 'L4 / General (post-Charter)': '$199/mo', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Direct Commission Floor', charter: '25% (never drops)', compare: { 'Founding Member (post-Charter)': '20%', 'L3 Member (post-Charter)': '15%', 'L4 / General (post-Charter)': '12%', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Commission Ceiling', charter: '70% (at 500+ matches)', compare: { 'Founding Member (post-Charter)': '70%', 'L3 Member (post-Charter)': '70%', 'L4 / General (post-Charter)': '70%', 'Never Joined': 'N/A' }, highlight: false },
  { label: 'Pro Network Override (L1)', charter: '7%', compare: { 'Founding Member (post-Charter)': '4%', 'L3 Member (post-Charter)': '3%', 'L4 / General (post-Charter)': '1%', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Subscription Override', charter: '12% recurring', compare: { 'Founding Member (post-Charter)': '6%', 'L3 Member (post-Charter)': '3%', 'L4 / General (post-Charter)': '1.5%', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Origination Rights', charter: '1.5% permanent', compare: { 'Founding Member (post-Charter)': '0.75%', 'L3 Member (post-Charter)': '0.5%', 'L4 / General (post-Charter)': '0.25%', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Network Depth', charter: '4 levels', compare: { 'Founding Member (post-Charter)': '3 levels', 'L3 Member (post-Charter)': '2 levels', 'L4 / General (post-Charter)': '1 level', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Total Charter Spots', charter: '25 only', compare: { 'Founding Member (post-Charter)': '100 spots', 'L3 Member (post-Charter)': '400 spots', 'L4 / General (post-Charter)': 'Unlimited', 'Never Joined': 'N/A' }, highlight: false },
  { label: 'Rate Lock Guarantee', charter: 'Yes — contractual', compare: { 'Founding Member (post-Charter)': 'No', 'L3 Member (post-Charter)': 'No', 'L4 / General (post-Charter)': 'No', 'Never Joined': 'N/A' }, highlight: true },
  { label: 'Priority Match Routing', charter: 'Yes', compare: { 'Founding Member (post-Charter)': 'No', 'L3 Member (post-Charter)': 'No', 'L4 / General (post-Charter)': 'No', 'Never Joined': 'N/A' }, highlight: false },
];

const charterPerks = [
  { emoji: '🔒', title: '$149/Month — Forever', desc: 'Locked by contract. When ProLnk raises prices (and it will), you never pay more. Founding price, forever.' },
  { emoji: '📈', title: '25% Commission Floor', desc: 'You start where others peak. Standard members begin at 12%. You\’re already at 25% on day one and climb the same way they do.' },
  { emoji: '🌲', title: '4-Level Cascade Network', desc: 'Earn 7%, 4%, 2%, and 1% down 4 levels of your network. Standard members only earn 1 level deep.' },
  { emoji: '🏛️', title: '1.5% Permanent Origination Rights', desc: 'Every home you add to the Home Health Vault generates 1.5% of platform fees from that address — forever. Standard: 0.25%.' },
  { emoji: '🏅', title: 'Charter Founding Status', desc: 'Permanent record as one of the first 25 Charter members. This is the ProLnk equivalent of being a series seed investor.' },
  { emoji: '💬', title: 'Direct Founder Access', desc: 'Charter members have a direct line to the founding team. Your feedback shapes the roadmap before anyone else sees it.' },
];

export default function PartnerCharteredBenefitsGuide() {
  const [compareWith, setCompareWith] = useState(COMPARE_OPTIONS[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏅</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Charter Member Benefits — Deep Dive</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>Everything locked in forever at Charter tier. 25 spots total. What you get vs. what you give up if you wait.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginBottom: 28 }}>
          {charterPerks.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{p.emoji}</div>
              <h3 style={{ color: '#0A1628', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
              <p style={{ color: '#64748B', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, margin: 0 }}>📊 Charter vs. What Comes After</h2>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', marginRight: 8 }}>Compare Charter with:</label>
              <select value={compareWith} onChange={e => setCompareWith(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, color: '#0A1628' }}>
                {COMPARE_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 14px', background: '#F8FAFC', color: '#64748B', fontSize: 12, fontWeight: 600, borderRadius: '8px 0 0 0' }}>Benefit</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', background: '#0A1628', color: '#F5E642', fontSize: 12, fontWeight: 700 }}>🏅 Charter</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', background: '#F8FAFC', color: '#64748B', fontSize: 12, fontWeight: 600, borderRadius: '0 8px 0 0' }}>{compareWith}</th>
                </tr>
              </thead>
              <tbody>
                {benefitRows.map((row, i) => (
                  <tr key={i} style={{ background: row.highlight ? '#FFFBEB' : '#fff' }}>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #F1F5F9', color: '#334155', fontSize: 13, fontWeight: row.highlight ? 600 : 400 }}>{row.label}</td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #F1F5F9', textAlign: 'center', color: '#065F46', fontSize: 13, fontWeight: 700 }}>{row.charter}</td>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid #F1F5F9', textAlign: 'center', color: row.compare[compareWith] === 'N/A' ? '#9CA3AF' : '#DC2626', fontSize: 13 }}>{row.compare[compareWith]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 20, background: '#FEF2F2', borderRadius: 8, padding: 14, border: '1px solid #FECACA' }}>
            <p style={{ color: '#991B1B', fontWeight: 700, margin: '0 0 4px', fontSize: 13 }}>⚠️ What closes at 500 applications</p>
            <p style={{ color: '#7F1D1D', margin: 0, fontSize: 13, lineHeight: 1.6 }}>Charter tier is the only tier that closes. All other tiers remain available after 500 applications. But the contractual rate lock, 25% floor, 7% L1 override, 12% subscription rate, 1.5% origination rights, and 4-level depth — those are Charter-only and gone when Charter closes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
