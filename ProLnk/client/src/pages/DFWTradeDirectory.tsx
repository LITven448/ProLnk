import { useState } from 'react';

const trades = [
  {
    name: 'HVAC',
    emoji: '❄️',
    authority: 'Texas Department of Licensing and Regulation (TDLR)',
    verifyUrl: 'https://www.tdlr.texas.gov/LicenseSearch/',
    avgRate: '$85–$150/hr',
    jobs: [
      { name: 'AC tune-up', range: '$80–$150' },
      { name: 'System replacement (3-ton)', range: '$3,800–$6,500' },
      { name: 'Coil cleaning', range: '$120–$250' },
    ],
  },
  {
    name: 'Plumbing',
    emoji: '🔧',
    authority: 'Texas State Board of Plumbing Examiners (TSBPE)',
    verifyUrl: 'https://www.tsbpe.texas.gov/licensee-lookup/',
    avgRate: '$95–$175/hr',
    jobs: [
      { name: 'Water heater replacement', range: '$800–$1,600' },
      { name: 'Leak detection & repair', range: '$200–$600' },
      { name: 'Drain clearing', range: '$120–$300' },
    ],
  },
  {
    name: 'Roofing',
    emoji: '🏠',
    authority: 'Texas Department of Insurance (TDI) — Roofers must carry liability',
    verifyUrl: 'https://www.tdi.texas.gov/apps/licensing/',
    avgRate: '$350–$600/square',
    jobs: [
      { name: 'Full replacement (2,000 sq ft)', range: '$8,000–$16,000' },
      { name: 'Leak repair', range: '$300–$900' },
      { name: 'Gutter replacement (linear ft)', range: '$6–$14/ft' },
    ],
  },
  {
    name: 'Electrical',
    emoji: '⚡',
    authority: 'Texas Department of Licensing and Regulation (TDLR)',
    verifyUrl: 'https://www.tdlr.texas.gov/LicenseSearch/',
    avgRate: '$90–$160/hr',
    jobs: [
      { name: 'Panel upgrade (200A)', range: '$1,800–$3,500' },
      { name: 'Outlet/switch install', range: '$100–$250' },
      { name: 'EV charger installation', range: '$400–$1,200' },
    ],
  },
  {
    name: 'Foundation Repair',
    emoji: '🏗️',
    authority: 'Texas Board of Professional Engineers (TBPE) for structural assessment',
    verifyUrl: 'https://pels.texas.gov/lic_search.htm',
    avgRate: '$500–$800/pier',
    jobs: [
      { name: 'Pier installation (per pier)', range: '$500–$850' },
      { name: 'Drainage correction', range: '$1,200–$4,000' },
      { name: 'Crack injection', range: '$400–$800' },
    ],
  },
  {
    name: 'Painting',
    emoji: '🎨',
    authority: 'No state license required — verify liability insurance & BBB standing',
    verifyUrl: 'https://www.bbb.org/us/tx/',
    avgRate: '$45–$85/hr',
    jobs: [
      { name: 'Interior full house (2,000 sq ft)', range: '$3,000–$6,500' },
      { name: 'Exterior repaint', range: '$2,500–$5,500' },
      { name: 'Single room', range: '$350–$900' },
    ],
  },
  {
    name: 'Pest Control',
    emoji: '🐜',
    authority: 'Texas Department of Agriculture (TDA)',
    verifyUrl: 'https://www.texasagriculture.gov/regulatory-programs/structural-pest-control/licensing/',
    avgRate: '$75–$125/visit',
    jobs: [
      { name: 'Annual termite treatment', range: '$800–$2,500' },
      { name: 'Quarterly general pest plan', range: '$100–$180/quarter' },
      { name: 'Bed bug treatment', range: '$600–$1,800' },
    ],
  },
  {
    name: 'Landscaping',
    emoji: '🌿',
    authority: 'Texas Department of Agriculture — Irrigators need TDA license',
    verifyUrl: 'https://www.texasagriculture.gov/regulatory-programs/pesticide-programs/irrigators/',
    avgRate: '$50–$90/hr',
    jobs: [
      { name: 'Full yard design & install', range: '$5,000–$20,000' },
      { name: 'Sprinkler system install', range: '$2,500–$5,000' },
      { name: 'Weekly maintenance', range: '$120–$250/visit' },
    ],
  },
];

