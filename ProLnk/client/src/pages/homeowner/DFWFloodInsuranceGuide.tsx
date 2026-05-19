import { useState } from 'react';

export default function DFWFloodInsuranceGuide() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    {
      id: 'AE',
      name: 'Zone AE — Special Flood Hazard',
      risk: 'High',
      color: '#EF4444',
      description: 'Federally-backed mortgage holders are required to carry flood insurance. 1% annual chance of flooding (100-year floodplain). Base Flood Elevation determined by FEMA engineering studies.',
      action: 'Flood insurance mandatory if federally-backed mortgage. Budget $900–$1,800/yr through NFIP or private market.',
    },
    {
      id: 'X',
      name: 'Zone X — Minimal Risk',
      risk: 'Low',
      color: '#22C55E',
      description: 'Outside the 500-year floodplain. Lowest risk designation. No federal requirement for flood insurance.',
      action: 'Insurance not required but strongly recommended — DFW flash floods ignore zone boundaries. Budget $500–$900/yr.',
    },
    {
      id: 'AH',
      name: 'Zone AH/AO — Shallow Flooding',
      risk: 'Moderate',
      color: '#F59E0B',
      description: 'Shallow ponding (AH) or sheet flow flooding (AO) typical. Common in older Dallas suburbs built before modern drainage codes.',
      action: 'Insurance strongly recommended. Private market often cheaper than NFIP for shallow-flood zones. Budget $600–$1,200/yr.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          DFW Homeowner Guide
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.1 }}>
          DFW Flood Insurance Guide
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginBottom: 48, lineHeight: 1.6 }}>
          FEMA Zones and What You Need to Know
        </p>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🌊</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 12 }}>DFW Has a Serious Flood Problem</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            Dallas-Fort Worth contains more than <strong style={{ color: '#E2E8F0′ }}>700 miles of creek and river corridors</strong>. Flash flooding kills more people in Texas than any other weather event — more than tornadoes, more than hurricanes.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            The 2015 Memorial Day floods and 2019 spring flooding events together caused over <strong style={{ color: '#F59E0B' }}>$2 billion in property damage</strong> across DFW. Tropical systems from the Gulf occasionally penetrate this far inland, dumping catastrophic rainfall on already-saturated ground.
          </p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>FEMA Flood Zones — Tap to Explore</h2>
        <p style={{ color: '#64748B', marginBottom: 24, fontSize: 14 }}>Select a zone to learn what it means for your home and wallet</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 48 }}>
          {zones.map(zone => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
              style={{
                background: activeZone === zone.id ? '#1E3A5F' : '#0F2033',
                border: `2px solid ${activeZone === zone.id ? zone.color : '#1E3A5F'}`,
                borderRadius: 12,
                padding: 20,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ background: zone.color, borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                  Zone {zone.id}
                </span>
                <span style={{ color: zone.color, fontSize: 13, fontWeight: 600 }}>{zone.risk} Risk</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#F8FAFC' }}>{zone.name}</div>
            </button>
          ))}
        </div>

        {activeZone && (() => {
          const zone = zones.find(z => z.id === activeZone);
          if (!zone) return null;
          return (
            <div style={{ background: '#132038', border: `1px solid ${zone.color}40`, borderRadius: 12, padding: 28, marginBottom: 48 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: zone.color, marginBottom: 12 }}>{zone.name}</h3>
              <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 16 }}>{zone.description}</p>
              <div style={{ background: '#0F2033', borderRadius: 8, padding: 16, borderLeft: `4px solid ${zone.color}` }}>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>What to do</div>
                <div style={{ color: '#E2E8F0', lineHeight: 1.6 }}>{zone.action}</div>
              </div>
            </div>
          );
        })()}

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 24 }}>📋 Flood Insurance Cost Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'NFIP (Federal)', range: '$500 – $1,800/yr', note: 'Government program, standardized coverage, max $250K structure + $100K contents', icon: '🏛️' },
            { label: 'Private Market', range: '$400 – $1,400/yr', note: 'Sometimes cheaper, more coverage options, faster claims — worth comparing', icon: '🏢' },
            { label: 'High-Risk Zone AE', range: '$1,200 – $2,400/yr', note: 'Properties in verified floodplain with claims history can cost significantly more', icon: '⚠️' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0F2033', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#3B82F6', marginBottom: 10 }}>{item.range}</div>
              <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', marginBottom: 16 }}>🗺️ How to Check Your Flood Zone</h3>
          <ol style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Visit <strong style={{ color: '#3B82F6′ }}>msc.fema.gov</strong> — FEMA Flood Map Service Center</li>
            <li>Enter your property address</li>
            <li>View your FIRM (Flood Insurance Rate Map) panel</li>
            <li>Identify your zone designation (AE, X, AH, AO, etc.)</li>
            <li>Check effective date — maps are updated periodically</li>
          </ol>
          <div style={{ marginTop: 16, padding: 14, background: '#0F2033', borderRadius: 8, fontSize: 14, color: '#F59E0B' }}>
            💡 Tip: If your property was recently remapped into a higher-risk zone, you may qualify for a grandfathered rate. Contact your insurance agent before accepting a premium increase.
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #132038 100%)', border: '1px solid #3B82F6', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>Get a Flood Risk Assessment</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            TrustyPro connects you with licensed inspectors who can assess your property's flood vulnerability, drainage issues, and recommend mitigation strategies.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#3B82F6', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}
          >
            Request a Flood Risk Assessment
          </a>
        </div>

      </div>
    </div>
  );
}
