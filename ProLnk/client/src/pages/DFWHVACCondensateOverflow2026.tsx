import { useState } from 'react';

const concerns = [
  { id: 'overflow', label: '💧 Pan Overflowing', tip: 'Float switch may have failed — shut off AC immediately and call HVAC tech. In DFW humidity, pan fills fast.' },
  { id: 'algae', label: '🟢 Algae in Drain Line', tip: 'Use pan tablets monthly May–Sep in DFW. Flush with diluted bleach quarterly. DFW heat accelerates algae growth.' },
  { id: 'smell', label: '🤢 Musty Smell from Vents', tip: 'Clogged condensate line causes standing water → mold. Flush line and treat pan immediately.' },
  { id: 'secondary', label: '🪣 Secondary Pan Has Water', tip: 'Primary drain is clogged. This is your warning before ceiling damage. Stop AC and clear primary line.' },
  { id: 'exterior', label: '📍 Where Does Drain Exit?', tip: 'Check exterior foundation wall or side yard. Should drip when AC runs. No drip = potential blockage.' },
];

export default function DFWHVACCondensateOverflow2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ProLnk · DFW HVAC Series</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          💧 DFW AC Condensate Overflow Prevention 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW humidity drives 2–3x more condensate than northern states. A 3-ton unit can produce 20+ gallons per day in July. Float switches, pan tablets, and clear drain lines aren't optional here — they're essential.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', label: 'Avg Summer Humidity', value: '65–80%' },
            { icon: '💧', label: 'Daily Condensate (3-ton)', value: '15–25 gal' },
            { icon: '🗓️', label: 'Pan Tablet Frequency', value: 'Monthly (May–Sep)' },
            { icon: '⚡', label: 'Float Switch Response', value: 'Immediate shutoff' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Your Condensate Concern</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {concerns.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642' : '#0f2040',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{active.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{active.tip}</p>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔧 DFW Condensate Maintenance Checklist</div>
          {['Test float switch before each cooling season', 'Add pan tablets every 30 days May–September', 'Flush drain line with bleach solution quarterly', 'Inspect secondary drain pan monthly', 'Confirm exterior drain terminus is clear', 'Document all maintenance in ProLnk Home Vault'].map(item => (
            <div key={item} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642' }}>✓</span>{item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk Home Health Vault · DFW HVAC Series 2026
        </div>
      </div>
    </div>
  );
}