import { useState } from 'react';

const tradeProfiles = [
  { trade: 'HVAC', avgReferralJobs: 3.2, bestChannels: ['Nextdoor', 'Google Reviews', 'Neighbor word-of-mouth'], closeRate: 68 },
  { trade: 'Electrical', avgReferralJobs: 2.8, bestChannels: ['Google Reviews', 'Facebook neighborhood groups', 'Past customer follow-up'], closeRate: 72 },
  { trade: 'Plumbing', avgReferralJobs: 4.1, bestChannels: ['Nextdoor', 'Google Reviews', 'Immediate neighbor ask after job'], closeRate: 75 },
  { trade: 'Roofing', avgReferralJobs: 2.1, bestChannels: ['Door-to-door after storm', 'Google Reviews', 'Insurance agent referral'], closeRate: 55 },
  { trade: 'General Contractor', avgReferralJobs: 1.9, bestChannels: ['Realtor referrals', 'Google Reviews', 'Past client follow-up'], closeRate: 48 },
];

const tactics = [
  { icon: '⭐', title: 'Ask for the Google Review Before You Leave', desc: 'Text the homeowner your Google review link before you pack up your truck. Response rate drops by 60% if you wait 24 hours.' },
  { icon: '🏘️', title: 'The Nextdoor Neighbor Method', desc: 'After every job, ask: "Would you mind posting on Nextdoor that you used us? We\’re trying to serve more neighbors in this area." One post = 3–8 new inquiries on average.' },
  { icon: '📸', title: 'Before/After on Facebook Groups', desc: 'DFW has 200+ neighborhood Facebook groups. Post a before/after with homeowner permission. Tag the neighborhood. Boost is free if you\’re a local member.' },
  { icon: '📞', title: '30-Day Follow-Up Call', desc: 'Call every customer 30 days after job. Ask how everything is holding up. Ask if they know anyone who needs your service. 23% of referrals come from this single touchpoint.' },
  { icon: '💌', title: 'Referral Card Left at Job Site', desc: 'Leave 3 business cards at every DFW home with a handwritten note: "If your neighbors ask, give them one of these." Simple. Works.' },
  { icon: '🎁', title: 'Refer-a-Neighbor Incentive', desc: 'Offer $25 off their next service for every neighbor they refer who books. In DFW, this pays back 8x on average.' },
];

export default function DFWBuildingBetterReferralsGuide() {
  const [trade, setTrade] = useState('');
  const [currentReferrals, setCurrentReferrals] = useState('');
  const [result, setResult] = useState<null | { profile: typeof tradeProfiles[0]; addedJobs: number; annualValue: number }>(null);

  function buildPlan() {
    const profile = tradeProfiles.find(p => p.trade === trade) || tradeProfiles[0];
    const current = parseInt(currentReferrals, 10) || 0;
    const gap = Math.max(0, profile.avgReferralJobs - current);
    const addedJobs = Math.round(gap * 12 * (profile.closeRate / 100));
    const annualValue = addedJobs * 850;
    setResult({ profile, addedJobs, annualValue });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Building Better Referrals — DFW Service Businesses
          </h1>
          <p style={{ fontSize: 16, color: '#9BB0CC', maxWidth: 640, margin: '0 auto' }}>
            DFW homeowners choose contractors through referrals 71% of the time. Referrals close faster,
            complain less, and refer again. Here's how to build a system that runs without you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '📊', label: 'DFW Referral Rate', val: '71% of homeowners choose via referral' },
            { icon: '💵', label: 'Referral Job Value', val: 'Closes 2.8x faster, 18% higher ticket' },
            { icon: '🔄', label: 'Compound Effect', val: 'Each referral customer refers 1.4 more' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#9BB0CC', fontSize: 13 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginBottom: 40 }}>
          {tactics.map(t => (
            <div key={t.title} style={{ background: '#0F2040', borderRadius: 12, padding: 22, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 6, fontSize: 15 }}>{t.title}</div>
              <div style={{ color: '#9BB0CC', fontSize: 13, lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📈 Your Referral Opportunity Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Your Trade</label>
              <select
                value={trade}
                onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Select trade</option>
                {tradeProfiles.map(p => <option key={p.trade} value={p.trade}>{p.trade}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Referrals Per Month (Current)</label>
              <input
                type="number"
                value={currentReferrals}
                onChange={e => setCurrentReferrals(e.target.value)}
                placeholder="e.g. 1″
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <button
            onClick={buildPlan}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >
            Build My Referral Plan →
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 12 }}>
                📊 {result.profile.trade} Referral Plan for DFW
              </div>
              <div style={{ color: '#ccc', fontSize: 15, lineHeight: 1.8 }}>
                <div>🎯 DFW average for your trade: <strong>{result.profile.avgReferralJobs} referrals/month</strong></div>
                <div>📈 Best channels for {result.profile.trade}: <strong>{result.profile.bestChannels.join(', ')}</strong></div>
                <div>✅ Expected close rate on referrals: <strong>{result.profile.closeRate}%</strong></div>
                <div>💼 Additional booked jobs per year (if you hit average): <strong>{result.addedJobs} jobs</strong></div>
                <div>💰 Estimated additional annual revenue: <strong>${result.annualValue.toLocaleString()}</strong></div>
                <div>🤝 ProLnk referrals: <strong>Supplement your network with verified homeowner leads in your DFW zip codes</strong></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🤝 ProLnk Fills the Gaps Between Referrals</h3>
          <p style={{ color: '#9BB0CC', lineHeight: 1.7, margin: 0 }}>
            Referrals are the gold standard—but they're inconsistent. ProLnk routes verified homeowner leads to you
            in the DFW zip codes you serve, so slow referral weeks don't mean empty trucks. Every ProLnk job you complete
            well becomes a referral opportunity in that neighborhood. Build both channels and your pipeline becomes predictable.
          </p>
        </div>

      </div>
    </div>
  );
}
