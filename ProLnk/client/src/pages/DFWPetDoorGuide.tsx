import { useState } from 'react';

const PET_SIZES = ['Small (under 15 lbs)','Medium (15-50 lbs)','Large (50-100 lbs)','Extra Large (100+ lbs)'];
const LOCATIONS = ['Sliding glass door','In-door (cut through door panel)','Through exterior wall','Garage door'];
const CLIMATE_CONCERNS = ['Minimize AC loss (summer priority)','Minimize heat loss (winter)','Both equally important','Low priority'];

interface PetDoorResult { recommended: string; size: string; insulation: string; energy: string; electronic: string; hoa: string; cost: string; }

function getResult(petSize: string, location: string, climate: string): PetDoorResult {
  const large = petSize.includes('Large') || petSize.includes('Extra');
  const wall = location.includes('wall');
  const highEnergy = !climate.includes('Low');
  return {
    recommended: wall ? (large ? 'Wall-mounted XL double-flap insulated door' : 'Wall-mounted insulated door with tunnel liner') : (large ? 'Panel insert for sliding door — XL with double flap' : 'In-door or panel insert with magnetic seal'),
    size: petSize.includes('Small') ? '6x7 inch opening' : petSize.includes('Medium') ? '8x12 inch opening' : petSize.includes('Large') ? '10x15 inch opening' : '12x18 inch or larger opening',
    insulation: highEnergy ? 'Double-flap magnetic seal critical in DFW. Single-flap doors lose significant cooling in 100F+ summers. Look for Energy Star rated pet doors with R-value of 2.0 or higher.' : 'Standard single-flap acceptable for low-concern households. Magnetic closure recommended at minimum.',
    energy: 'DFW testing shows uninsulated pet doors add 8-12% to summer cooling costs for medium to large openings. Double-flap with magnetic seal reduces this to 2-4%.',
    electronic: large ? 'Electronic/microchip doors recommended for large breeds — prevents raccoons and wildlife from entering. DFW has significant wildlife pressure including coyotes, opossums, and raccoons.' : 'Electronic doors optional for small pets. RFID collar tag activates door only for your pet — wildlife-proof.',
    hoa: 'Most DFW HOAs have no restrictions on pet doors not visible from street. Wall installations require building permit in most cities if opening exceeds 3 inches (structural modification). Check with city building department.',
    cost: wall ? '$800-$2,500 installed (wall installation requires framing, flashing, and finish work)' : '$150-$600 for panel insert or in-door installation',
  };
}

export default function DFWPetDoorGuide() {
  const [petSize, setPetSize] = useState('');
  const [location, setLocation] = useState('');
  const [climate, setClimate] = useState('');
  const [result, setResult] = useState<PetDoorResult|null>(null);

  function calculate() {
    if (!petSize || !location || !climate) return;
    setResult(getResult(petSize, location, climate));
  }

  const comparisons = [
    { type: 'Sliding Door Panel Insert', pros: 'No cutting, removable, affordable', cons: 'Limits door use, panel can warp in DFW heat', cost: '$80-$350' },
    { type: 'In-Door Installation', pros: 'Door still fully functional, clean look', cons: 'Permanent modification, reduces door insulation', cost: '$200-$600 installed' },
    { type: 'Through-Wall Installation', pros: 'Best location flexibility, permanent', cons: 'Most expensive, requires permit, structural work', cost: '$600-$2,500 installed' },
    { type: 'Electronic/Microchip Door', pros: 'Wildlife-proof, only your pet enters', cons: 'Higher cost, battery dependency', cost: '$200-$800 for unit alone' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Pet Door Installation Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 32, fontSize: 16 }}>DFW heat makes pet door selection critical — the wrong door can add hundreds to your annual energy bill.</p>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Pet Door Type Comparison</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {comparisons.map(c => (
              <div key={c.type} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'grid', gridTemplateColumns: '180px 1fr 1fr auto', gap: 12, alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.type}</div>
                <div style={{ color: '#4CAF50', fontSize: 12 }}>✅ {c.pros}</div>
                <div style={{ color: '#FF6B6B', fontSize: 12 }}>⚠️ {c.cons}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{c.cost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Pet Size', value: petSize, setter: setPetSize, options: PET_SIZES },
              { label: 'Installation Location', value: location, setter: setLocation, options: LOCATIONS },
              { label: 'DFW Climate Concern', value: climate, setter: setClimate, options: CLIMATE_CONCERNS },
            ].map(field => (
              <div key={field.label}>
                <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>{field.label}</label>
                <select value={field.value} onChange={e => field.setter(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                  <option value=''>Select...</option>
                  {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get Pet Door Recommendation</button>
        </div>

        {result && (
          <div style={{ background: '#0D2137', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🐾 Your Pet Door Recommendation</h3>
            {[
              { label: '🚪 Recommended Door', value: result.recommended },
              { label: '📐 Opening Size Needed', value: result.size },
              { label: '❄️ Insulation Rating', value: result.insulation },
              { label: '💡 DFW Energy Impact', value: result.energy },
              { label: '📡 Electronic Option', value: result.electronic },
              { label: '📋 HOA & Permits', value: result.hoa },
              { label: '💰 Installed Cost', value: result.cost },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #1E3050' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
