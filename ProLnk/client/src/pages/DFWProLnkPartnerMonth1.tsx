import { useState } from 'react';

const tradeOptions = ['Plumbing', 'HVAC/AC', 'Electrical', 'Roofing', 'Foundation', 'General Contractor', 'Landscaping', 'Pest Control', 'Real Estate', 'Non-trade professional'];
const submarketOptions = ['North Dallas/Plano/Frisco', 'Fort Worth/West Side', 'East Dallas/Garland', 'Mid-Cities/Arlington', 'Southlake/Colleyville', 'McKinney/Allen/Prosper', 'Irving/Las Colinas', 'South DFW/Mansfield'];

const milestones = [
  { week: 'Week 1', icon: '🚀', title: 'Activation', desc: 'Profile complete, first 3 referrals submitted, first sub-partner conversation had.' },
  { week: 'Week 2', icon: '🔁', title: 'Momentum', desc: 'First referral accepted by a pro. 2nd sub-partner identified. Daily outreach routine established.' },
  { week: 'Week 3', icon: '💡', title: 'First Match', desc: 'First homeowner matched to a DFW pro. Commission pending. Origination rights attached to that home.' },
  { week: 'Week 4', icon: '🌐', title: 'Network Effect', desc: 'First sub-partner activated. Level-2 earnings potential unlocked. Month 1 earnings reviewed.' },
];

const tradeAdvantage: Record<string, string> = {
  'Plumbing': 'Slab leak + water heater replacement are top DFW needs — your trade knowledge makes referrals highly credible.',
  'HVAC/AC': 'DFW\’s 100°F summers mean HVAC is the #1 homeowner pain — you know when a system is failing before they do.',
  'Electrical': 'Panel upgrades and EV chargers are surging in DFW new-builds — position as the electrical authority.',
  'Roofing': 'DFW hail season (March-June) creates massive demand spikes — time referrals around storm activity.',
  'Foundation': 'Clay soil is unique to DFW — your expertise in pier systems is a major credibility advantage.',
  'General Contractor': 'You see all trades at once — widest referral opportunity per homeowner interaction.',
  'Landscaping': 'You visit homes regularly — highest touchpoint frequency means most referral opportunities.',
  'Pest Control': 'Termites and pest issues often reveal other home problems — natural cross-sell to ProLnk services.',
  'Real Estate': 'Buyers and sellers both need home services — pre-listing and post-closing are your golden windows.',
  'Non-trade professional': 'Focus on homeowner trust — position as the connector who simplifies the DFW contractor search.',
};

const submarketFocus: Record<string, string> = {
  'North Dallas/Plano/Frisco': 'High-income, newer homes with upgrade demand. Focus on smart home, outdoor living, and luxury trade upgrades.',
  'Fort Worth/West Side': 'Strong community roots. In-person networking and church/civic groups outperform digital here.',
  'East Dallas/Garland': 'Older homes with high deferred maintenance. Foundation, roof, and HVAC are top needs.',
  'Mid-Cities/Arlington': 'Mix of old and new. High contractor density — find sub-partners among local trade networks.',
  'Southlake/Colleyville': 'Premium market. Vetted pro quality is the pitch — these homeowners will pay for trust.',
  'McKinney/Allen/Prosper': 'Fastest-growing DFW corridor. Builder warranty cliffs create surge at years 2-4 post-build.',
  'Irving/Las Colinas': 'High corporate renter-to-buyer conversion. Reach new DFW arrivals through relocation networks.',
  'South DFW/Mansfield': 'Family-centric community. PTA, HOA, and youth sports networks are high-trust referral channels.',
};

export default function DFWProLnkPartnerMonth1() {
  const [trade, setTrade] = useState('');
  const [submarket, setSubmarket] = useState('');
  const [generated, setGenerated] = useState(false);
  const ready = trade && submarket;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 8 }}>📆 PROLNK PARTNER SYSTEM</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Month 1 Partner Roadmap</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>From 0 to first matches in DFW — your complete 30-day roadmap with milestones, strategy, and earnings targets.</p>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your trade or professional background?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {tradeOptions.map(t => (
              <button key={t} onClick={() => setTrade(t)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: trade === t ? '#F5E642' : '#1e3a5f',
                  background: trade === t ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: trade === t ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your primary DFW submarket?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {submarketOptions.map(s => (
              <button key={s} onClick={() => setSubmarket(s)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                  borderColor: submarket === s ? '#F5E642' : '#1e3a5f',
                  background: submarket === s ? 'rgba(245,230,66,0.12)' : 'transparent',
                  color: submarket === s ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setGenerated(true)} disabled={!ready}
          style={{ width: '100%', padding: '16px', background: ready ? '#F5E642' : '#1e3a5f',
            color: ready ? '#0A1628' : '#4a6080', border: 'none', borderRadius: 12,
            fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed' }}>
          {ready ? 'Build My Month 1 Roadmap →' : 'Select trade and submarket to continue'}
        </button>

        {generated && (
          <div style={{ marginTop: 24 }}>
            <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚡ Your Trade Advantage: {trade}</div>
              <div style={{ fontSize: 14, color: '#cbd5e1' }}>{tradeAdvantage[trade] || tradeAdvantage['Non-trade professional']}</div>
            </div>
            <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📍 {submarket} Submarket Playbook</div>
              <div style={{ fontSize: 14, color: '#cbd5e1' }}>{submarketFocus[submarket] || submarketFocus['Irving/Las Colinas']}</div>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📊 Month 1 Milestone Targets</div>
            {milestones.map((m, i) => (
              <div key={i} style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', marginBottom: 12, display: 'flex', gap: 14 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{m.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{m.week}: {m.title}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{m.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ background: '#0f1f3a', borderRadius: 12, padding: '20px 24px', marginTop: 4 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>💰 Month 1 Earnings Potential</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
                {[['Conservative', '1-2 matches', '$150-400'], ['Target', '3-5 matches', '$450-900'], ['Stretch', '8+ matches', '$1,200+']].map(([label, matches, earn]) => (
                  <div key={label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 8px' }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 2 }}>{earn}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{matches}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 13, color: '#64748b' }}>Plus origination rights attach permanently to every home you bring into the ProLnk network.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
