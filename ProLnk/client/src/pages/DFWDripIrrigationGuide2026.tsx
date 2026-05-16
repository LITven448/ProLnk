import { useState } from 'react';

const plantTypes = ['Roses / perennial flower beds', 'Shrubs and foundation plantings', 'Vegetable garden', 'Native DFW plants (drought tolerant)', 'Trees (established)', 'Container gardens / patio pots', 'Raised bed garden'];

const dripGuide: Record<string, { emitter: string; spacing: string; rate: string; filter: string; tip: string; conservation: string }> = {
  'Roses / perennial flower beds': { emitter: '1 GPH pressure-compensating drip emitter per plant', spacing: '12–18 inches from stem', rate: '1–2 GPH per plant', filter: '155-mesh filter required — DFW hard water (300+ ppm) clogs emitters fast', tip: 'Run 30–45 min twice weekly in DFW summer — deep soak beats frequent shallow irrigation', conservation: 'Uses 60% less water than overhead spray on beds' },
  'Shrubs and foundation plantings': { emitter: '2 GPH emitter or 12" soaker loop per shrub', spacing: '6–8 inches from base, full ring for large shrubs', rate: '2–4 GPH per shrub', filter: 'Y-filter at zone entry with 155-mesh screen', tip: 'Foundation shrubs in DFW often need 2 emitters per plant in July–Aug peak heat', conservation: 'Foundation plantings are DFW\'s top overwatered area — drip cuts waste by 50%' },
  'Vegetable garden': { emitter: '0.5–1 GPH emitter or flat soaker hose per row', spacing: '12 inches between emitters along rows', rate: '0.5–1 GPH per linear foot of row', filter: 'Critical: 155-mesh filter + pressure regulator at 15–25 PSI', tip: 'DFW veggie gardens need daily or every-other-day watering in summer — use controller ET mode', conservation: 'Row drip vs overhead spray saves 40% water and reduces DFW fungal issues' },
  'Native DFW plants (drought tolerant)': { emitter: '0.5 GPH emitter, 1–2 per plant', spacing: '8–12 inches from plant base', rate: '0.5–1 GPH per plant', filter: 'Standard 155-mesh, low maintenance on low-rate zones', tip: 'Native DFW plants (salvia, black-eyed susan, cenizo) need drip only first 2 years — then often self-sufficient', conservation: 'Native drip zones can be turned off Oct–Apr in most DFW years' },
  'Trees (established)': { emitter: 'Bubbler 1–2 GPH or drip ring (multiple 0.5 GPH)', spacing: 'Ring at drip line, 18–24 inches from trunk', rate: '5–15 GPH total per tree', filter: 'Filter recommended; bubblers more clog-resistant than emitters', tip: 'DFW clay trees: run 20–30 min once weekly — slow deep soak prevents surface root stress', conservation: 'Trees need 75% less water than lawn — never irrigate trees with lawn zones' },
  'Container gardens / patio pots': { emitter: '0.5 GPH micro-spray or drip stake per pot', spacing: '1 emitter centered per container', rate: '0.5–1 GPH per pot', filter: 'Essential — patio micros clog quickly in DFW', tip: 'DFW patio pots dry out fast — run daily at 10–15 min during July–Sep heat', conservation: 'Micro-spray to pots vs hand watering saves 20 min/day in peak summer' },
  'Raised bed garden': { emitter: 'Flat drip tape (0.5 GPH per 12") or individual emitters per plant', spacing: '9–12 inches between emitters in rows', rate: '0.5 GPH per linear foot', filter: '155-mesh critical — raised beds often have high organic content that sheds into lines', tip: 'DFW raised beds heat fast — water early morning (before 6am) during city-restricted hours to reduce evaporation', conservation: 'Raised bed drip vs overhead cuts water use by 50% and eliminates DFW leaf fungus from overhead moisture' },
};

export default function DFWDripIrrigationGuide2026() {
  const [selected, setSelected] = useState('');
  const [area, setArea] = useState('');

  const guide = selected ? dripGuide[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk DFW Guide · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🌿 DFW Drip Irrigation Guide 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>Drip systems for DFW beds, gardens, and containers — the most water-efficient irrigation method and often exempt from DFW watering day restrictions.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '💧', label: 'Drip Emitters', note: 'Point-source, per-plant' },
            { icon: '🔗', label: 'Soaker Hose', note: 'Row crops, dense beds' },
            { icon: '🌊', label: 'Drip Tape', note: 'Raised beds, veggie rows' },
            { icon: '🌀', label: 'Micro-Spray', note: 'Ground cover, patio pots' },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2040', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{t.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{t.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 DFW Drip System Configurator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Plant / Area Type</label>
              <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select plant type</option>
                {plantTypes.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Zone Area (optional)</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select area</option>
                <option>Under 100 sq ft</option>
                <option>100–300 sq ft</option>
                <option>300–600 sq ft</option>
                <option>Over 600 sq ft</option>
              </select>
            </div>
          </div>
          {guide && (
            <div style={{ background: '#162035', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16, marginBottom: 14 }}>💧 DFW Drip Plan — {selected}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {[
                  { label: 'Emitter Type', val: guide.emitter },
                  { label: 'Placement', val: guide.spacing },
                  { label: 'Flow Rate', val: guide.rate },
                  { label: 'Filtration', val: guide.filter },
                ].map(r => (
                  <div key={r.label} style={{ background: '#0F2040', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#94A3B8', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{r.label}</div>
                    <div style={{ color: '#E8EAF6', fontSize: 13 }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#10B981', fontSize: 13, marginBottom: 6 }}>🌱 DFW Tip: {guide.tip}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💦 Conservation: {guide.conservation}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a DFW Drip System Installed</div>
          <div style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Licensed DFW irrigators, drip conversion specialists, free quotes.</div>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}