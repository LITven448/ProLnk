import { useState } from 'react';

const indicators = [
  { id: 'new_surfaces_old_systems', label: 'New counters/cabinets but no permit history found', weight: 3 },
  { id: 'fresh_paint_everywhere', label: 'Fresh paint on every surface (walls, ceilings, trim)', weight: 2 },
  { id: 'mismatched_finishes', label: 'Mismatched tile, flooring, or fixture styles in same room', weight: 2 },
  { id: 'no_permits', label: 'No permit history for any recent work (check DCAD/city)', weight: 3 },
  { id: 'new_water_heater_staging', label: 'Brand-new water heater but original plumbing', weight: 2 },
  { id: 'popcorn_painted_over', label: 'Painted-over popcorn ceiling (common flip shortcut)', weight: 1 },
  { id: 'unlevel_floors', label: 'Unlevel floors under new LVP/hardwood', weight: 3 },
  { id: 'new_hvac_old_duct', label: 'New HVAC unit but original duct system (no duct sealing)', weight: 2 },
  { id: 'freshly_landscaped', label: 'Freshly sodded/mulched yard with no other improvements', weight: 1 },
  { id: 'drywall_patches', label: 'Visible drywall patches or texture mismatch behind fixtures', weight: 2 },
  { id: 'smart_staging', label: 'Professional staging but vacant for months', weight: 1 },
  { id: 'llc_seller', label: 'Seller is an LLC (common for investment flips)', weight: 2 },
];

const scoreThresholds = [
  { min: 0, max: 4, label: 'Low Flip Likelihood', emoji: '✅', color: '#16A34A', focus: ['Standard inspection is sufficient', 'Verify permits on any visible improvements', 'Check age of all mechanical systems'], questions: ['Were any permits pulled for recent work?', 'How long did you own the home?', 'Were any behind-the-wall improvements made?'] },
  { min: 5, max: 9, label: 'Moderate Flip Likelihood', emoji: '⚠️', color: '#CA8A04', focus: ['Request all permit history from seller', 'Inspect behind newly installed finishes if possible', 'Verify HVAC, plumbing, and electrical age/condition', 'Look at original pipes behind new fixtures'], questions: ['What specific work was done and by whom?', 'Were licensed contractors used? Can you provide receipts?', 'Were any permits pulled for the renovation?', 'What is the age of plumbing, electrical, and HVAC?'] },
  { min: 10, max: 100, label: 'High Flip Likelihood', emoji: '🚨', color: '#DC2626', focus: ['Hire specialist inspectors: plumber, electrician, HVAC tech', 'Thermal imaging to check behind walls for moisture', 'Pull full permit history from city building department', 'Test for mold and water intrusion under new flooring', 'Get elevation certificate if foundation work visible'], questions: ['Was this a cosmetic or structural renovation?', 'Do you have a complete permit history available?', 'Who performed the plumbing, electrical, and HVAC work?', 'Were there any failed inspections during renovation?', 'What is behind the walls in renovated areas?'] },
];

export default function DFWFlipVsOriginalHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const score = selected.reduce((sum, id) => {
    const ind = indicators.find(i => i.id === id);
    return sum + (ind?.weight ?? 0);
  }, 0);

  const result = scoreThresholds.find(t => score >= t.min && score <= t.max);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏚️➡️🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Flipped Home Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Spot a cosmetic flip, know what to inspect, and ask the right questions before you commit.</p>
          <div style={{ background: '#1E3A5F', borderLeft: '4px solid #F5E642', padding: '12px 16px', borderRadius: 6, marginTop: 20, textAlign: 'left' }}>
            <strong style={{ color: '#F5E642′ }}>🏘️ DFW Flip Market:</strong>
            <span style={{ color: '#CBD5E1', fontSize: 14 }}> DFW is one of the most active flip markets in the US. Many flips are done well — but cosmetic-only flips that hide deferred maintenance are common. The goal isn't to avoid flips, it’s to know what you’re buying.</span>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Check all indicators you observe:</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {indicators.map(ind => (
            <button key={ind.id} onClick={() => toggle(ind.id)}
              style={{ background: selected.includes(ind.id) ? '#1E3A5F' : '#0F2236', border: `2px solid ${selected.includes(ind.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '12px 16px', color: '#E8F0FE', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13 }}>{ind.label}</span>
              <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 12, padding: '2px 8px', borderRadius: 10, marginLeft: 12, whiteSpace: 'nowrap' }}>+{ind.weight}</span>
            </button>
          ))}
        </div>

        {selected.length > 0 && result && (
          <div>
            <div style={{ background: '#0F2236', border: `3px solid ${result.color}`, borderRadius: 14, padding: 20, marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{result.emoji}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Flip Score: {score}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: result.color }}>{result.label}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#0F2236', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 Inspection Focus Areas</h3>
                {result.focus.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: result.color, minWidth: 16 }}>→</span>
                    <span style={{ fontSize: 12, color: '#CBD5E1′ }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0F2236', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>❓ Questions for Seller</h3>
                {result.questions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: '#94A3B8', minWidth: 16 }}>Q:</span>
                    <span style={{ fontSize: 12, color: '#CBD5E1′ }}>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#475569′ }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p>Select indicators you observe in the home to get your flip assessment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
