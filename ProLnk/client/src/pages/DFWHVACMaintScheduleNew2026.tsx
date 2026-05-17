import { useState } from 'react';

const schedule = {
  1: [
    { task: '🔧 Replace air filter', freq: 'Monthly', note: 'Use MERV 8+ for DFW dust' },
    { task: '💧 Check condensate drain', freq: 'Monthly (Apr-Oct)', note: 'DFW humidity causes clogs fast' },
    { task: '📋 Register warranty', freq: 'Within 60 days', note: 'Extends 5yr → 10yr parts coverage' },
    { task: '🌿 Clear outdoor unit', freq: 'Quarterly', note: 'Keep 2ft clearance all sides' },
  ],
  2: [
    { task: '🔧 Replace air filter', freq: 'Monthly', note: 'Continue monthly in DFW' },
    { task: '🛠️ First pro tune-up', freq: 'Spring (Mar-Apr)', note: 'Before cooling season starts' },
    { task: '⚡ Check electrical connections', freq: 'Annual (tune-up)', note: 'Verify capacitors and contactors' },
    { task: '📊 Log performance baseline', freq: 'Once', note: 'Record BTU output and efficiency' },
  ],
  3: [
    { task: '🔧 Annual pro tune-up', freq: 'Spring', note: 'Same HVAC company for history' },
    { task: '❄️ Refrigerant check', freq: 'Year 3 milestone', note: 'R-410A leak test; R-32 if newer system' },
    { task: '🌀 Clean evaporator coil', freq: 'If needed at tune-up', note: 'DFW dust collects fast' },
    { task: '💧 Flush condensate line', freq: 'Spring', note: 'Pour diluted bleach through line' },
  ],
  '4-5': [
    { task: '🔧 Annual pro tune-up', freq: 'Spring', note: 'Critical before warranty ends at 5yr' },
    { task: '🔍 Full system diagnostic', freq: 'Year 5', note: 'Document all readings before warranty expires' },
    { task: '💸 Start replacement fund', freq: 'Year 4-5', note: 'Budget $8K-14K for DFW replacement' },
    { task: '📁 Save all records in Vault', freq: 'Ongoing', note: 'Required for warranty claims' },
  ],
};

const ages = ['Year 1', 'Year 2', 'Year 3', 'Years 4-5'];
const keys = [1, 2, 3, '4-5'];

export default function DFWHVACMaintScheduleNew2026() {
  const [selected, setSelected] = useState(0);

  const tasks = schedule[keys[selected]];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            DFW New HVAC Maintenance Schedule 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>First 5 years of care for your new DFW HVAC system</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ages.map((a, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: selected === i ? '#F5E642' : '#1e2d45', color: selected === i ? '#0A1628' : '#94a3b8' }}>
              {a}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {tasks.map((t, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{t.task}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>⏱ {t.freq}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>💡 {t.note}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: '#1e2d45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 24 }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>Plan for Replacement at Year 12</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>DFW systems average 13-16 years. Start budgeting $8K-14K by year 10.</div>
          <div style={{ marginTop: 12, color: '#64748b', fontSize: 12 }}>Store all service records in your ProLnk Home Vault for resale documentation.</div>
        </div>
      </div>
    </div>
  );
}
