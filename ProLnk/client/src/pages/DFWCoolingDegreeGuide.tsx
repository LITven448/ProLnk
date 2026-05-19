import { useState } from 'react';

const dfwData = {
  cdds: { low: 2800, high: 3200 },
  nationalAvg: 1400,
  kwhPerCdd: { small: 0.8, medium: 1.4, large: 2.1 },
  ratePerKwh: 0.13,
};

export default function DFWCoolingDegreeGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [cdds, setCdds] = useState(3000);

  const kwh = dfwData.kwhPerCdd[homeSize as keyof typeof dfwData.kwhPerCdd] * cdds;
  const annualCost = (kwh * dfwData.ratePerKwh).toFixed(0);
  const nationalKwh = dfwData.kwhPerCdd[homeSize as keyof typeof dfwData.kwhPerCdd] * dfwData.nationalAvg;
  const nationalCost = (nationalKwh * dfwData.ratePerKwh).toFixed(0);
  const overage = (((kwh - nationalKwh) / nationalKwh) * 100).toFixed(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Cooling Degree Days in DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW averages 2,800–3,200 cooling degree days (CDDs) per year — more than double the national average of ~1,400. This single metric explains why Dallas homeowners spend so much more on cooling and why equipment selection matters enormously.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚡ What Is a Cooling Degree Day?</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            A CDD measures how much and for how long outdoor temperatures exceed 65°F. One CDD = one day where the average temp is 66°F. When DFW hits 95°F for a week, that's 30 CDDs — meaning your AC works nearly 3× harder than a home in Portland experiencing the same week.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Equipment sizing in DFW must account for peak load days (July–August) where indoor temps can rise 3–4°F per hour without adequate capacity. Undersized systems run continuously and still fail to maintain setpoint.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Estimate Your Annual Cooling Cost</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8′ }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15, width: '100%' }}>
                <option value="small">Small (&lt;1,500 sq ft)</option>
                <option value="medium">Medium (1,500–3,000 sq ft)</option>
                <option value="large">Large (3,000+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8′ }}>DFW CDDs This Year: <strong style={{ color: '#F5E642' }}>{cdds}</strong></label>
              <input type="range" min={2600} max={3400} step={50} value={cdds} onChange={e => setCdds(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748B', marginTop: 4 }}>
                <span>Cool year (2,600)</span><span>Hot year (3,400)</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16, textAlign: 'center', border: '1px solid #F5E642′ }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${annualCost}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Your DFW Annual Cooling Cost</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16, textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#64748B' }}>${nationalCost}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>National Average Home</div>
            </div>
          </div>
          <div style={{ marginTop: 12, textAlign: 'center', background: '#1E3A5F', borderRadius: 10, padding: 12 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>You spend ~{overage}% more on cooling than the national average.</span>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔧 Equipment Sizing Implications</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>DFW homes typically need 1 ton per 400–500 sq ft (vs 600 nationally)</li>
            <li>SEER2 ratings of 16+ are cost-effective given DFW run hours</li>
            <li>Two-stage or variable-speed compressors pay back in 3–5 years here</li>
            <li>Attic insulation upgrades (R-38 minimum) reduce CDD impact by 15–20%</li>
            <li>Manual J load calculations are mandatory — rule-of-thumb sizing fails in DFW</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 14, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>Get a DFW-Optimized HVAC Assessment</div>
          <div style={{ fontSize: 14, color: '#1E3A5F' }}>Local pros who know DFW load profiles can right-size your equipment and cut cooling costs by 20–35%.</div>
        </div>
      </div>
    </div>
  );
}
