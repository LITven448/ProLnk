import { useState } from 'react';

const HOME_AGES = ['Pre-1980', '1980–2000', '2000–2015', 'Post-2015'];
const AREAS = ['Attic', 'Walls (Existing)', 'Rim Joists / Crawl Space', 'Garage Ceiling'];
const CURRENT_INSULATION = ['None / Unknown', 'Minimal (R-11 or less)', 'Moderate (R-19 to R-30)', 'Adequate (R-38+)'];

type RecKey = string;
const RECS: Record<RecKey, { material: string; rValue: string; cost: string; rebate: string; note: string }> = {
  'Pre-1980|Attic|None / Unknown': { material: 'Blown-In Fiberglass or Cellulose', rValue: 'Add to R-49', cost: '$1,800–3,500', rebate: 'Oncor: up to $400', note: 'Pre-1980 DFW attics often have zero insulation — blown-in is fastest, least invasive' },
  'Pre-1980|Walls (Existing)|Minimal (R-11 or less)': { material: 'Dense-Pack Cellulose (blown into wall cavities)', rValue: 'R-13 added', cost: '$2,500–5,000', rebate: 'Oncor: up to $200', note: 'Requires drilling small holes in exterior or interior — worth it in DFW summer utility bills' },
  '1980–2000|Attic|Minimal (R-11 or less)': { material: 'Blown-In Fiberglass', rValue: 'Top up to R-49', cost: '$1,200–2,500', rebate: 'Oncor: up to $400', note: 'Common situation in DFW — quick ROI with Oncor rebate offset' },
  '1980–2000|Rim Joists / Crawl Space|None / Unknown': { material: 'Spray Foam (closed-cell 2")', rValue: 'R-12 on rim joists', cost: '$800–1,800', rebate: 'Oncor: up to $100', note: 'Air sealing rim joists stops conditioned air loss — highest bang-per-dollar in DFW slab homes' },
  '2000–2015|Attic|Moderate (R-19 to R-30)': { material: 'Blown-In Fiberglass Top-Up', rValue: 'Add R-19 to reach R-49', cost: '$900–1,800', rebate: 'Oncor: up to $300', note: 'Many 2000s DFW builds are under-insulated vs modern standards — easy to top up' },
  'Post-2015|Attic|Adequate (R-38+)': { material: 'Air Sealing + Radiant Barrier', rValue: 'N/A — thermal upgrade', cost: '$600–1,200', rebate: 'Oncor: up to $150', note: 'Modern DFW homes often just need attic air sealing and radiant barrier to cut AC load' },
};

const DEFAULT_REC = { material: 'Blown-In Fiberglass (Attic)', rValue: 'Target R-49', cost: '$1,500–3,000', rebate: 'Oncor: up to $400', note: 'Attic insulation delivers the highest ROI in DFW — start here before any other upgrade' };

export default function DFWInsulationContractorGuide() {
  const [age, setAge] = useState('');
  const [area, setArea] = useState('');
  const [current, setCurrent] = useState('');

  const key = [age, area, current].join('|');
  const rec = RECS[key] || (age && area && current ? DEFAULT_REC : null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏠 DFW Insulation Contractor Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: '2rem', lineHeight: 1.7 }}>
          In DFW, your attic is where you win or lose the energy battle. With 100°F+ summers and radiant heat baking your roof deck, most DFW homes are significantly under-insulated by modern standards — and Oncor offers real rebates to fix it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{ label: '🌬️ Blown-In Attic', desc: 'Fastest to install, no demo required — best for DFW attic top-ups' },
            { label: '🧴 Spray Foam', desc: 'Closed-cell for rim joists + air sealing — stops infiltration cold' },
            { label: '🧱 Batt Insulation', desc: 'New construction walls — unfaced fiberglass or mineral wool' },
            { label: '☀️ Radiant Barrier', desc: 'DFW-specific — foil lining in attic reflects radiant heat before it enters' },
          ].map(c => (
            <div key={c.label} style={{ background: '#111E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>💡 Oncor Rebate Program (Real Money)</h2>
          <p style={{ color: '#9BA3B5', lineHeight: 1.7, marginBottom: '0.75rem' }}>Oncor Electric Delivery (serving most of DFW) offers rebates for qualifying insulation upgrades when installed by a RESNET or BPI-certified contractor. Always ask your contractor to pull the rebate for you — many homeowners leave $200–400 on the table.</p>
          <p style={{ color: '#9BA3B5', lineHeight: 1.7 }}>Eligible: Attic blown-in, air sealing, duct sealing. Not eligible: spray foam walls, radiant barrier only. Contractor must be on Oncor's approved vendor list — verify before signing.</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🔍 Insulation Recommendation Tool</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
            {[['Home Age', HOME_AGES, age, setAge], ['Area to Insulate', AREAS, area, setArea], ['Current Insulation Level', CURRENT_INSULATION, current, setCurrent]].map(([label, opts, val, setter]: any) => (
              <div key={label}>
                <label style={{ fontSize: '0.85rem', color: '#9BA3B5', display: 'block', marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3F60', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.95rem' }}>
                  <option value=''>Select...</option>
                  {opts.map((o: string) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Recommended: {rec.material}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 4 }}>Target R-Value: {rec.rValue}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem', marginBottom: 4 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem', marginBottom: 8 }}>Oncor Rebate: {rec.rebate}</div>
              <div style={{ color: '#E8EAF0', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 Hiring a DFW Insulation Contractor</h2>
          {['Look for RESNET HERS Rater or BPI certification — required for Oncor rebates',
            'Ask for a blower-door test before and after to prove air sealing results',
            'Get itemized quotes: materials, labor, and disposal are often bundled to obscure markup',
            'Avoid contractors who skip air sealing — insulation without sealing is 30% less effective',
            'Verify they pull building permits for spray foam in enclosed spaces (DFW code requirement)',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span><span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
