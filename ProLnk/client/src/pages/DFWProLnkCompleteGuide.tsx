import { useState } from 'react';

const incomeStreams = [
  { icon: '💼', label: 'Stream 1: Direct Commission', desc: 'Earn 12–70% of match value based on your tier. New members start at 12%. Reach 500+ matches and earn 70% on every job.' },
  { icon: '🌐', label: 'Stream 2: Pro Network Override', desc: 'Earn 1% of earnings from pros you recruit, 0.5% from their recruits, 0.25% level 3, 0.1% level 4. Four levels deep — residual income that scales with your network.' },
  { icon: '🔁', label: 'Stream 3: Subscription Override', desc: 'When a pro you refer pays $149/mo, you earn 12% recurring. 10 active pros = $178/mo from subscriptions alone.' },
  { icon: '🏠', label: 'Stream 4: Homeowner Override', desc: 'Earn a per-lead fee for every homeowner you source. Negotiate your rate directly with ProLnk — typical range $25–100 per qualified homeowner.' },
  { icon: '🏛️', label: 'Stream 5: Home Origination Rights', desc: 'When you add a home to the Home Health Vault, you earn a permanent share of all platform fees generated from that home — forever.' },
];

const tiers = [
  { name: 'Charter', spots: 25, price: '$149/mo', perks: 'Locked rate forever, 72% keep, founding badge, priority leads, highest override rates' },
  { name: 'Founding', spots: 100, price: '$149/mo', perks: '72% keep, founding badge, priority queue, full 5-stream income' },
  { name: 'Level 3', spots: 400, price: '$149/mo', perks: '72% keep, full 5-stream income, standard onboarding' },
  { name: 'Level 4', spots: 1600, price: '$149/mo', perks: '72% keep, full 5-stream income' },
];

const situations = [
  { id: 'homeowner', label: '🏠 I\’m a Homeowner', content: 'ProLnk connects you with vetted, licensed HVAC and home service professionals in DFW. Submit your job — ProLnk matches you with 3–5 qualified pros. You compare quotes and choose. No pressure. DFW launch expected late 2026. Join the homeowner waitlist to be first in your zip code.' },
  { id: 'pro', label: '🔧 I\’m a Service Pro', content: 'ProLnk delivers exclusive, real-time leads to your phone. Charter and Founding members lock in $149/mo forever — rate never increases. You keep 72% of every match fee. Waitlist closes at 500 total applicants + 5,000 homes. Apply now before it closes.' },
  { id: 'partner', label: '🤝 I Want to Be a Partner', content: 'Partners recruit pros and homeowners into the ProLnk ecosystem and earn across all 5 income streams. Your network of recruited pros generates passive override income at 4 levels deep. Best for networkers, contractors, insurance agents, and real estate professionals already in the DFW home services space.' },
  { id: 'investor', label: '💡 I\’m an Investor', content: 'ProLnk is a two-sided marketplace with 85% target margins at scale. The Home Health Vault creates a permanent data asset across 50M+ homes. The 5-stream network income model creates switching costs that make retention near-automatic. Seed round in progress — contact andrew@prolnk.io.' },
];

export default function DFWProLnkCompleteGuide() {
  const [activeSituation, setActiveSituation] = useState('');
  const [activeStream, setActiveStream] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>PROLNK PLATFORM GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🔗 The Complete ProLnk Reference</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 32 }}>Everything about the platform — income streams, matching, DFW status, Charter waitlist, and what comes next. One page. No fluff.</p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>💰 5 Income Streams</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {incomeStreams.map((s, i) => (
            <button key={i} onClick={() => setActiveStream(i)}
              style={{ background: activeStream === i ? '#F5E642′ : '#132035', color: activeStream === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {s.icon} Stream {i + 1}
            </button>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 8 }}>{incomeStreams[activeStream].icon} {incomeStreams[activeStream].label}</h3>
          <p style={{ color: '#C8D8E8', lineHeight: 1.7, margin: 0 }}>{incomeStreams[activeStream].desc}</p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🏷️ Membership Tiers — Waitlist Closes at 2,125</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ background: '#132035', borderRadius: 10, padding: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: i === 0 ? '#F5E642′ : '#fff' }}>{t.name} — {t.spots} spots</div>
                <div style={{ color: '#8FA3BF', fontSize: 13, marginTop: 4 }}>{t.perks}</div>
              </div>
              <div style={{ color: '#4ADE80', fontWeight: 800 }}>{t.price}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>⚙️ How Matching Works</h2>
        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            {['Homeowner submits job request (trade, zip, urgency)', 'ProLnk AI scores the lead for quality and match probability', 'System routes to 3–5 best-fit pros in that territory', 'Pros receive real-time notification and can accept or pass', 'Homeowner gets 3 verified contacts within minutes', 'Match fee charged on acceptance — no lead, no fee'].map((step, i) => (
              <li key={i} style={{ color: '#C8D8E8', lineHeight: 2.1, fontSize: 14 }}>{step}</li>
            ))}
          </ol>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🎯 Your ProLnk Guide</h2>
        <div style={{ background: '#132035', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setActiveSituation(s.id)}
                style={{ background: activeSituation === s.id ? '#F5E642′ : '#0A1628', color: activeSituation === s.id ? '#0A1628' : '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {s.label}
              </button>
            ))}
          </div>
          {activeSituation && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#C8D8E8', lineHeight: 1.7, fontSize: 14 }}>
              {situations.find(s => s.id === activeSituation)?.content}
            </div>
          )}
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 20, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🚀 DFW Charter Waitlist</div>
          <p style={{ color: '#C8D8E8', marginBottom: 16 }}>25 Charter spots. $149/mo locked for life. Waitlist closes at 500 applications + 5,000 homes. DFW launch 2026.</p>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, display: 'inline-block' }}>Apply at prolnk.io →</div>
        </div>
      </div>
    </div>
  );
}
