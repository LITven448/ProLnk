import { useState } from 'react';

const features = [
  { id: 'matching', label: 'AI Matching Algorithm', icon: '🎯', detail: 'ProLnk scores every available pro on 4 factors: proximity to your DFW address, specialty match (e.g. HVAC vs roofing), performance score (ratings + completion rate), and real-time availability. You get the best match, not just the nearest pro.' },
  { id: 'nlp', label: 'Natural Language Requests', icon: '💬', detail: 'Describe your issue in plain English — "my AC is making a loud noise when it kicks on" — and ProLnk AI routes it to the right trade and specialist category automatically.' },
  { id: 'claims', label: 'AI Claim Documentation', icon: '📋', detail: 'When a pro completes a job, AI-assisted documentation captures job scope, materials used, and photos — creating an audit trail for insurance claims and future service history in your Home Health Vault.' },
  { id: 'agents', label: '47 Autonomous AI Agents', icon: '🤖', detail: 'ProLnk runs 47 specialized AI agents behind the scenes — handling fraud detection, commission calculation, lead scoring, email campaigns, compliance monitoring, and more. The platform operates autonomously 24/7.' },
  { id: 'predictive', label: 'Predictive Maintenance (2027)', icon: '🔮', detail: 'Coming 2027: ProLnk AI will analyze your home age, DFW climate data, and service history to predict when systems (HVAC, roof, plumbing) need attention — before they fail.' },
  { id: 'scoring', label: 'Pro Performance Scoring', icon: '⭐', detail: 'Every pro on ProLnk is continuously scored on job completion rate, homeowner ratings, response time, and code compliance history. Scores update after every job and directly influence match priority.' },
];

export default function DFWProLnkAI2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = features.find(f => f.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🤖</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            ProLnk AI Technology Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            How artificial intelligence powers every aspect of ProLnk — from matching DFW homeowners to the right pro, to running the entire platform autonomously.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🎯', label: 'Smart Matching' },
            { icon: '🤖', label: '47 AI Agents' },
            { icon: '🔮', label: 'Predictive AI' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginTop: 8, fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚡ AI Platform Stats</h2>
          {[
            ['🎯', 'Matching algorithm scores on 4 dimensions: proximity, specialty, performance, availability'],
            ['🤖', '47 autonomous agents run ProLnk operations 24/7 without human intervention'],
            ['💬', 'Natural language processing routes any service description to the right trade automatically'],
            ['📊', 'Pro performance scores update in real-time after every completed job'],
            ['🔮', 'Predictive maintenance alerts launching 2027 using DFW climate + home age data'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Explore AI Features</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {features.map(f => (
              <button key={f.id} onClick={() => setSelected(f.id)}
                style={{ background: selected === f.id ? '#F5E642' : '#162236', color: selected === f.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {f.icon} {f.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162236', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{result.icon} {result.label}</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>ProLnk AI improves with every match made across the DFW metroplex — the platform gets smarter as it grows.</p>
        </div>
      </div>
    </div>
  );
}
