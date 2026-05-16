import { useState } from 'react';

const trades = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Landscaping', 'Painting', 'General Contractor', 'Handyman'];
const presenceLevels = ['No online presence', 'Google only', 'Google + Facebook', 'Multiple platforms active'];

type OnlineRec = { platforms: string[]; whatToPost: string[]; reviewStrategy: string };

const onlineData: Record<string, Record<string, OnlineRec>> = {
  'HVAC': {
    'No online presence': { platforms: ['Google Business Profile (start here, free)', 'Facebook Business Page (HVAC homeowners are 35-55, Facebook dominant)', 'Next: Nextdoor (neighborhood trust)'], whatToPost: ['Before/after of system replacement', 'Energy bill savings testimonials', 'Maintenance tips (change filter reminders)', 'Summer cooling cost tips for DFW heat'], reviewStrategy: 'Text customers a Google review link 24 hours after service. Subject: "How did we do?" HVAC replacements average $8K — a review here is worth $500+ in referrals.' },
    'Google + Facebook': { platforms: ['Optimize existing Google profile with Q&A and posts', 'Facebook: add Services tab and pricing range', 'Add Instagram for equipment install photos', 'Consider YouTube for "how to know if your AC needs replacing"'], whatToPost: ['Weekly DFW temperature forecast + AC efficiency tips', 'System installs with homeowner permission', 'Meet the technician posts for trust', 'Before/after ductwork or coil cleaning'], reviewStrategy: 'Add automated review request to invoicing software. Target 2+ reviews per week. Respond to every review within 24 hours — Google ranks businesses that engage.' },
  },
  'Plumbing': {
    'No online presence': { platforms: ['Google Business Profile (emergency searches happen on Google first)', 'Facebook (DFW homeowner groups are very active for plumber recommendations)', 'Nextdoor (pipe burst emergencies start with neighbor asks)'], whatToPost: ['Pipe repair before/afters', 'Drain cleaning results', 'Water heater installation photos', 'Winter pipe protection tips (DFW freeze season)'], reviewStrategy: 'Plumbing is highly referral-driven. Ask for reviews at payment. "Could you leave us a Google review? It takes 60 seconds and helps our family business." Handwritten ask beats automated.' },
    'Google + Facebook': { platforms: ['Upgrade Google with 20+ photos and weekly posts', 'Facebook: join local DFW homeowner groups and answer questions', 'Instagram: pipe work photos perform well with right hashtags', 'Consider Yelp (plumbing searches on Yelp still significant in DFW)'], whatToPost: ['Drain camera inspection videos', 'Code compliance updates (DFW permit changes)', 'Hot water heater efficiency comparisons', 'Water quality tips for DFW hard water'], reviewStrategy: 'Plumbing emergencies generate grateful customers — the best time to ask for a review is while still on-site after solving a crisis. Carry a review card with QR code.' },
  },
};

const defaultRec: OnlineRec = { platforms: ['Google Business Profile — mandatory first step (free)', 'Facebook Business Page — DFW homeowners 35-55 live here', 'Nextdoor Business — highest trust per impression of any platform', 'Instagram — visual trades (roofing, landscaping, painting) perform extremely well'], whatToPost: ['Job before/afters (get permission, tag neighborhood)', 'Seasonal tips relevant to DFW weather', 'Team photos and behind-the-scenes', 'Customer testimonials with photo', 'Educational content: "when to replace vs repair"'], reviewStrategy: 'Ask for reviews the moment the job is complete and the homeowner is happiest. Text a direct link to your Google review page. Target 2+ reviews per week minimum. Respond to all reviews within 48 hours.' };

export default function DFWContractorOnlinePresenceGuide() {
  const [trade, setTrade] = useState('');
  const [presence, setPresence] = useState('');
  const [result, setResult] = useState<OnlineRec | null>(null);

  const handleGenerate = () => {
    const rec = onlineData[trade]?.[presence] ?? defaultRec;
    setResult(rec);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PROLNK PRO GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>🌐 DFW Contractor Online Presence Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.7 }}>87% of DFW homeowners research contractors online before calling. Your online presence is your first impression, your review history, and your 24/7 sales team — all in one.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '📍', title: 'Google Business', pct: '87%', desc: 'of DFW homeowners start contractor search on Google' }, { icon: '👥', title: 'Facebook Groups', pct: '63%', desc: 'of DFW homeowner group members ask for contractor recommendations' }, { icon: '🏘️', title: 'Nextdoor', pct: '71%', desc: 'of DFW Nextdoor users trust neighborhood contractor recommendations' }].map((item) => (
            <div key={item.title} style={{ background: '#111f3a', borderRadius: '8px', padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.75rem' }}>{item.pct}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: '12px', padding: '1.75rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>📊 Get Your Online Presence Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Trade</label>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select trade...</option>
                {trades.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Current Online Presence</label>
              <select value={presence} onChange={(e) => setPresence(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select level...</option>
                {presenceLevels.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={!trade || !presence} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', cursor: trade && presence ? 'pointer' : 'not-allowed', opacity: trade && presence ? 1 : 0.5 }}>Get My Plan →</button>
          {result && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PRIORITY PLATFORMS</div>{result.platforms.map((p, i) => <div key={p} style={{ color: '#e2e8f0', fontSize: '0.9rem', padding: '0.35rem 0', borderBottom: '1px solid #1e3a5f' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span> {p}</div>)}</div>
              <div style={{ marginBottom: '1.25rem' }}><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>WHAT TO POST</div>{result.whatToPost.map((p) => <div key={p} style={{ color: '#e2e8f0', fontSize: '0.9rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>📸 {p}</div>)}</div>
              <div style={{ background: '#0d1f3c', borderRadius: '6px', padding: '1rem', border: '1px solid #1e3a5f' }}><div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>⭐ REVIEW STRATEGY</div><div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>{result.reviewStrategy}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '8px', padding: '1.25rem', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 ProLnk Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>Your ProLnk profile is indexed by search engines. A complete ProLnk profile with your trade keywords, service area, and reviews ranks for DFW contractor searches. It extends your online presence automatically — with zero extra effort.</div>
        </div>
      </div>
    </div>
  );
}
