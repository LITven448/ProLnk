import { useState } from 'react';

export default function DFWHVACMiteControl2026() {
  const [pest, setPest] = useState('');
  const [result, setResult] = useState('');

  const pests = [
    { name: 'Cockroaches in Ductwork', icon: '🪳', detail: 'Love warm DFW ducts. Enter via returns, nest near air handler. Signs: egg casings in vents, musty odor from registers.' },
    { name: 'Mice via Condensate Drain', icon: '🐭', detail: 'Enter through 3/4″ condensate drain line from outside. Can chew insulation on refrigerant lines. Seal with fine mesh.' },
    { name: 'Wasps in Outdoor Unit', icon: '🐝', detail: 'Build nests in condenser cabinet, especially in spring. Can damage wiring. Always disconnect power before inspecting.' },
    { name: 'Biological Growth on Coils', icon: '🦠', detail: 'Mold, mildew, algae on evaporator coil — common in DFW humidity. UV light kills growth continuously. Safe for HVAC components.' },
  ];

  const guides: Record<string, string> = {
    cockroach: '🪳 COCKROACH PROTOCOL: (1) Seal all return air gaps with metal mesh. (2) Professional duct cleaning — do NOT use bug spray in ducts (toxic air). (3) Boric acid bait stations near air handler. (4) HVAC tech to inspect for duct breach. Cost: $200–$500 duct cleaning.',
    mouse: '🐭 MOUSE PROTOCOL: (1) Locate condensate drain exit on exterior — install 1/4″ mesh cap (keep drain flowing). (2) Check insulation on suction line for chew damage — replace if compromised. (3) Snap traps in mechanical room, not poison (dead mice in ducts = worse problem). Cost: $50–$200.',
    wasp: '🐝 WASP PROTOCOL: (1) Turn off power to condenser at disconnect box. (2) Remove cabinet side panel carefully. (3) Pest pro to remove nest — do NOT spray aerosol near capacitors. (4) Check wiring for damage after removal. Seasonal: inspect every April in DFW. Cost: $75–$150.',
    uv: '🦠 UV LIGHT PROTOCOL: (1) Single-lamp UV ($150–$300 installed) kills mold on coil surface. (2) Dual-lamp UV ($300–$600) also treats airstream. (3) Replace UV bulb annually — loses effectiveness. (4) Also run drain pan tablets monthly. DFW recommendation: install UV if coil cleaned more than once per year.',
  };

  const assess = () => {
    if (!pest) { setResult('Please select a pest type.'); return; }
    setResult(guides[pest] || 'Select a pest type for guidance.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
          DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🐝 HVAC Pest Interaction Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW pest pressure is year-round. Cockroaches, mice, wasps, and biological growth all interact with HVAC systems in specific ways. Know the right response for each.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {pests.map(p => (
            <div key={p.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.icon} {p.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{p.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2a40', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 HVAC Pest Protection Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pest Type</label>
            <select value={pest} onChange={e => setPest(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              <option value="">Select pest type...</option>
              <option value="cockroach">Cockroaches in ductwork</option>
              <option value="mouse">Mice via condensate drain</option>
              <option value="wasp">Wasps in outdoor unit</option>
              <option value="uv">Biological growth (mold/algae) on coils</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Protection Guide
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 13, lineHeight: 1.7 }}>{result}</div>}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
          ⚠️ <strong style={{ color: '#F5E642′ }}>Never spray pesticide into ductwork</strong> — it circulates toxic fumes through your home. Always hire a pest pro and HVAC tech together for duct-involved infestations.
        </div>
      </div>
    </div>
  );
}
