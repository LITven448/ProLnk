import { useState } from 'react';

const improvementData: Record<string, { implications: string[]; verify: string; likelihood: string; note: string }> = {
  fence: {
    implications: ['Height limits (common: 6 ft max in backyard, 4 ft front)', 'Material requirements (wood only, or no chain link)', 'Color restrictions in some communities', 'Approval process from architectural committee'],
    verify: 'Search county clerk records for your subdivision plat. Look for "Declaration of Covenants, Conditions, and Restrictions" (CC&Rs). Also check HOA if applicable.',
    likelihood: '🟡 Moderate — fences almost always covered in DFW deed restrictions',
    note: 'Deed restrictions on fences are extremely common in DFW suburban neighborhoods platted after 1970.',
  },
  shed: {
    implications: ['Minimum setback from property lines (often 5–10 ft)', 'Maximum size (common: 120–200 sq ft)', 'Must match house color/materials in some communities', 'No storage of inoperable vehicles'],
    verify: 'County clerk deed search + HOA architectural guidelines if applicable.',
    likelihood: '🟡 Moderate to High — accessory structures frequently restricted',
    note: 'In master-planned DFW communities (Stonebridge Ranch, Viridian, etc.) even shed placement requires architectural approval.',
  },
  pool: {
    implications: ['Usually allowed, but equipment screening may be required', 'Fence/barrier requirements per deed (separate from code)', 'No above-ground pools in many DFW neighborhoods', 'Lighting restrictions near property lines'],
    verify: 'Review CC&Rs Section covering "Improvements" and "Accessory Structures." Architectural review may be required before permit.',
    likelihood: '🟢 Low restriction — pools usually allowed, equipment screening most common issue',
    note: 'Above-ground pools are prohibited by deed restriction in the vast majority of DFW master-planned communities.',
  },
  business: {
    implications: ['No visible commercial signage (almost universal in residential deeds)', 'No commercial vehicle parking (trucks with logos)', 'No retail customers coming to property', 'No employee parking beyond residents'],
    verify: 'CC&Rs "Use Restrictions" section and any "Nuisance" provisions.',
    likelihood: '🔴 High — nearly every DFW residential deed restricts commercial activity',
    note: 'Deed restrictions on business use are often stricter than city zoning. Even if zoning allows home business, deed may prohibit it.',
  },
  adu: {
    implications: ['Many DFW deeds prohibit "secondary dwellings" or "guesthouses with kitchen"', 'Some allow guesthouse but prohibit rental', 'Older deeds may have outdated and unenforceable language', 'CC&Rs may require architectural committee approval'],
    verify: 'Look specifically for language about "single family," "secondary dwelling," "rental," or "occupancy" in the deed restrictions.',
    likelihood: '🔴 High — ADU restrictions are very common in DFW deed restrictions',
    note: 'Even where Dallas zoning permits ADUs, deed restrictions may block them. Both layers must allow the use.',
  },
  landscaping: {
    implications: ['Minimum landscaping maintenance standards (xeriscape may be restricted)', 'Front yard grass requirements in many communities', 'Tree removal may require approval', 'Vegetable garden placement restrictions'],
    verify: 'CC&Rs "Maintenance," "Landscaping," and "Nuisance" sections.',
    likelihood: '🟡 Moderate — varies widely; newer communities more restrictive',
    note: 'Some DFW HOAs are moving toward water-wise landscaping allowances, but deed restrictions may lag behind city policy.',
  },
};

const neighborhoodTypes = [
  { key: 'masterplanned', label: 'Master-Planned Community (e.g. Stonebridge Ranch, Craig Ranch, Viridian)' },
  { key: 'suburban', label: 'Established Suburban Neighborhood (1980s–2000s)' },
  { key: 'older', label: 'Older Urban Neighborhood (pre-1980, Dallas/Fort Worth)' },
  { key: 'rural', label: 'Newer Rural Subdivision or Semi-Rural' },
];

