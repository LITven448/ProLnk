import { useState } from 'react';

const homeTypes = [
  { id: 'slab', label: 'Slab Foundation Home', situation: 'typical' },
  { id: 'crawl', label: 'Crawl Space Home', situation: 'typical' },
  { id: 'small', label: 'Small Home Under 1,500 sq ft', situation: 'space' },
  { id: 'commercial', label: 'Light Commercial / Retail', situation: 'commercial' },
  { id: 'retrofit', label: 'Replacing Old Package Unit', situation: 'package' },
];

const recommendations: Record<string, { system: string; reason: string; note: string }> = {
  typical: {
    system: 'Central Split System',
    reason: 'Split systems dominate DFW residential. Indoor air handler handles humidity better in North Texas summers.',
    note: 'Most DFW HVAC contractors specialize in split systems — better parts availability and service options.',
  },
  space: {
    system: 'Packaged Unit May Work',
    reason: 'Packaged units save interior space by housing all components outside. Good for tight utility closets.',
    note: 'In DFW heat, ensure the packaged unit has a high SEER2 rating (16+) to offset outdoor heat exposure.',
  },
  commercial: {
    system: 'Packaged Rooftop Unit (RTU)',
    reason: 'Commercial properties in DFW commonly use rooftop packaged units for zoning and space efficiency.',
    note: 'RTUs require regular filter changes and coil cleaning — DFW dust and heat accelerate wear.',
  },
  package: {
    system: 'Replace In-Kind or Upgrade to Split',
    reason: 'If you already have a packaged unit, replacing in-kind is easiest. Switching to split requires ductwork changes.',
    note: 'If your package unit is under a covered area, heat exposure is reduced — a valid long-term option.',
  },
};

export default function DFWHVACCentralVsPackage() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? recommendations[homeTypes.find(h => h.id === selected)?.situation || ''] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠❄️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Central Split vs Packaged Units in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          In DFW, central split systems are the standard for residential homes — the outdoor condenser and indoor air handler
          work together across your ductwork. Packaged units (all components in one cabinet, ground or rooftop) are common
          in commercial settings and some older or smaller DFW homes. Here's how to choose.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ Quick Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Split System', points: ['Most common in DFW', 'Indoor + outdoor units', 'Better humidity control', 'More contractor options'] },
              { label: 'Packaged Unit', points: ['All-in-one cabinet', 'Ground or rooftop mount', 'Saves indoor space', 'Common in commercial'] },
            ].map(col => (
              <div key={col.label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{col.label}</div>
                {col.points.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>• {p}</div>)}
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 What's Your Situation?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {homeTypes.map(h => (
            <button
              key={h.id}
              onClick={() => setSelected(h.id)}
              style={{
                background: selected === h.id ? '#F5E642' : '#112240',
                color: selected === h.id ? '#0A1628' : '#fff',
                border: '2px solid ' + (selected === h.id ? '#F5E642' : '#1e3a5f'),
                borderRadius: 8, padding: '12px 16px', cursor: 'pointer',
                textAlign: 'left', fontWeight: 600, fontSize: 15,
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {rec && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✅ Recommendation: {rec.system}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12 }}>{rec.reason}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>💡 DFW Note</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{rec.note}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginTop: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🌡️ Ready for a Free Quote?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>
            ProLnk connects you with DFW-vetted HVAC pros who know split systems and packaged units inside and out.
          </p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get My Free HVAC Quote
          </button>
        </div>
      </div>
    </div>
  );
}
