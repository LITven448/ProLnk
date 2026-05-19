import { useState } from 'react';

const tradeData: Record<string, { employees: string; types: { name: string; required: boolean; cost: string; reason: string }[] }> = {
  HVAC: {
    employees: '0',
    types: [
      { name: 'General Liability ($1M/$2M)', required: true, cost: '$600–$1,200/yr', reason: 'Required for all ProLnk HVAC leads. Refrigerant work has high property damage risk.' },
      { name: 'Commercial Auto', required: true, cost: '$1,000–$2,000/yr', reason: 'Service vehicles are business use — personal auto won’t cover accidents on the job.' },
      { name: 'Tools & Equipment', required: false, cost: '$200–$400/yr', reason: 'HVAC tools and gauges are expensive. Strongly recommended.' },
      { name: 'Errors & Omissions', required: false, cost: '$800–$2,000/yr', reason: 'Required for manufacturer warranty work on some premium brands (Lennox, Carrier).' },
    ],
  },
  Electrical: {
    employees: '0',
    types: [
      { name: 'General Liability ($1M/$2M)', required: true, cost: '$800–$1,500/yr', reason: 'Fire and shock risk makes GL essential. Many commercial clients require $2M aggregate.' },
      { name: 'Commercial Auto', required: true, cost: '$900–$2,000/yr', reason: 'Required any time you drive to job sites in a vehicle used for business.' },
      { name: 'Tools & Equipment', required: false, cost: '$150–$350/yr', reason: 'Test equipment and hand tools add up quickly.' },
      { name: 'Workers Comp', required: false, cost: 'Varies by payroll', reason: 'Required if you have employees. Sole proprietors exempt in Texas.' },
    ],
  },
  Plumbing: {
    employees: '0',
    types: [
      { name: 'General Liability ($1M/$2M)', required: true, cost: '$500–$1,100/yr', reason: 'Water damage claims can be massive. GL is non-negotiable for plumbing work.' },
      { name: 'Commercial Auto', required: true, cost: '$900–$1,800/yr', reason: 'Plumbing vans and trucks are business vehicles requiring commercial coverage.' },
      { name: 'Tools & Equipment', required: false, cost: '$150–$300/yr', reason: 'Pipe cameras, hydrojetting equipment — high-value tools worth protecting.' },
      { name: 'Umbrella Policy', required: false, cost: '$300–$600/yr', reason: 'Water damage can exceed GL limits. Umbrella provides extra protection for large losses.' },
    ],
  },
  Foundation: {
    employees: '0',
    types: [
      { name: 'General Liability ($2M/$4M)', required: true, cost: '$1,200–$3,000/yr', reason: 'Foundation work is structural — higher limits required for ProLnk foundation leads.' },
      { name: 'Commercial Auto', required: true, cost: '$1,200–$2,500/yr', reason: 'Heavy equipment transport requires commercial coverage.' },
      { name: 'Errors & Omissions', required: true, cost: '$1,500–$4,000/yr', reason: 'Structural work carries long-tail liability. E&O strongly recommended.' },
      { name: 'Equipment Floater', required: false, cost: '$400–$1,000/yr', reason: 'Piercing equipment, hydraulic lifts — major capital assets that need protection.' },
    ],
  },
  Roofing: {
    employees: '0',
    types: [
      { name: 'General Liability ($1M/$2M)', required: true, cost: '$700–$2,000/yr', reason: 'Roofing has one of the highest claim rates. GL is mandatory for all leads.' },
      { name: 'Workers Comp', required: true, cost: 'Varies by payroll', reason: 'Roofing is classified high-risk. Even solo operators often get workers comp.' },
      { name: 'Commercial Auto', required: true, cost: '$1,000–$2,500/yr', reason: 'Trucks hauling materials and ladders need commercial auto.' },
      { name: 'Tools & Equipment', required: false, cost: '$200–$500/yr', reason: 'Nail guns, compressors, and safety equipment add up to significant value.' },
    ],
  },
};

const trades = Object.keys(tradeData);

