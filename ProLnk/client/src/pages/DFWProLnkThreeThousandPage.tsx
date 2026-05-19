import { useState } from 'react';

const roles = [
  {
    id: 'homeowner',
    label: 'DFW Homeowner',
    icon: '🏠',
    headline: '3,000 pages written for you — the DFW homeowner who wants answers before calling a contractor.',
    description: 'The ProLnk DFW library means you never have to make another blind decision about your home. You have access to guides on every trade, season, and crisis scenario specific to living in DFW.',
    topPages: [
      'HVAC Quote Red Flags — The 10 things to check before signing',
      'DFW Foundation Season Guide — What spring rain means for your slab',
      'Duct Connector Guide — Why tape fails in DFW attics',
      'DFW Plumbing Freeze Map — Which pipes burst first in a DFW freeze',
      'Electrical Panel Upgrade Guide — When DFW homes need more capacity',
    ],
    what3000Means: 'Every time you search "HVAC problem DFW" or "foundation crack Fort Worth," there is now a ProLnk page built for your exact situation — not generic national advice that ignores DFW clay soil, 140°F attics, and 100°F summers.',
  },
  {
    id: 'pro',
    label: 'DFW Service Pro',
    icon: '🔧',
    headline: '3,000 pages means 3,000 entry points bringing DFW homeowners to ProLnk — and to you.',
    description: 'Every page in the ProLnk library is a funnel. DFW homeowners find the page, get educated, and when they are ready to hire — ProLnk matches them to a vetted local pro. That pro could be you.',
    topPages: [
      'DFW HVAC Maintenance Contract Guide — Homeowners ready to hire a service plan',
      'DFW Refrigerant Recovery Guide — Homeowners who want an EPA-compliant tech',
      'DFW Parts Troubleshooting Guide — Homeowners who know what is broken and need a fix',
      'DFW Foundation Season Guide — Homeowners already worried about their slab',
      'DFW Electrical Panel Guide — Homeowners who know they need an upgrade',
    ],
    what3000Means: 'At 3,000 pages, ProLnk’s DFW library generates thousands of monthly organic searches. Each search is a DFW homeowner with a problem — and a potential match for your business.',
  },
  {
    id: 'investor',
    label: 'Investor / Partner',
    icon: '📈',
    headline: '3,000 DFW-specific pages is a content moat that takes years to replicate.',
    description: 'ProLnk has built a hyper-local content asset covering every major DFW home service trade, season, failure mode, and decision point. This is the foundation of a data and SEO advantage that compounds with time.',
    topPages: [
      'HVAC Resource Library — 600+ pages on DFW HVAC decisions',
      'Foundation & Structural Library — 400+ pages on DFW clay soil problems',
      'Plumbing Library — 350+ pages on DFW-specific plumbing issues',
      'Electrical Library — 300+ pages on DFW home electrical decisions',
      'Roofing Library — 250+ pages on DFW hail, heat, and storm damage',
    ],
    what3000Means: '3,000 hyper-local pages means ProLnk owns DFW homeowner search intent across every trade. Combined with the ProLnk matching platform, the content generates leads that feed directly into the marketplace — creating a self-reinforcing growth loop.',
  },
];

const next1000 = [
  { area: 'Plumbing', examples: 'Water heater sizing for DFW hard water, tankless vs tank in DFW climate, re-pipe guides for older DFW neighborhoods' },
  { area: 'Roofing', examples: 'DFW hail damage guide, TPO vs shingle on DFW flat roofs, insurance claim process after DFW storms' },
  { area: 'Electrical', examples: 'EV charger installation guide, panel upgrade by DFW city code, whole-home generator sizing for DFW outages' },
  { area: 'Foundation', examples: 'Post-tension vs pier and beam in DFW, clay expansion seasonal calendar, drainage correction before foundation repair' },
  { area: 'Smart Home', examples: 'Smart thermostat optimization for DFW climate, whole-home automation guide, security system comparison for DFW neighborhoods' },
];

export default function DFWProLnkThreeThousandPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [result, setResult] = useState<null | typeof roles[0]>(null);

  function evaluate() {
    const match = roles.find(r => r.id === selectedRole);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', fontWeight: 600, letterSpacing: '0.08em' }}>DFW RESOURCE LIBRARY MILESTONE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.15 }}>🎉 ProLnk Hits 3,000 DFW Pages</h1>
        <p style={{ color: '#9AA5B8', marginBottom: '2rem', fontSize: '1.05rem' }}>The largest hyper-local home service resource library in the Dallas-Fort Worth Metroplex.</p>

        <div style={{ background: 'linear-gradient(135deg, #F5E64225 0%, #0F204080 100%)', border: '2px solid #F5E642', borderRadius: '14px', padding: '1.75rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: '#F5E642', lineHeight: 1 }}>3,000</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>DFW-Specific Home Service Pages</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem', marginTop: '0.4rem' }}>Covering HVAC, Plumbing, Electrical, Foundation, Roofing, and more</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {[['600+','HVAC Pages'],['400+','Foundation Pages'],['350+','Plumbing Pages'],['300+','Electrical Pages']].map(([n,l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5E642' }}>{n}</div>
                <div style={{ fontSize: '0.8rem', color: '#9AA5B8' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📚 The Next 1,000 Pages — Coming Soon</h2>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {next1000.map((n, i) => (
            <div key={i} style={{ background: '#0F2040', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #1E3A5F', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E64220', color: '#F5E642', borderRadius: '8px', padding: '0.3rem 0.7rem', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{n.area}</div>
              <div style={{ fontSize: '0.875rem', color: '#9AA5B8' }}>{n.examples}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>👤 What 3,000 Pages Means for You</h2>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.5rem' }}>I am a...</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {roles.map(r => (
                <button key={r.id} onClick={() => setSelectedRole(r.id)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: selectedRole === r.id ? '2px solid #F5E642' : '1px solid #1E3A5F', background: selectedRole === r.id ? '#F5E64220' : '#0A1628', color: selectedRole === r.id ? '#F5E642' : '#E8EDF5', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>{r.icon} {r.label}</button>
              ))}
            </div>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Show Me What This Means →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642' }}>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#F5E642', marginBottom: '0.5rem' }}>{result.icon} {result.headline}</div>
            <div style={{ color: '#9AA5B8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{result.description}</div>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>📖 Your Top 5 Pages to Read:</div>
            {result.topPages.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span>
                <span>{p}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.25rem', background: '#F5E64215', borderRadius: '8px', padding: '0.85rem', fontSize: '0.875rem', color: '#F5E642' }}>💡 {result.what3000Means}</div>
          </div>
        )}

        <div style={{ marginTop: '3rem', background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>ProLnk — Built for DFW Homeowners.</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem', marginBottom: '1rem' }}>Every page in this library exists to help you make a smarter decision — and connect with the right pro when you are ready.</div>
          <div style={{ fontSize: '0.85rem', color: '#F5E642' }}>3,000 pages. One platform. The DFW home service marketplace.</div>
        </div>
      </div>
    </div>
  );
}
