import { useState } from 'react';

const serviceTypes = [
  { id: 'repair', label: 'Repair / Service Call', icon: '🔧', refrigerantRule: 'Tech must recover all refrigerant before opening system. EPA 608 required. No venting allowed.', verifySteps: ['Ask for EPA 608 certification card', 'Recovery machine must be present on job', 'Refrigerant weight must be logged before and after', 'You should receive a service ticket showing refrigerant recovered in lbs'], dfwNote: 'DFW has strict EPA enforcement — venting refrigerant is a federal violation and $44,000+ fine' },
  { id: 'recharge', label: 'Refrigerant Recharge / Top-Off', icon: '❄️', refrigerantRule: 'Legal recharge requires leak check first. Adding refrigerant without finding the leak is a band-aid — not a repair.', verifySteps: ['Tech should perform electronic or UV leak detection before adding refrigerant', 'Ask: Where is the leak? Was it repaired first?', 'Request a copy of the refrigerant invoice showing type (R-22 or R-410A) and lbs added', 'Verify tech is EPA 608 certified'], dfwNote: 'DFW heat causes faster refrigerant loss — a tech who just adds Freon without finding the leak will be back in 30 days' },
  { id: 'replacement', label: 'System Replacement', icon: '🏭', refrigerantRule: 'Old system refrigerant must be fully recovered before removal. R-22 systems require certified recovery — R-22 is no longer manufactured.', verifySteps: ['Ask contractor: How will the old refrigerant be handled?', 'Recovery must happen before system removal', 'Old system should be tagged with recovery cert', 'R-22 recovered from old systems must go to certified reclaimers'], dfwNote: 'Many DFW homes still have R-22 systems. R-22 is $80–$150/lb — recovery protects both you and the environment' },
  { id: 'coil', label: 'Coil Replacement', icon: '🌀', refrigerantRule: 'Refrigerant must be recovered from the existing system before coil is opened. This is federal law — no exceptions.', verifySteps: ['Recovery machine must be running before any lines are cut', 'Tech should offer to show you refrigerant log', 'Recovered amount should match system charge capacity (on nameplate)', 'After new coil installed, system recharged and weighed to spec'], dfwNote: 'DFW evaporator coils often need replacement every 10–15 years due to formicary corrosion from DFW air quality' },
];

export default function DFWHVACRefrigerantRecovery() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | typeof serviceTypes[0]>(null);

  function evaluate() {
    const match = serviceTypes.find(s => s.id === selected);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', fontWeight: 600, letterSpacing: '0.08em' }}>DFW HVAC RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Refrigerant Recovery Guide</h1>
        <p style={{ color: '#9AA5B8', marginBottom: '2rem', fontSize: '1rem' }}>What DFW HVAC techs are legally required to do with your refrigerant — and how to verify compliance.</p>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E64280', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#F5E642′ }}>
          ⚖️ EPA Section 608 requires all HVAC techs to recover refrigerant before opening any system containing more than 5 lbs of refrigerant. Venting refrigerant is illegal and carries federal fines up to $44,539 per day per violation.
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📋 Compliance Rules by Service Type</h2>
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
          {serviceTypes.map(s => (
            <div key={s.id} style={{ background: '#0F2040', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{s.icon} {s.label}</div>
              <div style={{ fontSize: '0.875rem', color: '#9AA5B8', marginBottom: '0.5rem' }}>{s.refrigerantRule}</div>
              <div style={{ fontSize: '0.82rem', color: '#F5E642′ }}>🌡️ DFW Note: {s.dfwNote}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🔍 Verify Your Tech Is Compliant</h2>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.5rem' }}>What service is being done?</label>
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              {serviceTypes.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: selected === s.id ? '2px solid #F5E642′ : '1px solid #1E3A5F', background: selected === s.id ? '#F5E64220' : '#0A1628', color: selected === s.id ? '#F5E642' : '#E8EDF5', cursor: ’pointer', fontSize: '0.88rem' }}>{s.icon} {s.label}</button>
              ))}
            </div>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Show Compliance Checklist →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#F5E642', marginBottom: '0.75rem' }}>{result.icon} Compliance Checklist: {result.label}</div>
            <div style={{ fontSize: '0.9rem', color: '#9AA5B8', marginBottom: '1rem' }}>{result.refrigerantRule}</div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Ask your tech to verify:</div>
            {result.verifySteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#22C55E', fontWeight: 700, minWidth: '20px' }}>✓</span>
                <span>{step}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', background: '#F5E64215', borderRadius: '8px', padding: '0.75rem', fontSize: '0.85rem', color: '#F5E642′ }}>🌡️ DFW Context: {result.dfwNote}</div>
          </div>
        )}

        <div style={{ marginTop: '3rem', background: '#0F2040', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>ProLnk only works with EPA 608-certified DFW HVAC companies.</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem' }}>Every pro in our network has verified credentials before their first match.</div>
        </div>
      </div>
    </div>
  );
}
