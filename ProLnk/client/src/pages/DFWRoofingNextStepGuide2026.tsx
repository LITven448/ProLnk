import { useState } from 'react';

const situations = [
  { id: 'new-home', label: '🏠 New Home Purchase' },
  { id: 'roof-5-10', label: '🏘️ Roof 5–10 Years Old' },
  { id: 'roof-10-15', label: '🔧 Roof 10–15 Years Old' },
  { id: 'roof-15plus', label: '⚠️ Roof 15+ Years Old' },
  { id: 'post-hail', label: '🌧️ Recent Hail or Storm Damage' },
];

const guides: Record<string, { title: string; steps: string[]; callProLnk: string; urgency: string }> = {
  'new-home': {
    title: '🏠 New Home — Know Your Roof',
    urgency: '🟡 Within 30 Days',
    steps: [
      '📋 Request seller disclosure — ask for age, installer, and warranty docs',
      '🔍 Walk the perimeter — look for granule loss in gutters (sign of shingle age)',
      '📸 Photograph all visible flashing at chimneys, valleys, and skylights',
      '🌊 Check attic for daylight, moisture stains, or improper ventilation',
      '📞 Schedule a ProLnk HAAG-certified roofing inspection for a written baseline',
      '🗃️ File all documents in your Home Health Vault before you need them',
    ],
    callProLnk: 'Get a baseline inspection within 30 days — before your first DFW hail season.',
  },
  'roof-5-10': {
    title: '🏘️ 5–10 Year Roof — Inspect & Protect',
    urgency: '🟢 Annual Priority',
    steps: [
      '🔍 Annual inspection: check flashing, valleys, and ridge cap condition',
      '🧹 Clear debris from valleys — standing water causes premature deterioration',
      '🌊 Inspect gutters for granule buildup — signals early shingle wear',
      '🌡️ Check attic ventilation — poor airflow reduces shingle life by 30–40%',
      '📋 Document any repairs with photos and receipts for Vault and resale',
      '🔎 After any hail event, get a ProLnk roof inspection within 72 hours',
    ],
    callProLnk: 'Schedule a preventive inspection — DFW hail season runs March through October.',
  },
  'roof-10-15': {
    title: '🔧 10–15 Year Roof — Plan Your Replacement',
    urgency: '🟠 Act This Season',
    steps: [
      '📋 Get a written condition assessment from a HAAG-certified Charter roofer',
      '💰 Begin budgeting for replacement: DFW roofs avg $12,000–$22,000 in 2026',
      '🏷️ Check if manufacturer warranty is still transferable — affects resale value',
      '🌧️ Any hail event now justifies an insurance claim inspection — call ProLnk',
      '📐 Ask about Class 4 impact-resistant shingles — qualifies for TX insurance discount',
      '📅 Spring installs: book by April — summer backlog adds 3–5 week delays',
    ],
    callProLnk: 'Get a written assessment — a 10–15 year roof in DFW is in its final season.',
  },
  'roof-15plus': {
    title: '⚠️ 15+ Year Roof — Replace Before Disaster',
    urgency: '🔴 Urgent Priority',
    steps: [
      '📞 Call ProLnk TODAY — 15+ year shingles are past actuarial end-of-life in DFW',
      '🚫 Do not patch — insurance may deny future claims on a failed system',
      '🏛️ Verify your homeowner\'s insurance status — some carriers drop 15+ year roofs',
      '📐 Request a full replacement scope with decking inspection included',
      '💡 Ask about Class 4 impact-resistant shingles — 20–30% insurance discount available',
      '🗃️ New roof logged in Home Health Vault adds measurable resale value',
    ],
    callProLnk: 'Match with a HAAG-certified Charter roofer today — 4-hour response guaranteed.',
  },
  'post-hail': {
    title: '🌧️ Post-Hail — Act Within 72 Hours',
    urgency: '🔴 Immediate Action',
    steps: [
      '⏱️ 72-hour window: document ALL hail damage within 3 days of the storm',
      '📸 Photograph dented AC condenser fins, dented gutters, and any visible shingle bruising',
      '📋 File a weather report lookup — insurance requires storm date and location data',
      '📞 Call ProLnk for a HAAG-certified inspection BEFORE calling your insurance company',
      '🚫 Do not sign any roofing contract until you have an independent inspection report',
      '💰 Texas law: roofers cannot solicit your deductible — any who offer to are in violation',
    ],
    callProLnk: 'Get a HAAG-certified inspection before insurance adjuster visit — it\'s the difference between approval and denial.',
  },
};

export default function DFWRoofingNextStepGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠⛈️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Roofing Next Step Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Select your situation for a personalized action plan</p>
        </div>

        <div style={{ background: '#132039', border: '1px solid #F5E64244', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#94a3b8' }}>
          ⚠️ <strong style={{ color: '#F5E642' }}>DFW Fact:</strong> DFW is in the highest hail-risk zone in North America. Average of 14 hail events per year — more roof claims than any U.S. metro.
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#132039', color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === s.id ? '#F5E642' : '#1e3a5f'), borderRadius: 10,
                padding: '14px 18px', textAlign: 'left', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              {s.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#132039', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>{guide.title}</h2>
              <span style={{ fontSize: 13, background: '#0A1628', padding: '4px 10px', borderRadius: 20 }}>{guide.urgency}</span>
            </div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', fontSize: 14, lineHeight: 1.5 }}>
                  {step}
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 10, padding: '14px 18px', color: '#0A1628' }}>
              <strong>📞 When to Call ProLnk:</strong> {guide.callProLnk}
              <div style={{ marginTop: 10 }}>
                <a href="https://prolnk.io" style={{ background: '#0A1628', color: '#F5E642', padding: '8px 18px',
                  borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
                  → Get My Charter Roofing Match
                </a>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28, color: '#475569', fontSize: 12 }}>
          ProLnk Charter Pros • DFW Metro • HAAG-Certified Roofers • prolnk.io
        </div>
      </div>
    </div>
  );
}
