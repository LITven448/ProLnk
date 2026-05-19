import { useState } from 'react';

const COUNTY_RATES: Record<string, number> = {
  Dallas: 2.18,
  Tarrant: 2.26,
  Collin: 1.97,
  Denton: 2.12,
  Rockwall: 2.05,
};

const EVIDENCE_ITEMS = [
  '📸 Photos of damage, deferred maintenance, or condition issues',
  '🏠 Recent appraisals or inspection reports',
  '📄 Comparable sales (comps) within 0.5 mile, same year range',
  '💸 Repair estimates from licensed contractors',
  '📊 Neighborhood sales data showing lower values',
  '🗺️ Maps showing proximity to nuisances (highways, utilities)',
];

const STEPS = [
  { n: 1, title: 'Receive Appraisal Notice', desc: 'CAD mails notices by April 1. Protest deadline is May 15 or 30 days from notice date, whichever is later.' },
  { n: 2, title: 'File Your Protest', desc: 'File online at your county\’s CAD portal (e.g., DCAD.org, TCAD.org). Free, takes 5 minutes.' },
  { n: 3, title: 'Informal Hearing', desc: 'Meet with an appraiser to negotiate. ~60% of cases settle here. Bring your evidence.' },
  { n: 4, title: 'ARB Formal Hearing', desc: 'If informal fails, present to Appraisal Review Board. Three-member panel, 15-20 minutes.' },
  { n: 5, title: 'Receive Decision', desc: 'ARB issues written decision. You can still appeal to district court or SOAH if unsatisfied.' },
];

export default function DFWPropertyTaxAppealGuide() {
  const [appraisedValue, setAppraisedValue] = useState(420000);
  const [comp1, setComp1] = useState(395000);
  const [comp2, setComp2] = useState(380000);
  const [comp3, setComp3] = useState(405000);
  const [county, setCounty] = useState('Dallas');

  const avgComp = (comp1 + comp2 + comp3) / 3;
  const estimatedReduction = Math.max(0, appraisedValue - avgComp);
  const reductionPct = appraisedValue > 0 ? (estimatedReduction / appraisedValue) * 100 : 0;
  const taxRate = COUNTY_RATES[county] / 100;
  const annualSavings = estimatedReduction * taxRate;
  const worthFiling = estimatedReduction > 5000;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚖️</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>DFW Property Tax Appeal Guide 2026</h1>
        <p style={{ margin: '8px 0 0', color: '#CBD5E1', fontSize: 15 }}>
          40% of DFW protests result in a reduction — here's how to win yours
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#0A1628' }}>⏰ Key Deadlines & Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
            {[
              { label: 'Protest Deadline', value: 'May 15, 2026' },
              { label: 'Success Rate', value: '~40%' },
              { label: 'DFW Avg Tax Rate', value: '2.1–2.3%' },
              { label: 'Filing Fee', value: 'Free' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0A1628' }}>
            <strong>Why DFW taxes are high:</strong> Texas has no state income tax — property taxes fund schools, roads, and local government. DFW effective rates of 2.1–2.3% are among the highest in the US.
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20 }}>🧮 Should You File? Savings Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>County</label>
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 15, background: '#F8FAFC' }}>
                {Object.keys(COUNTY_RATES).map(c => <option key={c} value={c}>{c} County ({COUNTY_RATES[c]}%)</option>)}
              </select>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Your Appraised Value</span>
                <span style={{ fontWeight: 700 }}>${appraisedValue.toLocaleString()}</span>
              </div>
              <input type="range" min={100000} max={2000000} step={5000} value={appraisedValue}
                onChange={e => setAppraisedValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Enter 3 Comparable Home Sales (comps)</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { label: 'Comp 1', value: comp1, set: setComp1 },
                  { label: 'Comp 2', value: comp2, set: setComp2 },
                  { label: 'Comp 3', value: comp3, set: setComp3 },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <label style={{ width: 60, fontWeight: 600, fontSize: 14 }}>{c.label}</label>
                    <input type="number" value={c.value} onChange={e => c.set(Number(e.target.value))}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 15 }} />
                    <span style={{ color: '#64748B', fontSize: 13, width: 80 }}>${c.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: worthFiling ? '#F0FDF4' : '#FFF7ED', borderRadius: 10, padding: '20px', marginTop: 20, border: `2px solid ${worthFiling ? '#22C55E' : '#F97316'}` }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>
              {worthFiling ? '✅ Worth Filing — Here\’s Your Case' : '⚠️ Borderline — Review the Numbers'}
            </div>
            {[
              { label: 'Average of Your Comps', value: `$${avgComp.toLocaleString()}` },
              { label: 'Potential Value Reduction', value: `$${estimatedReduction.toLocaleString()} (${reductionPct.toFixed(1)}%)` },
              { label: `Estimated Annual Tax Savings (${COUNTY_RATES[county]}%)`, value: `$${annualSavings.toFixed(0)}/yr = $${(annualSavings / 12).toFixed(0)}/mo` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #E2E8F0', fontSize: 14 }}>
                <span style={{ color: '#475569' }}>{row.label}</span>
                <span style={{ fontWeight: 700 }}>{row.value}</span>
              </div>
            ))}
            {!worthFiling && <p style={{ margin: '12px 0 0', fontSize: 13, color: '#92400E' }}>Your comps are close to appraised value. Consider gathering more evidence or checking if comps are truly comparable.</p>}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>📁 Evidence to Gather</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {EVIDENCE_ITEMS.map(item => (
              <div key={item} style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 14px', borderLeft: '4px solid #F5E642', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>📋 The Protest Process (Step by Step)</h2>
          {STEPS.map(step => (
            <div key={step.n} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{step.title}</div>
                <div style={{ color: '#475569', fontSize: 14, marginTop: 2 }}>{step.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '12px 16px', marginTop: 8, fontSize: 14 }}>
            <strong>Pro tip:</strong> File even if you're unsure. You can always withdraw. The protest costs nothing, and you can't get a reduction without filing.
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 24 }}>
          Data for informational purposes only. Verify deadlines with your county appraisal district.
        </p>
      </div>
    </div>
  );
}
