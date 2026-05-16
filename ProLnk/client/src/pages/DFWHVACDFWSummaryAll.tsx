import { useState } from 'react';

const topics = [
  { id: 'types', need: 'System Types', label: '🔄 System Types', summary: 'Split system (most common in DFW), packaged unit (common in slab-on-grade), heat pump (less efficient in DFW extremes), mini-split (great for additions). Most DFW homes run a 2-stage or variable-speed split system for best humidity control.' },
  { id: 'brands', need: 'Brands', label: '🏷️ Brands', summary: 'Carrier, Trane, Lennox, and Rheem dominate DFW installs. Carrier and Trane are widely regarded as most reliable for extreme heat. Lennox leads in efficiency ratings. Rheem offers best value. Brand matters less than install quality — a perfect install of a Rheem beats a sloppy Carrier every time.' },
  { id: 'sizing', need: 'Sizing', label: '📐 Sizing', summary: 'Manual J load calculation required. DFW rule of thumb: 400-600 sqft per ton, not 500 flat. Account for attic insulation, window orientation, ceiling height. Oversizing is epidemic in DFW — sales-driven, not engineering-driven. Demand a Manual J from any reputable contractor.' },
  { id: 'efficiency', need: 'Efficiency', label: '⚡ Efficiency', summary: 'Minimum 15 SEER2 as of 2023 in the Southwest region including Texas. Higher SEER pays back in DFW faster than northern markets due to the 7-month cooling season. 18-20 SEER2 is worth the premium on systems expected to run 10+ years. Variable-speed compressors save 30-40% vs single-stage.' },
  { id: 'maintenance', need: 'Maintenance', label: '🔧 Maintenance', summary: 'Spring tune-up before June heat arrives. Fall tune-up before the rare heating demand. Monthly filter changes May-September. Monthly condensate flush. Annual coil cleaning. Bi-annual refrigerant check. These are DFW-specific cadences — more frequent than manufacturer minimums.' },
  { id: 'repair', need: 'Repair', label: '🛠️ Repair', summary: 'Capacitor failure is the most common DFW repair ($150-300). Contactor failure ($200-400). Refrigerant leak ($400-1500). Coil replacement ($1500-3500). Compressor replacement ($1200-2500). If compressor fails on a 10+ year system, replacement is almost always better economics.' },
  { id: 'replacement', need: 'Replacement', label: '🔃 Replacement', summary: 'DFW system life: 12-17 years (shorter than national 15-20 due to season length). Replace when: repair cost exceeds 50% of new system cost, system is 12+ years old and fails, efficiency falls below 12 SEER, refrigerant is R-22 (phased out, expensive). Best time to buy: October-November, slowest season.' },
  { id: 'finance', need: 'Finance', label: '💰 Finance', summary: 'Federal tax credit: 30% of qualified energy-efficient HVAC (heat pumps 18 SEER2+, $2000 max). Texas has no state income tax so no state credit. Most HVAC companies offer 0% financing for 12-18 months. Credit unions beat HVAC company financing. Average DFW full system replacement: $8,000-$18,000 installed.' },
];

export default function DFWHVACDFWSummaryAll() {
  const [active, setActive] = useState<string | null>(null);
  const selected = topics.find(t => t.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>DFW HVAC All-In-One Summary</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Everything in one place. Click what you need now for the most relevant content.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
          {topics.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(active === t.id ? null : t.id)}
              style={{
                background: active === t.id ? '#F5E642' : '#0f1f35',
                border: `2px solid ${active === t.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 8,
                padding: '0.6rem 1rem',
                color: active === t.id ? '#0A1628' : '#fff',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0f1f35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>{selected.label}</h2>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>{selected.summary}</p>
          </div>
        )}
        {!selected && (
          <div style={{ background: '#0f1f35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
            <p style={{ color: '#64748b', textAlign: 'center' }}>Select a topic above to see the summary.</p>
          </div>
        )}
        <div style={{ background: '#0f1f35', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📋 ProLnk puts the right pro in front of you</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Describe your HVAC situation — ProLnk matches you to a vetted DFW specialist who handles exactly that.</div>
        </div>
      </div>
    </div>
  );
}
