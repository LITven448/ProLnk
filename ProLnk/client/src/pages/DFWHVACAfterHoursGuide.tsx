import { useState } from 'react';

const emergencyChecklist = [
  { item: 'Outdoor temp above 95°F', emergencyWeight: 3 },
  { item: 'AC completely not running (no cold air)', emergencyWeight: 3 },
  { item: 'Anyone in home over 65 or under 5', emergencyWeight: 3 },
  { item: 'Someone with medical condition requiring cooling', emergencyWeight: 3 },
  { item: 'Indoor temp above 90°F', emergencyWeight: 2 },
  { item: 'AC running but not cooling at all (just warm air)', emergencyWeight: 2 },
  { item: 'Burning smell or tripping breakers', emergencyWeight: 3 },
  { item: 'Water leak from unit', emergencyWeight: 1 },
  { item: 'AC just less efficient than usual', emergencyWeight: 0 },
  { item: 'Strange noise but still cooling', emergencyWeight: 0 },
];

const costs = [
  { label: 'After-Hours Diagnostic Fee', range: '–', note: 'Just to show up and diagnose — billed regardless of repair' },
  { label: 'After-Hours Labor Rate', range: '$150–$250/hr', note: 'vs $90–$150/hr during business hours' },
  { label: 'Emergency Refrigerant Add', range: '$300–$600', note: 'If low refrigerant is the cause; includes overnight premium' },
  { label: 'Capacitor Replacement (common)', range: '$250–$450', note: 'Parts + emergency labor; $150–$300 during hours' },
  { label: 'Contactor Replacement', range: '$200–$400', note: 'Frequent DFW failure; burns out in summer heat' },
  { label: 'Emergency Compressor', range: '$1,200–$3,500', note: 'Rare overnight — usually flagged for next-day or replacement' },
];

const situations: Record<string, { verdict: string; color: string; reason: string; cost: string }> = {
  'No AC, 100°F+ outside, elderly or infant in home': { verdict: 'CALL NOW — Emergency', color: '#EF4444', reason: 'Heat stroke risk in 2-4 hours. This is a medical emergency, not just discomfort.', cost: '$350-$800 expected' },
  'No AC, 100°F+ outside, healthy adults only': { verdict: 'CALL NOW — Emergency', color: '#EF4444', reason: 'Indoor temp will reach 95°F+ within 4 hours. After-hours is justified at these temps.', cost: '$350-$800 expected' },
  'AC running but barely cooling, 95°F outside': { verdict: 'Call Tonight — Urgent', color: '#F59E0B', reason: 'Likely low refrigerant or failing capacitor. Will only get worse. Waiting risks compressor damage.', cost: '$250-$600 expected' },
  'Strange noise but still cooling fine, 90°F outside': { verdict: 'Wait Until Morning', color: '#10B981', reason: 'System is still functional. Note the noise type and time it started. Call at 7am for same-day service.', cost: '$150-$350 during hours' },
  'AC not running, 75°F outside at night': { verdict: 'Wait Until Morning', color: '#10B981', reason: 'Overnight temps make this safe to wait. Open windows. Call first thing in the morning to get on the early queue.', cost: '$150-$350 during hours' },
  'Water dripping from indoor unit': { verdict: 'Check First, Then Decide', color: '#8B5CF6', reason: 'Turn off AC. Check drain pan. If minor, place a towel and call morning. If flooding, call now to prevent water damage.', cost: '–' },
};

export default function DFWHVACAfterHoursGuide() {
  const [situation, setSituation] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600 }}>🚨 DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>After-Hours HVAC Service Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 15 }}>
          In DFW summers, a broken AC at 11pm is not always an emergency — but sometimes it is. This guide helps you decide when to call for after-hours service and what to expect.
        </p>

        <div style={{ background: '#EF444420', borderRadius: 10, padding: 16, marginBottom: 24, border: '1px solid #EF4444' }}>
          <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 6 }}>🌡️ DFW-Specific Rule of Thumb</div>
          <div style={{ fontSize: 14, color: '#CBD5E1' }}>
            If outdoor temp is above 95°F AND your AC is completely down AND anyone vulnerable is in the home — call for emergency service immediately. DFW summer nights rarely drop below 80°F, making indoor temps dangerous within hours.
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>💰 Real After-Hours Costs in DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {costs.map(c => (
              <div key={c.label} style={{ display: 'flex', gap: 12, background: '#0A1628', borderRadius: 8, padding: 12, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: '#CBD5E1', fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{c.note}</div>
                </div>
                <div style={{ minWidth: 130, fontSize: 14, fontWeight: 700, color: '#F5E642', textAlign: 'right' }}>{c.range}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 My Situation — Emergency or Wait?</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
            <option value="">Describe your situation...</option>
            {Object.keys(situations).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {situation && situations[situation] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: 'none' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: situations[situation].color, marginBottom: 10 }}>{situations[situation].verdict}</div>
              <div style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.7, marginBottom: 10 }}>{situations[situation].reason}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642' }}>Estimated cost: {situations[situation].cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
