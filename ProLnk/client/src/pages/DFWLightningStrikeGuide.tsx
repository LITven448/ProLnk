import { useState } from 'react';

const zones = [
  { name: 'North DFW (Collin / Denton)', strikes: 8.2, risk: 'High', emoji: '🔴' },
  { name: 'East DFW (Rockwall / Kaufman)', strikes: 7.9, risk: 'High', emoji: '🔴' },
  { name: 'Central Dallas / Urban Core', strikes: 6.1, risk: 'Moderate', emoji: '🟡' },
  { name: 'Fort Worth / Tarrant West', strikes: 7.4, risk: 'High', emoji: '🔴' },
  { name: 'South DFW (Ellis / Johnson)', strikes: 9.1, risk: 'Very High', emoji: '🟠' },
];

const homeFeatures = [
  { name: 'Tall trees near home', adds: 'High risk — trees are top strike targets', emoji: '🌳' },
  { name: 'Metal roof', adds: 'Moderate — conducts but distributes charge', emoji: '🔩' },
  { name: 'Pool or water feature', adds: 'High — water is excellent conductor', emoji: '🏊' },
  { name: 'Detached garage / outbuilding', adds: 'Elevated — separate grounding needed', emoji: '🏚️' },
  { name: 'Whole-home surge protector', adds: 'Significantly reduces equipment damage', emoji: '⚡' },
  { name: 'Lightning rod system', adds: 'Reduces direct strike damage risk by ~90%', emoji: '🗼' },
];

const damageTypes = [
  { type: 'Electrical system damage', desc: 'Wiring melted, breakers destroyed, panel replacement often needed', cost: '$2,000–$15,000′ },
  { type: 'Appliance / electronics loss', desc: 'TVs, HVAC, water heaters, refrigerators — often total loss', cost: '$1,000–$8,000′ },
  { type: 'Roof penetration / fire', desc: 'Direct strike can ignite framing, sheathing, or attic insulation', cost: '$5,000–$50,000+' },
  { type: 'Plumbing damage', desc: 'Metal pipes can carry charge — faucets and fixtures at risk', cost: '$500–$3,000′ },
];

export default function DFWLightningStrikeGuide() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

  const toggleFeature = (i: number) => {
    setSelectedFeatures((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  const zone = selectedZone !== null ? zones[selectedZone] : null;
  const features = selectedFeatures.map((i) => homeFeatures[i]);
  const hasRod = selectedFeatures.includes(5);
  const hasSurge = selectedFeatures.includes(4);

  const overallRisk = zone
    ? selectedFeatures.length > 3 ? 'Very High' : selectedFeatures.length > 1 ? 'Elevated' : zone.risk
    : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Lightning Strike Guide
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            DFW averages 50+ thunderstorm days per year with high lightning density. Understand your risk, protection options, and insurance coverage.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📍 Select Your DFW Zone</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {zones.map((z, i) => (
              <button key={z.name} onClick={() => setSelectedZone(i === selectedZone ? null : i)}
                style={{ background: selectedZone === i ? '#1e3a5f' : '#0A1628', border: selectedZone === i ? '2px solid #F5E642′ : '2px solid #2d4a6b', borderRadius: '10px', padding: '0.75rem 1rem', cursor: ’pointer', color: '#fff', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><span style={{ fontSize: '1.3rem' }}>{z.emoji}</span><span style={{ fontWeight: 600 }}>{z.name}</span></div>
                <div style={{ textAlign: 'right' }}><div style={{ color: '#F5E642', fontWeight: 700 }}>{z.strikes} strikes/mi²/yr</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{z.risk} risk</div></div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏠 Select Home Features (multi-select)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {homeFeatures.map((f, i) => (
              <button key={f.name} onClick={() => toggleFeature(i)}
                style={{ background: selectedFeatures.includes(i) ? '#1e3a5f' : '#0A1628', border: selectedFeatures.includes(i) ? '2px solid #F5E642′ : '2px solid #2d4a6b', borderRadius: '10px', padding: '0.75rem', cursor: ’pointer', color: '#fff', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.3rem' }}>{f.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{f.name}</div>
              </button>
            ))}
          </div>
        </div>

        {(zone || features.length > 0) && (
          <div style={{ background: '#1e2d47', borderRadius: '16px', padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚡ Your Lightning Risk Assessment</h3>
            {zone && <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div><div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F5E642′ }}>{zone.strikes}</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>strikes/mi²/yr</div></div>
                <div><div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ef4444′ }}>{overallRisk}</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>overall risk</div></div>
              </div>
            </div>}
            {features.length > 0 && <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Home Feature Impact</div>
              {features.map((f) => <div key={f.name} style={{ marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}><span style={{ marginRight: '0.5rem' }}>{f.emoji}</span><strong>{f.name}:</strong> {f.adds}</div>)}
            </div>}
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🛡️ Protection Recommendation</div>
              <div style={{ color: '#e2e8f0′ }}>
                {!hasSurge && !hasRod && '⚠️ Install whole-home surge protection ($300–600) and consider a lightning rod system ($1,500–3,000). '}
                {hasSurge && !hasRod && '✅ Surge protection in place. Consider adding a lightning rod system for direct strike protection. '}
                {!hasSurge && hasRod && '✅ Lightning rod helps. Add whole-home surge protector to protect electronics. '}
                {hasSurge && hasRod && '✅ Excellent protection. Ensure annual inspection of lightning rod bonding and surge device rating.'}
                {' '}Insurance typically covers lightning damage under dwelling coverage — verify your deductible applies per-event.
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>💰 Typical Lightning Damage Costs in DFW</div>
          {damageTypes.map((d) => (
            <div key={d.type} style={{ background: '#0A1628', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div><div style={{ fontWeight: 700, color: '#e2e8f0′ }}>{d.type}</div><div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{d.desc}</div></div>
              <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{d.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
