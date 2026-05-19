import { useState } from 'react';

const homeAges = ['Under 10 years', '10-20 years', '20-30 years', '30-40 years', '40+ years'];
const issueTypes = ['Slow drains', 'No hot water', 'Leaking pipe', 'Low water pressure', 'Toilet issues', 'Slab leak suspected'];

const likelyCauses: Record<string, Record<string, { cause: string; range: string }>> = {
  'Slow drains': { 'Under 10 years': { cause: 'Grease buildup or debris blockage', range: '$150–$300' }, '10-20 years': { cause: 'Partial blockage or minor root intrusion', range: '$200–$450' }, '20-30 years': { cause: 'Root intrusion or scale buildup in galvanized pipe', range: '$350–$700' }, '30-40 years': { cause: 'Corroded galvanized pipes or tree root invasion', range: '$500–$1,200' }, '40+ years': { cause: 'Collapsed drain line or cast iron deterioration', range: '$800–$3,500' } },
  'No hot water': { 'Under 10 years': { cause: 'Thermostat failure or pilot outage', range: '$100–$250' }, '10-20 years': { cause: 'Heating element failure or sediment buildup', range: '$200–$500' }, '20-30 years': { cause: 'Water heater at end of life — replacement likely', range: '$900–$1,800' }, '30-40 years': { cause: 'Full water heater replacement required', range: '$1,000–$2,200' }, '40+ years': { cause: 'Full replacement + possible pipe work', range: '$1,200–$3,000' } },
  'Leaking pipe': { 'Under 10 years': { cause: 'Fitting failure or improper installation', range: '$200–$500' }, '10-20 years': { cause: 'Joint corrosion or water hammer damage', range: '$250–$700' }, '20-30 years': { cause: 'Galvanized pipe pinholes or joint failure', range: '$400–$1,500' }, '30-40 years': { cause: 'Widespread galvanized corrosion', range: '$800–$4,000' }, '40+ years': { cause: 'Full repipe likely needed', range: '$3,500–$8,000' } },
  'Low water pressure': { 'Under 10 years': { cause: 'Pressure regulator issue', range: '$150–$350' }, '10-20 years': { cause: 'PRV failure or municipal supply issue', range: '$200–$500' }, '20-30 years': { cause: 'Scale buildup in galvanized pipes restricting flow', range: '$500–$2,000' }, '30-40 years': { cause: 'Severely corroded galvanized — repipe likely', range: '$2,000–$6,000' }, '40+ years': { cause: 'Full repipe strongly recommended', range: '$4,000–$10,000' } },
  'Toilet issues': { 'Under 10 years': { cause: 'Flapper or fill valve failure', range: '$75–$200' }, '10-20 years': { cause: 'Internal mechanism wear', range: '$100–$300' }, '20-30 years': { cause: 'Wax ring or flange failure', range: '$150–$450' }, '30-40 years': { cause: 'Flange rot or subfloor damage', range: '$300–$900' }, '40+ years': { cause: 'Flange, subfloor, and possible drain line issues', range: '$500–$2,000' } },
  'Slab leak suspected': { 'Under 10 years': { cause: 'Installation defect or soil shift', range: '$800–$2,500' }, '10-20 years': { cause: 'Corrosion from chlorinated water on copper', range: '$1,200–$4,000' }, '20-30 years': { cause: 'Copper corrosion — may need reroute', range: '$2,000–$6,000' }, '30-40 years': { cause: 'Multiple leak points — reroute or repipe', range: '$3,500–$9,000' }, '40+ years': { cause: 'Full repipe above slab typically most cost-effective', range: '$5,000–$15,000' } },
};

export default function DFWPlumberGrandPrairie() {
  const [homeAge, setHomeAge] = useState('');
  const [issue, setIssue] = useState('');
  const result = homeAge && issue && likelyCauses[issue]?.[homeAge] ? likelyCauses[issue][homeAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          🔧 ProLnk — Grand Prairie TX
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          Grand Prairie TX Plumbers<br />
          <span style={{ color: '#F5E642' }}>Midcities Value-Focused Pros</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Grand Prairie stretches across Dallas and Tarrant counties — a large, diverse city where homeowners range from first-time buyers in older neighborhoods to families in newer master-planned communities. Our Grand Prairie plumbers are known for straight pricing, no upsells, and getting the job done right the first time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { emoji: '💰', label: 'Fair Flat Pricing', desc: 'No surprise add-ons. Itemized quote before any work begins.' },
            { emoji: '🚨', label: '24/7 Emergency', desc: 'Burst pipes, slab leaks, and no-water emergencies answered around the clock.' },
            { emoji: '🔍', label: 'Camera Inspection', desc: 'Sewer camera inspection included for drain and slab concerns.' },
            { emoji: '📝', label: 'Permit Ready', desc: 'All licensed pros pull required permits for Grand Prairie and county work.' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642' }}>{card.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>
            🏠 Likely Cause + Cost Estimator
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Select your home age and issue type to see the most likely cause and cost range in Grand Prairie.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select home age...</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Issue Type</label>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select issue...</option>
                {issueTypes.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: '#94A3B8', fontSize: 13, fontWeight: 600 }}>MOST LIKELY CAUSE</span>
                <p style={{ color: '#E2E8F0', fontSize: 16, fontWeight: 600, marginTop: 4, marginBottom: 0 }}>{result.cause}</p>
              </div>
              <div>
                <span style={{ color: '#94A3B8', fontSize: 13, fontWeight: 600 }}>GRAND PRAIRIE COST RANGE</span>
                <p style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginTop: 4, marginBottom: 0 }}>{result.range}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 18, padding: '16px 48px', borderRadius: 50, border: 'none', cursor: 'pointer' }}
            onClick={() => alert('Redirecting to ProLnk homeowner signup...')}
          >
            Get Free Plumbing Quotes — Grand Prairie
          </button>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No obligation · Local licensed plumbers compete for your business</p>
        </div>
      </div>
    </div>
  );
}
