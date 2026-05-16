import { useState } from 'react';

type Room = 'kitchen' | 'bedroom' | 'bathroom' | 'garage' | 'living' | 'outdoor';

interface RoomAudit {
  icon: string;
  checks: { item: string; dfwNote?: string; cost: string; priority: 'high' | 'medium' | 'low' }[];
}

const auditData: Record<Room, RoomAudit> = {
  kitchen: {
    icon: '🍳',
    checks: [
      { item: 'Smoke detector within 10 ft of cooking area', dfwNote: 'Test monthly — DFW humidity can cause false alarms with cheap detectors', cost: '$15–40', priority: 'high' },
      { item: 'Fire extinguisher mounted and accessible (ABC-rated)', cost: '$25–60', priority: 'high' },
      { item: 'GFCI outlets at all countertop locations near sink', dfwNote: 'Required by code in DFW homes built after 1996 — older homes often missing', cost: '$80–150/outlet', priority: 'high' },
      { item: 'Exhaust fan vented to exterior (not attic)', dfwNote: 'DFW humidity: attic-vented exhaust causes mold within 1-2 years', cost: '$150–400', priority: 'medium' },
      { item: 'No stored chemicals under sink near heat sources', cost: '$0', priority: 'medium' },
      { item: 'Refrigerator coils clean and not touching wall', dfwNote: 'DFW heat makes refrigerators work 30% harder — dirty coils = failure', cost: '$0', priority: 'low' },
      { item: 'Cabinet latches on cleaning supply cabinets if children present', cost: '$10–25', priority: 'medium' },
    ],
  },
  bedroom: {
    icon: '🛏️',
    checks: [
      { item: 'Smoke detector on ceiling (not wall-mounted)', cost: '$20–50', priority: 'high' },
      { item: 'Carbon monoxide detector if gas appliances nearby', dfwNote: 'DFW homes with attached garages and gas heating need CO detectors — most do not have them', cost: '$25–60', priority: 'high' },
      { item: 'Egress window opens fully from inside (escape route)', dfwNote: 'DFW fire evacuation — know your escape route before storm season blocks roads', cost: '$0 (inspect); $200+ if stuck', priority: 'high' },
      { item: 'No overloaded power strips under bed or behind furniture', cost: '$0', priority: 'medium' },
      { item: 'Bed frame stable — not a fall hazard for elderly or children', cost: '$0', priority: 'medium' },
      { item: 'Window locks functional on all bedroom windows', dfwNote: 'DFW burglary statistics: bedroom windows are top entry point in 1-story homes', cost: '$10–30/window', priority: 'medium' },
      { item: 'Flashlight or phone charger accessible for DFW power outages', dfwNote: 'Oncor reports average DFW home loses power 2-3x per year including ice storms', cost: '$15–40', priority: 'low' },
    ],
  },
  bathroom: {
    icon: '🚿',
    checks: [
      { item: 'GFCI outlet for all outlets within 6 ft of water', cost: '$80–150/outlet', priority: 'high' },
      { item: 'Grab bars in shower/tub if elderly or mobility-impaired', cost: '$40–120', priority: 'high' },
      { item: 'Non-slip mat in shower and tub', cost: '$15–40', priority: 'high' },
      { item: 'Exhaust fan vented to exterior — not attic', dfwNote: 'DFW humidity: improper venting causes attic mold within one rainy season', cost: '$150–350', priority: 'medium' },
      { item: 'Hot water heater set to 120°F maximum (scalding prevention)', dfwNote: 'DFW summer: water in supply lines reaches 90°F — heater at 140°F creates scalding risk', cost: '$0', priority: 'medium' },
      { item: 'Medicines stored out of reach (locked if children present)', cost: '$20–50', priority: 'medium' },
      { item: 'Toilet properly anchored — no rocking or movement', cost: '$0 inspect; $80–200 repair', priority: 'low' },
    ],
  },
  garage: {
    icon: '🚗',
    checks: [
      { item: 'Carbon monoxide detector if attached to living space', dfwNote: 'Running a car in DFW summer heat with garage door closed for 2 min = dangerous CO levels', cost: '$25–60', priority: 'high' },
      { item: 'Fire extinguisher mounted near door to house', cost: '$25–60', priority: 'high' },
      { item: 'All chemicals stored above 60°F and below 90°F', dfwNote: 'DFW garage hits 140-150°F in summer — aerosols and fuels become explosive at these temps', cost: '$0 (relocate items)', priority: 'high' },
      { item: 'Garage door auto-reverse tested (place 2x4 on ground)', cost: '$0', priority: 'high' },
      { item: 'Emergency garage door release cord accessible from inside', cost: '$0 (test); $50 if broken', priority: 'medium' },
      { item: 'No stored gasoline containers in summer (vapor pressure danger)', dfwNote: 'DFW summer: gasoline vapor in enclosed garage is a fire risk at 140°F+ temps', cost: '$0', priority: 'medium' },
      { item: 'Electrical panel accessible and labeled', cost: '$0 (label); $80/hr electrician', priority: 'low' },
    ],
  },
  living: {
    icon: '🛋️',
    checks: [
      { item: 'Smoke detector on ceiling of each living area', cost: '$20–50', priority: 'high' },
      { item: 'No extension cords used as permanent wiring', dfwNote: 'DFW summer AC load causes extension cord overheating — leading cause of residential fires', cost: '$0 (remove); $150+ for outlet install', priority: 'high' },
      { item: 'Furniture anchored to wall if children present (anti-tip)', cost: '$15–40', priority: 'high' },
      { item: 'Fireplace damper seals when closed', dfwNote: 'Open dampers in DFW summer allow 140°F attic air to enter living space — raises AC costs 15%', cost: '$0 test; $100–300 repair', priority: 'medium' },
      { item: 'Window locks functional on all first-floor windows', cost: '$10–30/window', priority: 'medium' },
      { item: 'Staircase railings solid and secure', cost: '$0 inspect; $200+ repair', priority: 'medium' },
      { item: 'Carbon monoxide detector near gas fireplace or furnace', cost: '$25–60', priority: 'medium' },
    ],
  },
  outdoor: {
    icon: '🌳',
    checks: [
      { item: 'GFCI outlets on all exterior outlet locations', dfwNote: 'DFW rain + outdoor outlets = code requirement and safety necessity — non-GFCI is dangerous', cost: '$80–150/outlet', priority: 'high' },
      { item: 'Trees trimmed away from house (10 ft clearance)', dfwNote: 'DFW storms: trees within 10 ft of roofline are the #1 cause of storm damage claims in DFW', cost: '$200–1,000', priority: 'high' },
      { item: 'Foundation inspection for cracks (DFW clay soil shifts annually)', dfwNote: 'DFW clay soil shrinks in summer and expands in winter — inspect foundation every spring', cost: '$0 DIY; $200–400 engineer', priority: 'high' },
      { item: 'Gutters clear and downspouts direct water 6 ft from foundation', dfwNote: 'DFW drought-shrunk soil + sudden rain: water pooling at foundation causes serious damage', cost: '$150–400 cleaning', priority: 'medium' },
      { item: 'Exterior lighting on all entry points functional', cost: '$30–100/fixture', priority: 'medium' },
      { item: 'Hose bib winterization plan for DFW freeze events', dfwNote: 'DFW ice storms: unprotected exterior hose bibs burst — costs $400-800 in emergency plumbing', cost: '$10–25 insulation cap', priority: 'medium' },
      { item: 'Fence gates lock from inside and outside', cost: '$20–60', priority: 'low' },
    ],
  },
};

