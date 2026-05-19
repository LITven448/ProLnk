import { useState } from 'react';

const needs = [
  { id: 'billing', label: '💳 Billing & Account', contact: '817-392-4477', process: 'Fort Worth Water billing Mon-Fri 8am-5pm. Budget billing available to level monthly payments. Paperless billing discount available. Online payments at fortworthtexas.gov/water.' },
  { id: 'leak', label: '🔍 Leak Detection', contact: '817-392-8185', process: 'FW Water offers FREE leak detection for customers — a technician visits with acoustic equipment to find hidden leaks. Call to schedule. Also request a free meter audit to check for continuous low-flow leaks.' },
  { id: 'quality', label: '🧪 Water Quality', contact: '817-392-4477', process: 'Fort Worth water averages 250 TDS — slightly softer than Dallas. Sourced from Eagle Mountain and Benbrook lakes. Annual quality report at fortworthtexas.gov/water. Free lead testing for pre-1986 homes.' },
  { id: 'rebates', label: '💰 Conservation Rebates', contact: 'fortworthtexas.gov/water', process: 'Rebates available: $100 WaterSense toilet, $150 smart irrigation controller, $25 rain sensor, lawn conversion $0.10/sq ft. Apply within 90 days of purchase. Limited annual funding — apply early.' },
  { id: 'newservice', label: '🏗️ New Service', contact: '817-392-8185', process: 'New service connections for construction or additions require permit and licensed plumber. FW Water installs meter and tap. 3/4″ meter tap fee: ~$2,200. Apply online or at 200 Texas St., Fort Worth.' },
];

export default function DFWFortWorthWaterGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = needs.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚰</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>Fort Worth Water Department — 2026 Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>City of Fort Worth water service. Slightly softer water than Dallas with a standout free leak detection program for customers.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 FW Water By the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🧪 Average TDS: 250 mg/L (slightly soft for DFW)','🏠 200,000+ accounts in Fort Worth proper','💧 Sourced from Eagle Mountain Lake + Benbrook Lake','🔍 Free leak detection — unique FW customer benefit'].map((f,i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, color: '#cbd5e1', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 16, marginBottom: 24, border: '2px solid #F5E64240′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>🌿 Outdoor Watering Schedule (Stage 1)</h2>
          <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 10 }}>Currently active — check fortworthtexas.gov for current stage</p>
          {[{ day: 'Odd addresses', times: 'Tue / Thu / Sat' },{ day: 'Even addresses', times: 'Wed / Fri / Sun' },{ day: 'No watering', times: '10am – 6pm any day' }].map((r,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: 13, padding: '5px 0', borderBottom: i < 2 ? '1px solid #1e3a5f' : 'none' }}>
              <span>{r.day}</span><span style={{ color: '#F5E642′ }}>{r.times}</span>
            </div>
          ))}
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
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{active.process}</p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Contact: </span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{active.contact}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
