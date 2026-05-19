import { useState } from 'react';

export default function DFWMudRoomGuide2026() {
  const [entrySize, setEntrySize] = useState('medium');
  const [lifestyle, setLifestyle] = useState('family');

  const designs: Record<string, Record<string, { design: string; cost: string; features: string[]; flooring: string; permit: string }>> = {
    small: {
      family: { design: 'Mini Command Center', cost: '$2,500–$4,500', flooring: '12x12 porcelain tile — most durable for DFW mud/clay', permit: 'No permit needed for interior work', features: ['3-hook wall rail ($150–$300)', 'Bench with shoe storage below', 'Cubbies above hooks for backpacks', 'Tile flooring (LVP second choice)'] },
      outdoor: { design: 'Gear Drop Zone', cost: '$2,000–$4,000', flooring: 'Epoxy paint on concrete slab — easy clean for pool gear', permit: 'No permit — interior only', features: ['Double-height hooks for sports gear', 'Drain mat at entry', 'Towel bar for pool/yard use', 'Wall cabinet for sunscreen, bug spray'] },
      worker: { design: 'Boot Station', cost: '$1,800–$3,500', flooring: 'Slate tile — handles work boot grit and DFW clay', permit: 'No permit required', features: ['Boot tray built-in ($100 DIY)', 'Extra-deep boot hooks', 'Shelf for hard hat and gear', 'Durable hook rail at two heights'] },
    },
    medium: {
      family: { design: 'Family Hub Mudroom', cost: '$4,500–$8,000', flooring: '16x16 porcelain tile with warm grout — standard DFW install', permit: 'No permit for interior; permit if moving plumbing', features: ['Built-in bench + cubbies per family member', 'Upper cabinet storage (seasonal items)', 'Charging drawer for devices', 'Mail and key drop center'] },
      outdoor: { design: 'DFW Outdoor Lifestyle Entry', cost: '$4,000–$7,500', flooring: 'LVP waterproof planks — handles wet pool/rain gear', permit: 'No permit for interior remodel', features: ['Pool gear hooks + drying area', 'Cubby for sports bags (soccer, baseball common in DFW)', 'Bench with removable cushion (stain-resistant)', 'Shelf for sunscreen, bug spray, ball pump'] },
      worker: { design: 'Trades Entry Center', cost: '$3,500–$6,500', flooring: 'Slate or porcelain — handles boots and DFW clay soil', permit: 'No permit — cosmetic interior work', features: ['Oversized boot tray (18x36)', 'Heavy-duty pegboard for tool bags', 'Washable wall paint (semigloss or better)', 'Ventilated cabinet for work clothes'] },
    },
    large: {
      family: { design: 'Full Mudroom Suite', cost: '$7,000–$15,000', flooring: 'Heated tile optional — DFW winters mild but appreciated', permit: 'Permit if adding sink or moving walls', features: ['Custom built-in cabinetry full wall', 'Per-person cubbies with doors', 'Laundry hookup option (washer/dryer)', 'Utility sink ($500–$1,500 + plumbing)'] },
      outdoor: { design: 'Pool + Outdoor Drop Suite', cost: '$6,500–$13,000', flooring: 'Porcelain plank tile — pool-safe and slip-resistant', permit: 'Permit if adding sink or plumbing', features: ['Rinse area or utility sink for pool cleanup', 'Towel cubby system (6+ towel capacity)', 'Separate wet and dry entry zones', 'Refrigerator for pool drinks (add circuit)'] },
      worker: { design: 'Full Work Entry Suite', cost: '$5,500–$12,000', flooring: 'Commercial-grade LVP or slate — durability priority', permit: 'Permit if adding utility sink', features: ['Full tool storage wall', 'Work clothes cabinet with ventilation', 'Utility sink for hands wash', 'Boot drying system (forced air or rack)'] },
    },
  };

  const result = designs[entrySize]?.[lifestyle];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚪</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Mud Room Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>DFW entry chaos: pool gear, work boots, soccer cleats — solved</p>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>📐 Entry Size</label>
              <select value={entrySize} onChange={e => setEntrySize(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="small">Small (under 20 sq ft)</option>
                <option value="medium">Medium (20–50 sq ft)</option>
                <option value="large">Large (50+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🏡 DFW Lifestyle</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="family">Family with Kids</option>
                <option value="outdoor">Outdoor / Pool Lifestyle</option>
                <option value="worker">Trades / Work Boots</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>🏠 {result.design}</span>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>{result.cost}</span>
              </div>
              <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
                {result.features.map((f, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>{f}</li>)}
              </ul>
              <div style={{ background: '#1e293b', borderRadius: 6, padding: '10px 14px', marginBottom: 8 }}>
                <span style={{ color: '#F5E642', fontSize: 13 }}>🧱 Flooring: </span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{result.flooring}</span>
              </div>
              <div style={{ background: '#1e293b', borderRadius: 6, padding: '10px 14px' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>📋 Permit: </span>
                <span style={{ color: '#fff', fontSize: 13 }}>{result.permit}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[{ icon: '🏊', label: 'DFW Pool Homes', value: '40%+ have pools — entry matters' }, { icon: '⚽', label: 'Youth Sports', value: 'DFW: highest youth sports density in TX' }, { icon: '🧱', label: 'Best Entry Floor', value: 'Porcelain tile (DFW clay stains)' }, { icon: '📋', label: 'Permit Needed?', value: 'Rarely for interior work' }].map((s, i) => (
            <div key={i} style={{ background: '#111827', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📞 Get Mudroom Build Quotes</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects DFW homeowners with carpenters and tile pros who build custom mudroom systems — typically 2–5 day project.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Mudroom Quotes →</button>
        </div>
      </div>
    </div>
  );
}
