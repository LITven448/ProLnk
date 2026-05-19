import { useState } from 'react';

const userTypes = [
  {
    type: 'Homeowner',
    icon: '🏠',
    tagline: 'Get matched with vetted DFW pros in minutes',
    steps: [
      { icon: '🌐', title: 'Go to prolnk.io', desc: 'Open prolnk.io on any device — no app download required' },
      { icon: '📝', title: 'Create your profile', desc: 'Enter your name, property address, and contact info (2 min)' },
      { icon: '🔍', title: 'Describe your need', desc: 'Select trade, describe the issue, attach a photo if you have one' },
      { icon: '📊', title: 'Receive your match', desc: 'ProLnk AI matches you with 3 qualified, vetted DFW pros' },
      { icon: '📞', title: 'Review and connect', desc: 'Compare profiles, reviews, and pricing — contact directly' },
    ],
    cta: 'Start at prolnk.io/homeowner',
    tip: 'Add your Home Health Vault to track all repairs and get better matches over time',
  },
  {
    type: 'Service Pro',
    icon: '🔧',
    tagline: 'Get qualified DFW leads delivered to you',
    steps: [
      { icon: '🌐', title: 'Go to prolnk.io', desc: 'Visit prolnk.io and click Join as a Pro — takes 5 minutes' },
      { icon: '🪪', title: 'Enter your credentials', desc: 'License number, insurance info, and service trade type' },
      { icon: '📍', title: 'Set your service area', desc: 'Pick your DFW zip codes — you only get leads in your area' },
      { icon: '💳', title: 'Choose your plan', desc: 'Charter ($149/mo), Founding ($149/mo) — locked rate forever' },
      { icon: '🚀', title: 'Start receiving leads', desc: 'AI matches homeowners to your profile — respond fast to win jobs' },
    ],
    cta: 'Apply at prolnk.io/pro',
    tip: 'Respond to leads within 15 minutes — pros who respond fast win 3x more jobs',
  },
];

export default function DFWProLnkQuickStartGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (key: string) => {
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>ProLnk Quick Start Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Get started in under 5 minutes — DFW home services network</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
          {userTypes.map((u, i) => (
            <button key={i} onClick={() => { setSelected(selected === i ? null : i); setCompletedSteps({}); }}
              style={{ backgroundColor: selected === i ? '#1a2f4a' : '#0f2035', border: selected === i ? '2px solid #F5E642′ : '2px solid #1e3a5f', borderRadius: '14px', padding: '24px', cursor: ’pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>{u.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>I am a {u.type}</div>
              <div style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.4′ }}>{u.tagline}</div>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ backgroundColor: '#0f2035', border: '2px solid #F5E642', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px' }}>{userTypes[selected].icon}</span>
              <div>
                <h2 style={{ color: '#F5E642', fontSize: '18px', margin: 0 }}>Quick Start: {userTypes[selected].type}</h2>
                <div style={{ color: '#475569', fontSize: '12px', marginTop: '2px' }}>Click steps to mark complete</div>
              </div>
            </div>
            {userTypes[selected].steps.map((s, j) => {
              const key = selected + '-' + j;
              const done = completedSteps[key];
              return (
                <div key={j} onClick={() => toggleStep(key)}
                  style={{ display: 'flex', gap: '12px', marginBottom: '10px', padding: '12px', backgroundColor: done ? '#0f3322′ : '#0A1628', borderRadius: '10px', cursor: ’pointer', border: done ? '1px solid #16a34a' : '1px solid #1e3a5f', transition: 'all 0.2s' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ backgroundColor: done ? '#16a34a' : '#1e3a5f', color: done ? 'white' : '#F5E642', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700′ }}>{done ? '✓' : j + 1}</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '3px' }}>
                      <span style={{ fontSize: '14px' }}>{s.icon}</span>
                      <span style={{ color: done ? '#4ade80′ : '#F5E642', fontWeight: '700', fontSize: '14px' }}>{s.title}</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.4′ }}>{s.desc}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#0A1628', borderRadius: '8px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>💡 PRO TIP</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{userTypes[selected].tip}</div>
            </div>
            <div style={{ display: 'block', marginTop: '16px', backgroundColor: '#F5E642', color: '#0A1628', textAlign: 'center', padding: '14px', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>
              {userTypes[selected].cta} →
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '12px' }}>
          ProLnk — DFW trusted home services network • prolnk.io
        </div>
      </div>
    </div>
  );
}
