import { useState } from 'react';

const facts = [
  {
    id: 'heat',
    label: '🌡️ 100°F+ Ambient Temperature',
    detail: 'DFW regularly hits 100-110°F in July-August. Your outdoor unit rejects heat to outside air — the hotter the air, the harder your compressor works. Systems sized for 95°F design temp (national standard) are undersized for real DFW peak days. Size for 100°F minimum.',
  },
  {
    id: 'humidity',
    label: '💦 80% Summer Humidity',
    detail: 'High humidity means your system does double duty: cooling AND dehumidifying. Latent load (moisture removal) can equal sensible load (temperature reduction) in DFW. Undersized systems cool the air but leave humidity high. Oversized systems cool fast but never run long enough to dehumidify.',
  },
  {
    id: 'clay',
    label: '🪨 Expansive Clay Soil',
    detail: 'DFW sits on some of the most expansive clay soil in the US. Seasonal movement cracks slabs, shifts outdoor unit pads, and breaks condensate drain lines buried in the ground. Check your condenser pad level annually. Cracked outdoor slab pads cause refrigerant line stress.',
  },
  {
    id: 'season',
    label: '📅 7-Month Cooling Season',
    detail: 'DFW cools from April through October — 7 months. That is roughly double the cooling season of the US national average (3-4 months). Your system accumulates wear twice as fast. A 10-year-old DFW HVAC system has done the equivalent work of a 20-year system in Chicago.',
  },
  {
    id: 'hail',
    label: '⛈️ Hail Risk',
    detail: 'DFW sits in Hail Alley. Large hail flattens condenser fins, reducing efficiency 20-40%. After any significant storm, inspect your outdoor unit. Fin combs can restore minor damage. Major hail often triggers insurance claims. Document your unit condition before storm season.',
  },
  {
    id: 'ercot',
    label: '⚡ ERCOT Grid Isolation',
    detail: 'Texas runs its own grid. During peak summer events, ERCOT requests conservation. Smart thermostat demand response programs (like Oncor Smart Saver) cycle your system to protect the grid. Opt in for bill credits. Understand that your AC may be remotely adjusted during peak events unless you opt out.',
  },
  {
    id: 'water',
    label: '🪣 Hard Water',
    detail: 'DFW water is hard — high mineral content. Hard water accelerates scale buildup in humidifiers and any water-cooled components. More importantly, it affects condensate drain line buildup. Flush drain lines more frequently in DFW than manufacturer specs suggest (monthly vs quarterly).',
  },
];

export default function DFWHVACDFWSpecific() {
  const [active, setActive] = useState<string | null>(null);
  const selected = facts.find(f => f.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>7 DFW Facts That Change Everything</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>What makes DFW HVAC different from every other US market. Click each fact to understand how it changes your decisions.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {facts.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(active === f.id ? null : f.id)}
              style={{
                background: active === f.id ? '#1a2e4a' : '#0f1f35',
                border: `2px solid ${active === f.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ color: '#F5E642', fontWeight: 800, minWidth: 24 }}>{i + 1}</span>
              {f.label}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0f1f35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>{selected.label}</h2>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>{selected.detail}</p>
          </div>
        )}
        <div style={{ marginTop: '2.5rem', background: '#0f1f35', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🌟 ProLnk matches you to techs who know DFW</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>No generic advice — pros who understand 100°F summers, clay soil, and ERCOT.</div>
        </div>
      </div>
    </div>
  );
}
