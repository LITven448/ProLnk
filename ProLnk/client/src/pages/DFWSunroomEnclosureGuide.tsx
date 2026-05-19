import { useState } from 'react';

const ENCLOSURE_TYPES = [
  { id: 'screen', label: '🪲 Screen Room', costPerSqFt: 30, seasons: 1, insulated: false, permit: 'Simple building permit', note: 'Keeps bugs out — still hot in DFW summer' },
  { id: 'three_season', label: '🌤️ 3-Season Room', costPerSqFt: 80, seasons: 3, insulated: false, permit: 'Building + electrical permit', note: 'Glass panels, no HVAC — unusable June–Sept in DFW' },
  { id: 'four_season', label: '❄️ 4-Season Sunroom', costPerSqFt: 180, seasons: 4, insulated: true, permit: 'Full building, HVAC, electrical permits', note: 'Insulated + HVAC — the only DFW-viable option year-round' },
];

const PATIO_SIZES = [
  { id: 'small', label: 'Small (100 sq ft)', sqFt: 100 },
  { id: 'medium', label: 'Medium (200 sq ft)', sqFt: 200 },
  { id: 'large', label: 'Large (350 sq ft)', sqFt: 350 },
  { id: 'xl', label: 'XL (500+ sq ft)', sqFt: 500 },
];

const BUDGETS = [
  { id: 'economy', label: 'Economy (minimize cost)', multiplier: 0.85 },
  { id: 'standard', label: 'Standard', multiplier: 1.0 },
  { id: 'premium', label: 'Premium (Low-E glass, full finishes)', multiplier: 1.4 },
];

export default function DFWSunroomEnclosureGuide() {
  const [enclosureType, setEnclosureType] = useState('four_season');
  const [patioSize, setPatioSize] = useState('medium');
  const [budgetLevel, setBudgetLevel] = useState('standard');

  const selected = ENCLOSURE_TYPES.find(e => e.id === enclosureType)!;
  const patio = PATIO_SIZES.find(p => p.id === patioSize)!;
  const budgetMod = BUDGETS.find(b => b.id === budgetLevel)!;

  const costLow = Math.round(selected.costPerSqFt * patio.sqFt * budgetMod.multiplier * 0.9);
  const costHigh = Math.round(selected.costPerSqFt * patio.sqFt * budgetMod.multiplier * 1.15);
  const energyImpact = selected.insulated ? 'Minimal if Low-E glass used' : 'High — summer AC load increases 15–25%';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: '#0D1E38', borderBottom: '3px solid #F5E642', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME IMPROVEMENT GUIDE 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Sunroom & Patio Enclosure Guide — DFW</h1>
          <p style={{ color: '#A0AABE', fontSize: 16, margin: 0, maxWidth: 620 }}>Screen room, 3-season, or 4-season? Here's why DFW’s climate makes this decision critical — and what each option really costs.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🌡️ The DFW Heat Reality Check</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#CBD5E0', lineHeight: 1.7, marginBottom: 16 }}>DFW averages 19 days over 100°F annually. An uninsulated patio enclosure becomes a greenhouse — easily reaching 130–140°F interior temps. If you want year-round use, a 4-season insulated room is not a luxury. It's the minimum viable product.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { season: 'Summer', temp: '100–110°F outside', note: 'Uninsulated rooms unusable without HVAC' },
                { season: 'Spring/Fall', temp: '65–85°F outside', note: 'Perfect for screen rooms and 3-season' },
                { season: 'Winter', temp: '20–50°F outside', note: 'Cold snaps hit hard — 3-season inadequate' },
              ].map(item => (
                <div key={item.season} style={{ backgroundColor: '#162840', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.season}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{item.temp}</div>
                  <div style={{ color: '#8090A8', fontSize: 12 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🪟 Enclosure Types Compared</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ENCLOSURE_TYPES.map(type => (
              <div key={type.id} onClick={() => setEnclosureType(type.id)} style={{ backgroundColor: '#0D1E38', border: `2px solid ${enclosureType === type.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{type.label}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>${type.costPerSqFt}/sq ft</span>
                </div>
                <div style={{ color: '#A0AABE', fontSize: 13, marginBottom: 6 }}>{type.note}</div>
                <div style={{ color: '#8090A8', fontSize: 12 }}>Permits: {type.permit}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔬 Low-E Glass — Essential in DFW</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#A0AABE', marginBottom: 16, fontSize: 14 }}>Low-emissivity (Low-E) glass blocks 50–75% of solar heat gain while allowing full light transmission. For a DFW sunroom, this is not optional — standard glass turns your sunroom into an oven.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { stat: '50–75%', label: 'Solar heat blocked', icon: '☀️' },
                { stat: '+$15–25/sqft', label: 'Additional glass cost', icon: '💰' },
                { stat: '20–30%', label: 'AC savings vs standard glass', icon: '❄️' },
                { stat: '2–4 yrs', label: 'Payback period from energy savings', icon: '📅' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#162840', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{item.stat}</div>
                  <div style={{ color: '#8090A8', fontSize: 12 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40, backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 Sunroom Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Enclosure Type</label>
              <select value={enclosureType} onChange={e => setEnclosureType(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {ENCLOSURE_TYPES.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Patio Size</label>
              <select value={patioSize} onChange={e => setPatioSize(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {PATIO_SIZES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Budget Level</label>
              <select value={budgetLevel} onChange={e => setBudgetLevel(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {BUDGETS.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>ESTIMATED COST</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${costLow.toLocaleString()}–${costHigh.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>USABLE SEASONS</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{selected.seasons === 4 ? 'Year-Round' : selected.seasons === 3 ? '3 Seasons' : '2 Seasons'}</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>ENERGY IMPACT</div>
              <div style={{ color: selected.insulated ? '#4CAF50′ : '#F56565', fontSize: 13, fontWeight: 700 }}>{energyImpact}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
