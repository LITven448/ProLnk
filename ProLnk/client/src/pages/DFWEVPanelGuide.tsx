import { useState } from 'react';

type PanelSize = '' | '60' | '100' | '150' | '200' | '400';
type GarageLocation = '' | 'attached' | 'detached-near' | 'detached-far';
type EVType = '' | 'level1' | 'level2-32' | 'level2-48' | 'dcfc';

export default function DFWEVPanelGuide() {
  const [panel, setPanel] = useState<PanelSize>('');
  const [garage, setGarage] = useState<GarageLocation>('');
  const [ev, setEV] = useState<EVType>('');

  const getResult = () => {
    if (!panel || !garage || !ev) return null;
    const panelNum = Number(panel);

    if (ev === 'level1') return {
      circuit: 'Existing 15A or 20A outlet (120V)',
      upgrade: 'None required',
      cost: '$0 — use existing outlet',
      permit: 'No permit required if using existing outlet.',
      timeline: 'Immediate',
      color: '#22C55E',
      summary: 'Level 1 (120V/12A) works with any standard outlet. Adds ~4 miles of range per hour — fine for plug-in hybrids or light EV use in DFW.',
    };

    if (ev === 'level2-32') {
      if (panelNum >= 200) return {
        circuit: 'New dedicated 40A 240V circuit (NEMA 14-50 or hardwired)',
        upgrade: 'No panel upgrade needed — add circuit',
        cost: '$400–$900 for circuit run; $150 if garage is adjacent to panel',
        permit: 'City of Dallas / local municipality permit required for new 240V circuit.',
        timeline: '1–2 weeks including permit and inspection',
        color: '#22C55E',
        summary: 'Your 200A panel easily accommodates a Level 2 32A charger. A licensed electrician will run a 40A 240V circuit to your garage.',
      };
      if (panelNum === 150) return {
        circuit: 'New dedicated 40A 240V circuit',
        upgrade: 'Panel likely has capacity — load analysis recommended',
        cost: '$400–$900 circuit; $0–$2,000 if load analysis shows upgrade needed',
        permit: 'Permit required.',
        timeline: '2–4 weeks',
        color: '#F59E0B',
        summary: 'Your 150A panel may have room depending on your existing loads. A load calculation is recommended before pulling the permit.',
      };
      return {
        circuit: 'New dedicated 40A 240V circuit',
        upgrade: '🔴 Panel upgrade to 200A likely required first',
        cost: '$2,500–$5,000 panel upgrade + $400–$900 circuit',
        permit: 'Permit required for both panel upgrade and new circuit.',
        timeline: '4–8 weeks including Oncor coordination',
        color: '#EF4444',
        summary: `Your ${panelNum}A panel is too small to safely add EV charging on top of DFW HVAC and appliance loads. Upgrade to 200A is the right path.`,
      };
    }

    if (ev === 'level2-48') {
      if (panelNum >= 200) return {
        circuit: 'Dedicated 60A 240V circuit — 6 AWG wire, 2-pole breaker',
        upgrade: 'No panel upgrade if 200A has headroom; load analysis recommended',
        cost: '$600–$1,400 depending on garage distance from panel',
        permit: 'Permit required. DFW inspectors check wire gauge and breaker rating.',
        timeline: '2–3 weeks',
        color: panelNum >= 200 ? '#22C55E' : '#F59E0B',
        summary: 'A 48A charger (NEMA 14-50 or hardwired) on a 60A circuit adds ~25 miles/hour charge rate — charges most EVs overnight easily in DFW.',
      };
      return {
        circuit: 'Dedicated 60A 240V circuit',
        upgrade: '🔴 Panel upgrade to 200A required',
        cost: '$2,500–$5,500 panel + circuit',
        permit: 'Permit required for both.',
        timeline: '5–9 weeks',
        color: '#EF4444',
        summary: `${panelNum}A service cannot support a 48A EV charger plus DFW AC loads. A 200A service upgrade is required before installation.`,
      };
    }

    return {
      circuit: 'DC Fast Charging not typically installed in DFW homes',
      upgrade: 'DCFC requires 480V 3-phase service — not available at residential meters',
      cost: 'Not applicable for residential',
      permit: 'N/A',
      timeline: 'N/A',
      color: '#94A3B8',
      summary: 'DC fast charging (Level 3) requires commercial 3-phase power. For home use, a Level 2 48A charger is the fastest practical option in any DFW home.',
    };
  };

  const result = getResult();
  const garageNote: Record<GarageLocation, string> = {
    '': '',
    'attached': 'Attached garage: minimal conduit run, lowest cost.',
    'detached-near': 'Detached garage (under 50 ft): underground conduit run adds $200–$500.',
    'detached-far': 'Detached garage (50+ ft): longer underground run; trenching may add $500–$1,500.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🚗 DFW EV ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>EV Panel & Circuit Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Adding an EV charger to your DFW home requires the right panel, the right circuit, and a permit.
          Tell us your setup and we'll show you exactly what's needed.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94A3B8', fontSize: 13 }}>Current panel size</label>
              <select value={panel} onChange={e => setPanel(e.target.value as PanelSize)}
                style={{ width: '100%', padding: '10px 14px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 15 }}>
                <option value="">— select —</option>
                <option value="60">60A (very old DFW home)</option>
                <option value="100">100A (older DFW home)</option>
                <option value="150">150A</option>
                <option value="200">200A (modern DFW standard)</option>
                <option value="400">400A (large home / dual meter)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94A3B8', fontSize: 13 }}>Garage location</label>
              <select value={garage} onChange={e => setGarage(e.target.value as GarageLocation)}
                style={{ width: '100%', padding: '10px 14px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 15 }}>
                <option value="">— select —</option>
                <option value="attached">Attached garage</option>
                <option value="detached-near">Detached — under 50 ft from panel</option>
                <option value="detached-far">Detached — 50+ ft from panel</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94A3B8', fontSize: 13 }}>EV charger type</label>
              <select value={ev} onChange={e => setEV(e.target.value as EVType)}
                style={{ width: '100%', padding: '10px 14px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 15 }}>
                <option value="">— select —</option>
                <option value="level1">Level 1 — 120V standard outlet (slow)</option>
                <option value="level2-32">Level 2 — 32A charger (most EVs)</option>
                <option value="level2-48">Level 2 — 48A charger (fastest home)</option>
                <option value="dcfc">DC Fast Charge (Level 3)</option>
              </select>
            </div>
          </div>
        </div>

        {garage && <div style={{ background: '#162035', borderRadius: 8, padding: '10px 16px', marginBottom: 16, color: '#94A3B8', fontSize: 14 }}>📍 {garageNote[garage]}</div>}

        {result && (
          <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, borderLeft: `3px solid ${result.color}` }}>
            <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: 20 }}>{result.summary}</p>
            {[['Required Circuit', result.circuit], ['Panel Upgrade', result.upgrade], ['Estimated Cost', result.cost], ['Permit', result.permit], ['Timeline', result.timeline]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', gap: 16, marginBottom: 12, padding: '10px', background: '#162035', borderRadius: 8 }}>
                <span style={{ color: '#94A3B8', fontSize: 13, minWidth: 130 }}>{label}</span>
                <span style={{ color: '#E8F0FE', fontSize: 14 }}>{val}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Get a licensed DFW electrician to assess your panel and install your EV circuit.</p>
          <a href="/get-quote" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Get a Free DFW EV Installation Quote</a>
        </div>
      </div>
    </div>
  );
}
