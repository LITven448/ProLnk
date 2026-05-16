import { useState } from 'react';

type ExteriorType = 'brick' | 'stucco' | 'wood' | 'vinyl';
type HOAStatus = 'yes' | 'no' | 'unknown';

interface Rec {
  method: string;
  description: string;
  safety: string[];
  removal: string;
  warning?: string;
}

const recs: Record<ExteriorType, Record<string, Rec>> = {
  brick: {
    yes: { method: 'S-hooks on gutters + magnetic clips', description: 'Attach clips to metal trim, use S-hooks on gutter edges — zero drilling into brick required', safety: ['GFCI outdoor outlet required', 'Use 3-prong rated outdoor extension cords', 'Max 3 strands per outlet'], removal: 'Remove before February per most DFW HOA rules — magnetic clips release without damage', warning: 'Drilling brick voids most DFW HOA agreements' },
    no: { method: 'Command outdoor strips + gutter hooks', description: 'Brick-safe adhesive strips for moderate loads; gutter clips for heavier runs', safety: ['GFCI outlet essential', 'Never exceed 80% of rated wattage per strand', 'Use LED lights only — incandescent generate heat that melts clips'], removal: 'Pull tabs at 45° angle — removes cleanly from brick mortar joints' },
  },
  stucco: {
    yes: { method: 'Gutter clips only — no adhesives on stucco', description: 'Stucco cracks with adhesive removal; use gutter and soffit clips exclusively', safety: ['GFCI required — stucco retains moisture', 'Ground lights on separate circuit', 'Inspect outlet covers after any DFW ice storm'], removal: 'Unclip from gutters; never peel adhesives from stucco', warning: 'Adhesive removal regularly damages stucco — repair runs $200-800/section' },
    no: { method: 'Gutter clips + screw-in soffit hooks', description: 'Soffit hooks provide stable anchor without damaging stucco surface', safety: ['Use GFCI protected outdoor outlets', 'Weatherproof outlet covers mandatory in DFW rain season'], removal: 'Unscrew soffit hooks in spring — seal with exterior caulk if needed' },
  },
  wood: {
    yes: { method: 'Staple gun with insulated staples', description: 'Wood siding allows direct stapling — use insulated staples to protect wire coating', safety: ['Never staple through wire — use side of staple only', 'LED only to reduce fire risk', 'Disconnect if temps above 80°F and lights run 6+ hours'], removal: 'Staple remover tool — inspect wood for moisture intrusion after removal' },
    no: { method: 'Staple gun + command strips hybrid', description: 'Staples on wood trim, strips on flat wood surfaces for accent lighting', safety: ['Check for rot before stapling — rotted wood loses hold in DFW wind', 'GFCI outdoor outlet required'], removal: 'Remove staples carefully to avoid splitting aged wood' },
  },
  vinyl: {
    yes: { method: 'Snap-on vinyl siding clips', description: 'Designed specifically for vinyl — clips snap into siding channel without drilling or adhesive', safety: ['Vinyl expands in DFW heat — leave slack in light strands', 'GFCI required', 'Remove lights before April — heat expansion can trap clips'], removal: 'Snap out before summer heat — clips stuck in expanded vinyl require professional removal' },
    no: { method: 'Vinyl clips + gutter hooks', description: 'Full coverage with zero surface damage using purpose-built vinyl clips', safety: ['GFCI outlet required', 'Max 200 lights per 15A circuit', 'Inspect cords after every DFW ice storm'], removal: 'Remove in early January — spring thaw makes vinyl pliable enough to free stuck clips' },
  },
};

export default function DFWHolidayDecorationGuide() {
  const [exterior, setExterior] = useState<ExteriorType | ''>('');
  const [hoa, setHoa] = useState<HOAStatus | ''>('');
  const [result, setResult] = useState<Rec | null>(null);

  function getResult() {
    if (!exterior || !hoa) return;
    const hoaKey = hoa === 'unknown' ? 'yes' : hoa;
    setResult(recs[exterior as ExteriorType]?.[hoaKey] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎄</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Holiday Decoration Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Decorating safely when December temps hit 80°F and HOAs are watching</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌡️ DFW Holiday Climate Reality</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Early December DFW temps can still reach 75-82°F — affects adhesive holds</li>
            <li>December ice storms hit 1-2x per season — outdoor outlets must be GFCI-protected</li>
            <li>Most DFW HOAs require removal by Jan 31 or Feb 1</li>
            <li>Wrong adhesives on brick/stucco cause expensive surface damage</li>
            <li>LED lights are mandatory for safety in warm TX Decembers</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Get Your Decoration Method</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Exterior Type</label>
              <select value={exterior} onChange={e => setExterior(e.target.value as ExteriorType)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select exterior...</option>
                <option value="brick">Brick (most common in DFW)</option>
                <option value="stucco">Stucco / EIFS</option>
                <option value="wood">Wood / Hardie Board</option>
                <option value="vinyl">Vinyl Siding</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>HOA Rules Apply?</label>
              <select value={hoa} onChange={e => setHoa(e.target.value as HOAStatus)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334d6e', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="yes">Yes — HOA community</option>
                <option value="no">No HOA</option>
                <option value="unknown">Not sure</option>
              </select>
            </div>
          </div>
          <button onClick={getResult}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get My Method →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>✅ Recommended Method: {result.method}</h2>
            <p style={{ color: '#cbd5e1', marginBottom: 16, lineHeight: 1.6 }}>{result.description}</p>
            {result.warning && <div style={{ background: '#7c2d12', borderRadius: 8, padding: 12, marginBottom: 12, color: '#fca5a5', fontSize: 13 }}>⚠️ {result.warning}</div>}
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>SAFETY CHECKLIST</h3>
              {result.safety.map((s, i) => <div key={i} style={{ color: '#4ade80', fontSize: 13, marginBottom: 4 }}>✓ {s}</div>)}
            </div>
            <div style={{ background: '#112240', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>REMOVAL TIP: </span>
              <span style={{ color: '#cbd5e1', fontSize: 13 }}>{result.removal}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ DFW Outdoor Electrical Must-Know</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['GFCI outdoor outlets are required by DFW building code — test before use', 'Never run extension cords under rugs or through windows', 'Use outdoor-rated extension cords (UL listed, 14 or 16 gauge)', 'Reset GFCI outlets after any ice storm before plugging lights back in'].map((tip, i) => (
              <div key={i} style={{ background: '#1e3a5f', borderRadius: 8, padding: 12, color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>⚡ {tip}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
