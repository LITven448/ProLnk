import { useState } from 'react';

export default function DFWCompostingGuide2026() {
  const [wasteType, setWasteType] = useState('mixed');

  const getMethod = () => {
    if (wasteType === 'leaves') return { method: 'Leaf Mold Composting', timeline: '6–12 months', note: 'DFW produces massive leaf drops in Nov–Dec. Pile leaves 3 ft deep, keep moist — DFW winter temperatures are perfect for slow decomposition' };
    if (wasteType === 'kitchen') return { method: 'Hot Composting Bin', timeline: '4–8 weeks in DFW summer', note: 'DFW summer heat accelerates composting dramatically — turn pile weekly, keep moist, aim for 130–160°F internal temp' };
    if (wasteType === 'mixed') return { method: 'Hot Composting (Brown + Green Mix)', timeline: '6–10 weeks', note: 'Mix 3 parts brown (leaves/cardboard) to 1 part green (kitchen scraps). DFW heat + this ratio = fast compost — add water weekly in summer' };
    if (wasteType === 'grass') return { method: 'Grasscycle + Bin Compost', timeline: '4–8 weeks', note: 'Leave clippings on lawn (grasscycling) or hot compost in bins. DFW bermuda and St. Augustine produce nitrogen-rich green material' };
    return { method: 'Vermicomposting (Worm Bin)', timeline: '4–6 weeks', note: 'Keep worm bin in shade or garage — DFW summer heat above 90°F kills worms. Great for kitchen scraps with no outdoor space' };
  };

  const method = getMethod();

  const tips = [
    { title: 'DFW Clay Soil Fix', icon: '🏺', desc: 'Add 2–3 inches of compost to DFW clay soil annually — dramatically improves drainage and root penetration' },
    { title: 'Fire Ant Warning', icon: '🐜', desc: 'Do NOT compost meat, dairy, or oily foods in DFW — fire ants will invade your pile' },
    { title: 'Summer Heat = Speed', icon: '🌡️', desc: 'DFW summer heat (95–105°F) can cut composting time in half vs. northern states' },
    { title: 'Fall Leaf Windfall', icon: '🍂', desc: 'DFW oak and pecan leaf drop (Nov–Dec) is your biggest free brown material source' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px' }}>♻️</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '8px 0 4px' }}>DFW Composting Guide 2026</h1>
          <p style={{ color: '#8899aa', margin: 0 }}>Backyard composting in DFW — fix clay soil and cut yard waste with free homemade compost</p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ margin: 0, color: '#F5E642' }}>⚡ DFW Key Fact: DFW summer heat (95–105°F) supercharges hot composting — what takes 6 months in Minnesota takes 6–8 weeks in a DFW summer. Use it to your advantage.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {tips.map(t => (
            <div key={t.title} style={{ background: '#111d30', borderRadius: '8px', padding: '16px', border: '1px solid #1e3050' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '6px' }}>{t.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#ccc' }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Composting Method Recommendation Tool</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#8899aa', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Primary Yard Waste Type</label>
            <select value={wasteType} onChange={e => setWasteType(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0A1628', color: '#fff', border: '1px solid #1e3050', borderRadius: '6px' }}>
              <option value="mixed">Mixed (leaves + kitchen scraps)</option>
              <option value="leaves">Mostly leaves and yard trimmings</option>
              <option value="kitchen">Mostly kitchen scraps</option>
              <option value="grass">Mostly grass clippings</option>
              <option value="small">Small yard / no outdoor space</option>
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Recommended: {method.method}</div>
            <div style={{ color: '#8899aa', fontSize: '0.85rem', marginBottom: '8px' }}>⏱️ Timeline: {method.timeline}</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{method.note}</div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🚫 DFW Do NOT Compost List</h3>
          {['Meat or fish scraps — immediate fire ant and pest magnet in DFW', 'Dairy products — same issue, attract raccoons and possums', 'Oily or greasy foods — disrupts pile moisture balance', 'Diseased plants — pathogens survive composting in DFW heat', 'Pet waste — disease risk, not safe for edible garden use'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#ccc', fontSize: '0.9rem' }}>🚫 {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
