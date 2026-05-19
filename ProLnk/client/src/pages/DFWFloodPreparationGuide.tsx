import { useState } from 'react';

const floodRisk: Record<string, Record<string, { score: number; label: string; color: string; checklist: string[]; move: string[] }>> = {
  'zone-x': {
    'slab-elevated': { score: 2, label: 'LOW', color: '#22c55e', checklist: ['Install backflow preventer on main sewer line', 'Keep gutters and downspouts clear', 'Grade yard to slope away from foundation', 'Know location of main water shutoff', 'Review homeowners policy — flood NOT included'], move: ['Important documents', 'Valuables from floor level', 'Electronics near floor outlets'] },
    'slab-grade': { score: 4, label: 'LOW-MODERATE', color: '#84cc16', checklist: ['Install floor drain backflow preventer', 'Keep landscape drainage channels clear', 'Sandbag garage door threshold proactively', 'Photograph all belongings for insurance', 'Consider flood insurance even in Zone X — 25% of claims are outside high-risk zones'], move: ['Documents and electronics to countertops', 'Lower kitchen cabinets items', 'Garage floor items to shelving'] },
    'pier-beam': { score: 3, label: 'LOW', color: '#22c55e', checklist: ['Inspect pier and beam foundation for moisture damage annually', 'Ensure crawl space vents function properly', 'Install sump pump if crawl space retains water', 'Gravel under home improves drainage significantly'], move: ['Crawl space stored items to elevated location', 'HVAC and water heater if in crawl space'] },
  },
  'zone-ae': {
    'slab-elevated': { score: 6, label: 'MODERATE', color: '#f59e0b', checklist: ['Flood insurance REQUIRED for federally backed mortgages — 30-day wait for coverage', 'Install flood vents in foundation walls', 'Raise electrical panel, HVAC, and water heater above BFE', 'Sandbag all exterior doors at first flash flood watch', 'Know your Base Flood Elevation (BFE) from your FEMA certificate'], move: ['All floor-level belongings above 2 feet', 'Washer/dryer if possible', 'All documents, photos, and irreplaceable items', 'Medications and first aid'] },
    'slab-grade': { score: 8, label: 'HIGH', color: '#ef4444', checklist: ['Flood insurance is mandatory and critical — buy immediately', 'Elevate utilities above BFE — $5,000–$15,000 investment that pays off', 'Install temporary flood barriers (NOAQ Boxwall, Tiger Dam)', 'Pre-position 40+ sandbags during any storm watch', 'Know your evacuation route before water rises'], move: ['EVERYTHING above 3 feet — assume 2 feet of water', 'Appliances on blocks or removed', 'Vehicles moved to high ground when watch issued', 'Pets and pet supplies'] },
    'pier-beam': { score: 5, label: 'MODERATE', color: '#f59e0b', checklist: ['Pier and beam offers natural flood resilience — maintain it', 'Install flood vents: 1 sq inch per sq foot of enclosed area', 'Ensure crawl space is not enclosed without vents', 'Flood insurance still required in Zone AE', 'Inspect wood members under home after every flood event'], move: ['Crawl space items', 'All floor-level belongings above flood level', 'Documents and valuables to upper floor'] },
  },
  'zone-v': {
    'slab-elevated': { score: 9, label: 'VERY HIGH', color: '#dc2626', checklist: ['Zone V = velocity zone — wave action in addition to flooding', 'Flood insurance mandatory and covers up to $250K structure', 'Consult structural engineer about breakaway walls', 'Prepare to evacuate when tropical system threatens DFW', 'Document all possessions with video walkthrough'], move: ['Full evacuation recommended — move everything of value', 'Vehicles and equipment to high ground', 'All irreplaceable items offsite to storage'] },
    'slab-grade': { score: 10, label: 'CRITICAL', color: '#b91c1c', checklist: ['Slab-on-grade in Zone V is extremely high risk', 'Consult with licensed flood mitigation contractor immediately', 'FEMA Hazard Mitigation Grant may fund elevation project', 'Consider voluntary buyout program through FEMA if available', 'Evacuation is the primary defense — have a plan'], move: ['Complete evacuation is your plan — stage valuables for rapid removal', 'Keep go-bags packed during storm season'] },
    'pier-beam': { score: 7, label: 'HIGH', color: '#ef4444', checklist: ['Pier and beam is best construction type for Zone V', 'Ensure open foundation design allows wave passthrough', 'Do not enclose under-home space — reduces wave damage', 'Flood insurance mandatory', 'Know your storm surge risk by address on FEMA flood map'], move: ['All items below elevated living area', 'Documents, electronics, valuables', 'Vehicles to high ground at storm watch'] },
  },
};