export default function PartnerInsuranceRequirementsGuide() {
  const [selectedTrade, setSelectedTrade] = useState('');
  const [employees, setEmployees] = useState('0');
  const [result, setResult] = useState<typeof tradeData[string] | null>(null);

  const checkCoverage = () => {
    if (!selectedTrade) return;
    const data = tradeData[selectedTrade];
    setResult(data);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111827', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)', padding: '80px 24px 60px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800, color: '#111827', marginBottom: '16px', lineHeight: 1.2 }}>
          Insurance Requirements for ProLnk Partners
        </h1>
        <p style={{ fontSize: '20px', color: '#16a34a', fontWeight: 600, marginBottom: '12px' }}>
          Protect Your Business — Unlock More Leads
        </p>
        <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '620px', margin: '0 auto' }}>
          Proper insurance isn't just a legal requirement — it's how you access higher-value ProLnk leads, win more homeowner trust, and protect everything you've built.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Why Insurance Matters */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '32px' }}>Why Insurance Matters for ProLnk Partners</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { emoji: '📋', title: 'Lead Access', desc: 'Jobs above $2,500 in value require verified GL insurance to be assigned to you.' },
              { emoji: '🏠', title: 'Homeowner Trust', desc: '73% of homeowners check for insurance before hiring a contractor. Verified badge helps you win more jobs.' },
              { emoji: '⚖️', title: 'Legal Protection', desc: 'Something goes wrong at a job site without insurance — you pay out of pocket. GL is your financial shield.' },
              { emoji: '🏢', title: 'Commercial Jobs', desc: 'Government contracts and commercial properties require certificate of insurance before work begins.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance Types */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '32px' }}>📂 Insurance Types Every Home Service Pro Needs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                name: 'General Liability',
                emoji: '🏗️',
                required: true,
                coverage: '$1M per occurrence / $2M aggregate minimum',
                cost: '$400–$1,500/year',
                covers: 'Property damage and bodily injury at job sites',
                proTip: 'Ask your insurer for a certificate of insurance with ProLnk listed as additional insured for large jobs.',
              },
              {
                name: 'Workers' Compensation',
                emoji: '👷',
                required: false,
                coverage: 'State-required if you have employees',
                cost: 'Varies by payroll and trade risk class',
                covers: 'Employee injuries on the job',
                proTip: 'Texas sole proprietors are exempt. The moment you hire even one employee, workers comp becomes required.',
              },
              {
                name: 'Commercial Auto',
                emoji: '🚐',
                required: true,
                coverage: 'Your personal auto policy excludes business use',
                cost: '$800–$2,500/year',
                covers: 'Accidents, liability, and damage when driving to job sites',
                proTip: 'One accident driving to a job site without commercial auto = claim denied. Don’t risk it.',
              },
              {
                name: 'Tools & Equipment',
                emoji: '🔧',
                required: false,
                coverage: 'Named tools and equipment up to stated limit',
                cost: '$150–$400/year',
                covers: 'Theft, damage, or loss of your tools and equipment',
                proTip: 'Create an inventory list with photos and serial numbers when you get this policy.',
              },
              {
                name: 'Errors & Omissions',
                emoji: '📝',
                required: false,
                coverage: 'Professional liability for design and consulting work',
                cost: '$600–$3,000/year',
                covers: 'Claims that your advice or recommendations caused financial harm',
                proTip: 'More common for HVAC designers, engineers, and foundation specialists than general trade work.',
              },
            ].map((ins, i) => (
              <div key={i} style={{ background: '#f9fafb', border: `1px solid ${ins.required ? '#16a34a' : '#e5e7eb'}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '32px' }}>{ins.emoji}</div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>{ins.name}</h3>
                      {ins.required && (
                        <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase' }}>
                          ProLnk Required
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{ins.covers}</p>
                    <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '6px', padding: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#92400e', fontWeight: 600 }}>💡 Pro Tip: </span>
                      <span style={{ fontSize: '12px', color: '#92400e' }}>{ins.proTip}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Coverage</div>
                      <div style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{ins.coverage}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2px' }}>Typical Cost</div>
                      <div style={{ fontSize: '15px', color: '#16a34a', fontWeight: 700 }}>{ins.cost}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where to Get Insurance */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>🏢 Where to Get Contractor Insurance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { name: 'Hiscox', note: 'Online, fast quote, great for small contractors', tag: 'Best for Speed', emoji: '⚡' },
              { name: 'State Farm', note: 'Local agent, bundling discounts available', tag: 'Best for Bundling', emoji: '🏠' },
              { name: 'Nationwide', note: 'Strong contractor programs, broad coverage', tag: 'Best Coverage', emoji: '🌐' },
              { name: 'CNA Insurance', note: 'Specialist in contractor liability programs', tag: 'Trade Specialist', emoji: '🔨' },
              { name: 'USLI', note: 'Specialty contractor underwriter, competitive rates', tag: 'Best Rates', emoji: '💰' },
            ].map((provider, i) => (
              <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{provider.emoji}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{provider.name}</h3>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>{provider.tag}</div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{provider.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Coverage Checker */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>🔍 Coverage Requirement Checker</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>Enter your trade and team size to see recommended coverage types and estimated costs.</p>
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Your Trade</label>
                <select
                  value={selectedTrade}
                  onChange={e => setSelectedTrade(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#111827', background: '#ffffff' }}
                >
                  <option value="">Select a trade...</option>
                  {trades.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Number of Employees</label>
                <select
                  value={employees}
                  onChange={e => setEmployees(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', color: '#111827', background: '#ffffff' }}
                >
                  <option value="0">Just me (sole proprietor)</option>
                  <option value="1-3">1–3 employees</option>
                  <option value="4-10">4–10 employees</option>
                  <option value="10+">10+ employees</option>
                </select>
              </div>
            </div>
            <button
              onClick={checkCoverage}
              style={{ background: '#16a34a', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
            >
              Check My Requirements →
            </button>

            {result && (
              <div style={{ marginTop: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                  Coverage Requirements for {selectedTrade}{employees !== '0' ? ` with ${employees} employees` : ' (Sole Proprietor)'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {result.types.map((type, i) => (
                    <div key={i} style={{ background: '#ffffff', border: `1px solid ${type.required ? '#16a34a' : '#e5e7eb'}`, borderRadius: '8px', padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{type.name}</span>
                          <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: type.required ? '#dcfce7' : '#f3f4f6', color: type.required ? '#16a34a' : '#6b7280' }}>
                            {type.required ? 'Required' : 'Recommended'}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#6b7280' }}>{type.reason}</p>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a', whiteSpace: 'nowrap' }}>{type.cost}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ProLnk Verification CTA */}
        <section style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Get Your Insurance Badge on ProLnk</h3>
          <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Upload your certificate of insurance to your ProLnk partner profile. Our team verifies it within 1 business day. You'll receive a verified insurance badge that homeowners can see — and unlock access to higher-value leads.
          </p>
          <a
            href="/waitlist/pro"
            style={{ display: 'inline-block', background: '#16a34a', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
          >
            Join as a ProLnk Partner →
          </a>
        </section>

      </div>
    </div>
  );
}
