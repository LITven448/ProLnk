import { useState } from 'react';

const propertyTypes = ['Residential', 'Commercial / Industrial', 'Rural / Agricultural'];

const checklists: Record<string, { concern: string; items: string[] }[]> = {
  Residential: [
    {
      concern: '🛢️ Underground Storage Tanks (USTs)',
      items: ['Check Texas Commission on Environmental Quality (TCEQ) UST database', 'Search nearby gas stations within 500 feet (migration risk)', 'Request Phase I if home near former gas station or auto shop', 'Ask seller disclosure if UST ever existed on property'],
    },
    {
      concern: '🏭 Nearby Industrial Sites',
      items: ['Search EPA ECHO (echo.epa.gov) for facilities within 1 mile', 'Check for air quality permits and violation history', 'Review TRI (Toxic Release Inventory) for chemical releases', 'Note: North Dallas has legacy industrial in Carrollton, Garland, Irving'],
    },
    {
      concern: '🌊 Superfund Proximity',
      items: ['Search EPA Superfund site list for DFW NPL sites', 'Check TCEQ state Superfund (Voluntary Cleanup Program) sites', 'Note: RSR Smelter (West Dallas) has ongoing remediation', 'Properties within 1 mile of active Superfund require extra scrutiny'],
    },
  ],
  'Commercial / Industrial': [
    {
      concern: '📋 Phase I Environmental Site Assessment',
      items: ['Required by most lenders on commercial acquisitions', 'Hire licensed Environmental Professional (ASTM E1527-21 standard)', 'Reviews regulatory databases, historical records, and site visit', 'Cost: $2,500–$5,000 in DFW metro; 2–4 week turnaround', 'If Phase I finds RECs (Recognized Environmental Conditions) → triggers Phase II'],
    },
    {
      concern: '🧪 Phase II Environmental Site Assessment',
      items: ['Triggered when Phase I finds soil or groundwater concerns', 'Involves physical soil borings and/or groundwater sampling', 'Cost: $5,000–$25,000+ depending on scope', 'Results may require remediation before financing', 'Budget remediation contingency into acquisition model'],
    },
  ],
  'Rural / Agricultural': [
    {
      concern: '🌾 Agricultural Chemical History',
      items: ['Ask seller about pesticide and herbicide application history', 'Check USDA FSA (farm.usda.gov) for conservation program history', 'Soil testing recommended for any land used for row crops', 'Verify no buried waste or burn pits on property'],
    },
    {
      concern: '💧 Well Water and Septic',
      items: ['Test well water for nitrates, coliform, arsenic, and VOCs', 'Check TCEQ for any registered contaminated wells nearby', 'Inspect septic system with licensed professional', 'North Texas clay soils can cause septic failure — get soil perc test'],
    },
  ],
};

export default function DFWEnvironmentalResearchGuide2026() {
  const [activeType, setActiveType] = useState('Residential');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Environmental Research Guide 2026</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>Environmental due diligence for DFW buyers — USTs, Superfund sites, EPA ECHO, industrial proximity, and Phase I/II ESAs.</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 10, padding: '14px 20px', marginBottom: 28, border: '1px solid #2D3F5A' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Context:</span> The Metroplex has significant industrial legacy in West Dallas, Garland, Carrollton, and Irving. RSR Lead Smelter (West Dallas), former military sites, and dozens of dry cleaners (PCE/TCE contamination) are active remediation sites.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {propertyTypes.map(t => (
            <button key={t} onClick={() => setActiveType(t)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activeType === t ? '#F5E642' : '#1E2D45', color: activeType === t ? '#0A1628' : '#94A3B8', transition: 'all 0.2s' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {checklists[activeType].map((block, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
              <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>{block.concern}</h3>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 14, color: '#CBD5E1', paddingLeft: 20, position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642' }}>›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}