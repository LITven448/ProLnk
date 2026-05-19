import { useState } from 'react';

const STAIN_TYPES = ['Clay soil on concrete/driveway', 'Hard water on fixtures', 'Algae/mildew on siding', 'Bird droppings on light finishes', 'Rust stains on concrete', 'Grease on driveway'];
const SURFACES = ['Concrete / Driveway', 'Vinyl siding', 'Brick / Masonry', 'Porcelain / Tile fixtures', 'Wood deck', 'Painted surface'];

const guide: Record<string, { method: string; products: string; prevention: string; difficulty: string }> = {
  'Clay soil on concrete/driveway': {
    method: 'Let clay dry completely first — never scrub wet DFW clay. Then use a stiff brush + alkaline degreaser. Pressure wash at 2500+ PSI after pre-treatment soak (15 min).',
    products: 'Zep Driveway & Concrete Cleaner (Home Depot), Simple Green Concrete Cleaner. For tough stains: muriatic acid diluted 1:10 (use eye protection).',
    prevention: 'Seal concrete every 2–3 years. DFW\’s clay-heavy soil (Blackland Prairie) tracks easily — rubber boot scraper at entry points helps.',
    difficulty: '⚡ Moderate — DFW clay is iron-rich and stains fast'
  },
  'Hard water on fixtures': {
    method: 'Apply white vinegar (undiluted) or CLR directly to fixture. Let soak 30–60 min. Scrub with non-abrasive pad. DFW water hardness averages 200–400 ppm — stubborn buildup needs CLR or Bar Keepers Friend.',
    products: 'CLR Calcium Lime Rust (Walmart, Home Depot), Bar Keepers Friend powder, white vinegar. For chrome: Lime-A-Way spray.',
    prevention: 'Whole-home water softener is the long-term fix for DFW hard water. Cost: $800–$2,500 installed. Interim: wipe fixtures dry after each use.',
    difficulty: '✅ Easy — but DFW hard water requires more frequent cleaning'
  },
  'Algae/mildew on siding': {
    method: 'Mix 1 part bleach to 4 parts water + 1 oz dish soap. Apply with garden sprayer. Wait 15 min. Rinse from top down with garden hose. DFW humid pockets (near creeks, shaded north sides) breed algae fast.',
    products: 'Wet & Forget Outdoor (Lowe\’s) — no scrubbing needed, works over 2 weeks. For immediate removal: Mold Armor E-Z House Wash (Home Depot).',
    prevention: 'Trim trees and shrubs to increase airflow. Zinc strips on roofline prevent algae from washing down siding. Re-treat annually in spring.',
    difficulty: '✅ Easy — prevention is the key in DFW humidity pockets'
  },
  'Bird droppings on light finishes': {
    method: 'Never scrub dry bird droppings — the uric acid etches paint. Soak with warm water 5 min first, then wipe gently. For cured droppings: Auto Detailer spray or diluted dish soap. Rinse well.',
    products: 'Chemical Guys Bird Dropping Remover (AutoZone), Meguiar\’s Quick Detailer. For siding: Simple Green diluted 1:5.',
    prevention: 'Bird spikes on fence tops and window sills. Reflective tape or predator decoys near problem areas. In DFW, grackles are the main culprit — most active March–November.',
    difficulty: '✅ Easy if caught early — difficult if left to cure in DFW summer heat'
  },
  'Rust stains on concrete': {
    method: 'Apply Iron OUT powder (make paste with water) directly to rust stain. Let sit 30 min. Scrub with stiff brush. Rinse. For severe stains: oxalic acid solution. DFW irrigation systems with well water leave heavy rust lines.',
    products: 'Iron OUT Powder (Walmart), CLR Pro Calcium Lime Rust, Singerman Concrete Rust Remover. Do not use bleach — it sets rust stains permanently.',
    prevention: 'Adjust irrigation heads away from concrete. Install rust filters on irrigation if using well water. Seal concrete to reduce porosity.',
    difficulty: '⚡ Moderate — DFW irrigation rust is a very common issue'
  },
  'Grease on driveway': {
    method: 'Absorb fresh grease with cat litter or sawdust first (let sit 1 hour). Sweep up. Apply degreaser, scrub with stiff brush, pressure wash. Old set grease may need muriatic acid treatment after degreasing.',
    products: 'Zep Heavy-Duty Degreaser, Purple Power Degreaser (both at Walmart/Home Depot). For deep stains: Oil Eater Cleaner Degreaser concentrate.',
    prevention: 'Concrete sealer reduces grease absorption dramatically. Drip pan under vehicles with known leaks. DFW heat accelerates grease penetration — treat spills same day.',
    difficulty: '⚡ Moderate — old set grease in porous DFW limestone aggregate concrete is tough'
  },
};

export default function DFWHomeStainRemovalGuide() {
  const [stain, setStain] = useState('');
  const [surface, setSurface] = useState('');
  const [result, setResult] = useState<null | typeof guide['Clay soil on concrete/driveway']>(null);

  function handleAnalyze() {
    if (!stain) return;
    setResult(guide[stain]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>🧹 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Home Stain Removal</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW has specific stain challenges: iron-rich clay soil on driveways, hard water mineral buildup on fixtures (200–400 ppm),
          algae in shaded humid areas, and grackle season. Know what works before you waste product.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🎯 Stain Type', value: stain, setter: setStain, options: STAIN_TYPES },
            { label: '🏠 Surface Material', value: surface, setter: setSurface, options: SURFACES },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {options.map(o => (
                  <button key={o} onClick={() => setter(o)}
                    style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: '1.5px solid', cursor: 'pointer', fontSize: '0.85rem',
                      borderColor: value === o ? '#F5E642' : '#1e3a5f', background: value === o ? '#F5E642' : '#111c30',
                      color: value === o ? '#0A1628' : '#cbd5e1', fontWeight: value === o ? 700 : 400 }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleAnalyze} disabled={!stain}
          style={{ background: stain ? '#F5E642' : '#1e3a5f', color: stain ? '#0A1628' : '#475569',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: stain ? 'pointer' : 'default', marginBottom: '2rem' }}>
          Get Removal Method →
        </button>

        {result && (
          <div style={{ background: '#111c30', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>✅ Removal Method</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{result.difficulty}</div>
            </div>
            {[
              { label: '🧽 REMOVAL METHOD', value: result.method },
              { label: '🛒 PRODUCTS AT DFW STORES', value: result.products },
              { label: '🛡️ PREVENTION', value: result.prevention },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>{value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#111c30', borderRadius: 10, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>💡 DFW Stain Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            DFW summer heat sets stains faster — especially on concrete and painted surfaces. Treat stains within 24 hours.
            Store a spray bottle of CLR and Iron OUT in your garage. Most DFW stain issues are preventable with a $20 sealer application every 2–3 years.
          </div>
        </div>
      </div>
    </div>
  );
}