const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#4ade80' };
const priorityLabel = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' };

export default function DFWHomeSafetyAuditGuide() {
  const [room, setRoom] = useState<Room | ''>('');
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const audit = room ? auditData[room as Room] : null;
  const filtered = audit ? audit.checks.filter(c => filter === 'all' || c.priority === filter) : [];
  const highCount = audit ? audit.checks.filter(c => c.priority === 'high').length : 0;

  const rooms: [Room, string, string][] = [
    ['kitchen', '🍳', 'Kitchen'], ['bedroom', '🛏️', 'Bedroom'], ['bathroom', '🚿', 'Bathroom'],
    ['garage', '🚗', 'Garage'], ['living', '🛋️', 'Living Room'], ['outdoor', '🌳', 'Outdoor/Exterior'],
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Home Safety Audit</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>50-point room-by-room inspection with DFW-specific hazards and repair costs</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, textTransform: 'uppercase' }}>Select Room to Audit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {rooms.map(([r, icon, label]) => (
              <button key={r} onClick={() => { setRoom(r); setFilter('all'); }}
                style={{ background: room === r ? '#F5E642' : '#1e3a5f', color: room === r ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 8px', cursor: 'pointer', fontWeight: room === r ? 700 : 400, fontSize: 14, transition: 'all 0.15s' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
                {label}
              </button>
            ))}
          </div>
        </div>

        {audit && (
          <>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ background: '#7c1d1d', borderRadius: 8, padding: '8px 14px', color: '#fca5a5', fontSize: 13 }}>
                🔴 {highCount} High Priority Items
              </div>
              {(['all', 'high', 'medium', 'low'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ background: filter === f ? '#F5E642' : '#112240', color: filter === f ? '#0A1628' : '#94a3b8', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: filter === f ? 700 : 400, textTransform: 'capitalize' }}>
                  {f === 'all' ? 'All Items' : priorityLabel[f]}
                </button>
              ))}
            </div>

            <div>
              {filtered.map((check, i) => (
                <div key={i} style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ color: priorityColor[check.priority], fontSize: 12, fontWeight: 700, background: '#0A1628', padding: '2px 8px', borderRadius: 4 }}>{priorityLabel[check.priority]}</span>
                      </div>
                      <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '0 0 6px 0' }}>{check.item}</p>
                      {check.dfwNote && (
                        <p style={{ color: '#F5E642', fontSize: 12, margin: '0 0 4px 0' }}>⚠️ DFW Note: {check.dfwNote}</p>
                      )}
                    </div>
                    <div style={{ background: '#112240', borderRadius: 8, padding: '8px 12px', textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ color: '#94a3b8', fontSize: 10 }}>EST. COST</div>
                      <div style={{ color: '#4ade80', fontSize: 13, fontWeight: 700 }}>{check.cost}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!audit && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>☝️</div>
            <p style={{ color: '#94a3b8', fontSize: 15 }}>Select a room above to begin your DFW home safety audit</p>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Each room includes DFW-specific hazards from clay soil shifts, extreme heat, and storm season</p>
          </div>
        )}
      </div>
    </div>
  );
}
