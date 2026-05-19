import { useState } from 'react';

const concerns = [
  { value: 'scattered', label: '📂 Records scattered across email, paper, phone' },
  { value: 'lost', label: '🗑️ I\’ve lost records after a contractor change' },
  { value: 'unsure', label: '🤷 Not sure what I should even be keeping' },
  { value: 'organized', label: '✅ I have a system but it\’s not digital' },
];

const vaultFeatures = [
  { icon: '📸', title: 'Photo Documentation', desc: 'Equipment tags, ductwork maps, service panels — stored visually' },
  { icon: '📅', title: 'Maintenance Timeline', desc: 'Auto-sorted log of every service visit, filter change, repair' },
  { icon: '📄', title: 'Warranty Wallet', desc: 'All your HVAC warranty docs in one transferable place' },
  { icon: '🔔', title: 'Smart Reminders', desc: 'Filter changes, seasonal tune-ups, warranty expirations' },
  { icon: '🏠', title: 'Home-Linked Records', desc: 'Tied to your address, not your account — transfers at closing' },
];

export default function DFWHVACKnowledgeBank() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!concern) { setResult('⚠️ Select your knowledge management situation first.'); return; }
    const responses: Record<string, string> = {
      scattered: '📦 The scattered records problem is the #1 issue DFW homeowners face after 5+ years in a home. Start with a simple consolidation: one folder (physical or digital) labeled by year. ProLnk\’s Home Health Vault then becomes the permanent home — it ingests photos of paper records and organizes them automatically.',
      lost: '🔄 Lost records don\’t mean starting from scratch. Your contractor keeps records too — call and request a service history. For equipment specs, the model number on your outdoor unit unlocks manufacturer records. ProLnk can help you reconstruct your knowledge bank from these sources.',
      unsure: '📋 Here\’s the minimum viable DFW HVAC knowledge bank: (1) equipment installation date, (2) model/serial numbers, (3) refrigerant type, (4) last tune-up date, (5) filter size. That\’s it. Everything else builds from there. ProLnk\’s vault guides you through each item.',
      organized: '⚡ Great foundation. Digitizing your existing system unlocks everything: remote access, contractor sharing, buyer transfer at closing. The Home Health Vault imports from common formats and adds the structure that makes your records actionable vs. just stored.',
    };
    setResult(responses[concern] || '');
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Knowledge Bank 🧠</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          DFW homeowners generate more HVAC knowledge than almost anywhere in the country — because DFW systems work harder. The problem isn't lack of information. It's where that information lives when you need it.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏦 What ProLnk's Home Health Vault Does for Your HVAC</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {vaultFeatures.map(f => (
              <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{f.icon}</span>
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 15 }}>{f.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 What's Your Knowledge Management Challenge?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="radio" name="concern" value={opt.value} onChange={() => setConcern(opt.value)}
                  style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{opt.label}</span>
              </label>
            ))}
          </div>
          <button onClick={assess}
            style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Show Me How to Organize →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#1e3a5f', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 32 }}>🔑</span>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Join the Home Health Vault Waitlist</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Secure your home's record before the vault closes at 5,000 homes. prolnk.io</div>
          </div>
        </div>
      </div>
    </div>
  );
}
