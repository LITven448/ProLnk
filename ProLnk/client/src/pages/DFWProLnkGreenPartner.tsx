import { useState } from 'react';

const goals = [
  { id: 'solar', label: 'Go Solar', icon: '☀️', contractors: ['Solar Installer', 'Electrical Upgrade Specialist'], how: 'ProLnk matches you with DFW-licensed solar installers. Get 3 quotes, compare panel specs and warranties, and use your HOA approval status to filter results.' },
  { id: 'foam', label: 'Spray Foam Insulation', icon: '🧪', contractors: ['Spray Foam Specialist', 'Building Performance Contractor'], how: 'ProLnk connects you with certified spray foam applicators in DFW — open-cell for interior walls, closed-cell for attics. Verified insurance and licensing required.' },
  { id: 'audit', label: 'Home Energy Audit', icon: '🔍', contractors: ['BPI-Certified Energy Auditor', 'RESNET/HERS Rater'], how: 'Start here. ProLnk lists certified DFW energy auditors who use blower door tests and thermal imaging. Average cost: $300–$500. Identifies all efficiency gaps.' },
  { id: 'hvac', label: 'Efficient HVAC Upgrade', icon: '❄️', contractors: ['HVAC Contractor (16+ SEER)', 'Manual J Load Calculator'], how: 'ProLnk requires HVAC pros to provide Manual J calculations before quoting. No oversizing. DFW-focused on heat pump and variable-speed systems.' },
  { id: 'windows', label: 'Energy-Efficient Windows', icon: '🪟', contractors: ['Window Replacement Specialist', 'Weatherization Contractor'], how: 'ProLnk filters for contractors who install Low-E, double-pane windows rated for DFW heat zones. Includes flashing and air sealing as part of scope.' },
];

export default function DFWProLnkGreenPartner() {
  const [selected, setSelected] = useState('');

  const goal = goals.find(g => g.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🌱</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 8 }}>ProLnk Green Partner Network</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            ProLnk connects DFW homeowners with vetted green and sustainability contractors — solar, spray foam, efficiency auditors, and more.
          </p>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.07)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28 }}>🔒</span>
          <div>
            <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 4 }}>ProLnk Verification Standard</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Every green contractor is verified for Texas state license, liability insurance ($1M+), and relevant certifications (BPI, NABCEP, RESNET). No unlicensed referrals.
            </div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>What is your sustainability goal?</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {goals.map(g => (
            <div
              key={g.id}
              onClick={() => setSelected(g.id)}
              style={{
                background: selected === g.id ? 'rgba(245,230,66,0.12)' : 'rgba(255,255,255,0.05)',
                border: selected === g.id ? '1px solid #F5E642′ : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
              }}
            >
              <span style={{ fontSize: 28 }}>{g.icon}</span>
              <span style={{ fontWeight: selected === g.id ? 700 : 500, color: selected === g.id ? '#F5E642′ : '#fff' }}>{g.label}</span>
            </div>
          ))}
        </div>

        {goal && (
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(245,230,66,0.25)' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{goal.icon} {goal.label}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 6 }}>Contractor types ProLnk matches for this goal:</div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {goal.contractors.map(c => (
                  <span key={c} style={{ background: 'rgba(245,230,66,0.12)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 8, padding: '0.3rem 0.7rem', fontSize: '0.82rem', color: '#F5E642′ }}>{c}</span>
                ))}
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{goal.how}</p>
            <div style={{ background: '#F5E642', borderRadius: 10, padding: '0.85rem', textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '1rem' }}>Get Matched with Green Contractors →</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
