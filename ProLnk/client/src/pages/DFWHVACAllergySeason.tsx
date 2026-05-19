import { useState } from 'react';

const allergySeasons = [
  {
    name: 'Cedar Fever',
    months: 'December - February',
    peak: 'January',
    severity: 'Worst',
    allergen: 'Mountain Cedar / Ashe Juniper',
    hvacActions: [
      'Switch to MERV-13 or higher filter immediately',
      'Run fan continuously to maintain filtration',
      'Seal any duct leaks before season starts',
      'Add UV light to air handler to neutralize particles',
    ],
    filterRec: 'MERV-13 or MERV-16. Change every 30 days during peak.',
    tip: 'Cedar pollen is so fine it bypasses standard filters. Do NOT use fiberglass filters in January.',
  },
  {
    name: 'Oak Pollen',
    months: 'March - April',
    peak: 'Late March',
    severity: 'High',
    allergen: 'Live Oak, Red Oak, Post Oak',
    hvacActions: [
      'Replace cedar-season filter before oak season',
      'Keep windows closed even on nice days',
      'Run dehumidifier — mold spores spike alongside oak pollen',
      'Consider whole-home air purifier with HEPA stage',
    ],
    filterRec: 'MERV-11 minimum. Change every 45 days.',
    tip: 'Oak pollen is visible yellow dust on cars. When you see it, your filter is catching it.',
  },
  {
    name: 'Grass Pollen',
    months: 'May - September',
    peak: 'June - July',
    severity: 'Moderate-High',
    allergen: 'Bermuda, St. Augustine, Johnson Grass',
    hvacActions: [
      'Ensure condensate drain is clear — humidity control critical',
      'Inspect evaporator coil for mold growth',
      'Set thermostat to "auto" fan to reduce recirculation',
      'Keep humidity below 50% indoors to limit mold amplification',
    ],
    filterRec: 'MERV-8 to MERV-11. Change every 60 days.',
    tip: 'Grass season overlaps with peak cooling. Dirty filters reduce both air quality and efficiency.',
  },
  {
    name: 'Fall Ragweed',
    months: 'August - November',
    peak: 'September - October',
    severity: 'Moderate',
    allergen: 'Common Ragweed, Giant Ragweed',
    hvacActions: [
      'Pre-season coil cleaning before heavy pollen drop',
      'Check outdoor unit fins — ragweed debris clogs coils',
      'Prepare for transition from cooling to heating season',
      'Schedule annual tune-up to clear pollen from system',
    ],
    filterRec: 'MERV-8. Change every 60 days. Annual tune-up in October.',
    tip: 'Fall ragweed is lighter than oak but travels farther. Outdoor coil cleaning matters as much as filter.',
  },
];

export default function DFWHVACAllergySeason() {
  const [selected, setSelected] = useState(0);
  const season = allergySeasons[selected];

  const severityColor: Record<string, string> = {
    'Worst': '#EF4444',
    'High': '#F97316',
    'Moderate-High': '#EAB308',
    'Moderate': '#22C55E',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF2', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌿</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW HVAC Allergy Season Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>The four DFW allergy seasons and how your HVAC system fights back</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>🗓️ Select Allergy Season</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {allergySeasons.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ backgroundColor: selected === i ? '#F5E642′ : '#1A2E4A', color: selected === i ? '#0A1628' : '#E8EDF2', border: ’none', borderRadius: '8px', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textAlign: 'left', transition: 'all 0.2s' }}>
                <div>{s.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.75, marginTop: '0.2rem' }}>{s.months}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E4A', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid #F5E642′ }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h2 style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>{season.name}</h2>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{season.months} | Peak: {season.peak}</p>
            </div>
            <span style={{ backgroundColor: severityColor[season.severity], color: '#fff', borderRadius: '6px', padding: '0.3rem 0.75rem', fontWeight: 700, fontSize: '0.85rem' }}>{season.severity}</span>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
            <span style={{ color: '#94A3B8′ }}>Primary allergen: </span><span style={{ color: '#F5E642', fontWeight: 600 }}>{season.allergen}</span>
          </div>
          <h3 style={{ color: '#E8EDF2', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>HVAC Actions to Take</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', marginBottom: '1rem' }}>
            {season.hvacActions.map((a, i) => (
              <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #1A2E4A', fontSize: '0.9rem', color: '#E8EDF2', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>{a}
              </li>
            ))}
          </ul>
          <div style={{ backgroundColor: '#0D1B2E', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '0.25rem' }}>Filter Recommendation</div>
            <div style={{ fontSize: '0.95rem', color: '#F5E642', fontWeight: 600 }}>{season.filterRec}</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#94A3B8', fontStyle: 'italic' }}>💡 Pro tip: {season.tip}</div>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡️</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk matches you with DFW HVAC pros who know your allergy season schedule and pre-season prep needs.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Find an Allergy-Season HVAC Pro</button>
        </div>
      </div>
    </div>
  );
}
