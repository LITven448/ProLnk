import { useState } from 'react';

const fireplaceTypes = [
  { key: 'gas_insert', label: 'Gas insert (wood fireplace converted to gas)' },
  { key: 'gas_direct', label: 'Gas direct-vent fireplace (sealed unit)' },
  { key: 'gas_freestanding', label: 'Gas freestanding or log set' },
  { key: 'wood', label: 'Traditional wood-burning fireplace' },
];

const usageOptions = [
  { key: 'never', label: 'Never or almost never (0-1x per year)' },
  { key: 'rare', label: 'Rarely (2-5 times per year)' },
  { key: 'occasional', label: 'Occasionally (monthly in winter)' },
  { key: 'regular', label: 'Regularly (weekly in winter)' },
];

const results: Record<string, Record<string, { risk: string; riskColor: string; checklist: string[]; maintenance: string[] }>> = {
  gas_insert: {
    never: { risk: 'High Risk — Stagnant systems develop hidden faults', riskColor: '#EF4444', checklist: ['Test CO detector within 10 feet before first use', 'Check pilot light and thermocouple function', 'Inspect gas valve for leaks with soapy water', 'Clear debris from vent termination outside'], maintenance: ['Annual inspection by licensed gas tech', 'Clean burner and logs with soft brush', 'Test auto shut-off safety function', 'Inspect chimney liner for condensation damage'] },
    rare: { risk: 'Elevated Risk — Infrequent use creates maintenance gaps', riskColor: '#FB923C', checklist: ['CO detector test mandatory', 'Visual inspection of firebox before lighting', 'Check venting for bird or wasp nests (common in DFW)', 'Verify gas shutoff valve turns freely'], maintenance: ['Annual inspection', 'Clean glass doors with approved fireplace glass cleaner', 'Inspect gaskets on sealed doors', 'Lubricate gas valve annually'] },
    occasional: { risk: 'Moderate Risk — Manageable with annual inspection', riskColor: '#F5E642', checklist: ['CO detector functional', 'Inspect vent termination seasonally', 'Check burner for uneven flame'], maintenance: ['Annual inspection before winter season', 'Glass and firebox cleaning between uses', 'Check log positioning per manufacturer spec'] },
    regular: { risk: 'Lower Risk — Regular use reveals problems early', riskColor: '#22C55E', checklist: ['CO detector functional and within 5 feet', 'Monthly visual check during season', 'Watch for yellow/orange flame (indicates incomplete combustion)'], maintenance: ['Annual inspection still required', 'Clean burner at start of each season', 'Replace batteries in remote or thermostat'] },
  },
  gas_direct: {
    never: { risk: 'Elevated Risk — Sealed units still need annual checks', riskColor: '#FB923C', checklist: ['Check sealed glass for cracks or gasket failure', 'Test CO detector', 'Verify vent cap outside is clear and undamaged'], maintenance: ['Annual service by authorized tech', 'Check combustion chamber for debris', 'Test safety shut-off thermocouple'] },
    rare: { risk: 'Moderate Risk', riskColor: '#F5E642', checklist: ['Test CO detector before use', 'Inspect sealed glass condition', 'Verify no unusual odor when pilot runs'], maintenance: ['Annual inspection', 'Dust interior via service panel if accessible'] },
    occasional: { risk: 'Lower Risk', riskColor: '#22C55E', checklist: ['CO detector check', 'Visual glass inspection'], maintenance: ['Annual inspection', 'Clean exterior glass seasonally'] },
    regular: { risk: 'Lower Risk', riskColor: '#22C55E', checklist: ['CO detector within 5 feet', 'Monthly check for unusual smells or flame color'], maintenance: ['Annual inspection', 'Clean glass between seasons'] },
  },
  gas_freestanding: {
    never: { risk: 'High Risk — Unvented log sets are highest CO risk', riskColor: '#EF4444', checklist: ['Verify if vented or unvented — unvented sets release CO into room', 'Never use unvented logs in a closed room', 'CO detector must be operational — this is critical', 'Inspect gas connection flex line for cracks or corrosion'], maintenance: ['Annual inspection mandatory', 'Replace unvented logs with vented if possible', 'Burner orifice cleaning by licensed tech'] },
    rare: { risk: 'High Risk — Especially if unvented', riskColor: '#EF4444', checklist: ['Confirm vent type before each use', 'CO detector check mandatory', 'Window cracking recommended if unvented'], maintenance: ['Annual inspection', 'Do not leave running unattended'] },
    occasional: { risk: 'Elevated Risk', riskColor: '#FB923C', checklist: ['CO detector operational', 'Check gas flex line condition'], maintenance: ['Annual inspection', 'Burner cleaning before season'] },
    regular: { risk: 'Moderate Risk — Frequency helps catch issues', riskColor: '#F5E642', checklist: ['CO detector', 'Watch for sooting on glass or walls — indicates incomplete burn'], maintenance: ['Annual inspection', 'Regular burner cleaning'] },
  },
  wood: {
    never: { risk: 'Elevated Risk — Creosote builds even without regular use', riskColor: '#FB923C', checklist: ['Never use without chimney inspection first', 'Check for animal nests in flue (very common in DFW)', 'Damper must open fully before lighting', 'Smoke detector and CO detector both functional'], maintenance: ['Annual chimney sweep before first use', 'Check flue liner for cracks', 'Repair mortar in firebox if deteriorated'] },
    rare: { risk: 'Elevated Risk', riskColor: '#FB923C', checklist: ['Annual chimney inspection required', 'Check damper operation', 'Inspect firebox mortar condition'], maintenance: ['Chimney sweep every 1-2 cords burned', 'Cap and screen inspection for animal intrusion'] },
    occasional: { risk: 'Moderate Risk', riskColor: '#F5E642', checklist: ['Annual sweep if burning more than one cord', 'Damper check each season'], maintenance: ['Sweep annually', 'Use only seasoned hardwood — never green wood or treated lumber'] },
    regular: { risk: 'Moderate Risk — Creosote accumulates faster', riskColor: '#F5E642', checklist: ['Sweep at least once per cord burned', 'Monthly visual inspection during season'], maintenance: ['Mid-season sweep if burning frequently', 'Use creosote reducer logs monthly'] },
  },
};

