import { useState } from 'react';

const elements = ['Countertops', 'Cabinets/Frames', 'Flooring/Decking', 'Backsplash', 'Appliance Surrounds'];
const exposures = ['Fully Covered Patio', 'Partially Covered', 'Fully Exposed'];

const recommendations: Record<string, Record<string, { material: string; maintenance: string; cost: string; avoid: string }>> = {
  'Countertops': {
    'Fully Covered Patio': { material: '🥇 Concrete — DFW best pick for covered patios. Dense, heat-resistant, customizable color/texture. Seal every 2 years.', maintenance: 'Seal annually, clean with pH-neutral cleaner, avoid bleach', cost: '$65–$135/sq ft installed', avoid: 'Wood — warps. Marble — stains from DFW BBQ grease.' },
    'Partially Covered': { material: '🥇 Porcelain Tile or Concrete. Porcelain: zero absorption, UV stable, handles DFW rain cycles. Concrete: monitor for thermal cracking.', maintenance: 'Porcelain needs only periodic cleaning. Concrete needs sealing every 18 months.', cost: '$55–$120/sq ft installed', avoid: 'Natural stone without sealer — absorbs DFW humidity and stains' },
    'Fully Exposed': { material: '🥇 Porcelain Tile — the only DFW-rated countertop for full exposure. Freeze-thaw rated, UV-proof, hail-resistant up to 1 inch.', maintenance: 'Minimal — occasional cleaning, inspect grout annually', cost: '$60–$140/sq ft installed', avoid: 'Concrete without enhanced sealer — UV damages sealant. Wood — do not use.' },
  },
  'Cabinets/Frames': {
    'Fully Covered Patio': { material: '🥇 Marine-grade polymer (HDPE) or stainless steel 304. Both handle DFW humidity. HDPE: no rust, no rot, low cost. SS: premium look.', maintenance: 'HDPE: wash with soap and water. SS: wipe with stainless cleaner monthly.', cost: 'HDPE $150–$400/linear ft | SS $300–$800/linear ft', avoid: 'Wood cabinets — DFW humidity causes swelling and warping within 3–5 years' },
    'Partially Covered': { material: '🥇 Stainless steel 304 or powder-coated aluminum. Aluminum: lightweight, no rust, holds powder coat well in DFW sun.', maintenance: 'SS: monthly wipe-down. Aluminum: annual inspection of powder coat for chips.', cost: 'Aluminum $200–$500/linear ft | SS $350–$900/linear ft', avoid: 'Any wood product — moisture cycling in DFW destroys wood cabinets fast' },
    'Fully Exposed': { material: '🥇 Marine-grade stainless steel 316 — the only material rated for DFW full outdoor exposure. Hail-resistant, UV-proof, rust-proof.', maintenance: 'Monthly cleaning with stainless polish to prevent pitting in DFW humidity', cost: '$400–$1,200/linear ft installed', avoid: 'Everything except 304/316 SS and solid polymer' },
  },
  'Flooring/Decking': {
    'Fully Covered Patio': { material: '🥇 Concrete with anti-slip finish or large-format porcelain tile. Concrete: economical, durable. Porcelain: elegant, zero maintenance.', maintenance: 'Concrete: seal every 2 years + power wash annually. Porcelain: annual cleaning.', cost: 'Concrete $4–$12/sq ft | Porcelain $12–$25/sq ft installed', avoid: 'Composite decking in DFW heat — surface temps reach 150°F+, barefoot unusable' },
    'Partially Covered': { material: '🥇 Porcelain pavers (1.25 inch+) — rated for freeze-thaw, UV-stable, stays cooler than composite. Light colors recommended for DFW.', maintenance: 'Annual inspection, replace cracked tiles, seal grout every 2 years', cost: '$15–$35/sq ft installed', avoid: 'Wood decking — even treated lumber delaminates in DFW heat/humidity cycling' },
    'Fully Exposed': { material: '🥇 Concrete or natural travertine — both handle DFW temperature extremes. Travertine stays cooler than porcelain in direct sun.', maintenance: 'Travertine: seal every 1–2 years. Concrete: seal every 2 years + fill cracks promptly.', cost: 'Concrete $6–$15/sq ft | Travertine $18–$40/sq ft', avoid: 'Composite decking, wood, or any organic material in full DFW sun' },
  },
  'Backsplash': {
    'Fully Covered Patio': { material: '🥇 Porcelain or ceramic tile — moisture-resistant, easy to clean BBQ grease, UV-stable, heat-safe near grills.', maintenance: 'Wipe after each cook. Deep clean monthly. Grout seal annually.', cost: '$8–$25/sq ft installed', avoid: 'Natural stone without sealer — BBQ grease stains permanently' },
    'Partially Covered': { material: '🥇 Porcelain tile or stainless steel sheet. SS: zero maintenance, resists DFW UV. Porcelain: more design options.', maintenance: 'SS: wipe with stainless cleaner. Porcelain: standard cleaning.', cost: 'Porcelain $10–$30/sq ft | SS $15–$40/sq ft', avoid: 'Glass tile — DFW thermal expansion causes pop-out failures' },
    'Fully Exposed': { material: '🥇 Stainless steel sheet or freeze-thaw rated porcelain (look for P5 frost rating). Both withstand DFW temperature extremes.', maintenance: 'Minimal — inspect caulk at edges after each DFW winter', cost: '$15–$45/sq ft installed', avoid: 'Glass tile, marble, or unsealed natural stone' },
  },
  'Appliance Surrounds': {
    'Fully Covered Patio': { material: '🥇 Stainless steel 304 — industry standard for DFW outdoor kitchens. Handles heat from grill/smoker proximity.', maintenance: 'Monthly polish, inspect door gaskets annually, check for rust spots at welds', cost: '$500–$3,000 per appliance surround', avoid: 'Painted steel — DFW humidity causes rust under paint within 2 years' },
    'Partially Covered': { material: '🥇 Stainless steel 304 — same recommendation. Partially covered is still significant DFW weather exposure.', maintenance: 'Apply stainless protector quarterly, cover appliances during extended absences', cost: '$600–$3,500 per surround', avoid: 'Powder-coated steel surrounds — coating chips and rust follows in DFW humidity' },
    'Fully Exposed': { material: '🥇 Marine-grade stainless steel 316 — higher nickel content resists pitting in DFW\’s humidity + heat combination.', maintenance: 'Monthly cleaning + protective wax coating, covers when not in use', cost: '$800–$4,500 per surround', avoid: 'Any non-stainless metal — will rust within 1–3 years in full DFW exposure' },
  },
};

