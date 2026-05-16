import { useState } from 'react';

const situations = [
  { id: 'refrigerant', label: 'Wrong refrigerant added', icon: '🧪', risk: 'HIGH', detail: 'Using R-22 in an R-410A system (or vice versa) immediately voids the compressor warranty and can destroy the unit within hours.' },
  { id: 'skipped', label: 'Skipped annual service', icon: '📅', risk: 'HIGH', detail: 'Most manufacturers require annual professional maintenance to keep warranty valid. Missing even one year can void coverage.' },
  { id: 'modified', label: 'Modified the system', icon: '🔧', risk: 'HIGH', detail: 'Any unauthorized modifications — adding components, changing refrigerant lines, altering controls — voids warranty immediately.' },
  { id: 'installation', label: 'Improper installation', icon: '⚠️', risk: 'HIGH', detail: 'The #1 warranty void reason. Wrong charge, undersized linesets, improper electrical — manufacturer denies claims if install was non-compliant.' },
  { id: 'registration', label: 'Didn't register within 60 days', icon: '📋', risk: 'MEDIUM', detail: 'Most brands give base warranty (5yr parts) without registration but extended warranty (10yr) requires registration within 60-90 days of install.' },
  { id: 'parts', label: 'Used third-party parts', icon: '🔩', risk: 'MEDIUM', detail: 'Non-OEM parts can void coverage on the specific component and potentially the whole system depending on manufacturer policy.' },
  { id: 'none', label: 'None of the above', icon: '✅', risk: 'LOW', detail: 'Your warranty is likely intact! Keep records of all service visits and your registration confirmation.' },
];

export default function DFWHVACWarrantyVoid2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const situation = situations.find(s => s.id === selected);

  const riskColor = (r: string) => r === 'HIGH' ? '#ef4444' : r === 'MEDIUM' ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚫 HVAC Warranty Void Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW HVAC warranties are worth $3,000-$8,000 in coverage. Know what voids them before it costs you.</p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#F5E642' }}>🔍 Select Your Situation</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 10, border: `2px solid ${selected === s.id ? '#F5E642' : 'transparent'}`, background: selected === s.id ? '#1e3a5f' : '#0A1628', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ color: '#fff', fontWeight: 500, fontSize: 14, flex: 1 }}>{s.label}</span>
                <span style={{ background: riskColor(s.risk), color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{s.risk}</span>
              </button>
            ))}
          </div>
        </div>

        {situation && (
          <div style={{ background: `${riskColor(situation.risk)}22`, border: `2px solid ${riskColor(situation.risk)}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{situation.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{situation.label}</div>
                <div style={{ color: riskColor(situation.risk), fontWeight: 700, fontSize: 13 }}>WARRANTY RISK: {situation.risk}</div>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{situation.detail}</p>
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#F5E642' }}>📋 How to Protect Your Warranty</div>
          {['Always use a licensed HVAC contractor for any work', 'Register your system at manufacturer website within 60 days', 'Keep ALL service records in your Home Health Vault', 'Use only OEM-recommended refrigerant type', 'Schedule annual tune-ups every spring in DFW'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>✓</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🛡️ Store Your Warranty Docs in Home Health Vault</div>
          <div style={{ fontSize: 13 }}>ProLnk's Home Health Vault stores your HVAC registration, service records, and warranty info permanently.</div>
        </div>
      </div>
    </div>
  );
}
