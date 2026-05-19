import { useState } from 'react';

const DFW_COUNTIES = ['Dallas County', 'Tarrant County', 'Collin County', 'Denton County', 'Rockwall County', 'Ellis County', 'Johnson County', 'Kaufman County'];

const countyData: Record<string, { rates: { entity: string; rate: string; funds: string }[]; tip: string }> = {
  'Dallas County': {
    rates: [
      { entity: 'Dallas ISD / Local School', rate: '~1.11%', funds: 'Local public schools — largest portion of your bill' },
      { entity: 'Dallas County', rate: '~0.22%', funds: 'Sheriff, courts, county hospital (Parkland), roads' },
      { entity: 'City of Dallas', rate: '~0.74%', funds: 'Police, fire, parks, city services' },
      { entity: 'Dallas County HHSC', rate: '~0.05%', funds: 'Health & human services district' },
      { entity: 'Dallas College', rate: '~0.12%', funds: 'Community college system (formerly DCCCD)' },
    ],
    tip: 'Dallas County ARB (Appraisal Review Board) accepts protests May-July each year.',
  },
  'Tarrant County': {
    rates: [
      { entity: 'Local School District', rate: '~1.08%', funds: 'Local public schools — largest portion of your bill' },
      { entity: 'Tarrant County', rate: '~0.22%', funds: 'Sheriff, courts, JPS Health Network, roads' },
      { entity: 'City (varies)', rate: '~0.65-0.80%', funds: 'Police, fire, parks, city services' },
      { entity: 'Tarrant County College', rate: '~0.13%', funds: 'Community college system' },
      { entity: 'Hospital District', rate: '~0.22%', funds: 'JPS Health Network operations' },
    ],
    tip: 'Tarrant Appraisal District (TAD) online protest portal opens April 1 each year.',
  },
  'Collin County': {
    rates: [
      { entity: 'Local School District', rate: '~1.04%', funds: 'Local public schools (Frisco ISD, Plano ISD, etc.)' },
      { entity: 'Collin County', rate: '~0.15%', funds: 'One of lowest county rates in DFW — efficient govt' },
      { entity: 'City (varies)', rate: '~0.40-0.65%', funds: 'Police, fire, city services' },
      { entity: 'Collin College', rate: '~0.08%', funds: 'Community college system' },
      { entity: 'MUD / PID (if applicable)', rate: '~0.15-0.60%', funds: 'Municipal utility district or public improvement district' },
    ],
    tip: 'Collin CAD is known for aggressive appraisals — protest is highly recommended each year.',
  },
  'Denton County': {
    rates: [
      { entity: 'Local School District', rate: '~1.06%', funds: 'Local public schools (Denton ISD, Lewisville ISD, etc.)' },
      { entity: 'Denton County', rate: '~0.18%', funds: 'Sheriff, courts, county roads' },
      { entity: 'City (varies)', rate: '~0.45-0.70%', funds: 'Police, fire, city services' },
      { entity: 'North Central Texas College', rate: '~0.09%', funds: 'Community college system' },
      { entity: 'MUD (if applicable)', rate: '~0.10-0.50%', funds: 'Municipal utility district fees' },
    ],
    tip: 'Denton CAD online protest is available. File by May 15 deadline.',
  },
  'Rockwall County': {
    rates: [
      { entity: 'Rockwall ISD', rate: '~1.08%', funds: 'Highly-rated school district — premium reflected in rate' },
      { entity: 'Rockwall County', rate: '~0.20%', funds: 'Sheriff, courts, county services' },
      { entity: 'City of Rockwall', rate: '~0.42%', funds: 'Police, fire, parks, city services' },
      { entity: 'Rockwall County HD', rate: '~0.04%', funds: 'County hospital district' },
    ],
    tip: 'Rockwall has high appraisals due to lake proximity — comparable sales evidence is key for protests.',
  },
  'Ellis County': {
    rates: [
      { entity: 'Local School District', rate: '~1.09%', funds: 'Local public schools (Waxahachie ISD, etc.)' },
      { entity: 'Ellis County', rate: '~0.27%', funds: 'Sheriff, courts, county roads' },
      { entity: 'City (varies)', rate: '~0.40-0.65%', funds: 'Police, fire, city services' },
    ],
    tip: 'Ellis County CAD: lower property values but watch for overvaluation on acreage properties.',
  },
  'Johnson County': {
    rates: [
      { entity: 'Local School District', rate: '~1.10%', funds: 'Local public schools (Cleburne ISD, Burleson ISD, etc.)' },
      { entity: 'Johnson County', rate: '~0.40%', funds: 'Sheriff, courts, county services' },
      { entity: 'City (varies)', rate: '~0.45-0.70%', funds: 'Police, fire, city services' },
    ],
    tip: 'Johnson County is experiencing rapid growth — appraisals often lag then jump significantly.',
  },
  'Kaufman County': {
    rates: [
      { entity: 'Local School District', rate: '~1.15%', funds: 'Local public schools (Forney ISD, Kaufman ISD, etc.)' },
      { entity: 'Kaufman County', rate: '~0.35%', funds: 'Sheriff, courts, county services' },
      { entity: 'City (varies)', rate: '~0.40-0.60%', funds: 'Police, fire, city services' },
      { entity: 'MUD (common)', rate: '~0.20-0.50%', funds: 'MUDs are very common in Kaufman fast-growth areas' },
    ],
    tip: 'Forney and Terrell areas: MUD fees are often overlooked — verify before buying.',
  },
};

export default function DFWPropertyTaxReceiptGuide() {
  const [county, setCounty] = useState('Dallas County');
  const data = countyData[county];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🏛️ DFW Property Tax Receipt Guide
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
          Your DFW property tax notice feels like one big number — but it's actually 4-7 separate taxing entities each billing you. Understanding each helps you know what you can challenge and what you can't.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.8rem' }}>📋 How DFW Property Tax Works</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.8rem' }}>
            {[
              { label: 'Appraisal = CAD', desc: 'County Appraisal District sets your home value each January — this is what you protest' },
              { label: 'Tax Rate = Taxing Units', desc: 'Each entity (school, city, county) sets their own rate — total rate is the sum' },
              { label: 'Protest Deadline', desc: 'May 15 or 30 days after notice — whichever is later. Online protest available in most counties' },
              { label: 'Homestead Exemption', desc: '$100,000 off school district taxable value — file once with your county CAD' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.3rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🗺️ Tax Breakdown by County</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Select Your County</div>
            <select value={county} onChange={e => setCounty(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
              {DFW_COUNTIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {data && (
            <div>
              {data.rates.map(r => (
                <div key={r.entity} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#E8EDF5', fontWeight: 600 }}>{r.entity}</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{r.funds}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginLeft: '1rem' }}>{r.rate}</div>
                </div>
              ))}
              <div style={{ background: '#1E3A2B', borderRadius: 8, padding: '0.8rem', marginTop: '0.5rem' }}>
                <div style={{ color: '#22C55E', fontWeight: 600 }}>💡 {data.tip}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted property tax consultants who work on contingency.
        </div>
      </div>
    </div>
  );
}
