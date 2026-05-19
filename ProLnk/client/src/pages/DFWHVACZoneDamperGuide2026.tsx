import { useState } from 'react';

export default function DFWHVACZoneDamperGuide2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const dampers = [
    { name: 'Motorized Round Dampers', icon: '⭕', detail: 'Most common in DFW flex-duct systems. 6", 8", 10" sizes. 24V actuator. Opens/closes per zone thermostat call.' },
    { name: 'Motorized Rectangular Dampers', icon: '▬', detail: 'Used in metal duct trunk lines. Higher airflow capacity. Required when multiple zones share large supply trunks.' },
    { name: 'Bypass Damper', icon: '🔄', detail: 'CRITICAL: Without bypass, closing zone dampers increases duct pressure, damaging air handler and causing noise. Bypass relieves pressure to return air.' },
  ];

  const controllers = [
    { brand: 'Honeywell HZ432', price: '$180–$250', zones: 'Up to 4', note: 'Most common in DFW residential. Easy setup, good tech support.' },
    { brand: 'Aprilaire 8840', price: '$200–$300', zones: 'Up to 4', note: 'Excellent humidity integration — valuable for DFW. Pairs with Aprilaire dehumidifiers.' },
    { brand: 'EWC Controls Zone-X', price: '$150–$220', zones: '2–8', note: 'Flexible wiring, good for retrofit. Common in DFW commercial-residential.' },
  ];

  const guides: Record<string, string> = {
    hot_room: '🔥 HOT ROOM: Usually a damper that is partially closed, stuck, or sized too small. Check damper blade position (should be fully open when zone calls). Verify zone controller is sending 24V signal. If room is on south/west side of DFW home, may need dedicated zone with dedicated damper, not shared with cooler north rooms.',
    noise: '💨 DUCT NOISE/WHISTLING: Classic bypass damper problem. When 1–2 zones close, pressure builds and rushes through open zones — causing whistle. Solution: install or resize bypass damper. Set bypass to crack open at 0.5" WC static pressure. Do NOT ignore — sustained high static destroys blower motor.',
    uneven: '🌡️ UNEVEN TEMPS: Zoning works only if Manual J load calculation was done room-by-room. DFW homes often have incorrect zone boundaries (master bedroom in wrong zone). Recommended: get HVAC tech to re-map zones using infrared camera during peak heat. May need zone boundary redesign.',
    new: '🆕 NEW INSTALLATION: DFW standard 2-story homes: 2 zones minimum (upstairs/downstairs). Bigger homes: 3–4 zones. NEVER zone a system without bypass damper. Use Honeywell HZ432 for straightforward installs. Requires compatible variable-speed or two-speed air handler for best results.',
  };

  const assess = () => {
    if (!concern) { setResult('Please select a zoning concern.'); return; }
    setResult(guides[concern] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
          DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⭕ Zone Damper Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW homes need HVAC zoning — west-facing bedrooms can be 15F hotter than north rooms in summer. Dampers make this possible, but improper installation causes more problems than it solves.
        </p>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Damper Types</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {dampers.map(d => (
            <div key={d.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{d.icon} {d.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{d.detail}</div>
            </div>
          ))}
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎛️ Zone Controllers — DFW Comparison</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {controllers.map(c => (
            <div key={c.brand} style={{ background: '#1E2D45', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.brand}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.note}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{c.price}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{c.zones} zones</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2a40', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Zoning Concern to Damper Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Zoning Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              <option value="">Select concern...</option>
              <option value="hot_room">One room stays hot despite HVAC running</option>
              <option value="noise">Duct whistling / banging noise when zones close</option>
              <option value="uneven">Temps uneven across zones</option>
              <option value="new">Planning new zoning installation</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Damper Guide
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 13, lineHeight: 1.7 }}>{result}</div>}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
          ⚠️ <strong style={{ color: '#F5E642' }}>Never zone without bypass:</strong> Closed zone dampers increase static pressure — sustained over 1.0" WC destroys blower motor ($400–$800 repair). Always include bypass in any zoning project.
        </div>
      </div>
    </div>
  );
}
