import { useState } from 'react';

const curbProjects = [
  { label: 'Garage Door Replacement', roiMin: 90, roiMax: 98, domImpact: '-5 to -8 days', buyerNote: 'First thing buyers see — sets entire first impression in DFW suburbs' },
  { label: 'Fresh Exterior Paint', roiMin: 70, roiMax: 80, domImpact: '-4 to -7 days', buyerNote: 'Signals maintained home, critical in DFW heat where paint fades fast' },
  { label: 'Front Door Upgrade', roiMin: 70, roiMax: 80, domImpact: '-3 to -5 days', buyerNote: 'Steel or fiberglass doors appeal to DFW security-conscious buyers' },
  { label: 'Professional Landscaping', roiMin: 50, roiMax: 100, domImpact: '-3 to -6 days', buyerNote: 'Drought-tolerant plants command premium in DFW water-restricted areas' },
  { label: 'Driveway Seal & Repair', roiMin: 150, roiMax: 200, domImpact: '-2 to -3 days', buyerNote: '$200–400 spend with outsized visual impact — highest cost-adjusted ROI' },
];

export default function DFWCurbAppealROIGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState<{ valueAdded: number; roiPct: number; domImpact: string; buyerNote: string } | null>(null);

  function calculate() {
    const proj = curbProjects.find(p => p.label === selectedProject);
    const investCost = parseFloat(cost);
    if (!proj || isNaN(investCost) || investCost <= 0) return;

    const roiMid = (proj.roiMin + proj.roiMax) / 2 / 100;
    const valueAdded = Math.round(investCost * roiMid);
    const roiPct = Math.round(roiMid * 100);

    setResult({ valueAdded, roiPct, domImpact: proj.domImpact, buyerNote: proj.buyerNote });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏡 DFW Market Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Curb Appeal ROI Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
          In DFW's competitive market, curb appeal drives offers before buyers even walk inside. See what actually moves the needle.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {curbProjects.map(p => (
            <div key={p.label} style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.label}</div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{p.roiMin}–{p.roiMax}% ROI</div>
                  <div style={{ color: '#22c55e', fontSize: 12, marginTop: 2 }}>📅 {p.domImpact} on market</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{p.buyerNote}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>
            📊 Calculate Curb Appeal ROI
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>
              Curb Appeal Project
            </label>
            <select
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
            >
              <option value="">Select a project...</option>
              {curbProjects.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1′ }}>
              Estimated Project Cost ($)
            </label>
            <input
              type="number"
              value={cost}
              onChange={e => setCost(e.target.value)}
              placeholder="e.g. 4000″
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={calculate}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          >
            Calculate DFW ROI →
          </button>

          {result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>${result.valueAdded.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Value Added</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>{result.roiPct}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>DFW ROI</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 18 }}>{result.domImpact}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Days on Market</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, borderTop: '1px solid #1e3a5f', paddingTop: 16 }}>
                🏡 DFW Buyer Psychology: {result.buyerNote}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📸 The 3-Second Rule in DFW</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            DFW buyers decide within 3 seconds of pulling up whether they want to go inside. In Frisco, McKinney, and Allen, neighbors keep immaculate yards — your curb appeal must match the block to avoid price reductions.
          </div>
        </div>
      </div>
    </div>
  );
}
