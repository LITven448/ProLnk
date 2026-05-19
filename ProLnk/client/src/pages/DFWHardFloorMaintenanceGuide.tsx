import { useState } from 'react';

const floorTypes = ['Ceramic/Porcelain Tile', 'Luxury Vinyl Plank (LVP)', 'Solid Hardwood', 'Engineered Hardwood'];
const lifestyles = ['Pets + Kids', 'High foot traffic', 'Allergies/clean conscious', 'Work boots / outdoor access'];

function getMaintenancePlan(floor: string, lifestyle: string) {
  const base: Record<string, { sweep: string; mop: string; seasonal: string; products: string; grout: string }> = {
    'Ceramic/Porcelain Tile': { sweep: 'Daily or every 2 days', mop: 'Weekly with pH-neutral cleaner', seasonal: 'Seal grout every 12–18 months in DFW humidity; check for loose tiles after foundation movement', products: 'Rejuvenate Floor Cleaner, Aqua Mix Sealer', grout: 'Every 12–18 months' },
    'Luxury Vinyl Plank (LVP)': { sweep: 'Daily', mop: 'Weekly with LVP-safe cleaner (no steam!)', seasonal: 'Check expansion gaps in winter; DFW temp swings cause contraction — maintain 1/4" perimeter gap', products: 'Bona Hard-Surface Floor Cleaner, Swiffer WetJet (LVP setting)', grout: 'N/A' },
    'Solid Hardwood': { sweep: 'Daily with soft brush', mop: 'Monthly — barely damp only', seasonal: 'Summer: maintain 45–55% humidity to prevent gapping. Winter: use humidifier. DFW dry winters are brutal on solid wood.', products: 'Bona Hardwood Floor Cleaner, Howard Feed-N-Wax', grout: 'N/A' },
    'Engineered Hardwood': { sweep: 'Every 1–2 days', mop: 'Bi-weekly, damp mop only', seasonal: 'More stable than solid but still check for cupping in summer. DFW humidity swings from 20–80% — dramatic for wood floors.', products: 'Bona Hardwood Cleaner, manufacturer-specific options', grout: 'N/A' },
  };
  const plan = base[floor] || base['Luxury Vinyl Plank (LVP)'];
  const extraTip = lifestyle === 'Pets + Kids' ? 'Use microfiber dust mops daily — pet hair + DFW clay soil tracked in accelerates scratching. Place mats at all entries.' : lifestyle === 'Work boots / outdoor access' ? 'DFW red clay tracked in is highly abrasive. Boot trays at entry + mat system is essential. Increase sweep frequency to daily minimum.' : 'Your lifestyle pairs well with standard schedules. Focus on seasonal adjustments for DFW climate extremes.';
  return { ...plan, extraTip };
}

const dfwSpecific = [
  { icon: '🧱', title: 'Clay Soil Tracked In', desc: 'DFW red/black clay is abrasive and stains grout permanently. Entry mats + boot trays protect all hard floor types.' },
  { icon: '💧', title: 'Grout Sealing Frequency', desc: 'DFW humidity (spring/fall) accelerates grout degradation. Seal every 12–18 months minimum, more in kitchens and baths.' },
  { icon: '🌡️', title: 'Temperature Swings', desc: 'DFW sees 100°F+ summers and occasional freezes. LVP and hardwood expand/contract — maintain HVAC consistency year-round.' },
  { icon: '🏗️', title: 'Foundation Movement Impact', desc: 'DFW clay movement can crack tile grout and loosen planks. Annual inspection catches issues before they spread.' },
];

export default function DFWHardFloorMaintenanceGuide() {
  const [floorType, setFloorType] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = floorType && lifestyle ? getMaintenancePlan(floorType, lifestyle) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MAINTENANCE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Hard Floor Maintenance Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>DFW's clay soil, humidity swings, and foundation movement create unique challenges for tile, LVP, and hardwood floors. Here's how to protect your investment.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {dfwSpecific.map(f => (
            <div key={f.title} style={{ background: '#112240', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🧹 Your Personalized Maintenance Schedule</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Floor Type</div>
              <select value={floorType} onChange={e => { setFloorType(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {floorTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>DFW Lifestyle</div>
              <select value={lifestyle} onChange={e => { setLifestyle(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {lifestyles.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!floorType || !lifestyle} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', opacity: (!floorType || !lifestyle) ? 0.5 : 1 }}>
            Get My Floor Schedule
          </button>
          {showResult && result && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                {[
                  { label: '🧹 Sweep/Dust', value: result.sweep },
                  { label: '🪣 Mop Frequency', value: result.mop },
                  { label: '🧴 Recommended Products', value: result.products },
                  ...(result.grout !== 'N/A' ? [{ label: '🔲 Grout Sealing', value: result.grout }] : []),
                ].map(({ label, value }) => (
                  <div key={label} style={{ padding: 12, background: '#0A1628', borderRadius: 8, borderTop: '2px solid #F5E642' }}>
                    <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 13 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 14, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642', marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6 }}>🌤️ DFW Seasonal Care</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.seasonal}</div>
              </div>
              <div style={{ padding: 14, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #60a5fa' }}>
                <div style={{ fontSize: 12, color: '#60a5fa', marginBottom: 6 }}>💡 Lifestyle Tip</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{result.extraTip}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📅 Annual DFW Floor Checklist</div>
          {['Spring: inspect grout lines after winter temp swings; seal if needed', 'Summer: check for LVP buckling or hardwood gapping from humidity', 'Fall: deep clean before holiday traffic; apply any protective treatments', 'Year-round: watch for tile cracking at walls — may indicate foundation movement'].map(f => (
            <div key={f} style={{ fontSize: 13, marginBottom: 8, color: '#cbd5e1' }}>• {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
