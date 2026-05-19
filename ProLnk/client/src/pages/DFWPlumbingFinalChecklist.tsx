import { useState } from 'react';

const ITEMS = [
  { id: 1, cat: 'Know Your System', risk: 'High', text: 'Locate and photograph main water shut-off valve location' },
  { id: 2, cat: 'Know Your System', risk: 'High', text: 'Know shut-off locations under every sink and behind every toilet' },
  { id: 3, cat: 'Know Your System', risk: 'Medium', text: 'Document water heater age, model, and serial number' },
  { id: 4, cat: 'Know Your System', risk: 'Medium', text: 'Note water heater temperature setting (120°F recommended)' },
  { id: 5, cat: 'Prevent Failures', risk: 'High', text: 'Insulate exposed pipes in garage and exterior walls for DFW freezes' },
  { id: 6, cat: 'Prevent Failures', risk: 'High', text: 'Know how to drip faucets during DFW winter storm warnings' },
  { id: 7, cat: 'Prevent Failures', risk: 'Medium', text: 'Install water leak detectors under sinks, dishwasher, and water heater' },
  { id: 8, cat: 'Prevent Failures', risk: 'Medium', text: 'Replace braided supply hoses older than 5 years (burst risk)' },
  { id: 9, cat: 'Prevent Failures', risk: 'Medium', text: 'Check toilet flappers annually — silent leaks waste 200+ gal/day' },
  { id: 10, cat: 'Maintenance', risk: 'Medium', text: 'Flush water heater sediment annually (DFW hard water buildup)' },
  { id: 11, cat: 'Maintenance', risk: 'Medium', text: 'Clean aerators and showerheads from DFW mineral deposits quarterly' },
  { id: 12, cat: 'Maintenance', risk: 'Low', text: 'Run garbage disposal monthly with ice cubes to clean blades' },
  { id: 13, cat: 'Maintenance', risk: 'Medium', text: 'Hydro-jet or snake main sewer line every 2-3 years (DFW clay soil shifts)' },
  { id: 14, cat: 'Maintenance', risk: 'Low', text: 'Check outdoor hose bibs for slow drips and replace washers' },
  { id: 15, cat: 'DFW-Specific', risk: 'High', text: 'Have a plumber scope your sewer line for root intrusion (DFW trees)' },
  { id: 16, cat: 'DFW-Specific', risk: 'High', text: 'Check water pressure — DFW municipal pressure can exceed 80 PSI (damage risk)' },
  { id: 17, cat: 'DFW-Specific', risk: 'Medium', text: 'Install whole-house water softener if hardness exceeds 15 gpg' },
  { id: 18, cat: 'DFW-Specific', risk: 'Medium', text: 'Test water heater anode rod every 3 years in hard water areas' },
  { id: 19, cat: 'Emergency Ready', risk: 'High', text: 'Save a licensed DFW plumber number before you need one at 2am' },
  { id: 20, cat: 'Emergency Ready', risk: 'Medium', text: 'Know signs of slab leak: warm spots on floor, high water bill, low pressure' },
];

const RISK_COLOR: Record<string, string> = { High: '#FF6B6B', Medium: '#FF9F6B', Low: '#7EE8A2′ };

export default function DFWPlumbingFinalChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const score = Math.round((checked.size / ITEMS.length) * 100);
  const highUnchecked = ITEMS.filter(i => !checked.has(i.id) && i.risk === 'High').length;
  const riskLevel = highUnchecked >= 3 ? 'HIGH RISK' : highUnchecked >= 1 ? 'MODERATE RISK' : score >= 80 ? 'LOW RISK' : 'MODERATE RISK';
  const riskColor = riskLevel === 'HIGH RISK' ? '#FF6B6B' : riskLevel === 'MODERATE RISK' ? '#FF9F6B' : '#7EE8A2';
  const cats = [...new Set(ITEMS.map(i => i.cat))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>DFW HOMEOWNER SERIES</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🔧 DFW Plumbing Final Checklist</h1>
        <p style={{ color: '#9BB3CC', marginBottom: 24, fontSize: 14 }}>20 things every DFW homeowner should do, know, or have for plumbing.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642′ }}>{score}%</div>
            <div style={{ color: '#9BB3CC', fontSize: 13 }}>{checked.size} of {ITEMS.length} complete</div>
          </div>
          <div style={{ flex: 1, minWidth: 160, background: '#0A1628', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#9BB3CC', letterSpacing: 1, marginBottom: 6 }}>DFW RISK LEVEL</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: riskColor }}>{riskLevel}</div>
            <div style={{ fontSize: 12, color: '#9BB3CC', marginTop: 4 }}>{highUnchecked} high-priority items unchecked</div>
          </div>
        </div>

        {cats.map(cat => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>● {cat}</div>
            {ITEMS.filter(i => i.cat === cat).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  background: checked.has(item.id) ? '#0F2040′ : '#111E35', border: `1px solid ${checked.has(item.id) ? '#1E3A5F' : '#1A2F4A'}`,
                  opacity: checked.has(item.id) ? 0.55 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#F5E642' : '#2A4060'}`,
                  background: checked.has(item.id) ? '#F5E642′ : ’transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>
                  {checked.has(item.id) ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: checked.has(item.id) ? 'line-through' : 'none', color: checked.has(item.id) ? '#5A7A9A' : '#D4E4F4′ }}>
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
