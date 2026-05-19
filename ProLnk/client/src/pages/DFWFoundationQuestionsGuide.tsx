import { useState } from 'react';

const questions = [
  { q: 'Has your foundation been repaired, and do you have the engineer\’s letter?', a: 'In DFW, foundation repair is extremely common due to expansive black clay (Blackland Prairie soil). If the home has been repaired, demand the engineer\’s letter specifying the repair scope, number of piers, and any remaining movement tolerance. Without it, you have no warranty baseline.' },
  { q: 'What type of foundation do you have?', a: 'Most DFW homes are post-tension concrete slabs. Some older homes (pre-1970) are pier and beam. Post-tension slabs cannot be drilled without cutting cables — a catastrophic and expensive mistake. Know your type before any drilling or landscaping near the foundation.' },
  { q: 'Do you water your foundation perimeter in dry months?', a: 'DFW\’s clay soil shrinks dramatically when dry, causing foundation settlement. The standard recommendation: maintain consistent soil moisture 6–18 inches from the foundation using soaker hoses during summer droughts. This single habit prevents most preventable foundation damage.' },
  { q: 'What is your drainage situation around the house?', a: 'Water pooling against the foundation causes heave (upward movement) and erosion. The ground should slope away from your home at least 6 inches over the first 10 feet. Check your downspout extensions — they should discharge at least 6 feet from the foundation.' },
  { q: 'Do you know the signs of active foundation movement?', a: 'Warning signs: doors or windows that stick or won\’t latch, diagonal cracks from door/window corners, cracks where walls meet ceilings, gaps between walls and ceilings/floors, visible gaps in brick mortar, tilting or separating chimneys, and sloping floors. One sign warrants monitoring; multiple signs warrant an engineer\’s inspection.' },
  { q: 'Have you had a foundation inspection in the last 5 years?', a: 'A licensed structural engineer\’s inspection costs $300–$700 and produces an elevation survey (the gold standard). Avoid "free inspections" from foundation repair companies — they have a financial incentive to recommend repair. Use a PE licensed in Texas.' },
  { q: 'Do you have large trees within 20 feet of your foundation?', a: 'Oak, elm, and pecan trees — common in DFW — have aggressive root systems that extract massive amounts of moisture from clay soil, causing differential settlement. Trees within 20 feet should be monitored; within 10 feet may require root barriers or removal.' },
  { q: 'Do you know what post-tension cables are and where they run?', a: 'Post-tension slabs have high-tension steel cables embedded in a grid pattern. Cutting one (during plumbing work, a core sample, or landscaping) releases enormous force and is irreparable. Before any concrete drilling, a post-tension cable map is mandatory.' },
  { q: 'Is your plumbing slab-penetrating, and has it been tested?', a: 'In DFW slab homes, water and sewer lines pass through or under the slab. Slab leaks are common and cause both foundation damage and mold. A hydrostatic pressure test ($300–$500) checks your plumbing system for leaks without opening the slab.' },
  { q: 'Do you have a French drain or other drainage system?', a: 'French drains, surface drains, and channel drains are common in DFW to manage our heavy rainfall (38″ average annual). Know where yours drain to, when they were last cleaned, and whether they\’re functioning — clogged drains defeat their entire purpose.' },
  { q: 'What is the Plasticity Index (PI) of your soil?', a: 'DFW soils typically have a PI of 30–60, indicating highly expansive clay. This is published data available from county soil surveys (NRCS Web Soil Survey). Higher PI = greater seasonal movement = greater foundation maintenance requirement.' },
  { q: 'Do you have a crawl space, and is it ventilated and dry?', a: 'Pier and beam homes have crawl spaces that must stay dry and ventilated to prevent wood rot and mold. Check for standing water, musty odors, deteriorating vapor barriers, and adequate cross-ventilation through foundation vents. Seal all plumbing penetrations.' },
  { q: 'Are your gutters functioning and properly sized?', a: 'Oversized rainfall from DFW storms (3″+ per hour events) overwhelms undersized gutters, dumping water directly against the foundation. 6-inch gutters outperform standard 5-inch gutters significantly. Clean gutters 2–4 times per year, especially after spring oak pollen season.' },
  { q: 'Do you know the difference between cosmetic and structural cracks?', a: 'Hairline cracks under 1/8″ wide and horizontal are usually cosmetic. Stair-step cracks in brick, diagonal cracks wider than 1/4″, or any crack with vertical or horizontal displacement (one side higher than the other) are structural and require professional evaluation.' },
  { q: 'Do you have a foundation warranty from a previous repair?', a: 'Most DFW foundation repair companies offer lifetime warranties on pier installations, but these warranties are company-specific and often non-transferable. Understand what your warranty covers: re-leveling, additional piers, or just the piers already installed.' },
];

export default function DFWFoundationQuestionsGuide() {
  const [open, setOpen] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(Array(questions.length).fill(false));

  const toggle = (i: number) => setOpen(open === i ? null : i);
  const check = (i: number) => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const score = checked.filter(Boolean).length;
  const risk = score >= 12 ? { label: '🏆 Foundation Savvy', color: '#16a34a', msg: null } : score >= 8 ? { label: '⚠️ Moderate Risk', color: '#ca8a04', msg: 'You have key knowledge gaps that could cost you in DFW\’s challenging soil conditions.' } : { label: '🚨 High Risk', color: '#dc2626', msg: 'DFW foundations are the highest-maintenance structural element. These knowledge gaps put your largest asset at risk.' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Foundation Knowledge Guide</h1>
          <p style={{ color: '#8899aa', fontSize: 15 }}>15 foundation questions critical for every DFW homeowner on expansive clay soil</p>
          <div style={{ marginTop: 12, background: '#1a2a40', borderRadius: 8, padding: '10px 24px', display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{score}</span>
            <span style={{ color: '#8899aa', fontSize: 14 }}> / {questions.length} — </span>
            <span style={{ color: risk.color, fontWeight: 700 }}>{risk.label}</span>
          </div>
        </div>
        {risk.msg && score > 0 && (
          <div style={{ background: '#2a1515', border: `1px solid ${risk.color}`, borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#fca5a5′ }}>
            ⚠️ {risk.msg}
          </div>
        )}
        <div style={{ background: '#12243a', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#7da5cc', borderLeft: '3px solid #F5E642′ }}>
          💡 DFW Fact: The Dallas-Fort Worth area sits on some of the most expansive clay soils in the United States. Annual soil moisture swings can move foundations up to 4 inches vertically. This makes foundation knowledge non-optional for DFW homeowners.
        </div>
        {questions.map((item, i) => (
          <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, border: checked[i] ? '1.5px solid #F5E642′ : '1.5px solid #1e3050' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', gap: 12 }} onClick={() => toggle(i)}>
              <span onClick={e => { e.stopPropagation(); check(i); }} style={{ fontSize: 20, cursor: 'pointer' }}>{checked[i] ? '✅' : '⬜'}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{i + 1}. {item.q}</span>
              <span style={{ color: '#F5E642', fontSize: 18 }}>{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && <div style={{ padding: '0 16px 16px 52px', color: '#aabbcc', fontSize: 14, lineHeight: 1.7 }}>{item.a}</div>}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 28, color: '#8899aa', fontSize: 13 }}>Powered by <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's trusted home services marketplace</div>
      </div>
    </div>
  );
}
