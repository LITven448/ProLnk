import { useState } from 'react';

type ProjectType = 'exterior' | 'interior';

const exteriorMonths = [
  { name: 'Jan', rating: 'poor', lead: 'N/A', note: 'Too cold — paint adhesion fails below 50°F' },
  { name: 'Feb', rating: 'poor', lead: 'N/A', note: 'Still risky — wait for consistent warmth' },
  { name: 'Mar', rating: 'ideal', lead: '2 – 3 weeks', note: 'Best spring window — mild temps, low humidity' },
  { name: 'Apr', rating: 'ideal', lead: '2 – 4 weeks', note: 'Peak demand begins — book now or wait months' },
  { name: 'May', rating: 'good', lead: '3 – 5 weeks', note: 'Getting busy — lead times extend quickly' },
  { name: 'Jun', rating: 'poor', lead: 'N/A', note: 'Too hot — 95°F+ causes blistering and poor adhesion' },
  { name: 'Jul', rating: 'poor', lead: 'N/A', note: 'Avoid — highest paint failure risk in DFW heat' },
  { name: 'Aug', rating: 'poor', lead: 'N/A', note: 'Still too hot — wait for fall relief' },
  { name: 'Sep', rating: 'good', lead: '2 – 3 weeks', note: 'Temps cooling — great quality conditions' },
  { name: 'Oct', rating: 'ideal', lead: '1 – 2 weeks', note: 'Best fall window — mild, dry, low humidity' },
  { name: 'Nov', rating: 'ideal', lead: '1 – 2 weeks', note: 'Excellent conditions, painters have availability' },
  { name: 'Dec', rating: 'poor', lead: 'N/A', note: 'Too cold again — risk of freeze before cure' },
];

const colors: Record<string, string> = { ideal: '#22c55e', good: '#F5E642', poor: '#ef4444′ };
const labels: Record<string, string> = { ideal: '✅ Ideal', good: '⚠️ Good', poor: '🔴 Avoid' };

export default function DFWBestTimeToHirePainter2026() {
  const [type, setType] = useState<ProjectType>('exterior');
  const [selMonth, setSelMonth] = useState<number | null>(null);
  const month = selMonth !== null ? exteriorMonths[selMonth] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🖌️🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Best Time to Hire a Painter in DFW 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Exterior painting in DFW heat fails fast. March-May and October-November are the sweet spots. Interior painting is fine year-round — but spring books out.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 Project Type</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {(['exterior', 'interior'] as ProjectType[]).map((t) => (
            <button key={t} onClick={() => { setType(t); setSelMonth(null); }} style={{
              background: type === t ? '#F5E642′ : '#1e2d45', color: type === t ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize',
            }}>{t}</button>
          ))}
        </div>

        {type === 'interior' ? (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#22c55e', marginBottom: 8 }}>✅ Interior: Year-Round</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 12 }}>Interior painting is climate-controlled and works any month. However, spring demand is high — book February-March to avoid 4-6 week waits.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 12 }}>Best Value</div><div style={{ fontWeight: 700 }}>Jan – Feb, Aug – Sep</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 12 }}>Book Early</div><div style={{ fontWeight: 700 }}>Mar – May (high demand)</div></div>
            </div>
          </div>
        ) : (
          <>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 Select a Month</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 28 }}>
              {exteriorMonths.map((m, i) => (
                <button key={m.name} onClick={() => setSelMonth(i)} style={{
                  background: selMonth === i ? '#F5E642′ : '#1e2d45',
                  color: selMonth === i ? '#0A1628′ : colors[m.rating],
                  border: `2px solid ${selMonth === i ? '#F5E642' : colors[m.rating]}`,
                  borderRadius: 8, padding: '10px 4px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                }}>{m.name}</button>
              ))}
            </div>
            {month && (
              <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642′ }}>{month.name} — Exterior</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: colors[month.rating], marginBottom: 8 }}>{labels[month.rating]}</div>
                {month.lead !== 'N/A' && <div style={{ marginBottom: 8 }}><span style={{ color: '#64748b', fontSize: 12 }}>Lead Time: </span><span style={{ fontWeight: 700 }}>{month.lead}</span></div>}
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>{month.note}</div>
              </div>
            )}
          </>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏆 ProLnk Charter Advantage</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Charter painters give priority scheduling and agreed rates — no spring price surge surprises.</div>
        </div>
      </div>
    </div>
  );
}
