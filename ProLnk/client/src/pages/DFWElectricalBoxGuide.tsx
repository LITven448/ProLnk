import { useState } from 'react';

const boxTypes = [
  { type: 'Single-Gang Switch Box', cubic: '18 cu in', wires: 'Up to 4 #14 wires or 3 #12', material: 'Plastic or metal', dfwNote: 'Most DFW switch locations — verify box is flush to drywall surface' },
  { type: 'Double-Gang Box', cubic: '34 cu in', wires: 'Up to 7 #14 or 6 #12', material: 'Plastic or metal', dfwNote: 'Used for dual outlets or switch/outlet combos in DFW kitchens' },
  { type: 'Octagon Junction Box', cubic: '21.5 cu in', wires: 'Up to 5 #14 or 4 #12', material: 'Metal preferred', dfwNote: 'DFW ceiling fans and light fixtures — metal box required for ceiling fans over 35 lbs' },
  { type: '4-Inch Square Box', cubic: '30 cu in', wires: 'Up to 6 #14 or 5 #12', material: 'Metal', dfwNote: 'Junction boxes in DFW attics, garages, and utility areas — must be accessible' },
  { type: 'Outdoor Weatherproof Box', cubic: '18–22 cu in', wires: '2–4 #12 THWN', material: 'Cast aluminum or PVC', dfwNote: 'DFW patios, driveways, pool areas — In-Use cover required, GFCI outlet mandatory' },
  { type: 'Ceiling Fan Brace Box', cubic: '21.5 cu in', wires: 'Up to 5 #14', material: 'Metal — fan-rated', dfwNote: 'Fan-rated required for any DFW ceiling fan — flat ceiling boxes will fail inspection' },
];

const appOptions = [
  { label: 'Interior light switch', location: 'interior wall', box: 'Single-gang plastic switch box', cover: 'Standard decorator plate', fill: 'Check: count each wire + switch + clamps vs. box cubic inches', outdoor: false },
  { label: 'Kitchen outlet (countertop)', location: 'interior wall', box: 'Single-gang 20A-rated box', cover: 'Standard duplex plate', fill: 'Use #12 wire — verify 18 cu in minimum for GFCI device', outdoor: false },
  { label: 'Outdoor patio outlet', location: 'exterior wall', box: 'Weatherproof cast box', cover: 'In-Use weatherproof cover (required in DFW)', fill: 'THWN in conduit or UF-B; GFCI outlet mandatory in DFW', outdoor: true },
  { label: 'Ceiling fan mount', location: 'ceiling', box: 'Fan-rated ceiling box (brace-mount if no joist)', cover: 'Fan canopy covers box', fill: 'Fan-rated boxes required — standard light boxes will crack under fan vibration', outdoor: false },
  { label: 'Attic junction splice', location: 'attic / unconditioned', box: '4-inch square metal box', cover: 'Blank cover plate — must be accessible', fill: 'No wire nuts exposed — all splices in accessible box per DFW code', outdoor: false },
  { label: 'Garage outlet (GFCI)', location: 'garage wall', box: 'Single-gang or double-gang plastic', cover: 'Standard plate', fill: 'GFCI required within 6ft of garage floor in DFW; 20A circuit', outdoor: false },
  { label: 'Pool / spa area outlet', location: 'outdoor / pool deck', box: 'Weatherproof cast aluminum', cover: 'In-Use cover, 20A rated', fill: 'GFCI within 6–20ft of pool; THWN in PVC conduit required', outdoor: true },
  { label: 'Panel knockout splice', location: 'inside panel enclosure', box: 'N/A — inside panel', cover: 'Panel cover', fill: 'Splices inside panel not permitted in DFW — use a separate junction box', outdoor: false },
];

export default function DFWElectricalBoxGuide() {
  const [selected, setSelected] = useState('');
  const result = appOptions.find(a => a.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642′ }}>📦 DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>Electrical Box Guide for DFW Homes</h1>
        <p style={{ color: '#9BA3B5', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6′ }}>
          The wrong electrical box causes failed inspections and fire hazards. DFW's weather demands outdoor-rated boxes on patios and pool areas. Fan-rated boxes are required for all ceiling fans.
        </p>

        <div style={{ marginBottom: '32px' }}>
          {boxTypes.map((b) => (
            <div key={b.type} style={{ background: '#111D33', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '15px' }}>{b.type}</span>
                <span style={{ background: '#1E2D47', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', color: '#F5E642′ }}>{b.cubic}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#9BA3B5', marginBottom: '4px' }}>📦 Fits: {b.wires}</div>
              <div style={{ fontSize: '13px', color: '#C8D0DC', marginBottom: '4px' }}>🔧 Material: {b.material}</div>
              <div style={{ fontSize: '13px', color: '#F5E642′ }}>🌡️ DFW: {b.dfwNote}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>🔍 DFW Application Lookup</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', background: '#1E2D47', border: '1px solid #2A3F5F', borderRadius: '8px', padding: '12px', color: '#E8EAF0', fontSize: '15px', marginBottom: '16px' }}
          >
            <option value="">Select your DFW application...</option>
            {appOptions.map(a => <option key={a.label}>{a.label}</option>)}
          </select>
          {result && (
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '16px' }}>
              {result.outdoor && (
                <div style={{ background: '#1A0A00', border: '1px solid #FF6B6B', borderRadius: '6px', padding: '8px 12px', marginBottom: '12px', fontSize: '13px', color: '#FF9F43′ }}>
                  🌧️ Outdoor location — weatherproof box and In-Use cover required in DFW
                </div>
              )}
              <div style={{ fontWeight: '700', color: '#F5E642', fontSize: '16px', marginBottom: '8px' }}>📦 {result.box}</div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', marginBottom: '6px' }}>🔲 Cover: {result.cover}</div>
              <div style={{ fontSize: '13px', color: '#A8B4C8', lineHeight: '1.5′ }}>📋 Fill Note: {result.fill}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D33', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>📐 Fill Calculation Rule</h3>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.8′ }}>
            Each #14 wire = 2 cu in | Each #12 wire = 2.25 cu in | Each device (outlet/switch) = 2× largest wire value | Each clamp pair = 1× largest wire value. Total must not exceed box cubic inch rating.
          </div>
        </div>

        <div style={{ background: '#1A1200', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '6px' }}>⚠️ DFW Inspection Tip</div>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.6′ }}>
            DFW inspectors commonly fail electrical work for overfilled boxes, missing In-Use covers on outdoor outlets, and non-fan-rated boxes under ceiling fans. Correct these before calling for inspection.
          </div>
        </div>
      </div>
    </div>
  );
}
