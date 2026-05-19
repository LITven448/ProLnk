import { useState } from 'react';

const cases = [
  {
    type: 'Kitchen Remodel',
    city: 'Frisco',
    cost: '$28,000',
    outcome: '+$52,000 at sale',
    summary: 'The Hendersons updated their 1998 kitchen with quartz counters, new cabinets, and stainless appliances before listing. Their home sold in 4 days over asking.',
    what: 'They hired a licensed contractor through ProLnk, got 3 bids, and chose mid-range finishes that matched the neighborhood. Timing before spring market was key.',
  },
  {
    type: 'Foundation Repair',
    city: 'McKinney',
    cost: '$14,000',
    outcome: 'Retained full sale price',
    summary: 'The Garcias discovered pier issues during their pre-listing inspection. They repaired proactively and provided full documentation. Sale closed at list price.',
    what: 'Buyers were nervous until they saw the engineer letter and lifetime warranty. Transparency turned a dealbreaker into a non-issue.',
  },
  {
    type: 'HVAC Replacement',
    city: 'Plano',
    cost: '$8,500',
    outcome: 'Avoided $4K hotel + forced sale',
    summary: 'The Patels replaced their 18-year-old unit in May before the heat hit. Their neighbors with the same unit failed in July and had to sell under pressure.',
    what: 'Proactive replacement in the off-season saved 20% on install cost and gave them negotiating power when they listed in October.',
  },
  {
    type: 'Bathroom Remodel',
    city: 'Allen',
    cost: '$11,200',
    outcome: '+$19,000 at appraisal',
    summary: 'The Robinsons updated their master bath before refinancing. The appraiser noted it as a comp differentiator and they pulled $19K more in equity.',
    what: 'They focused on the master bath only — highest ROI room. Kept tile neutral, added frameless glass, and stayed under $12K total.',
  },
  {
    type: 'Roof Replacement',
    city: 'Prosper',
    cost: '$16,000',
    outcome: 'Closed on schedule — no repair credits',
    summary: 'The Nguyens replaced their roof after hail damage before listing. Two previous sellers on their street gave $10K+ credits. The Nguyens gave zero.',
    what: 'A new roof with a transferable warranty is worth more than a credit. Buyers felt confident, waived the roofing inspection contingency.',
  },
];

export default function DFWHomeRenovationSuccessStories() {
  const [selected, setSelected] = useState(0);
  const c = cases[selected];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW RENOVATION SUCCESS STORIES
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Real Renovations. Real DFW Outcomes.</h1>
        <p style={{ color: '#4B5563', marginBottom: 28 }}>Five homeowners across the Metroplex who made smart renovation decisions — and what happened next.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {cases.map((c, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
              backgroundColor: selected === i ? '#0A1628′ : '#E5E7EB', color: selected === i ? '#F5E642' : '#0A1628',
            }}>
              {c.type}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 20 }}>{c.type} — {c.city}</span>
            <span style={{ backgroundColor: '#F5E642', padding: '4px 10px', borderRadius: 4, fontWeight: 700, fontSize: 13 }}>{c.outcome}</span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ backgroundColor: '#F3F4F6', borderRadius: 8, padding: '10px 16px', fontSize: 14 }}>
              <div style={{ color: '#6B7280', fontSize: 11, marginBottom: 2 }}>PROJECT COST</div>
              <div style={{ fontWeight: 700 }}>{c.cost}</div>
            </div>
          </div>
          <p style={{ lineHeight: 1.7, marginBottom: 16 }}>{c.summary}</p>
          <div style={{ backgroundColor: '#FAFAFA', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>💡 What Made It Work</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151′ }}>{c.what}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Ready to find a contractor for your renovation?</p>
          <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 6, display: 'inline-block', fontWeight: 700, cursor: 'pointer' }}>
            Get 3 Quotes Free → prolnk.io
          </div>
        </div>
      </div>
    </div>
  );
}
