import { useState } from 'react';

const counties = ['Dallas (DCAD)', 'Tarrant (TCAD)', 'Collin (CCAD)', 'Denton (DCAD)'];

const guides: Record<string, { label: string; url: string; steps: string[] }[]> = {
  'Dallas (DCAD)': [
    { label: '🏛️ DCAD Appraisal Records', url: 'dcad.org', steps: ['Search by address at dcad.org', 'View appraised value, assessed value, and exemptions', 'Check 10-year value history — flags rapid flips', 'Download legal description for title comparison'] },
    { label: '📜 Dallas County Clerk Deeds', url: 'dallascounty.org/departments/countyclerk', steps: ['Search grantor/grantee index by owner name or address', 'Pull deed history — verify chain of title', 'Look for any recorded liens, judgments, or lis pendens', 'Check for deed restrictions filed separately from HOA'] },
    { label: '🔨 Dallas Permit Records', url: 'dallascityhall.com/departments/sustainabledevelopment', steps: ['Search permits by address at Dallas development portal', 'Verify all additions/remodels had permits pulled', 'Check permit final inspection status (not just issued)', 'Unpermitted work = potential insurance and resale issues'] },
  ],
  'Tarrant (TCAD)': [
    { label: '🏛️ TCAD Appraisal Records', url: 'tad.org', steps: ['Search at tad.org — covers Fort Worth, Arlington, Mansfield', 'Review Notice of Appraised Value history', 'Check homestead, over-65, and disability exemptions claimed', 'Compare TCAD value to list price — large gaps warrant scrutiny'] },
    { label: '📜 Tarrant County Clerk', url: 'tarrantcounty.com/en/clerk.html', steps: ['Use Property Records Search for deed history', 'Check UCC filings for any equipment or fixture liens', 'Search mechanic and materialman lien filings', 'Download any recorded plat for easement locations'] },
  ],
  'Collin (CCAD)': [
    { label: '🏛️ CCAD Appraisal Records', url: 'collincad.org', steps: ['Search at collincad.org — covers Plano, Frisco, McKinney, Allen', 'Note Collin County values often lag fast-rising market', 'Check property classification (residential vs ag exemption)', 'Verify lot size and legal acreage match listing'] },
    { label: '📜 Collin County Clerk', url: 'collincountytx.gov/county_clerk', steps: ['Search Official Public Records for deeds and liens', 'Check for any HOA lien filings', 'Review recorded subdivision plat for restrictions', 'Verify legal description matches CCAD records'] },
  ],
  'Denton (DCAD)': [
    { label: '🏛️ Denton CAD Records', url: 'dentoncad.com', steps: ['Search at dentoncad.com — covers Denton, Lewisville, Flower Mound', 'Check ag exemption status — losing ag = large tax increase', 'Review ownership history for recent flip patterns', 'Verify property class and acreage on rural properties'] },
    { label: '📜 Denton County Clerk', url: 'dentoncounty.gov/departments/clerk', steps: ['Access Official Public Records online portal', 'Search deed records going back 50+ years for clean chain', 'Check for any environmental liens or remediation orders', 'Review plat for drainage and utility easements'] },
  ],
};

export default function DFWPropertyRecordsGuide2026() {
  const [activeCounty, setActiveCounty] = useState('Dallas (DCAD)');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗂️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Property Records Guide 2026</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>County appraisal districts, deed history, permit records — how to research any DFW property before buying.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {counties.map(c => (
            <button key={c} onClick={() => setActiveCounty(c)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activeCounty === c ? '#F5E642′ : '#1E2D45', color: activeCounty === c ? '#0A1628' : '#94A3B8', transition: ’all 0.2s' }}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {guides[activeCounty].map((g, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>{g.label}</h3>
                <span style={{ fontSize: 12, color: '#475569', background: '#0A1628', padding: '4px 10px', borderRadius: 6 }}>{g.url}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {g.steps.map((s, j) => (
                  <li key={j} style={{ fontSize: 14, color: '#CBD5E1', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>›</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: '#1E2D45', borderRadius: 10, padding: 20, border: '1px solid #2D3F5A' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
            ⚖️ <strong style={{ color: '#94A3B8′ }}>PACER tip:</strong> Search federal bankruptcy court at pacer.gov for any liens that survived foreclosure or are tied to the seller’s estate. /bin/zsh.10/page — worth it on any property over K.
          </p>
        </div>
      </div>
    </div>
  );
}