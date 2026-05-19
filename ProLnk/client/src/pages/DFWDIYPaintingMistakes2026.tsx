import { useState } from 'react';

export default function DFWDIYPaintingMistakes2026() {
  const [mistake, setMistake] = useState('primer');

  const getFix = () => {
    const map: Record<string, { problem: string; avoid: string; fix: string }> = {
      primer: { problem: 'Paint adhesion failure — peeling within 1-2 years', avoid: 'Always prime new drywall, bare wood, and stained surfaces. Use Zinsser BIN for water stains.', fix: 'If peeling has started, scrape loose paint, spot-prime, and repaint. Do not paint over peeling paint.' },
      heat: { problem: 'Bubbling, blistering, lap marks from fast dry', avoid: 'Paint DFW exteriors before 10am or after 5pm in summer. Interiors: close blinds, keep AC on 72°F.', fix: 'Wait for bubbles to fully cure (2-3 days), sand smooth, reprime affected areas, repaint.' },
      cutin: { problem: 'Visible roller texture on edges, missed corners', avoid: 'Always cut in 2-3 inches around edges, corners, and trim BEFORE rolling. Cut in while paint is wet.', fix: 'Re-cut-in edges after rolling while paint is still wet. If dry, touch up with a steady hand and quality brush.' },
      roller: { problem: 'Stippled, orange-peel, or lint-covered finish', avoid: 'Use 3/8″ nap for smooth walls, 1/2″ for texture. Premium Purdy or Wooster rollers eliminate lint.', fix: 'Sand stippled finish lightly (220 grit) after full cure, wipe dust, apply another coat with quality roller.' },
      feather: { problem: 'Lap marks — visible darker lines where sections overlap', avoid: 'Work in full-wall sections, maintain a wet edge, overlap 4-6 inches before wet paint dries.', fix: 'Light sanding of lap marks after full cure, then feather another coat blending the entire section.' },
      tape: { problem: 'Bleed-through under painter’s tape, ragged lines', avoid: 'Press FrogTape firmly with a putty knife. Remove tape at 45° while paint is still slightly tacky — not fully dry.', fix: 'Use a razor blade to score the tape line before pulling. For bleeds, touch up with a small artist brush.' },
    };
    return map[mistake] || map.primer;
  };

  const rec = getFix();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>🎨 DFW PAINTING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW DIY Painting Mistakes Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>The most common painting mistakes DFW homeowners make — and exactly how to avoid or fix each one.</p>

        <div style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Select a Mistake → How to Avoid or Fix</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>Common DFW DIY Mistake</label>
            <select value={mistake} onChange={e => setMistake(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="primer">Skipping primer</option>
              <option value="heat">Painting in DFW summer heat</option>
              <option value="cutin">Not cutting in before rolling</option>
              <option value="roller">Using cheap rollers</option>
              <option value="feather">Not feathering edges (lap marks)</option>
              <option value="tape">Removing tape wrong</option>
            </select>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>❌ Problem: {rec.problem}</div>
            <div style={{ marginBottom: 8 }}><strong>✅ Avoid:</strong> {rec.avoid}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>🔧 Fix: {rec.fix}</div>
          </div>
        </div>

        {[
          { icon: '🌡️', title: 'DFW Summer Heat is the #1 Enemy', body: 'Dallas summers hit 100°F+ from June–September. At these temperatures, exterior paint dries before it can level — causing brush marks, lap marks, and bubbles. Interior painting in un-air-conditioned homes has the same problem. The fix: paint in the morning, keep AC running, and choose paints with open time extenders.' },
          { icon: '🪣', title: 'The Cheap Roller Tax', body: 'A $2 roller from the discount bin leaves lint, stipple, and an uneven finish that takes 3 coats to cover what a good roller does in 2. Purdy White Dove 9″ 3/8″ nap costs $8 and lasts an entire room. Wooster Sherlock is another DFW painter favorite. Never buy the pack of 10 foam rollers.' },
          { icon: '📐', title: 'Cut-In First, Always', body: 'Rolling first and cutting in second means painting over dried roller edges — visible lines guaranteed. The rule: cut in with a 2″ angled brush around all edges, then roll within 15 minutes while cut-in is still wet. Blending wet-on-wet eliminates edge lines completely.' },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.icon} {card.title}</div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🖌️</div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Skip the Mistakes — Hire a DFW Pro</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with vetted local painters — free quotes, verified reviews.</div>
        </div>
      </div>
    </div>
  );
}

