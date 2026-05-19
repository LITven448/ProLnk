import { useState } from 'react';

const SERVICES: Record<string, { label: string; lowSm: number; highSm: number; lowLg: number; highLg: number; permitRequired: boolean; permitCost: string; emergency: number; description: string }> = {
  outlet: { label: 'Outlet Replacement', lowSm: 75, highSm: 150, lowLg: 75, highLg: 150, permitRequired: false, permitCost: 'N/A', emergency: 1.6, description: 'Single outlet or GFCI replacement — quick job, rarely needs permit' },
  circuit: { label: 'New Circuit / Dedicated Line', lowSm: 200, highSm: 500, lowLg: 350, highLg: 700, permitRequired: true, permitCost: '$75–$150', emergency: 1.4, description: 'Required for EV chargers, hot tubs, large appliances' },
  panel_upgrade: { label: 'Panel Upgrade (100A → 200A)', lowSm: 1500, highSm: 2500, lowLg: 2000, highLg: 3500, permitRequired: true, permitCost: '$150–$350', emergency: 1.3, description: 'Most DFW homes built before 1990 need this upgrade for modern loads' },
  rewire: { label: 'Whole-Home Rewire', lowSm: 8000, highSm: 12000, lowLg: 14000, highLg: 20000, permitRequired: true, permitCost: '$300–$600', emergency: 1.0, description: 'Aluminum wiring (common in 1965–1973 DFW homes) poses fire risk — rewire is required' },
  ev_charger: { label: 'EV Charger Installation (Level 2)', lowSm: 400, highSm: 800, lowLg: 600, highLg: 1200, permitRequired: true, permitCost: '$75–$175', emergency: 1.2, description: 'Includes dedicated 240V circuit; price varies by panel distance' },
  ceiling_fan: { label: 'Ceiling Fan / Light Fixture', lowSm: 100, highSm: 200, lowLg: 100, highLg: 250, permitRequired: false, permitCost: 'N/A', emergency: 1.5, description: 'Standard replacement; more if box needs upgrade for fan weight' },
  smoke: { label: 'Smoke / CO Detector Wiring', lowSm: 150, highSm: 400, lowLg: 200, highLg: 500, permitRequired: false, permitCost: 'N/A', emergency: 1.4, description: 'Hardwired interconnected detectors required in all DFW new builds since 2015′ },
};

const DFW_CITIES: Record<string, string> = {
  dallas: 'Dallas: permits pull online, inspections 2–3 business days',
  fort_worth: 'Fort Worth: residential electrical permits $75–$200, same-week inspections',
  plano: 'Plano: strict inspection process, 5–7 business days typical',
  frisco: 'Frisco: online portal, fast turnaround, $100–$175 range',
  arlington: 'Arlington: $85–$200, inspection within 3 days',
  mckinney: 'McKinney: $75–$150, efficient portal system',
};

export default function DFWElectricalRepairCostGuide() {
  const [serviceType, setServiceType] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [city, setCity] = useState('');
  const [isEmergency, setIsEmergency] = useState('no');
  const [result, setResult] = useState<null | { low: number; high: number; service: typeof SERVICES.outlet }>(null);

  function estimate() {
    if (!serviceType || !homeSize) return;
    const s = SERVICES[serviceType];
    const isLarge = homeSize === 'large';
    const mult = isEmergency === 'yes' ? s.emergency : 1;
    setResult({ low: Math.round((isLarge ? s.lowLg : s.lowSm) * mult), high: Math.round((isLarge ? s.highLg : s.highSm) * mult), service: s });
  }

  const pill = (label: string, val: string, current: string, set: (v: string) => void) => (
    <button key={val} onClick={() => set(val)} style={{
      padding: '8px 16px', borderRadius: 20, border: '2px solid',
      borderColor: current === val ? '#F5E642′ : '#2A3A5C',
      background: current === val ? '#F5E642′ : ’transparent',
      color: current === val ? '#0A1628′ : '#CBD5E1',
      cursor: 'pointer', fontWeight: 600, fontSize: 13, margin: '4px 6px 4px 0'
    }}>{label}</button>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#CBD5E1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>DFW Electrical Repair Cost Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.7 }}>
          From outlet swaps to full panel upgrades, electrical costs in DFW depend on your home size, city permit fees, and whether it's an emergency. <strong style={{ color: '#F5E642' }}>Never skip the permit</strong> — unpermitted electrical work can void homeowner’s insurance.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>Service Type</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(SERVICES).map(([key, s]) => (
                <button key={key} onClick={() => setServiceType(key)} style={{
                  padding: '12px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: serviceType === key ? '#F5E642′ : '#2A3A5C',
                  background: serviceType === key ? '#1a1500′ : '#0A1628',
                  color: serviceType === key ? '#F5E642′ : '#CBD5E1',
                  cursor: 'pointer', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontWeight: serviceType === key ? 700 : 400 }}>{s.label}</span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>Permit: {s.permitRequired ? s.permitCost : 'No'}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Home Size</label>
            <div>{[['Under 2,000 sq ft', 'small'], ['2,000+ sq ft', 'large']].map(([l, v]) => pill(l, v, homeSize, setHomeSize))}</div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Your DFW City (for permit info)</label>
            <div>{Object.entries(DFW_CITIES).map(([k]) => pill(k.charAt(0).toUpperCase() + k.slice(1).replace('_', ' '), k, city, setCity))}</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Emergency / After-Hours?</label>
            <div>{[['Standard Hours', 'no'], ['Emergency / After-Hours', 'yes']].map(([l, v]) => pill(l, v, isEmergency, setIsEmergency))}</div>
          </div>
          <button onClick={estimate} style={{ width: '100%', padding: '14px', borderRadius: 8, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            Get DFW Cost Estimate →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F1F3D', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F1F5F9', marginBottom: 8 }}>⚡ {result.service.label}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</div>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>{result.service.description}</p>
            {result.service.permitRequired && (
              <div style={{ background: '#1a1500', borderRadius: 8, padding: 14, border: '1px solid #F5E642', marginBottom: 16 }}>
                <strong style={{ color: '#F5E642′ }}>📋 Permit Required:</strong>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}> {result.service.permitCost} in most DFW cities. Ensure your electrician pulls the permit — not you — so they're liable for passing inspection.</span>
              </div>
            )}
            {city && (
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <strong style={{ color: '#94A3B8', fontSize: 13 }}>📍 {city.charAt(0).toUpperCase() + city.slice(1).replace('_', ' ')}:</strong>
                <span style={{ color: '#CBD5E1', fontSize: 13 }}> {DFW_CITIES[city]}</span>
              </div>
            )}
          </div>
        )}

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>🚨 DFW Electrical Red Flags in Quotes</h3>
          {[
            ['No Permit Mentioned', 'Any electrician skipping permits on panel upgrades, rewires, or new circuits is cutting corners that could cost you far more later.'],
            ['Aluminum Wiring Ignored', 'DFW homes built 1965–1973 often have aluminum branch wiring. Quotes that don\’t address this are incomplete.'],
            ['No Written Scope', 'Electrical quotes should specify exactly which circuits, panels, or devices are included. Vague scope enables scope creep.'],
            ['Unlicensed Contractor', 'Texas requires licensed electricians for most work. Verify with TDLR (Texas Dept of Licensing and Regulation) before hiring.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ padding: '12px 0', borderBottom: '1px solid #2A3A5C' }}>
              <div style={{ fontWeight: 700, color: '#F97316', marginBottom: 4 }}>⚠️ {title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Get 3 Free Electrical Quotes in DFW</div>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Compare TDLR-licensed electricians — permit handling included.</p>
          <button style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>
            Compare Electrical Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
