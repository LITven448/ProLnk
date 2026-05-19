import { useState } from 'react';

const loanTypes = [
  {
    name: 'Construction-to-Permanent',
    aka: 'One-Time Close',
    desc: 'Single closing covers both construction phase and permanent mortgage. Rate locks at closing.',
    pros: ['One set of closing costs', 'Rate certainty from day 1', 'Simpler process', 'Common with DFW builders'],
    cons: ['Slightly higher rate than stand-alone', 'Must qualify for full permanent loan upfront'],
  },
  {
    name: 'Stand-Alone Construction Loan',
    aka: 'Two-Time Close',
    desc: 'Separate short-term construction loan, then you refinance into a permanent mortgage when done.',
    pros: ['Can shop for best refi rate later', 'Flexible if scope changes', 'Works if builder is unknown'],
    cons: ['Two sets of closing costs', 'Rate risk on refi', 'More paperwork'],
  },
];

const drawSchedule = [
  { stage: 'Foundation', pct: 10, desc: 'Slab or foundation poured and inspected' },
  { stage: 'Framing', pct: 15, desc: 'Frame complete, roof sheathing on' },
  { stage: 'Mechanical Rough-In', pct: 15, desc: 'HVAC, plumbing, electrical rough-in' },
  { stage: 'Insulation & Drywall', pct: 20, desc: 'Insulation installed, drywall hung' },
  { stage: 'Interior Finish', pct: 25, desc: 'Cabinets, flooring, fixtures in' },
  { stage: 'Final Completion', pct: 15, desc: 'Certificate of occupancy issued' },
];

function calcResults(projCost: number, lotValue: number, downPct: number, rateAdder: number) {
  const totalProject = projCost + lotValue;
  const downAmt = totalProject * (downPct / 100);
  const loanAmt = totalProject - downAmt;
  const constRate = 0.075 + rateAdder / 100;
  const monthlyInterestOnly = (loanAmt * constRate) / 12;
  const permRate = constRate - 0.005;
  const permR = permRate / 12;
  const permMonths = 360;
  const permMonthly = (loanAmt * permR * Math.pow(1 + permR, permMonths)) / (Math.pow(1 + permR, permMonths) - 1);
  const ltv = (loanAmt / totalProject) * 100;
  return { totalProject, downAmt, loanAmt, constRate, monthlyInterestOnly, permRate, permMonthly, ltv };
}

export default function DFWConstructionLoanGuide() {
  const [projCost, setProjCost] = useState(400000);
  const [lotValue, setLotValue] = useState(80000);
  const [downPct, setDownPct] = useState(20);
  const [rateAdder, setRateAdder] = useState(1.5);
  const res = calcResults(projCost, lotValue, downPct, rateAdder);
  const eligible = downPct >= 20 && res.ltv <= 80;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>🏗️ Construction Loan Guide — DFW</div>
          <div style={{ color: '#CBD5E1', marginTop: 6 }}>Build Your Home in DFW — Financing from Dirt to Keys</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {loanTypes.map(lt => (
            <div key={lt.name} style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', border: '1px solid #E2E8F0′ }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{lt.name}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>aka {lt.aka}</div>
              <div style={{ fontSize: 13, color: '#374151', marginBottom: 10, lineHeight: 1.5 }}>{lt.desc}</div>
              {lt.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#16A34A', marginBottom: 2 }}>✓ {p}</div>)}
              <div style={{ marginTop: 6 }}>{lt.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#DC2626', marginBottom: 2 }}>✗ {c}</div>)}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>📋 Typical DFW Draw Schedule</div>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {drawSchedule.map((d, i) => (
              <div key={d.stage} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 4fr 60px', gap: '0.75rem', alignItems: 'center', background: i % 2 === 0 ? '#F8FAFC' : '#fff', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                <div style={{ fontWeight: 700, color: '#6366F1', fontSize: 13 }}>{i + 1}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{d.stage}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{d.desc}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#16A34A', textAlign: 'right' }}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🔢 Construction Loan Calculator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Build Cost ($)', value: projCost, set: setProjCost, min: 100000, max: 2000000, step: 10000 },
              { label: 'Lot Value ($)', value: lotValue, set: setLotValue, min: 0, max: 500000, step: 5000 },
              { label: 'Down Payment (%)', value: downPct, set: setDownPct, min: 10, max: 40, step: 1 },
              { label: 'Rate Over Prime (%)', value: rateAdder, set: setRateAdder, min: 0.5, max: 3, step: 0.25 },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.label}: <span style={{ color: '#6366F1′ }}>{typeof f.value === ’number' && f.step < 1 ? f.value.toFixed(2) : f.value.toLocaleString()}</span></div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={e => f.set(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.5rem', color: '#fff' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#F5E642′ }}>📊 Your Construction Loan Estimate</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: 12 }}>
            {[
              { label: 'Total Project Value', val: `$${res.totalProject.toLocaleString()}` },
              { label: 'Down Payment', val: `$${res.downAmt.toLocaleString()} (${downPct}%)` },
              { label: 'Loan Amount', val: `$${res.loanAmt.toLocaleString()}` },
              { label: 'Construction Rate', val: `${(res.constRate * 100).toFixed(2)}%` },
              { label: 'Interest-Only (Build Phase)', val: `$${res.monthlyInterestOnly.toFixed(0)}/mo` },
              { label: 'Permanent Payment (30yr)', val: `$${res.permMonthly.toFixed(0)}/mo` },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 15 }}>{item.val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: eligible ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)', borderRadius: 8, padding: '0.75rem' }}>
            <div style={{ fontWeight: 700, color: eligible ? '#4ADE80′ : '#F87171', marginBottom: 4 }}>
              {eligible ? '✅ Typical DFW lender requirements met (20%+ down, ≤80% LTV)' : '⚠️ Most DFW lenders require 20% down and LTV ≤ 80%'}
            </div>
            <div style={{ fontSize: 13, color: '#CBD5E1′ }}>LTV: {res.ltv.toFixed(1)}% · DFW requires licensed general contractor · Rates typically Prime + 1–2%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
