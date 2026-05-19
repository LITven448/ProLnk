import { useState } from 'react';

const soilTypes = ['Clay (most DFW)', 'Sandy loam', 'Rocky/caliche', 'Mixed'];
const homeConcerns = ['No grounding rods visible', 'Old 2-prong outlets', 'Panel has no ground bus', 'Recent lightning nearby', 'Adding solar/EV charger'];

export default function DFWElectricalGroundingGuide() {
  const [concern, setConcern] = useState('');
  const [soilType, setSoilType] = useState('');
  const [result, setResult] = useState<null | { status: string; needed: string; cost: string; risk: string }>(null);

  function assess() {
    if (!concern || !soilType) return;
    const isClay = soilType === 'Clay (most DFW)';
    const isOld = concern.includes('2-prong') || concern.includes('no ground bus');
    const isExpansion = concern.includes('solar') || concern.includes('EV');

    let status = ''; let needed = ''; let cost = ''; let risk = '';

    if (concern.includes('No grounding rods')) {
      status = '⚠️ Missing Ground Electrodes';
      needed = isClay
        ? 'Install 2 ground rods (8 ft each) 6 ft apart — DFW clay retains moisture well, excellent conductivity'
        : 'Install ground rods + consider ground ring for sandy/rocky soil — lower conductivity needs more electrode surface';
      cost = '$250–$500 installed';
      risk = 'High — no fault path means shock hazard and panel damage during surges';
    } else if (isOld) {
      status = '🔴 Ungrounded System';
      needed = 'Full rewire or GFCI protection on all ungrounded outlets — panel ground bus retrofit if missing';
      cost = '$1,200–$4,500 depending on home size';
      risk = 'High — electrocution hazard, insurance may require update';
    } else if (concern.includes('lightning')) {
      status = '⚡ Post-Strike Assessment Needed';
      needed = 'Inspect ground rod continuity, surge protector integrity, panel for scorch marks — DFW gets ~60 thunderstorm days/year';
      cost = '$150–$400 inspection + replacements';
      risk = 'Moderate — secondary damage often hidden';
    } else if (isExpansion) {
      status = '🔌 Expansion Grounding Required';
      needed = 'Dedicated ground for new circuit — EV chargers and solar inverters need low-impedance ground path. DFW clay helps but verify rod resistance < 25 ohms';
      cost = '$300–$800 added grounding for new systems';
      risk = 'Low if done correctly — skip it and risk inverter damage';
    } else {
      status = '✅ Evaluate Existing Ground';
      needed = 'Ground rod test with clamp meter — DFW clay keeps resistance low year-round unlike sandy soils that dry out';
      cost = '$100–$200 for professional test';
      risk = 'Low — verify periodically';
    }
    setResult({ status, needed, cost, risk });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: 2 }}>DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>⚡ Electrical Grounding Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Why DFW's clay soil is actually an advantage — and when you need more protection.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌍 What Grounding Does</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              ['⚡ Fault Path', 'Provides safe return path for fault current — trips breaker instead of shocking you'],
              ['🌩️ Lightning', 'Dissipates surge energy into earth — critical in DFW\’s active storm season'],
              ['🛡️ Equipment', 'Protects sensitive electronics from voltage spikes and noise'],
              ['🏠 Code Requirement', 'NEC requires ground rods at service entrance — DFW inspections verify'],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#1A3050', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏗️ DFW Clay Soil Advantage</h2>
          <p style={{ color: '#94A3B8', marginBottom: '1rem' }}>Most Texas soils are sandy and dry — poor conductors. DFW's Blackland Prairie clay is different:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[
              ['💧 Moisture Retention', 'Clay holds water → low ground resistance year-round'],
              ['🔋 High Conductivity', 'Typical DFW ground: 10–20 ohms vs 100+ in sandy TX'],
              ['📍 Rod Depth', '8 ft rods are usually sufficient — no special soil treatment needed'],
            ].map(([t, d]) => (
              <div key={t} style={{ background: '#1A3050', borderRadius: 8, padding: '0.75rem', fontSize: '0.88rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{t}</div>
                <div style={{ color: '#94A3B8′ }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1.25rem' }}>🔍 Grounding Assessment</h2>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your Grounding Concern</label>
          <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#1A3050', color: '#E8F0FE', border: '1px solid #2A4060', borderRadius: 8, padding: '0.6rem 0.8rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <option value=''>Select concern...</option>
            {homeConcerns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your Soil Type</label>
          <select value={soilType} onChange={e => setSoilType(e.target.value)} style={{ width: '100%', background: '#1A3050', color: '#E8F0FE', border: '1px solid #2A4060', borderRadius: 8, padding: '0.6rem 0.8rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <option value=''>Select soil type...</option>
            {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem', width: '100%' }}>Assess My Grounding</button>

          {result && (
            <div style={{ marginTop: '1.25rem', background: '#1A3050', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{result.status}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>What’s Needed: </span>{result.needed}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Estimated Cost: </span>{result.cost}</div>
              <div><span style={{ color: '#F5E642′ }}>Risk Level: </span>{result.risk}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>ProLnk · DFW Electrical Grounding Guide · Always hire a licensed electrician for grounding work</div>
      </div>
    </div>
  );
}
