import { useState } from 'react';

const coolingNeeds = [
  { id: 'standard', label: '🏠 Standard DFW Home (1,500–2,500 sq ft)' },
  { id: 'large', label: '🏡 Large DFW Home (2,500–4,000 sq ft)' },
  { id: 'addition', label: '🔀 Room Addition / Specific Zone' },
  { id: 'high', label: '🌞 High Solar Gain / West-Facing' },
];

const pumpTypes = [
  { id: 'standard', label: 'Standard Heat Pump (Single Stage)' },
  { id: 'variable', label: 'Variable Speed / Inverter Drive' },
  { id: 'dual', label: 'Dual-Fuel (Heat Pump + Gas Backup)' },
];

const results: Record<string, Record<string, { eer: string; seer2: string; capacity: string; note: string }>> = {
  standard: {
    standard: { eer: '10.5', seer2: '15', capacity: '85% at 100°F', note: 'Adequate for mild DFW cooling days; struggles on 105°F+ peaks' },
    variable: { eer: '12.8', seer2: '20', capacity: '92% at 100°F', note: 'Maintains efficiency well at DFW peak temps via modulating compressor' },
    dual: { eer: '11.5', seer2: '17', capacity: '90% at 100°F', note: 'Good balance; gas backup ensures comfort on extreme DFW days' },
  },
  large: {
    standard: { eer: '10.2', seer2: '14', capacity: '80% at 100°F', note: 'May require oversizing for large DFW home — runtime and humidity issues' },
    variable: { eer: '13.2', seer2: '21', capacity: '93% at 100°F', note: 'Best choice for large DFW homes; modulation prevents short-cycling' },
    dual: { eer: '12.0', seer2: '18', capacity: '91% at 100°F', note: 'Reliable for large DFW homes; backup ensures no capacity gaps' },
  },
  addition: {
    standard: { eer: '11.0', seer2: '16', capacity: '88% at 100°F', note: 'Mini-split format ideal for DFW additions — no duct losses' },
    variable: { eer: '14.5', seer2: '25', capacity: '95% at 100°F', note: 'Inverter mini-splits excel at DFW additions — highest efficiency available' },
    dual: { eer: '11.0', seer2: '16', capacity: '88% at 100°F', note: 'Dual-fuel less relevant for single-zone additions; stick with variable inverter' },
  },
  high: {
    standard: { eer: '10.0', seer2: '14', capacity: '80% at 100°F', note: 'Under-equipped for heavy DFW solar gain — consider upsizing' },
    variable: { eer: '13.0', seer2: '20', capacity: '92% at 100°F', note: 'Variable speed adapts well to west-facing DFW solar load peaks' },
    dual: { eer: '11.8', seer2: '17', capacity: '89% at 100°F', note: 'Solid for high-gain DFW rooms; backup provides buffer on extreme days' },
  },
};

export default function DFWHVACHeatPumpDFWSummer() {
  const [need, setNeed] = useState<string | null>(null);
  const [pump, setPump] = useState<string | null>(null);
  const result = need && pump ? results[need]?.[pump] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>Heat Pumps in DFW Summers</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Real performance at 100°F+ — capacity drops, EER vs SEER2, and what it means for your DFW home</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[{ title: '🌡️ DFW Peak Temp', value: '106–110°F', sub: 'July/August design day' }, { title: '📉 Capacity Drop', value: '8–20%', sub: 'vs rated at 95°F' }, { title: '⚡ EER Matters More', value: 'At Peak Load', sub: 'than SEER2 for DFW billing' }].map(stat => (
            <div key={stat.title} style={{ background: '#111f3a', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{stat.title}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: '6px 0 2px' }}>{stat.value}</div>
              <div style={{ color: '#475569', fontSize: 12 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 18 }}>⚙️ Your DFW Cooling Need + Heat Pump Type → Performance</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>DFW Cooling Need:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {coolingNeeds.map(n => (
                <button key={n.id} onClick={() => setNeed(n.id)} style={{ background: need === n.id ? '#F5E642' : '#1e3a5f', color: need === n.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>{n.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Heat Pump Type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pumpTypes.map(p => (
                <button key={p.id} onClick={() => setPump(p.id)} style={{ background: pump === p.id ? '#F5E642' : '#1e3a5f', color: pump === p.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>{p.label}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
                {[{ label: 'EER at Peak', value: result.eer }, { label: 'SEER2 Rating', value: result.seer2 }, { label: 'Capacity at 100°F', value: result.capacity }].map(m => (
                  <div key={m.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642' }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>💡 EER vs SEER2 for DFW</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: 14 }}>SEER2 is a seasonal average — useful nationally. In DFW, EER (efficiency at peak 95°F+) matters more because your system runs at or near capacity for months. A unit with SEER2 21 but EER 12 will outperform a SEER2 22 / EER 10 unit on your July electric bill.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>ProLnk — Connect with Verified DFW HVAC Pros</div>
      </div>
    </div>
  );
}
