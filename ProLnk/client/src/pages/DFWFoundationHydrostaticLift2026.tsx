import { useState } from 'react';

const locations = [
  { id: 'trinity', label: 'Near Trinity River', icon: '🌊' },
  { id: 'pool', label: 'Joe Pool / Lewisville Lake Area', icon: '🏞️' },
  { id: 'swpool', label: 'Swimming Pool on Property', icon: '🏊' },
  { id: 'lowland', label: 'Low-Lying or Flood Zone Lot', icon: '📍' },
];

const riskMap: Record<string, { level: string; color: string; detail: string }> = {
  trinity: { level: 'Elevated Risk', color: '#f59e0b', detail: 'Trinity River corridor has historically high water tables, especially after heavy rain. Homes within 1 mile can experience hydrostatic pressure on foundation slabs and walls during prolonged wet seasons.' },
  pool: { level: 'Moderate Risk', color: '#f59e0b', detail: 'Joe Pool and Lewisville Lake areas have variable water tables tied to lake levels. During high water periods, nearby homes — especially with basements or deep piers — can experience uplift pressure.' },
  swpool: { level: 'Critical: Empty Pool Risk', color: '#ef4444', detail: 'NEVER leave a DFW pool empty during high water table conditions. An empty fiberglass or gunite pool can pop out of the ground (uplift) when surrounding soil is saturated. Always consult your pool contractor before draining.' },
  lowland: { level: 'High Risk Zone', color: '#ef4444', detail: 'Low-lying lots in DFW collect and retain groundwater. Hydrostatic pressure builds against slab edges and pier holes. Signs: doors sticking, floor humps, and water intrusion at slab perimeter after major rain events.' },
  default: { level: 'Select Location', color: '#64748b', detail: 'Choose the option that best describes your DFW property location to assess your hydrostatic uplift risk.' },
};

export default function DFWFoundationHydrostaticLift2026() {
  const [selected, setSelected] = useState<string>('');

  const result = selected ? (riskMap[selected] || riskMap['default']) : riskMap['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌊</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Hydrostatic Uplift on Foundation Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>
          Water pressure from the ground can push DFW foundations upward. Rare, but real — especially near rivers, lakes, and on low-lying lots.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏗️ Why DFW Rarely Has Basements</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            DFW's expansive clay soil and periodic high water tables make basements impractical. Hydrostatic uplift — water pressure pushing up from saturated soil — can compromise waterproofing and structural integrity. Most DFW builders use slab-on-grade or pier-and-beam foundations to avoid this risk.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📍 Your Property Location</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {locations.map(loc => (
            <button key={loc.id} onClick={() => setSelected(loc.id)} style={{ background: selected === loc.id ? '#F5E642′ : '#1a2f4e', color: selected === loc.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === loc.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: ’pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ marginRight: 8 }}>{loc.icon}</span>{loc.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f4e', borderRadius: 12, padding: 22, borderLeft: `4px solid ${result.color}`, marginBottom: 24 }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{result.level}</div>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{result.detail}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['Warning Signs', '🚨', 'Floor humps, sticking doors, slab cracks near perimeter, water at slab edge after rain'], ['Prevention', '🛡️', 'Proper lot grading, perimeter drains, sump systems in crawlspaces, avoid draining pools when soil is saturated']].map(([title, icon, text]) => (
            <div key={title as string} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 15 }}>{icon} {title}</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2f4e', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 15 }}>💡 Pool Owners: Critical Rule</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>Always consult a pool professional before draining your DFW pool. If the water table is high from recent heavy rain, an empty pool shell can pop out of the ground — a catastrophic and expensive failure.</p>
        </div>

        <p style={{ color: '#475569', fontSize: 12, marginTop: 24, textAlign: 'center' }}>ProLnk DFW Home Intelligence · 2026</p>
      </div>
    </div>
  );
}