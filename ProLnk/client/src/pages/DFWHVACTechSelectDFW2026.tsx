import { useState } from 'react';

export default function DFWHVACTechSelectDFW2026() {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState('');

  const scenarios = [
    { id: 'new_install', label: 'New system installation' },
    { id: 'repair', label: 'Emergency repair' },
    { id: 'maintenance', label: 'Annual maintenance' },
    { id: 'second_opinion', label: 'Second opinion needed' },
  ];

  const checklists: Record<string, string[]> = {
    new_install: ['✅ Verify TDLR license at tdlr.texas.gov', '✅ Confirm EPA 608 certification (refrigerant handling)', '✅ Check NATE certification for system type', '✅ Ask for manufacturer training certs', '✅ Request load calculation (Manual J)', '✅ Confirm permit will be pulled'],
    repair: ['✅ Verify TDLR license at tdlr.texas.gov', '✅ EPA 608 required if refrigerant involved', '✅ Ask for written diagnosis before work starts', '✅ Confirm warranty on parts and labor', '✅ Check ProLnk verified badge'],
    maintenance: ['✅ TDLR license active', '✅ NATE cert preferred for tune-ups', '✅ Ask what is included in the tune-up', '✅ Confirm coil cleaning is included', '✅ Request written report after service'],
    second_opinion: ['✅ New tech must have TDLR license', '✅ Get diagnosis in writing from both techs', '✅ Compare refrigerant readings independently', '✅ Ask ProLnk to match a NATE-certified tech'],
  };

  const handleScenario = (id: string) => {
    setScenario(id);
    const list = checklists[id];
    setResult(list ? list.join('
') : '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 DFW HVAC Tech Selection Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>How to vet HVAC technicians in the Dallas-Fort Worth area before hiring.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Required Certifications in DFW</div>
          {[
            { icon: '🏛️', title: 'TDLR License', desc: 'Texas Dept of Licensing and Regulation — legally required to work on HVAC in TX. Verify free at tdlr.texas.gov.' },
            { icon: '❄️', title: 'EPA 608 Certification', desc: 'Federal requirement to handle refrigerants. Any tech touching Freon must hold this.' },
            { icon: '⭐', title: 'NATE Certification', desc: 'North American Technician Excellence — voluntary but signals serious training. Ask which specialty.' },
            { icon: '🏭', title: 'Manufacturer Training', desc: 'Carrier, Trane, Lennox all have factory cert programs. Important for warranty work.' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{item.title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 My Hiring Scenario</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {scenarios.map((s) => (
              <button key={s.id} onClick={() => handleScenario(s.id)} style={{ backgroundColor: scenario === s.id ? '#F5E642′ : '#1a2f50', color: scenario === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Your Vetting Checklist</div>
              {result.split('
').map((line, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{line}</div>)}
              <div style={{ marginTop: '1rem', color: '#F5E642', fontSize: '0.85rem' }}>ProLnk pre-verifies all of these before matching you with a DFW tech. 🛡️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
