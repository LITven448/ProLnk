import { useState } from 'react';

const months = [
  { name: 'Jan', label: 'January', pricing: 'low', wait: 'Same day – 2 days', note: 'Winter slowdown — great deals available', index: 2 },
  { name: 'Feb', label: 'February', pricing: 'low', wait: 'Same day – 2 days', note: 'Slow season continues, negotiate aggressively', index: 2 },
  { name: 'Mar', label: 'March', pricing: 'medium', wait: '2 – 4 days', note: 'Shoulder month — 20-30% cheaper than summer', index: 5 },
  { name: 'Apr', label: 'April', pricing: 'medium', wait: '3 – 5 days', note: 'Ideal window before summer rush', index: 6 },
  { name: 'May', label: 'May', pricing: 'medium', wait: '4 – 7 days', note: 'Book early — demand climbing fast', index: 7 },
  { name: 'Jun', label: 'June', pricing: 'high', wait: '1 – 2 weeks', note: 'Peak season — emergency pricing in effect', index: 10 },
  { name: 'Jul', label: 'July', pricing: 'high', wait: '1 – 2 weeks', note: 'Hottest month — expect 25-40% premium', index: 10 },
  { name: 'Aug', label: 'August', pricing: 'high', wait: '1 – 2 weeks', note: 'Still peak — units failing daily in DFW heat', index: 10 },
  { name: 'Sep', label: 'September', pricing: 'medium', wait: '3 – 5 days', note: 'Shoulder month — pricing eases, good timing', index: 5 },
  { name: 'Oct', label: 'October', pricing: 'medium', wait: '2 – 4 days', note: 'Best fall window for tune-ups and replacements', index: 4 },
  { name: 'Nov', label: 'November', pricing: 'low', wait: 'Same day – 2 days', note: 'Great time for heating system service', index: 2 },
  { name: 'Dec', label: 'December', pricing: 'low', wait: 'Same day – 3 days', note: 'Slow season — deals available before holidays', index: 2 },
];

const colors: Record<string, string> = {
  low: '#22c55e',
  medium: '#F5E642',
  high: '#ef4444',
};

const labels: Record<string, string> = {
  low: '✅ Great Time',
  medium: '⚠️ Moderate',
  high: '🔴 Peak Pricing',
};

export default function DFWBestTimeToHireHVAC2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const month = selected !== null ? months[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>❄️🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Best Time to Hire HVAC in DFW 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Avoid peak-season emergency pricing. Shoulder months save DFW homeowners 20-30%. ProLnk Charter pros have agreed rates year-round.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 Select a Month</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 28 }}>
          {months.map((m, i) => (
            <button key={m.name} onClick={() => setSelected(i)} style={{
              background: selected === i ? '#F5E642' : '#1e2d45',
              color: selected === i ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '10px 4px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
            }}>{m.name}</button>
          ))}
        </div>

        {month && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{month.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: colors[month.pricing], marginBottom: 4 }}>{labels[month.pricing]}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
              Pricing Index: {Array(month.index).fill('💲').join('')}
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Expected Wait</div><div style={{ fontWeight: 700 }}>{month.wait}</div></div>
            </div>
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>{month.note}</div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏆 ProLnk Charter Advantage</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Charter pros lock in agreed rates — no emergency pricing surcharges. Get matched in minutes, not days.</div>
        </div>
      </div>
    </div>
  );
}
