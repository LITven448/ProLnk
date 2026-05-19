import { useState } from 'react';

const closetSituations = [
  'Existing Closet HVAC — Works Fine',
  'Existing Closet HVAC — Weak Airflow',
  'Existing Closet HVAC — High Bills',
  'Existing Closet HVAC — Moisture Issues',
  'Planning Closet Install',
];

type ClosetResult = { assessment: string; color: string; rating: string; considerations: string[]; improvements: string[]; cost: string };
const closetData: Record<string, ClosetResult> = {
  'Existing Closet HVAC — Works Fine': {
    assessment: 'Interior closet installations are among the best HVAC locations in DFW homes. You avoid the 30-40% efficiency penalty of attic installs and the equipment heat stress of garage installs. A working closet HVAC system in good shape is an asset — maintain it rather than relocate it.',
    color: '#4ADE80',
    rating: 'Optimal Configuration',
    considerations: [
      'Verify return air grille is unobstructed and appropriately sized — this is the most common long-term issue',
      'Condensate line needs quarterly treatment in DFW summers (algae growth is rapid above 90 degrees)',
      'Filter access matters for DFW dust — ensure filter slot is accessible without tools',
      'Closet door must have adequate ventilation or be louvered for return air',
    ],
    improvements: [
      'Add a secondary float switch for condensate overflow protection',
      'Upgrade to a 4-inch media filter for better DFW dust control',
      'Install a digital thermostat with humidity monitoring if not present',
      'Schedule annual maintenance to clean evaporator coil — DFW dust accumulates on coils',
    ],
    cost: 'Annual maintenance: $150-250. Float switch addition: $150-250. 4-inch filter upgrade: $200-400. Total optimization: $500-900.',
  },
  'Existing Closet HVAC — Weak Airflow': {
    assessment: 'Weak airflow in a closet HVAC system in DFW almost always points to return air restriction. The closet creates a sealed space — air must have a path in (return) and out (supply). When the return is undersized or blocked, static pressure builds and airflow to every room drops.',
    color: '#FBBF24',
    rating: 'Common — Usually Fixable',
    considerations: [
      'Return air grille in the closet door or adjacent wall is likely undersized for the system tonnage',
      'The closet door itself may be sealed too tightly — louvered doors are required or a transfer grille needed',
      'Check if closet has been modified (shelving, boxes) blocking return air path',
      'Dirty filter creates same symptom — check filter first before any other diagnosis',
    ],
    improvements: [
      'Add a louvered closet door or replace solid door with louvered version — most common fix',
      'Enlarge return air opening by cutting a larger grille opening (requires drywall work)',
      'Add a transfer grille between closet and adjacent hallway to improve return path',
      'Install a powered return air booster if structural limits prevent grille enlargement',
    ],
    cost: 'Louvered door replacement: $200-500 installed. Return air enlargement: $300-700. Transfer grille: $150-300. Booster fan: $200-500.',
  },
  'Existing Closet HVAC — High Bills': {
    assessment: 'High energy bills with closet HVAC in DFW typically come from one of three sources: the return air restriction causing the system to run longer, an aging unit losing efficiency, or duct leaks in the supply side. Closet location is not the cause — it is actually your most efficient option.',
    color: '#FBBF24',
    rating: 'Investigate and Fix',
    considerations: [
      'Return air restriction forces longer run times — address this first',
      'Evaporator coil dirt reduces heat transfer efficiency — DFW dust clogs coils faster than most markets',
      'Refrigerant charge — improper charge from leak or original install causes efficiency loss',
      'Equipment age — SEER ratings dropped significantly; older units may be SEER 10-12 vs modern SEER 18-20',
    ],
    improvements: [
      'Professional coil cleaning ($150-300) often recovers significant efficiency in DFW homes',
      'Refrigerant check and charge verification — proper charge can add 10-15% efficiency',
      'Duct leakage test — supply duct leaks waste 20-30% of conditioned air in DFW homes',
      'Equipment upgrade to SEER 18-20 if unit is over 12 years old — closet location maximizes new equipment performance',
    ],
    cost: 'Coil cleaning: $150-300. Refrigerant check: $150-250. Duct test and sealing: $400-1,200. Equipment upgrade: $6,000-12,000.',
  },
  'Existing Closet HVAC — Moisture Issues': {
    assessment: 'Moisture around a closet HVAC unit in DFW indicates condensate system problems — extremely common in DFW summers where units produce 4-8 gallons of condensate per day per ton. A closet install concentrates this risk in a small space where water damage can spread to adjacent walls and flooring rapidly.',
    color: '#F87171',
    rating: 'Address Immediately',
    considerations: [
      'Primary condensate drain is likely blocked by algae — DFW summer heat grows algae in drain lines within weeks',
      'Secondary drain pan may be missing or drain line may be absent — code requires secondary containment',
      'Float switch may be absent or failed — should cut system when pan fills',
      'Condensate pump (if present) may have failed — check pump operation',
    ],
    improvements: [
      'Flush condensate line with diluted bleach or vinegar and install algae treatment tabs (quarterly in DFW)',
      'Install a float switch if not present — code required, prevents water damage when drain clogs',
      'Verify secondary drain pan is present and properly routed to an observable location',
      'Consider condensate neutralizer if draining to sewer — some DFW municipalities require it',
      'Add a leak detection sensor on closet floor connected to smart home system',
    ],
    cost: 'Condensate flush and tabs: $100-200. Float switch: $150-250. Secondary drain pan: $200-400. Leak sensor: $50-150. Total: $500-1,000.',
  },
  'Planning Closet Install': {
    assessment: 'A properly designed interior closet installation is the best HVAC configuration for most DFW homes. It avoids attic heat penalties, garage IAQ concerns, and keeps equipment accessible. The critical design elements are return air sizing, condensate routing, and filter access.',
    color: '#4ADE80',
    rating: 'Excellent Choice for DFW',
    considerations: [
      'Return air: the closet needs a path for return air — louvered door, wall grille, or transfer grille sized to the system CFM',
      'The closet must be large enough for required service clearances — minimum 6 inches on all sides of the unit',
      'Condensate routing: plan the drain path before framing — primary and secondary drain lines need slope to exterior',
      'Filter access must be possible without moving the unit — design the filter slot location before installation',
    ],
    improvements: [
      'Spec a louvered door or large wall return grille into the design from the start',
      'Roughe in 3/4 inch PVC for both primary and secondary condensate lines to exterior',
      'Include a float switch in the design — cut-off protection is worth more than its cost',
      'Size the closet for the next equipment tier up — a unit going from 3-ton to 4-ton in 10 years should fit the same closet',
      'Add an electrical outlet inside the closet for a UV light addition later',
    ],
    cost: 'Closet modification for proper HVAC: $500-1,500 added to install. Properly designed closet install: $5,500-10,000 total system. Long-term ROI vs attic: significant.',
  },
};

