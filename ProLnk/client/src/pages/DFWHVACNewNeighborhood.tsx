import { useState } from 'react';

const neighborhoods = [
  {
    id: 'frisco',
    label: 'Frisco / Prosper',
    emoji: '🏘️',
    mudInfo: 'Multiple active MUDs — check your tax certificate',
    permitBody: 'City of Frisco or Prosper Building Dept (fast, usually 5–10 days)',
    contractorAvailability: 'High — major growth corridor with many HVAC companies',
    notes: [
      'MUD districts add $800–1,500/yr to property taxes but fund infrastructure',
      'New construction HVAC (2018+) likely has 10-yr manufacturer warranty still active',
      'Verify warranty is registered — many builders forget to register',
      'Frisco building inspections are thorough; choose licensed contractor',
    ],
    newBuildWarning: true,
  },
  {
    id: 'lakewood',
    label: 'Lakewood / East Dallas',
    emoji: '🌳',
    mudInfo: 'City of Dallas utilities — no MUD districts',
    permitBody: 'City of Dallas Development Services (can take 2–4 weeks)',
    contractorAvailability: 'Medium — many established companies, but area is dense',
    notes: [
      'Older homes (1940s–1970s) may have undersized ductwork for modern high-efficiency units',
      'R-22 systems still common in older rentals — phase-out means refrigerant cost spikes',
      'City of Dallas permit process slower than suburbs — plan ahead',
      'Historic overlay areas may restrict exterior condenser placement',
    ],
    newBuildWarning: false,
  },
  {
    id: 'mckinney',
    label: 'McKinney / Allen',
    emoji: '🏡',
    mudInfo: 'Mix of city utilities and MUD districts in newer sections',
    permitBody: 'City of McKinney or Allen (efficient, 5–7 days typical)',
    contractorAvailability: 'High — booming area with competitive market',
    notes: [
      'Check if your section is city or MUD before closing',
      'McKinney has aggressive energy efficiency rebate program through Oncor',
      'Allen requires load calculation (Manual J) for all new installs',
      'Strong contractor competition = better pricing than inner city',
    ],
    newBuildWarning: false,
  },
  {
    id: 'arlington',
    label: 'Arlington / Mansfield',
    emoji: '⚽',
    mudInfo: 'City of Arlington utilities — no MUDs in most of city',
    permitBody: 'City of Arlington Development Services (10–14 days typical)',
    contractorAvailability: 'High — large area with many contractors',
    notes: [
      'Older west Arlington homes may have gas line issues affecting heat pump upgrades',
      'AT&T Stadium area has extreme heat island effect — size up equipment',
      'Mansfield has stricter duct testing requirements on new installs',
      'Many contractors familiar with large commercial properties — residential focus matters',
    ],
    newBuildWarning: false,
  },
  {
    id: 'plano',
    label: 'Plano / Richardson',
    emoji: '🏢',
    mudInfo: 'City utilities — established infrastructure, no MUDs',
    permitBody: 'City of Plano Building Inspections (5–7 days, streamlined)',
    contractorAvailability: 'Very High — mature market, very competitive',
    notes: [
      'Plano has one of the most competitive HVAC markets in DFW — get 3 quotes',
      'Many homes built 1980–2000 are hitting replacement window simultaneously',
      'Plano Oncor territory: up to $1,800 rebate on qualifying heat pump installs',
      'Richardson near UT Dallas: high contractor quality due to university relationships',
    ],
    newBuildWarning: false,
  },
];

export default function DFWHVACNewNeighborhood() {
  const [selected, setSelected] = useState<string | null>(null);

  const area = neighborhoods.find((n) => n.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>New to a DFW Neighborhood?</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          HVAC considerations vary significantly across DFW. Select your area for what you need to know.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {neighborhoods.map((n) => (
            <button
              key={n.id}
              onClick={() => setSelected(n.id)}
              style={{
                background: '#0f2040',
                border: '2px solid',
                borderColor: selected === n.id ? '#F5E642′ : '#1e3a5f',
                borderRadius: 12,
                padding: '14px 18px',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{n.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{n.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{n.permitBody}</div>
              </div>
            </button>
          ))}
        </div>
        {area && (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>{area.emoji} {area.label}</div>
            {area.newBuildWarning && (
              <div style={{ background: '#7c2d12', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>
                ⚠️ New construction area — warranty verification is critical here.
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {[
                { icon: '🏦', label: 'MUD Districts', value: area.mudInfo },
                { icon: '📋', label: 'Permits', value: area.permitBody },
                { icon: '🔧', label: 'Contractors', value: area.contractorAvailability },
              ].map((item) => (
                <div key={item.label} style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}>
                  <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{item.icon} {item.label}</div>
                  <div style={{ fontSize: 14 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>AREA-SPECIFIC NOTES</div>
            {area.notes.map((note, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>•</span>
                <span>{note}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Find vetted HVAC pros in your neighborhood.</div>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Find Pros in My Area
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
