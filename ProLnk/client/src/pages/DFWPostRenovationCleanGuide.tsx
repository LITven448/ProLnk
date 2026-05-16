import { useState } from 'react';

const renovationTypes = ['Kitchen remodel', 'Bathroom remodel', 'Full room addition', 'Flooring replacement', 'Exterior / roof work'];
const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', '4,000+ sq ft'];

function getPostRenovationPlan(reno: string, size: string) {
  const large = size === '4,000+ sq ft' || size === '2,500–4,000 sq ft';
  const dusty = reno === 'Full room addition' || reno === 'Flooring replacement' || reno === 'Kitchen remodel';
  const exterior = reno === 'Exterior / roof work';

  const sequence = [
    '1️⃣ Change ALL HVAC filters immediately — renovation dust ruins A-coils',
    '2️⃣ Seal off and clean air vents in renovation zone before general cleaning',
    dusty ? '3️⃣ HEPA vacuum all surfaces top-to-bottom (drywall dust is fine particulate)' : '3️⃣ Dry wipe all flat surfaces before any wet cleaning',
    '4️⃣ Clean window tracks and sills — contractor debris collects here',
    exterior ? '5️⃣ Power wash all exterior surfaces — DFW clay soil + roofing debris' : '5️⃣ Mop hard floors with microfiber (standard mops spread dust)',
    '6️⃣ Final HEPA vacuum carpets and rugs in adjacent rooms',
    large ? '7️⃣ Professional air scrubbing recommended for large-scale renovations' : '7️⃣ Run air purifier 48 hours post-clean',
  ];

  const hvacSchedule = [
    '📅 Immediately: Replace 1" filters, check 4" media filters',
    dusty ? '📅 Week 1: Inspect again — drywall dust clogs filters in 5–7 days' : '📅 Week 2: First follow-up filter check',
    '📅 Month 1: Full filter replacement regardless of appearance',
    '📅 Month 3: Schedule professional duct cleaning if renovation was extensive',
  ];

  const cost = large
    ? reno === 'Full room addition' ? '$600–$1,400 professional clean' : '$400–$900 professional clean'
    : reno === 'Full room addition' ? '$350–$700 professional clean' : '$200–$450 professional clean';

  const dfwNotes = [
    '🌿 DFW clay soil tracked by workers is extremely abrasive on hardwood floors — clean within 24 hours',
    '💨 DFW wind during spring/fall can redeposit outdoor dust daily — close windows during cleanup',
    exterior ? '🏗️ Roofing granules and tar debris require specialized cleanup — not standard cleaning' : '🧱 Concrete dust from floor work requires pH-neutral cleaners, not acidic',
  ];

  return { sequence, hvacSchedule, cost, dfwNotes };
}

export default function DFWPostRenovationCleanGuide() {
  const [reno, setReno] = useState('');
  const [size, setSize] = useState('');
  const result = reno && size ? getPostRenovationPlan(reno, size) : null;

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 14 }}>
      <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {items.map(item => <li key={item} style={{ color: '#CBD5E1' }}>{item}</li>)}
      </ul>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🏗️ DFW POST-RENO CLEAN</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Post-Renovation Cleaning Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Drywall dust, concrete residue, paint overspray, and DFW clay soil tracked by workers create a unique cleanup challenge. Sequence matters — clean in the wrong order and you'll redistribute debris.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🫁', label: 'Drywall Dust', note: 'Fine particulate — HEPA only' },
            { icon: '💧', label: 'Paint Residue', note: 'Wipe before it cures' },
            { icon: '🌿', label: 'Clay Soil', note: 'DFW workers track it everywhere' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F1F3D', borderRadius: 10, padding: 14, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{s.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🛠️ Build My Cleanup Plan</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>RENOVATION TYPE</label>
              <select value={reno} onChange={e => setReno(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select renovation type...</option>
                {renovationTypes.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOME SIZE</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select home size...</option>
                {homeSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 16, border: '1px solid #1E3A5F', marginBottom: 16 }}>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>ESTIMATED PROFESSIONAL COST</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginTop: 4 }}>{result.cost}</div>
            </div>
            <Section title="🔢 Cleanup Sequence" items={result.sequence} />
            <Section title="❄️ HVAC Filter Schedule" items={result.hvacSchedule} />
            <Section title="🌿 DFW-Specific Notes" items={result.dfwNotes} />
          </div>
        )}
      </div>
    </div>
  );
}
