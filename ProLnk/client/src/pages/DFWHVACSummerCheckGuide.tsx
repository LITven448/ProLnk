import { useState } from 'react';

const checks = [
  { id: 'filter', label: 'Filter inspection & replacement', detail: 'Check filter — replace if gray/clogged. DFW homes need 1-3 month replacement in summer due to dust and pollen.' },
  { id: 'outdoor', label: 'Outdoor unit clearance', detail: 'Clear at least 2 feet around condenser. Remove leaves, grass clippings, and debris from fins.' },
  { id: 'drain', label: 'Condensate drain line flush', detail: 'Pour 1 cup of distilled white vinegar down the drain line access point. Prevents clogs that cause water damage.' },
  { id: 'thermostat', label: 'Thermostat calibration check', detail: 'Set to 75°F and verify indoor temp matches within 2 degrees after 30 minutes of runtime.' },
  { id: 'airflow', label: 'Airflow test at all vents', detail: 'Hold a tissue near each vent — it should flutter strongly. Weak vents may indicate duct leaks or blockages.' },
  { id: 'coils', label: 'Evaporator coil visual check', detail: 'Inspect for ice buildup or frost. If present, turn system off and call a tech immediately.' },
  { id: 'refrigerant', label: 'Refrigerant line insulation', detail: 'Check foam insulation on copper lines running into home. Replace cracked or missing insulation.' },
  { id: 'circuit', label: 'Circuit breaker and disconnect check', detail: 'Verify outdoor disconnect is secure. Check breaker panel for tripped HVAC breakers.' },
  { id: 'noise', label: 'Listen for abnormal sounds', detail: 'Run system for 10 minutes — note any rattling, grinding, squealing, or clicking beyond startup.' },
  { id: 'bill', label: 'Compare last June electric bill', detail: 'Pull last summer electric bill. If up more than 15% with similar usage, efficiency has dropped.' },
];

export default function DFWHVACSummerCheckGuide() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [score, setScore] = useState<string | null>(null);

  function toggle(id: string) {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function calculate() {
    const pct = Math.round((completed.length / checks.length) * 100);
    const techItems = checks.filter(c => !completed.includes(c.id)).map(c => c.label);
    if (pct === 100) {
      setScore('✅ Perfect score! Your DFW HVAC is summer-ready. Schedule a pro tune-up to inspect refrigerant levels and electrical connections.');
    } else if (pct >= 70) {
      setScore(`⚠️ ${pct}% complete. Consider calling a tech for: ${techItems.slice(0, 2).join(', ')}.`);
    } else {
      setScore(`🚨 ${pct}% complete — ${checks.length - completed.length} items outstanding. A DFW summer with an underserviced system risks breakdown during peak heat.`);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>☀️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW Summer HVAC Check Guide
        </h1>
        <p style={{ color: '#9AAFC4', marginBottom: 8 }}>
          The definitive 10-step DFW summer HVAC checklist homeowners can complete themselves. Do this every May before temperatures hit 95°F+.
        </p>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontSize: 14, color: '#F5E642′ }}>
          🌡️ DFW Context: Your AC runs 3,000+ hours June-September. A single missed maintenance item can cost $500-3,000 in emergency repairs.
        </div>
        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {checks.map((c, i) => (
            <div key={c.id} style={{ background: completed.includes(c.id) ? '#0D3B1E' : '#1A2B45', borderRadius: 8, border: completed.includes(c.id) ? '1px solid #2ECC71′ : '1px solid #2A4A6B' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                <input type="checkbox" checked={completed.includes(c.id)}
                  onChange={() => toggle(c.id)}
                  onClick={e => e.stopPropagation()}
                  style={{ marginRight: 14, width: 18, height: 18, cursor: 'pointer', accentColor: '#F5E642′ }} />
                <div style={{ flex: 1, fontWeight: 600 }}>Step {i + 1}: {c.label}</div>
                <div style={{ color: '#9AAFC4', fontSize: 18 }}>{expanded === c.id ? '▲' : '▼'}</div>
              </div>
              {expanded === c.id && (
                <div style={{ padding: '0 16px 14px 48px', color: '#9AAFC4', fontSize: 14, lineHeight: 1.6 }}>{c.detail}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, background: '#1A2B45', borderRadius: 8, height: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#F5E642', width: `${(completed.length / checks.length) * 100}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 60 }}>{completed.length}/{checks.length}</div>
        </div>
        <button onClick={calculate}
          style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 16 }}>
          Get My Score
        </button>
        {score && <div style={{ padding: 16, background: '#1A2B45', borderRadius: 8, lineHeight: 1.6 }}>{score}</div>}
      </div>
    </div>
  );
}
