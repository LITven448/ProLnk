import { useState } from 'react';

const SCENARIOS = [
  { type: 'New construction purchase', age: 'New build', survey: 'Boundary Survey (required by most DFW lenders)', recommendation: 'Strongly recommended — builder grading and concrete work can result in immediate encroachments. Clay soil in DFW expands and contracts seasonally, which can shift slabs within the first year.', lookFor: ['Foundation setbacks from property line meet city code', 'Driveway and sidewalk within property boundaries', 'Fence alignment matches boundary — builder fences often off by 1-3 feet', 'Utility easement does not cross planned additions'], cost: '$400–$600 for standard boundary survey in DFW metro' },
  { type: 'Resale home purchase (standard)', age: '5–20 years', survey: 'Boundary Survey (lender typically requires; ALTA optional)', recommendation: 'Required by most lenders. DFW clay soil causes structural movement — have surveyor note any structure closer than 5 feet to a line as a potential encroachment risk worth monitoring.', lookFor: ['Pool, additions, outbuildings — confirm within property lines', 'Fences — misaligned fences are common in established DFW neighborhoods', 'Driveway encroachments on easements or neighboring property', 'Shed or detached garage location relative to setback lines'], cost: '$450–$700 for boundary survey; $1,200–$2,500 for ALTA' },
  { type: 'Older resale home (30+ years)', age: '30+ years', survey: 'ALTA/NSPS Survey (highly recommended)', recommendation: 'DFW clay soil causes cumulative structural drift over decades. A full ALTA survey catches boundary encroachments, easements not on record, and structure movement not visible during inspection. Worth every penny on older DFW properties.', lookFor: ['Foundation edge vs setback line — clay movement can shift 2-4 inches over 30 years', 'Encroachments from or onto neighbor property', 'Utility easements not on the title commitment', 'Any additions built without permits (often off the boundary line)'], cost: '$1,200–$2,500 for ALTA in DFW metro area' },
  { type: 'Rural or large lot purchase (1+ acre)', age: 'Any age', survey: 'Boundary Survey + Topographic Survey (if planning development)', recommendation: 'Rural DFW and fringe counties (Denton, Parker, Kaufman, Johnson) have frequent boundary disputes. Monument markers are often missing or moved. A full boundary survey with corner monumentation is essential.', lookFor: ['Iron pin monuments at all corners — replace if missing', 'Fence lines vs legal boundary — rural fences are often misplaced by 10–50 feet', 'Floodplain and drainage easements', 'Mineral estate boundary (if relevant)'], cost: '$800–$2,000 depending on acreage and terrain; topo adds $500–$1,500' },
  { type: 'Commercial or investment property', age: 'Any age', survey: 'ALTA/NSPS Survey (required by most commercial lenders)', recommendation: 'ALTA surveys are the lender standard for commercial in DFW. They include zoning certification, utility locations, access rights, and parking analysis — all required for commercial title insurance without standard exceptions.', lookFor: ['Access easements to public road', 'Parking lot within property lines', 'Sign easements or billboard encumbrances', 'Utilities and their easement widths'], cost: '$2,500–$8,000+ depending on size and complexity' },
];

const CLAY_FACTS = [
  { fact: 'DFW sits on Blackland Prairie — one of the most expansive clay soil regions in North America' },
  { fact: 'DFW clay can expand up to 10% in volume when wet and shrink dramatically when dry' },
  { fact: 'Foundation movement of 1–4 inches over 20 years is common — this can push structures toward or over property lines' },
  { fact: 'Pier-and-beam foundations in older DFW homes absorb some movement; slab foundations shift as a unit' },
  { fact: 'Survey encroachments found on older DFW homes are often due to clay movement, not original construction error' },
  { fact: 'If a neighbor’s fence or structure has encroached due to clay movement, this is still a legal encroachment — survey protects you' },
];

export default function DFWSurveyGuide() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('scenarios');

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Property Survey Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>What surveys show, which type to order, and why DFW clay soil makes surveys especially important</p>
        </div>

        <div style={{ background: '#FEF2F2', borderRadius: 10, padding: '1rem', marginBottom: 20, border: '1px solid #FECACA' }}>
          <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>⚠️ DFW Clay Soil Warning</div>
          <div style={{ color: '#7F1D1D', fontSize: 14 }}>Dallas-Fort Worth sits on expansive Blackland Prairie clay. This soil shifts structures over time — making surveys on older properties especially important for catching encroachments that weren't there at original construction.</div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {['scenarios', 'clay'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSelected(null); }}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                background: activeTab === tab ? '#F5E642' : '#fff', color: activeTab === tab ? '#0A1628' : '#64748B' }}>
              {tab === 'scenarios' ? '🏠 Survey by Property Type' : '🌍 DFW Clay Soil Facts'}
            </button>
          ))}
        </div>

        {activeTab === 'scenarios' && (
          <div>
            <p style={{ color: '#64748B', marginBottom: 16 }}>Select your transaction type to get survey recommendations, cost estimates, and what to look for:</p>
            <div style={{ display: 'grid', gap: 12 }}>
              {SCENARIOS.map((s, i) => (
                <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                  style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', cursor: 'pointer',
                    border: selected === i ? '2px solid #F5E642' : '2px solid transparent', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 600, color: '#0A1628' }}>{s.type}</div>
                    <div style={{ background: '#F0F9FF', color: '#0369A1', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{s.age}</div>
                  </div>
                  <div style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>→ {s.survey}</div>
                  {selected === i && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '0.8rem', fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>{s.recommendation}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#166534', fontSize: 12, marginBottom: 6 }}>🔍 WHAT TO LOOK FOR</div>
                          {s.lookFor.map((l, j) => <div key={j} style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>• {l}</div>)}
                        </div>
                        <div style={{ background: '#FFF9E6', borderRadius: 8, padding: '0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#92400E', fontSize: 12, marginBottom: 6 }}>💰 COST ESTIMATE</div>
                          <div style={{ fontSize: 14, color: '#78350F', fontWeight: 600 }}>{s.cost}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clay' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {CLAY_FACTS.map((c, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20, minWidth: 28 }}>🌍</div>
                <div style={{ color: '#334155', fontSize: 14, lineHeight: 1.6 }}>{c.fact}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>📐 Use a Texas Licensed State Land Surveyor (RPLS). The Texas Society of Professional Surveyors (tsps.org) has a member directory.</div>
        </div>
      </div>
    </div>
  );
}
