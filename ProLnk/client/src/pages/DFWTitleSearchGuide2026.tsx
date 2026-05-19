import { useState } from 'react';

const concerns = ['Tax Liens', 'Mechanic Liens', 'HOA Liens', 'Easements', 'Deed Restrictions'];

const guides: Record<string, { what: string; howToFind: string[]; redFlags: string[] }> = {
  'Tax Liens': {
    what: 'Unpaid property taxes create a superior lien that survives sale — even with a deed transfer. In Texas, tax liens are constitutional and take priority over nearly all other liens.',
    howToFind: [
      '🏛️ Check county appraisal district (DCAD, TCAD, CCAD, Denton CAD) for delinquent taxes',
      '📋 Title company runs a tax certificate search as part of standard title exam',
      '🔍 Search county tax office for any tax sale (struck off) history on the property',
      '⚠️ Ask seller to provide current tax statement at time of contract',
    ],
    redFlags: [
      'Property previously struck off to county in tax sale',
      'Multiple years of delinquency showing on appraisal district records',
      'Discrepancy between county records and seller-provided tax receipts',
    ],
  },
  'Mechanic Liens': {
    what: 'Contractors, subcontractors, or suppliers who were not paid for work on the property can file a mechanic lien. In Texas, these can attach even if you were not the one who failed to pay.',
    howToFind: [
      '📜 Search county clerk Official Public Records for mechanic/materialman liens',
      '🔨 Ask seller for lien waivers from all contractors on recent renovations',
      '📅 Texas law: lien must be filed within 15 days after last day of month work was done',
      '🏗️ For new construction: verify builder paid all subs — buyer can be liable if builder fails',
    ],
    redFlags: [
      'Recent major renovation without corresponding lien waivers',
      'Seller unable to provide receipts or contractor information for improvements',
      'Mechanic lien filed within 12 months of listing',
    ],
  },
  'HOA Liens': {
    what: 'HOAs can file liens for unpaid dues, assessments, or fines. Texas law gives HOAs powerful lien and foreclosure rights — some HOAs have foreclosed for amounts under $1,000.',
    howToFind: [
      '🏘️ Request HOA estoppel letter showing current balance owed',
      '📋 Search county clerk for any recorded HOA lien on property',
      '📬 Ask HOA management company for 12-month payment history',
      '⚠️ Texas Property Code Ch. 82 (condos) and Ch. 204/209 (subdivisions) govern HOA lien rights',
    ],
    redFlags: [
      'HOA estoppel shows outstanding balance or pending collection',
      'HOA lien recorded in county clerk records',
      'Seller claims no HOA but subdivision plat shows deed restrictions referencing one',
    ],
  },
  Easements: {
    what: 'Easements give third parties (utilities, neighbors, government) the right to use part of your property. They run with the land — you buy them whether you know about them or not.',
    howToFind: [
      '📋 Review the survey — utility, drainage, and access easements should be shown',
      '📜 Search county clerk for recorded easement documents',
      '🏗️ Call utility companies to locate any underground line easements not on survey',
      '🗺️ Review subdivision plat at county clerk for platted easements and ROW',
    ],
    redFlags: [
      'Easement running through buildable area or backyard',
      'Access easement giving neighbor right to cross your property',
      'Drainage easement restricting fence, pool, or structure placement',
    ],
  },
  'Deed Restrictions': {
    what: 'Private deed restrictions (not zoning) that run with the land permanently. In Texas, deed restrictions are extremely common and enforced by HOAs, neighbors, or courts — not city government.',
    howToFind: [
      '📜 Search county clerk for Declaration of Covenants recorded with subdivision plat',
      '📋 Request deed restriction certificate from title company',
      '🏘️ Even if no HOA exists, deed restrictions may still be enforceable by neighbors',
      '⚠️ Restrictions covering: home-based business, accessory dwelling units, exterior materials, fencing',
    ],
    redFlags: [
      'Restriction prohibiting intended use (home office, rental, garage conversion)',
      'Restrictions referencing racial covenants (unenforceable under Fair Housing Act but must be noted)',
      'Non-conforming improvements already on property that violate restrictions',
    ],
  },
};

export default function DFWTitleSearchGuide2026() {
  const [activeConcern, setActiveConcern] = useState('Tax Liens');
  const g = guides[activeConcern];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Title Search Guide 2026</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>What a title search reveals — tax liens, mechanic liens, HOA liens, easements, and deed restrictions in DFW.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {concerns.map(c => (
            <button key={c} onClick={() => setActiveConcern(c)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activeConcern === c ? '#F5E642′ : '#1E2D45', color: activeConcern === c ? '#0A1628' : '#94A3B8', transition: ’all 0.2s' }}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 10px' }}>📖 What it is</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{g.what}</p>
          </div>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>🔍 How to find it</h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {g.howToFind.map((item, i) => (
                <li key={i} style={{ fontSize: 14, color: '#CBD5E1', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>›</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #DC2626′ }}>
            <h3 style={{ color: '#EF4444', fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>🚩 Red Flags</h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {g.redFlags.map((item, i) => (
                <li key={i} style={{ fontSize: 14, color: '#FCA5A5', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                  <span style={{ position: 'absolute', left: 0, color: '#EF4444′ }}>›</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
