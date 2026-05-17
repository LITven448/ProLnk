import { useState } from 'react';

export default function DFWFoundationAdjacentTree2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'large_oak', label: 'Large oak within 20 ft' },
    { id: 'elm_row', label: 'Elm trees along fence line' },
    { id: 'dying_tree', label: 'Dying/removed tree nearby' },
    { id: 'new_planting', label: 'Planning to plant a tree' },
  ];

  const guides: Record<string, { risk: string; color: string; steps: string[] }> = {
    large_oak: { risk: 'HIGH', color: '#ef4444', steps: ['🔴 Root zone may extend 40-60 ft — well under your slab', '🔴 DFW clay shrinks as oak extracts moisture in summer', '🔴 Check Oak Wilt status — dying root system causes rapid rehydration heave', '🔴 Get a structural engineer evaluation now', '✅ Monitor interior doors and windows for sticking seasonally'] },
    elm_row: { risk: 'MEDIUM', color: '#f97316', steps: ['🟡 Elm roots spread aggressively in DFW clay', '🟡 Check for utility intrusion (roots follow water lines)', '🟡 Have a plumber scope your sewer line for root infiltration', '✅ Keep soil moisture consistent near foundation with drip irrigation', '✅ Root barrier installation may help if < 10 ft away'] },
    dying_tree: { risk: 'HIGH', color: '#ef4444', steps: ['🔴 Dying roots stop extracting moisture — DFW clay REHYDRATES', '🔴 This can cause foundation heave (upward movement)', '🔴 Heave is often worse than settlement in DFW', '🔴 Document all cracks NOW before removal — baseline for claims', '✅ Slow stump decomposition preferred over rapid removal'] },
    new_planting: { risk: 'LOW', color: '#22c55e', steps: ['✅ Keep any large tree 20+ ft from foundation', '✅ For medium trees (redbuds, crepe myrtles) stay 10-15 ft away', '✅ Avoid willows, cottonwoods, silver maples near DFW homes', '✅ Native DFW trees (Texas Ash, Cedar Elm) have more predictable root behavior', '✅ Install root barriers during planting if within 15 ft'] },
  };

  const handleSituation = (id: string) => {
    setSituation(id);
    setResult(id);
  };

  const current = guides[result];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🌳 DFW Foundation and Nearby Tree Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>How trees interact with DFW expansive clay foundations and what to watch for.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🌱 Root System Facts for DFW</div>
          {[
            { icon: '📏', fact: 'Root spread is 2-3x canopy width in DFW clay — a 20 ft wide oak has roots reaching 40-60 ft.' },
            { icon: '💧', fact: 'Trees extract 50-150 gallons/day from soil — this dries and shrinks DFW clay causing settlement.' },
            { icon: '🚰', fact: 'Roots follow water lines — plumbing leaks attract roots and lead to sewer line intrusion.' },
            { icon: '⚠️', fact: 'Oak Wilt kills root system — rehydration of dried clay after tree death causes foundation heave.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
              <span>{item.icon}</span><span>{item.fact}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 My Tree Situation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {situations.map((s) => (
              <button key={s.id} onClick={() => handleSituation(s.id)} style={{ backgroundColor: situation === s.id ? '#F5E642' : '#1a2f50', color: situation === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</button>
            ))}
          </div>
          {current && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: current.color, fontWeight: 700, marginBottom: '0.75rem' }}>Risk Level: {current.risk}</div>
              {current.steps.map((step, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{step}</div>)}
              <div style={{ marginTop: '1rem', color: '#F5E642', fontSize: '0.85rem' }}>ProLnk matches you with DFW foundation specialists who understand clay + tree dynamics. 🏗️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
