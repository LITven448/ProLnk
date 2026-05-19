import { useState } from 'react';

const stories = [
  {
    label: 'Foundation Negotiation',
    icon: '🏗️',
    name: 'Marcus and Diane T.',
    city: 'Plano, TX',
    situation: 'The Thompsons were under contract on a 1987 home in Plano. Their traditional inspection came back clean, but Marcus had done a TrustyPro scan a week earlier.',
    what_happened: 'The TrustyPro scan flagged subtle crack patterns in the garage slab and around two doorframes that matched foundation settling patterns common in North Texas clay soil. Armed with this data, Marcus hired a structural engineer for $600.',
    outcome: 'The engineer confirmed active foundation movement. The Thompsons renegotiated $11,200 off the purchase price — enough to cover a pier and beam reinforcement job.',
    savings: '$11,200',
    category: 'buying',
  },
  {
    label: 'HVAC Replacement Timing',
    icon: '🌡️',
    name: 'Sandra L.',
    city: 'Frisco, TX',
    situation: 'Sandra had lived in her Frisco home for 6 years. The AC still worked, but she was getting higher-than-normal energy bills. A contractor told her she needed full replacement — a $14,500 quote.',
    what_happened: 'Her TrustyPro scan rated the HVAC unit at Fair (68) — declining but not urgent. She used the report data to get two more quotes. One contractor confirmed only the evaporator coil needed replacing.',
    outcome: 'Coil replacement cost $2,800 instead of $14,500. The TrustyPro data gave her the confidence to push back on the original quote.',
    savings: '$11,700',
    category: 'maintenance',
  },
  {
    label: 'Pre-Listing Scan',
    icon: '🏷️',
    name: 'Robert and Jill K.',
    city: 'Southlake, TX',
    situation: 'The Kendalls were preparing to list their Southlake home at $875,000. They ran a TrustyPro scan three months before listing to get ahead of any buyer inspection findings.',
    what_happened: 'The scan flagged a moisture indicator near the master bath that turned out to be a slow leak behind the tile — not visible to the eye. They fixed it for $1,800 before listing.',
    outcome: 'Their buyer’s inspection came back clean. The home sold in 9 days at $867,000 with no repair credits requested. Without the pre-listing scan, that moisture issue would have been a negotiating weapon.',
    savings: '$12,000+ in avoided credits',
    category: 'selling',
  },
  {
    label: 'Flood Damage Documentation',
    icon: '🌧️',
    name: 'Priya N.',
    city: 'Irving, TX',
    situation: 'After a severe storm, Priya’s Irving property took on water in the garage and utility room. She needed to file an insurance claim but was worried the adjuster would undervalue the damage.',
    what_happened: 'Priya ran a TrustyPro scan within 24 hours of the storm. The AI documented moisture patterns, staining evidence, and affected area extent. She submitted the scan data alongside her claim.',
    outcome: 'Her claim was settled for $18,400 — 40% more than the adjuster’s initial offer. The timestamped TrustyPro documentation showed pre-repair damage scope the adjuster could not dispute.',
    savings: '$5,800 additional claim value',
    category: 'insurance',
  },
  {
    label: 'Inheritance Assessment',
    icon: '🔑',
    name: 'James W.',
    city: 'Mesquite, TX',
    situation: 'James inherited a 1974 home from his grandmother in Mesquite. He lived in California and had no idea what condition the property was in — or whether to sell, rent, or renovate.',
    what_happened: 'James had a neighbor run a TrustyPro scan remotely using the app. The scan gave him a complete zone-by-zone health picture: roof at Fair, foundation at Good, electrical at Poor (outdated panel).',
    outcome: 'James flew in, replaced the electrical panel for $3,200, and listed the property. He sold for $189,000 — $22,000 above what an estate agent had estimated sight-unseen.',
    savings: '$22,000 above estimate',
    category: 'inheritance',
  },
];

const categories = ['All', 'buying', 'maintenance', 'selling', 'insurance', 'inheritance'];

export default function TrustyProHomeownerSuccess() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState(0);
  const filtered = selectedCategory === 'All' ? stories : stories.filter(s => s.category === selectedCategory);
  const story = filtered[selectedStory] || filtered[0];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⭐</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>DFW Homeowner Success Stories</h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Real situations. Real outcomes. How TrustyPro helped DFW homeowners make smarter decisions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
          {categories.map((cat, i) => (
            <button key={i} onClick={() => { setSelectedCategory(cat); setSelectedStory(0); }}
              style={{ padding: '8px 16px', borderRadius: '20px', border: `2px solid ${selectedCategory === cat ? '#4F46E5' : '#e2e8f0'}`, backgroundColor: selectedCategory === cat ? '#4F46E5' : '#fff', color: selectedCategory === cat ? '#fff' : '#374151', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {filtered.map((s, i) => (
            <button key={i} onClick={() => setSelectedStory(i)}
              style={{ padding: '10px 14px', borderRadius: '10px', border: `2px solid ${selectedStory === i ? '#4F46E5' : '#e2e8f0'}`, backgroundColor: selectedStory === i ? '#EEF2FF' : '#fff', color: '#0f172a', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px' }}>{story.icon} {story.label}</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{story.name} — {story.city}</p>
            </div>
            <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700 }}>
              Outcome: {story.savings}
            </span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Situation</div>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>{story.situation}</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What TrustyPro Found</div>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>{story.what_happened}</p>
          </div>
          <div style={{ backgroundColor: '#F0FDF4', borderRadius: '10px', padding: '16px', border: '1px solid #86efac' }}>
            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>THE OUTCOME</div>
            <p style={{ color: '#166534', lineHeight: 1.7, margin: 0 }}>{story.outcome}</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            Stories are illustrative composites representing common DFW homeowner scenarios. Individual results vary.
          </p>
        </div>
      </div>
    </div>
  );
}
