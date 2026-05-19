import { useState } from 'react';

type Project = 'pool' | 'hardscape' | 'landscaping' | 'pergola' | 'outdoor_kitchen' | 'lighting' | 'irrigation' | 'fence';

const projectData: Record<Project, { label: string; disruptionLevel: string; mustBeFirst: boolean; rationale: string }> = {
  pool: { label: '🏊 Pool / Spa', disruptionLevel: 'Extreme', mustBeFirst: true, rationale: 'Pool excavation destroys everything in its path. Run utilities, level grade, and position pool before any other construction.' },
  hardscape: { label: '🪨 Hardscape (patio, deck, driveway)', disruptionLevel: 'High', mustBeFirst: false, rationale: 'Must go after pool but before landscaping. Heavy equipment and concrete work kills plants and ruins finished grade.' },
  fence: { label: '🚧 Fence / Privacy Screen', disruptionLevel: 'Medium', mustBeFirst: false, rationale: 'Install after hardscape grade is set. Fence posts need to align with finished patio edge.' },
  pergola: { label: '⛺ Pergola / Shade Structure', disruptionLevel: 'Medium', mustBeFirst: false, rationale: 'Install after hardscape is poured. Pergola footings anchor into the slab — sequence matters for structural integrity.' },
  outdoor_kitchen: { label: '🍳 Outdoor Kitchen / Bar', disruptionLevel: 'Medium', mustBeFirst: false, rationale: 'Coordinate gas and electric rough-in with hardscape pour. Utilities must be stubbed before concrete is poured.' },
  irrigation: { label: '💧 Irrigation System', disruptionLevel: 'Low', mustBeFirst: false, rationale: 'Install after hardscape but before landscaping. Irrigation heads must be placed around final plant locations.' },
  landscaping: { label: '🌿 Landscaping / Plants', disruptionLevel: 'Low', mustBeFirst: false, rationale: 'Always last. Everything else damages and compacts soil. Install once all heavy work is complete.' },
  lighting: { label: '💡 Outdoor Lighting', disruptionLevel: 'Low', mustBeFirst: false, rationale: 'Electrical rough-in during hardscape, fixture installation last. Can accent the finished landscape.' },
};

const sequences: Record<string, Project[]> = {
  pool_full: ['pool', 'hardscape', 'fence', 'pergola', 'outdoor_kitchen', 'irrigation', 'lighting', 'landscaping'],
  pool_basic: ['pool', 'hardscape', 'fence', 'irrigation', 'lighting', 'landscaping'],
  no_pool_full: ['hardscape', 'fence', 'pergola', 'outdoor_kitchen', 'irrigation', 'lighting', 'landscaping'],
  no_pool_basic: ['hardscape', 'fence', 'irrigation', 'landscaping'],
};

export default function DFWOutdoorProjectOrder() {
  const [hasPool, setHasPool] = useState('');
  const [hasKitchen, setHasKitchen] = useState('');
  const [hasPergola, setHasPergola] = useState('');
  const [result, setResult] = useState<Project[] | null>(null);

  function calculate() {
    let key = '';
    if (hasPool === 'yes' && (hasKitchen === 'yes' || hasPergola === 'yes')) key = 'pool_full';
    else if (hasPool === 'yes') key = 'pool_basic';
    else if (hasKitchen === 'yes' || hasPergola === 'yes') key = 'no_pool_full';
    else key = 'no_pool_basic';
    setResult(sequences[key]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Outdoor Project Sequencing Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW homeowners who sequence outdoor projects wrong spend tens of thousands of dollars redoing work.
          A pool dug after a finished patio destroys the concrete. Landscaping planted before irrigation is installed
          dies under construction equipment. Here's the right order — and why it matters in DFW specifically.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>⚠️ DFW Contractor Coordination Realities</h2>
          {[
            ['📅 Lead Times Are Long', 'DFW pool contractors are booked 6–12 months out. Hardscape contractors 3–6 months. Start planning and booking before you think you need to — or you will wait another year.'],
            ['🌧️ DFW Weather Windows', 'Spring (March–May) and Fall (September–November) are the ideal construction seasons. Avoid summer concrete pours in extreme heat — affects curing. Avoid winter for landscaping.'],
            ['📝 Permit Sequences', 'DFW cities (Frisco, Plano, McKinney) require permits for pools, structures, and fences. Pool permits take 4–8 weeks. Plan permit timelines or construction halts mid-project.'],
            ['🔌 Utility Rough-In is Everything', 'Gas, electrical, and plumbing rough-ins must happen before concrete is poured. Missing this means jackhammering finished hardscape — a $5,000–$15,000 mistake.'],
            ['🏗️ Never Run Projects Simultaneously', 'Overlapping trades cause delays, disputes, and damage. Each trade needs clear access without another crew in the way. Sequence strictly — finish one phase before starting the next.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 14, marginBottom: 14 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 6px', fontSize: 14 }}>{title as string}</p>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{desc as string}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🏊 The Pool Rule: Always First or Never</h2>
          <div style={{ background: '#2a1a0a', borderRadius: 8, padding: 16, borderLeft: '4px solid #fbbf24′ }}>
            <p style={{ color: '#fbbf24', fontWeight: 700, margin: '0 0 8px' }}>If you want a pool — ever — build it first.</p>
            <p style={{ color: '#94a3b8', margin: '0 0 8px', fontSize: 14 }}>Pool excavation requires a large crane and excavator that will drive across your entire backyard, destroying any finished hardscape, landscaping, or structures in their path. Pool equipment pads require concrete poured against the pool shell.</p>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>Homeowners who install a patio first and then add a pool typically pay $8,000–$25,000 in demo and rebuild costs. If a pool is in your 5-year plan — build it in Year 1.</p>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔧 Build Your Optimal Sequence</h2>
          {[
            { label: 'Do you want a pool or spa?', value: hasPool, setter: setHasPool, options: [['yes', 'Yes — pool and/or spa'], ['no', 'No pool planned']] },
            { label: 'Planning an outdoor kitchen or bar?', value: hasKitchen, setter: setHasKitchen, options: [['yes', 'Yes'], ['no', 'No']] },
            { label: 'Planning a pergola or shade structure?', value: hasPergola, setter: setHasPergola, options: [['yes', 'Yes'], ['no', 'No']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>{label}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {options.map(([val, text]) => (
                  <button key={val} onClick={() => setter(val)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: value === val ? '#F5E642′ : '#1e3a5f', background: value === val ? '#F5E642' : ’transparent', color: value === val ? '#0A1628′ : '#94a3b8', cursor: ’pointer', fontSize: 13, fontWeight: value === val ? 700 : 400 }}>{text}</button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Get My Project Sequence →</button>
        </div>

        {result && (
          <div style={{ background: '#0f2a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#22c55e', marginBottom: 16 }}>✅ Your Optimal DFW Project Sequence</h3>
            {result.map((key, index) => {
              const p = projectData[key];
              return (
                <div key={key} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{index + 1}</div>
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{p.label}</span>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: p.disruptionLevel === 'Extreme' ? '#ef4444′ : p.disruptionLevel === ’High' ? '#f97316′ : p.disruptionLevel === ’Medium' ? '#fbbf24′ : '#22c55e', color: '#0A1628', fontWeight: 700 }}>{p.disruptionLevel} Disruption</span>
                    </div>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{p.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
