import { useState } from 'react';

export default function DFWHVACPlenumGuide2026() {
  const [symptom, setSymptom] = useState('uneven');
  const [homeAge, setHomeAge] = useState('older');
  const [result, setResult] = useState('');

  const symptoms = ['Uneven Room Temps', 'High Utility Bills', 'Dusty/Dirty Air', 'Loud HVAC Noises', 'Humid Indoors'];
  const ages = ['Pre-1990 Home', '1990–2010 Home', 'Post-2010 Home'];

  const getAssessment = () => {
    let rec = '';
    if (symptom === 'Uneven Room Temps') {
      rec = '⚡ Uneven temps often indicate supply plenum leakage or an unbalanced plenum design. In DFW homes with dropped-ceiling returns, the return plenum may be leaking unconditioned attic air. Priority: have HVAC tech perform duct leakage test (blower door test). Target: less than 6% system leakage.';
    } else if (symptom === 'High Utility Bills') {
      rec = '💰 Plenum leakage is a top cause of high bills. DFW homes commonly lose 20–30% of conditioned air through supply plenum gaps. Fix: mastic sealant on all plenum seams (not duct tape — it fails). Expected savings after repair: $200–$600/yr depending on system size.';
    } else if (symptom === 'Dusty/Dirty Air') {
      rec = '🌫️ Dirty air often means your return plenum is pulling in attic or wall cavity air through gaps. DFW homes with dropped-ceiling return systems are especially prone. Inspect return plenum for unsealed penetrations. Air quality improves dramatically after plenum sealing.';
    } else if (symptom === 'Humid Indoors') {
      rec = '💧 Humidity problems with a properly sized HVAC usually indicate return plenum pulling in humid unconditioned air. DFW summer humidity entering through return plenum gaps can overwhelm your system. Seal return plenum and re-evaluate equipment sizing.';
    } else {
      rec = '🔊 Loud HVAC noises from plenum area may indicate air velocity issues — undersized supply plenum or blocked return. Static pressure test will diagnose. DFW contractors can identify and resize plenum sections to eliminate noise and improve airflow.';
    }
    setResult(rec);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌀</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0′ }}>DFW HVAC Plenum Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Supply and return plenum diagnostics for North Texas homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{icon:'📤',label:'Supply Plenum',val:'Distributes',sub:'Conditioned air from air handler to ducts'},{icon:'📥',label:'Return Plenum',val:'Collects',sub:'Air from rooms back to air handler'},{icon:'⚠️',label:'Avg Leakage Rate',val:'20–30%',sub:'Typical unrepaired DFW home'},{icon:'🔧',label:'Repair Cost',val:'$300–$900',sub:'Mastic sealing by licensed HVAC tech'}].map((s,i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.25rem', borderTop: '3px solid #F5E642′ }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 DFW Dropped-Ceiling Return Problem</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: '0 0 1rem' }}>Many DFW homes built 1975–2000 use the ceiling cavity above dropped ceilings as a return air plenum rather than installing dedicated ductwork. This creates massive leakage points where attic air, insulation particles, and humidity infiltrate your HVAC system.</p>
          {[{issue:'Attic Air Infiltration',result:'130°F air enters return on summer peak days'},{issue:'Insulation Particles',result:'Fiberglass enters airstream, damages coil'},{issue:'Humidity Bypass',result:'Dehumidification capacity overwhelmed'}].map((r,i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0.75rem', background: '#0f1f3d', borderRadius: '8px', marginBottom: '0.4rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 600, minWidth: '180px', fontSize: '0.9rem' }}>{r.issue}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r.result}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔍 Diagnose Your Plenum Issue</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Primary HVAC Symptom</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {symptoms.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {ages.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getAssessment} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Assess My Plenum</button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0f1f3d', borderRadius: '8px', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}