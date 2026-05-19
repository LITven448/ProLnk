import { useState } from 'react';

export default function DFWProLnkVaultDemo2026() {
  const [homeType, setHomeType] = useState<string | null>(null);

  const vaultRecords: Record<string, string[]> = {
    'Single Family': ['🔧 HVAC service history (filters, coils, refrigerant)', '💧 Plumbing repairs (pipe, faucet, water heater)', '⚡ Electrical work (panel, outlets, fixtures)', '🏚️ Roof inspection and repair dates', '🌿 Pest control visits and findings'],
    'Townhome': ['🔧 Shared HVAC unit service records', '💧 Unit-specific plumbing history', '🏚️ Exterior maintenance shared records', '⚡ Electrical unit history', '📐 Foundation checks per HOA requirements'],
    'Condo': ['⚡ In-unit electrical and appliance service', '💧 Plumbing limited to unit fixtures', '🌡️ In-unit HVAC service history', '📋 HOA-reported building maintenance'],
    'Investment Property': ['📂 Full tenant-era job history', '💰 Repair cost tracking for tax records', '🔍 Per-job pro license verification logs', '📊 Property health score over time', '📄 Printable report for sale or insurance'],
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏦</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
            Home Health Vault Demo 2026
          </h1>
          <p style={{ color: '#9BAECF', fontSize: 16, margin: 0 }}>
            DFW — See what your home's Vault record looks like
          </p>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', margin: 0, fontSize: 15 }}>
            Every ProLnk job auto-populates your Vault. Add self-reported data anytime. Print a full Vault report for insurance or resale — no paperwork digging required.
          </p>
        </div>

        <p style={{ color: '#CBD5E1', marginBottom: 16, fontSize: 15 }}>Select your home type to see your Vault record types:</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          {Object.keys(vaultRecords).map(type => (
            <button key={type} onClick={() => setHomeType(type)} style={{
              padding: '12px 18px', borderRadius: 10, border: '2px solid',
              borderColor: homeType === type ? '#F5E642′ : '#1E3A5F',
              background: homeType === type ? '#F5E642′ : '#0D1F3C',
              color: homeType === type ? '#0A1628′ : '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 14
            }}>{type}</button>
          ))}
        </div>

        {homeType && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📂 {homeType} Vault Records</h3>
            {vaultRecords[homeType].map(record => (
              <div key={record} style={{ padding: '10px 14px', background: '#0A1628', borderRadius: 8, marginBottom: 8, fontSize: 14, color: '#CBD5E1′ }}>
                {record}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📄 Vault Report Uses</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['🏷️ Home Resale Disclosure', '🛡️ Insurance Claims', '💰 Tax Deduction Support', '📋 HOA Compliance'].map(use => (
              <div key={use} style={{ background: '#1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#CBD5E1′ }}>{use}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
