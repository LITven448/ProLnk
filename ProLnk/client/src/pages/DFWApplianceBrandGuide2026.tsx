import { useState } from 'react';

type ApplianceType = 'refrigerator' | 'dishwasher' | 'washer' | 'range';
type Budget = 'value' | 'mid' | 'premium';
type ServicePriority = 'parts' | 'reliability' | 'local';

const recommendations: Record<ApplianceType, Record<Budget, { brand: string; why: string; dfwNote: string; repairNote: string }>> = {
  refrigerator: {
    value: { brand: 'Whirlpool', why: 'Most repaired brand in DFW — technicians know it cold, parts next-day.', dfwNote: 'Handles DFW heat well; avoid bottom-freezer in garages above 110°F.', repairNote: 'Every Sears/A&E tech in DFW certified on Whirlpool.' },
    mid: { brand: 'LG (French Door)', why: 'Strong in DFW market; LG service center in Carrollton + Irving.', dfwNote: 'Linear compressor handles DFW humidity well; register warranty immediately.', repairNote: 'LG authorized service 2–3 day response in DFW metro.' },
    premium: { brand: 'Sub-Zero', why: 'Only brand with dedicated DFW showroom + factory-trained techs.', dfwNote: 'Built for extreme temp swings; ideal for DFW summer kitchens.', repairNote: 'Sub-Zero DFW service center in Dallas; 1-yr labor included.' },
  },
  dishwasher: {
    value: { brand: 'Bosch 300 Series', why: 'Best value dishwasher for DFW hard water — Bosch filters outperform in high-mineral areas.', dfwNote: 'DFW water hardness 200–400 ppm; Bosch filter extends tub life significantly.', repairNote: 'AJ Madison-certified techs throughout DFW.' },
    mid: { brand: 'Miele G5000', why: 'Handles DFW limestone deposits better than any brand tested.', dfwNote: 'Built-in water softener loop compatible — critical for DFW hard water.', repairNote: 'Miele DFW service in Plano; 2-yr full warranty.' },
    premium: { brand: 'Miele G7000', why: 'AutoDos + AutoOpen dry — zero intervention needed in DFW hard water.', dfwNote: 'Self-dosing detergent compensates automatically for DFW mineral load.', repairNote: 'Miele priority service, 48-hr response DFW.' },
  },
  washer: {
    value: { brand: 'Speed Queen TC5', why: 'Commercial-grade. DFW repair techs say it outlasts 3 consumer machines.', dfwNote: 'No circuit boards to fail in DFW power surge season (April–June).', repairNote: 'Speed Queen authorized in Garland, Arlington, and Fort Worth.' },
    mid: { brand: 'LG WM4000H', why: 'TurboWash 360 handles DFW caliche-coated work clothes efficiently.', dfwNote: 'AI sensing adjusts for DFW clay/caliche soil loads automatically.', repairNote: 'LG service center, 3-day DFW response.' },
    premium: { brand: 'Electrolux ELFW7637A', why: 'Largest capacity front-loader available in DFW; handles oversized ranch loads.', dfwNote: 'Perfect wash in DFW hard water with SmartBoost pre-mix technology.', repairNote: 'Electrolux-certified techs in Southlake, Frisco, and McKinney.' },
  },
  range: {
    value: { brand: 'GE 30" Freestanding', why: 'Most in-stock range at DFW supply houses; fastest service turnaround.', dfwNote: 'DFW builders default to GE — largest installed base = most parts available.', repairNote: 'GE authorized in every DFW suburb; parts same-day at Encompass.' },
    mid: { brand: 'Samsung NX60 Flex Duo', why: 'Dual-oven ideal for DFW holiday cooking; FlexCook zone for Texas brisket pans.', dfwNote: 'Strong in DFW market; Samsung Experience Store in Galleria for demos.', repairNote: 'Samsung service, 2–4 day DFW response.' },
    premium: { brand: 'Wolf 30" Dual Fuel', why: 'Standard in DFW luxury builds; all DFW Wolf dealers offer showroom demonstrations.', dfwNote: 'Natural gas burners designed for Texas gas pressure ranges.', repairNote: 'Wolf sub-zero service covers all DFW; 2-yr full warranty.' },
  },
};

export default function DFWApplianceBrandGuide2026() {
  const [appliance, setAppliance] = useState<ApplianceType | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const result = appliance && budget ? recommendations[appliance][budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW APPLIANCE GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Appliance Brands That Hold Up in DFW</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW hard water (200–400 ppm) and extreme summer heat cause more appliance repairs than nearly any US metro. Brand choice and local service availability matter here more than anywhere.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⚠️ DFW-SPECIFIC FACTORS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['💧 Hard water destroys dishwashers fast', '🌡️ 110°F garage temps damage plastic parts', '⚡ Spring storms = surge damage', '🏗️ Caliche soil in laundry loads'].map(f => (
              <div key={f} style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, color: '#C8D0E0' }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>1️⃣ SELECT APPLIANCE TYPE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {(['refrigerator', 'dishwasher', 'washer', 'range'] as ApplianceType[]).map(a => (
              <button key={a} onClick={() => setAppliance(a)} style={{ background: appliance === a ? '#F5E642' : '#111E35', color: appliance === a ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (appliance === a ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13, textTransform: 'capitalize' }}>{a === 'refrigerator' ? '🧊' : a === 'dishwasher' ? '🫧' : a === 'washer' ? '🌀' : '🔥'} {a}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>2️⃣ SELECT BUDGET</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[['value', '💰 Value', 'Under $1,200'], ['mid', '💎 Mid', '$1,200–$2,500'], ['premium', '👑 Premium', '$2,500+']] .map(([k, label, range]) => (
              <button key={k} onClick={() => setBudget(k as Budget)} style={{ background: budget === k ? '#F5E642' : '#111E35', color: budget === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (budget === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontWeight: 700, fontSize: 12, textAlign: 'center' }}>{label}<br /><span style={{ fontWeight: 400, fontSize: 11 }}>{range}</span></button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#111E35', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ RECOMMENDED FOR DFW</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{result.brand}</div>
            <div style={{ color: '#C8D0E0', marginBottom: 16, lineHeight: 1.6 }}>{result.why}</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>📍 <strong>DFW Conditions:</strong> {result.dfwNote}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>🔧 <strong>Repair Access:</strong> {result.repairNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
