import { useState } from 'react';

const vulnerabilityData: Record<string, Record<string, { level: string; color: string; score: number; priorities: string[]; checks: string[] }>> = {
  'pre-1980': {
    'wood-frame': { level: 'MODERATE', color: '#f59e0b', score: 5, priorities: ['Strap water heater to wall studs immediately — $20–$40 DIY', 'Secure top-heavy furniture (bookshelves, armoires) with L-brackets', 'Move heavy items to lower shelves — reduce fall hazard', 'Inspect brick chimney for mortar cracks — common failure point', 'Check foundation for existing cracks — document with photos'], checks: ['Inspect exterior wood siding for separation at corners', 'Check crawl space for any shifted piers (pier and beam homes)', 'Look for diagonal cracks from window corners — sign of racking stress', 'Test all gas appliances for proper operation'] },
    'brick-masonry': { level: 'HIGH', color: '#ef4444', score: 8, priorities: ['Unreinforced masonry is highest seismic risk in DFW — consult structural engineer', 'Strap all water heaters, appliances, and shelving immediately', 'Secure all bookcases and cabinets to wall studs with furniture straps', 'Move beds away from exterior brick walls', 'Consider seismic retrofit consultation — $3,000–$15,000'], checks: ['Inspect all mortar joints for deterioration — critical in DFW humidity', 'Look for stair-step cracks in brick courses', 'Check chimney for any tilting or separation from roofline', 'Inspect interior walls for hairline cracks running diagonally'] },
    'slab-concrete': { level: 'LOW-MODERATE', color: '#84cc16', score: 4, priorities: ['Secure water heater and gas appliances to wall studs', 'Anchor tall furniture and appliances to prevent toppling', 'Secure cabinet latches to prevent door opening during shaking', 'Inspect garage door opener tracks and brackets'], checks: ['Check slab edges for cracking, especially at corners', 'Look for cracks in drywall — especially diagonal from window corners', 'Inspect foundation perimeter for heaving or separation'] },
  },
  '1980-2000': {
    'wood-frame': { level: 'LOW', color: '#22c55e', score: 3, priorities: ['Strap water heater — 15-minute DIY job, required by code in seismic zones', 'Use furniture straps on tall bookcases and TVs', 'Secure top cabinets with child safety latches', 'Inspect attic shear panels if accessible'], checks: ['Look for any separation at wall-to-ceiling connections', 'Check that exterior sheathing is intact with no gaps', 'Inspect gas line flexible connectors — replace if older than 20 years'] },
    'brick-masonry': { level: 'MODERATE', color: '#f59e0b', score: 6, priorities: ['Post-1980 masonry should have some reinforcement — verify with permit records', 'Still recommend furniture strapping and water heater anchoring', 'Inspect chimney cap and crown for cracking', 'Secure cabinet contents with museum putty or door latches'], checks: ['Check mortar joints along exterior — look for voids', 'Inspect window lintels (brick above windows) for cracking', 'Look for efflorescence (white deposits) indicating water intrusion'] },
    'slab-concrete': { level: 'LOW', color: '#22c55e', score: 2, priorities: ['Modern slab homes in DFW are generally well-suited for local seismic activity', 'Secure water heater and any unstrapped appliances', 'Use museum putty under breakables on shelves'], checks: ['Visual inspection of slab perimeter for settlement cracks', 'Check plumbing under sinks for any shifted connections', 'Inspect HVAC connections and refrigerant lines'] },
  },
  'post-2000': {
    'wood-frame': { level: 'VERY LOW', color: '#15803d', score: 1, priorities: ['Modern engineered lumber and sheathing provides good seismic resistance', 'Water heater strapping should already be compliant — verify', 'Furniture strapping is still good practice for large items'], checks: ['Post-major local earthquake: look for nail pops in drywall', 'Check attic for any shifted roof trusses', 'Inspect any masonry veneer for cracking at mortar joints'] },
    'brick-masonry': { level: 'LOW', color: '#22c55e', score: 3, priorities: ['Post-2000 brick is typically brick veneer over wood frame — less risk than solid masonry', 'Secure water heater and furniture as standard practice', 'Check that brick veneer ties are present — visible at weep holes'], checks: ['Inspect weep holes for blockage — affects veneer integrity', 'Look for cracks at brick veneer corners and window surround', 'Check where veneer meets foundation for any separation'] },
    'slab-concrete': { level: 'VERY LOW', color: '#15803d', score: 1, priorities: ['Modern construction with reinforced slab performs well in DFW seismic events', 'Standard precautions: strap water heater, secure tall furniture', 'No structural changes needed for typical DFW seismic activity'], checks: ['After a 3.0+ local earthquake: walk perimeter looking for new cracks', 'Check gas meter and connections for any movement', 'Inspect where utilities enter foundation for gaps'] },
  },
};

