import { useState } from 'react';

const purposes = [
  { id: 'foundation', label: '🏗️ Foundation Watering Calendar', icon: '🏗️' },
  { id: 'irrigation', label: '💧 Irrigation Scheduling', icon: '💧' },
  { id: 'garden', label: '🌱 Garden & Lawn Care', icon: '🌱' },
  { id: 'runoff', label: '🌊 Runoff & Drainage Tracking', icon: '🌊' },
];

const gaugeRecs: Record<string, { type: string; placement: string; usage: string; tip: string }> = {
  foundation: {
    type: 'Standard 5" diameter tube gauge — minimum 0.01" precision. EZ Read Rain Gauge ($8-15) is sufficient.',
    placement: 'Place in open area 10+ ft from house and trees. Avoid roof overhang drip zones. Use standalone stake near driveway.',
    usage: 'Log weekly. If rainfall totals under 1" in 7 days during summer, run soaker hose around foundation perimeter for 2-3 hours. During D2+ drought, water regardless.',
    tip: 'Keep a paper log by your garage door. Foundation watering needs consistency — missed weeks compound quickly in DFW summers.',
  },
  irrigation: {
    type: 'Smart wireless rain gauge that connects to WiFi irrigation controllers (Orbit B-hyve or Rachio compatible). Davis or Ambient Weather models preferred.',
    placement: 'Mount on fence post in open sky, 6+ ft high, away from sprinkler spray. Ensure no partial shade from trees.',
    usage: 'Program irrigation controller rain delay: skip irrigation when gauge reads 0.5"+ in 24 hours. Adjust delay threshold seasonally — 0.25" in summer, 0.5" in fall.',
    tip: 'DFW clay holds water longer than sandy soil. After 1" rain, skip irrigation for 3-4 days — clay stays saturated.',
  },
  garden: {
    type: 'Wireless digital gauge with memory function ($20-40). Stratus Precision Rain Gauge or AcuRite 00850 model. Tracks weekly totals automatically.',
    placement: 'Center of garden bed, or multiple gauges across large plots. Empty weekly on same day for consistent tracking.',
    usage: 'Vegetables need 1-2" per week. Track actual rainfall and supplement with irrigation only for the deficit. Log monthly totals for year-over-year comparison.',
    tip: 'DFW gets 37" rain annually but unevenly. May and October are wet; July-August are the gap. Plan garden irrigation budget by season.',
  },
  runoff: {
    type: 'Large-capacity gauge: 4-6" diameter with 5" capacity minimum. Scientific Industries or Stratus gauges handle DFW heavy convective storms well.',
    placement: 'Near downspout area or lowest point of property. Install a second gauge uphill for slope comparison.',
    usage: 'After storms over 2", check gauge and note any surface runoff paths. Document events where water reached slab level. Use data to justify grading or French drain installation.',
    tip: 'DFW can receive 3-5" in a single storm cell. Overflow events should trigger a grading review — water against foundation is the #1 cause of DFW foundation damage after drought.',
  },
};

export default function DFWRainGaugeGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? gaugeRecs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🌧️ DFW HOME CARE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Rain Gauge Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          In DFW, tracking actual rainfall at your property — not airport weather data — is critical for foundation watering calendars, irrigation efficiency, and drainage problem documentation. A $10 rain gauge is one of the highest-value home maintenance tools for DFW homeowners.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            ['Why DFW Rainfall Data Matters', 'DFW weather varies dramatically by neighborhood. Storms can drop 3" in one zip code and 0.5" 2 miles away. Airport data is unreliable for property-level decisions.'],
            ['Foundation Watering Compliance', 'Water restrictions allow foundation watering exceptions. Documenting your rainfall history strengthens variance requests with the city.'],
            ['Irrigation Savings', 'DFW homeowners waste $200-400/yr overwatering after rain. A gauge with smart controller integration pays for itself in one summer.'],
            ['Drainage Documentation', 'Insurance and contractor claims are strengthened by rainfall logs that correlate with reported damage dates.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: '#0f2240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>What's your primary DFW use?</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {purposes.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id)}
              style={{ background: selected === p.id ? '#F5E642' : '#0f2240', color: selected === p.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
              {p.label}
            </button>
          ))}
        </div>

        {rec && (
          <div style={{ background: '#0f2240', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['🔧 Recommended Gauge Type', rec.type],
                ['📍 Placement', rec.placement],
                ['📊 How to Use for This Purpose', rec.usage],
                ['💡 DFW Pro Tip', rec.tip],
              ].map(([label, text]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6 }}>{label}</div>
                  <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
