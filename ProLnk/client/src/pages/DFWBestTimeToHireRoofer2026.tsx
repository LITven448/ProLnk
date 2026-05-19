import { useState } from 'react';

const months = [
  { name: 'Jan', label: 'January', avail: 'high', index: 1, wait: '1 – 3 days', note: 'Cheapest month — 25% discount possible, no storm rush' },
  { name: 'Feb', label: 'February', avail: 'high', index: 1, wait: '1 – 3 days', note: 'Great winter deals, ideal for planned replacements' },
  { name: 'Mar', label: 'March', avail: 'medium', index: 2, wait: '1 – 2 weeks', note: 'Pre-storm season — book before spring weather hits' },
  { name: 'Apr', label: 'April', avail: 'medium', index: 2, wait: '1 – 2 weeks', note: 'Good window, mild temps = quality installs' },
  { name: 'May', label: 'May', avail: 'medium', index: 3, wait: '2 – 3 weeks', note: 'Hail season begins — waits extend after storms' },
  { name: 'Jun', label: 'June', avail: 'low', index: 5, wait: '3 – 6 weeks', note: 'Post-hail backlog — 6-8 week waits possible' },
  { name: 'Jul', label: 'July', avail: 'low', index: 5, wait: '4 – 8 weeks', note: 'Peak storm season — never hire door-to-door' },
  { name: 'Aug', label: 'August', avail: 'low', index: 5, wait: '4 – 8 weeks', note: 'Still busy from summer storms — long waits' },
  { name: 'Sep', label: 'September', avail: 'medium', index: 3, wait: '2 – 4 weeks', note: 'Fall ideal — mild temps, no storm rush' },
  { name: 'Oct', label: 'October', avail: 'high', index: 2, wait: '1 – 2 weeks', note: 'Best fall window — great pricing and availability' },
  { name: 'Nov', label: 'November', avail: 'high', index: 1, wait: '3 – 7 days', note: 'Slow season begins — price drops, easy scheduling' },
  { name: 'Dec', label: 'December', avail: 'high', index: 1, wait: '1 – 3 days', note: 'Winter deals — lowest demand all year' },
];

const colors: Record<string, string> = { high: '#22c55e', medium: '#F5E642', low: '#ef4444′ };
const labels: Record<string, string> = { high: '✅ High Availability', medium: '⚠️ Moderate', low: '🔴 Booked Out' };

export default function DFWBestTimeToHireRoofer2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const month = selected !== null ? months[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠⛈️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Best Time to Hire a Roofer in DFW 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>
          Post-hail storms create 6-8 week backlogs. Winter = cheapest rates. Never hire door-to-door after a storm. ProLnk Charter roofers = vetted and available.
        </p>
        <div style={{ background: '#3b1f0a', borderRadius: 8, padding: 12, marginBottom: 28, color: '#fbbf24', fontSize: 14 }}>
          ⚠️ Storm chasers target DFW after hail events. Only hire verified, licensed local pros through ProLnk.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 Select a Month</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 28 }}>
          {months.map((m, i) => (
            <button key={m.name} onClick={() => setSelected(i)} style={{
              background: selected === i ? '#F5E642′ : '#1e2d45',
              color: selected === i ? '#0A1628′ : '#fff',
              border: 'none', borderRadius: 8, padding: '10px 4px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
            }}>{m.name}</button>
          ))}
        </div>

        {month && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{month.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: colors[month.avail], marginBottom: 4 }}>{labels[month.avail]}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Demand Index: {Array(month.index).fill('📈').join('')}</div>
            <div><span style={{ color: '#64748b', fontSize: 12 }}>Expected Wait: </span><span style={{ fontWeight: 700 }}>{month.wait}</span></div>
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>{month.note}</div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏆 ProLnk Charter Advantage</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Charter roofers are vetted, licensed, and local — no storm chasers. Agreed pricing so post-storm quotes stay fair.</div>
        </div>
      </div>
    </div>
  );
}
