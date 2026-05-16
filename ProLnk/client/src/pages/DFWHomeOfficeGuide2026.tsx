import { useState } from 'react';

export default function DFWHomeOfficeGuide2026() {
  const [existingSpace, setExistingSpace] = useState('spare-bedroom');
  const [priority, setPriority] = useState('video-calls');

  const guides: Record<string, Record<string, { title: string; cost: string; steps: string[]; fiber: string }>> = {
    "spare-bedroom": {
      "video-calls": { title: 'Dedicated Video Call Office', cost: '$3,000–$8,000', steps: ['Acoustic panels on wall behind monitor', 'Ring light or window lighting setup', 'Ethernet port + AT&T Fiber in most DFW suburbs', 'Standing desk + ergonomic chair'], fiber: 'AT&T Fiber widely available in DFW — fastest option' },
      "focus-work": { title: 'Deep Work Studio', cost: '$2,500–$6,000', steps: ['Double-pane door for sound isolation', 'Blackout shades (DFW afternoon sun intense)', 'Dedicated 20-amp circuit (computers + monitors)', 'Good HVAC zoning — separate thermostat'], fiber: 'Spectrum + AT&T competitive in most DFW zip codes' },
      "dual-monitor": { title: 'Power Workstation Setup', cost: '$4,000–$10,000', steps: ['Dedicated 20-amp circuit required', 'UPS backup power (DFW storms cause outages)', 'Dual monitor arm wall mount', 'Fiber ethernet drop — no WiFi for primary work'], fiber: 'DFW fiber: AT&T (most areas), Frontier (some), Spectrum cable' },
    },
    "garage-conversion": {
      "video-calls": { title: 'Garage Office for Video Work', cost: '$15,000–$35,000', steps: ['Insulation + drywall required (DFW heat)', 'Mini-split HVAC — critical', 'Ethernet conduit from main house', 'Good lighting for video — garage windows ideal'], fiber: 'Run fiber to detached garage via buried conduit ($800–$2,000)' },
      "focus-work": { title: 'Detached Focus Studio', cost: '$12,000–$28,000', steps: ['Full insulation package (DFW climate)', 'Mini-split for year-round comfort', 'Subpanel for dedicated power', 'Physical separation from home = productivity'], fiber: 'Underground conduit + Ethernet from home router' },
      "dual-monitor": { title: 'Garage Workstation Build', cost: '$18,000–$40,000', steps: ['200-amp subpanel for heavy workstation load', 'Mini-split 1.5-ton minimum', 'Full insulation + vapor barrier', 'Fiber connection via conduit'], fiber: 'Conduit to garage — budget $1,500–$3,000 for run' },
    },
    "dining-nook": {
      "video-calls": { title: 'Nook Video Corner', cost: '$800–$2,500', steps: ['Acoustic backdrop or bookshelf background', 'Good overhead lighting or ring light', 'Ethernet wall plate (avoid Zoom on WiFi)', 'Floating desk to save space'], fiber: 'AT&T Fiber or Spectrum — check prolnk.io for DFW zip speed' },
      "focus-work": { title: 'Focused Nook Office', cost: '$600–$1,800', steps: ['Privacy screen or partial wall divider', 'Task lighting (not overhead only)', 'Cable management for clean look', 'Noise-canceling headphones ($200–$350)'], fiber: 'Spectrum cable (150–1000 Mbps) in most DFW areas' },
      "dual-monitor": { title: 'Nook Dual Monitor Setup', cost: '$1,200–$3,500', steps: ['Wall-mounted dual monitor arm', 'Outlet addition behind desk ($200–$400)', 'Surge protector — DFW storms cause spikes', 'Standing desk converter'], fiber: 'Run Ethernet to nook from router — avoid WiFi drops' },
    },
    "closet-office": {
      "video-calls": { title: 'Cloffice Video Setup', cost: '$500–$1,500', steps: ['Remove closet rod — keep shelves', 'LED strip lighting behind monitor', 'Ring light for video calls', 'Close doors for clean background'], fiber: 'Ethernet adapter for WiFi reliability in small space' },
      "focus-work": { title: 'Cloffice Focus Den', cost: '$400–$1,200', steps: ['Floating shelf desk ($150–$300)', 'Task light clip-on', 'Doors closed = instant focus mode', 'USB hub for peripherals'], fiber: 'WiFi extender in closet if Ethernet not reachable' },
      "dual-monitor": { title: 'Cloffice Power Station', cost: '$800–$2,000', steps: ['May need deeper closet (24in minimum)', 'Outlet inside closet ($150–$300)', 'Vertical monitor stack saves space', 'Cable management critical in tight space'], fiber: 'USB-C dock handles multiple monitors from one cable' },
    },
  };

  const result = guides[existingSpace]?.[priority];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💼</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Home Office Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Remote work drove DFW suburban growth — a good home office adds $15–25K in value</p>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🏠 Existing Space</label>
              <select value={existingSpace} onChange={e => setExistingSpace(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="spare-bedroom">Spare Bedroom</option>
                <option value="garage-conversion">Garage Conversion</option>
                <option value="dining-nook">Dining Nook / Corner</option>
                <option value="closet-office">Closet Office (Cloffice)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 6 }}>🎯 Work Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px' }}>
                <option value="video-calls">Video Calls (Zoom/Teams)</option>
                <option value="focus-work">Deep Focus Work</option>
                <option value="dual-monitor">Dual Monitor Workstation</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>💡 {result.title}</span>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>{result.cost}</span>
              </div>
              <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
                {result.steps.map((s, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>{s}</li>)}
              </ul>
              <div style={{ background: '#1e293b', borderRadius: 6, padding: '10px 14px' }}>
                <span style={{ color: '#60a5fa', fontSize: 13 }}>🌐 Internet: </span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{result.fiber}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📞 Get Home Office Build Quotes</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects DFW homeowners with electricians, carpenters, and AV pros who specialize in home office builds.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Home Office Quotes →</button>
        </div>
      </div>
    </div>
  );
}
