import { useState } from 'react';

const stages = [
  {
    id: 'first-service',
    label: '🔧 First Service',
    timeline: 'Day 1',
    value: 'Your first ProLnk match creates your home\'s first Vault entry: contractor name, trade, date, scope, cost, and warranty. One job — one permanent record.',
    outcomes: ['✅ Vault entry created automatically', '✅ Contractor rating captured', '✅ Warranty start date logged', '✅ Pro\'s license verified and stored'],
  },
  {
    id: 'pattern',
    label: '📊 Pattern Recognition Begins',
    timeline: 'Service 2-4',
    value: 'ProLnk\'s AI begins building your home\'s health profile. Trade patterns emerge — which systems need attention, which contractors return, how your home compares to DFW comps.',
    outcomes: ['✅ Trade history building', '✅ Cost benchmarks vs DFW average', '✅ Contractor consistency tracking', '✅ Seasonal pattern alerts begin'],
  },
  {
    id: 'year-one',
    label: '📁 Year 1 Vault Complete',
    timeline: 'Month 12',
    value: 'Your Vault now contains a full year of trade service history. Most DFW homes have 3-6 trade visits per year. Your home\'s health score emerges from the data.',
    outcomes: ['✅ Full system history: HVAC, plumbing, electrical, foundation', '✅ Annual cost baseline established', '✅ Deferred maintenance flagged early', '✅ Home health score generated'],
  },
  {
    id: 'refinance',
    label: '🏦 Year 3: Refinance or HELOC Ready',
    timeline: 'Year 3',
    value: 'Lenders increasingly accept Vault documentation as proof of maintained condition. A well-documented Vault can accelerate appraisals and support higher valuations.',
    outcomes: ['✅ 3-year maintenance record for appraisers', '✅ No deferred maintenance surprises', '✅ Capital improvement history documented', '✅ Appraisal dispute support data ready'],
  },
  {
    id: 'resale',
    label: '🏡 Year 10: Permanent Home Asset',
    timeline: 'Year 10+',
    value: 'Your Vault is now a resale asset. DFW buyers pay a premium for documented homes. Vault transfers at closing — new owner gets the full history.',
    outcomes: ['✅ Resale premium: 1-3% of sale price', '✅ Faster closings — fewer inspection surprises', '✅ Vault transfers to new owner', '✅ Origination rights benefit continues for you'],
  },
];

export default function DFWProLnkHomeownerJourney2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = stages.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
          🏡 PROLNK DFW HOMEOWNER JOURNEY 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Your Complete DFW Homeowner Journey</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          ProLnk isn't a transaction platform — it's a home intelligence system that builds permanent value with every service. Here's what your journey looks like over time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📋', label: 'Vault Entries / Year', val: '3 – 6 services avg' },
            { icon: '🏠', label: 'DFW Homes in System', val: '5,000+ (growing)' },
            { icon: '💰', label: 'Resale Premium', val: '1 – 3% of home value' },
            { icon: '🔒', label: 'Data Ownership', val: 'You own your Vault' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🗺️ Select Your Journey Stage</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
                {s.label} <span style={{ opacity: 0.7, fontWeight: 400, fontSize: 13 }}>— {s.timeline}</span>
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#cbd5e1', marginBottom: 12, lineHeight: 1.6 }}>{result.value}</div>
              {result.outcomes.map(o => (
                <div key={o} style={{ color: '#94a3b8', marginBottom: 6, fontSize: 14 }}>{o}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>🏠 Start Your Journey — Add Your DFW Home to the Vault</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>Every day your home isn't in ProLnk is a day of maintenance history you'll never get back. Join the waitlist and we'll reach out when your area opens.</div>
        </div>
      </div>
    </div>
  );
}