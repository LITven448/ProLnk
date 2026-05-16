import { useState } from 'react';

export default function ProLnkMatchSpeed2026() {
  const [urgency, setUrgency] = useState('');
  const [trade, setTrade] = useState('');

  const urgencies = [
    { id: 'emergency', label: '🚨 Emergency', desc: 'No heat/AC, water leak, gas smell' },
    { id: 'urgent', label: '⚡ Urgent', desc: 'Needs attention today or tomorrow' },
    { id: 'routine', label: '📅 Routine', desc: 'Scheduled maintenance or project' },
  ];

  const trades = [
    'HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Pest Control', 'Landscaping',
  ];

  const timelineMatrix: Record<string, Record<string, { time: string; note: string }>> = {
    emergency: {
      HVAC: { time: 'Same Day (< 4 hrs)', note: 'Charter HVAC pros prioritized for heat/AC failures. Summer SLA: 2 hours.' },
      Plumbing: { time: 'Same Day (< 3 hrs)', note: 'Active water leaks are P1 — Charter plumbers on standby.' },
      Electrical: { time: 'Same Day (< 4 hrs)', note: 'Sparks, burning smells, outages escalated immediately.' },
      Roofing: { time: 'Same Day (< 6 hrs)', note: 'Active leak tarping available same day.' },
      'Pest Control': { time: 'Next Day', note: 'Emergency pest control dispatched within 24 hours.' },
      Landscaping: { time: '2-3 Days', note: 'Landscaping is rarely true-emergency — scheduled quickly.' },
    },
    urgent: {
      HVAC: { time: 'Within 4 Hours', note: 'Charter pros respond within 1 hour, on-site within 4.' },
      Plumbing: { time: 'Within 4 Hours', note: 'Most Charter plumbers carry availability windows.' },
      Electrical: { time: 'Within 6 Hours', note: 'Charter electricians prioritized for same-day slots.' },
      Roofing: { time: 'Next Day', note: 'Roof crews need light — next morning earliest.' },
      'Pest Control': { time: 'Same Day', note: 'Pest techs often have afternoon availability.' },
      Landscaping: { time: '1-2 Days', note: 'Crew scheduling requires slight lead time.' },
    },
    routine: {
      HVAC: { time: '24-48 Hours', note: 'Seasonal tune-ups: pick your preferred window.' },
      Plumbing: { time: '24-48 Hours', note: 'Routine inspections and installs on your schedule.' },
      Electrical: { time: '24-48 Hours', note: 'Panel upgrades, outlets, lighting — plan ahead.' },
      Roofing: { time: '2-3 Days', note: 'Full roof jobs require crew scheduling and material delivery.' },
      'Pest Control': { time: 'Next Day', note: 'Quarterly treatment: choose morning or afternoon.' },
      Landscaping: { time: '1-3 Days', note: 'Book a crew for your specific project window.' },
    },
  };

  const result = urgency && trade ? timelineMatrix[urgency]?.[trade] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Match Speed Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>How fast ProLnk connects you with a Charter pro in DFW</p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: '#94a3b8', marginBottom: 14, fontWeight: 600 }}>1. How urgent is your situation?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {urgencies.map(u => (
              <button key={u.id} onClick={() => setUrgency(u.id)}
                style={{ background: urgency === u.id ? '#F5E642' : '#1e3a5f', border: '2px solid #F5E642', borderRadius: 12, padding: '16px 10px', color: urgency === u.id ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{u.label.split(' ')[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{u.label.split(' ').slice(1).join(' ')}</div>
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>{u.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: '#94a3b8', marginBottom: 14, fontWeight: 600 }}>2. What trade do you need?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {trades.map(t => (
              <button key={t} onClick={() => setTrade(t)}
                style={{ background: trade === t ? '#F5E642' : '#1e3a5f', border: '2px solid #F5E642', borderRadius: 8, padding: '10px 18px', color: trade === t ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Expected Match Time</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>{result.time}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{result.note}</p>
            <p style={{ color: '#475569', fontSize: 12, marginTop: 16 }}>⭐ Charter pros are prioritized — faster response than standard listings</p>
          </div>
        )}

        {!result && urgency && trade && (
          <p style={{ textAlign: 'center', color: '#fbbf24' }}>No match data for this combination yet — contact support.</p>
        )}
      </div>
    </div>
  );
}

