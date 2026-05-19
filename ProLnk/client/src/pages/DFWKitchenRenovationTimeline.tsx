import { useState } from 'react';

const phases = [
  { weeks: 'Week 1–2', label: 'Design & Planning', tasks: ['Finalize layout with designer', 'Select cabinets, countertops, tile', 'Submit permit application'], note: 'DFW permit offices: Dallas 10–14 days, Frisco 7–10 days, Plano 7–14 days' },
  { weeks: 'Week 3–4', label: 'Permits & Ordering', tasks: ['Receive permit (or wait)', 'Order cabinets (4–8 week lead time)', 'Order countertops (2–3 weeks)'], note: 'Order custom cabinets immediately — DFW suppliers often backlogged 6–8 weeks' },
  { weeks: 'Week 5–6', label: 'Demo & Rough Work', tasks: ['Demo existing kitchen', 'Rough plumbing & electrical', 'Drywall & insulation'], note: 'DFW summers can delay inspections by 2–3 days — schedule AM inspections' },
  { weeks: 'Week 7–8', label: 'Cabinets & Rough Finish', tasks: ['Cabinet installation', 'Countertop template measure', 'Backsplash prep'], note: 'Countertop fabrication starts after template — 10–14 days typical in DFW' },
  { weeks: 'Week 9–10', label: 'Countertops & Appliances', tasks: ['Countertop installation', 'Appliance delivery & install', 'Backsplash tile'], note: 'Big-box delivery slots in DFW often 7–14 days out — book early' },
  { weeks: 'Week 11–12', label: 'Punch List & Final', tasks: ['Hardware, fixtures, trim', 'Final inspection', 'Touch-up paint & cleaning'], note: 'Final city inspection required before using new plumbing/electrical' },
];

const scopeTimelines: Record<string, string> = {
  cosmetic: '6–8 weeks (paint, hardware, countertops only)',
  partial: '10–14 weeks (keep layout, replace everything)',
  full: '12–16 weeks (full gut with layout changes)',
  addition: '16–24 weeks (addition or structural changes)',
};

const delays = [
  'Cabinet backorders — most common DFW delay (6–10 weeks)',
  'Permit hold-ups in high-growth suburbs (Frisco, McKinney)',
  'Countertop fabrication queue during spring/fall remodel season',
  'Subcontractor scheduling gaps (plumber → electrician → inspector)',
  'Change orders after demo reveals hidden issues',
];

export default function DFWKitchenRenovationTimeline() {
  const [scope, setScope] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🏠 DFW Home Services</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>DFW Kitchen Renovation Timeline</h1>
        <p style={{ color: '#9BAEC8', marginBottom: 32, fontSize: 15 }}>Week-by-week guide from design to completion, built for DFW lead times and permit offices.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🔧 What's Your Scope?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {Object.entries(scopeTimelines).map(([key, val]) => (
              <button key={key} onClick={() => setScope(key)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${scope === key ? '#F5E642' : '#1E3050'}`, background: scope === key ? '#F5E642′ : ’transparent', color: scope === key ? '#0A1628′ : '#9BAEC8', fontWeight: 600, cursor: ’pointer', fontSize: 13, textTransform: 'capitalize' }}>{key}</button>
            ))}
          </div>
          {scope && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Realistic DFW Timeline: </span>
              <span style={{ color: '#E8EDF5′ }}>{scopeTimelines[scope]}</span>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16 }}>📅 Phase-by-Phase Breakdown</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {phases.map((p, i) => (
            <div key={i} style={{ background: '#111E35', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{p.weeks}</span>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.label}</span>
              </div>
              <ul style={{ margin: '0 0 10px 16px', padding: 0, color: '#9BAEC8', fontSize: 14 }}>
                {p.tasks.map((t, j) => <li key={j} style={{ marginBottom: 3 }}>{t}</li>)}
              </ul>
              <div style={{ fontSize: 12, color: '#F5E642', opacity: 0.8 }}>📍 {p.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 22 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 14 }}>⚠️ Top Causes of Delay in DFW</h2>
          <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
            {delays.map((d, i) => <li key={i} style={{ marginBottom: 8 }}>{d}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '16px 24px' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🔗 Get matched with a vetted DFW kitchen contractor — free on ProLnk</span>
        </div>
      </div>
    </div>
  );
}
