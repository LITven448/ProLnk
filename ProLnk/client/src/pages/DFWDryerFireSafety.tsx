import { useState } from 'react';

type RiskResult = { level: string; color: string; schedule: string; ductAction: string; tips: string[] };

function assessDryerRisk(age: string, ductLength: string, lastCleaning: string): RiskResult {
  const isOld = age === 'over-10';
  const isLongDuct = ductLength === 'over-15';
  const isOverdue = lastCleaning === 'never' || lastCleaning === 'over-2-years';

  const score = (isOld ? 2 : 0) + (isLongDuct ? 2 : 0) + (isOverdue ? 3 : 0);

  if (score >= 5) {
    return {
      level: 'HIGH FIRE RISK — Act Now',
      color: '#FF4444',
      schedule: 'Clean lint trap every load. Schedule professional duct cleaning immediately.',
      ductAction: isLongDuct ? 'Your duct length exceeds safe limits for flexible duct. Replace with rigid metal duct and reduce run length if possible.' : 'Schedule duct inspection — long duration since last cleaning is a serious hazard.',
      tips: [
        'Do not run the dryer unattended until the duct has been professionally cleaned.',
        'DFW dryers run year-round at high volume — lint buildup is faster than in cooler climates.',
        'Check that your duct exhausts outside, not into the attic or crawl space.',
        'Look for flexible plastic duct — it is prohibited by IRC code and must be replaced with metal.',
        'After cleaning, run the dryer and check for airflow at the exterior vent cap.',
      ],
    };
  }
  if (score >= 3) {
    return {
      level: 'MODERATE RISK — Schedule Cleaning Soon',
      color: '#FF9944',
      schedule: 'Clean lint trap every load. Schedule professional duct cleaning within 3 months.',
      ductAction: 'Inspect duct material — ensure it is rigid or semi-rigid metal, not plastic flex duct.',
      tips: [
        'Annual dryer duct cleaning is standard for DFW homes — high usage volume accelerates lint buildup.',
        'Clean the back of the dryer and the area behind it at least twice a year.',
        'Verify your exterior duct cap has a functioning flap damper to block pests.',
        'Thin, flexible white plastic duct must be replaced immediately — it is a fire code violation.',
      ],
    };
  }
  return {
    level: 'LOW RISK — Maintain Your Schedule',
    color: '#44BB44',
    schedule: 'Clean lint trap every load. Annual professional duct cleaning recommended.',
    ductAction: 'Verify duct is rigid metal. If semi-rigid aluminum flex is installed, it is acceptable but rigid is preferred for long runs.',
    tips: [
      'Even low-risk setups need annual duct cleaning in DFW — humidity causes lint to stick faster than in dry climates.',
      'Check the exterior duct cap seasonally for blockage, bird nests, or debris.',
      'Note your next cleaning date and set a calendar reminder.',
    ],
  };
}

export default function DFWDryerFireSafety() {
  const [age, setAge] = useState('');
  const [ductLength, setDuctLength] = useState('');
  const [lastCleaning, setLastCleaning] = useState('');

  const result = age && ductLength && lastCleaning ? assessDryerRisk(age, ductLength, lastCleaning) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌀</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Dryer Fire Safety Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 24, lineHeight: 1.6 }}>
          Dryers cause approximately 15,500 home fires per year in the US — and nearly all are preventable.
          DFW households run dryers year-round without the seasonal breaks that reduce lint buildup in cooler regions.
          In North Texas, failure to clean the duct annually is a leading cause of preventable house fires.
        </p>
        <div style={{ background: '#162844', borderRadius: 10, padding: '14px 18px', marginBottom: 28 }}>
          <strong style={{ color: '#F5E642' }}>DFW Code Note:</strong>
          <p style={{ color: '#8FA3BF', marginTop: 6, lineHeight: 1.6 }}>
            The International Residential Code (IRC), adopted in DFW municipalities, requires dryer ducts to be rigid or semi-rigid metal.
            Flexible plastic or foil ducts are prohibited. Duct runs must not exceed 25 feet with appropriate deductions for bends.
          </p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔥 Assess Your Fire Risk</h2>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Dryer Age</label>
          <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value="">Select age...</option>
            <option value="under-5">Under 5 years old</option>
            <option value="5-to-10">5 to 10 years old</option>
            <option value="over-10">Over 10 years old</option>
          </select>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Approximate Duct Length</label>
          <select value={ductLength} onChange={e => setDuctLength(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value="">Select duct length...</option>
            <option value="under-10">Under 10 feet</option>
            <option value="10-to-15">10 to 15 feet</option>
            <option value="over-15">Over 15 feet</option>
          </select>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Last Professional Duct Cleaning</label>
          <select value={lastCleaning} onChange={e => setLastCleaning(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value="">Select timeframe...</option>
            <option value="within-1-year">Within the last year</option>
            <option value="1-to-2-years">1 to 2 years ago</option>
            <option value="over-2-years">Over 2 years ago</option>
            <option value="never">Never or unknown</option>
          </select>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{result.level}</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: '#F5E642' }}>Cleaning Schedule:</strong> <span style={{ color: '#8FA3BF' }}>{result.schedule}</span></div>
              <div style={{ marginBottom: 12 }}><strong style={{ color: '#F5E642' }}>Duct Action:</strong> <span style={{ color: '#8FA3BF' }}>{result.ductAction}</span></div>
              <ul style={{ paddingLeft: 20, color: '#8FA3BF', lineHeight: 1.8 }}>
                {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Every-Load Checklist</h2>
          {[
            { icon: '🧹', title: 'Clean lint trap before every load', body: 'A clogged lint trap forces air through the duct, depositing lint where you cannot see it.' },
            { icon: '⏱️', title: 'Clothes taking multiple cycles?', body: 'This is the #1 sign of a clogged duct. Schedule professional cleaning immediately.' },
            { icon: '🌡️', title: 'Dryer hot to the touch?', body: 'Exterior heat indicates restricted airflow. Stop using and inspect before running again.' },
            { icon: '🐦', title: 'Check the exterior vent cap', body: 'Bird nests in dryer vent caps are common in DFW. Check each spring before heavy use.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div><strong style={{ color: '#E8EDF5' }}>{item.title}:</strong> <span style={{ color: '#8FA3BF' }}>{item.body}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
