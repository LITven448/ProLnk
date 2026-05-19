import { useState } from 'react';

const outdoorProjects = [
  { label: 'Covered Patio', roiMin: 75, roiMax: 80, description: 'Highest ROI outdoor project in DFW climate' },
  { label: 'Outdoor Kitchen', roiMin: 60, roiMax: 70, description: 'High demand in DFW entertaining culture' },
  { label: 'Pergola / Shade Structure', roiMin: 50, roiMax: 60, description: 'Popular for DFW heat mitigation' },
  { label: 'Swimming Pool', roiMin: 40, roiMax: 55, description: 'Adds $30–50K but only ~50% cost recovered in most DFW markets' },
];

export default function DFWOutdoorLivingROIGuide() {
  const [selectedProject, setSelectedProject] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState<{ valueAdded: number; roiPct: number; paybackYrs: number; note: string } | null>(null);

  function calculate() {
    const proj = outdoorProjects.find(p => p.label === selectedProject);
    const investCost = parseFloat(cost);
    if (!proj || isNaN(investCost) || investCost <= 0) return;

    const roiMid = (proj.roiMin + proj.roiMax) / 2 / 100;
    const valueAdded = Math.round(investCost * roiMid);
    const roiPct = Math.round(roiMid * 100);
    const paybackYrs = parseFloat((investCost / (valueAdded / 10)).toFixed(1));

    setResult({ valueAdded, roiPct, paybackYrs, note: proj.description });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏡 DFW Market Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Outdoor Living ROI Guide
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
          DFW buyers pay a premium for outdoor living. See exactly how much each project adds to your resale value before you build.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {outdoorProjects.map(p => (
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
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>
            📊 Calculate Your Project ROI
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1' }}>
              Outdoor Project Type
            </label>
            <select
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
            >
              <option value="">Select a project...</option>
              {outdoorProjects.map(p => <option key={p.label}>{p.label}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#cbd5e1' }}>
              Estimated Project Cost ($)
            </label>
            <input
              type="number"
              value={cost}
              onChange={e => setCost(e.target.value)}
              placeholder="e.g. 25000"
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
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${result.valueAdded.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Resale Value Added</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>{result.roiPct}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>DFW ROI</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>{result.paybackYrs}yr</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Est. Payback</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, borderTop: '1px solid #1e3a5f', paddingTop: 16 }}>
                💡 {result.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, background: '#111d33', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🌡️ DFW Climate Factor</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            DFW's 230+ sunny days per year make outdoor living spaces a top buyer priority. Covered structures outperform open patios due to the summer heat — shade coverage can add 15–20% to the functional value buyers perceive.
          </div>
        </div>
      </div>
    </div>
  );
}
