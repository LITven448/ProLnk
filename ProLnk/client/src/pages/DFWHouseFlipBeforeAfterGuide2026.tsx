import { useState } from 'react';

const stages = [
  { id: 'pre', label: 'Pre-Purchase', emoji: '📋', docs: ['Inspection report', 'Title search', 'As-is photos (every room)', 'Permit history pull', 'Utility bills 12 months'] },
  { id: 'demo', label: 'Demolition', emoji: '🔨', docs: ['Demo scope of work', 'Asbestos/lead test results', 'Before-demo photos', 'Dumpster permit', 'Contractor signed contract'] },
  { id: 'construction', label: 'Construction', emoji: '🏗️', docs: ['Building permits posted', 'Framing inspection sign-off', 'Electrical rough-in inspection', 'Plumbing rough-in inspection', 'Progress photos weekly', 'Lien waivers from subs'] },
  { id: 'finish', label: 'Finish Out', emoji: '🎨', docs: ['Final electrical inspection', 'Final plumbing inspection', 'HVAC certificate of completion', 'Flooring receipts', 'Paint colors documented'] },
  { id: 'close', label: 'Listing Ready', emoji: '📸', docs: ['Certificate of occupancy', 'Post-appraisal photos', 'MLS staging photos (pro)', 'Drone exterior shots', 'All contractor receipts compiled', 'Home Health Vault record created'] },
];

export default function DFWHouseFlipBeforeAfterGuide2026() {
  const [active, setActive] = useState('pre');
  const stage = stages.find(s => s.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏚️➡️🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW House Flip Documentation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Every stage. Every document. ProLnk records all contractors in your Home Health Vault automatically.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: active === s.id ? '#F5E642' : '#1e3a5f', color: active === s.id ? '#0A1628' : '#94a3b8' }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>{stage.emoji} {stage.label} Checklist</h2>
          {stage.docs.map((doc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #0A1628' }}>
              <span style={{ color: '#F5E642', fontSize: 18 }}>✓</span>
              <span style={{ fontSize: 15 }}>{doc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: 18, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏦</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>ProLnk Home Health Vault</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Every contractor you hire through ProLnk is automatically recorded in your property's permanent Home Health Vault — boosting buyer confidence and appraisal value at resale.</p>
        </div>
      </div>
    </div>
  );
}
