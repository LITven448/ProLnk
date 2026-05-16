import { useState } from 'react';

export default function DFWSkyLightGuide2026() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');

  const goals = [
    { label: 'Add natural light without adding AC load', guide: 'Best DFW choice: tubular skylight (solar tube). 10–14 inch tube captures and redirects diffuse light — no direct sun, minimal heat gain. No structural change required. Install cost: $500–$900 installed. Compared to traditional 2x4 foot skylight: tubular adds ~5% cooling load vs 15–25% increase for traditional. Ideal for hallways, closets, and bathrooms in DFW homes.' },
    { label: 'Traditional skylight for living room', guide: 'DFW heat reality: a 2x4 foot south-facing skylight adds 500–800 BTU/hour in summer — your AC must compensate. Choose: low-e glazing (required for DFW), between-pane blinds (integral shading reduces gain 75%), and north-facing orientation when possible. VELUX FS fixed skylights with triple-pane low-e: $400–$600 unit, $800–$1,500 installed. Expect 15–25% increase on cooling bill in rooms with south skylights.' },
    { label: 'Venting skylight for bathroom or kitchen', guide: 'Venting skylights add function in DFW — morning ventilation before AC kicks in removes humidity and cooking odors. Manual crank: $500–$800 installed. Electric with rain sensor (closes when rain detected): $900–$1,500 installed — worth the upgrade in DFW where storms arrive fast. Important: ensure electrical circuit available if going electric. Venting also helps flush heat buildup in bonus rooms and second floors.' },
    { label: 'Skylight flashing is leaking', guide: 'DFW most common skylight repair. Thermal expansion at 105°F summer days stresses every flashing joint. Diagnose: interior water stain at skylight frame corners = flashing failure (not glass). Fix options: reseal flange perimeter with compatible roofing sealant (temporary, 2–5 year fix), or full reflash with manufacturer flashing kit ($100–$300) installed by roofer ($300–$600 labor). Full skylight replacement if unit is 15+ years: $1,000–$2,000 installed and solves all flashing issues.' },
    { label: 'Old skylight is fogged or discolored', guide: 'DFW UV destroys skylight glazing seals over time. Fogging between panes = failed seal, condensation trapped inside. Cannot be repaired — glazing unit must be replaced or full skylight replaced. Single-pane acrylic bubbles: yellow and brittle after 10–15 years in DFW sun. Replacement unit cost: $300–$600 for quality glass skylight. If curb or framing is sound, glass unit replacement is straightforward — no new rough opening needed.' },
    { label: 'Fixed vs venting — which is right for DFW?', guide: 'Fixed: lower cost ($300–$500 less), no moving parts, fewer leak points. Best for: rooms with good mechanical ventilation already, difficult-to-reach locations. Venting: electric with rain sensor pays for itself in DFW — use morning ventilation to delay AC startup and flush summer heat. Best for: kitchens, bathrooms, bonus rooms that get hot. DFW verdict: venting with rain sensor is the preferred choice when budget allows — manual venting works but storms arrive too fast to rely on remembering to close.' },
  ];

  const handle = () => {
    const match = goals.find(g => g.label === goal);
    setResult(match ? match.guide : 'Select your skylight goal or concern for DFW-specific guidance.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Skylight Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Skylights in DFW are a balancing act between natural light and heat gain. The right product and orientation makes all the difference in a climate that hits 105°F summers.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌞', title: 'Heat Gain Reality', desc: 'Traditional south-facing skylight adds 500–800 BTU/hr in DFW summer. Low-e glazing and shading blinds reduce this 75%.' },
            { icon: '💡', title: 'Tubular Skylights', desc: 'Best DFW choice for pure light. No structural change, minimal heat gain, perfect for hallways and bathrooms.' },
            { icon: '🌬️', title: 'Venting Skylights', desc: 'Electric + rain sensor is DFW premium pick. Storms arrive fast — manual venting left open = water damage.' },
            { icon: '🔧', title: 'Flashing Failure', desc: 'Most common DFW skylight repair. DFW thermal expansion (20°F–105°F) stresses every flashing joint annually.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e3a5f', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 DFW Skylight Goal Guide</h2>
          <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d4a7a', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select your skylight goal or concern...</option>
            {goals.map(g => <option key={g.label} value={g.label}>{g.label}</option>)}
          </select>
          <button onClick={handle} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get DFW Guide →</button>
          {result && <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ DFW Skylight Best Practices</div>
            <ul style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.9, margin: 0, paddingLeft: 16 }}>
              <li>Low-e glazing mandatory for DFW heat</li>
              <li>North-facing preferred over south</li>
              <li>Rain sensor on venting models</li>
              <li>Inspect flashing every spring</li>
              <li>Curb-mounted outlasts self-flashing</li>
            </ul>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 DFW Cost Ranges 2026</div>
            <ul style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.9, margin: 0, paddingLeft: 16 }}>
              <li>Tubular: $500–$900 installed</li>
              <li>Fixed glass: $800–$1,500 installed</li>
              <li>Venting electric: $900–$1,500</li>
              <li>Flashing repair: $300–$600</li>
              <li>Full replacement: $1,000–$2,000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
