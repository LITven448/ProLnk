import { useState } from 'react';

const situations = [
  { id: 'clay', label: '🏗️ Clay Soil Issues', title: 'Clay Soil & Foundation in DFW', items: ['DFW sits on expansive Blackland Prairie clay — most foundation-active soil in US', 'Clay expands when wet, shrinks when dry — creates up to 4" seasonal movement', 'Consistent watering during drought is the #1 prevention tool', 'Soaker hose systems: run 2-3 hrs every 3 days during summer drought', 'Maintain 6-12 inches of uniform moisture around perimeter', 'Avoid large trees within 20 ft of foundation — roots extract critical moisture'] },
  { id: 'watering', label: '💧 Watering Protocols', title: 'Foundation Watering Guide for DFW', items: ['Moisture meter: target 40-60% soil moisture at 6" depth around perimeter', 'Watering schedule: March-May (weekly), June-Sept (every 2-3 days), Oct (weekly)', 'Flat-rate soaker hose beats sprinklers for foundation moisture management', 'Watering too close = erosion; too far = ineffective — 18 inches from slab edge', 'Basement-free DFW homes are especially vulnerable to perimeter drying', 'Document watering history — helps engineers assess fault after settlement'] },
  { id: 'piers', label: '🔩 Pier Types', title: 'Foundation Pier Guide for DFW', items: ['Steel push piers: best for deep stable soils, $1,000-$1,500 per pier', 'Concrete pressed piles: common in DFW, fast install, $350-$600 per pier', 'Bell bottom piers: drilled, cast-in-place, excellent for DFW clay, $600-$900', 'Helical piers: great for tight access and additions, $800-$1,200 per pier', 'Average DFW repair: 8-16 piers for typical slab-on-grade home', 'Get engineer recommendation on pier type before signing any contract'] },
  { id: 'drainage', label: '🌊 Drainage Solutions', title: 'Drainage & Foundation Protection in DFW', items: ['Negative grade = water flows toward foundation — regrade or install drain', 'French drains redirect surface and subsurface water away from slab', 'Gutters with 6-ft+ downspout extensions are critical in DFW', 'DFW average rainfall: 37 inches/yr — plus flash flood events that saturate in hours', 'Interior drainage systems address water intrusion, not structural movement', 'City of Dallas has free drainage assessment programs in some areas'] },
  { id: 'engineer', label: '🧑‍💼 Engineer vs Contractor', title: 'Engineer vs Repair Company in DFW', items: ['Independent SE (structural engineer) report: $300-$600 — always worth it', 'Repair companies have financial incentive to recommend repairs — get neutral opinion first', 'TX SE license required for structural evaluations — verify at TBPE.texas.gov', 'Engineer will specify pier type, number, and placement — not the contractor', 'Some companies offer "free inspections" — these are sales visits, not evaluations', 'ProLnk can match you with licensed engineers in your DFW area'] },
  { id: 'warranty', label: '📋 Warranties & Insurance', title: 'Foundation Warranties & Insurance in DFW', items: ['Lifetime transferable warranty: look for this standard from reputable companies', 'Warranty covers pier installation, not future soil movement — understand the difference', 'TX homeowners insurance rarely covers gradual foundation movement', 'Some policies cover "sudden and accidental" damage — read your policy carefully', 'Plumbing leaks under slab often trigger foundation issues — may be covered', 'Document all cracks, dates, and photos — critical for insurance claims'] },
];

export default function DFWFoundationFinalGuide2026B() {
  const [selected, setSelected] = useState(situations[0].id);
  const active = situations.find(s => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>DFW Foundation Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Final Summary — All Resources by Situation</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#1e2d4a', color: selected === s.id ? '#0A1628' : '#cbd5e1', border: 'none', borderRadius: '8px', padding: '0.5rem 0.9rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#1e2d4a', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 {active.title}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {active.items.map((item, i) => (
              <li key={i} style={{ color: '#e2e8f0', padding: '0.6rem 0', borderBottom: i < active.items.length - 1 ? '1px solid #2d3f5e' : 'none', fontSize: '0.95rem' }}>
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: '#1e2d4a', borderRadius: '10px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.3rem' }}>🏠 ProLnk — Built for DFW Homeowners</p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>Find vetted foundation pros in your DFW area at prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
