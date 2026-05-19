import { useState } from 'react';

const DFW_AREAS = [
  'Plano / Allen / McKinney',
  'Frisco / Prosper / Celina',
  'Fort Worth / Keller / Southlake',
  'Irving / Las Colinas / Coppell',
  'Richardson / Addison / Carrollton',
  'Uptown / Oak Lawn / Design District',
  'Denton / Lewisville / Flower Mound',
  'Arlington / Mansfield / Grand Prairie',
];

const TIMELINES = [
  'Buying now (0-6 months)',
  'Buying in 1-2 years',
  'Buying in 3-5 years',
  'Investing long-term (5+ years)',
];

const CORPORATE_HQOS = [
  { company: 'Toyota North America', from: 'Torrance, CA', area: 'Plano', jobs: '4,000+', year: 2017, impact: 'Transformed Plano Legacy corridor; drove 20-30% appreciation in surrounding zip codes.' },
  { company: 'Charles Schwab', from: 'San Francisco, CA', area: 'Westlake', jobs: '3,000+', year: 2019, impact: 'Westlake and Southlake saw luxury inventory spike; $1M+ market established.' },
  { company: 'McKesson Corporation', from: 'San Francisco, CA', area: 'Irving', jobs: '6,000+', year: 2019, impact: 'Las Colinas office market tightened; residential in Coppell, Irving surged.' },
  { company: 'Oracle', from: 'Redwood City, CA', area: 'Austin / DFW', jobs: '8,500 TX total', year: 2021, impact: 'Distributed workforce benefited all DFW tech corridors. Frisco and Plano absorbed most talent.' },
  { company: 'Goldman Sachs (Campus)', from: 'New York, NY', area: 'Dallas Uptown', jobs: '5,000 (planned)', year: 2022, impact: 'Uptown premium reinforced; spillover to Oak Lawn, Design District, Knox-Henderson.' },
  { company: 'CBRE Group', from: 'Los Angeles, CA', area: 'Dallas', jobs: '1,500+', year: 2020, impact: 'Real estate and finance cluster in downtown Dallas strengthened commercial + residential demand.' },
  { company: 'Caterpillar', from: 'Deerfield, IL', area: 'Irving', jobs: '2,000+', year: 2022, impact: 'Irving / Las Colinas industrial and residential market strengthened further.' },
  { company: 'Hewlett Packard Enterprise', from: 'San Jose, CA', area: 'Spring / DFW', jobs: '2,000+ DFW', year: 2022, impact: 'Tech sector density in DFW continues to attract secondary tech firms and talent.' },
];

type ImpactResult = {
  headline: string;
  currentImpact: string;
  futureOutlook: string;
  actionAdvice: string;
};

const areaImpacts: Record<string, ImpactResult> = {
  'Plano / Allen / McKinney': {
    headline: 'Corporate Relocation Ground Zero',
    currentImpact: 'Toyota\’s 2017 move catalyzed the Legacy corridor transformation. Home prices near Toyota HQ appreciated 35-45% from 2017-2024. Still commanding $50-80K premium over comparable homes outside the corridor.',
    futureOutlook: 'Next wave: fintech and healthcare companies following Toyota\’s talent ecosystem. Allen and McKinney absorbing overflow as Plano saturates.',
    actionAdvice: 'Strong buy corridor. Corporate demand floor means prices rarely crater here even during rate spikes.',
  },
  'Frisco / Prosper / Celina': {
    headline: 'Tech Talent Overflow Hub',
    currentImpact: 'Oracle workforce + distributed tech talent chose Frisco for school districts and space. Master-planned communities absorbed 2021-2023 migration wave. Some oversupply of new construction in 2023-2024.',
    futureOutlook: 'PGA Headquarters (Frisco) brought national sports industry. Celina and Prosper are the new frontier — land plays happening now.',
    actionAdvice: 'Frisco near PGA corridor and Prosper are the best near-term appreciation plays. Celina is 5-year bet.',
  },
  'Irving / Las Colinas / Coppell': {
    headline: 'Fortune 500 Campus District',
    currentImpact: 'McKesson + Caterpillar + CBRE created a Fortune 500 cluster. Las Colinas commercial occupancy highest in DFW. Residential in Coppell and Irving up 40% since 2019 moves.',
    futureOutlook: 'More corporate campuses planned. Irving is the most underrated corporate relocation beneficiary — still affordable vs. Plano.',
    actionAdvice: 'Strong value play. Irving/Las Colinas near DFW airport offers corporate demand + connectivity premium.',
  },
  'Uptown / Oak Lawn / Design District': {
    headline: 'Finance and Professional Services Core',
    currentImpact: 'Goldman Sachs campus is reshaping Uptown. High-density luxury residential accelerating. $500K+ condos are the new normal in this corridor.',
    futureOutlook: 'Financial services talent brings NYC-caliber income expectations. Luxury rental market tightening. Urban living demand from relocation executives.',
    actionAdvice: 'Premium market, premium appreciation. Long-term hold for luxury investors. Not a value play — quality play.',
  },
  default: {
    headline: 'Indirect Relocation Beneficiary',
    currentImpact: 'This area benefits from DFW\’s overall corporate relocation momentum — population growth, income growth, and job market strength all lift the broader metro.',
    futureOutlook: 'As primary corridors saturate, relocation-driven demand will continue to expand into adjacent markets. Watch for new corporate announcements.',
    actionAdvice: 'Solid DFW fundamentals apply. Not a primary corporate relocation play but benefits from metro-wide demand growth.',
  },
};

export default function DFWCorporateRelocationImpact() {
  const [area, setArea] = useState('');
  const [timeline, setTimeline] = useState('');

  const result = area ? (areaImpacts[area] || areaImpacts['default']) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏢 DFW Real Estate Intelligence
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          Corporate Relocation Impact on DFW Housing
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW has absorbed more Fortune 500 headquarters relocations than any US metro since 2017. These aren't just companies — they’re demand engines that permanently reshape their surrounding real estate markets.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏢 Major HQ Relocations to DFW</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {CORPORATE_HQOS.map(({ company, from, area: loc, jobs, year, impact }) => (
              <div key={company} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', gap: 16 }}>
                <div style={{ minWidth: 50, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#64748B', marginBottom: 2 }}>SINCE</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{year}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{company}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>
                    {from} → {loc} &nbsp;|&nbsp; {jobs} jobs
                  </div>
                  <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>{impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🎯 Impact on Your Market</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select area...</option>
                {DFW_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Investment Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select timeline...</option>
                {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 16 }}>{result.headline}</div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Current Market Impact</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.6 }}>{result.currentImpact}</div>
              </div>
              <div style={{ marginBottom: 16, padding: 14, background: '#0F2040', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Future Outlook</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{result.futureOutlook}</div>
              </div>
              <div style={{ padding: 14, background: '#F5E64215', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Action Advice</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.6 }}>{result.actionAdvice}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔭 What's Coming Next</h2>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7 }}>
            DFW remains the #1 target for corporate relocations out of high-tax states. Texas enterprise tax environment, Dallas Fort Worth airport connectivity (direct flights to every major city), and a growing tech/finance talent pool make the trend self-reinforcing. Watch <strong style={{ color: '#E8EDF5′ }}>insurance, healthcare, and fintech</strong> sectors — those are the next wave arriving 2026-2028.
          </p>
        </div>
      </div>
    </div>
  );
}
