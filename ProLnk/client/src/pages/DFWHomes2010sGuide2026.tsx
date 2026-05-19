import { useState } from 'react';

const DECADE_DATA: Record<string, { items: string[]; priority: string }> = {
  '2010': { priority: '🔴 High', items: ['HVAC system 15+ yrs old — replacement likely needed', 'Foundation: first major settlement cycle starting', 'Water heater at end of life (10-13 yr mark)', 'PEX plumbing intact but check manifold connections', 'Roof: 15-yr shingles nearing replacement zone'] },
  '2011': { priority: '🔴 High', items: ['HVAC hitting 14-yr mark — schedule tune-up now', 'Foundation clay movement increasing after 2011 droughts', 'Check attic insulation code compliance (2009 IECC)', 'Water heater 14 yrs — inspect anode rod', '200A panel confirmed but check breaker wear'] },
  '2012': { priority: '🟠 Medium-High', items: ['HVAC 13 yrs — compressor health check recommended', 'Foundation: peer inspection every 2 years now', 'PEX manifold shutoff valves may need servicing', 'Garage door springs at lifespan limit (~10K cycles)', 'Exterior caulking and weather seal refresh'] },
  '2013': { priority: '🟠 Medium-High', items: ['HVAC 12 yrs — efficiency dropping, document SEER rating', 'Smart thermostat upgrade will show ROI on utility bills', 'Foundation pier spacing check if adding structure', 'Attic air sealing reduces cooling load significantly', 'Check for efflorescence on brick veneer'] },
  '2014': { priority: '🟡 Medium', items: ['HVAC 11 yrs — still in range but monitor refrigerant', 'First comprehensive home inspection since purchase advised', 'PEX fittings: check for any slow leaks under slab', 'Fence posts in clay soil may be shifting', 'Window seals: check for fogging on dual pane'] },
  '2015': { priority: '🟡 Medium', items: ['HVAC 10 yrs — get professional efficiency assessment', 'Foundation first 10-yr measurement benchmark', 'Roof midpoint: inspect flashing around all penetrations', 'HVAC filter replacement schedule critical now', 'Document all systems for ProLnk Home Health Vault'] },
  '2016': { priority: '🟢 Low-Medium', items: ['HVAC 9 yrs — still efficient, keep maintenance logs', 'Check attic ventilation: soffit and ridge vents clear', 'Foundation stable but establish baseline measurements', 'Plumbing: run all fixtures monthly to prevent mineral buildup', 'Review builder warranty transferability records'] },
  '2017': { priority: '🟢 Low-Medium', items: ['HVAC 8 yrs — prime operating window', 'Energy audit recommended to benchmark against 2009 IECC', 'Foundation: photograph reference points annually', 'Water heater 8 yrs — inspect for sediment buildup', 'Exterior paint 8-yr cycle approaching'] },
  '2018': { priority: '🟢 Low', items: ['HVAC 7 yrs — system in best efficiency window', 'All systems under active warranty period likely ended', 'Foundation soil moisture management during drought season', 'GFCI outlet testing: all bathrooms, kitchen, exterior', 'Smoke and CO detector battery cycle'] },
  '2019': { priority: '🟢 Low', items: ['HVAC 6 yrs — optimal performance expected', 'First exterior caulk and joint inspection', 'Foundation: install moisture sensors if on expansive clay', 'Check grading slopes away from foundation', 'Review HOA compliance for any exterior modifications'] },
};

export default function DFWHomes2010sGuide2026() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const years = Object.keys(DECADE_DATA).sort();
  const result = selectedYear ? DECADE_DATA[selectedYear] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK HOME GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏠 DFW 2010s Homes<br />Owner Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32 }}>Built after the 2009 energy code update — better insulated, PEX plumbing standard, 200A panels. Now hitting the 10–15 year maintenance window where major systems need attention.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>📅 Select Your Build Year</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Choose the year your home was built to see priority maintenance tasks for 2026.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {years.map(y => (
              <button key={y} onClick={() => setSelectedYear(y)}
                style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selectedYear === y ? '#F5E642' : '#1e3a5f'}`, background: selectedYear === y ? '#F5E642′ : '#0A1628', color: selectedYear === y ? '#0A1628' : '#fff', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
                {y}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Built in {selectedYear} — 2026 Priorities</h2>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{result.priority}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {result.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < result.items.length - 1 ? '1px solid #1e3a5f' : 'none', fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <span style={{ color: '#cbd5e1′ }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏗️ 2010s DFW Build Standards At-a-Glance</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Insulation', 'R-38 attic (2009 IECC)'], ['Plumbing', 'PEX throughout — no copper'], ['Electrical', '200A panel standard'], ['HVAC', '13 SEER minimum (2006 federal)'], ['Foundation', 'Post-tension slab on clay'], ['Windows', 'Dual-pane low-E standard']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0′ }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}