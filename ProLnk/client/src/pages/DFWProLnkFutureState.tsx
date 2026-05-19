import { useState } from 'react';

const painPoints = [
  {
    id: 'bad-contractors',
    label: '🔨 Bad Contractors',
    today: 'You search Google, read mixed reviews, get 3 quotes, hope for the best, and often regret it.',
    future: 'ProLnk AI matches you with vetted, reviewed, performance-tracked pros in your exact trade and zip code.',
    vault: 'Your Home Health Vault documents every job, so every future pro sees exactly what was done and by whom.',
    income: 'Origination rights mean your role in building ProLnk\’s network generates income indefinitely.',
  },
  {
    id: 'reactive-repairs',
    label: '🚨 Reactive Repairs',
    today: 'You find out your HVAC is failing in August when it stops working. The bill is $6,000.',
    future: 'ProLnk\’s predictive maintenance engine alerts you 90 days before likely failure based on your home\’s data.',
    vault: 'Home Health Vault tracks equipment age, service history, and local failure patterns to forecast your risk.',
    income: 'Every home you originate into the Vault earns you a permanent share of ProLnk\’s platform fees.',
  },
  {
    id: 'contractor-availability',
    label: '📅 No Availability',
    today: 'Every good contractor in DFW is booked 3–6 weeks out. You wait and the problem gets worse.',
    future: 'ProLnk\’s network of Charter Pros guarantees availability windows through pre-committed scheduling.',
    vault: 'Charter Pros prioritize Vault homeowners — documented homes get first access to capacity.',
    income: 'The larger ProLnk\’s pro network grows, the more your origination rights earn. Your income scales with us.',
  },
  {
    id: 'pricing-uncertainty',
    label: '💸 Price Confusion',
    today: 'You have no idea if a $4,200 HVAC quote is fair, low, or highway robbery.',
    future: 'ProLnk provides market-rate benchmarks for every job before you accept a quote.',
    vault: 'Your Vault tracks every job cost, building a personal pricing baseline for your home over time.',
    income: 'Pros in the ProLnk network compete on quality and price — homeowners win both ways.',
  },
  {
    id: 'no-home-history',
    label: '📋 No Home History',
    today: 'You bought your DFW home with no record of what was done, when, or by whom.',
    future: 'Every ProLnk job auto-documents into your Home Health Vault — a permanent, searchable record.',
    vault: 'When you sell, your documented home history commands a premium and closes faster.',
    income: 'Origination rights on your Vault home are a permanent income asset — even after you sell.',
  },
];

export default function DFWProLnkFutureState() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = painPoints.find((p) => p.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔮</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>DFW Homeownership — With ProLnk</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            Select your biggest current pain point to see exactly how ProLnk&#39;s fully built platform solves it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
          {painPoints.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                backgroundColor: selected === p.id ? '#F5E642' : '#1e2d45',
                color: selected === p.id ? '#0A1628' : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#1e2d45', borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 24 }}>{active.label} — Future State</h2>
            <div style={{ marginBottom: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#ef4444', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Today Without ProLnk</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{active.today}</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#22c55e', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>With ProLnk — AI Matching</div>
              <p style={{ fontSize: 15, lineHeight: 1.7 }}>{active.future}</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#60a5fa', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>With ProLnk — Home Health Vault</div>
              <p style={{ fontSize: 15, lineHeight: 1.7 }}>{active.vault}</p>
            </div>
            <div style={{ backgroundColor: '#F5E642', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#0A1628', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, fontWeight: 700 }}>With ProLnk — Origination Income</div>
              <p style={{ color: '#0A1628', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{active.income}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>
            Select your biggest pain point above to see how ProLnk&#39;s future state solves it specifically.
          </div>
        )}
      </div>
    </div>
  );
}
