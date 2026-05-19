import { useState } from 'react';

export default function DFWHVACProLnkAdvantage2026() {
  const [need, setNeed] = useState('');

  const needs = [
    { id: 'emergency', label: '🚨 Emergency — no AC', advantage: 'Priority Dispatch', detail: 'Charter HVAC pros in ProLnk opt into summer emergency dispatch. DFW heat index above 100°F qualifies for priority routing — average response under 2 hours.' },
    { id: 'new-system', label: '🆕 New system install', advantage: 'EPA 608 + TDLR Verified', detail: 'Every ProLnk HVAC pro carries verified EPA 608 certification for refrigerant handling and an active TDLR license. We check before you meet them — not after.' },
    { id: 'repair', label: '🔧 Repair needed', advantage: 'Performance Score Verified', detail: 'ProLnk HVAC pros are scored on every DFW job — response time, price accuracy, and job completion rate. You see the score before you book.' },
    { id: 'maintenance', label: '🔁 Seasonal tune-up', advantage: 'Licensed & Insured', detail: 'Every ProLnk pro carries general liability insurance minimum M. You\’re protected from accidental damage — not just hoping they are insured.' },
    { id: 'second-opinion', label: '🤔 Second opinion', advantage: 'No High-Pressure Sales', detail: 'ProLnk charter pros agree to no upsell pressure policies. If another company told you need a full replacement, get a second opinion from a ProLnk-verified tech.' },
  ];

  const selected = needs.find(n => n.id === need);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ProLnk DFW · 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>❄️ DFW ProLnk HVAC Advantage</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>Why Charter HVAC pros in ProLnk serve DFW homeowners better than standard directories.</p>

        <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Every ProLnk HVAC Pro Is Verified For</p>
          {[
            { icon: '✅', label: 'Active TDLR License (Texas Dept. of Licensing & Regulation)' },
            { icon: '✅', label: 'EPA 608 Certification for refrigerant handling' },
            { icon: '✅', label: 'General Liability Insurance — minimum M coverage' },
            { icon: '✅', label: 'DFW service area confirmed (no out-of-area storm chasers)' },
            { icon: '✅', label: 'Customer performance score based on real DFW jobs' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#22c55e', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item.label}</span>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What do you need?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {needs.map(n => (
            <button key={n.id} onClick={() => setNeed(n.id)}
              style={{ background: need === n.id ? '#F5E642′ : '#1e2d45', color: need === n.id ? '#0A1628' : '#fff', border: ’none', borderRadius: '10px', padding: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', textAlign: 'left' }}>
              {n.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '20px', borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#F5E642', fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>🏆 {selected.advantage}</p>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>{selected.detail}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '14px', padding: '20px' }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>🌡️ DFW Summers Demand Verified Pros</p>
          <p style={{ color: '#0A1628', fontSize: '14px', margin: '0 0 12px' }}>Don\'t risk an unverified HVAC tech in 105°F heat. ProLnk Charter pros are pre-vetted so you don\'t have to guess.</p>
          <a href="/" style={{ background: '#0A1628', color: '#F5E642', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Match With DFW HVAC Pro →</a>
        </div>
      </div>
    </div>
  );
}