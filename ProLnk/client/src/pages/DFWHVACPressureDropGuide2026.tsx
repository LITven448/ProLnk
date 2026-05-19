import { useState } from 'react';

const symptoms = [
  { id: 'weak', label: '🌀 Weak airflow from vents', diagnosis: 'High pressure drop — check dirty filter first, then inspect coil for ice buildup. Replace filter if over 90 days old.' },
  { id: 'hot', label: '🌡️ System runs but home stays hot', diagnosis: 'Restricted duct or frozen coil increasing pressure drop. Check evaporator coil for frost and duct dampers.' },
  { id: 'noisy', label: '📢 Loud whistling from vents', diagnosis: 'Excessive static pressure — system pushing against restriction. Likely undersized return or severely clogged filter.' },
  { id: 'freeze', label: '🧊 Ice on refrigerant line', diagnosis: 'Frozen coil dramatically increases coil pressure drop. Shut system off, let thaw, then replace filter before restart.' },
  { id: 'high', label: '⚡ High electric bill, poor cooling', diagnosis: 'System working overtime against high static. Check total external static pressure — should be under 0.5″ w.c. for most DFW units.' },
];

export default function DFWHVACPressureDropGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'guide' | 'tool'>('guide');

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          PROLNK · DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          💨 DFW HVAC System Pressure Drop Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Pressure drop is the hidden culprit behind most DFW comfort complaints. Learn how filter, coil, and duct restrictions add up to airflow failure.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['guide', 'tool'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: tab === t ? '#F5E642′ : '#1e3a5f', color: tab === t ? '#0A1628' : '#94a3b8'
            }}>{t === 'guide' ? '📖 Guide' : '🔧 Diagnose'}</button>
          ))}
        </div>

        {tab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🔲', title: 'Filter Pressure Drop', body: 'A clean 1″ filter adds ~0.1″ w.c. pressure drop. A dirty filter can spike to 0.4–0.8″ w.c., starving the blower and cutting airflow 30–50%. DFW dust loads are high — change every 60–90 days.' },
              { icon: '❄️', title: 'Evaporator Coil Drop', body: 'Clean coil: ~0.2″ w.c. drop. A partially frozen coil can exceed 0.6″ w.c., triggering cascade failure. Ice means low airflow, which causes more ice — a common DFW summer emergency.' },
              { icon: '🪈', title: 'Duct Restriction', body: 'Long duct runs, sharp bends, and undersized returns add cumulative static. DFW slab homes often have duct runs exceeding 40 feet — each 90-degree bend adds ~0.05″ w.c.' },
              { icon: '📊', title: 'Total External Static Pressure (TESP)', body: 'TESP = filter drop + coil drop + supply duct + return duct. Most residential units are rated for 0.5″ w.c. max TESP. Exceed this and the system strains, efficiency drops, and lifespan shortens.' },
              { icon: '🏠', title: 'DFW Specific Context', body: 'DFW summers push systems to 100% runtime. High static pressure during peak load is especially damaging. Annual duct pressure testing is recommended before each cooling season.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{card.icon} {card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{card.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tool' && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Select your symptom to get an airflow diagnosis:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {symptoms.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)} style={{
                  background: selected === s.id ? '#1e3a5f' : '#132240', border: selected === s.id ? '2px solid #F5E642′ : '2px solid transparent',
                  borderRadius: '0.75rem', padding: '0.9rem 1.2rem', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600
                }}>{s.label}</button>
              ))}
            </div>
            {match && (
              <div style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔍 Diagnosis</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }}>{match.diagnosis}</div>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#0A1628', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#94a3b8′ }}>
                  📞 Get a DFW HVAC pro through ProLnk for accurate static pressure testing.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1rem 1.5rem', background: '#132240', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted HVAC professionals · prolnk.io
        </div>
      </div>
    </div>
  );
}