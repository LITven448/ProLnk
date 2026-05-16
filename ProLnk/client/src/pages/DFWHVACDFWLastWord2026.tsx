import { useState } from 'react';

const situations = [
  { id: 'old-no-tune', label: 'System 12+ years, no recent service', word: 'Get a diagnostic this week. At 12+ years in DFW summers, you\'re one heat wave from a breakdown. If tech says replacement is near, start planning now — SEER2 units qualify for 2026 federal tax credits.' },
  { id: 'good-shape', label: 'System in good shape, recent service', word: 'Change your filter now (May pollen is brutal). Flush the drain line with vinegar. Set a reminder for October service. You\'re in good shape — keep it that way.' },
  { id: 'planning-replace', label: 'Planning to replace this year', word: 'Don\'t wait until it dies in July. Schedule now, get 3 quotes, insist on SEER2. ProLnk is matching homeowners with verified HVAC pros — join the waitlist for pre-launch pricing.' },
  { id: 'rental', label: 'Landlord / rental property', word: 'Tenant comfort + liability = act now. Pre-summer service protects both. Add the property to ProLnk\'s Home Health Vault to track maintenance history across all units.' },
  { id: 'just-bought', label: 'Just bought the home', word: 'Get a full HVAC inspection before summer. Don\'t trust the seller disclosure. Know exactly what you\'re working with before 100°F hits. Join ProLnk for verified local pros.' },
];

export default function DFWHVACDFWLastWord2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          🎯 DFW HVAC · The Last Word — May 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Final Guidance for DFW Homeowners This May
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          This is the last clear window before summer pricing, summer backlogs, and summer heat arrive. Here's the definitive playbook for DFW HVAC in May 2026.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '⏰', title: 'Do It Now, Not Later', body: 'June 1 is when DFW HVAC service rates jump 20–35%. The time to act is May. Not next week — this week.' },
            { icon: '🔧', title: 'Tune-Up Checklist', body: 'Refrigerant check · coil cleaning · drain line flush · filter replacement · thermostat calibration · capacitor test. All of this for $80–150 now vs. $400+ emergency call in July.' },
            { icon: '🏠', title: 'If System is 12+, Plan for Replacement', body: 'Average DFW summer kills aging systems. SEER2 replacements now qualify for federal 25C tax credit — up to $600 back. Budget $6,000–12,000 for a new system before prices rise further.' },
            { icon: '🔗', title: 'Join ProLnk Before Charter Closes', body: 'ProLnk is matching DFW homeowners with verified HVAC pros. Waitlist is free. Charter closes at 500 Pro applications. You get better pricing and verified quality.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: '32px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>
            Your Situation → Your May 2026 Last Word
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1a3050',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '14px 18px',
                  textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>YOUR MAY 2026 LAST WORD</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{result.word}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · Verified HVAC pros for DFW homeowners · prolnk.io
        </div>
      </div>
    </div>
  );
}
