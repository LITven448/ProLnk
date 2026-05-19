import { useState } from 'react';

const situations = [
  { id: 'heatpump', label: '🔄 Pure Heat Pump', desc: 'Heat pump is my only heat source' },
  { id: 'dualfuel', label: '⚡ Dual Fuel System', desc: 'Heat pump + gas backup' },
  { id: 'cold', label: '🌡️ Cold Night Planning', desc: 'Preparing for DFW cold snaps' },
];

const guideMap: Record<string, { title: string; points: string[] }> = {
  heatpump: {
    title: 'Pure Heat Pump Balance Point in DFW',
    points: [
      'Balance point: outdoor temp where heat pump cost = electric resistance backup cost',
      'Typical DFW heat pump balance point: 30–35°F',
      'Below balance point, emergency heat (resistance strips) kicks in automatically',
      'Resistance strips use 2–3x more electricity than heat pump at same output',
      'DFW averages 10–15 nights/year below 35°F — limited but real impact',
      'Properly sized heat pump handles 90%+ of DFW heating load efficiently',
      'Do NOT run emergency heat manually unless heat pump is broken',
    ],
  },
  dualfuel: {
    title: 'Dual Fuel Balance Point in DFW',
    points: [
      'Dual fuel systems set balance point at thermostat or control board',
      'Typical DFW dual fuel balance point: 35–40°F (higher than pure heat pump)',
      'Below balance point: gas furnace takes over — more cost-effective in DFW winters',
      'Above balance point: heat pump runs — maximum efficiency for mild DFW days',
      'Balance point is set during commissioning — ask your HVAC tech to confirm yours',
      'Natural gas prices in DFW fluctuate — optimal balance point shifts with gas costs',
      'Most efficient DFW setup: heat pump handles fall/spring, gas handles hard freezes',
    ],
  },
  cold: {
    title: 'DFW Cold Snap Planning (Balance Point Events)',
    points: [
      'DFW hard freezes (sub-20°F): heat pump efficiency drops significantly',
      'Feb 2021 proved pure heat pumps struggle in extreme DFW cold events',
      'Dual fuel eliminates this risk — gas furnace handles extreme temperatures',
      'For pure heat pump: ensure backup resistance strips are functional before winter',
      'Smart thermostats optimize balance point in real-time based on utility rates',
      'Pre-heat home before balance point weather — stores heat at higher efficiency',
      'Annual fall tune-up should include balance point verification',
    ],
  },
};

export default function DFWHVACHeatPumpBalance2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🌡️ Heat Pump Balance Point in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          The balance point is the outdoor temperature where your heat pump stops being cost-effective. In DFW, this matters about 10–15 nights per year — but it matters a lot.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>❄️ DFW Balance Point Basics</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            DFW balance points typically fall between <strong style={{ color: '#F5E642' }}>30–40°F</strong>. Most winters you'll hit this temperature 10–15 nights. Dual fuel systems handle it automatically — pure heat pumps rely on backup resistance heat.
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>Your DFW Heating Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#1e293b', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #334155'), borderRadius: 8, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{s.desc}</div>
            </button>
          ))}
        </div>

        {selected && guideMap[selected] && (
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>{guideMap[selected].title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {guideMap[selected].points.map((p, i) => (
                <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155', color: '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#F5E642' }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
          ProLnk DFW HVAC Resource · Updated 2026
        </div>
      </div>
    </div>
  );
}