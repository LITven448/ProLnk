import { useState } from 'react';

const BIZ_TYPES = [
  { id: 'emergency', label: '🚨 Emergency Specialist', matchType: 'Priority emergency matches', rate: '$350-$900/call', demand: 'Year-round, peaks during freezes' },
  { id: 'slab', label: '🏗️ Slab Leak Expert', matchType: 'Slab leak diagnostic matches', rate: '$1,200-$4,500/job', demand: 'High — DFW clay soil shifts pipes' },
  { id: 'water', label: '💧 Water Treatment Pro', matchType: 'Hard water & softener installs', rate: '$800-$2,800/install', demand: 'Steady — DFW water hardness 15-20 gpg' },
  { id: 'commercial', label: '🏢 Commercial Plumber', matchType: 'Multi-unit & commercial leads', rate: '$2,000-$25,000/project', demand: 'Growing with DFW commercial boom' },
  { id: 'general', label: '🔧 General Residential', matchType: 'Full-service residential matches', rate: '$150-$1,500/job', demand: 'Consistent — 1.2M DFW homes' },
];

const SEASONAL = [
  { month: 'Feb', event: '❄️ Hard Freeze', surge: '400% demand spike', tip: 'Burst pipes, water damage — have capacity ready' },
  { month: 'Apr-Jun', event: '🌧️ Spring Flooding', surge: '200% sump/drain calls', tip: 'Drainage, sump pump, backflow prevention peak' },
  { month: 'Jul-Aug', event: '☀️ Peak Drought', surge: '180% slab leak calls', tip: 'Clay soil shrinks, pipes shift — slab leak season' },
  { month: 'Oct-Nov', event: '🏠 Pre-Winter Prep', surge: '150% inspection demand', tip: 'Pipe insulation, water heater flushes' },
];

const STREAMS = [
  { icon: '💰', name: 'Emergency Match Premium', desc: 'ProLnk routes priority emergency calls with 1.5x rate multiplier for immediate response' },
  { icon: '🔄', name: 'Annual Maintenance Plans', desc: 'Offer $99-199/yr maintenance agreements to every match — tracked in ProLnk dashboard' },
  { icon: '👥', name: 'Pro Network Override', desc: 'Recruit other plumbers — earn 1-4% of their match income across 4 levels' },
  { icon: '🏠', name: 'Home Origination Rights', desc: 'Permanent revenue share on every home you first service through ProLnk' },
  { icon: '📋', name: 'Referral Subscriptions', desc: '10% recurring of $149/mo when you refer a plumber to join ProLnk' },
];

export default function DFWProLnkPlumbingPartnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const biz = BIZ_TYPES.find(b => b.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642' }}>🔧 ProLnk Plumbing Partner Guide</div>
          <div style={{ color: '#94A3B8', marginTop: '.5rem' }}>DFW plumbers — emergency matches, seasonal surges, 5 income streams</div>
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>Select Your Business Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {BIZ_TYPES.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)}
                style={{ padding: '.85rem 1rem', borderRadius: 10, border: 'none', background: selected === b.id ? '#F5E64222' : '#0A1628', color: '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {b.label}
              </button>
            ))}
          </div>
          {biz && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #10B981' }}>
              <div style={{ color: '#10B981', fontWeight: 700, marginBottom: '.5rem' }}>Your ProLnk Match Opportunity</div>
              <div style={{ color: '#CBD5E1' }}>📍 Match Type: <strong style={{ color: '#fff' }}>{biz.matchType}</strong></div>
              <div style={{ color: '#CBD5E1', marginTop: '.25rem' }}>💵 Typical Rate: <strong style={{ color: '#F5E642' }}>{biz.rate}</strong></div>
              <div style={{ color: '#CBD5E1', marginTop: '.25rem' }}>📈 Demand Pattern: <strong style={{ color: '#fff' }}>{biz.demand}</strong></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>DFW Seasonal Demand Calendar</div>
          {SEASONAL.map(s => (
            <div key={s.month} style={{ background: '#0A1628', borderRadius: 8, padding: '.85rem', marginBottom: '.6rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.35rem' }}>
                <span style={{ fontWeight: 700, color: '#fff' }}>{s.event}</span>
                <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '.85rem' }}>{s.surge}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: '.85rem' }}>{s.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>5 Income Streams for Plumbers</div>
          {STREAMS.map(s => (
            <div key={s.name} style={{ display: 'flex', gap: '1rem', marginBottom: '.85rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#fff' }}>{s.name}</div>
                <div style={{ color: '#94A3B8', fontSize: '.85rem' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
