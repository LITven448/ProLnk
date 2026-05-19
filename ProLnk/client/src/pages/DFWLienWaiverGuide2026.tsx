import { useState } from 'react';

const stages = [
  {
    id: 'deposit',
    label: 'Initial Deposit / Contract Signing',
    waiver: 'Conditional Waiver on Progress Payment',
    icon: '✏️',
    explanation: 'Get a conditional lien waiver from the GC covering the deposit amount. This waiver becomes effective only when your check clears — protecting you if the check bounces or payment is disputed.'
  },
  {
    id: 'progress',
    label: 'Mid-Project Progress Payment',
    waiver: 'Conditional Waiver on Progress Payment',
    icon: '🚧',
    explanation: 'At every progress payment, require a conditional waiver from the GC AND conditional waivers from any subcontractors or material suppliers who have furnished to your project. Texas law allows subs to lien your property even if you paid the GC.'
  },
  {
    id: 'substantial',
    label: 'Substantial Completion Payment',
    waiver: 'Conditional Final Waiver (GC) + Unconditional Waivers (Paid Subs)',
    icon: '🏗️',
    explanation: 'Request unconditional waivers from all subcontractors and suppliers who have been paid in full. Get a conditional final waiver from the GC that becomes unconditional when your final payment clears.'
  },
  {
    id: 'final',
    label: 'Final Payment / Project Closeout',
    waiver: 'Unconditional Final Waiver (All Parties)',
    icon: '✅',
    explanation: 'Before releasing final payment, collect unconditional final lien waivers from the GC, all subcontractors, and all material suppliers. File these with your Health Vault. These permanently extinguish lien rights on your property.'
  },
];

export default function DFWLienWaiverGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = stages.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🛡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Lien Waiver Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Texas has some of the strongest construction lien laws in the nation. Select a payment stage to see what waiver you need.</p>
        </div>

        <div style={{ background: '#7c2d12', border: '1px solid #ea580c', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ margin: 0, fontWeight: 700, color: '#fed7aa' }}>⚠️ Texas Warning: Subcontractors and material suppliers can place a lien on your home even if you paid the general contractor in full. Always collect waivers from ALL parties.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ background: '#0f2340', border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f', borderRadius: 12, padding: '16px 20px', cursor: ’pointer', color: '#fff', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>Need: {s.waiver}</div>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2340', border: '2px solid #F5E642', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 12px', color: '#F5E642', fontSize: 18 }}>{active.icon} {active.label}</h2>
            <div style={{ marginBottom: 12 }}>
              <span style={{ background: '#1e3a5f', color: '#F5E642', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>Required: {active.waiver}</span>
            </div>
            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>{active.explanation}</p>
          </div>
        )}

        <div style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 16, padding: 20 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#F5E642′ }}>🔒 ProLnk Lien Protection</p>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ProLnk automatically collects lien waivers from contractors and their subcontractors at every payment milestone. All waivers are stored permanently in your Home Health Vault and available if you ever sell your property.</p>
        </div>
      </div>
    </div>
  );
}
