import { useState } from 'react';

const LANDSCAPE_TYPES = ['Established beds with shrubs', 'New planting beds', 'Tree rings / base mulching', 'Vegetable garden', 'Slope / erosion area', 'Formal front beds'];
const SUN_LEVELS = ['Full sun (6+ hrs)', 'Partial sun (3–6 hrs)', 'Full shade (<3 hrs)'];

type MulchRec = { type: string; depth: string; rate: string; refresh: string; tips: string[] };

const RECOMMENDATIONS: Record<string, Record<string, MulchRec>> = {
  'Established beds with shrubs': {
    'Full sun (6+ hrs)': {
      type: 'Cedar bark or hardwood shredded mulch',
      depth: '3 inches — critical for DFW summer moisture retention',
      rate: '1 cubic yard covers ~100 sq ft at 3" depth',
      refresh: 'Top-dress annually each spring (March–April) — DFW heat breaks down mulch faster than northern climates',
      tips: ['Keep mulch 2–3" away from shrub stems to prevent rot', 'In full DFW sun, mulch can drop soil temps 10–15°F', 'Cedar repels termites and insects — valuable in DFW', 'Budget $40–$80/cubic yard delivered in DFW market'],
    },
    'Partial sun (3–6 hrs)': {
      type: 'Cedar bark — moisture retention less critical, but still recommended',
      depth: '2–3 inches is sufficient',
      rate: '1 cubic yard covers ~100–150 sq ft',
      refresh: 'Every 12–18 months — partial shade slows breakdown',
      tips: ['Partial shade = less moisture loss, but mulch still helps DFW clay', 'Watch for fungal issues in shaded, moist mulch areas', 'Mix in pine bark for acid-loving plants like azaleas'],
    },
    'Full shade (<3 hrs)': {
      type: 'Pine bark nuggets or pine straw — shade beds have different needs',
      depth: '2 inches only — full shade retains moisture naturally',
      rate: '1 cubic yard covers ~150 sq ft at 2"',
      refresh: 'Every 18–24 months in full shade',
      tips: ['Avoid over-mulching in shade — leads to root rot and fungal issues', 'Pine straw is ideal for azaleas and acid-lovers in DFW shade', 'Shaded DFW beds stay cooler — moisture retention less critical'],
    },
  },
  'Tree rings / base mulching': {
    'Full sun (6+ hrs)': {
      type: 'Shredded hardwood or cedar bark',
      depth: '3–4 inches in the ring, never touching bark',
      rate: 'Tree ring radius = 1.5x canopy drip line',
      refresh: 'Top-dress each spring — DFW heat degrades faster',
      tips: ['CRITICAL: Keep mulch 6" away from tree trunk — "mulch volcanoes" kill DFW trees', 'Mulch ring should extend to drip line for best results', 'DFW clay causes root-circling — mulch softens soil and helps', 'Never use rubber mulch around trees — traps heat and harbors pests'],
    },
    'Partial sun (3–6 hrs)': {
      type: 'Shredded hardwood — good moisture balance',
      depth: '3 inches, away from bark',
      rate: '1 cubic yard per 100 sq ft of ring area',
      refresh: 'Annual top-dress in spring',
      tips: ['Same rules apply — no mulch touching bark', 'Partial shade slows breakdown, so top-dress may stretch to 18 months'],
    },
    'Full shade (<3 hrs)': {
      type: 'Pine bark or shredded hardwood',
      depth: '2–3 inches only',
      rate: '1 cubic yard per 150 sq ft of ring',
      refresh: 'Every 18–24 months',
      tips: ['Shade-grown trees in DFW still benefit from mulch rings', 'Less heat stress means less mulch needed', 'Monitor for fungal growth in dense shade areas'],
    },
  },
  'New planting beds': {
    'Full sun (6+ hrs)': {
      type: 'Shredded hardwood or cedar bark',
      depth: '3 inches immediately after planting',
      rate: '1 cubic yard per 100 sq ft',
      refresh: 'Top-dress after 6 months, then annually',
      tips: ['New plantings in DFW full sun need mulch most — roots are vulnerable', 'Apply immediately after planting to retain moisture and reduce transplant stress', 'Water thoroughly before and after mulch application', 'First summer is critical — check moisture under mulch weekly'],
    },
    'Partial sun (3–6 hrs)': {
      type: 'Cedar bark or shredded hardwood',
      depth: '2–3 inches',
      rate: '1 cubic yard per 100–125 sq ft',
      refresh: 'Annual spring refresh',
      tips: ['New plants in partial sun still need consistent moisture', 'Pull mulch back slightly to check soil moisture before watering', 'DFW alkaline soil may need amendment under mulch for new plants'],
    },
    'Full shade (<3 hrs)': {
      type: 'Pine bark or composted wood chips',
      depth: '2 inches — no more in shade',
      rate: '1 cubic yard per 150 sq ft',
      refresh: 'Every 18 months',
      tips: ['New shade plants in DFW often struggle from alkaline soil, not lack of mulch', 'Soil amendment is more important than mulch depth in shade'],
    },
  },
};

