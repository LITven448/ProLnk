import { useState } from 'react';

export default function DFWRoofingManufacturerCert2026() {
  const [certLevel, setCertLevel] = useState('gaf_elite');

  const certs = {
    gaf_elite: { name: 'GAF Master Elite', brand: 'GAF', tier: 'Top 3% nationally', warranty: 'Golden Pledge — 25-50 yr workmanship', labor: 'Yes — full labor covered', verify: 'gaf.com/roofing/contractors', note: 'Highest level GAF certification — requires ongoing training' },
    gaf_cert: { name: 'GAF Certified Contractor', brand: 'GAF', tier: 'Entry-level GAF', warranty: 'System Plus — 50 yr material only', labor: 'No labor coverage', verify: 'gaf.com/roofing/contractors', note: 'Background checked, insurance verified' },
    oc_platinum: { name: 'OC Platinum Preferred', brand: 'Owens Corning', tier: 'Top contractor tier', warranty: 'Preferred Protection — 50 yr limited', labor: 'Yes — workmanship included', verify: 'owenscorning.com/find-a-contractor', note: 'Requires minimum annual volume' },
    oc_preferred: { name: 'OC Preferred Contractor', brand: 'Owens Corning', tier: 'Standard OC tier', warranty: 'Limited Lifetime material only', labor: 'No', verify: 'owenscorning.com/find-a-contractor', note: 'Insurance verified, background check' },
    ct_select: { name: 'CertainTeed SELECT ShingleMaster', brand: 'CertainTeed', tier: 'Certified applicator', warranty: 'SureStart Plus — 25 yr labor', labor: 'Yes — 25 years', verify: 'certainteed.com/find-a-contractor', note: 'Requires SureStart certification exam' },
  };

  const sel = certs[certLevel as keyof typeof certs];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: '0.5rem' }}>DFW Roofing Manufacturer Certification Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Why certification level determines your warranty coverage</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {Object.entries(certs).map(([k, v]) => (
            <button key={k} onClick={() => setCertLevel(k)}
              style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem',
                border: certLevel === k ? '2px solid #F5E642' : '2px solid #1e3a5f',
                backgroundColor: certLevel === k ? '#1e3a5f' : '#0d2137',
                color: certLevel === k ? '#F5E642' : '#94a3b8', cursor: 'pointer' }}>{v.name}</button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>{sel.name}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><span style={{ color: '#94a3b8' }}>Brand</span><div style={{ color: '#fff' }}>{sel.brand}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Tier</span><div style={{ color: '#F5E642' }}>{sel.tier}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Warranty</span><div style={{ color: '#fff', fontSize: '0.9rem' }}>{sel.warranty}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Labor Covered</span><div style={{ color: '#22c55e' }}>{sel.labor}</div></div>
          </div>
          <div style={{ backgroundColor: '#0A1628', padding: '0.75rem', borderRadius: '8px', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🔍 Verify at: {sel.verify}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{sel.note}</div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ Why Certification Matters in DFW</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>Manufacturer warranties are VOID if installed by non-certified contractor</li>
            <li>DFW hail claims denied when installation does not meet manufacturer specs</li>
            <li>Only top-tier certified contractors can offer full labor + material warranties</li>
            <li>Always verify certification on manufacturer website before signing contract</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
