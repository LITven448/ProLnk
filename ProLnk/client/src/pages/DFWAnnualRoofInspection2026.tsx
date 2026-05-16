import { useState } from 'react';

const roofTypes = ['Asphalt Shingles', 'Metal Roof', 'Tile Roof', 'Flat/TPO Roof'];
const roofAges = ['Under 5 years', '5-10 years', '11-20 years', '20+ years'];

const baseChecklist = [
  '🔍 Look for missing, lifted, or curling shingles/panels',
  '🔩 Inspect flashing at all roof penetrations (vents, chimney, skylights)',
  '🏠 Check ridge cap for gaps or displacement',
  '💧 Inspect gutters for granule accumulation (wear indicator)',
  '🍃 Clear gutters and downspouts of debris',
  '📐 Verify downspouts extend 6ft or more from foundation',
  '🌳 Trim branches within 6 feet of roof surface',
  '🕳️ Check fascia and soffits for rot or pest entry points',
];

const typeExtras: Record<string, string[]> = {
  'Asphalt Shingles': [
    '📊 Check for granule loss in gutters (major wear indicator)',
    '🔄 Look for blistering or cupping on shingle surfaces',
    '📅 Confirm age — DFW shingles average 15-20 years in heat/hail cycle',
  ],
  'Metal Roof': [
    '🔩 Check all fasteners and screws for backing out',
    '🦀 Inspect seams and overlaps for rust or separation',
    '🔊 Verify ridge cap screws are sealed with butyl tape',
  ],
  'Tile Roof': [
    '🧩 Look for cracked or missing tiles (walk from ground with binoculars)',
    '🔲 Check underlayment exposure at any broken tile locations',
    '🏗️ Inspect mortar at ridge tiles and hip caps',
  ],
  'Flat/TPO Roof': [
    '💧 Check for ponding water (should drain within 48 hours)',
    '🔗 Inspect seams and termination bars for separation',
    '🏗️ Check flashing at all curbs, drains, and HVAC equipment bases',
    '🌡️ Look for bubbles or blisters in membrane surface',
  ],
};

const ageNotes: Record<string, string> = {
  'Under 5 years': 'Your roof is in the early phase — focus on storm damage after each hail event.',
  '5-10 years': 'Mid-life — watch flashing carefully and track granule loss in gutters.',
  '11-20 years': 'Late-life asphalt shingles enter high-risk zone in DFW. Budget for replacement.',
  '20+ years': 'Roof replacement likely overdue. Get a full inspection and written report from a roofer.',
};

export default function DFWAnnualRoofInspection2026() {
  const [roofType, setRoofType] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const extraItems = roofType ? typeExtras[roofType] : [];
  const allItems = [...baseChecklist, ...extraItems];
  const doneCount = allItems.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E2E8F0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Annual Roof Inspection Checklist 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>DFW hail season (March-June) demands biannual roof checks — spring and fall at minimum.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Select Your Roof Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {roofTypes.map(t => (
              <button key={t} onClick={() => { setRoofType(t); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: roofType === t ? '#F5E642' : '#1E3A5F', background: roofType === t ? '#F5E642' : 'transparent', color: roofType === t ? '#0A1628' : '#94A3B8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {t}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Roof Age</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {roofAges.map(a => (
              <button key={a} onClick={() => setRoofAge(a)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: roofAge === a ? '#F5E642' : '#1E3A5F', background: roofAge === a ? '#F5E642' : 'transparent', color: roofAge === a ? '#0A1628' : '#94A3B8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {roofAge && (
          <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 16, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>Age Note: </span>
            <span style={{ color: '#CBD5E1', fontSize: 14 }}>{ageNotes[roofAge]}</span>
          </div>
        )}

        {roofType && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>{roofType} Checklist</h2>
              <span style={{ background: doneCount === allItems.length ? '#16A34A' : '#1E3A5F', color: doneCount === allItems.length ? '#fff' : '#94A3B8', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{doneCount}/{allItems.length}</span>
            </div>
            {allItems.map(item => (
              <div key={item} onClick={() => toggleItem(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#334155', background: checked[item] ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {checked[item] && <span style={{ color: '#0A1628', fontSize: 13, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ color: checked[item] ? '#64748B' : '#E2E8F0', fontSize: 14, textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk connects you with vetted DFW roofing pros — prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
