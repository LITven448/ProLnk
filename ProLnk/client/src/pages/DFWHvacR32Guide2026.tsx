import { useState } from 'react';

const refrigerants = [
  { name: 'R-22 (Freon)', gwp: 1810, status: 'Phased Out 2020', color: '#ef4444′ },
  { name: 'R-410A (Puron)', gwp: 2088, status: 'Phase-Out by 2025', color: '#f97316′ },
  { name: 'R-32', gwp: 675, status: 'Transitional Choice', color: '#eab308′ },
  { name: 'R-454B (Puron Advance)', gwp: 466, status: 'Carrier Standard', color: '#22c55e' },
  { name: 'R-290 (Propane)', gwp: 3, status: 'Future Low-GWP', color: '#06b6d4′ },
];

const ageToRefrigerant: Record<string, string> = {
  '2010-or-older': 'R-22 — Already phased out. Replacement refrigerant costs $200-400/lb. Plan immediate replacement.',
  '2011-2022': 'R-410A — Phase-out underway. Stock is limited; costs rising. Budget $4,000-8,000 for system replacement by 2026.',
  '2023-2024': 'R-410A or R-32 — May be R-32 if newer model. Check nameplate. R-32 systems are ready for 2025+ regulations.',
  '2025-2026': 'R-32 or R-454B — Fully compliant. No action needed until system end-of-life (15-20 years).',
};

export default function DFWHvacR32Guide2026() {
  const [systemAge, setSystemAge] = useState('');
  const [showResult, setShowResult] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🧊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            DFW R-32 Refrigerant Transition Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>
            What DFW homeowners need to know about the refrigerant changeover happening right now
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Why Refrigerants Are Changing</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>
            The EPA is phasing out high Global Warming Potential (GWP) refrigerants under AIM Act regulations. R-410A — the dominant DFW refrigerant since 2010 — has a GWP of 2,088. New regulations cap refrigerants at GWP 700 or lower for new equipment starting 2025.
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            For DFW homeowners, this means any new AC system purchased in 2025 or later uses a different refrigerant — typically R-32 or R-454B (Carrier's "Puron Advance"). These are NOT interchangeable with R-410A.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Refrigerant Comparison</h2>
          {refrigerants.map((r) => (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, padding: 12, background: '#0d1f35', borderRadius: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{r.name}</div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>{r.status}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: r.color, fontWeight: 700 }}>GWP: {r.gwp.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Technician Certification Requirement</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>
            R-32 is classified as A2L — mildly flammable. DFW technicians must complete additional A2L safety training before working on these systems. Not all DFW HVAC companies have certified techs yet — ask before scheduling service.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['A2L Safety Certification Required', 'New Tools & Equipment Needed', 'Carrier R-454B: Different Protocol', 'Cannot Mix With R-410A Systems'].map((item) => (
              <div key={item} style={{ background: '#0d1f35', borderRadius: 8, padding: 12, color: '#F5E642', fontSize: 14 }}>
                ✅ {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Your System Age → Transition Plan</h2>
          <p style={{ color: '#cbd5e1', marginBottom: 12 }}>When was your current AC system installed?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {Object.keys(ageToRefrigerant).map((key) => (
              <button
                key={key}
                onClick={() => { setSystemAge(key); setShowResult(true); }}
                style={{ padding: '10px 16px', background: systemAge === key ? '#F5E642′ : '#0d1f35', color: systemAge === key ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: ’pointer', fontWeight: 600, fontSize: 14 }}
              >
                {key.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
          {showResult && systemAge && (
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{ageToRefrigerant[systemAge]}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Get R-32 Certified DFW Technicians via ProLnk
          </h3>
          <p style={{ color: '#1e3a5f', marginBottom: 4 }}>Charter pros are A2L certified and ready for 2025-2026 systems.</p>
          <p style={{ color: '#0A1628', fontWeight: 700 }}>prolnk.io → HVAC Service</p>
        </div>
      </div>
    </div>
  );
}