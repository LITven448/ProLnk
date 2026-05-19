import { useState } from 'react';

const roofDescriptions = [
  { id: 'flat', label: '🟰 Very Low / Flat', desc: 'Looks nearly flat from yard' },
  { id: 'standard', label: '📐 Gentle Slope', desc: 'Slight pitch, common DFW home' },
  { id: 'medium', label: '🔼 Moderate Slope', desc: 'Clearly pitched, walkable' },
  { id: 'steep', label: '⛰️ Steep Slope', desc: 'Hard to walk without harness' },
];

const guideMap: Record<string, { title: string; points: string[]; pitch: string }> = {
  flat: {
    pitch: 'Under 3:12',
    title: 'Low Slope / Flat Roof in DFW (Under 3:12)',
    points: [
      'Pitch classification: under 3:12 — rises less than 3 inches per 12 inches of run',
      'Standard asphalt shingles are NOT approved for under 3:12 slope',
      'DFW low slope requires: modified bitumen, TPO, or EPDM membrane roofing',
      'DFW heat is brutal on low-slope membranes — light-colored TPO reflects heat',
      'Standing water risk: critical to maintain drains and scuppers in DFW storms',
      'Insurance note: some DFW carriers rate low-slope differently — verify with agent',
      'Cost: $8–$15/sq ft installed for TPO on DFW low-slope residential',
    ],
  },
  standard: {
    pitch: '4:12',
    title: '4:12 Pitch — Most Common DFW Home',
    points: [
      '4:12 is the most common DFW residential roof pitch (rises 4″ per 12″ of run)',
      'All standard asphalt shingles approved: GAF HDZ, Owens Corning Duration, etc.',
      'Good drainage for DFW storms — water sheds fast enough to avoid pooling',
      'Walkable by experienced DFW roofers without harness on dry days',
      'Standard labor rates apply — not considered steep in DFW contractor pricing',
      'Most DFW homes 1980–2010 are 4:12 — your contractor knows this pitch well',
      'Ventilation: standard ridge vent + soffit vent system works at 4:12',
    ],
  },
  medium: {
    pitch: '6:12',
    title: '6:12 Pitch — Better Drainage, Higher Labor in DFW',
    points: [
      '6:12 pitch: rises 6 inches per 12 inches of run',
      'Better long-term shingle life — water exits faster, less UV and heat stress',
      'DFW roofers add steep-slope surcharge at 6:12 — typically $50–$100/sq extra',
      'Harness required by OSHA on 6:12 — verify contractor is compliant',
      'All standard shingles approved including GAF HDZ',
      'Common on DFW custom homes and older traditional-style neighborhoods',
      'Ventilation: may require more ridge vent length for proper attic air exchange',
    ],
  },
  steep: {
    pitch: '8:12+',
    title: '8:12+ Steep Slope — Specialty Installation in DFW',
    points: [
      '8:12 and above: rises 8+ inches per 12 inches of run',
      'Requires full safety system — scaffolding or roof jacks in DFW',
      'Specialty labor surcharge: $150–$250/sq above standard DFW rates',
      'Shingle installation technique changes — hand-sealing tabs often required',
      'Limited DFW contractors certified for steep: fewer bids, longer waits',
      'Excellent long-term performance in DFW — rain and hail shed immediately',
      'Most GAF and Owens Corning warranties require hand-sealing on 12:12+',
    ],
  },
};

export default function DFWRoofingDFWPitchStandard2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          📐 DFW Standard Roof Pitch Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Your roof pitch determines what materials are allowed, how much labor costs, and which DFW contractors can bid your job. Know yours before calling.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📏 How to Measure Your DFW Pitch</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            Place a level on your roof slope. Measure 12 inches horizontally. At the 12-inch mark, measure vertically up to the underside of the level. That vertical number is your pitch (e.g., <strong style={{ color: '#F5E642′ }}>4 inches = 4:12 pitch</strong>).
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>Describe Your DFW Roof</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {roofDescriptions.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id)}
              style={{ background: selected === r.id ? '#F5E642′ : '#1e293b', color: selected === r.id ? '#0A1628' : '#fff', border: '2px solid' + (selected === r.id ? ' #F5E642' : ' #334155'), borderRadius: 8, padding: '1rem', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{r.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{r.desc}</div>
            </button>
          ))}
        </div>

        {selected && guideMap[selected] && (
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 1rem', display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Likely Pitch: {guideMap[selected].pitch}</span>
            </div>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>{guideMap[selected].title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {guideMap[selected].points.map((p, i) => (
                <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155', color: '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
          ProLnk DFW Roofing Resource · Updated 2026
        </div>
      </div>
    </div>
  );
}