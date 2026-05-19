import { useState } from 'react';

const engagementLevels = [
  { label: 'Waitlist Member — signed up early', value: 'waitlist' },
  { label: 'Active Homeowner — home in Vault, using platform', value: 'active' },
  { label: 'Connector — referred 3+ other homeowners', value: 'connector' },
  { label: 'Power User — referred 10+ homeowners + active on platform', value: 'power' },
];

type RewardResult = {
  rewards: string[];
  origination: string;
  credits: string[];
  maximize: string[];
};

const rewardData: Record<string, RewardResult> = {
  waitlist: {
    rewards: [
      '🌟 Early Adopter Badge — permanent recognition on your profile',
      '🔒 Founding Rate Lock — /bin/zsh/mo homeowner access fee, locked forever',
      '🎯 Priority matching when ProLnk launches — jump the queue',
      '📊 Home Health Vault access free for first 12 months',
    ],
    origination: 'As a waitlist member, you hold Origination Rights on your home. Once the platform launches, every service job fulfilled at your home generates a permanent micro-royalty — we estimate –/yr at average service volume.',
    credits: [
      'Join the waitlist: 500 ProLnk Credits',
      'Complete your Home Health profile: +250 Credits',
      'Refer another homeowner to waitlist: +1,000 Credits per referral',
    ],
    maximize: [
      'Complete your home profile now — early data = early origination rights',
      'Share your waitlist link — each referral earns 1,000 credits',
      'Add photos of major systems (HVAC, roof, electrical) to lock origination rate',
    ],
  },
  active: {
    rewards: [
      '💎 Active Homeowner Status — unlocks platform matching features',
      '📈 Origination Rights active — earning micro-royalties on every job',
      '🏆 Monthly Home Health Score report — track your home value metrics',
      '🔧 Priority service matching — Pros see your home first',
    ],
    origination: 'Your home is generating Origination Rights income. Each completed service job on your property contributes a micro-royalty (estimated /bin/zsh.50–.50/job). With 8–12 jobs/yr for an average DFW home, expect –/yr growing as platform scales.',
    credits: [
      'Complete a service booking: +100 Credits per job',
      'Leave a verified review: +200 Credits',
      'Update home systems data: +150 Credits',
      'Refer a neighbor: +1,000 Credits',
    ],
    maximize: [
      'Book all your service needs through ProLnk — each job adds origination value',
      'Keep home systems data current — data quality improves matching quality',
      'Refer neighbors in your area — builds your referral network income',
    ],
  },
  connector: {
    rewards: [
      '🔗 Connector Tier Status — unlocked at 3 homeowner referrals',
      '💰 Referral Override: earn % of platform fees from homes you originated',
      '📊 Dashboard access to track all referred homes and earnings',
      '🎁 Quarterly bonus credits for top connectors in your zip code',
    ],
    origination: 'You have Origination Rights on your home AND origination overrides on homes you referred. If you referred 3 neighbors, you receive a share of platform fees from all 3 of their homes — permanently. Estimated value: –/yr depending on service frequency across referred homes.',
    credits: [
      'Connector tier bonus: 5,000 Credits upon reaching 3 referrals',
      'Each additional referral: +1,000 Credits',
      'Referred home completes first booking: +500 bonus Credits',
      'Monthly active connector bonus: +250 Credits',
    ],
    maximize: [
      'Host a neighborhood referral event — DFW HOAs love this format',
      'Share your unique referral link in Nextdoor for your area',
      'Each referred home that stays active compounds your origination income',
    ],
  },
  power: {
    rewards: [
      '⚡ Power User Tier — top 5% of homeowner members',
      '🏅 Featured Member badge on your home profile',
      '💸 Enhanced Origination Rates — platform contributes additional basis points',
      '🎯 Early access to new ProLnk features before public launch',
      '🤝 Direct line to ProLnk success team for any issues',
    ],
    origination: 'Power Users receive maximum Origination Rights — your home generates the highest micro-royalty rate tier. Combined with 10+ referred homes, your origination income is estimated at –,500/yr at current platform projections. As ProLnk scales to thousands of Pros in DFW, this compounds significantly.',
    credits: [
      'Power User status bonus: 15,000 Credits',
      'Monthly power user allowance: 500 Credits',
      'Every referred home booking: +150 Credits',
      'Leaderboard top 10 in your zip: +2,500 Credits/quarter',
    ],
    maximize: [
      'You are in the top tier — focus on keeping referred homes active',
      'Introduce ProLnk to property managers and landlords — high-volume referrals',
      'Request your Origination Rights statement quarterly to track growth',
      'Consider referring commercial property owners — future platform expansion',
    ],
  },
};

export default function DFWHomeownerRewards() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? rewardData[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡💰⭐</div>
          <h1 style={{ margin: '0 0 12px', fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>ProLnk Homeowner Rewards</h1>
          <p style={{ margin: 0, fontSize: 17, opacity: 0.8, lineHeight: 1.6 }}>
            Your home earns for you. Discover what you unlock at every level.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔑', label: 'Origination Rights', desc: 'Permanent micro-royalty on every job at your home' },
            { icon: '💎', label: 'ProLnk Credits', desc: 'Earn credits for platform activity and referrals' },
            { icon: '🌟', label: 'Early Adopter', desc: 'Founding rate lock and priority access benefits' },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{item.label}</div>
              <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#F5E642′ }}>🏠 What describes you?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {engagementLevels.map(e => (
              <button key={e.value} onClick={() => setSelected(e.value)}
                style={{ padding: '14px 18px', borderRadius: 8, border: selected === e.value ? '2px solid #F5E642′ : '2px solid rgba(255,255,255,0.15)', background: selected === e.value ? ’rgba(245,230,66,0.12)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: selected === e.value ? 700 : 400, color: '#fff' }}>
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 14px', color: '#F5E642', fontSize: 16 }}>🎁 Your Rewards</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {result.rewards.map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 12, fontSize: 14, lineHeight: 1.5 }}>{r}</div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 10px', color: '#F5E642', fontSize: 16 }}>🔑 Your Origination Rights Value</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, opacity: 0.9 }}>{result.origination}</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: '0 0 12px', color: '#F5E642', fontSize: 16 }}>💎 How to Earn Credits</h3>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, opacity: 0.9, fontSize: 14 }}>
                {result.credits.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, color: '#0A1628′ }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 800 }}>⚡ How to Maximize Your Rewards</h3>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14, fontWeight: 500 }}>
                {result.maximize.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
