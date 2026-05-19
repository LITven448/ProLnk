import { useState } from 'react';

const roles = [
  { label: 'Homeowner', msg: 'Thank you for trusting ProLnk with your home. The DFW HVAC knowledge you carry will protect your family for decades. Your home deserves the best — and now you know how to get it.' },
  { label: 'HVAC Pro', msg: 'You helped build something extraordinary. Every contractor tip, every seasonal guide, every emergency protocol — it reflects the craft you practice every day in DFW homes. Thank you.' },
  { label: 'Neighbor / Friend', msg: 'You\’re the reason this knowledge spreads. Sharing what you\’ve learned turns one prepared homeowner into an entire prepared community. DFW is stronger because of you.' },
  { label: 'Just Exploring', msg: 'Curiosity brought you here. Now you leave with a library\’s worth of DFW HVAC wisdom. Come back whenever you need it — ProLnk will be here.' },
];

export default function DFWHVACDFWGoodbye() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showMsg, setShowMsg] = useState(false);

  function choose(i: number) {
    setSelected(i);
    setShowMsg(false);
    setTimeout(() => setShowMsg(true), 80);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🌟</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '16px 0 8px' }}>
            Goodbye from the DFW HVAC Library
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            This library was built with one purpose: to make sure every DFW homeowner
            faces their HVAC challenges with knowledge, confidence, and the right people by their side.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>📚 What Was Built</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Over 3,000 pages of DFW-specific HVAC knowledge — seasonal checklists, contractor vetting guides,
            emergency protocols, energy efficiency strategies, and the full ProLnk matching system.
            Every page was written for DFW homeowners, by people who understand the brutal Texas summers
            and unpredictable winters that define life here.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16, textAlign: 'center' }}>
            👤 Who Are You?
          </h2>
          <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
            Tell us your role and receive your personalized goodbye from the DFW HVAC library.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {roles.map((r, i) => (
              <button
                key={i}
                onClick={() => choose(i)}
                style={{
                  background: selected === i ? '#F5E642' : '#1e3a5f',
                  color: selected === i ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 12, padding: '16px 20px',
                  cursor: 'pointer', fontSize: 16, fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {showMsg && selected !== null && (
          <div style={{
            background: '#F5E642', color: '#0A1628', borderRadius: 16,
            padding: 28, fontSize: 17, lineHeight: 1.7, fontWeight: 500,
            animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>✨</div>
            {roles[selected].msg}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48, color: '#475569', fontSize: 15 }}>
          <p>ProLnk • Built for DFW Homeowners • 2026</p>
        </div>
      </div>
    </div>
  );
}
