import { useState } from 'react';

const roomIssues = [
  'Hot room in summer',
  'Cold room in winter',
  'Stuffy / poor airflow',
  'Humidity problems',
  'Noisy vents',
];

const layoutTypes = [
  'Single-story open plan',
  'Single-story compartmentalized',
  'Two-story (bedrooms up)',
  'Two-story (bedrooms down)',
  'Ranch with long duct runs',
];

function getDuctDiagnosis(issue: string, layout: string) {
  if (issue === 'Hot room in summer' && layout.includes('Two-story')) {
    return {
      likelihood: 'Very High',
      color: '#ef4444',
      problem: 'Long attic duct runs losing capacity in 150°F attic heat',
      solutions: [
        'Insulate attic ducts to R-8 minimum',
        'Shorten duct runs — eliminate elbows where possible',
        'Add dedicated return in upper floor',
        'Consider mini-split for upper floor supplemental cooling',
      ],
    };
  }
  if (issue === 'Humidity problems') {
    return {
      likelihood: 'High',
      color: '#f97316',
      problem: 'Oversized ducts move air too fast — system short-cycles before dehumidifying',
      solutions: [
        'Perform Manual D duct sizing calculation',
        'Reduce supply duct size to increase velocity',
        'Consider variable-speed air handler',
        'Add whole-home dehumidifier',
      ],
    };
  }
  if (issue === 'Noisy vents') {
    return {
      likelihood: 'High',
      color: '#f97316',
      problem: 'Undersized ducts create excessive air velocity and turbulence',
      solutions: [
        'Calculate design CFM per room via Manual D',
        'Upsize supply trunk or branch ducts',
        'Add supply diffuser to spread airflow',
        'Check for collapsed flexible duct sections',
      ],
    };
  }
  if (issue === 'Stuffy / poor airflow') {
    return {
      likelihood: 'Medium',
      color: '#F5E642',
      problem: 'Duct design may not match room load or return placement is inadequate',
      solutions: [
        'Verify return air path is unobstructed',
        'Check static pressure — should be under 0.5″ w.c.',
        'Ensure each room has return air relief (door undercut or transfer grille)',
        'Balance supply registers to actual room loads',
      ],
    };
  }
  return {
    likelihood: 'Moderate',
    color: '#22c55e',
    problem: 'Duct design may be contributing — a Manual D audit is recommended',
    solutions: [
      'Commission a Manual D duct design calculation',
      'Inspect all duct connections for leaks',
      'Verify duct insulation meets DFW climate requirements (R-8)',
      'Balance system after any duct modifications',
    ],
  };
}

export default function DFWHVACDuctDesignGuide() {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('');

  const diagnosis = selectedIssue && selectedLayout
    ? getDuctDiagnosis(selectedIssue, selectedLayout)
    : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌬️ DFW HVAC Duct Design Guide</div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            In DFW's extreme climate, duct design is as critical as equipment selection. Attic temperatures routinely hit 150°F — every foot of poorly designed ductwork costs you comfort and efficiency.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>📐 Manual D: The DFW Standard</div>
          <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>Manual D calculates duct sizing based on actual room-by-room airflow requirements (CFM), static pressure limits, and duct geometry. In DFW:</p>
          <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
            <li>Attic duct runs should be as short and straight as possible — 150°F attic air destroys capacity in long runs</li>
            <li>Undersized ducts → hot spots, pressure imbalance, noise</li>
            <li>Oversized ducts → short cycling, humidity problems, wasted energy</li>
            <li>All replacement systems in DFW should require Manual D documentation</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem' }}>🔍 Diagnose Your Duct Problem</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>What's your comfort complaint?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {roomIssues.map(issue => (
                <button key={issue} onClick={() => setSelectedIssue(issue)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: selectedIssue === issue ? '#F5E642′ : '#1e3a5f', color: selectedIssue === issue ? '#0A1628' : '#e2e8f0', fontWeight: selectedIssue === issue ? ’bold' : 'normal' }}>
                  {issue}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>What's your home layout?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {layoutTypes.map(layout => (
                <button key={layout} onClick={() => setSelectedLayout(layout)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: selectedLayout === layout ? '#F5E642′ : '#1e3a5f', color: selectedLayout === layout ? '#0A1628' : '#e2e8f0', fontWeight: selectedLayout === layout ? ’bold' : 'normal' }}>
                  {layout}
                </button>
              ))}
            </div>
          </div>
        </div>

        {diagnosis && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${diagnosis.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#e2e8f0′ }}>Duct Problem Likelihood:</span>
              <span style={{ background: diagnosis.color, color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 'bold', fontSize: '0.9rem' }}>{diagnosis.likelihood}</span>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>⚠️ {diagnosis.problem}</p>
            <div style={{ color: '#F5E642', fontWeight: 'bold', marginBottom: '0.5rem' }}>Recommended Solutions:</div>
            <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
              {diagnosis.solutions.map((s, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
