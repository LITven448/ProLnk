import { useState } from 'react';

const SITUATIONS = [
  {
    id: 'none',
    label: 'No records at all',
    guide: 'Start now — even incomplete records are better than none. Note the make, model, serial number, and install date from the unit nameplate. Log today as your baseline service date.',
  },
  {
    id: 'partial',
    label: 'Some receipts / memory',
    guide: 'Compile what you have into a single document: date, company name, repair description, part replaced, cost. Call past HVAC companies — most can pull your service history by address.',
  },
  {
    id: 'pattern',
    label: 'Same repair twice+',
    guide: 'Recurring repairs signal a systemic issue — aging compressor, failing control board, or undersized equipment. Two identical repairs in 3 years often justifies replacement economics.',
  },
  {
    id: 'selling',
    label: 'Preparing to sell home',
    guide: 'HVAC service records add documented value. Buyers and inspectors look for maintenance history. ProLnk Vault stores records permanently and transfers with the home address.',
  },
  {
    id: 'warranty',
    label: 'Need warranty claim',
    guide: 'Most manufacturer warranties require proof of annual maintenance. Without service records, warranty claims are denied. Start documenting immediately after any service visit.',
  },
];

export default function DFWHVACRepairHistory2026() {
  const [selected, setSelected] = useState('none');

  const current = SITUATIONS.find(s => s.id === selected) || SITUATIONS[0];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>📋 DFW HVAC Repair History Documentation</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>Why keeping HVAC service records matters in DFW — and how to build your documentation system.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 Why Records Matter</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: '#fff' }}>Pattern recognition</strong>: same repair twice in 3 years = systemic issue, not random failure</li>
            <li><strong style={{ color: '#fff' }}>Warranty claims</strong>: most manufacturers require annual maintenance proof</li>
            <li><strong style={{ color: '#fff' }}>Resale value</strong>: documented HVAC history adds buyer confidence in DFW market</li>
            <li><strong style={{ color: '#fff' }}>Insurance claims</strong>: records support equipment age and condition disputes</li>
            <li><strong style={{ color: '#fff' }}>ProLnk Vault</strong>: stores records automatically — tied to your home address permanently</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔧 My Documentation Situation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {SITUATIONS.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', background: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#cbd5e1', fontWeight: selected === s.id ? 700 : 400, cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{current.guide}</div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📁 What to Record After Every HVAC Visit</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Date of service</li>
            <li>Company name and technician</li>
            <li>Problem described and diagnosis</li>
            <li>Part(s) replaced with part numbers if available</li>
            <li>Refrigerant added (type and pounds)</li>
            <li>Total cost paid</li>
            <li>Invoice or receipt photo</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1e3a5f' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>ProLnk © 2026 · DFW Home Services Platform</span>
        </div>
      </div>
    </div>
  );
}
