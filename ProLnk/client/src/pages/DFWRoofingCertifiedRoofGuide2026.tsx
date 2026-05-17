import { useState } from 'react';

const situations = [
  { id: 'new', label: 'Getting a New Roof', icon: '🏗️' },
  { id: 'replace', label: 'Replacing Existing Roof', icon: '🔄' },
  { id: 'insurance', label: 'Want Insurance Premium Discount', icon: '💰' },
  { id: 'maintain', label: 'Have Certified Roof Already', icon: '✅' },
];

const guides: Record<string, { title: string; detail: string; steps?: string[] }> = {
  new: {
    title: 'Build a Certified System from Day One',
    detail: 'A GAF or Owens Corning certified system requires matching shingles, underlayment, starter strips, ridge cap, and ventilation — all from the same manufacturer. Ask your DFW contractor for a System Plus or WindProven certification.',
    steps: ['Confirm contractor is factory-certified installer', 'Specify matching manufacturer components in contract', 'Request certification documentation at completion', 'Register warranty with manufacturer within 45 days'],
  },
  replace: {
    title: 'Don\'t Mix Brands — Void Your Certification',
    detail: 'Many DFW homeowners lose certification by allowing contractors to substitute off-brand components. Even one non-matching accessory can void the system certification. Verify every component before work begins.',
    steps: ['Get component list in writing before work starts', 'Verify all materials on delivery before install', 'Photograph product labels on all materials', 'Confirm certification number before final payment'],
  },
  insurance: {
    title: 'WindProven = Maximum Insurance Benefit',
    detail: 'GAF\'s WindProven certification is the highest level — unlimited wind speed coverage with no maximum wind speed exclusion. Many DFW insurers offer 10–15% premium discounts for WindProven certified roofs. Ask your insurer before signing next renewal.',
    steps: ['Get WindProven certificate from contractor', 'Submit to insurer before renewal date', 'Ask specifically about wind-rated roof discounts', 'Keep certificate in home file for future claims'],
  },
  maintain: {
    title: 'Maintenance Rules to Keep Certification Active',
    detail: 'GAF System Plus and WindProven warranties have maintenance requirements. Failure to follow them can void coverage. DFW\'s hail season makes this especially important — document every inspection.',
    steps: ['Annual roof inspection by certified contractor', 'Document any storm events (photos + date)', 'Only use manufacturer-approved sealants for repairs', 'Never allow non-certified contractors to make repairs'],
  },
  default: { title: 'Select Your Roof Situation', detail: 'Choose the option that matches your DFW roof situation to get your certified system guide.' },
};

export default function DFWRoofingCertifiedRoofGuide2026() {
  const [selected, setSelected] = useState<string>('');

  const guide = selected ? (guides[selected] || guides['default']) : guides['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏠</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Certified Roof System Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>
          A certified roof system isn't just good shingles — it's every component from the same manufacturer, installed by a certified contractor.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['System Plus', '🥇', 'Full system cert + 25-yr wind warranty'], ['WindProven', '🏆', 'No max wind speed exclusion — best for DFW'], ['Standard', '📋', 'Shingles only — no system benefits']].map(([name, icon, desc]) => (
            <div key={name as string} style={{ background: '#0f2040', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 Your Roof Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#1a2f4e', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === s.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ marginRight: 8 }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>

        {selected && guide && (
          <div style={{ background: '#1a2f4e', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642', marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 18 }}>{guide.title}</h3>
            <p style={{ color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6 }}>{guide.detail}</p>
            {guide.steps && (
              <ol style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
                {guide.steps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            )}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 15 }}>⚡ DFW Insurance Reality</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>With DFW hail season running March–June, a certified roof can mean the difference between a covered claim and a coverage gap. WindProven certification removes maximum wind speed exclusions — critical when DFW storms exceed 130 mph gusts.</p>
        </div>

        <p style={{ color: '#475569', fontSize: 12, marginTop: 24, textAlign: 'center' }}>ProLnk DFW Home Intelligence · 2026</p>
      </div>
    </div>
  );
}