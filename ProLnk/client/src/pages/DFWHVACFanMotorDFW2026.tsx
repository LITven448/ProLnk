import { useState } from 'react';

export default function DFWHVACFanMotorDFW2026() {
  const [motorConcern, setMotorConcern] = useState('');
  const [result, setResult] = useState('');

  const concerns = [
    { id: 'motor-failed', label: '❌ Fan motor failed, need replacement' },
    { id: 'high-bills', label: '💸 High energy bills, considering ECM upgrade' },
    { id: 'humidity-issues', label: '💧 Home feels humid even with AC running' },
    { id: 'compare-types', label: '📊 Want to compare PSC vs ECM motors' },
  ];

  const guide: Record<string, string> = {
    'motor-failed': 'For like-for-like replacement: PSC motor is cheapest and fastest ($150-250 parts). If your system is 5+ years old, consider ECM upgrade ($450-750 parts) — pays back in 3-4 DFW summers through energy savings. Check if your system is ECM-compatible before committing to either.',
    'high-bills': 'ECM motors use 50-70% less electricity than PSC motors in blower mode. DFW systems run 8-12 months per year — savings add up fast. A $300-500 ECM premium over PSC pays back in 2-3 years at DFW electricity rates ($0.12-0.14/kWh average). Also reduces wear on compressor through gentler start cycles.',
    'humidity-issues': 'ECM motors solve DFW humidity problems that PSC motors cannot. ECM variable speed allows longer, slower dehumidification cycles instead of short blasts. In DFW where humidity runs 60-80% summer, ECM can make home feel 3-5 degrees cooler at same thermostat setting. This is the #1 comfort upgrade for DFW homes.',
    'compare-types': 'PSC (Permanent Split Capacitor): single speed, on/off, standard replacement, $150-250 parts, no communication with thermostat. ECM (Electronically Commutated Motor): variable speed, communicates with thermostat, $450-750 parts, 50-70% more efficient, improves humidity control. ECM requires compatible air handler — verify before ordering.',
  };

  function handleSelect(id: string) {
    setMotorConcern(id);
    setResult(guide[id]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌡️ HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW HVAC Fan Motor Selection Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          PSC vs ECM fan motors — the choice that determines your DFW home comfort and energy costs. ECM motors provide variable speed, dehumidification, and 50-70% energy savings. Premium is $300-500 but pays back fast in DFW.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '⚡', title: 'PSC Motor', items: ['Single speed', '$150-250 parts', 'Standard'] },
            { icon: '🌀', title: 'ECM Motor', items: ['Variable speed', '$450-750 parts', '50-70% more efficient'] },
          ].map(m => (
            <div key={m.title} style={{ background: '#1e2d45', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{m.title}</div>
              {m.items.map(item => (
                <div key={item} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>• {item}</div>
              ))}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#F5E642' }}>🔍 Your Motor Concern → DFW Guide</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => handleSelect(c.id)}
              style={{ background: motorConcern === c.id ? '#F5E642' : '#1e2d45', color: motorConcern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {c.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#1e2d45', borderLeft: '4px solid #F5E642', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: 32, padding: 16, background: '#1e2d45', borderRadius: 10, fontSize: 13, color: '#94a3b8' }}>
          💡 ProLnk connects DFW homeowners with HVAC pros who stock both PSC and ECM motors for same-day service.
        </div>
      </div>
    </div>
  );
}
