import { useState } from 'react';

const interiorProjects = [
  { label: 'Fresh Interior Paint', roiMin: 100, roiMax: 114, description: 'Best ROI of any interior project — averages 107% in DFW' },
  { label: 'Kitchen Remodel (Minor)', roiMin: 65, roiMax: 80, description: 'Cabinet refresh + counters beats full gut every time' },
  { label: 'Master Bathroom Update', roiMin: 60, roiMax: 75, description: 'Vanity, fixtures, and tile drive most of the value' },
  { label: 'Flooring Replacement', roiMin: 70, roiMax: 80, description: 'Hardwood or LVP adds broad buyer appeal in DFW' },
];

export default function DFWInteriorROIGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [cost, setCost] = useState('');
  const [homeValue, setHomeValue] = useState('');
  const [result, setResult] = useState<{ valueAdded: number; roiPct: number; ceilingWarning: boolean; note: string } | null>(null);

  function calculate() {
    const proj = interiorProjects.find(p => p.label === selectedProject);
    const investCost = parseFloat(cost);
    const hv = parseFloat(homeValue);
    if (!proj || isNaN(investCost) || investCost <= 0) return;

    const roiMid = (proj.roiMin + proj.roiMax) / 2 / 100;
    const valueAdded = Math.round(investCost * roiMid);
    const roiPct = Math.round(roiMid * 100);
    const ceilingWarning = !isNaN(hv) && hv > 0 && valueAdded > hv * 0.12;

    setResult({ valueAdded, roiPct, ceilingWarning, note: proj.description });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏠 DFW Market Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Interior Renovation ROI Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
          Not all interior upgrades are created equal. See which DFW improvements deliver the strongest returns before listing.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {interiorProjects.map(p => (
            <div key={p.label} style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{p.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{p.description}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{p.roiMin}–{p.roiMax}%</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>ROI</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>
            📊 Calculate Interior ROI
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>
              Improvement Type
            </label>
            <select
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
            >
              <option value="">Select an improvement...</option>
              {interiorProjects.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>
                Project Cost ($)
              </label>
              <input
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
                placeholder="e.g. 15000″
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>
                Current Home Value ($)
              </label>
              <input
                type="number"
                value={homeValue}
                onChange={e => setHomeValue(e.target.value)}
                placeholder="e.g. 450000″
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          >
            Calculate DFW ROI →
          </button>

          {result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: `1px solid ${result.ceilingWarning ? '#f59e0b' : '#F5E642'}` }}>
              {result.ceilingWarning && (
                <div style={{ background: '#451a03', border: '1px solid #f59e0b', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#fbbf24', fontSize: 13 }}>
                  ⚠️ Neighborhood ceiling check: this improvement may exceed what your market supports. Verify comparable sales first.
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${result.valueAdded.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Resale Value Added</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>{result.roiPct}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>DFW ROI</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, borderTop: '1px solid #1e3a5f', paddingTop: 16 }}>
                💡 {result.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🎨 DFW Buyer Preference</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            DFW buyers in the $350K–$600K range expect move-in ready interiors. Fresh neutral paint and updated flooring are the two fastest ways to reduce days on market and attract multiple offers.
          </div>
        </div>
      </div>
    </div>
  );
}
