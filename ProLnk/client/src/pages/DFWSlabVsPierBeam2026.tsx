import { useState } from 'react';

const guides: Record<string, { maintenance: string[]; repairApproach: string; advantage: string }> = {
  slab: {
    maintenance: [
      'Water foundation perimeter 12-18in from edge — daily in summer',
      'Maintain consistent soil moisture year-round to prevent clay shrinkage',
      'Ensure gutters divert water at least 6ft from foundation',
      'Watch for cracks in drywall, brick, or tile — early sign of movement',
      'Trim tree roots within 20ft of foundation annually',
    ],
    repairApproach: 'Steel push piers or helical piers driven to stable soil (12-20ft). Concrete pressed pilings also common. Tunneling required for plumbing under slab.',
    advantage: 'Lower initial cost, lower maintenance overhead, no crawlspace pest issues.',
  },
  pier_beam: {
    maintenance: [
      'Inspect crawlspace annually for moisture, pest damage, and beam deterioration',
      'Maintain cross-ventilation in crawlspace — vapor barrier is critical in DFW',
      'Shim or replace wooden beams on schedule (every 15-25 years)',
      'Monitor for wood rot, termites, and settling of concrete piers',
      'Keep soil moisture consistent — same rules as slab but easier to monitor',
    ],
    repairApproach: 'Replace or shim individual piers. Add concrete blocks or adjustable steel piers. Far less invasive than slab — no tunneling needed for plumbing access.',
    advantage: 'Crawlspace access makes plumbing, electrical, and HVAC repairs far cheaper. Easier inspection. Common in pre-1970 DFW homes.',
  },
};

export default function DFWSlabVsPierBeam2026() {
  const [foundationType, setFoundationType] = useState('');
  const guide = foundationType ? guides[foundationType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Slab vs Pier & Beam in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>90% of DFW homes have slab foundations. Pier & beam is common in older neighborhoods (pre-1975). Repair approach differs dramatically.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#112240', borderRadius: 8, padding: 20, border: '2px solid #F5E642′ }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>🏗️ Slab Foundation</div>
            <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
              90% of DFW homes. Poured concrete sits directly on grade. Moves with clay soil. Requires piers when soil loses moisture. Plumbing runs under slab — leaks are costly to access.
            </div>
          </div>
          <div style={{ background: '#112240', borderRadius: 8, padding: 20, border: '1px solid #1e3a5f' }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>🏠 Pier & Beam</div>
            <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
              Older DFW homes. Floor sits on beams supported by concrete piers. Crawlspace below provides access. More forgiving of soil movement. Easier plumbing but prone to moisture and pest issues.
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { label: '🏙️ DFW Distribution', val: '90% slab · 10% pier-beam' },
            { label: '💰 Avg Repair Cost', val: 'Slab: $5K-15K · P&B: $2K-8K' },
            { label: '⏱️ Repair Time', val: 'Slab: 1-2 days · P&B: 1 day' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 8, padding: 16, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>{s.label}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏡 My DFW Maintenance Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>My foundation type:</label>
          <select value={foundationType} onChange={(e) => setFoundationType(e.target.value)}
            style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, marginBottom: 16 }}>
            <option value="">Select foundation type...</option>
            <option value="slab">Concrete Slab (post-1975, most DFW homes)</option>
            <option value="pier_beam">Pier & Beam (pre-1975, older neighborhoods)</option>
          </select>
          {guide && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, marginBottom: 12, border: '1px solid #F5E642′ }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Your Maintenance Checklist:</div>
                <ul style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: 13, lineHeight: 1.9 }}>
                  {guide.maintenance.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Repair Approach:</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{guide.repairApproach}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
