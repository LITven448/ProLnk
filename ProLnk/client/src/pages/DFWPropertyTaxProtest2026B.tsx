import { useState } from 'react';

export default function DFWPropertyTaxProtest2026B() {
  const [county, setCounty] = useState('dallas');
  const [homeValue, setHomeValue] = useState(480000);
  const [appraisedValue, setAppraisedValue] = useState(520000);

  const overAppraisal = Math.max(0, appraisedValue - homeValue);
  const taxRate: Record<string, number> = { dallas: 0.0215, tarrant: 0.0198, collin: 0.0172, denton: 0.0185, rockwall: 0.0190 };
  const successRate: Record<string, string> = { dallas: '68%', tarrant: '71%', collin: '74%', denton: '69%', rockwall: '72%' };
  const rate = taxRate[county] ?? 0.02;
  const annualSavings = Math.round(overAppraisal * rate);
  const contingencyFee = Math.round(annualSavings * 0.35);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK FINANCIAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚖️ DFW Property Tax Protest Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Advanced strategies: unequal appraisal, ARB hearings, and contingency services</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📋', label: 'Comparable Sales', strength: 'Strong', detail: 'Find 3–5 similar homes that sold below your appraisal' },
            { icon: '⚖️', label: 'Unequal Appraisal', strength: 'Strongest in TX', detail: 'Show neighbors are appraised lower per sq ft' },
            { icon: '🏛️', label: 'ARB Hearing', strength: 'Formal process', detail: 'Appraisal Review Board — free, in person or virtual' },
            { icon: '🤝', label: 'Protest Services', strength: 'No upfront cost', detail: '30–40% contingency fee on first-year savings only' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'rgba(245,230,66,0.07)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: '20px 18px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.strength}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Your Protest Strategy Calculator</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>County</span>
              <select value={county} onChange={e => setCounty(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="dallas">Dallas County</option>
                <option value="tarrant">Tarrant County</option>
                <option value="collin">Collin County</option>
                <option value="denton">Denton County</option>
                <option value="rockwall">Rockwall County</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>Your Estimated Market Value: <strong style={{ color: '#fff' }}>${homeValue.toLocaleString()}</strong></span>
              <input type="range" min={100000} max={2000000} step={10000} value={homeValue} onChange={e => setHomeValue(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>DCAD/CAD Appraised Value: <strong style={{ color: '#fff' }}>${appraisedValue.toLocaleString()}</strong></span>
              <input type="range" min={100000} max={2000000} step={10000} value={appraisedValue} onChange={e => setAppraisedValue(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
            </label>
          </div>

          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Over-Appraisal', val: '$' + overAppraisal.toLocaleString() },
              { label: 'Annual Tax Savings', val: '$' + annualSavings.toLocaleString() },
              { label: 'Success Rate', val: successRate[county] ?? '70%' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>{item.val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5E642', borderRadius: 12, padding: '18px 24px', textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
              {annualSavings > 500 ? '✅ WORTH HIRING A PROTEST SERVICE' : '📝 DIY PROTEST RECOMMENDED'}
            </div>
            <div style={{ color: '#0A1628', fontSize: 13 }}>
              {annualSavings > 500
                ? `Service fee ~$${contingencyFee} (35% of $${annualSavings} savings) — still net positive`
                : 'Savings too small for contingency service — file yourself at DCAD.org'}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📅 Key Protest Deadlines</div>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 2 }}>
            <li>Appraisal notices mailed: April (most DFW counties)</li>
            <li>Protest deadline: May 15 or 30 days after notice (whichever is later)</li>
            <li>ARB hearings: May–July depending on county volume</li>
            <li>File online at your county CAD website — free and takes 10 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}