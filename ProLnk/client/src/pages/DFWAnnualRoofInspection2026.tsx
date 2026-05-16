import { useState } from 'react';

const roofTypes = ['Asphalt Shingles', 'Metal Roof', 'Tile Roof', 'Flat/TPO'];
const ageRanges = ['0-5 years', '6-12 years', '13-20 years', '20+ years'];

const baseChecklist = [
  '🔍 Binoculars scan: missing, lifted, or cracked shingles/panels',
  '🔩 Check flashing at all penetrations (chimney, vents, skylights)',
  '🏔️ Inspect ridge cap condition and alignment',
  '🍂 Clear gutters and inspect for granule accumulation',
  '💧 Check downspouts — verify extension away from foundation',
  '🌿 Remove any tree limbs within 6 feet of roof surface',
  '🕳️ Check fascia and soffit for rot, gaps, or pest entry points',
];

const priorityMap: Record<string, string[]> = {
  'Asphalt Shingles': ['📊 Measure granule loss in gutters — heavy loss signals end of life', '🔵 Check for cupping or curling shingles (moisture damage sign)', '🟡 Spot check nail pops — reseal exposed nail heads'],
  'Metal Roof': ['🔩 Check exposed fastener panels for backed-out screws', '🔩 Inspect lap seams and ridge cap seals for separation', '🟡 Look for rust staining at seams or fasteners'],
  'Tile Roof': ['🔴 Walk inspection by professional only — tiles crack under foot traffic', '🔴 Check for cracked or slipped tiles at valleys and hips', '🟡 Inspect underlayment condition at any lifted tiles'],
  'Flat/TPO': ['🔴 Check all seams and flashings after every hail event', '💧 Look for standing water (ponding) — improper drainage accelerates failure', '🟡 Inspect roof penetrations and pipe boots for seal condition'],
};

const ageNotes: Record<string, string> = {
  '0-5 years': 'Biannual inspection is preventive — document condition for warranty claims.',
  '6-12 years': 'Mid-life inspection critical. First signs of wear appear. Check warranty status.',
  '13-20 years': 'Asphalt shingles average 20-25 yr lifespan in DFW heat. Start planning replacement budget.',
  '20+ years': 'Full replacement assessment recommended. Insurance companies may require updates.',
};

export default function DFWAnnualRoofInspection2026() {
  const [roofType, setRoofType] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (item: string) =>
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));

  const extraItems = roofType ? priorityMap[roofType] : [];
  const allItems = [...baseChecklist, ...extraItems];
  const done = allItems.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#E8F4FD' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Annual Roof Inspection Checklist 2026</h1>
          <p style={{ color: '#8BA3BC', fontSize: 14 }}>Biannual inspection recommended in DFW (spring after hail season + fall before winter)</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 10 }}>Roof Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {roofTypes.map(t => (
              <button key={t} onClick={() => { setRoofType(t); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: roofType === t ? '#F5E642' : '#1E3A5F', background: roofType === t ? '#F5E642' : 'transparent', color: roofType === t ? '#0A1628' : '#E8F4FD', fontWeight: 600, cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 10 }}>Roof Age</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {ageRanges.map(a => (
              <button key={a} onClick={() => setRoofAge(a)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: roofAge === a ? '#F5E642' : '#1E3A5F', background: roofAge === a ? '#F5E642' : 'transparent', color: roofAge === a ? '#0A1628' : '#E8F4FD', fontWeight: 600, cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>
          {roofAge && <p style={{ color: '#8BA3BC', fontSize: 13, marginTop: 12, marginBottom: 0 }}>💡 {ageNotes[roofAge]}</p>}
        </div>

        {(roofType || allItems.length > 0) && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: 0 }}>Inspection Checklist</h2>
              <span style={{ color: done === allItems.length ? '#4ADE80' : '#8BA3BC', fontWeight: 600 }}>{done}/{allItems.length} ✓</span>
            </div>
            {allItems.map(item => (
              <div key={item} onClick={() => toggle(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#1E3A5F', background: checked[item] ? '#F5E642' : 'transparent', flexShrink: 0 }} />
                <span style={{ color: checked[item] ? '#8BA3BC' : '#E8F4FD', textDecoration: checked[item] ? 'line-through' : 'none', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#3D5A80', fontSize: 12, marginTop: 24 }}>ProLnk · DFW Roof Inspection Guide 2026</p>
      </div>
    </div>
  );
}