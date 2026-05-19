import { useState } from 'react';

const scenarios = [
  {
    id: 'find-tech',
    label: '🔍 Find a Reliable Tech',
    solution: 'ProLnk vets every HVAC contractor on license status, insurance, BBB history, and customer reviews. Submit your request — location, system type, issue — and receive 2-3 matched quotes from verified DFW pros. No random calls, no unverified technicians showing up at your door.',
  },
  {
    id: 'emergency',
    label: '🚨 Emergency Service (AC Down in July)',
    solution: 'ProLnk flags emergency requests for priority matching. DFW summer AC failure is a health emergency for vulnerable residents. Our network includes pros who offer same-day and after-hours response. Set your urgency level and ProLnk surfaces available pros immediately.',
  },
  {
    id: 'vault',
    label: '🏠 Track HVAC in Health Vault',
    solution: 'Home Health Vault stores your HVAC system record — brand, model, serial number, install date, service history. When you request a tech through ProLnk, they see your system history before they arrive. No more explaining your system from scratch every service call.',
  },
  {
    id: 'contractors',
    label: '🤝 HVAC Contractors: Join the Network',
    solution: 'ProLnk’s partner network gives DFW HVAC contractors qualified, pre-vetted leads instead of paid advertising. Contractors pay per matched job, not per click. The network handles intake, qualification, and routing — contractors focus on service, not marketing.',
  },
  {
    id: 'alerts',
    label: '🤖 AI Maintenance Alerts (Coming Soon)',
    solution: 'Future ProLnk feature: AI monitors your system age, local weather patterns, and DFW seasonal factors to alert you before failure. Proactive maintenance reminders calibrated to your specific system and DFW climate conditions. Available to Home Health Vault members first.',
  },
  {
    id: 'quotes',
    label: '💬 Get Competitive Quotes',
    solution: 'ProLnk sends your HVAC project to multiple vetted contractors simultaneously. You receive comparable quotes without spending days calling around. All quotes are for the same scope of work — making comparison straightforward. Average DFW homeowners save 15-25% vs calling one contractor directly.',
  },
];

export default function DFWHVACProLnkAll() {
  const [active, setActive] = useState<string | null>(null);
  const selected = scenarios.find(s => s.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>ProLnk HVAC: Every Scenario Covered</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Pick your HVAC situation — see exactly how ProLnk handles it.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
              style={{
                background: active === s.id ? '#1a2e4a' : '#0f1f35',
                border: `2px solid ${active === s.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0f1f35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>{selected.label}</h2>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>{selected.solution}</p>
          </div>
        )}
        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#0f1f35', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>✅</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Vetted Pros Only</div>
            <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Licensed, insured, reviewed</div>
          </div>
          <div style={{ background: '#0f1f35', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>🏠</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Health Vault</div>
            <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Your home's full HVAC history</div>
          </div>
        </div>
      </div>
    </div>
  );
}
