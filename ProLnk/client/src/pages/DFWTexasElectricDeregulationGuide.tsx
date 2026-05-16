import { useState } from 'react';

const planTypes = [
  { id: 'fixed', label: 'Fixed Rate', icon: '🔒', best: 'predictable bill, long-term stability' },
  { id: 'variable', label: 'Variable Rate', icon: '📈', best: 'market dips, short-term flexibility' },
  { id: 'indexed', label: 'Indexed Rate', icon: '📊', best: 'sophisticated users who track ERCOT spot prices' },
  { id: 'prepaid', label: 'Prepaid/No-Deposit', icon: '💳', best: 'no credit check, pay-as-you-go' },
];

const usageProfiles = [
  { id: 'low', label: 'Low (< 1,000 kWh/mo)', rec: 'fixed', note: 'Fixed rates often have base charges that hurt low users — compare carefully.' },
  { id: 'average', label: 'Average (1,000–1,500 kWh/mo)', rec: 'fixed', note: 'Fixed 12-month plans on PowerToChoose.org are your best bet for DFW summers.' },
  { id: 'high', label: 'High (1,500–2,500 kWh/mo)', rec: 'fixed', note: 'Lock in before June — DFW summer rates spike. Get a 24-month fixed plan.' },
  { id: 'very_high', label: 'Very High (2,500+ kWh/mo)', rec: 'indexed', note: 'Consider time-of-use or indexed plans and shift heavy loads off-peak.' },
];

export default function DFWTexasElectricDeregulationGuide() {
  const [selectedUsage, setSelectedUsage] = useState<string | null>(null);
  const [showTDU, setShowTDU] = useState(false);

  const rec = usageProfiles.find(u => u.id === selectedUsage);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏛️</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5E642', marginBottom: '8px' }}>
            Texas Electric Deregulation Guide for DFW
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            DFW operates in one of the only fully deregulated electricity markets in the US. Here's how to navigate it.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>⚡ How DFW's Market Works</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14px' }}>
            In DFW, you choose your Retail Electric Provider (REP) — there are 100+ competing for your business. 
            The physical wires and poles are owned by <strong style={{ color: '#F5E642' }}>Oncor</strong>, your Transmission & Distribution Utility (TDU). 
            You cannot choose Oncor — they are regulated and their delivery charges appear on every bill regardless of your REP. 
            Shop plans at <strong style={{ color: '#F5E642' }}>PowerToChoose.org</strong> (the official state comparison site).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {planTypes.map(p => (
            <div key={p.id} style={{ backgroundColor: '#1e2d4a', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '4px' }}>{p.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>Best for: {p.best}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>📊 Find Your Plan Type</h2>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Select your monthly usage:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {usageProfiles.map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUsage(u.id)}
                style={{
                  backgroundColor: selectedUsage === u.id ? '#F5E642' : '#0A1628',
                  color: selectedUsage === u.id ? '#0A1628' : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                {u.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '6px' }}>
                ✅ Recommended: {planTypes.find(p => p.id === rec.rec)?.label}
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>{rec.note}</p>
            </div>
          )}
        </div>

        <div
          onClick={() => setShowTDU(!showTDU)}
          style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', cursor: 'pointer', marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#F5E642', fontSize: '16px' }}>⚠️ What Is NOT Deregulated (Oncor TDU Charges)</h2>
            <span style={{ color: '#F5E642' }}>{showTDU ? '▲' : '▼'}</span>
          </div>
          {showTDU && (
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7', marginTop: '12px' }}>
              Oncor's delivery charges (TDU charges) are set by state regulators and appear on every DFW electric bill. 
              These include a fixed monthly charge (~$3.42) plus a per-kWh charge (~$0.0437/kWh). 
              No REP can change these — they pass through at cost. When comparing plans, always look at the 
              "Electricity Facts Label" (EFL) to see the all-in price at your usage level.
            </p>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🔌 Need an Electrician in DFW?</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk connects you with licensed local electricians for panel upgrades, EV chargers, and more.</p>
        </div>
      </div>
    </div>
  );
}
