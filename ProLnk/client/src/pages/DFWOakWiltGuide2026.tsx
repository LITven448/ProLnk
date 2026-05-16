import { useState } from 'react';

export default function DFWOakWiltGuide2026() {
  const [situation, setSituation] = useState('symptoms');

  const guide: Record<string, { title: string; content: string }> = {
    symptoms: {
      title: '🍂 Identifying Oak Wilt Symptoms',
      content: 'Red Oaks: Leaves turn brown from margins inward, whole tree dies in 4-6 weeks (rapid). Live Oaks: Leaves show yellow-brown veins (vein scorch), drop while still partially green. Tree dies over months to years — or survives with treatment. White Oaks: Generally resistant. If you see these symptoms in summer, assume oak wilt until proven otherwise.',
    },
    spread: {
      title: '🔗 How Oak Wilt Spreads in DFW',
      content: 'Two pathways: 1) BEETLE TRANSMISSION — Nitidulid (sap-feeding) beetles carry fungal spores from infected red oak mats to fresh wounds. Active Feb–June. 2) ROOT GRAFTS — Live oaks graft roots with neighbors. One infected tree = entire grove at risk. A single infected tree in a DFW neighborhood can kill 50+ Live Oaks through root grafts over 10 years. Trenching between trees (24+ inches deep) breaks root grafts.',
    },
    prevention: {
      title: '🛡️ Prevention — What DFW Homeowners Must Do',
      content: 'Rule #1: NEVER prune oaks Feb–June in DFW. Period. If storm damage forces a cut, paint EVERY wound immediately with wound sealant (latex paint works). Rule #2: Report dead oaks to your city/HOA — infected red oak fruiting bodies spread to neighbors. Rule #3: When hiring tree services, demand clean equipment between trees. Fungal spores can ride on chainsaws. Rule #4: Plant oak wilt-resistant species near existing oaks when possible.',
    },
    treatment: {
      title: '💉 Treatment Options for Infected Trees',
      content: 'Propiconazole (Alamo) injection: Only effective treatment. Injected into root flares at soil level. Costs $150-500 per tree. Slows/stops disease in Live Oaks — does NOT cure Red Oaks (remove them). Trench trenching: $3-8 per linear foot to sever root grafts and stop spread. Combine with Alamo treatment for best results. No DIY option — requires licensed applicator in Texas.',
    },
    prune: {
      title: '📅 Safe Pruning Window for DFW Oaks',
      content: 'SAFE: July 1 – January 31. Beetles are inactive, disease transmission risk is minimal. RISKY: February 1 – June 30. Beetle flight season + fungal mat production. If you MUST prune in this window: paint every cut immediately, use fresh blades, schedule at dusk (beetles less active). BEST PRACTICE: Schedule annual oak maintenance in October–December every year.',
    },
  };

  const data = guide[situation];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🍂</div>
        <h1 style={{ fontSize: '2rem', color: '#F5E642', marginBottom: '.5rem' }}>DFW Oak Wilt Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Texas's most destructive tree disease. Every DFW oak owner needs to know this.</p>

        <div style={{ background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#fca5a5', margin: '0 0 .5rem 0' }}>🚫 Do NOT Prune Oaks Feb–June in DFW</h2>
          <p style={{ color: '#fecaca', margin: 0 }}>Nitidulid beetles are active February through June. They carry oak wilt fungal spores directly to fresh pruning wounds. This is not a guideline — it is the single most important oak wilt prevention rule in North Texas.</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Oak Wilt Guide</h2>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[{ v: 'symptoms', l: '🍂 Symptoms' }, { v: 'spread', l: '🔗 How It Spreads' }, { v: 'prevention', l: '🛡️ Prevention' }, { v: 'treatment', l: '💉 Treatment' }, { v: 'prune', l: '📅 Safe Pruning' }].map(t => (
              <button key={t.v} onClick={() => setSituation(t.v)} style={{ padding: '.5rem .75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: situation === t.v ? '#F5E642' : '#334155', color: situation === t.v ? '#0A1628' : '#fff', fontWeight: 600, fontSize: '.85rem' }}>{t.l}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>{data.title}</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{data.content}</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔗</div>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: 0 }}>ProLnk connects DFW homeowners with oak wilt certified arborists for Alamo injection, root trench, and safe seasonal pruning.</p>
        </div>
      </div>
    </div>
  );
}
