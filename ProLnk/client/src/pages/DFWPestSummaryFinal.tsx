import { useState } from 'react';

const profiles = [
  { id: 'northdfw', label: '🏘️ North DFW (Frisco/Plano/McKinney)' },
  { id: 'southdfw', label: '🌆 South/Central DFW' },
  { id: 'eastdfw', label: '🌲 East DFW (wooded areas)' },
  { id: 'condo', label: '🏢 Condo / Townhome' },
  { id: 'newconstruction', label: '🏗️ New construction' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  northdfw: { title: 'North DFW Pest Management Plan', steps: ['Termite bait station system: high risk in clay soil north DFW', 'Fire ant: broadcast treatment every spring + fall', 'Mosquito: April–October misting or monthly spray service', 'Rodents: seal all penetrations before winter', 'Quarterly general pest plan: $40–$65/month'] },
  southdfw: { title: 'South/Central DFW Pest Plan', steps: ['Subterranean termites: highest risk in South Dallas clay', 'Cockroaches: German roach pressure high in older homes', 'Mosquito: standing water management critical', 'Monthly service recommended over quarterly', 'Inspect pier-and-beam foundations for termite damage annually'] },
  eastdfw: { title: 'East DFW Wooded Area Plan', steps: ['Termites + wood-boring beetles: full soil treatment required', 'Ticks: treat yard perimeter monthly April–October', 'Mosquitoes: barrier spray + source elimination', 'Squirrels/raccoons: exclusion work on roofline', 'Monthly service minimum in wooded lots'] },
  condo: { title: 'Condo / Townhome Pest Plan', steps: ['Verify HOA covers common area treatment', 'Request building termite warranty documentation', 'German cockroaches travel unit-to-unit: gel bait essential', 'Bed bugs: your responsibility even in shared building', 'Report any pest sighting to management immediately'] },
  newconstruction: { title: 'New Construction Pest Plan', steps: ['Pre-treat soil before slab pour (builder responsibility — verify)', 'Get termite treatment documentation from builder', 'Register termite warranty within 30 days', 'Seal all utility penetrations before drywall', 'Start quarterly pest plan immediately — builder-grade sealing is minimal'] },
};

export default function DFWPestSummaryFinal() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PEST CONTROL 2026 · FINAL SUMMARY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🐜 DFW Pest Control Final Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Complete pest management guidance for every DFW area and home type.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🐛', title: 'Termite Risk by County', body: 'Dallas & Tarrant: very high subterranean termite pressure in clay soil. Collin & Denton: high risk, especially wooded areas. All DFW counties require proactive treatment — termites cause $3B in TX damage annually. No county is low risk.' },
            { icon: '🐜', title: 'Fire Ants — Everywhere', body: 'Fire ants are present in all DFW counties year-round. Broadcast granule treatments + individual mound treatment is the only effective approach. Treat every spring (March) and fall (September). Budget $150–$300 for DIY or include in pest plan.' },
            { icon: '🦟', title: 'Mosquito Season April–October', body: 'Peak season: June–September. Effective control: eliminate standing water + monthly barrier spray service ($50–$80/treatment). Permanent misting systems: $1,800–$3,500 installed. Mosquito-borne illness risk is real in DFW — West Nile endemic.' },
            { icon: '🐭', title: 'Rodents in DFW Winters', body: 'Mice and rats seek warmth October–February. Entry points: gaps at pipes, HVAC lines, soffit gaps, garage door seals. Exclusion work ($300–$800) beats trapping alone. Roof rats common in North DFW — check attic insulation annually.' },
            { icon: '📅', title: 'Quarterly vs Monthly Plans', body: 'Quarterly ($35–$55/mo): sufficient for new homes in low-pressure areas. Monthly ($55–$85/mo): recommended for wooded lots, older homes, pier-and-beam, or previous infestations. Annual contracts typically include free re-treatment between visits.' },
            { icon: '🔍', title: 'Vetting Pest Companies', body: 'Require: TX Dept of Agriculture license (TPCL), liability insurance, written warranty. Ask: what chemicals, how often, what\’s included in re-treatment policy. Avoid: door-to-door, no written contract, pressure to sign same day. Get 3 quotes.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111d35', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Your DFW Pest Management Plan</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>Select your DFW location and home type:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === p.id ? '#F5E642' : '#1e3a5f'}`, background: selected === p.id ? '#F5E642′ : ’transparent', color: selected === p.id ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>{p.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>{plans[selected].title}</div>
              {plans[selected].steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: 14, background: '#111d35', borderRadius: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🔗 ProLnk connects you with TPCL-licensed DFW pest control companies — vetted and insured.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
