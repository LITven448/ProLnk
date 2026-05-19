import { useState } from 'react';

type FloodZone = 'AE' | 'AO' | 'X500' | 'X' | 'VE';

const floodZoneData: Record<FloodZone, {
  label: string;
  riskLevel: string;
  riskColor: string;
  insuranceRequired: boolean;
  insuranceNote: string;
  annualChance: string;
  description: string;
  avgAnnualLoss: string;
  challengePossible: boolean;
  challengePath: string;
}> = {
  AE: {
    label: 'Zone AE — High Risk (100-Year Floodplain)',
    riskLevel: 'HIGH',
    riskColor: '#ef4444',
    insuranceRequired: true,
    insuranceNote: 'Flood insurance REQUIRED if you have a federally backed mortgage. NFIP or private. Avg DFW cost: $800–$2,400/yr.',
    annualChance: '1% annual chance of flooding',
    description: 'You are in the 100-year floodplain. FEMA considers this high-risk. Base Flood Elevation (BFE) shown on map — your lowest floor should be above this.',
    avgAnnualLoss: 'High — average flood claim in AE zone: $30,000+',
    challengePossible: true,
    challengePath: 'Apply for LOMA (Letter of Map Amendment) if your land is naturally above BFE. Survey required. FEMA review takes 60–90 days. If approved, removes flood insurance mandate.',
  },
  AO: {
    label: 'Zone AO — Shallow Flooding (Sheet Flow)',
    riskLevel: 'HIGH',
    riskColor: '#f97316',
    insuranceRequired: true,
    insuranceNote: 'Flood insurance required with federal mortgage. AO zones have depth designations (e.g., 1 ft, 2 ft) rather than elevation.',
    annualChance: '1% annual chance of flooding',
    description: 'Shallow flooding from sheet flow, often in areas near drainage paths or undeveloped land. Common in DFW where development changed natural drainage.',
    avgAnnualLoss: 'Moderate to High — sheet flooding moves fast and is unpredictable.',
    challengePossible: true,
    challengePath: 'LOMA or LOMR-F possible if fill was placed to raise your structure. Elevation certificate required. Engineer sign-off recommended.',
  },
  X500: {
    label: 'Zone X (Shaded) — Moderate Risk (500-Year Floodplain)',
    riskLevel: 'MODERATE',
    riskColor: '#eab308',
    insuranceRequired: false,
    insuranceNote: 'Flood insurance not required but strongly recommended. DFW has seen 500-year events multiple times in the last decade — the name is misleading.',
    annualChance: '0.2% annual chance per year',
    description: 'Between the 100-year and 500-year floodplain. Not required to insure but statistically still meaningful risk. DFW development has dramatically shifted drainage patterns.',
    avgAnnualLoss: 'Low to Moderate — but major storms in DFW regularly exceed 500-year predictions.',
    challengePossible: false,
    challengePath: 'No LOMA challenge available for Zone X (Shaded). Flood insurance is optional. Consider elevation certificate to assess actual risk.',
  },
  X: {
    label: 'Zone X (Unshaded) — Minimal Risk',
    riskLevel: 'LOW',
    riskColor: '#22c55e',
    insuranceRequired: false,
    insuranceNote: 'No requirement. However, 25% of flood claims come from low-risk zones. Consider optional preferred risk policy (~$400–700/yr).',
    annualChance: 'Less than 0.2% annual chance',
    description: 'Lowest FEMA flood risk category. Typically elevated ground well above floodplain. Still vulnerable to localized drainage issues from rapid DFW development.',
    avgAnnualLoss: 'Low — but not zero. Flash flooding from blocked drains can affect any zone.',
    challengePossible: false,
    challengePath: 'No challenge needed — already in lowest risk category.',
  },
  VE: {
    label: 'Zone VE — Coastal High Hazard',
    riskLevel: 'VERY HIGH',
    riskColor: '#7c3aed',
    insuranceRequired: true,
    insuranceNote: 'Required with federal mortgage. Highest insurance rates of any zone — often $3,000–$8,000+/yr. Not common in DFW but exists near Lake Lewisville and Eagle Mountain.',
    annualChance: '1%+ annual chance with wave action',
    description: 'Coastal or lakeside zone with wave hazard. Rare in DFW but exists near large reservoirs. Strictest building codes — structures must be elevated on pilings.',
    avgAnnualLoss: 'Very High — wave damage in addition to water depth.',
    challengePossible: false,
    challengePath: 'VE zones cannot typically be challenged via LOMA unless survey proves significant error in FEMA mapping.',
  },
};

