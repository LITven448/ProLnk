import { useState } from 'react';

const tradeTypes = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'General Contractor', 'Landscaping'];
const businessSizes = ['Solo (1 person)', 'Small (2-5)', 'Mid (6-15)', 'Large (16+)'];

const recommendations: Record<string, Record<string, { system: string; components: string[]; firstCheck: string[] }>> = {
  'HVAC': {
    'Solo (1 person)': { system: 'Jobber or ServiceTitan Lite', components: ['Equipment model/serial numbers', 'Labor hours broken out', 'Warranty on parts vs labor'], firstCheck: ['Total price vs competitors', 'Equipment brand and efficiency rating', 'Warranty length'] },
    'Small (2-5)': { system: 'ServiceTitan or Housecall Pro', components: ['System design diagram', 'Energy savings projections', 'Financing options'], firstCheck: ['SEER rating of new unit', 'Installation timeline', 'Permit inclusion'] },
    'Mid (6-15)': { system: 'ServiceTitan Enterprise', components: ['Maintenance plan upsell', 'Multi-unit discount schedule', 'Subcontractor disclosure'], firstCheck: ['Brand reputation', 'Technician certifications', 'After-hours support'] },
    'Large (16+)': { system: 'Custom ERP + ServiceTitan', components: ['Fleet scheduling integration', 'Inventory tracking', 'Commission structure'], firstCheck: ['Response time guarantee', 'Fleet size and availability', 'Warranty service process'] },
  },
  'Plumbing': {
    'Solo (1 person)': { system: 'Jobber or Invoice2go', components: ['Parts list with SKUs', 'Permit costs itemized', 'Diagnostic fee disclosure'], firstCheck: ['Hourly rate transparency', 'Parts markup policy', 'License number'] },
    'Small (2-5)': { system: 'Housecall Pro or Jobber', components: ['Camera inspection report', 'Code compliance notes', 'Material grade options'], firstCheck: ['Material quality options', 'Permit handling', 'Payment schedule'] },
    'Mid (6-15)': { system: 'ServiceTitan', components: ['Maintenance agreement pricing', 'Emergency rate schedule', 'Subcontractor list'], firstCheck: ['Emergency availability', 'Guarantee terms', 'Insurance coverage'] },
    'Large (16+)': { system: 'ServiceTitan Enterprise + custom', components: ['Volume pricing tiers', 'Commercial account management', 'SLA options'], firstCheck: ['Commercial references', 'Response time SLA', 'Bonding level'] },
  },
};

const defaultRec = { system: 'Jobber (best all-around for DFW contractors)', components: ['Detailed line items with quantities', 'Material specs and brand names', 'Payment schedule tied to milestones', 'Warranty terms clearly stated', 'License and insurance numbers on every page'], firstCheck: ['Total cost vs other bids', 'Timeline and start date', 'What is and is not included'] };

export default function DFWContractorEstimateSystemGuide() {
  const [trade, setTrade] = useState('');
  const [size, setSize] = useState('');
  const [result, setResult] = useState<{ system: string; components: string[]; firstCheck: string[] } | null>(null);

  const handleGenerate = () => {
    const rec = recommendations[trade]?.[size] ?? defaultRec;
    setResult(rec);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PROLNK PRO GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>📋 DFW Contractor Estimate System Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.7 }}>DFW homeowners are sophisticated buyers. They compare 3+ bids and read every line. A professional estimate system is your first impression — and often the deciding factor.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ title: '📊 Line-Item Clarity', desc: 'DFW homeowners expect itemized breakdowns — not a single lump sum. List every material, labor hour, and permit separately.' }, { title: '🏷️ Material Specs', desc: 'Include brand names, model numbers, and grades. "3/4 inch Type L copper pipe" beats "plumbing materials."' }, { title: '📅 Timeline', desc: 'Start date, milestone dates, completion date. DFW homeowners coordinate around your schedule.' }, { title: '💰 Payment Schedule', desc: 'Tie payments to milestones, never front-load. Texas homeowners are cautious about contractors who demand too much upfront.' }].map((item) => (
            <div key={item.title} style={{ background: '#111f3a', borderRadius: '8px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: '12px', padding: '1.75rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🛠️ Get Your Estimate System Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Trade</label>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select trade...</option>
                {tradeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Business Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select size...</option>
                {businessSizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={!trade || !size} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', cursor: trade && size ? 'pointer' : 'not-allowed', opacity: trade && size ? 1 : 0.5 }}>Generate Recommendation →</button>
          {result && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem' }}>
              <div style={{ marginBottom: '1rem' }}><span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>RECOMMENDED SYSTEM</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.25rem' }}>{result.system}</div></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ESSENTIAL COMPONENTS</div>{result.components.map((c) => <div key={c} style={{ color: '#e2e8f0', fontSize: '0.9rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>✅ {c}</div>)}</div>
                <div><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>WHAT HOMEOWNERS CHECK FIRST</div>{result.firstCheck.map((c) => <div key={c} style={{ color: '#e2e8f0', fontSize: '0.9rem', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f' }}>👁️ {c}</div>)}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '8px', padding: '1.25rem', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 ProLnk Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>ProLnk pros who send estimates within 2 hours of a lead have a 3x higher win rate in DFW. Speed signals professionalism. Your estimate system should let you generate a quote in under 10 minutes.</div>
        </div>
      </div>
    </div>
  );
}
