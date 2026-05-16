import { useState } from 'react';

const suburbs = [
  {
    name: 'Celina',
    mudDistrict: 'Celina MUD #1',
    buildEra: '2018–present',
    heatPumpStandard: true,
    commonSystem: '3-ton heat pump',
    builderNotes: 'Most new builds include Carrier or Trane heat pumps. Verify at permit stage.',
  },
  {
    name: 'Prosper',
    mudDistrict: 'Prosper MUD #2',
    buildEra: '2015–present',
    heatPumpStandard: true,
    commonSystem: '3.5-ton heat pump',
    builderNotes: 'Many master-planned communities default to heat pumps for energy code compliance.',
  },
  {
    name: 'Gunter',
    mudDistrict: 'Gunter MUD',
    buildEra: '2020–present',
    heatPumpStandard: false,
    commonSystem: '3-ton split system',
    builderNotes: 'Newer but smaller builder base. Mix of heat pumps and traditional splits.',
  },
  {
    name: 'Melissa',
    mudDistrict: 'Melissa MUD #1',
    buildEra: '2016–present',
    heatPumpStandard: true,
    commonSystem: '3-ton heat pump',
    builderNotes: 'Growing rapidly. Check MUD compliance docs for HVAC warranty handoff requirements.',
  },
  {
    name: 'Anna',
    mudDistrict: 'Anna MUD',
    buildEra: '2019–present',
    heatPumpStandard: false,
    commonSystem: '3.5-ton split system',
    builderNotes: 'Mix of heat pumps and traditional splits. Builder variance is high.',
  },
  {
    name: 'Van Alstyne',
    mudDistrict: 'Van Alstyne MUD',
    buildEra: '2021–present',
    heatPumpStandard: false,
    commonSystem: '3-ton split system',
    builderNotes: 'Frontier growth area. Expect MUD infrastructure still maturing.',
  },
];

export default function DFWHVACDFWNorth() {
  const [selected, setSelected] = useState<string | null>(null);

  const profile = suburbs.find((s) => s.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🏠 DFW HVAC Guide — North Suburbs</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>North DFW HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Celina, Prosper, Gunter, Melissa, and the northern fringe are among the newest construction zones in
          all of Texas. Heat pumps are becoming standard in many developments. MUD districts govern infrastructure.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏗️ What Makes North DFW Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🔥', label: 'Heat Pumps Are Standard', desc: 'Many builders default to heat pumps for TX energy code compliance' },
              { icon: '🏘️', label: 'MUD Districts', desc: 'Municipal Utility Districts govern infrastructure — check before buying' },
              { icon: '🆕', label: 'Newest Construction', desc: '2015–present builds dominate — warranties often still active' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642' }}>
          🗺️ Select Your Suburb
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {suburbs.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelected(s.name)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: 8,
                border: `2px solid ${selected === s.name ? '#F5E642' : '#1e3a5f'}`,
                background: selected === s.name ? '#F5E642' : '#0F2040',
                color: selected === s.name ? '#0A1628' : '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {profile && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', fontSize: '1.3rem', marginBottom: '1rem' }}>📍 {profile.name} HVAC Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { label: 'MUD District', value: profile.mudDistrict },
                { label: 'Primary Build Era', value: profile.buildEra },
                { label: 'Common System', value: profile.commonSystem },
                { label: 'Heat Pump Standard?', value: profile.heatPumpStandard ? '✅ Yes' : '❌ No' },
              ].map((item) => (
                <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '0.85rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642' }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem', color: '#cbd5e1' }}>
              🏗️ {profile.builderNotes}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🛠️ North DFW HVAC Tips</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Check your builder's warranty — many new HVAC systems have 10-year coverage</li>
            <li>Heat pumps require different maintenance than gas furnaces — find an HP-certified tech</li>
            <li>MUD districts may have rules about outdoor condenser placement — verify before replacing</li>
            <li>Smart thermostats pair well with heat pumps — consider a rebate-eligible upgrade</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
