import { useState } from 'react';

const ITEMS = [
  { id: 1, cat: 'Moisture Management', overdue: true, text: 'Maintain consistent soil moisture around foundation — DFW clay soil shrinks when dry, swells when wet' },
  { id: 2, cat: 'Moisture Management', overdue: true, text: 'Install and run soaker hose system 18 inches from foundation during dry months (critical May-Sept)' },
  { id: 3, cat: 'Moisture Management', overdue: true, text: 'Ensure gutters drain at least 5 feet away from foundation with downspout extensions' },
  { id: 4, cat: 'Moisture Management', overdue: false, text: 'Confirm positive drainage slope away from foundation on all sides (6 inches per 10 feet)' },
  { id: 5, cat: 'Moisture Management', overdue: false, text: 'Fill any settled areas next to foundation with compacted fill — standing water causes heave' },
  { id: 6, cat: 'Tree & Root Control', overdue: true, text: 'Remove or root-barrier any tree within 1.5x the mature height from foundation' },
  { id: 7, cat: 'Tree & Root Control', overdue: false, text: 'Monitor for root intrusion in plumbing — DFW trees are aggressive in clay soil' },
  { id: 8, cat: 'Tree & Root Control', overdue: false, text: 'Never plant willow, cottonwood, or silver maple near DFW foundations' },
  { id: 9, cat: 'Warning Signs', overdue: true, text: 'Inspect for new cracks in drywall, especially diagonal cracks at door/window corners' },
  { id: 10, cat: 'Warning Signs', overdue: true, text: 'Check all exterior brick for stair-step cracks — early sign of foundation movement' },
  { id: 11, cat: 'Warning Signs', overdue: false, text: 'Confirm all doors and windows open and close properly — sticking is an early foundation indicator' },
  { id: 12, cat: 'Warning Signs', overdue: false, text: 'Walk perimeter and note any separation between walls, trim, or chimney from main structure' },
  { id: 13, cat: 'Professional Inspection', overdue: false, text: 'Have a licensed structural engineer (not a foundation company) assess any significant cracking' },
  { id: 14, cat: 'Professional Inspection', overdue: false, text: 'Get a pre-purchase foundation inspection before buying any DFW home built on clay soil' },
  { id: 15, cat: 'Professional Inspection', overdue: false, text: 'Obtain multiple quotes if repairs are recommended — DFW has many foundation contractors' },
  { id: 16, cat: 'Documentation', overdue: false, text: 'Photograph all interior and exterior cracks annually to track movement over time' },
  { id: 17, cat: 'Documentation', overdue: false, text: 'Keep records of all foundation repairs with engineer reports and warranties' },
  { id: 18, cat: 'Preventive Action', overdue: true, text: 'Install automatic irrigation on a timer to maintain consistent soil moisture year-round' },
  { id: 19, cat: 'Preventive Action', overdue: false, text: 'Re-grade landscaping beds so mulch and soil slope away from home — not toward it' },
  { id: 20, cat: 'Preventive Action', overdue: false, text: 'If foundation has moved historically, get annual elevation surveys by a licensed engineer' },
];

export default function DFWFoundationFinalChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const score = Math.round((checked.size / ITEMS.length) * 100);
  const overdueUnchecked = ITEMS.filter(i => !checked.has(i.id) && i.overdue).length;
  const healthLabel = overdueUnchecked === 0 ? 'HEALTHY 🟢' : overdueUnchecked <= 2 ? 'MONITOR ⚠️' : 'AT RISK 🔴';
  const healthColor = overdueUnchecked === 0 ? '#7EE8A2′ : overdueUnchecked <= 2 ? '#FF9F6B' : '#FF6B6B';
  const cats = [...new Set(ITEMS.map(i => i.cat))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>DFW HOMEOWNER SERIES</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🏗️ DFW Foundation Final Checklist</h1>
        <p style={{ color: '#9BB3CC', marginBottom: 24, fontSize: 14 }}>20 things every DFW homeowner should do, know, or have for foundation health on DFW clay soil.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 130 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642′ }}>{score}%</div>
            <div style={{ color: '#9BB3CC', fontSize: 13 }}>{checked.size}/{ITEMS.length} complete</div>
          </div>
          <div style={{ flex: 1, minWidth: 180, background: '#0A1628', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#9BB3CC', letterSpacing: 1, marginBottom: 6 }}>FOUNDATION HEALTH</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: healthColor }}>{healthLabel}</div>
            <div style={{ fontSize: 12, color: '#9BB3CC', marginTop: 4 }}>{overdueUnchecked} high-priority items overdue</div>
          </div>
        </div>

        {cats.map(cat => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>🏗️ {cat}</div>
            {ITEMS.filter(i => i.cat === cat).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  background: checked.has(item.id) ? '#0F2040′ : '#111E35',
                  border: `1px solid ${checked.has(item.id) ? '#1E3A5F' : item.overdue ? '#2A1A00' : '#1A2F4A'}`,
                  opacity: checked.has(item.id) ? 0.55 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#F5E642' : '#2A4060'}`,
                  background: checked.has(item.id) ? '#F5E642′ : ’transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>
                  {checked.has(item.id) ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: checked.has(item.id) ? 'line-through' : 'none', color: checked.has(item.id) ? '#5A7A9A' : '#D4E4F4′ }}>
                    {item.text}
                  </span>
                  {item.overdue && !checked.has(item.id) && (
                    <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: '#FF9F6B', background: '#1E1000', padding: '2px 7px', borderRadius: 10 }}>OVERDUE</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