const dfwFloodContext = [
  { icon: '🌧️', title: 'DFW Development Effect', desc: 'Massive impervious surface growth (rooftops, parking, roads) means water that once soaked in now runs off instantly. Neighborhoods that never flooded in 1990 now flood regularly.' },
  { icon: '🗺️', title: 'FEMA Maps Are Often Outdated', desc: 'Many DFW flood maps haven\’t been updated in 5–15 years. Upstream development that increased runoff isn\’t reflected. Your actual risk may be higher than your zone suggests.' },
  { icon: '📐', title: 'How to Look Up Your Zone', desc: 'Go to FEMA Flood Map Service Center (msc.fema.gov). Enter your address. Look for your FIRM panel number and zone designation.' },
  { icon: '📋', title: 'Elevation Certificate', desc: 'A licensed surveyor measures your lowest floor elevation relative to BFE. Costs $300–$700 but can dramatically reduce your insurance premium or support a LOMA application.' },
  { icon: '⚠️', title: 'LOMA Application Process', desc: 'Letter of Map Amendment removes you from the floodplain. Requires elevation certificate showing you are above BFE. FEMA review takes 60–90 days. Success rate high when documentation is solid.' },
];

const lomaSteps = [
  '1. Order elevation certificate from licensed land surveyor ($300–$700)',
  '2. Confirm your lowest adjacent grade (LAG) is above the Base Flood Elevation (BFE)',
  '3. Submit LOMA application to FEMA via their online portal (free to apply)',
  '4. FEMA reviews — 60 to 90 days typical in DFW',
  '5. If approved: get letter, send to your mortgage servicer, cancel flood insurance requirement',
  '6. Keep the LOMA permanently — attach to your deed file',
];

export default function DFWFloodZoneMapGuide() {
  const [selectedZone, setSelectedZone] = useState<FloodZone>('AE');
  const [showLoma, setShowLoma] = useState(false);

  const zone = floodZoneData[selectedZone];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>🌊 DFW Flood Zone Map Guide</h1>
          <p style={{ color: '#8A9BB5', marginTop: 10 }}>Understand your FEMA flood zone, insurance requirements, and how to challenge your designation.</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 10, fontWeight: 600 }}>SELECT YOUR FLOOD ZONE DESIGNATION</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(Object.keys(floodZoneData) as FloodZone[]).map(zone => (
              <button key={zone} onClick={() => setSelectedZone(zone)}
                style={{ padding: '10px 20px', borderRadius: 10, border: `2px solid ${selectedZone === zone ? floodZoneData[zone].riskColor : '#2A3F5F'}`,
                  background: selectedZone === zone ? `${floodZoneData[zone].riskColor}20` : '#111F35',
                  color: selectedZone === zone ? floodZoneData[zone].riskColor : '#8A9BB5',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                {zone}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: `${zone.riskColor}15`, border: `1px solid ${zone.riskColor}40`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: zone.riskColor, fontWeight: 800, marginBottom: 6 }}>RISK LEVEL: {zone.riskLevel}</div>
              <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, margin: 0 }}>{zone.label}</h2>
            </div>
            <div style={{ background: zone.insuranceRequired ? '#3b0a0a' : '#052e16', borderRadius: 10, padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 4, fontWeight: 700 }}>INSURANCE REQUIRED</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: zone.insuranceRequired ? '#f87171' : '#4ade80' }}>
                {zone.insuranceRequired ? 'YES' : 'NO'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          {[
            { label: '📊 ANNUAL FLOOD CHANCE', value: zone.annualChance },
            { label: '📋 ZONE DESCRIPTION', value: zone.description },
            { label: '💵 INSURANCE', value: zone.insuranceNote },
            { label: '💸 AVERAGE ANNUAL LOSS', value: zone.avgAnnualLoss },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{row.label}</div>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{row.value}</p>
            </div>
          ))}
          {zone.challengePossible && (
            <div>
              <button onClick={() => setShowLoma(!showLoma)}
                style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                {showLoma ? '▲ Hide LOMA Challenge Steps' : '▼ How to Challenge Your Flood Zone (LOMA)'}
              </button>
              {showLoma && (
                <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginTop: 16 }}>
                  <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>🗺️ LOMA PROCESS FOR {selectedZone} ZONES</div>
                  {lomaSteps.map(step => (
                    <div key={step} style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8, marginBottom: 6 }}>{step}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>🌧️ DFW Flood Context You Need to Know</h3>
          {dfwFloodContext.map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, minWidth: 36 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
