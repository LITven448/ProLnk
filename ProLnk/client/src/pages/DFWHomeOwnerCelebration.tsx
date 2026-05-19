import { useState } from 'react';

const milestones = [
  { id: 'firstYear', label: '🎉 First Year of Ownership', financial: 'You built roughly 3-5% equity through principal paydown and likely saw 4-6% appreciation in DFW. That is $15K-25K in new wealth on a $300K home.', meaning: 'You survived your first DFW summer, learned your systems, and proved you can handle homeownership costs.', next: 'Focus on building your emergency maintenance fund to $10K+', celebration: ['Host a housewarming (better late than never)', 'Frame your closing disclosure', 'Plant a tree in the backyard'] },
  { id: 'fiveYears', label: '🏆 5 Years of Ownership', financial: 'DFW homes average 6-8% annual appreciation. Five years in, your $300K home could be worth $400K+. Equity position likely 25-35% of value.', meaning: 'You have navigated foundation shifts, hail seasons, and HOA meetings. You are a real DFW homeowner.', next: 'Refinance if rates dropped 1%+ from your purchase rate', celebration: ['Major renovation project', 'Outdoor living space upgrade', 'Host a neighborhood block party'] },
  { id: 'paidOff', label: '🔑 Paid Off Mortgage', financial: 'No mortgage = $1,500-3,000/month in cash flow freed up. Instantly in top 15% of American households by net worth.', meaning: 'Complete ownership is the foundation of generational wealth. Your home is an unencumbered asset.', next: 'Set up a HELOC for tax-advantaged access to equity if needed', celebration: ['Burn the note ceremony', 'Family dinner at your favorite DFW restaurant', 'Invest the freed mortgage payment'] },
  { id: 'renovation', label: '🔨 Completed Major Renovation', financial: 'Kitchen remodel: 60-80% ROI. Bathroom: 50-70% ROI. Pool in DFW: 40-60% ROI. Outdoor living: 70-80% ROI.', meaning: 'You have made your home uniquely yours and added lasting value to the neighborhood.', next: 'Document with photos and receipts for future sale disclosure', celebration: ['Host a reveal dinner party', 'Professional photography for the new space', 'Share on neighborhood social media'] },
  { id: 'firstSale', label: '💰 Completed First Home Sale', financial: 'Average DFW seller nets $80K-150K above purchase price after 5-7 years. Tax exclusion: $250K single / $500K married on primary residence gains.', meaning: 'You have completed the full homeownership cycle and built real wealth. Most Americans never do this successfully.', next: 'Reinvest gains into next property within 45 days for 1031 potential', celebration: ['Take a vacation with the proceeds', 'Celebrate with your ProLnk network that helped', 'Document what you learned for the next purchase'] },
];

export default function DFWHomeOwnerCelebration() {
  const [selected, setSelected] = useState('');
  const milestone = milestones.find(m => m.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏅</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1e293b', margin: '12px 0 8px' }}>DFW Homeowner Milestone Celebration</h1>
          <p style={{ color: '#64748b', fontSize: 16 }}>Select your milestone — learn what it means and how to celebrate it right</p>
        </div>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {milestones.map(m => (
            <button key={m.id} onClick={() => setSelected(m.id)}
              style={{ padding: '16px 20px', background: selected === m.id ? '#0A1628′ : '#fff', color: selected === m.id ? '#F5E642' : '#1e293b', border: selected === m.id ? '2px solid #F5E642' : '2px solid #e2e8f0', borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              {m.label}
            </button>
          ))}
        </div>
        {milestone && (
          <div>
            {[
              { icon: '💵', title: 'Financial Impact', body: milestone.financial },
              { icon: '❤️', title: 'What It Means', body: milestone.meaning },
              { icon: '🚀', title: 'Your Next Move', body: milestone.next },
            ].map(s => (
              <div key={s.title} style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.icon} {s.title}</div>
                <div style={{ color: '#475569', fontSize: 15, lineHeight: 1.6 }}>{s.body}</div>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#F5E642′ }}>🎊 How to Celebrate</div>
              {milestone.celebration.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', color: '#cbd5e1', fontSize: 15 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span> {c}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}