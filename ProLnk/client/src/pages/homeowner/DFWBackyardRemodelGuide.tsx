import { useState } from 'react';

const projects = [
  { id: 'patio', name: 'Covered Patio / Pergola', icon: '🌿', low: 8000, high: 25000, roi: 55, desc: 'Most popular DFW upgrade. Shade is critical — DFW summers exceed 100°F for weeks. Pergola with shade cloth or insulated cover dramatically extends outdoor usability.' },
  { id: 'kitchen', name: 'Outdoor Kitchen', icon: '🍖', low: 12000, high: 50000, roi: 65, desc: 'BBQ is Texas culture. Built-in grills, counter space, and mini-fridges add serious resale appeal. Budget $12K for basic; $50K+ for full kitchen buildout.' },
  { id: 'pool', name: 'Swimming Pool', icon: '🏊', low: 40000, high: 80000, roi: 60, desc: 'DFW\’s long summers make pools highly desirable. Gunite pools average $60K. Note: pools require ongoing maintenance ($2,000–4,000/yr) and may increase insurance.' },
  { id: 'putting', name: 'Putting Green', icon: '⛳', low: 5000, high: 20000, roi: 50, desc: 'Low maintenance, no water required. Popular in Plano, Frisco, and Southlake neighborhoods. Artificial turf holds up in DFW heat better than natural grass.' },
  { id: 'fire', name: 'Fire Pit / Fireplace', icon: '🔥', low: 2500, high: 12000, roi: 45, desc: 'Extends outdoor season into DFW\’s mild winters. Gas fire pits require permits in most DFW cities. Wood-burning may face restrictions in some HOAs.' },
  { id: 'turf', name: 'Artificial Turf / Landscaping', icon: '🌱', low: 3000, high: 15000, roi: 40, desc: 'Drought-tolerant landscaping is a DFW priority. Artificial turf saves $800–1,500/yr in water costs and survives Stage 4 water restrictions.' },
];

export default function DFWBackyardRemodelGuide() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(10);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedProjects = projects.filter(p => selected.has(p.id));
  const totalLow = selectedProjects.reduce((s, p) => s + p.low, 0);
  const totalHigh = selectedProjects.reduce((s, p) => s + p.high, 0);
  const midpoint = (totalLow + totalHigh) / 2;
  const downPayment = midpoint * (downPct / 100);
  const financed = midpoint - downPayment;
  const rate = 0.089 / 12;
  const n = years * 12;
  const monthly = financed > 0 ? (financed * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1) : 0;
  const avgRoi = selectedProjects.length > 0 ? Math.round(selectedProjects.reduce((s, p) => s + p.roi, 0) / selectedProjects.length) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>🏠 DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>DFW Backyard Remodel Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, margin: 0, maxWidth: 620 }}>
            Popular upgrades, DFW climate considerations, HOA approvals, ROI by project, and a budget planner.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ background: '#0f1e35', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>☀️ DFW Climate = Shade First</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Dallas exceeds 100°F for 20–40 days per year. Any backyard investment without shade infrastructure will go unused from June through September. Prioritize covered structures before any other upgrade — pools without shade are unusable at peak times, and outdoor kitchens need cover for year-round usability.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 40 }}>
          {projects.map(p => (
            <div
              key={p.id}
              onClick={() => toggle(p.id)}
              style={{
                background: selected.has(p.id) ? '#1a2a45' : '#0f1e35',
                border: `2px solid ${selected.has(p.id) ? '#F5E642' : '#1E2D45'}`,
                borderRadius: 12, padding: 22, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 26, marginRight: 8 }}>{p.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</span>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 4, flexShrink: 0,
                  background: selected.has(p.id) ? '#F5E642' : 'transparent',
                  border: `2px solid ${selected.has(p.id) ? '#F5E642' : '#475569'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0A1628', fontWeight: 800, fontSize: 13,
                }}>
                  {selected.has(p.id) ? '✓' : ''}
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>${p.low.toLocaleString()}–${p.high.toLocaleString()}</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>Installed Cost</div>
                </div>
                <div>
                  <div style={{ color: '#22c55e', fontWeight: 700 }}>{p.roi}% ROI</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>Avg at Resale</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProjects.length > 0 && (
          <div style={{ background: '#0f1e35', border: '2px solid #F5E642', borderRadius: 14, padding: 32, marginBottom: 40 }}>
            <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>💰 Budget Planner</h2>
            <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Based on your {selectedProjects.length} selected project{selectedProjects.length !== 1 ? 's' : ''}. Adjust financing terms below.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Down Payment %</label>
                <input
                  type="range" min={0} max={100} value={downPct} onChange={e => setDownPct(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642' }}
                />
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{downPct}% (${downPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })})</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Loan Term</label>
                <input
                  type="range" min={5} max={20} step={5} value={years} onChange={e => setYears(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642' }}
                />
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{years} years</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
              {[
                { label: 'Total Low', value: `$${totalLow.toLocaleString()}` },
                { label: 'Total High', value: `$${totalHigh.toLocaleString()}` },
                { label: 'Financed Amount', value: `$${financed.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                { label: 'Est. Monthly', value: `$${monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                { label: 'Avg ROI', value: `${avgRoi}%` },
              ].map(s => (
                <div key={s.label} style={{ background: '#0A1628', borderRadius: 10, padding: '16px 18px', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#475569', fontSize: 12, marginTop: 14 }}>Monthly estimate based on 8.9% APR HELOC rate. Actual rates vary.</div>
          </div>
        )}

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px' }}>📋 HOA & Permit Notes</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Most DFW HOAs require pre-approval for any structure, fence, or hardscape change</li>
            <li>Pools require city permits, zoning setback compliance, and fence enclosure (Texas law)</li>
            <li>Pergolas and covered patios typically require a building permit if attached to the home</li>
            <li>Gas fire pits require gas line permits; wood-burning restrictions vary by city</li>
            <li>Artificial turf may require HOA approval in communities with natural grass mandates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
