import { useState } from 'react';

type Trade = 'hvac' | 'plumber' | 'roofer' | 'gc' | 'painter' | 'electrician';
type UrgencyLevel = 'emergency' | 'urgent' | 'planned';

const tradeData: Record<Trade, { label: string; icon: string; base: Record<UrgencyLevel, string>; note: string }> = {
  hvac: {
    label: 'HVAC', icon: '❄️',
    base: { emergency: 'Same day – 4 hours', urgent: 'Same day – 3 days', planned: '3 – 7 days' },
    note: 'Summer emergencies can push to 1-2 weeks. Charter pros commit to 24hr emergency response.',
  },
  plumber: {
    label: 'Plumber', icon: '🔧',
    base: { emergency: '2 – 6 hours', urgent: '1 – 3 days', planned: '3 – 7 days' },
    note: 'Post-freeze (Feb) can extend emergency wait to 24hrs. Pre-schedule maintenance for October.',
  },
  roofer: {
    label: 'Roofer', icon: '🏠',
    base: { emergency: '1 – 5 days', urgent: '2 – 4 weeks', planned: '1 – 8 weeks' },
    note: 'Post-hail events: 6-8 week waits. Charter roofers reserve emergency slots. No door-to-door.',
  },
  gc: {
    label: 'General Contractor', icon: '🧱',
    base: { emergency: 'N/A', urgent: '2 – 6 weeks', planned: '2 – 12 weeks' },
    note: 'GCs don't do emergency calls. Q1 = 2 week lead times. Summer spring = 8-12 weeks for kitchens/baths.',
  },
  painter: {
    label: 'Painter', icon: '🖌️',
    base: { emergency: 'N/A', urgent: '1 – 3 weeks', planned: '2 – 5 weeks' },
    note: 'Interior anytime. Exterior: avoid June-August heat. Spring books 4-6 weeks in advance.',
  },
  electrician: {
    label: 'Electrician', icon: '⚡',
    base: { emergency: 'Same day – 24 hours', urgent: '2 – 5 days', planned: '3 – 10 days' },
    note: 'Electricians stay moderately busy year-round. Remodel season (spring) can push planned work 2+ weeks.',
  },
};

const urgencies: { key: UrgencyLevel; label: string }[] = [
  { key: 'emergency', label: '🚨 Emergency' },
  { key: 'urgent', label: '⚠️ Urgent (this week)' },
  { key: 'planned', label: '✅ Planned (no rush)' },
];

export default function DFWContractorWaitTimes2026() {
  const [trade, setTrade] = useState<Trade | null>(null);
  const [urgency, setUrgency] = useState<UrgencyLevel | null>(null);
  const result = trade && urgency ? tradeData[trade].base[urgency] : null;
  const noteText = trade ? tradeData[trade].note : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>⏳📍</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW Contractor Wait Times Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Current wait times by trade in the Dallas-Fort Worth metro. ProLnk Charter pros commit to faster response windows.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔨 Select Trade</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
          {(Object.keys(tradeData) as Trade[]).map((key) => (
            <button key={key} onClick={() => setTrade(key)} style={{
              background: trade === key ? '#F5E642' : '#1e2d45',
              color: trade === key ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '12px 8px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
            }}>{tradeData[key].icon} {tradeData[key].label}</button>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⏱️ Select Urgency</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {urgencies.map(({ key, label }) => (
            <button key={key} onClick={() => setUrgency(key)} style={{
              background: urgency === key ? '#F5E642' : '#1e2d45',
              color: urgency === key ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
            }}>{label}</button>
          ))}
        </div>

        {result && trade && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 16, color: '#94a3b8', marginBottom: 4 }}>Estimated Wait — {tradeData[trade].label}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 16 }}>{result}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>{noteText}</div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏆 Charter Pro Commitment</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk Charter pros agree to faster response windows and no emergency price gouging — so wait times above are the worst case, not the norm.</div>
        </div>
      </div>
    </div>
  );
}
