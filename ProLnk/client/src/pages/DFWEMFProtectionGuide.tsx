import { useState } from 'react';

type Concern = '' | 'panel-bedroom' | 'smart-meter' | 'wiring' | 'general';

const emfSources = [
  { source: 'Main Electrical Panel', icon: '⚡', field: 'Magnetic field strongest within 1 ft; drops to background at 3 ft.', dfw: 'Panels are typically in utility closets or garages in DFW homes. If yours is on a bedroom wall, the room on the other side may have elevated fields at the panel location.' },
  { source: 'Smart Meter (Oncor)', icon: '📡', field: 'RF pulses every 4–30 seconds to report usage. Magnetic/electric field from meter wiring is similar to any meter.', dfw: 'Oncor\’s smart meters transmit at low wattage (~1W peak). At 3+ ft from the meter exterior wall, RF exposure is below FCC limits by a significant margin.' },
  { source: 'In-Wall Wiring', icon: '🔌', field: 'Balanced wiring (Romex) produces minimal net field because hot and neutral cancel. Older knob-and-tube (separated conductors) produces higher fields.', dfw: 'Pre-1960 DFW homes may have knob-and-tube wiring with elevated fields. Most post-1970 DFW homes use Romex with minimal field.' },
  { source: 'Power Lines (Overhead)', icon: '🔋', field: 'Distribution lines (the ones on poles in DFW neighborhoods) produce fields that drop to background at 50–100 ft.', dfw: 'DFW\’s distribution network is overhead in most neighborhoods. At the property line of a typical DFW lot, fields from street lines are typically well below 2 mG.' },
];

const adviceMap: Record<Exclude<Concern, ''>, { summary: string; actions: string[]; science: string }> = {
  'panel-bedroom': {
    summary: 'Panel on a shared bedroom wall',
    actions: [
      'Move bed at least 3 ft from the wall where the panel is located.',
      'For additional peace of mind: move bed to the opposite wall or another room.',
      'Have a licensed DFW electrician confirm the panel is properly grounded — improper grounding increases stray fields.',
      'Consider panel relocation to an exterior wall or garage if renovation allows.',
    ],
    science: 'Magnetic fields from residential panels drop rapidly with distance (inverse square law). At 3 ft, fields typically measure 0.5–2 mG — within the range of normal household background. The WHO and EPA classify residential ELF-EMF as "possibly carcinogenic" (same category as coffee) based on weak epidemiological associations; no established mechanism of harm at typical residential levels exists.',
  },
  'smart-meter': {
    summary: 'Oncor smart meter concern',
    actions: [
      'Simply maintain 3 ft distance from the exterior wall where the meter is mounted — this is sufficient to be well below FCC RF exposure limits.',
      'Do not attach a bed or desk chair directly to that exterior wall on the interior side.',
      'You can request a meter read opt-out from Oncor for a fee if you prefer a non-transmitting meter.',
      'Have an electrician verify the meter base wiring is in good condition — corroded connections increase magnetic fields.',
    ],
    science: 'Oncor smart meters use Zigbee or RF mesh at 900 MHz. Peak transmit power is under 1W. At 3 ft through a wall, exposure is a tiny fraction of FCC limits. Multiple independent agencies (FCC, EPRI, WHO) have found no evidence of harm from smart meter RF at typical residential distances.',
  },
  'wiring': {
    summary: 'Older DFW home wiring concern',
    actions: [
      'Have a licensed DFW electrician inspect for knob-and-tube wiring — separated hot/neutral conductors produce higher fields than Romex.',
      'If knob-and-tube is present, rewiring with Romex reduces fields and is also a safety upgrade (K&T cannot support modern loads).',
      'Ensure all circuits are balanced — running a single conductor through a wall without its paired return increases fields significantly.',
      'Verify all metal boxes and conduit are properly grounded.',
    ],
    science: 'Balanced wiring (Romex, conduit with hot + neutral together) produces near-zero net magnetic field because the opposing currents cancel. Knob-and-tube wiring separates conductors and produces fields proportional to current and separation distance. Rewiring is the only effective mitigation — EMF shielding paint does not block low-frequency magnetic fields.',
  },
  'general': {
    summary: 'General EMF inventory for your DFW home',
    actions: [
      'Largest sources in a typical DFW home: the main panel, the electric range/oven, electric dryer, and HVAC compressor — all localized and drop to background within 3 ft.',
      'Distance is the most effective and free mitigation — do not sleep or spend extended hours directly against walls with panels or high-current wiring.',
      'Keep phones and tablets off the bed while charging — chargers produce small fields at contact distance.',
      'A gaussmeter ($30–$100) lets you measure actual field levels in any room if you want data, not estimates.',
    ],
    science: 'The science on residential EMF is genuinely mixed. Non-ionizing ELF fields at typical household strengths have no established mechanism for DNA damage. Epidemiological studies have found weak statistical associations (relative risk ~1.5–2x) between childhood leukemia and measured fields above 3–4 mG. Most DFW homes measure well below this threshold. Prudent avoidance (distance) costs nothing and addresses the concern without expensive shielding products of unproven effectiveness.',
  },
};

export default function DFWEMFProtectionGuide() {
  const [concern, setConcern] = useState<Concern>('');

  const advice = concern ? adviceMap[concern] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏠 DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>EMF Protection Guide for DFW Homeowners</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Every home has EMF sources. This guide explains what they are in DFW homes, what the science actually says,
          and practical steps you can take — without buying expensive products that don't work.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📡 EMF Sources in DFW Homes</h2>
          {emfSources.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, padding: '12px', background: '#162035', borderRadius: 8 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{s.source}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5, marginBottom: 6 }}>{s.field}</div>
                <div style={{ color: '#64748B', fontSize: 12, lineHeight: 1.5 }}>🏙️ DFW: {s.dfw}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8', fontSize: 14 }}>What's your specific situation or concern?</label>
          <select value={concern} onChange={e => setConcern(e.target.value as Concern)}
            style={{ width: '100%', padding: '12px 16px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 16 }}>
            <option value="">— select your concern —</option>
            <option value="panel-bedroom">Electrical panel is on a bedroom wall</option>
            <option value="smart-meter">Oncor smart meter on my home</option>
            <option value="wiring">Older DFW home — concerned about wiring</option>
            <option value="general">General EMF inventory for my home</option>
          </select>
        </div>

        {advice && (
          <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>{advice.summary}</h2>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#E8F0FE', fontWeight: 700, marginBottom: 10 }}>✅ Protection Steps</div>
              {advice.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <p style={{ color: '#CBD5E1', lineHeight: 1.5, margin: 0, fontSize: 14 }}>{a}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #3B82F6' }}>
              <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: 6 }}>🔬 What the Science Says</div>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, margin: 0, fontSize: 13 }}>{advice.science}</p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Want a licensed DFW electrician to inspect your panel grounding and wiring?</p>
          <a href="/get-quote" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Get a Free DFW Electrical Inspection Quote</a>
        </div>
      </div>
    </div>
  );
}
