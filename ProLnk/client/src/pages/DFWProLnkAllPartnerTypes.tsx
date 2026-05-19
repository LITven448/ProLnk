import { useState } from 'react';

const trades = [
  { icon: '❄️', name: 'HVAC', market: '$1.8B/yr', avgJob: '$3,200', matchVol: '50–100/mo', highlight: 'Emergency replacements, system tune-ups, new construction installs' },
  { icon: '🔩', name: 'Plumbing', market: '$920M/yr', avgJob: '$1,800', matchVol: '40–90/mo', highlight: 'Water heater replacements, leak detection, remodel rough-ins' },
  { icon: '⚡', name: 'Electrical', market: '$480M/yr', avgJob: '$2,400', matchVol: '40–80/mo', highlight: 'Panel upgrades, EV chargers, safety-driven rewires' },
  { icon: '🏠', name: 'Roofing', market: '$2.1B/yr', avgJob: '$14,000', matchVol: '20–50/mo', highlight: 'Storm damage replacements, insurance-backed repairs, new construction' },
  { icon: '🏚️', name: 'Foundation', market: '$680M/yr', avgJob: '$9,500', matchVol: '15–35/mo', highlight: 'Pier & beam leveling, slab repair, drainage correction' },
  { icon: '🦟', name: 'Pest Control', market: '$890M/yr', avgJob: '$1,400/yr', matchVol: '30–70/mo', highlight: 'Quarterly contracts, termite treatments, mosquito programs' },
  { icon: '🌿', name: 'Landscape', market: '$1.1B/yr', avgJob: '$2,800', matchVol: '40–100/mo', highlight: 'Drought-tolerant conversions, irrigation, seasonal cleanups' },
  { icon: '🔧', name: 'Handyman', market: '$620M/yr', avgJob: '$550', matchVol: '25–60/mo', highlight: 'Small repairs, move-in punch lists, rental turnover work' },
];

const incomeStreams = [
  { stream: '1', label: 'Direct Match Commission', desc: '12–70% of match value based on your tier' },
  { stream: '2', label: 'Network Override', desc: '1–4% of earnings from pros you recruit (4 levels deep)' },
  { stream: '3', label: 'Subscription Override', desc: '10% recurring on pros you refer to ProLnk' },
  { stream: '4', label: 'Homeowner Override', desc: '$25–$100 per qualified homeowner you source' },
  { stream: '5', label: 'Origination Rights', desc: 'Permanent share of platform fees on homes you originate' },
];

export default function DFWProLnkAllPartnerTypes() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#F4F6FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '40px 24px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🤝</span>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', background: '#F5E642', padding: '4px 10px', borderRadius: 4 }}>ProLnk Partner Guide</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>All 8 Trade Types on ProLnk</h1>
        <p style={{ color: '#4A5E78', fontSize: 16, marginBottom: 36, maxWidth: 640 }}>
          ProLnk matches DFW homeowners to vetted pros across every major trade. Click any trade to see your opportunity, match volume, and how the platform works for your business type.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 40 }}>
          {trades.map((t, i) => (
            <div key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#0A1628′ : '#fff', color: selected === i ? '#F5E642' : '#0A1628', border: `2px solid ${selected === i ? '#F5E642' : '#D1DCF0'}`, borderRadius: 12, padding: '18px 16px', cursor: ’pointer', transition: 'all 0.2s', textAlign: 'center' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: selected === i ? '#A8BADA' : '#7A8FA8', marginTop: 4 }}>{t.market}</div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0A1628', color: '#E8EDF5', borderRadius: 14, padding: '28px 32px', marginBottom: 36, border: '2px solid #F5E642′ }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{trades[selected].icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 22 }}>{trades[selected].name} on ProLnk</div>
                <div style={{ color: '#8A9BB5', fontSize: 14 }}>{trades[selected].highlight}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>DFW MARKET SIZE</div><div style={{ fontWeight: 700, fontSize: 18 }}>{trades[selected].market}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>AVG JOB VALUE</div><div style={{ fontWeight: 700, fontSize: 18 }}>{trades[selected].avgJob}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>MONTHLY MATCH VOLUME</div><div style={{ fontWeight: 700, fontSize: 18 }}>{trades[selected].matchVol}</div></div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#0A1628′ }}>5 Income Streams — All Partner Types</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {incomeStreams.map((s, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #D1DCF0', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.stream}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{s.label}</div>
                <div style={{ color: '#4A5E78', fontSize: 14, marginTop: 4 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Join ProLnk — All Trades Welcome</div>
          <div style={{ color: '#8A9BB5', fontSize: 15 }}>Charter membership: $149/mo locked for life. Only 500 spots across all DFW trades. Waitlist closes at capacity.</div>
        </div>
      </div>
    </div>
  );
}