const neighborhoodContext: Record<string, string> = {
  masterplanned: 'Master-planned DFW communities have the most extensive deed restrictions and active architectural review committees. Expect detailed design guidelines covering color, materials, landscaping, and all exterior changes.',
  suburban: 'Most DFW suburban neighborhoods have deed restrictions but varying enforcement. Some HOAs have dissolved. Verify whether CC&Rs are still actively enforced and by whom.',
  older: 'Older urban DFW neighborhoods often have expired or unenforceable deed restrictions — or restrictions with racially restrictive language that courts have voided. Still review, but enforcement is usually minimal.',
  rural: 'Newer rural subdivisions increasingly include deed restrictions to protect property values. Often simpler than urban neighborhoods but can still restrict agricultural use, vehicle storage, and structures.',
};

export default function DFWDeedRestrictionGuide() {
  const [improvement, setImprovement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const info = improvementData[improvement];
  const context = neighborhoodContext[neighborhood];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>🏠 PROLNK DFW RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Deed Restriction Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 16 }}>Deed restrictions, HOA rules, and zoning are three separate systems — all can block a project independently.</p>

        <div style={{ backgroundColor: '#162033', borderRadius: 10, padding: 16, border: '1px solid #2D3E55', marginBottom: 28, fontSize: 14, color: '#94A3B8' }}>
          <strong style={{ color: '#F5E642' }}>📌 Key distinction:</strong> Zoning = government law. Deed restrictions = private contract recorded against your property. HOA rules = organization bylaws. You must comply with all three independently.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Planned Improvement</label>
            <select value={improvement} onChange={e => setImprovement(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select improvement...</option>
              <option value='fence'>Fence</option>
              <option value='shed'>Shed / Outbuilding</option>
              <option value='pool'>Swimming Pool</option>
              <option value='business'>Home Business</option>
              <option value='adu'>ADU / Guest House</option>
              <option value='landscaping'>Landscaping Changes</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Neighborhood Type</label>
            <select value={neighborhood} onChange={e => setNeighborhood(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select type...</option>
              {neighborhoodTypes.map(n => <option key={n.key} value={n.key}>{n.label}</option>)}
            </select>
          </div>
        </div>

        {info && (
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div style={{ backgroundColor: '#162033', borderRadius: 10, padding: 16, border: '1px solid #2D3E55', fontSize: 14 }}>
              <span style={{ fontWeight: 700, marginRight: 8 }}>📊 Restriction Likelihood:</span>
              <span>{info.likelihood}</span>
            </div>
            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 12, padding: 20, border: '1px solid #7f1d1d' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#FCA5A5', marginBottom: 10 }}>⚠️ Typical Deed Restriction Implications</div>
              <ul style={{ paddingLeft: 18, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
                {info.implications.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔍 How to Verify</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{info.verify}</div>
            </div>
            <div style={{ backgroundColor: '#162033', borderRadius: 10, padding: 16, border: '1px solid #2D3E55', color: '#94A3B8', fontSize: 14 }}>💡 {info.note}</div>
          </div>
        )}

        {context && (
          <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏘️ Your Neighborhood Type Context</div>
            <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{context}</div>
          </div>
        )}

        <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>📂 How to Find Your Deed Restrictions</div>
          <ol style={{ paddingLeft: 20, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
            <li>Go to your county clerk's website (Dallas County, Collin County, Tarrant County, Denton County)</li>
            <li>Search by subdivision name or your property address under "Official Public Records"</li>
            <li>Look for "Declaration of Covenants, Conditions and Restrictions" (CC&Rs)</li>
            <li>Download and search for your planned improvement type</li>
          </ol>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>ProLnk contractors know DFW deed restriction requirements.</div>
          <a href='https://prolnk.io' style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Find Compliant Local Pros →</a>
        </div>
      </div>
    </div>
  );
}
