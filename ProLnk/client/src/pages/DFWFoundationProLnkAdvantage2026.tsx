import { useState } from 'react';

export default function DFWFoundationProLnkAdvantage2026() {
  const [concern, setConcern] = useState('');

  const concerns = [
    { id: 'cracks', label: '🧱 Wall or floor cracks', advantage: 'Engineer-Supervised Work', detail: 'DFW foundation repair often requires a licensed structural engineer to specify the repair method. ProLnk Charter foundation pros use engineer-supervised plans — not guesswork or cookie-cutter piers.' },
    { id: 'doors', label: '🚪 Sticking doors', advantage: 'DFW Clay Soil Expertise', detail: 'Not every foundation company understands DFW\’s expansive Blackland Prairie clay. ProLnk requires proof of DFW-specific project history — pros who have solved this exact soil problem before.' },
    { id: 'drainage', label: '🌧️ Water pooling near house', advantage: 'Warranty in Health Vault', detail: 'Every ProLnk foundation job generates a warranty document stored permanently in your Home Health Vault. When you sell, buyers can verify the repair scope and warranty status instantly.' },
    { id: 'estimate', label: '💰 High-pressure estimate', advantage: 'No High-Pressure Sales', detail: 'ProLnk Charter pros agree to a no-pressure policy. If another company is pushing you to sign today, get a ProLnk second opinion first. Our pros lose their charter status for coercive sales tactics.' },
    { id: 'insurance', label: '📋 Insurance claim', advantage: 'Licensed & Insured', detail: 'DFW foundation pros in ProLnk carry contractor liability and workers\’ comp. If a worker is hurt on your property, you are protected. Ask for certificates of insurance before any work begins.' },
  ];

  const selected = concerns.find(c => c.id === concern);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ProLnk DFW · 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>🏗️ DFW ProLnk Foundation Advantage</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>Why Charter foundation pros in ProLnk deliver better outcomes for DFW homeowners on clay soil.</p>

        <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>ProLnk Foundation Charter Standards</p>
          {[
            { icon: '🏛️', label: 'Engineer-supervised repair plans required for major work' },
            { icon: '📂', label: 'Warranty documentation stored in Home Health Vault' },
            { icon: '🌍', label: 'DFW Blackland Prairie clay soil expertise verified' },
            { icon: '🚫', label: 'No high-pressure same-day sign tactics — charter violation' },
            { icon: '🛡️', label: 'Liability + workers comp insurance certificates on file' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, fontSize: '16px' }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item.label}</span>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What is your concern?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setConcern(c.id)}
              style={{ background: concern === c.id ? '#F5E642' : '#1e2d45', color: concern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '10px', padding: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', textAlign: 'left' }}>
              {c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '20px', borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#F5E642', fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>🏆 {selected.advantage}</p>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>{selected.detail}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '14px', padding: '20px' }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>🏠 DFW Clay Soil Moves Every Year</p>
          <p style={{ color: '#0A1628', fontSize: '14px', margin: '0 0 12px' }}>Foundation repair in DFW is a major investment. ProLnk Charter pros bring engineer oversight, local expertise, and a permanent warranty record in your Health Vault.</p>
          <a href="/" style={{ background: '#0A1628', color: '#F5E642', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Match With DFW Foundation Pro →</a>
        </div>
      </div>
    </div>
  );
}