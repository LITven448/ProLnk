import { useState } from 'react';

type Fix = { cause: string; dfwNote: string; steps: string[]; cost: string; callPro: string };

const fixes: Record<string, Fix> = {
  low: { cause: 'Mineral buildup in shower head restricting flow', dfwNote: 'DFW water is 200-350 mg/L hardness — shower heads clog 3x faster than soft-water cities. White crust on spray holes = calcium blocking flow.', steps: ['Fill zip-lock bag with white vinegar','Submerge shower head — secure with rubber band','Soak 4-8 hours (overnight preferred)','Scrub spray holes with old toothbrush','If still clogged — replace shower head ($20-80)'], cost: '$0 (vinegar) to $80 (replacement)', callPro: 'If pressure is low at all fixtures — likely PRV or supply issue. Call plumber.' },
  temp: { cause: 'Pressure balance valve cartridge worn or clogged', dfwNote: 'DFW hard water mineral deposits jam pressure balance valve cartridges. Moen, Delta, Kohler cartridges in DFW need replacement every 7-12 years vs 15+ in soft water areas.', steps: ['Note your shower valve brand (check handle or trim plate)','Order brand-specific replacement cartridge ($15-45)','Turn off water supply to bathroom','Remove handle, trim, and retaining clip','Slide out old cartridge, insert new one in same orientation'], cost: '$15-45 DIY | $150-300 plumber', callPro: 'If valve body is cracked or if you cannot identify brand — call licensed plumber.' },
  fluctuate: { cause: 'Water pressure fluctuations in DFW supply system or home PRV', dfwNote: 'DFW city water pressure fluctuates 10-20 PSI during peak morning demand (6-9am). Shower valves without pressure-balancing allow temperature spikes when toilets flush.', steps: ['Check if fluctuation happens only when other fixtures run','If yes: install thermostatic shower valve ($300-700) — worth it in large DFW homes','If pressure varies all day: check your Pressure Reducing Valve (PRV)','PRV typically near water meter or main shutoff — should be set 50-65 PSI'], cost: '$200-800 depending on solution', callPro: 'PRV adjustment or thermostatic valve install — recommend licensed plumber for thermostatic.' },
  weak: { cause: 'Partially closed shut-off valve or failing diverter valve', dfwNote: 'Diverter valves in tub/shower combos are frequently damaged by DFW mineral buildup, causing weak shower flow even when water pressure is normal elsewhere.', steps: ['Check shut-off valve behind shower wall or under home — ensure fully open','Test pressure at other fixtures to isolate the problem','If only shower is weak in tub/shower combo — diverter valve needs replacement','Diverter replacement: turn off water, unscrew diverter from tub spout, replace unit'], cost: '$15-40 DIY | $100-200 plumber', callPro: 'If removing diverter reveals damaged threads or corrosion — call plumber before proceeding.' },
};

export default function DFWShowerPressureGuide() {
  const [issue, setIssue] = useState('');
  const fix = issue ? fixes[issue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚿 Shower Pressure & Temperature<br /><span style={{ color: '#F5E642′ }}>Dallas-Fort Worth Guide</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 15 }}>DFW hard water is the #1 cause of shower pressure decline — calcium deposits block shower heads and corrode pressure balance valve cartridges. Most DFW shower problems are <strong style={{ color: '#F5E642′ }}>DIY-fixable for under $50</strong> if caught early.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>🧂 DFW HARD WATER IMPACT ON SHOWERS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Shower Head Life', '2-3 yrs (DFW) vs 5 yrs national avg'], ['Cartridge Life', '7-12 yrs (DFW) vs 15+ yrs national avg'], ['Scale Buildup Rate', '3x faster than soft water cities'], ['Descaling Frequency', 'Every 6 months recommended']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 11 }}>{label.toUpperCase()}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>SELECT YOUR SHOWER PROBLEM</div>
          {[{ id: 'low', label: '⬇️ Low pressure — weak spray from head' }, { id: 'temp', label: '🌡️ Temperature not controlled — too hot or cold' }, { id: 'fluctuate', label: '🔄 Pressure fluctuates when others use water' }, { id: 'weak', label: '😤 Weak flow even though pressure is fine elsewhere' }].map(o => (
            <button key={o.id} onClick={() => setIssue(o.id === issue ? '' : o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: issue === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${issue === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '14px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        {fix && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🔍 {fix.cause}</div>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>{fix.dfwNote}</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>FIX STEPS:</div>
              {fix.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{step}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>COST ESTIMATE</div><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{fix.cost}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>WHEN TO CALL A PRO</div><div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{fix.callPro}</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
