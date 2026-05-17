import { useState } from 'react';

const scenarios = [
  { id: 'no_cool_103', label: 'AC not cooling — outside temp 100°F+', urgency: 'emergency', advice: 'Emergency. Heat stroke risk. Call an HVAC emergency line today. DFW summer heat is life-threatening without AC. Do not wait.' },
  { id: 'no_cool_mild', label: 'AC not cooling — outside temp under 85°F', urgency: 'urgent', advice: 'Schedule within 48 hours. Comfortable for now but a broken compressor can fully fail before the next heat wave.' },
  { id: 'performance_drop', label: 'Slight performance drop on moderate day', urgency: 'moderate', advice: 'Schedule within 2 weeks. Low refrigerant or dirty coils. Easy fix now, expensive failure later.' },
  { id: 'noise_end_season', label: 'New noise appearing late September / October', urgency: 'moderate', advice: 'Address during fall maintenance. Common end-of-season bearing/capacitor wear. Book fall tune-up before winter.' },
  { id: 'heating_october', label: 'Heating issue discovered in October', urgency: 'urgent', advice: 'Act before November. DFW hard freezes arrive fast. HVAC techs book solid the first cold snap. Get in queue now.' },
  { id: 'heating_december', label: 'Heating failure in December', urgency: 'emergency', advice: 'Emergency. Call immediately. DFW has sub-freezing nights. Pipe burst risk. Priority dispatch required.' },
  { id: 'high_bill', label: 'Electric bill 30%+ higher than last summer', urgency: 'moderate', advice: 'Schedule efficiency audit within 2 weeks. Low refrigerant, dirty coils, or duct leaks. ROI on fix is typically under 1 season.' },
];

const colors: Record<string, string> = { emergency: '#ef4444', urgent: '#f97316', moderate: '#eab308', low: '#22c55e' };
const labels: Record<string, string> = { emergency: '🚨 Emergency — Call Now', urgent: '⚠️ Urgent — Within 48 Hours', moderate: '📅 Moderate — Within 2 Weeks', low: '✅ Low — Schedule Routine' };

export default function DFWHVACOkToWait2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = scenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>❄️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          DFW HVAC: Is It OK to Wait? — 2026 Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW timing matters. A broken AC in July is a medical emergency. A noisy furnace in October is a schedule-soon.
        </p>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌡️ Why DFW HVAC Has No "Wait It Out" Option in Summer</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            DFW regularly exceeds 105°F with heat index values above 110°F. Indoor temperatures without AC can
            reach dangerous levels within 2–4 hours. Unlike northern climates where a broken AC is uncomfortable,
            in DFW it is a health emergency — especially for elderly residents, infants, and pets.
            HVAC technicians book up within hours of a heat wave. <strong>Never wait on a summer AC failure in DFW.</strong>
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Describe Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scenarios.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 8,
                  border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`,
                  background: selected === s.id ? '#0A1628' : 'transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: `4px solid ${colors[match.urgency]}` }}>
            <div style={{ color: colors[match.urgency], fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{labels[match.urgency]}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{match.advice}</p>
          </div>
        )}

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW HVAC Urgency Calendar</h2>
          {[
            ['Jun–Sep AC failure', '🚨 Emergency same day — heat risk'],
            ['Oct heating issue', '⚠️ This week — beat the freeze queue'],
            ['Nov–Feb heating fail', '🚨 Emergency — pipe/safety risk'],
            ['Spring performance drop', '📅 Within 2 weeks before summer load'],
          ].map(([timing, desc]) => (
            <div key={timing} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 180 }}>{timing}</span>
              <span style={{ color: '#94a3b8' }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Get a Matched DFW HVAC Pro Fast</div>
          <div style={{ color: '#0A1628', marginBottom: 12 }}>ProLnk dispatches Charter HVAC pros in your DFW zip — with same-day availability tracking during heat events.</div>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
            Get Help Now →
          </a>
        </div>
      </div>
    </div>
  );
}