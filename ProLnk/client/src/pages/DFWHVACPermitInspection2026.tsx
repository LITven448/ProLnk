import { useState } from 'react';

const cities: Record<string, { required: boolean; who: string; sequence: string[]; checks: string[]; note: string }> = {
  Dallas: {
    required: true,
    who: 'Licensed HVAC contractor pulls permit',
    sequence: ['Permit application filed', 'Work begins after permit issued', 'Rough-in inspection (if ductwork changed)', 'Final inspection after full install'],
    checks: ['Refrigerant line sizing and insulation', 'Electrical disconnect and wiring', 'Condensate drain pan and line', 'Equipment clearances met'],
    note: 'Dallas City of Villages inspectors are thorough — schedule 48 hrs in advance.',
  },
  'Fort Worth': {
    required: true,
    who: 'Contractor must be Fort Worth registered',
    sequence: ['Contractor registers with FW Development', 'Permit pulled before install', 'Final inspection within 10 days of completion', 'Passed certificate issued'],
    checks: ['SEER2 rating meets 2026 code (15 SEER2 minimum)', 'Load calculation on file', 'Refrigerant type documented', 'Electrical panel capacity confirmed'],
    note: 'Fort Worth requires Manual J load calc for any system replacement.',
  },
  Plano: {
    required: true,
    who: 'Contractor or homeowner may pull permit',
    sequence: ['Online permit application via ePlans', 'Same-day approval common', 'Final inspection scheduled online', 'Certificate emailed after pass'],
    checks: ['Unit placement meets setback requirements', 'Electrical connections to code', 'Thermostat wiring documented', 'All refrigerant sealed and labeled'],
    note: 'Plano has fast online permit system — most permits same-day.',
  },
  Frisco: {
    required: true,
    who: 'Licensed contractor responsibility',
    sequence: ['Permit required before work starts', 'Rough-in if ductwork involved', 'Final inspection within 5 business days', 'Permit card must be on-site during work'],
    checks: ['New equipment matches permitted specs', 'Drain line properly pitched', 'Disconnect within sight of unit', 'System tested and running at inspection'],
    note: 'Frisco inspectors may ask for refrigerant leak test results.',
  },
  McKinney: {
    required: true,
    who: 'Contractor pulls permit; homeowner allowed for own home',
    sequence: ['Permit application submitted', 'Inspection request after install', '24-48 hr scheduling turnaround', 'Pass = permanent city record'],
    checks: ['Filter access and size labeled', 'Condensate secondary drain installed', 'Equipment serial numbers recorded', 'Outdoor unit on approved pad'],
    note: 'McKinney requires outdoor units to be on pre-cast concrete or approved composite pad.',
  },
};

export default function DFWHVACPermitInspection2026() {
  const [city, setCity] = useState('Dallas');
  const info = cities[city];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            DFW HVAC Permit & Inspection Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Select your DFW city to see what's required when replacing HVAC</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(cities).map(c => (
            <button key={c} onClick={() => setCity(c)}
              style={{ padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                background: city === c ? '#F5E642′ : '#1e2d45', color: city === c ? '#0A1628' : '#94a3b8' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '16px 20px', marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 800 }}>✅ Permit Required — {info.who}</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{info.note}</div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📋 Inspection Sequence</div>
          {info.sequence.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#e2e8f0', fontSize: 13 }}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔍 What Inspector Checks</div>
          {info.checks.map((c, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>✓ {c}</div>
          ))}
        </div>

        <div style={{ marginTop: 20, background: '#1e2d45', borderRadius: 12, padding: 18, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700 }}>🏠 Save Your Permit & Certificate</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>Upload to ProLnk Vault — passed HVAC inspection adds documented value at resale.</div>
        </div>
      </div>
    </div>
  );
}
