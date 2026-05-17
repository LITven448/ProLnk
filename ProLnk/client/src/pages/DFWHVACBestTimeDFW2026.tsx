import { useState } from 'react';

const needs = [
  { id: 'tune-up', label: 'AC/Heat Tune-Up', icon: '🔧', best: 'March (pre-rush)', reason: 'Book before April demand surge — 2-3 week waits start in May', avoid: 'June–August (emergency pricing)', tip: 'Cedar season Feb–May? Change filters monthly during this window.' },
  { id: 'filter', label: 'Filter Replacement', icon: '💨', best: 'Monthly year-round', reason: 'Extra attention Feb–May: DFW cedar pollen is brutal on HVAC filters', avoid: 'Never skip June — summer dust + allergens peak', tip: 'Use MERV-11 or higher during cedar season.' },
  { id: 'repair', label: 'Urgent Repair', icon: '🚨', best: 'Call immediately — do not wait', reason: 'DFW summers hit 108°F+. A failed AC is a health emergency.', avoid: 'Waiting even 24 hours in July–August', tip: 'ProLnk matches verified HVAC pros within minutes — no waiting.' },
  { id: 'replace', label: 'Full System Replacement', icon: '🏗️', best: 'Spring (March–April) or Fall (Oct–Nov)', reason: 'Avoid summer emergency rates — replacement demand spikes 300% in June', avoid: 'July–August unless unit has fully failed', tip: 'At 12–15 years old in DFW, start planning spring replacement.' },
  { id: 'install', label: 'New Installation', icon: '⚡', best: 'Spring or Fall for best pricing and scheduling', reason: 'Contractors have more availability and no summer surcharge', avoid: 'Summer rush — limited pro availability, premium pricing', tip: 'Schedule new installs 6–8 weeks out for best crew selection.' },
];

export default function DFWHVACBestTimeDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = needs.find(n => n.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>❄️🌡️</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', marginBottom: '8px' }}>
            DFW Best Time for HVAC Service 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            DFW climate is extreme — timing your HVAC service right saves money and prevents emergencies.
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginBottom: '24px', fontWeight: '600' }}>
          What do you need? Select to see the best time:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {needs.map(n => (
            <button
              key={n.id}
              onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{
                background: selected === n.id ? '#F5E642' : '#1e2d4a',
                color: selected === n.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === n.id ? ' #F5E642' : ' #334155'),
                borderRadius: '12px', padding: '16px 8px', cursor: 'pointer',
                fontSize: '13px', fontWeight: '700', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{n.icon}</div>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: '16px', padding: '28px', border: '2px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '20px', marginBottom: '16px' }}>{active.icon} {active.label}</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><span style={{ color: '#22c55e', fontWeight: '700' }}>✅ Best Time: </span>{active.best}</div>
              <div><span style={{ color: '#94a3b8', fontWeight: '700' }}>Why: </span>{active.reason}</div>
              <div><span style={{ color: '#ef4444', fontWeight: '700' }}>⚠️ Avoid: </span>{active.avoid}</div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #F5E642' }}>
                <span style={{ color: '#F5E642', fontWeight: '700' }}>💡 DFW Tip: </span>{active.tip}
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Get Matched with a DFW HVAC Pro →
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          ProLnk — DFW's home services network. Charter pros serving all 7 DFW counties.
        </div>
      </div>
    </div>
  );
}
