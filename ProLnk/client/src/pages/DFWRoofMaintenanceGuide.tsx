import { useState } from 'react';

const roofMaterials = ['Asphalt Shingles', 'Metal', 'Tile (Clay/Concrete)', 'Wood Shake', 'Flat/TPO/Modified Bitumen'];
const inspectionResults = ['No visible damage', 'Missing/cracked shingles', 'Granule loss visible', 'Flashing gaps or rust', 'Moss or algae growth'];

export default function DFWRoofMaintenanceGuide() {
  const [material, setMaterial] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [lastInspection, setLastInspection] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<null | { tasks: string[]; schedule: string; cost: string }>(null);

  function calculate() {
    const age = parseInt(roofAge) || 10;
    const yearsInspected = parseInt(lastInspection) || 2;
    const isOld = age > 15 && material === 'Asphalt Shingles';
    const needsUrgent = condition.includes('Missing') || condition.includes('Flashing');
    const hasMoss = condition.includes('Moss');
    const hasGranuleLoss = condition.includes('Granule');

    const tasks: string[] = [
      'Clear debris from valleys and gutters after spring storm season (May–June)',
      'Inspect flashings around chimney, skylights, and vents for gaps or rust',
    ];
    if (needsUrgent) tasks.push('🔴 Immediate: repair missing/cracked shingles before next storm');
    if (hasMoss) tasks.push('Apply zinc sulfate treatment — moss less common in DFW than humid climates but does occur');
    if (hasGranuleLoss) tasks.push('Granule loss on asphalt = UV degradation; get inspection for insurance claim potential');
    if (yearsInspected > 1) tasks.push(`Schedule professional inspection — last was ${yearsInspected} year(s) ago`);

    const inspectionFreq = material === 'Metal' ? 'Every 3 years + after major hail' : 'Annually after DFW spring storm season (June)';
    const lifespan = material === 'Asphalt Shingles' ? '20–25 years in DFW UV (vs 30 in cooler climates)' : material === 'Metal' ? '40–70 years with proper maintenance' : '30–50 years';
    const schedule = `${inspectionFreq}. Expected lifespan: ${lifespan}.`;

    const inspectCost = 200;
    const repairAdder = needsUrgent ? 800 : 0;
    const cost = `Inspection: $${inspectCost}. ${needsUrgent ? `Repairs: $${repairAdder}–$${repairAdder * 2}. ` : ''}Full replacement (if needed): $${Math.round(2400 * (age / 25))}–$${Math.round(4200 * (age / 25))} avg DFW home.`;

    setResult({ tasks, schedule, cost });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          🏡 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Roof Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          DFW roofs face dual threats: intense UV year-round and violent spring hail storms. Annual inspection is non-negotiable.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 36 }}>
          {[
            { icon: '⛈️', title: 'Inspect After Spring Storm Season', body: 'DFW averages 7–10 significant hail events per year. Schedule your inspection in June — after storm season closes — when damage is fresh and insurance claims are still viable. Wait too long and insurers can deny UV as cause.' },
            { icon: '🍂', title: 'Clear Debris from Valleys', body: 'DFW live oaks and elms drop leaves, seeds, and pollen from February–May. Debris accumulates in roof valleys, trapping moisture and accelerating shingle deterioration. Clear valleys twice yearly: after spring pollen and after fall leaf drop.' },
            { icon: '🔩', title: 'Check Flashings Every Year', body: 'Metal flashings around chimneys, skylights, and vents expand and contract in DFW\’s 140°F attic temps. Gaps form. Water enters. A $150 flashing repair prevents a $15,000 rafter replacement. Inspect every June.' },
            { icon: '☀️', title: 'DFW UV Destroys Asphalt Shingles', body: 'Asphalt shingles last 30 years in Minnesota. In DFW, plan on 20–22 years. UV degrades the asphalt binder and releases granules (the colored mineral coating). Granule loss on your gutters = shingles are failing. Document for insurance.' },
            { icon: '🌿', title: 'Moss and Algae in DFW', body: 'Less common than humid markets but does occur in shaded north-facing areas. Dark algae streaks are primarily cosmetic but indicate moisture retention. Zinc sulfate strips or zinc strips near ridge cap prevent recurrence. Never pressure wash shingles.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Roof Maintenance Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Roof Material', state: material, set: setMaterial, opts: roofMaterials, isSelect: true },
              { label: 'Roof Age (Years)', state: roofAge, set: setRoofAge, ph: 'e.g. 14', isSelect: false },
              { label: 'Years Since Last Inspection', state: lastInspection, set: setLastInspection, ph: 'e.g. 1', isSelect: false },
              { label: 'Observed Condition', state: condition, set: setCondition, opts: inspectionResults, isSelect: true },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>{f.label}</label>
                {f.isSelect ? (
                  <select value={f.state} onChange={e => f.set(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                    <option value="">Select...</option>
                    {f.opts!.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={f.state} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
                )}
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Maintenance Tasks + Cost
          </button>
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>✅ Maintenance Tasks</div>
                {result.tasks.map((t, i) => <div key={i} style={{ fontSize: 13, color: '#E2E8F0', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #1E3A5F' }}>{t}</div>)}
              </div>
              {[{ label: '📅 Inspection Schedule', value: result.schedule }, { label: '💰 Cost Estimate', value: result.cost }].map(r => (
                <div key={r.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 14, color: '#E2E8F0′ }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
