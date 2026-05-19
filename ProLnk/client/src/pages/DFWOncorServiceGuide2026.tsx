import { useState } from 'react';

const needs = [
  { id: 'outage', label: '🔌 Report Outage', contact: '1-888-313-4747', process: 'Call Oncor 24/7 outage line or report at outagemap.oncor.com. Provide your address and meter number. Crews dispatch within 2-4 hours for most outages.' },
  { id: 'newservice', label: '🏗️ New Service Connection', contact: '1-888-313-4747', process: 'For additions or new construction, call Oncor to schedule a service order. Requires licensed electrician to install meter base first. Lead time: 5-15 business days.' },
  { id: 'tree', label: '🌳 Tree Trimming Request', contact: '1-888-313-4747', process: 'Oncor maintains 15-ft clearance around power lines at no cost. Submit a request online or call. Trimming scheduled within 60-90 days.' },
  { id: 'smartmeter', label: '📊 Smart Meter Data', contact: 'smartmetertexas.com', process: 'Access 15-minute interval data free at SmartMeterTexas.com. Sign up with your ESI ID (on electric bill). Export to spreadsheet or share with energy apps.' },
  { id: 'demand', label: '⚡ Demand Response', contact: 'texaspowerguide.com', process: 'Oncor offers Power Partner program — get bill credits for reducing usage during grid alerts. Enroll via your retail electric provider (REP), not directly through Oncor.' },
];

export default function DFWOncorServiceGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = needs.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>Oncor Electric Delivery — DFW 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Oncor delivers electricity to 75% of DFW. They own the poles and wires — your retail electric provider (REP) handles billing.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📡 How the DFW Grid Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🔋 Oncor owns 140K miles of power lines across North TX','🏠 3.7M+ homes and businesses served in DFW','📍 Oncor ≠ your electric bill — your REP (TXU, Reliant, etc.) handles that','📱 Smart meters installed on 99% of Oncor service territory'].map((f,i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, color: '#cbd5e1', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛠️ What Do You Need?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {needs.map(n => (
            <button key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected === n.id ? '#F5E642' : '#1e3a5f'}`, backgroundColor: selected === n.id ? '#F5E64220′ : '#0f2040', color: selected === n.id ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{active.process}</p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Contact: </span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{active.contact}</span>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🚨 Power Outage Checklist</h2>
          {['1. Check neighbors — is it isolated to your home?','2. Check your breaker panel for tripped breakers','3. Visit outagemap.oncor.com to see reported outages','4. Call 1-888-313-4747 to report if not already shown','5. Never touch downed power lines — call 911 immediately'].map((s,i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '6px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none' }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
