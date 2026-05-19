import { useState } from 'react';

export default function DFWHVACCopperLinesDFW2026() {
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const conditions = [
    { value: 'new-good', label: 'New or Good Condition (insulation intact)' },
    { value: 'cracked-insulation', label: 'Cracked/Falling Insulation' },
    { value: 'bare-copper', label: 'Bare Copper Exposed to DFW Sun' },
    { value: 'leaking-connection', label: 'Suspected Leak at Connection Point' },
  ];

  const guides: Record<string, string> = {
    'new-good': 'MAINTAIN: Inspect insulation annually before each DFW summer. UV breaks down foam insulation faster in Texas sun — expect 8–12 year lifespan outdoors. Ensure line set is secured every 4 ft to prevent vibration wear.',
    'cracked-insulation': 'REPLACE INSULATION NOW: Cracked foam = moisture condensation on copper = corrosion + efficiency loss. Re-wrap with closed-cell foam insulation rated for outdoor UV exposure. Cost: $150–$400 DIY, $300–$600 pro.',
    'bare-copper': 'HIGH PRIORITY: Bare copper in DFW sun degrades rapidly and loses refrigerant. Also a theft target — copper theft from HVAC systems is a significant DFW issue. Schedule insulation replacement + security cage if accessible.',
    'leaking-connection': 'CALL TECH IMMEDIATELY: Flare connections loosen over time; braze connections can crack from vibration. Refrigerant loss causes compressor damage. Only licensed HVAC tech can legally handle refrigerant — EPA 608 certified required.',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          🔧 HVAC Copper Refrigerant Lines Guide
        </h1>
        <p style={{ color: '#9BAEC8', marginBottom: '28px', lineHeight: 1.6 }}>
          Refrigerant line sets are the HVAC system's circulatory system. In DFW, UV exposure and heat degrade insulation faster than anywhere in the US — a <strong style={{ color: '#F5E642' }}>degraded line set causes up to 20% efficiency loss</strong> before any other component fails.
        </p>

        {[
          { icon: '🌡️', title: 'Soft Copper — DFW Standard', desc: 'Soft copper tubing is standard for residential line sets. DFW’s UV index (8–10 in summer) degrades outdoor insulation in 8–12 years vs. 15+ in northern climates.' },
          { icon: '🔗', title: 'Flare vs. Braze Connections', desc: 'Flare connections are mechanical and can loosen. Brazed connections are permanent but require proper technique. DFW’s thermal expansion cycles stress both connection types over time.' },
          { icon: '📉', title: '20% Efficiency Loss Threshold', desc: 'A line set with degraded insulation creates heat gain on the suction line, forcing compressor to work harder. This shows up as high electric bills before any diagnostic fault code.' },
          { icon: '🔒', title: 'Copper Theft — DFW Reality', desc: 'DFW metro ranks in top 10 nationwide for HVAC copper theft. Exposed outdoor line sets in accessible locations (side yards, back fences) are targets. Security cages cost $200–$500 installed.' },
        ].map((item) => (
          <div key={item.title} style={{ backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.title}</div>
            <div style={{ color: '#9BAEC8', fontSize: '14px' }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#111D35', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
          <div style={{ fontWeight: 700, marginBottom: '16px', color: '#F5E642′ }}>🔍 Line Set Condition → Maintenance Guide</div>
          <select
            value={condition}
            onChange={(e) => { setCondition(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '12px', fontSize: '15px' }}
          >
            <option value="">Select line set condition...</option>
            {conditions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <button
            onClick={() => condition && setResult(guides[condition])}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            Get Maintenance Guide
          </button>
          {result && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#E8EDF5', lineHeight: 1.6, fontSize: '14px' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

