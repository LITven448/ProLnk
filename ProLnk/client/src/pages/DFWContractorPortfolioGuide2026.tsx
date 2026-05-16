import { useState } from 'react';

const projectTypes = [
  { label: 'Roof Replacement', icon: '🏠', guide: ['Ask for 3 DFW references from jobs in past 18 months', 'Request before/after photos — DFW sun/hail means local climate exposure matters', 'Call references and ask: Did they show up on time? Clean up debris? Pass city inspection?', 'ProLnk shows verified inspector pass rates — ask to see the contractor\'s score', 'Verify they pull permits (Frisco, Plano, Allen all require them)'] },
  { label: 'HVAC Installation', icon: '❄️', guide: ['Request last 5 DFW installs — ask for equipment model and sizing rationale', 'Manual J load calculation should be provided in writing', 'Call references and confirm: Did the system pass city inspection first try?', 'Ask about warranty handoff — manufacturer warranty requires registered installer', 'ProLnk rating system shows pass/fail rate on city inspections per contractor'] },
  { label: 'Kitchen Remodel', icon: '🍳', guide: ['Request before/after photos with similar DFW climate homes', 'Ask references: Was the final cost within 10% of the quote?', 'Verify subcontractor use: did they use in-house electricians or subs?', 'Check BBB + Angie\'s reviews but weight ProLnk verified reviews higher', 'Ask for a photo of the completed permit card — proof of city signoff'] },
  { label: 'Foundation Repair', icon: '🏗️', guide: ['DFW clay soil requires contractor experience in pier-and-beam or slab methods specifically', 'Ask references if repair held up through a full DFW summer dry-out', 'Request engineered report — not just an estimate from salesperson', 'Verify warranty is transferable (adds to resale value)', 'ProLnk shows warranty dispute rate per contractor — critical for foundation work'] },
  { label: 'Fence/Deck', icon: '🌿', guide: ['DFW wind and UV degrade wood fast — ask what species they use (cedar vs. pine)', 'Request photos of 2-year-old DFW jobs to see weathering reality', 'Call references and ask about post-storm performance', 'Concrete footings depth matters in DFW clay — ask for spec sheet', 'City permit required in most DFW municipalities — confirm they pull it'] },
];

export default function DFWContractorPortfolioGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Contractor Portfolio Review Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How to vet a contractor's past work before hiring in DFW</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>📞 The Reference Call Most Homeowners Skip</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            Only <strong style={{ color: '#F5E642' }}>23% of homeowners</strong> actually call contractor references. Those who do catch problems before hire 4x more often than those who just read online reviews. In DFW's fast-moving market, contractors who can't provide references or whose references don't answer are red flags — not normal.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🏆 How ProLnk Rating System Replaces Manual Vetting</h2>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Every ProLnk contractor has a verified inspection pass rate</li>
            <li>Homeowner ratings are post-completion and GPS-verified to the address</li>
            <li>Warranty dispute rate is tracked per contractor, per trade</li>
            <li>Photo documentation uploaded by homeowner — not contractor</li>
          </ul>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🎯 Project Type → Vetting Approach</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {projectTypes.map((p, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{projectTypes[selected].icon} {projectTypes[selected].label} Vetting Checklist</h3>
              <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 18 }}>
                {projectTypes[selected].guide.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>⭐ ProLnk Pre-Vets Every Contractor</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>Skip the manual reference calls. ProLnk's verified rating system does the vetting for you. Join the waitlist for DFW access.</p>
        </div>
      </div>
    </div>
  );
}