import { useState } from 'react';

const ageOptions = ['Under 10 Years', '10–20 Years', '20–30 Years', '30+ Years'];
const conditions = ['Good — Minor Issues', 'Fair — Warping/Fading', 'Poor — Cracks/Gaps', 'Failing — Multiple Problems'];
const exposures = ['North/East (Less Sun)', 'South/West (Full DFW Sun)'];

const decisions: Record<string, { decision: string; options: string[]; note: string }> = {
  'Under 10 Years|Good — Minor Issues|North/East (Less Sun)': { decision: '✅ Keep — Minor Maintenance', options: ['Clean with vinyl cleaner', 'Re-caulk penetrations'], note: 'Vinyl in good condition on protected exposure can last 20+ years in DFW' },
  'Under 10 Years|Good — Minor Issues|South/West (Full DFW Sun)': { decision: '⚠️ Monitor Closely', options: ['Apply UV-protective vinyl paint', 'Inspect for warping annually'], note: 'South/west DFW exposure accelerates aging — act proactively' },
  'Under 10 Years|Fair — Warping/Fading|South/West (Full DFW Sun)': { decision: '🔄 Consider Replacement', options: ['Fiber cement siding', 'Premium thick-gauge vinyl'], note: 'Standard vinyl warps on DFW south/west exposure — upgrade material' },
  'Under 10 Years|Fair — Warping/Fading|North/East (Less Sun)': { decision: '⚠️ Investigate Cause', options: ['Check attic ventilation', 'Look for heat sources behind wall'], note: 'Warping on protected exposure suggests installation or ventilation issue' },
  'Under 10 Years|Poor — Cracks/Gaps|North/East (Less Sun)': { decision: '🔄 Partial Replacement', options: ['Replace damaged panels', 'Add house wrap behind if missing'], note: 'Cracks in young vinyl suggest impact damage or thermal stress' },
  'Under 10 Years|Poor — Cracks/Gaps|South/West (Full DFW Sun)': { decision: '🔄 Replace — Upgrade Material', options: ['James Hardie fiber cement', 'LP SmartSide engineered wood'], note: 'Cracking vinyl on south/west exposure — time to upgrade to DFW-rated material' },
  '10–20 Years|Good — Minor Issues|North/East (Less Sun)': { decision: '✅ Keep — Routine Maintenance', options: ['Clean and inspect annually', 'Re-caulk as needed'], note: 'Well-maintained vinyl on north/east can serve another 10–15 years' },
  '10–20 Years|Fair — Warping/Fading|South/West (Full DFW Sun)': { decision: '🔄 Plan Replacement', options: ['Fiber cement: $8–$15/sq ft installed', 'Engineered wood: $6–$12/sq ft installed'], note: 'Budget for replacement within 2–3 years — get quotes now' },
  '20–30 Years|Good — Minor Issues|North/East (Less Sun)': { decision: '⚠️ Budget for Future Replacement', options: ['Replace in 3–5 year window', 'Fiber cement strongly recommended'], note: 'Even good 20-year vinyl is nearing end of practical life in DFW' },
  '20–30 Years|Fair — Warping/Fading|South/West (Full DFW Sun)': { decision: '🔄 Replace Now', options: ['James Hardie HardiePlank', 'LP SmartSide — excellent in DFW heat'], note: 'Cost of DFW damage from failing siding exceeds replacement cost' },
  '30+ Years|Good — Minor Issues|North/East (Less Sun)': { decision: '🔄 Replace — End of Life', options: ['Fiber cement — 50-year lifespan', 'Won\’t need replacement again for most homeowners'], note: '30+ year vinyl is past design life — replace before problems compound' },
  '30+ Years|Failing — Multiple Problems|South/West (Full DFW Sun)': { decision: '🚨 Urgent Replacement', options: ['Immediate fiber cement installation', 'Address moisture damage first'], note: 'Failing siding allows DFW heat and moisture to damage structural sheathing' },
};

const defaultResult = { decision: '🔍 Assess Situation', options: ['Get professional assessment', 'Document current condition'], note: 'This combination needs professional evaluation for accurate recommendation' };

export default function DFWVinylSidingGuide() {
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [exposure, setExposure] = useState('');
  const key = `${age}|${condition}|${exposure}`;
  const result = age && condition && exposure ? (decisions[key] || defaultResult) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MATERIALS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏘️ Vinyl Siding Guide — DFW</h1>
        <p style={{ color: '#9BA3B5', fontSize: 15, marginBottom: 32 }}>Vinyl siding is less common in DFW than brick or stucco, but found in 1990s–2000s subdivisions. DFW's extreme UV and heat create unique challenges that make fiber cement the preferred replacement.</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚠️ DFW Vinyl Warning: The South/West Rule</div>
          <p style={{ color: '#9BA3B5', fontSize: 14 }}>South and west-facing vinyl siding in DFW receives intense afternoon sun at 100°F+ ambient temperatures. Vinyl can reach 160–180°F surface temperature, causing permanent warping in 7–12 years regardless of thickness or brand.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '🌡️', label: 'Heat Warping', text: 'DFW summer heat warps vinyl, especially on south/west elevations with afternoon sun' },
            { icon: '☀️', label: 'UV Fading', text: 'DFW UV fades vinyl color 3x faster than manufacturer estimates (based on northern US testing)' },
            { icon: '🔄', label: 'Fiber Cement Trend', text: 'Homeowners replacing vinyl choose fiber cement 80% of the time in DFW — better performance, similar cost' },
          ].map(card => (
            <div key={card.label} style={{ background: '#111D35', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{card.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: 12 }}>{card.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Keep vs. Replace Decision Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'VINYL AGE', value: age, setter: setAge, options: ageOptions },
              { label: 'CURRENT CONDITION', value: condition, setter: setCondition, options: conditions },
              { label: 'DFW EXPOSURE', value: exposure, setter: setExposure, options: exposures },
            ].map(sel => (
              <div key={sel.label}>
                <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{sel.label}</label>
                <select value={sel.value} onChange={e => sel.setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 13 }}>
                  <option value=''>Select...</option>
                  {sel.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{result.decision}</div>
              <div style={{ color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>OPTIONS</div>
              {result.options.map(o => <div key={o} style={{ fontSize: 14, marginBottom: 6 }}>→ {o}</div>)}
              <div style={{ marginTop: 12, padding: '10px 14px', background: '#111D35', borderRadius: 8, fontSize: 13, color: '#9BA3B5' }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📊 Replacement Material Comparison for DFW</div>
          {[['Fiber Cement', '$8–$15/sq ft', '50 years', '⭐⭐⭐⭐⭐'], ['Engineered Wood', '$6–$12/sq ft', '30 years', '⭐⭐⭐⭐'], ['Premium Vinyl', '$4–$8/sq ft', '15–20 years', '⭐⭐⭐'], ['Standard Vinyl', '$2–$5/sq ft', '10–15 years', '⭐⭐']].map(([mat, cost, life, rating]) => (
            <div key={mat} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, padding: '8px 0', borderBottom: '1px solid #1E3A5F', fontSize: 13 }}>
              <div style={{ fontWeight: 600 }}>{mat}</div>
              <div style={{ color: '#F5E642' }}>{cost}</div>
              <div style={{ color: '#9BA3B5' }}>{life}</div>
              <div>{rating}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
