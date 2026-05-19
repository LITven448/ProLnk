import { useState } from 'react';

export default function DFWImprovementROITool() {
  const [projectType, setProjectType] = useState('kitchen');
  const [projectCost, setProjectCost] = useState('');
  const [homeValue, setHomeValue] = useState('');
  const [neighborhoodTier, setNeighborhoodTier] = useState('mid');
  const [results, setResults] = useState<null | {
    valueAdded: number;
    roi: number;
    payback: number;
    pencils: boolean;
    verdict: string;
  }>(null);

  const projects: Record<string, { label: string; roiBase: number }> = {
    kitchen: { label: '🍳 Kitchen Remodel', roiBase: 0.72 },
    bath: { label: '🛁 Bathroom Remodel', roiBase: 0.68 },
    addition: { label: '🏠 Room Addition', roiBase: 0.55 },
    deck: { label: '🌿 Deck / Patio', roiBase: 0.65 },
    garage: { label: '🚗 Garage Door Replace', roiBase: 0.95 },
    hvac: { label: '❄️ HVAC Replacement', roiBase: 0.85 },
    windows: { label: '🪟 Window Replacement', roiBase: 0.70 },
    pool: { label: '🏊 Pool Installation', roiBase: 0.45 },
  };

  const tierMults: Record<string, number> = { entry: 0.85, mid: 1.0, upper: 1.1, luxury: 0.9 };

  function calculate() {
    const cost = parseFloat(projectCost.replace(/,/g, '')) || 0;
    const hv = parseFloat(homeValue.replace(/,/g, '')) || 0;
    const baseRoi = projects[projectType].roiBase;
    const tierMult = tierMults[neighborhoodTier];
    const roi = Math.min(baseRoi * tierMult, 1.05);
    const valueAdded = cost * roi;
    const payback = roi > 0 ? Math.round(cost / (hv * 0.003)) : 99;
    const pencils = roi >= 0.7 && cost < hv * 0.15;
    const verdict = pencils
      ? `✅ This project pencils in DFW — solid ROI for ${neighborhoodTier}-tier neighborhoods.`
      : roi < 0.6
      ? `⚠️ Low ROI for DFW — consider a more impactful project or lower cost contractor.`
      : `🟡 Moderate return — good for lifestyle, marginal for pure investment.`;
    setResults({ valueAdded, roi: roi * 100, payback, pencils, verdict });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏗️📈</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW Improvement ROI Tool</h1>
          <p style={{ color: '#4B5563', fontSize: 15 }}>See what your renovation is really worth in the DFW market</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Project Type</label>
            <select value={projectType} onChange={e => setProjectType(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, background: '#fff', boxSizing: 'border-box' }}>
              {Object.entries(projects).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          {[
            { label: 'Project Cost ($)', value: projectCost, set: setProjectCost, placeholder: '45,000' },
            { label: 'Current Home Value ($)', value: homeValue, set: setHomeValue, placeholder: '450,000' },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
              <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>DFW Neighborhood Tier</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { key: 'entry', label: '🏠 Entry-Level' },
                { key: 'mid', label: '🏡 Mid-Market' },
                { key: 'upper', label: '🏘️ Upper-Mid' },
                { key: 'luxury', label: '🏰 Luxury' },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setNeighborhoodTier(key)}
                  style={{ padding: '10px', borderRadius: 8, border: `2px solid ${neighborhoodTier === key ? '#F5E642' : '#E5E7EB'}`, background: neighborhoodTier === key ? '#FEFCE8' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Calculate ROI 🔍
          </button>
        </div>

        {results && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ background: results.pencils ? '#F0FDF4' : '#FFFBEB', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontWeight: 600, fontSize: 14 }}>
              {results.verdict}
            </div>
            {[
              { label: '💰 Estimated Value Added', value: fmt(results.valueAdded) },
              { label: '📊 ROI Percentage', value: `${results.roi.toFixed(1)}%` },
              { label: '⏱️ Approx. Payback Period', value: `${results.payback} years` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontWeight: 500 }}>{label}</span>
                <span style={{ fontWeight: 700, fontSize: 18, background: '#F5E642', padding: '2px 10px', borderRadius: 4 }}>{value}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 16 }}>
              * ROI estimates based on DFW market data. Actual returns vary by sub-market, contractor quality, and timing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
