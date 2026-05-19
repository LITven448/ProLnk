import { useState } from 'react';

const concreteTypes = ['Driveway', 'Patio', 'Sidewalk', 'Pool Deck', 'Garage Floor'];
const conditionOptions = ['Good — no cracks', 'Minor cracks (hairline)', 'Moderate cracks (1/4″+)', 'Heaving or shifting', 'Spalling or pitting'];

export default function DFWConcreteMaintenanceGuide() {
  const [concreteType, setConcreteType] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<null | { plan: string; decision: string; cost: string }>(null);

  function calculate() {
    const years = parseInt(age) || 10;
    const isOld = years > 20;
    const isHeaving = condition.includes('Heaving');
    const isCracked = condition.includes('Moderate') || isHeaving;
    const isNew = years < 5;

    const plan = isHeaving
      ? 'Heaving indicates clay soil movement — requires mudjacking or slab replacement. Drainage correction essential first.'
      : isCracked
        ? 'Fill cracks with polyurethane caulk now. Seal within 6 months. Reapply sealer every 3 years in DFW UV.'
        : 'Clean with degreaser for oil stains. Seal every 3–5 years — DFW UV breaks down sealer faster than humid climates.';

    const decision = isHeaving
      ? '🔴 Repair Required — sealing alone won’t fix heaving; address soil drainage first'
      : isOld && isCracked
        ? '🟡 Evaluate Replacement — cracks + age may make repair cost exceed value'
        : isCracked
          ? '🟡 Repair + Seal — crack repair now prevents full slab failure within 5 years'
          : '🟢 Seal Only — surface is sound; preventive sealing protects against DFW freeze-thaw and UV';

    const sqft = concreteType === 'Driveway' ? 800 : concreteType === 'Patio' ? 400 : 300;
    const sealCost = Math.round(sqft * 0.85);
    const repairAdder = isCracked ? Math.round(sqft * 0.4) : 0;
    const cost = `$${sealCost + repairAdder}–$${Math.round((sealCost + repairAdder) * 1.35)} estimated for ${concreteType || 'surface'} (${sqft} sq ft avg)`;

    setResult({ plan, decision, cost });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          🏡 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Concrete Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          DFW clay soil moves — and it takes your concrete with it. Here's what to watch and when to act.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 36 }}>
          {[
            { icon: '🌍', title: 'DFW Clay Soil: The Root Cause', body: 'Expansive clay soil (Blackland Prairie) shrinks in drought and swells after rain. This movement heaves concrete slabs, opens cracks, and creates trip hazards. Proper drainage away from slabs is the #1 prevention strategy in DFW.' },
            { icon: '🌊', title: 'Drainage = Foundation Protection', body: 'Water pooling against concrete accelerates clay movement and damages foundations. Extend downspouts 6+ feet from slabs. Grade soil away from concrete at 1 inch drop per foot for 6 feet. This alone prevents 70% of DFW slab cracking.' },
            { icon: '🛢️', title: 'Degreasing Oil Stains', body: 'DFW driveways accumulate motor oil rapidly. Apply commercial degreaser, scrub with stiff brush, rinse thoroughly before sealing. Sealing over oil traps moisture and causes sealer failure within months.' },
            { icon: '🔒', title: 'Sealing Frequency in DFW', body: 'Penetrating silane/siloxane sealers protect DFW concrete from UV and moisture. Reapply every 3–5 years (vs 5–7 in northern climates). UV breaks down polymer sealers faster in North Texas. Never seal wet concrete — wait 72 hrs after rain.' },
            { icon: '⏰', title: 'Crack Repair Timing', body: 'Seal hairline cracks immediately with flexible polyurethane caulk — DFW weather cycles open them fast. Cracks wider than 1/4″ often indicate soil movement requiring drainage correction before sealing. Ignore cracks and you\’ll replace the slab.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Concrete Maintenance Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Concrete Type', value: concreteType, onChange: setConcreteType, options: concreteTypes, isSelect: true },
              { label: 'Age (Years)', value: age, onChange: setAge, placeholder: 'e.g. 12', isSelect: false },
              { label: 'Current Condition', value: condition, onChange: setCondition, options: conditionOptions, isSelect: true },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>{field.label}</label>
                {field.isSelect ? (
                  <select value={field.value} onChange={e => field.onChange(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                    <option value="">Select...</option>
                    {field.options!.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={field.value} onChange={e => field.onChange(e.target.value)} placeholder={field.placeholder} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
                )}
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Maintenance Plan + Cost
          </button>
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {[{ label: '📋 Maintenance Plan', value: result.plan }, { label: '🔧 Repair vs Seal', value: result.decision }, { label: '💰 Cost Estimate', value: result.cost }].map(r => (
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
