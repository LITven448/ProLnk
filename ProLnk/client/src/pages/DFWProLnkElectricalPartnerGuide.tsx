import { useState } from 'react';

const businessTypes = [
  { type: 'Residential Service', opportunity: 'Panel upgrades, EV chargers, outlet installs', marketSize: '$480M/yr DFW', matches: '40–80/mo' },
  { type: 'Commercial Electrical', opportunity: 'EV fleet charging stations, lighting retrofits', marketSize: '$720M/yr DFW', matches: '15–30/mo' },
  { type: 'New Construction', opportunity: 'Coordination with GCs, rough-in + finish work', marketSize: '$310M/yr DFW', matches: '20–45/mo' },
  { type: 'Low Voltage / Smart Home', opportunity: 'EV charger integration, whole-home automation', marketSize: '$190M/yr DFW', matches: '25–50/mo' },
];

const stats = [
  { icon: '⚡', label: 'EV Charger Permits Filed in DFW (2025)', value: '62,400+' },
  { icon: '🏠', label: 'Homes 30+ Years Old in DFW', value: '1.2M+' },
  { icon: '🔌', label: 'Avg Panel Upgrade Job Value', value: '$4,200′ },
  { icon: '📈', label: 'Annual Electrical Permit Growth DFW', value: '+18%' },
];

export default function DFWProLnkElectricalPartnerGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5', padding: '40px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Partner Guide</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Electricians on ProLnk</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 36, maxWidth: 600 }}>
          The DFW electrical market is surging — EV chargers, aging panels, pool additions. ProLnk connects licensed electricians to pre-qualified homeowners ready to book.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#8A9BB5', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Select Your Business Type</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {businessTypes.map((b, i) => (
            <div key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1A3A5C' : '#112240', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: selected === i ? 12 : 0 }}>{b.type}</div>
              {selected === i && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 8 }}>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>OPPORTUNITY</div><div style={{ fontSize: 14 }}>{b.opportunity}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>DFW MARKET SIZE</div><div style={{ fontSize: 14 }}>{b.marketSize}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>EST. MONTHLY MATCHES</div><div style={{ fontSize: 14 }}>{b.matches}</div></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Join the ProLnk Electrical Network</div>
          <div style={{ color: '#1A3050', fontSize: 14 }}>Charter tier open — $149/mo, locked for life. Only 500 spots available DFW-wide.</div>
        </div>
      </div>
    </div>
  );
}
