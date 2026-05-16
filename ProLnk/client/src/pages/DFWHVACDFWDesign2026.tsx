import { useState } from 'react';

const areas = [
  {
    name: 'Dallas County (Core)',
    coolingDB: '101°F',
    coolingWB: '74°F',
    heatingDB: '18°F',
    meanCoincidentWB: '74°F',
    tons: '1.2–1.4 tons per 1,000 sqft',
    notes: 'Densest urban heat island effect. Equipment must be rated for 101F ambient operation. Most major manufacturers test to 115F — verify your unit.',
  },
  {
    name: 'Tarrant County (Fort Worth area)',
    coolingDB: '100°F',
    coolingWB: '73°F',
    heatingDB: '17°F',
    meanCoincidentWB: '73°F',
    tons: '1.15–1.35 tons per 1,000 sqft',
    notes: 'Slightly lower wet bulb than Dallas proper. Less latent load — dehumidification less critical but still significant in shoulder seasons.',
  },
  {
    name: 'Collin/Denton Counties (North suburbs)',
    coolingDB: '99°F',
    coolingWB: '73°F',
    heatingDB: '16°F',
    meanCoincidentWB: '73°F',
    tons: '1.1–1.3 tons per 1,000 sqft',
    notes: 'Growing suburban areas with newer construction. Better insulation standards but larger homes — total tonnage often higher despite lower load per sqft.',
  },
  {
    name: 'Ellis/Johnson Counties (South)',
    coolingDB: '100°F',
    coolingWB: '74°F',
    heatingDB: '16°F',
    meanCoincidentWB: '74°F',
    tons: '1.15–1.4 tons per 1,000 sqft',
    notes: 'Similar to core Dallas conditions. Rural areas have less urban heat island but more sun exposure — ensure proper attic insulation and radiant barriers.',
  },
];

export default function DFWHVACDFWDesign2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const area = selected !== null ? areas[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW ASHRAE Design Conditions 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 32px' }}>
          ASHRAE design conditions define the temperature extremes that HVAC equipment must handle 99% of the time. These are the engineering standards behind every properly sized DFW system.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: '99% Cooling DB', value: '100–101°F', desc: 'Dry bulb temp exceeded only 1% of summer hours' },
            { label: 'Mean Coincident WB', value: '73–74°F', desc: 'Wet bulb at peak dry bulb — drives latent load' },
            { label: '99% Heating DB', value: '16–18°F', desc: 'Coldest temp for 99% of winter hours' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 10, padding: 16, border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, margin: '4px 0' }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Select your DFW area for specific design conditions and equipment implications:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {areas.map((a, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e293b', color: selected === i ? '#0A1628' : '#cbd5e1', border: '1px solid ' + (selected === i ? '#F5E642' : '#334155'), borderRadius: 8, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {a.name}
              </button>
            ))}
          </div>
        </div>
        {area && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{area.name}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { l: 'Cooling Design DB', v: area.coolingDB },
                { l: 'Cooling WB', v: area.coolingWB },
                { l: 'Heating Design DB', v: area.heatingDB },
                { l: 'Sizing Rule', v: area.tons },
              ].map((r, i) => (
                <div key={i} style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{r.l}</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{r.v}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{area.notes}</div>
          </div>
        )}
        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155' }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Never Guess Equipment Size</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Oversized units short-cycle and fail to dehumidify. Undersized units run continuously and fail early. Always require a Manual J load calculation. ProLnk-vetted DFW pros perform proper load calculations before quoting equipment.
          </p>
        </div>
      </div>
    </div>
  );
}
