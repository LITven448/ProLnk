import { useState } from 'react';

const materials = ['Concrete', 'Natural Stone (Limestone)', 'Natural Stone (Granite)', 'Brick', 'Pavers', 'Flagstone'];
const conditions = ['Extreme Sun + Heat', 'Moderate Sun', 'High Foot Traffic', 'Pool / Wet Area', 'Driveway Stain Exposure'];

const sealerMap: Record<string, Record<string, { sealer: string; frequency: string; cost: string; note: string }>> = {
  'Concrete': {
    'Extreme Sun + Heat': { sealer: 'Solvent-Based Penetrating Silane/Siloxane', frequency: 'Every 3–5 years', cost: '$0.15–$0.40/sq ft', note: 'Water-based sealers fail fast in DFW UV — solvent-based penetrates deeper and lasts longer' },
    'Moderate Sun': { sealer: 'Water-Based Penetrating Silicate', frequency: 'Every 3–4 years', cost: '$0.10–$0.30/sq ft', note: 'Good balance of cost and protection for partially shaded DFW concrete' },
    'High Foot Traffic': { sealer: 'Acrylic or Polyurethane Topcoat Sealer', frequency: 'Every 2–3 years', cost: '$0.20–$0.50/sq ft', note: 'Surface sealer wears under foot traffic — plan for more frequent reapplication' },
    'Pool / Wet Area': { sealer: 'Penetrating Silane + Non-Slip Topcoat', frequency: 'Every 2–3 years', cost: '$0.25–$0.55/sq ft', note: 'Non-slip additive mandatory for DFW pool decks — wet surface injuries are common' },
    'Driveway Stain Exposure': { sealer: 'Solvent-Based Acrylic or Epoxy Sealer', frequency: 'Every 2–4 years', cost: '$0.20–$0.45/sq ft', note: 'Repels oil and tire marks — DFW heat bakes stains in fast without sealer' },
  },
  'Natural Stone (Limestone)': {
    'Extreme Sun + Heat': { sealer: 'Penetrating Impregnator (Solvent-Based)', frequency: 'Every 2–3 years', cost: '$0.30–$0.70/sq ft', note: 'DFW limestone is porous and acid-sensitive — no topcoat sealers, penetrating only' },
    'Moderate Sun': { sealer: 'Penetrating Water-Based Impregnator', frequency: 'Every 3–4 years', cost: '$0.20–$0.50/sq ft', note: 'Limestone needs breathable sealer — DFW moisture drives efflorescence without it' },
    'High Foot Traffic': { sealer: 'Penetrating Sealer + Color Enhancer', frequency: 'Every 2 years', cost: '$0.35–$0.80/sq ft', note: 'High traffic wears limestone fast in DFW heat — color enhancer restores faded stone' },
    'Pool / Wet Area': { sealer: 'Penetrating Silane/Siloxane (Chlorine-Resistant)', frequency: 'Every 2 years', cost: '$0.35–$0.75/sq ft', note: 'Pool chemicals degrade standard sealers — use chlorine-resistant formula' },
    'Driveway Stain Exposure': { sealer: 'Penetrating Impregnator + Oil Repellent', frequency: 'Every 2–3 years', cost: '$0.30–$0.65/sq ft', note: 'Limestone driveways stain easily — oil repellent formula is essential in DFW' },
  },
  'Natural Stone (Granite)': {
    'Extreme Sun + Heat': { sealer: 'Penetrating Silicone Impregnator', frequency: 'Every 5–7 years', cost: '$0.25–$0.55/sq ft', note: 'Granite is dense and UV-stable — DFW heat has minimal impact, focus on stain resistance' },
    'Moderate Sun': { sealer: 'Penetrating Impregnator (Water-Based OK)', frequency: 'Every 5–8 years', cost: '$0.20–$0.45/sq ft', note: 'Granite needs minimal maintenance — sealer mostly for oil/water stain prevention' },
    'High Foot Traffic': { sealer: 'Penetrating Impregnator', frequency: 'Every 4–6 years', cost: '$0.20–$0.50/sq ft', note: 'Granite handles traffic well — sealer frequency depends on exposure to oils/food' },
    'Pool / Wet Area': { sealer: 'Penetrating Water-Repellent Impregnator', frequency: 'Every 4–5 years', cost: '$0.25–$0.55/sq ft', note: 'Granite resists pool chemicals well — maintain sealer to prevent algae staining' },
    'Driveway Stain Exposure': { sealer: 'Penetrating Oil-Repellent Sealer', frequency: 'Every 4–6 years', cost: '$0.25–$0.50/sq ft', note: 'Granite driveways are low-maintenance in DFW — annual inspection is sufficient' },
  },
  'Brick': {
    'Extreme Sun + Heat': { sealer: 'Penetrating Silane/Siloxane (Breathable)', frequency: 'Every 5–7 years', cost: '$0.15–$0.35/sq ft', note: 'Brick must breathe — film-forming sealers trap moisture and cause spalling in DFW heat' },
    'Moderate Sun': { sealer: 'Penetrating Silane Sealer', frequency: 'Every 5–7 years', cost: '$0.12–$0.30/sq ft', note: 'DFW brick is generally low maintenance — sealer extends life and prevents staining' },
    'High Foot Traffic': { sealer: 'Penetrating Silane + Efflorescence Inhibitor', frequency: 'Every 4–5 years', cost: '$0.20–$0.40/sq ft', note: 'High-traffic brick shows efflorescence in DFW humidity — inhibitor formula is worth it' },
    'Pool / Wet Area': { sealer: 'Penetrating Silane/Siloxane (Chlorine-Safe)', frequency: 'Every 3–5 years', cost: '$0.20–$0.45/sq ft', note: 'Pool brick exposed to chemicals and humidity — check sealer annually' },
    'Driveway Stain Exposure': { sealer: 'Penetrating Oil-Repellent Silane', frequency: 'Every 4–6 years', cost: '$0.15–$0.35/sq ft', note: 'DFW driveway brick is surprisingly durable — oil repellent sealer handles most stains' },
  },
  'Pavers': {
    'Extreme Sun + Heat': { sealer: 'Solvent-Based Acrylic Paver Sealer (Wet Look)', frequency: 'Every 3–4 years', cost: '$0.25–$0.55/sq ft', note: 'Wet-look acrylic pops color and blocks DFW UV — sand joints must be polymeric first' },
    'Moderate Sun': { sealer: 'Water-Based Acrylic Paver Sealer', frequency: 'Every 3–5 years', cost: '$0.15–$0.40/sq ft', note: 'Water-based works fine in moderate sun — easier to apply and recoat than solvent' },
    'High Foot Traffic': { sealer: 'Polyurethane or Solvent Acrylic Paver Sealer', frequency: 'Every 2–3 years', cost: '$0.30–$0.60/sq ft', note: 'High traffic areas strip paver sealer quickly in DFW — polyurethane lasts longer' },
    'Pool / Wet Area': { sealer: 'Solvent-Based Paver Sealer + Non-Slip', frequency: 'Every 2–3 years', cost: '$0.30–$0.65/sq ft', note: 'Non-slip grit additive is non-negotiable for DFW pool paver decks' },
    'Driveway Stain Exposure': { sealer: 'Solvent-Based Acrylic with Oil Repellent', frequency: 'Every 3–4 years', cost: '$0.25–$0.55/sq ft', note: 'Seals joint sand and repels oil — DFW heat bakes oil stains into unsealed pavers quickly' },
  },
  'Flagstone': {
    'Extreme Sun + Heat': { sealer: 'Penetrating Impregnator (Solvent-Based)', frequency: 'Every 3–5 years', cost: '$0.30–$0.65/sq ft', note: 'Flagstone varies by type — test sealer on small section first for DFW compatibility' },
    'Moderate Sun': { sealer: 'Penetrating Water-Based Impregnator', frequency: 'Every 3–5 years', cost: '$0.20–$0.50/sq ft', note: 'Natural flagstone benefits from penetrating sealer to prevent DFW UV bleaching' },
    'High Foot Traffic': { sealer: 'Penetrating + Topcoat Combo', frequency: 'Every 2–3 years', cost: '$0.35–$0.75/sq ft', note: 'Flagstone joints erode under heavy DFW foot traffic — repoint with polymeric sand first' },
    'Pool / Wet Area': { sealer: 'Penetrating Non-Slip Impregnator', frequency: 'Every 2–3 years', cost: '$0.30–$0.65/sq ft', note: 'Wet flagstone is extremely slippery — non-slip sealer is a safety requirement' },
    'Driveway Stain Exposure': { sealer: 'Penetrating Oil-Repellent Impregnator', frequency: 'Every 3–5 years', cost: '$0.25–$0.60/sq ft', note: 'Flagstone driveways are uncommon in DFW but look great — oil repellent is essential' },
  },
};

