import { useState } from 'react';

const levels = [
  {
    id: 'new_homeowner',
    label: '🏠 New DFW Homeowner (Just moved in)',
    headline: 'Your First 3 HVAC Priorities in DFW',
    concepts: [
      {
        title: 'Find your filter — and change it monthly',
        body: 'DFW\’s dust and pollen are extreme. A clogged filter is the #1 cause of HVAC failures and the #1 voider of warranties. Locate the filter, buy 6 at once, and set a phone reminder every 30 days.',
      },
      {
        title: 'Know your system\’s age',
        body: 'Find the manufacture date on the data plate of the outdoor unit. DFW systems over 12 years old are in the replacement planning zone. Systems over 15 years are on borrowed time in this climate.',
      },
      {
        title: 'Register your equipment warranty today',
        body: 'If the system was installed within the last 60–90 days, register it at the manufacturer\’s website. This unlocks 10-year coverage vs. 5-year. Look for a sticker with model and serial numbers on the outdoor unit.',
      },
    ],
  },
  {
    id: 'intermediate',
    label: '🔧 Intermediate DFW Homeowner (1–5 years experience)',
    headline: 'Moving From Reactive to Proactive HVAC in DFW',
    concepts: [
      {
        title: 'Schedule two tune-ups per year — not one',
        body: 'DFW demands pre-summer (April) and pre-winter (October) tune-ups. April tune-ups focus on refrigerant charge, coil cleaning, and electrical. October tune-ups focus on heat exchanger inspection and ignition systems. One per year is not enough here.',
      },
      {
        title: 'Understand your SEER rating and what it means for your bill',
        body: 'SEER2 measures efficiency. Every 2 SEER2 points above 14 reduces cooling costs roughly 10–12% in DFW. If your system is 10 SEER or below, upgrading to 16–18 SEER2 can save $400–700/yr given DFW\’s long cooling season.',
      },
      {
        title: 'Learn to read your thermostat\’s runtime data',
        body: 'Modern smart thermostats show daily and monthly runtime hours. In DFW, a properly sized system should run 12–16 hours/day in peak summer. If it\’s running 20+ hours, something is wrong: undersized system, refrigerant issue, or duct leaks.',
      },
      {
        title: 'Attic insulation is an HVAC upgrade',
        body: 'Your attic reaches 140–160°F on DFW summer days. Inadequate insulation (below R-38) forces your HVAC to work 30–40% harder. Before replacing a struggling system, get an insulation audit — it may be a $2,000 fix instead of a $12,000 replacement.',
      },
    ],
  },
  {
    id: 'advanced',
    label: '🎓 Advanced DFW Homeowner (HVAC-literate)',
    headline: 'Expert-Level DFW HVAC Knowledge',
    concepts: [
      {
        title: 'Manual J load calculations are non-negotiable for replacements',
        body: 'When replacing your DFW system, any contractor worth hiring will run a Manual J load calculation — measuring your home\’s actual cooling and heating load based on square footage, insulation, windows, orientation, and infiltration. Oversized systems short-cycle, causing humidity problems and premature failures. Undersized systems can\’t handle DFW peak days. Demand this calculation in writing.',
      },
      {
        title: 'Duct leakage is the hidden efficiency killer',
        body: 'Most DFW homes lose 20–30% of conditioned air through duct leaks in the attic. A blower door test and duct leakage test costs $300–500 and is the most valuable diagnostic you can get. If leakage is above 10% of system airflow, duct sealing will cut your bill more than a new system.',
      },
      {
        title: 'Refrigerant charge is a precision specification, not an approximation',
        body: 'R-410A or R-454B charge must be within ±2 oz of the manufacturer specification for a split system. A tech who "tops it off" without finding the leak has done you a disservice. Demand a manifold gauge reading and weigh-in charge documentation every service visit.',
      },
      {
        title: 'DFW\’s storm risk requires HVAC protection planning',
        body: 'Hail, flooding, and lightning are major DFW HVAC risks. Ensure your homeowner\’s insurance covers HVAC equipment explicitly — many policies exclude flood damage to mechanical systems. Install a surge protector on your air handler and consider a hail guard for the condenser if you\’re in Hail Alley (Tarrant, Parker, Johnson counties).',
      },
      {
        title: 'The total cost of ownership lens: when replacement beats repair',
        body: 'Use the 5,000 rule: multiply system age (years) × repair cost. If over $5,000, replace. In DFW: age × repair cost over $4,000 is often the trigger because of higher annual run hours. A 14-year-old system needing a $400 repair is borderline. A 14-year-old needing a $800 compressor repair is a replacement signal.',
      },
    ],
  },
];

export default function DFWHVACFinalExpertPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

  const activeLevel = levels.find(l => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF4' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            The DFW HVAC Expert Reference
          </h1>
          <p style={{ fontSize: 16, color: '#9BAAC0', maxWidth: 600, margin: '0 auto' }}>
            Everything a DFW homeowner needs to know — from first system to expert-level ownership — organized by where you are right now.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            🌡️ Why DFW HVAC Knowledge Is Different
          </h2>
          <p style={{ color: '#9BAAC0', fontSize: 15, lineHeight: 1.7 }}>
            Dallas-Fort Worth is one of the most demanding HVAC environments in North America. Systems run 2,800–3,200 hours
            per year versus 750 nationally. Attic temps exceed 150°F. Ice storms hit in February. Hail storms hit in May.
            Humidity spikes in October. Standard HVAC advice written for national audiences often fails DFW homeowners.
            This reference is built specifically for this climate.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#E8EDF4', marginBottom: 16 }}>
          📊 Select Your Expertise Level
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {levels.map(l => (
            <button
              key={l.id}
              onClick={() => { setSelected(selected === l.id ? null : l.id); setExpandedConcept(null); }}
              style={{
                background: selected === l.id ? '#1A3A6E' : '#0F2040',
                border: selected === l.id ? '2px solid #F5E642' : '1px solid #1E3A5F',
                borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                textAlign: 'left', color: '#E8EDF4', fontSize: 16, fontWeight: 700,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              {selected === l.id ? '▼' : '▶'} {l.label}
            </button>
          ))}
        </div>

        {activeLevel && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 20 }}>
              {activeLevel.headline}
            </h3>
            <div style={{ display: 'grid', gap: 14 }}>
              {activeLevel.concepts.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setExpandedConcept(expandedConcept === `${activeLevel.id}-${i}` ? null : `${activeLevel.id}-${i}`)}
                  style={{
                    background: expandedConcept === `${activeLevel.id}-${i}` ? '#0F2A10' : '#0F2040',
                    border: expandedConcept === `${activeLevel.id}-${i}` ? '2px solid #5FD068' : '1px solid #1E3A5F',
                    borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                    textAlign: 'left', color: '#E8EDF4', fontSize: 14, fontWeight: 600,
                    transition: 'all 0.2s', width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{expandedConcept === `${activeLevel.id}-${i}` ? '▼' : '▶'} {c.title}</span>
                  </div>
                  {expandedConcept === `${activeLevel.id}-${i}` && (
                    <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 16 }}>
                      <p style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.75, margin: 0 }}>{c.body}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>
            🎯 The 5 Rules Every DFW HVAC Owner Should Know
          </h3>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { num: '1', rule: 'Change filters every 30 days in summer, 45 in winter. DFW is not a 90-day filter environment.' },
              { num: '2', rule: 'Two tune-ups per year minimum — April before cooling season, October before heating season.' },
              { num: '3', rule: 'Register your warranty within 60 days of install. No exceptions. Set a calendar reminder now.' },
              { num: '4', rule: 'Any system over 15 years old in DFW should be in active replacement planning, not reactive repair mode.' },
              { num: '5', rule: 'Insulation and duct sealing before system replacement. Fix the envelope first, then size the equipment.' },
            ].map(item => (
              <div key={item.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{item.num}</div>
                <div style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.6, paddingTop: 4 }}>{item.rule}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
