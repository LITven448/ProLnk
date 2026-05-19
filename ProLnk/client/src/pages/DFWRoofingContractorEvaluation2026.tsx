import { useState } from 'react';

export default function DFWRoofingContractorEvaluation2026() {
  const [insurance, setInsurance] = useState(false);
  const [manCert, setManCert] = useState(false);
  const [haag, setHaag] = useState(false);
  const [localOffice, setLocalOffice] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [contract, setContract] = useState(false);

  const score = (insurance ? 30 : 0) + (manCert ? 20 : 0) + (haag ? 15 : 0) + (localOffice ? 10 : 0) + (reviews ? 15 : 0) + (contract ? 10 : 0);

  const getVerdict = () => {
    if (score >= 85) return { label: 'Hire Confidently', color: '#4CAF50', message: 'This contractor meets DFW professional standards. Proceed with written contract and payment schedule.' };
    if (score >= 65) return { label: 'Hire With Caution', color: '#F5A623', message: 'Acceptable but address missing items before signing. Require the missing elements in writing.' };
    if (score >= 40) return { label: 'High Risk — Seek Alternatives', color: '#FF4444', message: 'Significant gaps in this contractor’s qualifications. Get 2 more quotes from fully qualified contractors.' };
    return { label: 'Do Not Hire', color: '#CC0000', message: 'This contractor fails basic DFW professional requirements. Risk of storm chasing, poor work, or no recourse on claims.' };
  };

  const criteria = [
    { key: 'insurance', label: 'General Liability + Workers Comp Insurance (30 pts)', pts: 30, desc: 'Must provide certificates of insurance naming you as additional insured. Never waive this.', val: insurance, set: setInsurance },
    { key: 'manCert', label: 'Manufacturer Certification (20 pts)', pts: 20, desc: 'GAF Master Elite, CertainTeed Select, or Owens Corning Preferred. Unlocks extended warranties in DFW.', val: manCert, set: setManCert },
    { key: 'haag', label: 'HAAG Certified Inspector on Staff (15 pts)', pts: 15, desc: 'HAAG certification is the gold standard for storm damage assessment. Critical in DFW hail country.', val: haag, set: setHaag },
    { key: 'reviews', label: '50+ Google Reviews, 4.5+ Stars (15 pts)', pts: 15, desc: 'Check that reviews span multiple years — storm chasers have burst of reviews then disappear.', val: reviews, set: setReviews },
    { key: 'localOffice', label: 'Physical DFW Office / Local Business (10 pts)', pts: 10, desc: 'Storm chasers follow hail paths and vanish. A local office means accountability and warranty support.', val: localOffice, set: setLocalOffice },
    { key: 'contract', label: 'Detailed Written Contract Provided (10 pts)', pts: 10, desc: 'Contract must include: scope, materials, manufacturer, start/end date, payment schedule, warranty terms.', val: contract, set: setContract },
  ];

  const verdict = score > 0 ? getVerdict() : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>🏆 DFW Roofing Contractor Score Guide 2026</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem' }}>Score your DFW roofing contractor using this 100-point checklist. DFW is ground zero for storm chasers after hail events. Know what separates legitimate contractors from fly-by-night operators.</p>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>📋 Contractor Scorecard</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {criteria.map((item) => (
              <div key={item.key} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', border: `1px solid ${item.val ? '#F5E642' : '#1E3A5F'}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)} style={{ marginTop: '3px', accentColor: '#F5E642', width: '18px', height: '18px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <span style={{ color: item.val ? '#F5E642' : '#E8EAF0', fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</span>
                      <span style={{ color: item.val ? '#4CAF50' : '#9BA3B2', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0, marginLeft: '0.5rem' }}>{item.val ? `+${item.pts}` : `0/${item.pts}`}</span>
                    </div>
                    <div style={{ color: '#9BA3B2', fontSize: '0.83rem' }}>{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: `2px solid ${verdict ? verdict.color : '#1E3A5F'}`, borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: verdict ? verdict.color : '#9BA3B2', lineHeight: 1 }}>{score}</div>
          <div style={{ color: '#9BA3B2', fontSize: '0.85rem', marginBottom: '0.75rem' }}>out of 100</div>
          {verdict && (
            <>
              <div style={{ display: 'inline-block', background: verdict.color, color: '#0A1628', padding: '0.3rem 1rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>{verdict.label}</div>
              <div style={{ color: '#CBD2DC', fontSize: '0.9rem' }}>{verdict.message}</div>
            </>
          )}
          {!verdict && <div style={{ color: '#9BA3B2', fontSize: '0.9rem' }}>Check items above to calculate your contractor score</div>}
        </div>
      </div>
    </div>
  );
}