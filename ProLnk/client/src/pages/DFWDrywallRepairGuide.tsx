import { useState } from 'react';

const repairSizes = [
  { label: 'Nail/screw hole', size: 'Under 1″', diy: true, diyCost: '$5–$15', proCost: '$75–$150', time: '1 hour' },
  { label: 'Small hole', size: '1″–3″', diy: true, diyCost: '$10–$30', proCost: '$100–$200', time: '2–3 hours' },
  { label: 'Medium hole', size: '3″–6″', diy: true, diyCost: '$20–$50', proCost: '$150–$350', time: '4–6 hours' },
  { label: 'Large hole', size: '6″–12″', diy: false, diyCost: '$40–$80', proCost: '$250–$600', time: '1 day' },
  { label: 'Full wall section', size: '1–4 ft', diy: false, diyCost: '$80–$200', proCost: '$400–$900', time: '1–2 days' },
  { label: 'Full wall replacement', size: '4+ ft', diy: false, diyCost: '$150–$400', proCost: '$700–$2,000', time: '2–4 days' },
];

const textures = [
  { name: 'Orange Peel', prevalence: 'Very Common', dfwNotes: 'Most popular in DFW new construction since 2000. Medium spray, subtle bumps.' },
  { name: 'Skip Trowel', prevalence: 'Common', dfwNotes: 'Found in older DFW homes and custom builds. Irregular hand-troweled look. Hard to match without skill.' },
  { name: 'Knockdown', prevalence: 'Common', dfwNotes: 'Partial knockdown of spray. Similar to skip trowel but more consistent. Common in Frisco, Allen builds.' },
  { name: 'Smooth/Flat', prevalence: 'Less Common', dfwNotes: 'Found in luxury DFW homes. Easiest to match but shows imperfections under raking light.' },
  { name: 'Popcorn (Acoustic)', prevalence: 'Older Homes', dfwNotes: 'Pre-1980 DFW homes. May contain asbestos — test before disturbing.' },
];

export default function DFWDrywallRepairGuide() {
  const [selectedSize, setSelectedSize] = useState('');
  const match = repairSizes.find((r) => r.label === selectedSize);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOME IMPROVEMENT GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Drywall Repair Cost Guide
        </h1>
        <p style={{ color: '#A0ADBF', fontSize: 16, marginBottom: 36 }}>
          Dallas–Fort Worth 2026 pricing for drywall repair — small holes to full wall replacement, DFW humidity effects, texture matching, and DIY vs pro guidance.
        </p>

        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>💧 DFW Humidity &amp; Drywall</div>
          <p style={{ color: '#C8D4E8', margin: 0, lineHeight: 1.6 }}>
            DFW's humidity swings — from 20% in winter to 80%+ in summer — cause drywall to expand and contract. This creates nail pops, hairline cracks at corners, and tape seam bubbling. These are cosmetic issues, not structural, and are extremely common in DFW homes regardless of age. Joint compound should be applied in thin coats and allowed to fully dry before sanding, especially in humid summer months.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🔨 Interactive: Damage Size → DIY vs Pro + Cost</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 28, marginBottom: 36 }}>
          <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>SELECT DAMAGE TYPE</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{ width: '100%', backgroundColor: '#0A1628', color: '#FFFFFF', border: '1px solid #2A3E5C', borderRadius: 8, padding: '12px 14px', fontSize: 15, marginBottom: 20 }}
          >
            <option value="">-- Choose damage size --</option>
            {repairSizes.map((r) => (
              <option key={r.label} value={r.label}>{r.label} ({r.size})</option>
            ))}
          </select>

          {match && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ backgroundColor: match.diy ? '#0A2B1A' : '#2B0A0A', borderRadius: 10, padding: 20, borderLeft: `4px solid ${match.diy ? '#22C55E' : '#EF4444'}` }}>
                <div style={{ fontSize: 13, color: '#A0ADBF', marginBottom: 4 }}>DIY RECOMMENDATION</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: match.diy ? '#22C55E' : '#EF4444′ }}>{match.diy ? '✅ DIY Feasible' : '⛔ Hire a Pro'}</div>
                <div style={{ color: '#C8D4E8', fontSize: 13, marginTop: 6 }}>DIY materials: {match.diyCost}</div>
                <div style={{ color: '#A0ADBF', fontSize: 12, marginTop: 4 }}>Time: {match.time}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 13, color: '#A0ADBF', marginBottom: 4 }}>PRO COST IN DFW</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{match.proCost}</div>
                <div style={{ color: '#C8D4E8', fontSize: 13, marginTop: 6 }}>Includes patch, texture match, prime, paint-ready finish</div>
              </div>
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>📋 Full Cost Table by Repair Size</h2>
        <div style={{ overflowX: 'auto', marginBottom: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#1A2E50′ }}>
                {['Damage Type', 'Size', 'DIY Material Cost', 'Pro Cost (DFW)', 'Completion Time'].map((h) => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: '#F5E642′ }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {repairSizes.map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#0D1E38′ : '#0A1628', borderBottom: '1px solid #1A2E50' }}>
                  <td style={{ padding: '11px 14px', color: '#FFFFFF', fontWeight: 600 }}>{row.label}</td>
                  <td style={{ padding: '11px 14px', color: '#C8D4E8′ }}>{row.size}</td>
                  <td style={{ padding: '11px 14px', color: '#C8D4E8′ }}>{row.diyCost}</td>
                  <td style={{ padding: '11px 14px', color: '#F5E642′ }}>{row.proCost}</td>
                  <td style={{ padding: '11px 14px', color: '#A0ADBF' }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🎨 Texture Matching in DFW Homes</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {textures.map((t, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 18, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 120 }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 14 }}>{t.name}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginTop: 2 }}>{t.prevalence}</div>
              </div>
              <div style={{ color: '#A0ADBF', fontSize: 13, lineHeight: 1.6 }}>{t.dfwNotes}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1A2E50', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>💡 DFW Pro Tips</div>
          <ul style={{ color: '#C8D4E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Allow 24–48 hours between coats in DFW summer humidity — rushing causes cracking</li>
            <li>Popcorn ceilings in pre-1980 DFW homes may contain asbestos — hire a certified abatement contractor</li>
            <li>Water damage drywall requires leak fix FIRST before patching — common after DFW hail storms</li>
            <li>Texture-matching sprayers can be rented at Home Depot/Lowes in Plano, Irving, Arlington for $40–$60/day</li>
            <li>Most DFW contractors charge a $150–$200 trip minimum for single small repairs</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
