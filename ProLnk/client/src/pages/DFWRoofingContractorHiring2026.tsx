import { useState } from 'react';

const TRIGGERS = [
  { id: 'storm', label: '🌪️ Storm Damage' },
  { id: 'age', label: '📅 Aging Roof' },
  { id: 'leak', label: '💧 Active Leak' },
  { id: 'replace', label: '🔄 Full Replacement' },
];

const GUIDES: Record<string, { title: string; items: string[] }> = {
  'storm': {
    title: 'Storm Damage Hiring Process',
    items: [
      '🚫 Never sign AOB (Assignment of Benefits) — you lose control of claim',
      '📋 Get 3 bids minimum — storm creates price gouging in DFW',
      '🏆 Check HAAG certification — gold standard for storm damage assessment',
      '📸 Demand written photo documentation before any work starts',
      '📄 Insurance adjuster present during inspection — required in Texas',
      '✅ Verify contractor has active HAAG certification at haageducation.com',
    ],
  },
  'age': {
    title: 'Aging Roof Replacement Process',
    items: [
      '📅 DFW shingle lifespan: 15-20 years for 3-tab, 25-30 for architectural',
      '🏆 GAF Master Elite = highest manufacturer certification — only 3% of roofers',
      '📋 Written contract must specify: shingle brand, weight, color, and SKU',
      '🔍 Check DFW contractor database — TDLR does not license roofers, use BBB',
      '💰 Get 3 bids with identical material specs for true comparison',
      '🛡️ Manufacturer warranty (25-50 yr) requires certified contractor',
    ],
  },
  'leak': {
    title: 'Active Leak Emergency Hiring',
    items: [
      '⚡ Temporary tarp first — get it on within 24 hours to stop water intrusion',
      '📋 Tarp company separate from repair company — avoid conflict of interest',
      '🔍 Leak source diagnosis before any repair quotes — demand this step',
      '📸 Document all damage before repairs for insurance',
      '🏆 HAAG-certified inspector determines repair vs. full replacement',
      '📄 Signed contract before any permanent repair work begins',
    ],
  },
  'replace': {
    title: 'Full Replacement Process',
    items: [
      '📋 3 bids minimum, all specifying same material grade and weight',
      '🏆 Request GAF Master Elite OR Owens Corning Preferred contractor status',
      '🔍 Verify active insurance: general liability ($1M min) + workers comp',
      '📄 Contract must include: start date, completion date, cleanup, permit',
      '🏛️ Permit required in most DFW cities — confirm before work starts',
      '🚫 Never pay more than 10% upfront — use draws tied to completion stages',
    ],
  },
};

export default function DFWRoofingContractorHiring2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PROLNK DFW RESOURCE GUIDE 2026
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏚️ DFW Roofing Contractor Hiring Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          The step-by-step process for hiring a DFW roofer — HAAG certification, manufacturer tiers, contract requirements, and the one clause you must never sign.
        </p>

        <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            What triggered your roofing need?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {TRIGGERS.map(t => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{
                  background: selected === t.id ? '#F5E642' : '#1e3a5f',
                  color: selected === t.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: '8px', padding: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '1rem' }}>{GUIDES[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {GUIDES[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #1e3a5f', lineHeight: 1.5, color: '#cbd5e1' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.25rem' }}>Find a HAAG-Certified DFW Roofer</div>
          <div style={{ color: '#1e3a5f', fontSize: '0.9rem' }}>ProLnk pre-screens every roofer for certification and insurance</div>
        </div>
      </div>
    </div>
  );
}
