import { useState } from 'react';

const situations = [
  { id: 'hail', label: '🌩️ Recent hail damage' },
  { id: 'age', label: '🏚️ Roof is 15+ years old' },
  { id: 'leak', label: '💧 Active leak' },
  { id: 'selling', label: '🏠 Selling soon' },
  { id: 'new', label: '✅ Just replaced' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  hail: { title: 'Hail Damage Action Plan', steps: ['Document with photos within 48 hrs', 'Call insurance before contractor', 'Get 3 Class 4 shingle bids', 'Verify contractor is TX-licensed', 'Confirm transferable warranty'] },
  age: { title: '15+ Year Roof Plan', steps: ['Schedule full inspection now', 'Check attic ventilation (DFW requires 1:150 ratio)', 'Get Class 4 impact-resistant quote', 'Compare repair vs replace cost', 'Register warranty within 30 days of install'] },
  leak: { title: 'Active Leak Emergency Plan', steps: ['Mitigate interior damage immediately', 'Tarp if storm is coming', 'Do NOT sign AOB (Assignment of Benefits)', 'Get licensed inspector same day', 'File insurance if storm-related'] },
  selling: { title: 'Pre-Sale Roof Plan', steps: ['Get inspection report for disclosure', 'Repair visible flashing and ridge caps', 'Class 4 shingles add resale value', 'Transferable warranty is selling point', 'DFW buyers expect 5+ yr remaining life'] },
  new: { title: 'New Roof Maintenance Plan', steps: ['Register manufacturer warranty NOW', 'Schedule biannual inspections (spring/fall)', 'Clear gutters after every storm', 'Check attic ventilation quarterly', 'Document everything for insurance'] },
};

export default function DFWRoofing2026Summary() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ROOFING 2026 · COMPLETE SUMMARY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Roofing Knowledge Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything DFW homeowners need to know about roofs in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌩️', title: 'Hail Alley Impact', body: 'DFW sits in the nation\’s top hail zone. Average 7 hail events/year. Class 4 impact-resistant shingles can save 15–30% on insurance premiums and are required by many carriers.' },
            { icon: '🔄', title: 'Transferable Warranties', body: 'GAF, Owens Corning, and CertainTeed offer transferable warranties. A 50-year transferable warranty adds $3K–$8K to resale value. Must register within 30 days of install.' },
            { icon: '💨', title: 'Venting Requirements', body: 'TX code: 1 sq ft of ventilation per 150 sq ft of attic space. DFW heat makes proper ventilation critical — poor venting shortens shingle life by 30% and voids most warranties.' },
            { icon: '📋', title: 'Insurance Claim Process', body: 'Document damage immediately. Never sign AOB forms. Get 3 bids before accepting adjuster\’s estimate. TX law gives you 2 years to file a storm damage claim.' },
            { icon: '🔍', title: 'Vetting Contractors', body: 'Require: TX contractor license, general liability ($1M+), workers\’ comp, local references, no door-to-door solicitation. Avoid storm chasers — use established DFW companies.' },
            { icon: '📅', title: 'When to Replace', body: 'Replace at 20–25 years for 3-tab, 25–30 for architectural. Immediate replacement: granule loss, curling edges, daylight in attic, multiple leaks, storm damage >30% of surface.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111d35', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Your DFW Roofing Action Plan</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>Select your situation to get a personalized plan:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`, background: selected === s.id ? '#F5E642′ : ’transparent', color: selected === s.id ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>{s.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>{plans[selected].title}</div>
              {plans[selected].steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: 14, background: '#111d35', borderRadius: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🔗 ProLnk matches you with vetted DFW roofing contractors — get 3 bids instantly.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