export default function DFWSealerComparisonGuide() {
  const [material, setMaterial] = useState('');
  const [condition, setCondition] = useState('');
  const result = material && condition ? sealerMap[material]?.[condition] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🛡️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          DFW Sealer Comparison Guide
        </h1>
        <p style={{ color: '#aac', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW's extreme UV, clay soil movement, and temperature swings demand specific sealer types. Penetrating vs. surface, solvent vs. water-based — the right choice depends on your material and conditions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '☀️ Penetrating Sealers', desc: 'Bond inside the material. Breathable, long-lasting, ideal for DFW extreme heat. Invisible finish.' },
            { label: '✨ Surface Sealers', desc: 'Film on top. Wet-look finish, needs more frequent reapplication in DFW UV conditions.' },
            { label: '🧪 Solvent-Based', desc: 'Deeper penetration, longer DFW UV life. Stronger fumes, longer dry time, better for dense materials.' },
            { label: '💧 Water-Based', desc: 'Easier application, lower VOCs. Performs well in moderate DFW exposure. Recoat more often.' },
          ].map(item => (
            <div key={item.label} style={{ background: '#0f1f3d', borderRadius: 10, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{item.label}</div>
              <div style={{ color: '#aac', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔍 Find Your Sealer</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Surface Material</label>
            <select value={material} onChange={e => setMaterial(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334′ }}>
              <option value=''>Select material...</option>
              {materials.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>DFW Conditions</label>
            <select value={condition} onChange={e => setCondition(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334′ }}>
              <option value=''>Select condition...</option>
              {conditions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ background: '#122040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Sealer Recommendation</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#aac' }}>Sealer Type: </span><strong>{result.sealer}</strong></div>
              <div><span style={{ color: '#aac' }}>DFW Resealing Frequency: </span><strong style={{ color: '#F5E642′ }}>{result.frequency}</strong></div>
              <div><span style={{ color: '#aac' }}>Estimated Cost: </span><strong>{result.cost}</strong></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#cce', fontSize: '0.9rem' }}>
                💡 {result.note}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📅 DFW Sealing Timeline Tips</h2>
          <ul style={{ color: '#ccd', lineHeight: 2.1, paddingLeft: '1.25rem', margin: 0 }}>
            <li>Best time to seal in DFW: March–May or September–October</li>
            <li>Never seal in summer afternoon heat — bubbling and clouding guaranteed</li>
            <li>New concrete: wait 28 days minimum before sealing</li>
            <li>Check sealer performance: water should bead — if it soaks in, reseal time</li>
            <li>Strip old surface sealers before reapplying — don't layer incompatible products</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
