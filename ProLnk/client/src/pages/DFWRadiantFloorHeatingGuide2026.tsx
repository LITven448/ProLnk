import { useState } from 'react';

export default function DFWRadiantFloorHeatingGuide2026() {
  const [roomType, setRoomType] = useState('');
  const [floorMaterial, setFloorMaterial] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!roomType || !floorMaterial) { setResult('Please fill in all fields.'); return; }
    if (floorMaterial === 'carpet') {
      setResult('🔴 Not compatible. Carpet insulates against radiant heat — you lose 60–80% efficiency. Radiant floor heating requires tile, stone, or engineered hardwood to transfer heat effectively. Consider heated towel rails or electric baseboard instead for carpeted rooms.');
      return;
    }
    if (roomType === 'bathroom' && (floorMaterial === 'tile' || floorMaterial === 'stone')) {
      setResult('✅ Best case for DFW radiant. Bathroom tile radiant is the #1 recommended application in DFW — small area, tile floor, high comfort value. Electric mat systems cost $600–$1,500 installed for typical bathroom. Payback is comfort-driven, not financial, given minimal DFW heating hours.');
      return;
    }
    if (roomType === 'whole-home') {
      setResult('🔴 Poor ROI for DFW. Full-home hydronic radiant costs $15,000–$40,000 installed. DFW averages 10–12 true heating days per year. System payback exceeds 40+ years. Recommend ducted HVAC for whole-home heating with radiant accent in bathrooms only.');
      return;
    }
    if (roomType === 'addition' || roomType === 'sunroom') {
      setResult('🟡 Possible fit. Additions without ductwork are good radiant candidates, especially if over tile or concrete slab. Electric mat: $8–$15/sqft. Hydronic: $15–$20/sqft. Verify your boiler or water heater can handle hydronic load if considering that option.');
      return;
    }
    setResult('🟡 Moderate fit. Evaluate the specific room size and floor area to confirm cost-effectiveness. Electric radiant mats are low-risk for small applications under 200 sqft.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Radiant Floor Heating Guide 2026</h1>
          <p style={{ color: '#a0aec0′ }}>Is radiant floor heating worth it in DFW? The honest answer.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '💧', title: 'Hydronic Radiant', desc: 'Hot water circulated through tubes under flooring. Most efficient long-term but high install cost ($15–$20/sqft). Requires boiler. Best for new construction or major renovation. Rare in DFW retrofits.' },
            { icon: '⚡', title: 'Electric Radiant Mats', desc: 'Heating cables under tile. Lower install cost ($8–$15/sqft), DIY-friendly for small areas. Higher operating cost than hydronic. Perfect for DFW bathrooms where usage is limited to cold mornings.' },
            { icon: '✅', title: 'Best DFW Applications', desc: 'Master bathroom tile ($600–$1,500), kitchen tile additions, mudrooms, sunrooms over slab. Limited use = low operating cost. Comfort payback is real even if financial ROI is slow.' },
            { icon: '❌', title: 'Poor DFW Applications', desc: 'Whole-home systems, carpeted rooms, rooms with existing efficient ductwork. DFW mild winters (avg 48°F December-February) make full radiant systems impractical compared to HVAC.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1rem' }}>{card.title}</h3>
              <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏠 Radiant Feasibility Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Room Type</label>
              <select value={roomType} onChange={e => setRoomType(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
                <option value=''>Select room</option>
                <option value='bathroom'>Bathroom</option>
                <option value='kitchen'>Kitchen</option>
                <option value='addition'>Home addition</option>
                <option value='sunroom'>Sunroom / enclosed patio</option>
                <option value='whole-home'>Whole home</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Floor Material</label>
              <select value={floorMaterial} onChange={e => setFloorMaterial(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
                <option value=''>Select material</option>
                <option value='tile'>Ceramic / porcelain tile</option>
                <option value='stone'>Natural stone</option>
                <option value='engineered-wood'>Engineered hardwood</option>
                <option value='laminate'>Laminate</option>
                <option value='carpet'>Carpet</option>
                <option value='concrete'>Concrete / polished slab</option>
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Check Feasibility
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💰 DFW Radiant Cost Reference</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[['Electric Mat (per sqft)', '$8–$15 installed'], ['Hydronic (per sqft)', '$15–$20 installed'], ['80 sqft Bathroom', '$640–$1,200'], ['200 sqft Kitchen', '$1,600–$3,000'], ['Boiler (hydronic only)', '$3,000–$8,000'], ['Thermostat Add-On', '$100–$250']].map(([label, val], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#a0aec0', fontSize: '0.75rem' }}>{label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4, fontSize: '0.875rem' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
