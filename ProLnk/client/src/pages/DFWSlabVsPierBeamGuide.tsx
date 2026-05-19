import { useState } from 'react';

const homeTypes = ['Single Family', 'Townhome', 'Older Home (pre-1980)', 'Custom Build'];
const foundationIssues = ['Cracks in walls', 'Doors sticking', 'Uneven floors', 'Water intrusion', 'None visible'];

const slabData = {
  pros: ['Lower construction cost', 'No pest entry from below', 'No moisture from crawl space', 'Easier to heat/cool'],
  cons: ['Plumbing runs under slab (costly to access)', 'Slab leaks require tunneling', 'No utility access from below'],
  repairApproach: 'Push/helical pier underpinning or mudjacking for settlement; tunneling for plumbing',
  costRange: '$3,000–$30,000+ depending on extent',
};

const pierBeamData = {
  pros: ['Easy utility/plumbing access from crawl space', 'Easier to level/adjust', 'Repair without excavation', 'Better for older construction'],
  cons: ['More susceptible to moisture and pests', 'Requires regular inspection of piers', 'Higher initial construction cost'],
  repairApproach: 'Shimming, sistering, or replacing wood/concrete piers; easier access reduces labor',
  costRange: '$1,500–$15,000 depending on number of piers',
};

function getImplication(homeType: string, issue: string) {
  if (homeType === 'Older Home (pre-1980)') {
    return 'Older DFW homes may have pier & beam — check your crawl space access. These foundations respond well to shimming and pier repair without major excavation.';
  }
  if (issue === 'Water intrusion') {
    return 'Slab foundations require tunneling for under-slab plumbing leaks. Pier & beam allows direct access. Get a plumber and foundation specialist to assess together.';
  }
  if (issue === 'Uneven floors') {
    return 'Uneven floors on slab usually indicate settlement — underpinning is likely needed. On pier & beam, often a shimming or pier replacement job.';
  }
  return 'DFW homes are 90%+ slab. Your symptoms and home age will confirm which foundation type you have. Pull city permit records for construction method.';
}

export default function DFWSlabVsPierBeamGuide() {
  const [homeType, setHomeType] = useState('');
  const [issue, setIssue] = useState('');
  const [showResult, setShowResult] = useState(false);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Slab vs Pier & Beam in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>90%+ of DFW homes sit on concrete slab. Here's what that means for repairs, plumbing, and costs — and when pier & beam shows up.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: '🏗️ Slab Foundation', data: slabData, accent: '#F5E642′ },
            { label: '🪵 Pier & Beam Foundation', data: pierBeamData, accent: '#60a5fa' },
          ].map(({ label, data, accent }) => (
            <div key={label} style={{ background: '#112240', borderRadius: 12, padding: 20, border: `1px solid ${accent}33` }}>
              <div style={{ color: accent, fontWeight: 700, marginBottom: 12 }}>{label}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>✅ Pros</div>
              {data.pros.map(p => <div key={p} style={{ fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 10, marginBottom: 8 }}>⚠️ Cons</div>
              {data.cons.map(c => <div key={c} style={{ fontSize: 13, marginBottom: 4 }}>• {c}</div>)}
              <div style={{ marginTop: 12, padding: '8px 12px', background: '#0A1628', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#F5E642′ }}>💰 Cost Range</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>{data.costRange}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🔍 Foundation Implication Finder</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Home Type</div>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Foundation Issue</div>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {foundationIssues.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!homeType || !issue} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', opacity: (!homeType || !issue) ? 0.5 : 1 }}>
            Get Foundation Guidance
          </button>
          {showResult && homeType && issue && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Your Foundation Profile</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{getImplication(homeType, issue)}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>📍 DFW-Specific Facts</div>
          {['DFW clay soil (expansive) is the #1 cause of foundation movement', 'Post-tension slabs are common in DFW — do NOT drill without a PT map', 'Pier & beam homes found in older East Dallas, Fort Worth historic districts', 'Foundation warranties vary: push piers typically 5-10 years, helical 15-25 years'].map(f => (
            <div key={f} style={{ fontSize: 13, marginBottom: 8, color: '#cbd5e1′ }}>• {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
