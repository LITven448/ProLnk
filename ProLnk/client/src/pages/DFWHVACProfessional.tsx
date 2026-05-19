import { useState } from 'react';

const stages = [
  {
    stage: 'First Contact',
    description: 'You just moved in or need service for the first time',
    buildingTips: [
      'Ask for a written quote before any work begins — always',
      'Request the technician explain what they found before they fix it',
      'Note the technician name and arrival time for your records',
      'Ask if this tech will be your regular contact or if it varies',
    ],
    expectations: 'Expect a diagnostic fee ($89-150 in DFW). This is fair — a good tech spends 30-45 minutes on a thorough inspection.',
    proLnkRole: 'ProLnk verifies license, insurance, and DFW-specific experience before matching — reducing first-contact risk.',
    whatToAvoid: 'Never authorize open-ended repairs. Get itemized scope in writing.',
  },
  {
    stage: 'Annual Service Agreement',
    description: 'You want a consistent relationship with one contractor',
    buildingTips: [
      'Ask for a written service agreement with fixed spring/fall tune-up dates',
      'Confirm priority scheduling is included for emergencies',
      'Get the after-hours emergency number written into the contract',
      'Clarify what is included vs. extra-cost in tune-up visits',
    ],
    expectations: 'Annual service agreements run $150-350/year in DFW for two tune-ups. Premium agreements include parts discounts and priority dispatch.',
    proLnkRole: 'ProLnk can match you with contractors who offer ProLnk-verified service agreements with transparent pricing.',
    whatToAvoid: 'Avoid multi-year agreements that lock you in without performance guarantees.',
  },
  {
    stage: 'Ongoing Relationship',
    description: 'You have worked with a contractor for 1+ years',
    buildingTips: [
      'Keep a home file with every invoice, report, and photo from each visit',
      'Ask your tech to update notes on your system history each visit',
      'Call your regular tech first for new issues — they know your system',
      'Refer neighbors to build reciprocal goodwill for priority service',
    ],
    expectations: 'A good ongoing relationship means faster response, honest repair vs. replace advice, and a tech who remembers your system quirks.',
    proLnkRole: 'ProLnk stores your Home Health Vault records so system history is never lost even if you change contractors.',
    whatToAvoid: 'Do not let fear of disrupting the relationship prevent you from getting a second opinion on large repairs.',
  },
  {
    stage: 'Major Repair or Replacement Decision',
    description: 'You face a repair quote over $1,500 or a replacement recommendation',
    buildingTips: [
      'Always get two or three quotes for any job over $1,500',
      'Ask your regular tech to explain the 5000 rule: repair if cost is less than 50% of replacement times remaining years',
      'Request the age and efficiency of any proposed replacement unit in writing',
      'Get manufacturer warranty and contractor labor warranty in writing',
    ],
    expectations: 'A trustworthy contractor will not pressure you on major decisions. They will give you honest system age and condition data.',
    proLnkRole: 'ProLnk can provide additional qualified bids fast so you can make confident decisions without weeks of searching.',
    whatToAvoid: 'Avoid contractors who recommend full replacement on systems under 10 years old without documented compressor failure.',
  },
];

export default function DFWHVACProfessional() {
  const [selected, setSelected] = useState(0);
  const current = stages[selected];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF2', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤝</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW HVAC Professional Relationship Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>How to build a lasting, high-trust relationship with your DFW HVAC contractor</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>📋 Select Your Relationship Stage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem' }}>
            {stages.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ backgroundColor: selected === i ? '#F5E642′ : '#1A2E4A', color: selected === i ? '#0A1628' : '#E8EDF2', border: ’none', borderRadius: '8px', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textAlign: 'left', transition: 'all 0.2s' }}>
                <div>{s.stage}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.75, marginTop: '0.2rem', fontWeight: 400 }}>{s.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E4A', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>{current.stage}</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{current.description}</p>

          <h3 style={{ color: '#E8EDF2', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Build the Relationship</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', marginBottom: '1.25rem' }}>
            {current.buildingTips.map((tip, i) => (
              <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #1A2E4A', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>{tip}
              </li>
            ))}
          </ul>

          <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>What to Expect</div>
            <div style={{ color: '#E8EDF2', fontSize: '0.9rem', lineHeight: 1.6 }}>{current.expectations}</div>
          </div>

          <div style={{ backgroundColor: '#0D1B2E', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>How ProLnk Helps</div>
            <div style={{ color: '#E8EDF2', fontSize: '0.9rem', lineHeight: 1.6 }}>{current.proLnkRole}</div>
          </div>

          <div style={{ fontSize: '0.9rem', color: '#EF4444', fontStyle: 'italic' }}>⚠️ Watch out: {current.whatToAvoid}</div>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk ensures every match is a contractor worth building a relationship with — licensed, insured, and DFW-experienced.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Find a DFW HVAC Contractor to Trust</button>
        </div>
      </div>
    </div>
  );
}
