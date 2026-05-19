import { useState } from 'react';

const docChecklist = (repairAge: string, hasWarranty: boolean, hasEngineer: boolean) => {
  const docs = ['Repair invoices with contractor license number', 'Before/after photos from repair date'];
  if (hasEngineer) docs.push('Structural engineer report (pre and post-repair)', 'Engineer sign-off letter confirming repair adequacy');
  else docs.push('⚠️ Engineer report missing — recommend obtaining before listing');
  if (hasWarranty) docs.push('Transferable warranty letter (confirm it transfers to buyer)', 'Warranty company contact info and claim process');
  else docs.push('⚠️ No transferable warranty — buyers will price this in');
  if (repairAge === 'recent') docs.push('Photos of all pier locations with labels', 'Soil report if available from repair company');
  if (repairAge === 'old') docs.push('Follow-up inspection showing stability since repair', 'Current engineer assessment confirming no new movement');
  return docs;
};

const buyerResponses: Record<string, string> = {
  full: 'Buyers with complete documentation rarely walk away over foundation. Most lenders will approve if engineer certifies current stability.',
  partial: 'Partial documentation triggers buyer caution. Expect requests for price reduction or inspection contingency extension.',
  none: 'No documentation is a significant red flag. Expect 5–15% price negotiation or buyers walking. Get documentation before listing.',
};

export default function DFWFoundationDocumentationGuide() {
  const [repairAge, setRepairAge] = useState('recent');
  const [hasWarranty, setHasWarranty] = useState(true);
  const [hasEngineer, setHasEngineer] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const docScore = hasWarranty && hasEngineer ? 'full' : (hasWarranty || hasEngineer) ? 'partial' : 'none';
  const docs = docChecklist(repairAge, hasWarranty, hasEngineer);

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#1A2537', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#1A5FE8', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK SELLER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>📄 DFW Foundation Documentation Guide</h1>
        <p style={{ color: '#5A6B82', fontSize: 16, marginBottom: 32 }}>Foundation repairs don't kill DFW home sales — poor documentation does. Here’s exactly what to have ready before you list.</p>

        <div style={{ background: '#EEF3FF', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #1A5FE8′ }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📌 DFW Market Reality</div>
          <div style={{ color: '#3A4B62', fontSize: 14 }}>DFW's expansive clay soils cause foundation movement in a majority of homes. Buyers and lenders know this. A properly documented and repaired foundation is rarely a deal-killer — it’s the undocumented repairs that create problems.</div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#1A2537′ }}>🗂️ What Buyers and Lenders Want to See</h2>
          {[
            ['📐 Structural Engineer Report', 'An engineer (PE-licensed) must assess the foundation condition. Pre-repair and post-repair reports are both valuable. The post-repair report certifying stability is what lenders need for FHA/VA loans.'],
            ['🧾 Repair Invoices', 'Full invoices showing scope of work, contractor license number, and date. Pier count and locations matter — buyers will verify.'],
            ['🔄 Transferable Warranty', 'Most reputable DFW foundation companies (Olshan, Foundation Repair of Texas, etc.) offer 25-year transferable warranties. Confirm the warranty transfers at no cost.'],
            ['📸 Before/After Photos', 'Document the foundation state before and after repair. Photos showing completed piers with labels are highly reassuring to buyers.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ borderBottom: '1px solid #E8EDF5', padding: '16px 0′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#5A6B82', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔧 Build Your Documentation Checklist</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>When was the repair done?</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['recent', 'Within 5 years'], ['mid', '5–15 years ago'], ['old', '15+ years ago']].map(([val, label]) => (
                <button key={val} onClick={() => setRepairAge(val)}
                  style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    borderColor: repairAge === val ? '#1A5FE8′ : '#E0E7EF', background: repairAge === val ? '#EEF3FF' : '#FFF', color: repairAge === val ? '#1A5FE8' : '#5A6B82' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            {[['Do you have a transferable warranty?', hasWarranty, setHasWarranty], ['Do you have an engineer report?', hasEngineer, setHasEngineer]].map(([label, val, setter]) => (
              <div key={label as string} style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>{label as string}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['Yes', true], ['No', false]].map(([lbl, v]) => (
                    <button key={lbl as string} onClick={() => (setter as Function)(v)}
                      style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        borderColor: val === v ? '#1A5FE8′ : '#E0E7EF', background: val === v ? '#EEF3FF' : '#FFF', color: val === v ? '#1A5FE8' : '#5A6B82' }}>
                      {lbl as string}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#1A5FE8', color: '#FFF', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Generate My Checklist →
          </button>
        </div>

        {showResults && (
          <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Your Documentation Checklist</h2>
            <div style={{ padding: 16, background: docScore === 'full' ? '#EEFAF3′ : docScore === ’partial' ? '#FFF9E8′ : '#FFF0F0', borderRadius: 8, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>📊 Expected Buyer Response</div>
              <div style={{ fontSize: 14, color: '#3A4B62′ }}>{buyerResponses[docScore]}</div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {docs.map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #E8EDF5', fontSize: 14, display: 'flex', gap: 10, color: item.startsWith('⚠️') ? '#D4550A' : '#1A2537′ }}>
                  {!item.startsWith('⚠️') && <span style={{ color: '#1A5FE8′ }}>▸</span>}{item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
