import { useState } from 'react';

const INFO_SECTIONS = [
  { id: 'docs', label: '📄 Documents to Gather', content: 'Collect: Form 1098 (mortgage interest), property tax payment receipts, receipts for home improvements over $500, home office square footage records, HOA statements, and any casualty loss documentation from storms or hail damage.' },
  { id: 'protest', label: '⚖️ Property Tax Protest', content: 'DFW appraisal districts (DCAD, TCAD, Tarrant CAD) send notices in April. You have until May 15 — or 30 days after notice — to protest. Gather comparable sales data from Zillow/Redfin for homes sold within 1 mile in the last 6 months.' },
  { id: 'homeoffice', label: '🖥️ Home Office Deduction', content: 'Exclusively used space qualifies: divide office sq ft by total home sq ft. A 150 sq ft office in a 2,000 sq ft home = 7.5% deduction on mortgage interest, utilities, insurance, and repairs.' },
  { id: 'improvements', label: '🔨 Improvement Records', content: 'Track all capital improvements — they increase your cost basis and reduce taxable gain when you sell. Keep receipts for roofs, HVAC systems, additions, kitchen remodels, and landscaping projects over $500.' },
  { id: 'credits', label: '✅ 25C Energy Credits', content: 'Federal 25C credit: 30% of cost for qualifying heat pumps, insulation, and ENERGY STAR windows (up to $3,200/year). DFW\’s hot summers make heat pump upgrades especially valuable for both comfort and tax savings.' },
];

type Situation = 'protest' | 'homeoffice' | 'sold' | 'improvements' | '';

const CHECKLISTS: Record<string, { title: string; items: string[]; savings: string }> = {
  protest: {
    title: '⚖️ Property Tax Protest Checklist',
    items: [
      'Download your appraisal notice from DCAD.org, TCAD.org, or TarrantCAD.org',
      'Pull 5-10 comparable sales within 1 mile, last 6 months, similar sq footage',
      'Document any condition issues: foundation cracks, roof age, HVAC condition',
      'File informal protest first — most are resolved without a formal hearing',
      'Submit before May 15 (or 30 days from notice date, whichever is later)',
    ],
    savings: 'Typical DFW protest savings: $800-$3,500/year',
  },
  homeoffice: {
    title: '🖥️ Home Office Document Checklist',
    items: [
      'Measure exclusive office space in square feet',
      'Collect total home square footage from appraisal records',
      'Gather 12 months of utility bills (electric, gas, internet)',
      'Compile mortgage interest from Form 1098',
      'List any office-specific repairs or improvements with receipts',
    ],
    savings: 'Typical deduction value: $1,200-$4,000/year for DFW homeowners',
  },
  sold: {
    title: '🏠 Home Sale Document Checklist',
    items: [
      'Original purchase price and closing statement (HUD-1 or ALTA)',
      'All capital improvement receipts since purchase',
      'Form 1099-S from closing (provided by title company)',
      'Dates of ownership — primary residence 2-of-5 year exclusion applies',
      'Up to $250K gain excluded ($500K married) — improvements increase basis',
    ],
    savings: 'Proper basis tracking can save DFW sellers $10,000-$50,000+ in capital gains tax',
  },
  improvements: {
    title: '🔨 Home Improvement Tax Records',
    items: [
      'Sort receipts by category: structural, HVAC, electrical, plumbing, cosmetic',
      'Photograph completed work with contractor invoices attached',
      'Note completion dates — 25C credits require the tax year of installation',
      'Check ENERGY STAR certification for appliances and HVAC equipment',
      'Store digital copies in Home Health Vault for permanent access',
    ],
    savings: '25C Energy Credit: up to $3,200/year in direct tax credits',
  },
};

export default function DFWTaxSeasonHomeGuide() {
  const [active, setActive] = useState<string | null>(null);
  const [situation, setSituation] = useState<Situation>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Tax Season Home Guide
          </h1>
          <p style={{ color: '#8A9BB5', fontSize: 15, margin: 0 }}>
            Property tax protests, deductions, and document checklists for DFW homeowners
          </p>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 10, padding: '14px 18px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>⏰</span>
          <span style={{ fontSize: 14, color: '#F5E642', fontWeight: 600 }}>Key DFW Deadline: Property tax protest window closes May 15</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {INFO_SECTIONS.map(s => (
            <div key={s.id}>
              <button
                onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ width: '100%', textAlign: 'left', background: active === s.id ? '#1E3A5F' : '#0F2340', border: '1px solid', borderColor: active === s.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '14px 18px', color: '#E8EDF5', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
              >
                {s.label}
              </button>
              {active === s.id && (
                <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px', fontSize: 14, color: '#B8C8DC', lineHeight: 1.6 }}>
                  {s.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>
            🎯 Your Tax Situation
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {([
              { key: 'protest', label: '⚖️ Protest Appraisal' },
              { key: 'homeoffice', label: '🖥️ Home Office' },
              { key: 'sold', label: '🏠 Sold a Home' },
              { key: 'improvements', label: '🔨 Made Improvements' },
            ] as const).map(opt => (
              <button
                key={opt.key}
                onClick={() => setSituation(opt.key)}
                style={{ padding: '12px 8px', background: situation === opt.key ? '#F5E642' : '#1E3A5F', color: situation === opt.key ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {situation && (
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 18 }}>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>
                {CHECKLISTS[situation].title}
              </h3>
              <ul style={{ margin: '0 0 14px', padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CHECKLISTS[situation].items.map((item, i) => (
                  <li key={i} style={{ color: '#B8C8DC', fontSize: 14, lineHeight: 1.6 }}>{item}</li>
                ))}
              </ul>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#F5E642', fontWeight: 600 }}>
                💡 {CHECKLISTS[situation].savings}
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#3A5070', fontSize: 12, marginTop: 32 }}>
          ProLnk — DFW Home Intelligence
        </p>
      </div>
    </div>
  );
}
