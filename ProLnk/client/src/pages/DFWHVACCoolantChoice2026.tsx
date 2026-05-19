import { useState } from 'react';

export default function DFWHVACCoolantChoice2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'old-r22', label: '🔴 Old R-22 system failing' },
    { id: 'r410a-working', label: '🟡 R-410A system still working' },
    { id: 'new-install', label: '🟢 Brand new installation' },
    { id: 'budget-tight', label: '💰 Budget is a primary concern' },
  ];

  const guide: Record<string, string> = {
    'old-r22': 'Replace with R-454B or R-32. R-22 is fully phased out — refrigerant is scarce and expensive. Modern A2L systems are safe, efficient, and SEER2 compliant. Carrier Puron Advance (R-454B) is a top pick for DFW.',
    'r410a-working': 'Keep running until failure. R-410A inventory still available for repairs. When replacement comes, move to R-32 or R-454B. No urgency to replace a functioning system just for refrigerant concerns.',
    'new-install': 'Choose R-32 or R-454B — both are A2L (mildly flammable, safe with proper handling). R-32 has better global availability; R-454B is Carrier’s proprietary blend. Both exceed SEER2 15 minimum required in Texas.',
    'budget-tight': 'Look for R-410A systems from existing inventory — manufacturers can sell existing stock. Often 10-20% cheaper than new A2L equipment. Still SEER2 compliant. Just verify your contractor stocks the refrigerant for future service.',
  };

  function handleSelect(id: string) {
    setSituation(id);
    setResult(guide[id]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌡️ HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW HVAC Refrigerant Choice When Replacing 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          R-410A phase-out affects manufacturing, not existing inventory sales. R-32 and R-454B are the new standard A2L refrigerants — mildly flammable but safe. All new DFW systems must meet SEER2 15 minimum.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🧪', name: 'R-410A', note: 'Still sold, not manufactured new' },
            { icon: '🌿', name: 'R-32', note: 'Next-gen, lower GWP, A2L rated' },
            { icon: '⚡', name: 'R-454B (Puron Advance)', note: 'Carrier proprietary, widely used in DFW' },
          ].map(r => (
            <div key={r.name} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{r.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{r.note}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#F5E642′ }}>🔍 Your DFW Situation → Refrigerant Guide</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => handleSelect(s.id)}
              style={{ background: situation === s.id ? '#F5E642′ : '#1e2d45', color: situation === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {s.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#1e2d45', borderLeft: '4px solid #F5E642', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: 32, padding: 16, background: '#1e2d45', borderRadius: 10, fontSize: 13, color: '#94a3b8′ }}>
          💡 ProLnk connects DFW homeowners with verified HVAC contractors who stock all refrigerant types.
        </div>
      </div>
    </div>
  );
}
