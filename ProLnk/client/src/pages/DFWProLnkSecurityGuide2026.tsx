import { useState } from 'react';

const concerns = [
  { id: 'encryption', label: 'Data Encryption', icon: '🔐', detail: 'All data stored and transmitted is encrypted with AES-256. Your home and personal data is never transmitted in plain text, even internally.' },
  { id: 'selling', label: 'Is My Data Sold?', icon: '🚫', detail: 'ProLnk does not sell your personal data to any third party. You own your data and we earn revenue only through service matching fees — not data brokering.' },
  { id: 'ccpa', label: 'CCPA Compliance', icon: '🏛️', detail: 'ProLnk is fully CCPA-compliant. You can request a full export of your data, correct inaccuracies, or request deletion at any time through your account settings.' },
  { id: 'vault', label: 'Home Health Vault Safety', icon: '🏠', detail: 'Vault data (structural reports, inspection records, safety items) is stored with HIPAA-equivalent protection standards — access is logged and permission-controlled.' },
  { id: 'delete', label: 'Delete My Data', icon: '🗑️', detail: 'You can delete your entire ProLnk account and all associated data at any time. Deletion completes within 30 days per CCPA requirements.' },
  { id: 'pros', label: 'What Pros See', icon: '👷', detail: 'Matched pros only receive your service address and contact info after you approve the match. Your full profile and Vault data are never shared without explicit consent.' },
];

export default function DFWProLnkSecurityGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            ProLnk Data Security for DFW Homeowners 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Your personal data and home information are protected by enterprise-grade security. Here is exactly how.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔒', label: 'AES-256 Encryption' },
            { icon: '🚫', label: 'No Data Selling' },
            { icon: '✅', label: 'CCPA Compliant' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginTop: 8, fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔐 Security Commitments</h2>
          {[
            ['🌐', 'TLS 1.3 enforced on all API endpoints and web traffic'],
            ['🏥', 'Home Health Vault stored with HIPAA-equivalent protection standards'],
            ['📋', 'All data access is logged and auditable on request'],
            ['🔑', 'You control which pros can see your contact information'],
            ['⚖️', 'CCPA data requests fulfilled within 45 days, deletions within 30 days'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>❓ What Would You Like to Know?</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642′ : '#162236', color: selected === c.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162236', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{result.icon} {result.label}</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.detail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
