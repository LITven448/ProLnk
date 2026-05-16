import { useState } from 'react';

const GARAGE_SIZES = [
  { id: 'single', label: 'Single Car (250 sq ft)', sqFt: 250 },
  { id: 'double', label: 'Double Car (500 sq ft)', sqFt: 500 },
  { id: 'oversized', label: 'Oversized (700 sq ft)', sqFt: 700 },
];

const USE_TYPES = [
  { id: 'bedroom', label: '🛏️ Bedroom / In-Law Suite', costBase: 45, roi: 70 },
  { id: 'gym', label: '🏋️ Home Gym', costBase: 20, roi: 50 },
  { id: 'office', label: '💼 Home Office', costBase: 30, roi: 60 },
  { id: 'inlaw', label: '🏡 Full In-Law Suite + Bath', costBase: 65, roi: 85 },
];

const HVAC_SITUATIONS = [
  { id: 'extend', label: 'Extend existing system', costAdder: 3000 },
  { id: 'minisplit', label: 'Add mini-split (recommended)', costAdder: 4500 },
  { id: 'none', label: 'No HVAC yet', costAdder: 7000 },
];

export default function DFWGarageConversionGuide2026() {
  const [garageSize, setGarageSize] = useState('double');
  const [useType, setUseType] = useState('office');
  const [hvac, setHvac] = useState('minisplit');

  const selectedGarage = GARAGE_SIZES.find(g => g.id === garageSize)!;
  const selectedUse = USE_TYPES.find(u => u.id === useType)!;
  const selectedHvac = HVAC_SITUATIONS.find(h => h.id === hvac)!;

  const baseCost = selectedGarage.sqFt * selectedUse.costBase;
  const totalLow = Math.round((baseCost + selectedHvac.costAdder) * 0.9);
  const totalHigh = Math.round((baseCost + selectedHvac.costAdder) * 1.2);
  const roiNote = `~${selectedUse.roi}% of cost recovered at resale`;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ backgroundColor: '#0D1E38', borderBottom: '3px solid #F5E642', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME IMPROVEMENT GUIDE 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>Garage Conversion Guide — DFW 2026</h1>
          <p style={{ color: '#A0AABE', fontSize: 16, margin: 0, maxWidth: 600 }}>Convert your garage into livable space — costs, permits, HVAC requirements, and HOA rules specific to Dallas–Fort Worth.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🚗 Why Convert?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { icon: '💰', title: 'Cost vs. Addition', body: '$15K–$50K vs. $90K+ for a full room addition' },
              { icon: '⚡', title: 'Faster Build', body: '4–10 weeks vs. 4–6 months for new construction' },
              { icon: '🔄', title: 'Reversible', body: 'Can be converted back if selling — minimal structural change' },
              { icon: '📈', title: 'ROI', body: '50–85% of cost recovered at resale depending on use' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8090A8', fontSize: 13 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🌡️ HVAC — The #1 DFW Concern</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#CBD5E0', lineHeight: 1.7, marginBottom: 16 }}>DFW summers routinely hit 100–110°F. An uninsulated garage reaches 140°F. Proper HVAC is non-negotiable. Minimum insulation: R-19 for walls, R-30 for ceiling.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '❄️', label: 'Mini-Split (Recommended)', note: 'Independent zone, energy efficient, $3,000–$6,000 installed' },
                { icon: '🌀', label: 'Extend Central HVAC', note: 'Cheaper upfront but strains existing system, $2,000–$4,000' },
                { icon: '🔥', label: 'R-19 Minimum Wall Insulation', note: 'DFW code minimum for garage conversions, spray foam preferred' },
                { icon: '🪟', label: 'Radiant Barrier', note: 'Add to roof decking — reduces attic temp 20–30°F, ~$1,500' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#162840', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#8090A8', fontSize: 12 }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏘️ HOA Restrictions</h2>
          <div style={{ backgroundColor: '#0D1E38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#A0AABE', marginBottom: 16, fontSize: 14 }}>Many DFW HOAs require that you maintain garage appearance — including the door — even after conversion. Always check your CC&Rs before starting.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                '✅ Permit required: All DFW cities require a building permit for garage conversions',
                '⚠️ Garage door facade: Many HOAs require keeping the door in place (can install faux door)',
                '⚠️ Parking requirements: Some cities require 2 off-street spaces — verify before converting',
                '⚠️ Rental use: Converting for rental ADU may require additional permits or be prohibited by HOA',
                '✅ Reversibility: No structural changes typically required — conversion is usually cosmetic',
              ].map(item => (
                <div key={item} style={{ backgroundColor: '#162840', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#CBD5E0' }}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 40, backgroundColor: '#0D1E38', border: '2px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 Conversion Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Garage Size</label>
              <select value={garageSize} onChange={e => setGarageSize(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {GARAGE_SIZES.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Intended Use</label>
              <select value={useType} onChange={e => setUseType(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {USE_TYPES.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AABE', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>HVAC Situation</label>
              <select value={hvac} onChange={e => setHvac(e.target.value)} style={{ width: '100%', backgroundColor: '#162840', border: '1px solid #2A4870', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 }}>
                {HVAC_SITUATIONS.map(h => <option key={h.id} value={h.id}>{h.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>ESTIMATED COST</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${totalLow.toLocaleString()}–${totalHigh.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>TIMELINE</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>4–10 weeks</div>
            </div>
            <div style={{ backgroundColor: '#162840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#A0AABE', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>ROI ESTIMATE</div>
              <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 700 }}>{roiNote}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
