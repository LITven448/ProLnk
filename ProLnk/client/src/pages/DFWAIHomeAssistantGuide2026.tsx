import { useState } from 'react';

const assistants = [
  { id: 'alexa', name: 'Alexa AI', icon: '🔵', best: 'Home management, routines, shopping', strength: 'Wide smart home device compatibility' },
  { id: 'gemini', name: 'Google Gemini / Nest', icon: '🟢', best: 'Nest thermostat, cameras, energy', strength: 'Predictive HVAC + Google ecosystem' },
  { id: 'siri', name: 'Apple Siri / HomeKit', icon: '⚪', best: 'iPhone-first homes, privacy-focused', strength: 'End-to-end encryption, local processing' },
  { id: 'claude', name: 'Claude AI', icon: '🟡', best: 'Troubleshooting, diagnostics, planning', strength: 'Complex reasoning for maintenance issues' },
];

const priorities = [
  { label: 'Energy Savings', rec: 'gemini', reason: 'Google Nest learns DFW seasonal patterns and cuts cooling bills 15-23%' },
  { label: 'Security & Cameras', rec: 'alexa', reason: 'Alexa Guard Plus integrates 200+ camera brands with instant alerts' },
  { label: 'Apple Ecosystem', rec: 'siri', reason: 'HomeKit runs locally — no cloud dependency during ERCOT outages' },
  { label: 'Maintenance Help', rec: 'claude', reason: 'Claude diagnoses HVAC, plumbing, and electrical issues in plain language' },
];

export default function DFWAIHomeAssistantGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = priorities.find(p => p.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🤖</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW AI Home Assistant Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Which AI assistant is right for your DFW home?</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>🌡️ AI Predicts HVAC Needs in DFW</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>Dallas summers push HVAC systems hard. Google Nest AI now tracks outdoor temps, usage patterns, and filter age — alerting you before breakdowns during 105°F stretches. Claude AI can interpret error codes and recommend local DFW HVAC pros instantly.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>The 4 AI Assistants for DFW Homes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
          {assistants.map(a => (
            <div key={a.id} style={{ background: '#112240', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{a.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>Best for: {a.best}</div>
              <div style={{ color: '#cbd5e1', fontSize: 12 }}>✅ {a.strength}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🎯 Find Your AI Match</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>What is your top smart home priority?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {priorities.map(p => (
            <button key={p.label} onClick={() => setSelected(p.label)}
              style={{ background: selected === p.label ? '#F5E642′ : '#1e3a5f', color: selected === p.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {p.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
              Recommended: {assistants.find(a => a.id === result.rec)?.icon} {assistants.find(a => a.id === result.rec)?.name}
            </div>
            <div style={{ color: '#1a2f4a', fontSize: 14 }}>{result.reason}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk connects you with DFW smart home installers • prolnk.io
        </div>
      </div>
    </div>
  );
}