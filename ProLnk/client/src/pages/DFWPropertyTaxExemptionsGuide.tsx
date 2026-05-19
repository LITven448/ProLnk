import { useState } from 'react';

const SITUATIONS = [
  { situation: 'I live in my home as my primary residence', exemptions: ['General Residence Homestead — $100,000 off school district taxable value (as of 2023 law)', 'Local option exemptions vary by county/city (up to 20% additional)', 'School district tax freeze once homestead established'], savings: '$1,200–$2,500/year depending on school district tax rate', process: 'File Form 50-114 with your county appraisal district. Deadline: April 30 of the tax year (or within 2 years if you miss it). Must own and occupy by January 1 of the year.', counties: ['Dallas CAD: dallascad.org', 'Tarrant CAD: tad.org', 'Collin CAD: collincad.org', 'Denton CAD: dentoncad.com'] },
  { situation: 'I am 65 or older', exemptions: ['All homestead exemptions above PLUS', 'Over-65 exemption: additional $10,000 off school district value', 'School district tax freeze — taxes cannot increase year over year', 'Most DFW counties offer additional local over-65 exemptions ($3K–$12K)'], savings: '$500–$1,500/year additional on top of homestead savings', process: 'File Form 50-114 checking the over-65 box. You can defer property taxes until the home is sold (with 5% annual interest). Can transfer tax ceiling if you move to another Texas home.', counties: ['File at same CAD as homestead — no separate office'] },
  { situation: 'I have a disability', exemptions: ['Disability exemption replaces (or stacks with) over-65 exemption', 'Same $10,000 school district reduction as over-65', 'Must qualify under Social Security disability standards or be blind', 'Local taxing unit exemptions may apply'], savings: '$500–$1,500/year additional savings', process: 'File Form 50-114 with disability documentation (Social Security award letter or physician statement). Cannot claim both over-65 AND disability — choose whichever benefits more.', counties: ['Each CAD processes — bring disability documentation'] },
  { situation: 'I am a veteran with a disability rating', exemptions: ['10–29% disability: $5,000 off property value', '30–49% disability: $7,500 off property value', '50–69% disability: $10,000 off property value', '70–99% disability: $12,000 off property value', '100% disabled or unemployable: FULL EXEMPTION — no property taxes'], savings: '10–29%: ~$150/yr | 70–99%: ~$360/yr | 100%: $5,000–$15,000+/yr', process: 'File Form 50-135 with your VA disability rating letter. 100% disabled veterans pay ZERO property taxes in Texas — this is one of the strongest veteran benefits in the country. Surviving spouses also qualify.', counties: ['Each DFW county CAD — bring VA award letter with rating percentage'] },
  { situation: 'I own land used for agriculture or wildlife', exemptions: ['Agricultural use (1-d-1) exemption: taxed on productivity value, not market value', 'Wildlife management exemption: convert ag land to wildlife use', 'Timber production exemption available in some areas', 'Note: removing this designation triggers rollback taxes (up to 5 prior years)'], savings: 'Can reduce taxable value by 70–95% on qualifying land — savings vary widely by acreage', process: 'File Form 50-129 (ag) or Form 50-129 (wildlife). Must prove active agricultural use. DFW fringe counties (Denton, Parker, Kaufman) have significant ag-exempt properties.', counties: ['County CAD — ag exemptions require annual validation for some uses'] },
];

export default function DFWPropertyTaxExemptionsGuide() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏷️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Property Tax Exemptions Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Complete Texas exemption guide — homestead, over-65, veteran, disability, and agricultural exemptions</p>
        </div>

        <div style={{ background: '#FFF9E6', borderRadius: 10, padding: '1rem', marginBottom: 20, border: '1px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 4 }}>⏰ Key Deadline: April 30</div>
          <div style={{ color: '#78350F', fontSize: 14 }}>Most exemption applications must be filed by April 30 for the current tax year. You must own and occupy the property as of January 1. Late applications accepted up to 2 years back in most cases.</div>
        </div>

        <p style={{ color: '#64748B', marginBottom: 16 }}>Select your situation to see applicable exemptions, estimated savings, and how to apply:</p>
        <div style={{ display: 'grid', gap: 12 }}>
          {SITUATIONS.map((s, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', cursor: 'pointer',
                border: selected === i ? '2px solid #F5E642′ : '2px solid transparent', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 600, color: '#0A1628', fontSize: 16 }}>{s.situation}</div>
              {selected === i && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '0.8rem', marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#166534', fontSize: 12, marginBottom: 6 }}>✅ EXEMPTIONS YOU QUALIFY FOR</div>
                    {s.exemptions.map((e, j) => <div key={j} style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>• {e}</div>)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div style={{ background: '#FFF9E6', borderRadius: 8, padding: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: '#92400E', fontSize: 12, marginBottom: 4 }}>💰 ESTIMATED ANNUAL SAVINGS</div>
                      <div style={{ color: '#78350F', fontSize: 13, fontWeight: 600 }}>{s.savings}</div>
                    </div>
                    <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: '#334155', fontSize: 12, marginBottom: 4 }}>🏛️ WHERE TO FILE</div>
                      {s.counties.map((c, j) => <div key={j} style={{ fontSize: 12, color: '#475569', marginBottom: 2 }}>{c}</div>)}
                    </div>
                  </div>
                  <div style={{ background: '#EFF6FF', borderRadius: 8, padding: '0.8rem' }}>
                    <div style={{ fontWeight: 700, color: '#1E40AF', fontSize: 12, marginBottom: 4 }}>📋 HOW TO APPLY</div>
                    <div style={{ fontSize: 13, color: '#1E3A8A', lineHeight: 1.6 }}>{s.process}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginTop: 24, textAlign: 'center' }}>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>🏷️ Exemption forms and instructions available free at each county's Central Appraisal District website. No application fee required.</div>
        </div>
      </div>
    </div>
  );
}
