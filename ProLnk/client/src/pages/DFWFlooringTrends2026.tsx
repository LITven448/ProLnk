import { useState } from 'react';

const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Basement/Bonus Room'];
const budgets = ['Under $3/sqft', '$3–6/sqft', '$6–12/sqft', '$12+/sqft'];

const matrix: Record<string, Record<string, string>> = {
  'Living Room': { 'Under $3/sqft': 'LVP (luxury vinyl plank) — waterproof, durable, realistic wood look. Top DFW pick.', '$3–6/sqft': 'Higher-grade LVP with attached underlayment or entry-level engineered hardwood.', '$6–12/sqft': 'Engineered hardwood (white oak or hickory) — resurgence in DFW luxury segment.', '$12+/sqft': 'Solid hardwood or wide-plank European white oak. Statement flooring.' },
  'Bedroom': { 'Under $3/sqft': 'Budget carpet (Shaw or Mohawk) — comfort focus. Carpet retreating to bedrooms only in DFW.', '$3–6/sqft': 'Mid-grade carpet or LVP for carpet-free preference.', '$6–12/sqft': 'Engineered hardwood matching living areas for cohesive flow.', '$12+/sqft': 'Premium carpet (wool blend) or wide-plank solid hardwood.' },
  'Kitchen': { 'Under $3/sqft': 'Sheet vinyl or entry LVP — LVP dominates 95% of new build kitchens in DFW.', '$3–6/sqft': 'Commercial-grade LVP with rigid core (waterproof critical in kitchen).', '$6–12/sqft': 'Large-format porcelain tile (24x24) — trending in DFW kitchens 2026.', '$12+/sqft': 'Slab porcelain or stone tile for high-end kitchens.' },
  'Bathroom': { 'Under $3/sqft': 'Ceramic tile (12x12 or 18x18) — still functional and affordable.', '$3–6/sqft': 'Porcelain tile (non-slip rated) — preferred for baths.', '$6–12/sqft': 'Large-format porcelain (24x24 or 12x24) — top DFW bath trend 2026.', '$12+/sqft': '4×8 ft slab tile (Porcelanosa or equivalent) — luxury DFW baths.' },
  'Basement/Bonus Room': { 'Under $3/sqft': 'LVP — 100% waterproof, handles Texas humidity and slab shifts.', '$3–6/sqft': 'Higher-grade waterproof LVP or rigid core SPC.', '$6–12/sqft': 'Engineered hardwood over LVP if moisture-controlled.', '$12+/sqft': 'Polished concrete with area rugs — trending in DFW open bonus rooms.' },
};

export default function DFWFlooringTrends2026() {
  const [room, setRoom] = useState('');
  const [budget, setBudget] = useState('');
  const rec = room && budget ? matrix[room]?.[budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🪵</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Flooring Trends 2026</h1>
          <p style={{ color: '#94a3b8′ }}>What’s going on DFW floors right now</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 DFW Flooring Market 2026</h2>
          {[
            ['🏆', 'LVP dominates — 95% of new DFW builds', 'Rigid core SPC waterproof LVP is the standard. Shaw, COREtec, LifeProof lead.'],
            ['🌳', 'Hardwood resurgence in luxury segment', 'White oak and hickory engineered hardwood up 30% in $600K+ DFW homes.'],
            ['🏺', 'Large format tile in baths', '24x24 and 12x24 tiles replacing 12x12. Grout lines minimized for slab look.'],
            ['🛋️', 'Carpet retreating to bedrooms only', 'DFW homeowners removing carpet from living areas — LVP or tile replacing.'],
            ['✨', 'Polished concrete gaining interest', 'Open floor plan bonus rooms and garages getting epoxy or polished concrete.'],
          ].map(([icon, title, sub], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8′ }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Room + Budget → Flooring Recommendation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Room Type</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {rooms.map(r => <button key={r} onClick={() => setRoom(r)} style={{ background: room === r ? '#F5E642′ : '#1a3050', color: room === r ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 6, padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>{r}</button>)}
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Budget per Sq Ft (installed)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {budgets.map(b => <button key={b} onClick={() => setBudget(b)} style={{ background: budget === b ? '#F5E642′ : '#1a3050', color: budget === b ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 6, padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>{b}</button>)}
            </div>
          </div>
          {rec && <div style={{ background: '#1a3050', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642', color: '#cbd5e1', fontSize: '0.92rem' }}>✅ {rec}</div>}
          {!rec && room && budget && <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select both room and budget for a recommendation.</div>}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Service Professionals
        </div>
      </div>
    </div>
  );
}