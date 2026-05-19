import { useState } from 'react';

const stories = [
  {
    scenario: 'AC died in August',
    headline: '"Got 3 HVAC quotes in 2 hours when my AC died in August"',
    homeowner: 'Trish M., Frisco',
    detail: 'My AC quit on a Thursday at 4pm. My house hit 89 degrees by 7pm. I put my situation into ProLnk — unit age, square footage, what was wrong — and had 3 licensed HVAC contractors reach out by 6:30pm. One could come that night. I chose the second-lowest bid and had cold air by 10pm.',
    how: 'ProLnk routes emergency requests to available pros in your ZIP code with HVAC as their primary trade. Pros are notified in real time and compete for your job.',
  },
  {
    scenario: 'Burst pipe at night',
    headline: '"Found a licensed plumber at 9pm for a burst pipe"',
    homeowner: 'James K., McKinney',
    detail: 'Water was coming through my kitchen ceiling at 9:15pm on a Sunday. I turned off the main and immediately searched ProLnk. Within 20 minutes I had two plumbers who do after-hours calls. I verified both were licensed on the TSBPE site. One arrived by 10:30pm. I avoided what would have been catastrophic water damage.',
    how: 'ProLnk flags emergency requests and notifies pros who have enabled after-hours availability. License verification links are included in each pro profile.',
  },
  {
    scenario: 'Roof damage after hail',
    headline: '"Compared 3 roofers after hail and saved $4,000"',
    homeowner: 'Sandra L., Allen',
    detail: 'After a big April hailstorm I had 6 door-knockers in 3 days. I ignored them and used ProLnk instead. Got bids from 3 licensed local roofers — all verified. The range was $13,200 to $17,400 for the same scope. I went with the middle bid from a company with 200+ reviews. Saved $4,000 over the highest quote.',
    how: 'ProLnk connects you to vetted local roofers only — no out-of-state storm chasers. All contractors carry current liability insurance and state licensing.',
  },
  {
    scenario: 'Foundation cracks discovered',
    headline: '"Got an engineer and 3 repair bids before my neighbor even knew who to call"',
    homeowner: 'David R., Garland',
    detail: 'I noticed cracks after a dry summer. Used ProLnk to find a structural engineer ($425 inspection) and then got 3 foundation repair bids through the same platform. Had a full picture in 5 days. My neighbor called random companies he found on Google and spent 3 weeks getting just one quote.',
    how: 'ProLnk covers all home service trades — including specialty categories like structural engineering and foundation repair. Multi-bid requests go to all available pros in the trade.',
  },
  {
    scenario: 'Selling a home, need multiple trades',
    headline: '"Pre-listed with ProLnk and saved $8,400 vs my realtor\’s vendor list"',
    homeowner: 'Angela T., Prosper',
    detail: 'My realtor gave me a vendor list. I used ProLnk to get competing bids for every item on my pre-listing punch list — paint, flooring, HVAC service, electrical panel. The bids came back 15–30% lower than my realtor\’s referrals. I saved $8,400 total and listed 2 weeks earlier than expected.',
    how: 'ProLnk works for any home service job, any trade. Sellers use it to run competitive bids on pre-listing repairs without relying on a single-source referral list.',
  },
];

export default function DFWProLnkHomeownerStories() {
  const [selected, setSelected] = useState(0);
  const s = stories[selected];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          HOMEOWNER SUCCESS STORIES
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Real DFW Homeowners. Real ProLnk Experiences.</h1>
        <p style={{ color: '#4B5563', marginBottom: 28 }}>Select your situation to see a matching homeowner story and how ProLnk handled it.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {stories.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
              backgroundColor: selected === i ? '#0A1628' : '#E5E7EB', color: selected === i ? '#F5E642' : '#0A1628',
            }}>
              {s.scenario}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ fontStyle: 'italic', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{s.headline}</div>
          <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>— {s.homeowner}</div>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: '#374151' }}>{s.detail}</p>
          <div style={{ backgroundColor: '#F9FAFB', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>⚙️ How ProLnk Handled It</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151' }}>{s.how}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Need help with your home? Get 3 quotes in under 2 hours.</p>
          <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 6, display: 'inline-block', fontWeight: 700, cursor: 'pointer' }}>
            Start Free at prolnk.io →
          </div>
        </div>
      </div>
    </div>
  );
}