const improvements = [
  { title: 'Return Air Sizing', desc: 'Most common closet HVAC problem in DFW. Rule: 1 square foot of free return air area per ton of cooling capacity.', icon: '🔄' },
  { title: 'Condensate Management', desc: 'DFW units produce 4-8 gal/day/ton in summer. Quarterly treatment prevents clogs. Float switch prevents water damage.', icon: '💧' },
  { title: 'Filter Access', desc: 'DFW dust is heavy. Monthly filter checks required June-September. Design for accessible filter slot.', icon: '🌬️' },
  { title: 'Louvered Door', desc: 'Solid doors on HVAC closets restrict return air. Louvered doors or transfer grilles are required for proper airflow.', icon: '🚪' },
];

export default function DFWHVACClosetInstall() {
  const [situation, setSituation] = useState('');
  const result = situation ? closetData[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🚪 DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Closet HVAC Installation in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          Interior closet HVAC installations are more efficient than attic installs in DFW — equipment stays in conditioned space, avoiding the 150-degree attic heat penalty. The critical factors are return air sizing, condensate drainage, and proper clearances.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {improvements.map(item => (
            <div key={item.title} style={{ background: '#0D2137', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#64748B', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Your Closet HVAC Situation</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {closetSituations.map(s => (
              <button key={s} onClick={() => setSituation(s)} style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid', borderColor: situation === s ? '#F5E642' : '#1E3A5F', background: situation === s ? '#F5E642' : '#0D2137', color: situation === s ? '#0A1628' : '#E8F4FD', fontWeight: situation === s ? 700 : 400, cursor: 'pointer', fontSize: 14, textAlign: 'left' }}>{s}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0D2137', border: `2px solid ${result.color}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: result.color, marginBottom: 6 }}>{result.rating}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.assessment}</div>
            </div>
            <div style={{ background: '#1E3A5F', border: '1px solid #2563EB', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 10 }}>DFW Closet HVAC Considerations</div>
              {result.considerations.map((c, i) => <div key={i} style={{ color: '#BFDBFE', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #93C5FD', fontSize: 14, lineHeight: 1.5 }}>{c}</div>)}
            </div>
            <div style={{ background: '#0D2A1A', border: '1px solid #22543D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 10 }}>Improvement Options</div>
              {result.improvements.map((imp, i) => <div key={i} style={{ color: '#BBF7D0', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #4ADE80', fontSize: 14 }}>{imp}</div>)}
            </div>
            <div style={{ background: '#0D2137', border: '1px solid #475569', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Cost Estimates</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.cost}</div>
            </div>
          </div>
        )}
        {!result && (
          <div style={{ background: '#0D2137', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748B' }}>Select your closet HVAC situation above to see considerations and improvement options</div>
        )}
      </div>
    </div>
  );
}
