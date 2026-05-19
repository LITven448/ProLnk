import { useState } from 'react';

const homeTypes = [
  'Open floor plan (1 story)',
  'Compartmentalized (1 story)',
  'Two-story, central return',
  'Two-story, returns on each floor',
  'Old home (pre-1990)',
];

const complaints = [
  'Rooms feel stuffy / pressurized',
  'Doors slam or move on their own',
  'Dusty home despite filtering',
  'Hot or cold spots throughout',
  'High humidity in summer',
];

function getBalanceDiagnosis(homeType: string, complaint: string) {
  const isOldHome = homeType.includes('pre-1990');
  const isTwoStory = homeType.includes('Two-story');
  const isCentralReturn = homeType.includes('central return');

  if (complaint === 'Doors slam or move on their own') {
    return {
      severity: 'Critical',
      color: '#ef4444',
      issue: 'Positive pressure in rooms — supply CFM far exceeds return CFM capacity',
      detail: 'When supply air enters a room faster than return can remove it, pressure builds. This forces conditioned air out through every gap in walls, ceilings, and floors — pulling hot attic air in elsewhere.',
      solutions: [
        'Add dedicated return grille in pressurized rooms',
        'Install transfer grilles above doors (12″×6″ minimum)',
        'Undercut interior doors 1″ minimum for return air path',
        'Measure static pressure — should be near zero at room level',
      ],
    };
  }

  if (complaint === 'Dusty home despite filtering' && isOldHome) {
    return {
      severity: 'High',
      color: '#f97316',
      issue: 'Negative pressure pulling unconditioned air through building envelope',
      detail: 'Older DFW homes often have undersized returns. The system creates negative pressure that pulls dusty attic and crawl space air through every gap — bypassing your filter entirely.',
      solutions: [
        'Audit return air CFM vs supply CFM — should be within 10%',
        'Add return grilles in hallways and main living areas',
        'Seal all accessible duct connections with mastic',
        'Consider whole-home air sealing alongside HVAC work',
      ],
    };
  }

  if (complaint === 'High humidity in summer') {
    return {
      severity: 'High',
      color: '#f97316',
      issue: 'Unbalanced system pulling humid outside air into building',
      detail: 'DFW summer dewpoints regularly hit 70°F+. A negative-pressure home actively pulls this humid air in through the envelope, overwhelming the AC\’s dehumidification capacity.',
      solutions: [
        'Balance supply/return CFM within 5% for humidity control',
        'Ensure all return ducts are sealed (mastic, not tape)',
        'Consider energy recovery ventilator (ERV) for controlled fresh air',
        'Add whole-home dehumidifier if building envelope cannot be sealed',
      ],
    };
  }

  if (isTwoStory && isCentralReturn) {
    return {
      severity: 'Medium-High',
      color: '#f97316',
      issue: 'Single central return on two-story home creates severe imbalance upstairs',
      detail: 'A single return on the first floor means upper bedrooms have no return air path. Pressure builds upstairs — hot in summer, energy wasted all year.',
      solutions: [
        'Add dedicated return on upper floor (critical for DFW)',
        'Install transfer grilles in all upstairs bedroom doors',
        'Consider separate zoned system for upper floor',
        'At minimum, undercut all upper floor doors 1.5″',
      ],
    };
  }

  return {
    severity: 'Moderate',
    color: '#F5E642',
    issue: 'Supply/return imbalance may be contributing to comfort issues',
    detail: 'Even well-designed systems drift out of balance as filters load, dampers shift, and ducts settle. A full airflow test is the only way to confirm balance.',
    solutions: [
      'Commission a duct blaster or flow hood test to measure actual CFM',
      'Verify total return CFM equals total supply CFM ±10%',
      'Check all return grilles are open and unobstructed',
      'Replace filters and retest — clogged filters reduce return airflow significantly',
    ],
  };
}

export default function DFWHVACSupplyReturnBalance() {
  const [homeType, setHomeType] = useState('');
  const [complaint, setComplaint] = useState('');

  const diagnosis = homeType && complaint ? getBalanceDiagnosis(homeType, complaint) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚖️ DFW HVAC Supply vs Return Balance</div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Supply and return balance is one of the most overlooked HVAC issues in DFW. An unbalanced system doesn't just feel uncomfortable — it actively pulls hot, humid Texas air into your home.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>📊 How to Check Your Balance</div>
          <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Sum all supply register CFM (from flow hood or tech measurement)</li>
            <li style={{ marginBottom: '0.5rem' }}>Sum all return grille CFM</li>
            <li style={{ marginBottom: '0.5rem' }}>They should match within 10% — ideally within 5%</li>
            <li style={{ marginBottom: '0.5rem' }}>In DFW: every 1 CFM of imbalance is 1 CFM of uncontrolled infiltration</li>
            <li>Positive pressure rooms lose conditioned air; negative pressure rooms pull in hot attic/outside air</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem' }}>🔍 Check Your System Balance</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Home type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {homeTypes.map(h => (
                <button key={h} onClick={() => setHomeType(h)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: homeType === h ? '#F5E642′ : '#1e3a5f', color: homeType === h ? '#0A1628' : '#e2e8f0', fontWeight: homeType === h ? ’bold' : 'normal' }}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Comfort complaint:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {complaints.map(c => (
                <button key={c} onClick={() => setComplaint(c)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: complaint === c ? '#F5E642′ : '#1e3a5f', color: complaint === c ? '#0A1628' : '#e2e8f0', fontWeight: complaint === c ? ’bold' : 'normal' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {diagnosis && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${diagnosis.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#e2e8f0′ }}>Issue Severity:</span>
              <span style={{ background: diagnosis.color, color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 'bold', fontSize: '0.9rem' }}>{diagnosis.severity}</span>
            </div>
            <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.5rem' }}>⚠️ {diagnosis.issue}</p>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{diagnosis.detail}</p>
            <div style={{ color: '#F5E642', fontWeight: 'bold', marginBottom: '0.5rem' }}>Solutions:</div>
            <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
              {diagnosis.solutions.map((s, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