export default function DFWTradeDirectory() {
  const [search, setSearch] = useState('');

  const filtered = trades.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#1B2A4A', color: '#fff', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#F5C842', color: '#1B2A4A', borderRadius: 6, padding: '4px 14px', fontWeight: 700, fontSize: 13, marginBottom: 18 }}>
          DFW SERVICE DIRECTORY
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 16px' }}>
          DFW Licensed Home Service Pros
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 620, margin: '0 auto 32px' }}>
          Find Verified Contractors by Trade — All ProLnk partners are licensed, insured, and background-checked before their first lead.
        </p>
        <input
          type="text"
          placeholder="Search trade (HVAC, plumbing, roofing…)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', maxWidth: 480, padding: '14px 20px', borderRadius: 8,
            border: '2px solid #F5C842', fontSize: 16, outline: 'none',
            background: '#fff', color: '#1B2A4A',
          }}
        />
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: '#1B2A4A', color: '#fff', borderRadius: 12, padding: '24px 32px',
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48,
        }}>
          <span style={{ fontSize: 32 }}>🛡️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>The ProLnk Guarantee</div>
            <div style={{ opacity: 0.85 }}>
              All ProLnk partners are licensed, insured, and background-checked before their first lead. Every trade, every time.
            </div>
          </div>
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>No trades match "{search}"</p>
        )}

        {filtered.map(trade => (
          <div key={trade.name} style={{ background: '#fff', borderRadius: 14, padding: '32px', marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 36 }}>{trade.emoji}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#1B2A4A' }}>{trade.name}</h2>
                <div style={{ color: '#555', fontSize: 14, marginTop: 4 }}>DFW Average: <strong>{trade.avgRate}</strong></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#F0F4FF', borderRadius: 8, padding: '14px 18px' }}>
                <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: 13, marginBottom: 6 }}>LICENSING AUTHORITY</div>
                <div style={{ color: '#333', fontSize: 14 }}>{trade.authority}</div>
              </div>
              <div style={{ background: '#FFF9E6', borderRadius: 8, padding: '14px 18px' }}>
                <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: 13, marginBottom: 6 }}>HOW TO VERIFY</div>
                <a href={trade.verifyUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1B2A4A', fontSize: 14, wordBreak: 'break-all' }}>
                  {trade.verifyUrl}
                </a>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: '#1B2A4A', fontSize: 13, marginBottom: 10 }}>COMMON JOBS & PRICE RANGES</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {trade.jobs.map(job => (
                  <div key={job.name} style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', borderRadius: 8, padding: '10px 16px' }}>
                    <div style={{ fontWeight: 600, color: '#1B2A4A', fontSize: 14 }}>{job.name}</div>
                    <div style={{ color: '#2A7A3B', fontWeight: 700, fontSize: 15, marginTop: 2 }}>{job.range}</div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/apply"
              style={{
                display: 'inline-block', background: '#F5C842', color: '#1B2A4A',
                fontWeight: 700, borderRadius: 8, padding: '12px 24px', textDecoration: 'none', fontSize: 15,
              }}
            >
              Find a ProLnk Verified {trade.name} Pro →
            </a>
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '48px 24px', background: '#1B2A4A', borderRadius: 16, marginTop: 32 }}>
          <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
            Are you a licensed DFW contractor?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            Join ProLnk and get matched with homeowners in your trade and territory. No bidding. No upfront lead fees.
          </p>
          <a
            href="/apply"
            style={{
              background: '#F5C842', color: '#1B2A4A', fontWeight: 800,
              padding: '16px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 17,
            }}
          >
            Apply as a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
