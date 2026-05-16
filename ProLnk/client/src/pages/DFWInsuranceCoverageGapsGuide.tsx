import { useState } from 'react';

const gaps = [
  {
    id: 'sewer',
    label: 'Sewer/Drain Backup',
    icon: '🚿',
    covered: false,
    description: 'Standard policies exclude backup from sewer lines, drains, or sump pump failure — even if it floods your basement or lower floor.',
    endorsement: 'Water/Sewer Backup Endorsement',
    cost: '$50–150/year',
    dfwNote: 'Aging clay sewer lines in older DFW neighborhoods make this a real risk.',
  },
  {
    id: 'foundation',
    label: 'Foundation Movement',
    icon: '🏗️',
    covered: false,
    description: 'Foundation settling, cracking, or movement from expansive DFW clay soil is specifically excluded as "earth movement."',
    endorsement: 'Foundation coverage is generally NOT insurable — budget for maintenance instead.',
    cost: 'Not available',
    dfwNote: 'DFW expansive clay soil makes foundation issues the #1 homeowner complaint in the area.',
  },
  {
    id: 'mechanical',
    label: 'Mechanical Breakdown',
    icon: '❄️',
    covered: false,
    description: 'HVAC, water heater, refrigerator, and other mechanical failures are excluded — insurance covers sudden damage, not wear and tear.',
    endorsement: 'Home Warranty (not an insurance product)',
    cost: '$400–700/year',
    dfwNote: 'Extreme summer heat causes accelerated HVAC wear in DFW.',
  },
  {
    id: 'flood',
    label: 'Flood Damage',
    icon: '🌊',
    covered: false,
    description: 'Rising water from storms, flash floods, or overflowing creeks and rivers is explicitly excluded from standard policies.',
    endorsement: 'NFIP Flood Policy or Private Flood Insurance',
    cost: '$700–2,500+/year',
    dfwNote: 'Trinity River floodplain and creek areas throughout DFW have real flash flood risk.',
  },
  {
    id: 'earthquake',
    label: 'Earthquake / Injection Wells',
    icon: '🌍',
    covered: false,
    description: 'Standard policies exclude earthquake damage. North Texas has experienced increased seismic activity linked to oil/gas injection wells.',
    endorsement: 'Earthquake Endorsement',
    cost: '$100–300/year',
    dfwNote: 'Midlothian, Cleburne, and parts of north DFW have had injection well-related tremors.',
  },
  {
    id: 'mold',
    label: 'Mold (Pre-Existing)',
    icon: '🍄',
    covered: false,
    description: 'Mold from long-term moisture, poor ventilation, or HVAC neglect is excluded. Only sudden accidental water damage that causes mold may be covered.',
    endorsement: 'Mold Endorsement (limited coverage)',
    cost: '$50–100/year',
    dfwNote: 'DFW humidity levels make mold a persistent risk, especially in crawl spaces.',
  },
];

export default function DFWInsuranceCoverageGapsGuide() {
  const [situation, setSituation] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => setSituation(prev => ({ ...prev, [id]: !prev[id] }));

  const relevant = gaps.filter(g => situation[g.id]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', opacity: 0.8 }}>ProLnk Guide · DFW Homeowners</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>
          ⚠️ DFW Insurance Coverage Gaps
        </h1>
        <p style={{ color: '#ccc', marginBottom: '2rem', lineHeight: 1.6 }}>
          Standard homeowner policies leave significant gaps that DFW homeowners often discover only at claim time. Know what you don't have — before you need it.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          {gaps.map(gap => (
            <div key={gap.id} style={{ background: '#112240', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid #dc3545' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>{gap.icon} {gap.label} <span style={{ color: '#dc3545', fontSize: '0.8rem', fontWeight: 600 }}>NOT COVERED</span></div>
                  <p style={{ color: '#bbb', fontSize: '0.875rem', margin: '0 0 0.5rem', lineHeight: 1.5 }}>{gap.description}</p>
                  <div style={{ fontSize: '0.8rem', color: '#F5E642' }}>📍 DFW: {gap.dfwNote}</div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#aaa' }}>
                    <span style={{ marginRight: '1rem' }}>🔧 Fix: {gap.endorsement}</span>
                    <span>💰 Cost: {gap.cost}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>🏠 Your Situation → Your Gaps</h2>
          <p style={{ color: '#ccc', fontSize: '0.875rem', marginBottom: '1rem' }}>Select the risks that apply to your home:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {gaps.map(gap => (
              <button key={gap.id} onClick={() => toggle(gap.id)} style={{ background: situation[gap.id] ? '#F5E642' : '#0A1628', color: situation[gap.id] ? '#0A1628' : '#fff', border: '1px solid ' + (situation[gap.id] ? '#F5E642' : '#334'), borderRadius: 8, padding: '0.5rem 0.75rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>
                {gap.icon} {gap.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Show My Coverage Gaps</button>

          {showResults && relevant.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Your Priority Gaps to Address:</div>
              {relevant.map(gap => (
                <div key={gap.id} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{gap.icon} {gap.label}</div>
                  <div style={{ fontSize: '0.875rem', color: '#ccc', marginBottom: '0.25rem' }}>{gap.endorsement}</div>
                  <div style={{ fontSize: '0.875rem', color: '#F5E642' }}>Estimated cost: {gap.cost}</div>
                </div>
              ))}
            </div>
          )}
          {showResults && relevant.length === 0 && (
            <div style={{ marginTop: '1rem', color: '#ccc', fontSize: '0.9rem' }}>Select at least one risk above to see your personalized gap analysis.</div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <strong>Foundation, plumbing, or HVAC concerns?</strong>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>ProLnk connects you with vetted DFW contractors before issues become uninsured losses.</div>
        </div>
      </div>
    </div>
  );
}
