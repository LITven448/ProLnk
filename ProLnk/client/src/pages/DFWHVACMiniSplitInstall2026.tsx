import { useState } from 'react';

export default function DFWHVACMiniSplitInstall2026() {
  const [situation, setSituation] = useState('');

  const guides: Record<string, string> = {
    garage: 'Garage mini-splits in DFW: You need a 240V/30A dedicated circuit run to the garage (typical $400-700 by electrician). Line set usually runs 15-25 ft along the wall and through the exterior. Condensate can drain to the floor with a simple drain line. Permit required in most DFW cities. Expect 1-day install. Total installed cost: $3,200-5,500 for a 12,000-18,000 BTU unit.',
    addition: 'Home addition mini-splits: No ductwork needed — major cost savings. 240V circuit from your panel (have electrician quote this separately). Line set runs up to 50-75 ft for most residential units. Condensate drain typically ties into the nearest drain line or exits through the wall. Permit required. DFW inspectors check refrigerant line insulation carefully. Budget $4,000-7,000 installed for 18,000-24,000 BTU.',
    sunroom: 'Sunroom mini-splits in DFW: High solar load — size up 20-25% vs standard calculation. Ceiling mount or high wall mount recommended for even distribution. 240V circuit required. Line set often runs through the attic or along the exterior. DFW summers mean this system will run hard June-September. Choose a unit with at least 18 SEER2. Budget $3,500-6,000 installed.',
    whole: 'Whole-home multi-zone mini-split in DFW: One outdoor unit (36,000-60,000 BTU) connects to 3-5 indoor heads. Each zone needs its own 240V circuit or shared circuit depending on brand/config. Line sets can run 25-100 ft per zone. Permits required — often a full HVAC permit with load calculation. Installation takes 2-3 days. Budget $12,000-22,000 for a 4-zone system. ROI vs forced air: 15-20% energy savings typical in DFW climate.',
    existing: 'Adding a mini-split to an existing HVAC home: Hybrid approach — mini-split handles one problem area (hot room, garage, addition) while central HVAC handles the rest. Minimal disruption. Standard 240V circuit and short line set. No permit needed in some DFW cities for single-zone under 5 tons. Budget $2,800-4,500 for a single-zone 9,000-12,000 BTU unit installed.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 4 }}>🌬️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Mini-Split Installation Deep Dive 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 28 }}>What mini-split installation actually involves in DFW — electrical, line sets, permits, and real costs.</p>

        {[
          { label: 'Line Set', emoji: '🔗', desc: 'Copper refrigerant lines connecting indoor and outdoor units. Max run 50-75 ft for most residential units. Must be insulated — DFW sun degrades uninsulated lines fast.' },
          { label: 'Electrical', emoji: '⚡', desc: 'Dedicated 240V circuit required for each outdoor unit. Electrician cost: $350-700 depending on panel distance. Budget this separately from HVAC quote.' },
          { label: 'Condensate Drain', emoji: '💧', desc: 'Indoor units produce condensate (water). Must drain to floor drain, exterior, or plumbing. Pump required if drain runs uphill. Improper drainage = water damage.' },
          { label: 'Vacuum & Leak Test', emoji: '🧪', desc: 'System must be pulled to deep vacuum before refrigerant charge. Leak test confirms no refrigerant loss. Skip this step = short equipment life.' },
          { label: 'Permits', emoji: '📋', desc: 'Most DFW cities require a mechanical permit for mini-split installation. Some (Plano, Frisco) strictly enforce. Budget $150-400 for permit fees. Inspectors check electrical and refrigerant lines.' },
        ].map(item => (
          <div key={item.label} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px', marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.emoji} {item.label}</div>
            <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Your Installation Situation</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, marginBottom: 16 }}>
            <option value="">Select your situation...</option>
            <option value="garage">Unconditioned garage</option>
            <option value="addition">New home addition</option>
            <option value="sunroom">Sunroom or enclosed porch</option>
            <option value="whole">Whole-home multi-zone replacement</option>
            <option value="existing">Adding to existing HVAC home</option>
          </select>
          {situation && guides[situation] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px', color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{guides[situation]}</div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 10, padding: '16px 20px' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 ProLnk</span>
          <span style={{ color: '#a0aec0', marginLeft: 8 }}>matches DFW homeowners with licensed HVAC installers who include permits and proper commissioning.</span>
        </div>
      </div>
    </div>
  );
}
