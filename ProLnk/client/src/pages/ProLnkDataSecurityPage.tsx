import { useState } from 'react';

const dataTypes: Record<string, { level: string; color: string; details: string[] }> = {
  'Personal Identity': {
    level: 'Maximum Protection',
    color: '#22c55e',
    details: ['AES-256 encryption at rest', 'Never sold to third parties', 'Deleted on request within 30 days', 'Access logs maintained 12 months'],
  },
  'Home Health Data': {
    level: 'HIPAA-Level Protection',
    color: '#F5E642',
    details: ['Treated as sensitive health records', 'Zero third-party sharing', 'Encrypted vault storage', 'Strict internal access controls'],
  },
  'Payment Data': {
    level: 'PCI DSS Compliant',
    color: '#3b82f6',
    details: ['No raw card data stored', 'Stripe handles all card processing', 'TLS 1.3 for all transactions', 'Tokenized references only'],
  },
  'Job History': {
    level: 'Anonymized Analytics',
    color: '#a78bfa',
    details: ['Used only to improve AI matching', 'Aggregated before analysis', 'Never linked to your identity externally', 'Opt-out available at any time'],
  },
};

const pillars = [
  { icon: '🔐', label: 'AES-256', desc: 'Encryption at rest for all stored data' },
  { icon: '🔒', label: 'TLS 1.3', desc: 'Industry-best encryption in transit' },
  { icon: '📋', label: 'SOC2 Roadmap', desc: 'Compliance audit scheduled for Q4 2026′ },
  { icon: '🚫', label: 'No Data Sales', desc: 'Your data is never monetized externally' },
];

export default function ProLnkDataSecurityPage() {
  const [selected, setSelected] = useState<string>('Personal Identity');
  const current = dataTypes[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk Data Security</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Enterprise-grade protection for your identity, your home, and your earnings — with zero compromises.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 40 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontWeight: 800, color: '#F5E642', marginBottom: 4, fontSize: 16 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔍 Data Type → Protection Level</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select a data type to see exactly how we protect it:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {Object.keys(dataTypes).map(d => (
              <button key={d} onClick={() => setSelected(d)}
                style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: selected === d ? '#F5E642′ : '#1e3a5f', color: selected === d ? '#0A1628' : '#fff' }}>
                {d}
              </button>
            ))}
          </div>
          <div style={{ background: '#162033', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'inline-block', background: current.color, color: '#0A1628', fontWeight: 800, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
              {current.level}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
              {current.details.map((d, i) => (
                <div key={i} style={{ background: '#0f1f3d', borderRadius: 8, padding: 14, borderLeft: '3px solid ' + current.color }}>
                  <span style={{ fontSize: 13, color: '#cbd5e1′ }}>✅ {d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}