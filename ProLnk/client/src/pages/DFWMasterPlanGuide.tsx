import { useState } from 'react';

const dfwCities = [
  {
    city: 'Dallas',
    plan: 'ForwardDallas! Comprehensive Plan',
    url: 'dallascityhall.com/forwarddallas',
    zoning: 'Dallas Development Services (DDS)',
    concerns: [
      { concern: 'New development near my home', lookup: 'Search Dallas Zoning Map at dallasdev.com — look for "PD" (Planned Development) overlays near your address.' },
      { concern: 'Future road widening', lookup: 'Dallas Street Services maintains a thoroughfare plan. Areas near US-75 and Loop 12 have ongoing expansion plans.' },
      { concern: 'Apartment or mixed-use development', lookup: "ForwardDallas identifies 'growth centers' along transit corridors — check if your neighborhood is in an identified corridor." },
    ],
    contact: 'Dallas City Plan Commission: 214-670-4209',
  },
  {
    city: 'Fort Worth',
    plan: 'Fort Worth 2050 Comprehensive Plan',
    url: 'fortworthtexas.gov/2050',
    zoning: 'Fort Worth Development Services',
    concerns: [
      { concern: 'Industrial zoning near residential', lookup: 'Fort Worth has active industrial areas near Alliance Airport expanding south. Check FW GIS maps for heavy industrial zoning.' },
      { concern: 'New tollway or highway', lookup: 'NCTCOG manages regional transportation planning. Check their website for DFW regional mobility plan updates affecting FW.' },
      { concern: 'Commercial development', lookup: "Fort Worth's 2050 plan identifies 'urban villages' and 'employment centers.' Look up your area on the FW Future Land Use Map." },
    ],
    contact: 'Fort Worth Plan Commission: 817-392-8000',
  },
  {
    city: 'Frisco',
    plan: 'Frisco 2045 Master Plan',
    url: 'friscotexas.gov/planning',
    zoning: 'Frisco Development Services',
    concerns: [
      { concern: 'Development near Panther Creek / Shaddock / Stonebrook', lookup: 'Frisco is one of fastest-growing cities in US. Check the Frisco GIS portal for active development applications near your address.' },
      { concern: 'New school or park planned', lookup: "Frisco ISD and the city coordinate facility planning. Frisco's parks master plan is online at friscotexas.gov/parks." },
      { concern: 'Rezoning application nearby', lookup: 'Frisco posts all pending zoning cases at friscotexas.gov/zoningcases — search by address or case number.' },
    ],
    contact: 'Frisco Planning & Zoning: 972-292-5300',
  },
  {
    city: 'McKinney',
    plan: 'McKinney 2040 Comprehensive Plan',
    url: 'mckinneytexas.org/planning',
    zoning: 'McKinney Development Services',
    concerns: [
      { concern: 'Historic downtown expansion', lookup: "McKinney's historic district overlay affects properties near downtown. Check the McKinney GIS map for overlay boundaries." },
      { concern: 'US-380 corridor development', lookup: 'US-380 is a major growth corridor in McKinney. Expect commercial and mixed-use development along this route per the 2040 plan.' },
      { concern: 'New subdivision nearby', lookup: 'McKinney posts all subdivision plats and zoning cases at its Development Portal. Search by address or date.' },
    ],
    contact: 'McKinney Planning Dept: 972-547-7400',
  },
];

export default function DFWMasterPlanGuide() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeConcern, setActiveConcern] = useState<number | null>(null);

  const cityData = dfwCities.find(c => c.city === selectedCity);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5E642', marginBottom: '8px' }}>
            DFW Master Plan & City Development Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Every DFW city has a comprehensive plan showing future development. Know what's coming before you buy.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', marginBottom: '10px' }}>📋 Why This Matters Before Buying</h2>
          <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7′ }}>
            That empty field next to a DFW home listing could be zoned for an apartment complex, commercial strip, or tollway expansion. 
            Every DFW city publishes a comprehensive plan and a zoning map. Checking these before purchase is critical — 
            changes can be approved in as little as 3–6 months and dramatically affect your property value and quality of life.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '10px' }}>Select your DFW city:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {dfwCities.map(c => (
              <button
                key={c.city}
                onClick={() => { setSelectedCity(c.city); setActiveConcern(null); }}
                style={{
                  backgroundColor: selectedCity === c.city ? '#F5E642′ : '#1e2d4a',
                  color: selectedCity === c.city ? '#0A1628′ : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                {c.city}
              </button>
            ))}
          </div>
        </div>

        {cityData && (
          <>
            <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>📄 {cityData.plan}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>OFFICIAL PLAN URL</span>
                  <p style={{ color: '#F5E642', fontWeight: '600', fontSize: '14px' }}>{cityData.url}</p>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>ZONING AUTHORITY</span>
                  <p style={{ color: '#cbd5e1', fontSize: '14px' }}>{cityData.zoning}</p>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>CONTACT</span>
                  <p style={{ color: '#cbd5e1', fontSize: '14px' }}>{cityData.contact}</p>
                </div>
              </div>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Select a planning concern to learn how to look it up:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {cityData.concerns.map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveConcern(activeConcern === idx ? null : idx)}
                  style={{
                    backgroundColor: '#1e2d4a',
                    borderRadius: '10px',
                    padding: '16px',
                    cursor: 'pointer',
                    border: activeConcern === idx ? '2px solid #F5E642′ : '2px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '15px' }}>🔎 {c.concern}</span>
                    <span style={{ color: '#F5E642′ }}>{activeConcern === idx ? '▲' : '▼'}</span>
                  </div>
                  {activeConcern === idx && (
                    <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7', marginTop: '12px' }}>{c.lookup}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🏠 Preparing Your Home for DFW's Growth?</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk connects you with local pros who understand DFW development trends and can help you plan improvements.</p>
        </div>
      </div>
    </div>
  );
}