const FALLBACK: MulchRec = {
  type: 'Cedar bark mulch — most versatile DFW choice',
  depth: '3 inches standard for DFW conditions',
  rate: '1 cubic yard per 100 sq ft',
  refresh: 'Annual spring top-dress',
  tips: ['Cedar is the most popular DFW mulch for good reason — pest-resistant and long-lasting', 'Apply in March before heat sets in', 'Keep away from plant stems and tree trunks'],
};

export default function DFWMulchGuide() {
  const [landscapeType, setLandscapeType] = useState('');
  const [sunLevel, setSunLevel] = useState('');
  const [rec, setRec] = useState<MulchRec | null>(null);

  function generate() {
    if (landscapeType && sunLevel) {
      setPlan(RECOMMENDATIONS[landscapeType]?.[sunLevel] || FALLBACK);
    }
  }

  function setPlan(r: MulchRec) { setRec(r); }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🪵</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Mulch Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Mulch is one of the highest-ROI landscaping tasks in DFW — it cuts watering needs by 30–50% in our brutal summers. Cedar bark dominates the DFW market for good reason. Three inches is the magic number for moisture retention in our heat.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ Why Mulch Matters More in DFW</h2>
          {[
            '💧 Reduces soil moisture loss by 30–50% in DFW summer heat',
            '🌡️ Moderates soil temperature — DFW soil can hit 130°F surface without mulch',
            '🌿 Suppresses weeds that compete with plants for DFW limited water',
            '🏺 DFW clay soil crusts without mulch — mulch maintains structure',
            '🦟 Cedar and cypress have natural insect-repelling properties',
            '🔄 Breaks down into organic matter that improves DFW alkaline clay over time',
          ].map((fact, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>{fact}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Get Your Mulch Recommendation</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Landscape Type</label>
            <select value={landscapeType} onChange={e => setLandscapeType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select type...</option>
              {LANDSCAPE_TYPES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Sun Exposure</label>
            <select value={sunLevel} onChange={e => setSunLevel(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select sun level...</option>
              {SUN_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Mulch Recommendation →
          </button>
        </div>

        {rec && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Your Mulch Plan</h2>
            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              {[['Mulch Type', rec.type], ['Application Depth', rec.depth], ['Coverage Rate', rec.rate], ['Refresh Timing', rec.refresh]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: 14, marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>📌 DFW-Specific Tips</div>
              {rec.tips.map((tip, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{tip}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💰 DFW Mulch Pricing Guide</h2>
          {[['Cedar bark (bulk)', '$35–$55/cubic yard delivered'], ['Hardwood shredded (bulk)', '$30–$45/cubic yard delivered'], ['Pine bark nuggets', '$40–$60/cubic yard delivered'], ['Rubber mulch', '$100–$150/cubic yard — avoid near trees'], ['Pine straw (bales)', '$5–$8/bale (covers ~30 sq ft at 2")']].map(([type, price]) => (
            <div key={type} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, borderBottom: '1px solid #1e3a5f', paddingBottom: 8 }}>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{type}</span>
              <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
