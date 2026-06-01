import { useState } from 'react';

const TIERS = [
  { id: 'solo', label: '🔧 Solo Tech (1 person)', leads: '8-15/mo', income: '$4,200-$7,800' },
  { id: 'small', label: '🏢 Small Shop (2-5 techs)', leads: '20-40/mo', income: '$10,500-$21,000' },
  { id: 'medium', label: '🏭 Mid-Size (6-20 techs)', leads: '50-100/mo', income: '$26,250-$52,500' },
  { id: 'large', label: '🏗️ Large Company (20+ techs)', leads: '100-200+/mo', income: '$52,500-$105,000+' },
];

const STREAMS = [
  { icon: '💰', name: 'Direct Match Commissions', desc: 'Earn 12-70% on every job matched through ProLnk based on your activity tier' },
  { icon: '🔄', name: 'Recurring Maintenance Contracts', desc: 'Convert one-time matches into $149-399/mo maintenance agreements tracked in ProLnk' },
  { icon: '👥', name: 'Pro Network Override', desc: 'Recruit other HVAC techs to ProLnk, earn 1-4% of their match income 4 levels deep' },
  { icon: '🏠', name: 'Home Origination Rights', desc: 'Every home you service on ProLnk: earn a permanent share of future platform fees' },
  { icon: '📋', name: 'Subscription Referrals', desc: 'Refer HVAC pros to ProLnk, earn 10% of their $149/mo subscription recurring' },
];

const STEPS = [
  { n: '1', title: 'Apply on ProLnk', desc: 'Submit license, insurance, and DFW service area. 48-hour verification.' },
  { n: '2', title: 'Set Your Capacity', desc: 'Define how many leads/week you want and what services you accept.' },
  { n: '3', title: 'Receive Vetted Matches', desc: 'Homeowners matched to you based on service type, location, and availability.' },
  { n: '4', title: 'Build Recurring Relationships', desc: 'Offer annual maintenance plans directly through ProLnk dashboard.' },
  { n: '5', title: 'Grow Your Network', desc: 'Invite other HVAC pros, unlock 5-stream income beyond just jobs.' },
];

export default function DFWProLnkHVACPartnerGuide() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const tier = TIERS.find(t => t.id === selectedTier);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642' }}>❄️ ProLnk HVAC Partner Guide</div>
          <div style={{ color: '#94A3B8', marginTop: '.5rem' }}>DFW HVAC contractors — quality leads, recurring relationships, 5 income streams</div>
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>Select Your Business Size</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '.75rem' }}>
            {TIERS.map(t => (
              <button key={t.id} onClick={() => setSelectedTier(t.id)}
                style={{ padding: '.85rem', borderRadius: 10, border: 'none', background: selectedTier === t.id ? '#F5E64222' : '#0A1628', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{t.label}</div>
              </button>
            ))}
          </div>
          {tier && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.5rem' }}>Your ProLnk Opportunity</div>
              <div style={{ color: '#CBD5E1' }}>📊 Expected Leads: <strong style={{ color: '#fff' }}>{tier.leads}</strong></div>
              <div style={{ color: '#CBD5E1', marginTop: '.25rem' }}>💵 Income Potential: <strong style={{ color: '#F5E642' }}>{tier.income}/mo</strong></div>
              <div style={{ color: '#94A3B8', fontSize: '.8rem', marginTop: '.5rem' }}>Based on 30% match conversion rate at average DFW HVAC job value of $875</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>5 Income Streams Available to HVAC Pros</div>
          {STREAMS.map(s => (
            <div key={s.name} style={{ display: 'flex', gap: '1rem', marginBottom: '.85rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#fff' }}>{s.name}</div>
                <div style={{ color: '#94A3B8', fontSize: '.85rem' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>Getting Started — 5 Steps</div>
          {STEPS.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: '1rem', marginBottom: '.85rem', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '.85rem', flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ color: '#94A3B8', fontSize: '.85rem' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
