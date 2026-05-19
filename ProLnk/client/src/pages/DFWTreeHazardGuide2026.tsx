import { useState } from 'react';

export default function DFWTreeHazardGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const assess = () => {
    const actions: string[] = [];
    if (situation === 'deadlimbs') {
      actions.push('🚨 HIGH RISK: Dead limbs over structures or power lines should be removed immediately');
      actions.push('⚡ Do NOT attempt to remove limbs near power lines yourself — call an ISA-certified arborist');
      actions.push('📞 For limbs touching power lines, call Oncor (DFW): 1-888-313-4747');
    }
    if (situation === 'rootfoundation') {
      actions.push('🏠 Root damage to foundations is a serious DFW risk — clay soil expansion plus roots accelerates foundation movement');
      actions.push('🔍 Have a structural engineer assess foundation cracks before assuming tree is the sole cause');
      actions.push('⚠️ Removing large trees near foundation can also cause soil shrinkage — get expert opinion first');
    }
    if (situation === 'trunkcracks') {
      actions.push('⚠️ Vertical trunk cracks indicate lightning strike or internal decay — have a certified arborist probe for cavity');
      actions.push('🌀 V-shaped branch unions (codominant stems) are high failure risk in DFW storms — cabling may be needed');
      actions.push('📋 Horizontal cracks or bark separation indicate structural failure — consider removal');
    }
    if (situation === 'heritage') {
      actions.push('🌳 Heritage Tree Permit required in Dallas for removal of trees over 24" DBH — apply through Dallas Urban Forestry');
      actions.push('📋 Fort Worth: protected trees over 8" DBH require city approval for removal or significant pruning');
      actions.push('⚠️ Unpermitted removal of a Heritage Tree can result in fines up to $2,000 per inch of diameter');
      actions.push('📞 Dallas Urban Forestry: 214-671-8ority — get written approval before any work begins');
    }
    if (situation === 'stormdamage') {
      actions.push('🌪️ After DFW storms: inspect for hanging limbs (widow makers), root ball heaving, and trunk lean');
      actions.push('📸 Document all storm damage with photos before cleanup — needed for homeowners insurance claim');
      actions.push('🔧 Hire only licensed and insured tree companies — storm chasers often cause additional damage');
    }
    setResult(actions);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌳⚠️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Tree Hazard Guide 2026</h1>
          <p style={{ color: '#9CA3AF', marginTop: 8 }}>When DFW Trees Become Hazards — Risk Assessment & Action Guide</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '💀', title: 'Dead Limbs Over Structures', desc: 'Dead limbs over your home, fence, or power lines are the #1 tree hazard. DFW storms can drop these without warning. Remove proactively — do not wait for the next storm.' },
            { icon: '🏠', title: 'Root Damage to Foundation', desc: 'DFW clay soil means tree roots AND soil movement both affect foundations. Large trees within 1.5x their mature height from the house warrant professional evaluation.' },
            { icon: '🌀', title: 'Heritage Tree Permits in Dallas', desc: 'Dallas requires permits to remove trees over 24" DBH. Fort Worth protects trees over 8" DBH. Unpermitted removal risks fines up to $2,000 per diameter inch.' },
            { icon: '🌪️', title: 'Post-Storm Inspection', desc: 'After every DFW severe storm, walk your property looking for hanging limbs (widow makers), new trunk lean, or visible root ball heaving — all require urgent attention.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#132040', borderRadius: 10, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 18 }}>🔍 Tree Risk Assessment + Action Guide</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>What is your tree situation?</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
              <option value="">Select situation...</option>
              <option value="deadlimbs">Dead limbs over home or power lines</option>
              <option value="rootfoundation">Roots near or damaging foundation</option>
              <option value="trunkcracks">Trunk cracks or structural concerns</option>
              <option value="heritage">Removing a large tree (Heritage Tree rules)</option>
              <option value="stormdamage">Post-storm damage assessment</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Risk Assessment</button>
          {result.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {result.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1' }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#132040', borderRadius: 10, color: '#9CA3AF', fontSize: 13 }}>
          🏠 ProLnk connects DFW homeowners with ISA-certified arborists and tree removal contractors
        </div>
      </div>
    </div>
  );
}