export default function DFWEarthquakeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [construction, setConstruction] = useState('');
  const [result, setResult] = useState<null | { level: string; color: string; score: number; priorities: string[]; checks: string[] }>(null);

  function assess() {
    if (homeAge && construction) setResult(vulnerabilityData[homeAge]?.[construction] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏔️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Earthquake Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Induced seismicity from oil & gas injection is a real DFW risk</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📍 DFW Seismic Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🛢️ Injection Wells', 'Wastewater injection from oil & gas operations causes induced seismicity — Azle, Irving, and Grand Prairie are epicenter zones'], ['📊 Magnitude Range', 'Most DFW earthquakes are M2.0–M3.5 — felt but rarely damaging. M4.0+ can cause minor damage to older structures'], ['🗺️ High Activity Zones', 'Azle/Reno: most active cluster. Irving/Dallas: 2014–2015 swarm. Grand Prairie: ongoing monitoring by USGS'], ['🏚️ Structural Risk', 'Unreinforced masonry and pre-1980 construction carry the highest risk in DFW\’s typical seismic range']].map(([t, d]) => (
              <div key={t as string} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📊 Magnitude: What to Expect</h2>
          {[['M2.0–M2.9', 'Felt by some — might feel like a truck hitting your house. No damage expected.', '#22c55e'], ['M3.0–M3.9', 'Felt by most people. Objects may rattle. Check water heater connections and gas lines after.', '#84cc16'], ['M4.0–M4.9', 'Widely felt. Minor damage possible: chimney cracks, fallen objects, plaster cracks.', '#f59e0b'], ['M5.0+', 'Moderate damage potential. Inspect foundation, chimney, gas lines, and structural walls immediately.', '#ef4444']].map(([mag, desc, col]) => (
            <div key={mag} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: '1px solid #0A1628', alignItems: 'flex-start' }}>
              <span style={{ color: col, fontWeight: 700, minWidth: 90, fontSize: 14 }}>{mag}</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Vulnerability Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Home Age</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select home age...</option>
              <option value="pre-1980">Pre-1980 (older construction)</option>
              <option value="1980-2000">1980–2000</option>
              <option value="post-2000">Post-2000 (modern construction)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Primary Construction Type</label>
            <select value={construction} onChange={e => setConstruction(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select construction type...</option>
              <option value="wood-frame">Wood Frame (most DFW homes)</option>
              <option value="brick-masonry">Brick / Masonry</option>
              <option value="slab-concrete">Slab / Concrete Block</option>
            </select>
          </div>
          <button onClick={assess} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Assess Vulnerability →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: result.color }}>Vulnerability: {result.level}</div>
                <div style={{ background: result.color, borderRadius: 20, padding: '2px 12px', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>{result.score}/10</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🔧 Securing Priorities</div>
                {result.priorities.map((p, i) => <div key={i} style={{ padding: '5px 0', color: '#cbd5e1', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>✓ {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🔍 Post-Earthquake Checks</div>
                {result.checks.map((c, i) => <div key={i} style={{ padding: '5px 0', color: '#94a3b8', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>→ {c}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📞 Seismic Resources</h2>
          {[['🌐 USGS Earthquake Hazards', 'earthquake.usgs.gov/earthquakes/map'], ['📍 TexNet Seismic Monitor', 'texnet.beg.utexas.edu'], ['🏠 Structural Engineer Finder', 'seaot.org/find-an-engineer'], ['🛢️ Report Injection Well', 'rrc.texas.gov/complaints']].map(([l, v]) => (
            <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #0A1628', color: '#cbd5e1', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
              <span>{l}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
