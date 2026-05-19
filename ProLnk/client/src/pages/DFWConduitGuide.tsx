import { useState } from 'react';

const conduitTypes = [
  {
    name: 'PVC Conduit (Schedule 40/80)',
    icon: '🟡',
    pros: 'Moisture-resistant, no rust, easy to glue, low cost',
    cons: 'Not for above-ground indoor use without protection, expands in heat',
    dfwBest: 'DFW underground runs and exterior in-ground installations. Preferred for DFW clay soil moisture.',
    costPer10ft: '$4–$8',
  },
  {
    name: 'EMT (Electrical Metallic Tubing)',
    icon: '⚙️',
    pros: 'Strong, indoor/outdoor exposed runs, grounded path',
    cons: 'Will rust if not coated for outdoor use, harder to bend',
    dfwBest: 'DFW garages, panel feeds, outdoor exposed runs on exterior walls.',
    costPer10ft: '$8–$14',
  },
  {
    name: 'Flexible Metal (FMC / Greenfield)',
    icon: '🌀',
    pros: 'Final connection to equipment (A/C, furnace), absorbs vibration',
    cons: 'Not watertight, not for long runs, not burial-rated',
    dfwBest: 'DFW A/C unit whip connections — standard final 3–6ft flex connection.',
    costPer10ft: '$12–$20',
  },
  {
    name: 'Liquid-Tight Flex (LFMC)',
    icon: '💧',
    pros: 'Watertight flex, outdoor equipment connections',
    cons: 'More expensive, still not for long runs',
    dfwBest: 'DFW outdoor A/C units, pool equipment, hot tubs where flex + moisture both present.',
    costPer10ft: '$16–$28',
  },
];

const locationOptions = [
  { label: 'Underground to detached garage', exposure: 'buried', type: 'PVC Schedule 40', depth: '18" min (24" preferred in DFW)', fittings: 'PVC sweep elbows at exit points', cost: '$6/ft installed' },
  { label: 'Exterior wall — exposed outdoor run', exposure: 'outdoor exposed', type: 'EMT with weatherproof fittings', depth: 'Surface mount', fittings: 'Weatherproof compression fittings', cost: '$10/ft installed' },
  { label: 'Through concrete slab', exposure: 'encased in concrete', type: 'PVC Schedule 80', depth: 'Within slab', fittings: 'Glued PVC fittings only — no set-screw', cost: '$8/ft installed' },
  { label: 'Garage panel feed (indoor)', exposure: 'indoor exposed', type: 'EMT', depth: 'Surface mount', fittings: 'Set-screw or compression EMT couplings', cost: '$9/ft installed' },
  { label: 'A/C unit connection (final whip)', exposure: 'outdoor, vibration', type: 'Liquid-Tight Flex (LFMC)', depth: 'Short run 3–6ft', fittings: 'Liquid-tight connectors both ends', cost: '$25–$60 total' },
  { label: 'Under DFW clay soil (moisture risk)', exposure: 'buried / moisture', type: 'PVC Schedule 40 — DFW preferred', depth: '24" recommended for DFW clay', fittings: 'Glued sweep elbows, expansion fittings for heat', cost: '$7/ft installed' },
  { label: 'Outdoor GFCI outlet on patio', exposure: 'outdoor / sheltered', type: 'EMT with weatherproof box', depth: 'Surface mount or in-wall', fittings: 'Weatherproof while-in-use cover required in DFW', cost: '$12/ft installed' },
];

export default function DFWConduitGuide() {
  const [selected, setSelected] = useState('');
  const result = locationOptions.find(l => l.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642' }}>🔧 DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>Electrical Conduit Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B5', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' }}>
          DFW's clay soil, summer heat, and outdoor humidity make conduit selection critical. PVC dominates underground; EMT rules exposed runs. Here's the breakdown.
        </p>

        <div style={{ marginBottom: '32px' }}>
          {conduitTypes.map((c) => (
            <div key={c.name} style={{ background: '#111D33', borderRadius: '10px', padding: '18px 20px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>{c.icon}</span>
                <span style={{ fontWeight: '700', fontSize: '16px', color: '#FFFFFF' }}>{c.name}</span>
                <span style={{ marginLeft: 'auto', background: '#1E2D47', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', color: '#F5E642' }}>{c.costPer10ft} / 10ft</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', color: '#4CAF50' }}>✅ {c.pros}</div>
                <div style={{ fontSize: '13px', color: '#FF6B6B' }}>⚠️ {c.cons}</div>
              </div>
              <div style={{ fontSize: '13px', color: '#F5E642', background: '#0D1F35', padding: '8px 12px', borderRadius: '6px' }}>
                🌡️ DFW Best Use: {c.dfwBest}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>📍 DFW Location Lookup: What conduit do I need?</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', background: '#1E2D47', border: '1px solid #2A3F5F', borderRadius: '8px', padding: '12px', color: '#E8EAF0', fontSize: '15px', marginBottom: '16px' }}
          >
            <option value="">Select your DFW wiring location...</option>
            {locationOptions.map(l => <option key={l.label}>{l.label}</option>)}
          </select>
          {result && (
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontWeight: '700', color: '#F5E642', fontSize: '18px', marginBottom: '10px' }}>Use: {result.type}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ fontSize: '13px', color: '#C8D0DC' }}>📏 Depth/Mount: {result.depth}</div>
                <div style={{ fontSize: '13px', color: '#C8D0DC' }}>💰 Cost estimate: {result.cost}</div>
                <div style={{ fontSize: '13px', color: '#C8D0DC', gridColumn: '1/-1' }}>🔩 Fittings: {result.fittings}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A1200', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '6px' }}>⚠️ DFW Permit Reminder</div>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.6' }}>
            Any conduit run over 6 feet feeding a new circuit requires a permit in DFW municipalities. PVC conduit joints must be glued — never dry-fit underground. DFW inspectors will check burial depth and fitting type on underground inspections.
          </div>
        </div>
      </div>
    </div>
  );
}
