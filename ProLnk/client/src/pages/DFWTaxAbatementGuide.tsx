import { useState } from 'react';

const scenarios = [
  {
    id: 'homeowner-downtown',
    label: 'Homeowner in Dallas / Fort Worth urban core',
    programs: [
      { name: 'Texas Historic Preservation Tax Credit', benefit: '25% credit on qualified rehab expenditures', apply: 'Texas Historical Commission — thc.texas.gov', eligibility: 'Must be in a State or National Register historic district; rehab costs must exceed adjusted basis' },
      { name: 'City of Dallas Urban Land Bank', benefit: 'Reduced property acquisition + tax abatement for rehab', apply: 'Dallas Area Habitat or DHA Housing Solutions', eligibility: 'Income-qualified buyers in target neighborhoods' },
      { name: 'Fort Worth Historic Preservation Incentive', benefit: 'City exemption on added value from eligible rehab for 5 years', apply: 'Fort Worth Historic Preservation Office', eligibility: 'Designated local landmarks or National Register properties' },
    ],
  },
  {
    id: 'mixed-use-nearby',
    label: 'Homeowner near new mixed-use development',
    programs: [
      { name: 'Tax Increment Financing (TIF) District Benefit', benefit: 'Public infrastructure improvements from TIF revenue can increase your home value without direct abatement', apply: 'Awareness only — no application needed; check if your area is in a TIF district via city GIS', eligibility: 'Homes inside TIF districts benefit indirectly from infrastructure spend' },
      { name: 'Chapter 380 Economic Development Agreement', benefit: 'Developer agreements sometimes include commitments to public improvements', apply: 'Monitor city council agendas for your area', eligibility: 'Residents near commercial Chapter 380 developments may benefit from roads, utilities, green space' },
    ],
  },
  {
    id: 'commercial-property',
    label: 'Commercial or mixed-use property owner',
    programs: [
      { name: 'Chapter 312 Tax Abatement Agreement', benefit: 'Up to 100% exemption on added value for 10 years', apply: 'Negotiate directly with City or County economic development office before commencing project', eligibility: 'New investment meeting job creation or capital investment thresholds; varies by jurisdiction' },
      { name: 'Enterprise Zone Program', benefit: 'Sales tax refunds + state tax credits for qualified businesses', apply: 'Texas Governor\’s Office — gov.texas.gov/business', eligibility: 'Qualified investments in designated enterprise zones (check map first)' },
    ],
  },
  {
    id: 'homestead-senior',
    label: 'Homeowner seeking homestead or senior exemptions',
    programs: [
      { name: 'Texas Homestead Exemption', benefit: '$100,000 off assessed value for school district taxes (2023 increase)', apply: 'County Appraisal District (DCAD / TAD) — file by April 30 of first year', eligibility: 'Primary residence, owned on Jan 1 of tax year' },
      { name: 'Over-65 Freeze', benefit: 'School district taxes frozen at level of first year with exemption', apply: 'Same DCAD/TAD application as homestead; mark over-65 box', eligibility: 'Age 65+ homestead owners' },
      { name: 'Disabled Person Exemption', benefit: 'Additional $10,000 off school district taxes + freeze option', apply: 'DCAD/TAD with supporting disability documentation', eligibility: 'Legally disabled homestead owner' },
    ],
  },
];

export default function DFWTaxAbatementGuide() {
  const [selected, setSelected] = useState('');
  const match = scenarios.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'system-ui, sans-serif', color: '#e8eaf0' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 32, marginBottom: 24, border: '1px solid #1e3560' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💰 🏛️ 📉</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642' }}>DFW Tax Abatement & Incentive Guide</h1>
          <p style={{ margin: 0, color: '#a0aec0', fontSize: 15, lineHeight: 1.6 }}>
            Texas has some of the highest property tax rates in the US — but also meaningful exemptions and economic development incentives. Knowing what applies to your property can save thousands annually.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '📊', title: 'Texas Property Taxes: The Context', body: 'DFW property tax rates range from 1.8% to 2.8% of assessed value depending on city and school district. A $400K home can carry $8,000–$11,000/year in property taxes. Exemptions and abatements are not automatic — you must apply.' },
            { icon: '🏛️', title: 'Chapter 312: The Main Commercial Tool', body: 'Chapter 312 of the Texas Tax Code allows cities and counties to offer 10-year abatements on improvements to attract investment. These apply to commercial, industrial, and mixed-use projects — not typically single-family homes. But nearby Chapter 312 projects fund infrastructure that lifts residential values.' },
            { icon: '🏚️', title: 'Historic Preservation Credits', body: 'The Texas Historic Preservation Tax Credit (25%) applies to certified historic structures undergoing substantial rehabilitation. In DFW, this covers parts of downtown Dallas, Sundance Square in Fort Worth, and designated neighborhood historic districts.' },
            { icon: '🏠', title: 'Don\’t Miss Your Homestead Exemption', body: 'The most valuable and most commonly missed exemption: Texas homestead. As of 2023, it removes $100,000 from your assessed value for school taxes — saving roughly $1,300–$2,500/year. File by April 30 of the year after you move in. Late applications can be filed for up to 2 years back.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 10, padding: 20, border: '1px solid #1e3560' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#F5E642' }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#a0aec0', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 28, border: '1px solid #1e3560' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: '#F5E642' }}>🎯 Your Situation → Available Programs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3560'}`, background: selected === s.id ? 'rgba(245,230,66,0.1)' : '#0d1a30', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14, color: '#e8eaf0' }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div>
              {match.programs.map((prog, i) => (
                <div key={i} style={{ background: '#0d1a30', borderRadius: 8, padding: 16, marginBottom: 12, borderLeft: '3px solid #F5E642' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{prog.name}</div>
                  <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>💵 {prog.benefit}</div>
                  <div style={{ color: '#a0aec0', fontSize: 13, marginBottom: 4 }}>📋 Apply: {prog.apply}</div>
                  <div style={{ color: '#8899aa', fontSize: 13 }}>✅ Eligible if: {prog.eligibility}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
