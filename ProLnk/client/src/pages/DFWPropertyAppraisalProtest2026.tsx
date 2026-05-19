import { useState } from 'react';

export default function DFWPropertyAppraisalProtest2026() {
  const [county, setCounty] = useState('Dallas');
  const [step, setStep] = useState(0);

  const countyData: Record<string, { deadline: string; website: string; phone: string; successRate: string }> = {
    Dallas: { deadline: 'May 15, 2026', website: 'dallascad.org', phone: '214-631-0910', successRate: '68%' },
    Tarrant: { deadline: 'May 15, 2026', website: 'tad.org', phone: '817-284-0024', successRate: '64%' },
    Collin: { deadline: 'May 15, 2026', website: 'collincad.org', phone: '469-742-9200', successRate: '71%' },
    Denton: { deadline: 'May 15, 2026', website: 'dentoncad.com', phone: '940-349-3800', successRate: '66%' },
  };

  const steps = [
    { icon: '📬', title: 'Receive Notice', desc: 'Get your appraisal notice (mailed April–May). Check if value increased significantly or exceeds market value.' },
    { icon: '🔍', title: 'Research Comps', desc: 'Find 5–10 comparable sales (same size, age, condition) within 1 mile that sold in the past 12 months below your appraisal.' },
    { icon: '📝', title: 'File Protest', desc: 'File online at your county CAD website, mail in the Notice of Protest form, or deliver in person. Deadline: May 15 or 30 days after notice.' },
    { icon: '🤝', title: 'Informal Hearing', desc: 'Meet with an appraiser (in-person or online) to present your comps. 65%+ of protests settled here. Bring photos of defects.' },
    { icon: '⚖️', title: 'ARB Hearing (if needed)', desc: 'Appraisal Review Board hears your case. Present unequal appraisal argument — strongest tool in Texas. Request comparable data from CAD first.' },
    { icon: '✅', title: 'Get Result', desc: 'Decision mailed within 10 days. If dissatisfied, options include binding arbitration ($500 fee, refunded if you win) or district court.' },
  ];

  const data = countyData[county];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚖️🏠</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: '0.5rem 0' }}>DFW Property Appraisal Protest 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>65% of DFW protests succeed when filed with evidence. Deadline is May 15 — do not miss it.</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📍 County Info</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['Dallas','Tarrant','Collin','Denton'].map(c => (
              <button key={c} onClick={() => setCounty(c)} style={{ background: county === c ? '#F5E642' : '#0A1628', color: county === c ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.4rem 1rem', cursor: 'pointer', fontWeight: county === c ? 700 : 400 }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem' }}>
            {[['📅 Protest Deadline', data.deadline],['🌐 Website', data.website],['📞 Phone', data.phone],['✅ DFW Success Rate', data.successRate + ' when protested']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>💡 Strongest Arguments in Texas</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['🥇 Unequal Appraisal','Your property taxed at higher % than similar properties — legally required to be equal. Request CAD equity study.'],['🥈 Market Value','Comparable sales prove your home worth less than appraised value. Bring closed MLS sales within 12 months.'],['🥉 Property Condition','Structural issues, deferred maintenance, foundation problems. Photos + contractor estimates.']].map(([rank, desc]) => (
              <div key={rank} style={{ display: 'flex', gap: '0.75rem', background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{rank.split(' ')[0]}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{rank.split(' ').slice(1).join(' ')}</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🗺️ Step-by-Step Protest Guide</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setStep(i)} style={{ background: step === i ? '#F5E642' : '#0A1628', color: step === i ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: step === i ? 700 : 400 }}>Step {i + 1}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '1.25rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{steps[step].icon}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Step {step + 1}: {steps[step].title}</div>
            <div style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{steps[step].desc}</div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              {step > 0 && <button onClick={() => setStep(step - 1)} style={{ background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer' }}>← Back</button>}
              {step < steps.length - 1 && <button onClick={() => setStep(step + 1)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 700, cursor: 'pointer' }}>Next Step →</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}