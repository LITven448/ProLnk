import { useState } from 'react';

const configs = [
  { id: 'cramped', label: '📦 Cramped / No Shade', guide: ['Add a shade sail or corrugated metal canopy over the equipment pad — DFW summer sun runs equipment 20-30% hotter', 'Equipment operating in 100°F+ ambient heat loses efficiency and lifespan fast', 'Check NFPA 70 clearances: 36 inches in front of equipment, 12 inches sides before adding shade structure', 'Reroute any conduit touching the pad that gets direct sun — conduit degrades in DFW UV exposure', 'Add a concrete apron extension if mud splash is reaching equipment during heavy rain events', 'Consider a louvered equipment screen — blocks sun and visual clutter while maintaining airflow'] },
  { id: 'standard', label: '🏗️ Standard Open Pad', guide: ['Your pad is functional — focus on optimization vs overhaul', 'Variable-speed pump noise: add an anti-vibration pad under the pump ($20-40) — makes a big difference on concrete pads', 'Shade the pad with a simple sail shade to extend motor and seal life in DFW heat', 'Label all valves and circuit breakers permanently — DFW freeze events often require fast manual shutoffs', 'Keep 18 inches of clear space around all equipment for service access — pros need room to work', 'Check that the pad slopes away from equipment; DFW storms can pool water against equipment bases'] },
  { id: 'shaded', label: '✅ Covered / Well-Organized', guide: ['You have a well-optimized setup — focus on monitoring and small gains', 'Add a freeze sensor to the equipment pad wired to automation system or a standalone plug-in sensor', 'Install a P-trap on the equipment pad drain to prevent sewer gas if connected to a drain line', 'Review electrical connections annually; DFW heat expansion/contraction loosens wire terminals over time', 'Add a small weatherproof outlet to the pad for a chemical feeder or test kit charger', 'Document equipment serial numbers and installation dates on a laminated card stored in equipment area'] },
];

export default function DFWPoolEquipmentPad2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = configs.find(c => c.id === selected)?.guide ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Pool Equipment Pad Guide 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Your equipment pad is the engine room of your pool. In DFW, summer heat and rare freeze events
            create unique demands on pumps, filters, heaters, and salt cells.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '☀️', label: 'Shade = +20-30% Life', desc: 'Equipment running in 100°F+ DFW sun degrades significantly faster' },
            { icon: '🔇', label: 'Noise Reduction', desc: 'Anti-vibration pads under VS pumps make a big difference on concrete' },
            { icon: '📏', label: 'NFPA 70 Clearance', desc: '36″ in front, 12″ sides minimum — required for inspection and service' },
            { icon: '🏷️', label: 'Label Everything', desc: 'DFW freeze events require fast manual action — label valves and breakers' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', border: '1px solid #2d4a7a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🌡️ DFW Heat Impact on Equipment</h2>
          <p style={{ color: '#94a3b8′ }}>DFW summers regularly push 105°F+ ambient temps. Equipment pads in direct sun can exceed 130°F surface temperature, which stresses pump motor windings, degrades capacitors, and accelerates seal wear. A simple shade structure — sail shade, corrugated metal roof, or wooden pergola — can extend equipment life by 20-30% and is one of the best investments a DFW pool owner can make.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚙️ Equipment Setup → DFW Optimization Guide</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {configs.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === c.id ? '#F5E642′ : '#2d4a7a', background: selected === c.id ? '#F5E642' : '#0A1628', color: selected === c.id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {c.label}
              </button>
            ))}
          </div>
          {guide.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {guide.map(g => <li key={g} style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>{g}</li>)}
            </ul>
          )}
          {!selected && <p style={{ color: '#94a3b8′ }}>Select your equipment pad setup above to see your DFW optimization guide.</p>}
        </div>
      </div>
    </div>
  );
}