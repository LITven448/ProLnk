import { useState } from 'react';

const concerns = [
  { id: 'leaks', label: 'Leaks After DFW Storms', icon: '🌧️' },
  { id: 'newroof', label: 'Replacing Roof Before Storm Season', icon: '🏗️' },
  { id: 'shape', label: 'Have a Gable Roof', icon: '🏠' },
  { id: 'valley', label: 'Complex Roof with Valleys', icon: '📐' },
];

const guides: Record<string, { title: string; detail: string; tips: string[] }> = {
  leaks: {
    title: 'Wind-Driven Rain Likely Found an Entry Point',
    detail: 'DFW severe storms can drive rain at near-horizontal angles. Standard shingle installation assumes gravity-fed rain. If your roof leaked during a storm but not during gentle rain, wind-driven penetration is the likely cause.',
    tips: ['Check drip edge at eaves — missing or improperly lapped drip edge is a top DFW entry point', 'Inspect step flashing at all wall-to-roof junctions', 'Verify ice and water shield extends 24" past the interior wall line at all eaves', 'Look for lifted shingle tabs after any 60+ mph DFW event'],
  },
  newroof: {
    title: 'Install Maximum Wind-Driven Rain Protection Now',
    detail: 'DFW storm season runs March through June, with a secondary peak in September. Before replacing, specify these upgrades to protect against wind-driven rain penetration.',
    tips: ['Ice and water shield: entire roof field for best protection, minimum 6 ft from eaves', 'Synthetic underlayment: 10x more wind-driven rain resistant than felt paper', 'Sealed nail zones: hand-seal every nail penetration in storm zones', 'Hip roof design over gable wherever possible — reduces wind-driven rain exposure by 30%'],
  },
  shape: {
    title: 'Gable Roofs Are Most Vulnerable in DFW',
    detail: 'Gable roofs present large flat surfaces perpendicular to wind. In DFW\'s frequent straight-line wind events, gable ends receive direct pressure that drives rain under soffits and into the attic. Hip roofs shed wind from all directions.',
    tips: ['Brace gable end walls from inside attic (IBHS recommends 2x4 bracing)', 'Seal all gable vent openings with wind-driven rain baffles', 'Check gable soffit condition after every storm over 60 mph', 'Consider hip-to-gable roof conversion when reroofing — adds significant storm resilience'],
  },
  valley: {
    title: 'Open Valleys Are High-Risk in DFW Storms',
    detail: 'Valley intersections concentrate water flow. During DFW high-intensity rain events (2-3 inches per hour is common), valleys can be overwhelmed — especially if flashing is undersized or corroded.',
    tips: ['W-metal valley flashing minimum 24" wide for DFW rain intensity', 'Ice and water shield under all valley flashing', 'Closed-cut or woven valleys fail more often in DFW — open metal valley performs best', 'Check valley flashing for rust or uplift after hail events'],
  },
  default: {
    title: 'Select Your DFW Storm Concern',
    detail: 'Choose the option that matches your situation to get a wind-driven rain protection guide specific to DFW storms.',
    tips: [],
  },
};

export default function DFWRoofingWindDrivenRain2026() {
  const [selected, setSelected] = useState<string>('');
  const guide = selected ? (guides[selected] || guides['default']) : guides['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌪️</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Wind-Driven Rain Roof Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>
          DFW storms drive rain horizontally. Standard roofs aren't tested for this — but yours can be built to handle it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['DFW Storm Angle', '🌧️', 'Rain driven at up to 110° — near horizontal in severe storms'], ['Peak Season', '📅', 'March–June primary, Sept secondary'], ['Hip vs. Gable', '🏠', 'Hip roofs outperform gable in DFW wind events by ~30%']].map(([label, icon, desc]) => (
            <div key={label as string} style={{ background: '#0f2040', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⛈️ Your DFW Storm Concern</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)} style={{ background: selected === c.id ? '#F5E642' : '#1a2f4e', color: selected === c.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === c.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ marginRight: 8 }}>{c.icon}</span>{c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f4e', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642', marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 17 }}>{guide.title}</h3>
            <p style={{ color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6, fontSize: 14 }}>{guide.detail}</p>
            {guide.tips.length > 0 && (
              <>
                <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12, marginBottom: 8 }}>PROTECTION STEPS</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#cbd5e1', fontSize: 14, lineHeight: 1.9 }}>
                  {guide.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </>
            )}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 15 }}>🛡️ The One Upgrade That Matters Most</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>Ice and water shield — a self-sealing rubberized membrane — is the single most effective wind-driven rain defense. In DFW, specify it for the full roof field, not just the first two courses. It self-seals around every nail and prevents water from tracking beneath lifted shingles during severe storms.</p>
        </div>

        <p style={{ color: '#475569', fontSize: 12, marginTop: 24, textAlign: 'center' }}>ProLnk DFW Home Intelligence · 2026</p>
      </div>
    </div>
  );
}