export default function DFWFloodPreparationGuide() {
  const [floodZone, setFloodZone] = useState('');
  const [homeFeature, setHomeFeature] = useState('');
  const [result, setResult] = useState<null | { score: number; label: string; color: string; checklist: string[]; move: string[] }>(null);

  function assess() {
    if (floodZone && homeFeature) setResult(floodRisk[floodZone]?.[homeFeature] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌊</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Flood Preparation Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Flash flood capital of Texas — know your risk before the rain</p>
        </div>

        <div style={{ background: '#dc2626', borderRadius: 10, padding: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>⚠️</span>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>Flood Insurance Has a 30-Day Waiting Period</div><div style={{ fontSize: 13, marginTop: 4, opacity: 0.9 }}>You cannot buy flood insurance when a storm is approaching. If you don't have it, buy it today. Standard homeowners insurance does NOT cover flooding.</div></div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>💧 DFW Flood Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🌧️ Growth Problem', 'DFW added 1.3M people in 10 years — concrete and pavement overwhelm aging drainage infrastructure'], ['⚡ Flash Flood Speed', 'DFW creeks can rise 20+ feet in under an hour — Turn Around, Don\’t Drown applies even on local roads'], ['🏠 False Security', '25% of NFIP claims come from Zone X (low risk) — location on a map doesn\’t make you immune'], ['📊 Record Events', 'May 2015: 11 inches in 24 hours. 2022: $3B in DFW flood losses. 2024: multiple hundred-year events in one season']].map(([t, d]) => (
              <div key={t as string} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🪜 Sandbag Placement Guide</h2>
          {[['Garage doors', 'Line threshold with sandbags 3 high — garage is most common flood entry point'], ['Entry doors', 'L-shaped sandbag barrier, 6 inches out from door frame'], ['Window wells', 'Surround basement window wells to prevent water intrusion'], ['HVAC vents', 'Sandbag around ground-level AC compressor and utility vents'], ['Sewer clean-out', 'Cap sewer clean-out with plug — prevents sewage backflow into home']].map(([loc, tip]) => (
            <div key={loc} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 130, fontSize: 14 }}>{loc}</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Flood Risk Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>FEMA Flood Zone (check msc.fema.gov)</label>
            <select value={floodZone} onChange={e => setFloodZone(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select flood zone...</option>
              <option value="zone-x">Zone X — Minimal Risk (outside 500-year floodplain)</option>
              <option value="zone-ae">Zone AE — High Risk (1% annual chance flood)</option>
              <option value="zone-v">Zone V — Coastal / Velocity Zone</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Home Foundation Type</label>
            <select value={homeFeature} onChange={e => setHomeFeature(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select foundation type...</option>
              <option value="slab-elevated">Slab — Elevated (first floor 2+ feet above grade)</option>
              <option value="slab-grade">Slab — At Grade (front door at ground level)</option>
              <option value="pier-beam">Pier & Beam (raised floor, crawl space below)</option>
            </select>
          </div>
          <button onClick={assess} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Assess Flood Risk →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: result.color }}>Risk: {result.label}</div>
                <div style={{ background: result.color, borderRadius: 20, padding: '2px 12px', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>{result.score}/10</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>📋 Preparation Checklist</div>
                {result.checklist.map((c, i) => <div key={i} style={{ padding: '5px 0', color: '#cbd5e1', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>✓ {c}</div>)}
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>📦 Move These Items When Watch Issued</div>
                {result.move.map((m, i) => <div key={i} style={{ padding: '5px 0', color: '#94a3b8', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>↑ {m}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📞 DFW Flood Resources</h2>
          {[['🗺️ FEMA Flood Map', 'msc.fema.gov — look up your address flood zone'], ['🏠 NFIP Flood Insurance', 'floodsmart.gov — buy before the storm (30-day wait)'], ['🚨 Flash Flood Warning Line', '511 or weather.gov/fwd'], ['💰 FEMA Assistance', '1-800-621-3362 after a declared disaster']].map(([l, v]) => (
            <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #0A1628', color: '#cbd5e1', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
              <span>{l}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
