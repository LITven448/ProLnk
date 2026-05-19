import { useState } from 'react';

const ITEMS = [
  { id: 1, cat: 'Termites', risk: 'High', text: 'Have a licensed termite inspector assess your home annually — DFW has Formosan and native subterranean termites' },
  { id: 2, cat: 'Termites', risk: 'High', text: 'Maintain active termite bond (treatment warranty) with a licensed DFW pest company' },
  { id: 3, cat: 'Termites', risk: 'High', text: 'Remove all wood-to-soil contact around home: mulch, firewood, wood trim touching ground' },
  { id: 4, cat: 'Termites', risk: 'Medium', text: 'Fix all moisture issues — leaking pipes and wet wood attract termite colonies' },
  { id: 5, cat: 'Termites', risk: 'Medium', text: 'Know the signs: mud tubes on walls, hollow-sounding wood, discarded wings near windows' },
  { id: 6, cat: 'Mosquitoes', risk: 'High', text: 'Eliminate all standing water weekly — even a bottle cap breeds DFW mosquitoes' },
  { id: 7, cat: 'Mosquitoes', risk: 'Medium', text: 'Stock ornamental ponds with mosquito-eating fish or Bti dunks' },
  { id: 8, cat: 'Mosquitoes', risk: 'Low', text: 'Install door and window screens with no tears or gaps' },
  { id: 9, cat: 'Mosquitoes', risk: 'Low', text: 'Consider quarterly barrier spray service for DFW mosquito season (April-Oct)' },
  { id: 10, cat: 'Rodents', risk: 'High', text: 'Seal all exterior gaps larger than a quarter — mice enter through dime-sized holes' },
  { id: 11, cat: 'Rodents', risk: 'High', text: 'Cap and screen crawl space vents, dryer vents, and attic louvers' },
  { id: 12, cat: 'Rodents', risk: 'Medium', text: 'Store pet food and birdseed in sealed metal or hard plastic containers' },
  { id: 13, cat: 'Cockroaches', risk: 'High', text: 'Seal gaps around pipes, wiring, and plumbing penetrations — DFW roaches enter from sewers' },
  { id: 14, cat: 'Cockroaches', risk: 'Medium', text: 'Apply gel bait or boric acid in cabinets, under appliances, and in wall voids quarterly' },
  { id: 15, cat: 'Cockroaches', risk: 'Medium', text: 'Keep kitchen dry and clean — grease under stovetop is DFW German cockroach fuel' },
  { id: 16, cat: 'General Prevention', risk: 'Medium', text: 'Schedule quarterly exterior perimeter treatment with a licensed DFW pest control company' },
  { id: 17, cat: 'General Prevention', risk: 'Medium', text: 'Trim all vegetation 12 inches away from exterior walls — brush is a highway for pests' },
  { id: 18, cat: 'General Prevention', risk: 'Low', text: 'Check and replace door sweeps and weatherstripping on all exterior doors' },
  { id: 19, cat: 'General Prevention', risk: 'Medium', text: 'Keep attic well-ventilated and dry — heat and moisture attract roaches, wasps, and rodents' },
  { id: 20, cat: 'General Prevention', risk: 'Low', text: 'Know your local DFW extension service pest calendar for seasonal treatment timing' },
];

const RISK_COLOR: Record<string, string> = { High: '#FF6B6B', Medium: '#FF9F6B', Low: '#7EE8A2' };

export default function DFWPestFinalChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const score = Math.round((checked.size / ITEMS.length) * 100);
  const highUnchecked = ITEMS.filter(i => !checked.has(i.id) && i.risk === 'High').length;
  const riskLabel = highUnchecked >= 4 ? 'HIGH RISK 🚨' : highUnchecked >= 2 ? 'MODERATE RISK ⚠️' : score >= 80 ? 'LOW RISK ✅' : 'MODERATE RISK ⚠️';
  const riskColor = highUnchecked >= 4 ? '#FF6B6B' : highUnchecked >= 2 ? '#FF9F6B' : '#7EE8A2';
  const cats = [...new Set(ITEMS.map(i => i.cat))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>DFW HOMEOWNER SERIES</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🐜 DFW Pest Final Checklist</h1>
        <p style={{ color: '#9BB3CC', marginBottom: 24, fontSize: 14 }}>20 things every DFW homeowner should do, know, or have for pest protection.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 130 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642' }}>{score}%</div>
            <div style={{ color: '#9BB3CC', fontSize: 13 }}>{checked.size}/{ITEMS.length} complete</div>
          </div>
          <div style={{ flex: 1, minWidth: 180, background: '#0A1628', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#9BB3CC', letterSpacing: 1, marginBottom: 6 }}>DFW PEST RISK LEVEL</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: riskColor }}>{riskLabel}</div>
            <div style={{ fontSize: 12, color: '#9BB3CC', marginTop: 4 }}>{highUnchecked} high-risk items outstanding</div>
          </div>
        </div>

        {cats.map(cat => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>🐜 {cat}</div>
            {ITEMS.filter(i => i.cat === cat).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  background: checked.has(item.id) ? '#0F2040' : '#111E35',
                  border: `1px solid ${checked.has(item.id) ? '#1E3A5F' : item.risk === 'High' ? '#2A0A0A' : '#1A2F4A'}`,
                  opacity: checked.has(item.id) ? 0.55 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#F5E642' : '#2A4060'}`,
                  background: checked.has(item.id) ? '#F5E642' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>
                  {checked.has(item.id) ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: checked.has(item.id) ? 'line-through' : 'none', color: checked.has(item.id) ? '#5A7A9A' : '#D4E4F4' }}>
                    {item.text}
                  </span>
                  {!checked.has(item.id) && (
                    <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: RISK_COLOR[item.risk], background: '#0A1628', padding: '2px 7px', borderRadius: 10 }}>{item.risk}</span>
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
