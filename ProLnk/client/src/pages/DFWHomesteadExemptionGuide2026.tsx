import { useState } from 'react';

const EXEMPTIONS = [
  { id: 'general', label: '🏡 General Homestead Exemption', reduction: 100000, note: 'New 2023 TX law — $100K off appraised value for all homeowners', alwaysAvailable: true },
  { id: 'over65', label: '👴 Over-65 / Senior Exemption', reduction: 10000, note: 'Additional $10K reduction + school tax freeze (no increases ever)', alwaysAvailable: false },
  { id: 'disability', label: '♿ Disability Exemption', reduction: 10000, note: '$10K off appraised value, same school tax ceiling as over-65', alwaysAvailable: false },
  { id: 'veteran', label: '🎖️ Disabled Veteran (10–30%)', reduction: 5000, note: '$5K–$12K depending on disability rating, up to 100% for total disability', alwaysAvailable: false },
  { id: 'survivor', label: '🕊️ Surviving Spouse of Veteran', reduction: 12000, note: 'Full exemption if killed in action or 100% disabled', alwaysAvailable: false },
];

const CHECKLIST = [
  'Driver\'s license or state ID showing homestead address',
  'Copy of most recent property tax statement',
  'Completed Application for Residential Homestead Exemption (Form 50-114)',
  'Vehicle registration at homestead address (if available)',
  'Social Security number for all applicants',
];

const COUNTIES: Record<string, { taxRate: number; portal: string }> = {
  Dallas: { taxRate: 2.18, portal: 'dcad.org' },
  Tarrant: { taxRate: 2.26, portal: 'tad.org' },
  Collin: { taxRate: 1.97, portal: 'collincad.org' },
  Denton: { taxRate: 2.12, portal: 'dentoncad.com' },
  Rockwall: { taxRate: 2.05, portal: 'rockwallcad.com' },
};

export default function DFWHomesteadExemptionGuide2026() {
  const [appraisedValue, setAppraisedValue] = useState(420000);
  const [county, setCounty] = useState('Dallas');
  const [selected, setSelected] = useState<string[]>(['general']);

  const toggle = (id: string) => {
    if (id === 'general') return;
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const { taxRate, portal } = COUNTIES[county];
  const totalReduction = EXEMPTIONS.filter(e => selected.includes(e.id)).reduce((sum, e) => sum + e.reduction, 0);
  const taxableValue = Math.max(0, appraisedValue - totalReduction);
  const beforeTax = appraisedValue * taxRate / 100;
  const afterTax = taxableValue * taxRate / 100;
  const annualSavings = beforeTax - afterTax;
  const monthlySavings = annualSavings / 12;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏠</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>DFW Homestead Exemption Guide 2026</h1>
        <p style={{ margin: '8px 0 0', color: '#CBD5E1', fontSize: 15 }}>
          Save thousands per year — $100K general exemption under new Texas law
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#0A1628' }}>📣 What Changed in 2023</h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
            Texas voters approved <strong>Proposition 4</strong> in November 2023, raising the homestead exemption from $40,000 to <strong>$100,000</strong> — the largest increase in Texas history. On a $420K DFW home, this saves the average homeowner over <strong>$1,500/year</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginTop: 16 }}>
            {[
              { label: 'General Exemption', value: '$100,000' },
              { label: 'Application Deadline', value: 'April 30' },
              { label: 'Filing Fee', value: 'Free' },
              { label: 'Retroactive', value: 'Same Year' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20 }}>🧮 Tax Savings Calculator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>County</label>
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 15, background: '#F8FAFC' }}>
                {Object.keys(COUNTIES).map(c => <option key={c} value={c}>{c} County ({COUNTIES[c].taxRate}%)</option>)}
              </select>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Appraised Home Value</span>
                <span style={{ fontWeight: 700 }}>${appraisedValue.toLocaleString()}</span>
              </div>
              <input type="range" min={100000} max={2000000} step={5000} value={appraisedValue}
                onChange={e => setAppraisedValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Select Exemptions You Qualify For</div>
              {EXEMPTIONS.map(ex => (
                <div key={ex.id} onClick={() => toggle(ex.id)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: ex.id === 'general' ? 'default' : 'pointer',
                    background: selected.includes(ex.id) ? '#F0F9FF' : '#F8FAFC',
                    border: `2px solid ${selected.includes(ex.id) ? '#0A1628' : '#E2E8F0'}` }}>
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: selected.includes(ex.id) ? '#0A1628' : '#fff', border: '2px solid #0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {selected.includes(ex.id) && <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{ex.label} <span style={{ color: '#16A34A', fontWeight: 700 }}>-${ex.reduction.toLocaleString()}</span></div>
                    <div style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>{ex.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '20px', marginTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Your Estimated Tax Savings</div>
            {[
              { label: 'Appraised Value', value: `$${appraisedValue.toLocaleString()}` },
              { label: 'Total Exemption Reduction', value: `-$${totalReduction.toLocaleString()}` },
              { label: 'Taxable Value After Exemptions', value: `$${taxableValue.toLocaleString()}` },
              { label: `Tax Before Exemptions (${taxRate}%)`, value: `$${beforeTax.toFixed(0)}/yr` },
              { label: 'Tax After Exemptions', value: `$${afterTax.toFixed(0)}/yr` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #E2E8F0', fontSize: 14 }}>
                <span style={{ color: '#475569' }}>{row.label}</span>
                <span style={{ fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>ANNUAL SAVINGS</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>${annualSavings.toFixed(0)}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>MONTHLY SAVINGS</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642' }}>${monthlySavings.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>✅ How to Apply — Checklist</h2>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14 }}>
            <strong>Apply at:</strong> {portal} — Deadline April 30 each year. Late applications accepted until the December 31 following the deadline.
          </div>
          {CHECKLIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 14, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, background: '#F0FDF4', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#15803D' }}>
            <strong>🔒 Over-65 School Tax Freeze:</strong> Once you qualify for the senior exemption, your school district taxes are frozen forever — they can never increase, even if your home value rises.
          </div>
        </div>
      </div>
    </div>
  );
}
