import { useState } from 'react';

const dogSizes = ['Small (under 25 lbs)', 'Medium (25–60 lbs)', 'Large (60–100 lbs)', 'XL/Giant (100+ lbs)'];
const yardConstraints = ['Small yard (<1,500 sqft)', 'Medium yard (1,500–4,000 sqft)', 'Large yard (4,000+ sqft)', 'HOA restrictions', 'Sloped terrain', 'DFW clay soil issues'];

const runSpecs: Record<string, { dimensions: string; surface: string; cooling: string; cost: string }> = {
  'Small (under 25 lbs)': { dimensions: '6ft × 10ft minimum', surface: 'Decomposed granite or artificial turf', cooling: 'Shade structure + water bowl station', cost: '$800–$2,500′ },
  'Medium (25–60 lbs)': { dimensions: '10ft × 20ft minimum', surface: 'Artificial turf with drainage layer', cooling: 'Shade sail + misting system', cost: '$2,000–$5,000′ },
  'Large (60–100 lbs)': { dimensions: '15ft × 30ft minimum', surface: 'Artificial turf with sub-base drainage', cooling: 'Covered structure + misting fan system', cost: '$4,000–$9,000′ },
  'XL/Giant (100+ lbs)': { dimensions: '20ft × 40ft+ minimum', surface: 'Artificial turf (extra thick) or large pea gravel', cooling: 'Full covered structure + misting system essential', cost: '$6,000–$15,000′ },
};

export default function DFWDogRunGuide() {
  const [dogSize, setDogSize] = useState('');
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleConstraint = (c: string) => {
    setSelectedConstraints(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const spec = dogSize ? runSpecs[dogSize] : null;
  const hasHOA = selectedConstraints.includes('HOA restrictions');
  const hasClay = selectedConstraints.includes('DFW clay soil issues');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642', fontWeight: 600 }}>
          🐕 DFW DOG RUN GUIDE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Dog Runs & Pet Enclosures in DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
          Building a dog run in DFW requires solving for extreme heat, clay soil drainage, and HOA approvals. Get it wrong and you have a useless hot box. Get it right and your dog has a year-round outdoor space.
        </p>

        <div style={{ backgroundColor: '#FF4444', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>⚠️ NEVER USE CONCRETE SURFACES IN DFW</div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '14px' }}>
            Concrete in DFW summer sun reaches 140°F+ surface temperature — this will burn your dog's paw pads within seconds. Concrete is not a dog run surface option in Texas summer conditions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            { icon: '🌡️', title: 'Shade is Non-Negotiable', desc: 'A dog run without 100% shade coverage in DFW is dangerous. Shade sails, pergolas, or solid roof cover must be part of every build.' },
            { icon: '💧', title: 'Misting Systems', desc: 'Low-pressure misting systems drop ambient temp 15–25°F. Cost: $150–$400 DIY or $400–$900 installed. Essential for DFW summers.' },
            { icon: '🌿', title: 'Artificial Turf vs Gravel', desc: 'Quality artificial turf with proper infill stays cooler than concrete and is easier on paws. Pea gravel is acceptable. Avoid dark-colored gravel.' },
            { icon: '🏗️', title: 'DFW Clay Soil Drainage', desc: 'Clay soil does not drain. Every dog run needs a sub-base of crushed granite or gravel with French drain outlet. Budget extra $500–$1,500 for drainage.' },
            { icon: '📋', title: 'HOA Approval', desc: 'Most DFW HOAs require approval for permanent structures. Submit plans before building. Many allow runs with specific material and color requirements.' },
            { icon: '🔒', title: 'Security & Containment', desc: 'Use 6-gauge welded wire or 4-gauge for large breeds. Bury fencing 12 inches underground or add L-footer to prevent digging escape.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '8px', fontSize: '15px' }}>{item.title}</div>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#F5E642′ }}>
            📐 Dog Run Size Calculator
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Dog size:</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {dogSizes.map(s => (
                <button key={s} onClick={() => { setDogSize(s); setShowResults(false); }}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                    backgroundColor: dogSize === s ? '#F5E642′ : '#1E3A5F',
                    color: dogSize === s ? '#0A1628′ : '#E8EAF0', fontWeight: 600 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Yard constraints (select all that apply):</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {yardConstraints.map(c => (
                <button key={c} onClick={() => toggleConstraint(c)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '2px solid',
                    borderColor: selectedConstraints.includes(c) ? '#F5E642′ : '#1E3A5F',
                    backgroundColor: selectedConstraints.includes(c) ? '#F5E64220′ : ’transparent',
                    color: '#E8EAF0', cursor: 'pointer', fontSize: '13px' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {dogSize && (
            <button onClick={() => setShowResults(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>
              Get Run Specification →
            </button>
          )}
        </div>

        {showResults && spec && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>Your DFW Dog Run Specification</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                { label: 'Minimum Dimensions', value: spec.dimensions },
                { label: 'Recommended Surface', value: spec.surface },
                { label: 'DFW Cooling Solution', value: spec.cooling },
                { label: 'Estimated Total Cost', value: spec.cost },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px', backgroundColor: '#112240', borderRadius: '8px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '14px' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, color: '#F5E642', textAlign: 'right', maxWidth: '55%' }}>{row.value}</span>
                </div>
              ))}
            </div>
            {hasHOA && (
              <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#F5E64210', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '14px' }}>
                📋 HOA detected: Request HOA approval in writing before purchasing materials. Plan for 2–6 week approval timeline.
              </div>
            )}
            {hasClay && (
              <div style={{ marginTop: '12px', padding: '14px', backgroundColor: '#FF444410', borderRadius: '8px', border: '1px solid #FF4444', fontSize: '14px' }}>
                🏗️ Clay soil: Add $800–$1,500 for drainage sub-base and French drain system. Non-negotiable for DFW clay.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
