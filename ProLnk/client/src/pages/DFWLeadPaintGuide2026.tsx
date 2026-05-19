import { useState } from 'react';

type RenovScope = 'cosmetic' | 'disturbing' | 'major';
const requirements: Record<string, Record<RenovScope, { label: string; reqs: string[] }>> = {
  pre1978: {
    cosmetic: { label: '⚠️ CAUTION — EPA RRP Rules May Apply', reqs: ['Test paint before sanding or scraping','Use wet methods to minimize dust','Wear N100 respirator during work','Plastic sheeting to contain work area','HEPA vacuum for cleanup'] },
    disturbing: { label: '🚨 EPA RRP REQUIRED', reqs: ['Hire EPA-certified renovator','Post "Renovate Right" pamphlet','Plastic containment mandatory','Warning signs at entry points','On-the-job testing or presume lead','HEPA vacuum + wet mop cleanup','Clearance testing post-completion'] },
    major: { label: '🚨 FULL LEAD ABATEMENT PROTOCOL', reqs: ['EPA-certified abatement contractor only','Permit required in most DFW municipalities','Air monitoring during work','Full containment with negative pressure','Disposal as hazardous waste','Clearance test by independent inspector','Document for future buyers/renters'] },
  },
  post1978: { cosmetic: { label: '✅ LOW RISK', reqs: ['No lead paint requirements post-1978','Standard renovation practices apply'] }, disturbing: { label: '✅ LOW RISK', reqs: ['No EPA RRP requirements','Standard renovation practices apply'] }, major: { label: '✅ LOW RISK', reqs: ['No EPA RRP requirements','Standard renovation practices apply'] } },
};

export default function DFWLeadPaintGuide2026() {
  const [age, setAge] = useState('');
  const [scope, setScope] = useState<RenovScope | ''>('');
  const result = age && scope ? requirements[age]?.[scope as RenovScope] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME HEALTH VAULT · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🎨 DFW Lead Paint Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Homes built before 1978 may contain lead-based paint — common in Garland, Irving, Oak Cliff, and East Dallas. EPA RRP rules govern all renovation work in these homes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[['📅','1978 Cutoff','Lead paint banned for residential use'],['🏘️','DFW At-Risk','Garland, Irving, Oak Cliff, E Dallas'],['💲','Test Cost','$25–$200 (DIY kit to certified inspector)']].map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#1a2744', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642′ }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Lead Safety Requirements</h2>
          <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Home age:</label>
          <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 12 }}>
            <option value=''>-- Select year built --</option>
            <option value='pre1978'>Before 1978</option>
            <option value='post1978'>1978 or later</option>
          </select>
          <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Renovation scope:</label>
          <select value={scope} onChange={e => setScope(e.target.value as RenovScope)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 16 }}>
            <option value=''>-- Select scope --</option>
            <option value='cosmetic'>Cosmetic (painting, minor patching)</option>
            <option value='disturbing'>Paint-disturbing (doors, windows, trim)</option>
            <option value='major'>Major renovation (walls, full rooms)</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{result.label}</div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Requirements:</div>
              {result.reqs.map(r => <div key={r} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6 }}>• {r}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔬 Testing Options</h2>
          {[['🧪','DIY Swab Kit ($25–50)','Quick surface test; not EPA-certified for compliance'],['🔍','XRF Testing ($200–400)','Certified inspector; results immediate; no damage'],['📋','Paint Chip Lab ($30–100)','Send sample to lab; results in 3–5 days; most thorough']].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div><div style={{ fontWeight: 600, fontSize: 14, color: '#F5E642′ }}>{title}</div><div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
