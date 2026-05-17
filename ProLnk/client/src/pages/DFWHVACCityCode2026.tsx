import { useState } from 'react';

const cities = [
  { id: 'dallas', name: 'Dallas', icon: '🏙️', req: 'Permit required for all HVAC replacements. City uses TDLR-licensed contractors only. Inspection required before system activation. Min 15 SEER2 enforced.' },
  { id: 'fortworth', name: 'Fort Worth', icon: '🤠', req: 'Permit + inspection required. TDLR license mandatory. Refrigerant handler must hold EPA 608 certification. 15 SEER2 minimum enforced.' },
  { id: 'plano', name: 'Plano', icon: '📐', req: 'Permit required. Strict inspection — inspector checks refrigerant charge, ductwork connections, and electrical disconnect. 15 SEER2 enforced.' },
  { id: 'frisco', name: 'Frisco', icon: '🏘️', req: 'Permit required. TDLR license verified at permit pull. New residential requires 15 SEER2+ effective Jan 2023 under DOE rule.' },
  { id: 'arlington', name: 'Arlington', icon: '🔨', req: 'Permit + inspection required. EPA 608 required for all refrigerant handling. Refrigerant log must be maintained per TDLR rules.' },
  { id: 'mckinney', name: 'McKinney', icon: '🌿', req: 'Permit required. TDLR enforced. Inspector reviews electrical and refrigerant connections. 15 SEER2 minimum citywide.' },
  { id: 'smaller', name: 'Smaller DFW Cities', icon: '🏚️', req: 'All Texas cities must follow TDLR licensing and 15 SEER2 DOE rules. Local permit requirements still vary. Charter techs verify before every job.' },
];

export default function DFWHVACCityCode2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = cities.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW HVAC City Code Requirements 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            All DFW cities enforce TDLR licensing, EPA 608 refrigerant rules, and the DOE 15 SEER2 minimum. Know your city local requirements too.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DFW HVAC Code Facts</h2>
          {[
            ['📜', 'TDLR license required for all HVAC contractors in every Texas city'],
            ['🌡️', 'Minimum 15 SEER2 efficiency required for new installs (DOE rule, effective Jan 2023)'],
            ['♻️', 'EPA Section 608 certification required for all refrigerant handling'],
            ['🔍', 'Permits required for replacement in all major DFW municipalities'],
            ['✅', 'ProLnk Charter HVAC techs carry TDLR license + EPA 608 as baseline requirements'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏙️ Select Your DFW City</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 20 }}>
            {cities.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642' : '#162236', color: selected === c.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162236', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{result.icon} {result.name} HVAC Requirements</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.req}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>ProLnk Charter HVAC techs are TDLR-licensed, EPA 608-certified, and know every city code in DFW.</p>
        </div>
      </div>
    </div>
  );
}