export default function DFWFireplaceGasRiskGuide() {
  const [fpType, setFpType] = useState('');
  const [usage, setUsage] = useState('');

  const res = fpType && usage ? results[fpType]?.[usage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔥</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Gas Fireplace Risk Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>DFW winters are mild — most gas fireplaces get used 5-10 times per year at most. That infrequent use creates hidden risk. Carbon monoxide from a faulty gas appliance is odorless, colorless, and lethal. Know your risk.</p>

        <div style={{ background: '#3B0A0A', border: '1px solid #EF4444', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 6 }}>🚨 Carbon Monoxide Warning</div>
          <div style={{ color: '#FCA5A5', fontSize: 14 }}>CO detectors are required within 10 feet of any gas appliance in Texas. If your CO detector alarms, evacuate immediately and call 911. Do not re-enter until cleared by fire department.</div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Your Fireplace Assessment</h2>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Fireplace Type</label>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            {fireplaceTypes.map(f => (
              <button key={f.key} onClick={() => setFpType(f.key)} style={{ background: fpType === f.key ? '#F5E642' : '#0A1628', color: fpType === f.key ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontSize: 14, textAlign: 'left', fontWeight: fpType === f.key ? 700 : 400 }}>{f.label}</button>
            ))}
          </div>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Usage Frequency</label>
          <div style={{ display: 'grid', gap: 10 }}>
            {usageOptions.map(u => (
              <button key={u.key} onClick={() => setUsage(u.key)} style={{ background: usage === u.key ? '#F5E642' : '#0A1628', color: usage === u.key ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontSize: 14, textAlign: 'left', fontWeight: usage === u.key ? 700 : 400 }}>{u.label}</button>
            ))}
          </div>
        </div>

        {res && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: `4px solid ${res.riskColor}` }}>
              <div style={{ fontWeight: 700, color: res.riskColor }}>{res.risk}</div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>✅ Before-Use Safety Checklist</h3>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>{res.checklist.map((c, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5' }}>{c}</li>)}</ul>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🔧 Annual Maintenance</h3>
            <ul style={{ paddingLeft: 20 }}>{res.maintenance.map((m, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5' }}>{m}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
