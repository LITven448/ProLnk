import { useState } from 'react';

const rooms = [
  { id: 'living', label: '🛋 Living / Family Room', tips: ['Layer: ambient (recessed) + task (floor lamp) + accent (wall sconces)', '2700–3000K LED for warm evening atmosphere', 'Dimmer switches on all circuits (10% usage = 90% less glare)', 'Solar shades on west-facing windows — DFW afternoon sun causes glare and UV fade', 'Smart bulbs for circadian dimming after 7pm'] },
  { id: 'kitchen', label: '🍳 Kitchen', tips: ['Under-cabinet LED strips for task lighting (3000–4000K)', 'Recessed lighting over island (no pendant shadows)', 'Window film on east-facing windows — DFW morning sun creates cooking glare', 'Dimmer on dining area separate from task zone', '90+ CRI LEDs for accurate food color assessment'] },
  { id: 'bedroom', label: '🛏 Bedroom', tips: ['Blackout cellular shades — DFW sun rises 6:15am in summer', '2200–2700K amber LEDs only (no blue light after sunset)', 'Smart bulbs: auto-dim to 1% at 9pm for circadian support', 'No overhead fluorescent — only bedside lamps after dark', 'Solar shades for daytime privacy without blocking daylight'] },
  { id: 'office', label: '💻 Home Office', tips: ['4000–5000K LED for daytime alertness and focus', 'Position monitor perpendicular to windows — never facing them', 'Anti-glare window film on south/west walls', 'Bias lighting behind monitor (6500K, 10% screen brightness)', 'Smart bulbs: shift to 2700K after 5pm automatically'] },
  { id: 'outdoor', label: '🌿 Outdoor / Landscape', tips: ['Motion-activated security lighting (150–250 lumen) at all entry points', 'Path lighting (solar or low-voltage 12V) for safety', 'Uplighting for trees — DFW live oaks look stunning lit from below', 'Avoid harsh blue-white LEDs: warm 2700K for security lights', 'Timer or dusk-to-dawn sensor — not always-on (energy + neighbor courtesy)'] },
];

const uvFacts = [
  { icon: '🪵', item: 'Hardwood floors', fade: '2–5 years', fix: 'UV-blocking window film' },
  { icon: '🛋', item: 'Upholstered furniture', fade: '3–7 years', fix: 'Solar shades or film' },
  { icon: '🖼', item: 'Artwork / photos', fade: '1–3 years', fix: 'Museum glass or film' },
  { icon: '🪟', item: 'Window film (3M/Llumar)', blocks: '99% UV', cost: '$8–15/sq ft installed' },
];

export default function DFWLightingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = rooms.find(r => r.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>DFW HOME HEALTH 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💡 DFW Home Lighting Guide 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Texas gets 230+ sunny days per year. That sun is both an asset (natural light, vitamin D) and a liability (UV damage to floors and furniture, heat gain, glare). Smart lighting strategy addresses both.</p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌞 UV Damage Timeline — DFW Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {uvFacts.map((f, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{f.item}</div>
                <div style={{ fontSize: 12, color: '#E57373', marginTop: 4 }}>{f.fade ? `Fades in: ${f.fade}` : `Blocks: ${f.blocks}`}</div>
                <div style={{ fontSize: 12, color: '#8899BB', marginTop: 2 }}>{f.fix || f.cost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🏠 Room Type → Lighting Strategy</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {rooms.map(r => (
              <button key={r.id} onClick={() => setSelected(r.id === selected ? null : r.id)}
                style={{ background: selected === r.id ? '#F5E642' : '#1C2E4A', color: selected === r.id ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {r.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>Lighting tips for {active.label}:</div>
              {active.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0, marginTop: 1 }}>→</span>
                  <span style={{ fontSize: 14, lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Upgrade your DFW home lighting?</div>
          <div style={{ fontSize: 13, color: '#8899BB' }}>ProLnk connects you with licensed electricians, window film installers, and smart home specialists across the Metroplex.</div>
        </div>
      </div>
    </div>
  );
}
