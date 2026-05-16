import { useState } from 'react';

const cityData: Record<string, { days: string; inspections: number; expedite: string; notes: string }> = {
  Frisco: { days: '3–5 business days (online portal)', inspections: 3, expedite: 'Pre-application meeting, $150 fee', notes: 'Frisco eTRAKiT portal; same-day digital permit for simple projects' },
  Plano: { days: '5–7 business days', inspections: 3, expedite: 'Concurrent review available, $200 fee', notes: 'Permit portal at permits.plano.gov' },
  Dallas: { days: '2–4 weeks', inspections: 4, expedite: 'Rapid Review Program $350; cuts to 5 days', notes: 'High volume city; submit complete plans or expect resubmittal delays' },
  'Fort Worth': { days: '10–15 business days', inspections: 4, expedite: 'Expedited Review $300 for residential', notes: 'Fort Worth Development permits.fortworthtexas.gov' },
  McKinney: { days: '5–8 business days', inspections: 3, expedite: 'Pre-submittal conference free, speeds approval', notes: 'McKinney CSS portal; strong online scheduling' },
  Allen: { days: '3–5 business days', inspections: 3, expedite: 'Walk-through same day for additions under 500 sq ft', notes: 'One of fastest DFW cities for residential permits' },
  Garland: { days: '7–10 business days', inspections: 4, expedite: 'No formal program; call chief inspector', notes: 'Garland Development Services 972-205-2170' },
  Irving: { days: '7–12 business days', inspections: 3, expedite: '$250 expedite; 3-day turnaround', notes: 'Irving ePlans system adopted 2023' },
  Denton: { days: '5–10 business days', inspections: 3, expedite: 'Pre-application meetings reduce revision cycles', notes: 'Denton One Stop Shop portal' },
  Mesquite: { days: '7–14 business days', inspections: 4, expedite: 'No formal expedite; complete submittals fastest path', notes: 'Older review process; paper submittals still common' },
};

const projectTypes: Record<string, { label: string; delay: string }> = {
  addition: { label: 'Room Addition', delay: '+3–5 days (structural review)' },
  kitchen: { label: 'Kitchen Remodel', delay: '+1–2 days (MEP trades)' },
  bath: { label: 'Bathroom Remodel', delay: 'Minimal — plumbing scope only' },
  deck: { label: 'Deck / Patio Cover', delay: 'Minimal — simple plan review' },
  fence: { label: 'Fence', delay: 'Same day in most DFW cities' },
  hvac: { label: 'HVAC Replacement', delay: 'Same day — mechanical permit' },
  electrical: { label: 'Electrical Panel Upgrade', delay: 'Same day — electrical permit' },
};

export default function DFWRenovationPermitTimeline() {
  const [city, setCity] = useState('');
  const [project, setProject] = useState('');

  const cityInfo = cityData[city];
  const projectInfo = projectTypes[project];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>🏠 PROLNK DFW RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Renovation Permit Timeline Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>How long permits actually take across DFW cities — and how to speed them up.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select city...</option>
              {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Project Type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select project...</option>
              {Object.entries(projectTypes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        {cityInfo && (
          <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #2D3E55' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📋 {city} Permit Info</div>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: '#94A3B8' }}>⏱️ Base timeline</span>
                <span style={{ fontWeight: 600 }}>{cityInfo.days}</span>
              </div>
              {projectInfo && (
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ color: '#94A3B8' }}>🔧 Project adjustment</span>
                  <span style={{ fontWeight: 600 }}>{projectInfo.delay}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: '#94A3B8' }}>🔍 Inspections needed</span>
                <span style={{ fontWeight: 600 }}>{cityInfo.inspections} inspections</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: '#94A3B8' }}>⚡ Expedite option</span>
                <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: 320 }}>{cityInfo.expedite}</span>
              </div>
              <div style={{ borderTop: '1px solid #2D3E55', paddingTop: 12, color: '#94A3B8', fontSize: 14 }}>💡 {cityInfo.notes}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, border: '1px solid #2D3E55' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⚠️ What Delays DFW Permits</div>
          <ul style={{ paddingLeft: 20, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
            <li>Incomplete plan sets — missing dimensions, materials, or MEP details</li>
            <li>No contractor license number on application (required for trades)</li>
            <li>HOA approval missing when city requires it</li>
            <li>Structural engineering letter absent for load-bearing changes</li>
            <li>Submitting paper plans when city has gone digital-only</li>
          </ul>
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#0A1628', borderRadius: 8, fontSize: 14 }}>
            🏆 Certificate of Occupancy (CO) is issued after final inspection passes — required before occupying any addition.
          </div>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>Need a licensed contractor who knows {city || 'DFW'} permits?</div>
          <a href='https://prolnk.io' style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Quotes on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
