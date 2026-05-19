import { useState } from 'react';

const checks = [
  { category: 'Safety', items: ['Smoke detectors (TX law: working in every bedroom + hallway)', 'CO detector near sleeping areas', 'Fire extinguisher in kitchen', 'GFCI outlets near water sources'] },
  { category: 'HVAC', items: ['Replace HVAC filter (1-3 month intervals in DFW dust)', 'Inspect condenser coils + clean fins', 'Check refrigerant levels (DFW summers)', 'Test thermostat calibration'] },
  { category: 'Plumbing', items: ['Water heater age check (8-12 yr life)', 'Pressure relief valve test', 'Under-sink leak inspection', 'Hose bib winterization (DFW freezes)'] },
  { category: 'Electrical', items: ['Panel condition: no rust or corrosion', 'Breaker labeling accurate', 'Exterior outlets weatherproofed', 'Attic wiring visible check'] },
  { category: 'Exterior', items: ['Foundation crack inspection (DFW clay movement)', 'Roof shingle condition', 'Gutters clear of debris', 'Fence and gate integrity'] },
];

const ageMap: Record<string, string[]> = {
  'Pre-1980': ['Lead paint disclosure required', 'Asbestos in popcorn ceiling risk', 'Original wiring may be aluminum — inspect', 'Cast iron drain lines nearing end of life'],
  '1980-2000': ['Check HVAC age (over 20 yrs = replace soon)', 'Polybutylene pipe risk — verify material', 'Original windows may be single-pane', 'Fiber cement siding common — inspect seams'],
  '2000-2015': ['Stucco — check for moisture intrusion', 'Dual-pane windows — check for seal failure (fogging)', 'Modern panel but verify surge protection', 'Foundation warranty likely expired'],
  '2015+': ['Smart thermostat compatibility', 'Check warranty documentation on systems', 'Verify permit history for any additions', 'Solar-ready conduit inspection if applicable'],
};

export default function DFWLandlordChecklistDFW2026() {
  const [age, setAge] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked(p => ({ ...p, [key]: !p[key] }));
  const total = Object.values(checks).flatMap(c => c.items).length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Landlord Annual Inspection Checklist 2026</h1>
          <p style={{ color: '#9AA3B2', fontSize: 15 }}>Texas law compliance + DFW-specific property checks</p>
          <div style={{ marginTop: 12, background: '#1A2640', borderRadius: 8, padding: '8px 16px', display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>{done}/{total}</span>
            <span style={{ color: '#9AA3B2', marginLeft: 6 }}>items checked</span>
          </div>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Property Age → Custom Risk Flags</label>
          <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2A3A50', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
            <option value=''>Select property age...</option>
            {Object.keys(ageMap).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          {age && (
            <div style={{ marginTop: 12 }}>
              {ageMap[age].map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#F5E642′ }}>⚠️</span>
                  <span style={{ color: '#E8EAF0', fontSize: 14 }}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {checks.map(cat => (
          <div key={cat.category} style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{cat.category}</h2>
            {cat.items.map(item => {
              const key = cat.category + item;
              return (
                <div key={item} onClick={() => toggle(key)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #0A1628′ }}>
                  <span style={{ fontSize: 18, marginTop: 1 }}>{checked[key] ? '✅' : '⬜'}</span>
                  <span style={{ color: checked[key] ? '#6B7A90′ : '#E8EAF0', fontSize: 14, textDecoration: checked[key] ? ’line-through' : 'none' }}>{item}</span>
                </div>
              );
            })}
          </div>
        ))}

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#9AA3B2', fontSize: 13 }}>Need licensed contractors for DFW inspection repairs?</p>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 4 }}>ProLnk connects DFW landlords with vetted local pros — free quote matching.</p>
        </div>
      </div>
    </div>
  );
}