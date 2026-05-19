import { useState } from 'react';

const appliances = [
  { id: 'refrigerator', label: 'Refrigerator', lifespan: 15, repairThreshold: 8, hardWaterImpact: true, details: 'Major compressor repair >$500 → replace. Sealed system repairs are rarely cost-effective on older units.' },
  { id: 'dishwasher', label: 'Dishwasher', lifespan: 10, repairThreshold: 5, hardWaterImpact: true, details: 'Pump or control board replacement if >7 years old → replace. Under 5 years, almost always worth fixing.' },
  { id: 'washer', label: 'Washing Machine', lifespan: 12, repairThreshold: 6, hardWaterImpact: true, details: 'Motor, bearing, or drum issues after year 8 → replace. Earlier repairs usually cost-effective.' },
  { id: 'dryer', label: 'Dryer', lifespan: 12, repairThreshold: 10, hardWaterImpact: false, details: 'Simpler mechanics, lower repair costs. Almost always worth repairing unless cosmetically ruined.' },
  { id: 'hvac', label: 'HVAC System', lifespan: 14, repairThreshold: 10, hardWaterImpact: false, details: 'Major repairs after year 10 → replace. DFW heat stress cuts lifespan to 12–14 years. See HVAC guide.' },
  { id: 'water-heater', label: 'Water Heater', lifespan: 8, repairThreshold: 5, hardWaterImpact: true, details: 'DFW hard water severely shortens lifespan. Repair if <5 years, replace if >6 years.' },
  { id: 'microwave', label: 'Microwave', lifespan: 10, repairThreshold: 0, hardWaterImpact: false, details: 'Cheap to replace. Rarely worth repairing except for high-end over-range units.' },
  { id: 'range', label: 'Range / Oven', lifespan: 15, repairThreshold: 12, hardWaterImpact: false, details: 'Long-lived and expensive to replace. Almost always worth repairing. Gas ranges last even longer.' },
];

export default function ApplianceRepairGuide() {
  const [applianceId, setApplianceId] = useState('');
  const [age, setAge] = useState(5);
  const [repairQuote, setRepairQuote] = useState(200);

  const appliance = appliances.find(a => a.id === applianceId);

  const getRecommendation = () => {
    if (!appliance) return null;
    const effectiveLifespan = appliance.hardWaterImpact ? appliance.lifespan * 0.75 : appliance.lifespan;
    const halfLife = effectiveLifespan / 2;
    const replacementCost = applianceId === 'hvac' ? 8000 : applianceId === 'refrigerator' ? 1400 : applianceId === 'washer' ? 900 : applianceId === 'dishwasher' ? 700 : applianceId === 'water-heater' ? 1200 : applianceId === 'dryer' ? 800 : applianceId === 'range' ? 1200 : 300;
    const fiftyPct = replacementCost * 0.5;
    const overHalfLife = age > halfLife;
    const repairExpensive = repairQuote > fiftyPct;

    if (appliance.repairThreshold === 0) return { decision: 'REPLACE', confidence: 'High', reason: 'Rarely cost-effective to repair. Replacement cost is low.' };
    if (overHalfLife && repairExpensive) return { decision: 'REPLACE', confidence: 'High', reason: `Repair cost ($${repairQuote}) exceeds 50% of replacement ($${Math.round(fiftyPct)}) and unit is past half its lifespan.` };
    if (!overHalfLife && !repairExpensive) return { decision: 'REPAIR', confidence: 'High', reason: `Unit is young (${age} yrs, half-life ~${Math.round(halfLife)} yrs) and repair is affordable relative to replacement.` };
    if (overHalfLife && !repairExpensive) return { decision: 'REPAIR', confidence: 'Moderate', reason: `Repair is affordable but unit is aging. Consider replacement in 2–3 years.` };
    return { decision: 'REPAIR', confidence: 'Moderate', reason: `Repair cost is high but unit has useful life remaining. Get a second quote.` };
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#94a3b8', letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.15 }}>
          DFW Appliance Repair Guide<br />
          <span style={{ color: '#38bdf8′ }}>When to Fix vs. Replace</span>
        </h1>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155', marginBottom: 48 }}>
          <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: 8, fontSize: 16 }}>📏 The 50% Rule</div>
          <p style={{ color: '#94a3b8', margin: '0 0 12px' }}>If repair cost {">"} 50% of replacement cost AND the appliance is more than halfway through its lifespan — replace it.</p>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>⚠️ DFW HARD WATER WARNING</div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>
              DFW water hardness runs 300–500 PPM — some of the hardest in Texas. This cuts the lifespan of water-using appliances (dishwashers, washing machines, water heaters) by <strong style={{ color: '#f1f5f9′ }}>25–30%</strong>. Factor this into your repair decisions.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#e2e8f0′ }}>📱 Fix vs. Replace Decision Tool</h2>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, border: '1px solid #334155', marginBottom: 32 }}>
          <div style={{ display: 'grid', gap: 24, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#94a3b8', marginBottom: 10 }}>Appliance type:</label>
              <select
                value={applianceId}
                onChange={e => setApplianceId(e.target.value)}
                style={{ width: '100%', background: '#0f172a', color: '#f1f5f9', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', fontSize: 15 }}
              >
                <option value="">-- Select appliance --</option>
                {appliances.map(a => (
                  <option key={a.id} value={a.id}>{a.label} ({a.lifespan}yr lifespan)</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#94a3b8', marginBottom: 10 }}>
                Appliance age: <strong style={{ color: '#38bdf8′ }}>{age} years</strong>
              </label>
              <input type="range" min={1} max={20} value={age} onChange={e => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8′ }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#94a3b8', marginBottom: 10 }}>
                Repair quote: <strong style={{ color: '#38bdf8′ }}>${repairQuote}</strong>
              </label>
              <input type="range" min={50} max={2000} step={50} value={repairQuote} onChange={e => setRepairQuote(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8′ }} />
            </div>
          </div>

          {rec ? (
            <div style={{ background: rec.decision === 'REPAIR' ? 'linear-gradient(135deg, #14532d, #166534)' : 'linear-gradient(135deg, #7f1d1d, #991b1b)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: rec.decision === 'REPAIR' ? '#86efac' : '#fca5a5', marginBottom: 6 }}>RECOMMENDATION ({rec.confidence} confidence)</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                {rec.decision === 'REPAIR' ? '🔧 REPAIR' : '🛒 REPLACE'}
              </div>
              <p style={{ color: rec.decision === 'REPAIR' ? '#86efac' : '#fca5a5', margin: 0, fontSize: 14 }}>{rec.reason}</p>
              {appliance && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, marginBottom: 0 }}>{appliance.details}</p>}
            </div>
          ) : (
            <p style={{ color: '#475569', fontSize: 14, margin: 0, textAlign: 'center' }}>Select an appliance above to get a recommendation.</p>
          )}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e40af)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🔧</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: '12px 0 8px', color: '#f1f5f9′ }}>Find Repair Technicians Through TrustyPro</h3>
          <p style={{ color: '#93c5fd', marginBottom: 24 }}>Get quotes from vetted DFW appliance repair specialists. Background-checked, licensed, and rated.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Get Repair Quotes →
          </a>
        </div>

      </div>
    </div>
  );
}
