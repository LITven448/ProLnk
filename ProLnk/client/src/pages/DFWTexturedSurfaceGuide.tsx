import { useState } from 'react';

const SOLUTIONS = [
  { surface: 'Smooth Concrete (Pool Deck)', options: ['Anti-slip additive sealer ($0.50–$1.50/sq ft)', 'Brushed broom finish ($1–2/sq ft)', 'Rubber mat overlay ($2–4/sq ft)'], severity: 'High' },
  { surface: 'Wet Travertine (Pool/Patio)', options: ['Anti-slip grip coating ($1–2/sq ft)', 'Sandblast texture treatment ($2–4/sq ft)', 'Travertine replacement with tumbled finish ($8–15/sq ft)'], severity: 'Very High' },
  { surface: 'Bathroom Shower Floor', options: ['Peel-and-stick grip strips ($20–60 kit)', 'Anti-slip spray treatment ($30–80)', 'Tile replacement with mosaic or textured tile ($6–15/sq ft)'], severity: 'High' },
  { surface: 'Front Entry Pavers (DFW rain)', options: ['Non-slip sealer ($0.75–1.50/sq ft)', 'Grip tape strips on steps ($15–50)', 'Roughened paver replacement ($12–20/sq ft)'], severity: 'Moderate' },
  { surface: 'Garage Floor (Oil + Rain Ingress)', options: ['Epoxy with anti-slip aggregate ($2–5/sq ft)', 'Rubber garage tiles ($3–6/sq ft)', 'Grip tape at threshold ($20–40)'], severity: 'Moderate' },
];

function getRecommendation(area: string, surfaceType: string, severity: string) {
  const match = SOLUTIONS.find(s => s.surface.toLowerCase().includes(area.toLowerCase().split(' ')[0]));
  const sol = match || SOLUTIONS[0];
  const budgetTier = severity === 'Severe (frequent falls)' ? sol.options[2] : severity === 'Moderate' ? sol.options[1] : sol.options[0];
  return {
    surface: sol.surface,
    solution: budgetTier,
    riskLevel: sol.severity,
    diyFriendly: budgetTier.includes('strip') || budgetTier.includes('mat') || budgetTier.includes('spray'),
    dfwNote: area.toLowerCase().includes('pool') ? 'DFW pools see heavy use Apr–Oct. Wet travertine is one of the leading slip hazards in DFW homes.' : 'DFW afternoon storms cause sudden wet-surface events. Anti-slip treatments are year-round necessity.',
  };
}

export default function DFWTexturedSurfaceGuide() {
  const [area, setArea] = useState('Pool Deck');
  const [surfaceType, setSurfaceType] = useState('Smooth Concrete');
  const [severity, setSeverity] = useState('Moderate');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW ACCESSIBILITY</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#F5E642′ }}>🛡️ Non-Slip & Textured Surface Guide — DFW</h1>
          <p style={{ color: '#8A9BB5', lineHeight: 1.6 }}>DFW's pool culture and afternoon thunderstorms create serious slip hazards. Wet travertine and smooth concrete are among the most dangerous surfaces for older adults. Solutions range from $20 strips to full resurfacing.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '⚠️ Highest Risk (DFW)', val: 'Wet travertine pool decks — extremely slippery when wet' },
            { label: '🌧️ Weather Factor', val: 'Sudden DFW storms create instant slip hazards outdoors' },
            { label: '🏊 Pool Season', val: 'April–October high-use period; anti-slip critical' },
            { label: '💰 Cost Range', val: '$20 grip tape → $15/sq ft resurfacing' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0F2035', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 13, color: '#8A9BB5', marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🗺️ Surface Risk Reference</h2>
          {SOLUTIONS.map(s => (
            <div key={s.surface} style={{ background: '#0F2035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: '#E8EDF5′ }}>{s.surface}</span>
                <span style={{ background: s.severity === 'Very High' ? '#F8717120′ : s.severity === ’High' ? '#F5E64220′ : '#4ADE8020', color: s.severity === ’Very High' ? '#F87171′ : s.severity === ’High' ? '#F5E642′ : '#4ADE80', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>{s.severity} Risk</span>
              </div>
              {s.options.map(o => <div key={o} style={{ color: '#8A9BB5', fontSize: 13, padding: '2px 0′ }}>• {o}</div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚙️ Get Your Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Problem Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Pool Deck</option><option>Bathroom Shower</option><option>Front Entry</option><option>Garage</option><option>Outdoor Patio</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Surface Type</label>
              <select value={surfaceType} onChange={e => setSurfaceType(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Smooth Concrete</option><option>Travertine</option><option>Ceramic Tile</option><option>Pavers</option><option>Painted Wood</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Slip Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Minor (slightly slick)</option><option>Moderate</option><option>Severe (frequent falls)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setResult(getRecommendation(area, surfaceType, severity))} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Solution</h3>
            {[['Solution', result.solution], ['Risk Level', result.riskLevel], ['DIY Friendly', result.diyFriendly ? 'Yes — no contractor needed' : 'Professional install recommended'], ['DFW Note', result.dfwNote]].map(([k, v]) => (
              <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ color: '#8A9BB5', fontSize: 13, minWidth: 110 }}>{String(k)}</span>
                <span style={{ color: '#E8EDF5', fontWeight: 600, textAlign: 'right', maxWidth: '65%' }}>{String(v)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
