import { useState } from 'react';

const categories = [
  { label: '🔧 HVAC', value: 'hvac', count: 420, topics: 'Compression ratios, TXV failure, superheat/subcooling, burnout, contamination, seasonal prep, R-410A vs R-32' },
  { label: '💧 Plumbing', value: 'plumbing', count: 380, topics: 'Slab leaks, water heater sizing, DFW hard water, tankless conversion, backflow, drain clearing' },
  { label: '⚡ Electrical', value: 'electrical', count: 290, topics: 'Panel upgrades, EV charger installs, GFCI/AFCI, aluminum wiring, generator hookup' },
  { label: '🏠 Foundation & Structure', value: 'foundation', count: 210, topics: 'DFW clay soil movement, pier leveling, crack evaluation, drainage systems, drainage grading' },
  { label: '🌿 Landscaping & Irrigation', value: 'landscaping', count: 180, topics: 'DFW watering schedules, irrigation efficiency, clay soil grading, tree root risks' },
  { label: '🪟 Roofing & Insulation', value: 'roofing', count: 240, topics: 'Hail damage assessment, attic insulation for DFW heat, ridge vent optimization, roof deck moisture' },
  { label: '🔒 Home Security', value: 'security', count: 130, topics: 'Smart lock installs, camera placement, alarm systems, DFW code requirements' },
  { label: '🧹 Indoor Air Quality', value: 'iaq', count: 160, topics: 'DFW allergen seasons, UV air purifiers, filter MERV ratings, duct cleaning truth' },
];

const situations = [
  { label: 'I have an urgent repair need', value: 'urgent', start: 'Go directly to your service category → find the diagnostic guide → get a ProLnk quote with vetted pros ready today.' },
  { label: 'I want to prep my home for DFW summer', value: 'summer_prep', start: 'Start with HVAC seasonal prep, then roofing/insulation, then irrigation — all covered in the library.' },
  { label: 'A contractor gave me a quote I’m unsure about', value: 'quote', start: 'Find the relevant guide, read the diagnostic section, then use ProLnk to get a second opinion from a vetted pro.' },
  { label: 'I’m a new DFW homeowner', value: 'new', start: 'Start with the Foundation guide (DFW clay soil is unique), then HVAC, then Plumbing — the three highest-cost DFW systems.' },
  { label: 'I’m planning a home renovation', value: 'renovation', start: 'Check Electrical first (panel capacity), then Plumbing and Structural — then use ProLnk to match with vetted trade pros.' },
];

export default function DFWHomeResourceLibrary() {
  const [category, setCategory] = useState(categories[0]);
  const [situation, setSituation] = useState(situations[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK DFW RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>📚 DFW Homeowner Resource Library</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.7 }}>
          2,700+ pages of DFW-specific home service guides written for real homeowners — not contractors. Every guide is built around North Texas' unique conditions: clay soil, extreme heat, hard water, and hail seasons.
        </p>
        <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 32 }}>Used by 12,000+ DFW homeowners to make smarter repair decisions.</div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📂 Explore by Category</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {categories.map(c => (
              <button key={c.value} onClick={() => setCategory(c)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: category.value === c.value ? '#F5E642' : '#1e3a5f', color: category.value === c.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{c.label} ({c.count})</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{category.label} — {category.count} Guides</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7 }}>Topics covered: {category.topics}</div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🎯 Your Situation — Where to Start</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => setSituation(s)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', background: situation.value === s.value ? '#F5E642' : '#1e3a5f', color: situation.value === s.value ? '#0A1628' : '#fff', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
          {situation && (
            <div style={{ marginTop: 16, background: '#0d2040', borderRadius: 8, padding: 16, color: '#cbd5e1', lineHeight: 1.7 }}>
              💡 {situation.start}
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🚀 Beyond the Library: ProLnk Platform</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['✅ Vetted DFW contractors only', '✅ Free competitive quotes', '✅ No middleman markup', '✅ Reviews from real DFW homeowners', '✅ AI-matched to your specific job', '✅ Transparent pricing guides'].map((item, i) => (
              <div key={i} style={{ background: '#0d2040', borderRadius: 8, padding: '12px 14px', color: '#cbd5e1', fontWeight: 500 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Ready to Go Beyond the Guides?</div>
          <p style={{ color: '#0A1628', margin: '0 0 16px', lineHeight: 1.6 }}>ProLnk connects you with vetted DFW contractors who know these systems. Free quotes, no pressure.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', padding: '14px 28px', borderRadius: 8, fontWeight: 800, fontSize: 16, display: 'inline-block', cursor: 'pointer' }}>Get My Free ProLnk Quote →</div>
        </div>
      </div>
    </div>
  );
}

