import { useState } from 'react';

const crownConditions = ['Good (Minor Cracks)', 'Fair (Surface Spalling)', 'Poor (Chunks Missing)', 'Failed (Water in Fireplace)'];
const chimneyAges = ['Under 10 Years', '10–25 Years', '25–40 Years', '40+ Years'];

function getAssessment(condition: string, age: string) {
  const repairTypes: Record<string, string> = {
    'Good (Minor Cracks)': 'Elastomeric Sealant',
    'Fair (Surface Spalling)': 'Resurfacing + Sealant',
    'Poor (Chunks Missing)': 'Partial Rebuild',
    'Failed (Water in Fireplace)': 'Full Crown Rebuild',
  };
  const urgency: Record<string, string> = {
    'Good (Minor Cracks)': 'Low — Next Season',
    'Fair (Surface Spalling)': 'Medium — Within 6 Months',
    'Poor (Chunks Missing)': 'High — Within 60 Days',
    'Failed (Water in Fireplace)': 'Critical — Immediate',
  };
  const baseCosts: Record<string, number> = {
    'Good (Minor Cracks)': 200,
    'Fair (Surface Spalling)': 500,
    'Poor (Chunks Missing)': 1200,
    'Failed (Water in Fireplace)': 2500,
  };
  const ageAdder: Record<string, number> = {
    'Under 10 Years': 0,
    '10–25 Years': 100,
    '25–40 Years': 300,
    '40+ Years': 600,
  };
  return {
    repairType: repairTypes[condition],
    urgency: urgency[condition],
    cost: baseCosts[condition] + ageAdder[age],
  };
}

export default function DFWChimneyCrownRepairGuide() {
  const [condition, setCondition] = useState('');
  const [age, setAge] = useState('');
  const result = condition && age ? getAssessment(condition, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🧱 DFW Chimney Crown Repair Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW storms drive significant rain — a failing chimney crown is one of the most overlooked sources of water intrusion in DFW homes.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏗️ What the Chimney Crown Does</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            The chimney crown is the concrete slab that caps the top of your chimney, sloping outward to direct rainwater away from the flue and masonry. Without a sound crown, DFW's heavy spring rains penetrate the flue, rot framing, damage firebox components, and accelerate brick spalling. It is the chimney’s first line of defense.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔍', title: 'Signs of Crown Failure', items: ['Hairline or wide cracks visible from ground', 'Chunks of concrete in fireplace or on roof', 'Water stains on firebox interior', 'Efflorescence on exterior chimney brick'] },
            { icon: '🛡️', title: 'Interim Fixes', items: ['Elastomeric sealant (CrownCoat, MasonrySaver) for minor cracks', 'Chimney cap if missing — prevents direct rain entry', 'Caulk around flue liner where crown meets liner', 'Only temporary — rebuild is eventual solution'] },
          ].map(section => (
            <div key={section.title} style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{section.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>{section.title}</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
                {section.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🔧 Repair vs. Rebuild</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { label: 'Elastomeric Sealant', when: 'Hairline cracks, crown structurally sound', cost: '$150–$350 DIY or pro', color: '#4ade80′ },
              { label: 'Resurfacing', when: 'Surface spalling but core intact', cost: '$400–$700', color: '#4ade80′ },
              { label: 'Partial Rebuild', when: 'Significant chunks missing, flue exposed', cost: '$800–$1,800', color: '#facc15′ },
              { label: 'Full Rebuild', when: 'Crown failed, active water intrusion', cost: '$1,800–$4,000', color: '#f87171′ },
            ].map(row => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 140px', gap: '1rem', alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem' }}>
                <span style={{ color: row.color, fontWeight: 600, fontSize: '0.9rem' }}>{row.label}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{row.when}</span>
                <span style={{ color: '#F5E642', fontSize: '0.85rem', textAlign: 'right' }}>{row.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Repair Estimator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Crown Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select condition</option>
                {crownConditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Chimney Age</label>
              <select value={age} onChange={e => setAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select age</option>
                {chimneyAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Repair Type</div>
                <div style={{ color: '#F5E642', fontSize: '0.95rem', fontWeight: 700 }}>{result.repairType}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Urgency</div>
                <div style={{ color: result.urgency.startsWith('Critical') ? '#f87171′ : result.urgency.startsWith(’High') ? '#fb923c' : result.urgency.startsWith('Medium') ? '#facc15′ : '#4ade80', fontSize: '0.95rem', fontWeight: 700 }}>{result.urgency}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Est. Cost</div>
                <div style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700 }}>${result.cost.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
