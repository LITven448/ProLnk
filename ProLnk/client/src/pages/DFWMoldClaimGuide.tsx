import { useState } from 'react';

const situations = [
  {
    id: 'burst_pipe',
    label: 'Burst or broken pipe caused water damage',
    covered: true,
    cause: 'sudden_accidental',
    icon: '💧',
    likelihood: 'Likely Covered',
    color: '#28a745',
    docs: ['Photos of burst pipe location', 'Date it was discovered', 'Water mitigation company invoice', 'Plumber repair invoice', 'Mold remediation estimate'],
    process: 'File under your homeowners policy. The mold is secondary damage from a covered peril. Report within 24–72 hours of discovery.',
  },
  {
    id: 'appliance',
    label: 'Appliance leak (dishwasher, washing machine, refrigerator)',
    covered: true,
    cause: 'sudden_accidental',
    icon: '🍽️',
    likelihood: 'Often Covered',
    color: '#28a745',
    docs: ['Photos of appliance and water damage', 'Date discovered', 'Duration of leak (key factor — sudden vs ongoing)', 'Appliance repair or replacement receipt'],
    process: 'Sudden leaks are generally covered. If the appliance leaked slowly over months, coverage may be denied as a maintenance issue.',
  },
  {
    id: 'roof_leak',
    label: 'Roof leak after storm caused mold',
    covered: true,
    cause: 'storm_related',
    icon: '🌩️',
    likelihood: 'Likely Covered (storm-caused)',
    color: '#28a745',
    docs: ['Storm date from NOAA records', 'Roof inspection report', 'Interior water damage photos', 'Mold test results if conducted', 'Remediation estimate'],
    process: 'The storm is the covered peril. File promptly — do not delay. Temporary repairs (tarping) should be made immediately to prevent further damage.',
  },
  {
    id: 'hvac_condensate',
    label: 'AC condensate pan overflowed or HVAC drip issue',
    covered: null,
    cause: 'borderline',
    icon: '❄️',
    likelihood: 'Borderline',
    color: '#ffc107',
    docs: ['HVAC maintenance records', 'Date of last service', 'Photos of overflow location', 'Water damage photos'],
    process: 'Coverage depends on whether the overflow was sudden (usually covered) or the result of a clogged drain that went unaddressed for weeks (usually not covered). HVAC maintenance records matter here.',
  },
  {
    id: 'chronic_moisture',
    label: 'Chronic moisture in crawl space or basement',
    covered: false,
    cause: 'maintenance',
    icon: '🏚️',
    likelihood: 'Not Covered',
    color: '#dc3545',
    docs: [],
    process: 'Long-term moisture is considered a maintenance issue. Insurance covers sudden and accidental — not gradual. Budget for remediation and waterproofing out of pocket.',
  },
  {
    id: 'hvac_neglect',
    label: 'Dirty or neglected HVAC coils/ducts caused mold spread',
    covered: false,
    cause: 'maintenance',
    icon: '🔧',
    likelihood: 'Not Covered',
    color: '#dc3545',
    docs: [],
    process: 'Mold from HVAC neglect is explicitly excluded. Regular HVAC maintenance (including coil cleaning) is the homeowner\’s responsibility.',
  },
  {
    id: 'bathroom_grout',
    label: 'Failed grout or caulking in bathroom caused mold',
    covered: false,
    cause: 'maintenance',
    icon: '🚿',
    likelihood: 'Not Covered',
    color: '#dc3545',
    docs: [],
    process: 'Deteriorated caulk and grout are maintenance items. This is one of the most common sources of mold in DFW bathrooms due to humidity.',
  },
];

export default function DFWMoldClaimGuide() {
  const [selected, setSelected] = useState('');
  const [showResult, setShowResult] = useState(false);

  const situation = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', opacity: 0.8 }}>ProLnk Guide · DFW Homeowners</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>
          🍄 DFW Mold Insurance Claim Guide
        </h1>
        <p style={{ color: '#ccc', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW humidity — averaging 65–75% year-round — creates one of the highest mold-risk environments in Texas. Insurance covers mold only in specific situations. Know the rules before you call your insurer.
        </p>

        <div style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid #F5E642', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>The Core Rule</h2>
          <p style={{ color: '#ccc', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            Insurance covers mold that results from a <strong style={{ color: '#fff' }}>sudden and accidental covered event</strong> — a burst pipe, storm damage, appliance leak. It does <strong style={{ color: '#dc3545′ }}>NOT</strong> cover mold from long-term moisture, HVAC neglect, bad caulking, or any gradual condition. DFW’s humidity makes the latter extremely common, and claims are frequently denied on this basis.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#112240', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#28a745', marginBottom: '0.75rem' }}>✅ Generally Covered</div>
            <ul style={{ paddingLeft: '1.2rem', color: '#bbb', fontSize: '0.875rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Mold from burst pipe</li>
              <li style={{ marginBottom: '0.4rem' }}>Mold after storm roof leak</li>
              <li style={{ marginBottom: '0.4rem' }}>Mold from sudden appliance failure</li>
              <li style={{ marginBottom: 0 }}>Mold from fire suppression water</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#dc3545', marginBottom: '0.75rem' }}>❌ Almost Never Covered</div>
            <ul style={{ paddingLeft: '1.2rem', color: '#bbb', fontSize: '0.875rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>Long-term moisture buildup</li>
              <li style={{ marginBottom: '0.4rem' }}>HVAC neglect or dirty coils</li>
              <li style={{ marginBottom: '0.4rem' }}>Failed caulk or grout in baths</li>
              <li style={{ marginBottom: 0 }}>Crawl space or foundation seepage</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>🔍 What’s Your Situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => { setSelected(s.id); setShowResult(false); }} style={{ background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid ' + (selected === s.id ? '#F5E642' : '#334'), borderRadius: 8, padding: '0.6rem 0.875rem', cursor: ’pointer', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} disabled={!selected} style={{ background: selected ? '#F5E642′ : '#334', color: selected ? '#0A1628' : '#666', border: ’none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: selected ? 'pointer' : 'default' }}>Analyze My Situation</button>

          {showResult && situation && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ background: situation.color + '20', border: `1px solid ${situation.color}`, borderRadius: 10, padding: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: situation.color, marginBottom: '0.25rem' }}>{situation.likelihood}</div>
                <p style={{ color: '#ccc', fontSize: '0.9rem', margin: '0.5rem 0 0', lineHeight: 1.6 }}>{situation.process}</p>
              </div>
              {situation.docs.length > 0 && (
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>📄 Documentation Needed:</div>
                  <ul style={{ paddingLeft: '1.2rem', color: '#ccc', fontSize: '0.875rem' }}>
                    {situation.docs.map((doc, i) => <li key={i} style={{ marginBottom: '0.35rem' }}>{doc}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <strong>Need a DFW mold remediation or plumbing contractor?</strong>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>ProLnk connects you with vetted pros — document damage before work starts to protect your claim.</div>
        </div>
      </div>
    </div>
  );
}