export default function DFWOutdoorKitchenMaterialsGuide() {
  const [element, setElement] = useState('');
  const [exposure, setExposure] = useState('');
  const result = element && exposure ? recommendations[element]?.[exposure] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MATERIALS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🍳 Outdoor Kitchen Materials — DFW</h1>
        <p style={{ color: '#9BA3B5', fontSize: 15, marginBottom: 32 }}>DFW's outdoor kitchen season runs 9+ months per year — one of the longest in the US. But DFW heat (115°F surface temps), UV, humidity, and hail demand materials most homeowners underestimate.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌡️', label: 'Surface Temp Reality', text: 'Dark outdoor surfaces in DFW reach 140–170°F in summer. Material expansion/contraction cycles are extreme.' },
            { icon: '⛈️', label: 'Hail Damage', text: 'DFW averages 5-7 significant hail events per year. Select materials rated for 1-inch hail impact.' },
            { icon: '💧', label: 'Humidity Cycles', text: 'DFW swings from drought-dry to 80%+ humidity. Materials must handle both extremes without degrading.' },
            { icon: '🔧', label: 'Premium Materials Pay Off', text: 'DFW outdoor kitchen replacements cost $15K–$80K. Quality materials pay back in 3–5 years vs. cheap alternatives.' },
          ].map(card => (
            <div key={card.label} style={{ background: '#111D35', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{card.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: 12 }}>{card.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Material Recommendation Engine</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>KITCHEN ELEMENT</label>
              <select value={element} onChange={e => setElement(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select element...</option>
                {elements.map(el => <option key={el} value={el}>{el}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>DFW WEATHER EXPOSURE</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select exposure...</option>
                {exposures.map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>RECOMMENDED MATERIAL</div>
              <p style={{ fontSize: 14, marginBottom: 16 }}>{result.material}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>MAINTENANCE</div><div style={{ fontSize: 13 }}>{result.maintenance}</div></div>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>COST RANGE</div><div style={{ fontSize: 13, color: '#F5E642′ }}>{result.cost}</div></div>
              </div>
              <div style={{ background: '#1A0A0A', border: '1px solid #5A2A2A', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FF9B9B' }}>⚠️ Avoid: {result.avoid}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
