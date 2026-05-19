import { useState } from 'react';

const petTypes = ['Dog', 'Cat', 'Multiple Pets'];
const homeFeatures = ['Pool', 'Carpet Floors', 'Hardwood Floors', 'Large Yard', 'Small Yard', 'HOA'];

const priorityMap: Record<string, { priority: string; cost: string; urgency: string }[]> = {
  Dog: [
    { priority: 'HVAC backup system / thermostat alert', cost: '$300–$800', urgency: 'Critical' },
    { priority: 'Pet door installation with security flap', cost: '$200–$600', urgency: 'High' },
    { priority: 'LVP flooring replacement (scratch/accident resistant)', cost: '$3–$7/sqft', urgency: 'High' },
    { priority: 'Yard fencing audit for escape gaps', cost: '$500–$2,000', urgency: 'High' },
    { priority: 'Remove acorn-producing oaks or fence off', cost: '$150–$500', urgency: 'Medium' },
    { priority: 'Pet-safe landscaping audit (toxic plants)', cost: '$100–$300', urgency: 'Medium' },
  ],
  Cat: [
    { priority: 'Window screen reinforcement', cost: '$50–$200', urgency: 'High' },
    { priority: 'LVP flooring for easy cleanup', cost: '$3–$7/sqft', urgency: 'Medium' },
    { priority: 'Catio or outdoor enclosure', cost: '$500–$3,000', urgency: 'Medium' },
    { priority: 'HVAC thermostat alert system', cost: '$150–$400', urgency: 'High' },
    { priority: 'Pet-safe plant audit (lilies are toxic to cats)', cost: '$100–$250', urgency: 'High' },
  ],
  'Multiple Pets': [
    { priority: 'HVAC redundancy + smart thermostat alerts', cost: '$400–$1,200', urgency: 'Critical' },
    { priority: 'Full LVP flooring installation', cost: '$4–$8/sqft', urgency: 'High' },
    { priority: 'Heavy-duty fencing with dig guards', cost: '$1,500–$4,000', urgency: 'High' },
    { priority: 'Multiple pet doors with zoning', cost: '$400–$1,000', urgency: 'Medium' },
    { priority: 'Complete toxic plant removal', cost: '$200–$600', urgency: 'High' },
    { priority: 'Dedicated pet zone outdoor area', cost: '$800–$2,500', urgency: 'Medium' },
  ],
};

export default function DFWPetFriendlyHomeGuide() {
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const priorities = selectedPet ? priorityMap[selectedPet] || [] : [];
  const poolWarning = selectedFeatures.includes('Pool');
  const carpetWarning = selectedFeatures.includes('Carpet Floors');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642', fontWeight: 600 }}>
          🐾 DFW PET-FRIENDLY HOME GUIDE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Pet-Safe Homes in DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
          DFW summers kill pets in uncoorditioned homes within hours. HVAC failure is a life-threatening emergency for pets left indoors. Here is what every DFW pet owner must address.
        </p>

        <div style={{ backgroundColor: '#FF4444', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>⚠️ DFW HEAT DANGER — CRITICAL</div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Dallas summer highs regularly hit 105°F+. An HVAC failure while pets are home alone can reach lethal temperatures (104°F internal body temp) in under 3 hours. Smart thermostat alerts and backup cooling are not optional in DFW.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {[
            { icon: '🌡️', title: 'HVAC Failure Risk', desc: 'Install a smart thermostat with phone alerts. If temp exceeds 85°F indoors, you get a text. Under $300 installed.' },
            { icon: '🚪', title: 'Pet Door Installation', desc: 'Electronic pet doors with microchip lock — keeps wildlife out, lets your pet access a shaded area. $200–$600 installed.' },
            { icon: '🪵', title: 'LVP vs Hardwood', desc: 'Luxury vinyl plank is the DFW pet owner choice. Waterproof, scratch-resistant, easy cleanup. Hardwood warps with humidity and shows damage fast.' },
            { icon: '🌿', title: 'Texas Landscaping Hazards', desc: 'Texas live oaks drop acorns — toxic to dogs in quantity. Sago palms are highly toxic. Oleander is common in DFW and deadly to pets.' },
            { icon: '🏡', title: 'Fencing for Escape Artists', desc: 'DFW clay soil allows digging under fences. Add L-footer wire mesh along base. Check all gate latches for paw-accessible levers.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '16px', color: '#F5E642', marginBottom: '8px' }}>{item.title}</div>
              <p style={{ color: '#94A3B8', margin: 0, lineHeight: 1.5, fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#F5E642' }}>
            🔧 Pet-Proofing Priority Calculator
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>What pets do you have?</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {petTypes.map(p => (
                <button key={p} onClick={() => { setSelectedPet(p); setShowResults(false); }}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    backgroundColor: selectedPet === p ? '#F5E642' : '#1E3A5F',
                    color: selectedPet === p ? '#0A1628' : '#E8EAF0', fontWeight: 600 }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Current home features (select all that apply):</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {homeFeatures.map(f => (
                <button key={f} onClick={() => toggleFeature(f)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '2px solid',
                    borderColor: selectedFeatures.includes(f) ? '#F5E642' : '#1E3A5F',
                    backgroundColor: selectedFeatures.includes(f) ? '#F5E64220' : 'transparent',
                    color: '#E8EAF0', cursor: 'pointer', fontSize: '14px' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {selectedPet && (
            <button onClick={() => setShowResults(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>
              Generate Priority List →
            </button>
          )}
        </div>

        {showResults && priorities.length > 0 && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>Your Pet-Proofing Priorities</h3>
            {poolWarning && (
              <div style={{ backgroundColor: '#FF444420', border: '1px solid #FF4444', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '14px' }}>
                ⚠️ Pool detected: Install a pool safety net or fence immediately. Pets and young children drown in DFW pools every year.
              </div>
            )}
            {carpetWarning && (
              <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E642', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '14px' }}>
                💡 Carpet + pets = ongoing battle. Budget for LVP replacement — it will pay for itself in cleaning costs within 2 years.
              </div>
            )}
            {priorities.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < priorities.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
                <div>
                  <span style={{ color: item.urgency === 'Critical' ? '#FF4444' : item.urgency === 'High' ? '#F5E642' : '#94A3B8', fontWeight: 700, fontSize: '12px', marginRight: '10px' }}>
                    {item.urgency.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '15px' }}>{item.priority}</span>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '16px' }}>{item.cost}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
