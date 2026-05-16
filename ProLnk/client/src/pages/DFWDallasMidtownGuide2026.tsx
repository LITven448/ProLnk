import { useState } from 'react';

const homeTypes = [
  { id: 'older', label: '🏠 1950s-1970s Home', tips: ['Knob-and-tube or aluminum wiring — get a licensed electrician inspection', 'Cast iron or galvanized pipes — schedule camera inspection before they fail', 'Single-pane windows — retrofit with insulated film or replace for energy savings', 'Asbestos possible in floor tiles, insulation, popcorn ceilings — test before any demo', 'Foundation pier-and-beam common — inspect crawl space annually for moisture and shifting'] },
  { id: 'condo', label: '🏢 New Condo/Mid-Rise', tips: ['Review HOA docs for what maintenance is your responsibility vs. shared', 'HVAC is typically owner-owned — service annually, replace filters every 60 days', 'Balcony waterproofing degrades — inspect caulk and flashing each spring', 'Water heater often in closet — flush annually, check sacrificial anode every 3 years', 'In-unit washer/dryer hookups: check hoses for bulging or cracking every 2 years'] },
  { id: 'remodel', label: '🔨 Gentrification-Era Reno', tips: ['Verify permits were pulled for all renovations — unpermitted work creates liability', 'Flipped homes: inspect behind new finishes for hidden moisture or structural issues', 'New HVAC on old ductwork — have duct leakage tested for efficiency', 'Electrical panel may be upgraded but service entrance could be original — verify', 'Plumbing mix of old and new materials — inspect all transitions for corrosion'] },
];

export default function DFWDallasMidtownGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = homeTypes.find(h => h.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1 }}>
          PROLNK · DFW LOCAL GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🏥 Dallas Midtown &amp; Medical District
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Near UT Southwestern and Parkland Hospital — a neighborhood in active transformation.
          Older stock meets new condos as gentrification accelerates. Know your home type to
          stay ahead of maintenance in 2026.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📍 Area Snapshot</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ZIP codes 75235, 75219 · Anchored by UT Southwestern Medical Center &amp; Parkland Hospital ·
            Mix of 1950s–1970s single-family, post-2015 condos, and actively flipped properties ·
            City infrastructure upgrades ongoing through 2027
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
          Select your home type for a tailored maintenance guide:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {homeTypes.map(h => (
            <button
              key={h.id}
              onClick={() => setSelected(h.id === selected ? null : h.id)}
              style={{
                background: selected === h.id ? '#F5E642' : '#0f2040',
                color: selected === h.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === h.id ? '#F5E642' : '#1e3a5f'),
                borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
              {active.label} — 2026 Maintenance Priorities
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🌧️ Dallas Clay Soil Warning</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Expansive clay under Midtown Dallas causes seasonal foundation movement. Water your
            foundation perimeter during dry summers. Signs of stress: sticking doors, cracked
            drywall above windows, gaps at baseboards.
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.3rem' }}>Get Midtown-area pros on ProLnk</div>
          <div style={{ color: '#0A1628', fontSize: '0.85rem' }}>Foundation, plumbing, electrical specialists serving 75235 &amp; 75219</div>
        </div>
      </div>
    </div>
  );
}