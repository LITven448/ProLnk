import { useState } from 'react';

const situations = [
  { id: 'on-fence', label: '🤔 Still deciding', guide: ['Charter is limited to the first 500 pros across all trades — no exceptions after cap', 'Once cap is hit, Founding tier opens permanently at $199/mo — $50/mo more forever', 'At $199/mo Founding: you pay $600 more per year than a Charter pro in the same trade', 'Charter direct commission is 12% vs 7% Founding — on a $2,000 job: $240 vs $140', 'Every week of delay is a week closer to losing Charter forever — the cap does not pause' ]},
  { id: 'cost', label: '💸 Worried about the $149/mo', guide: ['Charter rate is $149/mo locked — that is $1,788/yr, unchanged for life of your account', 'One matched job at Charter rate covers 2–3 months of subscription on a typical DFW trade', 'Founding tier costs $199/mo ($2,388/yr) — paying $600/yr more for the same matching service', 'Charter commission advantage: 12% vs 7% direct — 5% more per job, every job, forever', 'Network income offsets subscription: recruit 2 pros = $34.80/mo in subscription override' ]},
  { id: 'founding', label: '📊 Charter vs Founding rates', guide: ['Charter ($149): 12% direct commission, 7% subscription override, 4% job override L1', 'Founding ($199): 7% direct commission, 4% subscription override, 2% job override L1', 'On $10,000/mo in matched jobs: Charter earns $1,200 vs Founding $700 — $500/mo difference', 'On $10,000/mo matched jobs with 5 recruited pros: Charter earns ~$1,600 vs Founding ~$950', 'Charter advantage compounds over time — the longer you’re on the platform, the wider the gap' ]},
  { id: 'trade', label: '🔧 How many Charter spots in my trade', guide: ['Charter cap of 500 is across all trades combined — not per trade', 'DFW has 8 primary trades: HVAC, plumbing, electrical, roofing, foundation, paint, pest, general', 'If 50 Charter pros are HVAC, that’s 50 of 500 total used — trade mix not tracked', 'High-demand trades (HVAC, roofing) are filling faster — DFW hail and summer drive more demand', 'There is no trade-specific waitlist — first 500 pros registered get Charter regardless of trade' ]},
];

export default function DFWProLnkCharterScarcity2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = situations.find(s => s.id === selected);

  const charterStats = [
    { label: 'Charter Rate', value: '$149/mo', note: 'Locked forever' },
    { label: 'Founding Rate', value: '$199/mo', note: 'Opens at 501' },
    { label: 'Direct Commission', value: '12%', note: 'vs 7% Founding' },
    { label: 'Charter Cap', value: '500'  , note: 'Total across all trades' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚡</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.5rem' }}>ProLnk Charter Scarcity Guide 2026</h1>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.95rem' }}>Charter is limited to 500 pros. The cap is absolute. Here is what that means for DFW pros.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {charterStats.map((stat, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '1rem', border: '1px solid #1E2D4A', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#E8EAF0', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7A99' }}>{stat.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>🔍 What is your situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1A2A45', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #2A3A55'), borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>⚡ Charter Scarcity Guide</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.guide.map((tip, i) => (
                <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.5, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#0A1628', fontWeight: 700, fontSize: '0.95rem' }}>🚨 Charter spots are filling — secure yours at $149/mo before the cap</p>
          <p style={{ margin: '0.5rem 0 0', color: '#1A2A45', fontSize: '0.85rem' }}>prolnk.io · After 500 pros: rate goes to $199/mo permanently</p>
        </div>
      </div>
    </div>
  );
}